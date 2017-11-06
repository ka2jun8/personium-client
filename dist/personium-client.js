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
        this.expireIn = 3600;
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
        var result = (+new Date() - this.loginTime) / 1000 < this.expireIn;
        if (!result) {
            this.expireCallback && this.expireCallback();
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
                    var token = JSON.parse(res.text);
                    _this.personiumToken = token;
                    _this.token = token.access_token;
                    _this.expireIn = token.expire_in;
                    _this.loginTime = +new Date();
                    // タイムアウトを見る
                    var timeout = _this.expireIn * 999; //直前に教えてあげる
                    _this.expireCallbackTimer = setTimeout(function () {
                        _this.expireCallbackTimer = null;
                        _this.expireCallback && _this.expireCallback();
                    }, timeout);
                    resolve(token);
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
                            _this.expireIn = token.expire_in;
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
                    var token = JSON.parse(res.text);
                    _this.personiumToken = token;
                    _this.token = token.access_token;
                    resolve(token);
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
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
            }
            else {
                role = "(Name='" + name + "')";
            }
            var url = _this.createCellSchema(cell) + "__ctl/Account('" + account + "')/\$links/_Role";
            request
                .delete(url)
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
     * @param ruleId 削除するルールid
     * @param box ボックスに紐づいてる場合はbox名指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    PersoniumClient.prototype.deleteRule = function (cell, ruleId, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/Rule";
            if (box) {
                url += "(__id='" + ruleId + "',_Box.Name='" + box + "')";
            }
            else {
                url += "(__id='" + ruleId + "')";
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
exports.convertQueriedUrl = function (url, query) {
    var result = url + "?";
    if (query.filter && query.filter.length > 0) {
        var filters = query.filter;
        result += exports.Encode("$filter=");
        filters.forEach(function (filter) {
            result += exports.Encode(filter);
            result += AND;
        });
        result = result.substring(0, result.indexOf(AND));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzYyYmY0MzBjZjVmODRjOTE5NTIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sTm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbENvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sUHJvY0luc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbEF0dHJpYnV0ZVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhclJlZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbnRpdHlSZWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxBdHRyaWJ1dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhckRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRGVjbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRHRkQXR0bGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZEVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGROb3RhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRQYXJhbUVudGl0eVJlZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qczJ4bWxwYXJzZXIvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3JlcXVlc3QtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVzcG9uc2UtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Nob3VsZC1yZXRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanMyeG1scGFyc2VyL2xpYi9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzMnhtbHBhcnNlci9saWIvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0eS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVGQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxjQUFjO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwrQkFBK0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6R0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsb0JBQW9CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMseUJBQXlCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUNySEE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsUUFBUTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFFBQVE7QUFDaEI7QUFDQTtBQUNBLFNBQVMsUUFBUTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esa0NBQWtDLGlCQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGlCQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGlCQUFpQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUNoSUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsT0FBTztBQUMxRSxTQUFTLFFBQVE7QUFDakI7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPLEVBQUUsUUFBUTtBQUN2QjtBQUNBO0FBQ0EsU0FBUyxPQUFPLFFBQVEsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsa0JBQWtCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esa0NBQWtDLGtCQUFrQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGtCQUFrQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGtCQUFrQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrQkFBa0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTs7Ozs7Ozs7QUNwRkE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpQkFBaUIsS0FBSyxtQkFBbUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHVCQUF1QjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQ0FBa0MsdUJBQXVCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUJBQXVCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUJBQXVCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVCQUF1QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUM1SUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsSUFBSTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFLLElBQUk7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSSxRQUFRLElBQUk7QUFDekIsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixhQUFhO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsaUJBQWlCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUN0TEE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFNBQVMsT0FBTztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsbUJBQW1CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsbUJBQW1CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0MscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7QUM1SEE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxLQUFLO0FBQ3ZDLEtBQUssTUFBTTtBQUNYO0FBQ0E7QUFDQSxhQUFhLEtBQUssR0FBRyxNQUFNO0FBQzNCO0FBQ0E7QUFDQSxTQUFTLEtBQUssZ0RBQWdELE1BQU07QUFDcEU7QUFDQTtBQUNBO0FBQ0EsY0FBYyx1QkFBdUIsR0FBRyxpQkFBaUI7QUFDekQsSUFBSSxtQkFBbUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsbUJBQW1CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx1QkFBdUI7QUFDckUscUJBQXFCLGlCQUFpQixPQUFPLG1CQUFtQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMscUJBQXFCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQixHQUFHLG1CQUFtQjtBQUM5RCxRQUFRLGtCQUFrQix1QkFBdUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUMzT0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsS0FBSztBQUMvRDtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBLFNBQVMsS0FBSztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtDQUFrQyxlQUFlO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsZUFBZTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGVBQWU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsZUFBZTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7OztBQy9IQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDbkYseUJBQXlCLHVEQUF1RDtBQUNoRjtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaUJBQWlCLEtBQUssbUJBQW1CO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrQkFBa0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esa0NBQWtDLGtCQUFrQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGtCQUFrQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGtCQUFrQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrQkFBa0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUM5SUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsUUFBUTtBQUNoRSxjQUFjLFNBQVMseUNBQXlDLFdBQVc7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUSxhQUFhLFNBQVMsZUFBZSxXQUFXO0FBQzNFO0FBQ0E7QUFDQSxTQUFTLFFBQVEsS0FBSyxTQUFTLFNBQVMsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxjQUFjO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsY0FBYztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7QUM1TkE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ25GLHlCQUF5Qix1REFBdUQ7QUFDaEY7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLEtBQUs7QUFDM0UsMEJBQTBCLE1BQU07QUFDaEMsS0FBSyxNQUFNLDZDQUE2QyxVQUFVO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLGNBQWMsS0FBSyxVQUFVLE1BQU0sV0FBVyxNQUFNO0FBQ3BELFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTLEtBQUssS0FBSyxNQUFNLFNBQVMsTUFBTTtBQUN4QyxlQUFlLFVBQVU7QUFDekI7QUFDQSxpREFBaUQsaUJBQWlCO0FBQ2xFLElBQUksb0JBQW9CLEdBQUcsb0JBQW9CLEdBQUcsbUJBQW1CO0FBQ3JFLElBQUkscUJBQXFCLEdBQUcsMkJBQTJCO0FBQ3ZELElBQUksa0JBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGFBQWE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUIsR0FBRyxvQkFBb0IsR0FBRyxvQkFBb0I7QUFDNUUsUUFBUSxtQkFBbUIsR0FBRyxxQkFBcUIsT0FBTztBQUMxRCw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGdCQUFnQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDclpBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLEtBQUs7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQSxTQUFTLEtBQUs7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsb0JBQW9CO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtDQUFrQyxvQkFBb0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxvQkFBb0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxvQkFBb0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msb0JBQW9CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLEtBQUs7QUFDckU7QUFDQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQSxTQUFTLEtBQUs7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsb0JBQW9CO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtDQUFrQyxvQkFBb0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxvQkFBb0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxvQkFBb0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msb0JBQW9CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELEtBQUs7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQSxTQUFTLEtBQUs7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsbUJBQW1CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsbUJBQW1CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLEtBQUs7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQSxTQUFTLEtBQUs7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMscUJBQXFCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtDQUFrQyxxQkFBcUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxxQkFBcUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxxQkFBcUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MscUJBQXFCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLE9BQU87QUFDOUU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDJCQUEyQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQ0FBa0MsMkJBQTJCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMkJBQTJCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMkJBQTJCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDJCQUEyQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0MscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELEtBQUs7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSyxLQUFLO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUFLO0FBQ1g7QUFDQTtBQUNBLFNBQVMsS0FBSztBQUNkO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxtQkFBbUI7QUFDeEUsSUFBSSxlQUFlLEdBQUcsaUJBQWlCLEdBQUcsaUJBQWlCO0FBQzNELElBQUksaUJBQWlCLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCO0FBQ2hFLElBQUksa0JBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGlCQUFpQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixhQUFhO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBLDhCQUE4QixtQkFBbUI7QUFDakQ7QUFDQTtBQUNBLHNEQUFzRCwrQ0FBK0MsRUFBRTtBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQixHQUFHLGVBQWU7QUFDNUQsUUFBUSxpQkFBaUIsR0FBRyxpQkFBaUIsR0FBRyxpQkFBaUI7QUFDakUsUUFBUSxtQkFBbUIsR0FBRyxrQkFBa0IsTUFBTSxrQkFBa0I7QUFDeEUsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSw0Q0FBNEMsRUFBRTtBQUMvRyx1REFBdUQsMEJBQTBCO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQSwyREFBMkQsd0NBQXdDLEVBQUU7QUFDckc7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELDBCQUEwQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxpQ0FBaUM7QUFDN0UsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSx3REFBd0QsaUJBQWlCO0FBQ3pFLElBQUksbUJBQW1CLE1BQU0sa0JBQWtCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUIsR0FBRyxtQkFBbUIsTUFBTSxrQkFBa0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMscUJBQXFCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGlCQUFpQjtBQUN6RSxJQUFJLG1CQUFtQixNQUFNLGtCQUFrQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUIsR0FBRyxtQkFBbUIsTUFBTSxrQkFBa0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwSUEsc0NBQXNDO0FBQ3RDLHFDQUF1QztBQUN2Qyx3Q0FBcUU7QUFFckUsMEJBQTBCO0FBQzFCLDRDQUFzQztBQWlLdEM7O0dBRUc7QUFDSDtJQWtDSTs7OztPQUlHO0lBQ0gseUJBQVksSUFBWSxFQUFFLFFBQWlCO1FBdEMzQzs7V0FFRztRQUNILGFBQVEsR0FBVyxPQUFPLENBQUM7UUFDM0I7O1dBRUc7UUFDSCxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCOztXQUVHO1FBQ0gsbUJBQWMsR0FBeUIsSUFBSSxDQUFDO1FBQzVDOztXQUVHO1FBQ0gsVUFBSyxHQUFXLElBQUksQ0FBQztRQUNyQjs7V0FFRztRQUNILGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDeEI7O1dBRUc7UUFDSCxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBS3RCOztXQUVHO1FBQ0gsd0JBQW1CLEdBQVEsSUFBSSxDQUFDO1FBUTVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELEVBQUUsRUFBQyxRQUFRLENBQUMsRUFBQztZQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQ0FBWSxHQUFaO1FBQ0ksSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pFLEVBQUUsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILCtCQUFLLEdBQUwsVUFBTSxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLGNBQXlCO1FBQWpGLGlCQStCQztRQTlCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUF1QixVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3JELElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDcEQsS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLElBQUksY0FBYyxDQUFDO1lBQ3ZELE9BQU87aUJBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDVCxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNaLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxZQUFFLFFBQVEsWUFBRSxDQUFDO2lCQUNwRCxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixJQUFNLEtBQUssR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pELEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUM1QixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDaEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7b0JBRTdCLFlBQVk7b0JBQ1osSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxXQUFXO29CQUNoRCxLQUFJLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDO3dCQUNsQyxLQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO3dCQUNoQyxLQUFJLENBQUMsY0FBYyxJQUFJLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDakQsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUVaLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsa0NBQVEsR0FBUixVQUFTLElBQVksRUFBRSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsT0FBZSxFQUFFLEtBQWEsRUFBRSxPQUFlO1FBQTFHLGlCQXNDQztRQXJDRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUF1QixVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3JELElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEQsSUFBTSxlQUFlLEdBQUcsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUMvQyxPQUFPO2lCQUNGLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ3JCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ1osSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDO2lCQUN2RixHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixJQUFNLFFBQVEsR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVELElBQU0sY0FBYyxHQUFHLE9BQU8sR0FBRyxTQUFTLENBQUM7b0JBQzNDLE9BQU87eUJBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQzt5QkFDcEIsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQzt5QkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt5QkFDWixJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsWUFBRSxRQUFRLFlBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO3lCQUNqSCxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRzt3QkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbEIsQ0FBQzt3QkFDRCxJQUFJLENBQUMsQ0FBQzs0QkFDRixJQUFNLEtBQUssR0FBeUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3pELEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDOzRCQUM1QixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7NEJBQ2hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzs0QkFDaEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbkIsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw0Q0FBa0IsR0FBbEIsVUFBbUIsSUFBWSxFQUFFLFlBQW9CLEVBQUUsTUFBZTtRQUF0RSxpQkE0QkM7UUEzQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBdUIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNyRCxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQ3BELElBQU0sVUFBVSxHQUFHLE1BQU0sR0FBRztnQkFDeEIsVUFBVSxFQUFFLGVBQWU7Z0JBQzNCLGFBQWEsRUFBRSxZQUFZO2dCQUMzQixRQUFRLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQzthQUMxQyxHQUFHO2dCQUNJLFVBQVUsRUFBRSxlQUFlO2dCQUMzQixhQUFhLEVBQUUsWUFBWTthQUM5QixDQUFDO1lBQ04sT0FBTztpQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDaEIsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUM1QixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7b0JBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsb0NBQVUsR0FBVixVQUFXLElBQVksRUFBRSxJQUFZLEVBQUUsR0FBWSxFQUFFLE1BQWU7UUFBcEUsaUJBaUNDO1FBaENHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQVUsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN4QyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQ3hELElBQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDNUIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsRUFBRSxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxNQUFNLEVBQUUsQ0FBQztZQUNiLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsRUFBRSxFQUFDLEdBQUcsQ0FBQyxFQUFDO29CQUNKLElBQUksR0FBRzt3QkFDSCxJQUFJLEVBQUUsSUFBSTt3QkFDVixXQUFXLEVBQUUsT0FBTztxQkFDdkI7Z0JBQ0wsQ0FBQztnQkFDRCxPQUFPO3FCQUNGLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQ1QsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQztxQkFDakMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO3FCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDO3FCQUNWLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO29CQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsQixDQUFDO29CQUNELElBQUksQ0FBQyxDQUFDO3dCQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEIsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxpQ0FBTyxHQUFQLFVBQVEsSUFBWSxFQUFFLElBQWEsRUFBRSxHQUFZLEVBQUUsTUFBZTtRQUFsRSxpQkF1QkM7UUF0QkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQzVDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxHQUFHLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkMsQ0FBQztZQUFBLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFDO2dCQUNsQixHQUFHLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxlQUFlLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUMzRCxDQUFDO1lBQ0QsT0FBTztpQkFDRixHQUFHLENBQUMsR0FBRyxDQUFDO2lCQUNSLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsSUFBTSxRQUFRLEdBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6RCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsb0NBQVUsR0FBVixVQUFXLElBQVksRUFBRSxJQUFZLEVBQUUsR0FBWSxFQUFFLE1BQWU7UUFBcEUsaUJBc0JDO1FBckJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQVUsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN4QyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sR0FBRyxJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsZUFBZSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDM0QsQ0FBQztZQUFBLElBQUksQ0FBQyxDQUFDO2dCQUNILEdBQUcsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxDQUFDO1lBQ0QsT0FBTztpQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG9DQUFVLEdBQVYsVUFBVyxJQUFZLEVBQUUsVUFBa0IsRUFBRSxNQUFlO1FBQTVELGlCQXFCQztRQXBCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFVLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDeEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDO1lBQzNELElBQU0sSUFBSSxHQUFHO2dCQUNULEdBQUcsRUFBRSxVQUFVO2FBQ2xCO1lBQ0QsT0FBTztpQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDVixHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx3Q0FBYyxHQUFkLFVBQWUsSUFBWSxFQUFFLE1BQWU7UUFBNUMsaUJBa0JDO1FBakJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQVksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMxQyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7WUFDM0QsT0FBTztpQkFDRixHQUFHLENBQUMsR0FBRyxDQUFDO2lCQUNSLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsSUFBTSxRQUFRLEdBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6RCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx1Q0FBYSxHQUFiLFVBQWMsSUFBWSxFQUFFLGFBQXFCLEVBQUUsTUFBZTtRQUFsRSxpQkFpQkM7UUFoQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBVSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMzRixPQUFPO2lCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQztpQkFDakMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO2lCQUN2QyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsd0NBQWMsR0FBZCxVQUFlLElBQVksRUFBRSxhQUFxQixFQUFFLElBQXlCLEVBQUUsSUFBWSxFQUFFLEdBQVksRUFBRSxNQUFlO1FBQTFILGlCQTRCQztRQTNCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFVLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDeEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQixHQUFHLGdCQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMzRyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxFQUFFLEVBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFDO2dCQUNaLElBQUksR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQzNELENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxFQUFDO2dCQUNYLElBQUksR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxDQUFDO1lBQ0QsSUFBTSxJQUFJLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJO2FBQ3pFLENBQUM7WUFFRixPQUFPO2lCQUNGLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1QsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQztpQkFDakMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO2lCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNWLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsd0NBQWMsR0FBZCxVQUFlLElBQVksRUFBRSxhQUFxQixFQUFFLElBQXlCLEVBQUUsTUFBZTtRQUE5RixpQkFrQkM7UUFqQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDM0csT0FBTztpQkFDRixHQUFHLENBQUMsR0FBRyxDQUFDO2lCQUNSLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsSUFBTSxRQUFRLEdBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6RCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCwyQ0FBaUIsR0FBakIsVUFBa0IsSUFBWSxFQUFFLGFBQXFCLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxHQUFZLEVBQUUsTUFBZTtRQUFoSCxpQkF1QkM7UUF0QkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBVSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNkLEVBQUUsRUFBQyxHQUFHLENBQUMsRUFBQztnQkFDSixJQUFJLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxlQUFlLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUMzRCxDQUFDO1lBQUEsSUFBSSxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25DLENBQUM7WUFDRCxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLEdBQUcsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxhQUFhLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsSCxPQUFPO2lCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQztpQkFDakMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO2lCQUN2QyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCx3Q0FBYyxHQUFkLFVBQWUsSUFBWSxFQUFFLE9BQWUsRUFBRSxJQUFZLEVBQUUsR0FBWSxFQUFFLE1BQWU7UUFBekYsaUJBd0JDO1FBdkJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQVUsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN4QyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUMsWUFBWSxDQUFDO1lBQ3BELEVBQUUsRUFBQyxHQUFHLENBQUMsRUFBQztnQkFDSixJQUFJLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxlQUFlLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztZQUMzRCxDQUFDO1lBQUEsSUFBSSxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25DLENBQUM7WUFDRCxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLEdBQUcsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1lBQzNGLE9BQU87aUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQztpQkFDakIsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsMkNBQWlCLEdBQWpCLFVBQWtCLElBQVksRUFBRSxPQUFlLEVBQUUsSUFBWSxFQUFFLEdBQVksRUFBRSxNQUFlO1FBQTVGLGlCQXVCQztRQXRCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFVLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDeEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsRUFBRSxFQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUNKLElBQUksR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQzNELENBQUM7WUFBQSxJQUFJLENBQUMsQ0FBQztnQkFDSCxJQUFJLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkMsQ0FBQztZQUNELElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsR0FBRyxPQUFPLEdBQUcsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBQ2xHLE9BQU87aUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx1Q0FBYSxHQUFiLFVBQWMsSUFBWSxFQUFFLE9BQWUsRUFBRSxNQUFlO1FBQTVELGlCQWlCQztRQWhCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFVLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDeEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQixHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDN0UsT0FBTztpQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsa0NBQVEsR0FBUixVQUFTLElBQVksRUFBRSxNQUFlO1FBQXRDLGlCQWtCQztRQWpCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsSUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUN2RCxPQUFPO2lCQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUM7aUJBQ1IsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQztpQkFDakMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO2lCQUN2QyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixJQUFNLFFBQVEsR0FBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGlDQUFPLEdBQVAsVUFBUSxJQUFZLEVBQUUsSUFBVSxFQUFFLE1BQWU7UUFBakQsaUJBa0JDO1FBakJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQVUsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN4QyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQ3ZELE9BQU87aUJBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDVCxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ1YsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxvQ0FBVSxHQUFWLFVBQVcsSUFBWSxFQUFFLE1BQWMsRUFBRSxHQUFZLEVBQUUsTUFBZTtRQUF0RSxpQkFzQkM7UUFyQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBVSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDckQsRUFBRSxFQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUNKLEdBQUcsSUFBSSxTQUFTLEdBQUcsTUFBTSxHQUFHLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQzdELENBQUM7WUFBQSxJQUFJLENBQUMsQ0FBQztnQkFDSCxHQUFHLElBQUksU0FBUyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDckMsQ0FBQztZQUNELE9BQU87aUJBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHFDQUFXLEdBQVgsVUFBWSxJQUFZLEVBQUUsRUFBVSxFQUFFLElBQXFCLEVBQUUsY0FBMkIsRUFBRSxNQUFlO1FBQXpHLGlCQXNDQztRQXJDRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFNLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDcEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxJQUFNLEdBQUcsR0FBRyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7WUFFeEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsSUFBSSxHQUFHO29CQUNILEVBQUUsRUFBRSxLQUFLO29CQUNULElBQUksRUFBRSxJQUFJO29CQUNWLFdBQVcsRUFBRSxjQUFjO2lCQUM5QixDQUFDO1lBQ04sQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLEdBQUc7b0JBQ0gsRUFBRSxFQUFFLEtBQUs7b0JBQ1QsSUFBSSxFQUFFLElBQUk7b0JBQ1YsZUFBZSxFQUFFLGNBQWM7b0JBQy9CLHFCQUFxQixFQUFFLE9BQU87aUJBQ2pDLENBQUM7WUFDTixDQUFDO1lBRUQsT0FBTztpQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNULEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDVixHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3Q0FBYyxHQUFkLGNBQWlCLENBQUM7SUFFbEI7Ozs7T0FJRztJQUNILGdDQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsSUFBVyxFQUFFLFVBQW1CLEVBQUUsTUFBZTtRQUF0RSxpQkEyQkM7UUExQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBVSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxJQUFNLEdBQUcsR0FBRyxVQUFVLEdBQUUsT0FBTyxHQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7WUFFckQsSUFBTSxHQUFHLEdBQVE7Z0JBQ2IsR0FBRyxFQUFFO29CQUNELFNBQVMsRUFBRSxNQUFNO29CQUNqQixTQUFTLEVBQUUsdUJBQXVCO2lCQUNyQztnQkFDRCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTFDLElBQU0sR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRztnQkFDckIsRUFBRSxFQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztvQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBQ0YsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3hELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFDLEtBQUssQ0FBQztZQUN0RCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxpREFBdUIsR0FBdkIsVUFBd0IsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsUUFBYSxFQUFFLE1BQWU7UUFBaEcsaUJBbUJDO1FBbEJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQVUsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN4QyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDbEUsT0FBTztpQkFDRixHQUFHLENBQUMsR0FBRyxDQUFDO2lCQUNSLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztpQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDZCxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCw4Q0FBb0IsR0FBcEIsVUFBcUIsSUFBWSxFQUFFLElBQVksRUFBRSxNQUFjLEVBQUUsT0FBZSxFQUFFLE1BQWU7UUFBakcsaUJBd0NDO1FBdkNHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQVUsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN4QyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQy9DLElBQU0sSUFBSSxHQUFHO2dCQUNULEdBQUcsRUFBRTtvQkFDRCxTQUFTLEVBQUUsTUFBTTtvQkFDakIsU0FBUyxFQUFFLHVCQUF1QjtvQkFDbEMsU0FBUyxFQUFFLHFDQUFxQztpQkFDbkQ7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFFBQVEsRUFBRTt3QkFDTixXQUFXLEVBQUU7NEJBQ1QsR0FBRyxFQUFFO2dDQUNELFVBQVUsRUFBRSxZQUFZOzZCQUMzQjs0QkFDRCxJQUFJLEVBQUU7Z0NBQ0YsR0FBRyxFQUFFO29DQUNELElBQUksRUFBRSxPQUFPO29DQUNiLEdBQUcsRUFBRSxNQUFNO2lDQUNkOzZCQUNKO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0osQ0FBQztZQUNGLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFdkQsSUFBTSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakMsR0FBRyxDQUFDLGtCQUFrQixHQUFHO2dCQUNyQixFQUFFLEVBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixJQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO29CQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7WUFDTCxDQUFDLENBQUM7WUFDRixHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDeEQsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUMsS0FBSyxDQUFDO1lBQ3RELEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsaURBQXVCLEdBQXZCLFVBQXdCLElBQVksRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQWU7UUFBakYsaUJBaUJDO1FBaEJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQVUsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN4QyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDbEUsT0FBTztpQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCwwQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBWSxFQUFFLElBQVksRUFBRSxjQUFzQixFQUFFLE1BQWU7UUFBcEYsaUJBaUJDO1FBaEJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLHlCQUF5QixHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDbkcsT0FBTztpQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsd0NBQWMsR0FBZCxVQUFlLElBQVksRUFBRSxJQUFZLEVBQUUsVUFBa0IsRUFBRSxRQUFnQixFQUFFLE1BQWU7UUFBaEcsaUJBaUJDO1FBaEJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLDRCQUE0QixHQUFFLFFBQVEsR0FBRSxzQkFBc0IsR0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDO1lBQ2hJLE9BQU87aUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxtQ0FBUyxHQUFULFVBQVUsSUFBWSxFQUFFLEdBQVcsRUFBRSxNQUFlO1FBQXBELGlCQWlCQztRQWhCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFNLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDcEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLGtCQUFrQixHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUM7WUFDdEUsT0FBTztpQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxvQ0FBVSxHQUFWLFVBQVcsSUFBWTtRQUF2QixpQkFpQkM7UUFoQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBMkIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN6RCxJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBTSxHQUFHLEdBQUcsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1lBQ3hDLE9BQU87aUJBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQztpQkFDUixHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsQ0FBQztvQkFDRixJQUFNLFFBQVEsR0FBNkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG1DQUFTLEdBQVQsVUFBVSxJQUFZO1FBQXRCLGlCQWlCQztRQWhCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFzQixVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3BELElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxJQUFNLEdBQUcsR0FBRyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7WUFDdkMsT0FBTztpQkFDRixHQUFHLENBQUMsR0FBRyxDQUFDO2lCQUNSLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLElBQU0sUUFBUSxHQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxvQ0FBVSxHQUFWLFVBQVcsSUFBWSxFQUFFLEdBQVcsRUFBRSxNQUFjLEVBQUUsTUFBZTtRQUFyRSxpQkE0QkM7UUEzQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBVSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxJQUFNLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO2lCQUNkLFlBQVksQ0FBQyxNQUFNLENBQUM7aUJBQ3BCLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxJQUFJO2dCQUNiLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3ZCLElBQU0sS0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7b0JBQ2pDLEtBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDN0IsS0FBRyxDQUFDLGtCQUFrQixHQUFHO3dCQUNyQixFQUFFLEVBQUMsS0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QixJQUFNLENBQUMsR0FBRyxLQUFHLENBQUMsWUFBWSxDQUFDOzRCQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xCLENBQUM7b0JBQ0wsQ0FBQyxDQUFDO29CQUNGLEtBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFDeEQsS0FBRyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUMsS0FBSyxDQUFDO29CQUN0RCxLQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxpQ0FBTyxHQUFQLFVBQVEsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFhLEVBQUUsTUFBZTtRQUFsRSxpQkFzQkM7UUFyQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBVSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztZQUNmLEVBQUUsRUFBQyxJQUFJLENBQUMsRUFBQztnQkFDTCxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsRSxDQUFDO1lBQUEsSUFBSSxDQUFDLENBQUM7Z0JBQ0gsR0FBRyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDN0MsQ0FBQztZQUNELE9BQU87aUJBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQztpQkFDUixHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsNkJBQUcsR0FBSCxVQUFJLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBb0IsRUFBRSxNQUFlO1FBQXJFLGlCQXlCQztRQXhCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFrQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hFLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsR0FBRyxJQUFJLGdCQUFNLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxFQUFDLEtBQUssQ0FBQyxFQUFDO2dCQUNiLEdBQUcsR0FBRywyQkFBaUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEdBQUcsSUFBSSxnQkFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDaEQsQ0FBQztZQUNELE9BQU87aUJBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQztpQkFDUixHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLElBQU0sUUFBUSxHQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILDhCQUFJLEdBQUosVUFBSyxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQVcsRUFBRSxNQUFlO1FBQTdELGlCQW1CQztRQWxCRyxNQUFNLENBQUMsSUFBSSxxQkFBTyxDQUFNLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDcEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMvQyxPQUFPO2lCQUNGLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ1QsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQztpQkFDakMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDO2lCQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNaLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxDQUFDO29CQUNGLElBQU0sUUFBUSxHQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxnQ0FBTSxHQUFOLFVBQU8sSUFBWSxFQUFFLElBQVksRUFBRSxFQUFVLEVBQUUsTUFBVyxFQUFFLE1BQWU7UUFBM0UsaUJBa0JDO1FBakJHLE1BQU0sQ0FBQyxJQUFJLHFCQUFPLENBQU0sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQyxJQUFNLEtBQUssR0FBRyxNQUFNLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ2xFLE9BQU87aUJBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQztpQkFDUixHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2lCQUNqQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ1osR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxnQ0FBTSxHQUFOLFVBQU8sSUFBWSxFQUFFLElBQVksRUFBRSxFQUFXLEVBQUUsTUFBZTtRQUEvRCxpQkFtQkM7UUFsQkcsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBTSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3BDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ1YsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUk7Z0JBQ3JELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDdkMsT0FBTztpQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7aUJBQ2pDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCwwQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBWTtRQUN6QixNQUFNLENBQUksSUFBSSxDQUFDLFFBQVEsV0FBTSxJQUFJLENBQUMsSUFBSSxTQUFJLElBQUksTUFBRyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBZSxHQUFmLFVBQWdCLEdBQVc7UUFDdkIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUNBQU8sR0FBUDtRQUNJLEVBQUUsRUFBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFlBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0wsQ0FBQztJQUVMLHNCQUFDO0FBQUQsQ0FBQztBQXJwQ1ksMENBQWU7QUF3cEM1QixLQUFLO0FBQ0wsc0JBQXNCO0FBQ3RCLHVDQUF1QztBQUN2QyxtRUFBbUU7QUFDbkUsbURBQW1EO0FBQ25ELG9EQUFvRDtBQUNwRCxjQUFjO0FBQ2QsbUJBQW1CO0FBQ25CLDJDQUEyQztBQUMzQyxzQkFBc0I7QUFDdEIsZ0JBQWdCO0FBQ2hCLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFDcEMsd0NBQXdDO0FBQ3hDLDZDQUE2QztBQUM3QyxXQUFXO0FBQ1gsNkJBQTZCO0FBQzdCLHFCQUFxQjtBQUNyQiwyQkFBMkI7QUFDM0IsWUFBWTtBQUNaLGlCQUFpQjtBQUNqQiwyQ0FBMkM7QUFDM0MsWUFBWTtBQUNaLFlBQVk7QUFDWixRQUFRO0FBQ1IsS0FBSztBQUNMLGtHQUFrRztBQUNsRyxtREFBbUQ7QUFDbkQscURBQXFEO0FBQ3JELGNBQWM7QUFDZCxtQkFBbUI7QUFDbkIsMkNBQTJDO0FBQzNDLHNCQUFzQjtBQUN0QixnQkFBZ0I7QUFDaEIsd0NBQXdDO0FBQ3hDLHVDQUF1QztBQUN2Qyw2Q0FBNkM7QUFDN0Msc0NBQXNDO0FBQ3RDLFdBQVc7QUFDWCw2QkFBNkI7QUFDN0IscUJBQXFCO0FBQ3JCLDJCQUEyQjtBQUMzQixZQUFZO0FBQ1osaUJBQWlCO0FBQ2pCLDJDQUEyQztBQUMzQyxZQUFZO0FBQ1osWUFBWTtBQUNaLFFBQVE7QUFDUixLQUFLO0FBQ0wsS0FBSztBQUVMLG9DQUFvQzs7Ozs7OztBQ3AzQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBLENBQUMsd0NBQXdDO0FBQ3pDO0FBQ0EsQ0FBQyxPQUFPO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsU0FBUywrQ0FBK0MsRUFBRTtBQUMxRCxTQUFTLGdEQUFnRCxFQUFFO0FBQzNELFNBQVMsZ0RBQWdELEVBQUU7QUFDM0QsU0FBUyw0Q0FBNEMsRUFBRTtBQUN2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGlCQUFpQjtBQUNsQyxpQkFBaUIsc0NBQXNDOztBQUV2RDtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU87QUFDbEIsV0FBVyxNQUFNO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsU0FBUztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjOztBQUVkLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixhQUFhO0FBQzlCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGFBQWEsaUJBQWlCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGFBQWE7QUFDdkMsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGFBQWEsaUJBQWlCO0FBQ3hEO0FBQ0EsV0FBVyxlQUFlO0FBQzFCLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixvQkFBb0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5REFBeUQsaUJBQWlCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdCQUFnQjtBQUMvQjtBQUNBLFdBQVcsY0FBYztBQUN6QixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxtQkFBbUI7QUFDM0Y7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQixXQUFXLGNBQWM7QUFDekIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsc0JBQXNCLFdBQVcsWUFBWTs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsZ0JBQWdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVEQUF1RCxnQkFBZ0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LGNBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx5QkFBeUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsaUJBQWlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxvQkFBb0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsbUJBQW1CO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDZDQUE2QztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFVBQVUsTUFBTTtBQUNoQixVQUFVLE9BQU87QUFDakI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EscUJBQXFCLFlBQVk7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxVQUFVLElBQUk7QUFDZDtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCLFlBQVksU0FBUztBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxZQUFZLFNBQVM7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7Ozs7Ozs7O0FDcG9DQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7O0FDdkx0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7OztBQ3BCQSxlIiwiZmlsZSI6InBlcnNvbml1bS1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzYyYmY0MzBjZjVmODRjOTE5NTIiLCIvKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgU3RyaW5nXVwiO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBOdW1iZXJdXCI7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbGVhbih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBCb29sZWFuXVwiO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IFVuZGVmaW5lZF1cIjtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICBpc0Zpbml0ZSh2YWx1ZSkgJiZcbiAgICAgICAgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufVxuZXhwb3J0cy5pc0ludGVnZXIgPSBpc0ludGVnZXI7XG4vKipcbiAqIFJldHJpZXZlIHRoZSBVbmljb2RlIGNvZGUgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBpbiB0aGUgc3BlY2lmaWVkXG4gKiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIGZyb20gd2hpY2ggdG8gcmV0cmlldmUgdGhlIFVuaWNvZGUgY29kZSBwb2ludC5cbiAqIEBwYXJhbSBpbmRleCBUaGUgc3BlY2lmaWVkIGluZGV4LlxuICpcbiAqIEByZXR1cm5zIFRoZSBVbmljb2RlIGNvZGUgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDb2RlUG9pbnQoc3RyLCBpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gc3RyLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGluZGV4IGZvciBzcGVjaWZpZWQgc3RyaW5nXCIpO1xuICAgIH1cbiAgICB2YXIgZmlyc3QgPSBzdHIuY2hhckNvZGVBdChpbmRleCk7XG4gICAgaWYgKGZpcnN0ID49IDB4RDgwMCAmJiBmaXJzdCA8PSAweERCRkYgJiYgc3RyLmxlbmd0aCA+IGluZGV4ICsgMSkge1xuICAgICAgICB2YXIgc2Vjb25kID0gc3RyLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgICAgICAgaWYgKHNlY29uZCA+PSAweERDMDAgJiYgc2Vjb25kIDw9IDB4REZGRikge1xuICAgICAgICAgICAgcmV0dXJuIChmaXJzdCAtIDB4RDgwMCkgKiAweDQwMCArIHNlY29uZCAtIDB4REMwMCArIDB4MTAwMDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0O1xufVxuZXhwb3J0cy5nZXRDb2RlUG9pbnQgPSBnZXRDb2RlUG9pbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIG5vZGUuXG4gKlxuICogVGhpcyBjbGFzcyBpcyB0aGUgcm9vdCBjbGFzcyBvZiB0aGUgWE1MIG5vZGUgaGllcmFyY2h5LiBJdCBzaG91bGQgbm90IGJlXG4gKiBkaXJlY3RseSBpbnN0YW50aWF0ZWQ7IG9uZSBvZiBpdHMgc3ViY2xhc3NlcyBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqL1xudmFyIFhtbE5vZGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sTm9kZX0gY2xhc3MuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sTm9kZSgpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sTm9kZS5wcm90b3R5cGUsIFwicGFyZW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHBhcmVudCBvZiB0aGlzIG5vZGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBwYXJlbnQgb2YgdGhpcyBub2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGlzIG5vZGUgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLiBDb25zdWx0IHRoZVxuICAgICAqIGFwcHJvcHJpYXRlIHN1YmNsYXNzIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uc2xpY2UoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBub2RlIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4gYXQgdGhlIHNwZWNpZmllZFxuICAgICAqIGluZGV4LiBUaGUgbm9kZSBpcyBub3QgaW5zZXJ0ZWQgaWYgaXQgaXMgYWxyZWFkeSBwcmVzZW50LiBJZiB0aGlzIG5vZGVcbiAgICAgKiBhbHJlYWR5IGhhcyBhIHBhcmVudCwgaXQgaXMgcmVtb3ZlZCBmcm9tIHRoYXQgcGFyZW50LlxuICAgICAqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGlzIG5vZGUgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLCBvciBpZiB0aGVcbiAgICAgKiBzcGVjaWZpZWQgbm9kZSBjYW5ub3QgYmUgYWRkZWQgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gQ29uc3VsdCB0aGVcbiAgICAgKiBhcHByb3ByaWF0ZSBzdWJjbGFzcyBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIG5vZGUuIE5vZGVzIGF0IG9yIGFmdGVyXG4gICAgICogICAgICAgICAgICAgIHRoZSBpbmRleCBhcmUgc2hpZnRlZCB0byB0aGUgcmlnaHQuIElmIG5vIGluZGV4IGlzXG4gICAgICogICAgICAgICAgICAgIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIGluc2VydGVkIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4sIG9yIHVuZGVmaW5lZCBpZiBub1xuICAgICAqICAgICAgICAgIG5vZGUgd2FzIGluc2VydGVkLlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7IGluZGV4ID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoOyB9XG4gICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBYbWxOb2RlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5vZGUgc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mIFhtbE5vZGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNOdW1iZXIoaW5kZXgpIHx8ICF1dGlsc18xLmlzSW50ZWdlcihpbmRleCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmRleCBzaG91bGQgYmUgYW4gaW50ZWdlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiaW5kZXggc2hvdWxkIHJlc3BlY3QgY2hpbGRyZW4gYXJyYXkgYm91bmRzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbi5pbmRleE9mKG5vZGUpID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKG5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50LnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5fcGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgbm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbm9kZSB0aGF0IGZvbGxvd3MgdGhpcyBvbmUsIG9yIHVuZGVmaW5lZCBpZiBubyBzdWNoIG5vZGVcbiAgICAgKiBleGlzdHMgb3IgaWYgdGhpcyBub2RlIGhhcyBubyBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSB0aGF0IGZvbGxvd3MgdGhpcyBvbmUsIG9yIHVuZGVmaW5lZCBpZiBubyBzdWNoIG5vZGVcbiAgICAgKiAgICAgICAgICBleGlzdHMgb3IgaWYgdGhpcyBub2RlIGhhcyBubyBwYXJlbnQuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNVbmRlZmluZWQodGhpcy5wYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFyZW50Ll9jaGlsZHJlbi5pbmRleE9mKHRoaXMpXG4gICAgICAgICAgICA9PT0gdGhpcy5wYXJlbnQuX2NoaWxkcmVuLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Ll9jaGlsZHJlblt0aGlzLnBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKSArIDFdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbm9kZSB0aGF0IGlzIHByZXZpb3VzIHRvIHRoaXMgb25lLCBvciB1bmRlZmluZWQgaWYgbm8gc3VjaCBub2RlXG4gICAgICogZXhpc3RzIG9yIGlmIHRoaXMgbm9kZSBoYXMgbm8gcGFyZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5vZGUgdGhhdCBpcyBwcmV2aW91cyB0byB0aGlzIG9uZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHN1Y2hcbiAgICAgKiAgICAgICAgICBub2RlIGV4aXN0cyBvciBpZiB0aGlzIG5vZGUgaGFzIG5vIHBhcmVudC5cbiAgICAgKi9cbiAgICBYbWxOb2RlLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YodGhpcykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Ll9jaGlsZHJlblt0aGlzLnBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKSAtIDFdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGlzIG5vZGUgZnJvbSBpdHMgcGFyZW50IGlmIHRoaXMgbm9kZSBoYXMgYSBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG5vZGUncyBwYXJlbnQsIG9yIHVuZGVmaW5lZCBpZiBpdCBoYXMgbm8gcGFyZW50LlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKHRoaXMucGFyZW50KSkge1xuICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRfMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIG5vZGUgZnJvbSB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhpcyBub2RlIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbiwgb3IgaWYgdGhlXG4gICAgICogc3BlY2lmaWVkIG5vZGUgY2Fubm90IGJlIHJlbW92ZWQuIENvbnN1bHQgdGhlIGFwcHJvcHJpYXRlIHN1YmNsYXNzXG4gICAgICogZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gcmVtb3ZlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgV2hldGhlciBhIG5vZGUgd2FzIHJlbW92ZWQuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sTm9kZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vZGUgc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mIFhtbE5vZGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihub2RlKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbm9kZS5fcGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG5vZGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGlzIG5vZGUgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLCBvciBpZiB0aGVcbiAgICAgKiBub2RlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggY2Fubm90IGJlIHJlbW92ZWQuIENvbnN1bHQgdGhlIGFwcHJvcHJpYXRlXG4gICAgICogc3ViY2xhc3MgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSB0byBiZSByZW1vdmVkIGlzIGxvY2F0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSB0aGF0IHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoIXV0aWxzXzEuaXNOdW1iZXIoaW5kZXgpIHx8ICF1dGlsc18xLmlzSW50ZWdlcihpbmRleCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmRleCBzaG91bGQgYmUgYSBudW1iZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuX2NoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJpbmRleCBzaG91bGQgcmVzcGVjdCBjaGlsZHJlbiBhcnJheSBib3VuZHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9jaGlsZHJlbltpbmRleF07XG4gICAgICAgIG5vZGUuX3BhcmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0b1N0cmluZyBub3QgaW1wbGVtZW50ZWQgZm9yIFhtbE5vZGVcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByb290IG5vZGUgb2YgdGhlIGN1cnJlbnQgaGllcmFyY2h5LiBJZiB0aGlzIG5vZGUgaGFzIG5vXG4gICAgICogcGFyZW50LCB0aGlzIG5vZGUgaXRzZWxmIGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIHJvb3Qgbm9kZSBvZiB0aGUgY3VycmVudCBoaWVyYXJjaHkuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUudG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LnRvcCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXJlbnQgb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sTm9kZTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxOb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxOb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBWZXJpZmllcyB0aGF0IHRoZSBzcGVjaWZpZWQgc3RyaW5nIG9ubHkgY29udGFpbnMgY2hhcmFjdGVycyBwZXJtaXR0ZWQgYnkgdGhlXG4gKiBYTUwgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gdmFsaWRhdGUuXG4gKlxuICogQHJldHVybnMgV2hldGhlciB0aGUgc3BlY2lmaWVkIHN0cmluZyBvbmx5IGNvbnRhaW5zIGNoYXJhY3RlcnMgcGVybWl0dGVkIGJ5XG4gKiAgICAgICAgICB0aGUgWE1MIHNwZWNpZmljYXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDaGFyKHN0cikge1xuICAgIHZhciBjaGFyUmVnZXggPSBcIlxcXFx1MDAwOXxcXFxcdTAwMEF8XFxcXHUwMDBEfFtcXFxcdTAwMjAtXFxcXHVEN0ZGXXxcIlxuICAgICAgICArIFwiW1xcXFx1RTAwMC1cXFxcdUZGRkRdXCI7XG4gICAgdmFyIHN1cnJvZ2F0ZUNoYXJSZWdleCA9IFwiW1xcXFx1RDgwMC1cXFxcdURCRkZdW1xcXFx1REMwMC1cXFxcdURGRkZdXCI7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKChcIiArIGNoYXJSZWdleCArIFwiKXwoXCIgKyBzdXJyb2dhdGVDaGFyUmVnZXggKyBcIikpKiRcIilcbiAgICAgICAgLnRlc3Qoc3RyKTtcbn1cbmV4cG9ydHMudmFsaWRhdGVDaGFyID0gdmFsaWRhdGVDaGFyO1xuLyoqXG4gKiBWZXJpZmllcyB0aGF0IHRoZSBzcGVjaWZpZWQgc3RyaW5nIG9ubHkgY29udGFpbnMgYSBzaW5nbGUgY2hhcmFjdGVyLCBhbmRcbiAqIHRoYXQgdGhpcyBjaGFyYWN0ZXIgaXMgcGVybWl0dGVkIGJ5IHRoZSBYTUwgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gdmFsaWRhdGUuXG4gKlxuICogQHJldHVybnMgV2hldGhlciB0aGUgc3BlY2lmaWVkIHN0cmluZyBvbmx5IGNvbnRhaW5zIGEgc2luZ2xlIGNoYXJhY3RlciwgYW5kXG4gKiAgICAgICAgICB0aGF0IHRoaXMgY2hhcmFjdGVyIGlzIHBlcm1pdHRlZCBieSB0aGUgWE1MIHNwZWNpZmljYXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVTaW5nbGVDaGFyKHN0cikge1xuICAgIGlmIChzdHIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXlxcXFx1MDAwOXxcXFxcdTAwMEF8XFxcXHUwMDBEfFtcXFxcdTAwMjAtXFxcXHVEN0ZGXXxcIlxuICAgICAgICAgICAgKyBcIltcXFxcdUUwMDAtXFxcXHVGRkZEXSRcIikudGVzdChzdHIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdHIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXltcXFxcdUQ4MDAtXFxcXHVEQkZGXVtcXFxcdURDMDAtXFxcXHVERkZGXSRcIikudGVzdChzdHIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVTaW5nbGVDaGFyID0gdmFsaWRhdGVTaW5nbGVDaGFyO1xuLyoqXG4gKiBWZXJpZmllcyB0aGF0IHRoZSBzcGVjaWZpZWQgc3RyaW5nIG9ubHkgY29udGFpbnMgY2hhcmFjdGVycyBwZXJtaXR0ZWQgYnkgdGhlXG4gKiBYTUwgc3BlY2lmaWNhdGlvbiBmb3IgbmFtZXMuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHZhbGlkYXRlLlxuICpcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHNwZWNpZmllZCBzdHJpbmcgb25seSBjb250YWlucyBjaGFyYWN0ZXJzIHBlcm1pdHRlZCBieVxuICogICAgICAgICAgdGhlIFhNTCBzcGVjaWZpY2F0aW9uIGZvciBuYW1lcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZU5hbWUoc3RyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbmFtZVN0YXJ0Q2hhciA9IFwiOnxbQS1aXXxffFthLXpdfFtcXFxcdTAwQzAtXFxcXHUwMEQ2XXxbXFxcXHUwMEQ4LVxcXFx1MDBGNl1cIlxuICAgICAgICArIFwifFtcXFxcdTAwRjgtXFxcXHUwMkZGXXxbXFxcXHUwMzcwLVxcXFx1MDM3RF1cIlxuICAgICAgICArIFwifFtcXFxcdTAzN0YtXFxcXHUxRkZGXXxbXFxcXHUyMDBDLVxcXFx1MjAwRF1cIlxuICAgICAgICArIFwifFtcXFxcdTIwNzAtXFxcXHUyMThGXXxbXFxcXHUyQzAwLVxcXFx1MkZFRl1cIlxuICAgICAgICArIFwifFtcXFxcdTMwMDEtXFxcXHVEN0ZGXXxbXFxcXHVGOTAwLVxcXFx1RkRDRl1cIlxuICAgICAgICArIFwifFtcXFxcdUZERjAtXFxcXHVGRkZEXVwiO1xuICAgIHZhciBuYW1lU3RhcnRDaGFyV2l0aFN1cnJvZ2F0ZVBhaXIgPSBcIltcXFxcdUQ4MDAtXFxcXHVEQjdGXVtcXFxcdURDMDAtXFxcXHVERkZGXVwiO1xuICAgIHZhciBuYW1lQ2hhciA9IG5hbWVTdGFydENoYXIgKyBcInwtfFxcXFwufFswLTldfFxcXFx1MDBCN3xbXFxcXHUwMzAwLVxcXFx1MDM2Rl1cIiArXG4gICAgICAgIFwifFtcXFxcdTIwM0YtXFxcXHUyMDQwXVwiO1xuICAgIHZhciBuYW1lQ2hhcldpdGhTdXJyb2dhdGVQYWlyID0gbmFtZUNoYXIgKyBcInxcIiArXG4gICAgICAgIG5hbWVTdGFydENoYXJXaXRoU3Vycm9nYXRlUGFpcjtcbiAgICBpZiAobmV3IFJlZ0V4cChcIl5cIiArIG5hbWVTdGFydENoYXIgKyBcIiRcIikudGVzdChzdHIuY2hhckF0KDApKSkge1xuICAgICAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKFwiICsgbmFtZUNoYXJXaXRoU3Vycm9nYXRlUGFpciArIFwiKSskXCIpXG4gICAgICAgICAgICAudGVzdChzdHIuc3Vic3RyKDEpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RyLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGlmIChuZXcgUmVnRXhwKFwiXlwiICsgbmFtZVN0YXJ0Q2hhcldpdGhTdXJyb2dhdGVQYWlyICsgXCIkXCIpXG4gICAgICAgICAgICAudGVzdChzdHIuc3Vic3RyKDAsIDIpKSkge1xuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXihcIiArIG5hbWVDaGFyV2l0aFN1cnJvZ2F0ZVBhaXIgKyBcIikrJFwiKVxuICAgICAgICAgICAgICAgIC50ZXN0KHN0ci5zdWJzdHIoMikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMudmFsaWRhdGVOYW1lID0gdmFsaWRhdGVOYW1lO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi92YWxpZGF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJU3RyaW5nT3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIFN0cmluZ09wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0cmluZ09wdGlvbnMoc3RyaW5nT3B0aW9ucykge1xuICAgICAgICBpZiAoc3RyaW5nT3B0aW9ucyA9PT0gdm9pZCAwKSB7IHN0cmluZ09wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmRvdWJsZVF1b3RlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluZGVudCA9IFwiICAgIFwiO1xuICAgICAgICB0aGlzLm5ld2xpbmUgPSBcIlxcblwiO1xuICAgICAgICB0aGlzLnByZXR0eSA9IHRydWU7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdChzdHJpbmdPcHRpb25zKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMgc2hvdWxkIGJlIGFuIE9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihzdHJpbmdPcHRpb25zLmRvdWJsZVF1b3RlcykpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChzdHJpbmdPcHRpb25zLmRvdWJsZVF1b3RlcykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5kb3VibGVRdW90ZXMgc2hvdWxkIGJlIGEgYm9vbGVhblwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb3VibGVRdW90ZXMgPSBzdHJpbmdPcHRpb25zLmRvdWJsZVF1b3RlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoc3RyaW5nT3B0aW9ucy5pbmRlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoc3RyaW5nT3B0aW9ucy5pbmRlbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuaW5kZW50IHNob3VsZCBiZSBhIHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnQgPSBzdHJpbmdPcHRpb25zLmluZGVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoc3RyaW5nT3B0aW9ucy5uZXdsaW5lKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKHN0cmluZ09wdGlvbnMubmV3bGluZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5uZXdsaW5lIHNob3VsZCBiZSBhIHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdsaW5lID0gc3RyaW5nT3B0aW9ucy5uZXdsaW5lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc0Jvb2xlYW4oc3RyaW5nT3B0aW9ucy5wcmV0dHkpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoc3RyaW5nT3B0aW9ucy5wcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMucHJldHR5IHNob3VsZCBiZSBhIGJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJldHR5ID0gc3RyaW5nT3B0aW9ucy5wcmV0dHk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZ09wdGlvbnM7XG59KCkpO1xuZXhwb3J0cy5TdHJpbmdPcHRpb25zID0gU3RyaW5nT3B0aW9ucztcbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIElEZWNsYXJhdGlvbk9wdGlvbnMgaW50ZXJmYWNlIHVzZWQgdG8gcHJvdmlkZSBkZWZhdWx0XG4gKiB2YWx1ZXMgdG8gZmllbGRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBEZWNsYXJhdGlvbk9wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlY2xhcmF0aW9uT3B0aW9ucyhkZWNsYXJhdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGRlY2xhcmF0aW9uT3B0aW9ucyA9PT0gdm9pZCAwKSB7IGRlY2xhcmF0aW9uT3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IFwiMS4wXCI7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdChkZWNsYXJhdGlvbk9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucyBzaG91bGQgYmUgYW4gT2JqZWN0IG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoZGVjbGFyYXRpb25PcHRpb25zLmVuY29kaW5nKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKGRlY2xhcmF0aW9uT3B0aW9ucy5lbmNvZGluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5lbmNvZGluZyBzaG91bGQgYmUgYSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5jb2RpbmcgPSBkZWNsYXJhdGlvbk9wdGlvbnMuZW5jb2Rpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGRlY2xhcmF0aW9uT3B0aW9ucy5zdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKGRlY2xhcmF0aW9uT3B0aW9ucy5zdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLnN0YW5kYWxvbmUgc2hvdWxkIGJlIGEgc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YW5kYWxvbmUgPSBkZWNsYXJhdGlvbk9wdGlvbnMuc3RhbmRhbG9uZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoZGVjbGFyYXRpb25PcHRpb25zLnZlcnNpb24pKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZGVjbGFyYXRpb25PcHRpb25zLnZlcnNpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMudmVyc2lvbiBzaG91bGQgYmUgYSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbiA9IGRlY2xhcmF0aW9uT3B0aW9ucy52ZXJzaW9uO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBEZWNsYXJhdGlvbk9wdGlvbnM7XG59KCkpO1xuZXhwb3J0cy5EZWNsYXJhdGlvbk9wdGlvbnMgPSBEZWNsYXJhdGlvbk9wdGlvbnM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL29wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgY29tbWVudC5cbiAqXG4gKiBBbiBYTUwgY2hhcmFjdGVyIHJlZmVyZW5jZSBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7Y29udGVudH1gIGlzXG4gKiB0aGUgdGV4dCBvZiB0aGUgY29tbWVudC5cbiAqXG4gKiBgYGB4bWxcbiAqIDwhLS17Y29udGVudH0tLT5cbiAqIGBgYFxuICpcbiAqIFRoZSBge2NvbnRlbnR9YCB2YWx1ZSBpcyBhIHByb3BlcnR5IG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbENvbW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxDb21tZW50LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sQ29tbWVudH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgY29udGVudCBvZiB0aGUgY29tbWVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxDb21tZW50KGNvbnRlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbENvbW1lbnQucHJvdG90eXBlLCBcImNvbnRlbnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgY29udGVudCBvZiB0aGUgY29tbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIGNvbnRlbnQgb2YgdGhlIGNvbW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgY29tbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGNvbnRlbnQgb2YgdGhlIGNvbW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29udGVudCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb250ZW50IHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBub3QgYWxsb3dlZCBpbiBYTUxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghL14oW14tXXwtW14tXSkqJC8udGVzdChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvbnRlbnQgc2hvdWxkIG5vdCBjb250YWluIHRoZSBzdHJpbmcgJy0tJyBvclwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgZW5kIHdpdGggJy0nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENvbW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENvbW1lbnQucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ29tbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDb21tZW50LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ29tbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ29tbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ29tbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENvbW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbENvbW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIFwiPCEtLVwiICsgdGhpcy5jb250ZW50ICsgXCItLT5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxDb21tZW50O1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sQ29tbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ29tbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICpcbiAqIEFuIFhNTCBwcm9jZXNzaW5nIGluc3RydWN0aW9uIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHt0YXJnZXR9YFxuICogYW5kIGB7Y29udGVudH1gIGFyZSB0aGUgdGFyZ2V0IGFuZCBjb250ZW50IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uXG4gKiByZXNwZWN0aXZlbHkuXG4gKlxuICogYGBgeG1sXG4gKiA8P3t0YXJnZXR9IHtjb250ZW50fT8+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt0YXJnZXR9YCBhbmQgYHtjb250ZW50fWAgdmFsdWVzIGFyZSBwcm9wZXJ0aWVzIG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxQcm9jSW5zdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbFByb2NJbnN0LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sUHJvY0luc3R9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkYXRhIG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLCBvciB1bmRlZmluZWQgaWZcbiAgICAgKiAgICAgICAgICAgICAgICB0aGVyZSBpcyBubyB0YXJnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sUHJvY0luc3QodGFyZ2V0LCBjb250ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgX3RoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbFByb2NJbnN0LnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRhcmdldCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhcmdldCBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInhtbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGFyZ2V0IHNob3VsZCBub3QgYmUgdGhlIHN0cmluZyAneG1sJ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbFByb2NJbnN0LnByb3RvdHlwZSwgXCJjb250ZW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBkYXRhIG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLiBUaGlzIHZhbHVlIG1heSBiZVxuICAgICAgICAgKiAgICAgICAgICB1bmRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgZGF0YSBvZiB0aGUgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uIFRoaXMgdmFsdWUgbWF5IGJlXG4gICAgICAgICAqICAgICAgICAgICAgICAgIHVuZGVmaW5lZC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhjb250ZW50KSAmJiAhdXRpbHNfMS5pc1VuZGVmaW5lZChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJkYXRhIHNob3VsZCBiZSBhIHN0cmluZyBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIG5vdCBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoL1xcPz4vLnRlc3QoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gdGhlIHN0cmluZyAnPz4nXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxQcm9jSW5zdH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sUHJvY0luc3QucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbFByb2NJbnN0LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxQcm9jSW5zdC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sUHJvY0luc3QucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxQcm9jSW5zdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBpZiAodGhpcy5jb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjw/XCIgKyB0aGlzLnRhcmdldCArIFwiPz5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIjw/XCIgKyB0aGlzLnRhcmdldCArIFwiIFwiICsgdGhpcy5jb250ZW50ICsgXCI/PlwiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gWG1sUHJvY0luc3Q7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxQcm9jSW5zdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sUHJvY0luc3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFJlcGxhY2VzIGFtcGVyc2FuZHMgKCYpIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKlxuICogQHJldHVybnMgQSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggYW1wZXJzYW5kcyBlc2NhcGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUFtcGVyc2FuZHMoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIik7XG59XG5leHBvcnRzLmVzY2FwZUFtcGVyc2FuZHMgPSBlc2NhcGVBbXBlcnNhbmRzO1xuLyoqXG4gKiBSZXBsYWNlcyBsZWZ0IGFuZ2xlIGJyYWNrZXRzICgmbHQ7KSB3aXRoIHRoZSBhcHByb3ByaWF0ZSBYTUwgY2hhcmFjdGVyXG4gKiByZWZlcmVuY2UuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqXG4gKiBAcmV0dXJucyBBIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBzdHJpbmcgd2l0aCBsZWZ0IGFuZ2xlIGJyYWNrZXRzIGVzY2FwZWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXNjYXBlTGVmdEFuZ2xlQnJhY2tldHMoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKTtcbn1cbmV4cG9ydHMuZXNjYXBlTGVmdEFuZ2xlQnJhY2tldHMgPSBlc2NhcGVMZWZ0QW5nbGVCcmFja2V0cztcbi8qKlxuICogUmVwbGFjZXMgcmlnaHQgYW5nbGUgYnJhY2tldHMgKCZndDspIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXJcbiAqIHJlZmVyZW5jZSB3aGVuIHBhcnQgb2YgdGhlIHN0cmluZyBcIl1dPlwiLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKlxuICogQHJldHVybnMgQSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggcmlnaHQgYW5nbGUgYnJhY2tldHMgZXNjYXBlZFxuICogICAgICAgICAgd2hlbiBwYXJ0IG9mIHRoZSBzdHJpbmcgXCJdXT5cIi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlc2NhcGVSaWdodEFuZ2xlQnJhY2tldHNJbkNkYXRhVGVybWluYXRvcihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL11dPi9nLCBcIl1dJmd0O1wiKTtcbn1cbmV4cG9ydHMuZXNjYXBlUmlnaHRBbmdsZUJyYWNrZXRzSW5DZGF0YVRlcm1pbmF0b3IgPSBlc2NhcGVSaWdodEFuZ2xlQnJhY2tldHNJbkNkYXRhVGVybWluYXRvcjtcbi8qKlxuICogUmVwbGFjZXMgc2luZ2xlIHF1b3RlcyAoXCIpIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKlxuICogQHJldHVybnMgQSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggc2luZ2xlIHF1b3RlcyBlc2NhcGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVNpbmdsZVF1b3RlcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLycvZywgXCImYXBvcztcIik7XG59XG5leHBvcnRzLmVzY2FwZVNpbmdsZVF1b3RlcyA9IGVzY2FwZVNpbmdsZVF1b3Rlcztcbi8qKlxuICogUmVwbGFjZXMgZG91YmxlIHF1b3RlcyAoXCIpIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKlxuICogQHJldHVybnMgQSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggZG91YmxlIHF1b3RlcyBlc2NhcGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZURvdWJsZVF1b3RlcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xufVxuZXhwb3J0cy5lc2NhcGVEb3VibGVRdW90ZXMgPSBlc2NhcGVEb3VibGVRdW90ZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL2VzY2FwZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIGVzY2FwZV8xID0gcmVxdWlyZShcIi4uL2VzY2FwZVwiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyB0ZXh0IGluIGFuIFhNTCBhdHRyaWJ1dGUgdmFsdWUuXG4gKlxuICogUmVzdHJpY3RlZCBjaGFyYWN0ZXJzLCBzdWNoIGFzIHRoZSBhbXBlcnNhbmQgKGAmYCkgYW5kIHRoZSBvcGVuaW5nIGFuZ2xlXG4gKiBicmFja2V0IChgPGApLCBhcmUgYWxsIGF1dG9tYXRpY2FsbHkgZXNjYXBlZC5cbiAqXG4gKiBUbyBjcmVhdGUgYW4gY2hhcmFjdGVyIHJlZmVyZW5jZSBvciBlbnRpdHkgcmVmZXJlbmNlLCB5b3Ugc2hvdWxkIHVzZVxuICoge0BsaW5rIFhtbENoYXJSZWZ9IG9yIHtAbGluayBYbWxFbnRpdHlSZWZ9IHJlc3BlY3RpdmVseSBpbnN0ZWFkLlxuICpcbiAqIFhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sQXR0cmlidXRlVGV4dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbEF0dHJpYnV0ZVRleHQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sQXR0cmlidXRlVGV4dCh0ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxBdHRyaWJ1dGVUZXh0LnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5vZGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFRleHQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGV4dCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0ZXh0IHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBpbiBYTUxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQXR0cmlidXRlVGV4dH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlVGV4dC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZVRleHQucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGVUZXh0LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlVGV4dC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlVGV4dC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgc3RyID0gdGhpcy50ZXh0O1xuICAgICAgICBzdHIgPSBlc2NhcGVfMS5lc2NhcGVBbXBlcnNhbmRzKHN0cik7XG4gICAgICAgIHN0ciA9IGVzY2FwZV8xLmVzY2FwZUxlZnRBbmdsZUJyYWNrZXRzKHN0cik7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sQXR0cmlidXRlVGV4dDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbEF0dHJpYnV0ZVRleHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbEF0dHJpYnV0ZVRleHQuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgY2hhcmFjdGVyIHJlZmVyZW5jZS5cbiAqXG4gKiBBbiBYTUwgY2hhcmFjdGVyIHJlZmVyZW5jZSBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7ZGVjfWAgaXMgdGhlXG4gKiBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGNvZGUgcG9pbnQgY29ycmVzcG9uZGluZyB0byBhIHBhcnRpY3VsYXIgVW5pY29kZVxuICogY2hhcmFjdGVyOlxuICpcbiAqIGBgYHhtbFxuICogJiN7ZGVjfTtcbiAqIGBgYFxuICpcbiAqIFRoZSBjb3JyZXNwb25kaW5nIGhleGFkZWNpbWFsIHZlcnNpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZVxuICogYHtoZXh9YCBpcyB0aGUgaGV4YWRlY2ltYWwgcmVwcmVzZW50YXRpb24gY29kZSBwb2ludCBjb3JyZXNwb25kaW5nIHRvIGFcbiAqIHBhcnRpY3VsYXIgVW5pY29kZSBjaGFyYWN0ZXI6XG4gKlxuICogYGBgeG1sXG4gKiAmI3h7aGV4fTtcbiAqIGBgYFxuICpcbiAqIFVuaWNvZGUgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSBCYXNpYyBNdWx0aWxpbmd1YWwgUGxhbmUgYXJlIHJlcHJlc2VudGVkXG4gKiB1c2luZyBhIHN1cnJvZ2F0ZSBwYWlyIGNvbnNpc3Rpbmcgb2YgdHdvIGNoYXJhY3RlciByZWZlcmVuY2VzLlxuICpcbiAqIFRoZSBge2RlY31gIGFuZCBge2hleH1gIHZhbHVlcyBhcmUgZGVmaW5lZCBieSB0aGUgYGNoYXJgIGFuZCBgaGV4YFxuICogcHJvcGVydGllcyBvZiB0aGlzIG5vZGU7IHRoZSBmb3JtZXIgaXMgdGhlIGNoYXJhY3RlciB0byBiZSByZXByZXNlbnRlZCB3aGlsZVxuICogdGhlIGxhdHRlciBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZGVjaW1hbCBvciBoZXhhZGVjaW1hbCByZXByZXNlbnRhdGlvblxuICogc2hvdWxkIGJlIHVzZWQuXG4gKlxuICogWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxDaGFyUmVmID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sQ2hhclJlZiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbENoYXJSZWZ9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYXIgVGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gaGV4IFdoZXRoZXIgdG8gdXNlIHRoZSBoZXhhZGVjaW1hbCBvciBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGZvclxuICAgICAqICAgICAgICAgICAgdGhlIHJlZmVyZW5jZS4gSWYgbGVmdCB1bmRlZmluZWQsIGRlY2ltYWwgaXMgdGhlIGRlZmF1bHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sQ2hhclJlZihjaGFyLCBoZXgpIHtcbiAgICAgICAgaWYgKGhleCA9PT0gdm9pZCAwKSB7IGhleCA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNoYXIgPSBjaGFyO1xuICAgICAgICBfdGhpcy5oZXggPSBoZXg7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbENoYXJSZWYucHJvdG90eXBlLCBcImNoYXJcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgY2hhcmFjdGVyIHRvIHJlcHJlc2VudCB1c2luZyB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgY2hhcmFjdGVyIHRvIHJlcHJlc2VudCB1c2luZyB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhcjtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGNoYXIgVGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGNoYXIpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhjaGFyKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjaGFyIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlU2luZ2xlQ2hhcihjaGFyKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNoYXIgc2hvdWxkIGNvbnRhaW4gYSBzaW5nbGUgY2hhcmFjdGVyLCBhbmQgdGhpc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgY2hhcmFjdGVyIHNob3VsZCBiZSBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NoYXIgPSBjaGFyO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sQ2hhclJlZi5wcm90b3R5cGUsIFwiaGV4XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgd2hldGhlciBvciBub3QgdG8gdXNlIHRoZSBoZXhhZGVjaW1hbCBvciBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGZvclxuICAgICAgICAgKiB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBXaGV0aGVyIG9yIG5vdCB0byB1c2UgdGhlIGhleGFkZWNpbWFsIG9yIGRlY2ltYWwgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICogICAgICAgICAgZm9yIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZXg7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHdoZXRoZXIgb3Igbm90IHRvIHVzZSB0aGUgaGV4YWRlY2ltYWwgb3IgZGVjaW1hbCByZXByZXNlbnRhdGlvbiBmb3JcbiAgICAgICAgICogdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGhleCBXaGV0aGVyIG9yIG5vdCB0byB1c2UgdGhlIGhleGFkZWNpbWFsIG9yIGRlY2ltYWxcbiAgICAgICAgICogICAgICAgICAgICByZXByZXNlbnRhdGlvbiBmb3IgdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGhleCkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihoZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImhleCBzaG91bGQgYmUgYSBib29sZWFuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faGV4ID0gaGV4O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDaGFyUmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyUmVmLnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2hhclJlZi5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENoYXJSZWYucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyUmVmLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxDaGFyUmVmLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBjaGFyO1xuICAgICAgICBpZiAodGhpcy5jaGFyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY2hhciA9IHRoaXMuY2hhci5jaGFyQ29kZUF0KDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hhciA9IHV0aWxzXzEuZ2V0Q29kZVBvaW50KHRoaXMuY2hhciwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gXCImI3hcIiArIGNoYXIudG9TdHJpbmcoMTYpICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCImI1wiICsgY2hhciArIFwiO1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gWG1sQ2hhclJlZjtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbENoYXJSZWY7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbENoYXJSZWYuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgZW50aXR5IHJlZmVyZW5jZS5cbiAqXG4gKiBBbiBYTUwgZW50aXR5IHJlZmVyZW5jZSBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlXG4gKiBge2VudGl0eX1gIGlzIG5hbWUgb2YgdGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkOlxuICpcbiAqIGBgYHhtbFxuICogJntlbnRpdHl9O1xuICogYGBgXG4gKlxuICogVGhlIGB7ZW50aXR5fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbEVudGl0eVJlZiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbEVudGl0eVJlZiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbEVudGl0eVJlZn0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxFbnRpdHlSZWYoZW50aXR5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmVudGl0eSA9IGVudGl0eTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sRW50aXR5UmVmLnByb3RvdHlwZSwgXCJlbnRpdHlcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VudGl0eTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGVudGl0eSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZW50aXR5IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlTmFtZShlbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZW50aXR5IHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIiBub3QgYWxsb3dlZCBpbiBYTUwgbmFtZXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbEVudGl0eVJlZn0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRW50aXR5UmVmLnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbEVudGl0eVJlZi5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxFbnRpdHlSZWYucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRW50aXR5UmVmLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbEVudGl0eVJlZi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gXCImXCIgKyB0aGlzLmVudGl0eSArIFwiO1wiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbEVudGl0eVJlZjtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbEVudGl0eVJlZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRW50aXR5UmVmLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG51bGwgIT09IG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBlc2NhcGVfMSA9IHJlcXVpcmUoXCIuLi9lc2NhcGVcIik7XG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL29wdGlvbnNcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbEF0dHJpYnV0ZVRleHRfMSA9IHJlcXVpcmUoXCIuL1htbEF0dHJpYnV0ZVRleHRcIik7XG52YXIgWG1sQ2hhclJlZl8xID0gcmVxdWlyZShcIi4vWG1sQ2hhclJlZlwiKTtcbnZhciBYbWxFbnRpdHlSZWZfMSA9IHJlcXVpcmUoXCIuL1htbEVudGl0eVJlZlwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBlbGVtZW50IGF0dHJpYnV0ZS5cbiAqXG4gKiBBbiBYTUwgZWxlbWVudCBhdHRyaWJ1dGUgaXMgcGFydCBvZiB0aGUgc3RhcnQgdGFnIG9mIGFuIGVsZW1lbnQgYW5kIGlzXG4gKiBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7bmFtZX1gIGlzIHRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgYW5kXG4gKiBge3ZhbHVlfWAgaXMgdGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGU6XG4gKlxuICogYGBgeG1sXG4gKiA8ZWxlbWVudCB7bmFtZX09XCJ7dmFsdWV9XCI+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHtuYW1lfWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUsIHdoaWxlIHRoZSBge3ZhbHVlfWAgcHJvcGVydHlcbiAqIGNvbnNpc3RzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sQXR0cmlidXRlIG5vZGVzIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hpbGQsIGFuZCBjYW4gaGF2ZSBhbiB1bmxpbWl0ZWRcbiAqIG51bWJlciBvZiB7QGxpbmsgWG1sQXR0cmlidXRlVGV4dH0sIHtAbGluayBYbWxDaGFyUmVmfSwgYW5kXG4gKiB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBhcyBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbEF0dHJpYnV0ZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbEF0dHJpYnV0ZSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbEF0dHJpYnV0ZX0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgWE1MIGF0dHJpYnV0ZS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIFhNTCBhdHRyaWJ1dGUuIEFkZGl0aW9uYWwgY2hpbGRyZW5cbiAgICAgKiAgICAgICAgICAgICAgY2FuIGJlIGFkZGVkIGxhdGVyLiBPbmx5IHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSxcbiAgICAgKiAgICAgICAgICAgICAge0BsaW5rIFhtbENoYXJSZWZ9LCBhbmQge0BsaW5rIFhtbEVudGl0eVJlZn0gbm9kZXMgYXJlXG4gICAgICogICAgICAgICAgICAgIHBlcm1pdHRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGlmICh1dGlsc18xLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHZhbHVlXzEgPSB2YWx1ZTsgX2kgPCB2YWx1ZV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdmFsdWVfMVtfaV07XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zZXJ0Q2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRDaGlsZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sQXR0cmlidXRlLnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG5hbWUgb2YgdGhpcyBhdHRyaWJ1dGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoaXMgYXR0cmlidXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIG5hbWUgb2YgdGhpcyBhdHRyaWJ1dGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoaXMgYXR0cmlidXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVOYW1lKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibmFtZSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVycyBub3RcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGFsbG93ZWQgaW4gWE1MIG5hbWVzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgWE1MIGNoYXJhY3RlciByZWZlcmVuY2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFyIFRoZSBjaGFyYWN0ZXIgdG8gcmVwcmVzZW50IHVzaW5nIHRoZSByZWZlcmVuY2UuXG4gICAgICogQHBhcmFtIGhleCBXaGV0aGVyIHRvIHVzZSB0aGUgaGV4YWRlY2ltYWwgb3IgZGVjaW1hbCByZXByZXNlbnRhdGlvbiBmb3JcbiAgICAgKiAgICAgICAgICAgIHRoZSByZWZlcmVuY2UuIElmIGxlZnQgdW5kZWZpbmVkLCBkZWNpbWFsIGlzIHRoZSBkZWZhdWx0LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiAgICAgICAgICAgICAgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBYTUwgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlLnByb3RvdHlwZS5jaGFyUmVmID0gZnVuY3Rpb24gKGNoYXIsIGhleCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNoYXJSZWYgPSBuZXcgWG1sQ2hhclJlZl8xLmRlZmF1bHQoY2hhciwgaGV4KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChjaGFyUmVmLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBjaGFyUmVmO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBYTUwgZW50aXR5IHJlZmVyZW5jZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBUaGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGUucHJvdG90eXBlLmVudGl0eVJlZiA9IGZ1bmN0aW9uIChlbnRpdHksIGluZGV4KSB7XG4gICAgICAgIHZhciBjaGFyUmVmID0gbmV3IFhtbEVudGl0eVJlZl8xLmRlZmF1bHQoZW50aXR5KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChjaGFyUmVmLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBjaGFyUmVmO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIG5vZGUgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiBhdCB0aGUgc3BlY2lmaWVkXG4gICAgICogaW5kZXguIFRoZSBub2RlIGlzIG5vdCBpbnNlcnRlZCBpZiBpdCBpcyBhbHJlYWR5IHByZXNlbnQuIElmIHRoaXMgbm9kZVxuICAgICAqIGFscmVhZHkgaGFzIGEgcGFyZW50LCBpdCBpcyByZW1vdmVkIGZyb20gdGhhdCBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgb25seSB7QGxpbmsgWG1sQ2hhclJlZn0sIHtAbGluayBYbWxFbnRpdHlSZWZ9LCBhbmRcbiAgICAgKiB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbiBiZSBpbnNlcnRlZDsgb3RoZXJ3aXNlLCBhbiBleGNlcHRpb24gd2lsbFxuICAgICAqIGJlIHRocm93bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgbm9kZS4gTm9kZXMgYXQgb3IgYWZ0ZXIgdGhlXG4gICAgICogICAgICAgICAgICAgIGluZGV4IGFyZSBzaGlmdGVkIHRvIHRoZSByaWdodC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkLFxuICAgICAqICAgICAgICAgICAgICB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5vZGUgaW5zZXJ0ZWQgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiwgb3IgdW5kZWZpbmVkIGlmIG5vXG4gICAgICogICAgICAgICAgbm9kZSB3YXMgaW5zZXJ0ZWQuXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlLnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sQ2hhclJlZl8xLmRlZmF1bHQgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbEVudGl0eVJlZl8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxBdHRyaWJ1dGVUZXh0XzEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJub2RlIHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBYbWxDaGFyUmVmLFwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxFbnRpdHlSZWYsIG9yIFhtbEF0dHJpYnV0ZVRleHRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQuY2FsbCh0aGlzLCBub2RlLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgbm9kZSBmcm9tIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoaXMgbm9kZSBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGNoaWxkLiBBdHRlbXB0cyB0byByZW1vdmVcbiAgICAgKiB0aGUgbGFzdCBjaGlsZCBub2RlIHdpbGwgcmVzdWx0IGluIGFuIGV4Y2VwdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgYSBub2RlIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxBdHRyaWJ1dGUgbm9kZXMgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGlsZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZC5jYWxsKHRoaXMsIG5vZGUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbm9kZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBub2RlIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hpbGQuIEF0dGVtcHRzIHRvIHJlbW92ZVxuICAgICAqIHRoZSBsYXN0IGNoaWxkIG5vZGUgd2lsbCByZXN1bHQgaW4gYW4gZXhjZXB0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSB0byBiZSByZW1vdmVkIGlzIGxvY2F0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSB0aGF0IHdhcyByZW1vdmVkLCBvciB1bmRlZmluZWQgaWYgbm8gbm9kZSB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGUucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxBdHRyaWJ1dGUgbm9kZXMgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGlsZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXguY2FsbCh0aGlzLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IFhNTCB0ZXh0IG5vZGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IEFyYml0cmFyeSBjaGFyYWN0ZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgWE1MIGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZS5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBpbmRleCkge1xuICAgICAgICB2YXIgdGV4dE5vZGUgPSBuZXcgWG1sQXR0cmlidXRlVGV4dF8xLmRlZmF1bHQodGV4dCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQodGV4dE5vZGUsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRleHROb2RlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgb3B0aW9uc09iaiA9IG5ldyBvcHRpb25zXzEuU3RyaW5nT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdmFyIHF1b3RlID0gb3B0aW9uc09iai5kb3VibGVRdW90ZXMgPyBcIlxcXCJcIiA6IFwiJ1wiO1xuICAgICAgICB2YXIgc3RyID0gdGhpcy5uYW1lICsgXCI9XCIgKyBxdW90ZTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX2NoaWxkcmVuOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmouZG91YmxlUXVvdGVzKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGVzY2FwZV8xLmVzY2FwZURvdWJsZVF1b3RlcyhjaGlsZC50b1N0cmluZyhvcHRpb25zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gZXNjYXBlXzEuZXNjYXBlU2luZ2xlUXVvdGVzKGNoaWxkLnRvU3RyaW5nKG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdHIgKz0gcXVvdGU7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sQXR0cmlidXRlO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sQXR0cmlidXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxBdHRyaWJ1dGUuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIENEQVRBIHNlY3Rpb24uXG4gKlxuICogQW4gWE1MIENEQVRBIHNlY3Rpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge2RhdGF9YCBpcyB0aGVcbiAqIGNoYXJhY3RlciBkYXRhIG9mIHRoZSBzZWN0aW9uOlxuICpcbiAqIGBgYHhtbFxuICogPCFbQ0RBVEFbe2RhdGF9XV0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHtkYXRhfWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sQ2RhdGEgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sQ2RhdGEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxDZGF0YSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbENkYXRhfSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBjaGFyYWN0ZXIgZGF0YSBvZiB0aGUgQ0RBVEEgc2VjdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxDZGF0YShkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxDZGF0YS5wcm90b3R5cGUsIFwiZGF0YVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBjaGFyYWN0ZXIgZGF0YSBvZiB0aGUgQ0RBVEEgc2VjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIGNoYXJhY3RlciBkYXRhIG9mIHRoZSBDREFUQSBzZWN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGNoYXJhY3RlciBkYXRhIG9mIHRoZSBDREFUQSBzZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZGF0YSBUaGUgY2hhcmFjdGVyIGRhdGEgb2YgdGhlIENEQVRBIHNlY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2hhcmFjdGVyIGRhdGEgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVDaGFyKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhcmFjdGVyIGRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKC9dXT4vLnRlc3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIHNob3VsZCBub3QgY29udGFpbiB0aGUgc3RyaW5nICddXT4nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENkYXRhfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDZGF0YS5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENkYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2RhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2RhdGEucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENkYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2RhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENkYXRhLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENkYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2RhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDZGF0YS5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENkYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbENkYXRhLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIjwhW0NEQVRBW1wiICsgdGhpcy5kYXRhICsgXCJdXT5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxDZGF0YTtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbENkYXRhO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxDZGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBlc2NhcGVfMSA9IHJlcXVpcmUoXCIuLi9lc2NhcGVcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgY2hhcmFjdGVyIGRhdGEgaW4gYW4gWE1MIGRvY3VtZW50LlxuICpcbiAqIFJlc3RyaWN0ZWQgY2hhcmFjdGVycywgc3VjaCBhcyB0aGUgYW1wZXJzYW5kIChgJmApLCB0aGUgb3BlbmluZyBhbmdsZVxuICogYnJhY2tldCAoYDxgKSwgYW5kIHRoZSBjbG9zaW5nIGFuZ2xlIGJyYWNrZXQgKGA+YCkgd2hlbiBpdCBhcHBlYXJzIGluIHRoZVxuICogc3RyaW5nIGBdXT5gLCBhcmUgYWxsIGF1dG9tYXRpY2FsbHkgZXNjYXBlZC5cbiAqXG4gKiBUbyBjcmVhdGUgYW4gY2hhcmFjdGVyIHJlZmVyZW5jZSBvciBlbnRpdHkgcmVmZXJlbmNlLCB5b3Ugc2hvdWxkIHVzZVxuICoge0BsaW5rIFhtbENoYXJSZWZ9IG9yIHtAbGluayBYbWxFbnRpdHlSZWZ9IHJlc3BlY3RpdmVseSBpbnN0ZWFkLlxuICpcbiAqIFhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbENoYXJEYXRhID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sQ2hhckRhdGEsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxDaGFyRGF0YX0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhckRhdGEgQ2hhcmFjdGVyIGRhdGEuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sQ2hhckRhdGEoY2hhckRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2hhckRhdGEgPSBjaGFyRGF0YTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sQ2hhckRhdGEucHJvdG90eXBlLCBcImNoYXJEYXRhXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGNoYXJhY3RlciBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5vZGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBjaGFyYWN0ZXIgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhckRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBjaGFyYWN0ZXIgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gY2hhckRhdGEgQ2hhcmFjdGVyIGRhdGEuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChjaGFyRGF0YSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGNoYXJEYXRhKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjaGFyRGF0YSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoY2hhckRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhckRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90IGFsbG93ZWRcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NoYXJEYXRhID0gY2hhckRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJEYXRhfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyRGF0YS5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2hhckRhdGEucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENoYXJEYXRhLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyRGF0YS5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbENoYXJEYXRhLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLmNoYXJEYXRhO1xuICAgICAgICBzdHIgPSBlc2NhcGVfMS5lc2NhcGVBbXBlcnNhbmRzKHN0cik7XG4gICAgICAgIHN0ciA9IGVzY2FwZV8xLmVzY2FwZUxlZnRBbmdsZUJyYWNrZXRzKHN0cik7XG4gICAgICAgIHN0ciA9IGVzY2FwZV8xLmVzY2FwZVJpZ2h0QW5nbGVCcmFja2V0c0luQ2RhdGFUZXJtaW5hdG9yKHN0cik7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sQ2hhckRhdGE7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxDaGFyRGF0YTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhckRhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL29wdGlvbnNcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBkZWNsYXJhdGlvbi5cbiAqXG4gKiBBbiBYTUwgZGVjbGFyYXRpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge3ZlcnNpb259YCBpcyB0aGUgWE1MXG4gKiB2ZXJzaW9uLCBge2VuY29kaW5nfWAgaXMgdGhlIGVuY29kaW5nIG9mIHRoZSBkb2N1bWVudCwgYW5kIGB7c3RhbmRhbG9uZX1gXG4gKiBpcyBlaXRoZXIgXCJ5ZXNcIiBvciBcIm5vXCIsIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBkb2N1bWVudCBtYXkgY29udGFpblxuICogZXh0ZXJuYWwgbWFya3VwIGRlY2xhcmF0aW9uczpcbiAqXG4gKiBgYGB4bWxcbiAqIDw/eG1sIHZlcnNpb249XCJ7dmVyc2lvbn1cIiBlbmNvZGluZz1cIntlbmNvZGluZ31cIiBzdGFuZGFsb25lPVwie3N0YW5kYWxvbmV9XCI/PlxuICogYGBgXG4gKlxuICogVGhlIGB7dmVyc2lvbn1gLCBge2VuY29kaW5nfWAsIGFuZCBge3N0YW5kYWxvbmV9YCB2YWx1ZXMgYXJlIHByb3BlcnRpZXMgb2ZcbiAqIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxEZWNsIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbERlY2wgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEZWNsLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sRGVjbH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEZWNsKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgdmFyIG9wdGlvbnNPYmogPSBuZXcgb3B0aW9uc18xLkRlY2xhcmF0aW9uT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgX3RoaXMuZW5jb2RpbmcgPSBvcHRpb25zT2JqLmVuY29kaW5nO1xuICAgICAgICBfdGhpcy5zdGFuZGFsb25lID0gb3B0aW9uc09iai5zdGFuZGFsb25lO1xuICAgICAgICBfdGhpcy52ZXJzaW9uID0gb3B0aW9uc09iai52ZXJzaW9uO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEZWNsLnByb3RvdHlwZSwgXCJlbmNvZGluZ1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBYTUwgZW5jb2RpbmcgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgWE1MIGVuY29kaW5nIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi4gVGhpcyB2YWx1ZVxuICAgICAgICAgKiAgICAgICAgICBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBYTUwgZW5jb2RpbmcgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZW5jb2RpbmcgVGhlIFhNTCBlbmNvZGluZyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uIFRoaXNcbiAgICAgICAgICogICAgICAgICAgICAgICAgIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBlbmNvZGluZy4gSWYgbGVmdCB1bmRlZmluZWQsIG5vXG4gICAgICAgICAqICAgICAgICAgICAgICAgICBlbmNvZGluZyBpcyBpbmNsdWRlZC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gICAgICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyhlbmNvZGluZykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIS9eW0EtWmEtel1bQS1aYS16MC05Ll8tXSokLy50ZXN0KGVuY29kaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlbmNvZGluZyBzaG91bGQgYmUgYSB2YWxpZCBYTUwgZW5jb2RpbmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZW5jb2RpbmcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VuY29kaW5nID0gZW5jb2Rpbmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEZWNsLnByb3RvdHlwZSwgXCJzdGFuZGFsb25lXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIFhNTCBzdGFuZGFsb25lIGF0dHJpYnV0ZSB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBYTUwgc3RhbmRhbG9uZSBhdHRyaWJ1dGUgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKiAgICAgICAgICBUaGlzIHZhbHVlIG1heSBiZSB1bmRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFuZGFsb25lO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgWE1MIHN0YW5kYWxvbmUgYXR0cmlidXRlIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHN0YW5kYWxvbmUgVGhlIFhNTCBzdGFuZGFsb25lIGF0dHJpYnV0ZSB0byBiZSBpbmNsdWRlZC4gVGhpc1xuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICB2YWx1ZSBtdXN0IGJlIFwieWVzXCIgb3IgXCJub1wiLiBJZiBsZWZ0IHVuZGVmaW5lZCwgbm9cbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgc3RhbmRhbG9uZSBhdHRyaWJ1dGUgaXMgaW5jbHVkZWQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzdGFuZGFsb25lKSB7XG4gICAgICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyhzdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgICAgIGlmICghL14oeWVzfG5vKSQvLnRlc3Qoc3RhbmRhbG9uZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3RhbmRhbG9uZSBzaG91bGQgYmUgZWl0aGVyIHRoZSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiAneWVzJyBvciB0aGUgc3RyaW5nICdubydcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoc3RhbmRhbG9uZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwic3RhbmRhbG9uZSBzaG91bGQgYmUgYSBzdHJpbmcgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3RhbmRhbG9uZSA9IHN0YW5kYWxvbmU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEZWNsLnByb3RvdHlwZSwgXCJ2ZXJzaW9uXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIFhNTCB2ZXJzaW9uIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIFhNTCB2ZXJzaW9uIHRvIHRiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgWE1MIHZlcnNpb24gdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gdmVyc2lvbiBUaGUgWE1MIHZlcnNpb24gdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLiBUaGlzXG4gICAgICAgICAqICAgICAgICAgICAgICAgIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBYTUwgdmVyc2lvbiBudW1iZXIuIElmIGxlZnRcbiAgICAgICAgICogICAgICAgICAgICAgICAgdW5kZWZpbmVkLCB0aGUgZGVmYXVsdCB2ZXJzaW9uIGlzIFwiMS4wXCIuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcodmVyc2lvbikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidmVyc2lvbiBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghL14xXFwuWzAtOV0rJC8udGVzdCh2ZXJzaW9uKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInZlcnNpb24gc2hvdWxkIGJlIGEgdmFsaWQgWE1MIHZlcnNpb25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRGVjbH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRGVjbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEZWNsfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbERlY2wucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEZWNsfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEZWNsLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEZWNsfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRGVjbC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRGVjbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgb3B0aW9uc09iaiA9IG5ldyBvcHRpb25zXzEuU3RyaW5nT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdmFyIHF1b3RlID0gb3B0aW9uc09iai5kb3VibGVRdW90ZXMgPyAnXCInIDogXCInXCI7XG4gICAgICAgIHZhciBzdHIgPSBcIjw/eG1sIHZlcnNpb249XCIgKyBxdW90ZSArIHRoaXMudmVyc2lvbiArIHF1b3RlO1xuICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyh0aGlzLmVuY29kaW5nKSkge1xuICAgICAgICAgICAgc3RyICs9IFwiIGVuY29kaW5nPVwiICsgcXVvdGUgKyB0aGlzLmVuY29kaW5nICsgcXVvdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzXzEuaXNTdHJpbmcodGhpcy5zdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgc3RyICs9IFwiIHN0YW5kYWxvbmU9XCIgKyBxdW90ZSArIHRoaXMuc3RhbmRhbG9uZSArIHF1b3RlO1xuICAgICAgICB9XG4gICAgICAgIHN0ciArPSBcIj8+XCI7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRGVjbDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbERlY2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbERlY2wuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL29wdGlvbnNcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbENvbW1lbnRfMSA9IHJlcXVpcmUoXCIuL1htbENvbW1lbnRcIik7XG52YXIgWG1sRHRkQXR0bGlzdF8xID0gcmVxdWlyZShcIi4vWG1sRHRkQXR0bGlzdFwiKTtcbnZhciBYbWxEdGRFbGVtZW50XzEgPSByZXF1aXJlKFwiLi9YbWxEdGRFbGVtZW50XCIpO1xudmFyIFhtbER0ZEVudGl0eV8xID0gcmVxdWlyZShcIi4vWG1sRHRkRW50aXR5XCIpO1xudmFyIFhtbER0ZE5vdGF0aW9uXzEgPSByZXF1aXJlKFwiLi9YbWxEdGROb3RhdGlvblwiKTtcbnZhciBYbWxEdGRQYXJhbUVudGl0eVJlZl8xID0gcmVxdWlyZShcIi4vWG1sRHRkUGFyYW1FbnRpdHlSZWZcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbnZhciBYbWxQcm9jSW5zdF8xID0gcmVxdWlyZShcIi4vWG1sUHJvY0luc3RcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbiAoRFREKS5cbiAqXG4gKiBBbiBYTUwgZG9jdW1lbnQgdHlwZSBkZWZpbml0aW9uICBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7bmFtZX1gIGlzXG4gKiB0aGUgbmFtZSBvZiB0aGUgRFRELCBge3N5c0lkfWAgaXMgdGhlIHN5c3RlbSBpZGVudGlmaWVyIG9mIHRoZSBEVEQsXG4gKiBge3B1YklkfWAgaXMgdGhlIHB1YmxpYyBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGFuZCBge2ludFN1YnNldH1gIGlzIHRoZVxuICogaW50ZXJuYWwgc3Vic2V0IG9mIHRoZSBEVEQ6XG4gKlxuICogYGBgeG1sXG4gKiA8IURPQ1RZUEUge25hbWV9IFNZU1RFTSBcIntzeXNJZH1cIiBQVUJMSUMgXCJ7cHViSWR9XCIgW1xuICogICAgIHtpbnRTdWJzZXR9XG4gKiBdPlxuICogYGBgXG4gKlxuICogVGhlIGB7bmFtZX1gLCBge3B1YklkfWAsIGFuZCBge3N5c0lkfWAgdmFsdWVzIGFyZSBwcm9wZXJ0aWVzIG9mIHRoZSBub2RlLFxuICogd2hpbGUgdGhlIGB7aW50U3Vic2V0fWAgdmFsdWUgY29uc2lzdHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxEdGQgbm9kZXMgY2FuIGhhdmUgYW4gdW5saW1pdGVkIG51bWJlciBvZiB7QGxpbmsgWG1sQ29tbWVudH0sXG4gKiB7QGxpbmsgWG1sRHRkQXR0bGlzdH0sIHtAbGluayBYbWxEdGRFbGVtZW50fSwge0BsaW5rIFhtbER0ZEVudGl0eX0sXG4gKiB7QGxpbmsgWG1sRHRkTm90YXRpb259LCB7QGxpbmsgWG1sRHRkUGFyYW1FbnRpdHlSZWZ9LCBhbmRcbiAqIHtAbGluayBYbWxQcm9jSW5zdH0gbm9kZXMuXG4gKi9cbnZhciBYbWxEdGQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEdGQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEdGR9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIERURC5cbiAgICAgKiBAcGFyYW0gc3lzSWQgVGhlIHN5c3RlbSBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICogQHBhcmFtIHB1YklkIFRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAqICAgICAgICAgICAgICBJZiBhIHB1YmxpYyBpZGVudGlmaWVyIGlzIHByb3ZpZGVkLCBhIHN5c3RlbSBpZGVudGlmaWVyXG4gICAgICogICAgICAgICAgICAgIG11c3QgYmUgcHJvdmlkZWQgYXMgd2VsbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGQobmFtZSwgc3lzSWQsIHB1YklkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBfdGhpcy5zeXNJZCA9IHN5c0lkO1xuICAgICAgICBfdGhpcy5wdWJJZCA9IHB1YklkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGQucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgRFRELlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbmFtZSBvZiB0aGUgRFRELlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIERURC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIERURC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJuYW1lIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlTmFtZShuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5hbWUgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBhbGxvd2VkIGluIFhNTCBuYW1lc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sRHRkLnByb3RvdHlwZSwgXCJwdWJJZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgcHVibGljIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgICAgICogICAgICAgICAgVGhpcyB2YWx1ZSBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHViSWQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLiBJZiBhXG4gICAgICAgICAqIHB1YmxpYyBpZGVudGlmaWVyIGlzIHByb3ZpZGVkLCBhIHN5c3RlbSBpZGVudGlmaWVyIG11c3QgYmUgcHJvdmlkZWQgYXNcbiAgICAgICAgICogd2VsbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHB1YklkIFRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKiAgICAgICAgICAgICAgVGhpcyB2YWx1ZSBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocHViSWQpIHtcbiAgICAgICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKHB1YklkKSkge1xuICAgICAgICAgICAgICAgIGlmICghL14oXFx1MDAyMHxcXHUwMDBEfFxcdTAwMEF8W2EtekEtWjAtOV18Wy0nKCkrLC4vOj0/OyEqI0AkXyVdKSokL1xuICAgICAgICAgICAgICAgICAgICAudGVzdChwdWJJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHViSWQgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgYWxsb3dlZCBpbiBwdWJsaWMgaWRlbnRpZmllcnNcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHV0aWxzXzEuaXNVbmRlZmluZWQodGhpcy5zeXNJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHViSWQgc2hvdWxkIG5vdCBiZSBkZWZpbmVkIGlmIHN5c0lkIGlzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKHB1YklkKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJwdWJJZCBzaG91bGQgYmUgYSBzdHJpbmcgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcHViSWQgPSBwdWJJZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZC5wcm90b3R5cGUsIFwic3lzSWRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgc3lzdGVtIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIHN5c3RlbSBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICAgICAqICAgICAgICAgIFRoaXMgdmFsdWUgbWF5IGJlIHVuZGVmaW5lZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N5c0lkO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgc3lzdGVtIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHN5c0lkIFRoZSBzeXN0ZW0gaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKiAgICAgICAgICAgICAgVGhpcyB2YWx1ZSBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoc3lzSWQpIHtcbiAgICAgICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKHN5c0lkKSkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoc3lzSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN5c0lkIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzIG5vdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzeXNJZC5pbmRleE9mKFwiJ1wiKSAhPT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgc3lzSWQuaW5kZXhPZihcIlxcXCJcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN5c0lkIHNob3VsZCBub3QgY29udGFpbiBib3RoIHNpbmdsZSBxdW90ZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiBhbmQgZG91YmxlIHF1b3Rlc1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh1dGlsc18xLmlzVW5kZWZpbmVkKHN5c0lkKSkge1xuICAgICAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnB1YklkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzeXNJZCBzaG91bGQgbm90IGJlIHVuZGVmaW5lZCBpZiBwdWJJZCBpc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIGRlZmluZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInN5c0lkIHNob3VsZCBiZSBhIHN0cmluZyBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zeXNJZCA9IHN5c0lkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IGF0dHJpYnV0ZS1saXN0IGRlY2xhcmF0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vXG4gICAgICogaW5kZXggaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBvZiB0aGUgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGF0dHJpYnV0ZS1saXN0IGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIFhtbER0ZC5wcm90b3R5cGUuYXR0bGlzdCA9IGZ1bmN0aW9uICh0ZXh0LCBpbmRleCkge1xuICAgICAgICB2YXIgYXR0bGlzdCA9IG5ldyBYbWxEdGRBdHRsaXN0XzEuZGVmYXVsdCh0ZXh0KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChhdHRsaXN0LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBhdHRsaXN0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBjb21tZW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZCxcbiAgICAgKiB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIGNvbW1lbnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGNvbW1lbnQuXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5jb21tZW50ID0gZnVuY3Rpb24gKGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICAgIHZhciBjb21tZW50ID0gbmV3IFhtbENvbW1lbnRfMS5kZWZhdWx0KGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGNvbW1lbnQsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGNvbW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IGVsZW1lbnQgZGVjbGFyYXRpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBvZiB0aGUgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBYbWxEdGQucHJvdG90eXBlLmVsZW1lbnQgPSBmdW5jdGlvbiAodGV4dCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgWG1sRHRkRWxlbWVudF8xLmRlZmF1bHQodGV4dCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoZWxlbWVudCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgZW50aXR5IGRlY2xhcmF0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgb2YgdGhlIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgZW50aXR5IGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIFhtbER0ZC5wcm90b3R5cGUuZW50aXR5ID0gZnVuY3Rpb24gKHRleHQsIGluZGV4KSB7XG4gICAgICAgIHZhciBlbnRpdHkgPSBuZXcgWG1sRHRkRW50aXR5XzEuZGVmYXVsdCh0ZXh0KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChlbnRpdHksIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBub2RlIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4gYXQgdGhlIHNwZWNpZmllZFxuICAgICAqIGluZGV4LiBUaGUgbm9kZSBpcyBub3QgaW5zZXJ0ZWQgaWYgaXQgaXMgYWxyZWFkeSBwcmVzZW50LiBJZiB0aGlzIG5vZGVcbiAgICAgKiBhbHJlYWR5IGhhcyBhIHBhcmVudCwgaXQgaXMgcmVtb3ZlZCBmcm9tIHRoYXQgcGFyZW50LlxuICAgICAqXG4gICAgICogT25seSB7QGxpbmsgWG1sQ29tbWVudH0sIHtAbGluayBYbWxEdGRBdHRsaXN0fSwge0BsaW5rIFhtbER0ZEVsZW1lbnR9LFxuICAgICAqIHtAbGluayBYbWxEdGRFbnRpdHl9LCB7QGxpbmsgWG1sRHRkTm90YXRpb259LCBhbmQge0BsaW5rIFhtbFByb2NJbnN0fVxuICAgICAqIG5vZGVzIGNhbiBiZSBpbnNlcnRlZDsgb3RoZXJ3aXNlIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgbm9kZS4gTm9kZXMgYXQgb3IgYWZ0ZXJcbiAgICAgKiAgICAgICAgICAgICAgdGhlIGluZGV4IGFyZSBzaGlmdGVkIHRvIHRoZSByaWdodC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiAgICAgICAgICAgICAgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5vZGUgaW5zZXJ0ZWQgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiwgb3IgdW5kZWZpbmVkIGlmIG5vXG4gICAgICogICAgICAgICAgbm9kZSB3YXMgaW5zZXJ0ZWQuXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sQ29tbWVudF8xLmRlZmF1bHQgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbER0ZEF0dGxpc3RfMS5kZWZhdWx0IHx8XG4gICAgICAgICAgICBub2RlIGluc3RhbmNlb2YgWG1sRHRkRWxlbWVudF8xLmRlZmF1bHQgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbER0ZEVudGl0eV8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxEdGROb3RhdGlvbl8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxEdGRQYXJhbUVudGl0eVJlZl8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxQcm9jSW5zdF8xLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibm9kZSBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2YgWG1sQ29tbWVudCxcIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sRHRkQXR0bGlzdCwgWG1sRHRkRWxlbWVudCwgWG1sRHRkRW50aXR5LFwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxEdGROb3RhdGlvbiwgWG1sRHRkUGFyYW1FbnRpdHlSZWYsIG9yXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbFByb2NJbnN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmluc2VydENoaWxkLmNhbGwodGhpcywgbm9kZSwgaW5kZXgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBub3RhdGlvbiBkZWNsYXJhdGlvbiBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpc1xuICAgICAqIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IG9mIHRoZSBub3RhdGlvbiBkZWNsYXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgbm90YXRpb24gZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5ub3RhdGlvbiA9IGZ1bmN0aW9uICh0ZXh0LCBpbmRleCkge1xuICAgICAgICB2YXIgbm90YXRpb24gPSBuZXcgWG1sRHRkTm90YXRpb25fMS5kZWZhdWx0KHRleHQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKG5vdGF0aW9uLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBub3RhdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgcGFyYW1ldGVyIGVudGl0eSByZWZlcmVuY2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm9cbiAgICAgKiBpbmRleCBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgVGhlIGVudGl0eSB0byByZWZlcmVuY2UuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIHBhcmFtZXRlciBlbnRpdHkgcmVmZXJlbmNlLlxuICAgICAqL1xuICAgIFhtbER0ZC5wcm90b3R5cGUucGFyYW1FbnRpdHlSZWYgPSBmdW5jdGlvbiAoZW50aXR5LCBpbmRleCkge1xuICAgICAgICB2YXIgcGFyYW1FbnRpdHkgPSBuZXcgWG1sRHRkUGFyYW1FbnRpdHlSZWZfMS5kZWZhdWx0KGVudGl0eSk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQocGFyYW1FbnRpdHksIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHBhcmFtRW50aXR5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBwcm9jZXNzaW5nIGluc3RydWN0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4XG4gICAgICogaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkYXRhIG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLCBvciB1bmRlZmluZWQgaWZcbiAgICAgKiAgICAgICAgICAgICAgICB0aGVyZSBpcyBubyB0YXJnZXQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5wcm9jSW5zdCA9IGZ1bmN0aW9uICh0YXJnZXQsIGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICAgIHZhciBwcm9jSW5zdCA9IG5ldyBYbWxQcm9jSW5zdF8xLmRlZmF1bHQodGFyZ2V0LCBjb250ZW50KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChwcm9jSW5zdCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gcHJvY0luc3Q7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBvcHRpb25zT2JqID0gbmV3IG9wdGlvbnNfMS5TdHJpbmdPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB2YXIgc3RyID0gXCI8IURPQ1RZUEUgXCIgKyB0aGlzLm5hbWU7XG4gICAgICAgIGlmICh1dGlsc18xLmlzVW5kZWZpbmVkKHRoaXMucHViSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQodGhpcy5zeXNJZCkpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCIgXCI7XG4gICAgICAgICAgICAgICAgc3RyID0gYXBwZW5kSWQoXCJTWVNURU1cIiwgdGhpcy5zeXNJZCwgc3RyLCBvcHRpb25zT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0ciArPSBcIiBcIjtcbiAgICAgICAgICAgIHN0ciA9IGFwcGVuZElkKFwiUFVCTElDXCIsIHRoaXMucHViSWQsIHN0ciwgb3B0aW9uc09iaik7XG4gICAgICAgICAgICBzdHIgPSBhcHBlbmRJZChcIlwiLCB0aGlzLnN5c0lkLCBzdHIsIG9wdGlvbnNPYmopO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHN0ciArPSBcIiBbXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fY2hpbGRyZW47IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmoucHJldHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBvcHRpb25zT2JqLm5ld2xpbmUgKyBvcHRpb25zT2JqLmluZGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyICs9IG5vZGUudG9TdHJpbmcob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9uc09iai5wcmV0dHkpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gb3B0aW9uc09iai5uZXdsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9IFwiXT5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0ciArPSBcIj5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbER0ZDtcbi8qKlxuICogQXBwZW5kcyB0aGUgWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHB1YmxpYyBvciBzeXN0ZW0gaWRlbnRpZmllciB0b1xuICogYW4gZXhpc3Rpbmcgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB0eXBlIFwiU1lTVEVNXCIsIFwiUFVCTElDXCIsIG9yIFwiXCIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBpZGVudGlmaWVyLlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHdoaWNoIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gc2hvdWxkIGJlIGFwcGVuZGVkLlxuICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICpcbiAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhcHBlbmRJZCh0eXBlLCB2YWx1ZSwgc3RyLCBvcHRpb25zKSB7XG4gICAgc3RyICs9IHR5cGUgKyBcIiBcIjtcbiAgICBpZiAob3B0aW9ucy5kb3VibGVRdW90ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoXCJcXFwiXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucy5kb3VibGVRdW90ZXMgaW5jb25zaXN0ZW50IHdpdGhcIlxuICAgICAgICAgICAgICAgICsgXCIgc3lzSWQgb3IgcHViSWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IFwiXFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKFwiJ1wiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMuZG91YmxlUXVvdGVzIGluY29uc2lzdGVudCB3aXRoXCJcbiAgICAgICAgICAgICAgICArIFwiIHN5c0lkIG9yIHB1YklkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN0ciArPSBcIidcIiArIHZhbHVlICsgXCInXCI7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24gaW4gYSBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQW4gWE1MIGF0dHJpYnV0ZS1saXN0IGRlY2xhcmF0aW9uIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHt0ZXh0fWBcbiAqIGlzIHRoZSB0ZXh0IG9mIHRoZSBkZWNsYXJhdGlvbjpcbiAqXG4gKiBgYGB4bWxcbiAqIDwhQVRUTElTVCB7dGV4dH0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt0ZXh0fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRHRkQXR0bGlzdCBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxEdGRBdHRsaXN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRHRkQXR0bGlzdCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbER0ZEF0dGxpc3R9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sRHRkQXR0bGlzdCh0ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGRBdHRsaXN0LnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBhdHRyaWJ1dGUtbGlzdCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGV4dCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBub3QgYWxsb3dlZCBpbiBYTUxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkQXR0bGlzdH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkQXR0bGlzdC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEF0dGxpc3Qgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRBdHRsaXN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEF0dGxpc3QucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEF0dGxpc3Qgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRBdHRsaXN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRBdHRsaXN0LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEF0dGxpc3Qgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRBdHRsaXN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkQXR0bGlzdC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEF0dGxpc3Qgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRHRkQXR0bGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gXCI8IUFUVExJU1QgXCIgKyB0aGlzLnRleHQgKyBcIj5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxEdGRBdHRsaXN0O1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRHRkQXR0bGlzdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRHRkQXR0bGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbiBpbiBhIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbi5cbiAqXG4gKiBBbiBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbiBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7dGV4dH1gIGlzIHRoZVxuICogdGV4dCBvZiB0aGUgZGVjbGFyYXRpb246XG4gKlxuICogYGBgeG1sXG4gKiA8IUVMRU1FTlQge3RleHR9PlxuICogYGBgXG4gKlxuICogVGhlIGB7dGV4dH1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbER0ZEVsZW1lbnQgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sRHRkRWxlbWVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbER0ZEVsZW1lbnQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEdGRFbGVtZW50fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVsZW1lbnQgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sRHRkRWxlbWVudCh0ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGRFbGVtZW50LnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbGVtZW50IGRlY2xhcmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0ZXh0IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcih0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG5vdCBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRFbGVtZW50fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRFbGVtZW50LnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEdGRFbGVtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIjwhRUxFTUVOVCBcIiArIHRoaXMudGV4dCArIFwiPlwiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZEVsZW1lbnQ7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxEdGRFbGVtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRFbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBlbnRpdHkgZGVjbGFyYXRpb24gaW4gYSBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQW4gWE1MIGVudGl0eSBkZWNsYXJhdGlvbiBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7dGV4dH1gIGlzIHRoZVxuICogdGV4dCBvZiB0aGUgZGVjbGFyYXRpb246XG4gKlxuICogYGBgeG1sXG4gKiA8IUVOVElUWSB7dGV4dH0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt0ZXh0fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRHRkRW50aXR5IG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbER0ZEVudGl0eSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbER0ZEVudGl0eSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbER0ZEVudGl0eX0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbnRpdHkgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sRHRkRW50aXR5KHRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZEVudGl0eS5wcm90b3R5cGUsIFwidGV4dFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbnRpdHkgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbnRpdHkgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0ZXh0IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcih0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG5vdCBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRFbnRpdHl9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVudGl0eS5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEVudGl0eSBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVudGl0eX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRFbnRpdHkucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEVudGl0eSBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVudGl0eX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkRW50aXR5LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEVudGl0eSBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVudGl0eX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVudGl0eS5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEVudGl0eSBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEdGRFbnRpdHkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIFwiPCFFTlRJVFkgXCIgKyB0aGlzLnRleHQgKyBcIj5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxEdGRFbnRpdHk7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxEdGRFbnRpdHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZEVudGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgbm90YXRpb24gZGVjbGFyYXRpb24gaW4gYSBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQW4gWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHt0ZXh0fWAgaXMgdGhlXG4gKiB0ZXh0IG9mIHRoZSBkZWNsYXJhdGlvbjpcbiAqXG4gKiBgYGB4bWxcbiAqIDwhTk9UQVRJT04ge3RleHR9PlxuICogYGBgXG4gKlxuICogVGhlIGB7dGV4dH1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbER0ZE5vdGF0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRHRkTm90YXRpb24sIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEdGROb3RhdGlvbn0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBub3RhdGlvbiBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGROb3RhdGlvbih0ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGROb3RhdGlvbi5wcm90b3R5cGUsIFwidGV4dFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgbm90YXRpb24gZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRleHQgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVDaGFyKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZE5vdGF0aW9ufSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGROb3RhdGlvbi5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkTm90YXRpb259IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkTm90YXRpb24ucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkTm90YXRpb259IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZE5vdGF0aW9uLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkTm90YXRpb259IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGROb3RhdGlvbi5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbER0ZE5vdGF0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIjwhTk9UQVRJT04gXCIgKyB0aGlzLnRleHQgKyBcIj5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxEdGROb3RhdGlvbjtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbER0ZE5vdGF0aW9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGROb3RhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgcGFyYW1ldGVyIGVudGl0eSByZWZlcmVuY2UgaW4gYSBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQW4gWE1MIHBhcmFtZXRlciBlbnRpdHkgcmVmZXJlbmNlIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHtlbnRpdHl9YFxuICogaXMgdGhlIG5hbWUgb2YgdGhlIGVudGl0eTpcbiAqXG4gKiBgYGB4bWxcbiAqICV7ZW50aXR5fTtcbiAqIGBgYFxuICpcbiAqIFRoZSBge2VudGl0eX1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbER0ZFBhcmFtRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbER0ZFBhcmFtRW50aXR5UmVmID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRHRkUGFyYW1FbnRpdHlSZWYsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEdGRQYXJhbUVudGl0eVJlZn0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGRQYXJhbUVudGl0eVJlZihlbnRpdHkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZW50aXR5ID0gZW50aXR5O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGRQYXJhbUVudGl0eVJlZi5wcm90b3R5cGUsIFwiZW50aXR5XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbnRpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGVudGl0eSBUaGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhlbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImVudGl0eSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZU5hbWUoZW50aXR5KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVudGl0eSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MIG5hbWVzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZW50aXR5ID0gZW50aXR5O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRQYXJhbUVudGl0eVJlZn0gbm9kZXMgY2Fubm90IGhhdmVcbiAgICAgKiBhbnkgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkUGFyYW1FbnRpdHlSZWYucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRQYXJhbUVudGl0eVJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZFBhcmFtRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZVxuICAgICAqIGFueSBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZFBhcmFtRW50aXR5UmVmLnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRQYXJhbUVudGl0eVJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZFBhcmFtRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZVxuICAgICAqIGFueSBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRQYXJhbUVudGl0eVJlZi5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRQYXJhbUVudGl0eVJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZFBhcmFtRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZVxuICAgICAqIGFueSBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkUGFyYW1FbnRpdHlSZWYucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRQYXJhbUVudGl0eVJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEdGRQYXJhbUVudGl0eVJlZi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gXCIlXCIgKyB0aGlzLmVudGl0eSArIFwiO1wiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZFBhcmFtRW50aXR5UmVmO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRHRkUGFyYW1FbnRpdHlSZWY7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZFBhcmFtRW50aXR5UmVmLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9vcHRpb25zXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxBdHRyaWJ1dGVfMSA9IHJlcXVpcmUoXCIuL1htbEF0dHJpYnV0ZVwiKTtcbnZhciBYbWxBdHRyaWJ1dGVUZXh0XzEgPSByZXF1aXJlKFwiLi9YbWxBdHRyaWJ1dGVUZXh0XCIpO1xudmFyIFhtbENkYXRhXzEgPSByZXF1aXJlKFwiLi9YbWxDZGF0YVwiKTtcbnZhciBYbWxDaGFyRGF0YV8xID0gcmVxdWlyZShcIi4vWG1sQ2hhckRhdGFcIik7XG52YXIgWG1sQ2hhclJlZl8xID0gcmVxdWlyZShcIi4vWG1sQ2hhclJlZlwiKTtcbnZhciBYbWxDb21tZW50XzEgPSByZXF1aXJlKFwiLi9YbWxDb21tZW50XCIpO1xudmFyIFhtbEVudGl0eVJlZl8xID0gcmVxdWlyZShcIi4vWG1sRW50aXR5UmVmXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG52YXIgWG1sUHJvY0luc3RfMSA9IHJlcXVpcmUoXCIuL1htbFByb2NJbnN0XCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBlbGVtZW50LlxuICpcbiAqIEEgc2FtcGxlIFhNTCBlbGVtZW50IGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHtuYW1lfWAgaXMgdGhlIG5hbWVcbiAqIG9mIHRoZSBlbGVtZW50OlxuICpcbiAqIGBgYHhtbFxuICogPHtuYW1lfSBhdHRuYW1lPVwiYXR0dmFsdWVcIj5cbiAqICAgICA8c3ViZWxlbS8+XG4gKiAgICAgPD9waXRhcmdldCBwaWNvbnRlbnQ/PlxuICogICAgIHRleHRcbiAqIDwve25hbWV9PjwvcHJlPlxuICogYGBgXG4gKlxuICogVGhlIGB7bmFtZX1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhlIG5vZGUsIHdoaWxlIHRoZSBhdHRyaWJ1dGVzIGFuZFxuICogY2hpbGRyZW4gb2YgdGhlIGVsZW1lbnQgKHN1Y2ggYXMgb3RoZXIgZWxlbWVudHMsIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25zLFxuICogYW5kIHRleHQpIGFyZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRWxlbWVudCBub2RlcyBjYW4gaGF2ZSBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIHtAbGluayBYbWxBdHRyaWJ1dGV9LFxuICoge0BsaW5rIFhtbENkYXRhfSwge0BsaW5rIFhtbENoYXJSZWZ9LCB7QGxpbmsgWG1sQ29tbWVudH0sXG4gKiB7QGxpbmsgWG1sRWxlbWVudH0sIHtAbGluayBYbWxFbnRpdHlSZWZ9LCB7QGxpbmsgWG1sUHJvY0luc3R9LCBvclxuICoge0BsaW5rIFhtbENoYXJEYXRhfSBub2RlcyBhcyBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbEVsZW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxFbGVtZW50LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sRWxlbWVudH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxFbGVtZW50KG5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbEVsZW1lbnQucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibmFtZSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZU5hbWUobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuYW1lIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzIG5vdFwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgYWxsb3dlZCBpbiBYTUwgbmFtZXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhbiBuZXcgYXR0cmlidXRlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGUuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0b1xuICAgICAqICAgICAgICBYbWxBdHRyaWJ1dGVUZXh0IG5vZGVzLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpc1xuICAgICAqICAgICAgICAgICAgICBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7WG1sQXR0cmlidXRlfSBUaGUgbmV3bHkgY3JlYXRlZCBhdHRyaWJ1dGUuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuYXR0cmlidXRlID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBpbmRleCkge1xuICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IFhtbEF0dHJpYnV0ZVRleHRfMS5kZWZhdWx0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1dGlsc18xLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzXzEuaXNTdHJpbmcodmFsdWVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlW2ldID0gbmV3IFhtbEF0dHJpYnV0ZVRleHRfMS5kZWZhdWx0KHZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IG5ldyBYbWxBdHRyaWJ1dGVfMS5kZWZhdWx0KG5hbWUsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChhdHRyaWJ1dGUsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZSB0aGF0IGFyZVxuICAgICAqIGluc3RhbmNlcyBvZiB7QGxpbmsgWG1sQXR0cmlidXRlfS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGUgdGhhdCBhcmVcbiAgICAgKiAgICAgICAgICBpbnN0YW5jZXMgb2Yge0BsaW5rIFhtbEF0dHJpYnV0ZX0uXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuYXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIFhtbEF0dHJpYnV0ZV8xLmRlZmF1bHQ7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBDREFUQSBzZWN0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIENEQVRBIHNlY3Rpb24uXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIENEQVRBIHNlY3Rpb24uXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuY2RhdGEgPSBmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNkYXRhID0gbmV3IFhtbENkYXRhXzEuZGVmYXVsdChjb250ZW50KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChjZGF0YSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY2RhdGE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHNvbWUgY2hhcmFjdGVyIGRhdGEgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhckRhdGEgQ2hhcmFjdGVyIGRhdGEuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIHRleHQgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5jaGFyRGF0YSA9IGZ1bmN0aW9uIChjaGFyRGF0YSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNoYXJEYXRhTm9kZSA9IG5ldyBYbWxDaGFyRGF0YV8xLmRlZmF1bHQoY2hhckRhdGEpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGNoYXJEYXRhTm9kZSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY2hhckRhdGFOb2RlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBjaGFyYWN0ZXIgcmVmZXJlbmNlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4XG4gICAgICogaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYXIgVGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gaGV4IFdoZXRoZXIgdG8gdXNlIHRoZSBoZXhhZGVjaW1hbCBvciBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGZvclxuICAgICAqICAgICAgICAgICAgdGhlIHJlZmVyZW5jZS4gSWYgbGVmdCB1bmRlZmluZWQsIGRlY2ltYWwgaXMgdGhlIGRlZmF1bHQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGNoYXJhY3RlciByZWZlcmVuY2UuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuY2hhclJlZiA9IGZ1bmN0aW9uIChjaGFyLCBoZXgsIGluZGV4KSB7XG4gICAgICAgIHZhciBjaGFyUmVmID0gbmV3IFhtbENoYXJSZWZfMS5kZWZhdWx0KGNoYXIsIGhleCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoY2hhclJlZiwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY2hhclJlZjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgY29tbWVudCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWQsXG4gICAgICogdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkYXRhIG9mIHRoZSBjb21tZW50LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpc1xuICAgICAqICAgICAgICAgICAgICBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBjb21tZW50LlxuICAgICAqL1xuICAgIFhtbEVsZW1lbnQucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNvbW1lbnQgPSBuZXcgWG1sQ29tbWVudF8xLmRlZmF1bHQoY29udGVudCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoY29tbWVudCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY29tbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWQsXG4gICAgICogdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpc1xuICAgICAqICAgICAgICAgICAgICBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBlbGVtZW50LlxuICAgICAqL1xuICAgIFhtbEVsZW1lbnQucHJvdG90eXBlLmVsZW1lbnQgPSBmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgWG1sRWxlbWVudChuYW1lKTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChlbGVtZW50LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBlbnRpdHkgcmVmZXJlbmNlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBUaGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGVudGl0eSByZWZlcmVuY2UuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuZW50aXR5UmVmID0gZnVuY3Rpb24gKGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGVudGl0eVJlZiA9IG5ldyBYbWxFbnRpdHlSZWZfMS5kZWZhdWx0KGVudGl0eSk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoZW50aXR5UmVmLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBlbnRpdHlSZWY7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuIGF0IHRoZSBzcGVjaWZpZWRcbiAgICAgKiBpbmRleC4gVGhlIG5vZGUgaXMgbm90IGluc2VydGVkIGlmIGl0IGlzIGFscmVhZHkgcHJlc2VudC4gSWYgdGhpcyBub2RlXG4gICAgICogYWxyZWFkeSBoYXMgYSBwYXJlbnQsIGl0IGlzIHJlbW92ZWQgZnJvbSB0aGF0IHBhcmVudC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBvbmx5IHtAbGluayBYbWxBdHRyaWJ1dGV9LCB7QGxpbmsgWG1sQ2RhdGF9LFxuICAgICAqIHtAbGluayBYbWxDaGFyUmVmfSwge0BsaW5rIFhtbENvbW1lbnR9LCB7QGxpbmsgWG1sRWxlbWVudH0sXG4gICAgICoge0BsaW5rIFhtbEVudGl0eVJlZn0sIHtAbGluayBYbWxQcm9jSW5zdH0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0gbm9kZXNcbiAgICAgKiBjYW4gYmUgaW5zZXJ0ZWQ7IG90aGVyd2lzZSwgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gaW5zZXJ0LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBub2RlLiBOb2RlcyBhdCBvciBhZnRlclxuICAgICAqICAgICAgICAgICAgICB0aGUgaW5kZXggYXJlIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0LiBJZiBubyBpbmRleCBpc1xuICAgICAqICAgICAgICAgICAgICBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSBpbnNlcnRlZCBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuLCBvciB1bmRlZmluZWQgaWYgbm9cbiAgICAgKiAgICAgICAgICBub2RlIHdhcyBpbnNlcnRlZC5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sQXR0cmlidXRlXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbENkYXRhXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbENoYXJSZWZfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sQ29tbWVudF8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxFbGVtZW50XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sRW50aXR5UmVmXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbFByb2NJbnN0XzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbENoYXJEYXRhXzEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJub2RlIHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBYbWxBdHRyaWJ1dGUsXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbENkYXRhLCBYbWxDaGFyUmVmLCBYbWxDb21tZW50LFwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxFbGVtZW50LCBYbWxFbnRpdHlSZWYsIFhtbFByb2NJbnN0LFwiXG4gICAgICAgICAgICAgICAgKyBcIiBvciBYbWxUZXh0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWG1sQXR0cmlidXRlXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLl9jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gaW5zdGFuY2VvZiBYbWxBdHRyaWJ1dGVfMS5kZWZhdWx0OyB9KTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgYXR0cmlidXRlc18xID0gYXR0cmlidXRlczsgX2kgPCBhdHRyaWJ1dGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNfMVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lID09PSBub2RlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZWxlbWVudCBhbHJlYWR5IGNvbnRhaW5zIGFuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgWG1sQXR0cmlidXRlIG9iamVjdCB3aXRoIG5hbWUgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgbm9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQuY2FsbCh0aGlzLCBub2RlLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXhcbiAgICAgKiBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIG9yIHVuZGVmaW5lZCBpZlxuICAgICAqICAgICAgICAgICAgICAgIHRoZXJlIGlzIG5vIHRhcmdldC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5wcm9jSW5zdCA9IGZ1bmN0aW9uICh0YXJnZXQsIGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICAgIHZhciBwcm9jSW5zdCA9IG5ldyBYbWxQcm9jSW5zdF8xLmRlZmF1bHQodGFyZ2V0LCBjb250ZW50KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChwcm9jSW5zdCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gcHJvY0luc3Q7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgb3B0aW9uc09iaiA9IG5ldyBvcHRpb25zXzEuU3RyaW5nT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXMoKTtcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5fY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBhdHRyaWJ1dGVzLmluZGV4T2Yobm9kZSkgPT09IC0xOyB9KTtcbiAgICAgICAgLy8gRWxlbWVudCB0YWcgc3RhcnRcbiAgICAgICAgdmFyIHN0ciA9IFwiPFwiICsgdGhpcy5fbmFtZTtcbiAgICAgICAgLy8gQXR0cmlidXRlc1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGF0dHJpYnV0ZXNfMiA9IGF0dHJpYnV0ZXM7IF9pIDwgYXR0cmlidXRlc18yLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNfMltfaV07XG4gICAgICAgICAgICBzdHIgKz0gXCIgXCIgKyBhdHRyaWJ1dGUudG9TdHJpbmcob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hpbGQgbm9kZXNcbiAgICAgICAgaWYgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIEVsZW1lbnQgbm9uLWVtcHR5IHRhZyBlbmRcbiAgICAgICAgICAgIHN0ciArPSBcIj5cIjtcbiAgICAgICAgICAgIHZhciBpbmRlbnRlciA9IGZ1bmN0aW9uIChsaW5lKSB7IHJldHVybiBvcHRpb25zT2JqLmluZGVudCArIGxpbmU7IH07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0ciA9IG5leHQudG9TdHJpbmcob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBpID4gMCA/IG5vZGVzW2kgLSAxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAvLyBMaW5lIGJyZWFrIGJlZm9yZSBjaGlsZCBub2RlcyB1bmxlc3MgYWxsIG5vZGVzLCBvciBhdCBsZWFzdFxuICAgICAgICAgICAgICAgIC8vIHRoZSBtb3N0IHJlY2VudCB0d28sIGFyZSBvZiB0eXBlIFhtbENoYXJhY3RlclJlZmVyZW5jZSxcbiAgICAgICAgICAgICAgICAvLyBYbWxFbnRpdHlSZWZlcmVuY2UsIG9yIFhtbENoYXJEYXRhXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmoucHJldHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsU2FtZUxpbmVOb2Rlcyhub2RlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPiAwICYmIG9uU2FtZUxpbmUobmV4dCwgcHJldikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IG9wdGlvbnNPYmoubmV3bGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RyID0gbmV4dFN0ci5zcGxpdChvcHRpb25zT2JqLm5ld2xpbmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoaW5kZW50ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKG9wdGlvbnNPYmoubmV3bGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyICs9IG5leHRTdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMaW5lIGJyZWFrIGJlZm9yZSBlbmQgdGFnIHVubGVzcyBhbGwgbm9kZXMgYXJlIG9mIHR5cGVcbiAgICAgICAgICAgIC8vIFhtbENoYXJhY3RlclJlZmVyZW5jZSwgWG1sRW50aXR5UmVmZXJlbmNlLCBvciBYbWxDaGFyRGF0YVxuICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmoucHJldHR5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGxTYW1lTGluZU5vZGVzKG5vZGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gb3B0aW9uc09iai5uZXdsaW5lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEVsZW1lbnQgZW5kIHRhZ1xuICAgICAgICAgICAgc3RyICs9IFwiPC9cIiArIHRoaXMuX25hbWUgKyBcIj5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVsZW1lbnQgZW1wdHkgdGFnIGVuZFxuICAgICAgICAgICAgc3RyICs9IFwiLz5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbEVsZW1lbnQ7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxFbGVtZW50O1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBub2RlcyBhcmUgYWxsIG9mIHR5cGUge0BsaW5rIFhtbENoYXJSZWZ9LFxuICoge0BsaW5rIFhtbEVudGl0eVJlZn0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0uXG4gKlxuICogQHBhcmFtIG5vZGVzIFRoZSBzcGVjaWZpZWQgbm9kZXMuXG4gKlxuICogQHJldHVybnMgV2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBub2RlcyBhcmUgYWxsIG9mIHR5cGVcbiAqICAgICAgICAgIHtAbGluayBYbWxDaGFyUmVmfSwge0BsaW5rIFhtbEVudGl0eVJlZn0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWxsU2FtZUxpbmVOb2Rlcyhub2Rlcykge1xuICAgIGZvciAodmFyIF9pID0gMCwgbm9kZXNfMSA9IG5vZGVzOyBfaSA8IG5vZGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBub2RlID0gbm9kZXNfMVtfaV07XG4gICAgICAgIGlmICghKChub2RlIGluc3RhbmNlb2YgWG1sQ2hhclJlZl8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxFbnRpdHlSZWZfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sQ2hhckRhdGFfMS5kZWZhdWx0KSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgbm9kZXMgYXJlIGFsbCBvZiB0eXBlIHtAbGluayBYbWxDaGFyUmVmfSxcbiAqIHtAbGluayBYbWxFbnRpdHlSZWZ9LCBvciB7QGxpbmsgWG1sQ2hhckRhdGF9LlxuICpcbiAqIEBwYXJhbSBwcmV2IFRoZSBmaXJzdCBzcGVjaWZpZWQgbm9kZS5cbiAqIEBwYXJhbSBuZXh0IFRoZSBzZWNvbmQgc3BlY2lmaWVkIG5vZGUuXG4gKlxuICogQHJldHVybnMgV2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBub2RlcyBhcmUgYWxsIG9mIHR5cGVcbiAqICAgICAgICAgIHtAbGluayBYbWxDaGFyUmVmfSwge0BsaW5rIFhtbEVudGl0eVJlZn0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gb25TYW1lTGluZShwcmV2LCBuZXh0KSB7XG4gICAgcmV0dXJuIChwcmV2IGluc3RhbmNlb2YgWG1sQ2hhclJlZl8xLmRlZmF1bHRcbiAgICAgICAgfHwgcHJldiBpbnN0YW5jZW9mIFhtbEVudGl0eVJlZl8xLmRlZmF1bHRcbiAgICAgICAgfHwgcHJldiBpbnN0YW5jZW9mIFhtbENoYXJEYXRhXzEuZGVmYXVsdClcbiAgICAgICAgJiYgKG5leHQgaW5zdGFuY2VvZiBYbWxDaGFyUmVmXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbmV4dCBpbnN0YW5jZW9mIFhtbEVudGl0eVJlZl8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5leHQgaW5zdGFuY2VvZiBYbWxDaGFyRGF0YV8xLmRlZmF1bHQpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgU3RyaW5nXVwiO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBOdW1iZXJdXCI7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbGVhbih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBCb29sZWFuXVwiO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IFVuZGVmaW5lZF1cIjtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNOdWxsKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IE51bGxdXCI7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHZhbClcbiAgICAgICAgfHwgaXNOdW1iZXIodmFsKVxuICAgICAgICB8fCBpc0Jvb2xlYW4odmFsKVxuICAgICAgICB8fCBpc1VuZGVmaW5lZCh2YWwpXG4gICAgICAgIHx8IGlzTnVsbCh2YWwpO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZ0FycmF5KHZhbCkge1xuICAgIGlmICghaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgX2kgPSAwLCB2YWxfMSA9IHZhbDsgX2kgPCB2YWxfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdmFsXzFbX2ldO1xuICAgICAgICBpZiAoIWlzU3RyaW5nKGVudHJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5pc1N0cmluZ0FycmF5ID0gaXNTdHJpbmdBcnJheTtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIjtcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzU2V0KHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IFNldF1cIjtcbn1cbmV4cG9ydHMuaXNTZXQgPSBpc1NldDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNNYXAodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgTWFwXVwiO1xufVxuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgdmFsdWUsIGFzIGdpdmVuIGJ5IHRoZVxuICogdmFsdWUncyB0b1N0cmluZygpIG1ldGhvZCAoaWYgaXQgaGFzIG9uZSkgb3IgdGhlIGdsb2JhbCBTdHJpbmcoKSBmdW5jdGlvblxuICogKGlmIGl0IGRvZXMgbm90KS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMgQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnkodmFsdWUpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbHVlKSAmJiAhaXNOdWxsKHZhbHVlKSkge1xuICAgICAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUudG9TdHJpbmcpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG59XG5leHBvcnRzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzMnhtbHBhcnNlci9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSBcInN1cGVyYWdlbnRcIjtcbmltcG9ydCAqIGFzIGpzMnhtbCBmcm9tIFwianMyeG1scGFyc2VyXCI7XG5pbXBvcnQgeyBFbmNvZGUsIERlY29kZSwgY29udmVydFF1ZXJpZWRVcmwsIFF1ZXJ5IH0gZnJvbSBcIi4vdXRpbGl0eVwiO1xuXG4vL2ZvciB1c2luZyBQcm9taXNlIG9uIGVzNVxuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJlczYtcHJvbWlzZVwiO1xuXG4vKipcbiAqIFBlcnNvbml1beOBruOCouOCr+OCu+OCueODiOODvOOCr+ODs+aDheWgsVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bUFjY2Vzc1Rva2VuIHtcbiAgICBhY2Nlc3NfdG9rZW46IHN0cmluZyxcbiAgICByZWZyZXNoX3Rva2VuOiBzdHJpbmcsXG4gICAgZXhwaXJlX2luOiBudW1iZXIsXG59XG5cbi8qKlxuICogUGVyc29uaXVt44Gu44Os44K544Od44Oz44K544OH44O844K/5Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtUmVzcG9uc2Uge1xuICAgIGQ6IHtcbiAgICAgICAgcmVzdWx0czogYW55LFxuICAgIH1cbn1cblxuLyoqXG4gKiBQZXJzb25pdW3jga7jg4fjg7zjgr/lnotcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQZXJzb25pdW1EYXRhIHtcbiAgICBfX21ldGFkYXRhOiB7XG4gICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICBldGFnOiBzdHJpbmcsXG4gICAgICAgIHR5cGU6IHN0cmluZyxcbiAgICB9LFxuICAgIF9fcHVibGlzaGVkOiBzdHJpbmcsIC8vRGF0ZSh4eHgpXG4gICAgX191cGRhdGVkOiBzdHJpbmcsIC8vRGF0ZSh4eHgpXG59XG5cbi8qKlxuICog5aSW6YOo44K744Or44Gu44OH44O844K/5Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0Q2VsbCBleHRlbmRzIFBlcnNvbml1bURhdGEge1xuICAgIFVybDogc3RyaW5nLFxuICAgIF9Sb2xlOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgX1JlbGF0aW9uOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9LFxuICAgIH0sXG59XG5cbi8qKlxuICog44Or44O844Or44Gu5Z6LXG4gKiAvL+WkieOCj+OCi+OBi+OCglxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJ1bGUge1xuICAgIEV4dGVybmFsPzogYm9vbGVhbixcbiAgICBTZXJ2aWNlOiBzdHJpbmcsXG4gICAgQWN0aW9uOiBzdHJpbmcsXG4gICAgVHlwZTogc3RyaW5nLFxuICAgIE9iamVjdDogc3RyaW5nLFxuICAgIFwiX0JveC5OYW1lXCI/OiBzdHJpbmcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNlIHtcbiAgICBcIkQ6cHJpbmNpcGFsXCI6IHtcbiAgICAgICAgXCJEOmhyZWZcIjogc3RyaW5nLFxuICAgIH0sXG4gICAgXCJEOmdyYW50XCI6IHtcbiAgICAgICAgcHJpdmlsZWdlOiB7W2FjZVR5cGU6IHN0cmluZ106IHt9fVtdLFxuICAgIH0sXG59XG5leHBvcnQgaW50ZXJmYWNlIEFjbCB7XG4gICAgXCJAXCI6IHtcbiAgICAgICAgXCJ4bWxuczpEXCI6IFwiREFWOlwiLFxuICAgICAgICBcInhtbG5zOnBcIjogXCJ1cm46eC1wZXJzb25pdW06eG1sbnNcIixcbiAgICB9LFxuICAgIFwiRDphY2VcIjogQWNlW10sXG59XG5cbi8qKlxuICog44K544Kv44Oq44OX44OI44Gu5Z6LXG4gKiAvL+WkieOCj+OCi+OBi+OCglxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdCB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHVyaTogc3RyaW5nLFxufVxuXG4vKipcbiAqIExpbmvlnosgRXh0Q2VsbOOBrkxpbmvjgarjgalcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaW5rIGV4dGVuZHMgUGVyc29uaXVtRGF0YSB7XG4gICAgdXJpOiBzdHJpbmcsXG59XG5cbi8qKlxuICogUm9sZeWei1xuICovIFxuZXhwb3J0IGludGVyZmFjZSBSb2xlIGV4dGVuZHMgUGVyc29uaXVtRGF0YSB7XG4gICAgTmFtZTogc3RyaW5nLFxuICAgIFwiX0JveC5OYW1lXCI6IHN0cmluZyxcbiAgICBfQm94OiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfQWNjb3VudDoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX0V4dENlbGw6IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9FeHRSb2xlOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfUmVsYXRpb246IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICog5YWs6ZaL44GV44KM44Gm44GE44KL44OX44Ot44OV44Kj44O844Or5oOF5aCx44Gu44Os44K544Od44Oz44K55Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtUHJvZmlsZVJlc3BvbnNlIHtcbiAgICBEaXNwbGF5TmFtZTogc3RyaW5nLFxuICAgIERlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgSW1hZ2U6IHN0cmluZyxcbiAgICBQcm9maWxlSW1hZ2VOYW1lOiBzdHJpbmcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtTGF1bmNoSnNvbiB7XG4gICAgcGVyc29uYWw6IHtcbiAgICAgICAgd2ViOiBzdHJpbmcsXG4gICAgICAgIGFuZHJvaWQ6IHN0cmluZyxcbiAgICAgICAgaW9zOiBzdHJpbmcsXG4gICAgICAgIGFwcFRva2VuSWQ6IHN0cmluZyxcbiAgICAgICAgYXBwVG9rZW5Qdzogc3RyaW5nLFxuICAgIH1cbn1cblxuLyoqXG4gKiDjg6Hjg4Pjgrvjg7zjgrjpgIHkv6Hjga7jgr/jgqTjg5flnotcbiAqL1xuZXhwb3J0IHR5cGUgTWVzc2FnZVNlbmRUeXBlID0gXG4gICAgXCJtZXNzYWdlXCJ8IC8v5Y2Y44Gq44KL44Oh44OD44K744O844K46YCB5L+hXG4gICAgXCJyZXEucmVsYXRpb24uYnVpbGRcInwgLy/plqLkv4LmgKfmp4vnr4nkvp3poLxcbiAgICBcInJlcS5yZWxhdGlvbi5icmVha1wifCAvL+mWouS/guaAp+egtOajhOS+nemgvFxuICAgIFwicmVxLnJvbGUuZ3JhbnRcInwgLy/jg63jg7zjg6voqK3lrprkvp3poLxcbiAgICBcInJlcS5yb2xlLnJldm9rZVwifCAvL+ODreODvOODq+egtOajhOS+nemgvFxuICAgIFwicmVxLnJ1bGUucmVnaXN0ZXJcInwgLy/jg6vjg7zjg6vnmbvpjLLkvp3poLxcbiAgICBcInJlcS5ydWxlLnVucmVnaXN0ZXJcIiAvL+ODq+ODvOODq+egtOajhOS+nemgvFxuICAgIDtcblxuLyoqXG4gKiBQZXJzb25pdW3jgpLmibHjgYbjgZ/jgoHjga7jgq/jg6njgqTjgqLjg7Pjg4jjg6njgqTjg5bjg6njg6pcbiAqL1xuZXhwb3J0IGNsYXNzIFBlcnNvbml1bUNsaWVudCB7XG4gICAgLyoqXG4gICAgICog44OX44Ot44OI44Kz44Or77yI44OH44OV44Kp44Or44OIOmh0dHBz77yJXG4gICAgICovXG4gICAgcHJvdG9jb2w6IHN0cmluZyA9IFwiaHR0cHNcIjtcbiAgICAvKipcbiAgICAgKiBQZXJzb25pdW3jga7jgrXjg7zjg5Djg5vjgrnjg4jlkI1cbiAgICAgKi9cbiAgICBob3N0OiBzdHJpbmcgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs+aDheWgsVxuICAgICAqL1xuICAgIHBlcnNvbml1bVRva2VuOiBQZXJzb25pdW1BY2Nlc3NUb2tlbiA9IG51bGw7XG4gICAgLyoqXG4gICAgICog44Ki44Kv44K744K544OI44O844Kv44OzXG4gICAgICovXG4gICAgdG9rZW46IHN0cmluZyA9IG51bGw7XG4gICAgLyoqXG4gICAgICog44Ki44Kv44K744K544OI44O844Kv44Oz44Gu5pyJ5Yq55pyf6ZmQXG4gICAgICovXG4gICAgZXhwaXJlSW46IG51bWJlciA9IDM2MDA7XG4gICAgLyoqXG4gICAgICog44Ot44Kw44Kk44Oz5pmC5Yi7IC0g6KqN6Ki844Gu5pyJ5Yq55pyf6ZmQ5YaF44GL44Gp44GG44GL44KS56K66KqNXG4gICAgICovXG4gICAgbG9naW5UaW1lOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIGV4cGlyZeOBl+OBn+OBk+OBqOOBjOeiuuiqjeOBleOCjOOBn+OBqOOBjeOBq+WRvOOBs+WHuuOBmeOCs+ODvOODq+ODkOODg+OCr1xuICAgICAqL1xuICAgIGV4cGlyZUNhbGxiYWNrOiAoKT0+dm9pZDtcbiAgICAvKipcbiAgICAgKiBleHBpcmXjga7norroqo3jgr/jgqTjg57jg7xcbiAgICAgKi9cbiAgICBleHBpcmVDYWxsYmFja1RpbWVyOiBhbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAgICogQHBhcmFtIHVuaXQg44Ob44K544OI5ZCNIFxuICAgICAqIEBwYXJhbSBwcm90b2NvbCDjg5fjg63jg4jjgrPjg6tcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1bml0OiBzdHJpbmcsIHByb3RvY29sPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdW5pdCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiUGxlYXNlIHNldCBgaG9zdGAgYWRkcmVzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1bml0Lmxhc3RJbmRleE9mKFwiaHR0cFwiKSA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiYGhvc3RgIGRvZXMgbm90IG5lZWQgcHJvdG9jb2wgcHJlZml4XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHByb3RvY29sKXtcbiAgICAgICAgICAgIHRoaXMucHJvdG9jb2wgPSBwcm90b2NvbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3QgPSB1bml0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiqjeiovOOBruacieWKueaAp+ODgeOCp+ODg+OCr1xuICAgICAqL1xuICAgIGF1dGhWYWxpZGF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gKCtuZXcgRGF0ZSgpLXRoaXMubG9naW5UaW1lKS8xMDAwIDwgdGhpcy5leHBpcmVJbjtcbiAgICAgICAgaWYoIXJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFjayAmJiB0aGlzLmV4cGlyZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJNYXliZSB5b3UgaGF2ZSB0byByZS1sb2dpbiB3aGlsZSB5b3VyIHRva2VuIGlzIGV4cGlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJzb25pdW3jgbjjg63jgrDjgqTjg7NcbiAgICAgKiBAcGFyYW0gY2VsbCDjg63jgrDjgqTjg7Plr77osaHjga7jgrvjg6vlkI0gXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIOODpuODvOOCtuWQjVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCDjg5Hjgrnjg6/jg7zjg4lcbiAgICAgKiBAcGFyYW0gZXhwaXJlQ2FsbGJhY2sg5pyJ5Yq55pyf6ZmQ44GM5YiH44KM6Zqb44Gr5ZG844Gz5Ye644GZ44Kz44O844Or44OQ44OD44KvIFxuICAgICAqL1xuICAgIGxvZ2luKGNlbGw6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZXhwaXJlQ2FsbGJhY2s/OiAoKT0+dm9pZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtQWNjZXNzVG9rZW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX190b2tlblwiO1xuICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFjayA9IGV4cGlyZUNhbGxiYWNrICYmIGV4cGlyZUNhbGxiYWNrO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC50eXBlKFwiZm9ybVwiKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLCB1c2VybmFtZSwgcGFzc3dvcmQgfSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuOiBQZXJzb25pdW1BY2Nlc3NUb2tlbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJzb25pdW1Ub2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlSW4gPSB0b2tlbi5leHBpcmVfaW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luVGltZSA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDjgr/jgqTjg6DjgqLjgqbjg4jjgpLopovjgotcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmV4cGlyZUluICogOTk5OyAvL+ebtOWJjeOBq+aVmeOBiOOBpuOBguOBkuOCi1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFja1RpbWVyID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFjayAmJiB0aGlzLmV4cGlyZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzY2hlbWHoqo3oqLzjg4jjg7zjgq/jg7Pjga7lj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDlgIvkurrjga7jgrvjg6sgXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIOODpuODvOOCtuWQjVxuICAgICAqIEBwYXJhbSBwYXNzd29yZCDjg5Hjgrnjg6/jg7zjg4lcbiAgICAgKiBAcGFyYW0gYXBwQ2VsbCDjgqLjg5fjg6rjgrvjg6tcbiAgICAgKiBAcGFyYW0gYXBwSWQg44Ki44OX44Oq44K744OrSWRcbiAgICAgKiBAcGFyYW0gYXBwUGFzcyDjgqLjg5fjg6rjgrvjg6tQYXNzXG4gICAgICovXG4gICAgYXBwTG9naW4oY2VsbDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBhcHBDZWxsOiBzdHJpbmcsIGFwcElkOiBzdHJpbmcsIGFwcFBhc3M6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtQWNjZXNzVG9rZW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxVcmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCk7XG4gICAgICAgICAgICBjb25zdCBhcHBDZWxsVXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGFwcENlbGwpO1xuICAgICAgICAgICAgY29uc3QgYXBwQ2VsbFRva2VuVXJsID0gYXBwQ2VsbFVybCArIFwiX190b2tlblwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KGFwcENlbGxUb2tlblVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC50eXBlKFwiZm9ybVwiKVxuICAgICAgICAgICAgICAgIC5zZW5kKHsgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLCB1c2VybmFtZTogYXBwSWQsIHBhc3N3b3JkOiBhcHBQYXNzLCBwX3RhcmdldDogY2VsbFVybCB9KVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBwVG9rZW46IFBlcnNvbml1bUFjY2Vzc1Rva2VuID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWFUb2tlblVybCA9IGNlbGxVcmwgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wb3N0KHNjaGVtYVRva2VuVXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50eXBlKFwiZm9ybVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoeyBncmFudF90eXBlOiBcInBhc3N3b3JkXCIsIHVzZXJuYW1lLCBwYXNzd29yZCwgY2xpZW50X2lkOiBhcHBDZWxsVXJsLCBjbGllbnRfc2VjcmV0OiBhcHBUb2tlbi5hY2Nlc3NfdG9rZW4gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuOiBQZXJzb25pdW1BY2Nlc3NUb2tlbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbml1bVRva2VuID0gdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlSW4gPSB0b2tlbi5leHBpcmVfaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5UaW1lID0gK25ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSAgICBcblxuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs+OBruabtOaWsOOChOODiOODqeODs+OCueOCu+ODq+ODiOODvOOCr+ODs+OCkuS9nOaIkFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSByZWZyZXNoVG9rZW4g44Oq44OV44Os44OD44K344Ol55So44OI44O844Kv44Oz77yIbG9naW7mmYLjgavlj5blvpfvvIlcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOODiOODqeODs+OCueOCu+ODq+ODiOODvOOCr+ODs+OCkueUn+aIkOOBmeOCi+WgtOWQiOOBr+aMh+WumlxuICAgICAqL1xuICAgIHJlZnJlc2hBY2Nlc3NUb2tlbihjZWxsOiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nLCB0YXJnZXQ/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuU2VlZHMgPSB0YXJnZXQgPyB7XG4gICAgICAgICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgIHBfdGFyZ2V0OiB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEodGFyZ2V0KSxcbiAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh0b2tlblNlZWRzKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg63jg7zjg6vjgpLkvZzmiJDjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcm9sZSDjg63jg7zjg6vlkI1cbiAgICAgKiBAcGFyYW0gYm94IE1haW7jg5zjg4Pjgq/jgrnku6XlpJbjgpLlr77osaHjgajjgZnjgovloLTlkIjjga/jg5zjg4Pjgq/jgrnlkI3jgpLmjIflrppcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgY3JlYXRlUm9sZShjZWxsOiBzdHJpbmcsIHJvbGU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1JvbGUvXCI7XG4gICAgICAgICAgICBjb25zdCBib3hOYW1lID0gYm94IHx8IG51bGw7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICAgICAgaWYoIXJvbGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgTmFtZTogcm9sZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoYm94KXtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIl9Cb3guTmFtZVwiOiBib3hOYW1lLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAuc2VuZChkYXRhKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODreODvOODq+aDheWgseOBruWPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSByb2xlIOeJueWumuOBruODreODvOODq+aDheWgseOBjOWPluW+l+OBl+OBn+OBhOWgtOWQiOOBr+aMh+WumlxuICAgICAqIEBwYXJhbSBib3gg54m55a6a44Gu44Oc44OD44Kv44K544Gu54m55a6a44Gu44Ot44O844Or5oOF5aCx44GM5Y+W5b6X44GX44Gf44GE5aC05ZCI44Gv5oyH5a6aXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGdldFJvbGUoY2VsbDogc3RyaW5nLCByb2xlPzogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Um9sZVtdfFJvbGU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9Sb2xlXCI7XG4gICAgICAgICAgICBpZiAocm9sZSkge1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihOYW1lPSdcIiArIHJvbGUgKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZihyb2xlICYmIGJveCl7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiKE5hbWU9J1wiICsgcm9sZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODreODvOODq+OCkuWJiumZpOOBmeOCi++8iOe0kOS7mOOBkeOBjOOBguOCi+OBqOWJiumZpOOBp+OBjeOBquOBhOWgtOWQiOOBjOOBguOCi++8iVxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSByb2xlIOeJueWumuOBruODreODvOODq+OCkuWJiumZpOOBl+OBn+OBhOWgtOWQiOOBr+aMh+WumlxuICAgICAqIEBwYXJhbSBib3gg54m55a6a44Gu44Oc44OD44Kv44K544Gu54m55a6a44Gu44Ot44O844Or44GM5YmK6Zmk44GX44Gf44GE5aC05ZCI44Gv5oyH5a6aXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZVJvbGUoY2VsbDogc3RyaW5nLCByb2xlOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUm9sZVwiO1xuICAgICAgICAgICAgaWYgKGJveCkge1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihOYW1lPSdcIiArIHJvbGUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or44KS6Kit5a6a44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrIFxuICAgICAqIEBwYXJhbSBzZXRDZWxsVXJsIOWklumDqOOCu+ODq+OBq+aMh+WumuOBl+OBn+OBhOOCu+ODq+OBrlVSTFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRFeHRDZWxsKGNlbGw6IHN0cmluZywgc2V0Q2VsbFVybDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwvXCI7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIFVybDogc2V0Q2VsbFVybCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGRhdGEpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+S4gOimp+OCkuWPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXRFeHRDZWxsTGlzdChjZWxsOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RXh0Q2VsbFtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsL1wiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OBruino+mZpFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBkZWxldGVDZWxsVXJsIOWJiumZpOOBmeOCi+OCu+ODq+OBrlVSTFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVFeHRDZWxsKGNlbGw6IHN0cmluZywgZGVsZXRlQ2VsbFVybDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwoJ1wiICsgRW5jb2RlKGRlbGV0ZUNlbGxVcmwpICsgXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or44Gr5a++44GX44Gm44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44KS6Kit5a6a44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHRhcmdldENlbGxVcmwg5oyH5a6a44GZ44KL5aSW6YOo44K744OrVVJMXG4gICAgICogQHBhcmFtIHR5cGUg44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44Gu5oyH5a6aKF9Sb2xlL19SZWxhdGlvbilcbiAgICAgKiBAcGFyYW0gbmFtZSDjg63jg7zjg6vjgYvjg6rjg6zjg7zjgrfjg6fjg7PjgavmjIflrprjgZnjgovlkI3liY1cbiAgICAgKiBAcGFyYW0gYm94IOODnOODg+OCr+OCueWQjVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRFeHRDZWxsTGluayhjZWxsOiBzdHJpbmcsIHRhcmdldENlbGxVcmw6IHN0cmluZywgdHlwZTogXCJfUm9sZVwifFwiX1JlbGF0aW9uXCIsIG5hbWU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwoJ1wiICsgRW5jb2RlKHRhcmdldENlbGxVcmwpICsgXCInKS9cXCRsaW5rcy9cIiArIHR5cGU7XG4gICAgICAgICAgICBsZXQgcm9sZSA9IFwiXCI7XG4gICAgICAgICAgICBpZihuYW1lICYmIGJveCl7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2UgaWYobmFtZSl7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdXJpOiB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1wiICsgdHlwZS5zdWJzdHJpbmcoMSkgKyByb2xlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZChkYXRhKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vjgavntJDjgaXjgZHjgZ/jg6rjg7Pjgq/jga7kuIDopqdcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gdGFyZ2V0Q2VsbFVybCDlr77osaHjgavmjIflrprjgZnjgovjgrvjg6tVUkxcbiAgICAgKiBAcGFyYW0gdHlwZSDjg63jg7zjg6vjgYvjg6rjg6zjg7zjgrfjg6fjg7Pjga7mjIflrpooX1JvbGUvX1JlbGF0aW9uKVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXRFeHRDZWxsTGluayhjZWxsOiBzdHJpbmcsIHRhcmdldENlbGxVcmw6IHN0cmluZywgdHlwZTogXCJfUm9sZVwifFwiX1JlbGF0aW9uXCIsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8TGlua1tdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZSh0YXJnZXRDZWxsVXJsKSArIFwiJykvXFwkbGlua3MvXCIgKyB0eXBlO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OBruODquODs+OCr+OCkuWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0YXJnZXRDZWxsVXJsIOWvvuixoeOBqOOBl+OBpuaMh+WumuOBmeOCi+OCu+ODq1VSTFxuICAgICAqIEBwYXJhbSB0eXBlIOODreODvOODq+OBi+ODquODrOODvOOCt+ODp+ODs+OBruaMh+WumihfUm9sZS9fUmVsYXRpb24pXG4gICAgICogQHBhcmFtIG5hbWUg5YmK6Zmk44GZ44KL44Ot44O844OrL+ODquODrOODvOOCt+ODp+ODs+WQjVxuICAgICAqIEBwYXJhbSBib3gg5YmK6Zmk44GZ44KL44Ot44O844Or44Gu44GC44KL44Oc44OD44Kv44K55ZCN77yI44OH44OV44Kp44Or44OI44Gv44Oh44Kk44OzYm9477yJXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUV4dENlbGxMaW5rKGNlbGw6IHN0cmluZywgdGFyZ2V0Q2VsbFVybDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgcm9sZSA9IFwiXCI7XG4gICAgICAgICAgICBpZihib3gpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZSh0YXJnZXRDZWxsVXJsKSArIFwiJykvXFwkbGlua3MvXCIgKyB0eXBlICsgcm9sZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCouOCq+OCpuODs+ODiOOBruODquODs+OCr+OCkuioreWumlxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBhY2NvdW50IOWvvuixoeOBqOOBl+OBpuaMh+WumuOBmeOCi+OCouOCq+OCpuODs+ODiOWQjVxuICAgICAqIEBwYXJhbSBuYW1lIOioreWumuOBmeOCi+ODreODvOODq+WQjVxuICAgICAqIEBwYXJhbSBib3gg6Kit5a6a44GZ44KL44Ot44O844Or44Gu44GC44KL44Oc44OD44Kv44K55ZCN77yI44OH44OV44Kp44Or44OI44Gv44Oh44Kk44OzYm9477yJXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIHNldEFjY291bnRMaW5rKGNlbGw6IHN0cmluZywgYWNjb3VudDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkrXCJfX2N0bC9Sb2xlXCI7XG4gICAgICAgICAgICBpZihib3gpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9BY2NvdW50KCdcIiArIGFjY291bnQgKyBcIicpL1xcJGxpbmtzL19Sb2xlXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKHt1cmk6IHJvbGV9KVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqLjgqvjgqbjg7Pjg4jjga7jg6rjg7Pjgq/jgpLliYrpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gYWNjb3VudCDlr77osaHjgajjgZfjgabmjIflrprjgZnjgovjgqLjgqvjgqbjg7Pjg4jlkI1cbiAgICAgKiBAcGFyYW0gbmFtZSDliYrpmaTjgZnjgovjg63jg7zjg6vlkI1cbiAgICAgKiBAcGFyYW0gYm94IOWJiumZpOOBmeOCi+ODreODvOODq+OBruOBguOCi+ODnOODg+OCr+OCueWQje+8iOODh+ODleOCqeODq+ODiOOBr+ODoeOCpOODs2JveO+8iVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVBY2NvdW50TGluayhjZWxsOiBzdHJpbmcsIGFjY291bnQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCByb2xlID0gXCJcIjtcbiAgICAgICAgICAgIGlmKGJveCl7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0FjY291bnQoJ1wiICsgYWNjb3VudCArIFwiJykvXFwkbGlua3MvX1JvbGVcIiArIHJvbGU7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqLjgqvjgqbjg7Pjg4jjgpLliYrpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gYWNjb3VudCDlr77osaHjgajjgZfjgabmjIflrprjgZnjgovjgqLjgqvjgqbjg7Pjg4jlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlQWNjb3VudChjZWxsOiBzdHJpbmcsIGFjY291bnQ6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9BY2NvdW50KCdcIiArIGFjY291bnQgKyBcIicpXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6vjg7zjg6vkuIDopqfjga7lj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0UnVsZXMoY2VsbDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFJ1bGVbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUnVsZVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODq+ODvOODq+OCkuioreWumuOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBydWxlIOeZu+mMsuOBmeOCi+ODq+ODvOODq1xuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRSdWxlKGNlbGw6IHN0cmluZywgcnVsZTogUnVsZSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9SdWxlXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgIC5zZW5kKHJ1bGUpXG4gICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog44Or44O844Or44KS5YmK6Zmk44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIHJ1bGVJZCDliYrpmaTjgZnjgovjg6vjg7zjg6tpZFxuICAgICAqIEBwYXJhbSBib3gg44Oc44OD44Kv44K544Gr57SQ44Gl44GE44Gm44KL5aC05ZCI44GvYm945ZCN5oyH5a6aXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZVJ1bGUoY2VsbDogc3RyaW5nLCBydWxlSWQ6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9SdWxlXCI7XG4gICAgICAgICAgICBpZihib3gpe1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihfX2lkPSdcIiArIHJ1bGVJZCArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihfX2lkPSdcIiArIHJ1bGVJZCArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog44Oh44OD44K744O844K444Gu6YCB5L+hQVBJXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIHRvIOWum+WFiOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0eXBlIOODoeODg+OCu+ODvOOCuOmAgeS/oeOCv+OCpOODl+OBruaMh+WumlxuICAgICAqIEBwYXJhbSByZXF1ZXN0Q29udGVudCDnmbvpjLLkvp3poLzjgZfjgZ/plqLkv4Lmg4XloLEoVVJMKVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZW5kTWVzc2FnZShjZWxsOiBzdHJpbmcsIHRvOiBzdHJpbmcsIHR5cGU6IE1lc3NhZ2VTZW5kVHlwZSwgcmVxdWVzdENvbnRlbnQ6IFJ1bGV8c3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxVcmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCk7XG4gICAgICAgICAgICBjb25zdCB0b1VybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYSh0byk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjZWxsVXJsICsgXCJfX21lc3NhZ2Uvc2VuZC9cIjtcblxuICAgICAgICAgICAgbGV0IGJvZHkgPSB7fTtcblxuICAgICAgICAgICAgaWYgKHR5cGUubGFzdEluZGV4T2YoXCJyZXEucnVsZS5cIiwgMCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICBUbzogdG9VcmwsXG4gICAgICAgICAgICAgICAgICAgIFR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIFJlcXVlc3RSdWxlOiByZXF1ZXN0Q29udGVudCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlLmxhc3RJbmRleE9mKFwicmVxLnJvbGUuXCIsIDApID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgVG86IHRvVXJsLFxuICAgICAgICAgICAgICAgICAgICBUeXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UmVsYXRpb246IHJlcXVlc3RDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UmVsYXRpb25UYXJnZXQ6IGNlbGxVcmwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoYm9keSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXMudGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE8gcmVjZWl2ZU1lc3NhZ2VcbiAgICAgKi9cbiAgICByZWNlaXZlTWVzc2FnZSgpe31cbiAgICBcbiAgICAvKipcbiAgICAgKiBBQ0zjgpLoqK3lrprjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gYWNsIOioreWumuOBmeOCi0FDTOOBrmpzb24oWE1M44Gr5aSJ5o+bKVxuICAgICAqL1xuICAgIHNldEFjbChjZWxsOiBzdHJpbmcsIGFjZXM6IEFjZVtdLCB0YXJnZXRQYXRoPzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGFyZ2V0UGF0aD8gY2VsbHVybCt0YXJnZXRQYXRoIDogY2VsbHVybDtcblxuICAgICAgICAgICAgY29uc3QgYWNsOiBBY2wgPSB7XG4gICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpEXCI6IFwiREFWOlwiLFxuICAgICAgICAgICAgICAgICAgICBcInhtbG5zOnBcIjogXCJ1cm46eC1wZXJzb25pdW06eG1sbnNcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiRDphY2VcIjogYWNlcyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjbFhtbCA9IGpzMnhtbC5wYXJzZShcIkQ6YWNsXCIsIGFjbCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJBQ0xcIiwgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3htbFwiKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIit0b2tlbilcbiAgICAgICAgICAgIHhoci5zZW5kKGFjbFhtbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCteODvOODk+OCueOCs+ODrOOCr+OCt+ODp+ODs+OCveODvOOCueS9nOaIkFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBuYW1lIFJlc29yY2XlkI1cbiAgICAgKiBAcGFyYW0gcmVzb3VyY2UgUmVzb3JjZeS4rei6q1xuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBjcmVhdGVTZXJ2aWNlQ29sbGVjdGlvbihjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCByZXNvdXJjZTogYW55LCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIvX19zcmMvXCIgKyBuYW1lO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wdXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpXG4gICAgICAgICAgICAgICAgLnNlbmQocmVzb3VyY2UpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCteODvOODk+OCueOCs+ODrOOCr+OCt+ODp+ODs+OCveODvOOCueioreWumumBqeeUqFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBzY3JpcHQg44K544Kv44Oq44OX44OI5ZCNKHh4eC5qcylcbiAgICAgKiBAcGFyYW0gc2VydmljZSDjgrXjg7zjg5PjgrnlkI0oeXl5KVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRTZXJ2aWNlQ29sbGVjdGlvbihjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgc2NyaXB0OiBzdHJpbmcsIHNlcnZpY2U6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIGNvbnN0IHByb3AgPSB7XG4gICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpEXCI6IFwiREFWOlwiLFxuICAgICAgICAgICAgICAgICAgICBcInhtbG5zOnBcIjogXCJ1cm46eC1wZXJzb25pdW06eG1sbnNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczp6XCI6IFwiaHR0cDovL3d3dy53My5jb20vc3RhbmRhcmRzL3ozOS41MC9cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiRDpzZXRcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIkQ6cHJvcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInA6c2VydmljZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYW5ndWFnZVwiOiBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNjcmlwdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHByb3BYbWwgPSBqczJ4bWwucGFyc2UoXCJEOnByb3BlcnR5dXBkYXRlXCIsIHByb3ApO1xuXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKFwiUFJPUFBBVENIXCIsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCk9PntcbiAgICAgICAgICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94bWxcIik7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIrdG9rZW4pXG4gICAgICAgICAgICB4aHIuc2VuZChwcm9wWG1sKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44K144O844OT44K544Kz44Os44Kv44K344On44Oz44K944O844K55YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIG5hbWUgUmVzb3JjZeWQjVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVTZXJ2aWNlQ29sbGVjdGlvbihjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIvX19zcmMvXCIgKyBuYW1lO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj44K/44Kk44OX44Gu5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44Gu44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44Ko44Oz44OG44Kj44OG44Kj44Gu44OR44K5XG4gICAgICogQHBhcmFtIGlkIOOCqOODs+ODhuOCo+ODhuOCo2lkXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUVudGl0eVR5cGUoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVudGl0eVR5cGVOYW1lOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiLyRtZXRhZGF0YS9FbnRpdHlUeXBlKCdcIiArIGVudGl0eVR5cGVOYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvcGVydHnjga7liYrpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjga7jgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcGF0aCDjgqjjg7Pjg4bjgqPjg4bjgqPjga7jg5HjgrlcbiAgICAgKiBAcGFyYW0gZW50aXR5VHlwZSDjgqjjg7Pjg4bjgqPjg4bjgqPjgr/jgqTjg5fjga7lkI3liY1cbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgcHJvcGVydHnjga7lkI3liY1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlUHJvcGVydHkoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVudGl0eVR5cGU6IHN0cmluZywgcHJvcGVydHk6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIvJG1ldGFkYXRhL1Byb3BlcnR5KE5hbWU9J1wiICtwcm9wZXJ0eSsgXCInLF9FbnRpdHlUeXBlLk5hbWU9J1wiK2VudGl0eVR5cGUrXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQm9444Gu5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44Gu44K744Or5ZCNXG4gICAgICogQHBhcmFtIGJveCBib3jlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlQm94KGNlbGw6IHN0cmluZywgYm94OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9Cb3goTmFtZT0nXCIrYm94K1wiJylcIjsgICAgICAgICAgICBcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiDjg5fjg63jg5XjgqHjgqTjg6vmg4XloLHjgpLlj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCBcbiAgICAgKi9cbiAgICBnZXRQcm9maWxlKGNlbGw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtUHJvZmlsZVJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbHVybCArIFwiX18vcHJvZmlsZS5qc29uXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1Qcm9maWxlUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCouODl+ODquOCu+ODq+WwgueUqFxuICAgICAqIOOCouODl+ODqui1t+WLleaDheWgseOCkuWPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIFxuICAgICAqL1xuICAgIGdldExhdW5jaChjZWxsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUxhdW5jaEpzb24+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGx1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjZWxsdXJsICsgXCJfXy9sYXVuY2guanNvblwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtTGF1bmNoSnNvbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmFy44Kk44Oz44K544OI44O844OrIFxuICAgICAqIEBwYXJhbSBiYXJVcmxcbiAgICAgKi9cbiAgICBiYXJJbnN0YWxsKGNlbGw6IHN0cmluZywgYm94OiBzdHJpbmcsIGJhclVybDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbHVybCArIGJveDtcblxuICAgICAgICAgICAgcmVxdWVzdC5nZXQoYmFyVXJsKVxuICAgICAgICAgICAgICAgIC5yZXNwb25zZVR5cGUoXCJibG9iXCIpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlczEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHJlczEuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9wZW4oXCJNS0NPTFwiLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vemlwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiK3Rva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNlbmQoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj44OH44O844K/44Gu5a2Y5Zyo56K66KqNXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIF9fX2lkIOOCqOODs+ODhuOCo+ODhuOCo2lkXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGlzRXhpc3QoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIF9faWQ/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSBudWxsO1xuICAgICAgICAgICAgaWYoX19pZCl7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiKCdcIiArIF9faWQgKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqjjg7Pjg4bjgqPjg4bjgqPlj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gcXVlcnkg44Kv44Ko44Oq77yIVE9ETyDmnKrlrozmiJDvvIlcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0KGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBxdWVyeT86IFF1ZXJ5fHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1EYXRhW10gfCBQZXJzb25pdW1EYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IEVuY29kZShcIj8kb3JkZXJieT1cIiArIHF1ZXJ5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihxdWVyeSl7XG4gICAgICAgICAgICAgICAgdXJsID0gY29udmVydFF1ZXJpZWRVcmwodXJsLCBxdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSBFbmNvZGUoXCI/JG9yZGVyYnk9X191cGRhdGVkJTIwZGVzY1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqjjg7Pjg4bjgqPjg4bjgqPmm7jjgY3ovrzjgb9cbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gZW50aXR5IOOCqOODs+ODhuOCo+ODhuOCo+aDheWgsVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBwb3N0KGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbnRpdHk6IGFueSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoZW50aXR5KVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj5LiK5pu444GNXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIGlkIOOCqOODs+ODhuOCo+ODhuOCo2lkXG4gICAgICogQHBhcmFtIGVudGl0eSDkuIrmm7jjgY3jgZnjgovjgqjjg7Pjg4bjgqPjg4bjgqPmg4XloLFcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgdXBkYXRlKGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBpZDogc3RyaW5nLCBlbnRpdHk6IGFueSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIoJ1wiICsgaWQgKyBcIicpXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnB1dCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGVudGl0eSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj44Gu5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44Gu44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44Ko44Oz44OG44Kj44OG44Kj44Gu44OR44K5XG4gICAgICogQHBhcmFtIGlkIOOCqOODs+ODhuOCo+ODhuOCo2lkXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZShjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaWQ/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gaWQ/XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiKCdcIiArIGlkICsgXCInKVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrvjg6vlkI3jgYvjgonjgrvjg6vjgrnjgq3jg7zjg55VUkzjgpLkvZzmiJDjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCBcbiAgICAgKi9cbiAgICBjcmVhdGVDZWxsU2NoZW1hKGNlbGw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5wcm90b2NvbH06Ly8ke3RoaXMuaG9zdH0vJHtjZWxsfS9gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCu+ODq+OCueOCreODvOODnlVSTOOBi+OCieOCu+ODq+WQjeOCkuaKveWHuuOBmeOCi1xuICAgICAqIEBwYXJhbSB1cmwgXG4gICAgICovXG4gICAgZXh0cmFjdENlbGxOYW1lKHVybDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB1cmwuc3Vic3RyaW5nKHVybC5pbmRleE9mKHRoaXMuaG9zdCkgKyB0aGlzLmhvc3QubGVuZ3RoICsgMSwgdXJsLmxhc3RJbmRleE9mKFwiL1wiKSk7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWBnOatouaZglxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmKHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59XG5cblxuLy8gLypcbi8vIC8vVE9ETyDjgrnjgq3jg7zjg57oqo3oqLznlKjjga5BUEnjgIJcbi8vIC8vUGVyc29uaXVt44Ki44OX44Oq44Oe44O844Kx44OD44OI5Yip55So5pmC44Gr5L2/44GG44GT44Go44Gr44Gq44KL44KE44KC44GX44KM44Gs44CCXG4vLyBleHBvcnQgY29uc3QgdHJhbnNjZWxsdG9rZW4gPSAoam9zaGk6IHN0cmluZywgYnVrYTogc3RyaW5nKSA9PiB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbi8vICAgICBjb25zdCB1cmwgPSBjcmVhdGVDZWxsU2NoZW1hKGJ1a2EpK1wiX190b2tlblwiO1xuLy8gICAgIHJlcXVlc3Rcbi8vICAgICAgIC5wb3N0KHVybClcbi8vICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4vLyAgICAgICAudHlwZShcImZvcm1cIilcbi8vICAgICAgIC5zZW5kKHtcbi8vICAgICAgICAgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLCBcbi8vICAgICAgICAgdXNlcm5hbWU6IFwiYm9iXCIsICAvL1RPRE8gXG4vLyAgICAgICAgIHBhc3N3b3JkOiBcInBpeW9waXlvXCIsIC8vVE9ETyBcbi8vICAgICAgICAgcF90YXJnZXQ6IGNyZWF0ZUNlbGxTY2hlbWEoam9zaGkpLFxuLy8gICAgICAgfSlcbi8vICAgICAgIC5lbmQoKGVycm9yLCByZXMpPT57XG4vLyAgICAgICAgIGlmKGVycm9yKXtcbi8vICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXMudGV4dCkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9O1xuLy8gZXhwb3J0IGNvbnN0IHJlZnJlc2hBY2Nlc3NUb2tlbiA9IChqb3NoaTogc3RyaW5nLCBidWthOiBzdHJpbmcsIGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4pID0+IHtcbi8vICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgIGNvbnN0IHVybCA9IGNyZWF0ZUNlbGxTY2hlbWEoam9zaGkpK1wiX190b2tlblwiO1xuLy8gICAgIHJlcXVlc3Rcbi8vICAgICAgIC5wb3N0KHVybClcbi8vICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4vLyAgICAgICAudHlwZShcImZvcm1cIilcbi8vICAgICAgIC5zZW5kKHtcbi8vICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsIFxuLy8gICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4vLyAgICAgICAgIGNsaWVudF9pZDogY3JlYXRlQ2VsbFNjaGVtYShidWthKSxcbi8vICAgICAgICAgY2xpZW50X3NlY3JldDogYWNjZXNzVG9rZW4sXG4vLyAgICAgICB9KVxuLy8gICAgICAgLmVuZCgoZXJyb3IsIHJlcyk9Pntcbi8vICAgICAgICAgaWYoZXJyb3Ipe1xuLy8gICAgICAgICAgIHJlamVjdChlcnJvcik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSB7XG4vLyAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcy50ZXh0KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH07XG4vLyAqL1xuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IFBlcnNvbml1bUNsaWVudDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50LnRzIiwiLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG52YXIgcm9vdDtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyAvLyBCcm93c2VyIHdpbmRvd1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gV2ViIFdvcmtlclxuICByb290ID0gc2VsZjtcbn0gZWxzZSB7IC8vIE90aGVyIGVudmlyb25tZW50c1xuICBjb25zb2xlLndhcm4oXCJVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuICByb290ID0gdGhpcztcbn1cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIFJlcXVlc3RCYXNlID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWJhc2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG52YXIgUmVzcG9uc2VCYXNlID0gcmVxdWlyZSgnLi9yZXNwb25zZS1iYXNlJyk7XG52YXIgc2hvdWxkUmV0cnkgPSByZXF1aXJlKCcuL3Nob3VsZC1yZXRyeScpO1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpe307XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG52YXIgcmVxdWVzdCA9IGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsKSB7XG4gIC8vIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB1cmwpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCk7XG4gIH1cblxuICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdChtZXRob2QsIHVybCk7XG59XG5cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAgICYmICghcm9vdC5sb2NhdGlvbiB8fCAnZmlsZTonICE9IHJvb3QubG9jYXRpb24ucHJvdG9jb2xcbiAgICAgICAgICB8fCAhcm9vdC5BY3RpdmVYT2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgfVxuICB0aHJvdyBFcnJvcihcIkJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgY291bGQgbm90IGZpbmQgWEhSXCIpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciB0cmltID0gJycudHJpbVxuICA/IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24ocykgeyByZXR1cm4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTsgfTtcblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIG9ialtrZXldKTtcbiAgfVxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vKipcbiAqIEhlbHBzICdzZXJpYWxpemUnIHdpdGggc2VyaWFsaXppbmcgYXJyYXlzLlxuICogTXV0YXRlcyB0aGUgcGFpcnMgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFpcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICovXG5cbmZ1bmN0aW9uIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHZhbCkge1xuICBpZiAodmFsICE9IG51bGwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHYpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgICBmb3IodmFyIHN1YmtleSBpbiB2YWwpIHtcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSArICdbJyArIHN1YmtleSArICddJywgdmFsW3N1YmtleV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpKTtcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QgPSBzZXJpYWxpemU7XG5cbiAvKipcbiAgKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAqIEByZXR1cm4ge09iamVjdH1cbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoc3RyKSB7XG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KCcmJyk7XG4gIHZhciBwYWlyO1xuICB2YXIgcG9zO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYWlycy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHBhaXIgPSBwYWlyc1tpXTtcbiAgICBwb3MgPSBwYWlyLmluZGV4T2YoJz0nKTtcbiAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIpXSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIuc2xpY2UoMCwgcG9zKSldID1cbiAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KHBhaXIuc2xpY2UocG9zICsgMSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICd0ZXh0L3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeVxuIH07XG5cbiAvKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgbGluZXMucG9wKCk7IC8vIHRyYWlsaW5nIENSTEZcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICByZXR1cm4gL1tcXC8rXWpzb25cXGIvLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSkge1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdmFyIHN0YXR1cyA9IHRoaXMueGhyLnN0YXR1cztcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgICBzdGF0dXMgPSAyMDQ7XG4gIH1cbiAgdGhpcy5fc2V0U3RhdHVzUHJvcGVydGllcyhzdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuX3NldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuXG4gIGlmIChudWxsID09PSB0aGlzLnRleHQgJiYgcmVxLl9yZXNwb25zZVR5cGUpIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnhoci5yZXNwb25zZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgICA/IHRoaXMuX3BhcnNlQm9keSh0aGlzLnRleHQgPyB0aGlzLnRleHQgOiB0aGlzLnhoci5yZXNwb25zZSlcbiAgICAgIDogbnVsbDtcbiAgfVxufVxuXG5SZXNwb25zZUJhc2UoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5fcGFyc2VCb2R5ID0gZnVuY3Rpb24oc3RyKXtcbiAgdmFyIHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZih0aGlzLnJlcS5fcGFyc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLl9wYXJzZXIodGhpcywgc3RyKTtcbiAgfVxuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9OyAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGVyciA9IG51bGw7XG4gICAgdmFyIHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09ICd1bmRlZmluZWQnID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgdmFyIG5ld19lcnI7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgICAgbmV3X2Vyci5vcmlnaW5hbCA9IGVycjtcbiAgICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgbmV3X2VyciA9IGU7IC8vICM5ODUgdG91Y2hpbmcgcmVzIG1heSBjYXVzZSBJTlZBTElEX1NUQVRFX0VSUiBvbiBvbGQgQW5kcm9pZFxuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBzZWxmLmNhbGxiYWNrKG5ld19lcnIsIHJlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peGluIGBFbWl0dGVyYCBhbmQgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblJlcXVlc3RCYXNlKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gW3Bhc3NdIG9wdGlvbmFsIGluIGNhc2Ugb2YgdXNpbmcgJ2JlYXJlcicgYXMgdHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgd2l0aCAndHlwZScgcHJvcGVydHkgJ2F1dG8nLCAnYmFzaWMnIG9yICdiZWFyZXInIChkZWZhdWx0ICdiYXNpYycpXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3MsIG9wdGlvbnMpe1xuICBpZiAodHlwZW9mIHBhc3MgPT09ICdvYmplY3QnICYmIHBhc3MgIT09IG51bGwpIHsgLy8gcGFzcyBpcyBvcHRpb25hbCBhbmQgY2FuIHN1YnN0aXR1dGUgZm9yIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgfVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgdHlwZTogJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGJ0b2EgPyAnYmFzaWMnIDogJ2F1dG8nLFxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EodXNlciArICc6JyArIHBhc3MpKTtcbiAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICBicmVhaztcblxuICAgIGNhc2UgJ2JlYXJlcic6IC8vIHVzYWdlIHdvdWxkIGJlIC5hdXRoKGFjY2Vzc1Rva2VuLCB7IHR5cGU6ICdiZWFyZXInIH0pXG4gICAgICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHVzZXIpO1xuICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgcXVlcnktc3RyaW5nIGB2YWxgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4gKiAgICAgLnF1ZXJ5KCdzaXplPTEwJylcbiAqICAgICAucXVlcnkoeyBjb2xvcjogJ2JsdWUnIH0pXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uKHZhbCl7XG4gIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB2YWwgPSBzZXJpYWxpemUodmFsKTtcbiAgaWYgKHZhbCkgdGhpcy5fcXVlcnkucHVzaCh2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVldWUgdGhlIGdpdmVuIGBmaWxlYCBhcyBhbiBhdHRhY2htZW50IHRvIHRoZSBzcGVjaWZpZWQgYGZpZWxkYCxcbiAqIHdpdGggb3B0aW9uYWwgYG9wdGlvbnNgIChvciBmaWxlbmFtZSkuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuYXR0YWNoKCdjb250ZW50JywgbmV3IEJsb2IoWyc8YSBpZD1cImFcIj48YiBpZD1cImJcIj5oZXkhPC9iPjwvYT4nXSwgeyB0eXBlOiBcInRleHQvaHRtbFwifSkpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge0Jsb2J8RmlsZX0gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24oZmllbGQsIGZpbGUsIG9wdGlvbnMpe1xuICBpZiAoZmlsZSkge1xuICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICB0aHJvdyBFcnJvcihcInN1cGVyYWdlbnQgY2FuJ3QgbWl4IC5zZW5kKCkgYW5kIC5hdHRhY2goKVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChmaWVsZCwgZmlsZSwgb3B0aW9ucyB8fCBmaWxlLm5hbWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2dldEZvcm1EYXRhID0gZnVuY3Rpb24oKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkge1xuICAgIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZm9ybURhdGE7XG59O1xuXG4vKipcbiAqIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCBgZXJyYCBhbmQgYHJlc2BcbiAqIGFuZCBoYW5kbGUgYXJpdHkgY2hlY2suXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNhbGxiYWNrID0gZnVuY3Rpb24oZXJyLCByZXMpe1xuICAvLyBjb25zb2xlLmxvZyh0aGlzLl9yZXRyaWVzLCB0aGlzLl9tYXhSZXRyaWVzKVxuICBpZiAodGhpcy5fbWF4UmV0cmllcyAmJiB0aGlzLl9yZXRyaWVzKysgPCB0aGlzLl9tYXhSZXRyaWVzICYmIHNob3VsZFJldHJ5KGVyciwgcmVzKSkge1xuICAgIHJldHVybiB0aGlzLl9yZXRyeSgpO1xuICB9XG5cbiAgdmFyIGZuID0gdGhpcy5fY2FsbGJhY2s7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG5cbiAgaWYgKGVycikge1xuICAgIGlmICh0aGlzLl9tYXhSZXRyaWVzKSBlcnIucmV0cmllcyA9IHRoaXMuX3JldHJpZXMgLSAxO1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgZm4oZXJyLCByZXMpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB4LWRvbWFpbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcm9zc0RvbWFpbkVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignUmVxdWVzdCBoYXMgYmVlbiB0ZXJtaW5hdGVkXFxuUG9zc2libGUgY2F1c2VzOiB0aGUgbmV0d29yayBpcyBvZmZsaW5lLCBPcmlnaW4gaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luLCB0aGUgcGFnZSBpcyBiZWluZyB1bmxvYWRlZCwgZXRjLicpO1xuICBlcnIuY3Jvc3NEb21haW4gPSB0cnVlO1xuXG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICBlcnIudXJsID0gdGhpcy51cmw7XG5cbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLy8gVGhpcyBvbmx5IHdhcm5zLCBiZWNhdXNlIHRoZSByZXF1ZXN0IGlzIHN0aWxsIGxpa2VseSB0byB3b3JrXG5SZXF1ZXN0LnByb3RvdHlwZS5idWZmZXIgPSBSZXF1ZXN0LnByb3RvdHlwZS5jYSA9IFJlcXVlc3QucHJvdG90eXBlLmFnZW50ID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS53YXJuKFwiVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFRoaXMgdGhyb3dzLCBiZWNhdXNlIGl0IGNhbid0IHNlbmQvcmVjZWl2ZSBkYXRhIGFzIGV4cGVjdGVkXG5SZXF1ZXN0LnByb3RvdHlwZS5waXBlID0gUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbigpe1xuICB0aHJvdyBFcnJvcihcIlN0cmVhbWluZyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLl9pc0hvc3QgPSBmdW5jdGlvbiBfaXNIb3N0KG9iaikge1xuICAvLyBOYXRpdmUgb2JqZWN0cyBzdHJpbmdpZnkgdG8gW29iamVjdCBGaWxlXSwgW29iamVjdCBCbG9iXSwgW29iamVjdCBGb3JtRGF0YV0sIGV0Yy5cbiAgcmV0dXJuIG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iaiAmJiAhQXJyYXkuaXNBcnJheShvYmopICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKFwiV2FybmluZzogLmVuZCgpIHdhcyBjYWxsZWQgdHdpY2UuIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBzdXBlcmFnZW50XCIpO1xuICB9XG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5fZW5kID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHhociA9IHRoaXMueGhyID0gcmVxdWVzdC5nZXRYSFIoKTtcbiAgdmFyIGRhdGEgPSB0aGlzLl9mb3JtRGF0YSB8fCB0aGlzLl9kYXRhO1xuXG4gIHRoaXMuX3NldFRpbWVvdXRzKCk7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIHZhciByZWFkeVN0YXRlID0geGhyLnJlYWR5U3RhdGU7XG4gICAgaWYgKHJlYWR5U3RhdGUgPj0gMiAmJiBzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgICB9XG4gICAgaWYgKDQgIT0gcmVhZHlTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEluIElFOSwgcmVhZHMgdG8gYW55IHByb3BlcnR5IChlLmcuIHN0YXR1cykgb2ZmIG9mIGFuIGFib3J0ZWQgWEhSIHdpbGxcbiAgICAvLyByZXN1bHQgaW4gdGhlIGVycm9yIFwiQ291bGQgbm90IGNvbXBsZXRlIHRoZSBvcGVyYXRpb24gZHVlIHRvIGVycm9yIGMwMGMwMjNmXCJcbiAgICB2YXIgc3RhdHVzO1xuICAgIHRyeSB7IHN0YXR1cyA9IHhoci5zdGF0dXMgfSBjYXRjaChlKSB7IHN0YXR1cyA9IDA7IH1cblxuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCB8fCBzZWxmLl9hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgdmFyIGhhbmRsZVByb2dyZXNzID0gZnVuY3Rpb24oZGlyZWN0aW9uLCBlKSB7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDA7XG4gICAgfVxuICAgIGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfVxuICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoJ3Byb2dyZXNzJykpIHtcbiAgICB0cnkge1xuICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICdkb3dubG9hZCcpO1xuICAgICAgaWYgKHhoci51cGxvYWQpIHtcbiAgICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAndXBsb2FkJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyBBY2Nlc3NpbmcgeGhyLnVwbG9hZCBmYWlscyBpbiBJRSBmcm9tIGEgd2ViIHdvcmtlciwgc28ganVzdCBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgICAgLy8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84MzcyNDUveG1saHR0cHJlcXVlc3QtdXBsb2FkLXRocm93cy1pbnZhbGlkLWFyZ3VtZW50LXdoZW4tdXNlZC1mcm9tLXdlYi13b3JrZXItY29udGV4dFxuICAgIH1cbiAgfVxuXG4gIC8vIGluaXRpYXRlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUsIHRoaXMudXNlcm5hbWUsIHRoaXMucGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gc2VlICMxMTQ5XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgfVxuXG4gIC8vIENPUlNcbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgLy8gYm9keVxuICBpZiAoIXRoaXMuX2Zvcm1EYXRhICYmICdHRVQnICE9IHRoaXMubWV0aG9kICYmICdIRUFEJyAhPSB0aGlzLm1ldGhvZCAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgZGF0YSAmJiAhdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgdmFyIGNvbnRlbnRUeXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICB2YXIgc2VyaWFsaXplID0gdGhpcy5fc2VyaWFsaXplciB8fCByZXF1ZXN0LnNlcmlhbGl6ZVtjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF0gOiAnJ107XG4gICAgaWYgKCFzZXJpYWxpemUgJiYgaXNKU09OKGNvbnRlbnRUeXBlKSkge1xuICAgICAgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgICB9XG4gICAgaWYgKHNlcmlhbGl6ZSkgZGF0YSA9IHNlcmlhbGl6ZShkYXRhKTtcbiAgfVxuXG4gIC8vIHNldCBoZWFkZXIgZmllbGRzXG4gIGZvciAodmFyIGZpZWxkIGluIHRoaXMuaGVhZGVyKSB7XG4gICAgaWYgKG51bGwgPT0gdGhpcy5oZWFkZXJbZmllbGRdKSBjb250aW51ZTtcblxuICAgIGlmICh0aGlzLmhlYWRlci5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpXG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihmaWVsZCwgdGhpcy5oZWFkZXJbZmllbGRdKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZXNwb25zZVR5cGUpIHtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gdGhpcy5fcmVzcG9uc2VUeXBlO1xuICB9XG5cbiAgLy8gc2VuZCBzdHVmZlxuICB0aGlzLmVtaXQoJ3JlcXVlc3QnLCB0aGlzKTtcblxuICAvLyBJRTExIHhoci5zZW5kKHVuZGVmaW5lZCkgc2VuZHMgJ3VuZGVmaW5lZCcgc3RyaW5nIGFzIFBPU1QgcGF5bG9hZCAoaW5zdGVhZCBvZiBub3RoaW5nKVxuICAvLyBXZSBuZWVkIG51bGwgaGVyZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICB4aHIuc2VuZCh0eXBlb2YgZGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBkYXRhIDogbnVsbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHRVQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmdldCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmhlYWQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0hFQUQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogT1BUSU9OUyBxdWVyeSB0byBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3Qub3B0aW9ucyA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnT1BUSU9OUycsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGVsKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbnJlcXVlc3RbJ2RlbCddID0gZGVsO1xucmVxdWVzdFsnZGVsZXRlJ10gPSBkZWw7XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucGF0Y2ggPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wb3N0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQT1NUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUFVUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG4vKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cclxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcclxuICAgIC5wdXNoKGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uLmZuID0gZm47XHJcbiAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgLy8gYWxsXHJcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgdmFyIGNiO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcclxuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIE1vZHVsZSBvZiBtaXhlZC1pbiBmdW5jdGlvbnMgc2hhcmVkIGJldHdlZW4gbm9kZSBhbmQgY2xpZW50IGNvZGVcbiAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pcy1vYmplY3QnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcXVlc3RCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RCYXNlYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3RCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uIF9jbGVhclRpbWVvdXQoKXtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgZGVsZXRlIHRoaXMuX3RpbWVyO1xuICBkZWxldGUgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIGJvZHkgcGFyc2VyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGluY29taW5nIGRhdGEgaW50byByZXF1ZXN0LmJvZHlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShmbil7XG4gIHRoaXMuX3BhcnNlciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGZvcm1hdCBvZiBiaW5hcnkgcmVzcG9uc2UgYm9keS5cbiAqIEluIGJyb3dzZXIgdmFsaWQgZm9ybWF0cyBhcmUgJ2Jsb2InIGFuZCAnYXJyYXlidWZmZXInLFxuICogd2hpY2ggcmV0dXJuIEJsb2IgYW5kIEFycmF5QnVmZmVyLCByZXNwZWN0aXZlbHkuXG4gKlxuICogSW4gTm9kZSBhbGwgdmFsdWVzIHJlc3VsdCBpbiBCdWZmZXIuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAucmVzcG9uc2VUeXBlKCdibG9iJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlc3BvbnNlVHlwZSA9IGZ1bmN0aW9uKHZhbCl7XG4gIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVxdWVzdCBib2R5IHNlcmlhbGl6ZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgZGF0YSBzZXQgdmlhIC5zZW5kIG9yIC5hdHRhY2ggaW50byBwYXlsb2FkIHRvIHNlbmRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gc2VyaWFsaXplKGZuKXtcbiAgdGhpcy5fc2VyaWFsaXplciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXRzLlxuICpcbiAqIC0gcmVzcG9uc2UgdGltZW91dCBpcyB0aW1lIGJldHdlZW4gc2VuZGluZyByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIHJlc3BvbnNlLiBJbmNsdWRlcyBETlMgYW5kIGNvbm5lY3Rpb24gdGltZS5cbiAqIC0gZGVhZGxpbmUgaXMgdGhlIHRpbWUgZnJvbSBzdGFydCBvZiB0aGUgcmVxdWVzdCB0byByZWNlaXZpbmcgcmVzcG9uc2UgYm9keSBpbiBmdWxsLiBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIHNob3J0IGxhcmdlIGZpbGVzIG1heSBub3QgbG9hZCBhdCBhbGwgb24gc2xvdyBjb25uZWN0aW9ucy5cbiAqXG4gKiBWYWx1ZSBvZiAwIG9yIGZhbHNlIG1lYW5zIG5vIHRpbWVvdXQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBtcyBvciB7cmVzcG9uc2UsIGRlYWRsaW5lfVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChvcHRpb25zKXtcbiAgaWYgKCFvcHRpb25zIHx8ICdvYmplY3QnICE9PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zO1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3IodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucy5kZWFkbGluZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IG9wdGlvbnMucmVzcG9uc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biB0aW1lb3V0IG9wdGlvblwiLCBvcHRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gcmV0cnkoY291bnQpe1xuICAvLyBEZWZhdWx0IHRvIDEgaWYgbm8gY291bnQgcGFzc2VkIG9yIHRydWVcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgY291bnQgPT09IHRydWUpIGNvdW50ID0gMTtcbiAgaWYgKGNvdW50IDw9IDApIGNvdW50ID0gMDtcbiAgdGhpcy5fbWF4UmV0cmllcyA9IGNvdW50O1xuICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICAvLyBub2RlXG4gIGlmICh0aGlzLnJlcSkge1xuICAgIHRoaXMucmVxID0gbnVsbDtcbiAgICB0aGlzLnJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB9XG5cbiAgdGhpcy5fYWJvcnRlZCA9IGZhbHNlO1xuICB0aGlzLnRpbWVkb3V0ID0gZmFsc2U7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlIHN1cHBvcnRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVqZWN0XVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIHRoZW4ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gIGlmICghdGhpcy5fZnVsbGZpbGxlZFByb21pc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzXCIpO1xuICAgIH1cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKGlubmVyUmVzb2x2ZSwgaW5uZXJSZWplY3Qpe1xuICAgICAgc2VsZi5lbmQoZnVuY3Rpb24oZXJyLCByZXMpe1xuICAgICAgICBpZiAoZXJyKSBpbm5lclJlamVjdChlcnIpOyBlbHNlIGlubmVyUmVzb2x2ZShyZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbn1cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNhdGNoID0gZnVuY3Rpb24oY2IpIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNiKTtcbn07XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUub2sgPSBmdW5jdGlvbihjYikge1xuICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNiKSB0aHJvdyBFcnJvcihcIkNhbGxiYWNrIHJlcXVpcmVkXCIpO1xuICB0aGlzLl9va0NhbGxiYWNrID0gY2I7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9pc1Jlc3BvbnNlT0sgPSBmdW5jdGlvbihyZXMpIHtcbiAgaWYgKCFyZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodGhpcy5fb2tDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLl9va0NhbGxiYWNrKHJlcyk7XG4gIH1cblxuICByZXR1cm4gcmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMDtcbn07XG5cblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldEhlYWRlciA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQ7XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBmaWVsZCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCBmaWVsZFtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldID0gdmFsO1xuICB0aGlzLmhlYWRlcltmaWVsZF0gPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG4gIGRlbGV0ZSB0aGlzLmhlYWRlcltmaWVsZF07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdFxuICogZm9yIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIHJlcXVlc3QgYm9kaWVzLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKCdmb28nLCAnYmFyJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKHsgZm9vOiAnYmFyJywgYmF6OiAncXV4JyB9KVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfEJ1ZmZlcnxmcy5SZWFkU3RyZWFtfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG5cbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG51bGwgPT09IG5hbWUgfHwgIHVuZGVmaW5lZCA9PT0gbmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgbmFtZSBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cblxuICBpZiAodGhpcy5fZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCIuZmllbGQoKSBjYW4ndCBiZSB1c2VkIGlmIC5zZW5kKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICB0aGlzLmZpZWxkKGtleSwgbmFtZVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgZm9yICh2YXIgaSBpbiB2YWwpIHtcbiAgICAgIHRoaXMuZmllbGQobmFtZSwgdmFsW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyB2YWwgc2hvdWxkIGJlIGRlZmluZWQgbm93XG4gIGlmIChudWxsID09PSB2YWwgfHwgdW5kZWZpbmVkID09PSB2YWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIHZhbCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PT0gdHlwZW9mIHZhbCkge1xuICAgIHZhbCA9ICcnICsgdmFsO1xuICB9XG4gIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKG5hbWUsIHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBYm9ydCB0aGUgcmVxdWVzdCwgYW5kIGNsZWFyIHBvdGVudGlhbCB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2Fib3J0ZWQgPSB0cnVlO1xuICB0aGlzLnhociAmJiB0aGlzLnhoci5hYm9ydCgpOyAvLyBicm93c2VyXG4gIHRoaXMucmVxICYmIHRoaXMucmVxLmFib3J0KCk7IC8vIG5vZGVcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKG9uKXtcbiAgLy8gVGhpcyBpcyBicm93c2VyLW9ubHkgZnVuY3Rpb25hbGl0eS4gTm9kZSBzaWRlIGlzIG5vLW9wLlxuICBpZihvbj09dW5kZWZpbmVkKSBvbiA9IHRydWU7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IG9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXggcmVkaXJlY3RzIHRvIGBuYC4gRG9lcyBub3RpbmcgaW4gYnJvd3NlciBYSFIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVkaXJlY3RzID0gZnVuY3Rpb24obil7XG4gIHRoaXMuX21heFJlZGlyZWN0cyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGEgcGxhaW4gamF2YXNjcmlwdCBvYmplY3QgKG5vdCBKU09OIHN0cmluZykgb2Ygc2NhbGFyIHByb3BlcnRpZXMuXG4gKiBOb3RlIGFzIHRoaXMgbWV0aG9kIGlzIGRlc2lnbmVkIHRvIHJldHVybiBhIHVzZWZ1bCBub24tdGhpcyB2YWx1ZSxcbiAqIGl0IGNhbm5vdCBiZSBjaGFpbmVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVzY3JpYmluZyBtZXRob2QsIHVybCwgYW5kIGRhdGEgb2YgdGhpcyByZXF1ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpe1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXG4gICAgdXJsOiB0aGlzLnVybCxcbiAgICBkYXRhOiB0aGlzLl9kYXRhLFxuICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlclxuICB9O1xufTtcblxuXG4vKipcbiAqIFNlbmQgYGRhdGFgIGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSl7XG4gIHZhciBpc09iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgaWYgKHRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIi5zZW5kKCkgY2FuJ3QgYmUgdXNlZCBpZiAuYXR0YWNoKCkgb3IgLmZpZWxkKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iaiAmJiAhdGhpcy5fZGF0YSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIGlmICghdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICB9IGVsc2UgaWYgKGRhdGEgJiYgdGhpcy5fZGF0YSAmJiB0aGlzLl9pc0hvc3QodGhpcy5fZGF0YSkpIHtcbiAgICB0aHJvdyBFcnJvcihcIkNhbid0IG1lcmdlIHRoZXNlIHNlbmQgY2FsbHNcIik7XG4gIH1cblxuICAvLyBtZXJnZVxuICBpZiAoaXNPYmogJiYgaXNPYmplY3QodGhpcy5fZGF0YSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSkge1xuICAgIC8vIGRlZmF1bHQgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyB0aGlzLl9kYXRhICsgJyYnICsgZGF0YVxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmogfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkZWZhdWx0IHRvIGpzb25cbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogU29ydCBgcXVlcnlzdHJpbmdgIGJ5IHRoZSBzb3J0IGZ1bmN0aW9uXG4gKlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIGRlZmF1bHQgb3JkZXJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KClcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBjdXN0b21pemVkIHNvcnQgZnVuY3Rpb25cbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvdXNlcicpXG4gKiAgICAgICAgIC5xdWVyeSgnbmFtZT1OaWNrJylcbiAqICAgICAgICAgLnF1ZXJ5KCdzZWFyY2g9TWFubnknKVxuICogICAgICAgICAuc29ydFF1ZXJ5KGZ1bmN0aW9uKGEsIGIpe1xuICogICAgICAgICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xuICogICAgICAgICB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzb3J0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNvcnRRdWVyeSA9IGZ1bmN0aW9uKHNvcnQpIHtcbiAgLy8gX3NvcnQgZGVmYXVsdCB0byB0cnVlIGJ1dCBvdGhlcndpc2UgY2FuIGJlIGEgZnVuY3Rpb24gb3IgYm9vbGVhblxuICB0aGlzLl9zb3J0ID0gdHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IHNvcnQ7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb21wb3NlIHF1ZXJ5c3RyaW5nIHRvIGFwcGVuZCB0byByZXEudXJsXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fZmluYWxpemVRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgdGhpcy51cmwgKz0gKHRoaXMudXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArIHF1ZXJ5O1xuICB9XG4gIHRoaXMuX3F1ZXJ5Lmxlbmd0aCA9IDA7IC8vIE1ha2VzIHRoZSBjYWxsIGlkZW1wb3RlbnRcblxuICBpZiAodGhpcy5fc29ydCkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdmFyIHF1ZXJ5QXJyID0gdGhpcy51cmwuc3Vic3RyaW5nKGluZGV4ICsgMSkuc3BsaXQoJyYnKTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgdGhpcy5fc29ydCkge1xuICAgICAgICBxdWVyeUFyci5zb3J0KHRoaXMuX3NvcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCgpO1xuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSB0aGlzLnVybC5zdWJzdHJpbmcoMCwgaW5kZXgpICsgJz8nICsgcXVlcnlBcnIuam9pbignJicpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRm9yIGJhY2t3YXJkcyBjb21wYXQgb25seVxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hcHBlbmRRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKCkge2NvbnNvbGUudHJhY2UoXCJVbnN1cHBvcnRlZFwiKTt9XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3RpbWVvdXRFcnJvciA9IGZ1bmN0aW9uKHJlYXNvbiwgdGltZW91dCwgZXJybm8pe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZXJyID0gbmV3IEVycm9yKHJlYXNvbiArIHRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnKTtcbiAgZXJyLnRpbWVvdXQgPSB0aW1lb3V0O1xuICBlcnIuY29kZSA9ICdFQ09OTkFCT1JURUQnO1xuICBlcnIuZXJybm8gPSBlcnJubztcbiAgdGhpcy50aW1lZG91dCA9IHRydWU7XG4gIHRoaXMuYWJvcnQoKTtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zZXRUaW1lb3V0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gZGVhZGxpbmVcbiAgaWYgKHRoaXMuX3RpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1RpbWVvdXQgb2YgJywgc2VsZi5fdGltZW91dCwgJ0VUSU1FJyk7XG4gICAgfSwgdGhpcy5fdGltZW91dCk7XG4gIH1cbiAgLy8gcmVzcG9uc2UgdGltZW91dFxuICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0ICYmICF0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdSZXNwb25zZSB0aW1lb3V0IG9mICcsIHNlbGYuX3Jlc3BvbnNlVGltZW91dCwgJ0VUSU1FRE9VVCcpO1xuICAgIH0sIHRoaXMuX3Jlc3BvbnNlVGltZW91dCk7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3JlcXVlc3QtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlQmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZUJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2VCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBSZXNwb25zZUJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXNwb25zZUJhc2UucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gICAgLy8gVE9ETzogbW9hciFcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYSB1dGlsXG5cbiAgICAvLyBjb250ZW50LXR5cGVcbiAgICB2YXIgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpO1xuXG4gICAgLy8gcGFyYW1zXG4gICAgdmFyIHBhcmFtcyA9IHV0aWxzLnBhcmFtcyhjdCk7XG4gICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG5cbiAgICB0aGlzLmxpbmtzID0ge307XG5cbiAgICAvLyBsaW5rc1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChoZWFkZXIubGluaykge1xuICAgICAgICAgICAgdGhpcy5saW5rcyA9IHV0aWxzLnBhcnNlTGlua3MoaGVhZGVyLmxpbmspO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgIH1cbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gICAgdmFyIHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwO1xuXG4gICAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlO1xuXG4gICAgLy8gYmFzaWNzXG4gICAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICAgIHRoaXMub2sgPSAyID09IHR5cGU7XG4gICAgdGhpcy5yZWRpcmVjdCA9IDMgPT0gdHlwZTtcbiAgICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICAgIHRoaXMuc2VydmVyRXJyb3IgPSA1ID09IHR5cGU7XG4gICAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgICAgICA/IHRoaXMudG9FcnJvcigpXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAvLyBzdWdhclxuICAgIHRoaXMuYWNjZXB0ZWQgPSAyMDIgPT0gc3RhdHVzO1xuICAgIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cztcbiAgICB0aGlzLmJhZFJlcXVlc3QgPSA0MDAgPT0gc3RhdHVzO1xuICAgIHRoaXMudW5hdXRob3JpemVkID0gNDAxID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICAgIHRoaXMuZm9yYmlkZGVuID0gNDAzID09IHN0YXR1cztcbiAgICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXNwb25zZS1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykucmVkdWNlKGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLyk7XG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgdmFyIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMaW5rIGhlYWRlciBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJzZUxpbmtzID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICosICovKS5yZWR1Y2UoZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgICB2YXIgdXJsID0gcGFydHNbMF0uc2xpY2UoMSwgLTEpO1xuICAgIHZhciByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gICAgb2JqW3JlbF0gPSB1cmw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBTdHJpcCBjb250ZW50IHJlbGF0ZWQgZmllbGRzIGZyb20gYGhlYWRlcmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuY2xlYW5IZWFkZXIgPSBmdW5jdGlvbihoZWFkZXIsIHNob3VsZFN0cmlwQ29va2llKXtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2hvc3QnXTtcbiAgaWYgKHNob3VsZFN0cmlwQ29va2llKSB7XG4gICAgZGVsZXRlIGhlYWRlclsnY29va2llJ107XG4gIH1cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBFUlJPUl9DT0RFUyA9IFtcbiAgJ0VDT05OUkVTRVQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VBRERSSU5GTycsXG4gICdFU09DS0VUVElNRURPVVQnXG5dO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHJlcXVlc3Qgc2hvdWxkIGJlIHJldHJpZWQuXG4gKiAoQm9ycm93ZWQgZnJvbSBzZWdtZW50aW8vc3VwZXJhZ2VudC1yZXRyeSlcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaG91bGRSZXRyeShlcnIsIHJlcykge1xuICBpZiAoZXJyICYmIGVyci5jb2RlICYmIH5FUlJPUl9DT0RFUy5pbmRleE9mKGVyci5jb2RlKSkgcmV0dXJuIHRydWU7XG4gIGlmIChyZXMgJiYgcmVzLnN0YXR1cyAmJiByZXMuc3RhdHVzID49IDUwMCkgcmV0dXJuIHRydWU7XG4gIC8vIFN1cGVyYWdlbnQgdGltZW91dFxuICBpZiAoZXJyICYmICd0aW1lb3V0JyBpbiBlcnIgJiYgZXJyLmNvZGUgPT0gJ0VDT05OQUJPUlRFRCcpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyICYmICdjcm9zc0RvbWFpbicgaW4gZXJyKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Nob3VsZC1yZXRyeS5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNi0yMDE3IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciB4bWxjcmVhdGVfMSA9IHJlcXVpcmUoXCJ4bWxjcmVhdGVcIik7XG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4vb3B0aW9uc1wiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqIFBhcnNlcyBhIHN0cmluZyBpbnRvIFhNTC5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gcGFyc2UgaW50byBYTUwuXG4gKiBAcGFyYW0gcGFyZW50RWxlbWVudCBUaGUgWE1MIGVsZW1lbnQgb3IgYXR0cmlidXRlIHRoYXQgd2lsbCBjb250YWluIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgc3RyaW5nLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgc3RyaW5nIGludG8gWE1MLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0ciwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciByZXF1aXJlc0NkYXRhID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgcmV0dXJuIChvcHRpb25zLmNkYXRhSW52YWxpZENoYXJzICYmIChzLmluZGV4T2YoXCI8XCIpICE9PSAtMVxuICAgICAgICAgICAgfHwgcy5pbmRleE9mKFwiJlwiKSAhPT0gLTEpKVxuICAgICAgICAgICAgfHwgb3B0aW9ucy5jZGF0YUtleXMuaW5kZXhPZihwYXJlbnRFbGVtZW50Lm5hbWUpICE9PSAtMVxuICAgICAgICAgICAgfHwgb3B0aW9ucy5jZGF0YUtleXMuaW5kZXhPZihcIipcIikgIT09IC0xO1xuICAgIH07XG4gICAgaWYgKHBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiB4bWxjcmVhdGVfMS5YbWxFbGVtZW50KSB7XG4gICAgICAgIGlmIChyZXF1aXJlc0NkYXRhKHN0cikpIHtcbiAgICAgICAgICAgIHZhciBjZGF0YVN0cnMgPSBzdHIuc3BsaXQoXCJdXT5cIik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNkYXRhU3Rycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlc0NkYXRhKGNkYXRhU3Ryc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jZGF0YShjZGF0YVN0cnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGFyRGF0YShjZGF0YVN0cnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA8IGNkYXRhU3Rycy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hhckRhdGEoXCJdXT5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jaGFyRGF0YShzdHIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBwYXJlbnRFbGVtZW50LnRleHQoc3RyKTtcbiAgICB9XG59XG4vKipcbiAqIFBhcnNlcyBhbiBhdHRyaWJ1dGUgaW50byBYTUwuXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IFRoZSBYTUwgZWxlbWVudCB0aGF0IHdpbGwgY29udGFpbiB0aGUgc3RyaW5nLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgYXR0cmlidXRlIGludG8gWE1MLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlKG5hbWUsIHZhbHVlLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGF0dHJpYnV0ZSA9IHBhcmVudEVsZW1lbnQuYXR0cmlidXRlKG5hbWUsIFwiXCIpO1xuICAgIGlmICh1dGlsc18xLmlzUHJpbWl0aXZlKHZhbHVlKSkge1xuICAgICAgICBwYXJzZVN0cmluZyh1dGlsc18xLnN0cmluZ2lmeSh2YWx1ZSksIGF0dHJpYnV0ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdHRyaWJ1dGUgdmFsdWUgZm9yIG5hbWUgJ1wiICsgbmFtZSArIFwiJyBzaG91bGQgYmUgYVwiXG4gICAgICAgICAgICArIFwiIHByaW1pdGl2ZSAoc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4sIG51bGwsIG9yXCJcbiAgICAgICAgICAgICsgXCIgdW5kZWZpbmVkKVwiKTtcbiAgICB9XG59XG4vKipcbiAqIFBhcnNlcyBhbiBvYmplY3Qgb3IgTWFwIGVudHJ5IGludG8gWE1MLlxuICpcbiAqIEBwYXJhbSBrZXkgVGhlIGtleSBhc3NvY2lhdGVkIHdpdGggdGhlIG9iamVjdCBvciBNYXAgZW50cnkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIG9iamVjdCBvciBtYXAgZW50cnkuXG4gKiBAcGFyYW0gcGFyZW50RWxlbWVudCBUaGUgWE1MIGVsZW1lbnQgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIG9iamVjdCBvciBtYXBcbiAqICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgb2JqZWN0IG9yIG1hcCBlbnRyeSBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZU9iamVjdE9yTWFwRW50cnkoa2V5LCB2YWx1ZSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIC8vIEFsaWFzIGtleVxuICAgIGlmIChrZXkgPT09IG9wdGlvbnMuYWxpYXNTdHJpbmcpIHtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWxpYXNTdHJpbmcgdmFsdWUgZm9yIFwiICsgdmFsdWVcbiAgICAgICAgICAgICAgICArIFwiIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnRFbGVtZW50Lm5hbWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBBdHRyaWJ1dGVzIGtleVxuICAgIGlmIChrZXkuaW5kZXhPZihvcHRpb25zLmF0dHJpYnV0ZVN0cmluZykgPT09IDApIHtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXModmFsdWUpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJrZXkgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgcGFyc2VBdHRyaWJ1dGUoc3Via2V5LCB2YWx1ZVtzdWJrZXldLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImF0dHJpYnV0ZXMgb2JqZWN0IGZvciBcIiArIGtleSArIFwiIHNob3VsZCBiZSBhblwiXG4gICAgICAgICAgICAgICAgKyBcIiBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBWYWx1ZSBrZXlcbiAgICBpZiAoa2V5LmluZGV4T2Yob3B0aW9ucy52YWx1ZVN0cmluZykgPT09IDApIHtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNQcmltaXRpdmUodmFsdWUpKSB7XG4gICAgICAgICAgICBwYXJzZVZhbHVlKGtleSwgdmFsdWUsIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmFsdWUgXCIgKyB2YWx1ZSArIFwiIHNob3VsZCBiZSBhIHByaW1pdGl2ZVwiXG4gICAgICAgICAgICAgICAgKyBcIiAoc3RyaW5nLCBudW1iZXIsIGJvb2xlYW4sIG51bGwsIG9yIHVuZGVmaW5lZClcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU3RhbmRhcmQgaGFuZGxpbmcgKGNyZWF0ZSBuZXcgZWxlbWVudCBmb3IgZW50cnkpXG4gICAgdmFyIGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50O1xuICAgIGlmICghdXRpbHNfMS5pc0FycmF5KHZhbHVlKSAmJiAhdXRpbHNfMS5pc1NldCh2YWx1ZSkpIHtcbiAgICAgICAgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQuZWxlbWVudChrZXkpO1xuICAgIH1cbiAgICBwYXJzZVZhbHVlKGtleSwgdmFsdWUsIGVsZW1lbnQsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBQYXJzZXMgYW4gT2JqZWN0IG9yIE1hcCBpbnRvIFhNTC5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0T3JNYXAgVGhlIG9iamVjdCBvciBtYXAgdG8gcGFyc2UgaW50byBYTUwuXG4gKiBAcGFyYW0gcGFyZW50RWxlbWVudCBUaGUgWE1MIGVsZW1lbnQgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIG9iamVjdC5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIG9iamVjdCBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZU9iamVjdE9yTWFwKG9iamVjdE9yTWFwLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgaWYgKHV0aWxzXzEuaXNNYXAob2JqZWN0T3JNYXApKSB7XG4gICAgICAgIG9iamVjdE9yTWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHBhcnNlT2JqZWN0T3JNYXBFbnRyeSh1dGlsc18xLnN0cmluZ2lmeShrZXkpLCB2YWx1ZSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKG9iamVjdE9yTWFwKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBfYVtfaV07XG4gICAgICAgICAgICBwYXJzZU9iamVjdE9yTWFwRW50cnkoa2V5LCBvYmplY3RPck1hcFtrZXldLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogUGFyc2VzIGFuIGFycmF5IG9yIFNldCBpbnRvIFhNTC5cbiAqXG4gKiBAcGFyYW0ga2V5IFRoZSBrZXkgYXNzb2NpYXRlZCB3aXRoIHRoZSBhcnJheSBvciBzZXQgdG8gcGFyc2UgaW50byBYTUwuXG4gKiBAcGFyYW0gYXJyYXlPclNldCBUaGUgYXJyYXkgb3Igc2V0IHRvIHBhcnNlIGludG8gWE1MLlxuICogQHBhcmFtIHBhcmVudEVsZW1lbnQgVGhlIFhNTCBlbGVtZW50IHRoYXQgd2lsbCBjb250YWluIHRoZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIGFycmF5IG9yIHNldCBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZUFycmF5T3JTZXQoa2V5LCBhcnJheU9yU2V0LCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGFycmF5TmFtZUZ1bmM7XG4gICAgaWYgKG9wdGlvbnMud3JhcEhhbmRsZXJzLmhhc093blByb3BlcnR5KFwiKlwiKSkge1xuICAgICAgICBhcnJheU5hbWVGdW5jID0gb3B0aW9ucy53cmFwSGFuZGxlcnNbXCIqXCJdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy53cmFwSGFuZGxlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBhcnJheU5hbWVGdW5jID0gb3B0aW9ucy53cmFwSGFuZGxlcnNba2V5XTtcbiAgICB9XG4gICAgdmFyIGFycmF5S2V5ID0ga2V5O1xuICAgIHZhciBhcnJheUVsZW1lbnQgPSBwYXJlbnRFbGVtZW50O1xuICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChhcnJheU5hbWVGdW5jKSkge1xuICAgICAgICB2YXIgYXJyYXlOYW1lRnVuY0tleSA9IGFycmF5TmFtZUZ1bmMoYXJyYXlLZXksIGFycmF5T3JTZXQpO1xuICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyhhcnJheU5hbWVGdW5jS2V5KSkge1xuICAgICAgICAgICAgYXJyYXlLZXkgPSBhcnJheU5hbWVGdW5jS2V5O1xuICAgICAgICAgICAgYXJyYXlFbGVtZW50ID0gcGFyZW50RWxlbWVudC5lbGVtZW50KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNOdWxsKGFycmF5TmFtZUZ1bmNLZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ3cmFwSGFuZGxlcnMgZnVuY3Rpb24gZm9yIFwiICsgYXJyYXlLZXlcbiAgICAgICAgICAgICAgICArIFwiIHNob3VsZCByZXR1cm4gYSBzdHJpbmcgb3IgbnVsbFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcnJheU9yU2V0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheUVsZW1lbnQ7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc0FycmF5KGl0ZW0pICYmICF1dGlsc18xLmlzU2V0KGl0ZW0pKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlFbGVtZW50LmVsZW1lbnQoYXJyYXlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnNlVmFsdWUoYXJyYXlLZXksIGl0ZW0sIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBQYXJzZXMgYW4gYXJiaXRyYXJ5IEphdmFTY3JpcHQgdmFsdWUgaW50byBYTUwuXG4gKlxuICogQHBhcmFtIGtleSBUaGUga2V5IGFzc29jaWF0ZWQgd2l0aCB0aGUgdmFsdWUgdG8gcGFyc2UgaW50byBYTUwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHBhcnNlIGludG8gWE1MLlxuICogQHBhcmFtIHBhcmVudEVsZW1lbnQgVGhlIFhNTCBlbGVtZW50IHRoYXQgd2lsbCBjb250YWluIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIHZhbHVlIGludG8gWE1MLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoa2V5LCB2YWx1ZSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIC8vIElmIGEgaGFuZGxlciBmb3IgYSBwYXJ0aWN1bGFyIHR5cGUgaXMgdXNlci1kZWZpbmVkLCB1c2UgdGhhdCBoYW5kbGVyXG4gICAgLy8gaW5zdGVhZCBvZiB0aGUgZGVmYXVsdHNcbiAgICB2YXIgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKG9wdGlvbnMudHlwZUhhbmRsZXJzLmhhc093blByb3BlcnR5KFwiKlwiKSkge1xuICAgICAgICBoYW5kbGVyID0gb3B0aW9ucy50eXBlSGFuZGxlcnNbXCIqXCJdO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy50eXBlSGFuZGxlcnMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICAgICAgaGFuZGxlciA9IG9wdGlvbnMudHlwZUhhbmRsZXJzW3R5cGVdO1xuICAgIH1cbiAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoaGFuZGxlcikpIHtcbiAgICAgICAgdmFsdWUgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzXzEuaXNPYmplY3QodmFsdWUpIHx8IHV0aWxzXzEuaXNNYXAodmFsdWUpKSB7XG4gICAgICAgIHBhcnNlT2JqZWN0T3JNYXAodmFsdWUsIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh1dGlsc18xLmlzQXJyYXkodmFsdWUpIHx8IHV0aWxzXzEuaXNTZXQodmFsdWUpKSB7XG4gICAgICAgIHBhcnNlQXJyYXlPclNldChrZXksIHZhbHVlLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwYXJzZVN0cmluZyh1dGlsc18xLnN0cmluZ2lmeSh2YWx1ZSksIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpO1xufVxuLyoqXG4gKiBSZXR1cm5zIGEgWE1MIGRvY3VtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gcm9vdCBUaGUgbmFtZSBvZiB0aGUgcm9vdCBYTUwgZWxlbWVudC4gV2hlbiB0aGUgdmFsdWUgaXMgY29udmVydGVkIHRvXG4gKiAgICAgICAgICAgICBYTUwsIGl0IHdpbGwgYmUgYSBjaGlsZCBvZiB0aGlzIHJvb3QgZWxlbWVudC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBYTUwuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBwYXJzaW5nIHRoZSB2YWx1ZSBpbnRvIFhNTC5cbiAqXG4gKiBAcmV0dXJucyBBbiBYTUwgZG9jdW1lbnQgY29ycmVzcG9uZGluZyB0byB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVG9Eb2N1bWVudChyb290LCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBkb2N1bWVudCA9IG5ldyB4bWxjcmVhdGVfMS5YbWxEb2N1bWVudChyb290KTtcbiAgICBpZiAob3B0aW9ucy5kZWNsYXJhdGlvbi5pbmNsdWRlKSB7XG4gICAgICAgIGRvY3VtZW50LmRlY2wob3B0aW9ucy5kZWNsYXJhdGlvbik7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmR0ZC5pbmNsdWRlKSB7XG4gICAgICAgIGRvY3VtZW50LmR0ZChvcHRpb25zLmR0ZC5uYW1lLCBvcHRpb25zLmR0ZC5zeXNJZCwgb3B0aW9ucy5kdGQucHViSWQpO1xuICAgIH1cbiAgICBwYXJzZVZhbHVlKHJvb3QsIHZhbHVlLCBkb2N1bWVudC5yb290KCksIG9wdGlvbnMpO1xuICAgIHJldHVybiBkb2N1bWVudDtcbn1cbi8qKlxuICogUmV0dXJucyBhIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHJvb3QgVGhlIG5hbWUgb2YgdGhlIHJvb3QgWE1MIGVsZW1lbnQuIFdoZW4gdGhlIG9iamVjdCBpcyBjb252ZXJ0ZWRcbiAqICAgICAgICAgICAgIHRvIFhNTCwgaXQgd2lsbCBiZSBhIGNoaWxkIG9mIHRoaXMgcm9vdCBlbGVtZW50LlxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gWE1MLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgb2JqZWN0IGFuZCBmb3JtYXR0aW5nIHRoZSByZXN1bHRpbmdcbiAqICAgICAgICAgICAgICAgIFhNTC5cbiAqXG4gKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBwYXJzZShyb290LCBvYmplY3QsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3B0cyA9IG5ldyBvcHRpb25zXzEuT3B0aW9ucyhvcHRpb25zKTtcbiAgICB2YXIgZG9jdW1lbnQgPSBwYXJzZVRvRG9jdW1lbnQocm9vdCwgb2JqZWN0LCBvcHRzKTtcbiAgICByZXR1cm4gZG9jdW1lbnQudG9TdHJpbmcob3B0cy5mb3JtYXQpO1xufVxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanMyeG1scGFyc2VyL2xpYi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBYbWxBdHRyaWJ1dGVfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbEF0dHJpYnV0ZVwiKTtcbmV4cG9ydHMuWG1sQXR0cmlidXRlID0gWG1sQXR0cmlidXRlXzEuZGVmYXVsdDtcbnZhciBYbWxBdHRyaWJ1dGVUZXh0XzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxBdHRyaWJ1dGVUZXh0XCIpO1xuZXhwb3J0cy5YbWxBdHRyaWJ1dGVUZXh0ID0gWG1sQXR0cmlidXRlVGV4dF8xLmRlZmF1bHQ7XG52YXIgWG1sQ2RhdGFfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbENkYXRhXCIpO1xuZXhwb3J0cy5YbWxDZGF0YSA9IFhtbENkYXRhXzEuZGVmYXVsdDtcbnZhciBYbWxDaGFyRGF0YV8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sQ2hhckRhdGFcIik7XG5leHBvcnRzLlhtbENoYXJEYXRhID0gWG1sQ2hhckRhdGFfMS5kZWZhdWx0O1xudmFyIFhtbENoYXJSZWZfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbENoYXJSZWZcIik7XG5leHBvcnRzLlhtbENoYXJSZWYgPSBYbWxDaGFyUmVmXzEuZGVmYXVsdDtcbnZhciBYbWxDb21tZW50XzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxDb21tZW50XCIpO1xuZXhwb3J0cy5YbWxDb21tZW50ID0gWG1sQ29tbWVudF8xLmRlZmF1bHQ7XG52YXIgWG1sRGVjbF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRGVjbFwiKTtcbmV4cG9ydHMuWG1sRGVjbCA9IFhtbERlY2xfMS5kZWZhdWx0O1xudmFyIFhtbERvY3VtZW50XzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxEb2N1bWVudFwiKTtcbmV4cG9ydHMuWG1sRG9jdW1lbnQgPSBYbWxEb2N1bWVudF8xLmRlZmF1bHQ7XG52YXIgWG1sRHRkXzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxEdGRcIik7XG5leHBvcnRzLlhtbER0ZCA9IFhtbER0ZF8xLmRlZmF1bHQ7XG52YXIgWG1sRHRkQXR0bGlzdF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRHRkQXR0bGlzdFwiKTtcbmV4cG9ydHMuWG1sRHRkQXR0bGlzdCA9IFhtbER0ZEF0dGxpc3RfMS5kZWZhdWx0O1xudmFyIFhtbER0ZEVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbER0ZEVsZW1lbnRcIik7XG5leHBvcnRzLlhtbER0ZEVsZW1lbnQgPSBYbWxEdGRFbGVtZW50XzEuZGVmYXVsdDtcbnZhciBYbWxEdGRFbnRpdHlfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbER0ZEVudGl0eVwiKTtcbmV4cG9ydHMuWG1sRHRkRW50aXR5ID0gWG1sRHRkRW50aXR5XzEuZGVmYXVsdDtcbnZhciBYbWxEdGROb3RhdGlvbl8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRHRkTm90YXRpb25cIik7XG5leHBvcnRzLlhtbER0ZE5vdGF0aW9uID0gWG1sRHRkTm90YXRpb25fMS5kZWZhdWx0O1xudmFyIFhtbER0ZFBhcmFtRW50aXR5UmVmXzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxEdGRQYXJhbUVudGl0eVJlZlwiKTtcbmV4cG9ydHMuWG1sRHRkUGFyYW1FbnRpdHlSZWYgPSBYbWxEdGRQYXJhbUVudGl0eVJlZl8xLmRlZmF1bHQ7XG52YXIgWG1sRWxlbWVudF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRWxlbWVudFwiKTtcbmV4cG9ydHMuWG1sRWxlbWVudCA9IFhtbEVsZW1lbnRfMS5kZWZhdWx0O1xudmFyIFhtbEVudGl0eVJlZl8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRW50aXR5UmVmXCIpO1xuZXhwb3J0cy5YbWxFbnRpdHlSZWYgPSBYbWxFbnRpdHlSZWZfMS5kZWZhdWx0O1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbE5vZGVcIik7XG5leHBvcnRzLlhtbE5vZGUgPSBYbWxOb2RlXzEuZGVmYXVsdDtcbnZhciBYbWxQcm9jSW5zdF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sUHJvY0luc3RcIik7XG5leHBvcnRzLlhtbFByb2NJbnN0ID0gWG1sUHJvY0luc3RfMS5kZWZhdWx0O1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFhNTCBkb2N1bWVudC5cbiAqXG4gKiBAcGFyYW0gcm9vdCBUaGUgbmFtZSBvZiB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBkb2N1bWVudC5cbiAqXG4gKiBAcmV0dXJucyBUaGUgbmV3IFhNTCBkb2N1bWVudC5cbiAqL1xuZnVuY3Rpb24gZG9jdW1lbnQocm9vdCkge1xuICAgIHJldHVybiBuZXcgWG1sRG9jdW1lbnRfMS5kZWZhdWx0KHJvb3QpO1xufVxuZXhwb3J0cy5kb2N1bWVudCA9IGRvY3VtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9vcHRpb25zXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgWG1sQ29tbWVudF8xID0gcmVxdWlyZShcIi4vWG1sQ29tbWVudFwiKTtcbnZhciBYbWxEZWNsXzEgPSByZXF1aXJlKFwiLi9YbWxEZWNsXCIpO1xudmFyIFhtbER0ZF8xID0gcmVxdWlyZShcIi4vWG1sRHRkXCIpO1xudmFyIFhtbEVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuL1htbEVsZW1lbnRcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbnZhciBYbWxQcm9jSW5zdF8xID0gcmVxdWlyZShcIi4vWG1sUHJvY0luc3RcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIGRvY3VtZW50LlxuICpcbiAqIEEgc2FtcGxlIFhNTCBkb2N1bWVudCBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3M6XG4gKlxuICogYGBgeG1sXG4gKiA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz5cbiAqIDxET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFN0cmljdC8vRU5cIlxuICogICAgICAgICAgICAgICAgICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS1zdHJpY3QuZHRkXCI+XG4gKiA8aHRtbD5cbiAqICAgICA8aGVhZD5cbiAqICAgICAgICAgPHRpdGxlPk15IHBhZ2UgdGl0bGU8L3RpdGxlPlxuICogICAgIDwvaGVhZD5cbiAqICAgICA8Ym9keT5cbiAqICAgICAgICAgPGgxPldlbGNvbWUhPC9oMT5cbiAqICAgICAgICAgPHA+SSBob3BlIHlvdSBlbmpveSB2aXNpdGluZyBteSB3ZWJzaXRlLjwvcD5cbiAqICAgICAgICAgPGltZyBzcmM9XCJwaWN0dXJlLnBuZ1wiLz5cbiAqICAgICA8L2JvZHk+XG4gKiA8L2h0bWw+XG4gKiBgYGBcbiAqXG4gKiBFYWNoIGNvbXBvbmVudCBvZiB0aGUgZG9jdW1lbnQsIHN1Y2ggYXMgdGhlIFhNTCBkZWNsYXJhdGlvbiwgZG9jdW1lbnQgdHlwZVxuICogZGVmaW5pdGlvbiwgYW5kIHJvb3QgZWxlbWVudCwgYXJlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxEb2N1bWVudCBub2RlcyBtdXN0IGhhdmUgZXhhY3RseSBvbmUge0BsaW5rIFhtbEVsZW1lbnR9IGNoaWxkLCB3aGljaCBpc1xuICogdGhlIGRvY3VtZW50J3Mgcm9vdCBlbGVtZW50LlxuICpcbiAqIFhtbERvY3VtZW50IG5vZGVzIGNhbiBoYXZlIGV4YWN0bHkgb25lIHtAbGluayBYbWxEZWNsfSBhbmQge0BsaW5rIFhtbER0ZH1cbiAqIGNoaWxkIGluIHRoYXQgb3JkZXIsIHNvIGxvbmcgYXMgdGhleSBwcmVjZWRlIHRoZSB7QGxpbmsgWG1sRWxlbWVudH0gbm9kZS5cbiAqXG4gKiBYbWxEb2N1bWVudCBub2RlcyBjYW4gaGF2ZSBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIHtAbGluayBYbWxDb21tZW50fSBvclxuICoge0BsaW5rIFhtbFByb2NJbnN0fSBub2Rlcywgc28gbG9uZyBhcyB0aGV5IGZvbGxvdyB0aGUge0BsaW5rIFhtbERlY2x9IG5vZGUsXG4gKiBpZiBvbmUgZXhpc3RzLlxuICovXG52YXIgWG1sRG9jdW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEb2N1bWVudCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbERvY3VtZW50fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByb290IFRoZSBuYW1lIG9mIHRoZSByb290IGVsZW1lbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sRG9jdW1lbnQocm9vdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmluc2VydENoaWxkLmNhbGwoX3RoaXMsIG5ldyBYbWxFbGVtZW50XzEuZGVmYXVsdChyb290KSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBjb21tZW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZCxcbiAgICAgKiB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIGNvbW1lbnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGVsZW1lbnQuXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7IH1cbiAgICAgICAgdmFyIGNvbW1lbnQgPSBuZXcgWG1sQ29tbWVudF8xLmRlZmF1bHQoY29udGVudCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoY29tbWVudCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY29tbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgWE1MIGRlY2xhcmF0aW9uIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBYbWxEb2N1bWVudC5wcm90b3R5cGUuZGVjbCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBkZWNsYXJhdGlvbiA9IG5ldyBYbWxEZWNsXzEuZGVmYXVsdChvcHRpb25zKTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChkZWNsYXJhdGlvbiwgMCk7XG4gICAgICAgIHJldHVybiBkZWNsYXJhdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgWE1MIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbi4gVW5sZXNzIGEgZGlmZmVyZW50IGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBpbW1lZGlhdGVseSBhZnRlciB0aGUgWE1MIGRlY2xhcmF0aW9uXG4gICAgICogaWYgb25lIGV4aXN0cywgb3IgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbiBpZiBvbmUgZG9lc1xuICAgICAqIG5vdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBEVEQuXG4gICAgICogQHBhcmFtIHN5c0lkIFRoZSBzeXN0ZW0gaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAqIEBwYXJhbSBwdWJJZCBUaGUgcHVibGljIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgKiAgICAgICAgICAgICAgSWYgYSBwdWJsaWMgaWRlbnRpZmllciBpcyBwcm92aWRlZCwgYSBzeXN0ZW0gaWRlbnRpZmllclxuICAgICAqICAgICAgICAgICAgICBtdXN0IGJlIHByb3ZpZGVkIGFzIHdlbGwuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlXG4gICAgICogICAgICAgICAgICAgIFhNTCBkZWNsYXJhdGlvbiBpZiBvbmUgZXhpc3RzLCBvciBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuIGlmIG9uZSBkb2VzIG5vdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIFhNTCBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLmR0ZCA9IGZ1bmN0aW9uIChuYW1lLCBzeXNJZCwgcHViSWQsIGluZGV4KSB7XG4gICAgICAgIHZhciBkdGQgPSBuZXcgWG1sRHRkXzEuZGVmYXVsdChuYW1lLCBzeXNJZCwgcHViSWQpO1xuICAgICAgICBpZiAodXRpbHNfMS5pc1VuZGVmaW5lZChpbmRleCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlblswXSBpbnN0YW5jZW9mIFhtbERlY2xfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoZHRkLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBkdGQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuIGF0IHRoZSBzcGVjaWZpZWRcbiAgICAgKiBpbmRleC4gVGhlIG5vZGUgaXMgbm90IGluc2VydGVkIGlmIGl0IGlzIGFscmVhZHkgcHJlc2VudC4gSWYgdGhpcyBub2RlXG4gICAgICogYWxyZWFkeSBoYXMgYSBwYXJlbnQsIGl0IGlzIHJlbW92ZWQgZnJvbSB0aGF0IHBhcmVudC5cbiAgICAgKlxuICAgICAqIE9ubHkge0BsaW5rIFhtbENvbW1lbnR9LCB7QGxpbmsgWG1sRGVjbH0sIHtAbGluayBYbWxEdGR9LCBvclxuICAgICAqIHtAbGluayBYbWxQcm9jSW5zdH0gbm9kZXMgY2FuIGJlIGluc2VydGVkLiBGdXJ0aGVybW9yZSwge0BsaW5rIFhtbERlY2x9XG4gICAgICogYW5kIHtAbGluayBYbWxEdGR9IG5vZGVzIG11c3QgYmUgaW5zZXJ0ZWQgaW4gdGhhdCBvcmRlciBhbmQgbXVzdFxuICAgICAqIHByZWNlZGUgdGhlIHtAbGluayBYbWxFbGVtZW50fSBub2RlLiBJbiBhZGRpdGlvbiwge0BsaW5rIFhtbENvbW1lbnR9IG9yXG4gICAgICoge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBtdXN0IGZvbGxvdyB0aGUge0BsaW5rIFhtbERlY2x9IG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIG5vZGUuIE5vZGVzIGF0IG9yIGFmdGVyXG4gICAgICogICAgICAgICAgICAgIHRoZSBpbmRleCBhcmUgc2hpZnRlZCB0byB0aGUgcmlnaHQuIElmIG5vIGluZGV4IGlzXG4gICAgICogICAgICAgICAgICAgIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIGluc2VydGVkIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4sIG9yIHVuZGVmaW5lZCBpZiBub1xuICAgICAqICAgICAgICAgIG5vZGUgd2FzIGluc2VydGVkLlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgfVxuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sQ29tbWVudF8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxEZWNsXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbER0ZF8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxQcm9jSW5zdF8xLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibm9kZSBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2ZcIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sQ29tbWVudCwgWG1sRGVjbCwgWG1sRHRkLCBvclwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxQcm9jSW5zdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFhtbENvbW1lbnRfMS5kZWZhdWx0IHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxQcm9jSW5zdF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlblswXSBpbnN0YW5jZW9mIFhtbERlY2xfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENvbW1lbnQgb3IgWG1sUHJvY0luc3Qgbm9kZSBzaG91bGQgYmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiBpbnNlcnRlZCBhZnRlciB0aGUgWG1sRGVjbCBub2RlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgWG1sRGVjbF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlblswXSBpbnN0YW5jZW9mIFhtbERlY2xfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRG9jdW1lbnQgbm9kZSBzaG91bGQgb25seSBjb250YWluIG9uZVwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgWG1sRGVjbCBub2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRGVjbCBub2RlIHNob3VsZCBiZSBpbnNlcnRlZCBhdCB0aGVcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGJlZ2lubmluZyBvZiBhbiBYbWxEb2N1bWVudCBub2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBYbWxEdGRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBYbWxEZWNsXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGQgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQgYWZ0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB0aGUgWG1sRGVjbCBub2RlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgaSA8IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuW2ldIGluc3RhbmNlb2YgWG1sRWxlbWVudF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkIGJlZm9yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIHRoZSBYbWxFbGVtZW50IG5vZGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX2NoaWxkcmVuOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBYbWxEdGRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERvY3VtZW50IG5vZGUgc2hvdWxkIG9ubHkgY29udGFpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIG9uZSBYbWxEdGQgbm9kZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQuY2FsbCh0aGlzLCBub2RlLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXhcbiAgICAgKiBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIG9yIHVuZGVmaW5lZCBpZlxuICAgICAqICAgICAgICAgICAgICAgIHRoZXJlIGlzIG5vIHRhcmdldC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgKi9cbiAgICBYbWxEb2N1bWVudC5wcm90b3R5cGUucHJvY0luc3QgPSBmdW5jdGlvbiAodGFyZ2V0LCBjb250ZW50LCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgfVxuICAgICAgICB2YXIgcHJvY0luc3QgPSBuZXcgWG1sUHJvY0luc3RfMS5kZWZhdWx0KHRhcmdldCwgY29udGVudCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQocHJvY0luc3QsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHByb2NJbnN0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIG5vZGUgZnJvbSB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB7QGxpbmsgWG1sRWxlbWVudH0gbm9kZXMgY2Fubm90IGJlIHJlbW92ZWQgZnJvbSB0aGlzIG5vZGU7XG4gICAgICogYXR0ZW1wdHMgdG8gZG8gc28gd2lsbCByZXN1bHQgaW4gYW4gZXhjZXB0aW9uIGJlaW5nIHRocm93bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgYSBub2RlIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWG1sRWxlbWVudF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEVsZW1lbnQgbm9kZXMgY2Fubm90IGJlIHJlbW92ZWQgZnJvbVwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxEb2N1bWVudCBub2Rlc1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZC5jYWxsKHRoaXMsIG5vZGUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbm9kZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQge0BsaW5rIFhtbEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBiZSByZW1vdmVkIGZyb20gdGhpcyBub2RlO1xuICAgICAqIGF0dGVtcHRzIHRvIGRvIHNvIHdpbGwgcmVzdWx0IGluIGFuIGV4Y2VwdGlvbiBiZWluZyB0aHJvd24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHRvIGJlIHJlbW92ZWQgaXNcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIHRoYXQgd2FzIHJlbW92ZWQsIG9yIHVuZGVmaW5lZCBpZiBubyBub2RlIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuW2luZGV4XSBpbnN0YW5jZW9mIFhtbEVsZW1lbnRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxFbGVtZW50IG5vZGVzIGNhbm5vdCBiZSByZW1vdmVkIGZyb21cIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sRG9jdW1lbnQgbm9kZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4LmNhbGwodGhpcywgaW5kZXgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgcm9vdCBlbGVtZW50IG9mIHRoaXMgZG9jdW1lbnQuXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLnJvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9jaGlsZHJlbjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBYbWxFbGVtZW50XzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERvY3VtZW50IGRvZXMgbm90IGNvbnRhaW4gYSByb290IG5vZGVcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtJU3RyaW5nT3B0aW9uc30gW29wdGlvbnNdIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZ1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIG9wdGlvbnNPYmogPSBuZXcgb3B0aW9uc18xLlN0cmluZ09wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHZhciBzdHIgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fY2hpbGRyZW47IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IF9hW19pXTtcbiAgICAgICAgICAgIHN0ciArPSBub2RlLnRvU3RyaW5nKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmoucHJldHR5KSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IG9wdGlvbnNPYmoubmV3bGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuID0gc3RyLmxlbmd0aCAtIG9wdGlvbnNPYmoubmV3bGluZS5sZW5ndGg7XG4gICAgICAgIGlmIChzdHIuc3Vic3RyKGxlbikgPT09IG9wdGlvbnNPYmoubmV3bGluZSkge1xuICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cigwLCBsZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRG9jdW1lbnQ7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxEb2N1bWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRG9jdW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblwidXNlIHN0cmljdFwiO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIElPcHRpb25zIGludGVyZmFjZSB1c2VkIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXNcbiAqIHRvIGZpZWxkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgT3B0aW9ucyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHRoaXMuYWxpYXNTdHJpbmcgPSBcIj1cIjtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVTdHJpbmcgPSBcIkBcIjtcbiAgICAgICAgdGhpcy5jZGF0YUludmFsaWRDaGFycyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkYXRhS2V5cyA9IFtdO1xuICAgICAgICB0aGlzLnZhbHVlU3RyaW5nID0gXCIjXCI7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMgc2hvdWxkIGJlIGFuIE9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKG9wdGlvbnMuYWxpYXNTdHJpbmcpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQob3B0aW9ucy5hbGlhc1N0cmluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5hbGlhc1N0cmluZyBzaG91bGQgYmUgYSBzdHJpbmcgb3JcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWxpYXNTdHJpbmcgPSBvcHRpb25zLmFsaWFzU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhvcHRpb25zLmF0dHJpYnV0ZVN0cmluZykpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChvcHRpb25zLmF0dHJpYnV0ZVN0cmluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5hdHRyaWJ1dGVTdHJpbmcgc2hvdWxkIGJlIGEgc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZVN0cmluZyA9IG9wdGlvbnMuYXR0cmlidXRlU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc0Jvb2xlYW4ob3B0aW9ucy5jZGF0YUludmFsaWRDaGFycykpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChvcHRpb25zLmNkYXRhSW52YWxpZENoYXJzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmNkYXRhSW52YWxpZENoYXJzIHNob3VsZCBiZSBhXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBib29sZWFuIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2RhdGFJbnZhbGlkQ2hhcnMgPSBvcHRpb25zLmNkYXRhSW52YWxpZENoYXJzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZ0FycmF5KG9wdGlvbnMuY2RhdGFLZXlzKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKG9wdGlvbnMuY2RhdGFLZXlzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmNkYXRhS2V5cyBzaG91bGQgYmUgYW4gQXJyYXkgb3JcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2RhdGFLZXlzID0gb3B0aW9ucy5jZGF0YUtleXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWNsYXJhdGlvbiA9IG5ldyBEZWNsYXJhdGlvbk9wdGlvbnMob3B0aW9ucy5kZWNsYXJhdGlvbik7XG4gICAgICAgIHRoaXMuZHRkID0gbmV3IER0ZE9wdGlvbnMob3B0aW9ucy5kdGQpO1xuICAgICAgICB0aGlzLmZvcm1hdCA9IG5ldyBGb3JtYXRPcHRpb25zKG9wdGlvbnMuZm9ybWF0KTtcbiAgICAgICAgdGhpcy50eXBlSGFuZGxlcnMgPSBuZXcgVHlwZUhhbmRsZXJzKG9wdGlvbnMudHlwZUhhbmRsZXJzKTtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKG9wdGlvbnMudmFsdWVTdHJpbmcpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQob3B0aW9ucy52YWx1ZVN0cmluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy52YWx1ZVN0cmluZyBzaG91bGQgYmUgYSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVTdHJpbmcgPSBvcHRpb25zLnZhbHVlU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JhcEhhbmRsZXJzID0gbmV3IFdyYXBIYW5kbGVycyhvcHRpb25zLndyYXBIYW5kbGVycyk7XG4gICAgfVxuICAgIHJldHVybiBPcHRpb25zO1xufSgpKTtcbmV4cG9ydHMuT3B0aW9ucyA9IE9wdGlvbnM7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJRGVjbGFyYXRpb25PcHRpb25zIGludGVyZmFjZSB1c2VkIHRvIHByb3ZpZGUgZGVmYXVsdFxuICogdmFsdWVzIHRvIGZpZWxkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgRGVjbGFyYXRpb25PcHRpb25zID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWNsYXJhdGlvbk9wdGlvbnMoZGVjbGFyYXRpb25PcHRpb25zKSB7XG4gICAgICAgIGlmIChkZWNsYXJhdGlvbk9wdGlvbnMgPT09IHZvaWQgMCkgeyBkZWNsYXJhdGlvbk9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmluY2x1ZGUgPSB0cnVlO1xuICAgICAgICBpZiAoIXV0aWxzXzEuaXNPYmplY3QoZGVjbGFyYXRpb25PcHRpb25zKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuZGVjbGFyYXRpb24gc2hvdWxkIGJlIGFuIE9iamVjdCBvclwiXG4gICAgICAgICAgICAgICAgKyBcIiB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihkZWNsYXJhdGlvbk9wdGlvbnMuaW5jbHVkZSkpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChkZWNsYXJhdGlvbk9wdGlvbnMuaW5jbHVkZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5kZWNsYXJhdGlvbi5pbmNsdWRlIHNob3VsZCBiZSBhXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBib29sZWFuIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jbHVkZSA9IGRlY2xhcmF0aW9uT3B0aW9ucy5pbmNsdWRlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXRpb24gcGVyZm9ybWVkIGJ5IHhtbGNyZWF0ZVxuICAgICAgICB0aGlzLmVuY29kaW5nID0gZGVjbGFyYXRpb25PcHRpb25zLmVuY29kaW5nO1xuICAgICAgICB0aGlzLnN0YW5kYWxvbmUgPSBkZWNsYXJhdGlvbk9wdGlvbnMuc3RhbmRhbG9uZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gZGVjbGFyYXRpb25PcHRpb25zLnZlcnNpb247XG4gICAgfVxuICAgIHJldHVybiBEZWNsYXJhdGlvbk9wdGlvbnM7XG59KCkpO1xuZXhwb3J0cy5EZWNsYXJhdGlvbk9wdGlvbnMgPSBEZWNsYXJhdGlvbk9wdGlvbnM7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJRHRkT3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIER0ZE9wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIER0ZE9wdGlvbnMoZHRkT3B0aW9ucykge1xuICAgICAgICBpZiAoZHRkT3B0aW9ucyA9PT0gdm9pZCAwKSB7IGR0ZE9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmluY2x1ZGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KGR0ZE9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5kdGQgc2hvdWxkIGJlIGFuIE9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihkdGRPcHRpb25zLmluY2x1ZGUpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZHRkT3B0aW9ucy5pbmNsdWRlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmR0ZC5pbmNsdWRlIHNob3VsZCBiZSBhIGJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5jbHVkZSA9IGR0ZE9wdGlvbnMuaW5jbHVkZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGF0aW9uIHBlcmZvcm1lZCBieSB4bWxjcmVhdGVcbiAgICAgICAgdGhpcy5uYW1lID0gZHRkT3B0aW9ucy5uYW1lO1xuICAgICAgICB0aGlzLnN5c0lkID0gZHRkT3B0aW9ucy5zeXNJZDtcbiAgICAgICAgdGhpcy5wdWJJZCA9IGR0ZE9wdGlvbnMucHViSWQ7XG4gICAgfVxuICAgIHJldHVybiBEdGRPcHRpb25zO1xufSgpKTtcbmV4cG9ydHMuRHRkT3B0aW9ucyA9IER0ZE9wdGlvbnM7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJRm9ybWF0T3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIEZvcm1hdE9wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZvcm1hdE9wdGlvbnMoZm9ybWF0T3B0aW9ucykge1xuICAgICAgICBpZiAoZm9ybWF0T3B0aW9ucyA9PT0gdm9pZCAwKSB7IGZvcm1hdE9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNPYmplY3QoZm9ybWF0T3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmZvcm1hdCBzaG91bGQgYmUgYW4gT2JqZWN0IG9yXCJcbiAgICAgICAgICAgICAgICArIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGF0aW9uIHBlcmZvcm1lZCBieSB4bWxjcmVhdGVcbiAgICAgICAgdGhpcy5kb3VibGVRdW90ZXMgPSBmb3JtYXRPcHRpb25zLmRvdWJsZVF1b3RlcztcbiAgICAgICAgdGhpcy5pbmRlbnQgPSBmb3JtYXRPcHRpb25zLmluZGVudDtcbiAgICAgICAgdGhpcy5uZXdsaW5lID0gZm9ybWF0T3B0aW9ucy5uZXdsaW5lO1xuICAgICAgICB0aGlzLnByZXR0eSA9IGZvcm1hdE9wdGlvbnMucHJldHR5O1xuICAgIH1cbiAgICByZXR1cm4gRm9ybWF0T3B0aW9ucztcbn0oKSk7XG5leHBvcnRzLkZvcm1hdE9wdGlvbnMgPSBGb3JtYXRPcHRpb25zO1xuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSVR5cGVIYW5kbGVycyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIFR5cGVIYW5kbGVycyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHlwZUhhbmRsZXJzKHR5cGVIYW5kbGVycykge1xuICAgICAgICBpZiAodHlwZUhhbmRsZXJzID09PSB2b2lkIDApIHsgdHlwZUhhbmRsZXJzID0ge307IH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KHR5cGVIYW5kbGVycykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLnR5cGVIYW5kbGVycyBzaG91bGQgYmUgYW4gT2JqZWN0IG9yXCJcbiAgICAgICAgICAgICAgICArIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdHlwZUhhbmRsZXJzKSB7XG4gICAgICAgICAgICBpZiAodHlwZUhhbmRsZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNGdW5jdGlvbih0eXBlSGFuZGxlcnNba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMudHlwZUhhbmRsZXJzWydcIiArIGtleSArIFwiJ11cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBzaG91bGQgYmUgYSBGdW5jdGlvblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHR5cGVIYW5kbGVyc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gVHlwZUhhbmRsZXJzO1xufSgpKTtcbmV4cG9ydHMuVHlwZUhhbmRsZXJzID0gVHlwZUhhbmRsZXJzO1xuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSVdyYXBIYW5kbGVycyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIFdyYXBIYW5kbGVycyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV3JhcEhhbmRsZXJzKHdyYXBIYW5kbGVycykge1xuICAgICAgICBpZiAod3JhcEhhbmRsZXJzID09PSB2b2lkIDApIHsgd3JhcEhhbmRsZXJzID0ge307IH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KHdyYXBIYW5kbGVycykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLndyYXBIYW5kbGVycyBzaG91bGQgYmUgYW4gT2JqZWN0IG9yXCJcbiAgICAgICAgICAgICAgICArIFwiIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gd3JhcEhhbmRsZXJzKSB7XG4gICAgICAgICAgICBpZiAod3JhcEhhbmRsZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNGdW5jdGlvbih3cmFwSGFuZGxlcnNba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMud3JhcEhhbmRsZXJzWydcIiArIGtleSArIFwiJ11cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBzaG91bGQgYmUgYSBGdW5jdGlvblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHdyYXBIYW5kbGVyc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gV3JhcEhhbmRsZXJzO1xufSgpKTtcbmV4cG9ydHMuV3JhcEhhbmRsZXJzID0gV3JhcEhhbmRsZXJzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanMyeG1scGFyc2VyL2xpYi9vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBzcGxpdFdvcmQgPSAob3JpZ2luYWw6IHN0cmluZykgPT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgd2hpbGUoaW5kZXggPCBvcmlnaW5hbC5sZW5ndGgpe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gb3JpZ2luYWwuc3Vic3RyaW5nKGluZGV4LCBpbmRleCsxKTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IEVzY2FwZVNlcXVlbmNlTWFwID0ge1xuICAgIFwiOlwiOiBcIiUzQVwiLFxuICAgIFwiL1wiOiBcIiUyRlwiLFxuICAgIFwiIFwiOiBcIiUyMFwiLFxuICAgIFwiJFwiOiBcIiUyNFwiLFxuICAgIFwiXFxcXFwiOiBcIiU1Q1wiLFxufTtcblxuY29uc3QgcmV2ZXJzZU1hcCA9IChtYXApID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgcmVzdWx0W21hcFtrZXldXSA9IGtleTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IEVuY29kZSA9IChvcmlnaW5hbDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHJlc3VsdEFycmF5ID0gc3BsaXRXb3JkKG9yaWdpbmFsKTtcbiAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5Lm1hcCgoY2hhcmFjdGVyKSA9PiB7XG4gICAgICAgIGlmKEVzY2FwZVNlcXVlbmNlTWFwW2NoYXJhY3Rlcl0pe1xuICAgICAgICAgICAgcmV0dXJuIEVzY2FwZVNlcXVlbmNlTWFwW2NoYXJhY3Rlcl07XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRBcnJheS5qb2luKFwiXCIpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgY29uc3QgRGVjb2RlID0gKG9yaWdpbmFsOiBzdHJpbmcpID0+IHtcbiAgICBsZXQgaW5kZXggPSAtMjtcbiAgICBjb25zdCBSZXZlcnNlU2VxdWVuY2VNYXAgPSByZXZlcnNlTWFwKEVzY2FwZVNlcXVlbmNlTWFwKTtcbiAgICBsZXQgc2VudGVuY2UgPSBvcmlnaW5hbDtcbiAgICB3aGlsZShpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgaW5kZXggPSBzZW50ZW5jZS5pbmRleE9mKFwiJVwiKTtcbiAgICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gc2VudGVuY2Uuc3Vic3RyaW5nKGluZGV4LCBpbmRleCs1KTtcbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IHNlbnRlbmNlLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IHNlbnRlbmNlLnN1YnN0cmluZyhpbmRleCs1KTtcbiAgICAgICAgICAgIHNlbnRlbmNlID0gYmVmb3JlICsgUmV2ZXJzZVNlcXVlbmNlTWFwW3RhcmdldF0gKyBhZnRlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VudGVuY2U7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5IHtcbiAgICBmb3JtYXQ/OiBzdHJpbmcsXG4gICAgZXhwYW5kPzogc3RyaW5nLFxuICAgIHNlbGVjdD86IHN0cmluZyxcbiAgICBvcmRlcmJ5Pzogc3RyaW5nLFxuICAgIHRvcD86IHN0cmluZyxcbiAgICBza2lwPzogc3RyaW5nLFxuICAgIGZpbHRlcj86IHN0cmluZ1tdLFxuICAgIGlubGluZWNvdW50Pzogc3RyaW5nLFxuICAgIHE/OiBzdHJpbmcsXG59XG5cbmNvbnN0IEFORCA9IFwiIGFuZCBcIjtcblxuZXhwb3J0IGNvbnN0IGNvbnZlcnRRdWVyaWVkVXJsID0gKHVybDogc3RyaW5nLCBxdWVyeTogUXVlcnkpOiBzdHJpbmcgPT4ge1xuICAgIGxldCByZXN1bHQgPSB1cmwgKyBcIj9cIjtcbiAgICBpZihxdWVyeS5maWx0ZXIgJiYgcXVlcnkuZmlsdGVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZmlsdGVycyA9IHF1ZXJ5LmZpbHRlcjtcbiAgICAgICAgcmVzdWx0ICs9IEVuY29kZShcIiRmaWx0ZXI9XCIpO1xuICAgICAgICBmaWx0ZXJzLmZvckVhY2goKGZpbHRlcik9PntcbiAgICAgICAgICAgIHJlc3VsdCArPSBFbmNvZGUoZmlsdGVyKTtcbiAgICAgICAgICAgIHJlc3VsdCArPSBBTkQ7XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyaW5nKDAsIHJlc3VsdC5pbmRleE9mKEFORCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbGl0eS50cyIsIi8qIVxuICogQG92ZXJ2aWV3IGVzNi1wcm9taXNlIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zdGVmYW5wZW5uZXIvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgNC4xLjFcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuRVM2UHJvbWlzZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb2JqZWN0T3JGdW5jdGlvbih4KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHg7XG4gIHJldHVybiB4ICE9PSBudWxsICYmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKTtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxudmFyIF9pc0FycmF5ID0gdW5kZWZpbmVkO1xuaWYgKEFycmF5LmlzQXJyYXkpIHtcbiAgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xufSBlbHNlIHtcbiAgX2lzQXJyYXkgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG59XG5cbnZhciBpc0FycmF5ID0gX2lzQXJyYXk7XG5cbnZhciBsZW4gPSAwO1xudmFyIHZlcnR4TmV4dCA9IHVuZGVmaW5lZDtcbnZhciBjdXN0b21TY2hlZHVsZXJGbiA9IHVuZGVmaW5lZDtcblxudmFyIGFzYXAgPSBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgcXVldWVbbGVuXSA9IGNhbGxiYWNrO1xuICBxdWV1ZVtsZW4gKyAxXSA9IGFyZztcbiAgbGVuICs9IDI7XG4gIGlmIChsZW4gPT09IDIpIHtcbiAgICAvLyBJZiBsZW4gaXMgMiwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcbiAgICAvLyB3aWxsIGJlIHByb2Nlc3NlZCBieSB0aGlzIGZsdXNoIHRoYXQgd2UgYXJlIHNjaGVkdWxpbmcuXG4gICAgaWYgKGN1c3RvbVNjaGVkdWxlckZuKSB7XG4gICAgICBjdXN0b21TY2hlZHVsZXJGbihmbHVzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHNldFNjaGVkdWxlcihzY2hlZHVsZUZuKSB7XG4gIGN1c3RvbVNjaGVkdWxlckZuID0gc2NoZWR1bGVGbjtcbn1cblxuZnVuY3Rpb24gc2V0QXNhcChhc2FwRm4pIHtcbiAgYXNhcCA9IGFzYXBGbjtcbn1cblxudmFyIGJyb3dzZXJXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbnZhciBicm93c2VyR2xvYmFsID0gYnJvd3NlcldpbmRvdyB8fCB7fTtcbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgaXNOb2RlID0gdHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAoe30pLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbnZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIG5vZGVcbmZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICB9O1xufVxuXG4vLyB2ZXJ0eFxuZnVuY3Rpb24gdXNlVmVydHhUaW1lcigpIHtcbiAgaWYgKHR5cGVvZiB2ZXJ0eE5leHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZlcnR4TmV4dChmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gIHZhciBpdGVyYXRpb25zID0gMDtcbiAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIG9ic2VydmVyLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgbm9kZS5kYXRhID0gaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDI7XG4gIH07XG59XG5cbi8vIHdlYiB3b3JrZXJcbmZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VTZXRUaW1lb3V0KCkge1xuICAvLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBlczYtcHJvbWlzZSB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbiAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG4gIHZhciBnbG9iYWxTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2xvYmFsU2V0VGltZW91dChmbHVzaCwgMSk7XG4gIH07XG59XG5cbnZhciBxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gcXVldWVbaV07XG4gICAgdmFyIGFyZyA9IHF1ZXVlW2kgKyAxXTtcblxuICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICBxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICBxdWV1ZVtpICsgMV0gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBhdHRlbXB0VmVydHgoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHIgPSByZXF1aXJlO1xuICAgIHZhciB2ZXJ0eCA9IHIoJ3ZlcnR4Jyk7XG4gICAgdmVydHhOZXh0ID0gdmVydHgucnVuT25Mb29wIHx8IHZlcnR4LnJ1bk9uQ29udGV4dDtcbiAgICByZXR1cm4gdXNlVmVydHhUaW1lcigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbiAgfVxufVxuXG52YXIgc2NoZWR1bGVGbHVzaCA9IHVuZGVmaW5lZDtcbi8vIERlY2lkZSB3aGF0IGFzeW5jIG1ldGhvZCB0byB1c2UgdG8gdHJpZ2dlcmluZyBwcm9jZXNzaW5nIG9mIHF1ZXVlZCBjYWxsYmFja3M6XG5pZiAoaXNOb2RlKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VOZXh0VGljaygpO1xufSBlbHNlIGlmIChCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTXV0YXRpb25PYnNlcnZlcigpO1xufSBlbHNlIGlmIChpc1dvcmtlcikge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTWVzc2FnZUNoYW5uZWwoKTtcbn0gZWxzZSBpZiAoYnJvd3NlcldpbmRvdyA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSBhdHRlbXB0VmVydHgoKTtcbn0gZWxzZSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VTZXRUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pIHtcbiAgdmFyIF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cbiAgdmFyIHBhcmVudCA9IHRoaXM7XG5cbiAgdmFyIGNoaWxkID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgaWYgKGNoaWxkW1BST01JU0VfSURdID09PSB1bmRlZmluZWQpIHtcbiAgICBtYWtlUHJvbWlzZShjaGlsZCk7XG4gIH1cblxuICB2YXIgX3N0YXRlID0gcGFyZW50Ll9zdGF0ZTtcblxuICBpZiAoX3N0YXRlKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjYWxsYmFjayA9IF9hcmd1bWVudHNbX3N0YXRlIC0gMV07XG4gICAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZUNhbGxiYWNrKF9zdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCBwYXJlbnQuX3Jlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9IGVsc2Uge1xuICAgIHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbik7XG4gIH1cblxuICByZXR1cm4gY2hpbGQ7XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yZXNvbHZlYCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIHJlc29sdmVkIHdpdGggdGhlXG4gIHBhc3NlZCBgdmFsdWVgLiBJdCBpcyBzaG9ydGhhbmQgZm9yIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgcmVzb2x2ZSgxKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyB2YWx1ZSA9PT0gMVxuICB9KTtcbiAgYGBgXG5cbiAgSW5zdGVhZCBvZiB3cml0aW5nIHRoZSBhYm92ZSwgeW91ciBjb2RlIG5vdyBzaW1wbHkgYmVjb21lcyB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoMSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyB2YWx1ZSA9PT0gMVxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCByZXNvbHZlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBbnl9IHZhbHVlIHZhbHVlIHRoYXQgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCB3aXRoXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHRoYXQgd2lsbCBiZWNvbWUgZnVsZmlsbGVkIHdpdGggdGhlIGdpdmVuXG4gIGB2YWx1ZWBcbiovXG5mdW5jdGlvbiByZXNvbHZlJDEob2JqZWN0KSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgaWYgKG9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QuY29uc3RydWN0b3IgPT09IENvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuICByZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgUFJPTUlTRV9JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygxNik7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgUEVORElORyA9IHZvaWQgMDtcbnZhciBGVUxGSUxMRUQgPSAxO1xudmFyIFJFSkVDVEVEID0gMjtcblxudmFyIEdFVF9USEVOX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xufVxuXG5mdW5jdGlvbiBjYW5ub3RSZXR1cm5Pd24oKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG59XG5cbmZ1bmN0aW9uIGdldFRoZW4ocHJvbWlzZSkge1xuICB0cnkge1xuICAgIHJldHVybiBwcm9taXNlLnRoZW47XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBlcnJvcjtcbiAgICByZXR1cm4gR0VUX1RIRU5fRVJST1I7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5VGhlbih0aGVuJCQxLCB2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gIHRyeSB7XG4gICAgdGhlbiQkMS5jYWxsKHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlLCB0aGVuJCQxKSB7XG4gIGFzYXAoZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICB2YXIgc2VhbGVkID0gZmFsc2U7XG4gICAgdmFyIGVycm9yID0gdHJ5VGhlbih0aGVuJCQxLCB0aGVuYWJsZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICBpZiAodGhlbmFibGUgIT09IHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9LCAnU2V0dGxlOiAnICsgKHByb21pc2UuX2xhYmVsIHx8ICcgdW5rbm93biBwcm9taXNlJykpO1xuXG4gICAgaWYgKCFzZWFsZWQgJiYgZXJyb3IpIHtcbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICByZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH1cbiAgfSwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgIHJlamVjdChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUodGhlbmFibGUsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkMSkge1xuICBpZiAobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3RvciA9PT0gcHJvbWlzZS5jb25zdHJ1Y3RvciAmJiB0aGVuJCQxID09PSB0aGVuICYmIG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gcmVzb2x2ZSQxKSB7XG4gICAgaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoZW4kJDEgPT09IEdFVF9USEVOX0VSUk9SKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgR0VUX1RIRU5fRVJST1IuZXJyb3IpO1xuICAgICAgR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhlbiQkMSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGVuJCQxKSkge1xuICAgICAgaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgIHJlamVjdChwcm9taXNlLCBzZWxmRnVsZmlsbG1lbnQoKSk7XG4gIH0gZWxzZSBpZiAob2JqZWN0T3JGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIHZhbHVlLCBnZXRUaGVuKHZhbHVlKSk7XG4gIH0gZWxzZSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVibGlzaFJlamVjdGlvbihwcm9taXNlKSB7XG4gIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICB9XG5cbiAgcHVibGlzaChwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwcm9taXNlLl9yZXN1bHQgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fc3RhdGUgPSBGVUxGSUxMRUQ7XG5cbiAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgIGFzYXAocHVibGlzaCwgcHJvbWlzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVqZWN0KHByb21pc2UsIHJlYXNvbikge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcHJvbWlzZS5fc3RhdGUgPSBSRUpFQ1RFRDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gcmVhc29uO1xuXG4gIGFzYXAocHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICB2YXIgX3N1YnNjcmliZXJzID0gcGFyZW50Ll9zdWJzY3JpYmVycztcbiAgdmFyIGxlbmd0aCA9IF9zdWJzY3JpYmVycy5sZW5ndGg7XG5cbiAgcGFyZW50Ll9vbmVycm9yID0gbnVsbDtcblxuICBfc3Vic2NyaWJlcnNbbGVuZ3RoXSA9IGNoaWxkO1xuICBfc3Vic2NyaWJlcnNbbGVuZ3RoICsgRlVMRklMTEVEXSA9IG9uRnVsZmlsbG1lbnQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBSRUpFQ1RFRF0gPSBvblJlamVjdGlvbjtcblxuICBpZiAobGVuZ3RoID09PSAwICYmIHBhcmVudC5fc3RhdGUpIHtcbiAgICBhc2FwKHB1Ymxpc2gsIHBhcmVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVibGlzaChwcm9taXNlKSB7XG4gIHZhciBzdWJzY3JpYmVycyA9IHByb21pc2UuX3N1YnNjcmliZXJzO1xuICB2YXIgc2V0dGxlZCA9IHByb21pc2UuX3N0YXRlO1xuXG4gIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY2hpbGQgPSB1bmRlZmluZWQsXG4gICAgICBjYWxsYmFjayA9IHVuZGVmaW5lZCxcbiAgICAgIGRldGFpbCA9IHByb21pc2UuX3Jlc3VsdDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgY2hpbGQgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICBjYWxsYmFjayA9IHN1YnNjcmliZXJzW2kgKyBzZXR0bGVkXTtcblxuICAgIGlmIChjaGlsZCkge1xuICAgICAgaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgY2hpbGQsIGNhbGxiYWNrLCBkZXRhaWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhkZXRhaWwpO1xuICAgIH1cbiAgfVxuXG4gIHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIEVycm9yT2JqZWN0KCkge1xuICB0aGlzLmVycm9yID0gbnVsbDtcbn1cblxudmFyIFRSWV9DQVRDSF9FUlJPUiA9IG5ldyBFcnJvck9iamVjdCgpO1xuXG5mdW5jdGlvbiB0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKGRldGFpbCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBUUllfQ0FUQ0hfRVJST1IuZXJyb3IgPSBlO1xuICAgIHJldHVybiBUUllfQ0FUQ0hfRVJST1I7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgcHJvbWlzZSwgY2FsbGJhY2ssIGRldGFpbCkge1xuICB2YXIgaGFzQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkLFxuICAgICAgZXJyb3IgPSB1bmRlZmluZWQsXG4gICAgICBzdWNjZWVkZWQgPSB1bmRlZmluZWQsXG4gICAgICBmYWlsZWQgPSB1bmRlZmluZWQ7XG5cbiAgaWYgKGhhc0NhbGxiYWNrKSB7XG4gICAgdmFsdWUgPSB0cnlDYXRjaChjYWxsYmFjaywgZGV0YWlsKTtcblxuICAgIGlmICh2YWx1ZSA9PT0gVFJZX0NBVENIX0VSUk9SKSB7XG4gICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgZXJyb3IgPSB2YWx1ZS5lcnJvcjtcbiAgICAgIHZhbHVlLmVycm9yID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCBjYW5ub3RSZXR1cm5Pd24oKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gZGV0YWlsO1xuICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gIH1cblxuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAvLyBub29wXG4gIH0gZWxzZSBpZiAoaGFzQ2FsbGJhY2sgJiYgc3VjY2VlZGVkKSB7XG4gICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGZhaWxlZCkge1xuICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IEZVTEZJTExFRCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBSRUpFQ1RFRCkge1xuICAgICAgcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9taXNlKHByb21pc2UsIHJlc29sdmVyKSB7XG4gIHRyeSB7XG4gICAgcmVzb2x2ZXIoZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsdWUpIHtcbiAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIHJlamVjdFByb21pc2UocmVhc29uKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlamVjdChwcm9taXNlLCBlKTtcbiAgfVxufVxuXG52YXIgaWQgPSAwO1xuZnVuY3Rpb24gbmV4dElkKCkge1xuICByZXR1cm4gaWQrKztcbn1cblxuZnVuY3Rpb24gbWFrZVByb21pc2UocHJvbWlzZSkge1xuICBwcm9taXNlW1BST01JU0VfSURdID0gaWQrKztcbiAgcHJvbWlzZS5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gIHByb21pc2UuX3Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMgPSBbXTtcbn1cblxuZnVuY3Rpb24gRW51bWVyYXRvciQxKENvbnN0cnVjdG9yLCBpbnB1dCkge1xuICB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDb25zdHJ1Y3Rvcihub29wKTtcblxuICBpZiAoIXRoaXMucHJvbWlzZVtQUk9NSVNFX0lEXSkge1xuICAgIG1ha2VQcm9taXNlKHRoaXMucHJvbWlzZSk7XG4gIH1cblxuICBpZiAoaXNBcnJheShpbnB1dCkpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgdGhpcy5fZW51bWVyYXRlKGlucHV0KTtcbiAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlamVjdCh0aGlzLnByb21pc2UsIHZhbGlkYXRpb25FcnJvcigpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0aW9uRXJyb3IoKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoJ0FycmF5IE1ldGhvZHMgbXVzdCBiZSBwcm92aWRlZCBhbiBBcnJheScpO1xufVxuXG5FbnVtZXJhdG9yJDEucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgZm9yICh2YXIgaSA9IDA7IHRoaXMuX3N0YXRlID09PSBQRU5ESU5HICYmIGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMuX2VhY2hFbnRyeShpbnB1dFtpXSwgaSk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IkMS5wcm90b3R5cGUuX2VhY2hFbnRyeSA9IGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICB2YXIgYyA9IHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3I7XG4gIHZhciByZXNvbHZlJCQxID0gYy5yZXNvbHZlO1xuXG4gIGlmIChyZXNvbHZlJCQxID09PSByZXNvbHZlJDEpIHtcbiAgICB2YXIgX3RoZW4gPSBnZXRUaGVuKGVudHJ5KTtcblxuICAgIGlmIChfdGhlbiA9PT0gdGhlbiAmJiBlbnRyeS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9yZW1haW5pbmctLTtcbiAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IGVudHJ5O1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gUHJvbWlzZSQyKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBjKG5vb3ApO1xuICAgICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgX3RoZW4pO1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHByb21pc2UsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aWxsU2V0dGxlQXQobmV3IGMoZnVuY3Rpb24gKHJlc29sdmUkJDEpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUkJDEoZW50cnkpO1xuICAgICAgfSksIGkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl93aWxsU2V0dGxlQXQocmVzb2x2ZSQkMShlbnRyeSksIGkpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yJDEucHJvdG90eXBlLl9zZXR0bGVkQXQgPSBmdW5jdGlvbiAoc3RhdGUsIGksIHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xuXG4gIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gUEVORElORykge1xuICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuXG4gICAgaWYgKHN0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgICAgcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgfVxufTtcblxuRW51bWVyYXRvciQxLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24gKHByb21pc2UsIGkpIHtcbiAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gIHN1YnNjcmliZShwcm9taXNlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoRlVMRklMTEVELCBpLCB2YWx1ZSk7XG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KFJFSkVDVEVELCBpLCByZWFzb24pO1xuICB9KTtcbn07XG5cbi8qKlxuICBgUHJvbWlzZS5hbGxgIGFjY2VwdHMgYW4gYXJyYXkgb2YgcHJvbWlzZXMsIGFuZCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2hcbiAgaXMgZnVsZmlsbGVkIHdpdGggYW4gYXJyYXkgb2YgZnVsZmlsbG1lbnQgdmFsdWVzIGZvciB0aGUgcGFzc2VkIHByb21pc2VzLCBvclxuICByZWplY3RlZCB3aXRoIHRoZSByZWFzb24gb2YgdGhlIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIGJlIHJlamVjdGVkLiBJdCBjYXN0cyBhbGxcbiAgZWxlbWVudHMgb2YgdGhlIHBhc3NlZCBpdGVyYWJsZSB0byBwcm9taXNlcyBhcyBpdCBydW5zIHRoaXMgYWxnb3JpdGhtLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZXNvbHZlKDIpO1xuICBsZXQgcHJvbWlzZTMgPSByZXNvbHZlKDMpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gVGhlIGFycmF5IGhlcmUgd291bGQgYmUgWyAxLCAyLCAzIF07XG4gIH0pO1xuICBgYGBcblxuICBJZiBhbnkgb2YgdGhlIGBwcm9taXNlc2AgZ2l2ZW4gdG8gYGFsbGAgYXJlIHJlamVjdGVkLCB0aGUgZmlyc3QgcHJvbWlzZVxuICB0aGF0IGlzIHJlamVjdGVkIHdpbGwgYmUgZ2l2ZW4gYXMgYW4gYXJndW1lbnQgdG8gdGhlIHJldHVybmVkIHByb21pc2VzJ3NcbiAgcmVqZWN0aW9uIGhhbmRsZXIuIEZvciBleGFtcGxlOlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZWplY3QobmV3IEVycm9yKFwiMlwiKSk7XG4gIGxldCBwcm9taXNlMyA9IHJlamVjdChuZXcgRXJyb3IoXCIzXCIpKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zIGJlY2F1c2UgdGhlcmUgYXJlIHJlamVjdGVkIHByb21pc2VzIVxuICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIGVycm9yLm1lc3NhZ2UgPT09IFwiMlwiXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIGFsbFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgYXJyYXkgb2YgcHJvbWlzZXNcbiAgQHBhcmFtIHtTdHJpbmd9IGxhYmVsIG9wdGlvbmFsIHN0cmluZyBmb3IgbGFiZWxpbmcgdGhlIHByb21pc2UuXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIGFsbCBgcHJvbWlzZXNgIGhhdmUgYmVlblxuICBmdWxmaWxsZWQsIG9yIHJlamVjdGVkIGlmIGFueSBvZiB0aGVtIGJlY29tZSByZWplY3RlZC5cbiAgQHN0YXRpY1xuKi9cbmZ1bmN0aW9uIGFsbCQxKGVudHJpZXMpIHtcbiAgcmV0dXJuIG5ldyBFbnVtZXJhdG9yJDEodGhpcywgZW50cmllcykucHJvbWlzZTtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJhY2VgIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaCBpcyBzZXR0bGVkIGluIHRoZSBzYW1lIHdheSBhcyB0aGVcbiAgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gc2V0dGxlLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlc29sdmUoJ3Byb21pc2UgMScpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuXG4gIGxldCBwcm9taXNlMiA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAyJyk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gcmVzdWx0ID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIGl0IHdhcyByZXNvbHZlZCBiZWZvcmUgcHJvbWlzZTFcbiAgICAvLyB3YXMgcmVzb2x2ZWQuXG4gIH0pO1xuICBgYGBcblxuICBgUHJvbWlzZS5yYWNlYCBpcyBkZXRlcm1pbmlzdGljIGluIHRoYXQgb25seSB0aGUgc3RhdGUgb2YgdGhlIGZpcnN0XG4gIHNldHRsZWQgcHJvbWlzZSBtYXR0ZXJzLiBGb3IgZXhhbXBsZSwgZXZlbiBpZiBvdGhlciBwcm9taXNlcyBnaXZlbiB0byB0aGVcbiAgYHByb21pc2VzYCBhcnJheSBhcmd1bWVudCBhcmUgcmVzb2x2ZWQsIGJ1dCB0aGUgZmlyc3Qgc2V0dGxlZCBwcm9taXNlIGhhc1xuICBiZWNvbWUgcmVqZWN0ZWQgYmVmb3JlIHRoZSBvdGhlciBwcm9taXNlcyBiZWNhbWUgZnVsZmlsbGVkLCB0aGUgcmV0dXJuZWRcbiAgcHJvbWlzZSB3aWxsIGJlY29tZSByZWplY3RlZDpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZWplY3QobmV3IEVycm9yKCdwcm9taXNlIDInKSk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUHJvbWlzZS5yYWNlKFtwcm9taXNlMSwgcHJvbWlzZTJdKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnNcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ3Byb21pc2UgMicgYmVjYXVzZSBwcm9taXNlIDIgYmVjYW1lIHJlamVjdGVkIGJlZm9yZVxuICAgIC8vIHByb21pc2UgMSBiZWNhbWUgZnVsZmlsbGVkXG4gIH0pO1xuICBgYGBcblxuICBBbiBleGFtcGxlIHJlYWwtd29ybGQgdXNlIGNhc2UgaXMgaW1wbGVtZW50aW5nIHRpbWVvdXRzOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgUHJvbWlzZS5yYWNlKFthamF4KCdmb28uanNvbicpLCB0aW1lb3V0KDUwMDApXSlcbiAgYGBgXG5cbiAgQG1ldGhvZCByYWNlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gcHJvbWlzZXMgYXJyYXkgb2YgcHJvbWlzZXMgdG8gb2JzZXJ2ZVxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB3aGljaCBzZXR0bGVzIGluIHRoZSBzYW1lIHdheSBhcyB0aGUgZmlyc3QgcGFzc2VkXG4gIHByb21pc2UgdG8gc2V0dGxlLlxuKi9cbmZ1bmN0aW9uIHJhY2UkMShlbnRyaWVzKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgaWYgKCFpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAoXywgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gcmFjZS4nKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yZWplY3RgIHJldHVybnMgYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIHBhc3NlZCBgcmVhc29uYC5cbiAgSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlamVjdChuZXcgRXJyb3IoJ1dIT09QUycpKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVqZWN0XG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBbnl9IHJlYXNvbiB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aC5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gYHJlYXNvbmAuXG4qL1xuZnVuY3Rpb24gcmVqZWN0JDEocmVhc29uKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIG5lZWRzUmVzb2x2ZXIoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbn1cblxuZnVuY3Rpb24gbmVlZHNOZXcoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XG59XG5cbi8qKlxuICBQcm9taXNlIG9iamVjdHMgcmVwcmVzZW50IHRoZSBldmVudHVhbCByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhlXG4gIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICBUZXJtaW5vbG9neVxuICAtLS0tLS0tLS0tLVxuXG4gIC0gYHByb21pc2VgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB3aXRoIGEgYHRoZW5gIG1ldGhvZCB3aG9zZSBiZWhhdmlvciBjb25mb3JtcyB0byB0aGlzIHNwZWNpZmljYXRpb24uXG4gIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAtIGBleGNlcHRpb25gIGlzIGEgdmFsdWUgdGhhdCBpcyB0aHJvd24gdXNpbmcgdGhlIHRocm93IHN0YXRlbWVudC5cbiAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICBBIHByb21pc2UgY2FuIGJlIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXM6IHBlbmRpbmcsIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQuXG5cbiAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cblxuICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICBzZXR0bGVkIHN0YXRlLiAgU28gYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpbGxcbiAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gIEJhc2ljIFVzYWdlOlxuICAtLS0tLS0tLS0tLS1cblxuICBgYGBqc1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgIC8vIG9uIGZhaWx1cmVcbiAgICByZWplY3QocmVhc29uKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBBZHZhbmNlZCBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICBgWE1MSHR0cFJlcXVlc3Rgcy5cblxuICBgYGBqc1xuICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVyO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEpTT046IGAnICsgdXJsICsgJ2AgZmFpbGVkIHdpdGggc3RhdHVzOiBbJyArIHRoaXMuc3RhdHVzICsgJ10nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIFVubGlrZSBjYWxsYmFja3MsIHByb21pc2VzIGFyZSBncmVhdCBjb21wb3NhYmxlIHByaW1pdGl2ZXMuXG5cbiAgYGBganNcbiAgUHJvbWlzZS5hbGwoW1xuICAgIGdldEpTT04oJy9wb3N0cycpLFxuICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICB2YWx1ZXNbMF0gLy8gPT4gcG9zdHNKU09OXG4gICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSk7XG4gIGBgYFxuXG4gIEBjbGFzcyBQcm9taXNlXG4gIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQGNvbnN0cnVjdG9yXG4qL1xuZnVuY3Rpb24gUHJvbWlzZSQyKHJlc29sdmVyKSB7XG4gIHRoaXNbUFJPTUlTRV9JRF0gPSBuZXh0SWQoKTtcbiAgdGhpcy5fcmVzdWx0ID0gdGhpcy5fc3RhdGUgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX3N1YnNjcmliZXJzID0gW107XG5cbiAgaWYgKG5vb3AgIT09IHJlc29sdmVyKSB7XG4gICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIG5lZWRzUmVzb2x2ZXIoKTtcbiAgICB0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSQyID8gaW5pdGlhbGl6ZVByb21pc2UodGhpcywgcmVzb2x2ZXIpIDogbmVlZHNOZXcoKTtcbiAgfVxufVxuXG5Qcm9taXNlJDIuYWxsID0gYWxsJDE7XG5Qcm9taXNlJDIucmFjZSA9IHJhY2UkMTtcblByb21pc2UkMi5yZXNvbHZlID0gcmVzb2x2ZSQxO1xuUHJvbWlzZSQyLnJlamVjdCA9IHJlamVjdCQxO1xuUHJvbWlzZSQyLl9zZXRTY2hlZHVsZXIgPSBzZXRTY2hlZHVsZXI7XG5Qcm9taXNlJDIuX3NldEFzYXAgPSBzZXRBc2FwO1xuUHJvbWlzZSQyLl9hc2FwID0gYXNhcDtcblxuUHJvbWlzZSQyLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFByb21pc2UkMixcblxuICAvKipcbiAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBDaGFpbmluZ1xuICAgIC0tLS0tLS0tXG4gIFxuICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgdXNlck5hbWVgIHdpbGwgYmUgdGhlIHVzZXIncyBuYW1lLCBvdGhlcndpc2UgaXRcbiAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgIH0pO1xuICBcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgICAvLyBJZiBgZmluZFVzZXJgIHJlamVjdGVkLCBgcmVhc29uYCB3aWxsIGJlICdgZmluZFVzZXJgIHJlamVjdGVkIGFuZCB3ZSdyZSB1bmhhcHB5Jy5cbiAgICB9KTtcbiAgICBgYGBcbiAgICBJZiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIGRvZXMgbm90IHNwZWNpZnkgYSByZWplY3Rpb24gaGFuZGxlciwgcmVqZWN0aW9uIHJlYXNvbnMgd2lsbCBiZSBwcm9wYWdhdGVkIGZ1cnRoZXIgZG93bnN0cmVhbS5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBQZWRhZ29naWNhbEV4Y2VwdGlvbignVXBzdHJlYW0gZXJyb3InKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gVGhlIGBQZWRnYWdvY2lhbEV4Y2VwdGlvbmAgaXMgcHJvcGFnYXRlZCBhbGwgdGhlIHdheSBkb3duIHRvIGhlcmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQXNzaW1pbGF0aW9uXG4gICAgLS0tLS0tLS0tLS0tXG4gIFxuICAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gICAgcmV0cmlldmVkIGFzeW5jaHJvbm91c2x5LiBUaGlzIGNhbiBiZSBhY2hpZXZlZCBieSByZXR1cm5pbmcgYSBwcm9taXNlIGluIHRoZVxuICAgIGZ1bGZpbGxtZW50IG9yIHJlamVjdGlvbiBoYW5kbGVyLiBUaGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgdGhlbiBiZSBwZW5kaW5nXG4gICAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIFRoZSB1c2VyJ3MgY29tbWVudHMgYXJlIG5vdyBhdmFpbGFibGVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgSWYgdGhlIGFzc2ltbGlhdGVkIHByb21pc2UgcmVqZWN0cywgdGhlbiB0aGUgZG93bnN0cmVhbSBwcm9taXNlIHdpbGwgYWxzbyByZWplY3QuXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgZnVsZmlsbHMsIHdlJ2xsIGhhdmUgdGhlIHZhbHVlIGhlcmVcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFNpbXBsZSBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IHJlc3VsdDtcbiAgXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgRXJyYmFjayBFeGFtcGxlXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFJlc3VsdChmdW5jdGlvbihyZXN1bHQsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH1cbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgUHJvbWlzZSBFeGFtcGxlO1xuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBBZHZhbmNlZCBFeGFtcGxlXG4gICAgLS0tLS0tLS0tLS0tLS1cbiAgXG4gICAgU3luY2hyb25vdXMgRXhhbXBsZVxuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgbGV0IGF1dGhvciwgYm9va3M7XG4gIFxuICAgIHRyeSB7XG4gICAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgICBib29rcyAgPSBmaW5kQm9va3NCeUF1dGhvcihhdXRob3IpO1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBFcnJiYWNrIEV4YW1wbGVcbiAgXG4gICAgYGBganNcbiAgXG4gICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuICBcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGZhaWx1cmUocmVhc29uKSB7XG4gIFxuICAgIH1cbiAgXG4gICAgZmluZEF1dGhvcihmdW5jdGlvbihhdXRob3IsIGVycil7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmaW5kQm9vb2tzQnlBdXRob3IoYXV0aG9yLCBmdW5jdGlvbihib29rcywgZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgZmFpbHVyZShyZWFzb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBQcm9taXNlIEV4YW1wbGU7XG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBmaW5kQXV0aG9yKCkuXG4gICAgICB0aGVuKGZpbmRCb29rc0J5QXV0aG9yKS5cbiAgICAgIHRoZW4oZnVuY3Rpb24oYm9va3Mpe1xuICAgICAgICAvLyBmb3VuZCBib29rc1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIHRoZW5cbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0ZWRcbiAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cbiAgdGhlbjogdGhlbixcblxuICAvKipcbiAgICBgY2F0Y2hgIGlzIHNpbXBseSBzdWdhciBmb3IgYHRoZW4odW5kZWZpbmVkLCBvblJlamVjdGlvbilgIHdoaWNoIG1ha2VzIGl0IHRoZSBzYW1lXG4gICAgYXMgdGhlIGNhdGNoIGJsb2NrIG9mIGEgdHJ5L2NhdGNoIHN0YXRlbWVudC5cbiAgXG4gICAgYGBganNcbiAgICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkbid0IGZpbmQgdGhhdCBhdXRob3InKTtcbiAgICB9XG4gIFxuICAgIC8vIHN5bmNocm9ub3VzXG4gICAgdHJ5IHtcbiAgICAgIGZpbmRBdXRob3IoKTtcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9XG4gIFxuICAgIC8vIGFzeW5jIHdpdGggcHJvbWlzZXNcbiAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgY2F0Y2hcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICAnY2F0Y2gnOiBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgfVxufTtcblxuLypnbG9iYWwgc2VsZiovXG5mdW5jdGlvbiBwb2x5ZmlsbCQxKCkge1xuICAgIHZhciBsb2NhbCA9IHVuZGVmaW5lZDtcblxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBsb2NhbCA9IGdsb2JhbDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBsb2NhbCA9IHNlbGY7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxvY2FsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb2x5ZmlsbCBmYWlsZWQgYmVjYXVzZSBnbG9iYWwgb2JqZWN0IGlzIHVuYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBQID0gbG9jYWwuUHJvbWlzZTtcblxuICAgIGlmIChQKSB7XG4gICAgICAgIHZhciBwcm9taXNlVG9TdHJpbmcgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvbWlzZVRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFAucmVzb2x2ZSgpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gc2lsZW50bHkgaWdub3JlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb21pc2VUb1N0cmluZyA9PT0gJ1tvYmplY3QgUHJvbWlzZV0nICYmICFQLmNhc3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvY2FsLlByb21pc2UgPSBQcm9taXNlJDI7XG59XG5cbi8vIFN0cmFuZ2UgY29tcGF0Li5cblByb21pc2UkMi5wb2x5ZmlsbCA9IHBvbHlmaWxsJDE7XG5Qcm9taXNlJDIuUHJvbWlzZSA9IFByb21pc2UkMjtcblxucmV0dXJuIFByb21pc2UkMjtcblxufSkpKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXM2LXByb21pc2UubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9lczYtcHJvbWlzZS9kaXN0L2VzNi1wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIHZlcnR4IChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==