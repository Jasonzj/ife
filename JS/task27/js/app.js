/*
 * @Author: Jason 
 * @Date: 2017-06-14 19:36:13 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-19 15:46:57
 */

;
(window => {
    
    const SPACE_SPEED = 0.5,  	  // 飞船飞行速度
          SPACE_SPEED2 = 1,       // 飞船飞行速度
          SPACE_SPEED3 = 1.5,     // 飞船飞行速度
          SPACE_SIZE = 40,		  // 飞船大小
          SPACE_COUNT = 4,		  // 飞船数量
          SPACE_CHAGE = 0.3,	  // 飞船充电速度
          SPACE_CHAGE2 = 0.6,	  // 飞船充电速度
          SPACE_CHAGE3 = 1,		  // 飞船充电速度
          SPACE_DISCHARGE = 1,  // 飞船放电速度

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
          FAILURE_RATE = 0.1,		 // 消息丢包率
          
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
            constructor (id, speed, powerSpeed) {
                this.id = id;	
                this.deg = 0;
                this.power = 99.9;
                this.state = "stop";
                this.orbit = 150 + 45 * id;
                this.timer = null;
                this.speed = speed;
                this.powerSpeed = powerSpeed;
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
                            self.deg += self.speed;
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
                        if (self.state === 'destroy') {
                            clearInterval(timer);
                            return false;
                        }
                        if (self.power >= 100) {
                            clearInterval(timer);
                            self.power = 100;
                            return false;
                        }

                        self.power += self.powerSpeed;
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
                              self.powerSystem().charge();
                          },
                          stop () {
                              self.state = 'stop';
                              self.engineSystem().stop();
                          },
                          destroy () {
                              self.state = 'destroy';
                              BUS.destroy(self);
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
                const self = this,
                      command = self.adapter(msg); 	// 将二进制命令格式解码转换成JSON格式
                
                if (self.state !== command.commond && command.id === self.id) {
                    self.stateSystem().changeState(command.commond);
                }

            }

            /**
             * [adapter 命令解码器]
             * @param {Number} msg 
             * @returns {Object} JSON指令 { id: 0, commadn: ""}
             */
            adapter (msg) {
                const command = { id: "", commond: "" };
                
                command.id = parseInt(msg.substr(0, 4).substr(command.id.length - 1, 1));	 // 截取前4位字符串的最后一个字符

                switch (msg.substr(4, 4)) {		// 截取命令后四位
                    case "0001": command.commond = "fly"; break;
                    case "0010": command.commond = "stop"; break;
                    case "1100": command.commond = "destroy"; break;
                }

                return command;
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
     * [SpaceshipGlobal 飞船全局管理]
     */
    const SpaceshipGlobal = (() => {

        let spaceshipQueue = [];	//存储飞船队列
        let spaceshipSystem = [SPACE_SPEED, SPACE_SPEED2, SPACE_SPEED3, SPACE_CHAGE, SPACE_CHAGE2, SPACE_CHAGE3];  // 存储飞船引擎和能源系统

        /**
         * [delete 删除飞船方法]
         * @param {Object} spaceship 飞船实例(要删除的飞船)
         */
        const removeShip = spaceship => {
            delete spaceshipQueue[spaceship.id - 1];
        }

        /**
         * [push push飞船队列方法]
         * @param {Object} spaceship 飞船实例(要压入的飞船)
         */
        const pushShip = spaceship => {
            spaceshipQueue.push(spaceship);
        }

        /**
         * [getQueue 获取飞船队列]
         * @returns {Array} spaceshipQueue(飞船队列)
         */
        const getQueue = () => {
            return spaceshipQueue;
        }

        const getSystem = () => {
            return spaceshipSystem;
        }

        return {
            pushShip,
            removeShip,
            getSystem,
            getQueue
        }

    })();

    /**
     * [BUS 传播消息，专门负责让不同对象之间进行消息传递，并保存飞船队列, BUS介质非常先进，可以创建飞船和控制飞船自爆]
     * @return {Object} createSpaceship(创建飞船) destroy(飞船自毁) send(广播指令)
     */
    const BUS = (() => {

        /**
         * [createSpaceship 创建飞船]
         * @param {Number} id 飞船的id
         */
        const createSpaceship = (msg) => {

            if (msg.id === false) return false;

            let newSpaceship  = null	
                systems = SpaceshipGlobal.getSystem(),	// 获取能源和引擎数组
                systemValues = ["无动力模式", "巡航模式", "高速模式", "慢回复", "快速回复", "光能驱动永久型"];

            newSpaceship = new Spaceship(msg.id, systems[msg.engine - 1], systems[msg.energy - 1]); 	// 新建飞船实例，根据指令选择不同能源和引擎

            SpaceshipGlobal.pushShip(newSpaceship);     // 将新飞船实例压进数组

            miniConsole.log(`创建飞船${msg.id}成功, 引擎系统为${systemValues[msg.engine - 1]},能源系统为${systemValues[msg.energy - 1]}`);

        }

        /**
         * [destroy 飞船自爆]
         * @param {Object} spaceship 飞船实例
         */
        const destroy = (spaceship) => {
            if (spaceship instanceof Spaceship) {
                SpaceshipGlobal.removeShip(spaceship);
                miniConsole.log(`飞船${spaceship.id}自爆啦`);
            }
        }

        /**
         * [send 传播消息方法，采用广播传播消息的方式]
         * @param {Object} msg 指令消息
         */
        const send = (msg) => {
            const spaceshipQueue = SpaceshipGlobal.getQueue();	// 从全局飞船管理获得飞船队列
            if (msg.commond === "create") {		// 如果指令是创建飞船则执行创建飞船
                BUS.createSpaceship(msg);
            } else {
                const success = Math.random() > FAILURE_RATE ? true : false,  // 若随机数大于发送失败率则执行消息发送
                      command = adapter(msg);

                // 传递信息有多次重试机会在10%的丢包率下保证传递成功
                var timer = setInterval(function() {	
                    if (success) {
                        clearInterval(timer);
                        spaceshipQueue.forEach((item) => {
                            item.signalSystem(command);
                        });
                    } 
                }, 300);
            }
        }

        /**
         * [adapter 命令加密器]
         * @param {Object} msg 指挥官传送的指令
         * @returns {Number} message 加密后的二进制的指令
         */
        const adapter = (msg) => {
            let message = null;

            switch (msg.id) {
                case 1:
                case 2:
                case 3:
                case 4:
                    message = "000" + msg.id;
                    break;
            }
            
            switch (msg.commond) {
                case "fly":
                    message += "0001";
                    break;
                
                case "stop":
                    message += "0010";
                    break;				

                case "destroy":
                    message += "1100";
                    break;
            }

            return message;
        }

        return {
            createSpaceship,
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
            msgs: [],	// 消息队列
            bus: BUS	// Bus介质(Bus介质归指挥官拥有)
        };
        
        commander.send = function(msgs) {
            this.msgs.push(msg);
            this.bus.send(msg);
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
            const circle = (color, x, y, w) => {    
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
        const refreshShip = (spaceships = undefined) => {
            if (spaceships !== undefined) {
                cacheCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);   // 清空缓存画布
                for (var i = 0; i < spaceships.length; i++) {
                    if (spaceships[i] !== undefined) {		// 如果飞船存在
                        drawSpaceship(spaceships[i]);
                    } else if (spaceships.every(item => item === undefined)) {	// 如果队列所有都为undefined
                        shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);	// 清空飞船画布
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
            const spaceshipQueue = SpaceshipGlobal.getQueue();
            refreshShip(spaceshipQueue);
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
    const Message = (function() {
        const command = {
            id: null,
            commond: null,
            engine: "1",
            energy: "4"
        }

        const setMessage = (name, msg, name2, msg2) => {
            command[name] = msg;
            if (name2) {
                command[name2] = msg2;
            }
            return command;
        }

        const init = () => {
            command.engine = "1";
            command.energy = "4";
        }

        return {
            setMessage,
            init
        }
    })();

    /**
     * [buttonHandel 按钮事件绑定]
     */
    const buttonHandel = (function() {

        var command = document.querySelector('.command'),
            system = document.querySelector('.system'),
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

        /**
         * [btnEvent 按钮事件处理]
         * @param {Event} e 
         */
        function btnEvent (e) {
            const target = e.target,
                  parent = target.parentNode;
            
            let id = parseInt(parent.getAttribute('data-id')),	// 获取按钮指令对应的id
                cmd = target.className;							// 获取按钮指令对应的class(指令)
                msg = Message.setMessage("id", id, "commond", cmd);	// 设置msg的id和commond
            
            // 控制台按钮
            if (target.nodeName === 'BUTTON') {		
                switch (target.className) {
                    case 'create':		
                        id = createBtn();	// 获取新创建的id
                        msg = Message.setMessage("id", id);
                        Commander.send(msg);
                        Message.init();
                        break;

                    case 'destroy':
                        ships.unshift(id);
                        command.removeChild(parent);
                        Commander.send(msg);
                        break;

                    case 'fly':
                    case 'stop':
                        Commander.send(msg);
                        break;
                }
            }

            // 控制台radio
            if (target.nodeName === "INPUT") {
                switch (target.value) {
                    case "1":
                    case "2":
                    case "3":
                        Message.setMessage("engine", target.value);
                        break;

                    case "4":
                    case "5":
                    case "6":
                        Message.setMessage("energy", target.value);
                        break;
                }
            }

        }

        // 初始化绑定事件
        const init = (() => {
            addEvent(command, 'click', btnEvent);
        })();

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
