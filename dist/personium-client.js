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
                    var timeout = Number(_this.expiresIn) * 999; //直前に教えてあげる
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
                    var timeout = Number(_this.expiresIn) * 999; //直前に教えてあげる
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
        result = result.substring(0, result.lastIndexOf(AND));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWZlNTc2N2VjZjAxYzU2YmFkYmQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sTm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9vcHRpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbENvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sUHJvY0luc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbEF0dHJpYnV0ZVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhclJlZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbnRpdHlSZWYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxBdHRyaWJ1dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhckRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRGVjbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRHRkQXR0bGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZEVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGROb3RhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRQYXJhbUVudGl0eVJlZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qczJ4bWxwYXJzZXIvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3JlcXVlc3QtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVzcG9uc2UtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3Nob3VsZC1yZXRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanMyeG1scGFyc2VyL2xpYi9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pzMnhtbHBhcnNlci9saWIvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0eS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXM2LXByb21pc2UvZGlzdC9lczYtcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vL3ZlcnR4IChpZ25vcmVkKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVGQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxjQUFjO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwrQkFBK0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDN01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6R0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsb0JBQW9CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMseUJBQXlCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENB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LFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUIsR0FBRyxvQkFBb0IsR0FBRyxvQkFBb0I7QUFDNUUsUUFBUSxtQkFBbUIsR0FBRyxxQkFBcUIsT0FBTztBQUMxRCw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtB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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsc0JBQXNCLFdBQVcsWUFBWTs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsTUFBTTtBQUNqQixXQUFXLFNBQVM7QUFDcEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsTUFBTTtBQUNqQixXQUFXLFNBQVM7QUFDcEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsZUFBZTtBQUMxQixXQUFXLFNBQVM7QUFDcEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QUFDakIsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsZ0JBQWdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVEQUF1RCxnQkFBZ0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMzUUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QWdCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7O0FDbFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGNBQWM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx5QkFBeUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxJQUFJO0FBQ2Q7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDZDQUE2QztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFVBQVUsTUFBTTtBQUNoQixVQUFVLE9BQU87QUFDakI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EscUJBQXFCLFlBQVk7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxVQUFVLElBQUk7QUFDZDtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCLFlBQVksU0FBUztBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxZQUFZLFNBQVM7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7O0FBRUQ7Ozs7Ozs7O0FDcG9DQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7O0FDdkx0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7OztBQ3BCQSxlIiwiZmlsZSI6InBlcnNvbml1bS1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWZlNTc2N2VjZjAxYzU2YmFkYmQiLCIvKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgU3RyaW5nXVwiO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBOdW1iZXJdXCI7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbGVhbih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBCb29sZWFuXVwiO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IFVuZGVmaW5lZF1cIjtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICBpc0Zpbml0ZSh2YWx1ZSkgJiZcbiAgICAgICAgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufVxuZXhwb3J0cy5pc0ludGVnZXIgPSBpc0ludGVnZXI7XG4vKipcbiAqIFJldHJpZXZlIHRoZSBVbmljb2RlIGNvZGUgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBpbiB0aGUgc3BlY2lmaWVkXG4gKiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIGZyb20gd2hpY2ggdG8gcmV0cmlldmUgdGhlIFVuaWNvZGUgY29kZSBwb2ludC5cbiAqIEBwYXJhbSBpbmRleCBUaGUgc3BlY2lmaWVkIGluZGV4LlxuICpcbiAqIEByZXR1cm5zIFRoZSBVbmljb2RlIGNvZGUgcG9pbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRDb2RlUG9pbnQoc3RyLCBpbmRleCkge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gc3RyLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGluZGV4IGZvciBzcGVjaWZpZWQgc3RyaW5nXCIpO1xuICAgIH1cbiAgICB2YXIgZmlyc3QgPSBzdHIuY2hhckNvZGVBdChpbmRleCk7XG4gICAgaWYgKGZpcnN0ID49IDB4RDgwMCAmJiBmaXJzdCA8PSAweERCRkYgJiYgc3RyLmxlbmd0aCA+IGluZGV4ICsgMSkge1xuICAgICAgICB2YXIgc2Vjb25kID0gc3RyLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgICAgICAgaWYgKHNlY29uZCA+PSAweERDMDAgJiYgc2Vjb25kIDw9IDB4REZGRikge1xuICAgICAgICAgICAgcmV0dXJuIChmaXJzdCAtIDB4RDgwMCkgKiAweDQwMCArIHNlY29uZCAtIDB4REMwMCArIDB4MTAwMDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0O1xufVxuZXhwb3J0cy5nZXRDb2RlUG9pbnQgPSBnZXRDb2RlUG9pbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIG5vZGUuXG4gKlxuICogVGhpcyBjbGFzcyBpcyB0aGUgcm9vdCBjbGFzcyBvZiB0aGUgWE1MIG5vZGUgaGllcmFyY2h5LiBJdCBzaG91bGQgbm90IGJlXG4gKiBkaXJlY3RseSBpbnN0YW50aWF0ZWQ7IG9uZSBvZiBpdHMgc3ViY2xhc3NlcyBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqL1xudmFyIFhtbE5vZGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sTm9kZX0gY2xhc3MuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sTm9kZSgpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sTm9kZS5wcm90b3R5cGUsIFwicGFyZW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHBhcmVudCBvZiB0aGlzIG5vZGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBwYXJlbnQgb2YgdGhpcyBub2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGlzIG5vZGUgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLiBDb25zdWx0IHRoZVxuICAgICAqIGFwcHJvcHJpYXRlIHN1YmNsYXNzIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uc2xpY2UoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBub2RlIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4gYXQgdGhlIHNwZWNpZmllZFxuICAgICAqIGluZGV4LiBUaGUgbm9kZSBpcyBub3QgaW5zZXJ0ZWQgaWYgaXQgaXMgYWxyZWFkeSBwcmVzZW50LiBJZiB0aGlzIG5vZGVcbiAgICAgKiBhbHJlYWR5IGhhcyBhIHBhcmVudCwgaXQgaXMgcmVtb3ZlZCBmcm9tIHRoYXQgcGFyZW50LlxuICAgICAqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGlzIG5vZGUgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLCBvciBpZiB0aGVcbiAgICAgKiBzcGVjaWZpZWQgbm9kZSBjYW5ub3QgYmUgYWRkZWQgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gQ29uc3VsdCB0aGVcbiAgICAgKiBhcHByb3ByaWF0ZSBzdWJjbGFzcyBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIG5vZGUuIE5vZGVzIGF0IG9yIGFmdGVyXG4gICAgICogICAgICAgICAgICAgIHRoZSBpbmRleCBhcmUgc2hpZnRlZCB0byB0aGUgcmlnaHQuIElmIG5vIGluZGV4IGlzXG4gICAgICogICAgICAgICAgICAgIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBub2RlIGluc2VydGVkIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4sIG9yIHVuZGVmaW5lZCBpZiBub1xuICAgICAqICAgICAgICAgIG5vZGUgd2FzIGluc2VydGVkLlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7IGluZGV4ID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoOyB9XG4gICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBYbWxOb2RlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5vZGUgc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mIFhtbE5vZGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNOdW1iZXIoaW5kZXgpIHx8ICF1dGlsc18xLmlzSW50ZWdlcihpbmRleCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmRleCBzaG91bGQgYmUgYW4gaW50ZWdlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiaW5kZXggc2hvdWxkIHJlc3BlY3QgY2hpbGRyZW4gYXJyYXkgYm91bmRzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbi5pbmRleE9mKG5vZGUpID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKG5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50LnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5fcGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgbm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbm9kZSB0aGF0IGZvbGxvd3MgdGhpcyBvbmUsIG9yIHVuZGVmaW5lZCBpZiBubyBzdWNoIG5vZGVcbiAgICAgKiBleGlzdHMgb3IgaWYgdGhpcyBub2RlIGhhcyBubyBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSB0aGF0IGZvbGxvd3MgdGhpcyBvbmUsIG9yIHVuZGVmaW5lZCBpZiBubyBzdWNoIG5vZGVcbiAgICAgKiAgICAgICAgICBleGlzdHMgb3IgaWYgdGhpcyBub2RlIGhhcyBubyBwYXJlbnQuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNVbmRlZmluZWQodGhpcy5wYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFyZW50Ll9jaGlsZHJlbi5pbmRleE9mKHRoaXMpXG4gICAgICAgICAgICA9PT0gdGhpcy5wYXJlbnQuX2NoaWxkcmVuLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Ll9jaGlsZHJlblt0aGlzLnBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKSArIDFdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbm9kZSB0aGF0IGlzIHByZXZpb3VzIHRvIHRoaXMgb25lLCBvciB1bmRlZmluZWQgaWYgbm8gc3VjaCBub2RlXG4gICAgICogZXhpc3RzIG9yIGlmIHRoaXMgbm9kZSBoYXMgbm8gcGFyZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5vZGUgdGhhdCBpcyBwcmV2aW91cyB0byB0aGlzIG9uZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHN1Y2hcbiAgICAgKiAgICAgICAgICBub2RlIGV4aXN0cyBvciBpZiB0aGlzIG5vZGUgaGFzIG5vIHBhcmVudC5cbiAgICAgKi9cbiAgICBYbWxOb2RlLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YodGhpcykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Ll9jaGlsZHJlblt0aGlzLnBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKSAtIDFdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGlzIG5vZGUgZnJvbSBpdHMgcGFyZW50IGlmIHRoaXMgbm9kZSBoYXMgYSBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG5vZGUncyBwYXJlbnQsIG9yIHVuZGVmaW5lZCBpZiBpdCBoYXMgbm8gcGFyZW50LlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKHRoaXMucGFyZW50KSkge1xuICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnRfMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIG5vZGUgZnJvbSB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gaWYgdGhpcyBub2RlIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbiwgb3IgaWYgdGhlXG4gICAgICogc3BlY2lmaWVkIG5vZGUgY2Fubm90IGJlIHJlbW92ZWQuIENvbnN1bHQgdGhlIGFwcHJvcHJpYXRlIHN1YmNsYXNzXG4gICAgICogZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gcmVtb3ZlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgV2hldGhlciBhIG5vZGUgd2FzIHJlbW92ZWQuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sTm9kZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vZGUgc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mIFhtbE5vZGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihub2RlKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbm9kZS5fcGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG5vZGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGlzIG5vZGUgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLCBvciBpZiB0aGVcbiAgICAgKiBub2RlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggY2Fubm90IGJlIHJlbW92ZWQuIENvbnN1bHQgdGhlIGFwcHJvcHJpYXRlXG4gICAgICogc3ViY2xhc3MgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSB0byBiZSByZW1vdmVkIGlzIGxvY2F0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSB0aGF0IHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoIXV0aWxzXzEuaXNOdW1iZXIoaW5kZXgpIHx8ICF1dGlsc18xLmlzSW50ZWdlcihpbmRleCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmRleCBzaG91bGQgYmUgYSBudW1iZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuX2NoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJpbmRleCBzaG91bGQgcmVzcGVjdCBjaGlsZHJlbiBhcnJheSBib3VuZHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9jaGlsZHJlbltpbmRleF07XG4gICAgICAgIG5vZGUuX3BhcmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0b1N0cmluZyBub3QgaW1wbGVtZW50ZWQgZm9yIFhtbE5vZGVcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByb290IG5vZGUgb2YgdGhlIGN1cnJlbnQgaGllcmFyY2h5LiBJZiB0aGlzIG5vZGUgaGFzIG5vXG4gICAgICogcGFyZW50LCB0aGlzIG5vZGUgaXRzZWxmIGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIHJvb3Qgbm9kZSBvZiB0aGUgY3VycmVudCBoaWVyYXJjaHkuXG4gICAgICovXG4gICAgWG1sTm9kZS5wcm90b3R5cGUudG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LnRvcCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXJlbnQgb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbE5vZGUucHJvdG90eXBlLnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sTm9kZTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxOb2RlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxOb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBWZXJpZmllcyB0aGF0IHRoZSBzcGVjaWZpZWQgc3RyaW5nIG9ubHkgY29udGFpbnMgY2hhcmFjdGVycyBwZXJtaXR0ZWQgYnkgdGhlXG4gKiBYTUwgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gdmFsaWRhdGUuXG4gKlxuICogQHJldHVybnMgV2hldGhlciB0aGUgc3BlY2lmaWVkIHN0cmluZyBvbmx5IGNvbnRhaW5zIGNoYXJhY3RlcnMgcGVybWl0dGVkIGJ5XG4gKiAgICAgICAgICB0aGUgWE1MIHNwZWNpZmljYXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDaGFyKHN0cikge1xuICAgIHZhciBjaGFyUmVnZXggPSBcIlxcXFx1MDAwOXxcXFxcdTAwMEF8XFxcXHUwMDBEfFtcXFxcdTAwMjAtXFxcXHVEN0ZGXXxcIlxuICAgICAgICArIFwiW1xcXFx1RTAwMC1cXFxcdUZGRkRdXCI7XG4gICAgdmFyIHN1cnJvZ2F0ZUNoYXJSZWdleCA9IFwiW1xcXFx1RDgwMC1cXFxcdURCRkZdW1xcXFx1REMwMC1cXFxcdURGRkZdXCI7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKChcIiArIGNoYXJSZWdleCArIFwiKXwoXCIgKyBzdXJyb2dhdGVDaGFyUmVnZXggKyBcIikpKiRcIilcbiAgICAgICAgLnRlc3Qoc3RyKTtcbn1cbmV4cG9ydHMudmFsaWRhdGVDaGFyID0gdmFsaWRhdGVDaGFyO1xuLyoqXG4gKiBWZXJpZmllcyB0aGF0IHRoZSBzcGVjaWZpZWQgc3RyaW5nIG9ubHkgY29udGFpbnMgYSBzaW5nbGUgY2hhcmFjdGVyLCBhbmRcbiAqIHRoYXQgdGhpcyBjaGFyYWN0ZXIgaXMgcGVybWl0dGVkIGJ5IHRoZSBYTUwgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gdmFsaWRhdGUuXG4gKlxuICogQHJldHVybnMgV2hldGhlciB0aGUgc3BlY2lmaWVkIHN0cmluZyBvbmx5IGNvbnRhaW5zIGEgc2luZ2xlIGNoYXJhY3RlciwgYW5kXG4gKiAgICAgICAgICB0aGF0IHRoaXMgY2hhcmFjdGVyIGlzIHBlcm1pdHRlZCBieSB0aGUgWE1MIHNwZWNpZmljYXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVTaW5nbGVDaGFyKHN0cikge1xuICAgIGlmIChzdHIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXlxcXFx1MDAwOXxcXFxcdTAwMEF8XFxcXHUwMDBEfFtcXFxcdTAwMjAtXFxcXHVEN0ZGXXxcIlxuICAgICAgICAgICAgKyBcIltcXFxcdUUwMDAtXFxcXHVGRkZEXSRcIikudGVzdChzdHIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdHIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXltcXFxcdUQ4MDAtXFxcXHVEQkZGXVtcXFxcdURDMDAtXFxcXHVERkZGXSRcIikudGVzdChzdHIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVTaW5nbGVDaGFyID0gdmFsaWRhdGVTaW5nbGVDaGFyO1xuLyoqXG4gKiBWZXJpZmllcyB0aGF0IHRoZSBzcGVjaWZpZWQgc3RyaW5nIG9ubHkgY29udGFpbnMgY2hhcmFjdGVycyBwZXJtaXR0ZWQgYnkgdGhlXG4gKiBYTUwgc3BlY2lmaWNhdGlvbiBmb3IgbmFtZXMuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHZhbGlkYXRlLlxuICpcbiAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHNwZWNpZmllZCBzdHJpbmcgb25seSBjb250YWlucyBjaGFyYWN0ZXJzIHBlcm1pdHRlZCBieVxuICogICAgICAgICAgdGhlIFhNTCBzcGVjaWZpY2F0aW9uIGZvciBuYW1lcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZU5hbWUoc3RyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbmFtZVN0YXJ0Q2hhciA9IFwiOnxbQS1aXXxffFthLXpdfFtcXFxcdTAwQzAtXFxcXHUwMEQ2XXxbXFxcXHUwMEQ4LVxcXFx1MDBGNl1cIlxuICAgICAgICArIFwifFtcXFxcdTAwRjgtXFxcXHUwMkZGXXxbXFxcXHUwMzcwLVxcXFx1MDM3RF1cIlxuICAgICAgICArIFwifFtcXFxcdTAzN0YtXFxcXHUxRkZGXXxbXFxcXHUyMDBDLVxcXFx1MjAwRF1cIlxuICAgICAgICArIFwifFtcXFxcdTIwNzAtXFxcXHUyMThGXXxbXFxcXHUyQzAwLVxcXFx1MkZFRl1cIlxuICAgICAgICArIFwifFtcXFxcdTMwMDEtXFxcXHVEN0ZGXXxbXFxcXHVGOTAwLVxcXFx1RkRDRl1cIlxuICAgICAgICArIFwifFtcXFxcdUZERjAtXFxcXHVGRkZEXVwiO1xuICAgIHZhciBuYW1lU3RhcnRDaGFyV2l0aFN1cnJvZ2F0ZVBhaXIgPSBcIltcXFxcdUQ4MDAtXFxcXHVEQjdGXVtcXFxcdURDMDAtXFxcXHVERkZGXVwiO1xuICAgIHZhciBuYW1lQ2hhciA9IG5hbWVTdGFydENoYXIgKyBcInwtfFxcXFwufFswLTldfFxcXFx1MDBCN3xbXFxcXHUwMzAwLVxcXFx1MDM2Rl1cIiArXG4gICAgICAgIFwifFtcXFxcdTIwM0YtXFxcXHUyMDQwXVwiO1xuICAgIHZhciBuYW1lQ2hhcldpdGhTdXJyb2dhdGVQYWlyID0gbmFtZUNoYXIgKyBcInxcIiArXG4gICAgICAgIG5hbWVTdGFydENoYXJXaXRoU3Vycm9nYXRlUGFpcjtcbiAgICBpZiAobmV3IFJlZ0V4cChcIl5cIiArIG5hbWVTdGFydENoYXIgKyBcIiRcIikudGVzdChzdHIuY2hhckF0KDApKSkge1xuICAgICAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKFwiICsgbmFtZUNoYXJXaXRoU3Vycm9nYXRlUGFpciArIFwiKSskXCIpXG4gICAgICAgICAgICAudGVzdChzdHIuc3Vic3RyKDEpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RyLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGlmIChuZXcgUmVnRXhwKFwiXlwiICsgbmFtZVN0YXJ0Q2hhcldpdGhTdXJyb2dhdGVQYWlyICsgXCIkXCIpXG4gICAgICAgICAgICAudGVzdChzdHIuc3Vic3RyKDAsIDIpKSkge1xuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXihcIiArIG5hbWVDaGFyV2l0aFN1cnJvZ2F0ZVBhaXIgKyBcIikrJFwiKVxuICAgICAgICAgICAgICAgIC50ZXN0KHN0ci5zdWJzdHIoMikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMudmFsaWRhdGVOYW1lID0gdmFsaWRhdGVOYW1lO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi92YWxpZGF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJU3RyaW5nT3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIFN0cmluZ09wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0cmluZ09wdGlvbnMoc3RyaW5nT3B0aW9ucykge1xuICAgICAgICBpZiAoc3RyaW5nT3B0aW9ucyA9PT0gdm9pZCAwKSB7IHN0cmluZ09wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmRvdWJsZVF1b3RlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluZGVudCA9IFwiICAgIFwiO1xuICAgICAgICB0aGlzLm5ld2xpbmUgPSBcIlxcblwiO1xuICAgICAgICB0aGlzLnByZXR0eSA9IHRydWU7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdChzdHJpbmdPcHRpb25zKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMgc2hvdWxkIGJlIGFuIE9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihzdHJpbmdPcHRpb25zLmRvdWJsZVF1b3RlcykpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChzdHJpbmdPcHRpb25zLmRvdWJsZVF1b3RlcykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5kb3VibGVRdW90ZXMgc2hvdWxkIGJlIGEgYm9vbGVhblwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb3VibGVRdW90ZXMgPSBzdHJpbmdPcHRpb25zLmRvdWJsZVF1b3RlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoc3RyaW5nT3B0aW9ucy5pbmRlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoc3RyaW5nT3B0aW9ucy5pbmRlbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuaW5kZW50IHNob3VsZCBiZSBhIHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnQgPSBzdHJpbmdPcHRpb25zLmluZGVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoc3RyaW5nT3B0aW9ucy5uZXdsaW5lKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKHN0cmluZ09wdGlvbnMubmV3bGluZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5uZXdsaW5lIHNob3VsZCBiZSBhIHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXdsaW5lID0gc3RyaW5nT3B0aW9ucy5uZXdsaW5lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc0Jvb2xlYW4oc3RyaW5nT3B0aW9ucy5wcmV0dHkpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoc3RyaW5nT3B0aW9ucy5wcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMucHJldHR5IHNob3VsZCBiZSBhIGJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJldHR5ID0gc3RyaW5nT3B0aW9ucy5wcmV0dHk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZ09wdGlvbnM7XG59KCkpO1xuZXhwb3J0cy5TdHJpbmdPcHRpb25zID0gU3RyaW5nT3B0aW9ucztcbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIElEZWNsYXJhdGlvbk9wdGlvbnMgaW50ZXJmYWNlIHVzZWQgdG8gcHJvdmlkZSBkZWZhdWx0XG4gKiB2YWx1ZXMgdG8gZmllbGRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBEZWNsYXJhdGlvbk9wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlY2xhcmF0aW9uT3B0aW9ucyhkZWNsYXJhdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGRlY2xhcmF0aW9uT3B0aW9ucyA9PT0gdm9pZCAwKSB7IGRlY2xhcmF0aW9uT3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IFwiMS4wXCI7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdChkZWNsYXJhdGlvbk9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucyBzaG91bGQgYmUgYW4gT2JqZWN0IG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoZGVjbGFyYXRpb25PcHRpb25zLmVuY29kaW5nKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKGRlY2xhcmF0aW9uT3B0aW9ucy5lbmNvZGluZykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5lbmNvZGluZyBzaG91bGQgYmUgYSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5jb2RpbmcgPSBkZWNsYXJhdGlvbk9wdGlvbnMuZW5jb2Rpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGRlY2xhcmF0aW9uT3B0aW9ucy5zdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKGRlY2xhcmF0aW9uT3B0aW9ucy5zdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLnN0YW5kYWxvbmUgc2hvdWxkIGJlIGEgc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YW5kYWxvbmUgPSBkZWNsYXJhdGlvbk9wdGlvbnMuc3RhbmRhbG9uZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoZGVjbGFyYXRpb25PcHRpb25zLnZlcnNpb24pKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZGVjbGFyYXRpb25PcHRpb25zLnZlcnNpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMudmVyc2lvbiBzaG91bGQgYmUgYSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbiA9IGRlY2xhcmF0aW9uT3B0aW9ucy52ZXJzaW9uO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBEZWNsYXJhdGlvbk9wdGlvbnM7XG59KCkpO1xuZXhwb3J0cy5EZWNsYXJhdGlvbk9wdGlvbnMgPSBEZWNsYXJhdGlvbk9wdGlvbnM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL29wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgY29tbWVudC5cbiAqXG4gKiBBbiBYTUwgY2hhcmFjdGVyIHJlZmVyZW5jZSBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7Y29udGVudH1gIGlzXG4gKiB0aGUgdGV4dCBvZiB0aGUgY29tbWVudC5cbiAqXG4gKiBgYGB4bWxcbiAqIDwhLS17Y29udGVudH0tLT5cbiAqIGBgYFxuICpcbiAqIFRoZSBge2NvbnRlbnR9YCB2YWx1ZSBpcyBhIHByb3BlcnR5IG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbENvbW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxDb21tZW50LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sQ29tbWVudH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGVudCBUaGUgY29udGVudCBvZiB0aGUgY29tbWVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxDb21tZW50KGNvbnRlbnQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbENvbW1lbnQucHJvdG90eXBlLCBcImNvbnRlbnRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgY29udGVudCBvZiB0aGUgY29tbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIGNvbnRlbnQgb2YgdGhlIGNvbW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgY29udGVudCBvZiB0aGUgY29tbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGNvbnRlbnQgb2YgdGhlIGNvbW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29udGVudCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb250ZW50IHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBub3QgYWxsb3dlZCBpbiBYTUxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghL14oW14tXXwtW14tXSkqJC8udGVzdChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvbnRlbnQgc2hvdWxkIG5vdCBjb250YWluIHRoZSBzdHJpbmcgJy0tJyBvclwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgZW5kIHdpdGggJy0nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENvbW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENvbW1lbnQucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ29tbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDb21tZW50LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ29tbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ29tbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ29tbWVudH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENvbW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbENvbW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIFwiPCEtLVwiICsgdGhpcy5jb250ZW50ICsgXCItLT5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxDb21tZW50O1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sQ29tbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ29tbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICpcbiAqIEFuIFhNTCBwcm9jZXNzaW5nIGluc3RydWN0aW9uIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHt0YXJnZXR9YFxuICogYW5kIGB7Y29udGVudH1gIGFyZSB0aGUgdGFyZ2V0IGFuZCBjb250ZW50IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uXG4gKiByZXNwZWN0aXZlbHkuXG4gKlxuICogYGBgeG1sXG4gKiA8P3t0YXJnZXR9IHtjb250ZW50fT8+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt0YXJnZXR9YCBhbmQgYHtjb250ZW50fWAgdmFsdWVzIGFyZSBwcm9wZXJ0aWVzIG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxQcm9jSW5zdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbFByb2NJbnN0LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sUHJvY0luc3R9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkYXRhIG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLCBvciB1bmRlZmluZWQgaWZcbiAgICAgKiAgICAgICAgICAgICAgICB0aGVyZSBpcyBubyB0YXJnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sUHJvY0luc3QodGFyZ2V0LCBjb250ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgX3RoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbFByb2NJbnN0LnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRhcmdldCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhcmdldCBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInhtbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGFyZ2V0IHNob3VsZCBub3QgYmUgdGhlIHN0cmluZyAneG1sJ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbFByb2NJbnN0LnByb3RvdHlwZSwgXCJjb250ZW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBkYXRhIG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLiBUaGlzIHZhbHVlIG1heSBiZVxuICAgICAgICAgKiAgICAgICAgICB1bmRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgZGF0YSBvZiB0aGUgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uIFRoaXMgdmFsdWUgbWF5IGJlXG4gICAgICAgICAqICAgICAgICAgICAgICAgIHVuZGVmaW5lZC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhjb250ZW50KSAmJiAhdXRpbHNfMS5pc1VuZGVmaW5lZChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJkYXRhIHNob3VsZCBiZSBhIHN0cmluZyBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIG5vdCBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoL1xcPz4vLnRlc3QoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gdGhlIHN0cmluZyAnPz4nXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxQcm9jSW5zdH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sUHJvY0luc3QucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbFByb2NJbnN0LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxQcm9jSW5zdC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbFByb2NJbnN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sUHJvY0luc3QucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxQcm9jSW5zdCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxQcm9jSW5zdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICBpZiAodGhpcy5jb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjw/XCIgKyB0aGlzLnRhcmdldCArIFwiPz5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIjw/XCIgKyB0aGlzLnRhcmdldCArIFwiIFwiICsgdGhpcy5jb250ZW50ICsgXCI/PlwiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gWG1sUHJvY0luc3Q7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxQcm9jSW5zdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sUHJvY0luc3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFJlcGxhY2VzIGFtcGVyc2FuZHMgKCYpIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKlxuICogQHJldHVybnMgQSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggYW1wZXJzYW5kcyBlc2NhcGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUFtcGVyc2FuZHMoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIik7XG59XG5leHBvcnRzLmVzY2FwZUFtcGVyc2FuZHMgPSBlc2NhcGVBbXBlcnNhbmRzO1xuLyoqXG4gKiBSZXBsYWNlcyBsZWZ0IGFuZ2xlIGJyYWNrZXRzICgmbHQ7KSB3aXRoIHRoZSBhcHByb3ByaWF0ZSBYTUwgY2hhcmFjdGVyXG4gKiByZWZlcmVuY2UuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqXG4gKiBAcmV0dXJucyBBIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBzdHJpbmcgd2l0aCBsZWZ0IGFuZ2xlIGJyYWNrZXRzIGVzY2FwZWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXNjYXBlTGVmdEFuZ2xlQnJhY2tldHMoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC88L2csIFwiJmx0O1wiKTtcbn1cbmV4cG9ydHMuZXNjYXBlTGVmdEFuZ2xlQnJhY2tldHMgPSBlc2NhcGVMZWZ0QW5nbGVCcmFja2V0cztcbi8qKlxuICogUmVwbGFjZXMgcmlnaHQgYW5nbGUgYnJhY2tldHMgKCZndDspIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXJcbiAqIHJlZmVyZW5jZSB3aGVuIHBhcnQgb2YgdGhlIHN0cmluZyBcIl1dPlwiLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKlxuICogQHJldHVybnMgQSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggcmlnaHQgYW5nbGUgYnJhY2tldHMgZXNjYXBlZFxuICogICAgICAgICAgd2hlbiBwYXJ0IG9mIHRoZSBzdHJpbmcgXCJdXT5cIi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlc2NhcGVSaWdodEFuZ2xlQnJhY2tldHNJbkNkYXRhVGVybWluYXRvcihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL11dPi9nLCBcIl1dJmd0O1wiKTtcbn1cbmV4cG9ydHMuZXNjYXBlUmlnaHRBbmdsZUJyYWNrZXRzSW5DZGF0YVRlcm1pbmF0b3IgPSBlc2NhcGVSaWdodEFuZ2xlQnJhY2tldHNJbkNkYXRhVGVybWluYXRvcjtcbi8qKlxuICogUmVwbGFjZXMgc2luZ2xlIHF1b3RlcyAoXCIpIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKlxuICogQHJldHVybnMgQSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggc2luZ2xlIHF1b3RlcyBlc2NhcGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVNpbmdsZVF1b3RlcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLycvZywgXCImYXBvcztcIik7XG59XG5leHBvcnRzLmVzY2FwZVNpbmdsZVF1b3RlcyA9IGVzY2FwZVNpbmdsZVF1b3Rlcztcbi8qKlxuICogUmVwbGFjZXMgZG91YmxlIHF1b3RlcyAoXCIpIHdpdGggdGhlIGFwcHJvcHJpYXRlIFhNTCBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKlxuICogQHJldHVybnMgQSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggZG91YmxlIHF1b3RlcyBlc2NhcGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZURvdWJsZVF1b3RlcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xufVxuZXhwb3J0cy5lc2NhcGVEb3VibGVRdW90ZXMgPSBlc2NhcGVEb3VibGVRdW90ZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL2VzY2FwZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIGVzY2FwZV8xID0gcmVxdWlyZShcIi4uL2VzY2FwZVwiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyB0ZXh0IGluIGFuIFhNTCBhdHRyaWJ1dGUgdmFsdWUuXG4gKlxuICogUmVzdHJpY3RlZCBjaGFyYWN0ZXJzLCBzdWNoIGFzIHRoZSBhbXBlcnNhbmQgKGAmYCkgYW5kIHRoZSBvcGVuaW5nIGFuZ2xlXG4gKiBicmFja2V0IChgPGApLCBhcmUgYWxsIGF1dG9tYXRpY2FsbHkgZXNjYXBlZC5cbiAqXG4gKiBUbyBjcmVhdGUgYW4gY2hhcmFjdGVyIHJlZmVyZW5jZSBvciBlbnRpdHkgcmVmZXJlbmNlLCB5b3Ugc2hvdWxkIHVzZVxuICoge0BsaW5rIFhtbENoYXJSZWZ9IG9yIHtAbGluayBYbWxFbnRpdHlSZWZ9IHJlc3BlY3RpdmVseSBpbnN0ZWFkLlxuICpcbiAqIFhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sQXR0cmlidXRlVGV4dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbEF0dHJpYnV0ZVRleHQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sQXR0cmlidXRlVGV4dCh0ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxBdHRyaWJ1dGVUZXh0LnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5vZGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFRleHQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGV4dCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0ZXh0IHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBpbiBYTUxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQXR0cmlidXRlVGV4dH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlVGV4dC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZVRleHQucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGVUZXh0LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlVGV4dC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbEF0dHJpYnV0ZVRleHQgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlVGV4dC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgc3RyID0gdGhpcy50ZXh0O1xuICAgICAgICBzdHIgPSBlc2NhcGVfMS5lc2NhcGVBbXBlcnNhbmRzKHN0cik7XG4gICAgICAgIHN0ciA9IGVzY2FwZV8xLmVzY2FwZUxlZnRBbmdsZUJyYWNrZXRzKHN0cik7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sQXR0cmlidXRlVGV4dDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbEF0dHJpYnV0ZVRleHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbEF0dHJpYnV0ZVRleHQuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgY2hhcmFjdGVyIHJlZmVyZW5jZS5cbiAqXG4gKiBBbiBYTUwgY2hhcmFjdGVyIHJlZmVyZW5jZSBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7ZGVjfWAgaXMgdGhlXG4gKiBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGNvZGUgcG9pbnQgY29ycmVzcG9uZGluZyB0byBhIHBhcnRpY3VsYXIgVW5pY29kZVxuICogY2hhcmFjdGVyOlxuICpcbiAqIGBgYHhtbFxuICogJiN7ZGVjfTtcbiAqIGBgYFxuICpcbiAqIFRoZSBjb3JyZXNwb25kaW5nIGhleGFkZWNpbWFsIHZlcnNpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZVxuICogYHtoZXh9YCBpcyB0aGUgaGV4YWRlY2ltYWwgcmVwcmVzZW50YXRpb24gY29kZSBwb2ludCBjb3JyZXNwb25kaW5nIHRvIGFcbiAqIHBhcnRpY3VsYXIgVW5pY29kZSBjaGFyYWN0ZXI6XG4gKlxuICogYGBgeG1sXG4gKiAmI3h7aGV4fTtcbiAqIGBgYFxuICpcbiAqIFVuaWNvZGUgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSBCYXNpYyBNdWx0aWxpbmd1YWwgUGxhbmUgYXJlIHJlcHJlc2VudGVkXG4gKiB1c2luZyBhIHN1cnJvZ2F0ZSBwYWlyIGNvbnNpc3Rpbmcgb2YgdHdvIGNoYXJhY3RlciByZWZlcmVuY2VzLlxuICpcbiAqIFRoZSBge2RlY31gIGFuZCBge2hleH1gIHZhbHVlcyBhcmUgZGVmaW5lZCBieSB0aGUgYGNoYXJgIGFuZCBgaGV4YFxuICogcHJvcGVydGllcyBvZiB0aGlzIG5vZGU7IHRoZSBmb3JtZXIgaXMgdGhlIGNoYXJhY3RlciB0byBiZSByZXByZXNlbnRlZCB3aGlsZVxuICogdGhlIGxhdHRlciBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZGVjaW1hbCBvciBoZXhhZGVjaW1hbCByZXByZXNlbnRhdGlvblxuICogc2hvdWxkIGJlIHVzZWQuXG4gKlxuICogWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxDaGFyUmVmID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sQ2hhclJlZiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbENoYXJSZWZ9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYXIgVGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gaGV4IFdoZXRoZXIgdG8gdXNlIHRoZSBoZXhhZGVjaW1hbCBvciBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGZvclxuICAgICAqICAgICAgICAgICAgdGhlIHJlZmVyZW5jZS4gSWYgbGVmdCB1bmRlZmluZWQsIGRlY2ltYWwgaXMgdGhlIGRlZmF1bHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sQ2hhclJlZihjaGFyLCBoZXgpIHtcbiAgICAgICAgaWYgKGhleCA9PT0gdm9pZCAwKSB7IGhleCA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNoYXIgPSBjaGFyO1xuICAgICAgICBfdGhpcy5oZXggPSBoZXg7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbENoYXJSZWYucHJvdG90eXBlLCBcImNoYXJcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgY2hhcmFjdGVyIHRvIHJlcHJlc2VudCB1c2luZyB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgY2hhcmFjdGVyIHRvIHJlcHJlc2VudCB1c2luZyB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhcjtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGNoYXIgVGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGNoYXIpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhjaGFyKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjaGFyIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlU2luZ2xlQ2hhcihjaGFyKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNoYXIgc2hvdWxkIGNvbnRhaW4gYSBzaW5nbGUgY2hhcmFjdGVyLCBhbmQgdGhpc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgY2hhcmFjdGVyIHNob3VsZCBiZSBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NoYXIgPSBjaGFyO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sQ2hhclJlZi5wcm90b3R5cGUsIFwiaGV4XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgd2hldGhlciBvciBub3QgdG8gdXNlIHRoZSBoZXhhZGVjaW1hbCBvciBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGZvclxuICAgICAgICAgKiB0aGUgcmVmZXJlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBXaGV0aGVyIG9yIG5vdCB0byB1c2UgdGhlIGhleGFkZWNpbWFsIG9yIGRlY2ltYWwgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICogICAgICAgICAgZm9yIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZXg7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHdoZXRoZXIgb3Igbm90IHRvIHVzZSB0aGUgaGV4YWRlY2ltYWwgb3IgZGVjaW1hbCByZXByZXNlbnRhdGlvbiBmb3JcbiAgICAgICAgICogdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGhleCBXaGV0aGVyIG9yIG5vdCB0byB1c2UgdGhlIGhleGFkZWNpbWFsIG9yIGRlY2ltYWxcbiAgICAgICAgICogICAgICAgICAgICByZXByZXNlbnRhdGlvbiBmb3IgdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGhleCkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzQm9vbGVhbihoZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImhleCBzaG91bGQgYmUgYSBib29sZWFuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faGV4ID0gaGV4O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxDaGFyUmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyUmVmLnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2hhclJlZi5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENoYXJSZWYucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJSZWZ9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyUmVmLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sQ2hhclJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxDaGFyUmVmLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBjaGFyO1xuICAgICAgICBpZiAodGhpcy5jaGFyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY2hhciA9IHRoaXMuY2hhci5jaGFyQ29kZUF0KDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hhciA9IHV0aWxzXzEuZ2V0Q29kZVBvaW50KHRoaXMuY2hhciwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gXCImI3hcIiArIGNoYXIudG9TdHJpbmcoMTYpICsgXCI7XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCImI1wiICsgY2hhciArIFwiO1wiO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gWG1sQ2hhclJlZjtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbENoYXJSZWY7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbENoYXJSZWYuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgZW50aXR5IHJlZmVyZW5jZS5cbiAqXG4gKiBBbiBYTUwgZW50aXR5IHJlZmVyZW5jZSBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlXG4gKiBge2VudGl0eX1gIGlzIG5hbWUgb2YgdGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkOlxuICpcbiAqIGBgYHhtbFxuICogJntlbnRpdHl9O1xuICogYGBgXG4gKlxuICogVGhlIGB7ZW50aXR5fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbEVudGl0eVJlZiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbEVudGl0eVJlZiwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbEVudGl0eVJlZn0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxFbnRpdHlSZWYoZW50aXR5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmVudGl0eSA9IGVudGl0eTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sRW50aXR5UmVmLnByb3RvdHlwZSwgXCJlbnRpdHlcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VudGl0eTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGVudGl0eSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZW50aXR5IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlTmFtZShlbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZW50aXR5IHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIiBub3QgYWxsb3dlZCBpbiBYTUwgbmFtZXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbEVudGl0eVJlZn0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRW50aXR5UmVmLnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbEVudGl0eVJlZi5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxFbnRpdHlSZWYucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRW50aXR5UmVmLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbEVudGl0eVJlZi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gXCImXCIgKyB0aGlzLmVudGl0eSArIFwiO1wiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbEVudGl0eVJlZjtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbEVudGl0eVJlZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRW50aXR5UmVmLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG51bGwgIT09IG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBlc2NhcGVfMSA9IHJlcXVpcmUoXCIuLi9lc2NhcGVcIik7XG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL29wdGlvbnNcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbEF0dHJpYnV0ZVRleHRfMSA9IHJlcXVpcmUoXCIuL1htbEF0dHJpYnV0ZVRleHRcIik7XG52YXIgWG1sQ2hhclJlZl8xID0gcmVxdWlyZShcIi4vWG1sQ2hhclJlZlwiKTtcbnZhciBYbWxFbnRpdHlSZWZfMSA9IHJlcXVpcmUoXCIuL1htbEVudGl0eVJlZlwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBlbGVtZW50IGF0dHJpYnV0ZS5cbiAqXG4gKiBBbiBYTUwgZWxlbWVudCBhdHRyaWJ1dGUgaXMgcGFydCBvZiB0aGUgc3RhcnQgdGFnIG9mIGFuIGVsZW1lbnQgYW5kIGlzXG4gKiBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7bmFtZX1gIGlzIHRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgYW5kXG4gKiBge3ZhbHVlfWAgaXMgdGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGU6XG4gKlxuICogYGBgeG1sXG4gKiA8ZWxlbWVudCB7bmFtZX09XCJ7dmFsdWV9XCI+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHtuYW1lfWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUsIHdoaWxlIHRoZSBge3ZhbHVlfWAgcHJvcGVydHlcbiAqIGNvbnNpc3RzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sQXR0cmlidXRlIG5vZGVzIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hpbGQsIGFuZCBjYW4gaGF2ZSBhbiB1bmxpbWl0ZWRcbiAqIG51bWJlciBvZiB7QGxpbmsgWG1sQXR0cmlidXRlVGV4dH0sIHtAbGluayBYbWxDaGFyUmVmfSwgYW5kXG4gKiB7QGxpbmsgWG1sRW50aXR5UmVmfSBub2RlcyBhcyBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbEF0dHJpYnV0ZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbEF0dHJpYnV0ZSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbEF0dHJpYnV0ZX0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgWE1MIGF0dHJpYnV0ZS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIFhNTCBhdHRyaWJ1dGUuIEFkZGl0aW9uYWwgY2hpbGRyZW5cbiAgICAgKiAgICAgICAgICAgICAgY2FuIGJlIGFkZGVkIGxhdGVyLiBPbmx5IHtAbGluayBYbWxBdHRyaWJ1dGVUZXh0fSxcbiAgICAgKiAgICAgICAgICAgICAge0BsaW5rIFhtbENoYXJSZWZ9LCBhbmQge0BsaW5rIFhtbEVudGl0eVJlZn0gbm9kZXMgYXJlXG4gICAgICogICAgICAgICAgICAgIHBlcm1pdHRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGlmICh1dGlsc18xLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHZhbHVlXzEgPSB2YWx1ZTsgX2kgPCB2YWx1ZV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdmFsdWVfMVtfaV07XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zZXJ0Q2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pbnNlcnRDaGlsZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sQXR0cmlidXRlLnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG5hbWUgb2YgdGhpcyBhdHRyaWJ1dGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoaXMgYXR0cmlidXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIG5hbWUgb2YgdGhpcyBhdHRyaWJ1dGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoaXMgYXR0cmlidXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVOYW1lKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibmFtZSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVycyBub3RcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGFsbG93ZWQgaW4gWE1MIG5hbWVzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgWE1MIGNoYXJhY3RlciByZWZlcmVuY2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFyIFRoZSBjaGFyYWN0ZXIgdG8gcmVwcmVzZW50IHVzaW5nIHRoZSByZWZlcmVuY2UuXG4gICAgICogQHBhcmFtIGhleCBXaGV0aGVyIHRvIHVzZSB0aGUgaGV4YWRlY2ltYWwgb3IgZGVjaW1hbCByZXByZXNlbnRhdGlvbiBmb3JcbiAgICAgKiAgICAgICAgICAgIHRoZSByZWZlcmVuY2UuIElmIGxlZnQgdW5kZWZpbmVkLCBkZWNpbWFsIGlzIHRoZSBkZWZhdWx0LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiAgICAgICAgICAgICAgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBYTUwgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlLnByb3RvdHlwZS5jaGFyUmVmID0gZnVuY3Rpb24gKGNoYXIsIGhleCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNoYXJSZWYgPSBuZXcgWG1sQ2hhclJlZl8xLmRlZmF1bHQoY2hhciwgaGV4KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChjaGFyUmVmLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBjaGFyUmVmO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBYTUwgZW50aXR5IHJlZmVyZW5jZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBUaGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGUucHJvdG90eXBlLmVudGl0eVJlZiA9IGZ1bmN0aW9uIChlbnRpdHksIGluZGV4KSB7XG4gICAgICAgIHZhciBjaGFyUmVmID0gbmV3IFhtbEVudGl0eVJlZl8xLmRlZmF1bHQoZW50aXR5KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChjaGFyUmVmLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBjaGFyUmVmO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIG5vZGUgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiBhdCB0aGUgc3BlY2lmaWVkXG4gICAgICogaW5kZXguIFRoZSBub2RlIGlzIG5vdCBpbnNlcnRlZCBpZiBpdCBpcyBhbHJlYWR5IHByZXNlbnQuIElmIHRoaXMgbm9kZVxuICAgICAqIGFscmVhZHkgaGFzIGEgcGFyZW50LCBpdCBpcyByZW1vdmVkIGZyb20gdGhhdCBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgb25seSB7QGxpbmsgWG1sQ2hhclJlZn0sIHtAbGluayBYbWxFbnRpdHlSZWZ9LCBhbmRcbiAgICAgKiB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbiBiZSBpbnNlcnRlZDsgb3RoZXJ3aXNlLCBhbiBleGNlcHRpb24gd2lsbFxuICAgICAqIGJlIHRocm93bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgbm9kZS4gTm9kZXMgYXQgb3IgYWZ0ZXIgdGhlXG4gICAgICogICAgICAgICAgICAgIGluZGV4IGFyZSBzaGlmdGVkIHRvIHRoZSByaWdodC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkLFxuICAgICAqICAgICAgICAgICAgICB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5vZGUgaW5zZXJ0ZWQgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiwgb3IgdW5kZWZpbmVkIGlmIG5vXG4gICAgICogICAgICAgICAgbm9kZSB3YXMgaW5zZXJ0ZWQuXG4gICAgICovXG4gICAgWG1sQXR0cmlidXRlLnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sQ2hhclJlZl8xLmRlZmF1bHQgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbEVudGl0eVJlZl8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxBdHRyaWJ1dGVUZXh0XzEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJub2RlIHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBYbWxDaGFyUmVmLFwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxFbnRpdHlSZWYsIG9yIFhtbEF0dHJpYnV0ZVRleHRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQuY2FsbCh0aGlzLCBub2RlLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgbm9kZSBmcm9tIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoaXMgbm9kZSBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGNoaWxkLiBBdHRlbXB0cyB0byByZW1vdmVcbiAgICAgKiB0aGUgbGFzdCBjaGlsZCBub2RlIHdpbGwgcmVzdWx0IGluIGFuIGV4Y2VwdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFdoZXRoZXIgYSBub2RlIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxBdHRyaWJ1dGUgbm9kZXMgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGlsZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZC5jYWxsKHRoaXMsIG5vZGUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbm9kZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBub2RlIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hpbGQuIEF0dGVtcHRzIHRvIHJlbW92ZVxuICAgICAqIHRoZSBsYXN0IGNoaWxkIG5vZGUgd2lsbCByZXN1bHQgaW4gYW4gZXhjZXB0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSB0byBiZSByZW1vdmVkIGlzIGxvY2F0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSB0aGF0IHdhcyByZW1vdmVkLCBvciB1bmRlZmluZWQgaWYgbm8gbm9kZSB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBYbWxBdHRyaWJ1dGUucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxBdHRyaWJ1dGUgbm9kZXMgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGlsZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXguY2FsbCh0aGlzLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IFhNTCB0ZXh0IG5vZGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IEFyYml0cmFyeSBjaGFyYWN0ZXIgZGF0YS5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgWE1MIGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZS5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBpbmRleCkge1xuICAgICAgICB2YXIgdGV4dE5vZGUgPSBuZXcgWG1sQXR0cmlidXRlVGV4dF8xLmRlZmF1bHQodGV4dCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQodGV4dE5vZGUsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRleHROb2RlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbEF0dHJpYnV0ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgb3B0aW9uc09iaiA9IG5ldyBvcHRpb25zXzEuU3RyaW5nT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdmFyIHF1b3RlID0gb3B0aW9uc09iai5kb3VibGVRdW90ZXMgPyBcIlxcXCJcIiA6IFwiJ1wiO1xuICAgICAgICB2YXIgc3RyID0gdGhpcy5uYW1lICsgXCI9XCIgKyBxdW90ZTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX2NoaWxkcmVuOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmouZG91YmxlUXVvdGVzKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IGVzY2FwZV8xLmVzY2FwZURvdWJsZVF1b3RlcyhjaGlsZC50b1N0cmluZyhvcHRpb25zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gZXNjYXBlXzEuZXNjYXBlU2luZ2xlUXVvdGVzKGNoaWxkLnRvU3RyaW5nKG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdHIgKz0gcXVvdGU7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sQXR0cmlidXRlO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sQXR0cmlidXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxBdHRyaWJ1dGUuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIENEQVRBIHNlY3Rpb24uXG4gKlxuICogQW4gWE1MIENEQVRBIHNlY3Rpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge2RhdGF9YCBpcyB0aGVcbiAqIGNoYXJhY3RlciBkYXRhIG9mIHRoZSBzZWN0aW9uOlxuICpcbiAqIGBgYHhtbFxuICogPCFbQ0RBVEFbe2RhdGF9XV0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHtkYXRhfWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sQ2RhdGEgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sQ2RhdGEgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxDZGF0YSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbENkYXRhfSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBjaGFyYWN0ZXIgZGF0YSBvZiB0aGUgQ0RBVEEgc2VjdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxDZGF0YShkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxDZGF0YS5wcm90b3R5cGUsIFwiZGF0YVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBjaGFyYWN0ZXIgZGF0YSBvZiB0aGUgQ0RBVEEgc2VjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIGNoYXJhY3RlciBkYXRhIG9mIHRoZSBDREFUQSBzZWN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGNoYXJhY3RlciBkYXRhIG9mIHRoZSBDREFUQSBzZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZGF0YSBUaGUgY2hhcmFjdGVyIGRhdGEgb2YgdGhlIENEQVRBIHNlY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2hhcmFjdGVyIGRhdGEgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVDaGFyKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhcmFjdGVyIGRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKC9dXT4vLnRlc3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIHNob3VsZCBub3QgY29udGFpbiB0aGUgc3RyaW5nICddXT4nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENkYXRhfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDZGF0YS5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENkYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2RhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2RhdGEucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENkYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2RhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENkYXRhLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENkYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2RhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDZGF0YS5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENkYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbENkYXRhLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIjwhW0NEQVRBW1wiICsgdGhpcy5kYXRhICsgXCJdXT5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxDZGF0YTtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbENkYXRhO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxDZGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBlc2NhcGVfMSA9IHJlcXVpcmUoXCIuLi9lc2NhcGVcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgY2hhcmFjdGVyIGRhdGEgaW4gYW4gWE1MIGRvY3VtZW50LlxuICpcbiAqIFJlc3RyaWN0ZWQgY2hhcmFjdGVycywgc3VjaCBhcyB0aGUgYW1wZXJzYW5kIChgJmApLCB0aGUgb3BlbmluZyBhbmdsZVxuICogYnJhY2tldCAoYDxgKSwgYW5kIHRoZSBjbG9zaW5nIGFuZ2xlIGJyYWNrZXQgKGA+YCkgd2hlbiBpdCBhcHBlYXJzIGluIHRoZVxuICogc3RyaW5nIGBdXT5gLCBhcmUgYWxsIGF1dG9tYXRpY2FsbHkgZXNjYXBlZC5cbiAqXG4gKiBUbyBjcmVhdGUgYW4gY2hhcmFjdGVyIHJlZmVyZW5jZSBvciBlbnRpdHkgcmVmZXJlbmNlLCB5b3Ugc2hvdWxkIHVzZVxuICoge0BsaW5rIFhtbENoYXJSZWZ9IG9yIHtAbGluayBYbWxFbnRpdHlSZWZ9IHJlc3BlY3RpdmVseSBpbnN0ZWFkLlxuICpcbiAqIFhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbENoYXJEYXRhID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sQ2hhckRhdGEsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxDaGFyRGF0YX0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhckRhdGEgQ2hhcmFjdGVyIGRhdGEuXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sQ2hhckRhdGEoY2hhckRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2hhckRhdGEgPSBjaGFyRGF0YTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sQ2hhckRhdGEucHJvdG90eXBlLCBcImNoYXJEYXRhXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGNoYXJhY3RlciBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5vZGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBjaGFyYWN0ZXIgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhckRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBjaGFyYWN0ZXIgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gY2hhckRhdGEgQ2hhcmFjdGVyIGRhdGEuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChjaGFyRGF0YSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKGNoYXJEYXRhKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjaGFyRGF0YSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoY2hhckRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhckRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90IGFsbG93ZWRcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NoYXJEYXRhID0gY2hhckRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbENoYXJEYXRhfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyRGF0YS5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sQ2hhckRhdGEucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbENoYXJEYXRhLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sQ2hhckRhdGF9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxDaGFyRGF0YS5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbENoYXJEYXRhIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbENoYXJEYXRhLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBzdHIgPSB0aGlzLmNoYXJEYXRhO1xuICAgICAgICBzdHIgPSBlc2NhcGVfMS5lc2NhcGVBbXBlcnNhbmRzKHN0cik7XG4gICAgICAgIHN0ciA9IGVzY2FwZV8xLmVzY2FwZUxlZnRBbmdsZUJyYWNrZXRzKHN0cik7XG4gICAgICAgIHN0ciA9IGVzY2FwZV8xLmVzY2FwZVJpZ2h0QW5nbGVCcmFja2V0c0luQ2RhdGFUZXJtaW5hdG9yKHN0cik7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sQ2hhckRhdGE7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxDaGFyRGF0YTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sQ2hhckRhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL29wdGlvbnNcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBkZWNsYXJhdGlvbi5cbiAqXG4gKiBBbiBYTUwgZGVjbGFyYXRpb24gaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzLCB3aGVyZSBge3ZlcnNpb259YCBpcyB0aGUgWE1MXG4gKiB2ZXJzaW9uLCBge2VuY29kaW5nfWAgaXMgdGhlIGVuY29kaW5nIG9mIHRoZSBkb2N1bWVudCwgYW5kIGB7c3RhbmRhbG9uZX1gXG4gKiBpcyBlaXRoZXIgXCJ5ZXNcIiBvciBcIm5vXCIsIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBkb2N1bWVudCBtYXkgY29udGFpblxuICogZXh0ZXJuYWwgbWFya3VwIGRlY2xhcmF0aW9uczpcbiAqXG4gKiBgYGB4bWxcbiAqIDw/eG1sIHZlcnNpb249XCJ7dmVyc2lvbn1cIiBlbmNvZGluZz1cIntlbmNvZGluZ31cIiBzdGFuZGFsb25lPVwie3N0YW5kYWxvbmV9XCI/PlxuICogYGBgXG4gKlxuICogVGhlIGB7dmVyc2lvbn1gLCBge2VuY29kaW5nfWAsIGFuZCBge3N0YW5kYWxvbmV9YCB2YWx1ZXMgYXJlIHByb3BlcnRpZXMgb2ZcbiAqIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxEZWNsIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbERlY2wgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEZWNsLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sRGVjbH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEZWNsKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgdmFyIG9wdGlvbnNPYmogPSBuZXcgb3B0aW9uc18xLkRlY2xhcmF0aW9uT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgX3RoaXMuZW5jb2RpbmcgPSBvcHRpb25zT2JqLmVuY29kaW5nO1xuICAgICAgICBfdGhpcy5zdGFuZGFsb25lID0gb3B0aW9uc09iai5zdGFuZGFsb25lO1xuICAgICAgICBfdGhpcy52ZXJzaW9uID0gb3B0aW9uc09iai52ZXJzaW9uO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEZWNsLnByb3RvdHlwZSwgXCJlbmNvZGluZ1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBYTUwgZW5jb2RpbmcgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgWE1MIGVuY29kaW5nIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi4gVGhpcyB2YWx1ZVxuICAgICAgICAgKiAgICAgICAgICBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5jb2Rpbmc7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBYTUwgZW5jb2RpbmcgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZW5jb2RpbmcgVGhlIFhNTCBlbmNvZGluZyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uIFRoaXNcbiAgICAgICAgICogICAgICAgICAgICAgICAgIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBlbmNvZGluZy4gSWYgbGVmdCB1bmRlZmluZWQsIG5vXG4gICAgICAgICAqICAgICAgICAgICAgICAgICBlbmNvZGluZyBpcyBpbmNsdWRlZC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gICAgICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyhlbmNvZGluZykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIS9eW0EtWmEtel1bQS1aYS16MC05Ll8tXSokLy50ZXN0KGVuY29kaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlbmNvZGluZyBzaG91bGQgYmUgYSB2YWxpZCBYTUwgZW5jb2RpbmdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZW5jb2RpbmcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nIG9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VuY29kaW5nID0gZW5jb2Rpbmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEZWNsLnByb3RvdHlwZSwgXCJzdGFuZGFsb25lXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIFhNTCBzdGFuZGFsb25lIGF0dHJpYnV0ZSB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBYTUwgc3RhbmRhbG9uZSBhdHRyaWJ1dGUgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKiAgICAgICAgICBUaGlzIHZhbHVlIG1heSBiZSB1bmRlZmluZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFuZGFsb25lO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgWE1MIHN0YW5kYWxvbmUgYXR0cmlidXRlIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHN0YW5kYWxvbmUgVGhlIFhNTCBzdGFuZGFsb25lIGF0dHJpYnV0ZSB0byBiZSBpbmNsdWRlZC4gVGhpc1xuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICB2YWx1ZSBtdXN0IGJlIFwieWVzXCIgb3IgXCJub1wiLiBJZiBsZWZ0IHVuZGVmaW5lZCwgbm9cbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgc3RhbmRhbG9uZSBhdHRyaWJ1dGUgaXMgaW5jbHVkZWQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChzdGFuZGFsb25lKSB7XG4gICAgICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyhzdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgICAgIGlmICghL14oeWVzfG5vKSQvLnRlc3Qoc3RhbmRhbG9uZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3RhbmRhbG9uZSBzaG91bGQgYmUgZWl0aGVyIHRoZSBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiAneWVzJyBvciB0aGUgc3RyaW5nICdubydcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoc3RhbmRhbG9uZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwic3RhbmRhbG9uZSBzaG91bGQgYmUgYSBzdHJpbmcgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3RhbmRhbG9uZSA9IHN0YW5kYWxvbmU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEZWNsLnByb3RvdHlwZSwgXCJ2ZXJzaW9uXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIFhNTCB2ZXJzaW9uIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIFhNTCB2ZXJzaW9uIHRvIHRiZSBpbmNsdWRlZCBpbiB0aGUgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgWE1MIHZlcnNpb24gdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gdmVyc2lvbiBUaGUgWE1MIHZlcnNpb24gdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGRlY2xhcmF0aW9uLiBUaGlzXG4gICAgICAgICAqICAgICAgICAgICAgICAgIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBYTUwgdmVyc2lvbiBudW1iZXIuIElmIGxlZnRcbiAgICAgICAgICogICAgICAgICAgICAgICAgdW5kZWZpbmVkLCB0aGUgZGVmYXVsdCB2ZXJzaW9uIGlzIFwiMS4wXCIuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcodmVyc2lvbikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidmVyc2lvbiBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghL14xXFwuWzAtOV0rJC8udGVzdCh2ZXJzaW9uKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInZlcnNpb24gc2hvdWxkIGJlIGEgdmFsaWQgWE1MIHZlcnNpb25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRGVjbH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRGVjbC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEZWNsfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbERlY2wucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEZWNsfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEZWNsLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEZWNsfSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRGVjbC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRGVjbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgb3B0aW9uc09iaiA9IG5ldyBvcHRpb25zXzEuU3RyaW5nT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdmFyIHF1b3RlID0gb3B0aW9uc09iai5kb3VibGVRdW90ZXMgPyAnXCInIDogXCInXCI7XG4gICAgICAgIHZhciBzdHIgPSBcIjw/eG1sIHZlcnNpb249XCIgKyBxdW90ZSArIHRoaXMudmVyc2lvbiArIHF1b3RlO1xuICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyh0aGlzLmVuY29kaW5nKSkge1xuICAgICAgICAgICAgc3RyICs9IFwiIGVuY29kaW5nPVwiICsgcXVvdGUgKyB0aGlzLmVuY29kaW5nICsgcXVvdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzXzEuaXNTdHJpbmcodGhpcy5zdGFuZGFsb25lKSkge1xuICAgICAgICAgICAgc3RyICs9IFwiIHN0YW5kYWxvbmU9XCIgKyBxdW90ZSArIHRoaXMuc3RhbmRhbG9uZSArIHF1b3RlO1xuICAgICAgICB9XG4gICAgICAgIHN0ciArPSBcIj8+XCI7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICByZXR1cm4gWG1sRGVjbDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbERlY2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbERlY2wuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL29wdGlvbnNcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4uL3ZhbGlkYXRlXCIpO1xudmFyIFhtbENvbW1lbnRfMSA9IHJlcXVpcmUoXCIuL1htbENvbW1lbnRcIik7XG52YXIgWG1sRHRkQXR0bGlzdF8xID0gcmVxdWlyZShcIi4vWG1sRHRkQXR0bGlzdFwiKTtcbnZhciBYbWxEdGRFbGVtZW50XzEgPSByZXF1aXJlKFwiLi9YbWxEdGRFbGVtZW50XCIpO1xudmFyIFhtbER0ZEVudGl0eV8xID0gcmVxdWlyZShcIi4vWG1sRHRkRW50aXR5XCIpO1xudmFyIFhtbER0ZE5vdGF0aW9uXzEgPSByZXF1aXJlKFwiLi9YbWxEdGROb3RhdGlvblwiKTtcbnZhciBYbWxEdGRQYXJhbUVudGl0eVJlZl8xID0gcmVxdWlyZShcIi4vWG1sRHRkUGFyYW1FbnRpdHlSZWZcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbnZhciBYbWxQcm9jSW5zdF8xID0gcmVxdWlyZShcIi4vWG1sUHJvY0luc3RcIik7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gWE1MIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbiAoRFREKS5cbiAqXG4gKiBBbiBYTUwgZG9jdW1lbnQgdHlwZSBkZWZpbml0aW9uICBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7bmFtZX1gIGlzXG4gKiB0aGUgbmFtZSBvZiB0aGUgRFRELCBge3N5c0lkfWAgaXMgdGhlIHN5c3RlbSBpZGVudGlmaWVyIG9mIHRoZSBEVEQsXG4gKiBge3B1YklkfWAgaXMgdGhlIHB1YmxpYyBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGFuZCBge2ludFN1YnNldH1gIGlzIHRoZVxuICogaW50ZXJuYWwgc3Vic2V0IG9mIHRoZSBEVEQ6XG4gKlxuICogYGBgeG1sXG4gKiA8IURPQ1RZUEUge25hbWV9IFNZU1RFTSBcIntzeXNJZH1cIiBQVUJMSUMgXCJ7cHViSWR9XCIgW1xuICogICAgIHtpbnRTdWJzZXR9XG4gKiBdPlxuICogYGBgXG4gKlxuICogVGhlIGB7bmFtZX1gLCBge3B1YklkfWAsIGFuZCBge3N5c0lkfWAgdmFsdWVzIGFyZSBwcm9wZXJ0aWVzIG9mIHRoZSBub2RlLFxuICogd2hpbGUgdGhlIGB7aW50U3Vic2V0fWAgdmFsdWUgY29uc2lzdHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZS5cbiAqXG4gKiBYbWxEdGQgbm9kZXMgY2FuIGhhdmUgYW4gdW5saW1pdGVkIG51bWJlciBvZiB7QGxpbmsgWG1sQ29tbWVudH0sXG4gKiB7QGxpbmsgWG1sRHRkQXR0bGlzdH0sIHtAbGluayBYbWxEdGRFbGVtZW50fSwge0BsaW5rIFhtbER0ZEVudGl0eX0sXG4gKiB7QGxpbmsgWG1sRHRkTm90YXRpb259LCB7QGxpbmsgWG1sRHRkUGFyYW1FbnRpdHlSZWZ9LCBhbmRcbiAqIHtAbGluayBYbWxQcm9jSW5zdH0gbm9kZXMuXG4gKi9cbnZhciBYbWxEdGQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxEdGQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEdGR9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIERURC5cbiAgICAgKiBAcGFyYW0gc3lzSWQgVGhlIHN5c3RlbSBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICogQHBhcmFtIHB1YklkIFRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAqICAgICAgICAgICAgICBJZiBhIHB1YmxpYyBpZGVudGlmaWVyIGlzIHByb3ZpZGVkLCBhIHN5c3RlbSBpZGVudGlmaWVyXG4gICAgICogICAgICAgICAgICAgIG11c3QgYmUgcHJvdmlkZWQgYXMgd2VsbC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGQobmFtZSwgc3lzSWQsIHB1YklkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBfdGhpcy5zeXNJZCA9IHN5c0lkO1xuICAgICAgICBfdGhpcy5wdWJJZCA9IHB1YklkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGQucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgRFRELlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbmFtZSBvZiB0aGUgRFRELlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIG5hbWUgb2YgdGhlIERURC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIERURC5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJuYW1lIHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlTmFtZShuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5hbWUgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBhbGxvd2VkIGluIFhNTCBuYW1lc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWG1sRHRkLnByb3RvdHlwZSwgXCJwdWJJZFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgcHVibGljIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgICAgICogICAgICAgICAgVGhpcyB2YWx1ZSBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHViSWQ7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLiBJZiBhXG4gICAgICAgICAqIHB1YmxpYyBpZGVudGlmaWVyIGlzIHByb3ZpZGVkLCBhIHN5c3RlbSBpZGVudGlmaWVyIG11c3QgYmUgcHJvdmlkZWQgYXNcbiAgICAgICAgICogd2VsbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHB1YklkIFRoZSBwdWJsaWMgaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKiAgICAgICAgICAgICAgVGhpcyB2YWx1ZSBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocHViSWQpIHtcbiAgICAgICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKHB1YklkKSkge1xuICAgICAgICAgICAgICAgIGlmICghL14oXFx1MDAyMHxcXHUwMDBEfFxcdTAwMEF8W2EtekEtWjAtOV18Wy0nKCkrLC4vOj0/OyEqI0AkXyVdKSokL1xuICAgICAgICAgICAgICAgICAgICAudGVzdChwdWJJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHViSWQgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnMgbm90XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgYWxsb3dlZCBpbiBwdWJsaWMgaWRlbnRpZmllcnNcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHV0aWxzXzEuaXNVbmRlZmluZWQodGhpcy5zeXNJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHViSWQgc2hvdWxkIG5vdCBiZSBkZWZpbmVkIGlmIHN5c0lkIGlzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKHB1YklkKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJwdWJJZCBzaG91bGQgYmUgYSBzdHJpbmcgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcHViSWQgPSBwdWJJZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZC5wcm90b3R5cGUsIFwic3lzSWRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgc3lzdGVtIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIHN5c3RlbSBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICAgICAqICAgICAgICAgIFRoaXMgdmFsdWUgbWF5IGJlIHVuZGVmaW5lZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N5c0lkO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgc3lzdGVtIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHN5c0lkIFRoZSBzeXN0ZW0gaWRlbnRpZmllciBvZiB0aGUgRFRELCBleGNsdWRpbmcgcXVvdGF0aW9uIG1hcmtzLlxuICAgICAgICAgKiAgICAgICAgICAgICAgVGhpcyB2YWx1ZSBtYXkgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoc3lzSWQpIHtcbiAgICAgICAgICAgIGlmICh1dGlsc18xLmlzU3RyaW5nKHN5c0lkKSkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIoc3lzSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN5c0lkIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzIG5vdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzeXNJZC5pbmRleE9mKFwiJ1wiKSAhPT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgc3lzSWQuaW5kZXhPZihcIlxcXCJcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN5c0lkIHNob3VsZCBub3QgY29udGFpbiBib3RoIHNpbmdsZSBxdW90ZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiBhbmQgZG91YmxlIHF1b3Rlc1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh1dGlsc18xLmlzVW5kZWZpbmVkKHN5c0lkKSkge1xuICAgICAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZCh0aGlzLnB1YklkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzeXNJZCBzaG91bGQgbm90IGJlIHVuZGVmaW5lZCBpZiBwdWJJZCBpc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIGRlZmluZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInN5c0lkIHNob3VsZCBiZSBhIHN0cmluZyBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zeXNJZCA9IHN5c0lkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IGF0dHJpYnV0ZS1saXN0IGRlY2xhcmF0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vXG4gICAgICogaW5kZXggaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBvZiB0aGUgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGF0dHJpYnV0ZS1saXN0IGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIFhtbER0ZC5wcm90b3R5cGUuYXR0bGlzdCA9IGZ1bmN0aW9uICh0ZXh0LCBpbmRleCkge1xuICAgICAgICB2YXIgYXR0bGlzdCA9IG5ldyBYbWxEdGRBdHRsaXN0XzEuZGVmYXVsdCh0ZXh0KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChhdHRsaXN0LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBhdHRsaXN0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBjb21tZW50IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZCxcbiAgICAgKiB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIGNvbW1lbnQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGNvbW1lbnQuXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5jb21tZW50ID0gZnVuY3Rpb24gKGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICAgIHZhciBjb21tZW50ID0gbmV3IFhtbENvbW1lbnRfMS5kZWZhdWx0KGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGNvbW1lbnQsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGNvbW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IGVsZW1lbnQgZGVjbGFyYXRpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBvZiB0aGUgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBYbWxEdGQucHJvdG90eXBlLmVsZW1lbnQgPSBmdW5jdGlvbiAodGV4dCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgWG1sRHRkRWxlbWVudF8xLmRlZmF1bHQodGV4dCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoZWxlbWVudCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgZW50aXR5IGRlY2xhcmF0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgb2YgdGhlIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgZW50aXR5IGRlY2xhcmF0aW9uLlxuICAgICAqL1xuICAgIFhtbER0ZC5wcm90b3R5cGUuZW50aXR5ID0gZnVuY3Rpb24gKHRleHQsIGluZGV4KSB7XG4gICAgICAgIHZhciBlbnRpdHkgPSBuZXcgWG1sRHRkRW50aXR5XzEuZGVmYXVsdCh0ZXh0KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChlbnRpdHksIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBub2RlIGludG8gdGhpcyBub2RlJ3MgY2hpbGRyZW4gYXQgdGhlIHNwZWNpZmllZFxuICAgICAqIGluZGV4LiBUaGUgbm9kZSBpcyBub3QgaW5zZXJ0ZWQgaWYgaXQgaXMgYWxyZWFkeSBwcmVzZW50LiBJZiB0aGlzIG5vZGVcbiAgICAgKiBhbHJlYWR5IGhhcyBhIHBhcmVudCwgaXQgaXMgcmVtb3ZlZCBmcm9tIHRoYXQgcGFyZW50LlxuICAgICAqXG4gICAgICogT25seSB7QGxpbmsgWG1sQ29tbWVudH0sIHtAbGluayBYbWxEdGRBdHRsaXN0fSwge0BsaW5rIFhtbER0ZEVsZW1lbnR9LFxuICAgICAqIHtAbGluayBYbWxEdGRFbnRpdHl9LCB7QGxpbmsgWG1sRHRkTm90YXRpb259LCBhbmQge0BsaW5rIFhtbFByb2NJbnN0fVxuICAgICAqIG5vZGVzIGNhbiBiZSBpbnNlcnRlZDsgb3RoZXJ3aXNlIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBub2RlIHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgbm9kZS4gTm9kZXMgYXQgb3IgYWZ0ZXJcbiAgICAgKiAgICAgICAgICAgICAgdGhlIGluZGV4IGFyZSBzaGlmdGVkIHRvIHRoZSByaWdodC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiAgICAgICAgICAgICAgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5vZGUgaW5zZXJ0ZWQgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiwgb3IgdW5kZWZpbmVkIGlmIG5vXG4gICAgICogICAgICAgICAgbm9kZSB3YXMgaW5zZXJ0ZWQuXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sQ29tbWVudF8xLmRlZmF1bHQgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbER0ZEF0dGxpc3RfMS5kZWZhdWx0IHx8XG4gICAgICAgICAgICBub2RlIGluc3RhbmNlb2YgWG1sRHRkRWxlbWVudF8xLmRlZmF1bHQgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbER0ZEVudGl0eV8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxEdGROb3RhdGlvbl8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxEdGRQYXJhbUVudGl0eVJlZl8xLmRlZmF1bHQgfHxcbiAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBYbWxQcm9jSW5zdF8xLmRlZmF1bHQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibm9kZSBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2YgWG1sQ29tbWVudCxcIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sRHRkQXR0bGlzdCwgWG1sRHRkRWxlbWVudCwgWG1sRHRkRW50aXR5LFwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxEdGROb3RhdGlvbiwgWG1sRHRkUGFyYW1FbnRpdHlSZWYsIG9yXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbFByb2NJbnN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmluc2VydENoaWxkLmNhbGwodGhpcywgbm9kZSwgaW5kZXgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBub3RhdGlvbiBkZWNsYXJhdGlvbiBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpc1xuICAgICAqIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IG9mIHRoZSBub3RhdGlvbiBkZWNsYXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXNcbiAgICAgKiAgICAgICAgICAgICAgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgbm90YXRpb24gZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5ub3RhdGlvbiA9IGZ1bmN0aW9uICh0ZXh0LCBpbmRleCkge1xuICAgICAgICB2YXIgbm90YXRpb24gPSBuZXcgWG1sRHRkTm90YXRpb25fMS5kZWZhdWx0KHRleHQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKG5vdGF0aW9uLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBub3RhdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgcGFyYW1ldGVyIGVudGl0eSByZWZlcmVuY2UgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm9cbiAgICAgKiBpbmRleCBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRpdHkgVGhlIGVudGl0eSB0byByZWZlcmVuY2UuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIHBhcmFtZXRlciBlbnRpdHkgcmVmZXJlbmNlLlxuICAgICAqL1xuICAgIFhtbER0ZC5wcm90b3R5cGUucGFyYW1FbnRpdHlSZWYgPSBmdW5jdGlvbiAoZW50aXR5LCBpbmRleCkge1xuICAgICAgICB2YXIgcGFyYW1FbnRpdHkgPSBuZXcgWG1sRHRkUGFyYW1FbnRpdHlSZWZfMS5kZWZhdWx0KGVudGl0eSk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQocGFyYW1FbnRpdHksIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHBhcmFtRW50aXR5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBwcm9jZXNzaW5nIGluc3RydWN0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4XG4gICAgICogaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkYXRhIG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLCBvciB1bmRlZmluZWQgaWZcbiAgICAgKiAgICAgICAgICAgICAgICB0aGVyZSBpcyBubyB0YXJnZXQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS5wcm9jSW5zdCA9IGZ1bmN0aW9uICh0YXJnZXQsIGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICAgIHZhciBwcm9jSW5zdCA9IG5ldyBYbWxQcm9jSW5zdF8xLmRlZmF1bHQodGFyZ2V0LCBjb250ZW50KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChwcm9jSW5zdCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gcHJvY0luc3Q7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRHRkLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBvcHRpb25zT2JqID0gbmV3IG9wdGlvbnNfMS5TdHJpbmdPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB2YXIgc3RyID0gXCI8IURPQ1RZUEUgXCIgKyB0aGlzLm5hbWU7XG4gICAgICAgIGlmICh1dGlsc18xLmlzVW5kZWZpbmVkKHRoaXMucHViSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQodGhpcy5zeXNJZCkpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCIgXCI7XG4gICAgICAgICAgICAgICAgc3RyID0gYXBwZW5kSWQoXCJTWVNURU1cIiwgdGhpcy5zeXNJZCwgc3RyLCBvcHRpb25zT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0ciArPSBcIiBcIjtcbiAgICAgICAgICAgIHN0ciA9IGFwcGVuZElkKFwiUFVCTElDXCIsIHRoaXMucHViSWQsIHN0ciwgb3B0aW9uc09iaik7XG4gICAgICAgICAgICBzdHIgPSBhcHBlbmRJZChcIlwiLCB0aGlzLnN5c0lkLCBzdHIsIG9wdGlvbnNPYmopO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHN0ciArPSBcIiBbXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fY2hpbGRyZW47IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmoucHJldHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBvcHRpb25zT2JqLm5ld2xpbmUgKyBvcHRpb25zT2JqLmluZGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyICs9IG5vZGUudG9TdHJpbmcob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9uc09iai5wcmV0dHkpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gb3B0aW9uc09iai5uZXdsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9IFwiXT5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0ciArPSBcIj5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZDtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbER0ZDtcbi8qKlxuICogQXBwZW5kcyB0aGUgWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHB1YmxpYyBvciBzeXN0ZW0gaWRlbnRpZmllciB0b1xuICogYW4gZXhpc3Rpbmcgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB0eXBlIFwiU1lTVEVNXCIsIFwiUFVCTElDXCIsIG9yIFwiXCIuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBpZGVudGlmaWVyLlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHdoaWNoIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gc2hvdWxkIGJlIGFwcGVuZGVkLlxuICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICpcbiAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhcHBlbmRJZCh0eXBlLCB2YWx1ZSwgc3RyLCBvcHRpb25zKSB7XG4gICAgc3RyICs9IHR5cGUgKyBcIiBcIjtcbiAgICBpZiAob3B0aW9ucy5kb3VibGVRdW90ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoXCJcXFwiXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucy5kb3VibGVRdW90ZXMgaW5jb25zaXN0ZW50IHdpdGhcIlxuICAgICAgICAgICAgICAgICsgXCIgc3lzSWQgb3IgcHViSWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IFwiXFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKFwiJ1wiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMuZG91YmxlUXVvdGVzIGluY29uc2lzdGVudCB3aXRoXCJcbiAgICAgICAgICAgICAgICArIFwiIHN5c0lkIG9yIHB1YklkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN0ciArPSBcIidcIiArIHZhbHVlICsgXCInXCI7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24gaW4gYSBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQW4gWE1MIGF0dHJpYnV0ZS1saXN0IGRlY2xhcmF0aW9uIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHt0ZXh0fWBcbiAqIGlzIHRoZSB0ZXh0IG9mIHRoZSBkZWNsYXJhdGlvbjpcbiAqXG4gKiBgYGB4bWxcbiAqIDwhQVRUTElTVCB7dGV4dH0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt0ZXh0fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRHRkQXR0bGlzdCBub2RlcyBjYW5ub3QgaGF2ZSBhbnkgY2hpbGRyZW4uXG4gKi9cbnZhciBYbWxEdGRBdHRsaXN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRHRkQXR0bGlzdCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbER0ZEF0dGxpc3R9IGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sRHRkQXR0bGlzdCh0ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGRBdHRsaXN0LnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4gVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBhdHRyaWJ1dGUtbGlzdCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgYXR0cmlidXRlLWxpc3QgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGV4dCBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZUNoYXIodGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBub3QgYWxsb3dlZCBpbiBYTUxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkQXR0bGlzdH0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkQXR0bGlzdC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEF0dGxpc3Qgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRBdHRsaXN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEF0dGxpc3QucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEF0dGxpc3Qgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRBdHRsaXN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRBdHRsaXN0LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEF0dGxpc3Qgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRBdHRsaXN0fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkQXR0bGlzdC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEF0dGxpc3Qgbm9kZXMgY2Fubm90IGhhdmUgY2hpbGRyZW5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRHRkQXR0bGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gXCI8IUFUVExJU1QgXCIgKyB0aGlzLnRleHQgKyBcIj5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxEdGRBdHRsaXN0O1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRHRkQXR0bGlzdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbm9kZXMvWG1sRHRkQXR0bGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbiBpbiBhIGRvY3VtZW50IHR5cGUgZGVmaW5pdGlvbi5cbiAqXG4gKiBBbiBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbiBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7dGV4dH1gIGlzIHRoZVxuICogdGV4dCBvZiB0aGUgZGVjbGFyYXRpb246XG4gKlxuICogYGBgeG1sXG4gKiA8IUVMRU1FTlQge3RleHR9PlxuICogYGBgXG4gKlxuICogVGhlIGB7dGV4dH1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbER0ZEVsZW1lbnQgbm9kZXMgY2Fubm90IGhhdmUgYW55IGNoaWxkcmVuLlxuICovXG52YXIgWG1sRHRkRWxlbWVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbER0ZEVsZW1lbnQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEdGRFbGVtZW50fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVsZW1lbnQgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sRHRkRWxlbWVudCh0ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGRFbGVtZW50LnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbGVtZW50IGRlY2xhcmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZWxlbWVudCBkZWNsYXJhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0ZXh0IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcih0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG5vdCBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRFbGVtZW50fSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRFbGVtZW50LnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkRWxlbWVudCBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEdGRFbGVtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIjwhRUxFTUVOVCBcIiArIHRoaXMudGV4dCArIFwiPlwiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZEVsZW1lbnQ7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxEdGRFbGVtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGRFbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9YbWxOb2RlXCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBlbnRpdHkgZGVjbGFyYXRpb24gaW4gYSBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQW4gWE1MIGVudGl0eSBkZWNsYXJhdGlvbiBpcyBzdHJ1Y3R1cmVkIGFzIGZvbGxvd3MsIHdoZXJlIGB7dGV4dH1gIGlzIHRoZVxuICogdGV4dCBvZiB0aGUgZGVjbGFyYXRpb246XG4gKlxuICogYGBgeG1sXG4gKiA8IUVOVElUWSB7dGV4dH0+XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHt0ZXh0fWAgdmFsdWUgaXMgYSBwcm9wZXJ0eSBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRHRkRW50aXR5IG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbER0ZEVudGl0eSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFhtbER0ZEVudGl0eSwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIFhtbER0ZEVudGl0eX0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbnRpdHkgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gWG1sRHRkRW50aXR5KHRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbER0ZEVudGl0eS5wcm90b3R5cGUsIFwidGV4dFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbnRpdHkgZGVjbGFyYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBlbnRpdHkgZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIGVudGl0eSBkZWNsYXJhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJ0ZXh0IHNob3VsZCBiZSBhIHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF2YWxpZGF0ZV8xLnZhbGlkYXRlQ2hhcih0ZXh0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgc2hvdWxkIG5vdCBjb250YWluIGNoYXJhY3RlcnNcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIG5vdCBhbGxvd2VkIGluIFhNTFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRFbnRpdHl9IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVudGl0eS5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEVudGl0eSBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVudGl0eX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRFbnRpdHkucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEVudGl0eSBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVudGl0eX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkRW50aXR5LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEVudGl0eSBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZEVudGl0eX0gbm9kZXMgY2Fubm90IGhhdmUgYW55XG4gICAgICogY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZEVudGl0eS5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZEVudGl0eSBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEdGRFbnRpdHkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgcmV0dXJuIFwiPCFFTlRJVFkgXCIgKyB0aGlzLnRleHQgKyBcIj5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxEdGRFbnRpdHk7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxEdGRFbnRpdHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZEVudGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgbm90YXRpb24gZGVjbGFyYXRpb24gaW4gYSBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQW4gWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHt0ZXh0fWAgaXMgdGhlXG4gKiB0ZXh0IG9mIHRoZSBkZWNsYXJhdGlvbjpcbiAqXG4gKiBgYGB4bWxcbiAqIDwhTk9UQVRJT04ge3RleHR9PlxuICogYGBgXG4gKlxuICogVGhlIGB7dGV4dH1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbER0ZE5vdGF0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRHRkTm90YXRpb24sIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEdGROb3RhdGlvbn0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBhc3NvY2lhdGVkIHdpdGggdGhlIFhNTCBub3RhdGlvbiBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGROb3RhdGlvbih0ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGROb3RhdGlvbi5wcm90b3R5cGUsIFwidGV4dFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgbm90YXRpb24gZGVjbGFyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgWE1MIG5vdGF0aW9uIGRlY2xhcmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzU3RyaW5nKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRleHQgc2hvdWxkIGJlIGEgc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXZhbGlkYXRlXzEudmFsaWRhdGVDaGFyKHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZE5vdGF0aW9ufSBub2RlcyBjYW5ub3QgaGF2ZSBhbnlcbiAgICAgKiBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGROb3RhdGlvbi5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkTm90YXRpb259IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkTm90YXRpb24ucHJvdG90eXBlLmluc2VydENoaWxkID0gZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkTm90YXRpb259IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZE5vdGF0aW9uLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBzaW5jZSB7QGxpbmsgWG1sRHRkTm90YXRpb259IG5vZGVzIGNhbm5vdCBoYXZlIGFueVxuICAgICAqIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGROb3RhdGlvbi5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZE5vdGF0aW9uIG5vZGVzIGNhbm5vdCBoYXZlIGNoaWxkcmVuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEZvcm1hdHRpbmcgb3B0aW9ucyBmb3IgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbER0ZE5vdGF0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHJldHVybiBcIjwhTk9UQVRJT04gXCIgKyB0aGlzLnRleHQgKyBcIj5cIjtcbiAgICB9O1xuICAgIHJldHVybiBYbWxEdGROb3RhdGlvbjtcbn0oWG1sTm9kZV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFhtbER0ZE5vdGF0aW9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxEdGROb3RhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vdmFsaWRhdGVcIik7XG52YXIgWG1sTm9kZV8xID0gcmVxdWlyZShcIi4vWG1sTm9kZVwiKTtcbi8qKlxuICogUmVwcmVzZW50cyBhbiBYTUwgcGFyYW1ldGVyIGVudGl0eSByZWZlcmVuY2UgaW4gYSBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQW4gWE1MIHBhcmFtZXRlciBlbnRpdHkgcmVmZXJlbmNlIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHtlbnRpdHl9YFxuICogaXMgdGhlIG5hbWUgb2YgdGhlIGVudGl0eTpcbiAqXG4gKiBgYGB4bWxcbiAqICV7ZW50aXR5fTtcbiAqIGBgYFxuICpcbiAqIFRoZSBge2VudGl0eX1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhpcyBub2RlLlxuICpcbiAqIFhtbER0ZFBhcmFtRW50aXR5UmVmIG5vZGVzIGNhbm5vdCBoYXZlIGFueSBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbER0ZFBhcmFtRW50aXR5UmVmID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRHRkUGFyYW1FbnRpdHlSZWYsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEdGRQYXJhbUVudGl0eVJlZn0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50aXR5IFRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxEdGRQYXJhbUVudGl0eVJlZihlbnRpdHkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZW50aXR5ID0gZW50aXR5O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYbWxEdGRQYXJhbUVudGl0eVJlZi5wcm90b3R5cGUsIFwiZW50aXR5XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGVudGl0eSB0byBiZSByZWZlcmVuY2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbnRpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBlbnRpdHkgdG8gYmUgcmVmZXJlbmNlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGVudGl0eSBUaGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhlbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImVudGl0eSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZU5hbWUoZW50aXR5KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVudGl0eSBzaG91bGQgbm90IGNvbnRhaW4gY2hhcmFjdGVyc1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgbm90IGFsbG93ZWQgaW4gWE1MIG5hbWVzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZW50aXR5ID0gZW50aXR5O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHNpbmNlIHtAbGluayBYbWxEdGRQYXJhbUVudGl0eVJlZn0gbm9kZXMgY2Fubm90IGhhdmVcbiAgICAgKiBhbnkgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkUGFyYW1FbnRpdHlSZWYucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRQYXJhbUVudGl0eVJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZFBhcmFtRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZVxuICAgICAqIGFueSBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhpcyBwYXJhbWV0ZXIgaXMgdW51c2VkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyBtZXRob2QgZG9lcyBub3QgcmV0dXJuLlxuICAgICAqL1xuICAgIFhtbER0ZFBhcmFtRW50aXR5UmVmLnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRQYXJhbUVudGl0eVJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZFBhcmFtRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZVxuICAgICAqIGFueSBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBub2RlIFRoaXMgcGFyYW1ldGVyIGlzIHVudXNlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgbWV0aG9kIGRvZXMgbm90IHJldHVybi5cbiAgICAgKi9cbiAgICBYbWxEdGRQYXJhbUVudGl0eVJlZi5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRQYXJhbUVudGl0eVJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRocm93cyBhbiBleGNlcHRpb24gc2luY2Uge0BsaW5rIFhtbER0ZFBhcmFtRW50aXR5UmVmfSBub2RlcyBjYW5ub3QgaGF2ZVxuICAgICAqIGFueSBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGlzIHBhcmFtZXRlciBpcyB1bnVzZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIG1ldGhvZCBkb2VzIG5vdCByZXR1cm4uXG4gICAgICovXG4gICAgWG1sRHRkUGFyYW1FbnRpdHlSZWYucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEdGRQYXJhbUVudGl0eVJlZiBub2RlcyBjYW5ub3QgaGF2ZSBjaGlsZHJlblwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxEdGRQYXJhbUVudGl0eVJlZi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gXCIlXCIgKyB0aGlzLmVudGl0eSArIFwiO1wiO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbER0ZFBhcmFtRW50aXR5UmVmO1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRHRkUGFyYW1FbnRpdHlSZWY7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbER0ZFBhcmFtRW50aXR5UmVmLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgTWljaGFlbCBLb3VybGFzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9vcHRpb25zXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuLi92YWxpZGF0ZVwiKTtcbnZhciBYbWxBdHRyaWJ1dGVfMSA9IHJlcXVpcmUoXCIuL1htbEF0dHJpYnV0ZVwiKTtcbnZhciBYbWxBdHRyaWJ1dGVUZXh0XzEgPSByZXF1aXJlKFwiLi9YbWxBdHRyaWJ1dGVUZXh0XCIpO1xudmFyIFhtbENkYXRhXzEgPSByZXF1aXJlKFwiLi9YbWxDZGF0YVwiKTtcbnZhciBYbWxDaGFyRGF0YV8xID0gcmVxdWlyZShcIi4vWG1sQ2hhckRhdGFcIik7XG52YXIgWG1sQ2hhclJlZl8xID0gcmVxdWlyZShcIi4vWG1sQ2hhclJlZlwiKTtcbnZhciBYbWxDb21tZW50XzEgPSByZXF1aXJlKFwiLi9YbWxDb21tZW50XCIpO1xudmFyIFhtbEVudGl0eVJlZl8xID0gcmVxdWlyZShcIi4vWG1sRW50aXR5UmVmXCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG52YXIgWG1sUHJvY0luc3RfMSA9IHJlcXVpcmUoXCIuL1htbFByb2NJbnN0XCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBlbGVtZW50LlxuICpcbiAqIEEgc2FtcGxlIFhNTCBlbGVtZW50IGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93cywgd2hlcmUgYHtuYW1lfWAgaXMgdGhlIG5hbWVcbiAqIG9mIHRoZSBlbGVtZW50OlxuICpcbiAqIGBgYHhtbFxuICogPHtuYW1lfSBhdHRuYW1lPVwiYXR0dmFsdWVcIj5cbiAqICAgICA8c3ViZWxlbS8+XG4gKiAgICAgPD9waXRhcmdldCBwaWNvbnRlbnQ/PlxuICogICAgIHRleHRcbiAqIDwve25hbWV9PjwvcHJlPlxuICogYGBgXG4gKlxuICogVGhlIGB7bmFtZX1gIHZhbHVlIGlzIGEgcHJvcGVydHkgb2YgdGhlIG5vZGUsIHdoaWxlIHRoZSBhdHRyaWJ1dGVzIGFuZFxuICogY2hpbGRyZW4gb2YgdGhlIGVsZW1lbnQgKHN1Y2ggYXMgb3RoZXIgZWxlbWVudHMsIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25zLFxuICogYW5kIHRleHQpIGFyZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRWxlbWVudCBub2RlcyBjYW4gaGF2ZSBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIHtAbGluayBYbWxBdHRyaWJ1dGV9LFxuICoge0BsaW5rIFhtbENkYXRhfSwge0BsaW5rIFhtbENoYXJSZWZ9LCB7QGxpbmsgWG1sQ29tbWVudH0sXG4gKiB7QGxpbmsgWG1sRWxlbWVudH0sIHtAbGluayBYbWxFbnRpdHlSZWZ9LCB7QGxpbmsgWG1sUHJvY0luc3R9LCBvclxuICoge0BsaW5rIFhtbENoYXJEYXRhfSBub2RlcyBhcyBjaGlsZHJlbi5cbiAqL1xudmFyIFhtbEVsZW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhYbWxFbGVtZW50LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgWG1sRWxlbWVudH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBYbWxFbGVtZW50KG5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhtbEVsZW1lbnQucHJvdG90eXBlLCBcIm5hbWVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgVGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgbmFtZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibmFtZSBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdmFsaWRhdGVfMS52YWxpZGF0ZU5hbWUobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJuYW1lIHNob3VsZCBub3QgY29udGFpbiBjaGFyYWN0ZXJzIG5vdFwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgYWxsb3dlZCBpbiBYTUwgbmFtZXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhbiBuZXcgYXR0cmlidXRlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGUuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0b1xuICAgICAqICAgICAgICBYbWxBdHRyaWJ1dGVUZXh0IG5vZGVzLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpc1xuICAgICAqICAgICAgICAgICAgICBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7WG1sQXR0cmlidXRlfSBUaGUgbmV3bHkgY3JlYXRlZCBhdHRyaWJ1dGUuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuYXR0cmlidXRlID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBpbmRleCkge1xuICAgICAgICBpZiAodXRpbHNfMS5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IFhtbEF0dHJpYnV0ZVRleHRfMS5kZWZhdWx0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1dGlsc18xLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzXzEuaXNTdHJpbmcodmFsdWVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlW2ldID0gbmV3IFhtbEF0dHJpYnV0ZVRleHRfMS5kZWZhdWx0KHZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IG5ldyBYbWxBdHRyaWJ1dGVfMS5kZWZhdWx0KG5hbWUsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChhdHRyaWJ1dGUsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgbm9kZSB0aGF0IGFyZVxuICAgICAqIGluc3RhbmNlcyBvZiB7QGxpbmsgWG1sQXR0cmlidXRlfS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGUgdGhhdCBhcmVcbiAgICAgKiAgICAgICAgICBpbnN0YW5jZXMgb2Yge0BsaW5rIFhtbEF0dHJpYnV0ZX0uXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuYXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIFhtbEF0dHJpYnV0ZV8xLmRlZmF1bHQ7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBDREFUQSBzZWN0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIENEQVRBIHNlY3Rpb24uXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIENEQVRBIHNlY3Rpb24uXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuY2RhdGEgPSBmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNkYXRhID0gbmV3IFhtbENkYXRhXzEuZGVmYXVsdChjb250ZW50KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChjZGF0YSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY2RhdGE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHNvbWUgY2hhcmFjdGVyIGRhdGEgYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXggaXNcbiAgICAgKiBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhckRhdGEgQ2hhcmFjdGVyIGRhdGEuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIHRleHQgbm9kZS5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5jaGFyRGF0YSA9IGZ1bmN0aW9uIChjaGFyRGF0YSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNoYXJEYXRhTm9kZSA9IG5ldyBYbWxDaGFyRGF0YV8xLmRlZmF1bHQoY2hhckRhdGEpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGNoYXJEYXRhTm9kZSwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY2hhckRhdGFOb2RlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBjaGFyYWN0ZXIgcmVmZXJlbmNlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4XG4gICAgICogaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYXIgVGhlIGNoYXJhY3RlciB0byByZXByZXNlbnQgdXNpbmcgdGhlIHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gaGV4IFdoZXRoZXIgdG8gdXNlIHRoZSBoZXhhZGVjaW1hbCBvciBkZWNpbWFsIHJlcHJlc2VudGF0aW9uIGZvclxuICAgICAqICAgICAgICAgICAgdGhlIHJlZmVyZW5jZS4gSWYgbGVmdCB1bmRlZmluZWQsIGRlY2ltYWwgaXMgdGhlIGRlZmF1bHQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGNoYXJhY3RlciByZWZlcmVuY2UuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuY2hhclJlZiA9IGZ1bmN0aW9uIChjaGFyLCBoZXgsIGluZGV4KSB7XG4gICAgICAgIHZhciBjaGFyUmVmID0gbmV3IFhtbENoYXJSZWZfMS5kZWZhdWx0KGNoYXIsIGhleCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoY2hhclJlZiwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY2hhclJlZjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgY29tbWVudCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWQsXG4gICAgICogdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkYXRhIG9mIHRoZSBjb21tZW50LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpc1xuICAgICAqICAgICAgICAgICAgICBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBjb21tZW50LlxuICAgICAqL1xuICAgIFhtbEVsZW1lbnQucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGNvbW1lbnQgPSBuZXcgWG1sQ29tbWVudF8xLmRlZmF1bHQoY29udGVudCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoY29tbWVudCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gY29tbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWQsXG4gICAgICogdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpc1xuICAgICAqICAgICAgICAgICAgICBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBlbGVtZW50LlxuICAgICAqL1xuICAgIFhtbEVsZW1lbnQucHJvdG90eXBlLmVsZW1lbnQgPSBmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgWG1sRWxlbWVudChuYW1lKTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChlbGVtZW50LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBlbnRpdHkgcmVmZXJlbmNlIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4IGlzXG4gICAgICogc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudGl0eSBUaGUgZW50aXR5IHRvIGJlIHJlZmVyZW5jZWQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIGVudGl0eSByZWZlcmVuY2UuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUuZW50aXR5UmVmID0gZnVuY3Rpb24gKGVudGl0eSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGVudGl0eVJlZiA9IG5ldyBYbWxFbnRpdHlSZWZfMS5kZWZhdWx0KGVudGl0eSk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoZW50aXR5UmVmLCBpbmRleCk7XG4gICAgICAgIHJldHVybiBlbnRpdHlSZWY7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuIGF0IHRoZSBzcGVjaWZpZWRcbiAgICAgKiBpbmRleC4gVGhlIG5vZGUgaXMgbm90IGluc2VydGVkIGlmIGl0IGlzIGFscmVhZHkgcHJlc2VudC4gSWYgdGhpcyBub2RlXG4gICAgICogYWxyZWFkeSBoYXMgYSBwYXJlbnQsIGl0IGlzIHJlbW92ZWQgZnJvbSB0aGF0IHBhcmVudC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBvbmx5IHtAbGluayBYbWxBdHRyaWJ1dGV9LCB7QGxpbmsgWG1sQ2RhdGF9LFxuICAgICAqIHtAbGluayBYbWxDaGFyUmVmfSwge0BsaW5rIFhtbENvbW1lbnR9LCB7QGxpbmsgWG1sRWxlbWVudH0sXG4gICAgICoge0BsaW5rIFhtbEVudGl0eVJlZn0sIHtAbGluayBYbWxQcm9jSW5zdH0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0gbm9kZXNcbiAgICAgKiBjYW4gYmUgaW5zZXJ0ZWQ7IG90aGVyd2lzZSwgYW4gZXhjZXB0aW9uIHdpbGwgYmUgdGhyb3duLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gaW5zZXJ0LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBub2RlLiBOb2RlcyBhdCBvciBhZnRlclxuICAgICAqICAgICAgICAgICAgICB0aGUgaW5kZXggYXJlIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0LiBJZiBubyBpbmRleCBpc1xuICAgICAqICAgICAgICAgICAgICBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSBpbnNlcnRlZCBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuLCBvciB1bmRlZmluZWQgaWYgbm9cbiAgICAgKiAgICAgICAgICBub2RlIHdhcyBpbnNlcnRlZC5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5pbnNlcnRDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgWG1sQXR0cmlidXRlXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbENkYXRhXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbENoYXJSZWZfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sQ29tbWVudF8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxFbGVtZW50XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sRW50aXR5UmVmXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbFByb2NJbnN0XzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbm9kZSBpbnN0YW5jZW9mIFhtbENoYXJEYXRhXzEuZGVmYXVsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJub2RlIHNob3VsZCBiZSBhbiBpbnN0YW5jZSBvZiBYbWxBdHRyaWJ1dGUsXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbENkYXRhLCBYbWxDaGFyUmVmLCBYbWxDb21tZW50LFwiXG4gICAgICAgICAgICAgICAgKyBcIiBYbWxFbGVtZW50LCBYbWxFbnRpdHlSZWYsIFhtbFByb2NJbnN0LFwiXG4gICAgICAgICAgICAgICAgKyBcIiBvciBYbWxUZXh0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWG1sQXR0cmlidXRlXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLl9jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gaW5zdGFuY2VvZiBYbWxBdHRyaWJ1dGVfMS5kZWZhdWx0OyB9KTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgYXR0cmlidXRlc18xID0gYXR0cmlidXRlczsgX2kgPCBhdHRyaWJ1dGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNfMVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lID09PSBub2RlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZWxlbWVudCBhbHJlYWR5IGNvbnRhaW5zIGFuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgWG1sQXR0cmlidXRlIG9iamVjdCB3aXRoIG5hbWUgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgbm9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQuY2FsbCh0aGlzLCBub2RlLCBpbmRleCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gYXQgdGhlIHNwZWNpZmllZCBpbmRleC4gSWYgbm8gaW5kZXhcbiAgICAgKiBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGRhdGEgb2YgdGhlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24sIG9yIHVuZGVmaW5lZCBpZlxuICAgICAqICAgICAgICAgICAgICAgIHRoZXJlIGlzIG5vIHRhcmdldC5cbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBub2RlIHNob3VsZCBiZSBpbnNlcnRlZC4gSWYgbm8gaW5kZXhcbiAgICAgKiAgICAgICAgICAgICAgaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzXG4gICAgICogICAgICAgICAgICAgIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG5ld2x5IGNyZWF0ZWQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbi5cbiAgICAgKi9cbiAgICBYbWxFbGVtZW50LnByb3RvdHlwZS5wcm9jSW5zdCA9IGZ1bmN0aW9uICh0YXJnZXQsIGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICAgIHZhciBwcm9jSW5zdCA9IG5ldyBYbWxQcm9jSW5zdF8xLmRlZmF1bHQodGFyZ2V0LCBjb250ZW50KTtcbiAgICAgICAgdGhpcy5pbnNlcnRDaGlsZChwcm9jSW5zdCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gcHJvY0luc3Q7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRm9ybWF0dGluZyBvcHRpb25zIGZvciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG5vZGUuXG4gICAgICovXG4gICAgWG1sRWxlbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgb3B0aW9uc09iaiA9IG5ldyBvcHRpb25zXzEuU3RyaW5nT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXMoKTtcbiAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5fY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBhdHRyaWJ1dGVzLmluZGV4T2Yobm9kZSkgPT09IC0xOyB9KTtcbiAgICAgICAgLy8gRWxlbWVudCB0YWcgc3RhcnRcbiAgICAgICAgdmFyIHN0ciA9IFwiPFwiICsgdGhpcy5fbmFtZTtcbiAgICAgICAgLy8gQXR0cmlidXRlc1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGF0dHJpYnV0ZXNfMiA9IGF0dHJpYnV0ZXM7IF9pIDwgYXR0cmlidXRlc18yLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNfMltfaV07XG4gICAgICAgICAgICBzdHIgKz0gXCIgXCIgKyBhdHRyaWJ1dGUudG9TdHJpbmcob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hpbGQgbm9kZXNcbiAgICAgICAgaWYgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIEVsZW1lbnQgbm9uLWVtcHR5IHRhZyBlbmRcbiAgICAgICAgICAgIHN0ciArPSBcIj5cIjtcbiAgICAgICAgICAgIHZhciBpbmRlbnRlciA9IGZ1bmN0aW9uIChsaW5lKSB7IHJldHVybiBvcHRpb25zT2JqLmluZGVudCArIGxpbmU7IH07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0ciA9IG5leHQudG9TdHJpbmcob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSBpID4gMCA/IG5vZGVzW2kgLSAxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAvLyBMaW5lIGJyZWFrIGJlZm9yZSBjaGlsZCBub2RlcyB1bmxlc3MgYWxsIG5vZGVzLCBvciBhdCBsZWFzdFxuICAgICAgICAgICAgICAgIC8vIHRoZSBtb3N0IHJlY2VudCB0d28sIGFyZSBvZiB0eXBlIFhtbENoYXJhY3RlclJlZmVyZW5jZSxcbiAgICAgICAgICAgICAgICAvLyBYbWxFbnRpdHlSZWZlcmVuY2UsIG9yIFhtbENoYXJEYXRhXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmoucHJldHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsU2FtZUxpbmVOb2Rlcyhub2RlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPiAwICYmIG9uU2FtZUxpbmUobmV4dCwgcHJldikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IG9wdGlvbnNPYmoubmV3bGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RyID0gbmV4dFN0ci5zcGxpdChvcHRpb25zT2JqLm5ld2xpbmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoaW5kZW50ZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKG9wdGlvbnNPYmoubmV3bGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyICs9IG5leHRTdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMaW5lIGJyZWFrIGJlZm9yZSBlbmQgdGFnIHVubGVzcyBhbGwgbm9kZXMgYXJlIG9mIHR5cGVcbiAgICAgICAgICAgIC8vIFhtbENoYXJhY3RlclJlZmVyZW5jZSwgWG1sRW50aXR5UmVmZXJlbmNlLCBvciBYbWxDaGFyRGF0YVxuICAgICAgICAgICAgaWYgKG9wdGlvbnNPYmoucHJldHR5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGxTYW1lTGluZU5vZGVzKG5vZGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gb3B0aW9uc09iai5uZXdsaW5lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEVsZW1lbnQgZW5kIHRhZ1xuICAgICAgICAgICAgc3RyICs9IFwiPC9cIiArIHRoaXMuX25hbWUgKyBcIj5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVsZW1lbnQgZW1wdHkgdGFnIGVuZFxuICAgICAgICAgICAgc3RyICs9IFwiLz5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbEVsZW1lbnQ7XG59KFhtbE5vZGVfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBYbWxFbGVtZW50O1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBub2RlcyBhcmUgYWxsIG9mIHR5cGUge0BsaW5rIFhtbENoYXJSZWZ9LFxuICoge0BsaW5rIFhtbEVudGl0eVJlZn0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0uXG4gKlxuICogQHBhcmFtIG5vZGVzIFRoZSBzcGVjaWZpZWQgbm9kZXMuXG4gKlxuICogQHJldHVybnMgV2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBub2RlcyBhcmUgYWxsIG9mIHR5cGVcbiAqICAgICAgICAgIHtAbGluayBYbWxDaGFyUmVmfSwge0BsaW5rIFhtbEVudGl0eVJlZn0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWxsU2FtZUxpbmVOb2Rlcyhub2Rlcykge1xuICAgIGZvciAodmFyIF9pID0gMCwgbm9kZXNfMSA9IG5vZGVzOyBfaSA8IG5vZGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBub2RlID0gbm9kZXNfMVtfaV07XG4gICAgICAgIGlmICghKChub2RlIGluc3RhbmNlb2YgWG1sQ2hhclJlZl8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxFbnRpdHlSZWZfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sQ2hhckRhdGFfMS5kZWZhdWx0KSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgbm9kZXMgYXJlIGFsbCBvZiB0eXBlIHtAbGluayBYbWxDaGFyUmVmfSxcbiAqIHtAbGluayBYbWxFbnRpdHlSZWZ9LCBvciB7QGxpbmsgWG1sQ2hhckRhdGF9LlxuICpcbiAqIEBwYXJhbSBwcmV2IFRoZSBmaXJzdCBzcGVjaWZpZWQgbm9kZS5cbiAqIEBwYXJhbSBuZXh0IFRoZSBzZWNvbmQgc3BlY2lmaWVkIG5vZGUuXG4gKlxuICogQHJldHVybnMgV2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBub2RlcyBhcmUgYWxsIG9mIHR5cGVcbiAqICAgICAgICAgIHtAbGluayBYbWxDaGFyUmVmfSwge0BsaW5rIFhtbEVudGl0eVJlZn0sIG9yIHtAbGluayBYbWxDaGFyRGF0YX0uXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gb25TYW1lTGluZShwcmV2LCBuZXh0KSB7XG4gICAgcmV0dXJuIChwcmV2IGluc3RhbmNlb2YgWG1sQ2hhclJlZl8xLmRlZmF1bHRcbiAgICAgICAgfHwgcHJldiBpbnN0YW5jZW9mIFhtbEVudGl0eVJlZl8xLmRlZmF1bHRcbiAgICAgICAgfHwgcHJldiBpbnN0YW5jZW9mIFhtbENoYXJEYXRhXzEuZGVmYXVsdClcbiAgICAgICAgJiYgKG5leHQgaW5zdGFuY2VvZiBYbWxDaGFyUmVmXzEuZGVmYXVsdFxuICAgICAgICAgICAgfHwgbmV4dCBpbnN0YW5jZW9mIFhtbEVudGl0eVJlZl8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5leHQgaW5zdGFuY2VvZiBYbWxDaGFyRGF0YV8xLmRlZmF1bHQpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMveG1sY3JlYXRlL2xpYi9ub2Rlcy9YbWxFbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgU3RyaW5nXVwiO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBOdW1iZXJdXCI7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbGVhbih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBCb29sZWFuXVwiO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IFVuZGVmaW5lZF1cIjtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNOdWxsKHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IE51bGxdXCI7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHZhbClcbiAgICAgICAgfHwgaXNOdW1iZXIodmFsKVxuICAgICAgICB8fCBpc0Jvb2xlYW4odmFsKVxuICAgICAgICB8fCBpc1VuZGVmaW5lZCh2YWwpXG4gICAgICAgIHx8IGlzTnVsbCh2YWwpO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZ0FycmF5KHZhbCkge1xuICAgIGlmICghaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgX2kgPSAwLCB2YWxfMSA9IHZhbDsgX2kgPCB2YWxfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdmFsXzFbX2ldO1xuICAgICAgICBpZiAoIWlzU3RyaW5nKGVudHJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5pc1N0cmluZ0FycmF5ID0gaXNTdHJpbmdBcnJheTtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIjtcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzU2V0KHZhbCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gXCJbb2JqZWN0IFNldF1cIjtcbn1cbmV4cG9ydHMuaXNTZXQgPSBpc1NldDtcbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNNYXAodmFsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSBcIltvYmplY3QgTWFwXVwiO1xufVxuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgdmFsdWUsIGFzIGdpdmVuIGJ5IHRoZVxuICogdmFsdWUncyB0b1N0cmluZygpIG1ldGhvZCAoaWYgaXQgaGFzIG9uZSkgb3IgdGhlIGdsb2JhbCBTdHJpbmcoKSBmdW5jdGlvblxuICogKGlmIGl0IGRvZXMgbm90KS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMgQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnkodmFsdWUpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbHVlKSAmJiAhaXNOdWxsKHZhbHVlKSkge1xuICAgICAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUudG9TdHJpbmcpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG59XG5leHBvcnRzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzMnhtbHBhcnNlci9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSBcInN1cGVyYWdlbnRcIjtcbmltcG9ydCAqIGFzIGpzMnhtbCBmcm9tIFwianMyeG1scGFyc2VyXCI7XG5pbXBvcnQgeyBFbmNvZGUsIERlY29kZSwgY29udmVydFF1ZXJpZWRVcmwsIFF1ZXJ5IH0gZnJvbSBcIi4vdXRpbGl0eVwiO1xuXG4vL2ZvciB1c2luZyBQcm9taXNlIG9uIGVzNVxuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJlczYtcHJvbWlzZVwiO1xuXG4vKipcbiAqIFBlcnNvbml1beOBruOCouOCr+OCu+OCueODiOODvOOCr+ODs+aDheWgsVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bUFjY2Vzc1Rva2VuIHtcbiAgICBhY2Nlc3NfdG9rZW46IHN0cmluZyxcbiAgICByZWZyZXNoX3Rva2VuOiBzdHJpbmcsXG4gICAgZXhwaXJlc19pbjogbnVtYmVyLFxufVxuXG4vKipcbiAqIFBlcnNvbml1beOBruODrOOCueODneODs+OCueODh+ODvOOCv+Wei1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bVJlc3BvbnNlIHtcbiAgICBkOiB7XG4gICAgICAgIHJlc3VsdHM6IGFueSxcbiAgICB9XG59XG5cbi8qKlxuICogUGVyc29uaXVt44Gu44OH44O844K/5Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtRGF0YSB7XG4gICAgX19tZXRhZGF0YToge1xuICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgZXRhZzogc3RyaW5nLFxuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgfSxcbiAgICBfX3B1Ymxpc2hlZDogc3RyaW5nLCAvL0RhdGUoeHh4KVxuICAgIF9fdXBkYXRlZDogc3RyaW5nLCAvL0RhdGUoeHh4KVxufVxuXG4vKipcbiAqIOWklumDqOOCu+ODq+OBruODh+ODvOOCv+Wei1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dENlbGwgZXh0ZW5kcyBQZXJzb25pdW1EYXRhIHtcbiAgICBVcmw6IHN0cmluZyxcbiAgICBfUm9sZToge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIF9SZWxhdGlvbjoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfSxcbiAgICB9LFxufVxuXG4vKipcbiAqIOODq+ODvOODq+OBruWei1xuICogLy/lpInjgo/jgovjgYvjgoJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSdWxlIHtcbiAgICBFeHRlcm5hbD86IGJvb2xlYW4sXG4gICAgU2VydmljZTogc3RyaW5nLFxuICAgIEFjdGlvbjogc3RyaW5nLFxuICAgIFR5cGU6IHN0cmluZyxcbiAgICBPYmplY3Q6IHN0cmluZyxcbiAgICBcIl9Cb3guTmFtZVwiPzogc3RyaW5nLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjZSB7XG4gICAgXCJEOnByaW5jaXBhbFwiOiB7XG4gICAgICAgIFwiRDpocmVmXCI6IHN0cmluZyxcbiAgICB9LFxuICAgIFwiRDpncmFudFwiOiB7XG4gICAgICAgIHByaXZpbGVnZToge1thY2VUeXBlOiBzdHJpbmddOiB7fX1bXSxcbiAgICB9LFxufVxuZXhwb3J0IGludGVyZmFjZSBBY2wge1xuICAgIFwiQFwiOiB7XG4gICAgICAgIFwieG1sbnM6RFwiOiBcIkRBVjpcIixcbiAgICAgICAgXCJ4bWxuczpwXCI6IFwidXJuOngtcGVyc29uaXVtOnhtbG5zXCIsXG4gICAgfSxcbiAgICBcIkQ6YWNlXCI6IEFjZVtdLFxufVxuXG4vKipcbiAqIOOCueOCr+ODquODl+ODiOOBruWei1xuICogLy/lpInjgo/jgovjgYvjgoJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTY3JpcHQge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICB1cmk6IHN0cmluZyxcbn1cblxuLyoqXG4gKiBMaW5r5Z6LIEV4dENlbGzjga5MaW5r44Gq44GpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTGluayBleHRlbmRzIFBlcnNvbml1bURhdGEge1xuICAgIHVyaTogc3RyaW5nLFxufVxuXG4vKipcbiAqIFJvbGXlnotcbiAqLyBcbmV4cG9ydCBpbnRlcmZhY2UgUm9sZSBleHRlbmRzIFBlcnNvbml1bURhdGEge1xuICAgIE5hbWU6IHN0cmluZyxcbiAgICBcIl9Cb3guTmFtZVwiOiBzdHJpbmcsXG4gICAgX0JveDoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX0FjY291bnQ6IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9FeHRDZWxsOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfRXh0Um9sZToge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX1JlbGF0aW9uOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOWFrOmWi+OBleOCjOOBpuOBhOOCi+ODl+ODreODleOCo+ODvOODq+aDheWgseOBruODrOOCueODneODs+OCueWei1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bVByb2ZpbGVSZXNwb25zZSB7XG4gICAgRGlzcGxheU5hbWU6IHN0cmluZyxcbiAgICBEZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIEltYWdlOiBzdHJpbmcsXG4gICAgUHJvZmlsZUltYWdlTmFtZTogc3RyaW5nLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bUxhdW5jaEpzb24ge1xuICAgIHBlcnNvbmFsOiB7XG4gICAgICAgIHdlYjogc3RyaW5nLFxuICAgICAgICBhbmRyb2lkOiBzdHJpbmcsXG4gICAgICAgIGlvczogc3RyaW5nLFxuICAgICAgICBhcHBUb2tlbklkOiBzdHJpbmcsXG4gICAgICAgIGFwcFRva2VuUHc6IHN0cmluZyxcbiAgICB9XG59XG5cbi8qKlxuICog44Oh44OD44K744O844K46YCB5L+h44Gu44K/44Kk44OX5Z6LXG4gKi9cbmV4cG9ydCB0eXBlIE1lc3NhZ2VTZW5kVHlwZSA9IFxuICAgIFwibWVzc2FnZVwifCAvL+WNmOOBquOCi+ODoeODg+OCu+ODvOOCuOmAgeS/oVxuICAgIFwicmVxLnJlbGF0aW9uLmJ1aWxkXCJ8IC8v6Zai5L+C5oCn5qeL56+J5L6d6aC8XG4gICAgXCJyZXEucmVsYXRpb24uYnJlYWtcInwgLy/plqLkv4LmgKfnoLTmo4Tkvp3poLxcbiAgICBcInJlcS5yb2xlLmdyYW50XCJ8IC8v44Ot44O844Or6Kit5a6a5L6d6aC8XG4gICAgXCJyZXEucm9sZS5yZXZva2VcInwgLy/jg63jg7zjg6vnoLTmo4Tkvp3poLxcbiAgICBcInJlcS5ydWxlLnJlZ2lzdGVyXCJ8IC8v44Or44O844Or55m76Yyy5L6d6aC8XG4gICAgXCJyZXEucnVsZS51bnJlZ2lzdGVyXCIgLy/jg6vjg7zjg6vnoLTmo4Tkvp3poLxcbiAgICA7XG5cbi8qKlxuICogUGVyc29uaXVt44KS5omx44GG44Gf44KB44Gu44Kv44Op44Kk44Ki44Oz44OI44Op44Kk44OW44Op44OqXG4gKi9cbmV4cG9ydCBjbGFzcyBQZXJzb25pdW1DbGllbnQge1xuICAgIC8qKlxuICAgICAqIOODl+ODreODiOOCs+ODq++8iOODh+ODleOCqeODq+ODiDpodHRwc++8iVxuICAgICAqL1xuICAgIHByb3RvY29sOiBzdHJpbmcgPSBcImh0dHBzXCI7XG4gICAgLyoqXG4gICAgICogUGVyc29uaXVt44Gu44K144O844OQ44Ob44K544OI5ZCNXG4gICAgICovXG4gICAgaG9zdDogc3RyaW5nID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDjgqLjgq/jgrvjgrnjg4jjg7zjgq/jg7Pmg4XloLFcbiAgICAgKi9cbiAgICBwZXJzb25pdW1Ub2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs1xuICAgICAqL1xuICAgIHRva2VuOiBzdHJpbmcgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs+OBruacieWKueacn+mZkFxuICAgICAqL1xuICAgIGV4cGlyZXNJbjogbnVtYmVyID0gMzYwMDtcbiAgICAvKipcbiAgICAgKiDjg63jgrDjgqTjg7PmmYLliLsgLSDoqo3oqLzjga7mnInlirnmnJ/pmZDlhoXjgYvjganjgYbjgYvjgpLnorroqo1cbiAgICAgKi9cbiAgICBsb2dpblRpbWU6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogZXhwaXJl44GX44Gf44GT44Go44GM56K66KqN44GV44KM44Gf44Go44GN44Gr5ZG844Gz5Ye644GZ44Kz44O844Or44OQ44OD44KvXG4gICAgICovXG4gICAgZXhwaXJlQ2FsbGJhY2s6IChyZWZyZXNoVG9rZW46IHN0cmluZyk9PnZvaWQ7XG4gICAgLyoqXG4gICAgICogZXhwaXJl44Gu56K66KqN44K/44Kk44Oe44O8XG4gICAgICovXG4gICAgZXhwaXJlQ2FsbGJhY2tUaW1lcjogYW55ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgICAqIEBwYXJhbSB1bml0IOODm+OCueODiOWQjSBcbiAgICAgKiBAcGFyYW0gcHJvdG9jb2wg44OX44Ot44OI44Kz44OrXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodW5pdDogc3RyaW5nLCBwcm90b2NvbD86IHN0cmluZykge1xuICAgICAgICBpZiAoIXVuaXQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlBsZWFzZSBzZXQgYGhvc3RgIGFkZHJlc3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodW5pdC5sYXN0SW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImBob3N0YCBkb2VzIG5vdCBuZWVkIHByb3RvY29sIHByZWZpeFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwcm90b2NvbCl7XG4gICAgICAgICAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob3N0ID0gdW5pdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDoqo3oqLzjga7mnInlirnmgKfjg4Hjgqfjg4Pjgq9cbiAgICAgKi9cbiAgICBhdXRoVmFsaWRhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICgrbmV3IERhdGUoKS10aGlzLmxvZ2luVGltZSkvMTAwMCA8IHRoaXMuZXhwaXJlc0luO1xuICAgICAgICBpZighcmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLmV4cGlyZUNhbGxiYWNrICYmIHRoaXMuZXhwaXJlQ2FsbGJhY2sodGhpcy5wZXJzb25pdW1Ub2tlbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk1heWJlIHlvdSBoYXZlIHRvIHJlLWxvZ2luIHdoaWxlIHlvdXIgdG9rZW4gaXMgZXhwaXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcnNvbml1beOBuOODreOCsOOCpOODs1xuICAgICAqIEBwYXJhbSBjZWxsIOODreOCsOOCpOODs+WvvuixoeOBruOCu+ODq+WQjSBcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUg44Om44O844K25ZCNXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIOODkeOCueODr+ODvOODiVxuICAgICAqIEBwYXJhbSBleHBpcmVDYWxsYmFjayDmnInlirnmnJ/pmZDjgYzliIfjgozpmpvjgavlkbzjgbPlh7rjgZnjgrPjg7zjg6vjg5Djg4Pjgq8gXG4gICAgICovXG4gICAgbG9naW4oY2VsbDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBleHBpcmVDYWxsYmFjaz86IChyZWZyZXNoVG9rZW46IHN0cmluZyk9PnZvaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2sgPSBleHBpcmVDYWxsYmFjayAmJiBleHBpcmVDYWxsYmFjaztcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgdXNlcm5hbWUsIHBhc3N3b3JkIH0pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZXNJbiA9IHRva2VuLmV4cGlyZXNfaW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luVGltZSA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDjgr/jgqTjg6DjgqLjgqbjg4jjgpLopovjgotcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSBOdW1iZXIodGhpcy5leHBpcmVzSW4pICogOTk5OyAvL+ebtOWJjeOBq+aVmeOBiOOBpuOBguOBkuOCi1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFja1RpbWVyID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFjayAmJiB0aGlzLmV4cGlyZUNhbGxiYWNrKHRva2VuLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2NoZW1h6KqN6Ki844OI44O844Kv44Oz44Gu5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg5YCL5Lq644Gu44K744OrIFxuICAgICAqIEBwYXJhbSB1c2VybmFtZSDjg6bjg7zjgrblkI1cbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQg44OR44K544Ov44O844OJXG4gICAgICogQHBhcmFtIGFwcENlbGwg44Ki44OX44Oq44K744OrXG4gICAgICogQHBhcmFtIGFwcElkIOOCouODl+ODquOCu+ODq0lkXG4gICAgICogQHBhcmFtIGFwcFBhc3Mg44Ki44OX44Oq44K744OrUGFzc1xuICAgICAqL1xuICAgIGFwcExvZ2luKGNlbGw6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgYXBwQ2VsbDogc3RyaW5nLCBhcHBJZDogc3RyaW5nLCBhcHBQYXNzOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsVXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgYXBwQ2VsbFVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShhcHBDZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IGFwcENlbGxUb2tlblVybCA9IGFwcENlbGxVcmwgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdChhcHBDZWxsVG9rZW5VcmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgdXNlcm5hbWU6IGFwcElkLCBwYXNzd29yZDogYXBwUGFzcywgcF90YXJnZXQ6IGNlbGxVcmwgfSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFwcFRva2VuOiBQZXJzb25pdW1BY2Nlc3NUb2tlbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hVG9rZW5VcmwgPSBjZWxsVXJsICsgXCJfX3Rva2VuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdChzY2hlbWFUb2tlblVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLCB1c2VybmFtZSwgcGFzc3dvcmQsIGNsaWVudF9pZDogYXBwQ2VsbFVybCwgY2xpZW50X3NlY3JldDogYXBwVG9rZW4uYWNjZXNzX3Rva2VuIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJzb25pdW1Ub2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZXNJbiA9IHRva2VuLmV4cGlyZXNfaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5UaW1lID0gK25ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSAgICBcblxuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs+OBruabtOaWsOOChOODiOODqeODs+OCueOCu+ODq+ODiOODvOOCr+ODs+OCkuS9nOaIkFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSByZWZyZXNoVG9rZW4g44Oq44OV44Os44OD44K344Ol55So44OI44O844Kv44Oz77yIbG9naW7mmYLjgavlj5blvpfvvIlcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOODiOODqeODs+OCueOCu+ODq+ODiOODvOOCr+ODs+OCkueUn+aIkOOBmeOCi+WgtOWQiOOBr+aMh+WumlxuICAgICAqL1xuICAgIHJlZnJlc2hBY2Nlc3NUb2tlbihjZWxsOiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nLCB0YXJnZXQ/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuU2VlZHMgPSB0YXJnZXQgPyB7XG4gICAgICAgICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgIHBfdGFyZ2V0OiB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEodGFyZ2V0KSxcbiAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh0b2tlblNlZWRzKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCv+OCpOODoOOCouOCpuODiOOCkuimi+OCi1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVzSW4gPSB0b2tlbi5leHBpcmVzX2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZW91dCA9IE51bWJlcih0aGlzLmV4cGlyZXNJbikgKiA5OTk7IC8v55u05YmN44Gr5pWZ44GI44Gm44GC44GS44KLXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZUNhbGxiYWNrVGltZXIgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFja1RpbWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZUNhbGxiYWNrICYmIHRoaXMuZXhwaXJlQ2FsbGJhY2sodG9rZW4ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ot44O844Or44KS5L2c5oiQ44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHJvbGUg44Ot44O844Or5ZCNXG4gICAgICogQHBhcmFtIGJveCBNYWlu44Oc44OD44Kv44K55Lul5aSW44KS5a++6LGh44Go44GZ44KL5aC05ZCI44Gv44Oc44OD44Kv44K55ZCN44KS5oyH5a6aXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGNyZWF0ZVJvbGUoY2VsbDogc3RyaW5nLCByb2xlOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9Sb2xlL1wiO1xuICAgICAgICAgICAgY29uc3QgYm94TmFtZSA9IGJveCB8fCBudWxsO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgICAgIGlmKCFyb2xlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIE5hbWU6IHJvbGUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGJveCl7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfQm94Lk5hbWVcIjogYm94TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg63jg7zjg6vmg4XloLHjga7lj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcm9sZSDnibnlrprjga7jg63jg7zjg6vmg4XloLHjgYzlj5blvpfjgZfjgZ/jgYTloLTlkIjjga/mjIflrppcbiAgICAgKiBAcGFyYW0gYm94IOeJueWumuOBruODnOODg+OCr+OCueOBrueJueWumuOBruODreODvOODq+aDheWgseOBjOWPluW+l+OBl+OBn+OBhOWgtOWQiOOBr+aMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXRSb2xlKGNlbGw6IHN0cmluZywgcm9sZT86IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFJvbGVbXXxSb2xlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUm9sZVwiO1xuICAgICAgICAgICAgaWYgKHJvbGUpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2UgaWYocm9sZSAmJiBib3gpe1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihOYW1lPSdcIiArIHJvbGUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg63jg7zjg6vjgpLliYrpmaTjgZnjgovvvIjntJDku5jjgZHjgYzjgYLjgovjgajliYrpmaTjgafjgY3jgarjgYTloLTlkIjjgYzjgYLjgovvvIlcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcm9sZSDnibnlrprjga7jg63jg7zjg6vjgpLliYrpmaTjgZfjgZ/jgYTloLTlkIjjga/mjIflrppcbiAgICAgKiBAcGFyYW0gYm94IOeJueWumuOBruODnOODg+OCr+OCueOBrueJueWumuOBruODreODvOODq+OBjOWJiumZpOOBl+OBn+OBhOWgtOWQiOOBr+aMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVSb2xlKGNlbGw6IHN0cmluZywgcm9sZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1JvbGVcIjtcbiAgICAgICAgICAgIGlmIChib3gpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiKE5hbWU9J1wiICsgcm9sZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OCkuioreWumuOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODqyBcbiAgICAgKiBAcGFyYW0gc2V0Q2VsbFVybCDlpJbpg6jjgrvjg6vjgavmjIflrprjgZfjgZ/jgYTjgrvjg6vjga5VUkxcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0RXh0Q2VsbChjZWxsOiBzdHJpbmcsIHNldENlbGxVcmw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsL1wiO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBVcmw6IHNldENlbGxVcmwsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZChkYXRhKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vkuIDopqfjgpLlj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0RXh0Q2VsbExpc3QoY2VsbDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEV4dENlbGxbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbC9cIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vjga7op6PpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gZGVsZXRlQ2VsbFVybCDliYrpmaTjgZnjgovjgrvjg6vjga5VUkxcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlRXh0Q2VsbChjZWxsOiBzdHJpbmcsIGRlbGV0ZUNlbGxVcmw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZShkZWxldGVDZWxsVXJsKSArIFwiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OBq+WvvuOBl+OBpuODreODvOODq+OBi+ODquODrOODvOOCt+ODp+ODs+OCkuioreWumuOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0YXJnZXRDZWxsVXJsIOaMh+WumuOBmeOCi+WklumDqOOCu+ODq1VSTFxuICAgICAqIEBwYXJhbSB0eXBlIOODreODvOODq+OBi+ODquODrOODvOOCt+ODp+ODs+OBruaMh+WumihfUm9sZS9fUmVsYXRpb24pXG4gICAgICogQHBhcmFtIG5hbWUg44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44Gr5oyH5a6a44GZ44KL5ZCN5YmNXG4gICAgICogQHBhcmFtIGJveCDjg5zjg4Pjgq/jgrnlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0RXh0Q2VsbExpbmsoY2VsbDogc3RyaW5nLCB0YXJnZXRDZWxsVXJsOiBzdHJpbmcsIHR5cGU6IFwiX1JvbGVcInxcIl9SZWxhdGlvblwiLCBuYW1lOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZSh0YXJnZXRDZWxsVXJsKSArIFwiJykvXFwkbGlua3MvXCIgKyB0eXBlO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSBcIlwiO1xuICAgICAgICAgICAgaWYobmFtZSAmJiBib3gpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIGlmKG5hbWUpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHVyaTogdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9cIiArIHR5cGUuc3Vic3RyaW5nKDEpICsgcm9sZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoZGF0YSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or44Gr57SQ44Gl44GR44Gf44Oq44Oz44Kv44Gu5LiA6KanXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIHRhcmdldENlbGxVcmwg5a++6LGh44Gr5oyH5a6a44GZ44KL44K744OrVVJMXG4gICAgICogQHBhcmFtIHR5cGUg44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44Gu5oyH5a6aKF9Sb2xlL19SZWxhdGlvbilcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0RXh0Q2VsbExpbmsoY2VsbDogc3RyaW5nLCB0YXJnZXRDZWxsVXJsOiBzdHJpbmcsIHR5cGU6IFwiX1JvbGVcInxcIl9SZWxhdGlvblwiLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPExpbmtbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbCgnXCIgKyBFbmNvZGUodGFyZ2V0Q2VsbFVybCkgKyBcIicpL1xcJGxpbmtzL1wiICsgdHlwZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vjga7jg6rjg7Pjgq/jgpLliYrpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gdGFyZ2V0Q2VsbFVybCDlr77osaHjgajjgZfjgabmjIflrprjgZnjgovjgrvjg6tVUkxcbiAgICAgKiBAcGFyYW0gdHlwZSDjg63jg7zjg6vjgYvjg6rjg6zjg7zjgrfjg6fjg7Pjga7mjIflrpooX1JvbGUvX1JlbGF0aW9uKVxuICAgICAqIEBwYXJhbSBuYW1lIOWJiumZpOOBmeOCi+ODreODvOODqy/jg6rjg6zjg7zjgrfjg6fjg7PlkI1cbiAgICAgKiBAcGFyYW0gYm94IOWJiumZpOOBmeOCi+ODreODvOODq+OBruOBguOCi+ODnOODg+OCr+OCueWQje+8iOODh+ODleOCqeODq+ODiOOBr+ODoeOCpOODs2JveO+8iVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVFeHRDZWxsTGluayhjZWxsOiBzdHJpbmcsIHRhcmdldENlbGxVcmw6IHN0cmluZywgdHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSBcIlwiO1xuICAgICAgICAgICAgaWYoYm94KXtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbCgnXCIgKyBFbmNvZGUodGFyZ2V0Q2VsbFVybCkgKyBcIicpL1xcJGxpbmtzL1wiICsgdHlwZSArIHJvbGU7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqLjgqvjgqbjg7Pjg4jjga7jg6rjg7Pjgq/jgpLoqK3lrppcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gYWNjb3VudCDlr77osaHjgajjgZfjgabmjIflrprjgZnjgovjgqLjgqvjgqbjg7Pjg4jlkI1cbiAgICAgKiBAcGFyYW0gbmFtZSDoqK3lrprjgZnjgovjg63jg7zjg6vlkI1cbiAgICAgKiBAcGFyYW0gYm94IOioreWumuOBmeOCi+ODreODvOODq+OBruOBguOCi+ODnOODg+OCr+OCueWQje+8iOODh+ODleOCqeODq+ODiOOBr+ODoeOCpOODs2JveO+8iVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRBY2NvdW50TGluayhjZWxsOiBzdHJpbmcsIGFjY291bnQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCByb2xlID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpK1wiX19jdGwvUm9sZVwiO1xuICAgICAgICAgICAgaWYoYm94KXtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvQWNjb3VudCgnXCIgKyBhY2NvdW50ICsgXCInKS9cXCRsaW5rcy9fUm9sZVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7dXJpOiByb2xlfSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ki44Kr44Km44Oz44OI44Gu44Oq44Oz44Kv44KS5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIGFjY291bnQg5a++6LGh44Go44GX44Gm5oyH5a6a44GZ44KL44Ki44Kr44Km44Oz44OI5ZCNXG4gICAgICogQHBhcmFtIG5hbWUg5YmK6Zmk44GZ44KL44Ot44O844Or5ZCNXG4gICAgICogQHBhcmFtIGJveCDliYrpmaTjgZnjgovjg63jg7zjg6vjga7jgYLjgovjg5zjg4Pjgq/jgrnlkI3vvIjjg4fjg5Xjgqnjg6vjg4jjga/jg6HjgqTjg7Nib3jvvIlcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlQWNjb3VudExpbmsoY2VsbDogc3RyaW5nLCBhY2NvdW50OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgcm9sZSA9IFwiXCI7XG4gICAgICAgICAgICBpZihib3gpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9BY2NvdW50KCdcIiArIGFjY291bnQgKyBcIicpL1xcJGxpbmtzL19Sb2xlXCIgKyByb2xlO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ki44Kr44Km44Oz44OI44KS5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIGFjY291bnQg5a++6LGh44Go44GX44Gm5oyH5a6a44GZ44KL44Ki44Kr44Km44Oz44OI5ZCNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUFjY291bnQoY2VsbDogc3RyaW5nLCBhY2NvdW50OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvQWNjb3VudCgnXCIgKyBhY2NvdW50ICsgXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Or44O844Or5LiA6Kan44Gu5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGdldFJ1bGVzKGNlbGw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxSdWxlW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1J1bGVcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6vjg7zjg6vjgpLoqK3lrprjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcnVsZSDnmbvpjLLjgZnjgovjg6vjg7zjg6tcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0UnVsZShjZWxsOiBzdHJpbmcsIHJ1bGU6IFJ1bGUsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUnVsZVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAuc2VuZChydWxlKVxuICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOODq+ODvOODq+OCkuWJiumZpOOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBydWxlSWQg5YmK6Zmk44GZ44KL44Or44O844OraWRcbiAgICAgKiBAcGFyYW0gYm94IOODnOODg+OCr+OCueOBq+e0kOOBpeOBhOOBpuOCi+WgtOWQiOOBr2JveOWQjeaMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVSdWxlKGNlbGw6IHN0cmluZywgcnVsZUlkOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUnVsZVwiO1xuICAgICAgICAgICAgaWYoYm94KXtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoX19pZD0nXCIgKyBydWxlSWQgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoX19pZD0nXCIgKyBydWxlSWQgKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOODoeODg+OCu+ODvOOCuOOBrumAgeS/oUFQSVxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0byDlrpvlhYjjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gdHlwZSDjg6Hjg4Pjgrvjg7zjgrjpgIHkv6Hjgr/jgqTjg5fjga7mjIflrppcbiAgICAgKiBAcGFyYW0gcmVxdWVzdENvbnRlbnQg55m76Yyy5L6d6aC844GX44Gf6Zai5L+C5oOF5aCxKFVSTClcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2VuZE1lc3NhZ2UoY2VsbDogc3RyaW5nLCB0bzogc3RyaW5nLCB0eXBlOiBNZXNzYWdlU2VuZFR5cGUsIHJlcXVlc3RDb250ZW50OiBSdWxlfHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCBjZWxsVXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdG9VcmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEodG8pO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbFVybCArIFwiX19tZXNzYWdlL3NlbmQvXCI7XG5cbiAgICAgICAgICAgIGxldCBib2R5ID0ge307XG5cbiAgICAgICAgICAgIGlmICh0eXBlLmxhc3RJbmRleE9mKFwicmVxLnJ1bGUuXCIsIDApID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgVG86IHRvVXJsLFxuICAgICAgICAgICAgICAgICAgICBUeXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UnVsZTogcmVxdWVzdENvbnRlbnQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZS5sYXN0SW5kZXhPZihcInJlcS5yb2xlLlwiLCAwKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIFRvOiB0b1VybCxcbiAgICAgICAgICAgICAgICAgICAgVHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdFJlbGF0aW9uOiByZXF1ZXN0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdFJlbGF0aW9uVGFyZ2V0OiBjZWxsVXJsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGJvZHkpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVzLnRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPIHJlY2VpdmVNZXNzYWdlXG4gICAgICovXG4gICAgcmVjZWl2ZU1lc3NhZ2UoKXt9XG4gICAgXG4gICAgLyoqXG4gICAgICogQUNM44KS6Kit5a6a44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIGFjbCDoqK3lrprjgZnjgotBQ0zjga5qc29uKFhNTOOBq+WkieaPmylcbiAgICAgKi9cbiAgICBzZXRBY2woY2VsbDogc3RyaW5nLCBhY2VzOiBBY2VbXSwgdGFyZ2V0UGF0aD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgY2VsbHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRhcmdldFBhdGg/IGNlbGx1cmwrdGFyZ2V0UGF0aCA6IGNlbGx1cmw7XG5cbiAgICAgICAgICAgIGNvbnN0IGFjbDogQWNsID0ge1xuICAgICAgICAgICAgICAgIFwiQFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwieG1sbnM6RFwiOiBcIkRBVjpcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpwXCI6IFwidXJuOngtcGVyc29uaXVtOnhtbG5zXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIkQ6YWNlXCI6IGFjZXMsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhY2xYbWwgPSBqczJ4bWwucGFyc2UoXCJEOmFjbFwiLCBhY2wpO1xuXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKFwiQUNMXCIsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCk9PntcbiAgICAgICAgICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94bWxcIik7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIrdG9rZW4pXG4gICAgICAgICAgICB4aHIuc2VuZChhY2xYbWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrXjg7zjg5PjgrnjgrPjg6zjgq/jgrfjg6fjg7Pjgr3jg7zjgrnkvZzmiJBcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gbmFtZSBSZXNvcmNl5ZCNXG4gICAgICogQHBhcmFtIHJlc291cmNlIFJlc29yY2XkuK3ouqtcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgY3JlYXRlU2VydmljZUNvbGxlY3Rpb24oY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcmVzb3VyY2U6IGFueSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiL19fc3JjL1wiICsgbmFtZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucHV0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKVxuICAgICAgICAgICAgICAgIC5zZW5kKHJlc291cmNlKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrXjg7zjg5PjgrnjgrPjg6zjgq/jgrfjg6fjg7Pjgr3jg7zjgrnoqK3lrprpgannlKhcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gc2NyaXB0IOOCueOCr+ODquODl+ODiOWQjSh4eHguanMpXG4gICAgICogQHBhcmFtIHNlcnZpY2Ug44K144O844OT44K55ZCNKHl5eSlcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0U2VydmljZUNvbGxlY3Rpb24oY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHNjcmlwdDogc3RyaW5nLCBzZXJ2aWNlOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICBjb25zdCBwcm9wID0ge1xuICAgICAgICAgICAgICAgIFwiQFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwieG1sbnM6RFwiOiBcIkRBVjpcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpwXCI6IFwidXJuOngtcGVyc29uaXVtOnhtbG5zXCIsXG4gICAgICAgICAgICAgICAgICAgIFwieG1sbnM6elwiOiBcImh0dHA6Ly93d3cudzMuY29tL3N0YW5kYXJkcy96MzkuNTAvXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIkQ6c2V0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEOnByb3BcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwOnNlcnZpY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFuZ3VhZ2VcIjogXCJKYXZhU2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBzZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzY3JpcHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBwcm9wWG1sID0ganMyeG1sLnBhcnNlKFwiRDpwcm9wZXJ0eXVwZGF0ZVwiLCBwcm9wKTtcblxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbihcIlBST1BQQVRDSFwiLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veG1sXCIpO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiK3Rva2VuKVxuICAgICAgICAgICAgeGhyLnNlbmQocHJvcFhtbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCteODvOODk+OCueOCs+ODrOOCr+OCt+ODp+ODs+OCveODvOOCueWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBuYW1lIFJlc29yY2XlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlU2VydmljZUNvbGxlY3Rpb24oY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiL19fc3JjL1wiICsgbmFtZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+OCv+OCpOODl+OBruWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOBruOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOOCqOODs+ODhuOCo+ODhuOCo+OBruODkeOCuVxuICAgICAqIEBwYXJhbSBpZCDjgqjjg7Pjg4bjgqPjg4bjgqNpZFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVFbnRpdHlUeXBlKGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbnRpdHlUeXBlTmFtZTogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIi8kbWV0YWRhdGEvRW50aXR5VHlwZSgnXCIgKyBlbnRpdHlUeXBlTmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3BlcnR544Gu5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44Gu44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44Ko44Oz44OG44Kj44OG44Kj44Gu44OR44K5XG4gICAgICogQHBhcmFtIGVudGl0eVR5cGUg44Ko44Oz44OG44Kj44OG44Kj44K/44Kk44OX44Gu5ZCN5YmNXG4gICAgICogQHBhcmFtIHByb3BlcnR5IHByb3BlcnR544Gu5ZCN5YmNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZVByb3BlcnR5KGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbnRpdHlUeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiLyRtZXRhZGF0YS9Qcm9wZXJ0eShOYW1lPSdcIiArcHJvcGVydHkrIFwiJyxfRW50aXR5VHlwZS5OYW1lPSdcIitlbnRpdHlUeXBlK1wiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJveOOBruWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOBruOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBib3ggYm945ZCNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUJveChjZWxsOiBzdHJpbmcsIGJveDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvQm94KE5hbWU9J1wiK2JveCtcIicpXCI7ICAgICAgICAgICAgXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog44OX44Ot44OV44Kh44Kk44Or5oOF5aCx44KS5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwgXG4gICAgICovXG4gICAgZ2V0UHJvZmlsZShjZWxsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bVByb2ZpbGVSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGNlbGx1cmwgKyBcIl9fL3Byb2ZpbGUuanNvblwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUHJvZmlsZVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqLjg5fjg6rjgrvjg6vlsILnlKhcbiAgICAgKiDjgqLjg5fjg6rotbfli5Xmg4XloLHjgpLlj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCBcbiAgICAgKi9cbiAgICBnZXRMYXVuY2goY2VsbDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1MYXVuY2hKc29uPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbHVybCArIFwiX18vbGF1bmNoLmpzb25cIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bUxhdW5jaEpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJhcuOCpOODs+OCueODiOODvOODqyBcbiAgICAgKiBAcGFyYW0gYmFyVXJsXG4gICAgICovXG4gICAgYmFySW5zdGFsbChjZWxsOiBzdHJpbmcsIGJveDogc3RyaW5nLCBiYXJVcmw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgY2VsbHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGNlbGx1cmwgKyBib3g7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZ2V0KGJhclVybClcbiAgICAgICAgICAgICAgICAucmVzcG9uc2VUeXBlKFwiYmxvYlwiKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMxKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSByZXMxLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5vcGVuKFwiTUtDT0xcIiwgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3ppcFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIit0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZW5kKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+ODh+ODvOOCv+OBruWtmOWcqOeiuuiqjVxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBfX19pZCDjgqjjg7Pjg4bjgqPjg4bjgqNpZFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBpc0V4aXN0KGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBfX2lkPzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gbnVsbDtcbiAgICAgICAgICAgIGlmKF9faWQpe1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIignXCIgKyBfX2lkICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIHF1ZXJ5IOOCr+OCqOODqu+8iFRPRE8g5pyq5a6M5oiQ77yJXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGdldChjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcXVlcnk/OiBRdWVyeXxzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtRGF0YVtdIHwgUGVyc29uaXVtRGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHVybCArPSBFbmNvZGUoXCI/JG9yZGVyYnk9XCIgKyBxdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYocXVlcnkpe1xuICAgICAgICAgICAgICAgIHVybCA9IGNvbnZlcnRRdWVyaWVkVXJsKHVybCwgcXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gRW5jb2RlKFwiPyRvcmRlcmJ5PV9fdXBkYXRlZCUyMGRlc2NcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj5pu444GN6L6844G/XG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIGVudGl0eSDjgqjjg7Pjg4bjgqPjg4bjgqPmg4XloLFcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgcG9zdChjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW50aXR5OiBhbnksIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGVudGl0eSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+S4iuabuOOBjVxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBpZCDjgqjjg7Pjg4bjgqPjg4bjgqNpZFxuICAgICAqIEBwYXJhbSBlbnRpdHkg5LiK5pu444GN44GZ44KL44Ko44Oz44OG44Kj44OG44Kj5oOF5aCxXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIHVwZGF0ZShjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaWQ6IHN0cmluZywgZW50aXR5OiBhbnksIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiKCdcIiArIGlkICsgXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wdXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZChlbnRpdHkpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+OBruWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOBruOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOOCqOODs+ODhuOCo+ODhuOCo+OBruODkeOCuVxuICAgICAqIEBwYXJhbSBpZCDjgqjjg7Pjg4bjgqPjg4bjgqNpZFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGUoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGlkPzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGlkP1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIignXCIgKyBpZCArIFwiJylcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44K744Or5ZCN44GL44KJ44K744Or44K544Kt44O844OeVVJM44KS5L2c5oiQ44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwgXG4gICAgICovXG4gICAgY3JlYXRlQ2VsbFNjaGVtYShjZWxsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvdG9jb2x9Oi8vJHt0aGlzLmhvc3R9LyR7Y2VsbH0vYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrvjg6vjgrnjgq3jg7zjg55VUkzjgYvjgonjgrvjg6vlkI3jgpLmir3lh7rjgZnjgotcbiAgICAgKiBAcGFyYW0gdXJsIFxuICAgICAqL1xuICAgIGV4dHJhY3RDZWxsTmFtZSh1cmw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjZWxsID0gdXJsLnN1YnN0cmluZyh1cmwuaW5kZXhPZih0aGlzLmhvc3QpICsgdGhpcy5ob3N0Lmxlbmd0aCArIDEsIHVybC5sYXN0SW5kZXhPZihcIi9cIikpO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgZzmraLmmYJcbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZih0aGlzLmV4cGlyZUNhbGxiYWNrVGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmV4cGlyZUNhbGxiYWNrVGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxufVxuXG5cbi8vIC8qXG4vLyAvL1RPRE8g44K544Kt44O844Oe6KqN6Ki855So44GuQVBJ44CCXG4vLyAvL1BlcnNvbml1beOCouODl+ODquODnuODvOOCseODg+ODiOWIqeeUqOaZguOBq+S9v+OBhuOBk+OBqOOBq+OBquOCi+OChOOCguOBl+OCjOOBrOOAglxuLy8gZXhwb3J0IGNvbnN0IHRyYW5zY2VsbHRva2VuID0gKGpvc2hpOiBzdHJpbmcsIGJ1a2E6IHN0cmluZykgPT4ge1xuLy8gICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4vLyAgICAgY29uc3QgdXJsID0gY3JlYXRlQ2VsbFNjaGVtYShidWthKStcIl9fdG9rZW5cIjtcbi8vICAgICByZXF1ZXN0XG4vLyAgICAgICAucG9zdCh1cmwpXG4vLyAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuLy8gICAgICAgLnR5cGUoXCJmb3JtXCIpXG4vLyAgICAgICAuc2VuZCh7XG4vLyAgICAgICAgIGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgXG4vLyAgICAgICAgIHVzZXJuYW1lOiBcImJvYlwiLCAgLy9UT0RPIFxuLy8gICAgICAgICBwYXNzd29yZDogXCJwaXlvcGl5b1wiLCAvL1RPRE8gXG4vLyAgICAgICAgIHBfdGFyZ2V0OiBjcmVhdGVDZWxsU2NoZW1hKGpvc2hpKSxcbi8vICAgICAgIH0pXG4vLyAgICAgICAuZW5kKChlcnJvciwgcmVzKT0+e1xuLy8gICAgICAgICBpZihlcnJvcil7XG4vLyAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVzLnRleHQpKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfTtcbi8vIGV4cG9ydCBjb25zdCByZWZyZXNoQWNjZXNzVG9rZW4gPSAoam9zaGk6IHN0cmluZywgYnVrYTogc3RyaW5nLCBhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuKSA9PiB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbi8vICAgICBjb25zdCB1cmwgPSBjcmVhdGVDZWxsU2NoZW1hKGpvc2hpKStcIl9fdG9rZW5cIjtcbi8vICAgICByZXF1ZXN0XG4vLyAgICAgICAucG9zdCh1cmwpXG4vLyAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuLy8gICAgICAgLnR5cGUoXCJmb3JtXCIpXG4vLyAgICAgICAuc2VuZCh7XG4vLyAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLCBcbi8vICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuLy8gICAgICAgICBjbGllbnRfaWQ6IGNyZWF0ZUNlbGxTY2hlbWEoYnVrYSksXG4vLyAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGFjY2Vzc1Rva2VuLFxuLy8gICAgICAgfSlcbi8vICAgICAgIC5lbmQoKGVycm9yLCByZXMpPT57XG4vLyAgICAgICAgIGlmKGVycm9yKXtcbi8vICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXMudGV4dCkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9O1xuLy8gKi9cblxuLy8gbW9kdWxlLmV4cG9ydHMgPSBQZXJzb25pdW1DbGllbnQ7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC50cyIsIi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxudmFyIHJvb3Q7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gQnJvd3NlciB3aW5kb3dcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IC8vIFdlYiBXb3JrZXJcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgeyAvLyBPdGhlciBlbnZpcm9ubWVudHNcbiAgY29uc29sZS53YXJuKFwiVXNpbmcgYnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBpbiBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcbiAgcm9vdCA9IHRoaXM7XG59XG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBSZXF1ZXN0QmFzZSA9IHJlcXVpcmUoJy4vcmVxdWVzdC1iYXNlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xudmFyIFJlc3BvbnNlQmFzZSA9IHJlcXVpcmUoJy4vcmVzcG9uc2UtYmFzZScpO1xudmFyIHNob3VsZFJldHJ5ID0gcmVxdWlyZSgnLi9zaG91bGQtcmV0cnknKTtcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIG5vb3AoKXt9O1xuXG4vKipcbiAqIEV4cG9zZSBgcmVxdWVzdGAuXG4gKi9cblxudmFyIHJlcXVlc3QgPSBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtZXRob2QsIHVybCkge1xuICAvLyBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QobWV0aG9kLCB1cmwpO1xufVxuXG5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIERldGVybWluZSBYSFIuXG4gKi9cblxucmVxdWVzdC5nZXRYSFIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0XG4gICAgICAmJiAoIXJvb3QubG9jYXRpb24gfHwgJ2ZpbGU6JyAhPSByb290LmxvY2F0aW9uLnByb3RvY29sXG4gICAgICAgICAgfHwgIXJvb3QuQWN0aXZlWE9iamVjdCkpIHtcbiAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0O1xuICB9IGVsc2Uge1xuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjMuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gIH1cbiAgdGhyb3cgRXJyb3IoXCJCcm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGNvdWxkIG5vdCBmaW5kIFhIUlwiKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBhZGRlZCB0byBzdXBwb3J0IElFLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgdHJpbSA9ICcnLnRyaW1cbiAgPyBmdW5jdGlvbihzKSB7IHJldHVybiBzLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMucmVwbGFjZSgvKF5cXHMqfFxccyokKS9nLCAnJyk7IH07XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBnaXZlbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCBvYmpba2V5XSk7XG4gIH1cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBIZWxwcyAnc2VyaWFsaXplJyB3aXRoIHNlcmlhbGl6aW5nIGFycmF5cy5cbiAqIE11dGF0ZXMgdGhlIHBhaXJzIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqL1xuXG5mdW5jdGlvbiBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2YWwpIHtcbiAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgICAgZm9yKHZhciBzdWJrZXkgaW4gdmFsKSB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXkgKyAnWycgKyBzdWJrZXkgKyAnXScsIHZhbFtzdWJrZXldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KVxuICAgICAgICArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodmFsID09PSBudWxsKSB7XG4gICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2Ugc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplT2JqZWN0ID0gc2VyaWFsaXplO1xuXG4gLyoqXG4gICogUGFyc2UgdGhlIGdpdmVuIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBgc3RyYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICB2YXIgb2JqID0ge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdCgnJicpO1xuICB2YXIgcGFpcjtcbiAgdmFyIHBvcztcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgcG9zID0gcGFpci5pbmRleE9mKCc9Jyk7XG4gICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyKV0gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKDAsIHBvcykpXSA9XG4gICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKHBvcyArIDEpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEV4cG9zZSBwYXJzZXIuXG4gKi9cblxucmVxdWVzdC5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgTUlNRSB0eXBlIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAndGV4dC94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0nOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHNlcmlhbGl6ZSxcbiAgICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5zdHJpbmdpZnlcbiB9O1xuXG4gLyoqXG4gICogRGVmYXVsdCBwYXJzZXJzLlxuICAqXG4gICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcbiAgKiAgICAgICByZXR1cm4geyBvYmplY3QgcGFyc2VkIGZyb20gc3RyIH07XG4gICogICAgIH07XG4gICpcbiAgKi9cblxucmVxdWVzdC5wYXJzZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHBhcnNlU3RyaW5nLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04ucGFyc2Vcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGhlYWRlciBgc3RyYCBpbnRvXG4gKiBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWFwcGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcihzdHIpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KC9cXHI/XFxuLyk7XG4gIHZhciBmaWVsZHMgPSB7fTtcbiAgdmFyIGluZGV4O1xuICB2YXIgbGluZTtcbiAgdmFyIGZpZWxkO1xuICB2YXIgdmFsO1xuXG4gIGxpbmVzLnBvcCgpOyAvLyB0cmFpbGluZyBDUkxGXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgbWltZWAgaXMganNvbiBvciBoYXMgK2pzb24gc3RydWN0dXJlZCBzeW50YXggc3VmZml4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtaW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNKU09OKG1pbWUpIHtcbiAgcmV0dXJuIC9bXFwvK11qc29uXFxiLy50ZXN0KG1pbWUpO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXEpIHtcbiAgdGhpcy5yZXEgPSByZXE7XG4gIHRoaXMueGhyID0gdGhpcy5yZXEueGhyO1xuICAvLyByZXNwb25zZVRleHQgaXMgYWNjZXNzaWJsZSBvbmx5IGlmIHJlc3BvbnNlVHlwZSBpcyAnJyBvciAndGV4dCcgYW5kIG9uIG9sZGVyIGJyb3dzZXJzXG4gIHRoaXMudGV4dCA9ICgodGhpcy5yZXEubWV0aG9kICE9J0hFQUQnICYmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICcnIHx8IHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnKSkgfHwgdHlwZW9mIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgID8gdGhpcy54aHIucmVzcG9uc2VUZXh0XG4gICAgIDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIHZhciBzdGF0dXMgPSB0aGlzLnhoci5zdGF0dXM7XG4gIC8vIGhhbmRsZSBJRTkgYnVnOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcbiAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgICAgc3RhdHVzID0gMjA0O1xuICB9XG4gIHRoaXMuX3NldFN0YXR1c1Byb3BlcnRpZXMoc3RhdHVzKTtcbiAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIC8vIGdldEFsbFJlc3BvbnNlSGVhZGVycyBzb21ldGltZXMgZmFsc2VseSByZXR1cm5zIFwiXCIgZm9yIENPUlMgcmVxdWVzdHMsIGJ1dFxuICAvLyBnZXRSZXNwb25zZUhlYWRlciBzdGlsbCB3b3Jrcy4gc28gd2UgZ2V0IGNvbnRlbnQtdHlwZSBldmVuIGlmIGdldHRpbmdcbiAgLy8gb3RoZXIgaGVhZGVycyBmYWlscy5cbiAgdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuICB0aGlzLl9zZXRIZWFkZXJQcm9wZXJ0aWVzKHRoaXMuaGVhZGVyKTtcblxuICBpZiAobnVsbCA9PT0gdGhpcy50ZXh0ICYmIHJlcS5fcmVzcG9uc2VUeXBlKSB7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy54aHIucmVzcG9uc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy5yZXEubWV0aG9kICE9ICdIRUFEJ1xuICAgICAgPyB0aGlzLl9wYXJzZUJvZHkodGhpcy50ZXh0ID8gdGhpcy50ZXh0IDogdGhpcy54aHIucmVzcG9uc2UpXG4gICAgICA6IG51bGw7XG4gIH1cbn1cblxuUmVzcG9uc2VCYXNlKFJlc3BvbnNlLnByb3RvdHlwZSk7XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGJvZHkgYHN0cmAuXG4gKlxuICogVXNlZCBmb3IgYXV0by1wYXJzaW5nIG9mIGJvZGllcy4gUGFyc2Vyc1xuICogYXJlIGRlZmluZWQgb24gdGhlIGBzdXBlcmFnZW50LnBhcnNlYCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuX3BhcnNlQm9keSA9IGZ1bmN0aW9uKHN0cil7XG4gIHZhciBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgaWYodGhpcy5yZXEuX3BhcnNlcikge1xuICAgIHJldHVybiB0aGlzLnJlcS5fcGFyc2VyKHRoaXMsIHN0cik7XG4gIH1cbiAgaWYgKCFwYXJzZSAmJiBpc0pTT04odGhpcy50eXBlKSkge1xuICAgIHBhcnNlID0gcmVxdWVzdC5wYXJzZVsnYXBwbGljYXRpb24vanNvbiddO1xuICB9XG4gIHJldHVybiBwYXJzZSAmJiBzdHIgJiYgKHN0ci5sZW5ndGggfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyKVxuICAgIDogbnVsbDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJuIHtFcnJvcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnRvRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgcmVxID0gdGhpcy5yZXE7XG4gIHZhciBtZXRob2QgPSByZXEubWV0aG9kO1xuICB2YXIgdXJsID0gcmVxLnVybDtcblxuICB2YXIgbXNnID0gJ2Nhbm5vdCAnICsgbWV0aG9kICsgJyAnICsgdXJsICsgJyAoJyArIHRoaXMuc3RhdHVzICsgJyknO1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IG1ldGhvZDtcbiAgZXJyLnVybCA9IHVybDtcblxuICByZXR1cm4gZXJyO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlYC5cbiAqL1xuXG5yZXF1ZXN0LlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdGAgd2l0aCB0aGUgZ2l2ZW4gYG1ldGhvZGAgYW5kIGB1cmxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdChtZXRob2QsIHVybCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3F1ZXJ5ID0gdGhpcy5fcXVlcnkgfHwgW107XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5oZWFkZXIgPSB7fTsgLy8gcHJlc2VydmVzIGhlYWRlciBuYW1lIGNhc2VcbiAgdGhpcy5faGVhZGVyID0ge307IC8vIGNvZXJjZXMgaGVhZGVyIG5hbWVzIHRvIGxvd2VyY2FzZVxuICB0aGlzLm9uKCdlbmQnLCBmdW5jdGlvbigpe1xuICAgIHZhciBlcnIgPSBudWxsO1xuICAgIHZhciByZXMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcignUGFyc2VyIGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgcmVzcG9uc2UnKTtcbiAgICAgIGVyci5wYXJzZSA9IHRydWU7XG4gICAgICBlcnIub3JpZ2luYWwgPSBlO1xuICAgICAgLy8gaXNzdWUgIzY3NTogcmV0dXJuIHRoZSByYXcgcmVzcG9uc2UgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcbiAgICAgIGlmIChzZWxmLnhocikge1xuICAgICAgICAvLyBpZTkgZG9lc24ndCBoYXZlICdyZXNwb25zZScgcHJvcGVydHlcbiAgICAgICAgZXJyLnJhd1Jlc3BvbnNlID0gdHlwZW9mIHNlbGYueGhyLnJlc3BvbnNlVHlwZSA9PSAndW5kZWZpbmVkJyA/IHNlbGYueGhyLnJlc3BvbnNlVGV4dCA6IHNlbGYueGhyLnJlc3BvbnNlO1xuICAgICAgICAvLyBpc3N1ZSAjODc2OiByZXR1cm4gdGhlIGh0dHAgc3RhdHVzIGNvZGUgaWYgdGhlIHJlc3BvbnNlIHBhcnNpbmcgZmFpbHNcbiAgICAgICAgZXJyLnN0YXR1cyA9IHNlbGYueGhyLnN0YXR1cyA/IHNlbGYueGhyLnN0YXR1cyA6IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXNDb2RlID0gZXJyLnN0YXR1czsgLy8gYmFja3dhcmRzLWNvbXBhdCBvbmx5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSBudWxsO1xuICAgICAgICBlcnIuc3RhdHVzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyKTtcbiAgICB9XG5cbiAgICBzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgcmVzKTtcblxuICAgIHZhciBuZXdfZXJyO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXNlbGYuX2lzUmVzcG9uc2VPSyhyZXMpKSB7XG4gICAgICAgIG5ld19lcnIgPSBuZXcgRXJyb3IocmVzLnN0YXR1c1RleHQgfHwgJ1Vuc3VjY2Vzc2Z1bCBIVFRQIHJlc3BvbnNlJyk7XG4gICAgICAgIG5ld19lcnIub3JpZ2luYWwgPSBlcnI7XG4gICAgICAgIG5ld19lcnIucmVzcG9uc2UgPSByZXM7XG4gICAgICAgIG5ld19lcnIuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICAgIH1cbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIG5ld19lcnIgPSBlOyAvLyAjOTg1IHRvdWNoaW5nIHJlcyBtYXkgY2F1c2UgSU5WQUxJRF9TVEFURV9FUlIgb24gb2xkIEFuZHJvaWRcbiAgICB9XG5cbiAgICAvLyAjMTAwMCBkb24ndCBjYXRjaCBlcnJvcnMgZnJvbSB0aGUgY2FsbGJhY2sgdG8gYXZvaWQgZG91YmxlIGNhbGxpbmcgaXRcbiAgICBpZiAobmV3X2Vycikge1xuICAgICAgc2VsZi5jYWxsYmFjayhuZXdfZXJyLCByZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxmLmNhbGxiYWNrKG51bGwsIHJlcyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBNaXhpbiBgRW1pdHRlcmAgYW5kIGBSZXF1ZXN0QmFzZWAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5SZXF1ZXN0QmFzZShSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0IENvbnRlbnQtVHlwZSB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgnYXBwbGljYXRpb24veG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50eXBlID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdDb250ZW50LVR5cGUnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEFjY2VwdCB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy5qc29uID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWNjZXB0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdBY2NlcHQnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEF1dGhvcml6YXRpb24gZmllbGQgdmFsdWUgd2l0aCBgdXNlcmAgYW5kIGBwYXNzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlclxuICogQHBhcmFtIHtTdHJpbmd9IFtwYXNzXSBvcHRpb25hbCBpbiBjYXNlIG9mIHVzaW5nICdiZWFyZXInIGFzIHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHdpdGggJ3R5cGUnIHByb3BlcnR5ICdhdXRvJywgJ2Jhc2ljJyBvciAnYmVhcmVyJyAoZGVmYXVsdCAnYmFzaWMnKVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzLCBvcHRpb25zKXtcbiAgaWYgKHR5cGVvZiBwYXNzID09PSAnb2JqZWN0JyAmJiBwYXNzICE9PSBudWxsKSB7IC8vIHBhc3MgaXMgb3B0aW9uYWwgYW5kIGNhbiBzdWJzdGl0dXRlIGZvciBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHBhc3M7XG4gIH1cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIHR5cGU6ICdmdW5jdGlvbicgPT09IHR5cGVvZiBidG9hID8gJ2Jhc2ljJyA6ICdhdXRvJyxcbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBidG9hKHVzZXIgKyAnOicgKyBwYXNzKSk7XG4gICAgYnJlYWs7XG5cbiAgICBjYXNlICdhdXRvJzpcbiAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VyO1xuICAgICAgdGhpcy5wYXNzd29yZCA9IHBhc3M7XG4gICAgYnJlYWs7XG5cbiAgICBjYXNlICdiZWFyZXInOiAvLyB1c2FnZSB3b3VsZCBiZSAuYXV0aChhY2Nlc3NUb2tlbiwgeyB0eXBlOiAnYmVhcmVyJyB9KVxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB1c2VyKTtcbiAgICBicmVhaztcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgIHJlcXVlc3QuZ2V0KCcvc2hvZXMnKVxuICogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4gKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbih2YWwpe1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBvcHRpb25zYCAob3IgZmlsZW5hbWUpLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnY29udGVudCcsIG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBvcHRpb25zKXtcbiAgaWYgKGZpbGUpIHtcbiAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJzdXBlcmFnZW50IGNhbid0IG1peCAuc2VuZCgpIGFuZCAuYXR0YWNoKClcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQoZmllbGQsIGZpbGUsIG9wdGlvbnMgfHwgZmlsZS5uYW1lKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9nZXRGb3JtRGF0YSA9IGZ1bmN0aW9uKCl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Zvcm1EYXRhO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgLy8gY29uc29sZS5sb2codGhpcy5fcmV0cmllcywgdGhpcy5fbWF4UmV0cmllcylcbiAgaWYgKHRoaXMuX21heFJldHJpZXMgJiYgdGhpcy5fcmV0cmllcysrIDwgdGhpcy5fbWF4UmV0cmllcyAmJiBzaG91bGRSZXRyeShlcnIsIHJlcykpIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0cnkoKTtcbiAgfVxuXG4gIHZhciBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIGlmIChlcnIpIHtcbiAgICBpZiAodGhpcy5fbWF4UmV0cmllcykgZXJyLnJldHJpZXMgPSB0aGlzLl9yZXRyaWVzIC0gMTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGZuKGVyciwgcmVzKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1JlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy4nKTtcbiAgZXJyLmNyb3NzRG9tYWluID0gdHJ1ZTtcblxuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgZXJyLnVybCA9IHRoaXMudXJsO1xuXG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8vIFRoaXMgb25seSB3YXJucywgYmVjYXVzZSB0aGUgcmVxdWVzdCBpcyBzdGlsbCBsaWtlbHkgdG8gd29ya1xuUmVxdWVzdC5wcm90b3R5cGUuYnVmZmVyID0gUmVxdWVzdC5wcm90b3R5cGUuY2EgPSBSZXF1ZXN0LnByb3RvdHlwZS5hZ2VudCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUud2FybihcIlRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudFwiKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBUaGlzIHRocm93cywgYmVjYXVzZSBpdCBjYW4ndCBzZW5kL3JlY2VpdmUgZGF0YSBhcyBleHBlY3RlZFxuUmVxdWVzdC5wcm90b3R5cGUucGlwZSA9IFJlcXVlc3QucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24oKXtcbiAgdGhyb3cgRXJyb3IoXCJTdHJlYW1pbmcgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudFwiKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0LnByb3RvdHlwZS5faXNIb3N0ID0gZnVuY3Rpb24gX2lzSG9zdChvYmopIHtcbiAgLy8gTmF0aXZlIG9iamVjdHMgc3RyaW5naWZ5IHRvIFtvYmplY3QgRmlsZV0sIFtvYmplY3QgQmxvYl0sIFtvYmplY3QgRm9ybURhdGFdLCBldGMuXG4gIHJldHVybiBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmogJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IC5lbmQoKSB3YXMgY2FsbGVkIHR3aWNlLiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gc3VwZXJhZ2VudFwiKTtcbiAgfVxuICB0aGlzLl9lbmRDYWxsZWQgPSB0cnVlO1xuXG4gIC8vIHN0b3JlIGNhbGxiYWNrXG4gIHRoaXMuX2NhbGxiYWNrID0gZm4gfHwgbm9vcDtcblxuICAvLyBxdWVyeXN0cmluZ1xuICB0aGlzLl9maW5hbGl6ZVF1ZXJ5U3RyaW5nKCk7XG5cbiAgcmV0dXJuIHRoaXMuX2VuZCgpO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB4aHIgPSB0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCk7XG4gIHZhciBkYXRhID0gdGhpcy5fZm9ybURhdGEgfHwgdGhpcy5fZGF0YTtcblxuICB0aGlzLl9zZXRUaW1lb3V0cygpO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcmVhZHlTdGF0ZSA9IHhoci5yZWFkeVN0YXRlO1xuICAgIGlmIChyZWFkeVN0YXRlID49IDIgJiYgc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dChzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gICAgfVxuICAgIGlmICg0ICE9IHJlYWR5U3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJbiBJRTksIHJlYWRzIHRvIGFueSBwcm9wZXJ0eSAoZS5nLiBzdGF0dXMpIG9mZiBvZiBhbiBhYm9ydGVkIFhIUiB3aWxsXG4gICAgLy8gcmVzdWx0IGluIHRoZSBlcnJvciBcIkNvdWxkIG5vdCBjb21wbGV0ZSB0aGUgb3BlcmF0aW9uIGR1ZSB0byBlcnJvciBjMDBjMDIzZlwiXG4gICAgdmFyIHN0YXR1cztcbiAgICB0cnkgeyBzdGF0dXMgPSB4aHIuc3RhdHVzIH0gY2F0Y2goZSkgeyBzdGF0dXMgPSAwOyB9XG5cbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgaWYgKHNlbGYudGltZWRvdXQgfHwgc2VsZi5fYWJvcnRlZCkgcmV0dXJuO1xuICAgICAgcmV0dXJuIHNlbGYuY3Jvc3NEb21haW5FcnJvcigpO1xuICAgIH1cbiAgICBzZWxmLmVtaXQoJ2VuZCcpO1xuICB9O1xuXG4gIC8vIHByb2dyZXNzXG4gIHZhciBoYW5kbGVQcm9ncmVzcyA9IGZ1bmN0aW9uKGRpcmVjdGlvbiwgZSkge1xuICAgIGlmIChlLnRvdGFsID4gMCkge1xuICAgICAgZS5wZXJjZW50ID0gZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwO1xuICAgIH1cbiAgICBlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICBzZWxmLmVtaXQoJ3Byb2dyZXNzJywgZSk7XG4gIH1cbiAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHhoci5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAnZG93bmxvYWQnKTtcbiAgICAgIGlmICh4aHIudXBsb2FkKSB7XG4gICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ3VwbG9hZCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgLy8gQWNjZXNzaW5nIHhoci51cGxvYWQgZmFpbHMgaW4gSUUgZnJvbSBhIHdlYiB3b3JrZXIsIHNvIGp1c3QgcHJldGVuZCBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgICB9XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgaWYgKHRoaXMudXNlcm5hbWUgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlLCB0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIHNlZSAjMTE0OVxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGVycik7XG4gIH1cblxuICAvLyBDT1JTXG4gIGlmICh0aGlzLl93aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gIC8vIGJvZHlcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSAmJiAnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBjb250ZW50VHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgdmFyIHNlcmlhbGl6ZSA9IHRoaXMuX3NlcmlhbGl6ZXIgfHwgcmVxdWVzdC5zZXJpYWxpemVbY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpWzBdIDogJyddO1xuICAgIGlmICghc2VyaWFsaXplICYmIGlzSlNPTihjb250ZW50VHlwZSkpIHtcbiAgICAgIHNlcmlhbGl6ZSA9IHJlcXVlc3Quc2VyaWFsaXplWydhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgfVxuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG5cbiAgICBpZiAodGhpcy5oZWFkZXIuaGFzT3duUHJvcGVydHkoZmllbGQpKVxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICBpZiAodGhpcy5fcmVzcG9uc2VUeXBlKSB7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9IHRoaXMuX3Jlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIC8vIHNlbmQgc3R1ZmZcbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7XG5cbiAgLy8gSUUxMSB4aHIuc2VuZCh1bmRlZmluZWQpIHNlbmRzICd1bmRlZmluZWQnIHN0cmluZyBhcyBQT1NUIHBheWxvYWQgKGluc3RlYWQgb2Ygbm90aGluZylcbiAgLy8gV2UgbmVlZCBudWxsIGhlcmUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgeGhyLnNlbmQodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnID8gZGF0YSA6IG51bGwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5nZXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0dFVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIE9QVElPTlMgcXVlcnkgdG8gYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0Lm9wdGlvbnMgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlbCh1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG5yZXF1ZXN0WydkZWwnXSA9IGRlbDtcbnJlcXVlc3RbJ2RlbGV0ZSddID0gZGVsO1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBhdGNoID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdQQVRDSCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvY2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcclxuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XHJcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XHJcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXHJcbiAgICAucHVzaChmbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcclxuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG5cclxuICBvbi5mbiA9IGZuO1xyXG4gIHRoaXMub24oZXZlbnQsIG9uKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gIC8vIGFsbFxyXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBzcGVjaWZpYyBldmVudFxyXG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gIHZhciBjYjtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY2IgPSBjYWxsYmFja3NbaV07XHJcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG5cclxuICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21wb25lbnQtZW1pdHRlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBNb2R1bGUgb2YgbWl4ZWQtaW4gZnVuY3Rpb25zIHNoYXJlZCBiZXR3ZWVuIG5vZGUgYW5kIGNsaWVudCBjb2RlXG4gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXF1ZXN0QmFzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0QmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0QmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0QmFzZShvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gUmVxdWVzdEJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiBfY2xlYXJUaW1lb3V0KCl7XG4gIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gIGNsZWFyVGltZW91dCh0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gIGRlbGV0ZSB0aGlzLl90aW1lcjtcbiAgZGVsZXRlIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXNwb25zZSBib2R5IHBhcnNlclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBpbmNvbWluZyBkYXRhIGludG8gcmVxdWVzdC5ib2R5XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UoZm4pe1xuICB0aGlzLl9wYXJzZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBmb3JtYXQgb2YgYmluYXJ5IHJlc3BvbnNlIGJvZHkuXG4gKiBJbiBicm93c2VyIHZhbGlkIGZvcm1hdHMgYXJlICdibG9iJyBhbmQgJ2FycmF5YnVmZmVyJyxcbiAqIHdoaWNoIHJldHVybiBCbG9iIGFuZCBBcnJheUJ1ZmZlciwgcmVzcGVjdGl2ZWx5LlxuICpcbiAqIEluIE5vZGUgYWxsIHZhbHVlcyByZXN1bHQgaW4gQnVmZmVyLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnJlc3BvbnNlVHlwZSgnYmxvYicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXNwb25zZVR5cGUgPSBmdW5jdGlvbih2YWwpe1xuICB0aGlzLl9yZXNwb25zZVR5cGUgPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlcXVlc3QgYm9keSBzZXJpYWxpemVyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGRhdGEgc2V0IHZpYSAuc2VuZCBvciAuYXR0YWNoIGludG8gcGF5bG9hZCB0byBzZW5kXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZShmbil7XG4gIHRoaXMuX3NlcmlhbGl6ZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aW1lb3V0cy5cbiAqXG4gKiAtIHJlc3BvbnNlIHRpbWVvdXQgaXMgdGltZSBiZXR3ZWVuIHNlbmRpbmcgcmVxdWVzdCBhbmQgcmVjZWl2aW5nIHRoZSBmaXJzdCBieXRlIG9mIHRoZSByZXNwb25zZS4gSW5jbHVkZXMgRE5TIGFuZCBjb25uZWN0aW9uIHRpbWUuXG4gKiAtIGRlYWRsaW5lIGlzIHRoZSB0aW1lIGZyb20gc3RhcnQgb2YgdGhlIHJlcXVlc3QgdG8gcmVjZWl2aW5nIHJlc3BvbnNlIGJvZHkgaW4gZnVsbC4gSWYgdGhlIGRlYWRsaW5lIGlzIHRvbyBzaG9ydCBsYXJnZSBmaWxlcyBtYXkgbm90IGxvYWQgYXQgYWxsIG9uIHNsb3cgY29ubmVjdGlvbnMuXG4gKlxuICogVmFsdWUgb2YgMCBvciBmYWxzZSBtZWFucyBubyB0aW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gbXMgb3Ige3Jlc3BvbnNlLCBkZWFkbGluZX1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uIHRpbWVvdXQob3B0aW9ucyl7XG4gIGlmICghb3B0aW9ucyB8fCAnb2JqZWN0JyAhPT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucztcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIHN3aXRjaChvcHRpb24pIHtcbiAgICAgIGNhc2UgJ2RlYWRsaW5lJzpcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IG9wdGlvbnMuZGVhZGxpbmU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVzcG9uc2UnOlxuICAgICAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSBvcHRpb25zLnJlc3BvbnNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVua25vd24gdGltZW91dCBvcHRpb25cIiwgb3B0aW9uKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBudW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHMgb24gZXJyb3IuXG4gKlxuICogRmFpbGVkIHJlcXVlc3RzIHdpbGwgYmUgcmV0cmllZCAnY291bnQnIHRpbWVzIGlmIHRpbWVvdXQgb3IgZXJyLmNvZGUgPj0gNTAwLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXRyeSA9IGZ1bmN0aW9uIHJldHJ5KGNvdW50KXtcbiAgLy8gRGVmYXVsdCB0byAxIGlmIG5vIGNvdW50IHBhc3NlZCBvciB0cnVlXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IGNvdW50ID09PSB0cnVlKSBjb3VudCA9IDE7XG4gIGlmIChjb3VudCA8PSAwKSBjb3VudCA9IDA7XG4gIHRoaXMuX21heFJldHJpZXMgPSBjb3VudDtcbiAgdGhpcy5fcmV0cmllcyA9IDA7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXRyeSByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3JldHJ5ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG5cbiAgLy8gbm9kZVxuICBpZiAodGhpcy5yZXEpIHtcbiAgICB0aGlzLnJlcSA9IG51bGw7XG4gICAgdGhpcy5yZXEgPSB0aGlzLnJlcXVlc3QoKTtcbiAgfVxuXG4gIHRoaXMuX2Fib3J0ZWQgPSBmYWxzZTtcbiAgdGhpcy50aW1lZG91dCA9IGZhbHNlO1xuXG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG5cbi8qKlxuICogUHJvbWlzZSBzdXBwb3J0XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3JlamVjdF1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiB0aGVuKHJlc29sdmUsIHJlamVjdCkge1xuICBpZiAoIXRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IHN1cGVyYWdlbnQgcmVxdWVzdCB3YXMgc2VudCB0d2ljZSwgYmVjYXVzZSBib3RoIC5lbmQoKSBhbmQgLnRoZW4oKSB3ZXJlIGNhbGxlZC4gTmV2ZXIgY2FsbCAuZW5kKCkgaWYgeW91IHVzZSBwcm9taXNlc1wiKTtcbiAgICB9XG4gICAgdGhpcy5fZnVsbGZpbGxlZFByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihpbm5lclJlc29sdmUsIGlubmVyUmVqZWN0KXtcbiAgICAgIHNlbGYuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgICAgICAgaWYgKGVycikgaW5uZXJSZWplY3QoZXJyKTsgZWxzZSBpbm5lclJlc29sdmUocmVzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG59XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uKGNiKSB7XG4gIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBjYik7XG59O1xuXG4vKipcbiAqIEFsbG93IGZvciBleHRlbnNpb25cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn1cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLm9rID0gZnVuY3Rpb24oY2IpIHtcbiAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBjYikgdGhyb3cgRXJyb3IoXCJDYWxsYmFjayByZXF1aXJlZFwiKTtcbiAgdGhpcy5fb2tDYWxsYmFjayA9IGNiO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5faXNSZXNwb25zZU9LID0gZnVuY3Rpb24ocmVzKSB7XG4gIGlmICghcmVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX29rQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fb2tDYWxsYmFjayhyZXMpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDA7XG59O1xuXG5cbi8qKlxuICogR2V0IHJlcXVlc3QgaGVhZGVyIGBmaWVsZGAuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBoZWFkZXIgYGZpZWxkYCB2YWx1ZS5cbiAqIFRoaXMgaXMgYSBkZXByZWNhdGVkIGludGVybmFsIEFQSS4gVXNlIGAuZ2V0KGZpZWxkKWAgaW5zdGVhZC5cbiAqXG4gKiAoZ2V0SGVhZGVyIGlzIG5vIGxvbmdlciB1c2VkIGludGVybmFsbHkgYnkgdGhlIHN1cGVyYWdlbnQgY29kZSBiYXNlKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKiBAZGVwcmVjYXRlZFxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXRIZWFkZXIgPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgYGZpZWxkYCB0byBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLnNldCgnWC1BUEktS2V5JywgJ2Zvb2JhcicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAuc2V0KHsgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsICdYLUFQSS1LZXknOiAnZm9vYmFyJyB9KVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZmllbGRcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oZmllbGQsIHZhbCl7XG4gIGlmIChpc09iamVjdChmaWVsZCkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZmllbGQpIHtcbiAgICAgIHRoaXMuc2V0KGtleSwgZmllbGRba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXSA9IHZhbDtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGZpZWxkIGBuYW1lYCBhbmQgYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3RcbiAqIGZvciBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiByZXF1ZXN0IGJvZGllcy5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCh7IGZvbzogJ2JhcicsIGJhejogJ3F1eCcgfSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZXxCdWZmZXJ8ZnMuUmVhZFN0cmVhbX0gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuXG4gIC8vIG5hbWUgc2hvdWxkIGJlIGVpdGhlciBhIHN0cmluZyBvciBhbiBvYmplY3QuXG4gIGlmIChudWxsID09PSBuYW1lIHx8ICB1bmRlZmluZWQgPT09IG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIG5hbWUgY2FuIG5vdCBiZSBlbXB0eScpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiLmZpZWxkKCkgY2FuJ3QgYmUgdXNlZCBpZiAuc2VuZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIik7XG4gIH1cblxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgdGhpcy5maWVsZChrZXksIG5hbWVba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgIGZvciAodmFyIGkgaW4gdmFsKSB7XG4gICAgICB0aGlzLmZpZWxkKG5hbWUsIHZhbFtpXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gdmFsIHNob3VsZCBiZSBkZWZpbmVkIG5vd1xuICBpZiAobnVsbCA9PT0gdmFsIHx8IHVuZGVmaW5lZCA9PT0gdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSB2YWwgY2FuIG5vdCBiZSBlbXB0eScpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT09IHR5cGVvZiB2YWwpIHtcbiAgICB2YWwgPSAnJyArIHZhbDtcbiAgfVxuICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChuYW1lLCB2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWJvcnQgdGhlIHJlcXVlc3QsIGFuZCBjbGVhciBwb3RlbnRpYWwgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9hYm9ydGVkID0gdHJ1ZTtcbiAgdGhpcy54aHIgJiYgdGhpcy54aHIuYWJvcnQoKTsgLy8gYnJvd3NlclxuICB0aGlzLnJlcSAmJiB0aGlzLnJlcS5hYm9ydCgpOyAvLyBub2RlXG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIHRoaXMuZW1pdCgnYWJvcnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0cmFuc21pc3Npb24gb2YgY29va2llcyB3aXRoIHgtZG9tYWluIHJlcXVlc3RzLlxuICpcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcbiAqIHVzaW5nIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgd2l0aCBhIHdpbGRjYXJkLFxuICogYW5kIGFsc28gbXVzdCBzZXQgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiXG4gKiB0byBcInRydWVcIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS53aXRoQ3JlZGVudGlhbHMgPSBmdW5jdGlvbihvbil7XG4gIC8vIFRoaXMgaXMgYnJvd3Nlci1vbmx5IGZ1bmN0aW9uYWxpdHkuIE5vZGUgc2lkZSBpcyBuby1vcC5cbiAgaWYob249PXVuZGVmaW5lZCkgb24gPSB0cnVlO1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSBvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4IHJlZGlyZWN0cyB0byBgbmAuIERvZXMgbm90aW5nIGluIGJyb3dzZXIgWEhSIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlZGlyZWN0cyA9IGZ1bmN0aW9uKG4pe1xuICB0aGlzLl9tYXhSZWRpcmVjdHMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29udmVydCB0byBhIHBsYWluIGphdmFzY3JpcHQgb2JqZWN0IChub3QgSlNPTiBzdHJpbmcpIG9mIHNjYWxhciBwcm9wZXJ0aWVzLlxuICogTm90ZSBhcyB0aGlzIG1ldGhvZCBpcyBkZXNpZ25lZCB0byByZXR1cm4gYSB1c2VmdWwgbm9uLXRoaXMgdmFsdWUsXG4gKiBpdCBjYW5ub3QgYmUgY2hhaW5lZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlc2NyaWJpbmcgbWV0aG9kLCB1cmwsIGFuZCBkYXRhIG9mIHRoaXMgcmVxdWVzdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxuICAgIHVybDogdGhpcy51cmwsXG4gICAgZGF0YTogdGhpcy5fZGF0YSxcbiAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJcbiAgfTtcbn07XG5cblxuLyoqXG4gKiBTZW5kIGBkYXRhYCBhcyB0aGUgcmVxdWVzdCBib2R5LCBkZWZhdWx0aW5nIHRoZSBgLnR5cGUoKWAgdG8gXCJqc29uXCIgd2hlblxuICogYW4gb2JqZWN0IGlzIGdpdmVuLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIG1hbnVhbCBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgICAuc2VuZCgne1wibmFtZVwiOlwidGpcIn0nKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8ganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKCduYW1lPXRqJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gZGVmYXVsdHMgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICogICAgICAgIC5zZW5kKCdzcGVjaWVzPWZlcnJldCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpe1xuICB2YXIgaXNPYmogPSBpc09iamVjdChkYXRhKTtcbiAgdmFyIHR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuXG4gIGlmICh0aGlzLl9mb3JtRGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCIuc2VuZCgpIGNhbid0IGJlIHVzZWQgaWYgLmF0dGFjaCgpIG9yIC5maWVsZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIik7XG4gIH1cblxuICBpZiAoaXNPYmogJiYgIXRoaXMuX2RhdGEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChkYXRhICYmIHRoaXMuX2RhdGEgJiYgdGhpcy5faXNIb3N0KHRoaXMuX2RhdGEpKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJDYW4ndCBtZXJnZSB0aGVzZSBzZW5kIGNhbGxzXCIpO1xuICB9XG5cbiAgLy8gbWVyZ2VcbiAgaWYgKGlzT2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICAvLyBkZWZhdWx0IHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGlmICghdHlwZSkgdGhpcy50eXBlKCdmb3JtJyk7XG4gICAgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gdGhpcy5fZGF0YSArICcmJyArIGRhdGFcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIWlzT2JqIHx8IHRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZGVmYXVsdCB0byBqc29uXG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIFNvcnQgYHF1ZXJ5c3RyaW5nYCBieSB0aGUgc29ydCBmdW5jdGlvblxuICpcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0IG9yZGVyXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeSgpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gY3VzdG9taXplZCBzb3J0IGZ1bmN0aW9uXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeShmdW5jdGlvbihhLCBiKXtcbiAqICAgICAgICAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAqICAgICAgICAgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zb3J0UXVlcnkgPSBmdW5jdGlvbihzb3J0KSB7XG4gIC8vIF9zb3J0IGRlZmF1bHQgdG8gdHJ1ZSBidXQgb3RoZXJ3aXNlIGNhbiBiZSBhIGZ1bmN0aW9uIG9yIGJvb2xlYW5cbiAgdGhpcy5fc29ydCA9IHR5cGVvZiBzb3J0ID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBzb3J0O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29tcG9zZSBxdWVyeXN0cmluZyB0byBhcHBlbmQgdG8gcmVxLnVybFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2ZpbmFsaXplUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpe1xuICB2YXIgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuICB0aGlzLl9xdWVyeS5sZW5ndGggPSAwOyAvLyBNYWtlcyB0aGUgY2FsbCBpZGVtcG90ZW50XG5cbiAgaWYgKHRoaXMuX3NvcnQpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVybC5pbmRleE9mKCc/Jyk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHZhciBxdWVyeUFyciA9IHRoaXMudXJsLnN1YnN0cmluZyhpbmRleCArIDEpLnNwbGl0KCcmJyk7XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHRoaXMuX3NvcnQpIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCh0aGlzLl9zb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gdGhpcy51cmwuc3Vic3RyaW5nKDAsIGluZGV4KSArICc/JyArIHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEZvciBiYWNrd2FyZHMgY29tcGF0IG9ubHlcblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fYXBwZW5kUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpIHtjb25zb2xlLnRyYWNlKFwiVW5zdXBwb3J0ZWRcIik7fVxuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl90aW1lb3V0RXJyb3IgPSBmdW5jdGlvbihyZWFzb24sIHRpbWVvdXQsIGVycm5vKXtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGVyciA9IG5ldyBFcnJvcihyZWFzb24gKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgZXJyLmNvZGUgPSAnRUNPTk5BQk9SVEVEJztcbiAgZXJyLmVycm5vID0gZXJybm87XG4gIHRoaXMudGltZWRvdXQgPSB0cnVlO1xuICB0aGlzLmFib3J0KCk7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2V0VGltZW91dHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIGRlYWRsaW5lXG4gIGlmICh0aGlzLl90aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi5fdGltZW91dEVycm9yKCdUaW1lb3V0IG9mICcsIHNlbGYuX3RpbWVvdXQsICdFVElNRScpO1xuICAgIH0sIHRoaXMuX3RpbWVvdXQpO1xuICB9XG4gIC8vIHJlc3BvbnNlIHRpbWVvdXRcbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVGltZW91dCAmJiAhdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIpIHtcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignUmVzcG9uc2UgdGltZW91dCBvZiAnLCBzZWxmLl9yZXNwb25zZVRpbWVvdXQsICdFVElNRURPVVQnKTtcbiAgICB9LCB0aGlzLl9yZXNwb25zZVRpbWVvdXQpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXF1ZXN0LWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlQmFzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNwb25zZUJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VCYXNlYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlQmFzZShvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gUmVzcG9uc2VCYXNlLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gUmVzcG9uc2VCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgYGZpZWxkYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gICAgcmV0dXJuIHRoaXMuaGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIHJlbGF0ZWQgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gYC50eXBlYCB0aGUgY29udGVudCB0eXBlIHdpdGhvdXQgcGFyYW1zXG4gKlxuICogQSByZXNwb25zZSBvZiBcIkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiXG4gKiB3aWxsIHByb3ZpZGUgeW91IHdpdGggYSBgLnR5cGVgIG9mIFwidGV4dC9wbGFpblwiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbihoZWFkZXIpe1xuICAgIC8vIFRPRE86IG1vYXIhXG4gICAgLy8gVE9ETzogbWFrZSB0aGlzIGEgdXRpbFxuXG4gICAgLy8gY29udGVudC10eXBlXG4gICAgdmFyIGN0ID0gaGVhZGVyWydjb250ZW50LXR5cGUnXSB8fCAnJztcbiAgICB0aGlzLnR5cGUgPSB1dGlscy50eXBlKGN0KTtcblxuICAgIC8vIHBhcmFtc1xuICAgIHZhciBwYXJhbXMgPSB1dGlscy5wYXJhbXMoY3QpO1xuICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuXG4gICAgdGhpcy5saW5rcyA9IHt9O1xuXG4gICAgLy8gbGlua3NcbiAgICB0cnkge1xuICAgICAgICBpZiAoaGVhZGVyLmxpbmspIHtcbiAgICAgICAgICAgIHRoaXMubGlua3MgPSB1dGlscy5wYXJzZUxpbmtzKGhlYWRlci5saW5rKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICB9XG59O1xuXG4vKipcbiAqIFNldCBmbGFncyBzdWNoIGFzIGAub2tgIGJhc2VkIG9uIGBzdGF0dXNgLlxuICpcbiAqIEZvciBleGFtcGxlIGEgMnh4IHJlc3BvbnNlIHdpbGwgZ2l2ZSB5b3UgYSBgLm9rYCBvZiBfX3RydWVfX1xuICogd2hlcmVhcyA1eHggd2lsbCBiZSBfX2ZhbHNlX18gYW5kIGAuZXJyb3JgIHdpbGwgYmUgX190cnVlX18uIFRoZVxuICogYC5jbGllbnRFcnJvcmAgYW5kIGAuc2VydmVyRXJyb3JgIGFyZSBhbHNvIGF2YWlsYWJsZSB0byBiZSBtb3JlXG4gKiBzcGVjaWZpYywgYW5kIGAuc3RhdHVzVHlwZWAgaXMgdGhlIGNsYXNzIG9mIGVycm9yIHJhbmdpbmcgZnJvbSAxLi41XG4gKiBzb21ldGltZXMgdXNlZnVsIGZvciBtYXBwaW5nIHJlc3BvbmQgY29sb3JzIGV0Yy5cbiAqXG4gKiBcInN1Z2FyXCIgcHJvcGVydGllcyBhcmUgYWxzbyBkZWZpbmVkIGZvciBjb21tb24gY2FzZXMuIEN1cnJlbnRseSBwcm92aWRpbmc6XG4gKlxuICogICAtIC5ub0NvbnRlbnRcbiAqICAgLSAuYmFkUmVxdWVzdFxuICogICAtIC51bmF1dGhvcml6ZWRcbiAqICAgLSAubm90QWNjZXB0YWJsZVxuICogICAtIC5ub3RGb3VuZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbihzdGF0dXMpe1xuICAgIHZhciB0eXBlID0gc3RhdHVzIC8gMTAwIHwgMDtcblxuICAgIC8vIHN0YXR1cyAvIGNsYXNzXG4gICAgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXM7XG4gICAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAgIC8vIGJhc2ljc1xuICAgIHRoaXMuaW5mbyA9IDEgPT0gdHlwZTtcbiAgICB0aGlzLm9rID0gMiA9PSB0eXBlO1xuICAgIHRoaXMucmVkaXJlY3QgPSAzID09IHR5cGU7XG4gICAgdGhpcy5jbGllbnRFcnJvciA9IDQgPT0gdHlwZTtcbiAgICB0aGlzLnNlcnZlckVycm9yID0gNSA9PSB0eXBlO1xuICAgIHRoaXMuZXJyb3IgPSAoNCA9PSB0eXBlIHx8IDUgPT0gdHlwZSlcbiAgICAgICAgPyB0aGlzLnRvRXJyb3IoKVxuICAgICAgICA6IGZhbHNlO1xuXG4gICAgLy8gc3VnYXJcbiAgICB0aGlzLmFjY2VwdGVkID0gMjAyID09IHN0YXR1cztcbiAgICB0aGlzLm5vQ29udGVudCA9IDIwNCA9PSBzdGF0dXM7XG4gICAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgICB0aGlzLnVuYXV0aG9yaXplZCA9IDQwMSA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub3RBY2NlcHRhYmxlID0gNDA2ID09IHN0YXR1cztcbiAgICB0aGlzLmZvcmJpZGRlbiA9IDQwMyA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub3RGb3VuZCA9IDQwNCA9PSBzdGF0dXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVzcG9uc2UtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFJldHVybiB0aGUgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy50eXBlID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gaGVhZGVyIGZpZWxkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJhbXMgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnJlZHVjZShmdW5jdGlvbihvYmosIHN0cil7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKj0gKi8pO1xuICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIHZhciB2YWwgPSBwYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKGtleSAmJiB2YWwpIG9ialtrZXldID0gdmFsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG5cbi8qKlxuICogUGFyc2UgTGluayBoZWFkZXIgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyc2VMaW5rcyA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqLCAqLykucmVkdWNlKGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqOyAqLyk7XG4gICAgdmFyIHVybCA9IHBhcnRzWzBdLnNsaWNlKDEsIC0xKTtcbiAgICB2YXIgcmVsID0gcGFydHNbMV0uc3BsaXQoLyAqPSAqLylbMV0uc2xpY2UoMSwgLTEpO1xuICAgIG9ialtyZWxdID0gdXJsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG5cbi8qKlxuICogU3RyaXAgY29udGVudCByZWxhdGVkIGZpZWxkcyBmcm9tIGBoZWFkZXJgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEByZXR1cm4ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmNsZWFuSGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyLCBzaG91bGRTdHJpcENvb2tpZSl7XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LWxlbmd0aCddO1xuICBkZWxldGUgaGVhZGVyWyd0cmFuc2Zlci1lbmNvZGluZyddO1xuICBkZWxldGUgaGVhZGVyWydob3N0J107XG4gIGlmIChzaG91bGRTdHJpcENvb2tpZSkge1xuICAgIGRlbGV0ZSBoZWFkZXJbJ2Nvb2tpZSddO1xuICB9XG4gIHJldHVybiBoZWFkZXI7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgRVJST1JfQ09ERVMgPSBbXG4gICdFQ09OTlJFU0VUJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFQUREUklORk8nLFxuICAnRVNPQ0tFVFRJTUVET1VUJ1xuXTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSByZXF1ZXN0IHNob3VsZCBiZSByZXRyaWVkLlxuICogKEJvcnJvd2VkIGZyb20gc2VnbWVudGlvL3N1cGVyYWdlbnQtcmV0cnkpXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hvdWxkUmV0cnkoZXJyLCByZXMpIHtcbiAgaWYgKGVyciAmJiBlcnIuY29kZSAmJiB+RVJST1JfQ09ERVMuaW5kZXhPZihlcnIuY29kZSkpIHJldHVybiB0cnVlO1xuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgcmVzLnN0YXR1cyA+PSA1MDApIHJldHVybiB0cnVlO1xuICAvLyBTdXBlcmFnZW50IHRpbWVvdXRcbiAgaWYgKGVyciAmJiAndGltZW91dCcgaW4gZXJyICYmIGVyci5jb2RlID09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKGVyciAmJiAnY3Jvc3NEb21haW4nIGluIGVycikgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9zaG91bGQtcmV0cnkuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYtMjAxNyBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgeG1sY3JlYXRlXzEgPSByZXF1aXJlKFwieG1sY3JlYXRlXCIpO1xudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuL29wdGlvbnNcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiBQYXJzZXMgYSBzdHJpbmcgaW50byBYTUwuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHBhcnNlIGludG8gWE1MLlxuICogQHBhcmFtIHBhcmVudEVsZW1lbnQgVGhlIFhNTCBlbGVtZW50IG9yIGF0dHJpYnV0ZSB0aGF0IHdpbGwgY29udGFpbiB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgIHN0cmluZy5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIHN0cmluZyBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIsIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVxdWlyZXNDZGF0YSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldHVybiAob3B0aW9ucy5jZGF0YUludmFsaWRDaGFycyAmJiAocy5pbmRleE9mKFwiPFwiKSAhPT0gLTFcbiAgICAgICAgICAgIHx8IHMuaW5kZXhPZihcIiZcIikgIT09IC0xKSlcbiAgICAgICAgICAgIHx8IG9wdGlvbnMuY2RhdGFLZXlzLmluZGV4T2YocGFyZW50RWxlbWVudC5uYW1lKSAhPT0gLTFcbiAgICAgICAgICAgIHx8IG9wdGlvbnMuY2RhdGFLZXlzLmluZGV4T2YoXCIqXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIGlmIChwYXJlbnRFbGVtZW50IGluc3RhbmNlb2YgeG1sY3JlYXRlXzEuWG1sRWxlbWVudCkge1xuICAgICAgICBpZiAocmVxdWlyZXNDZGF0YShzdHIpKSB7XG4gICAgICAgICAgICB2YXIgY2RhdGFTdHJzID0gc3RyLnNwbGl0KFwiXV0+XCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZGF0YVN0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZXNDZGF0YShjZGF0YVN0cnNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2RhdGEoY2RhdGFTdHJzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hhckRhdGEoY2RhdGFTdHJzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBjZGF0YVN0cnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNoYXJEYXRhKFwiXV0+XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2hhckRhdGEoc3RyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGFyZW50RWxlbWVudC50ZXh0KHN0cik7XG4gICAgfVxufVxuLyoqXG4gKiBQYXJzZXMgYW4gYXR0cmlidXRlIGludG8gWE1MLlxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gcGFyZW50RWxlbWVudCBUaGUgWE1MIGVsZW1lbnQgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIHN0cmluZy5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIGF0dHJpYnV0ZSBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciBhdHRyaWJ1dGUgPSBwYXJlbnRFbGVtZW50LmF0dHJpYnV0ZShuYW1lLCBcIlwiKTtcbiAgICBpZiAodXRpbHNfMS5pc1ByaW1pdGl2ZSh2YWx1ZSkpIHtcbiAgICAgICAgcGFyc2VTdHJpbmcodXRpbHNfMS5zdHJpbmdpZnkodmFsdWUpLCBhdHRyaWJ1dGUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXR0cmlidXRlIHZhbHVlIGZvciBuYW1lICdcIiArIG5hbWUgKyBcIicgc2hvdWxkIGJlIGFcIlxuICAgICAgICAgICAgKyBcIiBwcmltaXRpdmUgKHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBudWxsLCBvclwiXG4gICAgICAgICAgICArIFwiIHVuZGVmaW5lZClcIik7XG4gICAgfVxufVxuLyoqXG4gKiBQYXJzZXMgYW4gb2JqZWN0IG9yIE1hcCBlbnRyeSBpbnRvIFhNTC5cbiAqXG4gKiBAcGFyYW0ga2V5IFRoZSBrZXkgYXNzb2NpYXRlZCB3aXRoIHRoZSBvYmplY3Qgb3IgTWFwIGVudHJ5LlxuICogQHBhcmFtIHZhbHVlIFRoZSBvYmplY3Qgb3IgbWFwIGVudHJ5LlxuICogQHBhcmFtIHBhcmVudEVsZW1lbnQgVGhlIFhNTCBlbGVtZW50IHRoYXQgd2lsbCBjb250YWluIHRoZSBvYmplY3Qgb3IgbWFwXG4gKiAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIG9iamVjdCBvciBtYXAgZW50cnkgaW50byBYTUwuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VPYmplY3RPck1hcEVudHJ5KGtleSwgdmFsdWUsIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAvLyBBbGlhcyBrZXlcbiAgICBpZiAoa2V5ID09PSBvcHRpb25zLmFsaWFzU3RyaW5nKSB7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFsaWFzU3RyaW5nIHZhbHVlIGZvciBcIiArIHZhbHVlXG4gICAgICAgICAgICAgICAgKyBcIiBzaG91bGQgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50RWxlbWVudC5uYW1lID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQXR0cmlidXRlcyBrZXlcbiAgICBpZiAoa2V5LmluZGV4T2Yob3B0aW9ucy5hdHRyaWJ1dGVTdHJpbmcpID09PSAwKSB7XG4gICAgICAgIGlmICh1dGlsc18xLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKHZhbHVlKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc3Via2V5ID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIHBhcnNlQXR0cmlidXRlKHN1YmtleSwgdmFsdWVbc3Via2V5XSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdHRyaWJ1dGVzIG9iamVjdCBmb3IgXCIgKyBrZXkgKyBcIiBzaG91bGQgYmUgYW5cIlxuICAgICAgICAgICAgICAgICsgXCIgb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVmFsdWUga2V5XG4gICAgaWYgKGtleS5pbmRleE9mKG9wdGlvbnMudmFsdWVTdHJpbmcpID09PSAwKSB7XG4gICAgICAgIGlmICh1dGlsc18xLmlzUHJpbWl0aXZlKHZhbHVlKSkge1xuICAgICAgICAgICAgcGFyc2VWYWx1ZShrZXksIHZhbHVlLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInZhbHVlIFwiICsgdmFsdWUgKyBcIiBzaG91bGQgYmUgYSBwcmltaXRpdmVcIlxuICAgICAgICAgICAgICAgICsgXCIgKHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBudWxsLCBvciB1bmRlZmluZWQpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFN0YW5kYXJkIGhhbmRsaW5nIChjcmVhdGUgbmV3IGVsZW1lbnQgZm9yIGVudHJ5KVxuICAgIHZhciBlbGVtZW50ID0gcGFyZW50RWxlbWVudDtcbiAgICBpZiAoIXV0aWxzXzEuaXNBcnJheSh2YWx1ZSkgJiYgIXV0aWxzXzEuaXNTZXQodmFsdWUpKSB7XG4gICAgICAgIGVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LmVsZW1lbnQoa2V5KTtcbiAgICB9XG4gICAgcGFyc2VWYWx1ZShrZXksIHZhbHVlLCBlbGVtZW50LCBvcHRpb25zKTtcbn1cbi8qKlxuICogUGFyc2VzIGFuIE9iamVjdCBvciBNYXAgaW50byBYTUwuXG4gKlxuICogQHBhcmFtIG9iamVjdE9yTWFwIFRoZSBvYmplY3Qgb3IgbWFwIHRvIHBhcnNlIGludG8gWE1MLlxuICogQHBhcmFtIHBhcmVudEVsZW1lbnQgVGhlIFhNTCBlbGVtZW50IHRoYXQgd2lsbCBjb250YWluIHRoZSBvYmplY3QuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBwYXJzaW5nIHRoZSBvYmplY3QgaW50byBYTUwuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VPYmplY3RPck1hcChvYmplY3RPck1hcCwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIGlmICh1dGlsc18xLmlzTWFwKG9iamVjdE9yTWFwKSkge1xuICAgICAgICBvYmplY3RPck1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBwYXJzZU9iamVjdE9yTWFwRW50cnkodXRpbHNfMS5zdHJpbmdpZnkoa2V5KSwgdmFsdWUsIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhvYmplY3RPck1hcCk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gX2FbX2ldO1xuICAgICAgICAgICAgcGFyc2VPYmplY3RPck1hcEVudHJ5KGtleSwgb2JqZWN0T3JNYXBba2V5XSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFBhcnNlcyBhbiBhcnJheSBvciBTZXQgaW50byBYTUwuXG4gKlxuICogQHBhcmFtIGtleSBUaGUga2V5IGFzc29jaWF0ZWQgd2l0aCB0aGUgYXJyYXkgb3Igc2V0IHRvIHBhcnNlIGludG8gWE1MLlxuICogQHBhcmFtIGFycmF5T3JTZXQgVGhlIGFycmF5IG9yIHNldCB0byBwYXJzZSBpbnRvIFhNTC5cbiAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IFRoZSBYTUwgZWxlbWVudCB0aGF0IHdpbGwgY29udGFpbiB0aGUgZnVuY3Rpb24uXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBwYXJzaW5nIHRoZSBhcnJheSBvciBzZXQgaW50byBYTUwuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VBcnJheU9yU2V0KGtleSwgYXJyYXlPclNldCwgcGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciBhcnJheU5hbWVGdW5jO1xuICAgIGlmIChvcHRpb25zLndyYXBIYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShcIipcIikpIHtcbiAgICAgICAgYXJyYXlOYW1lRnVuYyA9IG9wdGlvbnMud3JhcEhhbmRsZXJzW1wiKlwiXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMud3JhcEhhbmRsZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgYXJyYXlOYW1lRnVuYyA9IG9wdGlvbnMud3JhcEhhbmRsZXJzW2tleV07XG4gICAgfVxuICAgIHZhciBhcnJheUtleSA9IGtleTtcbiAgICB2YXIgYXJyYXlFbGVtZW50ID0gcGFyZW50RWxlbWVudDtcbiAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoYXJyYXlOYW1lRnVuYykpIHtcbiAgICAgICAgdmFyIGFycmF5TmFtZUZ1bmNLZXkgPSBhcnJheU5hbWVGdW5jKGFycmF5S2V5LCBhcnJheU9yU2V0KTtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNTdHJpbmcoYXJyYXlOYW1lRnVuY0tleSkpIHtcbiAgICAgICAgICAgIGFycmF5S2V5ID0gYXJyYXlOYW1lRnVuY0tleTtcbiAgICAgICAgICAgIGFycmF5RWxlbWVudCA9IHBhcmVudEVsZW1lbnQuZWxlbWVudChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCF1dGlsc18xLmlzTnVsbChhcnJheU5hbWVGdW5jS2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwid3JhcEhhbmRsZXJzIGZ1bmN0aW9uIGZvciBcIiArIGFycmF5S2V5XG4gICAgICAgICAgICAgICAgKyBcIiBzaG91bGQgcmV0dXJuIGEgc3RyaW5nIG9yIG51bGxcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXJyYXlPclNldC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gYXJyYXlFbGVtZW50O1xuICAgICAgICBpZiAoIXV0aWxzXzEuaXNBcnJheShpdGVtKSAmJiAhdXRpbHNfMS5pc1NldChpdGVtKSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGFycmF5RWxlbWVudC5lbGVtZW50KGFycmF5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJzZVZhbHVlKGFycmF5S2V5LCBpdGVtLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICB9KTtcbn1cbi8qKlxuICogUGFyc2VzIGFuIGFyYml0cmFyeSBKYXZhU2NyaXB0IHZhbHVlIGludG8gWE1MLlxuICpcbiAqIEBwYXJhbSBrZXkgVGhlIGtleSBhc3NvY2lhdGVkIHdpdGggdGhlIHZhbHVlIHRvIHBhcnNlIGludG8gWE1MLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBwYXJzZSBpbnRvIFhNTC5cbiAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IFRoZSBYTUwgZWxlbWVudCB0aGF0IHdpbGwgY29udGFpbiB0aGUgdmFsdWUuXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBwYXJzaW5nIHRoZSB2YWx1ZSBpbnRvIFhNTC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZVZhbHVlKGtleSwgdmFsdWUsIHBhcmVudEVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAvLyBJZiBhIGhhbmRsZXIgZm9yIGEgcGFydGljdWxhciB0eXBlIGlzIHVzZXItZGVmaW5lZCwgdXNlIHRoYXQgaGFuZGxlclxuICAgIC8vIGluc3RlYWQgb2YgdGhlIGRlZmF1bHRzXG4gICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChvcHRpb25zLnR5cGVIYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShcIipcIikpIHtcbiAgICAgICAgaGFuZGxlciA9IG9wdGlvbnMudHlwZUhhbmRsZXJzW1wiKlwiXTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudHlwZUhhbmRsZXJzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgIGhhbmRsZXIgPSBvcHRpb25zLnR5cGVIYW5kbGVyc1t0eXBlXTtcbiAgICB9XG4gICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKGhhbmRsZXIpKSB7XG4gICAgICAgIHZhbHVlID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh1dGlsc18xLmlzT2JqZWN0KHZhbHVlKSB8fCB1dGlsc18xLmlzTWFwKHZhbHVlKSkge1xuICAgICAgICBwYXJzZU9iamVjdE9yTWFwKHZhbHVlLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodXRpbHNfMS5pc0FycmF5KHZhbHVlKSB8fCB1dGlsc18xLmlzU2V0KHZhbHVlKSkge1xuICAgICAgICBwYXJzZUFycmF5T3JTZXQoa2V5LCB2YWx1ZSwgcGFyZW50RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyc2VTdHJpbmcodXRpbHNfMS5zdHJpbmdpZnkodmFsdWUpLCBwYXJlbnRFbGVtZW50LCBvcHRpb25zKTtcbn1cbi8qKlxuICogUmV0dXJucyBhIFhNTCBkb2N1bWVudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBzcGVjaWZpZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHJvb3QgVGhlIG5hbWUgb2YgdGhlIHJvb3QgWE1MIGVsZW1lbnQuIFdoZW4gdGhlIHZhbHVlIGlzIGNvbnZlcnRlZCB0b1xuICogICAgICAgICAgICAgWE1MLCBpdCB3aWxsIGJlIGEgY2hpbGQgb2YgdGhpcyByb290IGVsZW1lbnQuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gWE1MLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgcGFyc2luZyB0aGUgdmFsdWUgaW50byBYTUwuXG4gKlxuICogQHJldHVybnMgQW4gWE1MIGRvY3VtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNwZWNpZmllZCB2YWx1ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZVRvRG9jdW1lbnQocm9vdCwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZG9jdW1lbnQgPSBuZXcgeG1sY3JlYXRlXzEuWG1sRG9jdW1lbnQocm9vdCk7XG4gICAgaWYgKG9wdGlvbnMuZGVjbGFyYXRpb24uaW5jbHVkZSkge1xuICAgICAgICBkb2N1bWVudC5kZWNsKG9wdGlvbnMuZGVjbGFyYXRpb24pO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kdGQuaW5jbHVkZSkge1xuICAgICAgICBkb2N1bWVudC5kdGQob3B0aW9ucy5kdGQubmFtZSwgb3B0aW9ucy5kdGQuc3lzSWQsIG9wdGlvbnMuZHRkLnB1YklkKTtcbiAgICB9XG4gICAgcGFyc2VWYWx1ZShyb290LCB2YWx1ZSwgZG9jdW1lbnQucm9vdCgpLCBvcHRpb25zKTtcbiAgICByZXR1cm4gZG9jdW1lbnQ7XG59XG4vKipcbiAqIFJldHVybnMgYSBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSByb290IFRoZSBuYW1lIG9mIHRoZSByb290IFhNTCBlbGVtZW50LiBXaGVuIHRoZSBvYmplY3QgaXMgY29udmVydGVkXG4gKiAgICAgICAgICAgICB0byBYTUwsIGl0IHdpbGwgYmUgYSBjaGlsZCBvZiB0aGlzIHJvb3QgZWxlbWVudC5cbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIFhNTC5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHBhcnNpbmcgdGhlIG9iamVjdCBhbmQgZm9ybWF0dGluZyB0aGUgcmVzdWx0aW5nXG4gKiAgICAgICAgICAgICAgICBYTUwuXG4gKlxuICogQHJldHVybnMgQW4gWE1MIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gcGFyc2Uocm9vdCwgb2JqZWN0LCBvcHRpb25zKSB7XG4gICAgdmFyIG9wdHMgPSBuZXcgb3B0aW9uc18xLk9wdGlvbnMob3B0aW9ucyk7XG4gICAgdmFyIGRvY3VtZW50ID0gcGFyc2VUb0RvY3VtZW50KHJvb3QsIG9iamVjdCwgb3B0cyk7XG4gICAgcmV0dXJuIGRvY3VtZW50LnRvU3RyaW5nKG9wdHMuZm9ybWF0KTtcbn1cbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzMnhtbHBhcnNlci9saWIvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG52YXIgWG1sQXR0cmlidXRlXzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxBdHRyaWJ1dGVcIik7XG5leHBvcnRzLlhtbEF0dHJpYnV0ZSA9IFhtbEF0dHJpYnV0ZV8xLmRlZmF1bHQ7XG52YXIgWG1sQXR0cmlidXRlVGV4dF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sQXR0cmlidXRlVGV4dFwiKTtcbmV4cG9ydHMuWG1sQXR0cmlidXRlVGV4dCA9IFhtbEF0dHJpYnV0ZVRleHRfMS5kZWZhdWx0O1xudmFyIFhtbENkYXRhXzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxDZGF0YVwiKTtcbmV4cG9ydHMuWG1sQ2RhdGEgPSBYbWxDZGF0YV8xLmRlZmF1bHQ7XG52YXIgWG1sQ2hhckRhdGFfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbENoYXJEYXRhXCIpO1xuZXhwb3J0cy5YbWxDaGFyRGF0YSA9IFhtbENoYXJEYXRhXzEuZGVmYXVsdDtcbnZhciBYbWxDaGFyUmVmXzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxDaGFyUmVmXCIpO1xuZXhwb3J0cy5YbWxDaGFyUmVmID0gWG1sQ2hhclJlZl8xLmRlZmF1bHQ7XG52YXIgWG1sQ29tbWVudF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sQ29tbWVudFwiKTtcbmV4cG9ydHMuWG1sQ29tbWVudCA9IFhtbENvbW1lbnRfMS5kZWZhdWx0O1xudmFyIFhtbERlY2xfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbERlY2xcIik7XG5leHBvcnRzLlhtbERlY2wgPSBYbWxEZWNsXzEuZGVmYXVsdDtcbnZhciBYbWxEb2N1bWVudF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRG9jdW1lbnRcIik7XG5leHBvcnRzLlhtbERvY3VtZW50ID0gWG1sRG9jdW1lbnRfMS5kZWZhdWx0O1xudmFyIFhtbER0ZF8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRHRkXCIpO1xuZXhwb3J0cy5YbWxEdGQgPSBYbWxEdGRfMS5kZWZhdWx0O1xudmFyIFhtbER0ZEF0dGxpc3RfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbER0ZEF0dGxpc3RcIik7XG5leHBvcnRzLlhtbER0ZEF0dGxpc3QgPSBYbWxEdGRBdHRsaXN0XzEuZGVmYXVsdDtcbnZhciBYbWxEdGRFbGVtZW50XzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxEdGRFbGVtZW50XCIpO1xuZXhwb3J0cy5YbWxEdGRFbGVtZW50ID0gWG1sRHRkRWxlbWVudF8xLmRlZmF1bHQ7XG52YXIgWG1sRHRkRW50aXR5XzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxEdGRFbnRpdHlcIik7XG5leHBvcnRzLlhtbER0ZEVudGl0eSA9IFhtbER0ZEVudGl0eV8xLmRlZmF1bHQ7XG52YXIgWG1sRHRkTm90YXRpb25fMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbER0ZE5vdGF0aW9uXCIpO1xuZXhwb3J0cy5YbWxEdGROb3RhdGlvbiA9IFhtbER0ZE5vdGF0aW9uXzEuZGVmYXVsdDtcbnZhciBYbWxEdGRQYXJhbUVudGl0eVJlZl8xID0gcmVxdWlyZShcIi4vbm9kZXMvWG1sRHRkUGFyYW1FbnRpdHlSZWZcIik7XG5leHBvcnRzLlhtbER0ZFBhcmFtRW50aXR5UmVmID0gWG1sRHRkUGFyYW1FbnRpdHlSZWZfMS5kZWZhdWx0O1xudmFyIFhtbEVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbEVsZW1lbnRcIik7XG5leHBvcnRzLlhtbEVsZW1lbnQgPSBYbWxFbGVtZW50XzEuZGVmYXVsdDtcbnZhciBYbWxFbnRpdHlSZWZfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbEVudGl0eVJlZlwiKTtcbmV4cG9ydHMuWG1sRW50aXR5UmVmID0gWG1sRW50aXR5UmVmXzEuZGVmYXVsdDtcbnZhciBYbWxOb2RlXzEgPSByZXF1aXJlKFwiLi9ub2Rlcy9YbWxOb2RlXCIpO1xuZXhwb3J0cy5YbWxOb2RlID0gWG1sTm9kZV8xLmRlZmF1bHQ7XG52YXIgWG1sUHJvY0luc3RfMSA9IHJlcXVpcmUoXCIuL25vZGVzL1htbFByb2NJbnN0XCIpO1xuZXhwb3J0cy5YbWxQcm9jSW5zdCA9IFhtbFByb2NJbnN0XzEuZGVmYXVsdDtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBYTUwgZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIHJvb3QgVGhlIG5hbWUgb2YgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGUgZG9jdW1lbnQuXG4gKlxuICogQHJldHVybnMgVGhlIG5ldyBYTUwgZG9jdW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGRvY3VtZW50KHJvb3QpIHtcbiAgICByZXR1cm4gbmV3IFhtbERvY3VtZW50XzEuZGVmYXVsdChyb290KTtcbn1cbmV4cG9ydHMuZG9jdW1lbnQgPSBkb2N1bWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3htbGNyZWF0ZS9saWIvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IE1pY2hhZWwgS291cmxhc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vb3B0aW9uc1wiKTtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIFhtbENvbW1lbnRfMSA9IHJlcXVpcmUoXCIuL1htbENvbW1lbnRcIik7XG52YXIgWG1sRGVjbF8xID0gcmVxdWlyZShcIi4vWG1sRGVjbFwiKTtcbnZhciBYbWxEdGRfMSA9IHJlcXVpcmUoXCIuL1htbER0ZFwiKTtcbnZhciBYbWxFbGVtZW50XzEgPSByZXF1aXJlKFwiLi9YbWxFbGVtZW50XCIpO1xudmFyIFhtbE5vZGVfMSA9IHJlcXVpcmUoXCIuL1htbE5vZGVcIik7XG52YXIgWG1sUHJvY0luc3RfMSA9IHJlcXVpcmUoXCIuL1htbFByb2NJbnN0XCIpO1xuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFhNTCBkb2N1bWVudC5cbiAqXG4gKiBBIHNhbXBsZSBYTUwgZG9jdW1lbnQgaXMgc3RydWN0dXJlZCBhcyBmb2xsb3dzOlxuICpcbiAqIGBgYHhtbFxuICogPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XG4gKiA8RE9DVFlQRSBodG1sIFBVQkxJQyBcIi0vL1czQy8vRFREIFhIVE1MIDEuMCBTdHJpY3QvL0VOXCJcbiAqICAgICAgICAgICAgICAgICAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvVFIveGh0bWwxL0RURC94aHRtbDEtc3RyaWN0LmR0ZFwiPlxuICogPGh0bWw+XG4gKiAgICAgPGhlYWQ+XG4gKiAgICAgICAgIDx0aXRsZT5NeSBwYWdlIHRpdGxlPC90aXRsZT5cbiAqICAgICA8L2hlYWQ+XG4gKiAgICAgPGJvZHk+XG4gKiAgICAgICAgIDxoMT5XZWxjb21lITwvaDE+XG4gKiAgICAgICAgIDxwPkkgaG9wZSB5b3UgZW5qb3kgdmlzaXRpbmcgbXkgd2Vic2l0ZS48L3A+XG4gKiAgICAgICAgIDxpbWcgc3JjPVwicGljdHVyZS5wbmdcIi8+XG4gKiAgICAgPC9ib2R5PlxuICogPC9odG1sPlxuICogYGBgXG4gKlxuICogRWFjaCBjb21wb25lbnQgb2YgdGhlIGRvY3VtZW50LCBzdWNoIGFzIHRoZSBYTUwgZGVjbGFyYXRpb24sIGRvY3VtZW50IHR5cGVcbiAqIGRlZmluaXRpb24sIGFuZCByb290IGVsZW1lbnQsIGFyZSBjaGlsZHJlbiBvZiB0aGlzIG5vZGUuXG4gKlxuICogWG1sRG9jdW1lbnQgbm9kZXMgbXVzdCBoYXZlIGV4YWN0bHkgb25lIHtAbGluayBYbWxFbGVtZW50fSBjaGlsZCwgd2hpY2ggaXNcbiAqIHRoZSBkb2N1bWVudCdzIHJvb3QgZWxlbWVudC5cbiAqXG4gKiBYbWxEb2N1bWVudCBub2RlcyBjYW4gaGF2ZSBleGFjdGx5IG9uZSB7QGxpbmsgWG1sRGVjbH0gYW5kIHtAbGluayBYbWxEdGR9XG4gKiBjaGlsZCBpbiB0aGF0IG9yZGVyLCBzbyBsb25nIGFzIHRoZXkgcHJlY2VkZSB0aGUge0BsaW5rIFhtbEVsZW1lbnR9IG5vZGUuXG4gKlxuICogWG1sRG9jdW1lbnQgbm9kZXMgY2FuIGhhdmUgYW4gdW5saW1pdGVkIG51bWJlciBvZiB7QGxpbmsgWG1sQ29tbWVudH0gb3JcbiAqIHtAbGluayBYbWxQcm9jSW5zdH0gbm9kZXMsIHNvIGxvbmcgYXMgdGhleSBmb2xsb3cgdGhlIHtAbGluayBYbWxEZWNsfSBub2RlLFxuICogaWYgb25lIGV4aXN0cy5cbiAqL1xudmFyIFhtbERvY3VtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoWG1sRG9jdW1lbnQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBYbWxEb2N1bWVudH0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm9vdCBUaGUgbmFtZSBvZiB0aGUgcm9vdCBlbGVtZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFhtbERvY3VtZW50KHJvb3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5pbnNlcnRDaGlsZC5jYWxsKF90aGlzLCBuZXcgWG1sRWxlbWVudF8xLmRlZmF1bHQocm9vdCkpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgY29tbWVudCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWQsXG4gICAgICogdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUncyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkYXRhIG9mIHRoZSBjb21tZW50LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBub2RlJ3NcbiAgICAgKiAgICAgICAgICAgICAgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBlbGVtZW50LlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5jb21tZW50ID0gZnVuY3Rpb24gKGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7IGluZGV4ID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoOyB9XG4gICAgICAgIHZhciBjb21tZW50ID0gbmV3IFhtbENvbW1lbnRfMS5kZWZhdWx0KGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKGNvbW1lbnQsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGNvbW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IFhNTCBkZWNsYXJhdGlvbiBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBYTUwgZGVjbGFyYXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBYTUwgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLmRlY2wgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgZGVjbGFyYXRpb24gPSBuZXcgWG1sRGVjbF8xLmRlZmF1bHQob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuaW5zZXJ0Q2hpbGQoZGVjbGFyYXRpb24sIDApO1xuICAgICAgICByZXR1cm4gZGVjbGFyYXRpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IFhNTCBkb2N1bWVudCB0eXBlIGRlZmluaXRpb24uIFVubGVzcyBhIGRpZmZlcmVudCBpbmRleCBpc1xuICAgICAqIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIFhNTCBkZWNsYXJhdGlvblxuICAgICAqIGlmIG9uZSBleGlzdHMsIG9yIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBub2RlJ3MgY2hpbGRyZW4gaWYgb25lIGRvZXNcbiAgICAgKiBub3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgRFRELlxuICAgICAqIEBwYXJhbSBzeXNJZCBUaGUgc3lzdGVtIGlkZW50aWZpZXIgb2YgdGhlIERURCwgZXhjbHVkaW5nIHF1b3RhdGlvbiBtYXJrcy5cbiAgICAgKiBAcGFyYW0gcHViSWQgVGhlIHB1YmxpYyBpZGVudGlmaWVyIG9mIHRoZSBEVEQsIGV4Y2x1ZGluZyBxdW90YXRpb24gbWFya3MuXG4gICAgICogICAgICAgICAgICAgIElmIGEgcHVibGljIGlkZW50aWZpZXIgaXMgcHJvdmlkZWQsIGEgc3lzdGVtIGlkZW50aWZpZXJcbiAgICAgKiAgICAgICAgICAgICAgbXVzdCBiZSBwcm92aWRlZCBhcyB3ZWxsLlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdGhlIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkLiBJZiBubyBpbmRleFxuICAgICAqICAgICAgICAgICAgICBpcyBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZVxuICAgICAqICAgICAgICAgICAgICBYTUwgZGVjbGFyYXRpb24gaWYgb25lIGV4aXN0cywgb3IgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGlzXG4gICAgICogICAgICAgICAgICAgIG5vZGUncyBjaGlsZHJlbiBpZiBvbmUgZG9lcyBub3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbmV3bHkgY3JlYXRlZCBYTUwgZG9jdW1lbnQgdHlwZSBkZWZpbml0aW9uLlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5kdGQgPSBmdW5jdGlvbiAobmFtZSwgc3lzSWQsIHB1YklkLCBpbmRleCkge1xuICAgICAgICB2YXIgZHRkID0gbmV3IFhtbER0ZF8xLmRlZmF1bHQobmFtZSwgc3lzSWQsIHB1YklkKTtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNVbmRlZmluZWQoaW5kZXgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBYbWxEZWNsXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluc2VydENoaWxkKGR0ZCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gZHRkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIG5vZGUgaW50byB0aGlzIG5vZGUncyBjaGlsZHJlbiBhdCB0aGUgc3BlY2lmaWVkXG4gICAgICogaW5kZXguIFRoZSBub2RlIGlzIG5vdCBpbnNlcnRlZCBpZiBpdCBpcyBhbHJlYWR5IHByZXNlbnQuIElmIHRoaXMgbm9kZVxuICAgICAqIGFscmVhZHkgaGFzIGEgcGFyZW50LCBpdCBpcyByZW1vdmVkIGZyb20gdGhhdCBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBPbmx5IHtAbGluayBYbWxDb21tZW50fSwge0BsaW5rIFhtbERlY2x9LCB7QGxpbmsgWG1sRHRkfSwgb3JcbiAgICAgKiB7QGxpbmsgWG1sUHJvY0luc3R9IG5vZGVzIGNhbiBiZSBpbnNlcnRlZC4gRnVydGhlcm1vcmUsIHtAbGluayBYbWxEZWNsfVxuICAgICAqIGFuZCB7QGxpbmsgWG1sRHRkfSBub2RlcyBtdXN0IGJlIGluc2VydGVkIGluIHRoYXQgb3JkZXIgYW5kIG11c3RcbiAgICAgKiBwcmVjZWRlIHRoZSB7QGxpbmsgWG1sRWxlbWVudH0gbm9kZS4gSW4gYWRkaXRpb24sIHtAbGluayBYbWxDb21tZW50fSBvclxuICAgICAqIHtAbGluayBYbWxQcm9jSW5zdH0gbm9kZXMgbXVzdCBmb2xsb3cgdGhlIHtAbGluayBYbWxEZWNsfSBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUgdG8gaW5zZXJ0LlxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBub2RlLiBOb2RlcyBhdCBvciBhZnRlclxuICAgICAqICAgICAgICAgICAgICB0aGUgaW5kZXggYXJlIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0LiBJZiBubyBpbmRleCBpc1xuICAgICAqICAgICAgICAgICAgICBzcGVjaWZpZWQsIHRoZSBub2RlIGlzIGluc2VydGVkIGF0IHRoZSBlbmQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSBpbnNlcnRlZCBpbnRvIHRoaXMgbm9kZSdzIGNoaWxkcmVuLCBvciB1bmRlZmluZWQgaWYgbm9cbiAgICAgKiAgICAgICAgICBub2RlIHdhcyBpbnNlcnRlZC5cbiAgICAgKi9cbiAgICBYbWxEb2N1bWVudC5wcm90b3R5cGUuaW5zZXJ0Q2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7IH1cbiAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIFhtbENvbW1lbnRfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sRGVjbF8xLmRlZmF1bHRcbiAgICAgICAgICAgIHx8IG5vZGUgaW5zdGFuY2VvZiBYbWxEdGRfMS5kZWZhdWx0XG4gICAgICAgICAgICB8fCBub2RlIGluc3RhbmNlb2YgWG1sUHJvY0luc3RfMS5kZWZhdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5vZGUgc2hvdWxkIGJlIGFuIGluc3RhbmNlIG9mXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbENvbW1lbnQsIFhtbERlY2wsIFhtbER0ZCwgb3JcIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sUHJvY0luc3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBYbWxDb21tZW50XzEuZGVmYXVsdCB8fCBub2RlIGluc3RhbmNlb2YgWG1sUHJvY0luc3RfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBYbWxEZWNsXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxDb21tZW50IG9yIFhtbFByb2NJbnN0IG5vZGUgc2hvdWxkIGJlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgaW5zZXJ0ZWQgYWZ0ZXIgdGhlIFhtbERlY2wgbm9kZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFhtbERlY2xfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBYbWxEZWNsXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERvY3VtZW50IG5vZGUgc2hvdWxkIG9ubHkgY29udGFpbiBvbmVcIlxuICAgICAgICAgICAgICAgICAgICArIFwiIFhtbERlY2wgbm9kZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbERlY2wgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQgYXQgdGhlXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBiZWdpbm5pbmcgb2YgYW4gWG1sRG9jdW1lbnQgbm9kZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgWG1sRHRkXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuWzBdIGluc3RhbmNlb2YgWG1sRGVjbF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRHRkIG5vZGUgc2hvdWxkIGJlIGluc2VydGVkIGFmdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgdGhlIFhtbERlY2wgbm9kZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGV4ICYmIGkgPCB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbltpXSBpbnN0YW5jZW9mIFhtbEVsZW1lbnRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlhtbER0ZCBub2RlIHNob3VsZCBiZSBpbnNlcnRlZCBiZWZvcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB0aGUgWG1sRWxlbWVudCBub2RlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9jaGlsZHJlbjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgWG1sRHRkXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEb2N1bWVudCBub2RlIHNob3VsZCBvbmx5IGNvbnRhaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiBvbmUgWG1sRHRkIG5vZGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmluc2VydENoaWxkLmNhbGwodGhpcywgbm9kZSwgaW5kZXgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyBwcm9jZXNzaW5nIGluc3RydWN0aW9uIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguIElmIG5vIGluZGV4XG4gICAgICogaXMgc3BlY2lmaWVkLCB0aGUgbm9kZSBpcyBpbnNlcnRlZCBhdCB0aGUgZW5kIG9mIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLlxuICAgICAqIEBwYXJhbSBjb250ZW50IFRoZSBkYXRhIG9mIHRoZSBwcm9jZXNzaW5nIGluc3RydWN0aW9uLCBvciB1bmRlZmluZWQgaWZcbiAgICAgKiAgICAgICAgICAgICAgICB0aGVyZSBpcyBubyB0YXJnZXQuXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSBzaG91bGQgYmUgaW5zZXJ0ZWQuIElmIG5vIGluZGV4XG4gICAgICogICAgICAgICAgICAgIGlzIHNwZWNpZmllZCwgdGhlIG5vZGUgaXMgaW5zZXJ0ZWQgYXQgdGhlIGVuZCBvZiB0aGlzIG5vZGUnc1xuICAgICAqICAgICAgICAgICAgICBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBuZXdseSBjcmVhdGVkIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24uXG4gICAgICovXG4gICAgWG1sRG9jdW1lbnQucHJvdG90eXBlLnByb2NJbnN0ID0gZnVuY3Rpb24gKHRhcmdldCwgY29udGVudCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7IH1cbiAgICAgICAgdmFyIHByb2NJbnN0ID0gbmV3IFhtbFByb2NJbnN0XzEuZGVmYXVsdCh0YXJnZXQsIGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmluc2VydENoaWxkKHByb2NJbnN0LCBpbmRleCk7XG4gICAgICAgIHJldHVybiBwcm9jSW5zdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBub2RlIGZyb20gdGhpcyBub2RlJ3MgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQge0BsaW5rIFhtbEVsZW1lbnR9IG5vZGVzIGNhbm5vdCBiZSByZW1vdmVkIGZyb20gdGhpcyBub2RlO1xuICAgICAqIGF0dGVtcHRzIHRvIGRvIHNvIHdpbGwgcmVzdWx0IGluIGFuIGV4Y2VwdGlvbiBiZWluZyB0aHJvd24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgbm9kZSB0byByZW1vdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBXaGV0aGVyIGEgbm9kZSB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBYbWxEb2N1bWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFhtbEVsZW1lbnRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxFbGVtZW50IG5vZGVzIGNhbm5vdCBiZSByZW1vdmVkIGZyb21cIlxuICAgICAgICAgICAgICAgICsgXCIgWG1sRG9jdW1lbnQgbm9kZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQ2hpbGQuY2FsbCh0aGlzLCBub2RlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG5vZGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoaXMgbm9kZSdzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHtAbGluayBYbWxFbGVtZW50fSBub2RlcyBjYW5ub3QgYmUgcmVtb3ZlZCBmcm9tIHRoaXMgbm9kZTtcbiAgICAgKiBhdHRlbXB0cyB0byBkbyBzbyB3aWxsIHJlc3VsdCBpbiBhbiBleGNlcHRpb24gYmVpbmcgdGhyb3duLlxuICAgICAqXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBhdCB3aGljaCB0aGUgbm9kZSB0byBiZSByZW1vdmVkIGlzXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIGxvY2F0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSB0aGF0IHdhcyByZW1vdmVkLCBvciB1bmRlZmluZWQgaWYgbm8gbm9kZSB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBYbWxEb2N1bWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbltpbmRleF0gaW5zdGFuY2VvZiBYbWxFbGVtZW50XzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWG1sRWxlbWVudCBub2RlcyBjYW5ub3QgYmUgcmVtb3ZlZCBmcm9tXCJcbiAgICAgICAgICAgICAgICArIFwiIFhtbERvY3VtZW50IG5vZGVzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkQXRJbmRleC5jYWxsKHRoaXMsIGluZGV4KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJvb3QgZWxlbWVudCBvZiB0aGlzIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIHJvb3QgZWxlbWVudCBvZiB0aGlzIGRvY3VtZW50LlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fY2hpbGRyZW47IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgWG1sRWxlbWVudF8xLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJYbWxEb2N1bWVudCBkb2VzIG5vdCBjb250YWluIGEgcm9vdCBub2RlXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBYTUwgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SVN0cmluZ09wdGlvbnN9IFtvcHRpb25zXSBGb3JtYXR0aW5nIG9wdGlvbnMgZm9yIHRoZSBzdHJpbmdcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIFhNTCBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBub2RlLlxuICAgICAqL1xuICAgIFhtbERvY3VtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBvcHRpb25zT2JqID0gbmV3IG9wdGlvbnNfMS5TdHJpbmdPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB2YXIgc3RyID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX2NoaWxkcmVuOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBfYVtfaV07XG4gICAgICAgICAgICBzdHIgKz0gbm9kZS50b1N0cmluZyhvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zT2JqLnByZXR0eSkge1xuICAgICAgICAgICAgICAgIHN0ciArPSBvcHRpb25zT2JqLm5ld2xpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbiA9IHN0ci5sZW5ndGggLSBvcHRpb25zT2JqLm5ld2xpbmUubGVuZ3RoO1xuICAgICAgICBpZiAoc3RyLnN1YnN0cihsZW4pID09PSBvcHRpb25zT2JqLm5ld2xpbmUpIHtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHIoMCwgbGVuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07XG4gICAgcmV0dXJuIFhtbERvY3VtZW50O1xufShYbWxOb2RlXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gWG1sRG9jdW1lbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy94bWxjcmVhdGUvbGliL25vZGVzL1htbERvY3VtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoQykgMjAxNiBNaWNoYWVsIEtvdXJsYXNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBJT3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzXG4gKiB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIE9wdGlvbnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB0aGlzLmFsaWFzU3RyaW5nID0gXCI9XCI7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlU3RyaW5nID0gXCJAXCI7XG4gICAgICAgIHRoaXMuY2RhdGFJbnZhbGlkQ2hhcnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZGF0YUtleXMgPSBbXTtcbiAgICAgICAgdGhpcy52YWx1ZVN0cmluZyA9IFwiI1wiO1xuICAgICAgICBpZiAoIXV0aWxzXzEuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zIHNob3VsZCBiZSBhbiBPYmplY3Qgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhvcHRpb25zLmFsaWFzU3RyaW5nKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKG9wdGlvbnMuYWxpYXNTdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuYWxpYXNTdHJpbmcgc2hvdWxkIGJlIGEgc3RyaW5nIG9yXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFsaWFzU3RyaW5nID0gb3B0aW9ucy5hbGlhc1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmcob3B0aW9ucy5hdHRyaWJ1dGVTdHJpbmcpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQob3B0aW9ucy5hdHRyaWJ1dGVTdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuYXR0cmlidXRlU3RyaW5nIHNob3VsZCBiZSBhIHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVTdHJpbmcgPSBvcHRpb25zLmF0dHJpYnV0ZVN0cmluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNCb29sZWFuKG9wdGlvbnMuY2RhdGFJbnZhbGlkQ2hhcnMpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQob3B0aW9ucy5jZGF0YUludmFsaWRDaGFycykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5jZGF0YUludmFsaWRDaGFycyBzaG91bGQgYmUgYVwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgYm9vbGVhbiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNkYXRhSW52YWxpZENoYXJzID0gb3B0aW9ucy5jZGF0YUludmFsaWRDaGFycztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXV0aWxzXzEuaXNTdHJpbmdBcnJheShvcHRpb25zLmNkYXRhS2V5cykpIHtcbiAgICAgICAgICAgIGlmICghdXRpbHNfMS5pc1VuZGVmaW5lZChvcHRpb25zLmNkYXRhS2V5cykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5jZGF0YUtleXMgc2hvdWxkIGJlIGFuIEFycmF5IG9yXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIiB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNkYXRhS2V5cyA9IG9wdGlvbnMuY2RhdGFLZXlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVjbGFyYXRpb24gPSBuZXcgRGVjbGFyYXRpb25PcHRpb25zKG9wdGlvbnMuZGVjbGFyYXRpb24pO1xuICAgICAgICB0aGlzLmR0ZCA9IG5ldyBEdGRPcHRpb25zKG9wdGlvbnMuZHRkKTtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSBuZXcgRm9ybWF0T3B0aW9ucyhvcHRpb25zLmZvcm1hdCk7XG4gICAgICAgIHRoaXMudHlwZUhhbmRsZXJzID0gbmV3IFR5cGVIYW5kbGVycyhvcHRpb25zLnR5cGVIYW5kbGVycyk7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc1N0cmluZyhvcHRpb25zLnZhbHVlU3RyaW5nKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKG9wdGlvbnMudmFsdWVTdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMudmFsdWVTdHJpbmcgc2hvdWxkIGJlIGEgc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlU3RyaW5nID0gb3B0aW9ucy52YWx1ZVN0cmluZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndyYXBIYW5kbGVycyA9IG5ldyBXcmFwSGFuZGxlcnMob3B0aW9ucy53cmFwSGFuZGxlcnMpO1xuICAgIH1cbiAgICByZXR1cm4gT3B0aW9ucztcbn0oKSk7XG5leHBvcnRzLk9wdGlvbnMgPSBPcHRpb25zO1xuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSURlY2xhcmF0aW9uT3B0aW9ucyBpbnRlcmZhY2UgdXNlZCB0byBwcm92aWRlIGRlZmF1bHRcbiAqIHZhbHVlcyB0byBmaWVsZHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIERlY2xhcmF0aW9uT3B0aW9ucyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVjbGFyYXRpb25PcHRpb25zKGRlY2xhcmF0aW9uT3B0aW9ucykge1xuICAgICAgICBpZiAoZGVjbGFyYXRpb25PcHRpb25zID09PSB2b2lkIDApIHsgZGVjbGFyYXRpb25PcHRpb25zID0ge307IH1cbiAgICAgICAgdGhpcy5pbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KGRlY2xhcmF0aW9uT3B0aW9ucykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLmRlY2xhcmF0aW9uIHNob3VsZCBiZSBhbiBPYmplY3Qgb3JcIlxuICAgICAgICAgICAgICAgICsgXCIgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc0Jvb2xlYW4oZGVjbGFyYXRpb25PcHRpb25zLmluY2x1ZGUpKSB7XG4gICAgICAgICAgICBpZiAoIXV0aWxzXzEuaXNVbmRlZmluZWQoZGVjbGFyYXRpb25PcHRpb25zLmluY2x1ZGUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuZGVjbGFyYXRpb24uaW5jbHVkZSBzaG91bGQgYmUgYVwiXG4gICAgICAgICAgICAgICAgICAgICsgXCIgYm9vbGVhbiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY2x1ZGUgPSBkZWNsYXJhdGlvbk9wdGlvbnMuaW5jbHVkZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGF0aW9uIHBlcmZvcm1lZCBieSB4bWxjcmVhdGVcbiAgICAgICAgdGhpcy5lbmNvZGluZyA9IGRlY2xhcmF0aW9uT3B0aW9ucy5lbmNvZGluZztcbiAgICAgICAgdGhpcy5zdGFuZGFsb25lID0gZGVjbGFyYXRpb25PcHRpb25zLnN0YW5kYWxvbmU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGRlY2xhcmF0aW9uT3B0aW9ucy52ZXJzaW9uO1xuICAgIH1cbiAgICByZXR1cm4gRGVjbGFyYXRpb25PcHRpb25zO1xufSgpKTtcbmV4cG9ydHMuRGVjbGFyYXRpb25PcHRpb25zID0gRGVjbGFyYXRpb25PcHRpb25zO1xuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSUR0ZE9wdGlvbnMgaW50ZXJmYWNlIHVzZWQgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlc1xuICogdG8gZmllbGRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBEdGRPcHRpb25zID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEdGRPcHRpb25zKGR0ZE9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGR0ZE9wdGlvbnMgPT09IHZvaWQgMCkgeyBkdGRPcHRpb25zID0ge307IH1cbiAgICAgICAgdGhpcy5pbmNsdWRlID0gZmFsc2U7XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdChkdGRPcHRpb25zKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIm9wdGlvbnMuZHRkIHNob3VsZCBiZSBhbiBPYmplY3Qgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc0Jvb2xlYW4oZHRkT3B0aW9ucy5pbmNsdWRlKSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzVW5kZWZpbmVkKGR0ZE9wdGlvbnMuaW5jbHVkZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5kdGQuaW5jbHVkZSBzaG91bGQgYmUgYSBib29sZWFuXCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIiBvciB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluY2x1ZGUgPSBkdGRPcHRpb25zLmluY2x1ZGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhdGlvbiBwZXJmb3JtZWQgYnkgeG1sY3JlYXRlXG4gICAgICAgIHRoaXMubmFtZSA9IGR0ZE9wdGlvbnMubmFtZTtcbiAgICAgICAgdGhpcy5zeXNJZCA9IGR0ZE9wdGlvbnMuc3lzSWQ7XG4gICAgICAgIHRoaXMucHViSWQgPSBkdGRPcHRpb25zLnB1YklkO1xuICAgIH1cbiAgICByZXR1cm4gRHRkT3B0aW9ucztcbn0oKSk7XG5leHBvcnRzLkR0ZE9wdGlvbnMgPSBEdGRPcHRpb25zO1xuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgSUZvcm1hdE9wdGlvbnMgaW50ZXJmYWNlIHVzZWQgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlc1xuICogdG8gZmllbGRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBGb3JtYXRPcHRpb25zID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb3JtYXRPcHRpb25zKGZvcm1hdE9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGZvcm1hdE9wdGlvbnMgPT09IHZvaWQgMCkgeyBmb3JtYXRPcHRpb25zID0ge307IH1cbiAgICAgICAgaWYgKCF1dGlsc18xLmlzT2JqZWN0KGZvcm1hdE9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy5mb3JtYXQgc2hvdWxkIGJlIGFuIE9iamVjdCBvclwiXG4gICAgICAgICAgICAgICAgKyBcIiB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhdGlvbiBwZXJmb3JtZWQgYnkgeG1sY3JlYXRlXG4gICAgICAgIHRoaXMuZG91YmxlUXVvdGVzID0gZm9ybWF0T3B0aW9ucy5kb3VibGVRdW90ZXM7XG4gICAgICAgIHRoaXMuaW5kZW50ID0gZm9ybWF0T3B0aW9ucy5pbmRlbnQ7XG4gICAgICAgIHRoaXMubmV3bGluZSA9IGZvcm1hdE9wdGlvbnMubmV3bGluZTtcbiAgICAgICAgdGhpcy5wcmV0dHkgPSBmb3JtYXRPcHRpb25zLnByZXR0eTtcbiAgICB9XG4gICAgcmV0dXJuIEZvcm1hdE9wdGlvbnM7XG59KCkpO1xuZXhwb3J0cy5Gb3JtYXRPcHRpb25zID0gRm9ybWF0T3B0aW9ucztcbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIElUeXBlSGFuZGxlcnMgaW50ZXJmYWNlIHVzZWQgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlc1xuICogdG8gZmllbGRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBUeXBlSGFuZGxlcnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFR5cGVIYW5kbGVycyh0eXBlSGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHR5cGVIYW5kbGVycyA9PT0gdm9pZCAwKSB7IHR5cGVIYW5kbGVycyA9IHt9OyB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdCh0eXBlSGFuZGxlcnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy50eXBlSGFuZGxlcnMgc2hvdWxkIGJlIGFuIE9iamVjdCBvclwiXG4gICAgICAgICAgICAgICAgKyBcIiB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHR5cGVIYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKHR5cGVIYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzRnVuY3Rpb24odHlwZUhhbmRsZXJzW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLnR5cGVIYW5kbGVyc1snXCIgKyBrZXkgKyBcIiddXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIgc2hvdWxkIGJlIGEgRnVuY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0eXBlSGFuZGxlcnNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFR5cGVIYW5kbGVycztcbn0oKSk7XG5leHBvcnRzLlR5cGVIYW5kbGVycyA9IFR5cGVIYW5kbGVycztcbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIElXcmFwSGFuZGxlcnMgaW50ZXJmYWNlIHVzZWQgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlc1xuICogdG8gZmllbGRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBXcmFwSGFuZGxlcnMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdyYXBIYW5kbGVycyh3cmFwSGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHdyYXBIYW5kbGVycyA9PT0gdm9pZCAwKSB7IHdyYXBIYW5kbGVycyA9IHt9OyB9XG4gICAgICAgIGlmICghdXRpbHNfMS5pc09iamVjdCh3cmFwSGFuZGxlcnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwib3B0aW9ucy53cmFwSGFuZGxlcnMgc2hvdWxkIGJlIGFuIE9iamVjdCBvclwiXG4gICAgICAgICAgICAgICAgKyBcIiB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHdyYXBIYW5kbGVycykge1xuICAgICAgICAgICAgaWYgKHdyYXBIYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1dGlsc18xLmlzRnVuY3Rpb24od3JhcEhhbmRsZXJzW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvcHRpb25zLndyYXBIYW5kbGVyc1snXCIgKyBrZXkgKyBcIiddXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIgc2hvdWxkIGJlIGEgRnVuY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB3cmFwSGFuZGxlcnNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFdyYXBIYW5kbGVycztcbn0oKSk7XG5leHBvcnRzLldyYXBIYW5kbGVycyA9IFdyYXBIYW5kbGVycztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pzMnhtbHBhcnNlci9saWIvb3B0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3Qgc3BsaXRXb3JkID0gKG9yaWdpbmFsOiBzdHJpbmcpID0+IHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIHdoaWxlKGluZGV4IDwgb3JpZ2luYWwubGVuZ3RoKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG9yaWdpbmFsLnN1YnN0cmluZyhpbmRleCwgaW5kZXgrMSk7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBFc2NhcGVTZXF1ZW5jZU1hcCA9IHtcbiAgICBcIjpcIjogXCIlM0FcIixcbiAgICBcIi9cIjogXCIlMkZcIixcbiAgICBcIiBcIjogXCIlMjBcIixcbiAgICBcIiRcIjogXCIlMjRcIixcbiAgICBcIlxcXFxcIjogXCIlNUNcIixcbn07XG5cbmNvbnN0IHJldmVyc2VNYXAgPSAobWFwKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgIHJlc3VsdFttYXBba2V5XV0gPSBrZXk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBjb25zdCBFbmNvZGUgPSAob3JpZ2luYWw6IHN0cmluZykgPT4ge1xuICAgIGxldCByZXN1bHRBcnJheSA9IHNwbGl0V29yZChvcmlnaW5hbCk7XG4gICAgcmVzdWx0QXJyYXkgPSByZXN1bHRBcnJheS5tYXAoKGNoYXJhY3RlcikgPT4ge1xuICAgICAgICBpZihFc2NhcGVTZXF1ZW5jZU1hcFtjaGFyYWN0ZXJdKXtcbiAgICAgICAgICAgIHJldHVybiBFc2NhcGVTZXF1ZW5jZU1hcFtjaGFyYWN0ZXJdO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0QXJyYXkuam9pbihcIlwiKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IERlY29kZSA9IChvcmlnaW5hbDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGluZGV4ID0gLTI7XG4gICAgY29uc3QgUmV2ZXJzZVNlcXVlbmNlTWFwID0gcmV2ZXJzZU1hcChFc2NhcGVTZXF1ZW5jZU1hcCk7XG4gICAgbGV0IHNlbnRlbmNlID0gb3JpZ2luYWw7XG4gICAgd2hpbGUoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGluZGV4ID0gc2VudGVuY2UuaW5kZXhPZihcIiVcIik7XG4gICAgICAgIGlmKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHNlbnRlbmNlLnN1YnN0cmluZyhpbmRleCwgaW5kZXgrNSk7XG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSBzZW50ZW5jZS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgYWZ0ZXIgPSBzZW50ZW5jZS5zdWJzdHJpbmcoaW5kZXgrNSk7XG4gICAgICAgICAgICBzZW50ZW5jZSA9IGJlZm9yZSArIFJldmVyc2VTZXF1ZW5jZU1hcFt0YXJnZXRdICsgYWZ0ZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlbnRlbmNlO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gICAgZm9ybWF0Pzogc3RyaW5nLFxuICAgIGV4cGFuZD86IHN0cmluZyxcbiAgICBzZWxlY3Q/OiBzdHJpbmcsXG4gICAgb3JkZXJieT86IHN0cmluZyxcbiAgICB0b3A/OiBzdHJpbmcsXG4gICAgc2tpcD86IHN0cmluZyxcbiAgICBmaWx0ZXI/OiBzdHJpbmdbXSxcbiAgICBpbmxpbmVjb3VudD86IHN0cmluZyxcbiAgICBxPzogc3RyaW5nLFxufVxuXG5jb25zdCBBTkQgPSBcIiBhbmQgXCI7XG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0UXVlcmllZFVybCA9ICh1cmw6IHN0cmluZywgcXVlcnk6IFF1ZXJ5KTogc3RyaW5nID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gdXJsICsgXCI/XCI7XG4gICAgaWYocXVlcnkuZmlsdGVyICYmIHF1ZXJ5LmZpbHRlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBxdWVyeS5maWx0ZXI7XG4gICAgICAgIHJlc3VsdCArPSBFbmNvZGUoXCIkZmlsdGVyPVwiKTtcbiAgICAgICAgZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIpPT57XG4gICAgICAgICAgICByZXN1bHQgKz0gRW5jb2RlKGZpbHRlcik7XG4gICAgICAgICAgICByZXN1bHQgKz0gQU5EO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cmluZygwLCByZXN1bHQubGFzdEluZGV4T2YoQU5EKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsaXR5LnRzIiwiLyohXG4gKiBAb3ZlcnZpZXcgZXM2LXByb21pc2UgLSBhIHRpbnkgaW1wbGVtZW50YXRpb24gb2YgUHJvbWlzZXMvQSsuXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxNCBZZWh1ZGEgS2F0eiwgVG9tIERhbGUsIFN0ZWZhbiBQZW5uZXIgYW5kIGNvbnRyaWJ1dG9ycyAoQ29udmVyc2lvbiB0byBFUzYgQVBJIGJ5IEpha2UgQXJjaGliYWxkKVxuICogQGxpY2Vuc2UgICBMaWNlbnNlZCB1bmRlciBNSVQgbGljZW5zZVxuICogICAgICAgICAgICBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3N0ZWZhbnBlbm5lci9lczYtcHJvbWlzZS9tYXN0ZXIvTElDRU5TRVxuICogQHZlcnNpb24gICA0LjEuMVxuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGdsb2JhbC5FUzZQcm9taXNlID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvYmplY3RPckZ1bmN0aW9uKHgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgeDtcbiAgcmV0dXJuIHggIT09IG51bGwgJiYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuXG52YXIgX2lzQXJyYXkgPSB1bmRlZmluZWQ7XG5pZiAoQXJyYXkuaXNBcnJheSkge1xuICBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG59IGVsc2Uge1xuICBfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcbn1cblxudmFyIGlzQXJyYXkgPSBfaXNBcnJheTtcblxudmFyIGxlbiA9IDA7XG52YXIgdmVydHhOZXh0ID0gdW5kZWZpbmVkO1xudmFyIGN1c3RvbVNjaGVkdWxlckZuID0gdW5kZWZpbmVkO1xuXG52YXIgYXNhcCA9IGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICBxdWV1ZVtsZW5dID0gY2FsbGJhY2s7XG4gIHF1ZXVlW2xlbiArIDFdID0gYXJnO1xuICBsZW4gKz0gMjtcbiAgaWYgKGxlbiA9PT0gMikge1xuICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cbiAgICAvLyBJZiBhZGRpdGlvbmFsIGNhbGxiYWNrcyBhcmUgcXVldWVkIGJlZm9yZSB0aGUgcXVldWUgaXMgZmx1c2hlZCwgdGhleVxuICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICBpZiAoY3VzdG9tU2NoZWR1bGVyRm4pIHtcbiAgICAgIGN1c3RvbVNjaGVkdWxlckZuKGZsdXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgY3VzdG9tU2NoZWR1bGVyRm4gPSBzY2hlZHVsZUZuO1xufVxuXG5mdW5jdGlvbiBzZXRBc2FwKGFzYXBGbikge1xuICBhc2FwID0gYXNhcEZuO1xufVxuXG52YXIgYnJvd3NlcldpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdW5kZWZpbmVkO1xudmFyIGJyb3dzZXJHbG9iYWwgPSBicm93c2VyV2luZG93IHx8IHt9O1xudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBpc05vZGUgPSB0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICh7fSkudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nO1xuXG4vLyB0ZXN0IGZvciB3ZWIgd29ya2VyIGJ1dCBub3QgaW4gSUUxMFxudmFyIGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaW1wb3J0U2NyaXB0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcblxuLy8gbm9kZVxuZnVuY3Rpb24gdXNlTmV4dFRpY2soKSB7XG4gIC8vIG5vZGUgdmVyc2lvbiAwLjEwLnggZGlzcGxheXMgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHdoZW4gbmV4dFRpY2sgaXMgdXNlZCByZWN1cnNpdmVseVxuICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2N1am9qcy93aGVuL2lzc3Vlcy80MTAgZm9yIGRldGFpbHNcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gIH07XG59XG5cbi8vIHZlcnR4XG5mdW5jdGlvbiB1c2VWZXJ0eFRpbWVyKCkge1xuICBpZiAodHlwZW9mIHZlcnR4TmV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmVydHhOZXh0KGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBub2RlLmRhdGEgPSBpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMjtcbiAgfTtcbn1cblxuLy8gd2ViIHdvcmtlclxuZnVuY3Rpb24gdXNlTWVzc2FnZUNoYW5uZWwoKSB7XG4gIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZmx1c2g7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHVzZVNldFRpbWVvdXQoKSB7XG4gIC8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIGVzNi1wcm9taXNlIHdpbGwgYmUgdW5hZmZlY3RlZCBieVxuICAvLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcbiAgdmFyIGdsb2JhbFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnbG9iYWxTZXRUaW1lb3V0KGZsdXNoLCAxKTtcbiAgfTtcbn1cblxudmFyIHF1ZXVlID0gbmV3IEFycmF5KDEwMDApO1xuZnVuY3Rpb24gZmx1c2goKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICB2YXIgY2FsbGJhY2sgPSBxdWV1ZVtpXTtcbiAgICB2YXIgYXJnID0gcXVldWVbaSArIDFdO1xuXG4gICAgY2FsbGJhY2soYXJnKTtcblxuICAgIHF1ZXVlW2ldID0gdW5kZWZpbmVkO1xuICAgIHF1ZXVlW2kgKyAxXSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGxlbiA9IDA7XG59XG5cbmZ1bmN0aW9uIGF0dGVtcHRWZXJ0eCgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgciA9IHJlcXVpcmU7XG4gICAgdmFyIHZlcnR4ID0gcigndmVydHgnKTtcbiAgICB2ZXJ0eE5leHQgPSB2ZXJ0eC5ydW5Pbkxvb3AgfHwgdmVydHgucnVuT25Db250ZXh0O1xuICAgIHJldHVybiB1c2VWZXJ0eFRpbWVyKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdXNlU2V0VGltZW91dCgpO1xuICB9XG59XG5cbnZhciBzY2hlZHVsZUZsdXNoID0gdW5kZWZpbmVkO1xuLy8gRGVjaWRlIHdoYXQgYXN5bmMgbWV0aG9kIHRvIHVzZSB0byB0cmlnZ2VyaW5nIHByb2Nlc3Npbmcgb2YgcXVldWVkIGNhbGxiYWNrczpcbmlmIChpc05vZGUpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU5leHRUaWNrKCk7XG59IGVsc2UgaWYgKEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG59IGVsc2UgaWYgKGlzV29ya2VyKSB7XG4gIHNjaGVkdWxlRmx1c2ggPSB1c2VNZXNzYWdlQ2hhbm5lbCgpO1xufSBlbHNlIGlmIChicm93c2VyV2luZG93ID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IGF0dGVtcHRWZXJ0eCgpO1xufSBlbHNlIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZVNldFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcblxuICB2YXIgcGFyZW50ID0gdGhpcztcblxuICB2YXIgY2hpbGQgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcihub29wKTtcblxuICBpZiAoY2hpbGRbUFJPTUlTRV9JRF0gPT09IHVuZGVmaW5lZCkge1xuICAgIG1ha2VQcm9taXNlKGNoaWxkKTtcbiAgfVxuXG4gIHZhciBfc3RhdGUgPSBwYXJlbnQuX3N0YXRlO1xuXG4gIGlmIChfc3RhdGUpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNhbGxiYWNrID0gX2FyZ3VtZW50c1tfc3RhdGUgLSAxXTtcbiAgICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaW52b2tlQ2FsbGJhY2soX3N0YXRlLCBjaGlsZCwgY2FsbGJhY2ssIHBhcmVudC5fcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pKCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJlc29sdmVgIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZWNvbWUgcmVzb2x2ZWQgd2l0aCB0aGVcbiAgcGFzc2VkIGB2YWx1ZWAuIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZXNvbHZlKDEpO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgxKTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlc29sdmVcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FueX0gdmFsdWUgdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGhcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSBmdWxmaWxsZWQgd2l0aCB0aGUgZ2l2ZW5cbiAgYHZhbHVlYFxuKi9cbmZ1bmN0aW9uIHJlc29sdmUkMShvYmplY3QpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIHJlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbnZhciBQUk9NSVNFX0lEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDE2KTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBQRU5ESU5HID0gdm9pZCAwO1xudmFyIEZVTEZJTExFRCA9IDE7XG52YXIgUkVKRUNURUQgPSAyO1xuXG52YXIgR0VUX1RIRU5fRVJST1IgPSBuZXcgRXJyb3JPYmplY3QoKTtcblxuZnVuY3Rpb24gc2VsZkZ1bGZpbGxtZW50KCkge1xuICByZXR1cm4gbmV3IFR5cGVFcnJvcihcIllvdSBjYW5ub3QgcmVzb2x2ZSBhIHByb21pc2Ugd2l0aCBpdHNlbGZcIik7XG59XG5cbmZ1bmN0aW9uIGNhbm5vdFJldHVybk93bigpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbn1cblxuZnVuY3Rpb24gZ2V0VGhlbihwcm9taXNlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBHRVRfVEhFTl9FUlJPUi5lcnJvciA9IGVycm9yO1xuICAgIHJldHVybiBHRVRfVEhFTl9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cnlUaGVuKHRoZW4kJDEsIHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgdHJ5IHtcbiAgICB0aGVuJCQxLmNhbGwodmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUsIHRoZW4kJDEpIHtcbiAgYXNhcChmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgIHZhciBzZWFsZWQgPSBmYWxzZTtcbiAgICB2YXIgZXJyb3IgPSB0cnlUaGVuKHRoZW4kJDEsIHRoZW5hYmxlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgIGlmICh0aGVuYWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlYWxlZCA9IHRydWU7XG5cbiAgICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0sICdTZXR0bGU6ICcgKyAocHJvbWlzZS5fbGFiZWwgfHwgJyB1bmtub3duIHByb21pc2UnKSk7XG5cbiAgICBpZiAoIXNlYWxlZCAmJiBlcnJvcikge1xuICAgICAgc2VhbGVkID0gdHJ1ZTtcbiAgICAgIHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgfVxuICB9LCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUpIHtcbiAgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gRlVMRklMTEVEKSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB0aGVuYWJsZS5fcmVzdWx0KTtcbiAgfSBlbHNlIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIHN1YnNjcmliZSh0aGVuYWJsZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlLCB0aGVuJCQxKSB7XG4gIGlmIChtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yID09PSBwcm9taXNlLmNvbnN0cnVjdG9yICYmIHRoZW4kJDEgPT09IHRoZW4gJiYgbWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3Rvci5yZXNvbHZlID09PSByZXNvbHZlJDEpIHtcbiAgICBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCBtYXliZVRoZW5hYmxlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhlbiQkMSA9PT0gR0VUX1RIRU5fRVJST1IpIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCBHRVRfVEhFTl9FUlJPUi5lcnJvcik7XG4gICAgICBHRVRfVEhFTl9FUlJPUi5lcnJvciA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0aGVuJCQxID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoZW4kJDEpKSB7XG4gICAgICBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIHNlbGZGdWxmaWxsbWVudCgpKTtcbiAgfSBlbHNlIGlmIChvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xuICAgIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgdmFsdWUsIGdldFRoZW4odmFsdWUpKTtcbiAgfSBlbHNlIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoUmVqZWN0aW9uKHByb21pc2UpIHtcbiAgaWYgKHByb21pc2UuX29uZXJyb3IpIHtcbiAgICBwcm9taXNlLl9vbmVycm9yKHByb21pc2UuX3Jlc3VsdCk7XG4gIH1cblxuICBwdWJsaXNoKHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBmdWxmaWxsKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHByb21pc2UuX3Jlc3VsdCA9IHZhbHVlO1xuICBwcm9taXNlLl9zdGF0ZSA9IEZVTEZJTExFRDtcblxuICBpZiAocHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoICE9PSAwKSB7XG4gICAgYXNhcChwdWJsaXNoLCBwcm9taXNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9taXNlLl9zdGF0ZSA9IFJFSkVDVEVEO1xuICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XG5cbiAgYXNhcChwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBfc3Vic2NyaWJlcnMgPSBwYXJlbnQuX3N1YnNjcmliZXJzO1xuICB2YXIgbGVuZ3RoID0gX3N1YnNjcmliZXJzLmxlbmd0aDtcblxuICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gIF9zdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIFJFSkVDVEVEXSA9IG9uUmVqZWN0aW9uO1xuXG4gIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgIGFzYXAocHVibGlzaCwgcGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkLFxuICAgICAgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xuXG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfVxuICB9XG5cbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gRXJyb3JPYmplY3QoKSB7XG4gIHRoaXMuZXJyb3IgPSBudWxsO1xufVxuXG52YXIgVFJZX0NBVENIX0VSUk9SID0gbmV3IEVycm9yT2JqZWN0KCk7XG5cbmZ1bmN0aW9uIHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY2FsbGJhY2soZGV0YWlsKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIFRSWV9DQVRDSF9FUlJPUi5lcnJvciA9IGU7XG4gICAgcmV0dXJuIFRSWV9DQVRDSF9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBwcm9taXNlLCBjYWxsYmFjaywgZGV0YWlsKSB7XG4gIHZhciBoYXNDYWxsYmFjayA9IGlzRnVuY3Rpb24oY2FsbGJhY2spLFxuICAgICAgdmFsdWUgPSB1bmRlZmluZWQsXG4gICAgICBlcnJvciA9IHVuZGVmaW5lZCxcbiAgICAgIHN1Y2NlZWRlZCA9IHVuZGVmaW5lZCxcbiAgICAgIGZhaWxlZCA9IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzQ2FsbGJhY2spIHtcbiAgICB2YWx1ZSA9IHRyeUNhdGNoKGNhbGxiYWNrLCBkZXRhaWwpO1xuXG4gICAgaWYgKHZhbHVlID09PSBUUllfQ0FUQ0hfRVJST1IpIHtcbiAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICBlcnJvciA9IHZhbHVlLmVycm9yO1xuICAgICAgdmFsdWUuZXJyb3IgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgICAgcmVqZWN0KHByb21pc2UsIGNhbm5vdFJldHVybk93bigpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSBkZXRhaWw7XG4gICAgc3VjY2VlZGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIC8vIG5vb3BcbiAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoZmFpbGVkKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGxlZCA9PT0gRlVMRklMTEVEKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IFJFSkVDVEVEKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgdHJ5IHtcbiAgICByZXNvbHZlcihmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWx1ZSkge1xuICAgICAgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIGUpO1xuICB9XG59XG5cbnZhciBpZCA9IDA7XG5mdW5jdGlvbiBuZXh0SWQoKSB7XG4gIHJldHVybiBpZCsrO1xufVxuXG5mdW5jdGlvbiBtYWtlUHJvbWlzZShwcm9taXNlKSB7XG4gIHByb21pc2VbUFJPTUlTRV9JRF0gPSBpZCsrO1xuICBwcm9taXNlLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gdW5kZWZpbmVkO1xuICBwcm9taXNlLl9zdWJzY3JpYmVycyA9IFtdO1xufVxuXG5mdW5jdGlvbiBFbnVtZXJhdG9yJDEoQ29uc3RydWN0b3IsIGlucHV0KSB7XG4gIHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmICghdGhpcy5wcm9taXNlW1BST01JU0VfSURdKSB7XG4gICAgbWFrZVByb21pc2UodGhpcy5wcm9taXNlKTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgIHRoaXMubGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuICAgIHRoaXMuX3JlbWFpbmluZyA9IGlucHV0Lmxlbmd0aDtcblxuICAgIHRoaXMuX3Jlc3VsdCA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoIHx8IDA7XG4gICAgICB0aGlzLl9lbnVtZXJhdGUoaW5wdXQpO1xuICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICBmdWxmaWxsKHRoaXMucHJvbWlzZSwgdGhpcy5fcmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KHRoaXMucHJvbWlzZSwgdmFsaWRhdGlvbkVycm9yKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRpb25FcnJvcigpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignQXJyYXkgTWV0aG9kcyBtdXN0IGJlIHByb3ZpZGVkIGFuIEFycmF5Jyk7XG59XG5cbkVudW1lcmF0b3IkMS5wcm90b3R5cGUuX2VudW1lcmF0ZSA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICBmb3IgKHZhciBpID0gMDsgdGhpcy5fc3RhdGUgPT09IFBFTkRJTkcgJiYgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5fZWFjaEVudHJ5KGlucHV0W2ldLCBpKTtcbiAgfVxufTtcblxuRW51bWVyYXRvciQxLnByb3RvdHlwZS5fZWFjaEVudHJ5ID0gZnVuY3Rpb24gKGVudHJ5LCBpKSB7XG4gIHZhciBjID0gdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvcjtcbiAgdmFyIHJlc29sdmUkJDEgPSBjLnJlc29sdmU7XG5cbiAgaWYgKHJlc29sdmUkJDEgPT09IHJlc29sdmUkMSkge1xuICAgIHZhciBfdGhlbiA9IGdldFRoZW4oZW50cnkpO1xuXG4gICAgaWYgKF90aGVuID09PSB0aGVuICYmIGVudHJ5Ll9zdGF0ZSAhPT0gUEVORElORykge1xuICAgICAgdGhpcy5fc2V0dGxlZEF0KGVudHJ5Ll9zdGF0ZSwgaSwgZW50cnkuX3Jlc3VsdCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgX3RoZW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gZW50cnk7XG4gICAgfSBlbHNlIGlmIChjID09PSBQcm9taXNlJDIpIHtcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IGMobm9vcCk7XG4gICAgICBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIGVudHJ5LCBfdGhlbik7XG4gICAgICB0aGlzLl93aWxsU2V0dGxlQXQocHJvbWlzZSwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChuZXcgYyhmdW5jdGlvbiAocmVzb2x2ZSQkMSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSQkMShlbnRyeSk7XG4gICAgICB9KSwgaSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX3dpbGxTZXR0bGVBdChyZXNvbHZlJCQxKGVudHJ5KSwgaSk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IkMS5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uIChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgdGhpcy5fcmVtYWluaW5nLS07XG5cbiAgICBpZiAoc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZXN1bHRbaV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yJDEucHJvdG90eXBlLl93aWxsU2V0dGxlQXQgPSBmdW5jdGlvbiAocHJvbWlzZSwgaSkge1xuICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG5cbiAgc3Vic2NyaWJlKHByb21pc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChGVUxGSUxMRUQsIGksIHZhbHVlKTtcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHJldHVybiBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoUkVKRUNURUQsIGksIHJlYXNvbik7XG4gIH0pO1xufTtcblxuLyoqXG4gIGBQcm9taXNlLmFsbGAgYWNjZXB0cyBhbiBhcnJheSBvZiBwcm9taXNlcywgYW5kIHJldHVybnMgYSBuZXcgcHJvbWlzZSB3aGljaFxuICBpcyBmdWxmaWxsZWQgd2l0aCBhbiBhcnJheSBvZiBmdWxmaWxsbWVudCB2YWx1ZXMgZm9yIHRoZSBwYXNzZWQgcHJvbWlzZXMsIG9yXG4gIHJlamVjdGVkIHdpdGggdGhlIHJlYXNvbiBvZiB0aGUgZmlyc3QgcGFzc2VkIHByb21pc2UgdG8gYmUgcmVqZWN0ZWQuIEl0IGNhc3RzIGFsbFxuICBlbGVtZW50cyBvZiB0aGUgcGFzc2VkIGl0ZXJhYmxlIHRvIHByb21pc2VzIGFzIGl0IHJ1bnMgdGhpcyBhbGdvcml0aG0uXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IHJlc29sdmUoMSk7XG4gIGxldCBwcm9taXNlMiA9IHJlc29sdmUoMik7XG4gIGxldCBwcm9taXNlMyA9IHJlc29sdmUoMyk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBUaGUgYXJyYXkgaGVyZSB3b3VsZCBiZSBbIDEsIDIsIDMgXTtcbiAgfSk7XG4gIGBgYFxuXG4gIElmIGFueSBvZiB0aGUgYHByb21pc2VzYCBnaXZlbiB0byBgYWxsYCBhcmUgcmVqZWN0ZWQsIHRoZSBmaXJzdCBwcm9taXNlXG4gIHRoYXQgaXMgcmVqZWN0ZWQgd2lsbCBiZSBnaXZlbiBhcyBhbiBhcmd1bWVudCB0byB0aGUgcmV0dXJuZWQgcHJvbWlzZXMnc1xuICByZWplY3Rpb24gaGFuZGxlci4gRm9yIGV4YW1wbGU6XG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IHJlc29sdmUoMSk7XG4gIGxldCBwcm9taXNlMiA9IHJlamVjdChuZXcgRXJyb3IoXCIyXCIpKTtcbiAgbGV0IHByb21pc2UzID0gcmVqZWN0KG5ldyBFcnJvcihcIjNcIikpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnMgYmVjYXVzZSB0aGVyZSBhcmUgcmVqZWN0ZWQgcHJvbWlzZXMhXG4gIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgLy8gZXJyb3IubWVzc2FnZSA9PT0gXCIyXCJcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgYWxsXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gZW50cmllcyBhcnJheSBvZiBwcm9taXNlc1xuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIGZvciBsYWJlbGluZyB0aGUgcHJvbWlzZS5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdoZW4gYWxsIGBwcm9taXNlc2AgaGF2ZSBiZWVuXG4gIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQgaWYgYW55IG9mIHRoZW0gYmVjb21lIHJlamVjdGVkLlxuICBAc3RhdGljXG4qL1xuZnVuY3Rpb24gYWxsJDEoZW50cmllcykge1xuICByZXR1cm4gbmV3IEVudW1lcmF0b3IkMSh0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xufVxuXG4vKipcbiAgYFByb21pc2UucmFjZWAgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoIGlzIHNldHRsZWQgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZVxuICBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBzZXR0bGUuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDInKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyByZXN1bHQgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgaXQgd2FzIHJlc29sdmVkIGJlZm9yZSBwcm9taXNlMVxuICAgIC8vIHdhcyByZXNvbHZlZC5cbiAgfSk7XG4gIGBgYFxuXG4gIGBQcm9taXNlLnJhY2VgIGlzIGRldGVybWluaXN0aWMgaW4gdGhhdCBvbmx5IHRoZSBzdGF0ZSBvZiB0aGUgZmlyc3RcbiAgc2V0dGxlZCBwcm9taXNlIG1hdHRlcnMuIEZvciBleGFtcGxlLCBldmVuIGlmIG90aGVyIHByb21pc2VzIGdpdmVuIHRvIHRoZVxuICBgcHJvbWlzZXNgIGFycmF5IGFyZ3VtZW50IGFyZSByZXNvbHZlZCwgYnV0IHRoZSBmaXJzdCBzZXR0bGVkIHByb21pc2UgaGFzXG4gIGJlY29tZSByZWplY3RlZCBiZWZvcmUgdGhlIG90aGVyIHByb21pc2VzIGJlY2FtZSBmdWxmaWxsZWQsIHRoZSByZXR1cm5lZFxuICBwcm9taXNlIHdpbGwgYmVjb21lIHJlamVjdGVkOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ3Byb21pc2UgMicpKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVuc1xuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIHByb21pc2UgMiBiZWNhbWUgcmVqZWN0ZWQgYmVmb3JlXG4gICAgLy8gcHJvbWlzZSAxIGJlY2FtZSBmdWxmaWxsZWRcbiAgfSk7XG4gIGBgYFxuXG4gIEFuIGV4YW1wbGUgcmVhbC13b3JsZCB1c2UgY2FzZSBpcyBpbXBsZW1lbnRpbmcgdGltZW91dHM6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBQcm9taXNlLnJhY2UoW2FqYXgoJ2Zvby5qc29uJyksIHRpbWVvdXQoNTAwMCldKVxuICBgYGBcblxuICBAbWV0aG9kIHJhY2VcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBwcm9taXNlcyBhcnJheSBvZiBwcm9taXNlcyB0byBvYnNlcnZlXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHdoaWNoIHNldHRsZXMgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZSBmaXJzdCBwYXNzZWRcbiAgcHJvbWlzZSB0byBzZXR0bGUuXG4qL1xuZnVuY3Rpb24gcmFjZSQxKGVudHJpZXMpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAoIWlzQXJyYXkoZW50cmllcykpIHtcbiAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uIChfLCByZWplY3QpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhbiBhcnJheSB0byByYWNlLicpKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQ29uc3RydWN0b3IucmVzb2x2ZShlbnRyaWVzW2ldKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gIGBQcm9taXNlLnJlamVjdGAgcmV0dXJucyBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgcGFzc2VkIGByZWFzb25gLlxuICBJdCBpcyBzaG9ydGhhbmQgZm9yIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgcmVqZWN0KG5ldyBFcnJvcignV0hPT1BTJykpO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIENvZGUgaGVyZSBkb2Vzbid0IHJ1biBiZWNhdXNlIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIVxuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnV0hPT1BTJ1xuICB9KTtcbiAgYGBgXG5cbiAgSW5zdGVhZCBvZiB3cml0aW5nIHRoZSBhYm92ZSwgeW91ciBjb2RlIG5vdyBzaW1wbHkgYmVjb21lcyB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1dIT09QUycpKTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIENvZGUgaGVyZSBkb2Vzbid0IHJ1biBiZWNhdXNlIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIVxuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnV0hPT1BTJ1xuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCByZWplY3RcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FueX0gcmVhc29uIHZhbHVlIHRoYXQgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBnaXZlbiBgcmVhc29uYC5cbiovXG5mdW5jdGlvbiByZWplY3QkMShyZWFzb24pIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gbmVlZHNSZXNvbHZlcigpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhIHJlc29sdmVyIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xufVxuXG5mdW5jdGlvbiBuZWVkc05ldygpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKTtcbn1cblxuLyoqXG4gIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcbiAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2UncyBldmVudHVhbCB2YWx1ZSBvciB0aGUgcmVhc29uXG4gIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuXG4gIFRlcm1pbm9sb2d5XG4gIC0tLS0tLS0tLS0tXG5cbiAgLSBgcHJvbWlzZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHdpdGggYSBgdGhlbmAgbWV0aG9kIHdob3NlIGJlaGF2aW9yIGNvbmZvcm1zIHRvIHRoaXMgc3BlY2lmaWNhdGlvbi5cbiAgLSBgdGhlbmFibGVgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB0aGF0IGRlZmluZXMgYSBgdGhlbmAgbWV0aG9kLlxuICAtIGB2YWx1ZWAgaXMgYW55IGxlZ2FsIEphdmFTY3JpcHQgdmFsdWUgKGluY2x1ZGluZyB1bmRlZmluZWQsIGEgdGhlbmFibGUsIG9yIGEgcHJvbWlzZSkuXG4gIC0gYGV4Y2VwdGlvbmAgaXMgYSB2YWx1ZSB0aGF0IGlzIHRocm93biB1c2luZyB0aGUgdGhyb3cgc3RhdGVtZW50LlxuICAtIGByZWFzb25gIGlzIGEgdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2h5IGEgcHJvbWlzZSB3YXMgcmVqZWN0ZWQuXG4gIC0gYHNldHRsZWRgIHRoZSBmaW5hbCByZXN0aW5nIHN0YXRlIG9mIGEgcHJvbWlzZSwgZnVsZmlsbGVkIG9yIHJlamVjdGVkLlxuXG4gIEEgcHJvbWlzZSBjYW4gYmUgaW4gb25lIG9mIHRocmVlIHN0YXRlczogcGVuZGluZywgZnVsZmlsbGVkLCBvciByZWplY3RlZC5cblxuICBQcm9taXNlcyB0aGF0IGFyZSBmdWxmaWxsZWQgaGF2ZSBhIGZ1bGZpbGxtZW50IHZhbHVlIGFuZCBhcmUgaW4gdGhlIGZ1bGZpbGxlZFxuICBzdGF0ZS4gIFByb21pc2VzIHRoYXQgYXJlIHJlamVjdGVkIGhhdmUgYSByZWplY3Rpb24gcmVhc29uIGFuZCBhcmUgaW4gdGhlXG4gIHJlamVjdGVkIHN0YXRlLiAgQSBmdWxmaWxsbWVudCB2YWx1ZSBpcyBuZXZlciBhIHRoZW5hYmxlLlxuXG4gIFByb21pc2VzIGNhbiBhbHNvIGJlIHNhaWQgdG8gKnJlc29sdmUqIGEgdmFsdWUuICBJZiB0aGlzIHZhbHVlIGlzIGFsc28gYVxuICBwcm9taXNlLCB0aGVuIHRoZSBvcmlnaW5hbCBwcm9taXNlJ3Mgc2V0dGxlZCBzdGF0ZSB3aWxsIG1hdGNoIHRoZSB2YWx1ZSdzXG4gIHNldHRsZWQgc3RhdGUuICBTbyBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IHJlamVjdHMgd2lsbFxuICBpdHNlbGYgcmVqZWN0LCBhbmQgYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCBmdWxmaWxscyB3aWxsXG4gIGl0c2VsZiBmdWxmaWxsLlxuXG5cbiAgQmFzaWMgVXNhZ2U6XG4gIC0tLS0tLS0tLS0tLVxuXG4gIGBgYGpzXG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgLy8gb24gc3VjY2Vzc1xuICAgIHJlc29sdmUodmFsdWUpO1xuXG4gICAgLy8gb24gZmFpbHVyZVxuICAgIHJlamVjdChyZWFzb24pO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIEFkdmFuY2VkIFVzYWdlOlxuICAtLS0tLS0tLS0tLS0tLS1cblxuICBQcm9taXNlcyBzaGluZSB3aGVuIGFic3RyYWN0aW5nIGF3YXkgYXN5bmNocm9ub3VzIGludGVyYWN0aW9ucyBzdWNoIGFzXG4gIGBYTUxIdHRwUmVxdWVzdGBzLlxuXG4gIGBgYGpzXG4gIGZ1bmN0aW9uIGdldEpTT04odXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZXI7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICB4aHIuc2VuZCgpO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSB0aGlzLkRPTkUpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignZ2V0SlNPTjogYCcgKyB1cmwgKyAnYCBmYWlsZWQgd2l0aCBzdGF0dXM6IFsnICsgdGhpcy5zdGF0dXMgKyAnXScpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRKU09OKCcvcG9zdHMuanNvbicpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgIC8vIG9uIHJlamVjdGlvblxuICB9KTtcbiAgYGBgXG5cbiAgVW5saWtlIGNhbGxiYWNrcywgcHJvbWlzZXMgYXJlIGdyZWF0IGNvbXBvc2FibGUgcHJpbWl0aXZlcy5cblxuICBgYGBqc1xuICBQcm9taXNlLmFsbChbXG4gICAgZ2V0SlNPTignL3Bvc3RzJyksXG4gICAgZ2V0SlNPTignL2NvbW1lbnRzJylcbiAgXSkudGhlbihmdW5jdGlvbih2YWx1ZXMpe1xuICAgIHZhbHVlc1swXSAvLyA9PiBwb3N0c0pTT05cbiAgICB2YWx1ZXNbMV0gLy8gPT4gY29tbWVudHNKU09OXG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9KTtcbiAgYGBgXG5cbiAgQGNsYXNzIFByb21pc2VcbiAgQHBhcmFtIHtmdW5jdGlvbn0gcmVzb2x2ZXJcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAY29uc3RydWN0b3JcbiovXG5mdW5jdGlvbiBQcm9taXNlJDIocmVzb2x2ZXIpIHtcbiAgdGhpc1tQUk9NSVNFX0lEXSA9IG5leHRJZCgpO1xuICB0aGlzLl9yZXN1bHQgPSB0aGlzLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5fc3Vic2NyaWJlcnMgPSBbXTtcblxuICBpZiAobm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICB0eXBlb2YgcmVzb2x2ZXIgIT09ICdmdW5jdGlvbicgJiYgbmVlZHNSZXNvbHZlcigpO1xuICAgIHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlJDIgPyBpbml0aWFsaXplUHJvbWlzZSh0aGlzLCByZXNvbHZlcikgOiBuZWVkc05ldygpO1xuICB9XG59XG5cblByb21pc2UkMi5hbGwgPSBhbGwkMTtcblByb21pc2UkMi5yYWNlID0gcmFjZSQxO1xuUHJvbWlzZSQyLnJlc29sdmUgPSByZXNvbHZlJDE7XG5Qcm9taXNlJDIucmVqZWN0ID0gcmVqZWN0JDE7XG5Qcm9taXNlJDIuX3NldFNjaGVkdWxlciA9IHNldFNjaGVkdWxlcjtcblByb21pc2UkMi5fc2V0QXNhcCA9IHNldEFzYXA7XG5Qcm9taXNlJDIuX2FzYXAgPSBhc2FwO1xuXG5Qcm9taXNlJDIucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogUHJvbWlzZSQyLFxuXG4gIC8qKlxuICAgIFRoZSBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLFxuICAgIHdoaWNoIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlXG4gICAgcmVhc29uIHdoeSB0aGUgcHJvbWlzZSBjYW5ub3QgYmUgZnVsZmlsbGVkLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAgIC8vIHVzZXIgaXMgYXZhaWxhYmxlXG4gICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHVzZXIgaXMgdW5hdmFpbGFibGUsIGFuZCB5b3UgYXJlIGdpdmVuIHRoZSByZWFzb24gd2h5XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIENoYWluaW5nXG4gICAgLS0tLS0tLS1cbiAgXG4gICAgVGhlIHJldHVybiB2YWx1ZSBvZiBgdGhlbmAgaXMgaXRzZWxmIGEgcHJvbWlzZS4gIFRoaXMgc2Vjb25kLCAnZG93bnN0cmVhbSdcbiAgICBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmlyc3QgcHJvbWlzZSdzIGZ1bGZpbGxtZW50XG4gICAgb3IgcmVqZWN0aW9uIGhhbmRsZXIsIG9yIHJlamVjdGVkIGlmIHRoZSBoYW5kbGVyIHRocm93cyBhbiBleGNlcHRpb24uXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICByZXR1cm4gdXNlci5uYW1lO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiAnZGVmYXVsdCBuYW1lJztcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh1c2VyTmFtZSkge1xuICAgICAgLy8gSWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGB1c2VyTmFtZWAgd2lsbCBiZSB0aGUgdXNlcidzIG5hbWUsIG90aGVyd2lzZSBpdFxuICAgICAgLy8gd2lsbCBiZSBgJ2RlZmF1bHQgbmFtZSdgXG4gICAgfSk7XG4gIFxuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gaWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGByZWFzb25gIHdpbGwgYmUgJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jy5cbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgcmVqZWN0ZWQsIGByZWFzb25gIHdpbGwgYmUgJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlJ3JlIHVuaGFwcHknLlxuICAgIH0pO1xuICAgIGBgYFxuICAgIElmIHRoZSBkb3duc3RyZWFtIHByb21pc2UgZG9lcyBub3Qgc3BlY2lmeSBhIHJlamVjdGlvbiBoYW5kbGVyLCByZWplY3Rpb24gcmVhc29ucyB3aWxsIGJlIHByb3BhZ2F0ZWQgZnVydGhlciBkb3duc3RyZWFtLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgdGhyb3cgbmV3IFBlZGFnb2dpY2FsRXhjZXB0aW9uKCdVcHN0cmVhbSBlcnJvcicpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAvLyBUaGUgYFBlZGdhZ29jaWFsRXhjZXB0aW9uYCBpcyBwcm9wYWdhdGVkIGFsbCB0aGUgd2F5IGRvd24gdG8gaGVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBBc3NpbWlsYXRpb25cbiAgICAtLS0tLS0tLS0tLS1cbiAgXG4gICAgU29tZXRpbWVzIHRoZSB2YWx1ZSB5b3Ugd2FudCB0byBwcm9wYWdhdGUgdG8gYSBkb3duc3RyZWFtIHByb21pc2UgY2FuIG9ubHkgYmVcbiAgICByZXRyaWV2ZWQgYXN5bmNocm9ub3VzbHkuIFRoaXMgY2FuIGJlIGFjaGlldmVkIGJ5IHJldHVybmluZyBhIHByb21pc2UgaW4gdGhlXG4gICAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgICB1bnRpbCB0aGUgcmV0dXJuZWQgcHJvbWlzZSBpcyBzZXR0bGVkLiBUaGlzIGlzIGNhbGxlZCAqYXNzaW1pbGF0aW9uKi5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgLy8gVGhlIHVzZXIncyBjb21tZW50cyBhcmUgbm93IGF2YWlsYWJsZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBJZiB0aGUgYXNzaW1saWF0ZWQgcHJvbWlzZSByZWplY3RzLCB0aGVuIHRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCBhbHNvIHJlamVjdC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChjb21tZW50cykge1xuICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCBmdWxmaWxscywgd2UnbGwgaGF2ZSB0aGUgdmFsdWUgaGVyZVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIElmIGBmaW5kQ29tbWVudHNCeUF1dGhvcmAgcmVqZWN0cywgd2UnbGwgaGF2ZSB0aGUgcmVhc29uIGhlcmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgU2ltcGxlIEV4YW1wbGVcbiAgICAtLS0tLS0tLS0tLS0tLVxuICBcbiAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBsZXQgcmVzdWx0O1xuICBcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gZmluZFJlc3VsdCgpO1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfVxuICAgIGBgYFxuICBcbiAgICBFcnJiYWNrIEV4YW1wbGVcbiAgXG4gICAgYGBganNcbiAgICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gZmFpbHVyZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc3VjY2Vzc1xuICAgICAgfVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBQcm9taXNlIEV4YW1wbGU7XG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBmaW5kUmVzdWx0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgLy8gc3VjY2Vzc1xuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEFkdmFuY2VkIEV4YW1wbGVcbiAgICAtLS0tLS0tLS0tLS0tLVxuICBcbiAgICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gIFxuICAgIGBgYGphdmFzY3JpcHRcbiAgICBsZXQgYXV0aG9yLCBib29rcztcbiAgXG4gICAgdHJ5IHtcbiAgICAgIGF1dGhvciA9IGZpbmRBdXRob3IoKTtcbiAgICAgIGJvb2tzICA9IGZpbmRCb29rc0J5QXV0aG9yKGF1dGhvcik7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9XG4gICAgYGBgXG4gIFxuICAgIEVycmJhY2sgRXhhbXBsZVxuICBcbiAgICBgYGBqc1xuICBcbiAgICBmdW5jdGlvbiBmb3VuZEJvb2tzKGJvb2tzKSB7XG4gIFxuICAgIH1cbiAgXG4gICAgZnVuY3Rpb24gZmFpbHVyZShyZWFzb24pIHtcbiAgXG4gICAgfVxuICBcbiAgICBmaW5kQXV0aG9yKGZ1bmN0aW9uKGF1dGhvciwgZXJyKXtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZpbmRCb29va3NCeUF1dGhvcihhdXRob3IsIGZ1bmN0aW9uKGJvb2tzLCBlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3VuZEJvb2tzKGJvb2tzKTtcbiAgICAgICAgICAgICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBmYWlsdXJlKHJlYXNvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFByb21pc2UgRXhhbXBsZTtcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGZpbmRBdXRob3IoKS5cbiAgICAgIHRoZW4oZmluZEJvb2tzQnlBdXRob3IpLlxuICAgICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAgIC8vIGZvdW5kIGJvb2tzXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgdGhlblxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsZmlsbGVkXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3RlZFxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICB0aGVuOiB0aGVuLFxuXG4gIC8qKlxuICAgIGBjYXRjaGAgaXMgc2ltcGx5IHN1Z2FyIGZvciBgdGhlbih1bmRlZmluZWQsIG9uUmVqZWN0aW9uKWAgd2hpY2ggbWFrZXMgaXQgdGhlIHNhbWVcbiAgICBhcyB0aGUgY2F0Y2ggYmxvY2sgb2YgYSB0cnkvY2F0Y2ggc3RhdGVtZW50LlxuICBcbiAgICBgYGBqc1xuICAgIGZ1bmN0aW9uIGZpbmRBdXRob3IoKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY291bGRuJ3QgZmluZCB0aGF0IGF1dGhvcicpO1xuICAgIH1cbiAgXG4gICAgLy8gc3luY2hyb25vdXNcbiAgICB0cnkge1xuICAgICAgZmluZEF1dGhvcigpO1xuICAgIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICAgIH1cbiAgXG4gICAgLy8gYXN5bmMgd2l0aCBwcm9taXNlc1xuICAgIGZpbmRBdXRob3IoKS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQG1ldGhvZCBjYXRjaFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG4gICdjYXRjaCc6IGZ1bmN0aW9uIF9jYXRjaChvblJlamVjdGlvbikge1xuICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pO1xuICB9XG59O1xuXG4vKmdsb2JhbCBzZWxmKi9cbmZ1bmN0aW9uIHBvbHlmaWxsJDEoKSB7XG4gICAgdmFyIGxvY2FsID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gZ2xvYmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGxvY2FsID0gc2VsZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9jYWwgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIFAgPSBsb2NhbC5Qcm9taXNlO1xuXG4gICAgaWYgKFApIHtcbiAgICAgICAgdmFyIHByb21pc2VUb1N0cmluZyA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9taXNlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBzaWxlbnRseSBpZ25vcmVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvbWlzZVRvU3RyaW5nID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9jYWwuUHJvbWlzZSA9IFByb21pc2UkMjtcbn1cblxuLy8gU3RyYW5nZSBjb21wYXQuLlxuUHJvbWlzZSQyLnBvbHlmaWxsID0gcG9seWZpbGwkMTtcblByb21pc2UkMi5Qcm9taXNlID0gUHJvbWlzZSQyO1xuXG5yZXR1cm4gUHJvbWlzZSQyO1xuXG59KSkpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lczYtcHJvbWlzZS5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gdmVydHggKGlnbm9yZWQpXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9