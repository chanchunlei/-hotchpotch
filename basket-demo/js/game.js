(function(){
    var game = window.game = function(params){
         this.canvas = document.querySelector(params.id); //得到画布
         this.ctx = this.canvas.getContext("2d");//创建上下文
         this.init();//设置宽高
         this.getResources(function(){//加载资源为异步函数
             this.star();
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

         this.ctx.font = '40px Aral';
         this.ctx.fillStyle = 'blue';
         var widthT = this.ctx.measureText('loading...').width/2;
         this.ctx.fillText('loading...',this.canvas.width/2-widthT,this.canvas.width/2);
         this.ctx.textAlign = 'center'
         // console.log(widthT)
     };
     game.prototype.getResources = function(){//加载资源
         this.loading();
         var that = this;
         var sum = 0;
         that.R = {};//准备一个对象
         var imgs = ["imgs/background.png", "imgs/ball.png", "imgs/hoop.png","imgs/t1.png","imgs/t2.png","imgs/t3.png"];
         for(var i = 0; i<imgs.length; i++){
             that.R = new Image();
             that.R.src = imgs[i];
             that.R.onload = function(){//监听图片加载
                 sum++;
                 if(sum==imgs.length){
                     //that.ctx.clearRect(0,0,that.canvas.width,that.canvas.width);
                     that.start();
                 }

             }
         }
     };
     game.prototype.start = function(){

     }
})();
