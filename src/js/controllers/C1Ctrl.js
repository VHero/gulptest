
// kimama
//     .controller('C1Ctrl', function($scope, $http, MainService) {

//         var restaraunts = [{ name: "谢谢您的参与" }];
//         var turnplate = {
//             restaraunts: [], //大转盘奖品名称
//             colors: [], //大转盘奖品区块对应背景颜色
//             outsideRadius: 186, //大转盘外圆的半径
//             textRadius: 155, //大转盘奖品位置距离圆心的距离
//             insideRadius: 50, //大转盘内圆的半径
//             startAngle: 0, //开始角度
//             bRotate: false //false:停止;ture:旋转
//         };
//         MainService.login("oVNnev1_m5OQXjsV_IpyhFqRBDL0")
//             .then(function(data) {
//             })
//                 nums = ReList();
//         function ReList() {
//             MainService.getReList()
//                 .then(function(res) {
//                     console.log(res);
//                     var obj = {
//                         code: 0,
//                         created_dt: 0,
//                         id: 0,
//                         in_stock_count: 0,
//                         is_active: 0,
//                         name: "谢谢您的参与"
//                     }
//                     for (var ind = 0; ind < res.length; ind++) {
//                         //turnplate.restaraunts[ind]=res[ind].name;
//                         turnplate.restaraunts[2 * ind] = obj.name;
//                         turnplate.restaraunts[2 * ind + 1] = res[ind].name;
//                         restaraunts[2 * ind] = obj;
//                         restaraunts[2 * ind + 1] = res[ind];
//                     }
//                     console.log(restaraunts);
//                     drawRouletteWheel();
//                     winner_List();
//                 })
//         }

//         //动态添加大转盘的奖品与奖品区域背景颜色
//         //turnplate.restaraunts = ["谢谢参与", "咭星坞公仔", "谢谢参与", "咭星坞书包", "谢谢参与"];
//         turnplate.colors = ["#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32"];
//         var rotateTimeOut = function() {
//             $('#wheelcanvas').rotate({
//                 angle: 0,
//                 animateTo: 2160,
//                 duration: 8000,
//                 callback: function() {
//                     alert('网络超时，请检查您的网络设置！');
//                 }
//             });
//         };
//         //旋转转盘 item:奖品位置; txt：提示语;
//         var rotateFn = function(item, txt) {
//             //console.log(item)
//             //				console.log(txt)
//             var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

//             if (angles < 270) {
//                 angles = 270 - angles;
//             } else {
//                 angles = 360 - angles + 270;
//             }
//             $('#wheelcanvas').stopRotate();
//             $('#wheelcanvas').rotate({
//                 angle: 0,
//                 animateTo: angles + 1800,
//                 duration: 8000,
//                 callback: function() {
//                     alert(txt);
//                     console.log(txt);
//                     turnplate.bRotate = !turnplate.bRotate;
//                 }
//             });
//         };
//         $('.pointer').click(function() {
//             /*
//              *
//              *  思路：
//              *
//              *
//              *  在点击时直接访问后台接口
//              *  等待后台数据返回时，再触发转动效果；
//              *  待实践：2016-07-01；
//              *  编写人：smallfalt401;
//              *
//              * */
//             if (turnplate.bRotate) return;
//             turnplate.bRotate = !turnplate.bRotate;

//             StartDraw();
//             //获取随机数(奖品个数范围内)
//             //var item = rnd();
//             //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
//             //rotateFn(item, turnplate.restaraunts[item - 1]);

//         });
//         function StartDraw() {
//             MainService.getStartDraw()
//                 .then(function(res) {
//                     console.log("code:随机抛出异常，以下为查看：")
//                     console.log(res);
//                     if (res.isDrawn == true) {
//                         alert("您已经参加过抽奖了")
//                         return rotateFn(1, restaraunts[1 - 1].name);
//                     }
//                     if (res.isWon == false) {
//                         console.log("有异常");
//                         return rotateFn(1, restaraunts[1 - 1].name);
//                     }
//                     //ide 为数组下标  rotateFn(ide+1, restaraunts[ide].name);  ide+1表示 在绘制中的实际位置 ，restaraunts[ide].name 表示在当前数组中的下标
//                     var ide = 0;
//                     for (ide; ide < restaraunts.length; ide++) { //匹配数组
//                         if (restaraunts[ide].code == res.isWon.on_reward_id.code) {
//                             console.log("pipei：" + (ide + 1));
//                             return rotateFn(ide + 1, restaraunts[ide].name);
//                         }
//                     }
//                     console.log(ide);
//                     console.log(restaraunts.length);
//                     if (ide == restaraunts.length) {
//                         console.log("未能匹配:1");
//                         return rotateFn(1, restaraunts[1 - 1].name); //如果未能匹配则表示未中奖；
//                     }
//                 })
//         }
//         //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
//         function drawRouletteWheel() {
//             var canvas = document.getElementById("wheelcanvas");
//             if (canvas.getContext) {
//                 //根据奖品个数计算圆周角度
//                 var arc = Math.PI / (turnplate.restaraunts.length / 2);
//                 var ctx = canvas.getContext("2d");
//                 //在给定矩形内清空一个矩形
//                 ctx.clearRect(0, 0, 422, 422);
//                 //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
//                 ctx.strokeStyle = "#FFBE04";
//                 //font 属性设置或返回画布上文本内容的当前字体属性
//                 ctx.font = '16px Microsoft YaHei';
//                 for (var i = 0; i < turnplate.restaraunts.length; i++) {
//                     var angle = turnplate.startAngle + i * arc;
//                     ctx.fillStyle = turnplate.colors[i];
//                     ctx.beginPath();
//                     //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
//                     ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
//                     ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
//                     ctx.stroke();
//                     ctx.fill();
//                     //锁画布(为了保存之前的画布状态)
//                     ctx.save();
//                     //----绘制奖品开始----
//                     ctx.fillStyle = "#E5302F";
//                     var text = turnplate.restaraunts[i];
//                     var line_height = 17;
//                     //translate方法重新映射画布上的 (0,0) 位置
//                     ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
//                     //rotate方法旋转当前的绘图
//                     ctx.rotate(angle + arc / 2 + Math.PI / 2);
//                     /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
//                     if (text.indexOf("M") > 0) { //流量包
//                         var texts = text.split("M");
//                         for (var j = 0; j < texts.length; j++) {
//                             ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
//                             if (j == 0) {
//                                 ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
//                             } else {
//                                 ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
//                             }
//                         }
//                     } else if (text.indexOf("M") == -1 && text.length > 8) { //奖品名称长度超过一定范围
//                         text = text.substring(0, 8) + "||" + text.substring(8);
//                         var texts = text.split("||");
//                         for (var j = 0; j < texts.length; j++) {
//                             ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
//                         }
//                     } else {
//                         //在画布上绘制填色的文本。文本的默认颜色是黑色
//                         //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
//                         ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
//                     }
//                     ctx.restore();
//                     //----绘制奖品结束----
//                 }
//             }
//         }
//         function winner_List() {

//             MainService.Get_Winner_List()
//                 .then(function(res) {
//                     console.log(res);

//                     $scope.winners = res.data.data;
//                     console.log(res.data.data);
//                     setInterval(startmarquee(34, 90, 0), 1000);
//                 })
//                 ///setInterval("startmarquee(34,90,0)",1000);
//         }

//         function startmarquee(lh, speed, delay) {
//             console.log(11111);
//             var t;
//             var o = document.getElementById("marquee");
//             console.log(document.getElementById("marquee"));

//             if (o.getElementsByTagName('li').length <= 5) {
//                 console.log("exit");
//                 clearInterval(startmarquee);
//             }
//             if (o.getElementsByTagName('li').length >= 6 && o.getElementsByTagName('li').length < 9) {
//                 console.log("copy");
//                 o.innerHTML += o.innerHTML + o.innerHTML;
//             }

//             o.scrollTop = 0;

//             function start() {
//                 t = setInterval(scrolling, speed);
//                 o.scrollTop += 2;
//             }

//             function scrolling() {
//                 if (o.scrollTop % lh != 0) {
//                     o.scrollTop += 2;
//                     if (o.scrollTop >= o.scrollHeight / 2) {
//                         o.scrollTop = 0;
//                     }
//                 } else {
//                     clearInterval(t);
//                     setTimeout(start, delay);
//                 }
//             }
//             setTimeout(start, delay);
//         }
//     });


kimama
    .controller('C1Ctrl', function($scope, $http, MainService) {

        var restaraunts = [{ name: "谢谢您的参与" }];
        var turnplate = {
            restaraunts: [], //大转盘奖品名称
            colors: [], //大转盘奖品区块对应背景颜色
            outsideRadius: 186, //大转盘外圆的半径
            textRadius: 155, //大转盘奖品位置距离圆心的距离
            insideRadius: 50, //大转盘内圆的半径
            startAngle: 0, //开始角度
            bRotate: false //false:停止;ture:旋转
        };
        /*MainService.login("oVNnev1_m5OQXjsV_IpyhFqRBDL0")
            .then(function(data) {
            })*/
                nums = ReList();
        function ReList() {
            MainService.rewards.list()
                .then(function(res) {
                    console.log(res);
                    var obj = {
                        code: 0,
                        created_dt: 0,
                        id: 0,
                        in_stock_count: 0,
                        is_active: 0,
                        name: "谢谢您的参与"
                    }
                    for (var ind = 0; ind < res.length; ind++) {
                        //turnplate.restaraunts[ind]=res[ind].name;
                        turnplate.restaraunts[2 * ind] = obj.name;
                        turnplate.restaraunts[2 * ind + 1] = res[ind].name;
                        restaraunts[2 * ind] = obj;
                        restaraunts[2 * ind + 1] = res[ind];
                    }
                    console.log(restaraunts);
                    drawRouletteWheel();
                    winner_List();
                })
        }

        //动态添加大转盘的奖品与奖品区域背景颜色
        //turnplate.restaraunts = ["谢谢参与", "咭星坞公仔", "谢谢参与", "咭星坞书包", "谢谢参与"];
        turnplate.colors = ["#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32", "#17b1ff", "#fddd32"];
        var rotateTimeOut = function() {
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: 2160,
                duration: 8000,
                callback: function() {
                    alert('网络超时，请检查您的网络设置！');
                }
            });
        };
        //旋转转盘 item:奖品位置; txt：提示语;
        var rotateFn = function(item, txt) {
            //console.log(item)
            //              console.log(txt)
            var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

            if (angles < 270) {
                angles = 270 - angles;
            } else {
                angles = 360 - angles + 270;
            }
            $('#wheelcanvas').stopRotate();
            $('#wheelcanvas').rotate({
                angle: 0,
                animateTo: angles + 1800,
                duration: 8000,
                callback: function() {
                    alert(txt);
                    console.log(txt);
                    turnplate.bRotate = !turnplate.bRotate;
                }
            });
        };
        $('.pointer').click(function() {
            /*
             *
             *  思路：
             *
             *
             *  在点击时直接访问后台接口
             *  等待后台数据返回时，再触发转动效果；
             *  待实践：2016-07-01；
             *  编写人：smallfalt401;
             *
             * */
            if (turnplate.bRotate) return;
            turnplate.bRotate = !turnplate.bRotate;

            StartDraw();
            //获取随机数(奖品个数范围内)
            //var item = rnd();
            //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
            //rotateFn(item, turnplate.restaraunts[item - 1]);

        });
        function StartDraw() {
            MainService.rewards.startDraw()
                .then(function(res) {
                    console.log("code:随机抛出异常，以下为查看：")
                    console.log(res);
                    if (res.isDrawn == true) {
                        alert("您已经参加过抽奖了")
                        return rotateFn(1, restaraunts[1 - 1].name);
                    }
                    if (res.isWon == false) {
                        console.log("有异常");
                        return rotateFn(1, restaraunts[1 - 1].name);
                    }
                    //ide 为数组下标  rotateFn(ide+1, restaraunts[ide].name);  ide+1表示 在绘制中的实际位置 ，restaraunts[ide].name 表示在当前数组中的下标
                    var ide = 0;
                    for (ide; ide < restaraunts.length; ide++) { //匹配数组
                        if (restaraunts[ide].code == res.isWon.on_reward_id.code) {
                            console.log("pipei：" + (ide + 1));
                            return rotateFn(ide + 1, restaraunts[ide].name);
                        }
                    }
                    console.log(ide);
                    console.log(restaraunts.length);
                    if (ide == restaraunts.length) {
                        console.log("未能匹配:1");
                        return rotateFn(1, restaraunts[1 - 1].name); //如果未能匹配则表示未中奖；
                    }
                })
        }
        //页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
        function drawRouletteWheel() {
            var canvas = document.getElementById("wheelcanvas");
            if (canvas.getContext) {
                //根据奖品个数计算圆周角度
                var arc = Math.PI / (turnplate.restaraunts.length / 2);
                var ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0, 0, 422, 422);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                ctx.strokeStyle = "#FFBE04";
                //font 属性设置或返回画布上文本内容的当前字体属性
                ctx.font = '16px Microsoft YaHei';
                for (var i = 0; i < turnplate.restaraunts.length; i++) {
                    var angle = turnplate.startAngle + i * arc;
                    ctx.fillStyle = turnplate.colors[i];
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                    ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();
                    //----绘制奖品开始----
                    ctx.fillStyle = "#E5302F";
                    var text = turnplate.restaraunts[i];
                    var line_height = 17;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                    if (text.indexOf("M") > 0) { //流量包
                        var texts = text.split("M");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
                            if (j == 0) {
                                ctx.fillText(texts[j] + "M", -ctx.measureText(texts[j] + "M").width / 2, j * line_height);
                            } else {
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                            }
                        }
                    } else if (text.indexOf("M") == -1 && text.length > 8) { //奖品名称长度超过一定范围
                        text = text.substring(0, 8) + "||" + text.substring(8);
                        var texts = text.split("||");
                        for (var j = 0; j < texts.length; j++) {
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    } else {
                        //在画布上绘制填色的文本。文本的默认颜色是黑色
                        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    }
                    ctx.restore();
                    //----绘制奖品结束----
                }
            }
        }
        function winner_List() {

            MainService.Get_Winner_List()
                .then(function(res) {
                    console.log(res);

                    $scope.winners = res.data.data;
                    console.log(res.data.data);
                    setInterval(startmarquee(34, 90, 0), 1000);
                })
                ///setInterval("startmarquee(34,90,0)",1000);
        }

        function startmarquee(lh, speed, delay) {
            console.log(11111);
            var t;
            var o = document.getElementById("marquee");
            console.log(document.getElementById("marquee"));

            if (o.getElementsByTagName('li').length <= 5) {
                console.log("exit");
                clearInterval(startmarquee);
            }
            if (o.getElementsByTagName('li').length >= 6 && o.getElementsByTagName('li').length < 9) {
                console.log("copy");
                o.innerHTML += o.innerHTML + o.innerHTML;
            }

            o.scrollTop = 0;

            function start() {
                t = setInterval(scrolling, speed);
                o.scrollTop += 2;
            }

            function scrolling() {
                if (o.scrollTop % lh != 0) {
                    o.scrollTop += 2;
                    if (o.scrollTop >= o.scrollHeight / 2) {
                        o.scrollTop = 0;
                    }
                } else {
                    clearInterval(t);
                    setTimeout(start, delay);
                }
            }
            setTimeout(start, delay);
        }
    });

