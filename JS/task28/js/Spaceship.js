(window => {

    /**
     * [Spaceship 飞船类]
     * @class Spaceship
     */
    class Spaceship {
        constructor(id, speed, powerSpeed, engine, energy) {
            this.id = id;   //飞船编号
            this.deg = 0;   //飞船初始角度
            this.power = 100;       //飞船初始能源
            this.state = "stop";    //飞船初始状态
            this.orbit = 150 + 45 * id;     //飞船初始轨道
            this.timer = null;
            this.speed = speed;     //飞船速度
            this.powerSpeed = powerSpeed;      //飞船充电速度
            this.engine = engine;
            this.energy = energy;
            this.adapter = Planet.adapter;     //安装指令转换器

            this.signalsend();
        }

        /**
         * [engineSystem 飞船动力系统(引擎) 控制飞船的飞行和停止]
         * @returns {Object} fly(飞行)方法，stop(停止)方法
         */
        engineSystem() {
            const self = this;

            /**
             * [fly 飞行方法]
             */
            const fly = function () {
                if (self.power > 0) {   // 如果电量大于0则可飞行
                    self.timer = setInterval(function () {
                        self.deg += self.speed;
                        if (self.deg >= 360) self.deg = 0;
                    }, 20);
                    Planet.miniConsole.log(`飞船${self.id} 号起飞`);
                }
            };

            /**
             * [stop 停止方法]
             */
            const stop = function () {
                clearInterval(self.timer);
                Planet.miniConsole.log(`飞船${self.id} 号停止`);
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
        powerSystem() {
            const self = this;

            /**
             * [charge 飞船充电方法]
             */
            const charge = function () {
                var timer = setInterval(function () {
                    if (self.state === 'destroy') {
                        clearInterval(timer);
                        return false;
                    }
                    if (self.power >= 101) {
                        clearInterval(timer);
                        self.power = 100;
                        return false;
                    }

                    self.power += self.powerSpeed;
                    return true;
                }, 20);
                Planet.miniConsole.log(`飞船${self.id} 号充电`);
            }

            /**
             * [charge 飞船放电方法]
             */
            const discharge = function () {
                var timer = setInterval(function () {
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
                Planet.miniConsole.log(`飞船${self.id} 号放电`);
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
        stateSystem() {
            const self = this,
                states = { // 状态对象
                    fly() {
                        self.state = 'fly';
                        self.engineSystem().fly();
                        self.powerSystem().discharge();
                        self.powerSystem().charge();
                    },
                    stop() {
                        self.state = 'stop';
                        self.engineSystem().stop();
                    },
                    destroy() {
                        self.state = 'destroy';
                        BUS.destroy(self);
                    }
                }

            // 切换状态方法
            const changeState = function (state) {
                states[state] && states[state]();
                Planet.miniConsole.log(`飞船${self.id} 状态为 ${self.state}`);
            }

            return {
                changeState
            }
        }

        /**
         * [signalSystem 飞船信号系统，接受来自太空的信号，并通知状态系统完成状态切换]
         * @param {Object} msg 指令
         */
        signalSystem(msg) {
            const self = this,
                  command = self.adapter.decrypt(msg); // 将二进制命令格式解码转换成JSON格式

            if (self.state !== command.commond && command.id === self.id) {
                self.stateSystem().changeState(command.commond);
            }

        }

        /**
         * [signalsend 飞船信号发射器]
         */
        signalsend() {
            const self = this;
    
            const timer = setInterval(function() {

                const msg = self.adapter.encrypt(   // 将JSON格式状态指令转换成二进制
                    self.id, 
                    self.state, 
                    self.power, 
                    self.engine,
                    self.energy
                );  

                BUS.send(msg, Planet);     // 利用BUS介质广播自身状态给行星

                if (self.state === 'destroy') {
                    clearInterval(timer);
                    return false;
                }

            }, 1000);
        }

        /**
         * 指令格式: {
         *     id: 0,
         * 	   commond: 'fly'
         * }
         */

        /**
         * 状态指令格式(JSON): {
         *     id: 0,
         * 	   commond: 'fly',
         *     power: 88,
         *     engine: "无动力模式",
         *     energy: "慢回复"
         * }
         */

        /************************************ *
         * 状态指令格式(二进制):                 *
         * ********************************** *
         * 0001   0010   0014           0088  *
         * id    state   engine,energy  power *
         * ********************************** */
    }

    /**
     * [SpaceshipGlobal 飞船全局管理]
     */
    const SpaceshipGlobal = (() => {

        let spaceshipQueue = [], //存储飞船队列
            spaceshipSystem = [SPACE_SPEED, SPACE_SPEED2, SPACE_SPEED3, SPACE_CHAGE, SPACE_CHAGE2, SPACE_CHAGE3], // 存储飞船引擎和能源系统
            spaceshipSystemValues = ["无动力模式", "巡航模式", "高速模式", "慢回复", "快速回复", "光能驱动永久型"];

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
            spaceshipQueue[spaceship.id - 1] = spaceship;
        }

        /**
         * [getQueue 获取飞船队列]
         * @returns {Array} spaceshipQueue(飞船队列)
         */
        const getQueue = () => {
            return spaceshipQueue;
        }

        const getSystem = () => {
            return {
                spaceshipSystem,
                spaceshipSystemValues
            }
        }

        return {
            pushShip,
            removeShip,
            getSystem,
            getQueue
        }

    })();

    // 接口
    window.Spaceship = Spaceship;
    window.SpaceshipGlobal = SpaceshipGlobal;

})(window);