/*
 * @Author: Jason 
 * @Date: 2017-06-20 19:59:05 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-20 20:08:40
 */

(window => {

    /**
     * [Planet 行星类]
     * @class Planet
     */
    class God_Planet {
        constructor() {
            this.bus = BUS;
            this.adapter = Adapter;
            this.miniConsole = miniConsole;
            this.DC = DC;
        }

        /**
         * [init 初始化行星]
         * @memberof God_Planet
         */
        init() {
            Animate.init();
        }

        /**
         * [send 行星信号发射器]
         * @param {Object} msg 要发送的指令对象
         * @param {Array, Object} 传送的目标数组或目标对象 
         * @memberof God_Planet
         */
        send(msg, from) {
            this.msgs.push(msg);
            this.bus.send(msg, from);
        }

        /**
         * [signalSystem 行星信号接收器]
         * @param {msg} msg 接收的指令对象
         * @memberof God_Planet
         */
        signalSystem(msg) {
            this.DC.dispose(msg);    
        }

    }

    /**
     * [Commander 指挥官类]
     * @class Commander
     * @extends {Planet}
     */
    class God_Commander extends God_Planet {
        constructor() {
            super();
            this.id = "Jason",
            this.rank = "admiral",
            this.msgs = []      // 消息队列
        }
    }

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

            let newSpaceship = null,
                systems = SpaceshipGlobal.getSystem().spaceshipSystem, // 获取能源和引擎数组
                systemValues = SpaceshipGlobal.getSystem().spaceshipSystemValues;  // 获取能源和引擎字符串数组

            newSpaceship = new Spaceship( // 新建飞船实例，根据指令选择不同能源和引擎
                msg.id,     // 飞船编号
                systems[msg.engine - 1],    // 飞船动力系统速度
                systems[msg.energy - 1],    // 飞船能源系统速度
                msg.engine,     // 飞船动力系统下标
                msg.energy      // 飞船动力系统下标
            );

            SpaceshipGlobal.pushShip(newSpaceship); // 将新飞船实例压进数组

            Commander.miniConsole.log(`创建飞船${msg.id}成功, 引擎系统为${systemValues[msg.engine - 1]},能源系统为${systemValues[msg.energy - 1]}`);
        }

        /**
         * [destroy 飞船自爆]
         * @param {Object} spaceship 飞船实例
         */
        const destroy = (spaceship) => {
            if (spaceship instanceof Spaceship) {
                SpaceshipGlobal.removeShip(spaceship);
                Commander.miniConsole.log(`飞船${spaceship.id}自爆啦`);
            }
        }

        /**
         * [send 传播消息方法，采用广播传播消息的方式]
         * @param {Object} msg 指令消息
         * @param {Array||Object} from 广播目标
         */
        const send = (msg, from) => {
            if (msg.commond === "create") { // 如果指令是创建飞船则执行创建飞船
                BUS.createSpaceship(msg);
                return false;
            } 

            if (msg instanceof Object) {    // 如果是对象就加密
                msg = Adapter.encrypt(msg.id, msg.commond);
            } 

            // 传递信息有多次重试机会在10%的丢包率下保证传递成功
            var timer = setInterval(function () {
                const success = Math.random() > FAILURE_RATE ? true : false; // 若随机数大于发送失败率则执行消息发送
                if (success) {
                    clearInterval(timer);
                    if (from instanceof Array) {    // 如果是数组则是行星广播飞船
                        from.forEach((item) => {
                            item.signalSystem(msg);
                        });
                        return false;
                    }          
                    from.signalSystem(msg);         // 飞船广播行星           
                }
            }, 300);
        }

        return {
            createSpaceship,
            destroy,
            send
        }

    })();

    /**
     * [Adapter 指令转换方法]
     */
    const Adapter = (function () {

        /**
         * [adapter 命令解码器]
         * @param {Number} msg 
         * @returns {Object} JSON指令 { id: 0, commadn: ""}
         */
        const decrypt = (msg) => {
            const command = {
                id: "",
                commond: ""
            };

            command.id = parseInt(msg.substr(0, 4).substr(command.id.length - 1, 1)); // 截取前4位字符串的最后一个字符

            switch (msg.substr(4, 4)) { // 截取命令后四位
                case "0001":
                    command.commond = "fly";
                    break;
                case "0010":
                    command.commond = "stop";
                    break;
                case "1100":
                    command.commond = "destroy";
                    break;
            }

            if (msg.length > 8) {   // 判断二进制大于八则表示有power指令
                let engine = msg.substr(10, 1),
                    energy = msg.substr(11, 1),
                    power = parseInt(msg.substr(msg.length - 2, 2)),    // 截取最后2位
                    systemValues = SpaceshipGlobal.getSystem().spaceshipSystemValues;  // 获取能源和引擎字符串数组
                
                // engine, energy 动力，能源
                command.engine = systemValues[engine - 1];
                command.energy = systemValues[energy - 1];

                // power能耗
                if (power == 00) {
                    power = 100;
                }

                command.power = power;
            }

            return command;
        }

        /**
         * [adapter 命令加密器]
         * @param {Object} msg 指挥官传送的指令
         * @returns {Number} message 加密后的二进制的指令
         */
        const encrypt = (id, commond, power, engine, energy) => {
            let message = null;

            switch (id) {
                case 1:
                case 2:
                case 3:
                case 4:
                    message = "000" + id;
                    break;
            }

            switch (commond) {
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

            if (power || engine || energy) {    
                message += "00" + engine + energy;
                message += "00" + ~~power;
            }

            return message;
        }

        return {
            encrypt,
            decrypt
        }

    })();

    /**
     * [miniConsole 控制台]
     * @return {Function} log方法
     */
    const miniConsole = (() => {

        const consoleBox = document.querySelector('.console');

        const log = function (value) {
            consoleBox.innerHTML += `<p>${value}</p>`;
            consoleBox.scrollTop = consoleBox.scrollHeight;
        }

        return {
            log
        }

    })();

    /**
     * [DC 数据处理中心]
     */
    const DC = (() => {
        
        const data = {},
              tbody = document.querySelector('.monitor-body');


        /**
         * [dispose 处理收到的数据]
         * @param {any} msg 
         */
        const dispose = (msg) => {
            const message = Planet.adapter.decrypt(msg);

            data[message.id] = {
                id: message.id,
                engine: message.engine,
                energy: message.energy,
                commond: message.commond,
                power: message.power
            }

            if (message.commond == 'destroy') {     // 如果飞船毁灭则删除
                delete data[message.id];
            }

            monitorRender(data);
        }

        /**
         * [monitorRender 渲染数据显示]
         * @param {Object} data 要显示地数据
         */
        const monitorRender = (data) => {
            tbody.innerHTML = "";
            for (key in data) {
                const tr = document.createElement('tr');
                for (attr in data[key]) {
                    const td = document.createElement('td');
                    td.innerHTML = data[key][attr];
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
        }

        return {
            dispose
        }

    })();

    // 接口
    window.God_Planet = God_Planet;
    window.God_Commander = God_Commander;
    window.BUS = BUS;

})(window);