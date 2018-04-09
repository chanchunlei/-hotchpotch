(function(){
    var game = window.game = function(params){
         this.fno = 0;
         this.go = 0;//篮球移动
         this.Hgo = true;
         this.angle = 0;//滚动角度
         this.spot = false;
         this.canvas = document.querySelector(params.id); //得到画布
         this.ctx = this.canvas.getContext("2d");//创建上下文
         this.init();//设置宽高
         var that = this;
         this.getResources(function(){//加载资源为异步函数
             if(this.spot){
                 that.start();
             }else{
                that.drawAnimate = new drawAnimate();
             }
              // console.log(this)
         });//读取资源
     };
     game.prototype.init = function(){
         var windowW = document.documentElement.clientWidth;
         var windowH = document.documentElement.clientHeight;
         if(windowW>414){//设置最大最小宽
             windowW = 414;
         }else if(windowW<320){
             windowW = 320;
         }
         if(windowH>800){//设置最大最小高
             windowH = 800;
         }else if(windowH<500){
             windowH = 500;
         }
         //设置canvas的宽高
         this.canvas.width = windowW;
         this.canvas.height = windowH;
     };
     game.prototype.loading = function(){
         this.ctx.fillStyle = 'black';
         this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
         this.ctx.font = '40px Aral';
         this.ctx.fillStyle = '#fff';
         this.ctx.textAlign = 'center';//相对于要画内容的宽度
         this.ctx.fillText('loading...',this.canvas.width/2,this.canvas.height/2*.618);         
     };
     game.prototype.getResources = function(callback){//加载资源
         this.loading();
         var that = this;
         var sum = 0;//加载进度
         that.R = {};//准备一个对象
         var imgs = [{"name":"BG","url":"imgs/BG.png"}, 
                      {"name":"ball","url":"imgs/ball.png"}, 
                      {"name":"basket","url":"imgs/basketBG.png"}, 
                      {"name":"hoop","url":"imgs/hoop.png"}, 
                      {"name":"one","url":"imgs/t1.png"}, 
                      {"name":"two","url":"imgs/t2.png"}, 
                      {"name":"three","url":"imgs/t3.png"},
                      {"name":"timg","url":"imgs/timg.png"}];
         for(var i = 0; i<imgs.length; i++){
             that.R[imgs[i].name] = new Image();
             that.R[imgs[i].name].src = imgs[i].url;
             that.R[imgs[i].name].onload = function(){//监听图片加载
                 sum++;
                 if(sum==imgs.length){
                     //that.ctx.clearRect(0,0,that.canvas.width,that.canvas.width);
                     callback();
                 }

             }
         }
     };
     game.prototype.start = function(){
        var that = this;
        this.timer = setInterval(function(){
            that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);//清屏
            that.BGimg = new BGimg();//绘制背景
            that.hoop = new hoop();//绘制背景
            that.balls = new balls();
            that.fno++;//帧编号
            that.ctx.font = '16px consolas';
            that.ctx.fillStyle = '#fff';
            that.ctx.fillText("FNO:"+that.fno,50,50);
        },16);
        // requestAnimationFrame(that.start);
     };
     var BGimg = window.BGimg = function(){
        //获取资源
        this.image1 = Game.R.BG;
        this.image2 = Game.R.basket;
        //console.log(this.image)
        Game.ctx.drawImage(this.image1,0,0,Game.canvas.width,Game.canvas.height);//绘制背景
        Game.ctx.drawImage(this.image2,Game.canvas.width*.5-492*.6*.5,80,492*.6,332*.6)//绘制篮板
     };
     var hoop = window.hoop = function(){
        this.img = Game.R.hoop;
        Game.ctx.drawImage(this.img,Game.canvas.width*.5-185*.6*.5,235,193*.6,157*.6);//绘制篮筐
     };
     var balls = window.balls = function(){//滚动的篮球
        this.img = Game.R.ball;
        var t = Game.ctx;
        var y = Game.canvas.height-35;
        var x = Math.floor(Game.canvas.width-35);
        if(Game.Hgo){ //篮球左右移动参数
           if(Game.go >= x){
            Game.Hgo = false;
           } 
           Game.go += 5;
        }else{
           if(Game.go <= 35){
            Game.Hgo = true;
           } 
           Game.go -= 5;
        }
        Game.angle += 2;
        //console.log(Game.go);
        t.save();
        t.translate(Game.go,y);//左右移动
        t.rotate(Game.angle*Math.PI/180);
        t.drawImage(this.img,-35,-35,70,70);
        t.restore();
     };
     var ballmove = window.ballmove = function(){
          
     };
     var drawAnimate = window.drawAnimate = function(){
        var ctx = Game.ctx;
        var canvasT = Game.canvas;
        ctx.clearRect(0,0,canvasT.width,canvasT.height);
        BGimg();
        hoop();
        ctx.drawImage(Game.R.timg,canvasT.width/2-105,canvasT.height/2-45,210,90);
        this.can
     };
})();
