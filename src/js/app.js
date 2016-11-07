
//var kimama = angular.module('Kimama', ['ui.router', 'ngSanitize', 'infinite-scroll'])
var kimama = angular.module('Kimama', ['ionic', 'ionic-datepicker', 'angularFileUpload', 'textAngular'])

.run(function($ionicPlatform, $rootScope, $ionicHistory, $state, $http, $location, MainService) {
        var loginQuery = {
            unionid:null
        }
        // localStorage.setItem('unionid', "oVNnev1_m5OQXjsV_IpyhFqRBDL0");
        var unionid = sessionStorage.getItem('unionid');
        loginQuery.unionid=unionid.substring(1,unionid.length-1);
        console.log(loginQuery);
        MainService.user.login(loginQuery).then(function(data) {
            console.log(data);
        })
        MainService.user.info().then(function(data) {
            console.log(data);
            MainService.tool.setUserInfo(data);//将用户信息存储
        })
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position("bottom");
        $ionicConfigProvider.tabs.style("standard");
        $ionicConfigProvider.navBar.alignTitle("center");

        $stateProvider

            .state('404', {
                url: '/404',
                templateUrl: 'templates/404.html',

            })
            .state('tab.a1', {
                url: '/a1',
                views: {
                    'a1': {
                        templateUrl: 'templates/a1.html',
                        controller: 'A1Ctrl'
                    }
                }

            })
            .state('tab.a2', {
                url: '/a2',
                views: {
                    'a1': {
                        templateUrl: 'templates/a2.html',
                        controller: 'A2Ctrl'
                    }
                }

            })
            .state('tab.a3', {
                url: '/a3',
                views: {
                    'a1': {
                        templateUrl: 'templates/a3.html',
                        controller: 'A3Ctrl'
                    }
                }

            })

        .state('tab.a4', {
                url: '/a4',
                views: {
                    'a1': {
                        templateUrl: 'templates/a4.html',
                        controller: 'A4Ctrl'
                    }
                }
            })
            .state('tab.a4-1', {
                url: '/a4-1/:id',
                views: {
                    'a1': {
                        templateUrl: 'templates/a4-1.html',
                        controller: 'A4_1Ctrl'
                    }
                }
            })
            .state('tab.a5', {
                url: '/a5',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5.html',
                        controller: 'A5Ctrl'
                    }
                }
            })
            .state('tab.a5-1', {
                url: '/a5-1',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-1.html',
                        controller: 'A5_1Ctrl'
                    }
                }
            })
            .state('tab.a5-1-0', {
                url: '/a5-1-0/:id',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-1-0.html',
                        controller: 'A5_1_0Ctrl'
                    }
                }
            })
            .state('tab.a5-1-1', {
                url: '/a5-1-1',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-1.html',
                        controller: 'A5_1_1Ctrl'
                    }
                }
            })
            .state('tab.a5-1-2', {
                url: '/a5-1-2',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-1.html',
                        controller: 'A5_1_2Ctrl'
                    }
                }
            })
            .state('tab.a5-1-3', {
                url: '/a5-1-3',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-1.html',
                        controller: 'A5_1_3Ctrl'
                    }
                }
            })
            .state('tab.a5-2', {
                url: '/a5-2',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-2.html',
                        controller: 'A5_2Ctrl'
                    }
                }
            })
            .state('tab.a5-3', {
                url: '/a5-3',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-3.html',
                        controller: 'A5_3Ctrl'
                    }
                }
            })
            .state('tab.a5-3-1', {
                url: '/a5-3-1',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-3-1.html',
                        controller: 'A5_3_1Ctrl'
                    }
                }
            })
            .state('tab.a5-3-2', {
                url: '/a5-3-2',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-3-2.html',
                        controller: 'A5_3_2Ctrl'
                    }
                }
            })
            .state('tab.a5-4', {
                url: '/a5-4',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-4.html',
                        controller: 'A5_4Ctrl'
                    }
                }
            })
            .state('tab.a5-4-1', {
                url: '/a5-4-1',
                views: {
                    'a1': {
                        templateUrl: 'templates/a5-4-1.html',
                        controller: 'A5_4_1Ctrl'
                    }
                }
            })
            .state('tab.a6', {
                url: '/a6',
                views: {
                    'a1': {
                        templateUrl: 'templates/a6.html',
                        controller: 'A6Ctrl'
                    }
                }
            })
            .state('tab.a6-1', {
                url: '/a6-1',
                views: {
                    'a1': {
                        templateUrl: 'templates/a6.html',
                        controller: 'A6_1Ctrl'
                    }
                }
            })
            .state('tab.a6-2', {
                url: '/a6-2',
                views: {
                    'a1': {
                        templateUrl: 'templates/a6.html',
                        controller: 'A6_2Ctrl'
                    }
                }
            })
            .state('tab.b1', {
                url: '/b1',
                views: {
                    'b1': {
                        templateUrl: 'templates/b1.html',
                        controller: 'B1Ctrl'
                    }
                }
            })
            .state('tab.b1-1', {
                url: '/b1-1/:id',
                views: {
                    'b1': {
                        templateUrl: 'templates/b1-1.html',
                        controller: 'B1_1Ctrl'
                    }
                }
            })
            .state('tab.b2', {
                url: '/b2',
                views: {
                    'b1': {
                        templateUrl: 'templates/b2.html',
                        controller: 'B2Ctrl'
                    }
                }
            })
            .state('tab.b2-1', {
                url: '/b2-1/:id',
                views: {
                    'b1': {
                        templateUrl: 'templates/b2-1.html',
                        controller: 'B2_1Ctrl'
                    }
                }
            })

        .state('tab.b3', {

                url: '/b3',
                views: {
                    'b1': {
                        templateUrl: 'templates/b3.html',
                        controller: 'B3Ctrl'
                    }
                }
            })
            .state('tab.b3-1', {
                url: '/article/:id',
                views: {
                    'b1': {
                        templateUrl: 'templates/b3-1.html',
                        controller: 'B3_1Ctrl'
                    }
                }
            })

        .state('tab.b4', {
                url: '/b4',
                views: {
                    'b1': {
                        templateUrl: 'templates/b3.html',
                        controller: 'B4Ctrl'
                    }
                }

            })
            .state('tab.b4-1', {
                url: '/b4-1/:id',
                views: {
                    'b1': {
                        templateUrl: 'templates/b3-1.html',
                        controller: 'B4_1Ctrl'
                    }
                }
            })

        .state('tab.b5', {
                url: '/b5',
                views: {
                    'b1': {
                        templateUrl: 'templates/b3.html',
                        controller: 'B5Ctrl'
                    }
                }

            })
            .state('tab.b5-1', {
                url: '/b5-1/:id',
                views: {
                    'b1': {
                        templateUrl: 'templates/b3-1.html',
                        controller: 'B5_1Ctrl'
                    }
                }

            })
            .state('tab.b6', {
                url: '/b6',
                views: {
                    'b1': {
                        templateUrl: 'templates/b6.html',
                        controller: 'B6Ctrl'
                    }
                }

            })
            .state('tab.b6-1', {
                url: '/b6-1',
                views: {
                    'b1': {
                        templateUrl: 'templates/b6.html',
                        controller: 'B6_1Ctrl'
                    }
                }

            })
            .state('tab.b6-2', {
                url: '/b6-2',
                views: {
                    'b1': {
                        templateUrl: 'templates/b6.html',
                        controller: 'B6_2Ctrl'
                    }
                }

            })
            .state('tab.c1_ng', {
                url: '/c1_ng',
                views: {
                    'c1': {
                        templateUrl: 'templates/c1_ng.html',
                        controller: 'C1Ctrl'
                    }
                }
            })
            .state('tab.c2', {
                url: '/c2',
                views: {
                    'c1': {
                        templateUrl: 'templates/c2.html',
                        controller: 'C2Ctrl'
                    }
                }

            })
            .state('tab.c2-1', {
                url: '/c2-1',
                views: {
                    'c1': {
                        templateUrl: 'templates/c2-1.html',
                        controller: 'C2_1Ctrl'
                    }
                }

            })
            .state('tab.c2-2', {
                url: '/c2-2',
                views: {
                    'c1': {
                        templateUrl: 'templates/c2-2.html',
                        controller: 'C2_2Ctrl'
                    }
                }

            })
            .state('tab.c3', {
                url: '/c3',
                views: {
                    'c1': {
                        templateUrl: 'templates/c3.html',
                        controller: 'C3Ctrl'
                    }
                }

            })
            .state('tab.c3-1', {
                url: '/c3-1',
                views: {
                    'c1': {
                        templateUrl: 'templates/c3_1.html',
                        controller: 'C3_1Ctrl'
                    }
                }

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


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/404');

    })
    .config(function(ionicDatePickerProvider) {
        var datePickerObj = {
            inputDate: new Date(),
            setLabel: '确认',
            todayLabel: '今天',
            closeLabel: '取消',
            mondayFirst: false,
            weeksList: ["日", "一", "二", "三", "四", "五", "六"],
            monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            //templateType: 'popup',
            //from: new Date(2008, 1, 1),
            //to: new Date(2016, 8, 30),
            showTodayButton: true,
            dateFormat: 'yyyy－MM－dd',
            closeOnSelect: false,
            // disableWeekdays: [0,6]
        };
        ionicDatePickerProvider.configDatePicker(datePickerObj);
    })
