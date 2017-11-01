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
var js2xml = __webpack_require__(2);
var utility_1 = __webpack_require__(3);
//for using Promise on es5
var es6_promise_1 = __webpack_require__(4);
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
            var url = targetPath ? cellurl + "/" + targetPath : cellurl;
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("js2xmlparser");

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjAzZTBiOTIyZDJjYWZjZDE3MWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcmFnZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianMyeG1scGFyc2VyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXM2LXByb21pc2VcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHFDQUFzQztBQUN0QyxvQ0FBdUM7QUFDdkMsdUNBQXFFO0FBRXJFLDBCQUEwQjtBQUMxQiwyQ0FBc0M7QUFpS3RDOztHQUVHO0FBQ0g7SUE4Qkk7Ozs7T0FJRztJQUNILHlCQUFZLElBQVksRUFBRSxRQUFpQjtRQWxDM0M7O1dBRUc7UUFDSCxhQUFRLEdBQVcsT0FBTyxDQUFDO1FBQzNCOztXQUVHO1FBQ0gsU0FBSSxHQUFXLElBQUksQ0FBQztRQUNwQjs7V0FFRztRQUNILG1CQUFjLEdBQXlCLElBQUksQ0FBQztRQUM1Qzs7V0FFRztRQUNILFVBQUssR0FBVyxJQUFJLENBQUM7UUFDckI7O1dBRUc7UUFDSCxhQUFRLEdBQVcsSUFB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cnNvbml1bS1jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMDNlMGI5MjJkMmNhZmNkMTcxZCIsImltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSBcInN1cGVyYWdlbnRcIjtcbmltcG9ydCAqIGFzIGpzMnhtbCBmcm9tIFwianMyeG1scGFyc2VyXCI7XG5pbXBvcnQgeyBFbmNvZGUsIERlY29kZSwgY29udmVydFF1ZXJpZWRVcmwsIFF1ZXJ5IH0gZnJvbSBcIi4vdXRpbGl0eVwiO1xuXG4vL2ZvciB1c2luZyBQcm9taXNlIG9uIGVzNVxuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJlczYtcHJvbWlzZVwiO1xuXG4vKipcbiAqIFBlcnNvbml1beOBruOCouOCr+OCu+OCueODiOODvOOCr+ODs+aDheWgsVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bUFjY2Vzc1Rva2VuIHtcbiAgICBhY2Nlc3NfdG9rZW46IHN0cmluZyxcbiAgICByZWZyZXNoX3Rva2VuOiBzdHJpbmcsXG4gICAgZXhwaXJlX2luOiBudW1iZXIsXG59XG5cbi8qKlxuICogUGVyc29uaXVt44Gu44Os44K544Od44Oz44K544OH44O844K/5Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtUmVzcG9uc2Uge1xuICAgIGQ6IHtcbiAgICAgICAgcmVzdWx0czogYW55LFxuICAgIH1cbn1cblxuLyoqXG4gKiBQZXJzb25pdW3jga7jg4fjg7zjgr/lnotcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQZXJzb25pdW1EYXRhIHtcbiAgICBfX21ldGFkYXRhOiB7XG4gICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICBldGFnOiBzdHJpbmcsXG4gICAgICAgIHR5cGU6IHN0cmluZyxcbiAgICB9LFxuICAgIF9fcHVibGlzaGVkOiBzdHJpbmcsIC8vRGF0ZSh4eHgpXG4gICAgX191cGRhdGVkOiBzdHJpbmcsIC8vRGF0ZSh4eHgpXG59XG5cbi8qKlxuICog5aSW6YOo44K744Or44Gu44OH44O844K/5Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0Q2VsbCBleHRlbmRzIFBlcnNvbml1bURhdGEge1xuICAgIFVybDogc3RyaW5nLFxuICAgIF9Sb2xlOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgX1JlbGF0aW9uOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9LFxuICAgIH0sXG59XG5cbi8qKlxuICog44Or44O844Or44Gu5Z6LXG4gKiAvL+WkieOCj+OCi+OBi+OCglxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJ1bGUge1xuICAgIEV4dGVybmFsPzogYm9vbGVhbixcbiAgICBTZXJ2aWNlOiBzdHJpbmcsXG4gICAgQWN0aW9uOiBzdHJpbmcsXG4gICAgVHlwZTogc3RyaW5nLFxuICAgIE9iamVjdDogc3RyaW5nLFxuICAgIFwiX0JveC5OYW1lXCI/OiBzdHJpbmcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNlIHtcbiAgICBcIkQ6cHJpbmNpcGFsXCI6IHtcbiAgICAgICAgXCJEOmhyZWZcIjogc3RyaW5nLFxuICAgIH0sXG4gICAgXCJEOmdyYW50XCI6IHtcbiAgICAgICAgcHJpdmlsZWdlOiB7W2FjZVR5cGU6IHN0cmluZ106IHt9fVtdLFxuICAgIH0sXG59XG5leHBvcnQgaW50ZXJmYWNlIEFjbCB7XG4gICAgXCJAXCI6IHtcbiAgICAgICAgXCJ4bWxuczpEXCI6IFwiREFWOlwiLFxuICAgICAgICBcInhtbG5zOnBcIjogXCJ1cm46eC1wZXJzb25pdW06eG1sbnNcIixcbiAgICB9LFxuICAgIFwiRDphY2VcIjogQWNlW10sXG59XG5cbi8qKlxuICog44K544Kv44Oq44OX44OI44Gu5Z6LXG4gKiAvL+WkieOCj+OCi+OBi+OCglxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdCB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHVyaTogc3RyaW5nLFxufVxuXG4vKipcbiAqIExpbmvlnosgRXh0Q2VsbOOBrkxpbmvjgarjgalcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaW5rIGV4dGVuZHMgUGVyc29uaXVtRGF0YSB7XG4gICAgdXJpOiBzdHJpbmcsXG59XG5cbi8qKlxuICogUm9sZeWei1xuICovIFxuZXhwb3J0IGludGVyZmFjZSBSb2xlIGV4dGVuZHMgUGVyc29uaXVtRGF0YSB7XG4gICAgTmFtZTogc3RyaW5nLFxuICAgIFwiX0JveC5OYW1lXCI6IHN0cmluZyxcbiAgICBfQm94OiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfQWNjb3VudDoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX0V4dENlbGw6IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9FeHRSb2xlOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfUmVsYXRpb246IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICog5YWs6ZaL44GV44KM44Gm44GE44KL44OX44Ot44OV44Kj44O844Or5oOF5aCx44Gu44Os44K544Od44Oz44K55Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtUHJvZmlsZVJlc3BvbnNlIHtcbiAgICBEaXNwbGF5TmFtZTogc3RyaW5nLFxuICAgIERlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgSW1hZ2U6IHN0cmluZyxcbiAgICBQcm9maWxlSW1hZ2VOYW1lOiBzdHJpbmcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtTGF1bmNoSnNvbiB7XG4gICAgcGVyc29uYWw6IHtcbiAgICAgICAgd2ViOiBzdHJpbmcsXG4gICAgICAgIGFuZHJvaWQ6IHN0cmluZyxcbiAgICAgICAgaW9zOiBzdHJpbmcsXG4gICAgICAgIGFwcFRva2VuSWQ6IHN0cmluZyxcbiAgICAgICAgYXBwVG9rZW5Qdzogc3RyaW5nLFxuICAgIH1cbn1cblxuLyoqXG4gKiDjg6Hjg4Pjgrvjg7zjgrjpgIHkv6Hjga7jgr/jgqTjg5flnotcbiAqL1xuZXhwb3J0IHR5cGUgTWVzc2FnZVNlbmRUeXBlID0gXG4gICAgXCJtZXNzYWdlXCJ8IC8v5Y2Y44Gq44KL44Oh44OD44K744O844K46YCB5L+hXG4gICAgXCJyZXEucmVsYXRpb24uYnVpbGRcInwgLy/plqLkv4LmgKfmp4vnr4nkvp3poLxcbiAgICBcInJlcS5yZWxhdGlvbi5icmVha1wifCAvL+mWouS/guaAp+egtOajhOS+nemgvFxuICAgIFwicmVxLnJvbGUuZ3JhbnRcInwgLy/jg63jg7zjg6voqK3lrprkvp3poLxcbiAgICBcInJlcS5yb2xlLnJldm9rZVwifCAvL+ODreODvOODq+egtOajhOS+nemgvFxuICAgIFwicmVxLnJ1bGUucmVnaXN0ZXJcInwgLy/jg6vjg7zjg6vnmbvpjLLkvp3poLxcbiAgICBcInJlcS5ydWxlLnVucmVnaXN0ZXJcIiAvL+ODq+ODvOODq+egtOajhOS+nemgvFxuICAgIDtcblxuLyoqXG4gKiBQZXJzb25pdW3jgpLmibHjgYbjgZ/jgoHjga7jgq/jg6njgqTjgqLjg7Pjg4jjg6njgqTjg5bjg6njg6pcbiAqL1xuZXhwb3J0IGNsYXNzIFBlcnNvbml1bUNsaWVudCB7XG4gICAgLyoqXG4gICAgICog44OX44Ot44OI44Kz44Or77yI44OH44OV44Kp44Or44OIOmh0dHBz77yJXG4gICAgICovXG4gICAgcHJvdG9jb2w6IHN0cmluZyA9IFwiaHR0cHNcIjtcbiAgICAvKipcbiAgICAgKiBQZXJzb25pdW3jga7jgrXjg7zjg5Djg5vjgrnjg4jlkI1cbiAgICAgKi9cbiAgICBob3N0OiBzdHJpbmcgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs+aDheWgsVxuICAgICAqL1xuICAgIHBlcnNvbml1bVRva2VuOiBQZXJzb25pdW1BY2Nlc3NUb2tlbiA9IG51bGw7XG4gICAgLyoqXG4gICAgICog44Ki44Kv44K744K544OI44O844Kv44OzXG4gICAgICovXG4gICAgdG9rZW46IHN0cmluZyA9IG51bGw7XG4gICAgLyoqXG4gICAgICog44Ki44Kv44K744K544OI44O844Kv44Oz44Gu5pyJ5Yq55pyf6ZmQXG4gICAgICovXG4gICAgZXhwaXJlSW46IG51bWJlciA9IDM2MDA7XG4gICAgLyoqXG4gICAgICog44Ot44Kw44Kk44Oz5pmC5Yi7IC0g6KqN6Ki844Gu5pyJ5Yq55pyf6ZmQ5YaF44GL44Gp44GG44GL44KS56K66KqNXG4gICAgICovXG4gICAgbG9naW5UaW1lOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIGV4cGlyZeOBl+OBn+OBk+OBqOOBjOeiuuiqjeOBleOCjOOBn+OBqOOBjeOBq+WRvOOBs+WHuuOBmeOCs+ODvOODq+ODkOODg+OCr1xuICAgICAqL1xuICAgIGV4cGlyZUNhbGxiYWNrOiAoKT0+dm9pZDtcblxuICAgIC8qKlxuICAgICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgICAqIEBwYXJhbSB1bml0IOODm+OCueODiOWQjSBcbiAgICAgKiBAcGFyYW0gcHJvdG9jb2wg44OX44Ot44OI44Kz44OrXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodW5pdDogc3RyaW5nLCBwcm90b2NvbD86IHN0cmluZykge1xuICAgICAgICBpZiAoIXVuaXQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlBsZWFzZSBzZXQgYGhvc3RgIGFkZHJlc3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodW5pdC5sYXN0SW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImBob3N0YCBkb2VzIG5vdCBuZWVkIHByb3RvY29sIHByZWZpeFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwcm90b2NvbCl7XG4gICAgICAgICAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob3N0ID0gdW5pdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDoqo3oqLzjga7mnInlirnmgKfjg4Hjgqfjg4Pjgq9cbiAgICAgKi9cbiAgICBhdXRoVmFsaWRhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICgrbmV3IERhdGUoKS10aGlzLmxvZ2luVGltZSkvMTAwMCA8IHRoaXMuZXhwaXJlSW47XG4gICAgICAgIGlmKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2sgJiYgdGhpcy5leHBpcmVDYWxsYmFjaygpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTWF5YmUgeW91IGhhdmUgdG8gcmUtbG9naW4gd2hpbGUgeW91ciB0b2tlbiBpcyBleHBpcmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyc29uaXVt44G444Ot44Kw44Kk44OzXG4gICAgICogQHBhcmFtIGNlbGwg44Ot44Kw44Kk44Oz5a++6LGh44Gu44K744Or5ZCNIFxuICAgICAqIEBwYXJhbSB1c2VybmFtZSDjg6bjg7zjgrblkI1cbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQg44OR44K544Ov44O844OJXG4gICAgICogQHBhcmFtIGV4cGlyZUNhbGxiYWNrIOacieWKueacn+mZkOOBjOWIh+OCjOmam+OBq+WRvOOBs+WHuuOBmeOCs+ODvOODq+ODkOODg+OCryBcbiAgICAgKi9cbiAgICBsb2dpbihjZWxsOiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGV4cGlyZUNhbGxiYWNrPzogKCk9PnZvaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2sgPSBleHBpcmVDYWxsYmFjayAmJiBleHBpcmVDYWxsYmFjaztcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgdXNlcm5hbWUsIHBhc3N3b3JkIH0pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZUluID0gdG9rZW4uZXhwaXJlX2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpblRpbWUgPSArbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2NoZW1h6KqN6Ki844OI44O844Kv44Oz44Gu5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg5YCL5Lq644Gu44K744OrIFxuICAgICAqIEBwYXJhbSB1c2VybmFtZSDjg6bjg7zjgrblkI1cbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQg44OR44K544Ov44O844OJXG4gICAgICogQHBhcmFtIGFwcENlbGwg44Ki44OX44Oq44K744OrXG4gICAgICogQHBhcmFtIGFwcElkIOOCouODl+ODquOCu+ODq0lkXG4gICAgICogQHBhcmFtIGFwcFBhc3Mg44Ki44OX44Oq44K744OrUGFzc1xuICAgICAqL1xuICAgIGFwcExvZ2luKGNlbGw6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgYXBwQ2VsbDogc3RyaW5nLCBhcHBJZDogc3RyaW5nLCBhcHBQYXNzOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsVXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgYXBwQ2VsbFVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShhcHBDZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IGFwcENlbGxUb2tlblVybCA9IGFwcENlbGxVcmwgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdChhcHBDZWxsVG9rZW5VcmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgdXNlcm5hbWU6IGFwcElkLCBwYXNzd29yZDogYXBwUGFzcywgcF90YXJnZXQ6IGNlbGxVcmwgfSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFwcFRva2VuOiBQZXJzb25pdW1BY2Nlc3NUb2tlbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hVG9rZW5VcmwgPSBjZWxsVXJsICsgXCJfX3Rva2VuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdChzY2hlbWFUb2tlblVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLCB1c2VybmFtZSwgcGFzc3dvcmQsIGNsaWVudF9pZDogYXBwQ2VsbFVybCwgY2xpZW50X3NlY3JldDogYXBwVG9rZW4uYWNjZXNzX3Rva2VuIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJzb25pdW1Ub2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZUluID0gdG9rZW4uZXhwaXJlX2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luVGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH0gICAgXG5cbiAgICAvKipcbiAgICAgKiDjgqLjgq/jgrvjgrnjg4jjg7zjgq/jg7Pjga7mm7TmlrDjgoTjg4jjg6njg7Pjgrnjgrvjg6vjg4jjg7zjgq/jg7PjgpLkvZzmiJBcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcmVmcmVzaFRva2VuIOODquODleODrOODg+OCt+ODpeeUqOODiOODvOOCr+ODs++8iGxvZ2lu5pmC44Gr5Y+W5b6X77yJXG4gICAgICogQHBhcmFtIHRhcmdldCDjg4jjg6njg7Pjgrnjgrvjg6vjg4jjg7zjgq/jg7PjgpLnlJ/miJDjgZnjgovloLTlkIjjga/mjIflrppcbiAgICAgKi9cbiAgICByZWZyZXNoQWNjZXNzVG9rZW4oY2VsbDogc3RyaW5nLCByZWZyZXNoVG9rZW46IHN0cmluZywgdGFyZ2V0Pzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1BY2Nlc3NUb2tlbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX3Rva2VuXCI7XG4gICAgICAgICAgICBjb25zdCB0b2tlblNlZWRzID0gdGFyZ2V0ID8ge1xuICAgICAgICAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLFxuICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgICAgICAgICAgICBwX3RhcmdldDogdGhpcy5jcmVhdGVDZWxsU2NoZW1hKHRhcmdldCksXG4gICAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgICAgICAgICBncmFudF90eXBlOiBcInJlZnJlc2hfdG9rZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnR5cGUoXCJmb3JtXCIpXG4gICAgICAgICAgICAgICAgLnNlbmQodG9rZW5TZWVkcylcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbml1bVRva2VuID0gdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ot44O844Or44KS5L2c5oiQ44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHJvbGUg44Ot44O844Or5ZCNXG4gICAgICogQHBhcmFtIGJveCBNYWlu44Oc44OD44Kv44K55Lul5aSW44KS5a++6LGh44Go44GZ44KL5aC05ZCI44Gv44Oc44OD44Kv44K55ZCN44KS5oyH5a6aXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGNyZWF0ZVJvbGUoY2VsbDogc3RyaW5nLCByb2xlOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9Sb2xlL1wiO1xuICAgICAgICAgICAgY29uc3QgYm94TmFtZSA9IGJveCB8fCBudWxsO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgICAgIGlmKCFyb2xlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIE5hbWU6IHJvbGUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGJveCl7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfQm94Lk5hbWVcIjogYm94TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg63jg7zjg6vmg4XloLHjga7lj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcm9sZSDnibnlrprjga7jg63jg7zjg6vmg4XloLHjgYzlj5blvpfjgZfjgZ/jgYTloLTlkIjjga/mjIflrppcbiAgICAgKiBAcGFyYW0gYm94IOeJueWumuOBruODnOODg+OCr+OCueOBrueJueWumuOBruODreODvOODq+aDheWgseOBjOWPluW+l+OBl+OBn+OBhOWgtOWQiOOBr+aMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXRSb2xlKGNlbGw6IHN0cmluZywgcm9sZT86IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFJvbGVbXXxSb2xlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUm9sZVwiO1xuICAgICAgICAgICAgaWYgKHJvbGUpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2UgaWYocm9sZSAmJiBib3gpe1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihOYW1lPSdcIiArIHJvbGUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg63jg7zjg6vjgpLliYrpmaTjgZnjgovvvIjntJDku5jjgZHjgYzjgYLjgovjgajliYrpmaTjgafjgY3jgarjgYTloLTlkIjjgYzjgYLjgovvvIlcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcm9sZSDnibnlrprjga7jg63jg7zjg6vjgpLliYrpmaTjgZfjgZ/jgYTloLTlkIjjga/mjIflrppcbiAgICAgKiBAcGFyYW0gYm94IOeJueWumuOBruODnOODg+OCr+OCueOBrueJueWumuOBruODreODvOODq+OBjOWJiumZpOOBl+OBn+OBhOWgtOWQiOOBr+aMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVSb2xlKGNlbGw6IHN0cmluZywgcm9sZT86IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9Sb2xlXCI7XG4gICAgICAgICAgICBpZiAocm9sZSkge1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihOYW1lPSdcIiArIHJvbGUgKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSBpZihyb2xlICYmIGJveCl7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiKE5hbWU9J1wiICsgcm9sZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or44KS6Kit5a6a44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrIFxuICAgICAqIEBwYXJhbSBzZXRDZWxsVXJsIOWklumDqOOCu+ODq+OBq+aMh+WumuOBl+OBn+OBhOOCu+ODq+OBrlVSTFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRFeHRDZWxsKGNlbGw6IHN0cmluZywgc2V0Q2VsbFVybDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwvXCI7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIFVybDogc2V0Q2VsbFVybCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGRhdGEpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+S4gOimp+OCkuWPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXRFeHRDZWxsTGlzdChjZWxsOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RXh0Q2VsbFtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsL1wiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OBruino+mZpFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBkZWxldGVDZWxsVXJsIOWJiumZpOOBmeOCi+OCu+ODq+OBrlVSTFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVFeHRDZWxsKGNlbGw6IHN0cmluZywgZGVsZXRlQ2VsbFVybDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwoJ1wiICsgRW5jb2RlKGRlbGV0ZUNlbGxVcmwpICsgXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or44Gr5a++44GX44Gm44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44KS6Kit5a6a44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHRhcmdldENlbGxVcmwg5oyH5a6a44GZ44KL5aSW6YOo44K744OrVVJMXG4gICAgICogQHBhcmFtIHR5cGUg44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44Gu5oyH5a6aKF9Sb2xlL19SZWxhdGlvbilcbiAgICAgKiBAcGFyYW0gbmFtZSDjg63jg7zjg6vjgYvjg6rjg6zjg7zjgrfjg6fjg7PjgavmjIflrprjgZnjgovlkI3liY1cbiAgICAgKiBAcGFyYW0gYm94IOODnOODg+OCr+OCueWQjVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRFeHRDZWxsTGluayhjZWxsOiBzdHJpbmcsIHRhcmdldENlbGxVcmw6IHN0cmluZywgdHlwZTogXCJfUm9sZVwifFwiX1JlbGF0aW9uXCIsIG5hbWU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL0V4dENlbGwoJ1wiICsgRW5jb2RlKHRhcmdldENlbGxVcmwpICsgXCInKS9cXCRsaW5rcy9cIiArIHR5cGU7XG4gICAgICAgICAgICBsZXQgcm9sZSA9IFwiXCI7XG4gICAgICAgICAgICBpZihuYW1lICYmIGJveCl7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2UgaWYobmFtZSl7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdXJpOiB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1wiICsgdHlwZS5zdWJzdHJpbmcoMSkgKyByb2xlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZChkYXRhKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vjgavntJDjgaXjgZHjgZ/jg6rjg7Pjgq/jga7kuIDopqdcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gdGFyZ2V0Q2VsbFVybCDlr77osaHjgavmjIflrprjgZnjgovjgrvjg6tVUkxcbiAgICAgKiBAcGFyYW0gdHlwZSDjg63jg7zjg6vjgYvjg6rjg6zjg7zjgrfjg6fjg7Pjga7mjIflrpooX1JvbGUvX1JlbGF0aW9uKVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXRFeHRDZWxsTGluayhjZWxsOiBzdHJpbmcsIHRhcmdldENlbGxVcmw6IHN0cmluZywgdHlwZTogXCJfUm9sZVwifFwiX1JlbGF0aW9uXCIsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8TGlua1tdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZSh0YXJnZXRDZWxsVXJsKSArIFwiJykvXFwkbGlua3MvXCIgKyB0eXBlO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OBruODquODs+OCr+OCkuWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0YXJnZXRDZWxsVXJsIOWvvuixoeOBqOOBl+OBpuaMh+WumuOBmeOCi+OCu+ODq1VSTFxuICAgICAqIEBwYXJhbSB0eXBlIOODreODvOODq+OBi+ODquODrOODvOOCt+ODp+ODs+OBruaMh+WumihfUm9sZS9fUmVsYXRpb24pXG4gICAgICogQHBhcmFtIG5hbWUg5YmK6Zmk44GZ44KL44Ot44O844OrL+ODquODrOODvOOCt+ODp+ODs+WQjVxuICAgICAqIEBwYXJhbSBib3gg5YmK6Zmk44GZ44KL44Ot44O844Or44Gu44GC44KL44Oc44OD44Kv44K55ZCN77yI44OH44OV44Kp44Or44OI44Gv44Oh44Kk44OzYm9477yJXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUV4dENlbGxMaW5rKGNlbGw6IHN0cmluZywgdGFyZ2V0Q2VsbFVybDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgcm9sZSA9IFwiXCI7XG4gICAgICAgICAgICBpZihuYW1lKXtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2UgaWYobmFtZSAmJiBib3gpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbCgnXCIgKyBFbmNvZGUodGFyZ2V0Q2VsbFVybCkgKyBcIicpL1xcJGxpbmtzL1wiICsgdHlwZSArIHJvbGU7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6vjg7zjg6vkuIDopqfjga7lj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0UnVsZXMoY2VsbDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFJ1bGVbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUnVsZVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODq+ODvOODq+OCkuioreWumuOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBydWxlIOeZu+mMsuOBmeOCi+ODq+ODvOODq1xuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRSdWxlKGNlbGw6IHN0cmluZywgcnVsZTogUnVsZSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9SdWxlXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgIC5zZW5kKHJ1bGUpXG4gICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog44Or44O844Or44KS5YmK6Zmk44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIHJ1bGVJZCDliYrpmaTjgZnjgovjg6vjg7zjg6tpZFxuICAgICAqIEBwYXJhbSBib3gg44Oc44OD44Kv44K544Gr57SQ44Gl44GE44Gm44KL5aC05ZCI44GvYm945ZCN5oyH5a6aXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZVJ1bGUoY2VsbDogc3RyaW5nLCBydWxlSWQ6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9SdWxlXCI7XG4gICAgICAgICAgICBpZihib3gpe1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihfX2lkPSdcIiArIHJ1bGVJZCArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihfX2lkPSdcIiArIHJ1bGVJZCArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog44Oh44OD44K744O844K444Gu6YCB5L+hQVBJXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIHRvIOWum+WFiOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0eXBlIOODoeODg+OCu+ODvOOCuOmAgeS/oeOCv+OCpOODl+OBruaMh+WumlxuICAgICAqIEBwYXJhbSByZXF1ZXN0Q29udGVudCDnmbvpjLLkvp3poLzjgZfjgZ/plqLkv4Lmg4XloLEoVVJMKVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZW5kTWVzc2FnZShjZWxsOiBzdHJpbmcsIHRvOiBzdHJpbmcsIHR5cGU6IE1lc3NhZ2VTZW5kVHlwZSwgcmVxdWVzdENvbnRlbnQ6IFJ1bGV8c3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxVcmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCk7XG4gICAgICAgICAgICBjb25zdCB0b1VybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYSh0byk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjZWxsVXJsICsgXCJfX21lc3NhZ2Uvc2VuZC9cIjtcblxuICAgICAgICAgICAgbGV0IGJvZHkgPSB7fTtcblxuICAgICAgICAgICAgaWYgKHR5cGUubGFzdEluZGV4T2YoXCJyZXEucnVsZS5cIiwgMCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICBUbzogdG9VcmwsXG4gICAgICAgICAgICAgICAgICAgIFR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIFJlcXVlc3RSdWxlOiByZXF1ZXN0Q29udGVudCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlLmxhc3RJbmRleE9mKFwicmVxLnJvbGUuXCIsIDApID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgVG86IHRvVXJsLFxuICAgICAgICAgICAgICAgICAgICBUeXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UmVsYXRpb246IHJlcXVlc3RDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UmVsYXRpb25UYXJnZXQ6IGNlbGxVcmwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoYm9keSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXMudGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE8gcmVjZWl2ZU1lc3NhZ2VcbiAgICAgKi9cbiAgICByZWNlaXZlTWVzc2FnZSgpe31cbiAgICBcbiAgICAvKipcbiAgICAgKiBBQ0zjgpLoqK3lrprjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gYWNsIOioreWumuOBmeOCi0FDTOOBrmpzb24oWE1M44Gr5aSJ5o+bKVxuICAgICAqL1xuICAgIHNldEFjbChjZWxsOiBzdHJpbmcsIGFjZXM6IEFjZVtdLCB0YXJnZXRQYXRoPzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGFyZ2V0UGF0aD8gY2VsbHVybCtcIi9cIit0YXJnZXRQYXRoIDogY2VsbHVybDtcblxuICAgICAgICAgICAgY29uc3QgYWNsOiBBY2wgPSB7XG4gICAgICAgICAgICAgICAgXCJAXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpEXCI6IFwiREFWOlwiLFxuICAgICAgICAgICAgICAgICAgICBcInhtbG5zOnBcIjogXCJ1cm46eC1wZXJzb25pdW06eG1sbnNcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiRDphY2VcIjogYWNlcyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjbFhtbCA9IGpzMnhtbC5wYXJzZShcIkQ6YWNsXCIsIGFjbCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oXCJBQ0xcIiwgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3htbFwiKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIit0b2tlbilcbiAgICAgICAgICAgIHhoci5zZW5kKGFjbFhtbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODl+ODreODleOCoeOCpOODq+aDheWgseOCkuWPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIFxuICAgICAqL1xuICAgIGdldFByb2ZpbGUoY2VsbDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1Qcm9maWxlUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGx1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjZWxsdXJsICsgXCJfXy9wcm9maWxlLmpzb25cIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVByb2ZpbGVSZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ki44OX44Oq44K744Or5bCC55SoXG4gICAgICog44Ki44OX44Oq6LW35YuV5oOF5aCx44KS5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwgXG4gICAgICovXG4gICAgZ2V0TGF1bmNoKGNlbGw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtTGF1bmNoSnNvbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGNlbGx1cmwgKyBcIl9fL2xhdW5jaC5qc29uXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1MYXVuY2hKc29uID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCYXLjgqTjg7Pjgrnjg4jjg7zjg6sgXG4gICAgICogQHBhcmFtIGJhclVybFxuICAgICAqL1xuICAgIGJhckluc3RhbGwoY2VsbDogc3RyaW5nLCBib3g6IHN0cmluZywgYmFyVXJsOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IGNlbGx1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjZWxsdXJsICsgYm94O1xuXG4gICAgICAgICAgICByZXF1ZXN0LmdldChiYXJVcmwpXG4gICAgICAgICAgICAgICAgLnJlc3BvbnNlVHlwZShcImJsb2JcIilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzMSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gcmVzMS5ib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub3BlbihcIk1LQ09MXCIsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi96aXBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIrdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2VuZChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqjjg7Pjg4bjgqPjg4bjgqPjg4fjg7zjgr/jga7lrZjlnKjnorroqo1cbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gX19faWQg44Ko44Oz44OG44Kj44OG44KjaWRcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgaXNFeGlzdChjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgX19pZD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IG51bGw7XG4gICAgICAgICAgICBpZihfX2lkKXtcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoICsgXCIoJ1wiICsgX19pZCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+WPluW+l1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBxdWVyeSDjgq/jgqjjg6rvvIhUT0RPIOacquWujOaIkO+8iVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXQoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHF1ZXJ5PzogUXVlcnl8c3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bURhdGFbXSB8IFBlcnNvbml1bURhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gRW5jb2RlKFwiPyRvcmRlcmJ5PVwiICsgcXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHF1ZXJ5KXtcbiAgICAgICAgICAgICAgICB1cmwgPSBjb252ZXJ0UXVlcmllZFVybCh1cmwsIHF1ZXJ5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IEVuY29kZShcIj8kb3JkZXJieT1fX3VwZGF0ZWQlMjBkZXNjXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+abuOOBjei+vOOBv1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBlbnRpdHkg44Ko44Oz44OG44Kj44OG44Kj5oOF5aCxXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIHBvc3QoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVudGl0eTogYW55LCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZChlbnRpdHkpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqjjg7Pjg4bjgqPjg4bjgqPkuIrmm7jjgY1cbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gaWQg44Ko44Oz44OG44Kj44OG44KjaWRcbiAgICAgKiBAcGFyYW0gZW50aXR5IOS4iuabuOOBjeOBmeOCi+OCqOODs+ODhuOCo+ODhuOCo+aDheWgsVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICB1cGRhdGUoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGVudGl0eTogYW55LCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIignXCIgKyBpZCArIFwiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucHV0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoZW50aXR5KVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqjjg7Pjg4bjgqPjg4bjgqPjga7liYrpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjga7jgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcGF0aCDjgqjjg7Pjg4bjgqPjg4bjgqPjga7jg5HjgrlcbiAgICAgKiBAcGFyYW0gaWQg44Ko44Oz44OG44Kj44OG44KjaWRcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlKGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBpZDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIignXCIgKyBpZCArIFwiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCu+ODq+WQjeOBi+OCieOCu+ODq+OCueOCreODvOODnlVSTOOCkuS9nOaIkOOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIFxuICAgICAqL1xuICAgIGNyZWF0ZUNlbGxTY2hlbWEoY2VsbDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnByb3RvY29sfTovLyR7dGhpcy5ob3N0fS8ke2NlbGx9L2A7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44K744Or44K544Kt44O844OeVVJM44GL44KJ44K744Or5ZCN44KS5oq95Ye644GZ44KLXG4gICAgICogQHBhcmFtIHVybCBcbiAgICAgKi9cbiAgICBleHRyYWN0Q2VsbE5hbWUodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHVybC5zdWJzdHJpbmcodXJsLmluZGV4T2YodGhpcy5ob3N0KSArIHRoaXMuaG9zdC5sZW5ndGggKyAxLCB1cmwubGFzdEluZGV4T2YoXCIvXCIpKTtcbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuXG59XG5cblxuLy8gLypcbi8vIC8vVE9ETyDjgrnjgq3jg7zjg57oqo3oqLznlKjjga5BUEnjgIJcbi8vIC8vUGVyc29uaXVt44Ki44OX44Oq44Oe44O844Kx44OD44OI5Yip55So5pmC44Gr5L2/44GG44GT44Go44Gr44Gq44KL44KE44KC44GX44KM44Gs44CCXG4vLyBleHBvcnQgY29uc3QgdHJhbnNjZWxsdG9rZW4gPSAoam9zaGk6IHN0cmluZywgYnVrYTogc3RyaW5nKSA9PiB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbi8vICAgICBjb25zdCB1cmwgPSBjcmVhdGVDZWxsU2NoZW1hKGJ1a2EpK1wiX190b2tlblwiO1xuLy8gICAgIHJlcXVlc3Rcbi8vICAgICAgIC5wb3N0KHVybClcbi8vICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4vLyAgICAgICAudHlwZShcImZvcm1cIilcbi8vICAgICAgIC5zZW5kKHtcbi8vICAgICAgICAgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLCBcbi8vICAgICAgICAgdXNlcm5hbWU6IFwiYm9iXCIsICAvL1RPRE8gXG4vLyAgICAgICAgIHBhc3N3b3JkOiBcInBpeW9waXlvXCIsIC8vVE9ETyBcbi8vICAgICAgICAgcF90YXJnZXQ6IGNyZWF0ZUNlbGxTY2hlbWEoam9zaGkpLFxuLy8gICAgICAgfSlcbi8vICAgICAgIC5lbmQoKGVycm9yLCByZXMpPT57XG4vLyAgICAgICAgIGlmKGVycm9yKXtcbi8vICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXMudGV4dCkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9O1xuLy8gZXhwb3J0IGNvbnN0IHJlZnJlc2hBY2Nlc3NUb2tlbiA9IChqb3NoaTogc3RyaW5nLCBidWthOiBzdHJpbmcsIGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4pID0+IHtcbi8vICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgIGNvbnN0IHVybCA9IGNyZWF0ZUNlbGxTY2hlbWEoam9zaGkpK1wiX190b2tlblwiO1xuLy8gICAgIHJlcXVlc3Rcbi8vICAgICAgIC5wb3N0KHVybClcbi8vICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4vLyAgICAgICAudHlwZShcImZvcm1cIilcbi8vICAgICAgIC5zZW5kKHtcbi8vICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsIFxuLy8gICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4vLyAgICAgICAgIGNsaWVudF9pZDogY3JlYXRlQ2VsbFNjaGVtYShidWthKSxcbi8vICAgICAgICAgY2xpZW50X3NlY3JldDogYWNjZXNzVG9rZW4sXG4vLyAgICAgICB9KVxuLy8gICAgICAgLmVuZCgoZXJyb3IsIHJlcyk9Pntcbi8vICAgICAgICAgaWYoZXJyb3Ipe1xuLy8gICAgICAgICAgIHJlamVjdChlcnJvcik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSB7XG4vLyAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcy50ZXh0KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0pO1xuLy8gICB9KTtcbi8vIH07XG4vLyAqL1xuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IFBlcnNvbml1bUNsaWVudDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xpZW50LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJhZ2VudFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInN1cGVyYWdlbnRcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqczJ4bWxwYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqczJ4bWxwYXJzZXJcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBzcGxpdFdvcmQgPSAob3JpZ2luYWw6IHN0cmluZykgPT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgd2hpbGUoaW5kZXggPCBvcmlnaW5hbC5sZW5ndGgpe1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gb3JpZ2luYWwuc3Vic3RyaW5nKGluZGV4LCBpbmRleCsxKTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IEVzY2FwZVNlcXVlbmNlTWFwID0ge1xuICAgIFwiOlwiOiBcIiUzQVwiLFxuICAgIFwiL1wiOiBcIiUyRlwiLFxuICAgIFwiIFwiOiBcIiUyMFwiLFxuICAgIFwiJFwiOiBcIiUyNFwiLFxuICAgIFwiXFxcXFwiOiBcIiU1Q1wiLFxufTtcblxuY29uc3QgcmV2ZXJzZU1hcCA9IChtYXApID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgcmVzdWx0W21hcFtrZXldXSA9IGtleTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IEVuY29kZSA9IChvcmlnaW5hbDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHJlc3VsdEFycmF5ID0gc3BsaXRXb3JkKG9yaWdpbmFsKTtcbiAgICByZXN1bHRBcnJheSA9IHJlc3VsdEFycmF5Lm1hcCgoY2hhcmFjdGVyKSA9PiB7XG4gICAgICAgIGlmKEVzY2FwZVNlcXVlbmNlTWFwW2NoYXJhY3Rlcl0pe1xuICAgICAgICAgICAgcmV0dXJuIEVzY2FwZVNlcXVlbmNlTWFwW2NoYXJhY3Rlcl07XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRBcnJheS5qb2luKFwiXCIpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgY29uc3QgRGVjb2RlID0gKG9yaWdpbmFsOiBzdHJpbmcpID0+IHtcbiAgICBsZXQgaW5kZXggPSAtMjtcbiAgICBjb25zdCBSZXZlcnNlU2VxdWVuY2VNYXAgPSByZXZlcnNlTWFwKEVzY2FwZVNlcXVlbmNlTWFwKTtcbiAgICBsZXQgc2VudGVuY2UgPSBvcmlnaW5hbDtcbiAgICB3aGlsZShpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgaW5kZXggPSBzZW50ZW5jZS5pbmRleE9mKFwiJVwiKTtcbiAgICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gc2VudGVuY2Uuc3Vic3RyaW5nKGluZGV4LCBpbmRleCs1KTtcbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IHNlbnRlbmNlLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IHNlbnRlbmNlLnN1YnN0cmluZyhpbmRleCs1KTtcbiAgICAgICAgICAgIHNlbnRlbmNlID0gYmVmb3JlICsgUmV2ZXJzZVNlcXVlbmNlTWFwW3RhcmdldF0gKyBhZnRlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VudGVuY2U7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5IHtcbiAgICBmb3JtYXQ/OiBzdHJpbmcsXG4gICAgZXhwYW5kPzogc3RyaW5nLFxuICAgIHNlbGVjdD86IHN0cmluZyxcbiAgICBvcmRlcmJ5Pzogc3RyaW5nLFxuICAgIHRvcD86IHN0cmluZyxcbiAgICBza2lwPzogc3RyaW5nLFxuICAgIGZpbHRlcj86IHN0cmluZ1tdLFxuICAgIGlubGluZWNvdW50Pzogc3RyaW5nLFxuICAgIHE/OiBzdHJpbmcsXG59XG5cbmNvbnN0IEFORCA9IFwiIGFuZCBcIjtcblxuZXhwb3J0IGNvbnN0IGNvbnZlcnRRdWVyaWVkVXJsID0gKHVybDogc3RyaW5nLCBxdWVyeTogUXVlcnkpOiBzdHJpbmcgPT4ge1xuICAgIGxldCByZXN1bHQgPSB1cmwgKyBcIj9cIjtcbiAgICBpZihxdWVyeS5maWx0ZXIgJiYgcXVlcnkuZmlsdGVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZmlsdGVycyA9IHF1ZXJ5LmZpbHRlcjtcbiAgICAgICAgcmVzdWx0ICs9IEVuY29kZShcIiRmaWx0ZXI9XCIpO1xuICAgICAgICBmaWx0ZXJzLmZvckVhY2goKGZpbHRlcik9PntcbiAgICAgICAgICAgIHJlc3VsdCArPSBFbmNvZGUoZmlsdGVyKTtcbiAgICAgICAgICAgIHJlc3VsdCArPSBBTkQ7XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyaW5nKDAsIHJlc3VsdC5pbmRleE9mKEFORCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbGl0eS50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVzNi1wcm9taXNlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXM2LXByb21pc2VcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9