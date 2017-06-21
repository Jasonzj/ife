// let Commander = null,         // 指挥官
//     Planet = null;            // 行星

var SPACE_SPEED = 0.5, // 飞船飞行速度
    SPACE_SPEED2 = 1, // 飞船飞行速度
    SPACE_SPEED3 = 1.5, // 飞船飞行速度
    SPACE_SIZE = 40, // 飞船大小
    SPACE_COUNT = 4, // 飞船数量
    SPACE_CHAGE = 0.6, // 飞船充电速度
    SPACE_CHAGE2 = 0.8, // 飞船充电速度
    SPACE_CHAGE3 = 1, // 飞船充电速度
    SPACE_DISCHARGE = 1, // 飞船放电速度
    POWERBAR_POS_OFFSET = 5, // 电量条位置位移
    POWERBAR_COLOR_GOOD = '#70ed3f', // 电量良好状态颜色
    POWERBAR_COLOR_MEDIUM = '#fccd1f', // 电量良好状态颜色
    POWERBAR_COLOR_BAD = '#fb0000', // 电量良好状态颜色
    POWERBAR_WIDTH = 5, // 电量条宽度
    SCREEN_WIDTH = 700, // canvas宽度
    SCREEN_HEIGHT = 700, // canvas高度
    SCREEN_CENTER_X = SCREEN_WIDTH / 2, // canvas X轴中心坐标
    SCREEN_CENTER_Y = SCREEN_HEIGHT / 2, // canvas Y轴中心坐标
    PLANET_RADIUS = 150, // 行星半径
    PLANET_MCOLOR = '#3498DB', // 行星主色调
    PLANET_COLOR = '#2980B9', // 行星副色调
    ORBIT_COUNT = 4, // 轨道数量
    FAILURE_RATE = 0.1, // 消息丢包率
    // requestAnimationFrame兼容
    requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame
