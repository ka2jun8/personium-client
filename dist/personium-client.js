var PersoniumClient =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @private
 */
function isString(val) {
    return Object.prototype.toString.call(val) === "[object String]";
}
exports.isString = isString;
/**
 * @private
 */
function isNumber(val) {
    return Object.prototype.toString.call(val) === "[object Number]";
}
exports.isNumber = isNumber;
/**
 * @private
 */
function isBoolean(val) {
    return Object.prototype.toString.call(val) === "[object Boolean]";
}
exports.isBoolean = isBoolean;
/**
 * @private
 */
function isUndefined(val) {
    return Object.prototype.toString.call(val) === "[object Undefined]";
}
exports.isUndefined = isUndefined;
/**
 * @private
 */
function isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
}
exports.isObject = isObject;
/**
 * @private
 */
function isArray(val) {
    return Object.prototype.toString.call(val) === "[object Array]";
}
exports.isArray = isArray;
/**
 * @private
 */
function isInteger(value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
}
exports.isInteger = isInteger;
/**
 * Retrieve the Unicode code point at the specified index in the specified
 * string.
 *
 * @param str The string from which to retrieve the Unicode code point.
 * @param index The specified index.
 *
 * @returns The Unicode code point at the specified position.
 *
 * @private
 */
function getCodePoint(str, index) {
    if (index < 0 || index >= str.length) {
        throw new Error("invalid index for specified string");
    }
    var first = str.charCodeAt(index);
    if (first >= 0xD800 && first <= 0xDBFF && str.length > index + 1) {
        var second = str.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }
    return first;
}
exports.getCodePoint = getCodePoint;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
/**
 * Represents an XML node.
 *
 * This class is the root class of the XML node hierarchy. It should not be
 * directly instantiated; one of its subclasses should be used instead.
 *
 * @protected
 */
var XmlNode = (function () {
    /**
     * Initializes a new instance of the {@link XmlNode} class.
     */
    function XmlNode() {
        this._parent = undefined;
        this._children = [];
    }
    Object.defineProperty(XmlNode.prototype, "parent", {
        /**
         * Gets the parent of this node.
         *
         * @returns The parent of this node.
         */
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets this node's children.
     *
     * Throws an exception if this node cannot have any children. Consult the
     * appropriate subclass documentation for more details.
     *
     * @returns This node's children.
     */
    XmlNode.prototype.children = function () {
        return this._children.slice();
    };
    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Throws an exception if this node cannot have any children, or if the
     * specified node cannot be added at the specified index. Consult the
     * appropriate subclass documentation for more details.
     *
     * @param node The node to insert.
     * @param index The index at which to insert the node. Nodes at or after
     *              the index are shifted to the right. If no index is
     *              specified, the node is inserted at the end.
     *
     * @returns The node inserted into this node's children, or undefined if no
     *          node was inserted.
     */
    XmlNode.prototype.insertChild = function (node, index) {
        if (index === void 0) { index = this._children.length; }
        if (!(node instanceof XmlNode)) {
            throw new TypeError("node should be an instance of XmlNode");
        }
        else if (!utils_1.isNumber(index) || !utils_1.isInteger(index)) {
            throw new TypeError("index should be an integer");
        }
        else if (index < 0 || index > this._children.length) {
            throw new RangeError("index should respect children array bounds");
        }
        if (this._children.indexOf(node) === -1) {
            if (!utils_1.isUndefined(node.parent)) {
                node.parent.removeChild(node);
            }
            node._parent = this;
            this._children.splice(index, 0, node);
            return node;
        }
        return undefined;
    };
    /**
     * Gets the node that follows this one, or undefined if no such node
     * exists or if this node has no parent.
     *
     * @returns The node that follows this one, or undefined if no such node
     *          exists or if this node has no parent.
     */
    XmlNode.prototype.next = function () {
        if (utils_1.isUndefined(this.parent)) {
            return undefined;
        }
        else if (this.parent._children.indexOf(this)
            === this.parent._children.length - 1) {
            return undefined;
        }
        return this.parent._children[this.parent._children.indexOf(this) + 1];
    };
    /**
     * Gets the node that is previous to this one, or undefined if no such node
     * exists or if this node has no parent.
     *
     * @returns The node that is previous to this one, or undefined if no such
     *          node exists or if this node has no parent.
     */
    XmlNode.prototype.prev = function () {
        if (utils_1.isUndefined(this.parent)) {
            return undefined;
        }
        else if (this.parent._children.indexOf(this) === 0) {
            return undefined;
        }
        return this.parent._children[this.parent._children.indexOf(this) - 1];
    };
    /**
     * Removes this node from its parent if this node has a parent.
     *
     * @returns This node's parent, or undefined if it has no parent.
     */
    XmlNode.prototype.remove = function () {
        if (!utils_1.isUndefined(this.parent)) {
            var parent_1 = this.parent;
            this.parent.removeChild(this);
            return parent_1;
        }
        return undefined;
    };
    /**
     * Removes the specified node from this node's children.
     *
     * Throws an exception if this node cannot have any children, or if the
     * specified node cannot be removed. Consult the appropriate subclass
     * documentation for more details.
     *
     * @param node The node to remove.
     *
     * @returns Whether a node was removed.
     */
    XmlNode.prototype.removeChild = function (node) {
        if (!(node instanceof XmlNode)) {
            throw new Error("node should be an instance of XmlNode");
        }
        var index = this._children.indexOf(node);
        if (index !== -1) {
            node._parent = undefined;
            this._children.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * Removes the node at the specified index from this node's children.
     *
     * Throws an exception if this node cannot have any children, or if the
     * node at the specified index cannot be removed. Consult the appropriate
     * subclass documentation for more details.
     *
     * @param index The index at which the node to be removed is located.
     *
     * @returns The node that was removed.
     */
    XmlNode.prototype.removeChildAtIndex = function (index) {
        if (!utils_1.isNumber(index) || !utils_1.isInteger(index)) {
            throw new TypeError("index should be a number");
        }
        else if (index < 0 || index >= this._children.length) {
            throw new RangeError("index should respect children array bounds");
        }
        var node = this._children[index];
        node._parent = undefined;
        this._children.splice(index, 1);
        return node;
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlNode.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        throw new Error("toString not implemented for XmlNode");
    };
    /**
     * Returns the root node of the current hierarchy. If this node has no
     * parent, this node itself is returned.
     *
     * @returns The root node of the current hierarchy.
     */
    XmlNode.prototype.top = function () {
        if (utils_1.isUndefined(this.parent)) {
            return this;
        }
        else {
            return this.parent.top();
        }
    };
    /**
     * Gets the parent of this node.
     */
    XmlNode.prototype.up = function () {
        return this.parent;
    };
    return XmlNode;
}());
exports.default = XmlNode;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Verifies that the specified string only contains characters permitted by the
 * XML specification.
 *
 * @param str The string to validate.
 *
 * @returns Whether the specified string only contains characters permitted by
 *          the XML specification.
 *
 * @private
 */
function validateChar(str) {
    var charRegex = "\\u0009|\\u000A|\\u000D|[\\u0020-\\uD7FF]|"
        + "[\\uE000-\\uFFFD]";
    var surrogateCharRegex = "[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]";
    return new RegExp("^((" + charRegex + ")|(" + surrogateCharRegex + "))*$")
        .test(str);
}
exports.validateChar = validateChar;
/**
 * Verifies that the specified string only contains a single character, and
 * that this character is permitted by the XML specification.
 *
 * @param str The string to validate.
 *
 * @returns Whether the specified string only contains a single character, and
 *          that this character is permitted by the XML specification.
 *
 * @private
 */
function validateSingleChar(str) {
    if (str.length === 1) {
        return new RegExp("^\\u0009|\\u000A|\\u000D|[\\u0020-\\uD7FF]|"
            + "[\\uE000-\\uFFFD]$").test(str);
    }
    else if (str.length === 2) {
        return new RegExp("^[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]$").test(str);
    }
    else {
        return false;
    }
}
exports.validateSingleChar = validateSingleChar;
/**
 * Verifies that the specified string only contains characters permitted by the
 * XML specification for names.
 *
 * @param str The string to validate.
 *
 * @returns Whether the specified string only contains characters permitted by
 *          the XML specification for names.
 *
 * @private
 */
function validateName(str) {
    if (str.length === 0) {
        return false;
    }
    var nameStartChar = ":|[A-Z]|_|[a-z]|[\\u00C0-\\u00D6]|[\\u00D8-\\u00F6]"
        + "|[\\u00F8-\\u02FF]|[\\u0370-\\u037D]"
        + "|[\\u037F-\\u1FFF]|[\\u200C-\\u200D]"
        + "|[\\u2070-\\u218F]|[\\u2C00-\\u2FEF]"
        + "|[\\u3001-\\uD7FF]|[\\uF900-\\uFDCF]"
        + "|[\\uFDF0-\\uFFFD]";
    var nameStartCharWithSurrogatePair = "[\\uD800-\\uDB7F][\\uDC00-\\uDFFF]";
    var nameChar = nameStartChar + "|-|\\.|[0-9]|\\u00B7|[\\u0300-\\u036F]" +
        "|[\\u203F-\\u2040]";
    var nameCharWithSurrogatePair = nameChar + "|" +
        nameStartCharWithSurrogatePair;
    if (new RegExp("^" + nameStartChar + "$").test(str.charAt(0))) {
        if (str.length === 1) {
            return true;
        }
        return new RegExp("^(" + nameCharWithSurrogatePair + ")+$")
            .test(str.substr(1));
    }
    else if (str.length >= 2) {
        if (new RegExp("^" + nameStartCharWithSurrogatePair + "$")
            .test(str.substr(0, 2))) {
            if (str.length === 2) {
                return true;
            }
            return new RegExp("^(" + nameCharWithSurrogatePair + ")+$")
                .test(str.substr(2));
        }
    }
    return false;
}
exports.validateName = validateName;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var utils_1 = __webpack_require__(0);
/**
 * Implementation of the IStringOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
var StringOptions = (function () {
    function StringOptions(stringOptions) {
        if (stringOptions === void 0) { stringOptions = {}; }
        this.doubleQuotes = false;
        this.indent = "    ";
        this.newline = "\n";
        this.pretty = true;
        if (!utils_1.isObject(stringOptions)) {
            throw new TypeError("options should be an Object or undefined");
        }
        if (!utils_1.isBoolean(stringOptions.doubleQuotes)) {
            if (!utils_1.isUndefined(stringOptions.doubleQuotes)) {
                throw new TypeError("options.doubleQuotes should be a boolean"
                    + " or undefined");
            }
        }
        else {
            this.doubleQuotes = stringOptions.doubleQuotes;
        }
        if (!utils_1.isString(stringOptions.indent)) {
            if (!utils_1.isUndefined(stringOptions.indent)) {
                throw new TypeError("options.indent should be a string"
                    + " or undefined");
            }
        }
        else {
            this.indent = stringOptions.indent;
        }
        if (!utils_1.isString(stringOptions.newline)) {
            if (!utils_1.isUndefined(stringOptions.newline)) {
                throw new TypeError("options.newline should be a string"
                    + " or undefined");
            }
        }
        else {
            this.newline = stringOptions.newline;
        }
        if (!utils_1.isBoolean(stringOptions.pretty)) {
            if (!utils_1.isUndefined(stringOptions.pretty)) {
                throw new TypeError("options.pretty should be a boolean"
                    + " or undefined");
            }
        }
        else {
            this.pretty = stringOptions.pretty;
        }
    }
    return StringOptions;
}());
exports.StringOptions = StringOptions;
/**
 * Implementation of the IDeclarationOptions interface used to provide default
 * values to fields.
 *
 * @private
 */
var DeclarationOptions = (function () {
    function DeclarationOptions(declarationOptions) {
        if (declarationOptions === void 0) { declarationOptions = {}; }
        this.version = "1.0";
        if (!utils_1.isObject(declarationOptions)) {
            throw new TypeError("options should be an Object or undefined");
        }
        if (!utils_1.isString(declarationOptions.encoding)) {
            if (!utils_1.isUndefined(declarationOptions.encoding)) {
                throw new TypeError("options.encoding should be a string"
                    + " or undefined");
            }
        }
        else {
            this.encoding = declarationOptions.encoding;
        }
        if (!utils_1.isString(declarationOptions.standalone)) {
            if (!utils_1.isUndefined(declarationOptions.standalone)) {
                throw new TypeError("options.standalone should be a string"
                    + " or undefined");
            }
        }
        else {
            this.standalone = declarationOptions.standalone;
        }
        if (!utils_1.isString(declarationOptions.version)) {
            if (!utils_1.isUndefined(declarationOptions.version)) {
                throw new TypeError("options.version should be a string"
                    + " or undefined");
            }
        }
        else {
            this.version = declarationOptions.version;
        }
    }
    return DeclarationOptions;
}());
exports.DeclarationOptions = DeclarationOptions;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML comment.
 *
 * An XML character reference is structured as follows, where `{content}` is
 * the text of the comment.
 *
 * ```xml
 * <!--{content}-->
 * ```
 *
 * The `{content}` value is a property of this node.
 *
 * XmlComment nodes cannot have any children.
 */
var XmlComment = (function (_super) {
    __extends(XmlComment, _super);
    /**
     * Initializes a new instance of the {@link XmlComment} class.
     *
     * @param content The content of the comment.
     */
    function XmlComment(content) {
        var _this = _super.call(this) || this;
        _this.content = content;
        return _this;
    }
    Object.defineProperty(XmlComment.prototype, "content", {
        /**
         * Gets the content of the comment.
         *
         * @returns The content of the comment.
         */
        get: function () {
            return this._content;
        },
        /**
         * Sets the content of the comment.
         *
         * @param content The content of the comment.
         */
        set: function (content) {
            if (!utils_1.isString(content)) {
                throw new TypeError("content should be a string");
            }
            else if (!validate_1.validateChar(content)) {
                throw new Error("content should not contain characters"
                    + " not allowed in XML");
            }
            else if (!/^([^-]|-[^-])*$/.test(content)) {
                throw new Error("content should not contain the string '--' or"
                    + " end with '-'");
            }
            this._content = content;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlComment.prototype.children = function () {
        throw new Error("XmlComment nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlComment.prototype.insertChild = function (node, index) {
        throw new Error("XmlComment nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlComment.prototype.removeChild = function (node) {
        throw new Error("XmlComment nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlComment} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlComment.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlComment nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlComment.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<!--" + this.content + "-->";
    };
    return XmlComment;
}(XmlNode_1.default));
exports.default = XmlComment;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML processing instruction.
 *
 * An XML processing instruction is structured as follows, where `{target}`
 * and `{content}` are the target and content of the processing instruction
 * respectively.
 *
 * ```xml
 * <?{target} {content}?>
 * ```
 *
 * The `{target}` and `{content}` values are properties of this node.
 *
 * XmlProcInst nodes cannot have any children.
 */
var XmlProcInst = (function (_super) {
    __extends(XmlProcInst, _super);
    /**
     * Initializes a new instance of the {@link XmlProcInst} class.
     *
     * @param target The target of the processing instruction.
     * @param content The data of the processing instruction, or undefined if
     *                there is no target.
     */
    function XmlProcInst(target, content) {
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.content = content;
        return _this;
    }
    Object.defineProperty(XmlProcInst.prototype, "target", {
        /**
         * Gets the target of the processing instruction.
         *
         * @returns The target of the processing instruction.
         */
        get: function () {
            return this._target;
        },
        /**
         * Sets the target of the processing instruction.
         *
         * @param target The target of the processing instruction.
         */
        set: function (target) {
            if (!utils_1.isString(target)) {
                throw new TypeError("target should be a string");
            }
            else if (!validate_1.validateChar(target)) {
                throw new Error("target should not contain characters"
                    + " not allowed in XML");
            }
            else if (target === "xml") {
                throw new Error("target should not be the string 'xml'");
            }
            this._target = target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlProcInst.prototype, "content", {
        /**
         * Gets the data of the processing instruction.
         *
         * @returns The data of the processing instruction. This value may be
         *          undefined.
         */
        get: function () {
            return this._content;
        },
        /**
         * Sets the data of the processing instruction.
         *
         * @param content The data of the processing instruction. This value may be
         *                undefined.
         */
        set: function (content) {
            if (!utils_1.isString(content) && !utils_1.isUndefined(content)) {
                throw new TypeError("data should be a string or undefined");
            }
            if (utils_1.isString(content)) {
                if (!validate_1.validateChar(content)) {
                    throw new Error("data should not contain characters"
                        + " not allowed in XML");
                }
                else if (/\?>/.test(content)) {
                    throw new Error("data should not contain the string '?>'");
                }
            }
            this._content = content;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlProcInst.prototype.children = function () {
        throw new Error("XmlProcInst nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlProcInst.prototype.insertChild = function (node, index) {
        throw new Error("XmlProcInst nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlProcInst.prototype.removeChild = function (node) {
        throw new Error("XmlProcInst nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlProcInst} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlProcInst.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlProcInst nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlProcInst.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        if (this.content === undefined) {
            return "<?" + this.target + "?>";
        }
        else {
            return "<?" + this.target + " " + this.content + "?>";
        }
    };
    return XmlProcInst;
}(XmlNode_1.default));
exports.default = XmlProcInst;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Replaces ampersands (&) with the appropriate XML character reference.
 *
 * @param str The string to escape.
 *
 * @returns A copy of the specified string with ampersands escaped.
 *
 * @private
 */
function escapeAmpersands(str) {
    return str.replace(/&/g, "&amp;");
}
exports.escapeAmpersands = escapeAmpersands;
/**
 * Replaces left angle brackets (&lt;) with the appropriate XML character
 * reference.
 *
 * @param str The string to escape.
 *
 * @returns A copy of the specified string with left angle brackets escaped.
 *
 * @private
 */
function escapeLeftAngleBrackets(str) {
    return str.replace(/</g, "&lt;");
}
exports.escapeLeftAngleBrackets = escapeLeftAngleBrackets;
/**
 * Replaces right angle brackets (&gt;) with the appropriate XML character
 * reference when part of the string "]]>".
 *
 * @param str The string to escape.
 *
 * @returns A copy of the specified string with right angle brackets escaped
 *          when part of the string "]]>".
 *
 * @private
 */
function escapeRightAngleBracketsInCdataTerminator(str) {
    return str.replace(/]]>/g, "]]&gt;");
}
exports.escapeRightAngleBracketsInCdataTerminator = escapeRightAngleBracketsInCdataTerminator;
/**
 * Replaces single quotes (") with the appropriate XML character reference.
 *
 * @param str The string to escape.
 *
 * @returns A copy of the specified string with single quotes escaped.
 *
 * @private
 */
function escapeSingleQuotes(str) {
    return str.replace(/'/g, "&apos;");
}
exports.escapeSingleQuotes = escapeSingleQuotes;
/**
 * Replaces double quotes (") with the appropriate XML character reference.
 *
 * @param str The string to escape.
 *
 * @returns A copy of the specified string with double quotes escaped.
 *
 * @private
 */
function escapeDoubleQuotes(str) {
    return str.replace(/"/g, "&quot;");
}
exports.escapeDoubleQuotes = escapeDoubleQuotes;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var escape_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents text in an XML attribute value.
 *
 * Restricted characters, such as the ampersand (`&`) and the opening angle
 * bracket (`<`), are all automatically escaped.
 *
 * To create an character reference or entity reference, you should use
 * {@link XmlCharRef} or {@link XmlEntityRef} respectively instead.
 *
 * XmlAttributeText nodes cannot have any children.
 */
var XmlAttributeText = (function (_super) {
    __extends(XmlAttributeText, _super);
    /**
     * Initializes a new instance of the {@link XmlAttributeText} class.
     *
     * @param text Text.
     */
    function XmlAttributeText(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        return _this;
    }
    Object.defineProperty(XmlAttributeText.prototype, "text", {
        /**
         * Gets the text associated with this node.
         *
         * @returns The text associated with this node.
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets the text associated with this node.
         *
         * @param text Text.
         */
        set: function (text) {
            if (!utils_1.isString(text)) {
                throw new TypeError("text should be a string");
            }
            else if (!validate_1.validateChar(text)) {
                throw new Error("text should not contain characters not allowed"
                    + " in XML");
            }
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlAttributeText} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlAttributeText.prototype.children = function () {
        throw new Error("XmlAttributeText nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlAttributeText} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlAttributeText.prototype.insertChild = function (node, index) {
        throw new Error("XmlAttributeText nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlAttributeText} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlAttributeText.prototype.removeChild = function (node) {
        throw new Error("XmlAttributeText nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlAttributeText} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlAttributeText.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlAttributeText nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlAttributeText.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var str = this.text;
        str = escape_1.escapeAmpersands(str);
        str = escape_1.escapeLeftAngleBrackets(str);
        return str;
    };
    return XmlAttributeText;
}(XmlNode_1.default));
exports.default = XmlAttributeText;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML character reference.
 *
 * An XML character reference is structured as follows, where `{dec}` is the
 * decimal representation code point corresponding to a particular Unicode
 * character:
 *
 * ```xml
 * &#{dec};
 * ```
 *
 * The corresponding hexadecimal version is structured as follows, where
 * `{hex}` is the hexadecimal representation code point corresponding to a
 * particular Unicode character:
 *
 * ```xml
 * &#x{hex};
 * ```
 *
 * Unicode characters outside of the Basic Multilingual Plane are represented
 * using a surrogate pair consisting of two character references.
 *
 * The `{dec}` and `{hex}` values are defined by the `char` and `hex`
 * properties of this node; the former is the character to be represented while
 * the latter indicates whether the decimal or hexadecimal representation
 * should be used.
 *
 * XmlCharRef nodes cannot have any children.
 */
var XmlCharRef = (function (_super) {
    __extends(XmlCharRef, _super);
    /**
     * Initializes a new instance of the {@link XmlCharRef} class.
     *
     * @param char The character to represent using the reference.
     * @param hex Whether to use the hexadecimal or decimal representation for
     *            the reference. If left undefined, decimal is the default.
     */
    function XmlCharRef(char, hex) {
        if (hex === void 0) { hex = false; }
        var _this = _super.call(this) || this;
        _this.char = char;
        _this.hex = hex;
        return _this;
    }
    Object.defineProperty(XmlCharRef.prototype, "char", {
        /**
         * Gets the character to represent using the reference.
         *
         * @returns The character to represent using the reference.
         */
        get: function () {
            return this._char;
        },
        /**
         * Sets the character to represent using the reference.
         *
         * @param char The character to represent using the reference.
         */
        set: function (char) {
            if (!utils_1.isString(char)) {
                throw new TypeError("char should be a string");
            }
            else if (!validate_1.validateSingleChar(char)) {
                throw new Error("char should contain a single character, and this"
                    + " character should be allowed in XML");
            }
            this._char = char;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlCharRef.prototype, "hex", {
        /**
         * Gets whether or not to use the hexadecimal or decimal representation for
         * the reference.
         *
         * @returns Whether or not to use the hexadecimal or decimal representation
         *          for the reference.
         */
        get: function () {
            return this._hex;
        },
        /**
         * Sets whether or not to use the hexadecimal or decimal representation for
         * the reference.
         *
         * @param hex Whether or not to use the hexadecimal or decimal
         *            representation for the reference.
         */
        set: function (hex) {
            if (!utils_1.isBoolean(hex)) {
                throw new TypeError("hex should be a boolean");
            }
            this._hex = hex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlCharRef.prototype.children = function () {
        throw new Error("XmlCharRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCharRef.prototype.insertChild = function (node, index) {
        throw new Error("XmlCharRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCharRef.prototype.removeChild = function (node) {
        throw new Error("XmlCharRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCharRef} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCharRef.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlCharRef nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlCharRef.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var char;
        if (this.char.length === 1) {
            char = this.char.charCodeAt(0);
        }
        else {
            char = utils_1.getCodePoint(this.char, 0);
        }
        if (this.hex) {
            return "&#x" + char.toString(16) + ";";
        }
        else {
            return "&#" + char + ";";
        }
    };
    return XmlCharRef;
}(XmlNode_1.default));
exports.default = XmlCharRef;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML entity reference.
 *
 * An XML entity reference is structured as follows, where
 * `{entity}` is name of the entity to be referenced:
 *
 * ```xml
 * &{entity};
 * ```
 *
 * The `{entity}` value is a property of this node.
 *
 * XmlEntityRef nodes cannot have any children.
 */
var XmlEntityRef = (function (_super) {
    __extends(XmlEntityRef, _super);
    /**
     * Initializes a new instance of the {@link XmlEntityRef} class.
     *
     * @param entity The entity to be referenced.
     */
    function XmlEntityRef(entity) {
        var _this = _super.call(this) || this;
        _this.entity = entity;
        return _this;
    }
    Object.defineProperty(XmlEntityRef.prototype, "entity", {
        /**
         * Gets the entity to be referenced.
         *
         * @returns The entity to be referenced.
         */
        get: function () {
            return this._entity;
        },
        /**
         * Sets the entity to be referenced.
         *
         * @param entity The entity to be referenced.
         */
        set: function (entity) {
            if (!utils_1.isString(entity)) {
                throw new TypeError("entity should be a string");
            }
            else if (!validate_1.validateName(entity)) {
                throw new Error("entity should not contain characters" +
                    " not allowed in XML names");
            }
            this._entity = entity;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlEntityRef} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlEntityRef.prototype.children = function () {
        throw new Error("XmlEntityRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlEntityRef} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlEntityRef.prototype.insertChild = function (node, index) {
        throw new Error("XmlEntityRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlEntityRef} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlEntityRef.prototype.removeChild = function (node) {
        throw new Error("XmlEntityRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlEntityRef} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlEntityRef.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlEntityRef nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlEntityRef.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "&" + this.entity + ";";
    };
    return XmlEntityRef;
}(XmlNode_1.default));
exports.default = XmlEntityRef;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var escape_1 = __webpack_require__(6);
var options_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlAttributeText_1 = __webpack_require__(7);
var XmlCharRef_1 = __webpack_require__(8);
var XmlEntityRef_1 = __webpack_require__(9);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML element attribute.
 *
 * An XML element attribute is part of the start tag of an element and is
 * structured as follows, where `{name}` is the name of the attribute and
 * `{value}` is the value of the attribute:
 *
 * ```xml
 * <element {name}="{value}">
 * ```
 *
 * The `{name}` value is a property of this node, while the `{value}` property
 * consists of the children of this node.
 *
 * XmlAttribute nodes must have at least one child, and can have an unlimited
 * number of {@link XmlAttributeText}, {@link XmlCharRef}, and
 * {@link XmlEntityRef} nodes as children.
 */
var XmlAttribute = (function (_super) {
    __extends(XmlAttribute, _super);
    /**
     * Initializes a new instance of the {@link XmlAttribute} class.
     *
     * @param name The name of the XML attribute.
     * @param value The initial value of the XML attribute. Additional children
     *              can be added later. Only {@link XmlAttributeText},
     *              {@link XmlCharRef}, and {@link XmlEntityRef} nodes are
     *              permitted.
     */
    function XmlAttribute(name, value) {
        var _this = _super.call(this) || this;
        _this.name = name;
        if (utils_1.isArray(value)) {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var node = value_1[_i];
                _this.insertChild(node);
            }
        }
        else {
            _this.insertChild(value);
        }
        return _this;
    }
    Object.defineProperty(XmlAttribute.prototype, "name", {
        /**
         * Gets the name of this attribute.
         *
         * @returns The name of this attribute.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of this attribute.
         *
         * @param name The name of this attribute.
         */
        set: function (name) {
            if (!utils_1.isString(name)) {
                throw new TypeError("name should be a string");
            }
            else if (!validate_1.validateName(name)) {
                throw new Error("name should not contain characters not"
                    + " allowed in XML names");
            }
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inserts a new XML character reference at the specified index.
     *
     * @param char The character to represent using the reference.
     * @param hex Whether to use the hexadecimal or decimal representation for
     *            the reference. If left undefined, decimal is the default.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created XML declaration.
     */
    XmlAttribute.prototype.charRef = function (char, hex, index) {
        var charRef = new XmlCharRef_1.default(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    };
    /**
     * Inserts a new XML entity reference at the specified index.
     *
     * @param entity The entity to be referenced.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created XML declaration.
     */
    XmlAttribute.prototype.entityRef = function (entity, index) {
        var charRef = new XmlEntityRef_1.default(entity);
        this.insertChild(charRef, index);
        return charRef;
    };
    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlCharRef}, {@link XmlEntityRef}, and
     * {@link XmlCharData} nodes can be inserted; otherwise, an exception will
     * be thrown.
     *
     * @param node The node to insert.
     * @param index The index at which to insert the node. Nodes at or after the
     *              index are shifted to the right. If no index is specified,
     *              the node is inserted at the end.
     *
     * @returns The node inserted into this node's children, or undefined if no
     *          node was inserted.
     */
    XmlAttribute.prototype.insertChild = function (node, index) {
        if (!(node instanceof XmlCharRef_1.default || node instanceof XmlEntityRef_1.default ||
            node instanceof XmlAttributeText_1.default)) {
            throw new TypeError("node should be an instance of XmlCharRef,"
                + " XmlEntityRef, or XmlAttributeText");
        }
        return _super.prototype.insertChild.call(this, node, index);
    };
    /**
     * Removes the specified node from this node's children.
     *
     * Note that this node must have at least one child. Attempts to remove
     * the last child node will result in an exception.
     *
     * @param node The node to remove.
     *
     * @returns Whether a node was removed.
     */
    XmlAttribute.prototype.removeChild = function (node) {
        if (this._children.length === 1) {
            throw new Error("XmlAttribute nodes must have at least one child");
        }
        return _super.prototype.removeChild.call(this, node);
    };
    /**
     * Removes the node at the specified index from this node's children.
     *
     * Note that this node must have at least one child. Attempts to remove
     * the last child node will result in an exception.
     *
     * @param index The index at which the node to be removed is located.
     *
     * @returns The node that was removed, or undefined if no node was removed.
     */
    XmlAttribute.prototype.removeChildAtIndex = function (index) {
        if (this._children.length === 1) {
            throw new Error("XmlAttribute nodes must have at least one child");
        }
        return _super.prototype.removeChildAtIndex.call(this, index);
    };
    /**
     * Inserts a new XML text node at the specified index.
     *
     * @param text Arbitrary character data.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created XML declaration.
     */
    XmlAttribute.prototype.text = function (text, index) {
        var textNode = new XmlAttributeText_1.default(text);
        this.insertChild(textNode, index);
        return textNode;
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlAttribute.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var optionsObj = new options_1.StringOptions(options);
        var quote = optionsObj.doubleQuotes ? "\"" : "'";
        var str = this.name + "=" + quote;
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (optionsObj.doubleQuotes) {
                str += escape_1.escapeDoubleQuotes(child.toString(options));
            }
            else {
                str += escape_1.escapeSingleQuotes(child.toString(options));
            }
        }
        str += quote;
        return str;
    };
    return XmlAttribute;
}(XmlNode_1.default));
exports.default = XmlAttribute;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML CDATA section.
 *
 * An XML CDATA section is structured as follows, where `{data}` is the
 * character data of the section:
 *
 * ```xml
 * <![CDATA[{data}]]>
 * ```
 *
 * The `{data}` value is a property of this node.
 *
 * XmlCdata nodes cannot have any children.
 */
var XmlCdata = (function (_super) {
    __extends(XmlCdata, _super);
    /**
     * Initializes a new instance of the {@link XmlCdata} class.
     *
     * @param data The character data of the CDATA section.
     */
    function XmlCdata(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
    }
    Object.defineProperty(XmlCdata.prototype, "data", {
        /**
         * Gets the character data of the CDATA section.
         *
         * @returns The character data of the CDATA section.
         */
        get: function () {
            return this._data;
        },
        /**
         * Sets the character data of the CDATA section.
         *
         * @param data The character data of the CDATA section.
         */
        set: function (data) {
            if (!utils_1.isString(data)) {
                throw new TypeError("character data should be a string");
            }
            else if (!validate_1.validateChar(data)) {
                throw new Error("character data should not contain characters not"
                    + " allowed in XML");
            }
            else if (/]]>/.test(data)) {
                throw new Error("data should not contain the string ']]>'");
            }
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlCdata.prototype.children = function () {
        throw new Error("XmlCdata nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCdata.prototype.insertChild = function (node, index) {
        throw new Error("XmlCdata nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCdata.prototype.removeChild = function (node) {
        throw new Error("XmlCdata nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCdata} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCdata.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlCdata nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlCdata.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<![CDATA[" + this.data + "]]>";
    };
    return XmlCdata;
}(XmlNode_1.default));
exports.default = XmlCdata;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var escape_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents character data in an XML document.
 *
 * Restricted characters, such as the ampersand (`&`), the opening angle
 * bracket (`<`), and the closing angle bracket (`>`) when it appears in the
 * string `]]>`, are all automatically escaped.
 *
 * To create an character reference or entity reference, you should use
 * {@link XmlCharRef} or {@link XmlEntityRef} respectively instead.
 *
 * XmlCharData nodes cannot have any children.
 */
var XmlCharData = (function (_super) {
    __extends(XmlCharData, _super);
    /**
     * Initializes a new instance of the {@link XmlCharData} class.
     *
     * @param charData Character data.
     */
    function XmlCharData(charData) {
        var _this = _super.call(this) || this;
        _this.charData = charData;
        return _this;
    }
    Object.defineProperty(XmlCharData.prototype, "charData", {
        /**
         * Gets the character data associated with this node.
         *
         * @returns The character data associated with this node.
         */
        get: function () {
            return this._charData;
        },
        /**
         * Sets the character data associated with this node.
         *
         * @param charData Character data.
         */
        set: function (charData) {
            if (!utils_1.isString(charData)) {
                throw new TypeError("charData should be a string");
            }
            else if (!validate_1.validateChar(charData)) {
                throw new Error("charData should not contain characters not allowed"
                    + " in XML");
            }
            this._charData = charData;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlCharData} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlCharData.prototype.children = function () {
        throw new Error("XmlCharData nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCharData} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCharData.prototype.insertChild = function (node, index) {
        throw new Error("XmlCharData nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCharData} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCharData.prototype.removeChild = function (node) {
        throw new Error("XmlCharData nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlCharData} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlCharData.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlCharData nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlCharData.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var str = this.charData;
        str = escape_1.escapeAmpersands(str);
        str = escape_1.escapeLeftAngleBrackets(str);
        str = escape_1.escapeRightAngleBracketsInCdataTerminator(str);
        return str;
    };
    return XmlCharData;
}(XmlNode_1.default));
exports.default = XmlCharData;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var options_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML declaration.
 *
 * An XML declaration is structured as follows, where `{version}` is the XML
 * version, `{encoding}` is the encoding of the document, and `{standalone}`
 * is either "yes" or "no", depending on whether the document may contain
 * external markup declarations:
 *
 * ```xml
 * <?xml version="{version}" encoding="{encoding}" standalone="{standalone}"?>
 * ```
 *
 * The `{version}`, `{encoding}`, and `{standalone}` values are properties of
 * this node.
 *
 * XmlDecl nodes cannot have any children.
 */
var XmlDecl = (function (_super) {
    __extends(XmlDecl, _super);
    /**
     * Initializes a new instance of the {@link XmlDecl} class.
     *
     * @param options The options associated with the XML declaration.
     */
    function XmlDecl(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        var optionsObj = new options_1.DeclarationOptions(options);
        _this.encoding = optionsObj.encoding;
        _this.standalone = optionsObj.standalone;
        _this.version = optionsObj.version;
        return _this;
    }
    Object.defineProperty(XmlDecl.prototype, "encoding", {
        /**
         * Gets the XML encoding to be included in the declaration.
         *
         * @returns The XML encoding to be included in the declaration. This value
         *          may be undefined.
         */
        get: function () {
            return this._encoding;
        },
        /**
         * Sets the XML encoding to be included in the declaration.
         *
         * @param encoding The XML encoding to be included in the declaration. This
         *                 value must be a valid encoding. If left undefined, no
         *                 encoding is included.
         */
        set: function (encoding) {
            if (utils_1.isString(encoding)) {
                if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(encoding)) {
                    throw new Error("encoding should be a valid XML encoding");
                }
            }
            else if (!utils_1.isUndefined(encoding)) {
                throw new TypeError("name should be a string or undefined");
            }
            this._encoding = encoding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDecl.prototype, "standalone", {
        /**
         * Gets the XML standalone attribute to be included in the declaration.
         *
         * @returns The XML standalone attribute to be included in the declaration.
         *          This value may be undefined.
         */
        get: function () {
            return this._standalone;
        },
        /**
         * Sets the XML standalone attribute to be included in the declaration.
         *
         * @param standalone The XML standalone attribute to be included. This
         *                   value must be "yes" or "no". If left undefined, no
         *                   standalone attribute is included.
         */
        set: function (standalone) {
            if (utils_1.isString(standalone)) {
                if (!/^(yes|no)$/.test(standalone)) {
                    throw new Error("standalone should be either the string"
                        + " 'yes' or the string 'no'");
                }
            }
            else if (!utils_1.isUndefined(standalone)) {
                throw new TypeError("standalone should be a string or undefined");
            }
            this._standalone = standalone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDecl.prototype, "version", {
        /**
         * Gets the XML version to be included in the declaration.
         *
         * @returns The XML version to tbe included in the declaration.
         */
        get: function () {
            return this._version;
        },
        /**
         * Sets the XML version to be included in the declaration.
         *
         * @param version The XML version to be included in the declaration. This
         *                value must be a valid XML version number. If left
         *                undefined, the default version is "1.0".
         */
        set: function (version) {
            if (!utils_1.isString(version)) {
                throw new TypeError("version should be a string");
            }
            else if (!/^1\.[0-9]+$/.test(version)) {
                throw new Error("version should be a valid XML version");
            }
            this._version = version;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlDecl.prototype.children = function () {
        throw new Error("XmlDecl nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDecl.prototype.insertChild = function (node, index) {
        throw new Error("XmlDecl nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDecl.prototype.removeChild = function (node) {
        throw new Error("XmlDecl nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDecl} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDecl.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDecl nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlDecl.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var optionsObj = new options_1.StringOptions(options);
        var quote = optionsObj.doubleQuotes ? '"' : "'";
        var str = "<?xml version=" + quote + this.version + quote;
        if (utils_1.isString(this.encoding)) {
            str += " encoding=" + quote + this.encoding + quote;
        }
        if (utils_1.isString(this.standalone)) {
            str += " standalone=" + quote + this.standalone + quote;
        }
        str += "?>";
        return str;
    };
    return XmlDecl;
}(XmlNode_1.default));
exports.default = XmlDecl;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var options_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlComment_1 = __webpack_require__(4);
var XmlDtdAttlist_1 = __webpack_require__(16);
var XmlDtdElement_1 = __webpack_require__(17);
var XmlDtdEntity_1 = __webpack_require__(18);
var XmlDtdNotation_1 = __webpack_require__(19);
var XmlDtdParamEntityRef_1 = __webpack_require__(20);
var XmlNode_1 = __webpack_require__(1);
var XmlProcInst_1 = __webpack_require__(5);
/**
 * Represents an XML document type definition (DTD).
 *
 * An XML document type definition  is structured as follows, where `{name}` is
 * the name of the DTD, `{sysId}` is the system identifier of the DTD,
 * `{pubId}` is the public identifier of the DTD, and `{intSubset}` is the
 * internal subset of the DTD:
 *
 * ```xml
 * <!DOCTYPE {name} SYSTEM "{sysId}" PUBLIC "{pubId}" [
 *     {intSubset}
 * ]>
 * ```
 *
 * The `{name}`, `{pubId}`, and `{sysId}` values are properties of the node,
 * while the `{intSubset}` value consists of the children of this node.
 *
 * XmlDtd nodes can have an unlimited number of {@link XmlComment},
 * {@link XmlDtdAttlist}, {@link XmlDtdElement}, {@link XmlDtdEntity},
 * {@link XmlDtdNotation}, {@link XmlDtdParamEntityRef}, and
 * {@link XmlProcInst} nodes.
 */
var XmlDtd = (function (_super) {
    __extends(XmlDtd, _super);
    /**
     * Initializes a new instance of the {@link XmlDtd} class.
     *
     * @param name The name of the DTD.
     * @param sysId The system identifier of the DTD, excluding quotation marks.
     * @param pubId The public identifier of the DTD, excluding quotation marks.
     *              If a public identifier is provided, a system identifier
     *              must be provided as well.
     */
    function XmlDtd(name, sysId, pubId) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.sysId = sysId;
        _this.pubId = pubId;
        return _this;
    }
    Object.defineProperty(XmlDtd.prototype, "name", {
        /**
         * Gets the name of the DTD.
         *
         * @returns The name of the DTD.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of the DTD.
         *
         * @param name The name of the DTD.
         */
        set: function (name) {
            if (!utils_1.isString(name)) {
                throw new TypeError("name should be a string");
            }
            else if (!validate_1.validateName(name)) {
                throw new Error("name should not contain characters not"
                    + " allowed in XML names");
            }
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDtd.prototype, "pubId", {
        /**
         * Gets the public identifier of the DTD, excluding quotation marks.
         *
         * @returns The public identifier of the DTD, excluding quotation marks.
         *          This value may be undefined.
         */
        get: function () {
            return this._pubId;
        },
        /**
         * Sets the public identifier of the DTD, excluding quotation marks. If a
         * public identifier is provided, a system identifier must be provided as
         * well.
         *
         * @param pubId The public identifier of the DTD, excluding quotation marks.
         *              This value may be undefined.
         */
        set: function (pubId) {
            if (utils_1.isString(pubId)) {
                if (!/^(\u0020|\u000D|\u000A|[a-zA-Z0-9]|[-'()+,./:=?;!*#@$_%])*$/
                    .test(pubId)) {
                    throw new Error("pubId should not contain characters not"
                        + " allowed in public identifiers");
                }
                else if (utils_1.isUndefined(this.sysId)) {
                    throw new Error("pubId should not be defined if sysId is"
                        + " undefined");
                }
            }
            else if (!utils_1.isUndefined(pubId)) {
                throw new TypeError("pubId should be a string or undefined");
            }
            this._pubId = pubId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XmlDtd.prototype, "sysId", {
        /**
         * Gets the system identifier of the DTD, excluding quotation marks.
         *
         * @returns The system identifier of the DTD, excluding quotation marks.
         *          This value may be undefined.
         */
        get: function () {
            return this._sysId;
        },
        /**
         * Sets the system identifier of the DTD, excluding quotation marks.
         *
         * @param sysId The system identifier of the DTD, excluding quotation marks.
         *              This value may be undefined.
         */
        set: function (sysId) {
            if (utils_1.isString(sysId)) {
                if (!validate_1.validateChar(sysId)) {
                    throw new Error("sysId should not contain characters not"
                        + " allowed in XML");
                }
                else if (sysId.indexOf("'") !== -1 &&
                    sysId.indexOf("\"") !== -1) {
                    throw new Error("sysId should not contain both single quotes"
                        + " and double quotes");
                }
            }
            else if (utils_1.isUndefined(sysId)) {
                if (!utils_1.isUndefined(this.pubId)) {
                    throw new Error("sysId should not be undefined if pubId is"
                        + " defined");
                }
            }
            else {
                throw new TypeError("sysId should be a string or undefined");
            }
            this._sysId = sysId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inserts a new attribute-list declaration at the specified index. If no
     * index is specified, the node is inserted at the end of this node's
     * children.
     *
     * @param text The text of the attribute-list declaration.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created attribute-list declaration.
     */
    XmlDtd.prototype.attlist = function (text, index) {
        var attlist = new XmlDtdAttlist_1.default(text);
        this.insertChild(attlist, index);
        return attlist;
    };
    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param content The data of the comment.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created comment.
     */
    XmlDtd.prototype.comment = function (content, index) {
        var comment = new XmlComment_1.default(content);
        this.insertChild(comment, index);
        return comment;
    };
    /**
     * Inserts a new element declaration at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param text The text of the element declaration.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created element declaration.
     */
    XmlDtd.prototype.element = function (text, index) {
        var element = new XmlDtdElement_1.default(text);
        this.insertChild(element, index);
        return element;
    };
    /**
     * Inserts a new entity declaration at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param text The text of the entity declaration.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created entity declaration.
     */
    XmlDtd.prototype.entity = function (text, index) {
        var entity = new XmlDtdEntity_1.default(text);
        this.insertChild(entity, index);
        return entity;
    };
    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Only {@link XmlComment}, {@link XmlDtdAttlist}, {@link XmlDtdElement},
     * {@link XmlDtdEntity}, {@link XmlDtdNotation}, and {@link XmlProcInst}
     * nodes can be inserted; otherwise an exception will be thrown.
     *
     * @param node The node to insert.
     * @param index The index at which to insert the node. Nodes at or after
     *              the index are shifted to the right. If no index is
     *              specified, the node is inserted at the end.
     *
     * @returns The node inserted into this node's children, or undefined if no
     *          node was inserted.
     */
    XmlDtd.prototype.insertChild = function (node, index) {
        if (!(node instanceof XmlComment_1.default || node instanceof XmlDtdAttlist_1.default ||
            node instanceof XmlDtdElement_1.default || node instanceof XmlDtdEntity_1.default ||
            node instanceof XmlDtdNotation_1.default ||
            node instanceof XmlDtdParamEntityRef_1.default ||
            node instanceof XmlProcInst_1.default)) {
            throw new TypeError("node should be an instance of XmlComment,"
                + " XmlDtdAttlist, XmlDtdElement, XmlDtdEntity,"
                + " XmlDtdNotation, XmlDtdParamEntityRef, or"
                + " XmlProcInst");
        }
        return _super.prototype.insertChild.call(this, node, index);
    };
    /**
     * Inserts a new notation declaration at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param text The text of the notation declaration.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created notation declaration.
     */
    XmlDtd.prototype.notation = function (text, index) {
        var notation = new XmlDtdNotation_1.default(text);
        this.insertChild(notation, index);
        return notation;
    };
    /**
     * Inserts a new parameter entity reference at the specified index. If no
     * index is specified, the node is inserted at the end of this node's
     * children.
     *
     * @param entity The entity to reference.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created parameter entity reference.
     */
    XmlDtd.prototype.paramEntityRef = function (entity, index) {
        var paramEntity = new XmlDtdParamEntityRef_1.default(entity);
        this.insertChild(paramEntity, index);
        return paramEntity;
    };
    /**
     * Inserts a new processing instruction at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param target The target of the processing instruction.
     * @param content The data of the processing instruction, or undefined if
     *                there is no target.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created processing instruction.
     */
    XmlDtd.prototype.procInst = function (target, content, index) {
        var procInst = new XmlProcInst_1.default(target, content);
        this.insertChild(procInst, index);
        return procInst;
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlDtd.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var optionsObj = new options_1.StringOptions(options);
        var str = "<!DOCTYPE " + this.name;
        if (utils_1.isUndefined(this.pubId)) {
            if (!utils_1.isUndefined(this.sysId)) {
                str += " ";
                str = appendId("SYSTEM", this.sysId, str, optionsObj);
            }
        }
        else {
            str += " ";
            str = appendId("PUBLIC", this.pubId, str, optionsObj);
            str = appendId("", this.sysId, str, optionsObj);
        }
        if (this._children.length !== 0) {
            str += " [";
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var node = _a[_i];
                if (optionsObj.pretty) {
                    str += optionsObj.newline + optionsObj.indent;
                }
                str += node.toString(options);
            }
            if (optionsObj.pretty) {
                str += optionsObj.newline;
            }
            str += "]>";
        }
        else {
            str += ">";
        }
        return str;
    };
    return XmlDtd;
}(XmlNode_1.default));
exports.default = XmlDtd;
/**
 * Appends the XML string representation of a public or system identifier to
 * an existing string.
 *
 * @param type "SYSTEM", "PUBLIC", or "".
 * @param value The value of the identifier.
 * @param str The string to which the string representation should be appended.
 * @param options Formatting options for the string representation.
 *
 * @returns The updated string.
 *
 * @private
 */
function appendId(type, value, str, options) {
    str += type + " ";
    if (options.doubleQuotes) {
        if (value.indexOf("\"") !== -1) {
            throw new Error("options.doubleQuotes inconsistent with"
                + " sysId or pubId");
        }
        str += "\"" + value + "\"";
    }
    else {
        if (value.indexOf("'") !== -1) {
            throw new Error("options.doubleQuotes inconsistent with"
                + " sysId or pubId");
        }
        str += "'" + value + "'";
    }
    return str;
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML attribute-list declaration in a document type definition.
 *
 * An XML attribute-list declaration is structured as follows, where `{text}`
 * is the text of the declaration:
 *
 * ```xml
 * <!ATTLIST {text}>
 * ```
 *
 * The `{text}` value is a property of this node.
 *
 * XmlDtdAttlist nodes cannot have any children.
 */
var XmlDtdAttlist = (function (_super) {
    __extends(XmlDtdAttlist, _super);
    /**
     * Initializes a new instance of the {@link XmlDtdAttlist} class.
     *
     * @param text The text associated with the XML attribute-list declaration.
     */
    function XmlDtdAttlist(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        return _this;
    }
    Object.defineProperty(XmlDtdAttlist.prototype, "text", {
        /**
         * Gets the text associated with the XML attribute-list declaration.
         *
         * @return The text associated with the XML attribute-list declaration.
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets the text associated with the XML attribute-list declaration.
         *
         * @param text The text associated with the XML attribute-list declaration.
         */
        set: function (text) {
            if (!utils_1.isString(text)) {
                throw new TypeError("text should be a string");
            }
            else if (!validate_1.validateChar(text)) {
                throw new Error("data should not contain characters"
                    + " not allowed in XML");
            }
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlDtdAttlist} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlDtdAttlist.prototype.children = function () {
        throw new Error("XmlDtdAttlist nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdAttlist} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdAttlist.prototype.insertChild = function (node, index) {
        throw new Error("XmlDtdAttlist nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdAttlist} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdAttlist.prototype.removeChild = function (node) {
        throw new Error("XmlDtdAttlist nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdAttlist} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdAttlist.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDtdAttlist nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlDtdAttlist.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<!ATTLIST " + this.text + ">";
    };
    return XmlDtdAttlist;
}(XmlNode_1.default));
exports.default = XmlDtdAttlist;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML element declaration in a document type definition.
 *
 * An XML element declaration is structured as follows, where `{text}` is the
 * text of the declaration:
 *
 * ```xml
 * <!ELEMENT {text}>
 * ```
 *
 * The `{text}` value is a property of this node.
 *
 * XmlDtdElement nodes cannot have any children.
 */
var XmlDtdElement = (function (_super) {
    __extends(XmlDtdElement, _super);
    /**
     * Initializes a new instance of the {@link XmlDtdElement} class.
     *
     * @param text The text associated with the XML element declaration.
     */
    function XmlDtdElement(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        return _this;
    }
    Object.defineProperty(XmlDtdElement.prototype, "text", {
        /**
         * Gets the text associated with the XML element declaration.
         *
         * @return The text associated with the XML element declaration.
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets the text associated with the XML element declaration.
         *
         * @param text The text associated with the XML element declaration.
         */
        set: function (text) {
            if (!utils_1.isString(text)) {
                throw new TypeError("text should be a string");
            }
            else if (!validate_1.validateChar(text)) {
                throw new Error("data should not contain characters"
                    + " not allowed in XML");
            }
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlDtdElement} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlDtdElement.prototype.children = function () {
        throw new Error("XmlDtdElement nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdElement} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdElement.prototype.insertChild = function (node, index) {
        throw new Error("XmlDtdElement nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdElement} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdElement.prototype.removeChild = function (node) {
        throw new Error("XmlDtdElement nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdElement} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdElement.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDtdElement nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlDtdElement.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<!ELEMENT " + this.text + ">";
    };
    return XmlDtdElement;
}(XmlNode_1.default));
exports.default = XmlDtdElement;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML entity declaration in a document type definition.
 *
 * An XML entity declaration is structured as follows, where `{text}` is the
 * text of the declaration:
 *
 * ```xml
 * <!ENTITY {text}>
 * ```
 *
 * The `{text}` value is a property of this node.
 *
 * XmlDtdEntity nodes cannot have any children.
 */
var XmlDtdEntity = (function (_super) {
    __extends(XmlDtdEntity, _super);
    /**
     * Initializes a new instance of the {@link XmlDtdEntity} class.
     *
     * @param text The text associated with the XML entity declaration.
     */
    function XmlDtdEntity(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        return _this;
    }
    Object.defineProperty(XmlDtdEntity.prototype, "text", {
        /**
         * Gets the text associated with the XML entity declaration.
         *
         * @return The text associated with the XML entity declaration.
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets the text associated with the XML entity declaration.
         *
         * @param text The text associated with the XML entity declaration.
         */
        set: function (text) {
            if (!utils_1.isString(text)) {
                throw new TypeError("text should be a string");
            }
            else if (!validate_1.validateChar(text)) {
                throw new Error("data should not contain characters"
                    + " not allowed in XML");
            }
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlDtdEntity.prototype.children = function () {
        throw new Error("XmlDtdEntity nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdEntity.prototype.insertChild = function (node, index) {
        throw new Error("XmlDtdEntity nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdEntity.prototype.removeChild = function (node) {
        throw new Error("XmlDtdEntity nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdEntity} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdEntity.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDtdEntity nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlDtdEntity.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<!ENTITY " + this.text + ">";
    };
    return XmlDtdEntity;
}(XmlNode_1.default));
exports.default = XmlDtdEntity;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML notation declaration in a document type definition.
 *
 * An XML notation declaration is structured as follows, where `{text}` is the
 * text of the declaration:
 *
 * ```xml
 * <!NOTATION {text}>
 * ```
 *
 * The `{text}` value is a property of this node.
 *
 * XmlDtdNotation nodes cannot have any children.
 */
var XmlDtdNotation = (function (_super) {
    __extends(XmlDtdNotation, _super);
    /**
     * Initializes a new instance of the {@link XmlDtdNotation} class.
     *
     * @param text The text associated with the XML notation declaration.
     */
    function XmlDtdNotation(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        return _this;
    }
    Object.defineProperty(XmlDtdNotation.prototype, "text", {
        /**
         * Gets the text associated with the XML notation declaration.
         *
         * @return The text associated with the XML notation declaration.
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets the text associated with the XML notation declaration.
         *
         * @param text The text associated with the XML notation declaration.
         */
        set: function (text) {
            if (!utils_1.isString(text)) {
                throw new TypeError("text should be a string");
            }
            else if (!validate_1.validateChar(text)) {
                throw new Error("data should not contain characters"
                    + " not allowed in XML");
            }
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlDtdNotation} nodes cannot have any
     * children.
     *
     * @returns This method does not return.
     */
    XmlDtdNotation.prototype.children = function () {
        throw new Error("XmlDtdNotation nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdNotation} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdNotation.prototype.insertChild = function (node, index) {
        throw new Error("XmlDtdNotation nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdNotation} nodes cannot have any
     * children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdNotation.prototype.removeChild = function (node) {
        throw new Error("XmlDtdNotation nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdNotation} nodes cannot have any
     * children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdNotation.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDtdNotation nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlDtdNotation.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "<!NOTATION " + this.text + ">";
    };
    return XmlDtdNotation;
}(XmlNode_1.default));
exports.default = XmlDtdNotation;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

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
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlNode_1 = __webpack_require__(1);
/**
 * Represents an XML parameter entity reference in a document type definition.
 *
 * An XML parameter entity reference is structured as follows, where `{entity}`
 * is the name of the entity:
 *
 * ```xml
 * %{entity};
 * ```
 *
 * The `{entity}` value is a property of this node.
 *
 * XmlDtdParamEntityRef nodes cannot have any children.
 */
var XmlDtdParamEntityRef = (function (_super) {
    __extends(XmlDtdParamEntityRef, _super);
    /**
     * Initializes a new instance of the {@link XmlDtdParamEntityRef} class.
     *
     * @param entity The entity to be referenced.
     */
    function XmlDtdParamEntityRef(entity) {
        var _this = _super.call(this) || this;
        _this.entity = entity;
        return _this;
    }
    Object.defineProperty(XmlDtdParamEntityRef.prototype, "entity", {
        /**
         * Gets the entity to be referenced.
         *
         * @returns The entity to be referenced.
         */
        get: function () {
            return this._entity;
        },
        /**
         * Sets the entity to be referenced.
         *
         * @param entity The entity to be referenced.
         */
        set: function (entity) {
            if (!utils_1.isString(entity)) {
                throw new TypeError("entity should be a string");
            }
            else if (!validate_1.validateName(entity)) {
                throw new Error("entity should not contain characters"
                    + " not allowed in XML names");
            }
            this._entity = entity;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Throws an exception since {@link XmlDtdParamEntityRef} nodes cannot have
     * any children.
     *
     * @returns This method does not return.
     */
    XmlDtdParamEntityRef.prototype.children = function () {
        throw new Error("XmlDtdParamEntityRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdParamEntityRef} nodes cannot have
     * any children.
     *
     * @param node This parameter is unused.
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdParamEntityRef.prototype.insertChild = function (node, index) {
        throw new Error("XmlDtdParamEntityRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdParamEntityRef} nodes cannot have
     * any children.
     *
     * @param node This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdParamEntityRef.prototype.removeChild = function (node) {
        throw new Error("XmlDtdParamEntityRef nodes cannot have children");
    };
    /**
     * Throws an exception since {@link XmlDtdParamEntityRef} nodes cannot have
     * any children.
     *
     * @param index This parameter is unused.
     *
     * @returns This method does not return.
     */
    XmlDtdParamEntityRef.prototype.removeChildAtIndex = function (index) {
        throw new Error("XmlDtdParamEntityRef nodes cannot have children");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlDtdParamEntityRef.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        return "%" + this.entity + ";";
    };
    return XmlDtdParamEntityRef;
}(XmlNode_1.default));
exports.default = XmlDtdParamEntityRef;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var options_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var validate_1 = __webpack_require__(2);
var XmlAttribute_1 = __webpack_require__(11);
var XmlAttributeText_1 = __webpack_require__(7);
var XmlCdata_1 = __webpack_require__(12);
var XmlCharData_1 = __webpack_require__(13);
var XmlCharRef_1 = __webpack_require__(8);
var XmlComment_1 = __webpack_require__(4);
var XmlEntityRef_1 = __webpack_require__(9);
var XmlNode_1 = __webpack_require__(1);
var XmlProcInst_1 = __webpack_require__(5);
/**
 * Represents an XML element.
 *
 * A sample XML element is structured as follows, where `{name}` is the name
 * of the element:
 *
 * ```xml
 * <{name} attname="attvalue">
 *     <subelem/>
 *     <?pitarget picontent?>
 *     text
 * </{name}></pre>
 * ```
 *
 * The `{name}` value is a property of the node, while the attributes and
 * children of the element (such as other elements, processing instructions,
 * and text) are children of this node.
 *
 * XmlElement nodes can have an unlimited number of {@link XmlAttribute},
 * {@link XmlCdata}, {@link XmlCharRef}, {@link XmlComment},
 * {@link XmlElement}, {@link XmlEntityRef}, {@link XmlProcInst}, or
 * {@link XmlCharData} nodes as children.
 */
var XmlElement = (function (_super) {
    __extends(XmlElement, _super);
    /**
     * Initializes a new instance of the {@link XmlElement} class.
     *
     * @param name The name of the element.
     */
    function XmlElement(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    Object.defineProperty(XmlElement.prototype, "name", {
        /**
         * Gets the name of the element.
         *
         * @returns The name of the element.
         */
        get: function () {
            return this._name;
        },
        /**
         * Sets the name of the element.
         *
         * @param name The name of the element.
         */
        set: function (name) {
            if (!utils_1.isString(name)) {
                throw new TypeError("name should be a string");
            }
            else if (!validate_1.validateName(name)) {
                throw new Error("name should not contain characters not"
                    + " allowed in XML names");
            }
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inserts an new attribute at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param name The name of the attribute.
     * @param value The value of the attribute. Strings are converted to
     *        XmlAttributeText nodes.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns {XmlAttribute} The newly created attribute.
     */
    XmlElement.prototype.attribute = function (name, value, index) {
        if (utils_1.isString(value)) {
            value = new XmlAttributeText_1.default(value);
        }
        else if (utils_1.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                if (utils_1.isString(value[i])) {
                    value[i] = new XmlAttributeText_1.default(value[i]);
                }
            }
        }
        var attribute = new XmlAttribute_1.default(name, value);
        this.insertChild(attribute, index);
        return attribute;
    };
    /**
     * Returns an array containing all of the children of this node that are
     * instances of {@link XmlAttribute}.
     *
     * @returns An array containing all of the children of this node that are
     *          instances of {@link XmlAttribute}.
     */
    XmlElement.prototype.attributes = function () {
        return this._children.filter(function (node) { return node instanceof XmlAttribute_1.default; });
    };
    /**
     * Inserts a new CDATA section at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param content The data of the CDATA section.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created CDATA section.
     */
    XmlElement.prototype.cdata = function (content, index) {
        var cdata = new XmlCdata_1.default(content);
        this.insertChild(cdata, index);
        return cdata;
    };
    /**
     * Inserts some character data at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param charData Character data.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created text node.
     */
    XmlElement.prototype.charData = function (charData, index) {
        var charDataNode = new XmlCharData_1.default(charData);
        this.insertChild(charDataNode, index);
        return charDataNode;
    };
    /**
     * Inserts a new character reference at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param char The character to represent using the reference.
     * @param hex Whether to use the hexadecimal or decimal representation for
     *            the reference. If left undefined, decimal is the default.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created character reference.
     */
    XmlElement.prototype.charRef = function (char, hex, index) {
        var charRef = new XmlCharRef_1.default(char, hex);
        this.insertChild(charRef, index);
        return charRef;
    };
    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param content The data of the comment.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created comment.
     */
    XmlElement.prototype.comment = function (content, index) {
        var comment = new XmlComment_1.default(content);
        this.insertChild(comment, index);
        return comment;
    };
    /**
     * Inserts a new element at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param name The name of the element.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created element.
     */
    XmlElement.prototype.element = function (name, index) {
        var element = new XmlElement(name);
        this.insertChild(element, index);
        return element;
    };
    /**
     * Inserts a new entity reference at the specified index. If no index is
     * specified, the node is inserted at the end of this node's children.
     *
     * @param entity The entity to be referenced.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this
     *              node's children.
     *
     * @returns The newly created entity reference.
     */
    XmlElement.prototype.entityRef = function (entity, index) {
        var entityRef = new XmlEntityRef_1.default(entity);
        this.insertChild(entityRef, index);
        return entityRef;
    };
    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Note that only {@link XmlAttribute}, {@link XmlCdata},
     * {@link XmlCharRef}, {@link XmlComment}, {@link XmlElement},
     * {@link XmlEntityRef}, {@link XmlProcInst}, or {@link XmlCharData} nodes
     * can be inserted; otherwise, an exception will be thrown.
     *
     * @param node The node to insert.
     * @param index The index at which to insert the node. Nodes at or after
     *              the index are shifted to the right. If no index is
     *              specified, the node is inserted at the end.
     *
     * @returns The node inserted into this node's children, or undefined if no
     *          node was inserted.
     */
    XmlElement.prototype.insertChild = function (node, index) {
        if (!(node instanceof XmlAttribute_1.default
            || node instanceof XmlCdata_1.default
            || node instanceof XmlCharRef_1.default
            || node instanceof XmlComment_1.default
            || node instanceof XmlElement
            || node instanceof XmlEntityRef_1.default
            || node instanceof XmlProcInst_1.default
            || node instanceof XmlCharData_1.default)) {
            throw new TypeError("node should be an instance of XmlAttribute,"
                + " XmlCdata, XmlCharRef, XmlComment,"
                + " XmlElement, XmlEntityRef, XmlProcInst,"
                + " or XmlText");
        }
        if (node instanceof XmlAttribute_1.default) {
            var attributes = this._children.filter(function (n) { return n instanceof XmlAttribute_1.default; });
            for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
                var attribute = attributes_1[_i];
                if (attribute.name === node.name) {
                    throw new Error("element already contains an"
                        + " XmlAttribute object with name "
                        + node.name);
                }
            }
        }
        return _super.prototype.insertChild.call(this, node, index);
    };
    /**
     * Inserts a new processing instruction at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param target The target of the processing instruction.
     * @param content The data of the processing instruction, or undefined if
     *                there is no target.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created processing instruction.
     */
    XmlElement.prototype.procInst = function (target, content, index) {
        var procInst = new XmlProcInst_1.default(target, content);
        this.insertChild(procInst, index);
        return procInst;
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param options Formatting options for the string representation.
     *
     * @returns An XML string representation of this node.
     */
    XmlElement.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var optionsObj = new options_1.StringOptions(options);
        var attributes = this.attributes();
        var nodes = this._children.filter(function (node) { return attributes.indexOf(node) === -1; });
        // Element tag start
        var str = "<" + this._name;
        // Attributes
        for (var _i = 0, attributes_2 = attributes; _i < attributes_2.length; _i++) {
            var attribute = attributes_2[_i];
            str += " " + attribute.toString(options);
        }
        // Child nodes
        if (nodes.length > 0) {
            // Element non-empty tag end
            str += ">";
            var indenter = function (line) { return optionsObj.indent + line; };
            for (var i = 0; i < nodes.length; i++) {
                var next = nodes[i];
                var nextStr = next.toString(options);
                var prev = i > 0 ? nodes[i - 1] : undefined;
                // Line break before child nodes unless all nodes, or at least
                // the most recent two, are of type XmlCharacterReference,
                // XmlEntityReference, or XmlCharData
                if (optionsObj.pretty) {
                    if (!allSameLineNodes(nodes)) {
                        if (!(i > 0 && onSameLine(next, prev))) {
                            str += optionsObj.newline;
                            nextStr = nextStr.split(optionsObj.newline)
                                .map(indenter)
                                .join(optionsObj.newline);
                        }
                    }
                }
                str += nextStr;
            }
            // Line break before end tag unless all nodes are of type
            // XmlCharacterReference, XmlEntityReference, or XmlCharData
            if (optionsObj.pretty) {
                if (!allSameLineNodes(nodes)) {
                    str += optionsObj.newline;
                }
            }
            // Element end tag
            str += "</" + this._name + ">";
        }
        else {
            // Element empty tag end
            str += "/>";
        }
        return str;
    };
    return XmlElement;
}(XmlNode_1.default));
exports.default = XmlElement;
/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlCharData}.
 *
 * @param nodes The specified nodes.
 *
 * @returns Whether or not the specified nodes are all of type
 *          {@link XmlCharRef}, {@link XmlEntityRef}, or {@link XmlCharData}.
 *
 * @private
 */
function allSameLineNodes(nodes) {
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        if (!((node instanceof XmlCharRef_1.default
            || node instanceof XmlEntityRef_1.default
            || node instanceof XmlCharData_1.default))) {
            return false;
        }
    }
    return true;
}
/**
 * Returns true if the specified nodes are all of type {@link XmlCharRef},
 * {@link XmlEntityRef}, or {@link XmlCharData}.
 *
 * @param prev The first specified node.
 * @param next The second specified node.
 *
 * @returns Whether or not the specified nodes are all of type
 *          {@link XmlCharRef}, {@link XmlEntityRef}, or {@link XmlCharData}.
 *
 * @private
 */
function onSameLine(prev, next) {
    return (prev instanceof XmlCharRef_1.default
        || prev instanceof XmlEntityRef_1.default
        || prev instanceof XmlCharData_1.default)
        && (next instanceof XmlCharRef_1.default
            || next instanceof XmlEntityRef_1.default
            || next instanceof XmlCharData_1.default);
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @private
 */
function isString(val) {
    return Object.prototype.toString.call(val) === "[object String]";
}
exports.isString = isString;
/**
 * @private
 */
function isNumber(val) {
    return Object.prototype.toString.call(val) === "[object Number]";
}
exports.isNumber = isNumber;
/**
 * @private
 */
function isBoolean(val) {
    return Object.prototype.toString.call(val) === "[object Boolean]";
}
exports.isBoolean = isBoolean;
/**
 * @private
 */
function isUndefined(val) {
    return Object.prototype.toString.call(val) === "[object Undefined]";
}
exports.isUndefined = isUndefined;
/**
 * @private
 */
function isNull(val) {
    return Object.prototype.toString.call(val) === "[object Null]";
}
exports.isNull = isNull;
/**
 * @private
 */
function isPrimitive(val) {
    return isString(val)
        || isNumber(val)
        || isBoolean(val)
        || isUndefined(val)
        || isNull(val);
}
exports.isPrimitive = isPrimitive;
/**
 * @private
 */
function isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
}
exports.isObject = isObject;
/**
 * @private
 */
function isArray(val) {
    return Object.prototype.toString.call(val) === "[object Array]";
}
exports.isArray = isArray;
/**
 * @private
 */
function isStringArray(val) {
    if (!isArray(val)) {
        return false;
    }
    for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
        var entry = val_1[_i];
        if (!isString(entry)) {
            return false;
        }
    }
    return true;
}
exports.isStringArray = isStringArray;
/**
 * @private
 */
function isFunction(val) {
    return Object.prototype.toString.call(val) === "[object Function]";
}
exports.isFunction = isFunction;
/**
 * @private
 */
function isSet(val) {
    return Object.prototype.toString.call(val) === "[object Set]";
}
exports.isSet = isSet;
/**
 * @private
 */
function isMap(val) {
    return Object.prototype.toString.call(val) === "[object Map]";
}
exports.isMap = isMap;
/**
 * Returns a string representation of the specified value, as given by the
 * value's toString() method (if it has one) or the global String() function
 * (if it does not).
 *
 * @param value The value to convert to a string.
 *
 * @returns A string representation of the specified value.
 *
 * @private
 */
function stringify(value) {
    if (!isUndefined(value) && !isNull(value)) {
        if (!isFunction(value.toString)) {
            value = value.toString();
        }
    }
    return String(value);
}
exports.stringify = stringify;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var request = __webpack_require__(24);
var js2xml = __webpack_require__(30);
var utility_1 = __webpack_require__(34);
//for using Promise on es5
var es6_promise_1 = __webpack_require__(35);
/**
 * Personiumを扱うためのクライアントライブラリ
 */
var PersoniumClient = /** @class */ (function () {
    /**
     * コンストラクタ
     * @param unit ホスト名
     * @param protocol プロトコル
     */
    function PersoniumClient(unit, protocol) {
        /**
         * プロトコル（デフォルト:https）
         */
        this.protocol = "https";
        /**
         * Personiumのサーバホスト名
         */
        this.host = null;
        /**
         * アクセストークン情報
         */
        this.personiumToken = null;
        /**
         * アクセストークン
         */
        this.token = null;
        /**
         * アクセストークンの有効期限
         */
        this.expiresIn = 3600;
        /**
         * ログイン時刻 - 認証の有効期限内かどうかを確認
         */
        this.loginTime = 0;
        /**
         * expireの確認タイマー
         */
        this.expireCallbackTimer = null;
        if (!unit) {
            console.warn("Please set `host` address");
        }
        else if (unit.lastIndexOf("http") === 0) {
            console.warn("`host` does not need protocol prefix");
        }
        if (protocol) {
            this.protocol = protocol;
        }
        this.host = unit;
    }
    /**
     * 認証の有効性チェック
     */
    PersoniumClient.prototype.authValidate = function () {
        var result = (+new Date() - this.loginTime) / 1000 < this.expiresIn;
        if (!result) {
            this.expireCallback && this.expireCallback(this.personiumToken.refresh_token);
            console.warn("Maybe you have to re-login while your token is expired");
        }
        return result;
    };
    /**
     * Personiumへログイン
     * @param cell ログイン対象のセル名
     * @param username ユーザ名
     * @param password パスワード
     * @param expireCallback 有効期限が切れ際に呼び出すコールバック
     */
    PersoniumClient.prototype.login = function (cell, username, password, expireCallback) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var url = _this.createCellSchema(cell) + "__token";
            _this.expireCallback = expireCallback && expireCallback;
            request
                .post(url)
                .set("Accept", "application/json")
                .type("form")
                .send({ grant_type: "password", username: username, password: password })
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var token_1 = JSON.parse(res.text);
                    _this.personiumToken = token_1;
                    _this.token = token_1.access_token;
                    _this.expiresIn = token_1.expires_in;
                    _this.loginTime = +new Date();
                    // タイムアウトを見る
                    var timeout = Number(_this.expiresIn) * 900; //直前に教えてあげる
                    _this.expireCallbackTimer = setTimeout(function () {
                        _this.expireCallbackTimer = null;
                        _this.expireCallback && _this.expireCallback(token_1.refresh_token);
                    }, timeout);
                    resolve(token_1);
                }
            });
        });
    };
    /**
     * schema認証トークンの取得
     * @param cell 個人のセル
     * @param username ユーザ名
     * @param password パスワード
     * @param appCell アプリセル
     * @param appId アプリセルId
     * @param appPass アプリセルPass
     */
    PersoniumClient.prototype.appLogin = function (cell, username, password, appCell, appId, appPass) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var cellUrl = _this.createCellSchema(cell);
            var appCellUrl = _this.createCellSchema(appCell);
            var appCellTokenUrl = appCellUrl + "__token";
            request
                .post(appCellTokenUrl)
                .set("Accept", "application/json")
                .type("form")
                .send({ grant_type: "password", username: appId, password: appPass, p_target: cellUrl })
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var appToken = JSON.parse(res.text);
                    var schemaTokenUrl = cellUrl + "__token";
                    request
                        .post(schemaTokenUrl)
                        .set("Accept", "application/json")
                        .type("form")
                        .send({ grant_type: "password", username: username, password: password, client_id: appCellUrl, client_secret: appToken.access_token })
                        .end(function (error, res) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            var token = JSON.parse(res.text);
                            _this.personiumToken = token;
                            _this.token = token.access_token;
                            _this.expiresIn = token.expires_in;
                            _this.loginTime = +new Date();
                            resolve(token);
                        }
                    });
                }
            });
        });
    };
    /**
     * アクセストークンの更新やトランスセルトークンを作成
     * @param cell セル名
     * @param refreshToken リフレッシュ用トークン（login時に取得）
     * @param target トランスセルトークンを生成する場合は指定
     */
    PersoniumClient.prototype.refreshAccessToken = function (cell, refreshToken, target) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var url = _this.createCellSchema(cell) + "__token";
            var tokenSeeds = target ? {
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                p_target: _this.createCellSchema(target),
            } : {
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            };
            request
                .post(url)
                .set("Accept", "application/json")
                .type("form")
                .send(tokenSeeds)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var token_2 = JSON.parse(res.text);
                    _this.personiumToken = token_2;
                    _this.token = token_2.access_token;
                    // タイムアウトを見る
                    _this.expiresIn = token_2.expires_in;
                    var timeout = Number(_this.expiresIn) * 900; //直前に教えてあげる
                    _this.expireCallbackTimer = setTimeout(function () {
                        _this.expireCallbackTimer = null;
                        _this.expireCallback && _this.expireCallback(token_2.refresh_token);
                    }, timeout);
                    resolve(token_2);
                }
            });
        });
    };
    /**
     * ロールを作成する
     * @param cell 対象セル名
     * @param role ロール名
     * @param box Mainボックス以外を対象とする場合はボックス名を指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.createRole = function (cell, role, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Role/";
            var boxName = box || null;
            var data = {};
            if (!role) {
                reject();
            }
            else {
                data = {
                    Name: role,
                };
                if (box) {
                    data = {
                        Name: role,
                        "_Box.Name": boxName,
                    };
                }
                request
                    .post(url)
                    .set("Accept", "application/json")
                    .set("Authorization", "Bearer " + token)
                    .send(data)
                    .end(function (error, res) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
        });
    };
    /**
     * ロール情報の取得
     * @param cell 対象セル名
     * @param role 特定のロール情報が取得したい場合は指定
     * @param box 特定のボックスの特定のロール情報が取得したい場合は指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.getRole = function (cell, role, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Role";
            if (role) {
                url += "(Name='" + role + "')";
            }
            else if (role && box) {
                url += "(Name='" + role + "',_Box.Name='" + box + "')";
            }
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    };
    /**
     * ロールを削除する（紐付けがあると削除できない場合がある）
     * @param cell 対象セル名
     * @param role 特定のロールを削除したい場合は指定
     * @param box 特定のボックスの特定のロールが削除したい場合は指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteRole = function (cell, role, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Role";
            if (box) {
                url += "(Name='" + role + "',_Box.Name='" + box + "')";
            }
            else {
                url += "(Name='" + role + "')";
            }
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * 外部セルを設定する
     * @param cell 対象セル
     * @param setCellUrl 外部セルに指定したいセルのURL
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.setExtCell = function (cell, setCellUrl, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/ExtCell/";
            var data = {
                Url: setCellUrl,
            };
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(data)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * 外部セル一覧を取得
     * @param cell 対象セル
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.getExtCellList = function (cell, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/ExtCell/";
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    };
    /**
     * 外部セルの解除
     * @param cell セル名
     * @param deleteCellUrl 削除するセルのURL
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteExtCell = function (cell, deleteCellUrl, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/ExtCell('" + utility_1.Encode(deleteCellUrl) + "')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * 外部セルに対してロールかリレーションを設定する
     * @param cell 対象セル名
     * @param targetCellUrl 指定する外部セルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param name ロールかリレーションに指定する名前
     * @param box ボックス名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.setExtCellLink = function (cell, targetCellUrl, type, name, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/ExtCell('" + utility_1.Encode(targetCellUrl) + "')/\$links/" + type;
            var role = "";
            if (name && box) {
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
            }
            else if (name) {
                role = "(Name='" + name + "')";
            }
            var data = {
                uri: _this.createCellSchema(cell) + "__ctl/" + type.substring(1) + role
            };
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(data)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * 外部セルに紐づけたリンクの一覧
     * @param cell セル名
     * @param targetCellUrl 対象に指定するセルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.getExtCellLink = function (cell, targetCellUrl, type, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/ExtCell('" + utility_1.Encode(targetCellUrl) + "')/\$links/" + type;
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    };
    /**
     * 外部セルのリンクを削除
     * @param cell セル名
     * @param targetCellUrl 対象として指定するセルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param name 削除するロール/リレーション名
     * @param box 削除するロールのあるボックス名（デフォルトはメインbox）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteExtCellLink = function (cell, targetCellUrl, type, name, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var role = "";
            if (box) {
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
            }
            else {
                role = "(Name='" + name + "')";
            }
            var url = _this.createCellSchema(cell) + "__ctl/ExtCell('" + utility_1.Encode(targetCellUrl) + "')/\$links/" + type + role;
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * アカウントのリンクを設定
     * @param cell セル名
     * @param account 対象として指定するアカウント名
     * @param name 設定するロール名
     * @param box 設定するロールのあるボックス名（デフォルトはメインbox）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.setAccountLink = function (cell, account, name, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var role = _this.createCellSchema(cell) + "__ctl/Role";
            if (box) {
                role += "(Name='" + name + "',_Box.Name='" + box + "')";
            }
            else {
                role += "(Name='" + name + "')";
            }
            var url = _this.createCellSchema(cell) + "__ctl/Account('" + account + "')/\$links/_Role";
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send({ uri: role })
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * アカウントのリンクを削除
     * @param cell セル名
     * @param account 対象として指定するアカウント名
     * @param name 削除するロール名
     * @param box 削除するロールのあるボックス名（デフォルトはメインbox）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteAccountLink = function (cell, account, name, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var role = "";
            if (box) {
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
            }
            else {
                role = "(Name='" + name + "')";
            }
            var url = _this.createCellSchema(cell) + "__ctl/Account('" + account + "')/\$links/_Role" + role;
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * アカウントを削除
     * @param cell セル名
     * @param account 対象として指定するアカウント名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteAccount = function (cell, account, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Account('" + account + "')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * ルール一覧の取得
     * @param cell セル名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.getRules = function (cell, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Rule";
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    };
    /**
     * ルールを設定する
     * @param cell 対象セル
     * @param rule 登録するルール
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.setRule = function (cell, rule, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Rule";
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(rule)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * ルールを削除する
     * @param cell 対象セル
     * @param ruleName 削除するルールName
     * @param box ボックスに紐づいてる場合はbox名指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteRule = function (cell, ruleName, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Rule";
            if (box) {
                url += "(Name='" + ruleName + "',_Box.Name='" + box + "')";
            }
            else {
                url += "(Name='" + ruleName + "')";
            }
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * メッセージの送信API
     * @param cell セル名
     * @param to 宛先セル名
     * @param type メッセージ送信タイプの指定
     * @param requestContent 登録依頼した関係情報(URL)
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.sendMessage = function (cell, to, type, requestContent, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var cellUrl = _this.createCellSchema(cell);
            var toUrl = _this.createCellSchema(to);
            var url = cellUrl + "__message/send/";
            var body = {};
            if (type.lastIndexOf("req.rule.", 0) === 0) {
                body = {
                    To: toUrl,
                    Type: type,
                    RequestRule: requestContent,
                };
            }
            else if (type.lastIndexOf("req.role.", 0) === 0) {
                body = {
                    To: toUrl,
                    Type: type,
                    RequestRelation: requestContent,
                    RequestRelationTarget: cellUrl,
                };
            }
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(body)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(JSON.parse(res.text));
                }
            });
        });
    };
    /**
     * TODO receiveMessage
     */
    PersoniumClient.prototype.receiveMessage = function () { };
    /**
     * ACLを設定する
     * @param cell 対象セル
     * @param acl 設定するACLのjson(XMLに変換)
     */
    PersoniumClient.prototype.setAcl = function (cell, aces, targetPath, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var cellurl = _this.createCellSchema(cell);
            var url = targetPath ? cellurl + targetPath : cellurl;
            var acl = {
                "@": {
                    "xmlns:D": "DAV:",
                    "xmlns:p": "urn:x-personium:xmlns",
                },
                "D:ace": aces,
            };
            var aclXml = js2xml.parse("D:acl", acl);
            var xhr = new XMLHttpRequest();
            xhr.open("ACL", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var b = xhr.responseText;
                    resolve(true);
                }
            };
            xhr.setRequestHeader("Content-Type", "application/xml");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            xhr.send(aclXml);
        });
    };
    /**
     * サービスコレクションソース作成
     * @param cell 対象セル
     * @param path パス
     * @param name Resorce名
     * @param resource Resorce中身
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.createServiceCollection = function (cell, path, name, resource, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path + "/__src/" + name;
            request
                .put(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .set("Content-Type", "text/javascript")
                .send(resource)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * サービスコレクションソース設定適用
     * @param cell 対象セル
     * @param path パス
     * @param script スクリプト名(xxx.js)
     * @param service サービス名(yyy)
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.setServiceCollection = function (cell, path, script, service, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path;
            var prop = {
                "@": {
                    "xmlns:D": "DAV:",
                    "xmlns:p": "urn:x-personium:xmlns",
                    "xmlns:z": "http://www.w3.com/standards/z39.50/",
                },
                "D:set": {
                    "D:prop": {
                        "p:service": {
                            "@": {
                                "language": "JavaScript",
                            },
                            path: {
                                "@": {
                                    name: service,
                                    src: script,
                                },
                            },
                        },
                    },
                },
            };
            var propXml = js2xml.parse("D:propertyupdate", prop);
            var xhr = new XMLHttpRequest();
            xhr.open("PROPPATCH", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var b = xhr.responseText;
                    resolve(true);
                }
            };
            xhr.setRequestHeader("Content-Type", "application/xml");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            xhr.send(propXml);
        });
    };
    /**
     * サービスコレクションソース削除
     * @param cell 対象セル
     * @param path パス
     * @param name Resorce名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteServiceCollection = function (cell, path, name, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path + "/__src/" + name;
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * エンティティタイプの削除
     * @param cell 対象のセル名
     * @param path エンティティのパス
     * @param id エンティティid
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteEntityType = function (cell, path, entityTypeName, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path + "/$metadata/EntityType('" + entityTypeName + "')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * Propertyの削除
     * @param cell 対象のセル名
     * @param path エンティティのパス
     * @param entityType エンティティタイプの名前
     * @param property propertyの名前
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteProperty = function (cell, path, entityType, property, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path + "/$metadata/Property(Name='" + property + "',_EntityType.Name='" + entityType + "')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * Boxの削除
     * @param cell 対象のセル名
     * @param box box名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteBox = function (cell, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Box(Name='" + box + "')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * プロファイル情報を取得
     * @param cell
     */
    PersoniumClient.prototype.getProfile = function (cell) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var cellurl = _this.createCellSchema(cell);
            var url = cellurl + "__/profile.json";
            request
                .get(url)
                .set("Accept", "application/json")
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var response = JSON.parse(res.text);
                    resolve(response);
                }
            });
        });
    };
    /**
     * アプリセル専用
     * アプリ起動情報を取得
     * @param cell
     */
    PersoniumClient.prototype.getLaunch = function (cell) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var cellurl = _this.createCellSchema(cell);
            var url = cellurl + "__/launch.json";
            request
                .get(url)
                .set("Accept", "application/json")
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var response = JSON.parse(res.text);
                    resolve(response);
                }
            });
        });
    };
    /**
     * Barインストール
     * @param barUrl
     */
    PersoniumClient.prototype.barInstall = function (cell, box, barUrl, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var cellurl = _this.createCellSchema(cell);
            var url = cellurl + box;
            request.get(barUrl)
                .responseType("blob")
                .end(function (error, res1) {
                if (error) {
                    reject(error);
                }
                else {
                    var file = res1.body;
                    var xhr_1 = new XMLHttpRequest();
                    xhr_1.open("MKCOL", url, true);
                    xhr_1.onreadystatechange = function () {
                        if (xhr_1.readyState === 4) {
                            var b = xhr_1.responseText;
                            resolve(true);
                        }
                    };
                    xhr_1.setRequestHeader("Content-Type", "application/zip");
                    xhr_1.setRequestHeader("Authorization", "Bearer " + token);
                    xhr_1.send(file);
                }
            });
        });
    };
    /**
     * エンティティデータの存在確認
     * @param cell セル名
     * @param path パス
     * @param ___id エンティティid
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.isExist = function (cell, path, __id, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = null;
            if (__id) {
                url = _this.createCellSchema(cell) + path + "('" + __id + "')";
            }
            else {
                url = _this.createCellSchema(cell) + path;
            }
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * エンティティ取得
     * @param cell 対象セル名
     * @param path パス
     * @param query クエリ（TODO 未完成）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.get = function (cell, path, query, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path;
            if (typeof query === "string") {
                url += utility_1.Encode("?$orderby=" + query);
            }
            else if (query) {
                url = utility_1.convertQueriedUrl(url, query);
            }
            else {
                url += utility_1.Encode("?$orderby=__updated%20desc");
            }
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    };
    /**
     * エンティティ書き込み
     * @param cell 対象セル
     * @param path パス
     * @param entity エンティティ情報
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.post = function (cell, path, entity, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path;
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(entity)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    var response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    };
    /**
     * エンティティ上書き
     * @param cell 対象セル名
     * @param path パス
     * @param id エンティティid
     * @param entity 上書きするエンティティ情報
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.update = function (cell, path, id, entity, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path + "('" + id + "')";
            request
                .put(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(entity)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * エンティティの削除
     * @param cell 対象のセル名
     * @param path エンティティのパス
     * @param id エンティティid
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.delete = function (cell, path, id, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = id ?
                _this.createCellSchema(cell) + path + "('" + id + "')" :
                _this.createCellSchema(cell) + path;
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end(function (error, res) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * セル名からセルスキーマURLを作成する
     * @param cell
     */
    PersoniumClient.prototype.createCellSchema = function (cell) {
        return this.protocol + "://" + this.host + "/" + cell + "/";
    };
    /**
     * セルスキーマURLからセル名を抽出する
     * @param url
     */
    PersoniumClient.prototype.extractCellName = function (url) {
        var cell = url.substring(url.indexOf(this.host) + this.host.length + 1, url.lastIndexOf("/"));
        return cell;
    };
    /**
     * 停止時
     */
    PersoniumClient.prototype.dispose = function () {
        if (this.expireCallbackTimer) {
            clearTimeout(this.expireCallbackTimer);
        }
    };
    return PersoniumClient;
}());
exports.PersoniumClient = PersoniumClient;
// /*
// //TODO スキーマ認証用のAPI。
// //Personiumアプリマーケット利用時に使うことになるやもしれぬ。
// export const transcelltoken = (joshi: string, buka: string) => {
//   return new Promise<any>((resolve, reject) => {
//     const url = createCellSchema(buka)+"__token";
//     request
//       .post(url)
//       .set("Accept", "application/json")
//       .type("form")
//       .send({
//         grant_type: "password", 
//         username: "bob",  //TODO 
//         password: "piyopiyo", //TODO 
//         p_target: createCellSchema(joshi),
//       })
//       .end((error, res)=>{
//         if(error){
//           reject(error);
//         }
//         else {
//           resolve(JSON.parse(res.text));
//         }
//       });
//   });
// };
// export const refreshAccessToken = (joshi: string, buka: string, accessToken, refreshToken) => {
//   return new Promise<any>((resolve, reject) => {
//     const url = createCellSchema(joshi)+"__token";
//     request
//       .post(url)
//       .set("Accept", "application/json")
//       .type("form")
//       .send({
//         grant_type: "refresh_token", 
//         refresh_token: refreshToken,
//         client_id: createCellSchema(buka),
//         client_secret: accessToken,
//       })
//       .end((error, res)=>{
//         if(error){
//           reject(error);
//         }
//         else {
//           resolve(JSON.parse(res.text));
//         }
//       });
//   });
// };
// */
// module.exports = PersoniumClient; 


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = __webpack_require__(25);
var RequestBase = __webpack_require__(26);
var isObject = __webpack_require__(10);
var ResponseBase = __webpack_require__(27);
var shouldRetry = __webpack_require__(29);

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only version of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;

    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
    break;
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = __webpack_require__(10);

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if ('function' === typeof this._sort) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = function() {console.trace("Unsupported");}

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var utils = __webpack_require__(28);

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (C) 2016-2017 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var xmlcreate_1 = __webpack_require__(31);
var options_1 = __webpack_require__(33);
var utils_1 = __webpack_require__(22);
/**
 * Parses a string into XML.
 *
 * @param str The string to parse into XML.
 * @param parentElement The XML element or attribute that will contain the
 *                      string.
 * @param options Options for parsing the string into XML.
 *
 * @private
 */
function parseString(str, parentElement, options) {
    var requiresCdata = function (s) {
        return (options.cdataInvalidChars && (s.indexOf("<") !== -1
            || s.indexOf("&") !== -1))
            || options.cdataKeys.indexOf(parentElement.name) !== -1
            || options.cdataKeys.indexOf("*") !== -1;
    };
    if (parentElement instanceof xmlcreate_1.XmlElement) {
        if (requiresCdata(str)) {
            var cdataStrs = str.split("]]>");
            for (var i = 0; i < cdataStrs.length; i++) {
                if (requiresCdata(cdataStrs[i])) {
                    parentElement.cdata(cdataStrs[i]);
                }
                else {
                    parentElement.charData(cdataStrs[i]);
                }
                if (i < cdataStrs.length - 1) {
                    parentElement.charData("]]>");
                }
            }
        }
        else {
            parentElement.charData(str);
        }
    }
    else {
        parentElement.text(str);
    }
}
/**
 * Parses an attribute into XML.
 *
 * @param name The name of the attribute.
 * @param value The value of the attribute.
 * @param parentElement The XML element that will contain the string.
 * @param options Options for parsing the attribute into XML.
 *
 * @private
 */
function parseAttribute(name, value, parentElement, options) {
    var attribute = parentElement.attribute(name, "");
    if (utils_1.isPrimitive(value)) {
        parseString(utils_1.stringify(value), attribute, options);
    }
    else {
        throw new Error("attribute value for name '" + name + "' should be a"
            + " primitive (string, number, boolean, null, or"
            + " undefined)");
    }
}
/**
 * Parses an object or Map entry into XML.
 *
 * @param key The key associated with the object or Map entry.
 * @param value The object or map entry.
 * @param parentElement The XML element that will contain the object or map
 *                      entry.
 * @param options Options for parsing the object or map entry into XML.
 *
 * @private
 */
function parseObjectOrMapEntry(key, value, parentElement, options) {
    // Alias key
    if (key === options.aliasString) {
        if (!utils_1.isString(value)) {
            throw new Error("aliasString value for " + value
                + " should be a string");
        }
        parentElement.name = value;
        return;
    }
    // Attributes key
    if (key.indexOf(options.attributeString) === 0) {
        if (utils_1.isObject(value)) {
            for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
                var subkey = _a[_i];
                parseAttribute(subkey, value[subkey], parentElement, options);
            }
        }
        else {
            throw new Error("attributes object for " + key + " should be an"
                + " object");
        }
        return;
    }
    // Value key
    if (key.indexOf(options.valueString) === 0) {
        if (utils_1.isPrimitive(value)) {
            parseValue(key, value, parentElement, options);
            return;
        }
        else {
            throw new Error("value " + value + " should be a primitive"
                + " (string, number, boolean, null, or undefined)");
        }
    }
    // Standard handling (create new element for entry)
    var element = parentElement;
    if (!utils_1.isArray(value) && !utils_1.isSet(value)) {
        element = parentElement.element(key);
    }
    parseValue(key, value, element, options);
}
/**
 * Parses an Object or Map into XML.
 *
 * @param objectOrMap The object or map to parse into XML.
 * @param parentElement The XML element that will contain the object.
 * @param options Options for parsing the object into XML.
 *
 * @private
 */
function parseObjectOrMap(objectOrMap, parentElement, options) {
    if (utils_1.isMap(objectOrMap)) {
        objectOrMap.forEach(function (value, key) {
            parseObjectOrMapEntry(utils_1.stringify(key), value, parentElement, options);
        });
    }
    else {
        for (var _i = 0, _a = Object.keys(objectOrMap); _i < _a.length; _i++) {
            var key = _a[_i];
            parseObjectOrMapEntry(key, objectOrMap[key], parentElement, options);
        }
    }
}
/**
 * Parses an array or Set into XML.
 *
 * @param key The key associated with the array or set to parse into XML.
 * @param arrayOrSet The array or set to parse into XML.
 * @param parentElement The XML element that will contain the function.
 * @param options Options for parsing the array or set into XML.
 *
 * @private
 */
function parseArrayOrSet(key, arrayOrSet, parentElement, options) {
    var arrayNameFunc;
    if (options.wrapHandlers.hasOwnProperty("*")) {
        arrayNameFunc = options.wrapHandlers["*"];
    }
    if (options.wrapHandlers.hasOwnProperty(key)) {
        arrayNameFunc = options.wrapHandlers[key];
    }
    var arrayKey = key;
    var arrayElement = parentElement;
    if (!utils_1.isUndefined(arrayNameFunc)) {
        var arrayNameFuncKey = arrayNameFunc(arrayKey, arrayOrSet);
        if (utils_1.isString(arrayNameFuncKey)) {
            arrayKey = arrayNameFuncKey;
            arrayElement = parentElement.element(key);
        }
        else if (!utils_1.isNull(arrayNameFuncKey)) {
            throw new Error("wrapHandlers function for " + arrayKey
                + " should return a string or null");
        }
    }
    arrayOrSet.forEach(function (item) {
        var element = arrayElement;
        if (!utils_1.isArray(item) && !utils_1.isSet(item)) {
            element = arrayElement.element(arrayKey);
        }
        parseValue(arrayKey, item, element, options);
    });
}
/**
 * Parses an arbitrary JavaScript value into XML.
 *
 * @param key The key associated with the value to parse into XML.
 * @param value The value to parse into XML.
 * @param parentElement The XML element that will contain the value.
 * @param options Options for parsing the value into XML.
 *
 * @private
 */
function parseValue(key, value, parentElement, options) {
    // If a handler for a particular type is user-defined, use that handler
    // instead of the defaults
    var type = Object.prototype.toString.call(value);
    var handler;
    if (options.typeHandlers.hasOwnProperty("*")) {
        handler = options.typeHandlers["*"];
    }
    if (options.typeHandlers.hasOwnProperty(type)) {
        handler = options.typeHandlers[type];
    }
    if (!utils_1.isUndefined(handler)) {
        value = handler(value);
    }
    if (utils_1.isObject(value) || utils_1.isMap(value)) {
        parseObjectOrMap(value, parentElement, options);
        return;
    }
    if (utils_1.isArray(value) || utils_1.isSet(value)) {
        parseArrayOrSet(key, value, parentElement, options);
        return;
    }
    parseString(utils_1.stringify(value), parentElement, options);
}
/**
 * Returns a XML document corresponding to the specified value.
 *
 * @param root The name of the root XML element. When the value is converted to
 *             XML, it will be a child of this root element.
 * @param value The value to convert to XML.
 * @param options Options for parsing the value into XML.
 *
 * @returns An XML document corresponding to the specified value.
 *
 * @private
 */
function parseToDocument(root, value, options) {
    var document = new xmlcreate_1.XmlDocument(root);
    if (options.declaration.include) {
        document.decl(options.declaration);
    }
    if (options.dtd.include) {
        document.dtd(options.dtd.name, options.dtd.sysId, options.dtd.pubId);
    }
    parseValue(root, value, document.root(), options);
    return document;
}
/**
 * Returns a XML string representation of the specified object.
 *
 * @param root The name of the root XML element. When the object is converted
 *             to XML, it will be a child of this root element.
 * @param object The object to convert to XML.
 * @param options Options for parsing the object and formatting the resulting
 *                XML.
 *
 * @returns An XML string representation of the specified object.
 */
function parse(root, object, options) {
    var opts = new options_1.Options(options);
    var document = parseToDocument(root, object, opts);
    return document.toString(opts.format);
}
exports.parse = parse;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var XmlAttribute_1 = __webpack_require__(11);
exports.XmlAttribute = XmlAttribute_1.default;
var XmlAttributeText_1 = __webpack_require__(7);
exports.XmlAttributeText = XmlAttributeText_1.default;
var XmlCdata_1 = __webpack_require__(12);
exports.XmlCdata = XmlCdata_1.default;
var XmlCharData_1 = __webpack_require__(13);
exports.XmlCharData = XmlCharData_1.default;
var XmlCharRef_1 = __webpack_require__(8);
exports.XmlCharRef = XmlCharRef_1.default;
var XmlComment_1 = __webpack_require__(4);
exports.XmlComment = XmlComment_1.default;
var XmlDecl_1 = __webpack_require__(14);
exports.XmlDecl = XmlDecl_1.default;
var XmlDocument_1 = __webpack_require__(32);
exports.XmlDocument = XmlDocument_1.default;
var XmlDtd_1 = __webpack_require__(15);
exports.XmlDtd = XmlDtd_1.default;
var XmlDtdAttlist_1 = __webpack_require__(16);
exports.XmlDtdAttlist = XmlDtdAttlist_1.default;
var XmlDtdElement_1 = __webpack_require__(17);
exports.XmlDtdElement = XmlDtdElement_1.default;
var XmlDtdEntity_1 = __webpack_require__(18);
exports.XmlDtdEntity = XmlDtdEntity_1.default;
var XmlDtdNotation_1 = __webpack_require__(19);
exports.XmlDtdNotation = XmlDtdNotation_1.default;
var XmlDtdParamEntityRef_1 = __webpack_require__(20);
exports.XmlDtdParamEntityRef = XmlDtdParamEntityRef_1.default;
var XmlElement_1 = __webpack_require__(21);
exports.XmlElement = XmlElement_1.default;
var XmlEntityRef_1 = __webpack_require__(9);
exports.XmlEntityRef = XmlEntityRef_1.default;
var XmlNode_1 = __webpack_require__(1);
exports.XmlNode = XmlNode_1.default;
var XmlProcInst_1 = __webpack_require__(5);
exports.XmlProcInst = XmlProcInst_1.default;
/**
 * Creates a new XML document.
 *
 * @param root The name of the root element of the document.
 *
 * @returns The new XML document.
 */
function document(root) {
    return new XmlDocument_1.default(root);
}
exports.document = document;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

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
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var options_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var XmlComment_1 = __webpack_require__(4);
var XmlDecl_1 = __webpack_require__(14);
var XmlDtd_1 = __webpack_require__(15);
var XmlElement_1 = __webpack_require__(21);
var XmlNode_1 = __webpack_require__(1);
var XmlProcInst_1 = __webpack_require__(5);
/**
 * Represents an XML document.
 *
 * A sample XML document is structured as follows:
 *
 * ```xml
 * <?xml version="1.0" encoding="UTF-8"?>
 * <DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 *                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 * <html>
 *     <head>
 *         <title>My page title</title>
 *     </head>
 *     <body>
 *         <h1>Welcome!</h1>
 *         <p>I hope you enjoy visiting my website.</p>
 *         <img src="picture.png"/>
 *     </body>
 * </html>
 * ```
 *
 * Each component of the document, such as the XML declaration, document type
 * definition, and root element, are children of this node.
 *
 * XmlDocument nodes must have exactly one {@link XmlElement} child, which is
 * the document's root element.
 *
 * XmlDocument nodes can have exactly one {@link XmlDecl} and {@link XmlDtd}
 * child in that order, so long as they precede the {@link XmlElement} node.
 *
 * XmlDocument nodes can have an unlimited number of {@link XmlComment} or
 * {@link XmlProcInst} nodes, so long as they follow the {@link XmlDecl} node,
 * if one exists.
 */
var XmlDocument = (function (_super) {
    __extends(XmlDocument, _super);
    /**
     * Initializes a new instance of the {@link XmlDocument} class.
     *
     * @param root The name of the root element.
     */
    function XmlDocument(root) {
        var _this = _super.call(this) || this;
        _super.prototype.insertChild.call(_this, new XmlElement_1.default(root));
        return _this;
    }
    /**
     * Inserts a new comment at the specified index. If no index is specified,
     * the node is inserted at the end of this node's children.
     *
     * @param content The data of the comment.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created element.
     */
    XmlDocument.prototype.comment = function (content, index) {
        if (index === void 0) { index = this._children.length; }
        var comment = new XmlComment_1.default(content);
        this.insertChild(comment, index);
        return comment;
    };
    /**
     * Inserts a new XML declaration at the beginning of this node's children.
     *
     * @param options The options associated with the XML declaration.
     *
     * @returns The newly created XML declaration.
     */
    XmlDocument.prototype.decl = function (options) {
        var declaration = new XmlDecl_1.default(options);
        this.insertChild(declaration, 0);
        return declaration;
    };
    /**
     * Inserts a new XML document type definition. Unless a different index is
     * specified, the node is inserted immediately after the XML declaration
     * if one exists, or at the beginning of this node's children if one does
     * not.
     *
     * @param name The name of the DTD.
     * @param sysId The system identifier of the DTD, excluding quotation marks.
     * @param pubId The public identifier of the DTD, excluding quotation marks.
     *              If a public identifier is provided, a system identifier
     *              must be provided as well.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted immediately after the
     *              XML declaration if one exists, or at the beginning of this
     *              node's children if one does not.
     *
     * @returns The newly created XML document type definition.
     */
    XmlDocument.prototype.dtd = function (name, sysId, pubId, index) {
        var dtd = new XmlDtd_1.default(name, sysId, pubId);
        if (utils_1.isUndefined(index)) {
            if (this._children[0] instanceof XmlDecl_1.default) {
                index = 1;
            }
            else {
                index = 0;
            }
        }
        this.insertChild(dtd, index);
        return dtd;
    };
    /**
     * Inserts the specified node into this node's children at the specified
     * index. The node is not inserted if it is already present. If this node
     * already has a parent, it is removed from that parent.
     *
     * Only {@link XmlComment}, {@link XmlDecl}, {@link XmlDtd}, or
     * {@link XmlProcInst} nodes can be inserted. Furthermore, {@link XmlDecl}
     * and {@link XmlDtd} nodes must be inserted in that order and must
     * precede the {@link XmlElement} node. In addition, {@link XmlComment} or
     * {@link XmlProcInst} nodes must follow the {@link XmlDecl} node.
     *
     * @param node The node to insert.
     * @param index The index at which to insert the node. Nodes at or after
     *              the index are shifted to the right. If no index is
     *              specified, the node is inserted at the end.
     *
     * @returns The node inserted into this node's children, or undefined if no
     *          node was inserted.
     */
    XmlDocument.prototype.insertChild = function (node, index) {
        if (index === void 0) { index = this._children.length; }
        if (!(node instanceof XmlComment_1.default
            || node instanceof XmlDecl_1.default
            || node instanceof XmlDtd_1.default
            || node instanceof XmlProcInst_1.default)) {
            throw new TypeError("node should be an instance of"
                + " XmlComment, XmlDecl, XmlDtd, or"
                + " XmlProcInst");
        }
        if (node instanceof XmlComment_1.default || node instanceof XmlProcInst_1.default) {
            if (this._children[0] instanceof XmlDecl_1.default) {
                if (index === 0) {
                    throw new Error("XmlComment or XmlProcInst node should be"
                        + " inserted after the XmlDecl node");
                }
            }
        }
        else if (node instanceof XmlDecl_1.default) {
            if (this._children[0] instanceof XmlDecl_1.default) {
                throw new Error("XmlDocument node should only contain one"
                    + " XmlDecl node");
            }
            if (index !== 0) {
                throw new Error("XmlDecl node should be inserted at the"
                    + " beginning of an XmlDocument node");
            }
        }
        else if (node instanceof XmlDtd_1.default) {
            if (this._children[0] instanceof XmlDecl_1.default) {
                if (index === 0) {
                    throw new Error("XmlDtd node should be inserted after"
                        + " the XmlDecl node");
                }
            }
            for (var i = 0; i < index && i < this._children.length; i++) {
                if (this._children[i] instanceof XmlElement_1.default) {
                    throw new Error("XmlDtd node should be inserted before"
                        + " the XmlElement node");
                }
            }
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child instanceof XmlDtd_1.default) {
                    throw new Error("XmlDocument node should only contain"
                        + " one XmlDtd node");
                }
            }
        }
        return _super.prototype.insertChild.call(this, node, index);
    };
    /**
     * Inserts a new processing instruction at the specified index. If no index
     * is specified, the node is inserted at the end of this node's children.
     *
     * @param target The target of the processing instruction.
     * @param content The data of the processing instruction, or undefined if
     *                there is no target.
     * @param index The index at which the node should be inserted. If no index
     *              is specified, the node is inserted at the end of this node's
     *              children.
     *
     * @returns The newly created processing instruction.
     */
    XmlDocument.prototype.procInst = function (target, content, index) {
        if (index === void 0) { index = this._children.length; }
        var procInst = new XmlProcInst_1.default(target, content);
        this.insertChild(procInst, index);
        return procInst;
    };
    /**
     * Removes the specified node from this node's children.
     *
     * Note that {@link XmlElement} nodes cannot be removed from this node;
     * attempts to do so will result in an exception being thrown.
     *
     * @param node The node to remove.
     *
     * @returns Whether a node was removed.
     */
    XmlDocument.prototype.removeChild = function (node) {
        if (node instanceof XmlElement_1.default) {
            throw new Error("XmlElement nodes cannot be removed from"
                + " XmlDocument nodes");
        }
        return _super.prototype.removeChild.call(this, node);
    };
    /**
     * Removes the node at the specified index from this node's children.
     *
     * Note that {@link XmlElement} nodes cannot be removed from this node;
     * attempts to do so will result in an exception being thrown.
     *
     * @param index The index at which the node to be removed is
     *                       located.
     *
     * @returns The node that was removed, or undefined if no node was removed.
     */
    XmlDocument.prototype.removeChildAtIndex = function (index) {
        if (this._children[index] instanceof XmlElement_1.default) {
            throw new Error("XmlElement nodes cannot be removed from"
                + " XmlDocument nodes");
        }
        return _super.prototype.removeChildAtIndex.call(this, index);
    };
    /**
     * Returns the root element of this document.
     *
     * @returns The root element of this document.
     */
    XmlDocument.prototype.root = function () {
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node instanceof XmlElement_1.default) {
                return node;
            }
        }
        throw new Error("XmlDocument does not contain a root node");
    };
    /**
     * Returns an XML string representation of this node.
     *
     * @param {IStringOptions} [options] Formatting options for the string
     *                                  representation.
     *
     * @returns {string} An XML string representation of this node.
     */
    XmlDocument.prototype.toString = function (options) {
        if (options === void 0) { options = {}; }
        var optionsObj = new options_1.StringOptions(options);
        var str = "";
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var node = _a[_i];
            str += node.toString(options);
            if (optionsObj.pretty) {
                str += optionsObj.newline;
            }
        }
        var len = str.length - optionsObj.newline.length;
        if (str.substr(len) === optionsObj.newline) {
            str = str.substr(0, len);
        }
        return str;
    };
    return XmlDocument;
}(XmlNode_1.default));
exports.default = XmlDocument;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (C) 2016 Michael Kourlas
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var utils_1 = __webpack_require__(22);
/**
 * Implementation of the IOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
var Options = (function () {
    function Options(options) {
        if (options === void 0) { options = {}; }
        this.aliasString = "=";
        this.attributeString = "@";
        this.cdataInvalidChars = false;
        this.cdataKeys = [];
        this.valueString = "#";
        if (!utils_1.isObject(options)) {
            throw new TypeError("options should be an Object or undefined");
        }
        if (!utils_1.isString(options.aliasString)) {
            if (!utils_1.isUndefined(options.aliasString)) {
                throw new TypeError("options.aliasString should be a string or"
                    + " undefined");
            }
        }
        else {
            this.aliasString = options.aliasString;
        }
        if (!utils_1.isString(options.attributeString)) {
            if (!utils_1.isUndefined(options.attributeString)) {
                throw new TypeError("options.attributeString should be a string"
                    + " or undefined");
            }
        }
        else {
            this.attributeString = options.attributeString;
        }
        if (!utils_1.isBoolean(options.cdataInvalidChars)) {
            if (!utils_1.isUndefined(options.cdataInvalidChars)) {
                throw new TypeError("options.cdataInvalidChars should be a"
                    + " boolean or undefined");
            }
        }
        else {
            this.cdataInvalidChars = options.cdataInvalidChars;
        }
        if (!utils_1.isStringArray(options.cdataKeys)) {
            if (!utils_1.isUndefined(options.cdataKeys)) {
                throw new TypeError("options.cdataKeys should be an Array or" +
                    " undefined");
            }
        }
        else {
            this.cdataKeys = options.cdataKeys;
        }
        this.declaration = new DeclarationOptions(options.declaration);
        this.dtd = new DtdOptions(options.dtd);
        this.format = new FormatOptions(options.format);
        this.typeHandlers = new TypeHandlers(options.typeHandlers);
        if (!utils_1.isString(options.valueString)) {
            if (!utils_1.isUndefined(options.valueString)) {
                throw new TypeError("options.valueString should be a string"
                    + " or undefined");
            }
        }
        else {
            this.valueString = options.valueString;
        }
        this.wrapHandlers = new WrapHandlers(options.wrapHandlers);
    }
    return Options;
}());
exports.Options = Options;
/**
 * Implementation of the IDeclarationOptions interface used to provide default
 * values to fields.
 *
 * @private
 */
var DeclarationOptions = (function () {
    function DeclarationOptions(declarationOptions) {
        if (declarationOptions === void 0) { declarationOptions = {}; }
        this.include = true;
        if (!utils_1.isObject(declarationOptions)) {
            throw new TypeError("options.declaration should be an Object or"
                + " undefined");
        }
        if (!utils_1.isBoolean(declarationOptions.include)) {
            if (!utils_1.isUndefined(declarationOptions.include)) {
                throw new TypeError("options.declaration.include should be a"
                    + " boolean or undefined");
            }
        }
        else {
            this.include = declarationOptions.include;
        }
        // Validation performed by xmlcreate
        this.encoding = declarationOptions.encoding;
        this.standalone = declarationOptions.standalone;
        this.version = declarationOptions.version;
    }
    return DeclarationOptions;
}());
exports.DeclarationOptions = DeclarationOptions;
/**
 * Implementation of the IDtdOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
var DtdOptions = (function () {
    function DtdOptions(dtdOptions) {
        if (dtdOptions === void 0) { dtdOptions = {}; }
        this.include = false;
        if (!utils_1.isObject(dtdOptions)) {
            throw new TypeError("options.dtd should be an Object or undefined");
        }
        if (!utils_1.isBoolean(dtdOptions.include)) {
            if (!utils_1.isUndefined(dtdOptions.include)) {
                throw new TypeError("options.dtd.include should be a boolean"
                    + " or undefined");
            }
        }
        else {
            this.include = dtdOptions.include;
        }
        // Validation performed by xmlcreate
        this.name = dtdOptions.name;
        this.sysId = dtdOptions.sysId;
        this.pubId = dtdOptions.pubId;
    }
    return DtdOptions;
}());
exports.DtdOptions = DtdOptions;
/**
 * Implementation of the IFormatOptions interface used to provide default values
 * to fields.
 *
 * @private
 */
var FormatOptions = (function () {
    function FormatOptions(formatOptions) {
        if (formatOptions === void 0) { formatOptions = {}; }
        if (!utils_1.isObject(formatOptions)) {
            throw new TypeError("options.format should be an Object or"
                + " undefined");
        }
        // Validation performed by xmlcreate
        this.doubleQuotes = formatOptions.doubleQuotes;
        this.indent = formatOptions.indent;
        this.newline = formatOptions.newline;
        this.pretty = formatOptions.pretty;
    }
    return FormatOptions;
}());
exports.FormatOptions = FormatOptions;
/**
 * Implementation of the ITypeHandlers interface used to provide default values
 * to fields.
 *
 * @private
 */
var TypeHandlers = (function () {
    function TypeHandlers(typeHandlers) {
        if (typeHandlers === void 0) { typeHandlers = {}; }
        if (!utils_1.isObject(typeHandlers)) {
            throw new TypeError("options.typeHandlers should be an Object or"
                + " undefined");
        }
        for (var key in typeHandlers) {
            if (typeHandlers.hasOwnProperty(key)) {
                if (!utils_1.isFunction(typeHandlers[key])) {
                    throw new TypeError("options.typeHandlers['" + key + "']" +
                        " should be a Function");
                }
                else {
                    this[key] = typeHandlers[key];
                }
            }
        }
    }
    return TypeHandlers;
}());
exports.TypeHandlers = TypeHandlers;
/**
 * Implementation of the IWrapHandlers interface used to provide default values
 * to fields.
 *
 * @private
 */
var WrapHandlers = (function () {
    function WrapHandlers(wrapHandlers) {
        if (wrapHandlers === void 0) { wrapHandlers = {}; }
        if (!utils_1.isObject(wrapHandlers)) {
            throw new TypeError("options.wrapHandlers should be an Object or"
                + " undefined");
        }
        for (var key in wrapHandlers) {
            if (wrapHandlers.hasOwnProperty(key)) {
                if (!utils_1.isFunction(wrapHandlers[key])) {
                    throw new TypeError("options.wrapHandlers['" + key + "']" +
                        " should be a Function");
                }
                else {
                    this[key] = wrapHandlers[key];
                }
            }
        }
    }
    return WrapHandlers;
}());
exports.WrapHandlers = WrapHandlers;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var splitWord = function (original) {
    var index = 0;
    var result = [];
    while (index < original.length) {
        result[index] = original.substring(index, index + 1);
        index++;
    }
    return result;
};
var EscapeSequenceMap = {
    ":": "%3A",
    "/": "%2F",
    " ": "%20",
    "$": "%24",
    "\\": "%5C",
};
var reverseMap = function (map) {
    var result = {};
    Object.keys(map).forEach(function (key) {
        result[map[key]] = key;
    });
    return result;
};
exports.Encode = function (original) {
    var resultArray = splitWord(original);
    resultArray = resultArray.map(function (character) {
        if (EscapeSequenceMap[character]) {
            return EscapeSequenceMap[character];
        }
        else {
            return character;
        }
    });
    var result = resultArray.join("");
    return result;
};
exports.Decode = function (original) {
    var index = -2;
    var ReverseSequenceMap = reverseMap(EscapeSequenceMap);
    var sentence = original;
    while (index !== -1) {
        index = sentence.indexOf("%");
        if (index >= 0) {
            var target = sentence.substring(index, index + 5);
            var before_1 = sentence.substring(0, index);
            var after_1 = sentence.substring(index + 5);
            sentence = before_1 + ReverseSequenceMap[target] + after_1;
        }
    }
    return sentence;
};
var AND = " and ";
// TODO きちんと整理する
exports.convertQueriedUrl = function (url, query) {
    var result = url + "?";
    if (query.filter && query.filter.length > 0) {
        var filters = query.filter;
        result += exports.Encode("$filter=");
        filters.forEach(function (filter) {
            result += exports.Encode(filter);
            result += AND;
        });
        result = result.substring(0, result.lastIndexOf(AND)) + "&";
    }
    else if (query.top) {
        var top_1 = query.top;
        result += exports.Encode("$top=" + top_1) + "&";
    }
    else {
        Object.keys(query).forEach(function (key) {
            result += exports.Encode(key) + "=" + exports.Encode(query[key]) + "&";
        });
    }
    return result;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(38);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36), __webpack_require__(37)))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2VjNmUxZTQ1ZjQxMTRiNGU1ZTgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sTm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbENvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sUHJvY0luc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbEF0dHJpYnV0ZVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhclJlZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbnRpdHlSZWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxBdHRyaWJ1dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhckRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRGVjbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRHRkQXR0bGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZEVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGROb3RhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRQYXJhbUVudGl0eVJlZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qczJ4bWxwYXJzZXIvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3JlcXVlc3QtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVzcG9uc2UtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Nob3VsZC1yZXRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanMyeG1scGFyc2VyL2xpYi9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzMnhtbHBhcnNlci9saWIvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0eS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVGQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxjQUFjO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwrQkFBK0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6R0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsb0JBQW9CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMseUJBQXlCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENB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LFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUIsR0FBRyxvQkFBb0IsR0FBRyxvQkFBb0I7QUFDNUUsUUFBUSxtQkFBbUIsR0FBRyxxQkFBcUIsT0FBTztBQUMxRCw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM1FBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHNCQUFzQjs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxVQUFVLElBQUk7QUFDZDtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsd0JBQXdCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsNkNBQTZDO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCLFVBQVUsT0FBTztBQUNqQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE1BQU07QUFDaEI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxxQkFBcUIsWUFBWTtBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBSTtBQUNkO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxZQUFZLFNBQVM7QUFDckIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7QUFFRDs7Ozs7Ozs7QUNwb0NBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7QUN2THRDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7O0FDcEJBLGUiLCJmaWxlIjoicGVyc29uaXVtLWNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzZWM2ZTFlNDVmNDExNGI0ZTVlOCIsIi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBTdHJpbmddXCI7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIjtcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNCb29sZWFuKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IEJvb2xlYW5dXCI7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgVW5kZWZpbmVkXVwiO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmXG4gICAgICAgIGlzRmluaXRlKHZhbHVlKSAmJlxuICAgICAgICBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG59XG5leHBvcnRzLmlzSW50ZWdlciA9IGlzSW50ZWdlcjtcbi8qKlxuICogUmV0cmlldmUgdGhlIFVuaWNvZGUgY29kZSBwb2ludCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGluIHRoZSBzcGVjaWZpZWRcbiAqIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgZnJvbSB3aGljaCB0byByZXRyaWV2ZSB0aGUgVW5pY29kZSBjb2RlIHBvaW50LlxuICogQHBhcmFtIGluZGV4IFRoZSBzcGVjaWZpZWQgaW5kZXguXG4gKlxuICogQHJldHVybnMgVGhlIFVuaWNvZGUgY29kZSBwb2ludCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENvZGVQb2ludChzdHIsIGluZGV4KSB7XG4gICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSBzdHIubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5kZXggZm9yIHNwZWNpZmllZCBzdHJpbmdcIik7XG4gICAgfVxuICAgIHZhciBmaXJzdCA9IHN0ci5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICBpZiAoZmlyc3QgPj0gMHhEODAwICYmIGZpcnN0IDw9IDB4REJGRiAmJiBzdHIubGVuZ3RoID4gaW5kZXggKyAxKSB7XG4gICAgICAgIHZhciBzZWNvbmQgPSBzdHIuY2hhckNvZGVBdChpbmRleCArIDEpO1xuICAgICAgICBpZiAoc2Vjb25kID49IDB4REMwMCAmJiBzZWNvbmQgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICByZXR1cm4gKGZpcnN0IC0gMHhEODAwKSAqIDB4NDAwICsgc2Vjb25kIC0gMHhEQzAwICsgMHgxMDAwMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlyc3Q7XG59XG5leHBvcnRzLmdldENvZGVQb2ludCA9IGdldENvZGVQb2ludDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgbm9kZS5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIHRoZSByb290IGNsYXNzIG9mIHRoZSBYTUwgbm9kZSBoaWVyYXJjaHkuIEl0IHNob3VsZCBub3QgYmVcbiAqIGRpcmVjdGx5IGluc3RhbnRpYXRlZDsgb25lIG9mIGl0cyBzdWJjbGFzc2VzIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXG4gKlxuICogQHByb3RlY3RlZFxuICovXG52YXIgWG1sTm9kZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxOb2RlfSBjbGFzcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxOb2RlKCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxOb2RlLnByb3RvdHlwZSwgXCJwYXJlbnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgcGFyZW50IG9mIHRoaXMgbm9kZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIHBhcmVudCBvZiB0aGlzIG5vZGUuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoaXMgbm9kZSBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uIENvbnN1bHQgdGhlXG4gICAgICogYXBwcm9wcmlhdGUgc3ViY2xhc3MgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5zbGljZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIG5vZGUgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiBhdCB0aGUgc3BlY2lmaWVkXG4gICAgICogaW5kZXguIFRoZSBub2RlIGlzIG5vdCBpbnNlcnRlZCBpZiBpdCBpcyBhbHJlYWR5IHByZXNlbnQuIElmIHRoaXMgbm9kZVxuICAgICAqIGFscmVhZHkgaGFzIGEgcGFyZW50LCBpdCBpcyByZW1vdmVkIGZyb20gdGhhdCBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoaXMgbm9kZSBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4sIG9yIGlmIHRoZVxuICAgICAqIHNwZWNpZmllZCBub2RlIGNhbm5vdCBiZSBhZGRlZCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBDb25zdWx0IHRoZVxuICAgICAqIGFwcHJvcHJpYXRlIHN1YmNsYXNzIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgbm9kZS4gTm9kZXMgYXQgb3IgYWZ0ZXJcbiAgICAgKiAgICAgICAgICAgICAgdGhlIGluZGV4IGFyZSBzaGlmdGVkIHRvIHRoZSByaWdodC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiAgICAgICAgICAgICAgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5vZGUgaW5zZXJ0ZWQgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiwgb3IgdW5kZWZpbmVkIGlmIG5vXG4gICAgICogICAgICAgICAgbm9kZSB3YXMgaW5zZXJ0ZWQuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7IH1cbiAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIFhtbE5vZGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibm9kZSBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2YgWG1sTm9kZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdXRpbHNfMS5pc051bWJlcihpbmRleCkgfHwgIXV0aWxzXzEuaXNJbnRlZ2VyKGluZGV4KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImluZGV4IHNob3VsZCBiZSBhbiBpbnRlZ2VyXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX2NoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJpbmRleCBzaG91bGQgcmVzcGVjdCBjaGlsZHJlbiBhcnJheSBib3VuZHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuLmluZGV4T2Yobm9kZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQobm9kZS5wYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLl9wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBub2RlIHRoYXQgZm9sbG93cyB0aGlzIG9uZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHN1Y2ggbm9kZVxuICAgICAqIGV4aXN0cyBvciBpZiB0aGlzIG5vZGUgaGFzIG5vIHBhcmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIHRoYXQgZm9sbG93cyB0aGlzIG9uZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHN1Y2ggbm9kZVxuICAgICAqICAgICAgICAgIGV4aXN0cyBvciBpZiB0aGlzIG5vZGUgaGFzIG5vIHBhcmVudC5cbiAgICAgKi9cbiAgICBYbWxOb2RlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YodGhpcylcbiAgICAgICAgICAgID09PSB0aGlzLnBhcmVudC5fY2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuX2NoaWxkcmVuW3RoaXMucGFyZW50Ll9jaGlsZHJlbi5pbmRleE9mKHRoaXMpICsgMV07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBub2RlIHRoYXQgaXMgcHJldmlvdXMgdG8gdGhpcyBvbmUsIG9yIHVuZGVmaW5lZCBpZiBubyBzdWNoIG5vZGVcbiAgICAgKiBleGlzdHMgb3IgaWYgdGhpcyBub2RlIGhhcyBubyBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSB0aGF0IGlzIHByZXZpb3VzIHRvIHRoaXMgb25lLCBvciB1bmRlZmluZWQgaWYgbm8gc3VjaFxuICAgICAqICAgICAgICAgIG5vZGUgZXhpc3RzIG9yIGlmIHRoaXMgbm9kZSBoYXMgbm8gcGFyZW50LlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1dGlsc18xLmlzVW5kZWZpbmVkKHRoaXMucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuX2NoaWxkcmVuW3RoaXMucGFyZW50Ll9jaGlsZHJlbi5pbmRleE9mKHRoaXMpIC0gMV07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoaXMgbm9kZSBmcm9tIGl0cyBwYXJlbnQgaWYgdGhpcyBub2RlIGhhcyBhIHBhcmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbm9kZSdzIHBhcmVudCwgb3IgdW5kZWZpbmVkIGlmIGl0IGhhcyBubyBwYXJlbnQuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQodGhpcy5wYXJlbnQpKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50XzEgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudF8xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgbm9kZSBmcm9tIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGlzIG5vZGUgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLCBvciBpZiB0aGVcbiAgICAgKiBzcGVjaWZpZWQgbm9kZSBjYW5ub3QgYmUgcmVtb3ZlZC4gQ29uc3VsdCB0aGUgYXBwcm9wcmlhdGUgc3ViY2xhc3NcbiAgICAgKiBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byByZW1vdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIGEgbm9kZSB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBYbWxOb2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBYbWxOb2RlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm9kZSBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2YgWG1sTm9kZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBub2RlLl9wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbm9kZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIHRoaXMgbm9kZSBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4sIG9yIGlmIHRoZVxuICAgICAqIG5vZGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBjYW5ub3QgYmUgcmVtb3ZlZC4gQ29uc3VsdCB0aGUgYXBwcm9wcmlhdGVcbiAgICAgKiBzdWJjbGFzcyBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHRvIGJlIHJlbW92ZWQgaXMgbG9jYXRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIHRoYXQgd2FzIHJlbW92ZWQuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc051bWJlcihpbmRleCkgfHwgIXV0aWxzXzEuaXNJbnRlZ2VyKGluZGV4KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImluZGV4IHNob3VsZCBiZSBhIG51bWJlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcImluZGV4IHNob3VsZCByZXNwZWN0IGNoaWxkcmVuIGFycmF5IGJvdW5kc1wiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuX2NoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgbm9kZS5fcGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxOb2RlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInRvU3RyaW5nIG5vdCBpbXBsZW1lbnRlZCBmb3IgWG1sTm9kZVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJvb3Qgbm9kZSBvZiB0aGUgY3VycmVudCBoaWVyYXJjaHkuIElmIHRoaXMgbm9kZSBoYXMgbm9cbiAgICAgKiBwYXJlbnQsIHRoaXMgbm9kZSBpdHNlbGYgaXMgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgcm9vdCBub2RlIG9mIHRoZSBjdXJyZW50IGhpZXJhcmNoeS5cbiAgICAgKi9cbiAgICBYbWxOb2RlLnByb3RvdHlwZS50b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1dGlsc18xLmlzVW5kZWZpbmVkKHRoaXMucGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQudG9wKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhcmVudCBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9O1xuICAgIHJldHVybiBYbWxOb2RlO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbE5vZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbE5vZGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFZlcmlmaWVzIHRoYXQgdGhlIHNwZWNpZmllZCBzdHJpbmcgb25seSBjb250YWlucyBjaGFyYWN0ZXJzIHBlcm1pdHRlZCBieSB0aGVcbiAqIFhNTCBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byB2YWxpZGF0ZS5cbiAqXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBzcGVjaWZpZWQgc3RyaW5nIG9ubHkgY29udGFpbnMgY2hhcmFjdGVycyBwZXJtaXR0ZWQgYnlcbiAqICAgICAgICAgIHRoZSBYTUwgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoYXIoc3RyKSB7XG4gICAgdmFyIGNoYXJSZWdleCA9IFwiXFxcXHUwMDA5fFxcXFx1MDAwQXxcXFxcdTAwMER8W1xcXFx1MDAyMC1cXFxcdUQ3RkZdfFwiXG4gICAgICAgICsgXCJbXFxcXHVFMDAwLVxcXFx1RkZGRF1cIjtcbiAgICB2YXIgc3Vycm9nYXRlQ2hhclJlZ2V4ID0gXCJbXFxcXHVEODAwLVxcXFx1REJGRl1bXFxcXHVEQzAwLVxcXFx1REZGRl1cIjtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcIl4oKFwiICsgY2hhclJlZ2V4ICsgXCIpfChcIiArIHN1cnJvZ2F0ZUNoYXJSZWdleCArIFwiKSkqJFwiKVxuICAgICAgICAudGVzdChzdHIpO1xufVxuZXhwb3J0cy52YWxpZGF0ZUNoYXIgPSB2YWxpZGF0ZUNoYXI7XG4vKipcbiAqIFZlcmlmaWVzIHRoYXQgdGhlIHNwZWNpZmllZCBzdHJpbmcgb25seSBjb250YWlucyBhIHNpbmdsZSBjaGFyYWN0ZXIsIGFuZFxuICogdGhhdCB0aGlzIGNoYXJhY3RlciBpcyBwZXJtaXR0ZWQgYnkgdGhlIFhNTCBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byB2YWxpZGF0ZS5cbiAqXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBzcGVjaWZpZWQgc3RyaW5nIG9ubHkgY29udGFpbnMgYSBzaW5nbGUgY2hhcmFjdGVyLCBhbmRcbiAqICAgICAgICAgIHRoYXQgdGhpcyBjaGFyYWN0ZXIgaXMgcGVybWl0dGVkIGJ5IHRoZSBYTUwgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVNpbmdsZUNoYXIoc3RyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeXFxcXHUwMDA5fFxcXFx1MDAwQXxcXFxcdTAwMER8W1xcXFx1MDAyMC1cXFxcdUQ3RkZdfFwiXG4gICAgICAgICAgICArIFwiW1xcXFx1RTAwMC1cXFxcdUZGRkRdJFwiKS50ZXN0KHN0cik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0ci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeW1xcXFx1RDgwMC1cXFxcdURCRkZdW1xcXFx1REMwMC1cXFxcdURGRkZdJFwiKS50ZXN0KHN0cik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVNpbmdsZUNoYXIgPSB2YWxpZGF0ZVNpbmdsZUNoYXI7XG4vKipcbiAqIFZlcmlmaWVzIHRoYXQgdGhlIHNwZWNpZmllZCBzdHJpbmcgb25seSBjb250YWlucyBjaGFyYWN0ZXJzIHBlcm1pdHRlZCBieSB0aGVcbiAqIFhNTCBzcGVjaWZpY2F0aW9uIGZvciBuYW1lcy5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gdmFsaWRhdGUuXG4gKlxuICogQHJldHVybnMgV2hldGhlciB0aGUgc3BlY2lmaWVkIHN0cmluZyBvbmx5IGNvbnRhaW5zIGNoYXJhY3RlcnMgcGVybWl0dGVkIGJ5XG4gKiAgICAgICAgICB0aGUgWE1MIHNwZWNpZmljYXRpb24gZm9yIG5hbWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlTmFtZShzdHIpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBuYW1lU3RhcnRDaGFyID0gXCI6fFtBLVpdfF98W2Etel18W1xcXFx1MDBDMC1cXFxcdTAwRDZdfFtcXFxcdTAwRDgtXFxcXHUwMEY2XVwiXG4gICAgICAgICsgXCJ8W1xcXFx1MDBGOC1cXFxcdTAyRkZdfFtcXFxcdTAzNzAtXFxcXHUwMzdEXVwiXG4gICAgICAgICsgXCJ8W1xcXFx1MDM3Ri1cXFxcdTFGRkZdfFtcXFxcdTIwMEMtXFxcXHUyMDBEXVwiXG4gICAgICAgICsgXCJ8W1xcXFx1MjA3MC1cXFxcdTIxOEZdfFtcXFxcdTJDMDAtXFxcXHUyRkVGXVwiXG4gICAgICAgICsgXCJ8W1xcXFx1MzAwMS1cXFxcdUQ3RkZdfFtcXFxcdUY5MDAtXFxcXHVGRENGXVwiXG4gICAgICAgICsgXCJ8W1xcXFx1RkRGMC1cXFxcdUZGRkRdXCI7XG4gICAgdmFyIG5hbWVTdGFydENoYXJXaXRoU3Vycm9nYXRlUGFpciA9IFwiW1xcXFx1RDgwMC1cXFxcdURCN0ZdW1xcXFx1REMwMC1cXFxcdURGRkZdXCI7XG4gICAgdmFyIG5hbWVDaGFyID0gbmFtZVN0YXJ0Q2hhciArIFwifC18XFxcXC58WzAtOV18XFxcXHUwMEI3fFtcXFxcdTAzMDAtXFxcXHUwMzZGXVwiICtcbiAgICAgICAgXCJ8W1xcXFx1MjAzRi1cXFxcdTIwNDBdXCI7XG4gICAgdmFyIG5hbWVDaGFyV2l0aFN1cnJvZ2F0ZVBhaXIgPSBuYW1lQ2hhciArIFwifFwiICtcbiAgICAgICAgbmFtZVN0YXJ0Q2hhcldpdGhTdXJyb2dhdGVQYWlyO1xuICAgIGlmIChuZXcgUmVnRXhwKFwiXlwiICsgbmFtZVN0YXJ0Q2hhciArIFwiJFwiKS50ZXN0KHN0ci5jaGFyQXQoMCkpKSB7XG4gICAgICAgIGlmIChzdHIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcIl4oXCIgKyBuYW1lQ2hhcldpdGhTdXJyb2dhdGVQYWlyICsgXCIpKyRcIilcbiAgICAgICAgICAgIC50ZXN0KHN0ci5zdWJzdHIoMSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdHIubGVuZ3RoID49IDIpIHtcbiAgICAgICAgaWYgKG5ldyBSZWdFeHAoXCJeXCIgKyBuYW1lU3RhcnRDaGFyV2l0aFN1cnJvZ2F0ZVBhaXIgKyBcIiRcIilcbiAgICAgICAgICAgIC50ZXN0KHN0ci5zdWJzdHIoMCwgMikpKSB7XG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKFwiICsgbmFtZUNoYXJXaXRoU3Vycm9nYXRlUGFpciArIFwiKSskXCIpXG4gICAgICAgICAgICAgICAgLnRlc3Qoc3RyLnN1YnN0cigyKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy52YWxpZGF0ZU5hbWUgPSB2YWxpZGF0ZU5hbWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL3ZhbGlkYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIElTdHJpbmdPcHRpb25zIGludGVyZmFjZSB1c2VkIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXNcbiAqIHRvIGZpZWxkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgU3RyaW5nT3B0aW9ucyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RyaW5nT3B0aW9ucyhzdHJpbmdPcHRpb25zKSB7XG4gICAgICAgIGlmIChzdHJpbmdPcHRpb25zID09PSB2b2lkIDApIHsgc3RyaW5nT3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHRoaXMuZG91YmxlUXVvdGVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5kZW50ID0gXCIgICAgXCI7XG4gICAgICAgIHRoaXMubmV3bGluZSA9IFwiXFxuXCI7XG4gICAgICAgIHRoaXMucHJldHR5ID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KHN0cmluZ09wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucyBzaG91bGQgYmUgYW4gT2JqZWN0IG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNCb29sZWFuKHN0cmluZ09wdGlvbnMuZG91YmxlUXVvdGVzKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKHN0cmluZ09wdGlvbnMuZG91YmxlUXVvdGVzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmRvdWJsZVF1b3RlcyBzaG91bGQgYmUgYSBib29sZWFuXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvdWJsZVF1b3RlcyA9IHN0cmluZ09wdGlvbnMuZG91YmxlUXVvdGVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhzdHJpbmdPcHRpb25zLmluZGVudCkpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChzdHJpbmdPcHRpb25zLmluZGVudCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5pbmRlbnQgc2hvdWxkIGJlIGEgc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudCA9IHN0cmluZ09wdGlvbnMuaW5kZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhzdHJpbmdPcHRpb25zLm5ld2xpbmUpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoc3RyaW5nT3B0aW9ucy5uZXdsaW5lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLm5ld2xpbmUgc2hvdWxkIGJlIGEgc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5ld2xpbmUgPSBzdHJpbmdPcHRpb25zLm5ld2xpbmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihzdHJpbmdPcHRpb25zLnByZXR0eSkpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChzdHJpbmdPcHRpb25zLnByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5wcmV0dHkgc2hvdWxkIGJlIGEgYm9vbGVhblwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmV0dHkgPSBzdHJpbmdPcHRpb25zLnByZXR0eTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nT3B0aW9ucztcbn0oKSk7XG5leHBvcnRzLlN0cmluZ09wdGlvbnMgPSBTdHJpbmdPcHRpb25zO1xuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSURlY2xhcmF0aW9uT3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHRcbiAqIHZhbHVlcyB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIERlY2xhcmF0aW9uT3B0aW9ucyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVjbGFyYXRpb25PcHRpb25zKGRlY2xhcmF0aW9uT3B0aW9ucykge1xuICAgICAgICBpZiAoZGVjbGFyYXRpb25PcHRpb25zID09PSB2b2lkIDApIHsgZGVjbGFyYXRpb25PcHRpb25zID0ge307IH1cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gXCIxLjBcIjtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KGRlY2xhcmF0aW9uT3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zIHNob3VsZCBiZSBhbiBPYmplY3Qgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhkZWNsYXJhdGlvbk9wdGlvbnMuZW5jb2RpbmcpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZGVjbGFyYXRpb25PcHRpb25zLmVuY29kaW5nKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmVuY29kaW5nIHNob3VsZCBiZSBhIHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmNvZGluZyA9IGRlY2xhcmF0aW9uT3B0aW9ucy5lbmNvZGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoZGVjbGFyYXRpb25PcHRpb25zLnN0YW5kYWxvbmUpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZGVjbGFyYXRpb25PcHRpb25zLnN0YW5kYWxvbmUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuc3RhbmRhbG9uZSBzaG91bGQgYmUgYSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhbmRhbG9uZSA9IGRlY2xhcmF0aW9uT3B0aW9ucy5zdGFuZGFsb25lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhkZWNsYXJhdGlvbk9wdGlvbnMudmVyc2lvbikpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChkZWNsYXJhdGlvbk9wdGlvbnMudmVyc2lvbikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy52ZXJzaW9uIHNob3VsZCBiZSBhIHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52ZXJzaW9uID0gZGVjbGFyYXRpb25PcHRpb25zLnZlcnNpb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIERlY2xhcmF0aW9uT3B0aW9ucztcbn0oKSk7XG5leHBvcnRzLkRlY2xhcmF0aW9uT3B0aW9ucyA9IERlY2xhcmF0aW9uT3B0aW9ucztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvb3B0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBjb21tZW50LlxuICpcbiAqIEFuIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHtjb250ZW50fWAgaXNcbiAqIHRoZSB0ZXh0IG9mIHRoZSBjb21tZW50LlxuICpcbiAqIGBgYHhtbFxuICogPCEtLXtjb250ZW50fS0tPlxuICogYGBgXG4gKlxuICogVGhlIGB7Y29udGVudH1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbENvbW1lbnQgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sQ29tbWVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbENvbW1lbnQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxDb21tZW50fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBjb250ZW50IG9mIHRoZSBjb21tZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbENvbW1lbnQoY29udGVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sQ29tbWVudC5wcm90b3R5cGUsIFwiY29udGVudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBjb250ZW50IG9mIHRoZSBjb21tZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgY29udGVudCBvZiB0aGUgY29tbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBjb250ZW50IG9mIHRoZSBjb21tZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgY29udGVudCBvZiB0aGUgY29tbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjb250ZW50IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcihjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvbnRlbnQgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG5vdCBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCEvXihbXi1dfC1bXi1dKSokLy50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29udGVudCBzaG91bGQgbm90IGNvbnRhaW4gdGhlIHN0cmluZyAnLS0nIG9yXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBlbmQgd2l0aCAnLSdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ29tbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ29tbWVudC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENvbW1lbnQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDb21tZW50fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENvbW1lbnQucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENvbW1lbnQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDb21tZW50fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDb21tZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENvbW1lbnQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDb21tZW50fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ29tbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENvbW1lbnQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sQ29tbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gXCI8IS0tXCIgKyB0aGlzLmNvbnRlbnQgKyBcIi0tPlwiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbENvbW1lbnQ7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxDb21tZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxDb21tZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gKlxuICogQW4gWE1MIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge3RhcmdldH1gXG4gKiBhbmQgYHtjb250ZW50fWAgYXJlIHRoZSB0YXJnZXQgYW5kIGNvbnRlbnQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25cbiAqIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBgYGB4bWxcbiAqIDw/e3RhcmdldH0ge2NvbnRlbnR9Pz5cbiAqIGBgYFxuICpcbiAqIFRoZSBge3RhcmdldH1gIGFuZCBge2NvbnRlbnR9YCB2YWx1ZXMgYXJlIHByb3BlcnRpZXMgb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbFByb2NJbnN0IG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbFByb2NJbnN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sUHJvY0luc3QsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxQcm9jSW5zdH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIG9yIHVuZGVmaW5lZCBpZlxuICAgICAqICAgICAgICAgICAgICAgIHRoZXJlIGlzIG5vIHRhcmdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxQcm9jSW5zdCh0YXJnZXQsIGNvbnRlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBfdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sUHJvY0luc3QucHJvdG90eXBlLCBcInRhcmdldFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvZiB0aGUgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGFyZ2V0IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcih0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGFyZ2V0IHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBub3QgYWxsb3dlZCBpbiBYTUxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwieG1sXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0YXJnZXQgc2hvdWxkIG5vdCBiZSB0aGUgc3RyaW5nICd4bWwnXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sUHJvY0luc3QucHJvdG90eXBlLCBcImNvbnRlbnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgZGF0YSBvZiB0aGUgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uIFRoaXMgdmFsdWUgbWF5IGJlXG4gICAgICAgICAqICAgICAgICAgIHVuZGVmaW5lZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBkYXRhIG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgZGF0YSBvZiB0aGUgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi4gVGhpcyB2YWx1ZSBtYXkgYmVcbiAgICAgICAgICogICAgICAgICAgICAgICAgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGNvbnRlbnQpICYmICF1dGlsc18xLmlzVW5kZWZpbmVkKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImRhdGEgc2hvdWxkIGJlIGEgc3RyaW5nIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcihjb250ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgvXFw/Pi8udGVzdChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIHNob3VsZCBub3QgY29udGFpbiB0aGUgc3RyaW5nICc/PidcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxQcm9jSW5zdC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbFByb2NJbnN0IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sUHJvY0luc3R9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sUHJvY0luc3QucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbFByb2NJbnN0IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sUHJvY0luc3R9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbFByb2NJbnN0LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbFByb2NJbnN0IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sUHJvY0luc3R9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxQcm9jSW5zdC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbFByb2NJbnN0IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbFByb2NJbnN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiPD9cIiArIHRoaXMudGFyZ2V0ICsgXCI/PlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiPD9cIiArIHRoaXMudGFyZ2V0ICsgXCIgXCIgKyB0aGlzLmNvbnRlbnQgKyBcIj8+XCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBYbWxQcm9jSW5zdDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbFByb2NJbnN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxQcm9jSW5zdC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogUmVwbGFjZXMgYW1wZXJzYW5kcyAoJikgd2l0aCB0aGUgYXBwcm9wcmlhdGUgWE1MIGNoYXJhY3RlciByZWZlcmVuY2UuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqXG4gKiBAcmV0dXJucyBBIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBzdHJpbmcgd2l0aCBhbXBlcnNhbmRzIGVzY2FwZWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXNjYXBlQW1wZXJzYW5kcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKTtcbn1cbmV4cG9ydHMuZXNjYXBlQW1wZXJzYW5kcyA9IGVzY2FwZUFtcGVyc2FuZHM7XG4vKipcbiAqIFJlcGxhY2VzIGxlZnQgYW5nbGUgYnJhY2tldHMgKCZsdDspIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXJcbiAqIHJlZmVyZW5jZS5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICpcbiAqIEByZXR1cm5zIEEgY29weSBvZiB0aGUgc3BlY2lmaWVkIHN0cmluZyB3aXRoIGxlZnQgYW5nbGUgYnJhY2tldHMgZXNjYXBlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlc2NhcGVMZWZ0QW5nbGVCcmFja2V0cyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpO1xufVxuZXhwb3J0cy5lc2NhcGVMZWZ0QW5nbGVCcmFja2V0cyA9IGVzY2FwZUxlZnRBbmdsZUJyYWNrZXRzO1xuLyoqXG4gKiBSZXBsYWNlcyByaWdodCBhbmdsZSBicmFja2V0cyAoJmd0Oykgd2l0aCB0aGUgYXBwcm9wcmlhdGUgWE1MIGNoYXJhY3RlclxuICogcmVmZXJlbmNlIHdoZW4gcGFydCBvZiB0aGUgc3RyaW5nIFwiXV0+XCIuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqXG4gKiBAcmV0dXJucyBBIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBzdHJpbmcgd2l0aCByaWdodCBhbmdsZSBicmFja2V0cyBlc2NhcGVkXG4gKiAgICAgICAgICB3aGVuIHBhcnQgb2YgdGhlIHN0cmluZyBcIl1dPlwiLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJpZ2h0QW5nbGVCcmFja2V0c0luQ2RhdGFUZXJtaW5hdG9yKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXV0+L2csIFwiXV0mZ3Q7XCIpO1xufVxuZXhwb3J0cy5lc2NhcGVSaWdodEFuZ2xlQnJhY2tldHNJbkNkYXRhVGVybWluYXRvciA9IGVzY2FwZVJpZ2h0QW5nbGVCcmFja2V0c0luQ2RhdGFUZXJtaW5hdG9yO1xuLyoqXG4gKiBSZXBsYWNlcyBzaW5nbGUgcXVvdGVzIChcIikgd2l0aCB0aGUgYXBwcm9wcmlhdGUgWE1MIGNoYXJhY3RlciByZWZlcmVuY2UuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqXG4gKiBAcmV0dXJucyBBIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBzdHJpbmcgd2l0aCBzaW5nbGUgcXVvdGVzIGVzY2FwZWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXNjYXBlU2luZ2xlUXVvdGVzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJy9nLCBcIiZhcG9zO1wiKTtcbn1cbmV4cG9ydHMuZXNjYXBlU2luZ2xlUXVvdGVzID0gZXNjYXBlU2luZ2xlUXVvdGVzO1xuLyoqXG4gKiBSZXBsYWNlcyBkb3VibGUgcXVvdGVzIChcIikgd2l0aCB0aGUgYXBwcm9wcmlhdGUgWE1MIGNoYXJhY3RlciByZWZlcmVuY2UuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqXG4gKiBAcmV0dXJucyBBIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBzdHJpbmcgd2l0aCBkb3VibGUgcXVvdGVzIGVzY2FwZWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXNjYXBlRG91YmxlUXVvdGVzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG59XG5leHBvcnRzLmVzY2FwZURvdWJsZVF1b3RlcyA9IGVzY2FwZURvdWJsZVF1b3RlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvZXNjYXBlLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgZXNjYXBlXzEgPSByZXF1aXJlKFwiLi4vZXNjYXBlXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRleHQgaW4gYW4gWE1MIGF0dHJpYnV0ZSB2YWx1ZS5cbiAqXG4gKiBSZXN0cmljdGVkIGNoYXJhY3RlcnMsIHN1Y2ggYXMgdGhlIGFtcGVyc2FuZCAoYCZgKSBhbmQgdGhlIG9wZW5pbmcgYW5nbGVcbiAqIGJyYWNrZXQgKGA8YCksIGFyZSBhbGwgYXV0b21hdGljYWxseSBlc2NhcGVkLlxuICpcbiAqIFRvIGNyZWF0ZSBhbiBjaGFyYWN0ZXIgcmVmZXJlbmNlIG9yIGVudGl0eSByZWZlcmVuY2UsIHlvdSBzaG91bGQgdXNlXG4gKiB7QGxpbmsgWG1sQ2hhclJlZn0gb3Ige0BsaW5rIFhtbEVudGl0eVJlZn0gcmVzcGVjdGl2ZWx5IGluc3RlYWQuXG4gKlxuICogWG1sQXR0cmlidXRlVGV4dCBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxBdHRyaWJ1dGVUZXh0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sQXR0cmlidXRlVGV4dCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbEF0dHJpYnV0ZVRleHR9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGV4dC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxBdHRyaWJ1dGVUZXh0KHRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbEF0dHJpYnV0ZVRleHQucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRleHQgVGV4dC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0ZXh0IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcih0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRleHQgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90IGFsbG93ZWRcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGVUZXh0LnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQXR0cmlidXRlVGV4dCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbEF0dHJpYnV0ZVRleHR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlVGV4dC5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQXR0cmlidXRlVGV4dCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbEF0dHJpYnV0ZVRleHR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZVRleHQucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQXR0cmlidXRlVGV4dCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbEF0dHJpYnV0ZVRleHR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGVUZXh0LnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQXR0cmlidXRlVGV4dCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGVUZXh0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLnRleHQ7XG4gICAgICAgIHN0ciA9IGVzY2FwZV8xLmVzY2FwZUFtcGVyc2FuZHMoc3RyKTtcbiAgICAgICAgc3RyID0gZXNjYXBlXzEuZXNjYXBlTGVmdEFuZ2xlQnJhY2tldHMoc3RyKTtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxBdHRyaWJ1dGVUZXh0O1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sQXR0cmlidXRlVGV4dDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQXR0cmlidXRlVGV4dC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICpcbiAqIEFuIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHtkZWN9YCBpcyB0aGVcbiAqIGRlY2ltYWwgcmVwcmVzZW50YXRpb24gY29kZSBwb2ludCBjb3JyZXNwb25kaW5nIHRvIGEgcGFydGljdWxhciBVbmljb2RlXG4gKiBjaGFyYWN0ZXI6XG4gKlxuICogYGBgeG1sXG4gKiAmI3tkZWN9O1xuICogYGBgXG4gKlxuICogVGhlIGNvcnJlc3BvbmRpbmcgaGV4YWRlY2ltYWwgdmVyc2lvbiBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlXG4gKiBge2hleH1gIGlzIHRoZSBoZXhhZGVjaW1hbCByZXByZXNlbnRhdGlvbiBjb2RlIHBvaW50IGNvcnJlc3BvbmRpbmcgdG8gYVxuICogcGFydGljdWxhciBVbmljb2RlIGNoYXJhY3RlcjpcbiAqXG4gKiBgYGB4bWxcbiAqICYjeHtoZXh9O1xuICogYGBgXG4gKlxuICogVW5pY29kZSBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlIEJhc2ljIE11bHRpbGluZ3VhbCBQbGFuZSBhcmUgcmVwcmVzZW50ZWRcbiAqIHVzaW5nIGEgc3Vycm9nYXRlIHBhaXIgY29uc2lzdGluZyBvZiB0d28gY2hhcmFjdGVyIHJlZmVyZW5jZXMuXG4gKlxuICogVGhlIGB7ZGVjfWAgYW5kIGB7aGV4fWAgdmFsdWVzIGFyZSBkZWZpbmVkIGJ5IHRoZSBgY2hhcmAgYW5kIGBoZXhgXG4gKiBwcm9wZXJ0aWVzIG9mIHRoaXMgbm9kZTsgdGhlIGZvcm1lciBpcyB0aGUgY2hhcmFjdGVyIHRvIGJlIHJlcHJlc2VudGVkIHdoaWxlXG4gKiB0aGUgbGF0dGVyIGluZGljYXRlcyB3aGV0aGVyIHRoZSBkZWNpbWFsIG9yIGhleGFkZWNpbWFsIHJlcHJlc2VudGF0aW9uXG4gKiBzaG91bGQgYmUgdXNlZC5cbiAqXG4gKiBYbWxDaGFyUmVmIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbENoYXJSZWYgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxDaGFyUmVmLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sQ2hhclJlZn0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhciBUaGUgY2hhcmFjdGVyIHRvIHJlcHJlc2VudCB1c2luZyB0aGUgcmVmZXJlbmNlLlxuICAgICAqIEBwYXJhbSBoZXggV2hldGhlciB0byB1c2UgdGhlIGhleGFkZWNpbWFsIG9yIGRlY2ltYWwgcmVwcmVzZW50YXRpb24gZm9yXG4gICAgICogICAgICAgICAgICB0aGUgcmVmZXJlbmNlLiBJZiBsZWZ0IHVuZGVmaW5lZCwgZGVjaW1hbCBpcyB0aGUgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxDaGFyUmVmKGNoYXIsIGhleCkge1xuICAgICAgICBpZiAoaGV4ID09PSB2b2lkIDApIHsgaGV4ID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2hhciA9IGNoYXI7XG4gICAgICAgIF90aGlzLmhleCA9IGhleDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sQ2hhclJlZi5wcm90b3R5cGUsIFwiY2hhclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBjaGFyYWN0ZXIgdG8gcmVwcmVzZW50IHVzaW5nIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBjaGFyYWN0ZXIgdG8gcmVwcmVzZW50IHVzaW5nIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGFyO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgY2hhcmFjdGVyIHRvIHJlcHJlc2VudCB1c2luZyB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gY2hhciBUaGUgY2hhcmFjdGVyIHRvIHJlcHJlc2VudCB1c2luZyB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoY2hhcikge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGNoYXIpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNoYXIgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVTaW5nbGVDaGFyKGNoYXIpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhciBzaG91bGQgY29udGFpbiBhIHNpbmdsZSBjaGFyYWN0ZXIsIGFuZCB0aGlzXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBjaGFyYWN0ZXIgc2hvdWxkIGJlIGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2hhciA9IGNoYXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxDaGFyUmVmLnByb3RvdHlwZSwgXCJoZXhcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB3aGV0aGVyIG9yIG5vdCB0byB1c2UgdGhlIGhleGFkZWNpbWFsIG9yIGRlY2ltYWwgcmVwcmVzZW50YXRpb24gZm9yXG4gICAgICAgICAqIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFdoZXRoZXIgb3Igbm90IHRvIHVzZSB0aGUgaGV4YWRlY2ltYWwgb3IgZGVjaW1hbCByZXByZXNlbnRhdGlvblxuICAgICAgICAgKiAgICAgICAgICBmb3IgdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hleDtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgd2hldGhlciBvciBub3QgdG8gdXNlIHRoZSBoZXhhZGVjaW1hbCBvciBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGZvclxuICAgICAgICAgKiB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gaGV4IFdoZXRoZXIgb3Igbm90IHRvIHVzZSB0aGUgaGV4YWRlY2ltYWwgb3IgZGVjaW1hbFxuICAgICAgICAgKiAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uIGZvciB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaGV4KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNCb29sZWFuKGhleCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiaGV4IHNob3VsZCBiZSBhIGJvb2xlYW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9oZXggPSBoZXg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENoYXJSZWYucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDaGFyUmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhclJlZn0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyUmVmLnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDaGFyUmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhclJlZn0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2hhclJlZi5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDaGFyUmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhclJlZn0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENoYXJSZWYucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDaGFyUmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbENoYXJSZWYucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIGNoYXI7XG4gICAgICAgIGlmICh0aGlzLmNoYXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjaGFyID0gdGhpcy5jaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaGFyID0gdXRpbHNfMS5nZXRDb2RlUG9pbnQodGhpcy5jaGFyLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBcIiYjeFwiICsgY2hhci50b1N0cmluZygxNikgKyBcIjtcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIiYjXCIgKyBjaGFyICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBYbWxDaGFyUmVmO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sQ2hhclJlZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhclJlZi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBlbnRpdHkgcmVmZXJlbmNlLlxuICpcbiAqIEFuIFhNTCBlbnRpdHkgcmVmZXJlbmNlIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmVcbiAqIGB7ZW50aXR5fWAgaXMgbmFtZSBvZiB0aGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQ6XG4gKlxuICogYGBgeG1sXG4gKiAme2VudGl0eX07XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHtlbnRpdHl9YCB2YWx1ZSBpcyBhIHByb3BlcnR5IG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxFbnRpdHlSZWYgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sRW50aXR5UmVmID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRW50aXR5UmVmLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sRW50aXR5UmVmfSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgVGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbEVudGl0eVJlZihlbnRpdHkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZW50aXR5ID0gZW50aXR5O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxFbnRpdHlSZWYucHJvdG90eXBlLCBcImVudGl0eVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW50aXR5O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBlbnRpdHkgVGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoZW50aXR5KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJlbnRpdHkgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVOYW1lKGVudGl0eSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlbnRpdHkgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnNcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiIG5vdCBhbGxvd2VkIGluIFhNTCBuYW1lc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VudGl0eSA9IGVudGl0eTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxFbnRpdHlSZWYucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxFbnRpdHlSZWYgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxFbnRpdHlSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRW50aXR5UmVmLnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxFbnRpdHlSZWYgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxFbnRpdHlSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbEVudGl0eVJlZi5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxFbnRpdHlSZWYgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxFbnRpdHlSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxFbnRpdHlSZWYucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxFbnRpdHlSZWYgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRW50aXR5UmVmLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIiZcIiArIHRoaXMuZW50aXR5ICsgXCI7XCI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRW50aXR5UmVmO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRW50aXR5UmVmO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbnRpdHlSZWYuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gbnVsbCAhPT0gb2JqICYmICdvYmplY3QnID09PSB0eXBlb2Ygb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvaXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIGVzY2FwZV8xID0gcmVxdWlyZShcIi4uL2VzY2FwZVwiKTtcbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vb3B0aW9uc1wiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sQXR0cmlidXRlVGV4dF8xID0gcmVxdWlyZShcIi4vWG1sQXR0cmlidXRlVGV4dFwiKTtcbnZhciBYbWxDaGFyUmVmXzEgPSByZXF1aXJlKFwiLi9YbWxDaGFyUmVmXCIpO1xudmFyIFhtbEVudGl0eVJlZl8xID0gcmVxdWlyZShcIi4vWG1sRW50aXR5UmVmXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIGVsZW1lbnQgYXR0cmlidXRlLlxuICpcbiAqIEFuIFhNTCBlbGVtZW50IGF0dHJpYnV0ZSBpcyBwYXJ0IG9mIHRoZSBzdGFydCB0YWcgb2YgYW4gZWxlbWVudCBhbmQgaXNcbiAqIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHtuYW1lfWAgaXMgdGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSBhbmRcbiAqIGB7dmFsdWV9YCBpcyB0aGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZTpcbiAqXG4gKiBgYGB4bWxcbiAqIDxlbGVtZW50IHtuYW1lfT1cInt2YWx1ZX1cIj5cbiAqIGBgYFxuICpcbiAqIFRoZSBge25hbWV9YCB2YWx1ZSBpcyBhIHByb3BlcnR5IG9mIHRoaXMgbm9kZSwgd2hpbGUgdGhlIGB7dmFsdWV9YCBwcm9wZXJ0eVxuICogY29uc2lzdHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxBdHRyaWJ1dGUgbm9kZXMgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGlsZCwgYW5kIGNhbiBoYXZlIGFuIHVubGltaXRlZFxuICogbnVtYmVyIG9mIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSwge0BsaW5rIFhtbENoYXJSZWZ9LCBhbmRcbiAqIHtAbGluayBYbWxFbnRpdHlSZWZ9IG5vZGVzIGFzIGNoaWxkcmVuLlxuICovXG52YXIgWG1sQXR0cmlidXRlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sQXR0cmlidXRlLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sQXR0cmlidXRlfSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBYTUwgYXR0cmlidXRlLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgWE1MIGF0dHJpYnV0ZS4gQWRkaXRpb25hbCBjaGlsZHJlblxuICAgICAqICAgICAgICAgICAgICBjYW4gYmUgYWRkZWQgbGF0ZXIuIE9ubHkge0BsaW5rIFhtbEF0dHJpYnV0ZVRleHR9LFxuICAgICAqICAgICAgICAgICAgICB7QGxpbmsgWG1sQ2hhclJlZn0sIGFuZCB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBhcmVcbiAgICAgKiAgICAgICAgICAgICAgcGVybWl0dGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgdmFsdWVfMSA9IHZhbHVlOyBfaSA8IHZhbHVlXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB2YWx1ZV8xW19pXTtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnNlcnRDaGlsZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmluc2VydENoaWxkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxBdHRyaWJ1dGUucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGlzIGF0dHJpYnV0ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIG5hbWUgb2YgdGhpcyBhdHRyaWJ1dGUuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGlzIGF0dHJpYnV0ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhpcyBhdHRyaWJ1dGUuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibmFtZSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZU5hbWUobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuYW1lIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzIG5vdFwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgYWxsb3dlZCBpbiBYTUwgbmFtZXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBYTUwgY2hhcmFjdGVyIHJlZmVyZW5jZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYXIgVGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gaGV4IFdoZXRoZXIgdG8gdXNlIHRoZSBoZXhhZGVjaW1hbCBvciBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGZvclxuICAgICAqICAgICAgICAgICAgdGhlIHJlZmVyZW5jZS4gSWYgbGVmdCB1bmRlZmluZWQsIGRlY2ltYWwgaXMgdGhlIGRlZmF1bHQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGUucHJvdG90eXBlLmNoYXJSZWYgPSBmdW5jdGlvbiAoY2hhciwgaGV4LCBpbmRleCkge1xuICAgICAgICB2YXIgY2hhclJlZiA9IG5ldyBYbWxDaGFyUmVmXzEuZGVmYXVsdChjaGFyLCBoZXgpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGNoYXJSZWYsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGNoYXJSZWY7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IFhNTCBlbnRpdHkgcmVmZXJlbmNlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgWE1MIGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZS5wcm90b3R5cGUuZW50aXR5UmVmID0gZnVuY3Rpb24gKGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNoYXJSZWYgPSBuZXcgWG1sRW50aXR5UmVmXzEuZGVmYXVsdChlbnRpdHkpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGNoYXJSZWYsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGNoYXJSZWY7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuIGF0IHRoZSBzcGVjaWZpZWRcbiAgICAgKiBpbmRleC4gVGhlIG5vZGUgaXMgbm90IGluc2VydGVkIGlmIGl0IGlzIGFscmVhZHkgcHJlc2VudC4gSWYgdGhpcyBub2RlXG4gICAgICogYWxyZWFkeSBoYXMgYSBwYXJlbnQsIGl0IGlzIHJlbW92ZWQgZnJvbSB0aGF0IHBhcmVudC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBvbmx5IHtAbGluayBYbWxDaGFyUmVmfSwge0BsaW5rIFhtbEVudGl0eVJlZn0sIGFuZFxuICAgICAqIHtAbGluayBYbWxDaGFyRGF0YX0gbm9kZXMgY2FuIGJlIGluc2VydGVkOyBvdGhlcndpc2UsIGFuIGV4Y2VwdGlvbiB3aWxsXG4gICAgICogYmUgdGhyb3duLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gaW5zZXJ0LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBub2RlLiBOb2RlcyBhdCBvciBhZnRlciB0aGVcbiAgICAgKiAgICAgICAgICAgICAgaW5kZXggYXJlIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWQsXG4gICAgICogICAgICAgICAgICAgIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSBpbnNlcnRlZCBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuLCBvciB1bmRlZmluZWQgaWYgbm9cbiAgICAgKiAgICAgICAgICBub2RlIHdhcyBpbnNlcnRlZC5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGUucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBYbWxDaGFyUmVmXzEuZGVmYXVsdCB8fCBub2RlIGluc3RhbmNlb2YgWG1sRW50aXR5UmVmXzEuZGVmYXVsdCB8fFxuICAgICAgICAgICAgbm9kZSBpbnN0YW5jZW9mIFhtbEF0dHJpYnV0ZVRleHRfMS5kZWZhdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5vZGUgc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mIFhtbENoYXJSZWYsXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbEVudGl0eVJlZiwgb3IgWG1sQXR0cmlidXRlVGV4dFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5pbnNlcnRDaGlsZC5jYWxsKHRoaXMsIG5vZGUsIGluZGV4KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBub2RlIGZyb20gdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBub2RlIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hpbGQuIEF0dGVtcHRzIHRvIHJlbW92ZVxuICAgICAqIHRoZSBsYXN0IGNoaWxkIG5vZGUgd2lsbCByZXN1bHQgaW4gYW4gZXhjZXB0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gcmVtb3ZlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgV2hldGhlciBhIG5vZGUgd2FzIHJlbW92ZWQuXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZSBub2RlcyBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGNoaWxkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkLmNhbGwodGhpcywgbm9kZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBub2RlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggZnJvbSB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB0aGlzIG5vZGUgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGlsZC4gQXR0ZW1wdHMgdG8gcmVtb3ZlXG4gICAgICogdGhlIGxhc3QgY2hpbGQgbm9kZSB3aWxsIHJlc3VsdCBpbiBhbiBleGNlcHRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHRvIGJlIHJlbW92ZWQgaXMgbG9jYXRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIHRoYXQgd2FzIHJlbW92ZWQsIG9yIHVuZGVmaW5lZCBpZiBubyBub2RlIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZSBub2RlcyBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGNoaWxkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleC5jYWxsKHRoaXMsIGluZGV4KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgWE1MIHRleHQgbm9kZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgQXJiaXRyYXJ5IGNoYXJhY3RlciBkYXRhLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiAgICAgICAgICAgICAgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBYTUwgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlLnByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24gKHRleHQsIGluZGV4KSB7XG4gICAgICAgIHZhciB0ZXh0Tm9kZSA9IG5ldyBYbWxBdHRyaWJ1dGVUZXh0XzEuZGVmYXVsdCh0ZXh0KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZCh0ZXh0Tm9kZSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gdGV4dE5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBvcHRpb25zT2JqID0gbmV3IG9wdGlvbnNfMS5TdHJpbmdPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB2YXIgcXVvdGUgPSBvcHRpb25zT2JqLmRvdWJsZVF1b3RlcyA/IFwiXFxcIlwiIDogXCInXCI7XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLm5hbWUgKyBcIj1cIiArIHF1b3RlO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fY2hpbGRyZW47IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBfYVtfaV07XG4gICAgICAgICAgICBpZiAob3B0aW9uc09iai5kb3VibGVRdW90ZXMpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gZXNjYXBlXzEuZXNjYXBlRG91YmxlUXVvdGVzKGNoaWxkLnRvU3RyaW5nKG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0ciArPSBlc2NhcGVfMS5lc2NhcGVTaW5nbGVRdW90ZXMoY2hpbGQudG9TdHJpbmcob3B0aW9ucykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0ciArPSBxdW90ZTtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxBdHRyaWJ1dGU7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxBdHRyaWJ1dGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbEF0dHJpYnV0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgQ0RBVEEgc2VjdGlvbi5cbiAqXG4gKiBBbiBYTUwgQ0RBVEEgc2VjdGlvbiBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7ZGF0YX1gIGlzIHRoZVxuICogY2hhcmFjdGVyIGRhdGEgb2YgdGhlIHNlY3Rpb246XG4gKlxuICogYGBgeG1sXG4gKiA8IVtDREFUQVt7ZGF0YX1dXT5cbiAqIGBgYFxuICpcbiAqIFRoZSBge2RhdGF9YCB2YWx1ZSBpcyBhIHByb3BlcnR5IG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxDZGF0YSBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxDZGF0YSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbENkYXRhLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sQ2RhdGF9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGNoYXJhY3RlciBkYXRhIG9mIHRoZSBDREFUQSBzZWN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbENkYXRhKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbENkYXRhLnByb3RvdHlwZSwgXCJkYXRhXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGNoYXJhY3RlciBkYXRhIG9mIHRoZSBDREFUQSBzZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgY2hhcmFjdGVyIGRhdGEgb2YgdGhlIENEQVRBIHNlY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgY2hhcmFjdGVyIGRhdGEgb2YgdGhlIENEQVRBIHNlY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIFRoZSBjaGFyYWN0ZXIgZGF0YSBvZiB0aGUgQ0RBVEEgc2VjdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjaGFyYWN0ZXIgZGF0YSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFyYWN0ZXIgZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVycyBub3RcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoL11dPi8udGVzdChkYXRhKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgc2hvdWxkIG5vdCBjb250YWluIHRoZSBzdHJpbmcgJ11dPidcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2RhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENkYXRhLnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2RhdGEgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDZGF0YX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDZGF0YS5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2RhdGEgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDZGF0YX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2RhdGEucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2RhdGEgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDZGF0YX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENkYXRhLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2RhdGEgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sQ2RhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIFwiPCFbQ0RBVEFbXCIgKyB0aGlzLmRhdGEgKyBcIl1dPlwiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbENkYXRhO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sQ2RhdGE7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbENkYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIGVzY2FwZV8xID0gcmVxdWlyZShcIi4uL2VzY2FwZVwiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBjaGFyYWN0ZXIgZGF0YSBpbiBhbiBYTUwgZG9jdW1lbnQuXG4gKlxuICogUmVzdHJpY3RlZCBjaGFyYWN0ZXJzLCBzdWNoIGFzIHRoZSBhbXBlcnNhbmQgKGAmYCksIHRoZSBvcGVuaW5nIGFuZ2xlXG4gKiBicmFja2V0IChgPGApLCBhbmQgdGhlIGNsb3NpbmcgYW5nbGUgYnJhY2tldCAoYD5gKSB3aGVuIGl0IGFwcGVhcnMgaW4gdGhlXG4gKiBzdHJpbmcgYF1dPmAsIGFyZSBhbGwgYXV0b21hdGljYWxseSBlc2NhcGVkLlxuICpcbiAqIFRvIGNyZWF0ZSBhbiBjaGFyYWN0ZXIgcmVmZXJlbmNlIG9yIGVudGl0eSByZWZlcmVuY2UsIHlvdSBzaG91bGQgdXNlXG4gKiB7QGxpbmsgWG1sQ2hhclJlZn0gb3Ige0BsaW5rIFhtbEVudGl0eVJlZn0gcmVzcGVjdGl2ZWx5IGluc3RlYWQuXG4gKlxuICogWG1sQ2hhckRhdGEgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sQ2hhckRhdGEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxDaGFyRGF0YSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbENoYXJEYXRhfSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFyRGF0YSBDaGFyYWN0ZXIgZGF0YS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxDaGFyRGF0YShjaGFyRGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jaGFyRGF0YSA9IGNoYXJEYXRhO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxDaGFyRGF0YS5wcm90b3R5cGUsIFwiY2hhckRhdGFcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgY2hhcmFjdGVyIGRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIGNoYXJhY3RlciBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5vZGUuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGFyRGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGNoYXJhY3RlciBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5vZGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBjaGFyRGF0YSBDaGFyYWN0ZXIgZGF0YS5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGNoYXJEYXRhKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoY2hhckRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNoYXJEYXRhIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcihjaGFyRGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFyRGF0YSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVycyBub3QgYWxsb3dlZFwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2hhckRhdGEgPSBjaGFyRGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENoYXJEYXRhLnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhckRhdGEgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDaGFyRGF0YX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyRGF0YS5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhckRhdGEgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDaGFyRGF0YX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2hhckRhdGEucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhckRhdGEgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDaGFyRGF0YX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENoYXJEYXRhLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhckRhdGEgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sQ2hhckRhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIHN0ciA9IHRoaXMuY2hhckRhdGE7XG4gICAgICAgIHN0ciA9IGVzY2FwZV8xLmVzY2FwZUFtcGVyc2FuZHMoc3RyKTtcbiAgICAgICAgc3RyID0gZXNjYXBlXzEuZXNjYXBlTGVmdEFuZ2xlQnJhY2tldHMoc3RyKTtcbiAgICAgICAgc3RyID0gZXNjYXBlXzEuZXNjYXBlUmlnaHRBbmdsZUJyYWNrZXRzSW5DZGF0YVRlcm1pbmF0b3Ioc3RyKTtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxDaGFyRGF0YTtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbENoYXJEYXRhO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxDaGFyRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vb3B0aW9uc1wiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIGRlY2xhcmF0aW9uLlxuICpcbiAqIEFuIFhNTCBkZWNsYXJhdGlvbiBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7dmVyc2lvbn1gIGlzIHRoZSBYTUxcbiAqIHZlcnNpb24sIGB7ZW5jb2Rpbmd9YCBpcyB0aGUgZW5jb2Rpbmcgb2YgdGhlIGRvY3VtZW50LCBhbmQgYHtzdGFuZGFsb25lfWBcbiAqIGlzIGVpdGhlciBcInllc1wiIG9yIFwibm9cIiwgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIGRvY3VtZW50IG1heSBjb250YWluXG4gKiBleHRlcm5hbCBtYXJrdXAgZGVjbGFyYXRpb25zOlxuICpcbiAqIGBgYHhtbFxuICogPD94bWwgdmVyc2lvbj1cInt2ZXJzaW9ufVwiIGVuY29kaW5nPVwie2VuY29kaW5nfVwiIHN0YW5kYWxvbmU9XCJ7c3RhbmRhbG9uZX1cIj8+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt2ZXJzaW9ufWAsIGB7ZW5jb2Rpbmd9YCwgYW5kIGB7c3RhbmRhbG9uZX1gIHZhbHVlcyBhcmUgcHJvcGVydGllcyBvZlxuICogdGhpcyBub2RlLlxuICpcbiAqIFhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sRGVjbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbERlY2wsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEZWNsfSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbERlY2wob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICB2YXIgb3B0aW9uc09iaiA9IG5ldyBvcHRpb25zXzEuRGVjbGFyYXRpb25PcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBfdGhpcy5lbmNvZGluZyA9IG9wdGlvbnNPYmouZW5jb2Rpbmc7XG4gICAgICAgIF90aGlzLnN0YW5kYWxvbmUgPSBvcHRpb25zT2JqLnN0YW5kYWxvbmU7XG4gICAgICAgIF90aGlzLnZlcnNpb24gPSBvcHRpb25zT2JqLnZlcnNpb247XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbERlY2wucHJvdG90eXBlLCBcImVuY29kaW5nXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIFhNTCBlbmNvZGluZyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBYTUwgZW5jb2RpbmcgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLiBUaGlzIHZhbHVlXG4gICAgICAgICAqICAgICAgICAgIG1heSBiZSB1bmRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmNvZGluZztcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIFhNTCBlbmNvZGluZyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBlbmNvZGluZyBUaGUgWE1MIGVuY29kaW5nIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi4gVGhpc1xuICAgICAgICAgKiAgICAgICAgICAgICAgICAgdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGVuY29kaW5nLiBJZiBsZWZ0IHVuZGVmaW5lZCwgbm9cbiAgICAgICAgICogICAgICAgICAgICAgICAgIGVuY29kaW5nIGlzIGluY2x1ZGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgICAgICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKGVuY29kaW5nKSkge1xuICAgICAgICAgICAgICAgIGlmICghL15bQS1aYS16XVtBLVphLXowLTkuXy1dKiQvLnRlc3QoZW5jb2RpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVuY29kaW5nIHNob3VsZCBiZSBhIHZhbGlkIFhNTCBlbmNvZGluZ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChlbmNvZGluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibmFtZSBzaG91bGQgYmUgYSBzdHJpbmcgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbERlY2wucHJvdG90eXBlLCBcInN0YW5kYWxvbmVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgWE1MIHN0YW5kYWxvbmUgYXR0cmlidXRlIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIFhNTCBzdGFuZGFsb25lIGF0dHJpYnV0ZSB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uXG4gICAgICAgICAqICAgICAgICAgIFRoaXMgdmFsdWUgbWF5IGJlIHVuZGVmaW5lZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YW5kYWxvbmU7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBYTUwgc3RhbmRhbG9uZSBhdHRyaWJ1dGUgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gc3RhbmRhbG9uZSBUaGUgWE1MIHN0YW5kYWxvbmUgYXR0cmlidXRlIHRvIGJlIGluY2x1ZGVkLiBUaGlzXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgIHZhbHVlIG11c3QgYmUgXCJ5ZXNcIiBvciBcIm5vXCIuIElmIGxlZnQgdW5kZWZpbmVkLCBub1xuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICBzdGFuZGFsb25lIGF0dHJpYnV0ZSBpcyBpbmNsdWRlZC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHN0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKHN0YW5kYWxvbmUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEvXih5ZXN8bm8pJC8udGVzdChzdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdGFuZGFsb25lIHNob3VsZCBiZSBlaXRoZXIgdGhlIHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiICd5ZXMnIG9yIHRoZSBzdHJpbmcgJ25vJ1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChzdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJzdGFuZGFsb25lIHNob3VsZCBiZSBhIHN0cmluZyBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdGFuZGFsb25lID0gc3RhbmRhbG9uZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbERlY2wucHJvdG90eXBlLCBcInZlcnNpb25cIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgWE1MIHZlcnNpb24gdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgWE1MIHZlcnNpb24gdG8gdGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb247XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBYTUwgdmVyc2lvbiB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB2ZXJzaW9uIFRoZSBYTUwgdmVyc2lvbiB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uIFRoaXNcbiAgICAgICAgICogICAgICAgICAgICAgICAgdmFsdWUgbXVzdCBiZSBhIHZhbGlkIFhNTCB2ZXJzaW9uIG51bWJlci4gSWYgbGVmdFxuICAgICAgICAgKiAgICAgICAgICAgICAgICB1bmRlZmluZWQsIHRoZSBkZWZhdWx0IHZlcnNpb24gaXMgXCIxLjBcIi5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh2ZXJzaW9uKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ2ZXJzaW9uIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCEvXjFcXC5bMC05XSskLy50ZXN0KHZlcnNpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmVyc2lvbiBzaG91bGQgYmUgYSB2YWxpZCBYTUwgdmVyc2lvblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEZWNsfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEZWNsLnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRGVjbCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbERlY2x9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRGVjbC5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRGVjbCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbERlY2x9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbERlY2wucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRGVjbCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbERlY2x9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEZWNsLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRGVjbCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEZWNsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBvcHRpb25zT2JqID0gbmV3IG9wdGlvbnNfMS5TdHJpbmdPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB2YXIgcXVvdGUgPSBvcHRpb25zT2JqLmRvdWJsZVF1b3RlcyA/ICdcIicgOiBcIidcIjtcbiAgICAgICAgdmFyIHN0ciA9IFwiPD94bWwgdmVyc2lvbj1cIiArIHF1b3RlICsgdGhpcy52ZXJzaW9uICsgcXVvdGU7XG4gICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKHRoaXMuZW5jb2RpbmcpKSB7XG4gICAgICAgICAgICBzdHIgKz0gXCIgZW5jb2Rpbmc9XCIgKyBxdW90ZSArIHRoaXMuZW5jb2RpbmcgKyBxdW90ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyh0aGlzLnN0YW5kYWxvbmUpKSB7XG4gICAgICAgICAgICBzdHIgKz0gXCIgc3RhbmRhbG9uZT1cIiArIHF1b3RlICsgdGhpcy5zdGFuZGFsb25lICsgcXVvdGU7XG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IFwiPz5cIjtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxEZWNsO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRGVjbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRGVjbC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vb3B0aW9uc1wiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sQ29tbWVudF8xID0gcmVxdWlyZShcIi4vWG1sQ29tbWVudFwiKTtcbnZhciBYbWxEdGRBdHRsaXN0XzEgPSByZXF1aXJlKFwiLi9YbWxEdGRBdHRsaXN0XCIpO1xudmFyIFhtbER0ZEVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuL1htbER0ZEVsZW1lbnRcIik7XG52YXIgWG1sRHRkRW50aXR5XzEgPSByZXF1aXJlKFwiLi9YbWxEdGRFbnRpdHlcIik7XG52YXIgWG1sRHRkTm90YXRpb25fMSA9IHJlcXVpcmUoXCIuL1htbER0ZE5vdGF0aW9uXCIpO1xudmFyIFhtbER0ZFBhcmFtRW50aXR5UmVmXzEgPSByZXF1aXJlKFwiLi9YbWxEdGRQYXJhbUVudGl0eVJlZlwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xudmFyIFhtbFByb2NJbnN0XzEgPSByZXF1aXJlKFwiLi9YbWxQcm9jSW5zdFwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgZG9jdW1lbnQgdHlwZSBkZWZpbml0aW9uIChEVEQpLlxuICpcbiAqIEFuIFhNTCBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24gIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHtuYW1lfWAgaXNcbiAqIHRoZSBuYW1lIG9mIHRoZSBEVEQsIGB7c3lzSWR9YCBpcyB0aGUgc3lzdGVtIGlkZW50aWZpZXIgb2YgdGhlIERURCxcbiAqIGB7cHViSWR9YCBpcyB0aGUgcHVibGljIGlkZW50aWZpZXIgb2YgdGhlIERURCwgYW5kIGB7aW50U3Vic2V0fWAgaXMgdGhlXG4gKiBpbnRlcm5hbCBzdWJzZXQgb2YgdGhlIERURDpcbiAqXG4gKiBgYGB4bWxcbiAqIDwhRE9DVFlQRSB7bmFtZX0gU1lTVEVNIFwie3N5c0lkfVwiIFBVQkxJQyBcIntwdWJJZH1cIiBbXG4gKiAgICAge2ludFN1YnNldH1cbiAqIF0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHtuYW1lfWAsIGB7cHViSWR9YCwgYW5kIGB7c3lzSWR9YCB2YWx1ZXMgYXJlIHByb3BlcnRpZXMgb2YgdGhlIG5vZGUsXG4gKiB3aGlsZSB0aGUgYHtpbnRTdWJzZXR9YCB2YWx1ZSBjb25zaXN0cyBvZiB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbER0ZCBub2RlcyBjYW4gaGF2ZSBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIHtAbGluayBYbWxDb21tZW50fSxcbiAqIHtAbGluayBYbWxEdGRBdHRsaXN0fSwge0BsaW5rIFhtbER0ZEVsZW1lbnR9LCB7QGxpbmsgWG1sRHRkRW50aXR5fSxcbiAqIHtAbGluayBYbWxEdGROb3RhdGlvbn0sIHtAbGluayBYbWxEdGRQYXJhbUVudGl0eVJlZn0sIGFuZFxuICoge0BsaW5rIFhtbFByb2NJbnN0fSBub2Rlcy5cbiAqL1xudmFyIFhtbER0ZCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbER0ZCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbER0ZH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgRFRELlxuICAgICAqIEBwYXJhbSBzeXNJZCBUaGUgc3lzdGVtIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgKiBAcGFyYW0gcHViSWQgVGhlIHB1YmxpYyBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICogICAgICAgICAgICAgIElmIGEgcHVibGljIGlkZW50aWZpZXIgaXMgcHJvdmlkZWQsIGEgc3lzdGVtIGlkZW50aWZpZXJcbiAgICAgKiAgICAgICAgICAgICAgbXVzdCBiZSBwcm92aWRlZCBhcyB3ZWxsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbER0ZChuYW1lLCBzeXNJZCwgcHViSWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIF90aGlzLnN5c0lkID0gc3lzSWQ7XG4gICAgICAgIF90aGlzLnB1YklkID0gcHViSWQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZC5wcm90b3R5cGUsIFwibmFtZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSBEVEQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoZSBEVEQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgRFRELlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgRFRELlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVOYW1lKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibmFtZSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVycyBub3RcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGFsbG93ZWQgaW4gWE1MIG5hbWVzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGQucHJvdG90eXBlLCBcInB1YklkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHB1YmxpYyBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKiAgICAgICAgICBUaGlzIHZhbHVlIG1heSBiZSB1bmRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wdWJJZDtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHB1YmxpYyBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuIElmIGFcbiAgICAgICAgICogcHVibGljIGlkZW50aWZpZXIgaXMgcHJvdmlkZWQsIGEgc3lzdGVtIGlkZW50aWZpZXIgbXVzdCBiZSBwcm92aWRlZCBhc1xuICAgICAgICAgKiB3ZWxsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gcHViSWQgVGhlIHB1YmxpYyBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICAgICAqICAgICAgICAgICAgICBUaGlzIHZhbHVlIG1heSBiZSB1bmRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwdWJJZCkge1xuICAgICAgICAgICAgaWYgKHV0aWxzXzEuaXNTdHJpbmcocHViSWQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEvXihcXHUwMDIwfFxcdTAwMER8XFx1MDAwQXxbYS16QS1aMC05XXxbLScoKSssLi86PT87ISojQCRfJV0pKiQvXG4gICAgICAgICAgICAgICAgICAgIC50ZXN0KHB1YklkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwdWJJZCBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVycyBub3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiBhbGxvd2VkIGluIHB1YmxpYyBpZGVudGlmaWVyc1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnN5c0lkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwdWJJZCBzaG91bGQgbm90IGJlIGRlZmluZWQgaWYgc3lzSWQgaXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQocHViSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInB1YklkIHNob3VsZCBiZSBhIHN0cmluZyBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wdWJJZCA9IHB1YklkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sRHRkLnByb3RvdHlwZSwgXCJzeXNJZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBzeXN0ZW0gaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgc3lzdGVtIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgICAgICogICAgICAgICAgVGhpcyB2YWx1ZSBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3lzSWQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBzeXN0ZW0gaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gc3lzSWQgVGhlIHN5c3RlbSBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICAgICAqICAgICAgICAgICAgICBUaGlzIHZhbHVlIG1heSBiZSB1bmRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzeXNJZCkge1xuICAgICAgICAgICAgaWYgKHV0aWxzXzEuaXNTdHJpbmcoc3lzSWQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcihzeXNJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3lzSWQgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgYWxsb3dlZCBpbiBYTUxcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN5c0lkLmluZGV4T2YoXCInXCIpICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICBzeXNJZC5pbmRleE9mKFwiXFxcIlwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3lzSWQgc2hvdWxkIG5vdCBjb250YWluIGJvdGggc2luZ2xlIHF1b3Rlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIGFuZCBkb3VibGUgcXVvdGVzXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHV0aWxzXzEuaXNVbmRlZmluZWQoc3lzSWQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKHRoaXMucHViSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN5c0lkIHNob3VsZCBub3QgYmUgdW5kZWZpbmVkIGlmIHB1YklkIGlzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgZGVmaW5lZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwic3lzSWQgc2hvdWxkIGJlIGEgc3RyaW5nIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N5c0lkID0gc3lzSWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm9cbiAgICAgKiBpbmRleCBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IG9mIHRoZSBhdHRyaWJ1dGUtbGlzdCBkZWNsYXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5hdHRsaXN0ID0gZnVuY3Rpb24gKHRleHQsIGluZGV4KSB7XG4gICAgICAgIHZhciBhdHRsaXN0ID0gbmV3IFhtbER0ZEF0dGxpc3RfMS5kZWZhdWx0KHRleHQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGF0dGxpc3QsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGF0dGxpc3Q7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IGNvbW1lbnQgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkLFxuICAgICAqIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgZGF0YSBvZiB0aGUgY29tbWVudC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgY29tbWVudC5cbiAgICAgKi9cbiAgICBYbWxEdGQucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNvbW1lbnQgPSBuZXcgWG1sQ29tbWVudF8xLmRlZmF1bHQoY29udGVudCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoY29tbWVudCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY29tbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgZWxlbWVudCBkZWNsYXJhdGlvbiBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpc1xuICAgICAqIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IG9mIHRoZSBlbGVtZW50IGRlY2xhcmF0aW9uLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiAgICAgICAgICAgICAgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBlbGVtZW50IGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIFhtbER0ZC5wcm90b3R5cGUuZWxlbWVudCA9IGZ1bmN0aW9uICh0ZXh0LCBpbmRleCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBYbWxEdGRFbGVtZW50XzEuZGVmYXVsdCh0ZXh0KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChlbGVtZW50LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBlbnRpdHkgZGVjbGFyYXRpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBvZiB0aGUgZW50aXR5IGRlY2xhcmF0aW9uLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiAgICAgICAgICAgICAgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBlbnRpdHkgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5lbnRpdHkgPSBmdW5jdGlvbiAodGV4dCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGVudGl0eSA9IG5ldyBYbWxEdGRFbnRpdHlfMS5kZWZhdWx0KHRleHQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGVudGl0eSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gZW50aXR5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIG5vZGUgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiBhdCB0aGUgc3BlY2lmaWVkXG4gICAgICogaW5kZXguIFRoZSBub2RlIGlzIG5vdCBpbnNlcnRlZCBpZiBpdCBpcyBhbHJlYWR5IHByZXNlbnQuIElmIHRoaXMgbm9kZVxuICAgICAqIGFscmVhZHkgaGFzIGEgcGFyZW50LCBpdCBpcyByZW1vdmVkIGZyb20gdGhhdCBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBPbmx5IHtAbGluayBYbWxDb21tZW50fSwge0BsaW5rIFhtbER0ZEF0dGxpc3R9LCB7QGxpbmsgWG1sRHRkRWxlbWVudH0sXG4gICAgICoge0BsaW5rIFhtbER0ZEVudGl0eX0sIHtAbGluayBYbWxEdGROb3RhdGlvbn0sIGFuZCB7QGxpbmsgWG1sUHJvY0luc3R9XG4gICAgICogbm9kZXMgY2FuIGJlIGluc2VydGVkOyBvdGhlcndpc2UgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gaW5zZXJ0LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBub2RlLiBOb2RlcyBhdCBvciBhZnRlclxuICAgICAqICAgICAgICAgICAgICB0aGUgaW5kZXggYXJlIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0LiBJZiBubyBpbmRleCBpc1xuICAgICAqICAgICAgICAgICAgICBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSBpbnNlcnRlZCBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuLCBvciB1bmRlZmluZWQgaWYgbm9cbiAgICAgKiAgICAgICAgICBub2RlIHdhcyBpbnNlcnRlZC5cbiAgICAgKi9cbiAgICBYbWxEdGQucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBYbWxDb21tZW50XzEuZGVmYXVsdCB8fCBub2RlIGluc3RhbmNlb2YgWG1sRHRkQXR0bGlzdF8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxEdGRFbGVtZW50XzEuZGVmYXVsdCB8fCBub2RlIGluc3RhbmNlb2YgWG1sRHRkRW50aXR5XzEuZGVmYXVsdCB8fFxuICAgICAgICAgICAgbm9kZSBpbnN0YW5jZW9mIFhtbER0ZE5vdGF0aW9uXzEuZGVmYXVsdCB8fFxuICAgICAgICAgICAgbm9kZSBpbnN0YW5jZW9mIFhtbER0ZFBhcmFtRW50aXR5UmVmXzEuZGVmYXVsdCB8fFxuICAgICAgICAgICAgbm9kZSBpbnN0YW5jZW9mIFhtbFByb2NJbnN0XzEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJub2RlIHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBYbWxDb21tZW50LFwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxEdGRBdHRsaXN0LCBYbWxEdGRFbGVtZW50LCBYbWxEdGRFbnRpdHksXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbER0ZE5vdGF0aW9uLCBYbWxEdGRQYXJhbUVudGl0eVJlZiwgb3JcIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sUHJvY0luc3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQuY2FsbCh0aGlzLCBub2RlLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IG5vdGF0aW9uIGRlY2xhcmF0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgb2YgdGhlIG5vdGF0aW9uIGRlY2xhcmF0aW9uLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpc1xuICAgICAqICAgICAgICAgICAgICBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBub3RhdGlvbiBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBYbWxEdGQucHJvdG90eXBlLm5vdGF0aW9uID0gZnVuY3Rpb24gKHRleHQsIGluZGV4KSB7XG4gICAgICAgIHZhciBub3RhdGlvbiA9IG5ldyBYbWxEdGROb3RhdGlvbl8xLmRlZmF1bHQodGV4dCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQobm90YXRpb24sIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIG5vdGF0aW9uO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBwYXJhbWV0ZXIgZW50aXR5IHJlZmVyZW5jZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBub1xuICAgICAqIGluZGV4IGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBUaGUgZW50aXR5IHRvIHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgcGFyYW1ldGVyIGVudGl0eSByZWZlcmVuY2UuXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5wYXJhbUVudGl0eVJlZiA9IGZ1bmN0aW9uIChlbnRpdHksIGluZGV4KSB7XG4gICAgICAgIHZhciBwYXJhbUVudGl0eSA9IG5ldyBYbWxEdGRQYXJhbUVudGl0eVJlZl8xLmRlZmF1bHQoZW50aXR5KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChwYXJhbUVudGl0eSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gcGFyYW1FbnRpdHk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXhcbiAgICAgKiBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIG9yIHVuZGVmaW5lZCBpZlxuICAgICAqICAgICAgICAgICAgICAgIHRoZXJlIGlzIG5vIHRhcmdldC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgKi9cbiAgICBYbWxEdGQucHJvdG90eXBlLnByb2NJbnN0ID0gZnVuY3Rpb24gKHRhcmdldCwgY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHByb2NJbnN0ID0gbmV3IFhtbFByb2NJbnN0XzEuZGVmYXVsdCh0YXJnZXQsIGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKHByb2NJbnN0LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBwcm9jSW5zdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEdGQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIG9wdGlvbnNPYmogPSBuZXcgb3B0aW9uc18xLlN0cmluZ09wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHZhciBzdHIgPSBcIjwhRE9DVFlQRSBcIiArIHRoaXMubmFtZTtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNVbmRlZmluZWQodGhpcy5wdWJJZCkpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnN5c0lkKSkge1xuICAgICAgICAgICAgICAgIHN0ciArPSBcIiBcIjtcbiAgICAgICAgICAgICAgICBzdHIgPSBhcHBlbmRJZChcIlNZU1RFTVwiLCB0aGlzLnN5c0lkLCBzdHIsIG9wdGlvbnNPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RyICs9IFwiIFwiO1xuICAgICAgICAgICAgc3RyID0gYXBwZW5kSWQoXCJQVUJMSUNcIiwgdGhpcy5wdWJJZCwgc3RyLCBvcHRpb25zT2JqKTtcbiAgICAgICAgICAgIHN0ciA9IGFwcGVuZElkKFwiXCIsIHRoaXMuc3lzSWQsIHN0ciwgb3B0aW9uc09iaik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgc3RyICs9IFwiIFtcIjtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9jaGlsZHJlbjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uc09iai5wcmV0dHkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IG9wdGlvbnNPYmoubmV3bGluZSArIG9wdGlvbnNPYmouaW5kZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHIgKz0gbm9kZS50b1N0cmluZyhvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zT2JqLnByZXR0eSkge1xuICAgICAgICAgICAgICAgIHN0ciArPSBvcHRpb25zT2JqLm5ld2xpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gXCJdPlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RyICs9IFwiPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRHRkO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRHRkO1xuLyoqXG4gKiBBcHBlbmRzIHRoZSBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcHVibGljIG9yIHN5c3RlbSBpZGVudGlmaWVyIHRvXG4gKiBhbiBleGlzdGluZyBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHR5cGUgXCJTWVNURU1cIiwgXCJQVUJMSUNcIiwgb3IgXCJcIi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gd2hpY2ggdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBzaG91bGQgYmUgYXBwZW5kZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gKlxuICogQHJldHVybnMgVGhlIHVwZGF0ZWQgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFwcGVuZElkKHR5cGUsIHZhbHVlLCBzdHIsIG9wdGlvbnMpIHtcbiAgICBzdHIgKz0gdHlwZSArIFwiIFwiO1xuICAgIGlmIChvcHRpb25zLmRvdWJsZVF1b3Rlcykge1xuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZihcIlxcXCJcIikgIT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLmRvdWJsZVF1b3RlcyBpbmNvbnNpc3RlbnQgd2l0aFwiXG4gICAgICAgICAgICAgICAgKyBcIiBzeXNJZCBvciBwdWJJZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBzdHIgKz0gXCJcXFwiXCIgKyB2YWx1ZSArIFwiXFxcIlwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoXCInXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucy5kb3VibGVRdW90ZXMgaW5jb25zaXN0ZW50IHdpdGhcIlxuICAgICAgICAgICAgICAgICsgXCIgc3lzSWQgb3IgcHViSWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IFwiJ1wiICsgdmFsdWUgKyBcIidcIjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRHRkLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBhdHRyaWJ1dGUtbGlzdCBkZWNsYXJhdGlvbiBpbiBhIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbi5cbiAqXG4gKiBBbiBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge3RleHR9YFxuICogaXMgdGhlIHRleHQgb2YgdGhlIGRlY2xhcmF0aW9uOlxuICpcbiAqIGBgYHhtbFxuICogPCFBVFRMSVNUIHt0ZXh0fT5cbiAqIGBgYFxuICpcbiAqIFRoZSBge3RleHR9YCB2YWx1ZSBpcyBhIHByb3BlcnR5IG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxEdGRBdHRsaXN0IG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbER0ZEF0dGxpc3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEdGRBdHRsaXN0LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sRHRkQXR0bGlzdH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBhdHRyaWJ1dGUtbGlzdCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGRBdHRsaXN0KHRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZEF0dGxpc3QucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBhdHRyaWJ1dGUtbGlzdCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBhdHRyaWJ1dGUtbGlzdCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGF0dHJpYnV0ZS1saXN0IGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBhdHRyaWJ1dGUtbGlzdCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0ZXh0IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcih0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG5vdCBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRBdHRsaXN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRBdHRsaXN0LnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkQXR0bGlzdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEF0dGxpc3R9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkQXR0bGlzdC5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkQXR0bGlzdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEF0dGxpc3R9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEF0dGxpc3QucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkQXR0bGlzdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEF0dGxpc3R9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRBdHRsaXN0LnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkQXR0bGlzdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEdGRBdHRsaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIjwhQVRUTElTVCBcIiArIHRoaXMudGV4dCArIFwiPlwiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZEF0dGxpc3Q7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxEdGRBdHRsaXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRBdHRsaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBlbGVtZW50IGRlY2xhcmF0aW9uIGluIGEgZG9jdW1lbnQgdHlwZSBkZWZpbml0aW9uLlxuICpcbiAqIEFuIFhNTCBlbGVtZW50IGRlY2xhcmF0aW9uIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHt0ZXh0fWAgaXMgdGhlXG4gKiB0ZXh0IG9mIHRoZSBkZWNsYXJhdGlvbjpcbiAqXG4gKiBgYGB4bWxcbiAqIDwhRUxFTUVOVCB7dGV4dH0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt0ZXh0fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxEdGRFbGVtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRHRkRWxlbWVudCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbER0ZEVsZW1lbnR9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGRFbGVtZW50KHRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZEVsZW1lbnQucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbGVtZW50IGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVsZW1lbnQgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbGVtZW50IGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbGVtZW50IGRlY2xhcmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRleHQgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVDaGFyKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVsZW1lbnQucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRFbGVtZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkRWxlbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRFbGVtZW50LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRFbGVtZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkRWxlbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRFbGVtZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkRWxlbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRFbGVtZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbER0ZEVsZW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIFwiPCFFTEVNRU5UIFwiICsgdGhpcy50ZXh0ICsgXCI+XCI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRHRkRWxlbWVudDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbER0ZEVsZW1lbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZEVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIGVudGl0eSBkZWNsYXJhdGlvbiBpbiBhIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbi5cbiAqXG4gKiBBbiBYTUwgZW50aXR5IGRlY2xhcmF0aW9uIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHt0ZXh0fWAgaXMgdGhlXG4gKiB0ZXh0IG9mIHRoZSBkZWNsYXJhdGlvbjpcbiAqXG4gKiBgYGB4bWxcbiAqIDwhRU5USVRZIHt0ZXh0fT5cbiAqIGBgYFxuICpcbiAqIFRoZSBge3RleHR9YCB2YWx1ZSBpcyBhIHByb3BlcnR5IG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxEdGRFbnRpdHkgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sRHRkRW50aXR5ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRHRkRW50aXR5LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sRHRkRW50aXR5fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGRFbnRpdHkodGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sRHRkRW50aXR5LnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZW50aXR5IGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZW50aXR5IGRlY2xhcmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRleHQgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVDaGFyKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVudGl0eX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkRW50aXR5LnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRW50aXR5IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkRW50aXR5fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVudGl0eS5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRW50aXR5IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkRW50aXR5fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRFbnRpdHkucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRW50aXR5IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkRW50aXR5fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkRW50aXR5LnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRW50aXR5IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbER0ZEVudGl0eS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gXCI8IUVOVElUWSBcIiArIHRoaXMudGV4dCArIFwiPlwiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZEVudGl0eTtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbER0ZEVudGl0eTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRHRkRW50aXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBub3RhdGlvbiBkZWNsYXJhdGlvbiBpbiBhIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbi5cbiAqXG4gKiBBbiBYTUwgbm90YXRpb24gZGVjbGFyYXRpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge3RleHR9YCBpcyB0aGVcbiAqIHRleHQgb2YgdGhlIGRlY2xhcmF0aW9uOlxuICpcbiAqIGBgYHhtbFxuICogPCFOT1RBVElPTiB7dGV4dH0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt0ZXh0fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRHRkTm90YXRpb24gbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sRHRkTm90YXRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEdGROb3RhdGlvbiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbER0ZE5vdGF0aW9ufSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbER0ZE5vdGF0aW9uKHRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZE5vdGF0aW9uLnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgbm90YXRpb24gZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgbm90YXRpb24gZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBub3RhdGlvbiBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgbm90YXRpb24gZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGV4dCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBub3QgYWxsb3dlZCBpbiBYTUxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkTm90YXRpb259IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZE5vdGF0aW9uLnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkTm90YXRpb24gbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGROb3RhdGlvbn0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGROb3RhdGlvbi5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkTm90YXRpb24gbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGROb3RhdGlvbn0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkTm90YXRpb24ucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkTm90YXRpb24gbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGROb3RhdGlvbn0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZE5vdGF0aW9uLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkTm90YXRpb24gbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRHRkTm90YXRpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIFwiPCFOT1RBVElPTiBcIiArIHRoaXMudGV4dCArIFwiPlwiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZE5vdGF0aW9uO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRHRkTm90YXRpb247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZE5vdGF0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBwYXJhbWV0ZXIgZW50aXR5IHJlZmVyZW5jZSBpbiBhIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbi5cbiAqXG4gKiBBbiBYTUwgcGFyYW1ldGVyIGVudGl0eSByZWZlcmVuY2UgaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge2VudGl0eX1gXG4gKiBpcyB0aGUgbmFtZSBvZiB0aGUgZW50aXR5OlxuICpcbiAqIGBgYHhtbFxuICogJXtlbnRpdHl9O1xuICogYGBgXG4gKlxuICogVGhlIGB7ZW50aXR5fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRHRkUGFyYW1FbnRpdHlSZWYgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sRHRkUGFyYW1FbnRpdHlSZWYgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEdGRQYXJhbUVudGl0eVJlZiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbER0ZFBhcmFtRW50aXR5UmVmfSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgVGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbER0ZFBhcmFtRW50aXR5UmVmKGVudGl0eSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5lbnRpdHkgPSBlbnRpdHk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZFBhcmFtRW50aXR5UmVmLnByb3RvdHlwZSwgXCJlbnRpdHlcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VudGl0eTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGVudGl0eSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZW50aXR5IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlTmFtZShlbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZW50aXR5IHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBub3QgYWxsb3dlZCBpbiBYTUwgbmFtZXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZFBhcmFtRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZVxuICAgICAqIGFueSBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRQYXJhbUVudGl0eVJlZi5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZFBhcmFtRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkUGFyYW1FbnRpdHlSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlXG4gICAgICogYW55IGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkUGFyYW1FbnRpdHlSZWYucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZFBhcmFtRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkUGFyYW1FbnRpdHlSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlXG4gICAgICogYW55IGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZFBhcmFtRW50aXR5UmVmLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZFBhcmFtRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkUGFyYW1FbnRpdHlSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlXG4gICAgICogYW55IGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRQYXJhbUVudGl0eVJlZi5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZFBhcmFtRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbER0ZFBhcmFtRW50aXR5UmVmLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIiVcIiArIHRoaXMuZW50aXR5ICsgXCI7XCI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRHRkUGFyYW1FbnRpdHlSZWY7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxEdGRQYXJhbUVudGl0eVJlZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRHRkUGFyYW1FbnRpdHlSZWYuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL29wdGlvbnNcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbEF0dHJpYnV0ZV8xID0gcmVxdWlyZShcIi4vWG1sQXR0cmlidXRlXCIpO1xudmFyIFhtbEF0dHJpYnV0ZVRleHRfMSA9IHJlcXVpcmUoXCIuL1htbEF0dHJpYnV0ZVRleHRcIik7XG52YXIgWG1sQ2RhdGFfMSA9IHJlcXVpcmUoXCIuL1htbENkYXRhXCIpO1xudmFyIFhtbENoYXJEYXRhXzEgPSByZXF1aXJlKFwiLi9YbWxDaGFyRGF0YVwiKTtcbnZhciBYbWxDaGFyUmVmXzEgPSByZXF1aXJlKFwiLi9YbWxDaGFyUmVmXCIpO1xudmFyIFhtbENvbW1lbnRfMSA9IHJlcXVpcmUoXCIuL1htbENvbW1lbnRcIik7XG52YXIgWG1sRW50aXR5UmVmXzEgPSByZXF1aXJlKFwiLi9YbWxFbnRpdHlSZWZcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbnZhciBYbWxQcm9jSW5zdF8xID0gcmVxdWlyZShcIi4vWG1sUHJvY0luc3RcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIGVsZW1lbnQuXG4gKlxuICogQSBzYW1wbGUgWE1MIGVsZW1lbnQgaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge25hbWV9YCBpcyB0aGUgbmFtZVxuICogb2YgdGhlIGVsZW1lbnQ6XG4gKlxuICogYGBgeG1sXG4gKiA8e25hbWV9IGF0dG5hbWU9XCJhdHR2YWx1ZVwiPlxuICogICAgIDxzdWJlbGVtLz5cbiAqICAgICA8P3BpdGFyZ2V0IHBpY29udGVudD8+XG4gKiAgICAgdGV4dFxuICogPC97bmFtZX0+PC9wcmU+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHtuYW1lfWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGUgbm9kZSwgd2hpbGUgdGhlIGF0dHJpYnV0ZXMgYW5kXG4gKiBjaGlsZHJlbiBvZiB0aGUgZWxlbWVudCAoc3VjaCBhcyBvdGhlciBlbGVtZW50cywgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbnMsXG4gKiBhbmQgdGV4dCkgYXJlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxFbGVtZW50IG5vZGVzIGNhbiBoYXZlIGFuIHVubGltaXRlZCBudW1iZXIgb2Yge0BsaW5rIFhtbEF0dHJpYnV0ZX0sXG4gKiB7QGxpbmsgWG1sQ2RhdGF9LCB7QGxpbmsgWG1sQ2hhclJlZn0sIHtAbGluayBYbWxDb21tZW50fSxcbiAqIHtAbGluayBYbWxFbGVtZW50fSwge0BsaW5rIFhtbEVudGl0eVJlZn0sIHtAbGluayBYbWxQcm9jSW5zdH0sIG9yXG4gKiB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGFzIGNoaWxkcmVuLlxuICovXG52YXIgWG1sRWxlbWVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbEVsZW1lbnQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxFbGVtZW50fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBlbGVtZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbEVsZW1lbnQobmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sRWxlbWVudC5wcm90b3R5cGUsIFwibmFtZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSBlbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBuYW1lIG9mIHRoZSBlbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJuYW1lIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlTmFtZShuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5hbWUgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBhbGxvd2VkIGluIFhNTCBuYW1lc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGFuIG5ldyBhdHRyaWJ1dGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZS4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvXG4gICAgICogICAgICAgIFhtbEF0dHJpYnV0ZVRleHQgbm9kZXMuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtYbWxBdHRyaWJ1dGV9IFRoZSBuZXdseSBjcmVhdGVkIGF0dHJpYnV0ZS5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5hdHRyaWJ1dGUgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGluZGV4KSB7XG4gICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgWG1sQXR0cmlidXRlVGV4dF8xLmRlZmF1bHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHV0aWxzXzEuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyh2YWx1ZVtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbaV0gPSBuZXcgWG1sQXR0cmlidXRlVGV4dF8xLmRlZmF1bHQodmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYXR0cmlidXRlID0gbmV3IFhtbEF0dHJpYnV0ZV8xLmRlZmF1bHQobmFtZSwgdmFsdWUpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGF0dHJpYnV0ZSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlIHRoYXQgYXJlXG4gICAgICogaW5zdGFuY2VzIG9mIHtAbGluayBYbWxBdHRyaWJ1dGV9LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZSB0aGF0IGFyZVxuICAgICAqICAgICAgICAgIGluc3RhbmNlcyBvZiB7QGxpbmsgWG1sQXR0cmlidXRlfS5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5hdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBub2RlIGluc3RhbmNlb2YgWG1sQXR0cmlidXRlXzEuZGVmYXVsdDsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IENEQVRBIHNlY3Rpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgZGF0YSBvZiB0aGUgQ0RBVEEgc2VjdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgQ0RBVEEgc2VjdGlvbi5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5jZGF0YSA9IGZ1bmN0aW9uIChjb250ZW50LCBpbmRleCkge1xuICAgICAgICB2YXIgY2RhdGEgPSBuZXcgWG1sQ2RhdGFfMS5kZWZhdWx0KGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGNkYXRhLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBjZGF0YTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgc29tZSBjaGFyYWN0ZXIgZGF0YSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpc1xuICAgICAqIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFyRGF0YSBDaGFyYWN0ZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgdGV4dCBub2RlLlxuICAgICAqL1xuICAgIFhtbEVsZW1lbnQucHJvdG90eXBlLmNoYXJEYXRhID0gZnVuY3Rpb24gKGNoYXJEYXRhLCBpbmRleCkge1xuICAgICAgICB2YXIgY2hhckRhdGFOb2RlID0gbmV3IFhtbENoYXJEYXRhXzEuZGVmYXVsdChjaGFyRGF0YSk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoY2hhckRhdGFOb2RlLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBjaGFyRGF0YU5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IGNoYXJhY3RlciByZWZlcmVuY2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXhcbiAgICAgKiBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhciBUaGUgY2hhcmFjdGVyIHRvIHJlcHJlc2VudCB1c2luZyB0aGUgcmVmZXJlbmNlLlxuICAgICAqIEBwYXJhbSBoZXggV2hldGhlciB0byB1c2UgdGhlIGhleGFkZWNpbWFsIG9yIGRlY2ltYWwgcmVwcmVzZW50YXRpb24gZm9yXG4gICAgICogICAgICAgICAgICB0aGUgcmVmZXJlbmNlLiBJZiBsZWZ0IHVuZGVmaW5lZCwgZGVjaW1hbCBpcyB0aGUgZGVmYXVsdC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgY2hhcmFjdGVyIHJlZmVyZW5jZS5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5jaGFyUmVmID0gZnVuY3Rpb24gKGNoYXIsIGhleCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNoYXJSZWYgPSBuZXcgWG1sQ2hhclJlZl8xLmRlZmF1bHQoY2hhciwgaGV4KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChjaGFyUmVmLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBjaGFyUmVmO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBjb21tZW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZCxcbiAgICAgKiB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIGNvbW1lbnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGNvbW1lbnQuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuY29tbWVudCA9IGZ1bmN0aW9uIChjb250ZW50LCBpbmRleCkge1xuICAgICAgICB2YXIgY29tbWVudCA9IG5ldyBYbWxDb21tZW50XzEuZGVmYXVsdChjb250ZW50KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChjb21tZW50LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBjb21tZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZCxcbiAgICAgKiB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGVsZW1lbnQuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuZWxlbWVudCA9IGZ1bmN0aW9uIChuYW1lLCBpbmRleCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBYbWxFbGVtZW50KG5hbWUpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGVsZW1lbnQsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IGVudGl0eSByZWZlcmVuY2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgZW50aXR5IHJlZmVyZW5jZS5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5lbnRpdHlSZWYgPSBmdW5jdGlvbiAoZW50aXR5LCBpbmRleCkge1xuICAgICAgICB2YXIgZW50aXR5UmVmID0gbmV3IFhtbEVudGl0eVJlZl8xLmRlZmF1bHQoZW50aXR5KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChlbnRpdHlSZWYsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGVudGl0eVJlZjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBub2RlIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4gYXQgdGhlIHNwZWNpZmllZFxuICAgICAqIGluZGV4LiBUaGUgbm9kZSBpcyBub3QgaW5zZXJ0ZWQgaWYgaXQgaXMgYWxyZWFkeSBwcmVzZW50LiBJZiB0aGlzIG5vZGVcbiAgICAgKiBhbHJlYWR5IGhhcyBhIHBhcmVudCwgaXQgaXMgcmVtb3ZlZCBmcm9tIHRoYXQgcGFyZW50LlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IG9ubHkge0BsaW5rIFhtbEF0dHJpYnV0ZX0sIHtAbGluayBYbWxDZGF0YX0sXG4gICAgICoge0BsaW5rIFhtbENoYXJSZWZ9LCB7QGxpbmsgWG1sQ29tbWVudH0sIHtAbGluayBYbWxFbGVtZW50fSxcbiAgICAgKiB7QGxpbmsgWG1sRW50aXR5UmVmfSwge0BsaW5rIFhtbFByb2NJbnN0fSwgb3Ige0BsaW5rIFhtbENoYXJEYXRhfSBub2Rlc1xuICAgICAqIGNhbiBiZSBpbnNlcnRlZDsgb3RoZXJ3aXNlLCBhbiBleGNlcHRpb24gd2lsbCBiZSB0aHJvd24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIG5vZGUuIE5vZGVzIGF0IG9yIGFmdGVyXG4gICAgICogICAgICAgICAgICAgIHRoZSBpbmRleCBhcmUgc2hpZnRlZCB0byB0aGUgcmlnaHQuIElmIG5vIGluZGV4IGlzXG4gICAgICogICAgICAgICAgICAgIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIGluc2VydGVkIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4sIG9yIHVuZGVmaW5lZCBpZiBub1xuICAgICAqICAgICAgICAgIG5vZGUgd2FzIGluc2VydGVkLlxuICAgICAqL1xuICAgIFhtbEVsZW1lbnQucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBYbWxBdHRyaWJ1dGVfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sQ2RhdGFfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sQ2hhclJlZl8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxDb21tZW50XzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbEVsZW1lbnRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxFbnRpdHlSZWZfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sUHJvY0luc3RfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sQ2hhckRhdGFfMS5kZWZhdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5vZGUgc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mIFhtbEF0dHJpYnV0ZSxcIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sQ2RhdGEsIFhtbENoYXJSZWYsIFhtbENvbW1lbnQsXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbEVsZW1lbnQsIFhtbEVudGl0eVJlZiwgWG1sUHJvY0luc3QsXCJcbiAgICAgICAgICAgICAgICArIFwiIG9yIFhtbFRleHRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBYbWxBdHRyaWJ1dGVfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuX2NoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAobikgeyByZXR1cm4gbiBpbnN0YW5jZW9mIFhtbEF0dHJpYnV0ZV8xLmRlZmF1bHQ7IH0pO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBhdHRyaWJ1dGVzXzEgPSBhdHRyaWJ1dGVzOyBfaSA8IGF0dHJpYnV0ZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlID0gYXR0cmlidXRlc18xW19pXTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlLm5hbWUgPT09IG5vZGUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlbGVtZW50IGFscmVhZHkgY29udGFpbnMgYW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiBYbWxBdHRyaWJ1dGUgb2JqZWN0IHdpdGggbmFtZSBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBub2RlLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5pbnNlcnRDaGlsZC5jYWxsKHRoaXMsIG5vZGUsIGluZGV4KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleFxuICAgICAqIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvZiB0aGUgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgZGF0YSBvZiB0aGUgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiwgb3IgdW5kZWZpbmVkIGlmXG4gICAgICogICAgICAgICAgICAgICAgdGhlcmUgaXMgbm8gdGFyZ2V0LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiAgICAgICAgICAgICAgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAqL1xuICAgIFhtbEVsZW1lbnQucHJvdG90eXBlLnByb2NJbnN0ID0gZnVuY3Rpb24gKHRhcmdldCwgY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIHByb2NJbnN0ID0gbmV3IFhtbFByb2NJbnN0XzEuZGVmYXVsdCh0YXJnZXQsIGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKHByb2NJbnN0LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBwcm9jSW5zdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBvcHRpb25zT2JqID0gbmV3IG9wdGlvbnNfMS5TdHJpbmdPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcygpO1xuICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLl9jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIGF0dHJpYnV0ZXMuaW5kZXhPZihub2RlKSA9PT0gLTE7IH0pO1xuICAgICAgICAvLyBFbGVtZW50IHRhZyBzdGFydFxuICAgICAgICB2YXIgc3RyID0gXCI8XCIgKyB0aGlzLl9uYW1lO1xuICAgICAgICAvLyBBdHRyaWJ1dGVzXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgYXR0cmlidXRlc18yID0gYXR0cmlidXRlczsgX2kgPCBhdHRyaWJ1dGVzXzIubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgYXR0cmlidXRlID0gYXR0cmlidXRlc18yW19pXTtcbiAgICAgICAgICAgIHN0ciArPSBcIiBcIiArIGF0dHJpYnV0ZS50b1N0cmluZyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGlsZCBub2Rlc1xuICAgICAgICBpZiAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gRWxlbWVudCBub24tZW1wdHkgdGFnIGVuZFxuICAgICAgICAgICAgc3RyICs9IFwiPlwiO1xuICAgICAgICAgICAgdmFyIGluZGVudGVyID0gZnVuY3Rpb24gKGxpbmUpIHsgcmV0dXJuIG9wdGlvbnNPYmouaW5kZW50ICsgbGluZTsgfTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBuZXh0U3RyID0gbmV4dC50b1N0cmluZyhvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldiA9IGkgPiAwID8gbm9kZXNbaSAtIDFdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIC8vIExpbmUgYnJlYWsgYmVmb3JlIGNoaWxkIG5vZGVzIHVubGVzcyBhbGwgbm9kZXMsIG9yIGF0IGxlYXN0XG4gICAgICAgICAgICAgICAgLy8gdGhlIG1vc3QgcmVjZW50IHR3bywgYXJlIG9mIHR5cGUgWG1sQ2hhcmFjdGVyUmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgIC8vIFhtbEVudGl0eVJlZmVyZW5jZSwgb3IgWG1sQ2hhckRhdGFcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uc09iai5wcmV0dHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGxTYW1lTGluZU5vZGVzKG5vZGVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaSA+IDAgJiYgb25TYW1lTGluZShuZXh0LCBwcmV2KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gb3B0aW9uc09iai5uZXdsaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdHIgPSBuZXh0U3RyLnNwbGl0KG9wdGlvbnNPYmoubmV3bGluZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChpbmRlbnRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4ob3B0aW9uc09iai5uZXdsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHIgKz0gbmV4dFN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIExpbmUgYnJlYWsgYmVmb3JlIGVuZCB0YWcgdW5sZXNzIGFsbCBub2RlcyBhcmUgb2YgdHlwZVxuICAgICAgICAgICAgLy8gWG1sQ2hhcmFjdGVyUmVmZXJlbmNlLCBYbWxFbnRpdHlSZWZlcmVuY2UsIG9yIFhtbENoYXJEYXRhXG4gICAgICAgICAgICBpZiAob3B0aW9uc09iai5wcmV0dHkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFsbFNhbWVMaW5lTm9kZXMobm9kZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBvcHRpb25zT2JqLm5ld2xpbmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRWxlbWVudCBlbmQgdGFnXG4gICAgICAgICAgICBzdHIgKz0gXCI8L1wiICsgdGhpcy5fbmFtZSArIFwiPlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRWxlbWVudCBlbXB0eSB0YWcgZW5kXG4gICAgICAgICAgICBzdHIgKz0gXCIvPlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRWxlbWVudDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbEVsZW1lbnQ7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIG5vZGVzIGFyZSBhbGwgb2YgdHlwZSB7QGxpbmsgWG1sQ2hhclJlZn0sXG4gKiB7QGxpbmsgWG1sRW50aXR5UmVmfSwgb3Ige0BsaW5rIFhtbENoYXJEYXRhfS5cbiAqXG4gKiBAcGFyYW0gbm9kZXMgVGhlIHNwZWNpZmllZCBub2Rlcy5cbiAqXG4gKiBAcmV0dXJucyBXaGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIG5vZGVzIGFyZSBhbGwgb2YgdHlwZVxuICogICAgICAgICAge0BsaW5rIFhtbENoYXJSZWZ9LCB7QGxpbmsgWG1sRW50aXR5UmVmfSwgb3Ige0BsaW5rIFhtbENoYXJEYXRhfS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhbGxTYW1lTGluZU5vZGVzKG5vZGVzKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBub2Rlc18xID0gbm9kZXM7IF9pIDwgbm9kZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIG5vZGUgPSBub2Rlc18xW19pXTtcbiAgICAgICAgaWYgKCEoKG5vZGUgaW5zdGFuY2VvZiBYbWxDaGFyUmVmXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbEVudGl0eVJlZl8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxDaGFyRGF0YV8xLmRlZmF1bHQpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBub2RlcyBhcmUgYWxsIG9mIHR5cGUge0BsaW5rIFhtbENoYXJSZWZ9LFxuICoge0BsaW5rIFhtbEVudGl0eVJlZn0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0uXG4gKlxuICogQHBhcmFtIHByZXYgVGhlIGZpcnN0IHNwZWNpZmllZCBub2RlLlxuICogQHBhcmFtIG5leHQgVGhlIHNlY29uZCBzcGVjaWZpZWQgbm9kZS5cbiAqXG4gKiBAcmV0dXJucyBXaGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIG5vZGVzIGFyZSBhbGwgb2YgdHlwZVxuICogICAgICAgICAge0BsaW5rIFhtbENoYXJSZWZ9LCB7QGxpbmsgWG1sRW50aXR5UmVmfSwgb3Ige0BsaW5rIFhtbENoYXJEYXRhfS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBvblNhbWVMaW5lKHByZXYsIG5leHQpIHtcbiAgICByZXR1cm4gKHByZXYgaW5zdGFuY2VvZiBYbWxDaGFyUmVmXzEuZGVmYXVsdFxuICAgICAgICB8fCBwcmV2IGluc3RhbmNlb2YgWG1sRW50aXR5UmVmXzEuZGVmYXVsdFxuICAgICAgICB8fCBwcmV2IGluc3RhbmNlb2YgWG1sQ2hhckRhdGFfMS5kZWZhdWx0KVxuICAgICAgICAmJiAobmV4dCBpbnN0YW5jZW9mIFhtbENoYXJSZWZfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBuZXh0IGluc3RhbmNlb2YgWG1sRW50aXR5UmVmXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbmV4dCBpbnN0YW5jZW9mIFhtbENoYXJEYXRhXzEuZGVmYXVsdCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbEVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBTdHJpbmddXCI7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIjtcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNCb29sZWFuKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IEJvb2xlYW5dXCI7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgVW5kZWZpbmVkXVwiO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc051bGwodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgTnVsbF1cIjtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWwpIHtcbiAgICByZXR1cm4gaXNTdHJpbmcodmFsKVxuICAgICAgICB8fCBpc051bWJlcih2YWwpXG4gICAgICAgIHx8IGlzQm9vbGVhbih2YWwpXG4gICAgICAgIHx8IGlzVW5kZWZpbmVkKHZhbClcbiAgICAgICAgfHwgaXNOdWxsKHZhbCk7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIjtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nQXJyYXkodmFsKSB7XG4gICAgaWYgKCFpc0FycmF5KHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBfaSA9IDAsIHZhbF8xID0gdmFsOyBfaSA8IHZhbF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgZW50cnkgPSB2YWxfMVtfaV07XG4gICAgICAgIGlmICghaXNTdHJpbmcoZW50cnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLmlzU3RyaW5nQXJyYXkgPSBpc1N0cmluZ0FycmF5O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNTZXQodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgU2V0XVwiO1xufVxuZXhwb3J0cy5pc1NldCA9IGlzU2V0O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc01hcCh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBNYXBdXCI7XG59XG5leHBvcnRzLmlzTWFwID0gaXNNYXA7XG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNwZWNpZmllZCB2YWx1ZSwgYXMgZ2l2ZW4gYnkgdGhlXG4gKiB2YWx1ZSdzIHRvU3RyaW5nKCkgbWV0aG9kIChpZiBpdCBoYXMgb25lKSBvciB0aGUgZ2xvYmFsIFN0cmluZygpIGZ1bmN0aW9uXG4gKiAoaWYgaXQgZG9lcyBub3QpLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeSh2YWx1ZSkge1xuICAgIGlmICghaXNVbmRlZmluZWQodmFsdWUpICYmICFpc051bGwodmFsdWUpKSB7XG4gICAgICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZS50b1N0cmluZykpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbn1cbmV4cG9ydHMuc3RyaW5naWZ5ID0gc3RyaW5naWZ5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanMyeG1scGFyc2VyL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tIFwic3VwZXJhZ2VudFwiO1xuaW1wb3J0ICogYXMganMyeG1sIGZyb20gXCJqczJ4bWxwYXJzZXJcIjtcbmltcG9ydCB7IEVuY29kZSwgRGVjb2RlLCBjb252ZXJ0UXVlcmllZFVybCwgUXVlcnkgfSBmcm9tIFwiLi91dGlsaXR5XCI7XG5cbi8vZm9yIHVzaW5nIFByb21pc2Ugb24gZXM1XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSBcImVzNi1wcm9taXNlXCI7XG5cbi8qKlxuICogUGVyc29uaXVt44Gu44Ki44Kv44K744K544OI44O844Kv44Oz5oOF5aCxXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtQWNjZXNzVG9rZW4ge1xuICAgIGFjY2Vzc190b2tlbjogc3RyaW5nLFxuICAgIHJlZnJlc2hfdG9rZW46IHN0cmluZyxcbiAgICBleHBpcmVzX2luOiBudW1iZXIsXG59XG5cbi8qKlxuICogUGVyc29uaXVt44Gu44Os44K544Od44Oz44K544OH44O844K/5Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtUmVzcG9uc2Uge1xuICAgIGQ6IHtcbiAgICAgICAgcmVzdWx0czogYW55LFxuICAgIH1cbn1cblxuLyoqXG4gKiBQZXJzb25pdW3jga7jg4fjg7zjgr/lnotcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQZXJzb25pdW1EYXRhIHtcbiAgICBfX21ldGFkYXRhOiB7XG4gICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICBldGFnOiBzdHJpbmcsXG4gICAgICAgIHR5cGU6IHN0cmluZyxcbiAgICB9LFxuICAgIF9fcHVibGlzaGVkOiBzdHJpbmcsIC8vRGF0ZSh4eHgpXG4gICAgX191cGRhdGVkOiBzdHJpbmcsIC8vRGF0ZSh4eHgpXG59XG5cbi8qKlxuICog5aSW6YOo44K744Or44Gu44OH44O844K/5Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0Q2VsbCBleHRlbmRzIFBlcnNvbml1bURhdGEge1xuICAgIFVybDogc3RyaW5nLFxuICAgIF9Sb2xlOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgX1JlbGF0aW9uOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9LFxuICAgIH0sXG59XG5cbi8qKlxuICog44Or44O844Or44Gu5Z6LXG4gKiAvL+WkieOCj+OCi+OBi+OCglxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJ1bGUge1xuICAgIE5hbWU/OiBzdHJpbmcsXG4gICAgRXh0ZXJuYWw/OiBib29sZWFuLFxuICAgIFRhcmdldFVybDogc3RyaW5nLFxuICAgIEFjdGlvbjogc3RyaW5nLFxuICAgIEV2ZW50VHlwZTogc3RyaW5nLFxuICAgIEV2ZW50T2JqZWN0OiBzdHJpbmcsXG4gICAgXCJfQm94Lk5hbWVcIj86IHN0cmluZyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBY2Uge1xuICAgIFwiRDpwcmluY2lwYWxcIjoge1xuICAgICAgICBcIkQ6aHJlZlwiOiBzdHJpbmcsXG4gICAgfSxcbiAgICBcIkQ6Z3JhbnRcIjoge1xuICAgICAgICBcIkQ6cHJpdmlsZWdlXCI6IHtbYWNlVHlwZTogc3RyaW5nXToge319W10sXG4gICAgfSxcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQWNsIHtcbiAgICBcIkBcIjoge1xuICAgICAgICBcInhtbG5zOkRcIjogXCJEQVY6XCIsXG4gICAgICAgIFwieG1sbnM6cFwiOiBcInVybjp4LXBlcnNvbml1bTp4bWxuc1wiLFxuICAgIH0sXG4gICAgXCJEOmFjZVwiOiBBY2VbXSxcbn1cblxuLyoqXG4gKiDjgrnjgq/jg6rjg5fjg4jjga7lnotcbiAqIC8v5aSJ44KP44KL44GL44KCXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2NyaXB0IHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgdXJpOiBzdHJpbmcsXG59XG5cbi8qKlxuICogTGlua+WeiyBFeHRDZWxs44GuTGlua+OBquOBqVxuICovXG5leHBvcnQgaW50ZXJmYWNlIExpbmsgZXh0ZW5kcyBQZXJzb25pdW1EYXRhIHtcbiAgICB1cmk6IHN0cmluZyxcbn1cblxuLyoqXG4gKiBSb2xl5Z6LXG4gKi8gXG5leHBvcnQgaW50ZXJmYWNlIFJvbGUgZXh0ZW5kcyBQZXJzb25pdW1EYXRhIHtcbiAgICBOYW1lOiBzdHJpbmcsXG4gICAgXCJfQm94Lk5hbWVcIjogc3RyaW5nLFxuICAgIF9Cb3g6IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9BY2NvdW50OiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfRXh0Q2VsbDoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX0V4dFJvbGU6IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9SZWxhdGlvbjoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiDlhazplovjgZXjgozjgabjgYTjgovjg5fjg63jg5XjgqPjg7zjg6vmg4XloLHjga7jg6zjgrnjg53jg7PjgrnlnotcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQZXJzb25pdW1Qcm9maWxlUmVzcG9uc2Uge1xuICAgIERpc3BsYXlOYW1lOiBzdHJpbmcsXG4gICAgRGVzY3JpcHRpb246IHN0cmluZyxcbiAgICBJbWFnZTogc3RyaW5nLFxuICAgIFByb2ZpbGVJbWFnZU5hbWU6IHN0cmluZyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQZXJzb25pdW1MYXVuY2hKc29uIHtcbiAgICBwZXJzb25hbDoge1xuICAgICAgICB3ZWI6IHN0cmluZyxcbiAgICAgICAgYW5kcm9pZDogc3RyaW5nLFxuICAgICAgICBpb3M6IHN0cmluZyxcbiAgICAgICAgYXBwVG9rZW5JZDogc3RyaW5nLFxuICAgICAgICBhcHBUb2tlblB3OiBzdHJpbmcsXG4gICAgfVxufVxuXG4vKipcbiAqIOODoeODg+OCu+ODvOOCuOmAgeS/oeOBruOCv+OCpOODl+Wei1xuICovXG5leHBvcnQgdHlwZSBNZXNzYWdlU2VuZFR5cGUgPSBcbiAgICBcIm1lc3NhZ2VcInwgLy/ljZjjgarjgovjg6Hjg4Pjgrvjg7zjgrjpgIHkv6FcbiAgICBcInJlcS5yZWxhdGlvbi5idWlsZFwifCAvL+mWouS/guaAp+ani+evieS+nemgvFxuICAgIFwicmVxLnJlbGF0aW9uLmJyZWFrXCJ8IC8v6Zai5L+C5oCn56C05qOE5L6d6aC8XG4gICAgXCJyZXEucm9sZS5ncmFudFwifCAvL+ODreODvOODq+ioreWumuS+nemgvFxuICAgIFwicmVxLnJvbGUucmV2b2tlXCJ8IC8v44Ot44O844Or56C05qOE5L6d6aC8XG4gICAgXCJyZXEucnVsZS5yZWdpc3RlclwifCAvL+ODq+ODvOODq+eZu+mMsuS+nemgvFxuICAgIFwicmVxLnJ1bGUudW5yZWdpc3RlclwiIC8v44Or44O844Or56C05qOE5L6d6aC8XG4gICAgO1xuXG4vKipcbiAqIFBlcnNvbml1beOCkuaJseOBhuOBn+OCgeOBruOCr+ODqeOCpOOCouODs+ODiOODqeOCpOODluODqeODqlxuICovXG5leHBvcnQgY2xhc3MgUGVyc29uaXVtQ2xpZW50IHtcbiAgICAvKipcbiAgICAgKiDjg5fjg63jg4jjgrPjg6vvvIjjg4fjg5Xjgqnjg6vjg4g6aHR0cHPvvIlcbiAgICAgKi9cbiAgICBwcm90b2NvbDogc3RyaW5nID0gXCJodHRwc1wiO1xuICAgIC8qKlxuICAgICAqIFBlcnNvbml1beOBruOCteODvOODkOODm+OCueODiOWQjVxuICAgICAqL1xuICAgIGhvc3Q6IHN0cmluZyA9IG51bGw7XG4gICAgLyoqXG4gICAgICog44Ki44Kv44K744K544OI44O844Kv44Oz5oOF5aCxXG4gICAgICovXG4gICAgcGVyc29uaXVtVG9rZW46IFBlcnNvbml1bUFjY2Vzc1Rva2VuID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDjgqLjgq/jgrvjgrnjg4jjg7zjgq/jg7NcbiAgICAgKi9cbiAgICB0b2tlbjogc3RyaW5nID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDjgqLjgq/jgrvjgrnjg4jjg7zjgq/jg7Pjga7mnInlirnmnJ/pmZBcbiAgICAgKi9cbiAgICBleHBpcmVzSW46IG51bWJlciA9IDM2MDA7XG4gICAgLyoqXG4gICAgICog44Ot44Kw44Kk44Oz5pmC5Yi7IC0g6KqN6Ki844Gu5pyJ5Yq55pyf6ZmQ5YaF44GL44Gp44GG44GL44KS56K66KqNXG4gICAgICovXG4gICAgbG9naW5UaW1lOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIGV4cGlyZeOBl+OBn+OBk+OBqOOBjOeiuuiqjeOBleOCjOOBn+OBqOOBjeOBq+WRvOOBs+WHuuOBmeOCs+ODvOODq+ODkOODg+OCr1xuICAgICAqL1xuICAgIGV4cGlyZUNhbGxiYWNrOiAocmVmcmVzaFRva2VuOiBzdHJpbmcpPT52b2lkO1xuICAgIC8qKlxuICAgICAqIGV4cGlyZeOBrueiuuiqjeOCv+OCpOODnuODvFxuICAgICAqL1xuICAgIGV4cGlyZUNhbGxiYWNrVGltZXI6IGFueSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICAgKiBAcGFyYW0gdW5pdCDjg5vjgrnjg4jlkI0gXG4gICAgICogQHBhcmFtIHByb3RvY29sIOODl+ODreODiOOCs+ODq1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVuaXQ6IHN0cmluZywgcHJvdG9jb2w/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF1bml0KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJQbGVhc2Ugc2V0IGBob3N0YCBhZGRyZXNzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVuaXQubGFzdEluZGV4T2YoXCJodHRwXCIpID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJgaG9zdGAgZG9lcyBub3QgbmVlZCBwcm90b2NvbCBwcmVmaXhcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYocHJvdG9jb2wpe1xuICAgICAgICAgICAgdGhpcy5wcm90b2NvbCA9IHByb3RvY29sO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaG9zdCA9IHVuaXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KqN6Ki844Gu5pyJ5Yq55oCn44OB44Kn44OD44KvXG4gICAgICovXG4gICAgYXV0aFZhbGlkYXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAoK25ldyBEYXRlKCktdGhpcy5sb2dpblRpbWUpLzEwMDAgPCB0aGlzLmV4cGlyZXNJbjtcbiAgICAgICAgaWYoIXJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFjayAmJiB0aGlzLmV4cGlyZUNhbGxiYWNrKHRoaXMucGVyc29uaXVtVG9rZW4ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJNYXliZSB5b3UgaGF2ZSB0byByZS1sb2dpbiB3aGlsZSB5b3VyIHRva2VuIGlzIGV4cGlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJzb25pdW3jgbjjg63jgrDjgqTjg7NcbiAgICAgKiBAcGFyYW0gY2VsbCDjg63jgrDjgqTjg7Plr77osaHjga7jgrvjg6vlkI0gXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIOODpuODvOOCtuWQjVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCDjg5Hjgrnjg6/jg7zjg4lcbiAgICAgKiBAcGFyYW0gZXhwaXJlQ2FsbGJhY2sg5pyJ5Yq55pyf6ZmQ44GM5YiH44KM6Zqb44Gr5ZG844Gz5Ye644GZ44Kz44O844Or44OQ44OD44KvIFxuICAgICAqL1xuICAgIGxvZ2luKGNlbGw6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZXhwaXJlQ2FsbGJhY2s/OiAocmVmcmVzaFRva2VuOiBzdHJpbmcpPT52b2lkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1BY2Nlc3NUb2tlbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX3Rva2VuXCI7XG4gICAgICAgICAgICB0aGlzLmV4cGlyZUNhbGxiYWNrID0gZXhwaXJlQ2FsbGJhY2sgJiYgZXhwaXJlQ2FsbGJhY2s7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnR5cGUoXCJmb3JtXCIpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBncmFudF90eXBlOiBcInBhc3N3b3JkXCIsIHVzZXJuYW1lLCBwYXNzd29yZCB9KVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW46IFBlcnNvbml1bUFjY2Vzc1Rva2VuID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbml1bVRva2VuID0gdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVzSW4gPSB0b2tlbi5leHBpcmVzX2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpblRpbWUgPSArbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g44K/44Kk44Og44Ki44Km44OI44KS6KaL44KLXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gTnVtYmVyKHRoaXMuZXhwaXJlc0luKSAqIDkwMDsgLy/nm7TliY3jgavmlZnjgYjjgabjgYLjgZLjgotcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lciA9IHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZUNhbGxiYWNrVGltZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2sgJiYgdGhpcy5leHBpcmVDYWxsYmFjayh0b2tlbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNjaGVtYeiqjeiovOODiOODvOOCr+ODs+OBruWPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIOWAi+S6uuOBruOCu+ODqyBcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUg44Om44O844K25ZCNXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIOODkeOCueODr+ODvOODiVxuICAgICAqIEBwYXJhbSBhcHBDZWxsIOOCouODl+ODquOCu+ODq1xuICAgICAqIEBwYXJhbSBhcHBJZCDjgqLjg5fjg6rjgrvjg6tJZFxuICAgICAqIEBwYXJhbSBhcHBQYXNzIOOCouODl+ODquOCu+ODq1Bhc3NcbiAgICAgKi9cbiAgICBhcHBMb2dpbihjZWxsOiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGFwcENlbGw6IHN0cmluZywgYXBwSWQ6IHN0cmluZywgYXBwUGFzczogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1BY2Nlc3NUb2tlbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbFVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IGFwcENlbGxVcmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoYXBwQ2VsbCk7XG4gICAgICAgICAgICBjb25zdCBhcHBDZWxsVG9rZW5VcmwgPSBhcHBDZWxsVXJsICsgXCJfX3Rva2VuXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QoYXBwQ2VsbFRva2VuVXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnR5cGUoXCJmb3JtXCIpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBncmFudF90eXBlOiBcInBhc3N3b3JkXCIsIHVzZXJuYW1lOiBhcHBJZCwgcGFzc3dvcmQ6IGFwcFBhc3MsIHBfdGFyZ2V0OiBjZWxsVXJsIH0pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcHBUb2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVtYVRva2VuVXJsID0gY2VsbFVybCArIFwiX190b2tlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvc3Qoc2NoZW1hVG9rZW5VcmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnR5cGUoXCJmb3JtXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCh7IGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgdXNlcm5hbWUsIHBhc3N3b3JkLCBjbGllbnRfaWQ6IGFwcENlbGxVcmwsIGNsaWVudF9zZWNyZXQ6IGFwcFRva2VuLmFjY2Vzc190b2tlbiB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW46IFBlcnNvbml1bUFjY2Vzc1Rva2VuID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVzSW4gPSB0b2tlbi5leHBpcmVzX2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luVGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH0gICAgXG5cbiAgICAvKipcbiAgICAgKiDjgqLjgq/jgrvjgrnjg4jjg7zjgq/jg7Pjga7mm7TmlrDjgoTjg4jjg6njg7Pjgrnjgrvjg6vjg4jjg7zjgq/jg7PjgpLkvZzmiJBcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcmVmcmVzaFRva2VuIOODquODleODrOODg+OCt+ODpeeUqOODiOODvOOCr+ODs++8iGxvZ2lu5pmC44Gr5Y+W5b6X77yJXG4gICAgICogQHBhcmFtIHRhcmdldCDjg4jjg6njg7Pjgrnjgrvjg6vjg4jjg7zjgq/jg7PjgpLnlJ/miJDjgZnjgovloLTlkIjjga/mjIflrppcbiAgICAgKi9cbiAgICByZWZyZXNoQWNjZXNzVG9rZW4oY2VsbDogc3RyaW5nLCByZWZyZXNoVG9rZW46IHN0cmluZywgdGFyZ2V0Pzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1BY2Nlc3NUb2tlbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX3Rva2VuXCI7XG4gICAgICAgICAgICBjb25zdCB0b2tlblNlZWRzID0gdGFyZ2V0ID8ge1xuICAgICAgICAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLFxuICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgICAgICAgICAgICBwX3RhcmdldDogdGhpcy5jcmVhdGVDZWxsU2NoZW1hKHRhcmdldCksXG4gICAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgICAgICAgICBncmFudF90eXBlOiBcInJlZnJlc2hfdG9rZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnR5cGUoXCJmb3JtXCIpXG4gICAgICAgICAgICAgICAgLnNlbmQodG9rZW5TZWVkcylcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbml1bVRva2VuID0gdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDjgr/jgqTjg6DjgqLjgqbjg4jjgpLopovjgotcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlc0luID0gdG9rZW4uZXhwaXJlc19pbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSBOdW1iZXIodGhpcy5leHBpcmVzSW4pICogOTAwOyAvL+ebtOWJjeOBq+aVmeOBiOOBpuOBguOBkuOCi1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFja1RpbWVyID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFjayAmJiB0aGlzLmV4cGlyZUNhbGxiYWNrKHRva2VuLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODreODvOODq+OCkuS9nOaIkOOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSByb2xlIOODreODvOODq+WQjVxuICAgICAqIEBwYXJhbSBib3ggTWFpbuODnOODg+OCr+OCueS7peWkluOCkuWvvuixoeOBqOOBmeOCi+WgtOWQiOOBr+ODnOODg+OCr+OCueWQjeOCkuaMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBjcmVhdGVSb2xlKGNlbGw6IHN0cmluZywgcm9sZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUm9sZS9cIjtcbiAgICAgICAgICAgIGNvbnN0IGJveE5hbWUgPSBib3ggfHwgbnVsbDtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgICAgICBpZighcm9sZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBOYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihib3gpe1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX0JveC5OYW1lXCI6IGJveE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ot44O844Or5oOF5aCx44Gu5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHJvbGUg54m55a6a44Gu44Ot44O844Or5oOF5aCx44GM5Y+W5b6X44GX44Gf44GE5aC05ZCI44Gv5oyH5a6aXG4gICAgICogQHBhcmFtIGJveCDnibnlrprjga7jg5zjg4Pjgq/jgrnjga7nibnlrprjga7jg63jg7zjg6vmg4XloLHjgYzlj5blvpfjgZfjgZ/jgYTloLTlkIjjga/mjIflrppcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0Um9sZShjZWxsOiBzdHJpbmcsIHJvbGU/OiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxSb2xlW118Um9sZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1JvbGVcIjtcbiAgICAgICAgICAgIGlmIChyb2xlKSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiKE5hbWU9J1wiICsgcm9sZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIGlmKHJvbGUgJiYgYm94KXtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ot44O844Or44KS5YmK6Zmk44GZ44KL77yI57SQ5LuY44GR44GM44GC44KL44Go5YmK6Zmk44Gn44GN44Gq44GE5aC05ZCI44GM44GC44KL77yJXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHJvbGUg54m55a6a44Gu44Ot44O844Or44KS5YmK6Zmk44GX44Gf44GE5aC05ZCI44Gv5oyH5a6aXG4gICAgICogQHBhcmFtIGJveCDnibnlrprjga7jg5zjg4Pjgq/jgrnjga7nibnlrprjga7jg63jg7zjg6vjgYzliYrpmaTjgZfjgZ/jgYTloLTlkIjjga/mjIflrppcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlUm9sZShjZWxsOiBzdHJpbmcsIHJvbGU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9Sb2xlXCI7XG4gICAgICAgICAgICBpZiAoYm94KSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiKE5hbWU9J1wiICsgcm9sZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihOYW1lPSdcIiArIHJvbGUgKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vjgpLoqK3lrprjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6sgXG4gICAgICogQHBhcmFtIHNldENlbGxVcmwg5aSW6YOo44K744Or44Gr5oyH5a6a44GX44Gf44GE44K744Or44GuVVJMXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIHNldEV4dENlbGwoY2VsbDogc3RyaW5nLCBzZXRDZWxsVXJsOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbC9cIjtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgVXJsOiBzZXRDZWxsVXJsLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoZGF0YSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or5LiA6Kan44KS5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGdldEV4dENlbGxMaXN0KGNlbGw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxFeHRDZWxsW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwvXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or44Gu6Kej6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIGRlbGV0ZUNlbGxVcmwg5YmK6Zmk44GZ44KL44K744Or44GuVVJMXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUV4dENlbGwoY2VsbDogc3RyaW5nLCBkZWxldGVDZWxsVXJsOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbCgnXCIgKyBFbmNvZGUoZGVsZXRlQ2VsbFVybCkgKyBcIicpXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vjgavlr77jgZfjgabjg63jg7zjg6vjgYvjg6rjg6zjg7zjgrfjg6fjg7PjgpLoqK3lrprjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gdGFyZ2V0Q2VsbFVybCDmjIflrprjgZnjgovlpJbpg6jjgrvjg6tVUkxcbiAgICAgKiBAcGFyYW0gdHlwZSDjg63jg7zjg6vjgYvjg6rjg6zjg7zjgrfjg6fjg7Pjga7mjIflrpooX1JvbGUvX1JlbGF0aW9uKVxuICAgICAqIEBwYXJhbSBuYW1lIOODreODvOODq+OBi+ODquODrOODvOOCt+ODp+ODs+OBq+aMh+WumuOBmeOCi+WQjeWJjVxuICAgICAqIEBwYXJhbSBib3gg44Oc44OD44Kv44K55ZCNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIHNldEV4dENlbGxMaW5rKGNlbGw6IHN0cmluZywgdGFyZ2V0Q2VsbFVybDogc3RyaW5nLCB0eXBlOiBcIl9Sb2xlXCJ8XCJfUmVsYXRpb25cIiwgbmFtZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbCgnXCIgKyBFbmNvZGUodGFyZ2V0Q2VsbFVybCkgKyBcIicpL1xcJGxpbmtzL1wiICsgdHlwZTtcbiAgICAgICAgICAgIGxldCByb2xlID0gXCJcIjtcbiAgICAgICAgICAgIGlmKG5hbWUgJiYgYm94KXtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZihuYW1lKXtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICB1cmk6IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvXCIgKyB0eXBlLnN1YnN0cmluZygxKSArIHJvbGVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGRhdGEpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OBq+e0kOOBpeOBkeOBn+ODquODs+OCr+OBruS4gOimp1xuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0YXJnZXRDZWxsVXJsIOWvvuixoeOBq+aMh+WumuOBmeOCi+OCu+ODq1VSTFxuICAgICAqIEBwYXJhbSB0eXBlIOODreODvOODq+OBi+ODquODrOODvOOCt+ODp+ODs+OBruaMh+WumihfUm9sZS9fUmVsYXRpb24pXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGdldEV4dENlbGxMaW5rKGNlbGw6IHN0cmluZywgdGFyZ2V0Q2VsbFVybDogc3RyaW5nLCB0eXBlOiBcIl9Sb2xlXCJ8XCJfUmVsYXRpb25cIiwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxMaW5rW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwoJ1wiICsgRW5jb2RlKHRhcmdldENlbGxVcmwpICsgXCInKS9cXCRsaW5rcy9cIiArIHR5cGU7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or44Gu44Oq44Oz44Kv44KS5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIHRhcmdldENlbGxVcmwg5a++6LGh44Go44GX44Gm5oyH5a6a44GZ44KL44K744OrVVJMXG4gICAgICogQHBhcmFtIHR5cGUg44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44Gu5oyH5a6aKF9Sb2xlL19SZWxhdGlvbilcbiAgICAgKiBAcGFyYW0gbmFtZSDliYrpmaTjgZnjgovjg63jg7zjg6sv44Oq44Os44O844K344On44Oz5ZCNXG4gICAgICogQHBhcmFtIGJveCDliYrpmaTjgZnjgovjg63jg7zjg6vjga7jgYLjgovjg5zjg4Pjgq/jgrnlkI3vvIjjg4fjg5Xjgqnjg6vjg4jjga/jg6HjgqTjg7Nib3jvvIlcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlRXh0Q2VsbExpbmsoY2VsbDogc3RyaW5nLCB0YXJnZXRDZWxsVXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCByb2xlID0gXCJcIjtcbiAgICAgICAgICAgIGlmKGJveCl7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwoJ1wiICsgRW5jb2RlKHRhcmdldENlbGxVcmwpICsgXCInKS9cXCRsaW5rcy9cIiArIHR5cGUgKyByb2xlO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ki44Kr44Km44Oz44OI44Gu44Oq44Oz44Kv44KS6Kit5a6aXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIGFjY291bnQg5a++6LGh44Go44GX44Gm5oyH5a6a44GZ44KL44Ki44Kr44Km44Oz44OI5ZCNXG4gICAgICogQHBhcmFtIG5hbWUg6Kit5a6a44GZ44KL44Ot44O844Or5ZCNXG4gICAgICogQHBhcmFtIGJveCDoqK3lrprjgZnjgovjg63jg7zjg6vjga7jgYLjgovjg5zjg4Pjgq/jgrnlkI3vvIjjg4fjg5Xjgqnjg6vjg4jjga/jg6HjgqTjg7Nib3jvvIlcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0QWNjb3VudExpbmsoY2VsbDogc3RyaW5nLCBhY2NvdW50OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgcm9sZSA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKStcIl9fY3RsL1JvbGVcIjtcbiAgICAgICAgICAgIGlmKGJveCl7XG4gICAgICAgICAgICAgICAgcm9sZSArPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICByb2xlICs9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvQWNjb3VudCgnXCIgKyBhY2NvdW50ICsgXCInKS9cXCRsaW5rcy9fUm9sZVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoe3VyaTogcm9sZX0pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCouOCq+OCpuODs+ODiOOBruODquODs+OCr+OCkuWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBhY2NvdW50IOWvvuixoeOBqOOBl+OBpuaMh+WumuOBmeOCi+OCouOCq+OCpuODs+ODiOWQjVxuICAgICAqIEBwYXJhbSBuYW1lIOWJiumZpOOBmeOCi+ODreODvOODq+WQjVxuICAgICAqIEBwYXJhbSBib3gg5YmK6Zmk44GZ44KL44Ot44O844Or44Gu44GC44KL44Oc44OD44Kv44K55ZCN77yI44OH44OV44Kp44Or44OI44Gv44Oh44Kk44OzYm9477yJXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUFjY291bnRMaW5rKGNlbGw6IHN0cmluZywgYWNjb3VudDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSBcIlwiO1xuICAgICAgICAgICAgaWYoYm94KXtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvQWNjb3VudCgnXCIgKyBhY2NvdW50ICsgXCInKS9cXCRsaW5rcy9fUm9sZVwiICsgcm9sZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCouOCq+OCpuODs+ODiOOCkuWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBhY2NvdW50IOWvvuixoeOBqOOBl+OBpuaMh+WumuOBmeOCi+OCouOCq+OCpuODs+ODiOWQjVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVBY2NvdW50KGNlbGw6IHN0cmluZywgYWNjb3VudDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0FjY291bnQoJ1wiICsgYWNjb3VudCArIFwiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODq+ODvOODq+S4gOimp+OBruWPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXRSdWxlcyhjZWxsOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UnVsZVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9SdWxlXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Or44O844Or44KS6Kit5a6a44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIHJ1bGUg55m76Yyy44GZ44KL44Or44O844OrXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIHNldFJ1bGUoY2VsbDogc3RyaW5nLCBydWxlOiBSdWxlLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1J1bGVcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgLnNlbmQocnVsZSlcbiAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiDjg6vjg7zjg6vjgpLliYrpmaTjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcnVsZU5hbWUg5YmK6Zmk44GZ44KL44Or44O844OrTmFtZVxuICAgICAqIEBwYXJhbSBib3gg44Oc44OD44Kv44K544Gr57SQ44Gl44GE44Gm44KL5aC05ZCI44GvYm945ZCN5oyH5a6aXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZVJ1bGUoY2VsbDogc3RyaW5nLCBydWxlTmFtZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1J1bGVcIjtcbiAgICAgICAgICAgIGlmKGJveCl7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiKE5hbWU9J1wiICsgcnVsZU5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyBydWxlTmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog44Oh44OD44K744O844K444Gu6YCB5L+hQVBJXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIHRvIOWum+WFiOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0eXBlIOODoeODg+OCu+ODvOOCuOmAgeS/oeOCv+OCpOODl+OBruaMh+WumlxuICAgICAqIEBwYXJhbSByZXF1ZXN0Q29udGVudCDnmbvpjLLkvp3poLzjgZfjgZ/plqLkv4Lmg4XloLEoVVJMKVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZW5kTWVzc2FnZShjZWxsOiBzdHJpbmcsIHRvOiBzdHJpbmcsIHR5cGU6IE1lc3NhZ2VTZW5kVHlwZSwgcmVxdWVzdENvbnRlbnQ6IFJ1bGV8c3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxVcmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCk7XG4gICAgICAgICAgICBjb25zdCB0b1VybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYSh0byk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjZWxsVXJsICsgXCJfX21lc3NhZ2Uvc2VuZC9cIjtcblxuICAgICAgICAgICAgbGV0IGJvZHkgPSB7fTtcblxuICAgICAgICAgICAgaWYgKHR5cGUubGFzdEluZGV4T2YoXCJyZXEucnVsZS5cIiwgMCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICBUbzogdG9VcmwsXG4gICAgICAgICAgICAgICAgICAgIFR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIFJlcXVlc3RSdWxlOiByZXF1ZXN0Q29udGVudCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlLmxhc3RJbmRleE9mKFwicmVxLnJvbGUuXCIsIDApID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgVG86IHRvVXJsLFxuICAgICAgICAgICAgICAgICAgICBUeXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UmVsYXRpb246IHJlcXVlc3RDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UmVsYXRpb25UYXJnZXQ6IGNlbGxVcmwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoYm9keSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXMudGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE8gcmVjZWl2ZU1lc3NhZ2VcbiAgICAgKi9cbiAgICByZWNlaXZlTWVzc2FnZSgpe31cbiAgICBcbiAgICAvKipcbiAgICAgKiBBQ0zjgpLoqK3lrprjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gYWNsIOioreWumuOBmeOCi0FDTOOBrmpzb24oWE1M44Gr5aSJ5o+bKVxuICAgICAqL1xuICAgIHNldEFjbChjZWxsOiBzdHJpbmcsIGFjZXM6IEFjZVtdLCB0YXJnZXRQYXRoPzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGFyZ2V0UGF0aD8gY2VsbHVybCt0YXJnZXRQYXRoIDogY2VsbHVybDtcblxuICAgICAgICAgICAgY29uc3QgYWNsOiBBY2wgPSB7XG4gICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpEXCI6IFwiREFWOlwiLFxuICAgICAgICAgICAgICAgICAgICBcInhtbG5zOnBcIjogXCJ1cm46eC1wZXJzb25pdW06eG1sbnNcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiRDphY2VcIjogYWNlcyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjbFhtbCA9IGpzMnhtbC5wYXJzZShcIkQ6YWNsXCIsIGFjbCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJBQ0xcIiwgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3htbFwiKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIit0b2tlbilcbiAgICAgICAgICAgIHhoci5zZW5kKGFjbFhtbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCteODvOODk+OCueOCs+ODrOOCr+OCt+ODp+ODs+OCveODvOOCueS9nOaIkFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBuYW1lIFJlc29yY2XlkI1cbiAgICAgKiBAcGFyYW0gcmVzb3VyY2UgUmVzb3JjZeS4rei6q1xuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBjcmVhdGVTZXJ2aWNlQ29sbGVjdGlvbihjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCByZXNvdXJjZTogYW55LCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIvX19zcmMvXCIgKyBuYW1lO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wdXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpXG4gICAgICAgICAgICAgICAgLnNlbmQocmVzb3VyY2UpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCteODvOODk+OCueOCs+ODrOOCr+OCt+ODp+ODs+OCveODvOOCueioreWumumBqeeUqFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBzY3JpcHQg44K544Kv44Oq44OX44OI5ZCNKHh4eC5qcylcbiAgICAgKiBAcGFyYW0gc2VydmljZSDjgrXjg7zjg5PjgrnlkI0oeXl5KVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRTZXJ2aWNlQ29sbGVjdGlvbihjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgc2NyaXB0OiBzdHJpbmcsIHNlcnZpY2U6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIGNvbnN0IHByb3AgPSB7XG4gICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpEXCI6IFwiREFWOlwiLFxuICAgICAgICAgICAgICAgICAgICBcInhtbG5zOnBcIjogXCJ1cm46eC1wZXJzb25pdW06eG1sbnNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczp6XCI6IFwiaHR0cDovL3d3dy53My5jb20vc3RhbmRhcmRzL3ozOS41MC9cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiRDpzZXRcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIkQ6cHJvcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInA6c2VydmljZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYW5ndWFnZVwiOiBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNjcmlwdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHByb3BYbWwgPSBqczJ4bWwucGFyc2UoXCJEOnByb3BlcnR5dXBkYXRlXCIsIHByb3ApO1xuXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKFwiUFJPUFBBVENIXCIsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCk9PntcbiAgICAgICAgICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94bWxcIik7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIrdG9rZW4pXG4gICAgICAgICAgICB4aHIuc2VuZChwcm9wWG1sKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44K144O844OT44K544Kz44Os44Kv44K344On44Oz44K944O844K55YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIG5hbWUgUmVzb3JjZeWQjVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVTZXJ2aWNlQ29sbGVjdGlvbihjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIvX19zcmMvXCIgKyBuYW1lO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj44K/44Kk44OX44Gu5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44Gu44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44Ko44Oz44OG44Kj44OG44Kj44Gu44OR44K5XG4gICAgICogQHBhcmFtIGlkIOOCqOODs+ODhuOCo+ODhuOCo2lkXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUVudGl0eVR5cGUoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVudGl0eVR5cGVOYW1lOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiLyRtZXRhZGF0YS9FbnRpdHlUeXBlKCdcIiArIGVudGl0eVR5cGVOYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvcGVydHnjga7liYrpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjga7jgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcGF0aCDjgqjjg7Pjg4bjgqPjg4bjgqPjga7jg5HjgrlcbiAgICAgKiBAcGFyYW0gZW50aXR5VHlwZSDjgqjjg7Pjg4bjgqPjg4bjgqPjgr/jgqTjg5fjga7lkI3liY1cbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgcHJvcGVydHnjga7lkI3liY1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlUHJvcGVydHkoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVudGl0eVR5cGU6IHN0cmluZywgcHJvcGVydHk6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIvJG1ldGFkYXRhL1Byb3BlcnR5KE5hbWU9J1wiICtwcm9wZXJ0eSsgXCInLF9FbnRpdHlUeXBlLk5hbWU9J1wiK2VudGl0eVR5cGUrXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQm9444Gu5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44Gu44K744Or5ZCNXG4gICAgICogQHBhcmFtIGJveCBib3jlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlQm94KGNlbGw6IHN0cmluZywgYm94OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9Cb3goTmFtZT0nXCIrYm94K1wiJylcIjsgICAgICAgICAgICBcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiDjg5fjg63jg5XjgqHjgqTjg6vmg4XloLHjgpLlj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCBcbiAgICAgKi9cbiAgICBnZXRQcm9maWxlKGNlbGw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtUHJvZmlsZVJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbHVybCArIFwiX18vcHJvZmlsZS5qc29uXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1Qcm9maWxlUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCouODl+ODquOCu+ODq+WwgueUqFxuICAgICAqIOOCouODl+ODqui1t+WLleaDheWgseOCkuWPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIFxuICAgICAqL1xuICAgIGdldExhdW5jaChjZWxsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUxhdW5jaEpzb24+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGx1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjZWxsdXJsICsgXCJfXy9sYXVuY2guanNvblwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtTGF1bmNoSnNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmFy44Kk44Oz44K544OI44O844OrIFxuICAgICAqIEBwYXJhbSBiYXJVcmxcbiAgICAgKi9cbiAgICBiYXJJbnN0YWxsKGNlbGw6IHN0cmluZywgYm94OiBzdHJpbmcsIGJhclVybDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbHVybCArIGJveDtcblxuICAgICAgICAgICAgcmVxdWVzdC5nZXQoYmFyVXJsKVxuICAgICAgICAgICAgICAgIC5yZXNwb25zZVR5cGUoXCJibG9iXCIpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlczEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHJlczEuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9wZW4oXCJNS0NPTFwiLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vemlwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiK3Rva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNlbmQoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj44OH44O844K/44Gu5a2Y5Zyo56K66KqNXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIF9fX2lkIOOCqOODs+ODhuOCo+ODhuOCo2lkXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGlzRXhpc3QoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIF9faWQ/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSBudWxsO1xuICAgICAgICAgICAgaWYoX19pZCl7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiKCdcIiArIF9faWQgKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqjjg7Pjg4bjgqPjg4bjgqPlj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gcXVlcnkg44Kv44Ko44Oq77yIVE9ETyDmnKrlrozmiJDvvIlcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0KGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBxdWVyeT86IFF1ZXJ5fHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1EYXRhW10gfCBQZXJzb25pdW1EYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IEVuY29kZShcIj8kb3JkZXJieT1cIiArIHF1ZXJ5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihxdWVyeSl7XG4gICAgICAgICAgICAgICAgdXJsID0gY29udmVydFF1ZXJpZWRVcmwodXJsLCBxdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSBFbmNvZGUoXCI/JG9yZGVyYnk9X191cGRhdGVkJTIwZGVzY1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqjjg7Pjg4bjgqPjg4bjgqPmm7jjgY3ovrzjgb9cbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gZW50aXR5IOOCqOODs+ODhuOCo+ODhuOCo+aDheWgsVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBwb3N0KGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbnRpdHk6IGFueSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoZW50aXR5KVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj5LiK5pu444GNXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIGlkIOOCqOODs+ODhuOCo+ODhuOCo2lkXG4gICAgICogQHBhcmFtIGVudGl0eSDkuIrmm7jjgY3jgZnjgovjgqjjg7Pjg4bjgqPjg4bjgqPmg4XloLFcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgdXBkYXRlKGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBpZDogc3RyaW5nLCBlbnRpdHk6IGFueSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIoJ1wiICsgaWQgKyBcIicpXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnB1dCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGVudGl0eSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj44Gu5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44Gu44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44Ko44Oz44OG44Kj44OG44Kj44Gu44OR44K5XG4gICAgICogQHBhcmFtIGlkIOOCqOODs+ODhuOCo+ODhuOCo2lkXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZShjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaWQ/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gaWQ/XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiKCdcIiArIGlkICsgXCInKVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrvjg6vlkI3jgYvjgonjgrvjg6vjgrnjgq3jg7zjg55VUkzjgpLkvZzmiJDjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCBcbiAgICAgKi9cbiAgICBjcmVhdGVDZWxsU2NoZW1hKGNlbGw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm90b2NvbH06Ly8ke3RoaXMuaG9zdH0vJHtjZWxsfS9gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCu+ODq+OCueOCreODvOODnlVSTOOBi+OCieOCu+ODq+WQjeOCkuaKveWHuuOBmeOCi1xuICAgICAqIEBwYXJhbSB1cmwgXG4gICAgICovXG4gICAgZXh0cmFjdENlbGxOYW1lKHVybDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB1cmwuc3Vic3RyaW5nKHVybC5pbmRleE9mKHRoaXMuaG9zdCkgKyB0aGlzLmhvc3QubGVuZ3RoICsgMSwgdXJsLmxhc3RJbmRleE9mKFwiL1wiKSk7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWBnOatouaZglxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmKHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59XG5cblxuLy8gLypcbi8vIC8vVE9ETyDjgrnjgq3jg7zjg57oqo3oqLznlKjjga5BUEnjgIJcbi8vIC8vUGVyc29uaXVt44Ki44OX44Oq44Oe44O844Kx44OD44OI5Yip55So5pmC44Gr5L2/44GG44GT44Go44Gr44Gq44KL44KE44KC44GX44KM44Gs44CCXG4vLyBleHBvcnQgY29uc3QgdHJhbnNjZWxsdG9rZW4gPSAoam9zaGk6IHN0cmluZywgYnVrYTogc3RyaW5nKSA9PiB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbi8vICAgICBjb25zdCB1cmwgPSBjcmVhdGVDZWxsU2NoZW1hKGJ1a2EpK1wiX190b2tlblwiO1xuLy8gICAgIHJlcXVlc3Rcbi8vICAgICAgIC5wb3N0KHVybClcbi8vICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4vLyAgICAgICAudHlwZShcImZvcm1cIilcbi8vICAgICAgIC5zZW5kKHtcbi8vICAgICAgICAgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLCBcbi8vICAgICAgICAgdXNlcm5hbWU6IFwiYm9iXCIsICAvL1RPRE8gXG4vLyAgICAgICAgIHBhc3N3b3JkOiBcInBpeW9waXlvXCIsIC8vVE9ETyBcbi8vICAgICAgICAgcF90YXJnZXQ6IGNyZWF0ZUNlbGxTY2hlbWEoam9zaGkpLFxuLy8gICAgICAgfSlcbi8vICAgICAgIC5lbmQoKGVycm9yLCByZXMpPT57XG4vLyAgICAgICAgIGlmKGVycm9yKXtcbi8vICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXMudGV4dCkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9O1xuLy8gZXhwb3J0IGNvbnN0IHJlZnJlc2hBY2Nlc3NUb2tlbiA9IChqb3NoaTogc3RyaW5nLCBidWthOiBzdHJpbmcsIGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4pID0+IHtcbi8vICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgIGNvbnN0IHVybCA9IGNyZWF0ZUNlbGxTY2hlbWEoam9zaGkpK1wiX190b2tlblwiO1xuLy8gICAgIHJlcXVlc3Rcbi8vICAgICAgIC5wb3N0KHVybClcbi8vICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4vLyAgICAgICAudHlwZShcImZvcm1cIilcbi8vICAgICAgIC5zZW5kKHtcbi8vICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsIFxuLy8gICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4vLyAgICAgICAgIGNsaWVudF9pZDogY3JlYXRlQ2VsbFNjaGVtYShidWthKSxcbi8vICAgICAgICAgY2xpZW50X3NlY3JldDogYWNjZXNzVG9rZW4sXG4vLyAgICAgICB9KVxuLy8gICAgICAgLmVuZCgoZXJyb3IsIHJlcyk9Pntcbi8vICAgICAgICAgaWYoZXJyb3Ipe1xuLy8gICAgICAgICAgIHJlamVjdChlcnJvcik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSB7XG4vLyAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcy50ZXh0KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH07XG4vLyAqL1xuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IFBlcnNvbml1bUNsaWVudDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50LnRzIiwiLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG52YXIgcm9vdDtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyAvLyBCcm93c2VyIHdpbmRvd1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gV2ViIFdvcmtlclxuICByb290ID0gc2VsZjtcbn0gZWxzZSB7IC8vIE90aGVyIGVudmlyb25tZW50c1xuICBjb25zb2xlLndhcm4oXCJVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuICByb290ID0gdGhpcztcbn1cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG52YXIgUmVzcG9uc2VCYXNlID0gcmVxdWlyZSgnLi9yZXNwb25zZS1iYXNlJyk7XG52YXIgc2hvdWxkUmV0cnkgPSByZXF1aXJlKCcuL3Nob3VsZC1yZXRyeScpO1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpe307XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG52YXIgcmVxdWVzdCA9IGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsKSB7XG4gIC8vIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB1cmwpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCk7XG4gIH1cblxuICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdChtZXRob2QsIHVybCk7XG59XG5cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAgICYmICghcm9vdC5sb2NhdGlvbiB8fCAnZmlsZTonICE9IHJvb3QubG9jYXRpb24ucHJvdG9jb2xcbiAgICAgICAgICB8fCAhcm9vdC5BY3RpdmVYT2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgfVxuICB0aHJvdyBFcnJvcihcIkJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgY291bGQgbm90IGZpbmQgWEhSXCIpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciB0cmltID0gJycudHJpbVxuICA/IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24ocykgeyByZXR1cm4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTsgfTtcblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIG9ialtrZXldKTtcbiAgfVxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vKipcbiAqIEhlbHBzICdzZXJpYWxpemUnIHdpdGggc2VyaWFsaXppbmcgYXJyYXlzLlxuICogTXV0YXRlcyB0aGUgcGFpcnMgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFpcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICovXG5cbmZ1bmN0aW9uIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHZhbCkge1xuICBpZiAodmFsICE9IG51bGwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHYpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgICBmb3IodmFyIHN1YmtleSBpbiB2YWwpIHtcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSArICdbJyArIHN1YmtleSArICddJywgdmFsW3N1YmtleV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpKTtcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QgPSBzZXJpYWxpemU7XG5cbiAvKipcbiAgKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAqIEByZXR1cm4ge09iamVjdH1cbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoc3RyKSB7XG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KCcmJyk7XG4gIHZhciBwYWlyO1xuICB2YXIgcG9zO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYWlycy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHBhaXIgPSBwYWlyc1tpXTtcbiAgICBwb3MgPSBwYWlyLmluZGV4T2YoJz0nKTtcbiAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIpXSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIuc2xpY2UoMCwgcG9zKSldID1cbiAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIuc2xpY2UocG9zICsgMSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICd0ZXh0L3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeVxuIH07XG5cbiAvKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgbGluZXMucG9wKCk7IC8vIHRyYWlsaW5nIENSTEZcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICByZXR1cm4gL1tcXC8rXWpzb25cXGIvLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSkge1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdmFyIHN0YXR1cyA9IHRoaXMueGhyLnN0YXR1cztcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgICBzdGF0dXMgPSAyMDQ7XG4gIH1cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuXG4gIGlmIChudWxsID09PSB0aGlzLnRleHQgJiYgcmVxLl9yZXNwb25zZVR5cGUpIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnhoci5yZXNwb25zZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgICA/IHRoaXMuX3BhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSlcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuXG5SZXNwb25zZUJhc2UoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5fcGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKXtcbiAgdmFyIHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZih0aGlzLnJlcS5fcGFyc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLl9wYXJzZXIodGhpcywgc3RyKTtcbiAgfVxuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9OyAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVyciA9IG51bGw7XG4gICAgdmFyIHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09ICd1bmRlZmluZWQnID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgdmFyIG5ld19lcnI7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbmV3X2VyciA9IGU7IC8vICM5ODUgdG91Y2hpbmcgcmVzIG1heSBjYXVzZSBJTlZBTElEX1NUQVRFX0VSUiBvbiBvbGQgQW5kcm9pZFxuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblJlcXVlc3RCYXNlKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Bhc3NdIG9wdGlvbmFsIGluIGNhc2Ugb2YgdXNpbmcgJ2JlYXJlcicgYXMgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMpe1xuICBpZiAodHlwZW9mIHBhc3MgPT09ICdvYmplY3QnICYmIHBhc3MgIT09IG51bGwpIHsgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIHN1YnN0aXR1dGUgZm9yIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgfVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGJ0b2EgPyAnYmFzaWMnIDogJ2F1dG8nLFxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EodXNlciArICc6JyArIHBhc3MpKTtcbiAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICBicmVhaztcblxuICAgIGNhc2UgJ2JlYXJlcic6IC8vIHVzYWdlIHdvdWxkIGJlIC5hdXRoKGFjY2Vzc1Rva2VuLCB7IHR5cGU6ICdiZWFyZXInIH0pXG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHVzZXIpO1xuICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgcXVlcnktc3RyaW5nIGB2YWxgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4gKiAgICAgLnF1ZXJ5KCdzaXplPTEwJylcbiAqICAgICAucXVlcnkoeyBjb2xvcjogJ2JsdWUnIH0pXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uKHZhbCl7XG4gIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB2YWwgPSBzZXJpYWxpemUodmFsKTtcbiAgaWYgKHZhbCkgdGhpcy5fcXVlcnkucHVzaCh2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVldWUgdGhlIGdpdmVuIGBmaWxlYCBhcyBhbiBhdHRhY2htZW50IHRvIHRoZSBzcGVjaWZpZWQgYGZpZWxkYCxcbiAqIHdpdGggb3B0aW9uYWwgYG9wdGlvbnNgIChvciBmaWxlbmFtZSkuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuYXR0YWNoKCdjb250ZW50JywgbmV3IEJsb2IoWyc8YSBpZD1cImFcIj48YiBpZD1cImJcIj5oZXkhPC9iPjwvYT4nXSwgeyB0eXBlOiBcInRleHQvaHRtbFwifSkpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge0Jsb2J8RmlsZX0gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24oZmllbGQsIGZpbGUsIG9wdGlvbnMpe1xuICBpZiAoZmlsZSkge1xuICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICB0aHJvdyBFcnJvcihcInN1cGVyYWdlbnQgY2FuJ3QgbWl4IC5zZW5kKCkgYW5kIC5hdHRhY2goKVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChmaWVsZCwgZmlsZSwgb3B0aW9ucyB8fCBmaWxlLm5hbWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2dldEZvcm1EYXRhID0gZnVuY3Rpb24oKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkge1xuICAgIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZm9ybURhdGE7XG59O1xuXG4vKipcbiAqIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCBgZXJyYCBhbmQgYHJlc2BcbiAqIGFuZCBoYW5kbGUgYXJpdHkgY2hlY2suXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNhbGxiYWNrID0gZnVuY3Rpb24oZXJyLCByZXMpe1xuICAvLyBjb25zb2xlLmxvZyh0aGlzLl9yZXRyaWVzLCB0aGlzLl9tYXhSZXRyaWVzKVxuICBpZiAodGhpcy5fbWF4UmV0cmllcyAmJiB0aGlzLl9yZXRyaWVzKysgPCB0aGlzLl9tYXhSZXRyaWVzICYmIHNob3VsZFJldHJ5KGVyciwgcmVzKSkge1xuICAgIHJldHVybiB0aGlzLl9yZXRyeSgpO1xuICB9XG5cbiAgdmFyIGZuID0gdGhpcy5fY2FsbGJhY2s7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG5cbiAgaWYgKGVycikge1xuICAgIGlmICh0aGlzLl9tYXhSZXRyaWVzKSBlcnIucmV0cmllcyA9IHRoaXMuX3JldHJpZXMgLSAxO1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgZm4oZXJyLCByZXMpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB4LWRvbWFpbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcm9zc0RvbWFpbkVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignUmVxdWVzdCBoYXMgYmVlbiB0ZXJtaW5hdGVkXFxuUG9zc2libGUgY2F1c2VzOiB0aGUgbmV0d29yayBpcyBvZmZsaW5lLCBPcmlnaW4gaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luLCB0aGUgcGFnZSBpcyBiZWluZyB1bmxvYWRlZCwgZXRjLicpO1xuICBlcnIuY3Jvc3NEb21haW4gPSB0cnVlO1xuXG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICBlcnIudXJsID0gdGhpcy51cmw7XG5cbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLy8gVGhpcyBvbmx5IHdhcm5zLCBiZWNhdXNlIHRoZSByZXF1ZXN0IGlzIHN0aWxsIGxpa2VseSB0byB3b3JrXG5SZXF1ZXN0LnByb3RvdHlwZS5idWZmZXIgPSBSZXF1ZXN0LnByb3RvdHlwZS5jYSA9IFJlcXVlc3QucHJvdG90eXBlLmFnZW50ID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS53YXJuKFwiVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFRoaXMgdGhyb3dzLCBiZWNhdXNlIGl0IGNhbid0IHNlbmQvcmVjZWl2ZSBkYXRhIGFzIGV4cGVjdGVkXG5SZXF1ZXN0LnByb3RvdHlwZS5waXBlID0gUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbigpe1xuICB0aHJvdyBFcnJvcihcIlN0cmVhbWluZyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLl9pc0hvc3QgPSBmdW5jdGlvbiBfaXNIb3N0KG9iaikge1xuICAvLyBOYXRpdmUgb2JqZWN0cyBzdHJpbmdpZnkgdG8gW29iamVjdCBGaWxlXSwgW29iamVjdCBCbG9iXSwgW29iamVjdCBGb3JtRGF0YV0sIGV0Yy5cbiAgcmV0dXJuIG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iaiAmJiAhQXJyYXkuaXNBcnJheShvYmopICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKFwiV2FybmluZzogLmVuZCgpIHdhcyBjYWxsZWQgdHdpY2UuIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBzdXBlcmFnZW50XCIpO1xuICB9XG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZW5kID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHhociA9IHRoaXMueGhyID0gcmVxdWVzdC5nZXRYSFIoKTtcbiAgdmFyIGRhdGEgPSB0aGlzLl9mb3JtRGF0YSB8fCB0aGlzLl9kYXRhO1xuXG4gIHRoaXMuX3NldFRpbWVvdXRzKCk7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIHZhciByZWFkeVN0YXRlID0geGhyLnJlYWR5U3RhdGU7XG4gICAgaWYgKHJlYWR5U3RhdGUgPj0gMiAmJiBzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgICB9XG4gICAgaWYgKDQgIT0gcmVhZHlTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEluIElFOSwgcmVhZHMgdG8gYW55IHByb3BlcnR5IChlLmcuIHN0YXR1cykgb2ZmIG9mIGFuIGFib3J0ZWQgWEhSIHdpbGxcbiAgICAvLyByZXN1bHQgaW4gdGhlIGVycm9yIFwiQ291bGQgbm90IGNvbXBsZXRlIHRoZSBvcGVyYXRpb24gZHVlIHRvIGVycm9yIGMwMGMwMjNmXCJcbiAgICB2YXIgc3RhdHVzO1xuICAgIHRyeSB7IHN0YXR1cyA9IHhoci5zdGF0dXMgfSBjYXRjaChlKSB7IHN0YXR1cyA9IDA7IH1cblxuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCB8fCBzZWxmLl9hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgdmFyIGhhbmRsZVByb2dyZXNzID0gZnVuY3Rpb24oZGlyZWN0aW9uLCBlKSB7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDA7XG4gICAgfVxuICAgIGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfVxuICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoJ3Byb2dyZXNzJykpIHtcbiAgICB0cnkge1xuICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICdkb3dubG9hZCcpO1xuICAgICAgaWYgKHhoci51cGxvYWQpIHtcbiAgICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAndXBsb2FkJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyBBY2Nlc3NpbmcgeGhyLnVwbG9hZCBmYWlscyBpbiBJRSBmcm9tIGEgd2ViIHdvcmtlciwgc28ganVzdCBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgICAgLy8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84MzcyNDUveG1saHR0cHJlcXVlc3QtdXBsb2FkLXRocm93cy1pbnZhbGlkLWFyZ3VtZW50LXdoZW4tdXNlZC1mcm9tLXdlYi13b3JrZXItY29udGV4dFxuICAgIH1cbiAgfVxuXG4gIC8vIGluaXRpYXRlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUsIHRoaXMudXNlcm5hbWUsIHRoaXMucGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gc2VlICMxMTQ5XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgfVxuXG4gIC8vIENPUlNcbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgLy8gYm9keVxuICBpZiAoIXRoaXMuX2Zvcm1EYXRhICYmICdHRVQnICE9IHRoaXMubWV0aG9kICYmICdIRUFEJyAhPSB0aGlzLm1ldGhvZCAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgZGF0YSAmJiAhdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgdmFyIGNvbnRlbnRUeXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICB2YXIgc2VyaWFsaXplID0gdGhpcy5fc2VyaWFsaXplciB8fCByZXF1ZXN0LnNlcmlhbGl6ZVtjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF0gOiAnJ107XG4gICAgaWYgKCFzZXJpYWxpemUgJiYgaXNKU09OKGNvbnRlbnRUeXBlKSkge1xuICAgICAgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgICB9XG4gICAgaWYgKHNlcmlhbGl6ZSkgZGF0YSA9IHNlcmlhbGl6ZShkYXRhKTtcbiAgfVxuXG4gIC8vIHNldCBoZWFkZXIgZmllbGRzXG4gIGZvciAodmFyIGZpZWxkIGluIHRoaXMuaGVhZGVyKSB7XG4gICAgaWYgKG51bGwgPT0gdGhpcy5oZWFkZXJbZmllbGRdKSBjb250aW51ZTtcblxuICAgIGlmICh0aGlzLmhlYWRlci5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpXG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihmaWVsZCwgdGhpcy5oZWFkZXJbZmllbGRdKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZXNwb25zZVR5cGUpIHtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gdGhpcy5fcmVzcG9uc2VUeXBlO1xuICB9XG5cbiAgLy8gc2VuZCBzdHVmZlxuICB0aGlzLmVtaXQoJ3JlcXVlc3QnLCB0aGlzKTtcblxuICAvLyBJRTExIHhoci5zZW5kKHVuZGVmaW5lZCkgc2VuZHMgJ3VuZGVmaW5lZCcgc3RyaW5nIGFzIFBPU1QgcGF5bG9hZCAoaW5zdGVhZCBvZiBub3RoaW5nKVxuICAvLyBXZSBuZWVkIG51bGwgaGVyZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICB4aHIuc2VuZCh0eXBlb2YgZGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRhIDogbnVsbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHRVQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmdldCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmhlYWQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0hFQUQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogT1BUSU9OUyBxdWVyeSB0byBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3Qub3B0aW9ucyA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnT1BUSU9OUycsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVsKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbnJlcXVlc3RbJ2RlbCddID0gZGVsO1xucmVxdWVzdFsnZGVsZXRlJ10gPSBkZWw7XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucGF0Y2ggPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wb3N0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQT1NUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUFVUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG4vKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cclxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcclxuICAgIC5wdXNoKGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uLmZuID0gZm47XHJcbiAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgLy8gYWxsXHJcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgdmFyIGNiO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcclxuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIE1vZHVsZSBvZiBtaXhlZC1pbiBmdW5jdGlvbnMgc2hhcmVkIGJldHdlZW4gbm9kZSBhbmQgY2xpZW50IGNvZGVcbiAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RCYXNlYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3RCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uIF9jbGVhclRpbWVvdXQoKXtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgZGVsZXRlIHRoaXMuX3RpbWVyO1xuICBkZWxldGUgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIGJvZHkgcGFyc2VyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGluY29taW5nIGRhdGEgaW50byByZXF1ZXN0LmJvZHlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShmbil7XG4gIHRoaXMuX3BhcnNlciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGZvcm1hdCBvZiBiaW5hcnkgcmVzcG9uc2UgYm9keS5cbiAqIEluIGJyb3dzZXIgdmFsaWQgZm9ybWF0cyBhcmUgJ2Jsb2InIGFuZCAnYXJyYXlidWZmZXInLFxuICogd2hpY2ggcmV0dXJuIEJsb2IgYW5kIEFycmF5QnVmZmVyLCByZXNwZWN0aXZlbHkuXG4gKlxuICogSW4gTm9kZSBhbGwgdmFsdWVzIHJlc3VsdCBpbiBCdWZmZXIuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAucmVzcG9uc2VUeXBlKCdibG9iJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlc3BvbnNlVHlwZSA9IGZ1bmN0aW9uKHZhbCl7XG4gIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVxdWVzdCBib2R5IHNlcmlhbGl6ZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgZGF0YSBzZXQgdmlhIC5zZW5kIG9yIC5hdHRhY2ggaW50byBwYXlsb2FkIHRvIHNlbmRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gc2VyaWFsaXplKGZuKXtcbiAgdGhpcy5fc2VyaWFsaXplciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXRzLlxuICpcbiAqIC0gcmVzcG9uc2UgdGltZW91dCBpcyB0aW1lIGJldHdlZW4gc2VuZGluZyByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIHJlc3BvbnNlLiBJbmNsdWRlcyBETlMgYW5kIGNvbm5lY3Rpb24gdGltZS5cbiAqIC0gZGVhZGxpbmUgaXMgdGhlIHRpbWUgZnJvbSBzdGFydCBvZiB0aGUgcmVxdWVzdCB0byByZWNlaXZpbmcgcmVzcG9uc2UgYm9keSBpbiBmdWxsLiBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIHNob3J0IGxhcmdlIGZpbGVzIG1heSBub3QgbG9hZCBhdCBhbGwgb24gc2xvdyBjb25uZWN0aW9ucy5cbiAqXG4gKiBWYWx1ZSBvZiAwIG9yIGZhbHNlIG1lYW5zIG5vIHRpbWVvdXQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBtcyBvciB7cmVzcG9uc2UsIGRlYWRsaW5lfVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChvcHRpb25zKXtcbiAgaWYgKCFvcHRpb25zIHx8ICdvYmplY3QnICE9PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zO1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3IodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucy5kZWFkbGluZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IG9wdGlvbnMucmVzcG9uc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biB0aW1lb3V0IG9wdGlvblwiLCBvcHRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gcmV0cnkoY291bnQpe1xuICAvLyBEZWZhdWx0IHRvIDEgaWYgbm8gY291bnQgcGFzc2VkIG9yIHRydWVcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgY291bnQgPT09IHRydWUpIGNvdW50ID0gMTtcbiAgaWYgKGNvdW50IDw9IDApIGNvdW50ID0gMDtcbiAgdGhpcy5fbWF4UmV0cmllcyA9IGNvdW50O1xuICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICAvLyBub2RlXG4gIGlmICh0aGlzLnJlcSkge1xuICAgIHRoaXMucmVxID0gbnVsbDtcbiAgICB0aGlzLnJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB9XG5cbiAgdGhpcy5fYWJvcnRlZCA9IGZhbHNlO1xuICB0aGlzLnRpbWVkb3V0ID0gZmFsc2U7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlIHN1cHBvcnRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVqZWN0XVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIHRoZW4ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gIGlmICghdGhpcy5fZnVsbGZpbGxlZFByb21pc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzXCIpO1xuICAgIH1cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKGlubmVyUmVzb2x2ZSwgaW5uZXJSZWplY3Qpe1xuICAgICAgc2VsZi5lbmQoZnVuY3Rpb24oZXJyLCByZXMpe1xuICAgICAgICBpZiAoZXJyKSBpbm5lclJlamVjdChlcnIpOyBlbHNlIGlubmVyUmVzb2x2ZShyZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbn1cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNhdGNoID0gZnVuY3Rpb24oY2IpIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNiKTtcbn07XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUub2sgPSBmdW5jdGlvbihjYikge1xuICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNiKSB0aHJvdyBFcnJvcihcIkNhbGxiYWNrIHJlcXVpcmVkXCIpO1xuICB0aGlzLl9va0NhbGxiYWNrID0gY2I7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9pc1Jlc3BvbnNlT0sgPSBmdW5jdGlvbihyZXMpIHtcbiAgaWYgKCFyZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodGhpcy5fb2tDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9va0NhbGxiYWNrKHJlcyk7XG4gIH1cblxuICByZXR1cm4gcmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMDtcbn07XG5cblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldEhlYWRlciA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQ7XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsO1xuICB0aGlzLmhlYWRlcltmaWVsZF0gPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG4gIGRlbGV0ZSB0aGlzLmhlYWRlcltmaWVsZF07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdFxuICogZm9yIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIHJlcXVlc3QgYm9kaWVzLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKCdmb28nLCAnYmFyJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKHsgZm9vOiAnYmFyJywgYmF6OiAncXV4JyB9KVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfEJ1ZmZlcnxmcy5SZWFkU3RyZWFtfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG5cbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG51bGwgPT09IG5hbWUgfHwgIHVuZGVmaW5lZCA9PT0gbmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgbmFtZSBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodGhpcy5fZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCIuZmllbGQoKSBjYW4ndCBiZSB1c2VkIGlmIC5zZW5kKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICB0aGlzLmZpZWxkKGtleSwgbmFtZVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgZm9yICh2YXIgaSBpbiB2YWwpIHtcbiAgICAgIHRoaXMuZmllbGQobmFtZSwgdmFsW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB2YWwgc2hvdWxkIGJlIGRlZmluZWQgbm93XG4gIGlmIChudWxsID09PSB2YWwgfHwgdW5kZWZpbmVkID09PSB2YWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIHZhbCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PT0gdHlwZW9mIHZhbCkge1xuICAgIHZhbCA9ICcnICsgdmFsO1xuICB9XG4gIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKG5hbWUsIHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2Fib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhociAmJiB0aGlzLnhoci5hYm9ydCgpOyAvLyBicm93c2VyXG4gIHRoaXMucmVxICYmIHRoaXMucmVxLmFib3J0KCk7IC8vIG5vZGVcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKG9uKXtcbiAgLy8gVGhpcyBpcyBicm93c2VyLW9ubHkgZnVuY3Rpb25hbGl0eS4gTm9kZSBzaWRlIGlzIG5vLW9wLlxuICBpZihvbj09dW5kZWZpbmVkKSBvbiA9IHRydWU7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IG9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXggcmVkaXJlY3RzIHRvIGBuYC4gRG9lcyBub3RpbmcgaW4gYnJvd3NlciBYSFIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVkaXJlY3RzID0gZnVuY3Rpb24obil7XG4gIHRoaXMuX21heFJlZGlyZWN0cyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGEgcGxhaW4gamF2YXNjcmlwdCBvYmplY3QgKG5vdCBKU09OIHN0cmluZykgb2Ygc2NhbGFyIHByb3BlcnRpZXMuXG4gKiBOb3RlIGFzIHRoaXMgbWV0aG9kIGlzIGRlc2lnbmVkIHRvIHJldHVybiBhIHVzZWZ1bCBub24tdGhpcyB2YWx1ZSxcbiAqIGl0IGNhbm5vdCBiZSBjaGFpbmVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVzY3JpYmluZyBtZXRob2QsIHVybCwgYW5kIGRhdGEgb2YgdGhpcyByZXF1ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXG4gICAgdXJsOiB0aGlzLnVybCxcbiAgICBkYXRhOiB0aGlzLl9kYXRhLFxuICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlclxuICB9O1xufTtcblxuXG4vKipcbiAqIFNlbmQgYGRhdGFgIGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSl7XG4gIHZhciBpc09iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgaWYgKHRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIi5zZW5kKCkgY2FuJ3QgYmUgdXNlZCBpZiAuYXR0YWNoKCkgb3IgLmZpZWxkKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iaiAmJiAhdGhpcy5fZGF0YSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIGlmICghdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICB9IGVsc2UgaWYgKGRhdGEgJiYgdGhpcy5fZGF0YSAmJiB0aGlzLl9pc0hvc3QodGhpcy5fZGF0YSkpIHtcbiAgICB0aHJvdyBFcnJvcihcIkNhbid0IG1lcmdlIHRoZXNlIHNlbmQgY2FsbHNcIik7XG4gIH1cblxuICAvLyBtZXJnZVxuICBpZiAoaXNPYmogJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSkge1xuICAgIC8vIGRlZmF1bHQgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyB0aGlzLl9kYXRhICsgJyYnICsgZGF0YVxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmogfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkZWZhdWx0IHRvIGpzb25cbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogU29ydCBgcXVlcnlzdHJpbmdgIGJ5IHRoZSBzb3J0IGZ1bmN0aW9uXG4gKlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIGRlZmF1bHQgb3JkZXJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KClcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBjdXN0b21pemVkIHNvcnQgZnVuY3Rpb25cbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KGZ1bmN0aW9uKGEsIGIpe1xuICogICAgICAgICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xuICogICAgICAgICB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNvcnRRdWVyeSA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgLy8gX3NvcnQgZGVmYXVsdCB0byB0cnVlIGJ1dCBvdGhlcndpc2UgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYm9vbGVhblxuICB0aGlzLl9zb3J0ID0gdHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IHNvcnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb21wb3NlIHF1ZXJ5c3RyaW5nIHRvIGFwcGVuZCB0byByZXEudXJsXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fZmluYWxpemVRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgdGhpcy51cmwgKz0gKHRoaXMudXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArIHF1ZXJ5O1xuICB9XG4gIHRoaXMuX3F1ZXJ5Lmxlbmd0aCA9IDA7IC8vIE1ha2VzIHRoZSBjYWxsIGlkZW1wb3RlbnRcblxuICBpZiAodGhpcy5fc29ydCkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdmFyIHF1ZXJ5QXJyID0gdGhpcy51cmwuc3Vic3RyaW5nKGluZGV4ICsgMSkuc3BsaXQoJyYnKTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgdGhpcy5fc29ydCkge1xuICAgICAgICBxdWVyeUFyci5zb3J0KHRoaXMuX3NvcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCgpO1xuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5zdWJzdHJpbmcoMCwgaW5kZXgpICsgJz8nICsgcXVlcnlBcnIuam9pbignJicpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRm9yIGJhY2t3YXJkcyBjb21wYXQgb25seVxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hcHBlbmRRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKCkge2NvbnNvbGUudHJhY2UoXCJVbnN1cHBvcnRlZFwiKTt9XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3RpbWVvdXRFcnJvciA9IGZ1bmN0aW9uKHJlYXNvbiwgdGltZW91dCwgZXJybm8pe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZXJyID0gbmV3IEVycm9yKHJlYXNvbiArIHRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnKTtcbiAgZXJyLnRpbWVvdXQgPSB0aW1lb3V0O1xuICBlcnIuY29kZSA9ICdFQ09OTkFCT1JURUQnO1xuICBlcnIuZXJybm8gPSBlcnJubztcbiAgdGhpcy50aW1lZG91dCA9IHRydWU7XG4gIHRoaXMuYWJvcnQoKTtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zZXRUaW1lb3V0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gZGVhZGxpbmVcbiAgaWYgKHRoaXMuX3RpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1RpbWVvdXQgb2YgJywgc2VsZi5fdGltZW91dCwgJ0VUSU1FJyk7XG4gICAgfSwgdGhpcy5fdGltZW91dCk7XG4gIH1cbiAgLy8gcmVzcG9uc2UgdGltZW91dFxuICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0ICYmICF0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdSZXNwb25zZSB0aW1lb3V0IG9mICcsIHNlbGYuX3Jlc3BvbnNlVGltZW91dCwgJ0VUSU1FRE9VVCcpO1xuICAgIH0sIHRoaXMuX3Jlc3BvbnNlVGltZW91dCk7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3JlcXVlc3QtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlQmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZUJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2VCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXNwb25zZUJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXNwb25zZUJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gICAgLy8gVE9ETzogbW9hciFcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYSB1dGlsXG5cbiAgICAvLyBjb250ZW50LXR5cGVcbiAgICB2YXIgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpO1xuXG4gICAgLy8gcGFyYW1zXG4gICAgdmFyIHBhcmFtcyA9IHV0aWxzLnBhcmFtcyhjdCk7XG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG5cbiAgICB0aGlzLmxpbmtzID0ge307XG5cbiAgICAvLyBsaW5rc1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChoZWFkZXIubGluaykge1xuICAgICAgICAgICAgdGhpcy5saW5rcyA9IHV0aWxzLnBhcnNlTGlua3MoaGVhZGVyLmxpbmspO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgIH1cbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gICAgdmFyIHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwO1xuXG4gICAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlO1xuXG4gICAgLy8gYmFzaWNzXG4gICAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICAgIHRoaXMub2sgPSAyID09IHR5cGU7XG4gICAgdGhpcy5yZWRpcmVjdCA9IDMgPT0gdHlwZTtcbiAgICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICAgIHRoaXMuc2VydmVyRXJyb3IgPSA1ID09IHR5cGU7XG4gICAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgICAgICA/IHRoaXMudG9FcnJvcigpXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAvLyBzdWdhclxuICAgIHRoaXMuYWNjZXB0ZWQgPSAyMDIgPT0gc3RhdHVzO1xuICAgIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cztcbiAgICB0aGlzLmJhZFJlcXVlc3QgPSA0MDAgPT0gc3RhdHVzO1xuICAgIHRoaXMudW5hdXRob3JpemVkID0gNDAxID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICAgIHRoaXMuZm9yYmlkZGVuID0gNDAzID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXNwb25zZS1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykucmVkdWNlKGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLyk7XG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgdmFyIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMaW5rIGhlYWRlciBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJzZUxpbmtzID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICosICovKS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgICB2YXIgdXJsID0gcGFydHNbMF0uc2xpY2UoMSwgLTEpO1xuICAgIHZhciByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gICAgb2JqW3JlbF0gPSB1cmw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIsIHNob3VsZFN0cmlwQ29va2llKXtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2hvc3QnXTtcbiAgaWYgKHNob3VsZFN0cmlwQ29va2llKSB7XG4gICAgZGVsZXRlIGhlYWRlclsnY29va2llJ107XG4gIH1cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBFUlJPUl9DT0RFUyA9IFtcbiAgJ0VDT05OUkVTRVQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VBRERSSU5GTycsXG4gICdFU09DS0VUVElNRURPVVQnXG5dO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHJlcXVlc3Qgc2hvdWxkIGJlIHJldHJpZWQuXG4gKiAoQm9ycm93ZWQgZnJvbSBzZWdtZW50aW8vc3VwZXJhZ2VudC1yZXRyeSlcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaG91bGRSZXRyeShlcnIsIHJlcykge1xuICBpZiAoZXJyICYmIGVyci5jb2RlICYmIH5FUlJPUl9DT0RFUy5pbmRleE9mKGVyci5jb2RlKSkgcmV0dXJuIHRydWU7XG4gIGlmIChyZXMgJiYgcmVzLnN0YXR1cyAmJiByZXMuc3RhdHVzID49IDUwMCkgcmV0dXJuIHRydWU7XG4gIC8vIFN1cGVyYWdlbnQgdGltZW91dFxuICBpZiAoZXJyICYmICd0aW1lb3V0JyBpbiBlcnIgJiYgZXJyLmNvZGUgPT0gJ0VDT05OQUJPUlRFRCcpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyICYmICdjcm9zc0RvbWFpbicgaW4gZXJyKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Nob3VsZC1yZXRyeS5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNi0yMDE3IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciB4bWxjcmVhdGVfMSA9IHJlcXVpcmUoXCJ4bWxjcmVhdGVcIik7XG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4vb3B0aW9uc1wiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqIFBhcnNlcyBhIHN0cmluZyBpbnRvIFhNTC5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gcGFyc2UgaW50byBYTUwuXG4gKiBAcGFyYW0gcGFyZW50RWxlbWVudCBUaGUgWE1MIGVsZW1lbnQgb3IgYXR0cmlidXRlIHRoYXQgd2lsbCBjb250YWluIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgc3RyaW5nLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgc3RyaW5nIGludG8gWE1MLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0ciwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciByZXF1aXJlc0NkYXRhID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgcmV0dXJuIChvcHRpb25zLmNkYXRhSW52YWxpZENoYXJzICYmIChzLmluZGV4T2YoXCI8XCIpICE9PSAtMVxuICAgICAgICAgICAgfHwgcy5pbmRleE9mKFwiJlwiKSAhPT0gLTEpKVxuICAgICAgICAgICAgfHwgb3B0aW9ucy5jZGF0YUtleXMuaW5kZXhPZihwYXJlbnRFbGVtZW50Lm5hbWUpICE9PSAtMVxuICAgICAgICAgICAgfHwgb3B0aW9ucy5jZGF0YUtleXMuaW5kZXhPZihcIipcIikgIT09IC0xO1xuICAgIH07XG4gICAgaWYgKHBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiB4bWxjcmVhdGVfMS5YbWxFbGVtZW50KSB7XG4gICAgICAgIGlmIChyZXF1aXJlc0NkYXRhKHN0cikpIHtcbiAgICAgICAgICAgIHZhciBjZGF0YVN0cnMgPSBzdHIuc3BsaXQoXCJdXT5cIik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNkYXRhU3Rycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlc0NkYXRhKGNkYXRhU3Ryc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jZGF0YShjZGF0YVN0cnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGFyRGF0YShjZGF0YVN0cnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA8IGNkYXRhU3Rycy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hhckRhdGEoXCJdXT5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGFyRGF0YShzdHIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBwYXJlbnRFbGVtZW50LnRleHQoc3RyKTtcbiAgICB9XG59XG4vKipcbiAqIFBhcnNlcyBhbiBhdHRyaWJ1dGUgaW50byBYTUwuXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IFRoZSBYTUwgZWxlbWVudCB0aGF0IHdpbGwgY29udGFpbiB0aGUgc3RyaW5nLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgYXR0cmlidXRlIGludG8gWE1MLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlKG5hbWUsIHZhbHVlLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGF0dHJpYnV0ZSA9IHBhcmVudEVsZW1lbnQuYXR0cmlidXRlKG5hbWUsIFwiXCIpO1xuICAgIGlmICh1dGlsc18xLmlzUHJpbWl0aXZlKHZhbHVlKSkge1xuICAgICAgICBwYXJzZVN0cmluZyh1dGlsc18xLnN0cmluZ2lmeSh2YWx1ZSksIGF0dHJpYnV0ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdHRyaWJ1dGUgdmFsdWUgZm9yIG5hbWUgJ1wiICsgbmFtZSArIFwiJyBzaG91bGQgYmUgYVwiXG4gICAgICAgICAgICArIFwiIHByaW1pdGl2ZSAoc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4sIG51bGwsIG9yXCJcbiAgICAgICAgICAgICsgXCIgdW5kZWZpbmVkKVwiKTtcbiAgICB9XG59XG4vKipcbiAqIFBhcnNlcyBhbiBvYmplY3Qgb3IgTWFwIGVudHJ5IGludG8gWE1MLlxuICpcbiAqIEBwYXJhbSBrZXkgVGhlIGtleSBhc3NvY2lhdGVkIHdpdGggdGhlIG9iamVjdCBvciBNYXAgZW50cnkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIG9iamVjdCBvciBtYXAgZW50cnkuXG4gKiBAcGFyYW0gcGFyZW50RWxlbWVudCBUaGUgWE1MIGVsZW1lbnQgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIG9iamVjdCBvciBtYXBcbiAqICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgb2JqZWN0IG9yIG1hcCBlbnRyeSBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZU9iamVjdE9yTWFwRW50cnkoa2V5LCB2YWx1ZSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIC8vIEFsaWFzIGtleVxuICAgIGlmIChrZXkgPT09IG9wdGlvbnMuYWxpYXNTdHJpbmcpIHtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWxpYXNTdHJpbmcgdmFsdWUgZm9yIFwiICsgdmFsdWVcbiAgICAgICAgICAgICAgICArIFwiIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnRFbGVtZW50Lm5hbWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBBdHRyaWJ1dGVzIGtleVxuICAgIGlmIChrZXkuaW5kZXhPZihvcHRpb25zLmF0dHJpYnV0ZVN0cmluZykgPT09IDApIHtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXModmFsdWUpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJrZXkgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgcGFyc2VBdHRyaWJ1dGUoc3Via2V5LCB2YWx1ZVtzdWJrZXldLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImF0dHJpYnV0ZXMgb2JqZWN0IGZvciBcIiArIGtleSArIFwiIHNob3VsZCBiZSBhblwiXG4gICAgICAgICAgICAgICAgKyBcIiBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBWYWx1ZSBrZXlcbiAgICBpZiAoa2V5LmluZGV4T2Yob3B0aW9ucy52YWx1ZVN0cmluZykgPT09IDApIHtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNQcmltaXRpdmUodmFsdWUpKSB7XG4gICAgICAgICAgICBwYXJzZVZhbHVlKGtleSwgdmFsdWUsIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmFsdWUgXCIgKyB2YWx1ZSArIFwiIHNob3VsZCBiZSBhIHByaW1pdGl2ZVwiXG4gICAgICAgICAgICAgICAgKyBcIiAoc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4sIG51bGwsIG9yIHVuZGVmaW5lZClcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU3RhbmRhcmQgaGFuZGxpbmcgKGNyZWF0ZSBuZXcgZWxlbWVudCBmb3IgZW50cnkpXG4gICAgdmFyIGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50O1xuICAgIGlmICghdXRpbHNfMS5pc0FycmF5KHZhbHVlKSAmJiAhdXRpbHNfMS5pc1NldCh2YWx1ZSkpIHtcbiAgICAgICAgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQuZWxlbWVudChrZXkpO1xuICAgIH1cbiAgICBwYXJzZVZhbHVlKGtleSwgdmFsdWUsIGVsZW1lbnQsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBQYXJzZXMgYW4gT2JqZWN0IG9yIE1hcCBpbnRvIFhNTC5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0T3JNYXAgVGhlIG9iamVjdCBvciBtYXAgdG8gcGFyc2UgaW50byBYTUwuXG4gKiBAcGFyYW0gcGFyZW50RWxlbWVudCBUaGUgWE1MIGVsZW1lbnQgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIG9iamVjdC5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIG9iamVjdCBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZU9iamVjdE9yTWFwKG9iamVjdE9yTWFwLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgaWYgKHV0aWxzXzEuaXNNYXAob2JqZWN0T3JNYXApKSB7XG4gICAgICAgIG9iamVjdE9yTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHBhcnNlT2JqZWN0T3JNYXBFbnRyeSh1dGlsc18xLnN0cmluZ2lmeShrZXkpLCB2YWx1ZSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKG9iamVjdE9yTWFwKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBfYVtfaV07XG4gICAgICAgICAgICBwYXJzZU9iamVjdE9yTWFwRW50cnkoa2V5LCBvYmplY3RPck1hcFtrZXldLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogUGFyc2VzIGFuIGFycmF5IG9yIFNldCBpbnRvIFhNTC5cbiAqXG4gKiBAcGFyYW0ga2V5IFRoZSBrZXkgYXNzb2NpYXRlZCB3aXRoIHRoZSBhcnJheSBvciBzZXQgdG8gcGFyc2UgaW50byBYTUwuXG4gKiBAcGFyYW0gYXJyYXlPclNldCBUaGUgYXJyYXkgb3Igc2V0IHRvIHBhcnNlIGludG8gWE1MLlxuICogQHBhcmFtIHBhcmVudEVsZW1lbnQgVGhlIFhNTCBlbGVtZW50IHRoYXQgd2lsbCBjb250YWluIHRoZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIGFycmF5IG9yIHNldCBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZUFycmF5T3JTZXQoa2V5LCBhcnJheU9yU2V0LCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGFycmF5TmFtZUZ1bmM7XG4gICAgaWYgKG9wdGlvbnMud3JhcEhhbmRsZXJzLmhhc093blByb3BlcnR5KFwiKlwiKSkge1xuICAgICAgICBhcnJheU5hbWVGdW5jID0gb3B0aW9ucy53cmFwSGFuZGxlcnNbXCIqXCJdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy53cmFwSGFuZGxlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBhcnJheU5hbWVGdW5jID0gb3B0aW9ucy53cmFwSGFuZGxlcnNba2V5XTtcbiAgICB9XG4gICAgdmFyIGFycmF5S2V5ID0ga2V5O1xuICAgIHZhciBhcnJheUVsZW1lbnQgPSBwYXJlbnRFbGVtZW50O1xuICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChhcnJheU5hbWVGdW5jKSkge1xuICAgICAgICB2YXIgYXJyYXlOYW1lRnVuY0tleSA9IGFycmF5TmFtZUZ1bmMoYXJyYXlLZXksIGFycmF5T3JTZXQpO1xuICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyhhcnJheU5hbWVGdW5jS2V5KSkge1xuICAgICAgICAgICAgYXJyYXlLZXkgPSBhcnJheU5hbWVGdW5jS2V5O1xuICAgICAgICAgICAgYXJyYXlFbGVtZW50ID0gcGFyZW50RWxlbWVudC5lbGVtZW50KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNOdWxsKGFycmF5TmFtZUZ1bmNLZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ3cmFwSGFuZGxlcnMgZnVuY3Rpb24gZm9yIFwiICsgYXJyYXlLZXlcbiAgICAgICAgICAgICAgICArIFwiIHNob3VsZCByZXR1cm4gYSBzdHJpbmcgb3IgbnVsbFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcnJheU9yU2V0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheUVsZW1lbnQ7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc0FycmF5KGl0ZW0pICYmICF1dGlsc18xLmlzU2V0KGl0ZW0pKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlFbGVtZW50LmVsZW1lbnQoYXJyYXlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnNlVmFsdWUoYXJyYXlLZXksIGl0ZW0sIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBQYXJzZXMgYW4gYXJiaXRyYXJ5IEphdmFTY3JpcHQgdmFsdWUgaW50byBYTUwuXG4gKlxuICogQHBhcmFtIGtleSBUaGUga2V5IGFzc29jaWF0ZWQgd2l0aCB0aGUgdmFsdWUgdG8gcGFyc2UgaW50byBYTUwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHBhcnNlIGludG8gWE1MLlxuICogQHBhcmFtIHBhcmVudEVsZW1lbnQgVGhlIFhNTCBlbGVtZW50IHRoYXQgd2lsbCBjb250YWluIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIHZhbHVlIGludG8gWE1MLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoa2V5LCB2YWx1ZSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIC8vIElmIGEgaGFuZGxlciBmb3IgYSBwYXJ0aWN1bGFyIHR5cGUgaXMgdXNlci1kZWZpbmVkLCB1c2UgdGhhdCBoYW5kbGVyXG4gICAgLy8gaW5zdGVhZCBvZiB0aGUgZGVmYXVsdHNcbiAgICB2YXIgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKG9wdGlvbnMudHlwZUhhbmRsZXJzLmhhc093blByb3BlcnR5KFwiKlwiKSkge1xuICAgICAgICBoYW5kbGVyID0gb3B0aW9ucy50eXBlSGFuZGxlcnNbXCIqXCJdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy50eXBlSGFuZGxlcnMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICAgICAgaGFuZGxlciA9IG9wdGlvbnMudHlwZUhhbmRsZXJzW3R5cGVdO1xuICAgIH1cbiAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoaGFuZGxlcikpIHtcbiAgICAgICAgdmFsdWUgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzXzEuaXNPYmplY3QodmFsdWUpIHx8IHV0aWxzXzEuaXNNYXAodmFsdWUpKSB7XG4gICAgICAgIHBhcnNlT2JqZWN0T3JNYXAodmFsdWUsIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh1dGlsc18xLmlzQXJyYXkodmFsdWUpIHx8IHV0aWxzXzEuaXNTZXQodmFsdWUpKSB7XG4gICAgICAgIHBhcnNlQXJyYXlPclNldChrZXksIHZhbHVlLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwYXJzZVN0cmluZyh1dGlsc18xLnN0cmluZ2lmeSh2YWx1ZSksIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgWE1MIGRvY3VtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gcm9vdCBUaGUgbmFtZSBvZiB0aGUgcm9vdCBYTUwgZWxlbWVudC4gV2hlbiB0aGUgdmFsdWUgaXMgY29udmVydGVkIHRvXG4gKiAgICAgICAgICAgICBYTUwsIGl0IHdpbGwgYmUgYSBjaGlsZCBvZiB0aGlzIHJvb3QgZWxlbWVudC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBYTUwuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBwYXJzaW5nIHRoZSB2YWx1ZSBpbnRvIFhNTC5cbiAqXG4gKiBAcmV0dXJucyBBbiBYTUwgZG9jdW1lbnQgY29ycmVzcG9uZGluZyB0byB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVG9Eb2N1bWVudChyb290LCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBkb2N1bWVudCA9IG5ldyB4bWxjcmVhdGVfMS5YbWxEb2N1bWVudChyb290KTtcbiAgICBpZiAob3B0aW9ucy5kZWNsYXJhdGlvbi5pbmNsdWRlKSB7XG4gICAgICAgIGRvY3VtZW50LmRlY2wob3B0aW9ucy5kZWNsYXJhdGlvbik7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmR0ZC5pbmNsdWRlKSB7XG4gICAgICAgIGRvY3VtZW50LmR0ZChvcHRpb25zLmR0ZC5uYW1lLCBvcHRpb25zLmR0ZC5zeXNJZCwgb3B0aW9ucy5kdGQucHViSWQpO1xuICAgIH1cbiAgICBwYXJzZVZhbHVlKHJvb3QsIHZhbHVlLCBkb2N1bWVudC5yb290KCksIG9wdGlvbnMpO1xuICAgIHJldHVybiBkb2N1bWVudDtcbn1cbi8qKlxuICogUmV0dXJucyBhIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHJvb3QgVGhlIG5hbWUgb2YgdGhlIHJvb3QgWE1MIGVsZW1lbnQuIFdoZW4gdGhlIG9iamVjdCBpcyBjb252ZXJ0ZWRcbiAqICAgICAgICAgICAgIHRvIFhNTCwgaXQgd2lsbCBiZSBhIGNoaWxkIG9mIHRoaXMgcm9vdCBlbGVtZW50LlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gWE1MLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgb2JqZWN0IGFuZCBmb3JtYXR0aW5nIHRoZSByZXN1bHRpbmdcbiAqICAgICAgICAgICAgICAgIFhNTC5cbiAqXG4gKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBwYXJzZShyb290LCBvYmplY3QsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3B0cyA9IG5ldyBvcHRpb25zXzEuT3B0aW9ucyhvcHRpb25zKTtcbiAgICB2YXIgZG9jdW1lbnQgPSBwYXJzZVRvRG9jdW1lbnQocm9vdCwgb2JqZWN0LCBvcHRzKTtcbiAgICByZXR1cm4gZG9jdW1lbnQudG9TdHJpbmcob3B0cy5mb3JtYXQpO1xufVxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanMyeG1scGFyc2VyL2xpYi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBYbWxBdHRyaWJ1dGVfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbEF0dHJpYnV0ZVwiKTtcbmV4cG9ydHMuWG1sQXR0cmlidXRlID0gWG1sQXR0cmlidXRlXzEuZGVmYXVsdDtcbnZhciBYbWxBdHRyaWJ1dGVUZXh0XzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxBdHRyaWJ1dGVUZXh0XCIpO1xuZXhwb3J0cy5YbWxBdHRyaWJ1dGVUZXh0ID0gWG1sQXR0cmlidXRlVGV4dF8xLmRlZmF1bHQ7XG52YXIgWG1sQ2RhdGFfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbENkYXRhXCIpO1xuZXhwb3J0cy5YbWxDZGF0YSA9IFhtbENkYXRhXzEuZGVmYXVsdDtcbnZhciBYbWxDaGFyRGF0YV8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sQ2hhckRhdGFcIik7XG5leHBvcnRzLlhtbENoYXJEYXRhID0gWG1sQ2hhckRhdGFfMS5kZWZhdWx0O1xudmFyIFhtbENoYXJSZWZfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbENoYXJSZWZcIik7XG5leHBvcnRzLlhtbENoYXJSZWYgPSBYbWxDaGFyUmVmXzEuZGVmYXVsdDtcbnZhciBYbWxDb21tZW50XzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxDb21tZW50XCIpO1xuZXhwb3J0cy5YbWxDb21tZW50ID0gWG1sQ29tbWVudF8xLmRlZmF1bHQ7XG52YXIgWG1sRGVjbF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRGVjbFwiKTtcbmV4cG9ydHMuWG1sRGVjbCA9IFhtbERlY2xfMS5kZWZhdWx0O1xudmFyIFhtbERvY3VtZW50XzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxEb2N1bWVudFwiKTtcbmV4cG9ydHMuWG1sRG9jdW1lbnQgPSBYbWxEb2N1bWVudF8xLmRlZmF1bHQ7XG52YXIgWG1sRHRkXzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxEdGRcIik7XG5leHBvcnRzLlhtbER0ZCA9IFhtbER0ZF8xLmRlZmF1bHQ7XG52YXIgWG1sRHRkQXR0bGlzdF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRHRkQXR0bGlzdFwiKTtcbmV4cG9ydHMuWG1sRHRkQXR0bGlzdCA9IFhtbER0ZEF0dGxpc3RfMS5kZWZhdWx0O1xudmFyIFhtbER0ZEVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbER0ZEVsZW1lbnRcIik7XG5leHBvcnRzLlhtbER0ZEVsZW1lbnQgPSBYbWxEdGRFbGVtZW50XzEuZGVmYXVsdDtcbnZhciBYbWxEdGRFbnRpdHlfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbER0ZEVudGl0eVwiKTtcbmV4cG9ydHMuWG1sRHRkRW50aXR5ID0gWG1sRHRkRW50aXR5XzEuZGVmYXVsdDtcbnZhciBYbWxEdGROb3RhdGlvbl8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRHRkTm90YXRpb25cIik7XG5leHBvcnRzLlhtbER0ZE5vdGF0aW9uID0gWG1sRHRkTm90YXRpb25fMS5kZWZhdWx0O1xudmFyIFhtbER0ZFBhcmFtRW50aXR5UmVmXzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxEdGRQYXJhbUVudGl0eVJlZlwiKTtcbmV4cG9ydHMuWG1sRHRkUGFyYW1FbnRpdHlSZWYgPSBYbWxEdGRQYXJhbUVudGl0eVJlZl8xLmRlZmF1bHQ7XG52YXIgWG1sRWxlbWVudF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRWxlbWVudFwiKTtcbmV4cG9ydHMuWG1sRWxlbWVudCA9IFhtbEVsZW1lbnRfMS5kZWZhdWx0O1xudmFyIFhtbEVudGl0eVJlZl8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRW50aXR5UmVmXCIpO1xuZXhwb3J0cy5YbWxFbnRpdHlSZWYgPSBYbWxFbnRpdHlSZWZfMS5kZWZhdWx0O1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbE5vZGVcIik7XG5leHBvcnRzLlhtbE5vZGUgPSBYbWxOb2RlXzEuZGVmYXVsdDtcbnZhciBYbWxQcm9jSW5zdF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sUHJvY0luc3RcIik7XG5leHBvcnRzLlhtbFByb2NJbnN0ID0gWG1sUHJvY0luc3RfMS5kZWZhdWx0O1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFhNTCBkb2N1bWVudC5cbiAqXG4gKiBAcGFyYW0gcm9vdCBUaGUgbmFtZSBvZiB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBkb2N1bWVudC5cbiAqXG4gKiBAcmV0dXJucyBUaGUgbmV3IFhNTCBkb2N1bWVudC5cbiAqL1xuZnVuY3Rpb24gZG9jdW1lbnQocm9vdCkge1xuICAgIHJldHVybiBuZXcgWG1sRG9jdW1lbnRfMS5kZWZhdWx0KHJvb3QpO1xufVxuZXhwb3J0cy5kb2N1bWVudCA9IGRvY3VtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9vcHRpb25zXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgWG1sQ29tbWVudF8xID0gcmVxdWlyZShcIi4vWG1sQ29tbWVudFwiKTtcbnZhciBYbWxEZWNsXzEgPSByZXF1aXJlKFwiLi9YbWxEZWNsXCIpO1xudmFyIFhtbER0ZF8xID0gcmVxdWlyZShcIi4vWG1sRHRkXCIpO1xudmFyIFhtbEVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuL1htbEVsZW1lbnRcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbnZhciBYbWxQcm9jSW5zdF8xID0gcmVxdWlyZShcIi4vWG1sUHJvY0luc3RcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIGRvY3VtZW50LlxuICpcbiAqIEEgc2FtcGxlIFhNTCBkb2N1bWVudCBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3M6XG4gKlxuICogYGBgeG1sXG4gKiA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz5cbiAqIDxET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFN0cmljdC8vRU5cIlxuICogICAgICAgICAgICAgICAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS1zdHJpY3QuZHRkXCI+XG4gKiA8aHRtbD5cbiAqICAgICA8aGVhZD5cbiAqICAgICAgICAgPHRpdGxlPk15IHBhZ2UgdGl0bGU8L3RpdGxlPlxuICogICAgIDwvaGVhZD5cbiAqICAgICA8Ym9keT5cbiAqICAgICAgICAgPGgxPldlbGNvbWUhPC9oMT5cbiAqICAgICAgICAgPHA+SSBob3BlIHlvdSBlbmpveSB2aXNpdGluZyBteSB3ZWJzaXRlLjwvcD5cbiAqICAgICAgICAgPGltZyBzcmM9XCJwaWN0dXJlLnBuZ1wiLz5cbiAqICAgICA8L2JvZHk+XG4gKiA8L2h0bWw+XG4gKiBgYGBcbiAqXG4gKiBFYWNoIGNvbXBvbmVudCBvZiB0aGUgZG9jdW1lbnQsIHN1Y2ggYXMgdGhlIFhNTCBkZWNsYXJhdGlvbiwgZG9jdW1lbnQgdHlwZVxuICogZGVmaW5pdGlvbiwgYW5kIHJvb3QgZWxlbWVudCwgYXJlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxEb2N1bWVudCBub2RlcyBtdXN0IGhhdmUgZXhhY3RseSBvbmUge0BsaW5rIFhtbEVsZW1lbnR9IGNoaWxkLCB3aGljaCBpc1xuICogdGhlIGRvY3VtZW50J3Mgcm9vdCBlbGVtZW50LlxuICpcbiAqIFhtbERvY3VtZW50IG5vZGVzIGNhbiBoYXZlIGV4YWN0bHkgb25lIHtAbGluayBYbWxEZWNsfSBhbmQge0BsaW5rIFhtbER0ZH1cbiAqIGNoaWxkIGluIHRoYXQgb3JkZXIsIHNvIGxvbmcgYXMgdGhleSBwcmVjZWRlIHRoZSB7QGxpbmsgWG1sRWxlbWVudH0gbm9kZS5cbiAqXG4gKiBYbWxEb2N1bWVudCBub2RlcyBjYW4gaGF2ZSBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIHtAbGluayBYbWxDb21tZW50fSBvclxuICoge0BsaW5rIFhtbFByb2NJbnN0fSBub2Rlcywgc28gbG9uZyBhcyB0aGV5IGZvbGxvdyB0aGUge0BsaW5rIFhtbERlY2x9IG5vZGUsXG4gKiBpZiBvbmUgZXhpc3RzLlxuICovXG52YXIgWG1sRG9jdW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEb2N1bWVudCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbERvY3VtZW50fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByb290IFRoZSBuYW1lIG9mIHRoZSByb290IGVsZW1lbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sRG9jdW1lbnQocm9vdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmluc2VydENoaWxkLmNhbGwoX3RoaXMsIG5ldyBYbWxFbGVtZW50XzEuZGVmYXVsdChyb290KSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBjb21tZW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZCxcbiAgICAgKiB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIGNvbW1lbnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGVsZW1lbnQuXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7IH1cbiAgICAgICAgdmFyIGNvbW1lbnQgPSBuZXcgWG1sQ29tbWVudF8xLmRlZmF1bHQoY29udGVudCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoY29tbWVudCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY29tbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgWE1MIGRlY2xhcmF0aW9uIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBYbWxEb2N1bWVudC5wcm90b3R5cGUuZGVjbCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IG5ldyBYbWxEZWNsXzEuZGVmYXVsdChvcHRpb25zKTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChkZWNsYXJhdGlvbiwgMCk7XG4gICAgICAgIHJldHVybiBkZWNsYXJhdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgWE1MIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbi4gVW5sZXNzIGEgZGlmZmVyZW50IGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBpbW1lZGlhdGVseSBhZnRlciB0aGUgWE1MIGRlY2xhcmF0aW9uXG4gICAgICogaWYgb25lIGV4aXN0cywgb3IgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbiBpZiBvbmUgZG9lc1xuICAgICAqIG5vdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBEVEQuXG4gICAgICogQHBhcmFtIHN5c0lkIFRoZSBzeXN0ZW0gaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAqIEBwYXJhbSBwdWJJZCBUaGUgcHVibGljIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgKiAgICAgICAgICAgICAgSWYgYSBwdWJsaWMgaWRlbnRpZmllciBpcyBwcm92aWRlZCwgYSBzeXN0ZW0gaWRlbnRpZmllclxuICAgICAqICAgICAgICAgICAgICBtdXN0IGJlIHByb3ZpZGVkIGFzIHdlbGwuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlXG4gICAgICogICAgICAgICAgICAgIFhNTCBkZWNsYXJhdGlvbiBpZiBvbmUgZXhpc3RzLCBvciBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuIGlmIG9uZSBkb2VzIG5vdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIFhNTCBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLmR0ZCA9IGZ1bmN0aW9uIChuYW1lLCBzeXNJZCwgcHViSWQsIGluZGV4KSB7XG4gICAgICAgIHZhciBkdGQgPSBuZXcgWG1sRHRkXzEuZGVmYXVsdChuYW1lLCBzeXNJZCwgcHViSWQpO1xuICAgICAgICBpZiAodXRpbHNfMS5pc1VuZGVmaW5lZChpbmRleCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlblswXSBpbnN0YW5jZW9mIFhtbERlY2xfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoZHRkLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBkdGQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuIGF0IHRoZSBzcGVjaWZpZWRcbiAgICAgKiBpbmRleC4gVGhlIG5vZGUgaXMgbm90IGluc2VydGVkIGlmIGl0IGlzIGFscmVhZHkgcHJlc2VudC4gSWYgdGhpcyBub2RlXG4gICAgICogYWxyZWFkeSBoYXMgYSBwYXJlbnQsIGl0IGlzIHJlbW92ZWQgZnJvbSB0aGF0IHBhcmVudC5cbiAgICAgKlxuICAgICAqIE9ubHkge0BsaW5rIFhtbENvbW1lbnR9LCB7QGxpbmsgWG1sRGVjbH0sIHtAbGluayBYbWxEdGR9LCBvclxuICAgICAqIHtAbGluayBYbWxQcm9jSW5zdH0gbm9kZXMgY2FuIGJlIGluc2VydGVkLiBGdXJ0aGVybW9yZSwge0BsaW5rIFhtbERlY2x9XG4gICAgICogYW5kIHtAbGluayBYbWxEdGR9IG5vZGVzIG11c3QgYmUgaW5zZXJ0ZWQgaW4gdGhhdCBvcmRlciBhbmQgbXVzdFxuICAgICAqIHByZWNlZGUgdGhlIHtAbGluayBYbWxFbGVtZW50fSBub2RlLiBJbiBhZGRpdGlvbiwge0BsaW5rIFhtbENvbW1lbnR9IG9yXG4gICAgICoge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBtdXN0IGZvbGxvdyB0aGUge0BsaW5rIFhtbERlY2x9IG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIG5vZGUuIE5vZGVzIGF0IG9yIGFmdGVyXG4gICAgICogICAgICAgICAgICAgIHRoZSBpbmRleCBhcmUgc2hpZnRlZCB0byB0aGUgcmlnaHQuIElmIG5vIGluZGV4IGlzXG4gICAgICogICAgICAgICAgICAgIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIGluc2VydGVkIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4sIG9yIHVuZGVmaW5lZCBpZiBub1xuICAgICAqICAgICAgICAgIG5vZGUgd2FzIGluc2VydGVkLlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgfVxuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sQ29tbWVudF8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxEZWNsXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbER0ZF8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxQcm9jSW5zdF8xLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibm9kZSBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2ZcIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sQ29tbWVudCwgWG1sRGVjbCwgWG1sRHRkLCBvclwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxQcm9jSW5zdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFhtbENvbW1lbnRfMS5kZWZhdWx0IHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxQcm9jSW5zdF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlblswXSBpbnN0YW5jZW9mIFhtbERlY2xfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENvbW1lbnQgb3IgWG1sUHJvY0luc3Qgbm9kZSBzaG91bGQgYmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiBpbnNlcnRlZCBhZnRlciB0aGUgWG1sRGVjbCBub2RlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgWG1sRGVjbF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlblswXSBpbnN0YW5jZW9mIFhtbERlY2xfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRG9jdW1lbnQgbm9kZSBzaG91bGQgb25seSBjb250YWluIG9uZVwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgWG1sRGVjbCBub2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRGVjbCBub2RlIHNob3VsZCBiZSBpbnNlcnRlZCBhdCB0aGVcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGJlZ2lubmluZyBvZiBhbiBYbWxEb2N1bWVudCBub2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBYbWxEdGRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBYbWxEZWNsXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGQgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQgYWZ0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB0aGUgWG1sRGVjbCBub2RlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgaSA8IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuW2ldIGluc3RhbmNlb2YgWG1sRWxlbWVudF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkIGJlZm9yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIHRoZSBYbWxFbGVtZW50IG5vZGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX2NoaWxkcmVuOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBYbWxEdGRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERvY3VtZW50IG5vZGUgc2hvdWxkIG9ubHkgY29udGFpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIG9uZSBYbWxEdGQgbm9kZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQuY2FsbCh0aGlzLCBub2RlLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXhcbiAgICAgKiBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIG9yIHVuZGVmaW5lZCBpZlxuICAgICAqICAgICAgICAgICAgICAgIHRoZXJlIGlzIG5vIHRhcmdldC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgKi9cbiAgICBYbWxEb2N1bWVudC5wcm90b3R5cGUucHJvY0luc3QgPSBmdW5jdGlvbiAodGFyZ2V0LCBjb250ZW50LCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgfVxuICAgICAgICB2YXIgcHJvY0luc3QgPSBuZXcgWG1sUHJvY0luc3RfMS5kZWZhdWx0KHRhcmdldCwgY29udGVudCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQocHJvY0luc3QsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHByb2NJbnN0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIG5vZGUgZnJvbSB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB7QGxpbmsgWG1sRWxlbWVudH0gbm9kZXMgY2Fubm90IGJlIHJlbW92ZWQgZnJvbSB0aGlzIG5vZGU7XG4gICAgICogYXR0ZW1wdHMgdG8gZG8gc28gd2lsbCByZXN1bHQgaW4gYW4gZXhjZXB0aW9uIGJlaW5nIHRocm93bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgYSBub2RlIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWG1sRWxlbWVudF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEVsZW1lbnQgbm9kZXMgY2Fubm90IGJlIHJlbW92ZWQgZnJvbVwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxEb2N1bWVudCBub2Rlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZC5jYWxsKHRoaXMsIG5vZGUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbm9kZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQge0BsaW5rIFhtbEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBiZSByZW1vdmVkIGZyb20gdGhpcyBub2RlO1xuICAgICAqIGF0dGVtcHRzIHRvIGRvIHNvIHdpbGwgcmVzdWx0IGluIGFuIGV4Y2VwdGlvbiBiZWluZyB0aHJvd24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHRvIGJlIHJlbW92ZWQgaXNcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIHRoYXQgd2FzIHJlbW92ZWQsIG9yIHVuZGVmaW5lZCBpZiBubyBub2RlIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuW2luZGV4XSBpbnN0YW5jZW9mIFhtbEVsZW1lbnRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxFbGVtZW50IG5vZGVzIGNhbm5vdCBiZSByZW1vdmVkIGZyb21cIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sRG9jdW1lbnQgbm9kZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4LmNhbGwodGhpcywgaW5kZXgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgZG9jdW1lbnQuXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLnJvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9jaGlsZHJlbjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBYbWxFbGVtZW50XzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERvY3VtZW50IGRvZXMgbm90IGNvbnRhaW4gYSByb290IG5vZGVcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtJU3RyaW5nT3B0aW9uc30gW29wdGlvbnNdIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZ1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIG9wdGlvbnNPYmogPSBuZXcgb3B0aW9uc18xLlN0cmluZ09wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHZhciBzdHIgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fY2hpbGRyZW47IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IF9hW19pXTtcbiAgICAgICAgICAgIHN0ciArPSBub2RlLnRvU3RyaW5nKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmoucHJldHR5KSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IG9wdGlvbnNPYmoubmV3bGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuID0gc3RyLmxlbmd0aCAtIG9wdGlvbnNPYmoubmV3bGluZS5sZW5ndGg7XG4gICAgICAgIGlmIChzdHIuc3Vic3RyKGxlbikgPT09IG9wdGlvbnNPYmoubmV3bGluZSkge1xuICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cigwLCBsZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRG9jdW1lbnQ7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxEb2N1bWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRG9jdW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblwidXNlIHN0cmljdFwiO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIElPcHRpb25zIGludGVyZmFjZSB1c2VkIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXNcbiAqIHRvIGZpZWxkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgT3B0aW9ucyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHRoaXMuYWxpYXNTdHJpbmcgPSBcIj1cIjtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVTdHJpbmcgPSBcIkBcIjtcbiAgICAgICAgdGhpcy5jZGF0YUludmFsaWRDaGFycyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkYXRhS2V5cyA9IFtdO1xuICAgICAgICB0aGlzLnZhbHVlU3RyaW5nID0gXCIjXCI7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMgc2hvdWxkIGJlIGFuIE9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKG9wdGlvbnMuYWxpYXNTdHJpbmcpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQob3B0aW9ucy5hbGlhc1N0cmluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5hbGlhc1N0cmluZyBzaG91bGQgYmUgYSBzdHJpbmcgb3JcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWxpYXNTdHJpbmcgPSBvcHRpb25zLmFsaWFzU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhvcHRpb25zLmF0dHJpYnV0ZVN0cmluZykpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChvcHRpb25zLmF0dHJpYnV0ZVN0cmluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5hdHRyaWJ1dGVTdHJpbmcgc2hvdWxkIGJlIGEgc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZVN0cmluZyA9IG9wdGlvbnMuYXR0cmlidXRlU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc0Jvb2xlYW4ob3B0aW9ucy5jZGF0YUludmFsaWRDaGFycykpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChvcHRpb25zLmNkYXRhSW52YWxpZENoYXJzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmNkYXRhSW52YWxpZENoYXJzIHNob3VsZCBiZSBhXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBib29sZWFuIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2RhdGFJbnZhbGlkQ2hhcnMgPSBvcHRpb25zLmNkYXRhSW52YWxpZENoYXJzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZ0FycmF5KG9wdGlvbnMuY2RhdGFLZXlzKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKG9wdGlvbnMuY2RhdGFLZXlzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmNkYXRhS2V5cyBzaG91bGQgYmUgYW4gQXJyYXkgb3JcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2RhdGFLZXlzID0gb3B0aW9ucy5jZGF0YUtleXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWNsYXJhdGlvbiA9IG5ldyBEZWNsYXJhdGlvbk9wdGlvbnMob3B0aW9ucy5kZWNsYXJhdGlvbik7XG4gICAgICAgIHRoaXMuZHRkID0gbmV3IER0ZE9wdGlvbnMob3B0aW9ucy5kdGQpO1xuICAgICAgICB0aGlzLmZvcm1hdCA9IG5ldyBGb3JtYXRPcHRpb25zKG9wdGlvbnMuZm9ybWF0KTtcbiAgICAgICAgdGhpcy50eXBlSGFuZGxlcnMgPSBuZXcgVHlwZUhhbmRsZXJzKG9wdGlvbnMudHlwZUhhbmRsZXJzKTtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKG9wdGlvbnMudmFsdWVTdHJpbmcpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQob3B0aW9ucy52YWx1ZVN0cmluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy52YWx1ZVN0cmluZyBzaG91bGQgYmUgYSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVTdHJpbmcgPSBvcHRpb25zLnZhbHVlU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JhcEhhbmRsZXJzID0gbmV3IFdyYXBIYW5kbGVycyhvcHRpb25zLndyYXBIYW5kbGVycyk7XG4gICAgfVxuICAgIHJldHVybiBPcHRpb25zO1xufSgpKTtcbmV4cG9ydHMuT3B0aW9ucyA9IE9wdGlvbnM7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJRGVjbGFyYXRpb25PcHRpb25zIGludGVyZmFjZSB1c2VkIHRvIHByb3ZpZGUgZGVmYXVsdFxuICogdmFsdWVzIHRvIGZpZWxkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgRGVjbGFyYXRpb25PcHRpb25zID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWNsYXJhdGlvbk9wdGlvbnMoZGVjbGFyYXRpb25PcHRpb25zKSB7XG4gICAgICAgIGlmIChkZWNsYXJhdGlvbk9wdGlvbnMgPT09IHZvaWQgMCkgeyBkZWNsYXJhdGlvbk9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmluY2x1ZGUgPSB0cnVlO1xuICAgICAgICBpZiAoIXV0aWxzXzEuaXNPYmplY3QoZGVjbGFyYXRpb25PcHRpb25zKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuZGVjbGFyYXRpb24gc2hvdWxkIGJlIGFuIE9iamVjdCBvclwiXG4gICAgICAgICAgICAgICAgKyBcIiB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihkZWNsYXJhdGlvbk9wdGlvbnMuaW5jbHVkZSkpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChkZWNsYXJhdGlvbk9wdGlvbnMuaW5jbHVkZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5kZWNsYXJhdGlvbi5pbmNsdWRlIHNob3VsZCBiZSBhXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBib29sZWFuIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jbHVkZSA9IGRlY2xhcmF0aW9uT3B0aW9ucy5pbmNsdWRlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXRpb24gcGVyZm9ybWVkIGJ5IHhtbGNyZWF0ZVxuICAgICAgICB0aGlzLmVuY29kaW5nID0gZGVjbGFyYXRpb25PcHRpb25zLmVuY29kaW5nO1xuICAgICAgICB0aGlzLnN0YW5kYWxvbmUgPSBkZWNsYXJhdGlvbk9wdGlvbnMuc3RhbmRhbG9uZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gZGVjbGFyYXRpb25PcHRpb25zLnZlcnNpb247XG4gICAgfVxuICAgIHJldHVybiBEZWNsYXJhdGlvbk9wdGlvbnM7XG59KCkpO1xuZXhwb3J0cy5EZWNsYXJhdGlvbk9wdGlvbnMgPSBEZWNsYXJhdGlvbk9wdGlvbnM7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJRHRkT3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIER0ZE9wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIER0ZE9wdGlvbnMoZHRkT3B0aW9ucykge1xuICAgICAgICBpZiAoZHRkT3B0aW9ucyA9PT0gdm9pZCAwKSB7IGR0ZE9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmluY2x1ZGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KGR0ZE9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5kdGQgc2hvdWxkIGJlIGFuIE9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihkdGRPcHRpb25zLmluY2x1ZGUpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZHRkT3B0aW9ucy5pbmNsdWRlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmR0ZC5pbmNsdWRlIHNob3VsZCBiZSBhIGJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jbHVkZSA9IGR0ZE9wdGlvbnMuaW5jbHVkZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGF0aW9uIHBlcmZvcm1lZCBieSB4bWxjcmVhdGVcbiAgICAgICAgdGhpcy5uYW1lID0gZHRkT3B0aW9ucy5uYW1lO1xuICAgICAgICB0aGlzLnN5c0lkID0gZHRkT3B0aW9ucy5zeXNJZDtcbiAgICAgICAgdGhpcy5wdWJJZCA9IGR0ZE9wdGlvbnMucHViSWQ7XG4gICAgfVxuICAgIHJldHVybiBEdGRPcHRpb25zO1xufSgpKTtcbmV4cG9ydHMuRHRkT3B0aW9ucyA9IER0ZE9wdGlvbnM7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJRm9ybWF0T3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIEZvcm1hdE9wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZvcm1hdE9wdGlvbnMoZm9ybWF0T3B0aW9ucykge1xuICAgICAgICBpZiAoZm9ybWF0T3B0aW9ucyA9PT0gdm9pZCAwKSB7IGZvcm1hdE9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNPYmplY3QoZm9ybWF0T3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmZvcm1hdCBzaG91bGQgYmUgYW4gT2JqZWN0IG9yXCJcbiAgICAgICAgICAgICAgICArIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGF0aW9uIHBlcmZvcm1lZCBieSB4bWxjcmVhdGVcbiAgICAgICAgdGhpcy5kb3VibGVRdW90ZXMgPSBmb3JtYXRPcHRpb25zLmRvdWJsZVF1b3RlcztcbiAgICAgICAgdGhpcy5pbmRlbnQgPSBmb3JtYXRPcHRpb25zLmluZGVudDtcbiAgICAgICAgdGhpcy5uZXdsaW5lID0gZm9ybWF0T3B0aW9ucy5uZXdsaW5lO1xuICAgICAgICB0aGlzLnByZXR0eSA9IGZvcm1hdE9wdGlvbnMucHJldHR5O1xuICAgIH1cbiAgICByZXR1cm4gRm9ybWF0T3B0aW9ucztcbn0oKSk7XG5leHBvcnRzLkZvcm1hdE9wdGlvbnMgPSBGb3JtYXRPcHRpb25zO1xuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSVR5cGVIYW5kbGVycyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIFR5cGVIYW5kbGVycyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHlwZUhhbmRsZXJzKHR5cGVIYW5kbGVycykge1xuICAgICAgICBpZiAodHlwZUhhbmRsZXJzID09PSB2b2lkIDApIHsgdHlwZUhhbmRsZXJzID0ge307IH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KHR5cGVIYW5kbGVycykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLnR5cGVIYW5kbGVycyBzaG91bGQgYmUgYW4gT2JqZWN0IG9yXCJcbiAgICAgICAgICAgICAgICArIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdHlwZUhhbmRsZXJzKSB7XG4gICAgICAgICAgICBpZiAodHlwZUhhbmRsZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNGdW5jdGlvbih0eXBlSGFuZGxlcnNba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMudHlwZUhhbmRsZXJzWydcIiArIGtleSArIFwiJ11cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBzaG91bGQgYmUgYSBGdW5jdGlvblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHR5cGVIYW5kbGVyc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gVHlwZUhhbmRsZXJzO1xufSgpKTtcbmV4cG9ydHMuVHlwZUhhbmRsZXJzID0gVHlwZUhhbmRsZXJzO1xuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSVdyYXBIYW5kbGVycyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIFdyYXBIYW5kbGVycyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV3JhcEhhbmRsZXJzKHdyYXBIYW5kbGVycykge1xuICAgICAgICBpZiAod3JhcEhhbmRsZXJzID09PSB2b2lkIDApIHsgd3JhcEhhbmRsZXJzID0ge307IH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KHdyYXBIYW5kbGVycykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLndyYXBIYW5kbGVycyBzaG91bGQgYmUgYW4gT2JqZWN0IG9yXCJcbiAgICAgICAgICAgICAgICArIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gd3JhcEhhbmRsZXJzKSB7XG4gICAgICAgICAgICBpZiAod3JhcEhhbmRsZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNGdW5jdGlvbih3cmFwSGFuZGxlcnNba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMud3JhcEhhbmRsZXJzWydcIiArIGtleSArIFwiJ11cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBzaG91bGQgYmUgYSBGdW5jdGlvblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHdyYXBIYW5kbGVyc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gV3JhcEhhbmRsZXJzO1xufSgpKTtcbmV4cG9ydHMuV3JhcEhhbmRsZXJzID0gV3JhcEhhbmRsZXJzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanMyeG1scGFyc2VyL2xpYi9vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBzcGxpdFdvcmQgPSAob3JpZ2luYWw6IHN0cmluZykgPT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgd2hpbGUoaW5kZXggPCBvcmlnaW5hbC5sZW5ndGgpe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gb3JpZ2luYWwuc3Vic3RyaW5nKGluZGV4LCBpbmRleCsxKTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IEVzY2FwZVNlcXVlbmNlTWFwID0ge1xuICAgIFwiOlwiOiBcIiUzQVwiLFxuICAgIFwiL1wiOiBcIiUyRlwiLFxuICAgIFwiIFwiOiBcIiUyMFwiLFxuICAgIFwiJFwiOiBcIiUyNFwiLFxuICAgIFwiXFxcXFwiOiBcIiU1Q1wiLFxufTtcblxuY29uc3QgcmV2ZXJzZU1hcCA9IChtYXApID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgcmVzdWx0W21hcFtrZXldXSA9IGtleTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IEVuY29kZSA9IChvcmlnaW5hbDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHJlc3VsdEFycmF5ID0gc3BsaXRXb3JkKG9yaWdpbmFsKTtcbiAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5Lm1hcCgoY2hhcmFjdGVyKSA9PiB7XG4gICAgICAgIGlmKEVzY2FwZVNlcXVlbmNlTWFwW2NoYXJhY3Rlcl0pe1xuICAgICAgICAgICAgcmV0dXJuIEVzY2FwZVNlcXVlbmNlTWFwW2NoYXJhY3Rlcl07XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRBcnJheS5qb2luKFwiXCIpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgY29uc3QgRGVjb2RlID0gKG9yaWdpbmFsOiBzdHJpbmcpID0+IHtcbiAgICBsZXQgaW5kZXggPSAtMjtcbiAgICBjb25zdCBSZXZlcnNlU2VxdWVuY2VNYXAgPSByZXZlcnNlTWFwKEVzY2FwZVNlcXVlbmNlTWFwKTtcbiAgICBsZXQgc2VudGVuY2UgPSBvcmlnaW5hbDtcbiAgICB3aGlsZShpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgaW5kZXggPSBzZW50ZW5jZS5pbmRleE9mKFwiJVwiKTtcbiAgICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gc2VudGVuY2Uuc3Vic3RyaW5nKGluZGV4LCBpbmRleCs1KTtcbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IHNlbnRlbmNlLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IHNlbnRlbmNlLnN1YnN0cmluZyhpbmRleCs1KTtcbiAgICAgICAgICAgIHNlbnRlbmNlID0gYmVmb3JlICsgUmV2ZXJzZVNlcXVlbmNlTWFwW3RhcmdldF0gKyBhZnRlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VudGVuY2U7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5IHtcbiAgICBmb3JtYXQ/OiBzdHJpbmcsXG4gICAgZXhwYW5kPzogc3RyaW5nLFxuICAgIHNlbGVjdD86IHN0cmluZyxcbiAgICBvcmRlcmJ5Pzogc3RyaW5nLFxuICAgIHRvcD86IHN0cmluZyxcbiAgICBza2lwPzogc3RyaW5nLFxuICAgIGZpbHRlcj86IHN0cmluZ1tdLFxuICAgIGlubGluZWNvdW50Pzogc3RyaW5nLFxuICAgIHE/OiBzdHJpbmcsXG59XG5cbmNvbnN0IEFORCA9IFwiIGFuZCBcIjtcblxuLy8gVE9ETyDjgY3jgaHjgpPjgajmlbTnkIbjgZnjgotcbmV4cG9ydCBjb25zdCBjb252ZXJ0UXVlcmllZFVybCA9ICh1cmw6IHN0cmluZywgcXVlcnk6IFF1ZXJ5KTogc3RyaW5nID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gdXJsICsgXCI/XCI7XG4gICAgaWYocXVlcnkuZmlsdGVyICYmIHF1ZXJ5LmZpbHRlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBxdWVyeS5maWx0ZXI7XG4gICAgICAgIHJlc3VsdCArPSBFbmNvZGUoXCIkZmlsdGVyPVwiKTtcbiAgICAgICAgZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpPT57XG4gICAgICAgICAgICByZXN1bHQgKz0gRW5jb2RlKGZpbHRlcik7XG4gICAgICAgICAgICByZXN1bHQgKz0gQU5EO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cmluZygwLCByZXN1bHQubGFzdEluZGV4T2YoQU5EKSkgKyBcIiZcIjtcbiAgICB9ZWxzZSBpZihxdWVyeS50b3ApIHtcbiAgICAgICAgY29uc3QgdG9wID0gcXVlcnkudG9wO1xuICAgICAgICByZXN1bHQgKz0gRW5jb2RlKFwiJHRvcD1cIiArIHRvcCkgKyBcIiZcIjtcbiAgICB9ZWxzZSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHF1ZXJ5KS5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgICAgICByZXN1bHQgKz0gRW5jb2RlKGtleSkgKyBcIj1cIiArIEVuY29kZShxdWVyeVtrZXldKSArIFwiJlwiO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxpdHkudHMiLCIvKiFcbiAqIEBvdmVydmlldyBlczYtcHJvbWlzZSAtIGEgdGlueSBpbXBsZW1lbnRhdGlvbiBvZiBQcm9taXNlcy9BKy5cbiAqIEBjb3B5cmlnaHQgQ29weXJpZ2h0IChjKSAyMDE0IFllaHVkYSBLYXR6LCBUb20gRGFsZSwgU3RlZmFuIFBlbm5lciBhbmQgY29udHJpYnV0b3JzIChDb252ZXJzaW9uIHRvIEVTNiBBUEkgYnkgSmFrZSBBcmNoaWJhbGQpXG4gKiBAbGljZW5zZSAgIExpY2Vuc2VkIHVuZGVyIE1JVCBsaWNlbnNlXG4gKiAgICAgICAgICAgIFNlZSBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vc3RlZmFucGVubmVyL2VzNi1wcm9taXNlL21hc3Rlci9MSUNFTlNFXG4gKiBAdmVyc2lvbiAgIDQuMS4xXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLkVTNlByb21pc2UgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB4O1xuICByZXR1cm4geCAhPT0gbnVsbCAmJiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbnZhciBfaXNBcnJheSA9IHVuZGVmaW5lZDtcbmlmIChBcnJheS5pc0FycmF5KSB7XG4gIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbn0gZWxzZSB7XG4gIF9pc0FycmF5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xufVxuXG52YXIgaXNBcnJheSA9IF9pc0FycmF5O1xuXG52YXIgbGVuID0gMDtcbnZhciB2ZXJ0eE5leHQgPSB1bmRlZmluZWQ7XG52YXIgY3VzdG9tU2NoZWR1bGVyRm4gPSB1bmRlZmluZWQ7XG5cbnZhciBhc2FwID0gZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gIHF1ZXVlW2xlbl0gPSBjYWxsYmFjaztcbiAgcXVldWVbbGVuICsgMV0gPSBhcmc7XG4gIGxlbiArPSAyO1xuICBpZiAobGVuID09PSAyKSB7XG4gICAgLy8gSWYgbGVuIGlzIDIsIHRoYXQgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIHNjaGVkdWxlIGFuIGFzeW5jIGZsdXNoLlxuICAgIC8vIElmIGFkZGl0aW9uYWwgY2FsbGJhY2tzIGFyZSBxdWV1ZWQgYmVmb3JlIHRoZSBxdWV1ZSBpcyBmbHVzaGVkLCB0aGV5XG4gICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYnkgdGhpcyBmbHVzaCB0aGF0IHdlIGFyZSBzY2hlZHVsaW5nLlxuICAgIGlmIChjdXN0b21TY2hlZHVsZXJGbikge1xuICAgICAgY3VzdG9tU2NoZWR1bGVyRm4oZmx1c2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRTY2hlZHVsZXIoc2NoZWR1bGVGbikge1xuICBjdXN0b21TY2hlZHVsZXJGbiA9IHNjaGVkdWxlRm47XG59XG5cbmZ1bmN0aW9uIHNldEFzYXAoYXNhcEZuKSB7XG4gIGFzYXAgPSBhc2FwRm47XG59XG5cbnZhciBicm93c2VyV2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XG52YXIgYnJvd3Nlckdsb2JhbCA9IGJyb3dzZXJXaW5kb3cgfHwge307XG52YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIGlzTm9kZSA9IHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHt9KS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXSc7XG5cbi8vIHRlc3QgZm9yIHdlYiB3b3JrZXIgYnV0IG5vdCBpbiBJRTEwXG52YXIgaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuXG4vLyBub2RlXG5mdW5jdGlvbiB1c2VOZXh0VGljaygpIHtcbiAgLy8gbm9kZSB2ZXJzaW9uIDAuMTAueCBkaXNwbGF5cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2hlbiBuZXh0VGljayBpcyB1c2VkIHJlY3Vyc2l2ZWx5XG4gIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY3Vqb2pzL3doZW4vaXNzdWVzLzQxMCBmb3IgZGV0YWlsc1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgfTtcbn1cblxuLy8gdmVydHhcbmZ1bmN0aW9uIHVzZVZlcnR4VGltZXIoKSB7XG4gIGlmICh0eXBlb2YgdmVydHhOZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2ZXJ0eE5leHQoZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG4gIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIG5vZGUuZGF0YSA9IGl0ZXJhdGlvbnMgPSArK2l0ZXJhdGlvbnMgJSAyO1xuICB9O1xufVxuXG4vLyB3ZWIgd29ya2VyXG5mdW5jdGlvbiB1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNlU2V0VGltZW91dCgpIHtcbiAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gZXM2LXByb21pc2Ugd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4gIC8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuICB2YXIgZ2xvYmFsU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdsb2JhbFNldFRpbWVvdXQoZmx1c2gsIDEpO1xuICB9O1xufVxuXG52YXIgcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgIHZhciBhcmcgPSBxdWV1ZVtpICsgMV07XG5cbiAgICBjYWxsYmFjayhhcmcpO1xuXG4gICAgcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgcXVldWVbaSArIDFdID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGVuID0gMDtcbn1cblxuZnVuY3Rpb24gYXR0ZW1wdFZlcnR4KCkge1xuICB0cnkge1xuICAgIHZhciByID0gcmVxdWlyZTtcbiAgICB2YXIgdmVydHggPSByKCd2ZXJ0eCcpO1xuICAgIHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgcmV0dXJuIHVzZVZlcnR4VGltZXIoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbn1cblxudmFyIHNjaGVkdWxlRmx1c2ggPSB1bmRlZmluZWQ7XG4vLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuaWYgKGlzTm9kZSkge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbn0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbn0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG59IGVsc2UgaWYgKGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBzY2hlZHVsZUZsdXNoID0gYXR0ZW1wdFZlcnR4KCk7XG59IGVsc2Uge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuXG4gIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmIChjaGlsZFtQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWFrZVByb21pc2UoY2hpbGQpO1xuICB9XG5cbiAgdmFyIF9zdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cbiAgaWYgKF9zdGF0ZSkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBfYXJndW1lbnRzW19zdGF0ZSAtIDFdO1xuICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpbnZva2VDYWxsYmFjayhfc3RhdGUsIGNoaWxkLCBjYWxsYmFjaywgcGFyZW50Ll9yZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG4vKipcbiAgYFByb21pc2UucmVzb2x2ZWAgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSByZXNvbHZlZCB3aXRoIHRoZVxuICBwYXNzZWQgYHZhbHVlYC4gSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlc29sdmUoMSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKDEpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVzb2x2ZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSB2YWx1ZSB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aFxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIGZ1bGZpbGxlZCB3aXRoIHRoZSBnaXZlblxuICBgdmFsdWVgXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZSQxKG9iamVjdCkge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0LmNvbnN0cnVjdG9yID09PSBDb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcbiAgcmVzb2x2ZShwcm9taXNlLCBvYmplY3QpO1xuICByZXR1cm4gcHJvbWlzZTtcbn1cblxudmFyIFBST01JU0VfSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMTYpO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIFBFTkRJTkcgPSB2b2lkIDA7XG52YXIgRlVMRklMTEVEID0gMTtcbnZhciBSRUpFQ1RFRCA9IDI7XG5cbnZhciBHRVRfVEhFTl9FUlJPUiA9IG5ldyBFcnJvck9iamVjdCgpO1xuXG5mdW5jdGlvbiBzZWxmRnVsZmlsbG1lbnQoKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IGNhbm5vdCByZXNvbHZlIGEgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKTtcbn1cblxuZnVuY3Rpb24gY2Fubm90UmV0dXJuT3duKCkge1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcignQSBwcm9taXNlcyBjYWxsYmFjayBjYW5ub3QgcmV0dXJuIHRoYXQgc2FtZSBwcm9taXNlLicpO1xufVxuXG5mdW5jdGlvbiBnZXRUaGVuKHByb21pc2UpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIEdFVF9USEVOX0VSUk9SLmVycm9yID0gZXJyb3I7XG4gICAgcmV0dXJuIEdFVF9USEVOX0VSUk9SO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyeVRoZW4odGhlbiQkMSwgdmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcikge1xuICB0cnkge1xuICAgIHRoZW4kJDEuY2FsbCh2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSwgdGhlbiQkMSkge1xuICBhc2FwKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xuICAgIHZhciBlcnJvciA9IHRyeVRoZW4odGhlbiQkMSwgdGhlbmFibGUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSwgJ1NldHRsZTogJyArIChwcm9taXNlLl9sYWJlbCB8fCAnIHVua25vd24gcHJvbWlzZScpKTtcblxuICAgIGlmICghc2VhbGVkICYmIGVycm9yKSB7XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICB9XG4gIH0sIHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSkge1xuICBpZiAodGhlbmFibGUuX3N0YXRlID09PSBGVUxGSUxMRUQpIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICB9IGVsc2UgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICByZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJDEpIHtcbiAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IgJiYgdGhlbiQkMSA9PT0gdGhlbiAmJiBtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yLnJlc29sdmUgPT09IHJlc29sdmUkMSkge1xuICAgIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGVuJCQxID09PSBHRVRfVEhFTl9FUlJPUikge1xuICAgICAgcmVqZWN0KHByb21pc2UsIEdFVF9USEVOX0VSUk9SLmVycm9yKTtcbiAgICAgIEdFVF9USEVOX0VSUk9SLmVycm9yID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHRoZW4kJDEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhlbiQkMSkpIHtcbiAgICAgIGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuJCQxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICByZWplY3QocHJvbWlzZSwgc2VsZkZ1bGZpbGxtZW50KCkpO1xuICB9IGVsc2UgaWYgKG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgZ2V0VGhlbih2YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5fb25lcnJvcikge1xuICAgIHByb21pc2UuX29uZXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgfVxuXG4gIHB1Ymxpc2gocHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gIHByb21pc2UuX3N0YXRlID0gRlVMRklMTEVEO1xuXG4gIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggIT09IDApIHtcbiAgICBhc2FwKHB1Ymxpc2gsIHByb21pc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlamVjdChwcm9taXNlLCByZWFzb24pIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHByb21pc2UuX3N0YXRlID0gUkVKRUNURUQ7XG4gIHByb21pc2UuX3Jlc3VsdCA9IHJlYXNvbjtcblxuICBhc2FwKHB1Ymxpc2hSZWplY3Rpb24sIHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgdmFyIF9zdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XG4gIHZhciBsZW5ndGggPSBfc3Vic2NyaWJlcnMubGVuZ3RoO1xuXG4gIHBhcmVudC5fb25lcnJvciA9IG51bGw7XG5cbiAgX3N1YnNjcmliZXJzW2xlbmd0aF0gPSBjaGlsZDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIEZVTEZJTExFRF0gPSBvbkZ1bGZpbGxtZW50O1xuICBfc3Vic2NyaWJlcnNbbGVuZ3RoICsgUkVKRUNURURdID0gb25SZWplY3Rpb247XG5cbiAgaWYgKGxlbmd0aCA9PT0gMCAmJiBwYXJlbnQuX3N0YXRlKSB7XG4gICAgYXNhcChwdWJsaXNoLCBwYXJlbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2gocHJvbWlzZSkge1xuICB2YXIgc3Vic2NyaWJlcnMgPSBwcm9taXNlLl9zdWJzY3JpYmVycztcbiAgdmFyIHNldHRsZWQgPSBwcm9taXNlLl9zdGF0ZTtcblxuICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGNoaWxkID0gdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQsXG4gICAgICBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgIGNoaWxkID0gc3Vic2NyaWJlcnNbaV07XG4gICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIGNoaWxkLCBjYWxsYmFjaywgZGV0YWlsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICB9XG4gIH1cblxuICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiBFcnJvck9iamVjdCgpIHtcbiAgdGhpcy5lcnJvciA9IG51bGw7XG59XG5cbnZhciBUUllfQ0FUQ0hfRVJST1IgPSBuZXcgRXJyb3JPYmplY3QoKTtcblxuZnVuY3Rpb24gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCkge1xuICB0cnkge1xuICAgIHJldHVybiBjYWxsYmFjayhkZXRhaWwpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgVFJZX0NBVENIX0VSUk9SLmVycm9yID0gZTtcbiAgICByZXR1cm4gVFJZX0NBVENIX0VSUk9SO1xuICB9XG59XG5cbmZ1bmN0aW9uIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIHByb21pc2UsIGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdmFyIGhhc0NhbGxiYWNrID0gaXNGdW5jdGlvbihjYWxsYmFjayksXG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZCxcbiAgICAgIGVycm9yID0gdW5kZWZpbmVkLFxuICAgICAgc3VjY2VlZGVkID0gdW5kZWZpbmVkLFxuICAgICAgZmFpbGVkID0gdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNDYWxsYmFjaykge1xuICAgIHZhbHVlID0gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCk7XG5cbiAgICBpZiAodmFsdWUgPT09IFRSWV9DQVRDSF9FUlJPUikge1xuICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgIGVycm9yID0gdmFsdWUuZXJyb3I7XG4gICAgICB2YWx1ZS5lcnJvciA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgY2Fubm90UmV0dXJuT3duKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IGRldGFpbDtcbiAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgLy8gbm9vcFxuICB9IGVsc2UgaWYgKGhhc0NhbGxiYWNrICYmIHN1Y2NlZWRlZCkge1xuICAgICAgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChmYWlsZWQpIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBGVUxGSUxMRUQpIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gUkVKRUNURUQpIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplUHJvbWlzZShwcm9taXNlLCByZXNvbHZlcikge1xuICB0cnkge1xuICAgIHJlc29sdmVyKGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKHZhbHVlKSB7XG4gICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiByZWplY3RQcm9taXNlKHJlYXNvbikge1xuICAgICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZWplY3QocHJvbWlzZSwgZSk7XG4gIH1cbn1cblxudmFyIGlkID0gMDtcbmZ1bmN0aW9uIG5leHRJZCgpIHtcbiAgcmV0dXJuIGlkKys7XG59XG5cbmZ1bmN0aW9uIG1ha2VQcm9taXNlKHByb21pc2UpIHtcbiAgcHJvbWlzZVtQUk9NSVNFX0lEXSA9IGlkKys7XG4gIHByb21pc2UuX3N0YXRlID0gdW5kZWZpbmVkO1xuICBwcm9taXNlLl9yZXN1bHQgPSB1bmRlZmluZWQ7XG4gIHByb21pc2UuX3N1YnNjcmliZXJzID0gW107XG59XG5cbmZ1bmN0aW9uIEVudW1lcmF0b3IkMShDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICB0aGlzLnByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKCF0aGlzLnByb21pc2VbUFJPTUlTRV9JRF0pIHtcbiAgICBtYWtlUHJvbWlzZSh0aGlzLnByb21pc2UpO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgdGhpcy5sZW5ndGggPSBpbnB1dC5sZW5ndGg7XG4gICAgdGhpcy5fcmVtYWluaW5nID0gaW5wdXQubGVuZ3RoO1xuXG4gICAgdGhpcy5fcmVzdWx0ID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5sZW5ndGggfHwgMDtcbiAgICAgIHRoaXMuX2VudW1lcmF0ZShpbnB1dCk7XG4gICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZWplY3QodGhpcy5wcm9taXNlLCB2YWxpZGF0aW9uRXJyb3IoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGlvbkVycm9yKCkge1xuICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbn1cblxuRW51bWVyYXRvciQxLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gIGZvciAodmFyIGkgPSAwOyB0aGlzLl9zdGF0ZSA9PT0gUEVORElORyAmJiBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLl9lYWNoRW50cnkoaW5wdXRbaV0sIGkpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yJDEucHJvdG90eXBlLl9lYWNoRW50cnkgPSBmdW5jdGlvbiAoZW50cnksIGkpIHtcbiAgdmFyIGMgPSB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yO1xuICB2YXIgcmVzb2x2ZSQkMSA9IGMucmVzb2x2ZTtcblxuICBpZiAocmVzb2x2ZSQkMSA9PT0gcmVzb2x2ZSQxKSB7XG4gICAgdmFyIF90aGVuID0gZ2V0VGhlbihlbnRyeSk7XG5cbiAgICBpZiAoX3RoZW4gPT09IHRoZW4gJiYgZW50cnkuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgICB0aGlzLl9zZXR0bGVkQXQoZW50cnkuX3N0YXRlLCBpLCBlbnRyeS5fcmVzdWx0KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBfdGhlbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fcmVtYWluaW5nLS07XG4gICAgICB0aGlzLl9yZXN1bHRbaV0gPSBlbnRyeTtcbiAgICB9IGVsc2UgaWYgKGMgPT09IFByb21pc2UkMikge1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhub29wKTtcbiAgICAgIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgZW50cnksIF90aGVuKTtcbiAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KG5ldyBjKGZ1bmN0aW9uIChyZXNvbHZlJCQxKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlJCQxKGVudHJ5KTtcbiAgICAgIH0pLCBpKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fd2lsbFNldHRsZUF0KHJlc29sdmUkJDEoZW50cnkpLCBpKTtcbiAgfVxufTtcblxuRW51bWVyYXRvciQxLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24gKHN0YXRlLCBpLCB2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcblxuICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICB0aGlzLl9yZW1haW5pbmctLTtcblxuICAgIGlmIChzdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IkMS5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uIChwcm9taXNlLCBpKSB7XG4gIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICBzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgfSk7XG59O1xuXG4vKipcbiAgYFByb21pc2UuYWxsYCBhY2NlcHRzIGFuIGFycmF5IG9mIHByb21pc2VzLCBhbmQgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoXG4gIGlzIGZ1bGZpbGxlZCB3aXRoIGFuIGFycmF5IG9mIGZ1bGZpbGxtZW50IHZhbHVlcyBmb3IgdGhlIHBhc3NlZCBwcm9taXNlcywgb3JcbiAgcmVqZWN0ZWQgd2l0aCB0aGUgcmVhc29uIG9mIHRoZSBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBiZSByZWplY3RlZC4gSXQgY2FzdHMgYWxsXG4gIGVsZW1lbnRzIG9mIHRoZSBwYXNzZWQgaXRlcmFibGUgdG8gcHJvbWlzZXMgYXMgaXQgcnVucyB0aGlzIGFsZ29yaXRobS5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVzb2x2ZSgyKTtcbiAgbGV0IHByb21pc2UzID0gcmVzb2x2ZSgzKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIFRoZSBhcnJheSBoZXJlIHdvdWxkIGJlIFsgMSwgMiwgMyBdO1xuICB9KTtcbiAgYGBgXG5cbiAgSWYgYW55IG9mIHRoZSBgcHJvbWlzZXNgIGdpdmVuIHRvIGBhbGxgIGFyZSByZWplY3RlZCwgdGhlIGZpcnN0IHByb21pc2VcbiAgdGhhdCBpcyByZWplY3RlZCB3aWxsIGJlIGdpdmVuIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSByZXR1cm5lZCBwcm9taXNlcydzXG4gIHJlamVjdGlvbiBoYW5kbGVyLiBGb3IgZXhhbXBsZTpcblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gcmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gcmVqZWN0KG5ldyBFcnJvcihcIjJcIikpO1xuICBsZXQgcHJvbWlzZTMgPSByZWplY3QobmV3IEVycm9yKFwiM1wiKSk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVucyBiZWNhdXNlIHRoZXJlIGFyZSByZWplY3RlZCBwcm9taXNlcyFcbiAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAvLyBlcnJvci5tZXNzYWdlID09PSBcIjJcIlxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCBhbGxcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBlbnRyaWVzIGFycmF5IG9mIHByb21pc2VzXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGxhYmVsaW5nIHRoZSBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiBhbGwgYHByb21pc2VzYCBoYXZlIGJlZW5cbiAgZnVsZmlsbGVkLCBvciByZWplY3RlZCBpZiBhbnkgb2YgdGhlbSBiZWNvbWUgcmVqZWN0ZWQuXG4gIEBzdGF0aWNcbiovXG5mdW5jdGlvbiBhbGwkMShlbnRyaWVzKSB7XG4gIHJldHVybiBuZXcgRW51bWVyYXRvciQxKHRoaXMsIGVudHJpZXMpLnByb21pc2U7XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yYWNlYCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2ggaXMgc2V0dGxlZCBpbiB0aGUgc2FtZSB3YXkgYXMgdGhlXG4gIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIHNldHRsZS5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMicpO1xuICAgIH0sIDEwMCk7XG4gIH0pO1xuXG4gIFByb21pc2UucmFjZShbcHJvbWlzZTEsIHByb21pc2UyXSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIHJlc3VsdCA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBpdCB3YXMgcmVzb2x2ZWQgYmVmb3JlIHByb21pc2UxXG4gICAgLy8gd2FzIHJlc29sdmVkLlxuICB9KTtcbiAgYGBgXG5cbiAgYFByb21pc2UucmFjZWAgaXMgZGV0ZXJtaW5pc3RpYyBpbiB0aGF0IG9ubHkgdGhlIHN0YXRlIG9mIHRoZSBmaXJzdFxuICBzZXR0bGVkIHByb21pc2UgbWF0dGVycy4gRm9yIGV4YW1wbGUsIGV2ZW4gaWYgb3RoZXIgcHJvbWlzZXMgZ2l2ZW4gdG8gdGhlXG4gIGBwcm9taXNlc2AgYXJyYXkgYXJndW1lbnQgYXJlIHJlc29sdmVkLCBidXQgdGhlIGZpcnN0IHNldHRsZWQgcHJvbWlzZSBoYXNcbiAgYmVjb21lIHJlamVjdGVkIGJlZm9yZSB0aGUgb3RoZXIgcHJvbWlzZXMgYmVjYW1lIGZ1bGZpbGxlZCwgdGhlIHJldHVybmVkXG4gIHByb21pc2Ugd2lsbCBiZWNvbWUgcmVqZWN0ZWQ6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuXG4gIGxldCBwcm9taXNlMiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcigncHJvbWlzZSAyJykpO1xuICAgIH0sIDEwMCk7XG4gIH0pO1xuXG4gIFByb21pc2UucmFjZShbcHJvbWlzZTEsIHByb21pc2UyXSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgcHJvbWlzZSAyIGJlY2FtZSByZWplY3RlZCBiZWZvcmVcbiAgICAvLyBwcm9taXNlIDEgYmVjYW1lIGZ1bGZpbGxlZFxuICB9KTtcbiAgYGBgXG5cbiAgQW4gZXhhbXBsZSByZWFsLXdvcmxkIHVzZSBjYXNlIGlzIGltcGxlbWVudGluZyB0aW1lb3V0czpcblxuICBgYGBqYXZhc2NyaXB0XG4gIFByb21pc2UucmFjZShbYWpheCgnZm9vLmpzb24nKSwgdGltZW91dCg1MDAwKV0pXG4gIGBgYFxuXG4gIEBtZXRob2QgcmFjZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IHByb21pc2VzIGFycmF5IG9mIHByb21pc2VzIHRvIG9ic2VydmVcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2Ugd2hpY2ggc2V0dGxlcyBpbiB0aGUgc2FtZSB3YXkgYXMgdGhlIGZpcnN0IHBhc3NlZFxuICBwcm9taXNlIHRvIHNldHRsZS5cbiovXG5mdW5jdGlvbiByYWNlJDEoZW50cmllcykge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuXG4gIGlmICghaXNBcnJheShlbnRyaWVzKSkge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGVudHJpZXMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5yZXNvbHZlKGVudHJpZXNbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAgYFByb21pc2UucmVqZWN0YCByZXR1cm5zIGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBwYXNzZWQgYHJlYXNvbmAuXG4gIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlamVjdFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QW55fSByZWFzb24gdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGguXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIGdpdmVuIGByZWFzb25gLlxuKi9cbmZ1bmN0aW9uIHJlamVjdCQxKHJlYXNvbikge1xuICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzO1xuICB2YXIgcHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcbiAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBuZWVkc1Jlc29sdmVyKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGEgcmVzb2x2ZXIgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZSBwcm9taXNlIGNvbnN0cnVjdG9yJyk7XG59XG5cbmZ1bmN0aW9uIG5lZWRzTmV3KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnUHJvbWlzZSc6IFBsZWFzZSB1c2UgdGhlICduZXcnIG9wZXJhdG9yLCB0aGlzIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uXCIpO1xufVxuXG4vKipcbiAgUHJvbWlzZSBvYmplY3RzIHJlcHJlc2VudCB0aGUgZXZlbnR1YWwgcmVzdWx0IG9mIGFuIGFzeW5jaHJvbm91cyBvcGVyYXRpb24uIFRoZVxuICBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLCB3aGljaFxuICByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZSByZWFzb25cbiAgd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgVGVybWlub2xvZ3lcbiAgLS0tLS0tLS0tLS1cblxuICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxuICAtIGB0aGVuYWJsZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyBhIGB0aGVuYCBtZXRob2QuXG4gIC0gYHZhbHVlYCBpcyBhbnkgbGVnYWwgSmF2YVNjcmlwdCB2YWx1ZSAoaW5jbHVkaW5nIHVuZGVmaW5lZCwgYSB0aGVuYWJsZSwgb3IgYSBwcm9taXNlKS5cbiAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXG4gIC0gYHJlYXNvbmAgaXMgYSB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aHkgYSBwcm9taXNlIHdhcyByZWplY3RlZC5cbiAgLSBgc2V0dGxlZGAgdGhlIGZpbmFsIHJlc3Rpbmcgc3RhdGUgb2YgYSBwcm9taXNlLCBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXG5cbiAgQSBwcm9taXNlIGNhbiBiZSBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzOiBwZW5kaW5nLCBmdWxmaWxsZWQsIG9yIHJlamVjdGVkLlxuXG4gIFByb21pc2VzIHRoYXQgYXJlIGZ1bGZpbGxlZCBoYXZlIGEgZnVsZmlsbG1lbnQgdmFsdWUgYW5kIGFyZSBpbiB0aGUgZnVsZmlsbGVkXG4gIHN0YXRlLiAgUHJvbWlzZXMgdGhhdCBhcmUgcmVqZWN0ZWQgaGF2ZSBhIHJlamVjdGlvbiByZWFzb24gYW5kIGFyZSBpbiB0aGVcbiAgcmVqZWN0ZWQgc3RhdGUuICBBIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5ldmVyIGEgdGhlbmFibGUuXG5cbiAgUHJvbWlzZXMgY2FuIGFsc28gYmUgc2FpZCB0byAqcmVzb2x2ZSogYSB2YWx1ZS4gIElmIHRoaXMgdmFsdWUgaXMgYWxzbyBhXG4gIHByb21pc2UsIHRoZW4gdGhlIG9yaWdpbmFsIHByb21pc2UncyBzZXR0bGVkIHN0YXRlIHdpbGwgbWF0Y2ggdGhlIHZhbHVlJ3NcbiAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXG4gIGl0c2VsZiByZWplY3QsIGFuZCBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIHdpbGxcbiAgaXRzZWxmIGZ1bGZpbGwuXG5cblxuICBCYXNpYyBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tXG5cbiAgYGBganNcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAvLyBvbiBzdWNjZXNzXG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG5cbiAgICAvLyBvbiBmYWlsdXJlXG4gICAgcmVqZWN0KHJlYXNvbik7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgIC8vIG9uIHJlamVjdGlvblxuICB9KTtcbiAgYGBgXG5cbiAgQWR2YW5jZWQgVXNhZ2U6XG4gIC0tLS0tLS0tLS0tLS0tLVxuXG4gIFByb21pc2VzIHNoaW5lIHdoZW4gYWJzdHJhY3RpbmcgYXdheSBhc3luY2hyb25vdXMgaW50ZXJhY3Rpb25zIHN1Y2ggYXNcbiAgYFhNTEh0dHBSZXF1ZXN0YHMuXG5cbiAgYGBganNcbiAgZnVuY3Rpb24gZ2V0SlNPTih1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IHRoaXMuRE9ORSkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdnZXRKU09OOiBgJyArIHVybCArICdgIGZhaWxlZCB3aXRoIHN0YXR1czogWycgKyB0aGlzLnN0YXR1cyArICddJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEpTT04oJy9wb3N0cy5qc29uJykudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxuXG4gIGBgYGpzXG4gIFByb21pc2UuYWxsKFtcbiAgICBnZXRKU09OKCcvcG9zdHMnKSxcbiAgICBnZXRKU09OKCcvY29tbWVudHMnKVxuICBdKS50aGVuKGZ1bmN0aW9uKHZhbHVlcyl7XG4gICAgdmFsdWVzWzBdIC8vID0+IHBvc3RzSlNPTlxuICAgIHZhbHVlc1sxXSAvLyA9PiBjb21tZW50c0pTT05cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH0pO1xuICBgYGBcblxuICBAY2xhc3MgUHJvbWlzZVxuICBAcGFyYW0ge2Z1bmN0aW9ufSByZXNvbHZlclxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEBjb25zdHJ1Y3RvclxuKi9cbmZ1bmN0aW9uIFByb21pc2UkMihyZXNvbHZlcikge1xuICB0aGlzW1BST01JU0VfSURdID0gbmV4dElkKCk7XG4gIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuXG4gIGlmIChub29wICE9PSByZXNvbHZlcikge1xuICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBuZWVkc1Jlc29sdmVyKCk7XG4gICAgdGhpcyBpbnN0YW5jZW9mIFByb21pc2UkMiA/IGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IG5lZWRzTmV3KCk7XG4gIH1cbn1cblxuUHJvbWlzZSQyLmFsbCA9IGFsbCQxO1xuUHJvbWlzZSQyLnJhY2UgPSByYWNlJDE7XG5Qcm9taXNlJDIucmVzb2x2ZSA9IHJlc29sdmUkMTtcblByb21pc2UkMi5yZWplY3QgPSByZWplY3QkMTtcblByb21pc2UkMi5fc2V0U2NoZWR1bGVyID0gc2V0U2NoZWR1bGVyO1xuUHJvbWlzZSQyLl9zZXRBc2FwID0gc2V0QXNhcDtcblByb21pc2UkMi5fYXNhcCA9IGFzYXA7XG5cblByb21pc2UkMi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBQcm9taXNlJDIsXG5cbiAgLyoqXG4gICAgVGhlIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsXG4gICAgd2hpY2ggcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGVcbiAgICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgLy8gdXNlciBpcyBhdmFpbGFibGVcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gdXNlciBpcyB1bmF2YWlsYWJsZSwgYW5kIHlvdSBhcmUgZ2l2ZW4gdGhlIHJlYXNvbiB3aHlcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQ2hhaW5pbmdcbiAgICAtLS0tLS0tLVxuICBcbiAgICBUaGUgcmV0dXJuIHZhbHVlIG9mIGB0aGVuYCBpcyBpdHNlbGYgYSBwcm9taXNlLiAgVGhpcyBzZWNvbmQsICdkb3duc3RyZWFtJ1xuICAgIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmaXJzdCBwcm9taXNlJ3MgZnVsZmlsbG1lbnRcbiAgICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHJldHVybiB1c2VyLm5hbWU7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuICdkZWZhdWx0IG5hbWUnO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHVzZXJOYW1lKSB7XG4gICAgICAvLyBJZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHVzZXJOYW1lYCB3aWxsIGJlIHRoZSB1c2VyJ3MgbmFtZSwgb3RoZXJ3aXNlIGl0XG4gICAgICAvLyB3aWxsIGJlIGAnZGVmYXVsdCBuYW1lJ2BcbiAgICB9KTtcbiAgXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jyk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jyk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBpZiBgZmluZFVzZXJgIGZ1bGZpbGxlZCwgYHJlYXNvbmAgd2lsbCBiZSAnRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknLlxuICAgICAgLy8gSWYgYGZpbmRVc2VyYCByZWplY3RlZCwgYHJlYXNvbmAgd2lsbCBiZSAnYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScuXG4gICAgfSk7XG4gICAgYGBgXG4gICAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEFzc2ltaWxhdGlvblxuICAgIC0tLS0tLS0tLS0tLVxuICBcbiAgICBTb21ldGltZXMgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHByb3BhZ2F0ZSB0byBhIGRvd25zdHJlYW0gcHJvbWlzZSBjYW4gb25seSBiZVxuICAgIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcbiAgICBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gaGFuZGxlci4gVGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIHRoZW4gYmUgcGVuZGluZ1xuICAgIHVudGlsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlzIHNldHRsZWQuIFRoaXMgaXMgY2FsbGVkICphc3NpbWlsYXRpb24qLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAvLyBUaGUgdXNlcidzIGNvbW1lbnRzIGFyZSBub3cgYXZhaWxhYmxlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCByZWplY3RzLCB3ZSdsbCBoYXZlIHRoZSByZWFzb24gaGVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBTaW1wbGUgRXhhbXBsZVxuICAgIC0tLS0tLS0tLS0tLS0tXG4gIFxuICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGxldCByZXN1bHQ7XG4gIFxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBmaW5kUmVzdWx0KCk7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9XG4gICAgYGBgXG4gIFxuICAgIEVycmJhY2sgRXhhbXBsZVxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRSZXN1bHQoZnVuY3Rpb24ocmVzdWx0LCBlcnIpe1xuICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFByb21pc2UgRXhhbXBsZTtcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGZpbmRSZXN1bHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQWR2YW5jZWQgRXhhbXBsZVxuICAgIC0tLS0tLS0tLS0tLS0tXG4gIFxuICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGxldCBhdXRob3IsIGJvb2tzO1xuICBcbiAgICB0cnkge1xuICAgICAgYXV0aG9yID0gZmluZEF1dGhvcigpO1xuICAgICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgRXJyYmFjayBFeGFtcGxlXG4gIFxuICAgIGBgYGpzXG4gIFxuICAgIGZ1bmN0aW9uIGZvdW5kQm9va3MoYm9va3MpIHtcbiAgXG4gICAgfVxuICBcbiAgICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xuICBcbiAgICB9XG4gIFxuICAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvdW5kQm9va3MoYm9va3MpO1xuICAgICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGZhaWx1cmUocmVhc29uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH1cbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgUHJvbWlzZSBFeGFtcGxlO1xuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgZmluZEF1dGhvcigpLlxuICAgICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXG4gICAgICB0aGVuKGZ1bmN0aW9uKGJvb2tzKXtcbiAgICAgICAgLy8gZm91bmQgYm9va3NcbiAgICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQG1ldGhvZCB0aGVuXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb25GdWxmaWxsZWRcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXG4gICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG4gIHRoZW46IHRoZW4sXG5cbiAgLyoqXG4gICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICAgIGFzIHRoZSBjYXRjaCBibG9jayBvZiBhIHRyeS9jYXRjaCBzdGF0ZW1lbnQuXG4gIFxuICAgIGBgYGpzXG4gICAgZnVuY3Rpb24gZmluZEF1dGhvcigpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG4ndCBmaW5kIHRoYXQgYXV0aG9yJyk7XG4gICAgfVxuICBcbiAgICAvLyBzeW5jaHJvbm91c1xuICAgIHRyeSB7XG4gICAgICBmaW5kQXV0aG9yKCk7XG4gICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfVxuICBcbiAgICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gICAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIGNhdGNoXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3Rpb25cbiAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cbiAgJ2NhdGNoJzogZnVuY3Rpb24gX2NhdGNoKG9uUmVqZWN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGlvbik7XG4gIH1cbn07XG5cbi8qZ2xvYmFsIHNlbGYqL1xuZnVuY3Rpb24gcG9seWZpbGwkMSgpIHtcbiAgICB2YXIgbG9jYWwgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbG9jYWwgPSBnbG9iYWw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbG9jYWwgPSBzZWxmO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2NhbCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncG9seWZpbGwgZmFpbGVkIGJlY2F1c2UgZ2xvYmFsIG9iamVjdCBpcyB1bmF2YWlsYWJsZSBpbiB0aGlzIGVudmlyb25tZW50Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgUCA9IGxvY2FsLlByb21pc2U7XG5cbiAgICBpZiAoUCkge1xuICAgICAgICB2YXIgcHJvbWlzZVRvU3RyaW5nID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHByb21pc2VUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChQLnJlc29sdmUoKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIHNpbGVudGx5IGlnbm9yZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9taXNlVG9TdHJpbmcgPT09ICdbb2JqZWN0IFByb21pc2VdJyAmJiAhUC5jYXN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2NhbC5Qcm9taXNlID0gUHJvbWlzZSQyO1xufVxuXG4vLyBTdHJhbmdlIGNvbXBhdC4uXG5Qcm9taXNlJDIucG9seWZpbGwgPSBwb2x5ZmlsbCQxO1xuUHJvbWlzZSQyLlByb21pc2UgPSBQcm9taXNlJDI7XG5cbnJldHVybiBQcm9taXNlJDI7XG5cbn0pKSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVzNi1wcm9taXNlLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyB2ZXJ0eCAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=