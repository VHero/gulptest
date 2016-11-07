/**
 * Created by lanmao on 16/4/27.
 */
var kimama = angular.module('Kimama', ['ui.router', 'ngSanitize', 'infinite-scroll'])

    .run(['$location', '$rootScope', function ($location, $rootScope) {
        $rootScope.isLoading = false;
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.title = toState.title;
            console.log(fromState);
            console.log(fromParams);
        });
    }])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('404', {
                url: '/404',
                templateUrl: 'templates/404.html',

            })
            .state('a3', {
                url: '/a3',
                title: '最新情报',
                templateUrl: 'templates/a3.html',
                controller: 'A3Ctrl'
            })

            .state('a3-1', {
                url: '/a3-1/:id',
                title: '最新情报',
                templateUrl: 'templates/a3-1.html',
                controller: 'A3_1Ctrl'
            })

            .state('a4', {
                url: '/a4',
                title: '教育游戏',
                templateUrl: 'templates/a4.html',
                controller: 'A4Ctrl'
            })
            .state('a4-1', {
                url: '/a4-1/:id',
                title: '教育游戏',
                templateUrl: 'templates/a4-1.html',
                controller: 'A4_1Ctrl'
            })


            .state('b1', {
                url: '/b1',
                title: '育儿心得',
                templateUrl: 'templates/b1.html',
                controller: 'B1Ctrl'
            })
            .state('b1-1', {
                url: '/b1-1/:num/:id',
                title: '育儿心得',
                templateUrl: 'templates/b1-1.html',
                controller: 'B1_1Ctrl'
            })

            .state('b2', {
                url: '/b2',
                title: '亲子游',
                templateUrl: 'templates/b2.html',
                controller: 'B2Ctrl'
            })
            .state('b2-1', {
                url: '/b2-1/:num/:id',
                title: '亲子游',
                templateUrl: 'templates/b2-1.html',
                controller: 'B2_1Ctrl'
            })

            .state('b3', {

                url: '/b3',
                title: '妈妈想知道',
                templateUrl: 'templates/b3.html',
                controller: 'B3Ctrl'
            })
            .state('b3-1', {
                url: '/b3-1/:num/:id',
                title: '妈妈想知道',
                templateUrl: 'templates/b3-1.html',
                controller: 'B3_1Ctrl'
            })

            .state('b4', {
                url: '/b4',
                title: '专家指导',
                templateUrl: 'templates/b4.html',
                controller: 'B4Ctrl'
            })
            .state('b4-1', {
                url: '/b4-1/:id',
                title: '专家指导',
                templateUrl: 'templates/b4-1.html',
                controller: 'B4_1Ctrl'
            })

            .state('b5', {
                url: '/b5',
                title: '明星专区',
                templateUrl: 'templates/b5.html',
                controller: 'B5Ctrl'
            })
            .state('b5-1', {
                url: '/b5-1/:id',
                title: '明星专区',
                templateUrl: 'templates/b5-1.html',
                controller: 'B5_1Ctrl'
            })
            .state('c1_ng', {
                url: '/c1_ng',
                templateUrl: 'templates/c1_ng.html',
                controller: 'C1Ctrl'
            })
            .state('C1_ngDemo', {
                url: '/C1_ngDemo',
                templateUrl: 'templates/C1_ngDemo.html',
                controller: 'C1CtrlDemo'

            })
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })


            // Each tab has its own nav history stack:

            .state('tab.kisenwo', {
                url: '/kisenwo',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tabs/kisenwo.html',
                        controller: 'KisenwoCtrl'
                    }
                }
            })

            .state('tab.shares', {
                url: '/shares',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tabs/shares.html',
                        controller: 'SharesCtrl'
                    }
                }
            })
            .state('tab.shares-detail', {
                url: '/shares/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/pages/shares-detail.html',
                        controller: 'SharesDetailCtrl'
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/404');

    });
