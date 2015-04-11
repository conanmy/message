define(function(require) {
    'use strict';
    var router = require('avalonFrame/router');
    var comConfig = require('common/config');
    var $ = require('jquery');
    require('jquery-cookie');

    var util = require('common/util');
    var env = require('common/env');
    var log = require('common/log');
    var systemLog = require('common/extension/log');

    require('common/extension/ajax');
    require('common/extension/avalon');
    require('bootstrap-transition');

    // 初始化auth信息
    initEnv();

    $.request('getAuth').done(function(result) {
        var data = result.data;
        env.set('optname', data.optname);
        env.set('optulevelid', data.optulevelid);
        env.set('systemType', data.systemType);
        env.set('optregappid', data.optregappid);

        /**
         * 根据路由配置设置路由信息
         */
        registerRoute();

        // 启动路由
        router.start('#/');

        if (env.get('optregappid') === comConfig.CHENGXIN_REGID) {
            $('body').addClass('chengxinuser');
        }

        if (env.get('systemType') === 0) {
            $.getScript(
                'http://u.baidu.com/ucnavi/asset/uccn.php?uccn_v=2.0',
                function() {
                    window.uccnInit({
                        appid: 280,
                        ucid: env.get('userid'),
                        ucname: env.get('optname'),
                        link: location.href,
                        blank: false,
                        container: $('div', '#header')[0],
                        logoutURL: 'http://cas.baidu.com/?action=logout&tpl=www2',
                        feature: {
                            ones: {
                                wide: true,
                                message: false,
                                service: false
                            }
                        }
                    });
                }
            );

            systemLog.init('message-v2-');
        } else {
            $('#header').html(require('text!mcc-header/info.html'));
            $('#userName').text(env.get('optname'));
            
            systemLog.init('mcc-message-');
        }

        var baseLogParams = {
            userid: env.get('userid'),
            optulevelid: env.get('optulevelid')
        };
        var fromApp = util.queryToJson(window.location.search).fromApp;
        if (fromApp) {
            baseLogParams.fromApp = fromApp;
        }
        // 初始化日志模块
        log.init('http://fclog.baidu.com/nirvana/log/fclogimg.gif', baseLogParams);

        systemLog.send({
            target: 'page-enter'
        });

        $('body').on('click.monitor', '[data-log]', function() {
            var params = $(this).data('log').replace(/\'/g, '"');
            params = JSON.parse(params);
            systemLog.send(params);
        });
    });

    /**
     * 初始化环境信息
     * @param  {Object} info 需要设置的环境信息
     *
     * @inner
     */
    function initEnv(){
        /**
         * 初始化env信息
         */
        var urlParams = util.queryToJson(location.search);
        $.each(urlParams, function(key, value) {
            env.set(key, value);
        });
        env.set('token', $.cookie('__cas__st__3'));
    }

    /**
     * 注册路由回调
     * @param  {Array} urlList 路由列表
     *
     * @inner
     */
    function registerRoute() {
        router.registerViewModelSync({
            path: '/',
            ViewModel: require('show/main')
        });
        router.registerViewModelSync({
            path: '/setting',
            ViewModel: require('setting/index')
        });
    }

});