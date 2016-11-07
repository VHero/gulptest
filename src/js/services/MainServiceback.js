kimama.service('MainService', function ($http, appConfig, $q) {


    function p() {
        this.NameArry = "",
            this.ContentList = {
                contentList1: '',
                contentList2: '',
                contentList3: '',
                contentList4: ''
            },
            this.ContentListLength = {
                ContentListLength1: 0,
                ContentListLength2: 0,
                ContentListLength3: 0,
                ContentListLength4: 0,
            },
            this.Page = {
                Page1: 1,
                Page2: 1,
                Page3: 1,
                Page4: 1,
            },
            this.test = function () {
                new p();
            }

        this.SetNameArry = function (dataArr) {
            this.NameArry = dataArr;
        }

        this.GetNameArry = function () {
            return this.NameArry;
        }
        this.GetContentList = function (num) {
            return this.ContentList['contentList' + num];
        }
        this.SetContentList = function (num, dataArr) {
            //console.log(dataArr);
            this.ContentList['contentList' + num] = dataArr;
        }
        this.SetTotalLength = function (leng, num) {
            this.ContentListLength['ContentListLength' + num] = leng;
        }
        this.GetTotalLength = function (num) {
            return this.ContentListLength['ContentListLength' + num];
        }
        this.SetPage = function (pagenum, num) {
            this.Page['Page' + num] = pagenum;
        }
        this.GetPage = function (num) {
            return this.Page['Page' + num];
        }
    }

    this.test = function () {
        return new p();
    }

    function onePage() {

        this.DataArray = '',
            this.totalLength = 0,
            this.setDataArray = function (dataArry) {
                this.DataArray = dataArry;
            }
        this.getDataArray = function () {
            return this.DataArray;
        }
        this.getTotalLength = function () {
            return this.totalLength;
        }
        this.setTotalLength = function (total) {
            this.totalLength = total;
        }
    }

    this.onePageNew = function () {
        return new onePage();
    }
    this.unionid = sessionStorage.getItem('unionid');
    this.login = function (q) {
        return ReqSer('User/Login', 'POST', q);
    }
    this.getUnionid = function () {
        return this.unionid.substring(1, this.unionid.length - 1);
    }
    this.getList = function (ageRange, page, limit) {
        return ReqList('Content/Lists', ageRange, limit, page);
    }
    this.getAgeGroup = function (category) {
        return ReqAge('Content/CatList', category);
    }
    this.getDetail = function (id) {
        return ReqDetail('Content/Detail', id);
    }
    this.getReList = function () {//获取奖品list
        return ReqSerList('Rewards/List', 'POST', '');
    }

    this.Get_Winner_List = function () {//获取中奖用户列表
        var time = new Date();
        var date = time.getFullYear() + "-" + (time.getMonth() + 1);
        var str = '?date=' + date + '&limit=1&page=100';
        return GetMthod('Rewards/Winners', str);
    }


    this.getStartDraw = function () {//获取当前用户获奖信息
        return ReqSer('Rewards/StartDraw', 'POST', '');
    }

    this.Get_userinfo = function () {//获取个人信息
        return GetMthod('User/Info', '');
    }
    //c2
    this.Get_C2_Recent = function () {//获取当前用户获奖信息   取得最近的一次活动
        return GetMthod('Event/Recent', '');
    }
    this.Get_C2_List = function () {//获取当前用户获奖信息  取得奖品列表
        var str="?isDraw=true";
        return GetMthod('Event/List', str);
    }
    this.Get_C2_UpdateExchange = function (p) {//获取当前用户获奖信息
        return PostMthod('Rewards/UpdateExchange', p);
    }


    var PostMthod = function (URI, p) {
        var q = {
            method: 'POST',
            url: appConfig.url + URI,
            data: p,
            withCredentials: true
        }
        return $http(q)
            .then(function (res) {
                if (res.data.code === 4001) { //未登录
                    return $q.reject(res.data.message);
                }
                return res;
            })
            .catch(function (msg) { //error
                return $q.reject(msg);
            })
    }

    var GetMthod = function (URI, str) {
        var p = {
            method: 'GET',
            url: appConfig.url + URI + str,
            withCredentials: true
        }
        return $http(p).
            then(function (res) {
                if (res.data.code === 4001) { //未登录
                    return $q.reject(res.data.message);

                }
                return res;
            })
            .catch(function (msg) { //error
                return $q.reject(msg);
            })
    }

    var ReqSerList = function (URI) {
        var p = {
            method: 'GET',
            url: appConfig.url + URI,
            withCredentials: true
        }
        return $http(p).then(function (res) {
            if (res.data.code === 4001) { //未登录
                return $q.reject(res.data.message);

            }
            return res.data.data;
        })
            .catch(function (msg) { //error
                return $q.reject(msg);
            })
    }


    // 获取年龄段数据
    var ReqAge = function (URI, category) {
        var p = {
            method: 'GET',
            url: appConfig.url + URI + '?catName=' + category,
            withCredentials: true
        }
        return $http(p).then(function (res) {
            if (res.data.code === 4001) { //未登录

                return $q.reject(res.data.message);

            }
            return res.data.data;
        })
            .catch(function (msg) { //error

                return $q.reject(msg);
            })
    }
    //获取列表项的数据
    var ReqList = function (URI, ageRange, limit, page) {
        var p = {
            method: 'GET',
            url: appConfig.url + URI + '?catName=' + ageRange + '&limit=' + limit + '&page=' + page,
            withCredentials: true
        }
        return $http(p).then(function (res) {
            if (res.data.code === 4001) { //未登录
                return $q.reject(res.data.message);

            }
            return res.data.data;
        })
            .catch(function (msg) { //error
                return $q.reject(msg);
            })
    }
    //获取内容页的数据
    var ReqDetail = function (URI, id) {
        var p = {
            method: 'GET',
            url: appConfig.url + URI + '?id=' + id,
            withCredentials: true
        }
        return $http(p).then(function (res) {
            if (res.data.code === 4001) { //未登录
                return $q.reject(res.data.message);

            }
            return res.data.data;
        })
            .catch(function (msg) { //error
                return $q.reject(msg);
            })
    }
    // 登陆操作
    var ReqSer = function (URI, method, q) {
        var p = {
            method: method,
            url: appConfig.url + URI,
            // data:{unionid:q},
            params: q,
            withCredentials: true
        }
        if (method === 'POST') {
            delete p.params;
            p.data = {unionid: q};
        }
        return $http(p)
            .then(function (res) {
                if (res.data.code === 4001) { //未登录
                    return $q.reject(res.data.message);
                }
                return res.data.data;
            })
            .catch(function (msg) { //error
                return $q.reject(msg);
            })
    }






    //在这行以上的CODE, 全部都应该移除

    /**
     * 使用方法:
     * 如你想使换领礼物时
     *
     * 参数必须在跑功能前就已经是JSON格式
     * 如：
     * {
            rewardid: 17
        }
     *
     * MainService.rewards.exchange({rewardid: 17}).then(function(res){
     *      //您需要做的动作
     *      console.log(res)
     * })
     *  // 抓取特别的回调错误
     * .catch(function(msg){
     *      // 统一错误跳窗
     *      // 基本的统一错误抓取已经在 doRequest() 完成，无需为抓取一般的错误
     *      // 如在 Rewards/Exchange：
     *      // 因为会返回400，而且会有特别的CODE
     *      // 所以需要在此处理
     *
     *      //错误处理
     *      // 跳窗
     *      // 错误文字:
     *      // REWARDS_EXCHANGE_ERROR_MSG_TXT_6001: '礼品没在生效状态'
     *      // REWARDS_EXCHANGE_ERROR_MSG_TXT_6002: '礼品不存在'
     *      // REWARDS_EXCHANGE_ERROR_MSG_TXT_6003: '礼品已经换完'
     *      // REWARDS_EXCHANGE_ERROR_MSG_TXT_6004: '用户没有足够点数'
     *      $scope.errorModal($filter('translate')('REWARDS_EXCHANGE_ERROR_MSG_TXT_'+msg.code));
     *
     * });
     *
     *
     *
     *
     */



        // 用户相关访问接口
    this.user ={
        //用戶登入
        login: function(data){
            return doRequest('User/Login', 'POST', data);
        },
        //微信用戶登入
        wechatLogin: function(data){
            return doRequest('User/WeChatLogin', 'POST', data);
        },
        //更新用戶資訊
        updateProfile: function(data){
            return doRequest('User/UpdateProfile', 'POST', data);
        },
        //注册体验大使
        regPremember: function(data){
            return doRequest('User/RegPremember', 'POST', data);
        },

        //用戶登出
        logout: function(data){
            return doRequest('User/Logout', 'GET', data);
        },
        //取得用戶資訊
        info: function(data){
            return doRequest('User/Info', 'GET', data);
        },
        //取得受邀用户列表
        invitedList: function(data){
            return doRequest('User/InvitedList', 'GET', data);
        },
        //检查大使状态
        checkPrememberStatus: function(data){
            return doRequest('User/CheckPrememberStatus', 'GET', data);
        }
    };

    // 内容相关访问接口
    this.content = {
        //取得内容分类列表
        catList: function(data){
            return doRequest('Content/CatList', 'GET', data);
        },
        //取得内容列表
        lists: function(data){
            return doRequest('Content/Lists', 'GET', data);
        },
        //取得内容的详细
        detail: function(data){
            return doRequest('Content/Detail', 'GET', data);
        },
        //取得点赞和解除点赞
        like: function(data){
            return doRequest('Content/Like', 'POST', data);
        }
    };

    // 活动相关访问接口
    this.event = {
        // 取得最近活动
        recent: function(data){
            return doRequest('Event/Recent', 'GET', data);
        },
        // 活动报名
        join: function(data){
            return doRequest('Event/Join', 'POST', data);
        }
    };

    // 奖励相关访问接口
    this.rewards = {
        // 取得中奖名单
        winners: function(data){
            return doRequest('Rewards/Winners', 'GET', data);
        },
        // 取得獎品列表
        list: function(data){
            return doRequest('Rewards/List', 'GET', data);
        },
        // 抽奖
        startDraw: function(data){
            return doRequest('Rewards/StartDraw', 'POST', data);
        },
        // 换领礼物
        exchange: function(data){
            return doRequest('Rewards/Exchange', 'POST', data);
        },
        // 更新换领礼物
        updateExchange: function(data){
            return doRequest('Rewards/UpdateExchange', 'POST', data);
        }
    };

    /*
     *
     * 所有访问服务器都必须经过此功能
     *
     * @param action 访问地址
     * @param method 访问方法
     * @param q 参数
     * @param hasLoading 是否读取中
     *
     */
    var doRequest = function(action, method, q, hasLoading){
        $rootScope.isLoading = true;
        if(angular.isUndefined(hasLoading)){

        }
        var query = {
            url: appConfig.url+action,
            method: method,
            withCredentials: true,
            params: q
        };

        //如果是POST功能把他移除params, 变成data
        if(method === 'POST'){
            delete query.params;
            query.data = q;
        }
        return $http(query).then(function(res){
            $rootScope.isLoading = false;
            if(res.data.code === 4001){//未登录
                $location.url('/login');
                return $q.reject(res.data.message);
            }
            return res.data.data;
        }).catch(function(msg){
            $rootScope.isLoading = false;
            // 统一错误跳窗 400
            if(msg.data.code === 400){
                $rootScope.errorModal(msg.data.message);
                return $q.reject(msg);// stop following actions
            }

            return msg.data;
        });
    };

})
