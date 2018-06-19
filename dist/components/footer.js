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
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        var imgStyle = {
            borderWidth: 0
        };
        return React.createElement("div", null,
            React.createElement("footer", { className: 'left' },
                React.createElement("div", null,
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " iannar.com"),
                React.createElement("div", null, this.props.icp)),
            React.createElement("footer", { className: 'right' },
                React.createElement("a", { rel: 'license', href: 'http://creativecommons.org/licenses/by-nc-sa/4.0/' },
                    React.createElement("img", { alt: 'Creative Commons License', style: imgStyle, src: '/assets/images/cc-by-nc-sa-4.0-88x31.png' }))));
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;
//# sourceMappingURL=footer.js.map