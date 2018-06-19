"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var spectacle_1 = require("spectacle");
var _11_md_1 = require("../../mass/b/11.md");
var Mass = /** @class */ (function (_super) {
    __extends(Mass, _super);
    function Mass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mass.prototype.render = function () {
        return React.createElement(spectacle_1.Deck, null,
            React.createElement(spectacle_1.Markdown, { source: _11_md_1.default }));
    };
    return Mass;
}(React.Component));
exports.Mass = Mass;
//# sourceMappingURL=mass.js.map