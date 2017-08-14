"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JTree = (function () {
    function JTree(config) {
        this.config = config;
        this.root = document.querySelector(this.config.root);
        this.data = this.config.data;
        console.log('object');
        this.init();
    }
    JTree.prototype.init = function () {
        console.log('object');
    };
    return JTree;
}());
exports.default = JTree;
//# sourceMappingURL=tree.js.map