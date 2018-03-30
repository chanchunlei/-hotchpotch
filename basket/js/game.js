function basketball(){ //箭头函数不可以作构造器
    var that = this;
    var h = $(window).height();
    var w = $(window).width();
    that.sound = !1;//是否有音频文件  false
    that.res = {};//对象


    that.init = ()=>{//初始化
      return that.setupCanvas();
    };
    that.setupCanvas = () => {//设置尺寸
        that.canvas = $("#mycanvas")[0];//因为jQuery对象就是类数组
		that.canvas.width = h;
		that.canvas.height = w; 
		that.ctx = that.canvas.getContext("2d");//上下文
		console.log(that.canvas.width);
    };
    that.start = () =>{
        
    };
    that.drawLoadingScreen = function() {//加载中
        var ctx = that.canvas.getContext("2d");//创建上下文
        ctx.fillStyle = "black", ctx.fillRect(0, 0, 960, 640), ctx.textAlign = "center", that.drawText(t, "Loading...", 320, 480, 40), ctx.textAlign = "left"
    },
    that.getResources = function() {//获取资源
        var Img = ["image/background.png", "image/ball.png", "image/hoop.png","image/t1.png","image/t2.png","image/t3.png"], Sou = ["image/bounce_1.wav"];
        return that.sound ? Img.concat(Sou) : Img;
    }, 
    that.load = () =>{//加载
        that.drawLoadingScreen();
        for (var t = that, s = 0, i = that.getResources(), e = 0; e < i.length; e++) {
            var h = i[e].split(".").pop();//取出图片格式
			console.log("开始");
            if ("png" == h) {
                var a = new Image;
                a.src = i[e], a.addEventListener("load", function() { //监听加载完成，冒泡阶段执行
                    s++, s == i.length && t.start();//出发start方法
                }, !1), that.res[i[e]] = a
            } else {
                var n = new Audio;
                n.src = i[e], n.addEventListener("canplaythrough", function() { //监听正常播放且无需停顿和缓冲时触发
                    s++, s == i.length && t.start();
                }, !1), that.res[i[e]] = n
            }
        }
    };
}//basketball类结束       




function Hoop(t, s) {//绘制篮筐
	var that = this;
    that.x = t, that.y = s, that.move = !1, that.vel = 100, that.points = [{x: t + 7,y: s + 18}, {x: t + 141,y: s + 18}], 
    that.update = function(t) {
        if (that.move) {
            that.x += that.vel * t;
            for (var s = 0; s < that.points.length; s++) {
                var i = that.points[s];
                i.x += that.vel * t
            }
            that.x > 382 ? (that.vel = -that.vel, that.x = 382) : that.x < 110 && (that.vel = -that.vel, that.x = 110)
        }
    }, 
    that.drawBack = function(t) {
        drawImage(t, game.res["image/hoop.png"], that.x, that.y, 0, 0, 148, 22, 0, 0, 0)
    }, 
    that.drawFront = function(t) {
        drawImage(t, game.res["image/hoop.png"], that.x, that.y + 22, 0, 22, 148, 156, 0, 0, 0);
        for (var s = 0; s < that.points.length; s++) {
            var i = that.points[s];
            t.beginPath(), t.arc(i.x, i.y, 5, 0, 2 * Math.PI, !1), t.fillStyle = "red"
        }
    }
}


function Ball(t, s) {//绘制篮球类
	var that = this;
    that.x = t, that.y = s, that.vx = 0, that.vy = 0, that.speed = 100, that.canBounce = !0, that.angle = 270, that.gravity = 0, that.falling = !1, that.bounces = 0, that.scored = !1, that.drawAngle = 0, that.angleVel = 100, that.solid = !1, that.z = 1, that.setAngle = function(t) {
        that.angle = t, that.vx = that.speed * Math.cos(that.angle * Math.PI / 180), that.vy = that.speed * Math.sin(that.angle * Math.PI / 180), that.gravity = 0
    }, 
    that.shoot = function(t) {
        that.speed = t + Math.floor(40 * Math.random()), that.setAngle(270)
    }, 
    that.update = function(t) {
        that.y += that.gravity * t, that.gravity += 1500 * t, that.x += that.vx * t, that.y += that.vy * t, that.vx > 500 && (that.vx = 500), that.vy > 500 && (that.vy = 500), that.y < 300 && (that.solid = !0), that.gravity > that.speed && (that.falling = !0), that.x + 47 > 640 && (that.vx = -1 * that.vx, that.x = 593), that.x - 47 < 0 && (that.vx = -1 * that.vx, that.x = 47), that.drawAngle += that.angleVel * t
    }, 
    that.draw = function(t) {
        drawImage(t, game.res["image/ball.png"], Math.floor(that.x - 46.5), Math.floor(that.y - 46.5), 0, 0, 93, 93, 46.5, 46.5, that.drawAngle)
    }
}
function PopText(t, s, i) {//文本
	var that = this;
    that.string = t, that.x = s, that.y = i, that.vy = -500, that.opacity = 1, 
    that.update = function(t) {
        that.y += that.vy * t, that.vy += 1e3 * t, that.vy > 0 && that.opacity > 0 && (that.opacity -= 2 * t), that.opacity <= 0 && (that.opacity = 0)
    }, 
    that.draw = function(t) {
        t.globalAlpha = that.opacity, game.drawText(t, that.string, that.x + 15, that.y), t.globalAlpha = 1
    }
}
function AnimatedText(t, s, i, e, h) { //动画文本
	var that = this;
    that.string = t, that.x = s, that.y = i, that.size = e, that.vel = 50, that.speed = h, that.toNextSize = 0, 
    that.update = function(t) {
        that.size += that.vel * t, that.size >= 60 ? (that.vel = -that.vel, that.size = 60) : that.size <= 40 && (that.vel = -that.vel, that.size = 40)
    }, 
    that.draw = function(t) {
        t.save(), t.textAlign = "center", game.drawText(t, that.string, that.x, that.y, that.size), t.restore()
    }
}
function FlashText(t) {//flash
	var that = this;
    that.string = t, that.size = 10, that.speed = 170, that.opacity = 1, 
    that.update = function(t) {
        that.size += that.speed * t, that.size > 100 && (that.opacity -= 2 * t)
    }, 
    that.draw = function(t) {
        t.textAlign = "center", t.save(), t.globalAlpha = that.opacity, game.drawText(t, that.string, 320, 480, that.size), t.restore()
    }
}
function drawImage(t, s, i, e, h, a, n, r, l, o, c) {//绘制图片
    t.save(), t.translate(i + l, e + o), t.rotate(c * Math.PI / 180), t.drawImage(s, h, a, n, r, -l, -o, n, r), t.restore()
}
function gameStart() {//游戏开始
    isEnterOver && (isEnterOver = !1, overTimer = clearTimeout(overTimer))
}
function gameOver(t) {//游戏结束
    isEnterOver || (isEnterOver = !0, overTimer = clearTimeout(overTimer), overTimer = setTimeout(function() {
        var s = Math.max(t, localStorage.getItem("score"));
		console.log("once");
        //ih5game.setScore(t).setShare("desc", s ? "我在<<极限投篮>>里最高砍下" + s + "分，求超越! 火舞游戏" : "<<极限投篮>>真好玩！都来试试把！火舞游戏"), confirm(t ? "您真厉害！拿下" + t + "分, 通知小伙伴也试试？" : "没关系，再接再厉，通知小伙伴也来试试？") && ih5game.share()
    }, 1e3))
}









$(function(){
  var game = (new basketball).init(); //初始化
})