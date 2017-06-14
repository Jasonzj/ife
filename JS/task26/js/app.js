/*
 * @Author: Jason 
 * @Date: 2017-06-14 19:36:13 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-14 21:42:32
 */

;
(window => {
	
	const SPACE_SPEED = 2,		  // 飞船飞行速度
		  SPACE_SIZE = 40,		  // 飞船大小
		  SPACE_COUNT = 4,		  // 飞船数量
		  SPACE_CHAGE = 0.3,	  // 飞船充电速度
		  SPACE_DISCHARGE = 0.2,  // 飞船放电速度

		  POWERBAR_POS_OFFSET = 5, 			 // 电量条位置位移
		  POWERBAR_COLOR_GOOD = "#70ed3f",    // 电量良好状态颜色
		  POWERBAR_COLOR_MEDIUM = "#fccd1f", // 电量良好状态颜色
		  POWERBAR_COLOR_BAD = "#fb0000",    // 电量良好状态颜色
		  POWERBAR_WIDTH = 5,				 // 电量条宽度

		  SCREEN_WIDTH = 700,		// canvas宽度
		  SCREEN_HEIGHT = 700,		// canvas高度
		  SCREEN_CENTER_X = SCREEN_WIDTH / 2,	// canvas X轴中心坐标
		  SCREEN_CENTER_Y = SCREEN_HEIGHT / 2,	// canvas Y轴中心坐标

		  PLANET_RADIUS = 150,	// 行星半径
		  ORBIT_COUNT = 4,		// 轨道数量
		  FAILURE_RATE = 0.3;	// 消息丢包率

	/**
	 * [Spaceship 飞船类]
	 * @class Spaceship
	 */
	class Spaceship {

		constructor (id) {
			this.id = id;
			this.power = 100;
			this.state = "stop";
			this.orbit = 200 + 45 * id;

			this.init();
		}

		init () {

		}

	}

	/**
	 * [Animate 动画工具，canvas绘制]
	 */
	const Animate = (function() {
		const ship = document.getElementById('ship');
		      shipCtx = ship.getContext('2d'),
			  planet = document.getElementById('planet'),
          	  planet_ctx = planet.getContext("2d"),
			  cacheCanvas = document.createElement("canvas"),
        	  cacheCtx = cacheCanvas.getContext("2d"); 	//生成缓存画布

		ship.width = SCREEN_WIDTH;		
		ship.height = SCREEN_HEIGHT;		
		planet.width = SCREEN_WIDTH;
		planet.height = SCREEN_HEIGHT;
        cacheCanvas.width = SCREEN_WIDTH;
        cacheCanvas.height = SCREEN_HEIGHT;

		/**
		 * [drawPlanet 绘制行星]
		 * @param {canvas} _ctx 目标画布
		 */
		const drawPlanet = (_ctx) => {
			const circle = (color, x, y, w, ) => {    
				_ctx.fillStyle = color;
				_ctx.beginPath();
				_ctx.arc(x, y, w, 0, Math.PI * 2, true);
				_ctx.closePath();
				_ctx.fill();
			}
			circle('#ec5d4a', SCREEN_CENTER_X, SCREEN_CENTER_Y, PLANET_RADIUS);	 // 创建行星
			circle('#c83b38', 380, 440, 40);
			circle('#c83b38', 320, 320, 25);
			circle('#c83b38', 280, 250, 15);
		}

		/**
		 * [drawOrbit 绘制轨道]
		 * @param {canvas} _ctx 目标画布
		 */
		const drawOrbit = (_ctx) => {
			for (var i = 0; i < ORBIT_COUNT; i++) {
				_ctx.strokeStyle = "#3e4059";
				_ctx.lineWidth = 3;
				_ctx.beginPath();
				_ctx.arc(SCREEN_CENTER_X, SCREEN_CENTER_Y, 200 + 45 * i, 0, 2 * Math.PI, false);
				_ctx.closePath();
				_ctx.stroke();
			}
		}

		/**
		 * [drawSpaceship 绘制飞船]
		 * @param {canvas} _ctx 	  目标画布(cache画布)
		 * @param {class} spaceship   飞船
		 */
		const drawSpaceship = (_ctx, spaceship) => {
			var spaceshipImg = new Image();
			spaceshipImg.src = 'img/min-iconfont-rocket-active.png';
			spaceshipImg.onload = function() {

				// _ctx.save();
				// _ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
				// _ctx.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y);
				// _ctx.rotate(spaceship.deg * 8 * Math.PI / 180);
				// _ctx.beginPath();
				// _ctx.drawImage(spaceshipImg, spaceship.orbit - SPACE_SIZE / 2, 0, SPACE_SIZE, SPACE_SIZE); 
				// _ctx.closePath();
				// _ctx.restore();
				
				// shipCtx.drawImage(cacheCanvas, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

				_ctx.save();
				_ctx.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y);
				_ctx.rotate(spaceship.deg * 8 * Math.PI / 180);

				//画电量条，根据电量状态改变颜色
				_ctx.beginPath();
				if (spaceship.power > 60) {
					_ctx.strokeStyle = POWERBAR_COLOR_GOOD;
				} else if (spaceship.power <= 60 && spaceship.power >= 20) {
					_ctx.strokeStyle = POWERBAR_COLOR_MEDIUM;
				} else {
					_ctx.strokeStyle = POWERBAR_COLOR_BAD;
				}
				_ctx.lineWidth = POWERBAR_WIDTH;
				_ctx.moveTo(spaceship.orbit - SPACE_SIZE / 2, -POWERBAR_POS_OFFSET);
				_ctx.lineTo(spaceship.orbit + SPACE_SIZE * (spaceship.power / 100) - SPACE_SIZE / 2, -POWERBAR_POS_OFFSET);
				_ctx.stroke();

				_ctx.drawImage(spaceshipImg, spaceship.orbit - SPACE_SIZE / 2, 0, SPACE_SIZE, SPACE_SIZE); 
				_ctx.restore();
				
				shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
				shipCtx.drawImage(cacheCanvas, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
			}
		}
		
		for (var i = 0; i < 4; i++) {
			drawSpaceship(cacheCtx, {
				deg: i,
				orbit: i * 45 + 200,
				power: 100
			});
		}

		const init = (function() {
			drawPlanet(planet_ctx);
			drawOrbit(planet_ctx);
		})();

	})();

})(window);


