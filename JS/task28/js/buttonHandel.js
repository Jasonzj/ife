(window => {
    /**
     * [message 生成消息命令格式]
     * @param {Number} id 飞船id
     * @param {String} commond 飞船命令
     * @returns 
     */
    const Message = (function () {
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
    const buttonHandel = (function () {

        let command = document.querySelector('.command'),
            system = document.querySelector('.system'),
            ships = Array.apply(null, Array(SPACE_COUNT)).map((item, i) => i + 1); // 创建按飞船数量排列的数组，如[1, 2, 3, 4];

        /**
         * [createBtn 创建按钮飞船对呀控制按钮]
         * @returns {Number} 飞船id
         */
        function createBtn() {
            ships = ships.sort((a, b) => a - b); // 数组排序
            let id = ships.shift(); // 拿出数组第一项

            if (!id) { // 如果id不存在
                Commander.miniConsole.log(`飞船总数超过总数量${SPACE_COUNT}了`)
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
        function btnEvent(e) {
            const target = e.target,
                parent = target.parentNode;

            let id = parseInt(parent.getAttribute('data-id')), // 获取按钮指令对应的id
                cmd = target.className, // 获取按钮指令对应的class(指令)
                msg = Message.setMessage("id", id, "commond", cmd), // 设置msg的id和commond
                spaceshipQueue = SpaceshipGlobal.getQueue();  // 从全局飞船管理获得飞船队列

            // 控制台按钮
            if (target.nodeName === 'BUTTON') {
                switch (target.className) {
                    case 'create':
                        id = createBtn(); // 获取新创建的id
                        msg = Message.setMessage("id", id);
                        Commander.send(msg, spaceshipQueue);
                        Message.init();
                        break;

                    case 'destroy':
                        ships.unshift(id);
                        command.removeChild(parent);
                        Commander.send(msg, spaceshipQueue);
                        break;

                    case 'fly':
                    case 'stop':
                        Commander.send(msg, spaceshipQueue);
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
        const init = () => {
            addEvent(command, 'click', btnEvent);
        };

        return {
            init
        }

    })();

    window.buttonHandel = buttonHandel;

})(window);


//跨浏览器事件绑定
function addEvent(element, event, hanlder) {
    if (element.addEventListener) {
        addEvent = function (element, event, hanlder) {
            element.addEventListener(event, hanlder, false);
        }
    } else if (element.attachEvent) {
        addEvent = function (element, event, hanlder) {
            element.attachEvent("on" + event, hanlder);
        }
    } else {
        addEvent = function (element, event, hanlder) {
            element["on" + event] = hanlder;
        }
    }

    addEvent(element, event, hanlder);
}