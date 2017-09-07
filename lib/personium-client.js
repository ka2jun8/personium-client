module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var request = __webpack_require__(1);
var utility_1 = __webpack_require__(2);
//for using Promise on es5
var es6_promise_1 = __webpack_require__(3);
var PersoniumClient = /** @class */ (function () {
    function PersoniumClient(unit) {
        this.host = null;
        this.personiumToken = null;
        this.token = null;
        if (!unit) {
            console.warn("Please set `host` address");
        }
        else if (unit.lastIndexOf("http") === 0) {
            console.warn("`host` does not need protocol prefix");
        }
        this.host = unit;
    }
    PersoniumClient.prototype.login = function (cell, username, password) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var url = _this.createCellSchema(cell) + "__token";
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
                    resolve(token);
                }
            });
        });
    };
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
    PersoniumClient.prototype.deleteRole = function (cell, role, box, _token) {
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
    PersoniumClient.prototype.setExtCellLink = function (cell, targetCellUrl, type, name, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__ctl/ExtCell('" + utility_1.Encode(targetCellUrl) + "')/\$links/" + type;
            var role = "";
            if (name) {
                role = "(Name='" + name + "')";
            }
            else if (name && box) {
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
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
    PersoniumClient.prototype.deleteExtCellLink = function (cell, targetCellUrl, type, name, box, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var role = "";
            if (name) {
                role = "(Name='" + name + "')";
            }
            else if (name && box) {
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
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
    PersoniumClient.prototype.getRules = function (cell, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + "__rule/";
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
                    resolve(response);
                }
            });
        });
    };
    PersoniumClient.prototype.sendMessage = function (cell, to, type, requestContent, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var cellUrl = _this.createCellSchema(cell);
            var toUrl = _this.createCellSchema(to);
            var url = _this.createCellSchema(cell) + "__message/send/";
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
    PersoniumClient.prototype.isExist = function (cell, path, __id, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path + "('" + __id + "')";
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
    //エンティティ取得
    PersoniumClient.prototype.get = function (cell, path, query, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path;
            if (query) {
                url += "?" + "\$orderby=" + utility_1.Encode(query);
            }
            else {
                url += "?\orderby=__updated%20desc";
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
    //エンティティ書き込み
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
    //エンティティ上書き
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
    PersoniumClient.prototype.delete = function (cell, path, id, _token) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            var token = _token || _this.token;
            var url = _this.createCellSchema(cell) + path + "('" + id + "')";
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
    PersoniumClient.prototype.createCellSchema = function (cell) {
        return "https://" + this.host + "/" + cell + "/";
    };
    PersoniumClient.prototype.extractCellName = function (url) {
        var cell = url.substring(url.indexOf(this.host) + this.host.length + 1, url.lastIndexOf("/"));
        return cell;
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 2 */
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODM5Mzg3NWQ3YjNjOGNhYWM4ZDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcmFnZW50XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXM2LXByb21pc2VcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHFDQUFzQztBQUN0Qyx1Q0FBMkM7QUFFM0MsMEJBQTBCO0FBQzFCLDJDQUFzQztBQWlHdEM7SUFLSSx5QkFBWSxJQUFZO1FBSnhCLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsbUJBQWMsR0FBeUIsSUFBSSxDQUFDO1FBQzVDLFVBQUssR0FBVyxJQUFJLENBQUM7UUFHakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RD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QUFDO0lBQ2YsSUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN6RCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDeEIsT0FBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqQixLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixFQUFFLEVBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBTSxRQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsSUFBTSxPQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsUUFBUSxHQUFHLFFBQU0sR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFLLENBQUM7UUFDM0QsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ3BCLENBQUMsQ0FBQzs7Ozs7OztBQ25ERix3QyIsImZpbGUiOiIuL2xpYi9wZXJzb25pdW0tY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODM5Mzg3NWQ3YjNjOGNhYWM4ZDYiLCJpbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gXCJzdXBlcmFnZW50XCI7XG5pbXBvcnQgeyBFbmNvZGUsIERlY29kZSB9IGZyb20gXCIuL3V0aWxpdHlcIjtcblxuLy9mb3IgdXNpbmcgUHJvbWlzZSBvbiBlczVcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tIFwiZXM2LXByb21pc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQZXJzb25pdW1BY2Nlc3NUb2tlbiB7XG4gICAgYWNjZXNzX3Rva2VuOiBzdHJpbmcsXG4gICAgcmVmcmVzaF90b2tlbjogc3RyaW5nLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bVJlc3BvbnNlIHtcbiAgICBkOiB7XG4gICAgICAgIHJlc3VsdHM6IGFueSxcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtRGF0YSB7XG4gICAgX19tZXRhZGF0YToge1xuICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgZXRhZzogc3RyaW5nLFxuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgfSxcbiAgICBfX3B1Ymxpc2hlZDogc3RyaW5nLCAvL0RhdGUoeHh4KVxuICAgIF9fdXBkYXRlZDogc3RyaW5nLCAvL0RhdGUoeHh4KVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEV4dENlbGwgZXh0ZW5kcyBQZXJzb25pdW1EYXRhIHtcbiAgICBVcmw6IHN0cmluZyxcbiAgICBfUm9sZToge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIF9SZWxhdGlvbjoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfSxcbiAgICB9LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJ1bGUge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICBzZXJ2aWNlOiBzdHJpbmcsXG4gICAgYWN0aW9uOiBzdHJpbmcsXG4gICAgZG9hY3Rpb246IHN0cmluZyxcbiAgICBvYmplY3Q6IHN0cmluZyxcbiAgICBleHRzZXJ2aWNlOiBzdHJpbmcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NyaXB0IHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgdXJpOiBzdHJpbmcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVsZXMge1xuICAgIHJ1bGVzOiBSdWxlW10sXG4gICAgc2NyaXB0czogU2NyaXB0W10sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGluayBleHRlbmRzIFBlcnNvbml1bURhdGEge1xuICAgIHVyaTogc3RyaW5nLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvbGUgZXh0ZW5kcyBQZXJzb25pdW1EYXRhIHtcbiAgICBOYW1lOiBzdHJpbmcsXG4gICAgXCJfQm94Lk5hbWVcIjogc3RyaW5nLFxuICAgIF9Cb3g6IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9BY2NvdW50OiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfRXh0Q2VsbDoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX0V4dFJvbGU6IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9SZWxhdGlvbjoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQZXJzb25pdW1Qcm9maWxlUmVzcG9uc2Uge1xuICAgIERpc3BsYXlOYW1lOiBzdHJpbmcsXG4gICAgRGVzY3JpcHRpb246IHN0cmluZyxcbiAgICBJbWFnZTogc3RyaW5nLFxuICAgIFByb2ZpbGVJbWFnZU5hbWU6IHN0cmluZyxcbn1cblxuZXhwb3J0IGNsYXNzIFBlcnNvbml1bUNsaWVudCB7XG4gICAgaG9zdDogc3RyaW5nID0gbnVsbDtcbiAgICBwZXJzb25pdW1Ub2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBudWxsO1xuICAgIHRva2VuOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IodW5pdDogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdW5pdCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiUGxlYXNlIHNldCBgaG9zdGAgYWRkcmVzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1bml0Lmxhc3RJbmRleE9mKFwiaHR0cFwiKSA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiYGhvc3RgIGRvZXMgbm90IG5lZWQgcHJvdG9jb2wgcHJlZml4XCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaG9zdCA9IHVuaXQ7XG4gICAgfVxuXG4gICAgbG9naW4oY2VsbDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1BY2Nlc3NUb2tlbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX3Rva2VuXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnR5cGUoXCJmb3JtXCIpXG4gICAgICAgICAgICAgICAgLnNlbmQoeyBncmFudF90eXBlOiBcInBhc3N3b3JkXCIsIHVzZXJuYW1lLCBwYXNzd29yZCB9KVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlZnJlc2hBY2Nlc3NUb2tlbihjZWxsOiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nLCB0YXJnZXQ/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuU2VlZHMgPSB0YXJnZXQgPyB7XG4gICAgICAgICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgIHBfdGFyZ2V0OiB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEodGFyZ2V0KSxcbiAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh0b2tlblNlZWRzKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVSb2xlKGNlbGw6IHN0cmluZywgcm9sZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUm9sZS9cIjtcbiAgICAgICAgICAgIGNvbnN0IGJveE5hbWUgPSBib3ggfHwgbnVsbDtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgICAgICBpZighcm9sZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBOYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihib3gpe1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZTogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX0JveC5OYW1lXCI6IGJveE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIC5zZW5kKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Um9sZShjZWxsOiBzdHJpbmcsIHJvbGU/OiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxSb2xlW118Um9sZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1JvbGVcIjtcbiAgICAgICAgICAgIGlmIChyb2xlKSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiKE5hbWU9J1wiICsgcm9sZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIGlmKHJvbGUgJiYgYm94KXtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlUm9sZShjZWxsOiBzdHJpbmcsIHJvbGU/OiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUm9sZVwiO1xuICAgICAgICAgICAgaWYgKHJvbGUpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2UgaWYocm9sZSAmJiBib3gpe1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihOYW1lPSdcIiArIHJvbGUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgc2V0RXh0Q2VsbChjZWxsOiBzdHJpbmcsIHNldENlbGxVcmw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsL1wiO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBVcmw6IHNldENlbGxVcmwsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZChkYXRhKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRFeHRDZWxsTGlzdChjZWxsOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RXh0Q2VsbFtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsL1wiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZUV4dENlbGwoY2VsbDogc3RyaW5nLCBkZWxldGVDZWxsVXJsOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbCgnXCIgKyBFbmNvZGUoZGVsZXRlQ2VsbFVybCkgKyBcIicpXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRFeHRDZWxsTGluayhjZWxsOiBzdHJpbmcsIHRhcmdldENlbGxVcmw6IHN0cmluZywgdHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZSh0YXJnZXRDZWxsVXJsKSArIFwiJykvXFwkbGlua3MvXCIgKyB0eXBlO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSBcIlwiO1xuICAgICAgICAgICAgaWYobmFtZSl7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIGlmKG5hbWUgJiYgYm94KXtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHVyaTogdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9cIiArIHR5cGUuc3Vic3RyaW5nKDEpICsgcm9sZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoZGF0YSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RXh0Q2VsbExpbmsoY2VsbDogc3RyaW5nLCB0YXJnZXRDZWxsVXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxMaW5rW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwoJ1wiICsgRW5jb2RlKHRhcmdldENlbGxVcmwpICsgXCInKS9cXCRsaW5rcy9cIiArIHR5cGU7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlRXh0Q2VsbExpbmsoY2VsbDogc3RyaW5nLCB0YXJnZXRDZWxsVXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCByb2xlID0gXCJcIjtcbiAgICAgICAgICAgIGlmKG5hbWUpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZihuYW1lICYmIGJveCl7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZSh0YXJnZXRDZWxsVXJsKSArIFwiJykvXFwkbGlua3MvXCIgKyB0eXBlICsgcm9sZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFJ1bGVzKGNlbGw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxSdWxlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19ydWxlL1wiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBSdWxlcyA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoY2VsbDogc3RyaW5nLCB0bzogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIHJlcXVlc3RDb250ZW50OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtUHJvZmlsZVJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgY2VsbFVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IHRvVXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKHRvKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19tZXNzYWdlL3NlbmQvXCI7XG5cbiAgICAgICAgICAgIGxldCBib2R5ID0ge307XG5cbiAgICAgICAgICAgIGlmICh0eXBlLmxhc3RJbmRleE9mKFwicmVxLnJ1bGUuXCIsIDApID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgVG86IHRvVXJsLFxuICAgICAgICAgICAgICAgICAgICBUeXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UnVsZTogcmVxdWVzdENvbnRlbnQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZS5sYXN0SW5kZXhPZihcInJlcS5yb2xlLlwiLCAwKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIFRvOiB0b1VybCxcbiAgICAgICAgICAgICAgICAgICAgVHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdFJlbGF0aW9uOiByZXF1ZXN0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdFJlbGF0aW9uVGFyZ2V0OiBjZWxsVXJsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGJvZHkpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVzLnRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQcm9maWxlKGNlbGw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtUHJvZmlsZVJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbHVybCArIFwiX18vcHJvZmlsZS5qc29uXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1Qcm9maWxlUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzRXhpc3QoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIF9faWQ6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiKCdcIiArIF9faWQgKyBcIicpXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/jgqjjg7Pjg4bjgqPjg4bjgqPlj5blvpdcbiAgICBnZXQoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHF1ZXJ5Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bURhdGFbXSB8IFBlcnNvbml1bURhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHVybCArPSBcIj9cIiArIFwiXFwkb3JkZXJieT1cIiArIEVuY29kZShxdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSBcIj9cXG9yZGVyYnk9X191cGRhdGVkJTIwZGVzY1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v44Ko44Oz44OG44Kj44OG44Kj5pu444GN6L6844G/XG4gICAgcG9zdChjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW50aXR5OiBhbnksIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGVudGl0eSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v44Ko44Oz44OG44Kj44OG44Kj5LiK5pu444GNXG4gICAgdXBkYXRlKGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBpZDogc3RyaW5nLCBlbnRpdHk6IGFueSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIoJ1wiICsgaWQgKyBcIicpXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnB1dCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGVudGl0eSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBpZDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIignXCIgKyBpZCArIFwiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZUNlbGxTY2hlbWEoY2VsbDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly8ke3RoaXMuaG9zdH0vJHtjZWxsfS9gO1xuICAgIH1cblxuICAgIGV4dHJhY3RDZWxsTmFtZSh1cmw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjZWxsID0gdXJsLnN1YnN0cmluZyh1cmwuaW5kZXhPZih0aGlzLmhvc3QpICsgdGhpcy5ob3N0Lmxlbmd0aCArIDEsIHVybC5sYXN0SW5kZXhPZihcIi9cIikpO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG5cbn1cblxuXG4vLyAvKlxuLy8gLy9UT0RPIOOCueOCreODvOODnuiqjeiovOeUqOOBrkFQSeOAglxuLy8gLy9QZXJzb25pdW3jgqLjg5fjg6rjg57jg7zjgrHjg4Pjg4jliKnnlKjmmYLjgavkvb/jgYbjgZPjgajjgavjgarjgovjgoTjgoLjgZfjgozjgazjgIJcbi8vIGV4cG9ydCBjb25zdCB0cmFuc2NlbGx0b2tlbiA9IChqb3NoaTogc3RyaW5nLCBidWthOiBzdHJpbmcpID0+IHtcbi8vICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgIGNvbnN0IHVybCA9IGNyZWF0ZUNlbGxTY2hlbWEoYnVrYSkrXCJfX3Rva2VuXCI7XG4vLyAgICAgcmVxdWVzdFxuLy8gICAgICAgLnBvc3QodXJsKVxuLy8gICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbi8vICAgICAgIC50eXBlKFwiZm9ybVwiKVxuLy8gICAgICAgLnNlbmQoe1xuLy8gICAgICAgICBncmFudF90eXBlOiBcInBhc3N3b3JkXCIsIFxuLy8gICAgICAgICB1c2VybmFtZTogXCJib2JcIiwgIC8vVE9ETyBcbi8vICAgICAgICAgcGFzc3dvcmQ6IFwicGl5b3BpeW9cIiwgLy9UT0RPIFxuLy8gICAgICAgICBwX3RhcmdldDogY3JlYXRlQ2VsbFNjaGVtYShqb3NoaSksXG4vLyAgICAgICB9KVxuLy8gICAgICAgLmVuZCgoZXJyb3IsIHJlcyk9Pntcbi8vICAgICAgICAgaWYoZXJyb3Ipe1xuLy8gICAgICAgICAgIHJlamVjdChlcnJvcik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSB7XG4vLyAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcy50ZXh0KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH07XG4vLyBleHBvcnQgY29uc3QgcmVmcmVzaEFjY2Vzc1Rva2VuID0gKGpvc2hpOiBzdHJpbmcsIGJ1a2E6IHN0cmluZywgYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbikgPT4ge1xuLy8gICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4vLyAgICAgY29uc3QgdXJsID0gY3JlYXRlQ2VsbFNjaGVtYShqb3NoaSkrXCJfX3Rva2VuXCI7XG4vLyAgICAgcmVxdWVzdFxuLy8gICAgICAgLnBvc3QodXJsKVxuLy8gICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbi8vICAgICAgIC50eXBlKFwiZm9ybVwiKVxuLy8gICAgICAgLnNlbmQoe1xuLy8gICAgICAgICBncmFudF90eXBlOiBcInJlZnJlc2hfdG9rZW5cIiwgXG4vLyAgICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbi8vICAgICAgICAgY2xpZW50X2lkOiBjcmVhdGVDZWxsU2NoZW1hKGJ1a2EpLFxuLy8gICAgICAgICBjbGllbnRfc2VjcmV0OiBhY2Nlc3NUb2tlbixcbi8vICAgICAgIH0pXG4vLyAgICAgICAuZW5kKChlcnJvciwgcmVzKT0+e1xuLy8gICAgICAgICBpZihlcnJvcil7XG4vLyAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVzLnRleHQpKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfTtcbi8vICovXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJhZ2VudFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInN1cGVyYWdlbnRcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBzcGxpdFdvcmQgPSAob3JpZ2luYWw6IHN0cmluZykgPT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgd2hpbGUoaW5kZXggPCBvcmlnaW5hbC5sZW5ndGgpe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gb3JpZ2luYWwuc3Vic3RyaW5nKGluZGV4LCBpbmRleCsxKTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IEVzY2FwZVNlcXVlbmNlTWFwID0ge1xuICAgIFwiOlwiOiBcIiUzQVwiLFxuICAgIFwiL1wiOiBcIiUyRlwiLFxuICAgIFwiIFwiOiBcIiUyMFwiLFxufTtcblxuY29uc3QgcmV2ZXJzZU1hcCA9IChtYXApID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgcmVzdWx0W21hcFtrZXldXSA9IGtleTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IEVuY29kZSA9IChvcmlnaW5hbDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHJlc3VsdEFycmF5ID0gc3BsaXRXb3JkKG9yaWdpbmFsKTtcbiAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5Lm1hcCgoY2hhcmFjdGVyKSA9PiB7XG4gICAgICAgIGlmKEVzY2FwZVNlcXVlbmNlTWFwW2NoYXJhY3Rlcl0pe1xuICAgICAgICAgICAgcmV0dXJuIEVzY2FwZVNlcXVlbmNlTWFwW2NoYXJhY3Rlcl07XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRBcnJheS5qb2luKFwiXCIpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgY29uc3QgRGVjb2RlID0gKG9yaWdpbmFsOiBzdHJpbmcpID0+IHtcbiAgICBsZXQgaW5kZXggPSAtMjtcbiAgICBjb25zdCBSZXZlcnNlU2VxdWVuY2VNYXAgPSByZXZlcnNlTWFwKEVzY2FwZVNlcXVlbmNlTWFwKTtcbiAgICBsZXQgc2VudGVuY2UgPSBvcmlnaW5hbDtcbiAgICB3aGlsZShpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgaW5kZXggPSBzZW50ZW5jZS5pbmRleE9mKFwiJVwiKTtcbiAgICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gc2VudGVuY2Uuc3Vic3RyaW5nKGluZGV4LCBpbmRleCs1KTtcbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IHNlbnRlbmNlLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IHNlbnRlbmNlLnN1YnN0cmluZyhpbmRleCs1KTtcbiAgICAgICAgICAgIHNlbnRlbmNlID0gYmVmb3JlICsgUmV2ZXJzZVNlcXVlbmNlTWFwW3RhcmdldF0gKyBhZnRlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VudGVuY2U7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxpdHkudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlczYtcHJvbWlzZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImVzNi1wcm9taXNlXCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==