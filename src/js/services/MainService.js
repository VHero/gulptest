kimama.service('MainService', ['$http', 'appConfig','$q','$location', function($http, appConfig,$q,$location) {

    // this.getReList = function() { //获取奖品list
    //     return ReqSerList('Rewards/List', 'POST', '');
    // }
    // this.login = function(q) {
    //     return ReqSer('User/Login', 'POST', q);
    // }
    // this.getStartDraw = function() { //获取当前用户获奖信息
    //     return ReqSer('Rewards/StartDraw', 'POST', '');
    // }
    this.Get_userinfo = function() { //获取个人信息
            return GetMthod('User/Info', '');
        }
        //c2
    this.Get_C2_Recent = function() { //获取当前用户获奖信息   取得最近的一次活动
        return GetMthod('Event/Recent', '');
    }
    this.Get_C2_List = function() { //获取当前用户获奖信息  取得奖品列表
        var str = "?isDraw=true";
        return GetMthod('Event/List', str);
    }
    this.Get_C2_UpdateExchange = function(p) { //获取当前用户获奖信息
        return PostMthod('Rewards/UpdateExchange', p);
    }
    this.Get_Winner_List = function() { //获取中奖用户列表
        var time = new Date();
        var date = time.getFullYear() + "-" + (time.getMonth() + 1);
        var str = '?date=' + date + '&limit=1&page=100';
        return GetMthod('Rewards/Winners', str);
    }
    var PostMthod = function(URI, p) {
        var q = {
            method: 'POST',
            url: appConfig.url + URI,
            data: p,
            withCredentials: true
        }
        return $http(q)
            .then(function(res) {
                if (res.data.code === 4001) { //未登录
                    return $q.reject(res.data.message);
                }
                return res;
            })
            .catch(function(msg) { //error
                return $q.reject(msg);
            })
    }

    var GetMthod = function(URI, str) {
        var p = {
            method: 'GET',
            url: appConfig.url + URI + str,
            withCredentials: true
        }
        return $http(p).
        then(function(res) {
                if (res.data.code === 4001) { //未登录
                    return $q.reject(res.data.message);

                }
                return res;
            })
            .catch(function(msg) { //error
                return $q.reject(msg);
            })
    }
    var ReqSer = function(URI, method, q) {
        var p = {
            method: method,
            url: appConfig.url + URI,
            // data:{unionid:q},
            params: q,
            withCredentials: true
        }
        if (method === 'POST') {
            delete p.params;
            p.data = { unionid: q };
        }
        return $http(p)
            .then(function(res) {
                if (res.data.code === 4001) { //未登录
                    return $q.reject(res.data.message);
                }
                return res.data.data;
            })
            .catch(function(msg) { //error
                return $q.reject(msg);
            })
    }
    var ReqSerList = function(URI) {
        var p = {
            method: 'GET',
            url: appConfig.url + URI,
            withCredentials: true
        }
        return $http(p).then(function(res) {
                if (res.data.code === 4001) { //未登录
                    return $q.reject(res.data.message);

                }
                return res.data.data;
            })
            .catch(function(msg) { //error
                return $q.reject(msg);
            })
    }
    this.user = {
            //用戶登入
            login: function(data) {
                return doRequest('User/Login', 'POST', data);
            },
            //取得用戶資訊
            info: function(data) {
                return doRequest('User/Info', 'GET', data);
            },
            //取得受邀用户列表
            invitedList: function(data) {
                return doRequest('User/InvitedList', 'GET', data);
            },
            //更新用戶資訊
            updateProfile: function(data) {
                return doRequest('User/UpdateProfile', 'POST', data);
            },
            // 取得系统参数群组
            enums:function(data){
                return doRequest('Enum/Group','GET',data);
            },
            // 用户发表文章
            createArticle:function(data){
                return doRequest('Content/Create','POST',data);
            }
        }
        // 内容相关访问接口
    this.content = {
        //取得内容分类列表
        catList: function(data) {
            return doRequest('Content/CatList', 'GET', data);
        },
        //取得内容列表
        lists: function(data) {
            return doRequest('Content/Lists', 'GET', data);
        },
        //取得内容的详细
        detail: function(data) {
            return doRequest('Content/Detail', 'GET', data);
        },
        // 取得用户发布的文章
        getUserArticle:function(data){
            return doRequest('Content/UserPost','GET', data);
        },
        //取得点赞和解除点赞
        like: function(data) {
            return doRequest('Content/Like', 'POST', data);
        }
    };
    this.tool = {
        toWrapStr: function(str, length) {
            // remove html and make it max 40 chars 
            return str ? String(str).replace(/<[^>]+>/gm, '').substr(0, length) : '';
        },
        timeStr: function(str) {
            return str ? String(str).replace(/[A-Z]/gi, ' ').substr(0, 19) : '';
        },

        // 获得年月日 2016-08-11
        getYmdDate:function(date){
            if(date==null||date==""){
                return "1900-01-01";
            }
            return moment(date).utcOffset(new Date().getTimezoneOffset()/60+16).format("YYYY-MM-DD");
        },
        // 获得完整时间信息 2016-08-11 07:15:10 
        getFullDate:function(date){
            return moment(date).utcOffset(new Date().getTimezoneOffset()/60+16).format("YYYY-MM-DD HH:mm:ss");
        },
        // 将获取的性别数字转换为男 女(1为男 2为女)
        getGender: function(index) {
            index=parseInt(index);
            switch (index) {
                case 0:
                    return "男";
                    break;
                case 1:
                    return "男";
                    break;
                    // 本来为保密，因为后台只有1 2两个参数，将保密转换为男
                case 2:
                    return "女";
                    break;
                default:
                    break;
            }
        },
        genderToNumber:function(gender){
            switch(gender){
                case "男":
                    return 1;
                    break;
                case "女":
                    return 2;
                    break;
                default:
                    break;
            }
        },
        // 获取本地存储的用户信息
        getUserInfo:function(str){
            return JSON.parse(localStorage.getItem(str));
        },
        // 存储本地的用户信息
        setUserInfo:function(data){
            localStorage.setItem('userinfo',JSON.stringify(data));
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
        },
        // 取得奖励记录
        rewardsHistory:function(data){
            return doRequest('Rewards/History','GET',data);
        }
    };
    var doRequest = function(action, method, q) {
        var query = {
            url: appConfig.url + action,
            method: method,
            withCredentials: true,
            params: q
        };

        //如果是POST功能把他移除params, 变成data
        if (method === 'POST') {
            delete query.params;
            query.data = q;
        }
        return $http(query).then(function(res) {
            if (res.data.code === 4001) { //未登录
                $location.url('/login');
                return $q.reject(res.data.message);
            }
            return res.data.data;
        }).catch(function(msg) {
            // 统一错误跳窗 400
            if (msg.code === 400) {

                return $q.reject(msg); // stop following actions
            }

            return msg.data;
        });
    };
}])
