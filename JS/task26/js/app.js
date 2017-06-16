/*
 * @Author: Jason 
 * @Date: 2017-06-14 19:36:13 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-16 11:53:14
 */

;
(window => {
	
	const SPACE_SPEED = 1,  // 飞船飞行速度
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

		  PLANET_RADIUS = 150,	     // 行星半径
		  PLANET_MCOLOR = "#3498DB"; // 行星主色调
		  PLANET_COLOR = "#2980B9";  // 行星副色调
		  ORBIT_COUNT = 4,		     // 轨道数量
		  FAILURE_RATE = 0.3,		 // 消息丢包率
		  
		  // requestAnimationFrame兼容
		  requestAnimationFrame = window.requestAnimationFrame 	
		  || window.mozRequestAnimationFrame 
		  || window.webkitRequestAnimationFrame 
		  || window.msRequestAnimationFrame;
		  
	/**
	 * [Spaceship 飞船类]
	 * @class Spaceship
	 */
	const Spaceship = (function() {
		
		class Spaceship {
			constructor (id) {
				this.id = id;	
				this.deg = 0;
				this.power = 100;
				this.state = "stop";
				this.orbit = 150 + 45 * id;
				this.timer = null;
				
			}

			/**
			 * [engineSystem 飞船动力系统(引擎) 控制飞船的飞行和停止]
			 * @returns {Object} fly(飞行)方法，stop(停止)方法
			 */
			engineSystem () {
				const self = this;

				const fly = function () {
					if (self.power > 0) {	// 如果电量大于0则可飞行
						self.timer = setInterval(function() {
							self.deg += SPACE_SPEED;
							if (self.deg >= 360) self.deg = 0;
						}, 20);
						miniConsole.log(`飞船${self.id} 号起飞`);
					}
				};

				const stop = function() {
					clearInterval(self.timer);	
					miniConsole.log(`飞船${self.id} 号停止`);
				};

				return {
					fly,
					stop
				}

			}

			/**
			 * [powerSystem 飞船能源系统 控制飞船的充电和放电]
			 * @returns {Object} charge(充电)方法，discharge(放电)方法
			 */
			powerSystem () {
				const self = this;

				/**
				 * [charge 飞船充电方法]
				 */
				const charge = function() {
					var timer = setInterval(function() {
						if (self.state === 'fly' || self.state === 'destroy') {
							clearInterval(timer);
							return false;
						}
						if (self.power >= 100) {
							clearInterval(timer);
							self.power = 100;
							return false;
						}

						self.power += SPACE_CHAGE;
						return true;
					}, 20);
					miniConsole.log(`飞船${self.id} 号充电`);
				}

				/**
				 * [charge 飞船放电方法]
				 */
				const discharge = function() {
					var timer = setInterval(function() {
						if (self.state === 'stop' || self.state === 'destroy') {
							clearInterval(timer);
							return false;
						}
						if (self.power <= 0) {
							clearInterval(timer);
							self.power = 0;
							self.stateSystem().changeState('stop');
							return false;
						}

						self.power -= SPACE_DISCHARGE;
						return true;

					}, 20);
					miniConsole.log(`飞船${self.id} 号放电`);
				}

				return {
					charge,
					discharge
				}
			}

			/**
			 * [stateSystem 飞船状态系统，管理飞船状态]
			 * @returns changeState方法，接受指令改变飞船状态
			 */
			stateSystem () {
				const self = this,
					  states = {	// 状态对象
						  fly () {
							  self.state = 'fly';
							  self.engineSystem().fly();
							  self.powerSystem().discharge();
						  },
						  stop () {
							  self.state = 'stop';
							  self.engineSystem().stop();
							  self.powerSystem().charge();
						  },
						  destroy () {
							  self.state = 'destroy';
							  Mediator.destroy(self);
						  }
					  }

				// 切换状态方法
				const changeState = function(state) {	
					states[state] && states[state]();
					miniConsole.log(`飞船${self.id} 状态为 ${self.state}`);
				}

				return {
					changeState
				}
			}

			/**
			 * [signalSystem 飞船信号系统，接受来自太空的信号，并通知状态系统完成状态切换]
			 * @param {Object} msg 指令
			 */
			signalSystem (msg) {
				var self = this;

				if (self.state !== msg.commond && msg.id === self.id) {
					self.stateSystem().changeState(msg.commond);
				}

			}

			/**
			 * 指令格式: {
			 *     id: 0,
			 * 	   commond: 'fly'
			 * }
			 */
 		}

		return Spaceship;
	})();

	/**
	 * [Mediator 传播消息，专门负责让不同对象之间进行消息传递，并保存飞船队列]
	 * @return self
	 */
	const Mediator = (() => {

		var spaceshipQueue = [];	//存储飞船队列

		/**
		 * [createSpaceship 创建飞船]
		 * @param {Number} id 飞船的id
		 */
		const createSpaceship = (id) => {
			if (id === false) return false;
			var newSpaceship  = new Spaceship(id);	    // 新建飞船实例
			spaceshipQueue.push(newSpaceship)			// 将新飞船实例压进数组
			Animate.drawSpaceship(newSpaceship);		// 画飞船
			miniConsole.log(`创建飞船${id}成功`);
		}

		/**
		 * [destroy 飞船自爆]
		 * @param {Object} spaceship 飞船实例
		 */
		const destroy = (spaceship) => {
			if (spaceship instanceof Spaceship) {
				delete spaceshipQueue[spaceship.id - 1];
				console.log(spaceshipQueue);
				console.log(spaceshipQueue.length);
				miniConsole.log(`飞船${spaceship.id}自爆啦`);
			}
		}

		/**
		 * [send 传播消息方法，采用广播传播消息的方式]
		 * @param {Object} msg 指令消息
		 */
		const send = (msg) => {
			if (msg.commond === "create") {		// 如果指令是创建飞船则执行创建飞船
				Mediator.createSpaceship(msg.id);
			} else {
				var success = Math.random() > FAILURE_RATE ? true : false; //若随机数大于发送失败率则执行消息发送
				setTimeout(function() {
					if (success) {		// 按30%的丢包率发送消息
						spaceshipQueue.forEach((item) => {
							item.signalSystem(msg);
						});
					} else {
						miniConsole.log('指令丢包啦!');
					}
				}, 1000);
			}
		}

		/**
		 * [getspaceshipQueue 获取飞船队列]
		 * @returns {Array} spaceshipQueue(飞船队列)
		 */
		const getspaceshipQueue = () => {
			return spaceshipQueue;
		}

		return {
			createSpaceship,
			getspaceshipQueue,
			destroy,
			send
		}

	})();

	/**
	 * [Commander 指挥官]
	 * @return self
	 */
	const Commander = (() => {

		const commander = {
			id: 'Jason',
			rank: 'admiral',
			msgs: [],
			mediator: Mediator
		};
		
		commander.send = function(msgs) {
			this.msgs.push(msg);
			this.mediator.send(msg);
		}

		return commander;

	})();

	/**
	 * [Animate 动画工具，canvas绘制]
	 */
	const Animate = (() => {

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
		 * @param {Canvas} _ctx 目标画布
		 */
		const drawPlanet = (_ctx) => {
			const circle = (color, x, y, w, ) => {    
				_ctx.fillStyle = color;
				_ctx.beginPath();
				_ctx.arc(x, y, w, 0, Math.PI * 2, true);
				_ctx.closePath();
				_ctx.fill();
			}
			circle(PLANET_MCOLOR, SCREEN_CENTER_X, SCREEN_CENTER_Y, PLANET_RADIUS);	 // 创建行星
			circle(PLANET_COLOR, 380, 440, 40);
			circle(PLANET_COLOR, 320, 320, 25);
			circle(PLANET_COLOR, 280, 250, 15);
		}

		/**
		 * [drawOrbit 绘制轨道]
		 * @param {Canvas} _ctx 目标画布
		 */
		const drawOrbit = (_ctx) => {
			for (var i = 1; i < ORBIT_COUNT + 1; i++) {
				_ctx.strokeStyle = "#3e4059";
				_ctx.lineWidth = 3;
				_ctx.beginPath();
				_ctx.arc(SCREEN_CENTER_X, SCREEN_CENTER_Y, 150 + 45 * i, 0, 2 * Math.PI, false);
				_ctx.closePath();
				_ctx.stroke();
			}
		}

		/**
		 * [drawSpaceship 绘制飞船]
		 * @param {Canvas} _ctx 	  目标画布(cache画布)
		 * @param {Object} spaceship  飞船实例
		 * @return {Boolean}          绘画成功返回true，失败返回false
		 */
		const drawSpaceship = (spaceship) => {
			const spaceshipImg = new Image(),
				  _ctx = cacheCtx;
			spaceshipImg.src = 'img/min-iconfont-rocket-active.png';
			spaceshipImg.onload = function() {			
				try {
					_ctx.save();	// 保存画布原有状态
					_ctx.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y);	// 更改画布坐标系，将画布原点移到画布中心
					_ctx.rotate(-spaceship.deg * Math.PI / 180);		// 飞船角度
					
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

					//画飞船图片
					_ctx.drawImage(spaceshipImg, spaceship.orbit - SPACE_SIZE / 2, 0, SPACE_SIZE, SPACE_SIZE); 
					_ctx.restore();	// 恢复画布到原有状态
					
					shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);	// 清空飞船画布
					shipCtx.drawImage(cacheCanvas, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);  // 将缓存画布载入到飞船画布
					return true;
				} catch (error) {
					return false;
				}
			}
		}

		/**
		 * [refreshShip 刷新飞船队列画布]
		 * @param {Array} spaceships 飞船队列
		 */
		const refreshShip = spaceships => {
			if (spaceships !== undefined 
				|| spaceships.forEach(item => item !== undefined)
			) {
				cacheCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);   // 清空缓存画布
				for (var i = 0; i < spaceships.length; i++) {
					if (spaceships[i] !== undefined) {
						drawSpaceship(spaceships[i]);
					}
				}
			} else {
				shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);	// 清空飞船画布
			}
		}

		/**
		 * [animateLoop canvas绘制循环]
		 */
		const animateLoop = () => {
			requestAnimationFrame(animateLoop);
			refreshShip(Mediator.getspaceshipQueue());
		}

		/**
		 * [init 初始化canvas背景]
		 */
		const init = (() => {
			drawPlanet(planet_ctx);
			drawOrbit(planet_ctx);
			animateLoop();
		})();

		return {
			animateLoop,
			refreshShip,
			drawSpaceship
		}

	})();

	/**
	 * [message 生成消息命令格式]
	 * @param {Number} id 飞船id
	 * @param {String} commond 飞船命令
	 * @returns 
	 */
	const message = function(id, commond) {
		return {
			id: id,
			commond: commond
		}
	}

	/**
	 * [buttonHandel 按钮事件绑定]
	 */
	const buttonHandel = (function() {

		var command = document.querySelector('.command'),
			ships = Array.apply(null, Array(SPACE_COUNT)).map((item, i) => i + 1);	// 创建按飞船数量排列的数组，如[1, 2, 3, 4];
		
		/**
		 * [createBtn 创建按钮飞船对呀控制按钮]
		 * @returns {Number} 飞船id
		 */
		function createBtn () {
			ships = ships.sort((a, b) => a - b);	// 数组排序
			var id = ships.shift();					// 拿出数组第一项

			if (!id) {	// 如果id不存在
				miniConsole.log(`飞船总数超过总数量${SPACE_COUNT}了`)
				return false;
			}

			command.innerHTML += `
				<div class="shipCommand" data-id="${id}">
					<p>飞船${id}</p>
					<button class="fly">飞行</button>
					<button class="stop">停止</button>
					<button class="destroy">销毁</button>
				</div>
			`
			
			return id;
		}

		function btnEvent (e) {
			const target = e.target,
				  parent = target.parentNode;
			
			var id = parseInt(parent.getAttribute('data-id')),
				cmd = target.className;
				msg = message(id, cmd);
			
			if (target.nodeName === 'BUTTON') {
				switch (target.className) {
					case 'create':
						id = createBtn();
						msg = message(id, cmd);
						Commander.send(msg);
						break;

					case 'destroy':
						ships.unshift(id);
						console.log(ships);
						command.removeChild(parent);
						Commander.send(msg);
						break;

					case 'fly':
					case 'stop':
						Commander.send(msg);
						break;
				}
			}
		}

		addEvent(command, 'click', btnEvent);

	})();

	/**
	 * [miniConsole 控制台]
	 * @return {Function} log方法
	 */
	const miniConsole = (() => {

		const consoleBox = document.querySelector('.console');
		
		const log = function(value) {
			consoleBox.innerHTML += `<p>${value}</p>`;
			consoleBox.scrollTop = consoleBox.scrollHeight;
		}

		return {
			log
		}

	})();

})(window);


//跨浏览器事件绑定
function addEvent(element, event, hanlder) {
	if (element.addEventListener) {
		addEvent = function(element, event, hanlder) {
			element.addEventListener(event, hanlder, false);
		}
	} else if (element.attachEvent) {
		addEvent = function(element, event, hanlder) {
			element.attachEvent("on" + event, hanlder);
		}
	} else {
		addEvent = function(element, event, hanlder) {
			element["on" + event] = hanlder;
		}
	}

	addEvent(element, event, hanlder);
}