// var Animate = (() => {

//     const canvas = document.getElementById('planet'),
//           ctx = canvas.getContext("2d"),
// 		  canvas2 = document.getElementById('ship'),
//           ctx2 = canvas2.getContext("2d");
	
// 	canvas.width = 700;
// 	canvas.height = 700;

// 	const centerX = Math.floor(canvas.width / 2),
//           centerY = Math.floor(canvas.height / 2);

//     for (var i = 0; i < 4; i++) {
//         ctx.strokeStyle = "#3e4059";
//         ctx.lineWidth = 3;
//         ctx.beginPath();
//         ctx.arc(350, 350, 200 + 45 * i, 0, 2 * Math.PI, false);
//         ctx.closePath();
//         ctx.stroke();
//     }

//     const circle = (color, x, y, w) => {    
//         ctx.fillStyle = color;
//         ctx.beginPath();
//         ctx.arc(x, y, w, 0, Math.PI * 2, true);
//         ctx.closePath();
//         ctx.fill();
//     }

//     circle('#ec5d4a', 350, 350, 150);
//     circle('#c83b38', 380, 440, 40);
//     circle('#c83b38', 320, 320, 25);
//     circle('#c83b38', 280, 250, 15);

// 	var spaceships = [],
//         vr = 0.05,
//         angle = 0,
//      	radius = 235,
// 		cos = Math.cos(vr),
// 		sin = Math.sin(vr),
// 		time = 1;

//     function Spaceship(x, y, radius, speed) {
// 		this.x = x;
// 		this.y = y;
// 		this.radius = radius;
// 		this.angle = 0;
// 		this.speed = speed;
//     }

// 	var spaceshipImg = new Image(); //创建飞船贴图
//         spaceshipImg.src = "./img/min-iconfont-rocket-active.png";
	
// 	function animation () {
		
// 		ctx2.clearRect(0, 0, canvas.width, canvas.height);
// 			ctx2.save();
// 			ctx2.translate(centerX, centerY);
// 			ctx2.rotate(angle * 8 * Math.PI / 180);
// 			ctx2.beginPath();
// 			ctx2.drawImage(spaceshipImg, 223, 0, 40, 40); 
// 			ctx.closePath();
// 			ctx2.restore();
// 			angle = angle - vr;
// 			requestAnimationFrame(animation);
// 	}

// 	window.onload = function() {
// 		// spaceships.push(new Spaceship(centerX - 50,centerY - 50,10));
// 		new Spaceship(centerX - 50,centerY - 50,10)
// 		animation();
// 	};
    
// })();

