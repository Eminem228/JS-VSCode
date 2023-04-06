(function() {
    let lastTime = 0;
    let vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) 
		window.requestAnimationFrame = function(callback) {
			let currTime = new Date().getTime();
			let timeToCall = Math.max(0, 16 - (currTime - lastTime));
			let id = window.setTimeout(function() {callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
    	};
 
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {clearTimeout(id);};
}());

(function (){
    let coin, 
        coinImge,
        canvas; 

    function gameLoop(){
        window.requestAnimationFrame(gameLoop);//рекурсия это когда функция вызавает сомого себя
        coin.update();
        coin.render();
    } 

    function sprite(options) {
        let that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame =options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.widht = options.widht;
        that.height = options.height;
        that.image = options.image;

        that.update = function() {
            tickCount += 1;
            if(tickCount > ticksPerFrame) {
                tickCount = 0;
                if (frameIndex < numberOfFrames - 1) {
                    frameIndex += 1;
                }else {
                    frameIndex = 0;
                }

            }
        };


        that.render = function () {
            that.context.clearRect(0, 0, that.widht, that.height);
            that.context.drawImage(
                that.image,
                frameIndex * that.widht / numberOfFrames,
                0,
                that.widht / numberOfFrames,
                that.height,
                0,
                0,
                that.widht / numberOfFrames,
                that.height
            );

        }

        return that;

    };




    canvas = document.getElementById('coinAnimation');
    canvas.widht = 100;
    canvas.height = 100;

    coinImge = new Image();

    coin = sprite(
        {
            context: canvas.getContext('2d'),
            widht: 1000,
            height: 100,
            image: coinImge,
            numberOfFrames: 10,
            ticksPerFrame: 4

        }
    )

    coinImge.addEventListener("load", gameLoop);
    coinImge.src = 'images/coin-sprite-animation.png'

}()); //ананимная функиция

