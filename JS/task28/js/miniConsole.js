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