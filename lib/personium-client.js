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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGIzNjIyMjViMzYwN2VkMzc4MDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdXBlcmFnZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianMyeG1scGFyc2VyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXM2LXByb21pc2VcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHFDQUFzQztBQUN0QyxvQ0FBdUM7QUFDdkMsdUNBQXFFO0FBRXJFLDBCQUEwQjtBQUMxQiwyQ0FBc0M7QUFpS3RDOztHQUVHO0FBQ0g7SUFrQ0k7Ozs7T0FJRztJQUNILHlCQUFZLElBQVksRUFBRSxRQUFpQjtRQXRDM0M7O1dBRUc7UUFDSCxhQUFRLEdBQVcsT0FBTyxDQUFDO1FBQzNCOztXQUVHO1FBQ0gsU0FBSSxHQUFXLElBQUksQ0FBQztRQUNwQjs7V0FFRztRQUNILG1CQUFjLEdBQXlCLElBQUksQ0FBQztRQUM1Qzs7V0FFRztRQUNILFVBQUssR0FBVyxJQUFJLENBQUM7UUFDckI7O1dBRUc7UUFDSCxjQUFTLEdBQVcsSUFB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dWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YjM2MjIyNWIzNjA3ZWQzNzgwNCIsImltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSBcInN1cGVyYWdlbnRcIjtcbmltcG9ydCAqIGFzIGpzMnhtbCBmcm9tIFwianMyeG1scGFyc2VyXCI7XG5pbXBvcnQgeyBFbmNvZGUsIERlY29kZSwgY29udmVydFF1ZXJpZWRVcmwsIFF1ZXJ5IH0gZnJvbSBcIi4vdXRpbGl0eVwiO1xuXG4vL2ZvciB1c2luZyBQcm9taXNlIG9uIGVzNVxuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gXCJlczYtcHJvbWlzZVwiO1xuXG4vKipcbiAqIFBlcnNvbml1beOBruOCouOCr+OCu+OCueODiOODvOOCr+ODs+aDheWgsVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bUFjY2Vzc1Rva2VuIHtcbiAgICBhY2Nlc3NfdG9rZW46IHN0cmluZyxcbiAgICByZWZyZXNoX3Rva2VuOiBzdHJpbmcsXG4gICAgZXhwaXJlc19pbjogbnVtYmVyLFxufVxuXG4vKipcbiAqIFBlcnNvbml1beOBruODrOOCueODneODs+OCueODh+ODvOOCv+Wei1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bVJlc3BvbnNlIHtcbiAgICBkOiB7XG4gICAgICAgIHJlc3VsdHM6IGFueSxcbiAgICB9XG59XG5cbi8qKlxuICogUGVyc29uaXVt44Gu44OH44O844K/5Z6LXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGVyc29uaXVtRGF0YSB7XG4gICAgX19tZXRhZGF0YToge1xuICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgZXRhZzogc3RyaW5nLFxuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgfSxcbiAgICBfX3B1Ymxpc2hlZDogc3RyaW5nLCAvL0RhdGUoeHh4KVxuICAgIF9fdXBkYXRlZDogc3RyaW5nLCAvL0RhdGUoeHh4KVxufVxuXG4vKipcbiAqIOWklumDqOOCu+ODq+OBruODh+ODvOOCv+Wei1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dENlbGwgZXh0ZW5kcyBQZXJzb25pdW1EYXRhIHtcbiAgICBVcmw6IHN0cmluZyxcbiAgICBfUm9sZToge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIF9SZWxhdGlvbjoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfSxcbiAgICB9LFxufVxuXG4vKipcbiAqIOODq+ODvOODq+OBruWei1xuICogLy/lpInjgo/jgovjgYvjgoJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSdWxlIHtcbiAgICBFeHRlcm5hbD86IGJvb2xlYW4sXG4gICAgU2VydmljZTogc3RyaW5nLFxuICAgIEFjdGlvbjogc3RyaW5nLFxuICAgIFR5cGU6IHN0cmluZyxcbiAgICBPYmplY3Q6IHN0cmluZyxcbiAgICBcIl9Cb3guTmFtZVwiPzogc3RyaW5nLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjZSB7XG4gICAgXCJEOnByaW5jaXBhbFwiOiB7XG4gICAgICAgIFwiRDpocmVmXCI6IHN0cmluZyxcbiAgICB9LFxuICAgIFwiRDpncmFudFwiOiB7XG4gICAgICAgIHByaXZpbGVnZToge1thY2VUeXBlOiBzdHJpbmddOiB7fX1bXSxcbiAgICB9LFxufVxuZXhwb3J0IGludGVyZmFjZSBBY2wge1xuICAgIFwiQFwiOiB7XG4gICAgICAgIFwieG1sbnM6RFwiOiBcIkRBVjpcIixcbiAgICAgICAgXCJ4bWxuczpwXCI6IFwidXJuOngtcGVyc29uaXVtOnhtbG5zXCIsXG4gICAgfSxcbiAgICBcIkQ6YWNlXCI6IEFjZVtdLFxufVxuXG4vKipcbiAqIOOCueOCr+ODquODl+ODiOOBruWei1xuICogLy/lpInjgo/jgovjgYvjgoJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTY3JpcHQge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICB1cmk6IHN0cmluZyxcbn1cblxuLyoqXG4gKiBMaW5r5Z6LIEV4dENlbGzjga5MaW5r44Gq44GpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTGluayBleHRlbmRzIFBlcnNvbml1bURhdGEge1xuICAgIHVyaTogc3RyaW5nLFxufVxuXG4vKipcbiAqIFJvbGXlnotcbiAqLyBcbmV4cG9ydCBpbnRlcmZhY2UgUm9sZSBleHRlbmRzIFBlcnNvbml1bURhdGEge1xuICAgIE5hbWU6IHN0cmluZyxcbiAgICBcIl9Cb3guTmFtZVwiOiBzdHJpbmcsXG4gICAgX0JveDoge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX0FjY291bnQ6IHtcbiAgICAgICAgX19kZWZlcnJlZDoge1xuICAgICAgICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9FeHRDZWxsOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBfRXh0Um9sZToge1xuICAgICAgICBfX2RlZmVycmVkOiB7XG4gICAgICAgICAgICB1cmk6IHN0cmluZyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX1JlbGF0aW9uOiB7XG4gICAgICAgIF9fZGVmZXJyZWQ6IHtcbiAgICAgICAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOWFrOmWi+OBleOCjOOBpuOBhOOCi+ODl+ODreODleOCo+ODvOODq+aDheWgseOBruODrOOCueODneODs+OCueWei1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bVByb2ZpbGVSZXNwb25zZSB7XG4gICAgRGlzcGxheU5hbWU6IHN0cmluZyxcbiAgICBEZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIEltYWdlOiBzdHJpbmcsXG4gICAgUHJvZmlsZUltYWdlTmFtZTogc3RyaW5nLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbml1bUxhdW5jaEpzb24ge1xuICAgIHBlcnNvbmFsOiB7XG4gICAgICAgIHdlYjogc3RyaW5nLFxuICAgICAgICBhbmRyb2lkOiBzdHJpbmcsXG4gICAgICAgIGlvczogc3RyaW5nLFxuICAgICAgICBhcHBUb2tlbklkOiBzdHJpbmcsXG4gICAgICAgIGFwcFRva2VuUHc6IHN0cmluZyxcbiAgICB9XG59XG5cbi8qKlxuICog44Oh44OD44K744O844K46YCB5L+h44Gu44K/44Kk44OX5Z6LXG4gKi9cbmV4cG9ydCB0eXBlIE1lc3NhZ2VTZW5kVHlwZSA9IFxuICAgIFwibWVzc2FnZVwifCAvL+WNmOOBquOCi+ODoeODg+OCu+ODvOOCuOmAgeS/oVxuICAgIFwicmVxLnJlbGF0aW9uLmJ1aWxkXCJ8IC8v6Zai5L+C5oCn5qeL56+J5L6d6aC8XG4gICAgXCJyZXEucmVsYXRpb24uYnJlYWtcInwgLy/plqLkv4LmgKfnoLTmo4Tkvp3poLxcbiAgICBcInJlcS5yb2xlLmdyYW50XCJ8IC8v44Ot44O844Or6Kit5a6a5L6d6aC8XG4gICAgXCJyZXEucm9sZS5yZXZva2VcInwgLy/jg63jg7zjg6vnoLTmo4Tkvp3poLxcbiAgICBcInJlcS5ydWxlLnJlZ2lzdGVyXCJ8IC8v44Or44O844Or55m76Yyy5L6d6aC8XG4gICAgXCJyZXEucnVsZS51bnJlZ2lzdGVyXCIgLy/jg6vjg7zjg6vnoLTmo4Tkvp3poLxcbiAgICA7XG5cbi8qKlxuICogUGVyc29uaXVt44KS5omx44GG44Gf44KB44Gu44Kv44Op44Kk44Ki44Oz44OI44Op44Kk44OW44Op44OqXG4gKi9cbmV4cG9ydCBjbGFzcyBQZXJzb25pdW1DbGllbnQge1xuICAgIC8qKlxuICAgICAqIOODl+ODreODiOOCs+ODq++8iOODh+ODleOCqeODq+ODiDpodHRwc++8iVxuICAgICAqL1xuICAgIHByb3RvY29sOiBzdHJpbmcgPSBcImh0dHBzXCI7XG4gICAgLyoqXG4gICAgICogUGVyc29uaXVt44Gu44K144O844OQ44Ob44K544OI5ZCNXG4gICAgICovXG4gICAgaG9zdDogc3RyaW5nID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDjgqLjgq/jgrvjgrnjg4jjg7zjgq/jg7Pmg4XloLFcbiAgICAgKi9cbiAgICBwZXJzb25pdW1Ub2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs1xuICAgICAqL1xuICAgIHRva2VuOiBzdHJpbmcgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs+OBruacieWKueacn+mZkFxuICAgICAqL1xuICAgIGV4cGlyZXNJbjogbnVtYmVyID0gMzYwMDtcbiAgICAvKipcbiAgICAgKiDjg63jgrDjgqTjg7PmmYLliLsgLSDoqo3oqLzjga7mnInlirnmnJ/pmZDlhoXjgYvjganjgYbjgYvjgpLnorroqo1cbiAgICAgKi9cbiAgICBsb2dpblRpbWU6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogZXhwaXJl44GX44Gf44GT44Go44GM56K66KqN44GV44KM44Gf44Go44GN44Gr5ZG844Gz5Ye644GZ44Kz44O844Or44OQ44OD44KvXG4gICAgICovXG4gICAgZXhwaXJlQ2FsbGJhY2s6IChyZWZyZXNoVG9rZW46IHN0cmluZyk9PnZvaWQ7XG4gICAgLyoqXG4gICAgICogZXhwaXJl44Gu56K66KqN44K/44Kk44Oe44O8XG4gICAgICovXG4gICAgZXhwaXJlQ2FsbGJhY2tUaW1lcjogYW55ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgICAqIEBwYXJhbSB1bml0IOODm+OCueODiOWQjSBcbiAgICAgKiBAcGFyYW0gcHJvdG9jb2wg44OX44Ot44OI44Kz44OrXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodW5pdDogc3RyaW5nLCBwcm90b2NvbD86IHN0cmluZykge1xuICAgICAgICBpZiAoIXVuaXQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlBsZWFzZSBzZXQgYGhvc3RgIGFkZHJlc3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodW5pdC5sYXN0SW5kZXhPZihcImh0dHBcIikgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcImBob3N0YCBkb2VzIG5vdCBuZWVkIHByb3RvY29sIHByZWZpeFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZihwcm90b2NvbCl7XG4gICAgICAgICAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob3N0ID0gdW5pdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDoqo3oqLzjga7mnInlirnmgKfjg4Hjgqfjg4Pjgq9cbiAgICAgKi9cbiAgICBhdXRoVmFsaWRhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICgrbmV3IERhdGUoKS10aGlzLmxvZ2luVGltZSkvMTAwMCA8IHRoaXMuZXhwaXJlc0luO1xuICAgICAgICBpZighcmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLmV4cGlyZUNhbGxiYWNrICYmIHRoaXMuZXhwaXJlQ2FsbGJhY2sodGhpcy5wZXJzb25pdW1Ub2tlbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk1heWJlIHlvdSBoYXZlIHRvIHJlLWxvZ2luIHdoaWxlIHlvdXIgdG9rZW4gaXMgZXhwaXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcnNvbml1beOBuOODreOCsOOCpOODs1xuICAgICAqIEBwYXJhbSBjZWxsIOODreOCsOOCpOODs+WvvuixoeOBruOCu+ODq+WQjSBcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUg44Om44O844K25ZCNXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIOODkeOCueODr+ODvOODiVxuICAgICAqIEBwYXJhbSBleHBpcmVDYWxsYmFjayDmnInlirnmnJ/pmZDjgYzliIfjgozpmpvjgavlkbzjgbPlh7rjgZnjgrPjg7zjg6vjg5Djg4Pjgq8gXG4gICAgICovXG4gICAgbG9naW4oY2VsbDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBleHBpcmVDYWxsYmFjaz86IChyZWZyZXNoVG9rZW46IHN0cmluZyk9PnZvaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2sgPSBleHBpcmVDYWxsYmFjayAmJiBleHBpcmVDYWxsYmFjaztcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgdXNlcm5hbWUsIHBhc3N3b3JkIH0pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZXNJbiA9IHRva2VuLmV4cGlyZXNfaW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luVGltZSA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDjgr/jgqTjg6DjgqLjgqbjg4jjgpLopovjgotcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSBOdW1iZXIodGhpcy5leHBpcmVzSW4pICogOTk5OyAvL+ebtOWJjeOBq+aVmeOBiOOBpuOBguOBkuOCi1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFja1RpbWVyID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlQ2FsbGJhY2tUaW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFjayAmJiB0aGlzLmV4cGlyZUNhbGxiYWNrKHRva2VuLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2NoZW1h6KqN6Ki844OI44O844Kv44Oz44Gu5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg5YCL5Lq644Gu44K744OrIFxuICAgICAqIEBwYXJhbSB1c2VybmFtZSDjg6bjg7zjgrblkI1cbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQg44OR44K544Ov44O844OJXG4gICAgICogQHBhcmFtIGFwcENlbGwg44Ki44OX44Oq44K744OrXG4gICAgICogQHBhcmFtIGFwcElkIOOCouODl+ODquOCu+ODq0lkXG4gICAgICogQHBhcmFtIGFwcFBhc3Mg44Ki44OX44Oq44K744OrUGFzc1xuICAgICAqL1xuICAgIGFwcExvZ2luKGNlbGw6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgYXBwQ2VsbDogc3RyaW5nLCBhcHBJZDogc3RyaW5nLCBhcHBQYXNzOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsVXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgYXBwQ2VsbFVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShhcHBDZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IGFwcENlbGxUb2tlblVybCA9IGFwcENlbGxVcmwgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdChhcHBDZWxsVG9rZW5VcmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh7IGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgdXNlcm5hbWU6IGFwcElkLCBwYXNzd29yZDogYXBwUGFzcywgcF90YXJnZXQ6IGNlbGxVcmwgfSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFwcFRva2VuOiBQZXJzb25pdW1BY2Nlc3NUb2tlbiA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hVG9rZW5VcmwgPSBjZWxsVXJsICsgXCJfX3Rva2VuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAucG9zdChzY2hlbWFUb2tlblVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKHsgZ3JhbnRfdHlwZTogXCJwYXNzd29yZFwiLCB1c2VybmFtZSwgcGFzc3dvcmQsIGNsaWVudF9pZDogYXBwQ2VsbFVybCwgY2xpZW50X3NlY3JldDogYXBwVG9rZW4uYWNjZXNzX3Rva2VuIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbjogUGVyc29uaXVtQWNjZXNzVG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJzb25pdW1Ub2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZXNJbiA9IHRva2VuLmV4cGlyZXNfaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9naW5UaW1lID0gK25ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSAgICBcblxuICAgIC8qKlxuICAgICAqIOOCouOCr+OCu+OCueODiOODvOOCr+ODs+OBruabtOaWsOOChOODiOODqeODs+OCueOCu+ODq+ODiOODvOOCr+ODs+OCkuS9nOaIkFxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSByZWZyZXNoVG9rZW4g44Oq44OV44Os44OD44K344Ol55So44OI44O844Kv44Oz77yIbG9naW7mmYLjgavlj5blvpfvvIlcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOODiOODqeODs+OCueOCu+ODq+ODiOODvOOCr+ODs+OCkueUn+aIkOOBmeOCi+WgtOWQiOOBr+aMh+WumlxuICAgICAqL1xuICAgIHJlZnJlc2hBY2Nlc3NUb2tlbihjZWxsOiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nLCB0YXJnZXQ/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bUFjY2Vzc1Rva2VuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fdG9rZW5cIjtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuU2VlZHMgPSB0YXJnZXQgPyB7XG4gICAgICAgICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgICAgIHBfdGFyZ2V0OiB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEodGFyZ2V0KSxcbiAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAudHlwZShcImZvcm1cIilcbiAgICAgICAgICAgICAgICAuc2VuZCh0b2tlblNlZWRzKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uaXVtVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCv+OCpOODoOOCouOCpuODiOOCkuimi+OCi1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVzSW4gPSB0b2tlbi5leHBpcmVzX2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZW91dCA9IE51bWJlcih0aGlzLmV4cGlyZXNJbikgKiA5OTk7IC8v55u05YmN44Gr5pWZ44GI44Gm44GC44GS44KLXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZUNhbGxiYWNrVGltZXIgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVDYWxsYmFja1RpbWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGlyZUNhbGxiYWNrICYmIHRoaXMuZXhwaXJlQ2FsbGJhY2sodG9rZW4ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ot44O844Or44KS5L2c5oiQ44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHJvbGUg44Ot44O844Or5ZCNXG4gICAgICogQHBhcmFtIGJveCBNYWlu44Oc44OD44Kv44K55Lul5aSW44KS5a++6LGh44Go44GZ44KL5aC05ZCI44Gv44Oc44OD44Kv44K55ZCN44KS5oyH5a6aXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGNyZWF0ZVJvbGUoY2VsbDogc3RyaW5nLCByb2xlOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9Sb2xlL1wiO1xuICAgICAgICAgICAgY29uc3QgYm94TmFtZSA9IGJveCB8fCBudWxsO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgICAgIGlmKCFyb2xlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIE5hbWU6IHJvbGUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGJveCl7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJfQm94Lk5hbWVcIjogYm94TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgLnNlbmQoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg63jg7zjg6vmg4XloLHjga7lj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcm9sZSDnibnlrprjga7jg63jg7zjg6vmg4XloLHjgYzlj5blvpfjgZfjgZ/jgYTloLTlkIjjga/mjIflrppcbiAgICAgKiBAcGFyYW0gYm94IOeJueWumuOBruODnOODg+OCr+OCueOBrueJueWumuOBruODreODvOODq+aDheWgseOBjOWPluW+l+OBl+OBn+OBhOWgtOWQiOOBr+aMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBnZXRSb2xlKGNlbGw6IHN0cmluZywgcm9sZT86IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFJvbGVbXXxSb2xlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUm9sZVwiO1xuICAgICAgICAgICAgaWYgKHJvbGUpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2UgaWYocm9sZSAmJiBib3gpe1xuICAgICAgICAgICAgICAgIHVybCArPSBcIihOYW1lPSdcIiArIHJvbGUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg63jg7zjg6vjgpLliYrpmaTjgZnjgovvvIjntJDku5jjgZHjgYzjgYLjgovjgajliYrpmaTjgafjgY3jgarjgYTloLTlkIjjgYzjgYLjgovvvIlcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gcm9sZSDnibnlrprjga7jg63jg7zjg6vjgpLliYrpmaTjgZfjgZ/jgYTloLTlkIjjga/mjIflrppcbiAgICAgKiBAcGFyYW0gYm94IOeJueWumuOBruODnOODg+OCr+OCueOBrueJueWumuOBruODreODvOODq+OBjOWJiumZpOOBl+OBn+OBhOWgtOWQiOOBr+aMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVSb2xlKGNlbGw6IHN0cmluZywgcm9sZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1JvbGVcIjtcbiAgICAgICAgICAgIGlmIChib3gpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoTmFtZT0nXCIgKyByb2xlICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiKE5hbWU9J1wiICsgcm9sZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OCkuioreWumuOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODqyBcbiAgICAgKiBAcGFyYW0gc2V0Q2VsbFVybCDlpJbpg6jjgrvjg6vjgavmjIflrprjgZfjgZ/jgYTjgrvjg6vjga5VUkxcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0RXh0Q2VsbChjZWxsOiBzdHJpbmcsIHNldENlbGxVcmw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsL1wiO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBVcmw6IHNldENlbGxVcmwsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZChkYXRhKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vkuIDopqfjgpLlj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0RXh0Q2VsbExpc3QoY2VsbDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEV4dENlbGxbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbC9cIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vjga7op6PpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gZGVsZXRlQ2VsbFVybCDliYrpmaTjgZnjgovjgrvjg6vjga5VUkxcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlRXh0Q2VsbChjZWxsOiBzdHJpbmcsIGRlbGV0ZUNlbGxVcmw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZShkZWxldGVDZWxsVXJsKSArIFwiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWklumDqOOCu+ODq+OBq+WvvuOBl+OBpuODreODvOODq+OBi+ODquODrOODvOOCt+ODp+ODs+OCkuioreWumuOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0YXJnZXRDZWxsVXJsIOaMh+WumuOBmeOCi+WklumDqOOCu+ODq1VSTFxuICAgICAqIEBwYXJhbSB0eXBlIOODreODvOODq+OBi+ODquODrOODvOOCt+ODp+ODs+OBruaMh+WumihfUm9sZS9fUmVsYXRpb24pXG4gICAgICogQHBhcmFtIG5hbWUg44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44Gr5oyH5a6a44GZ44KL5ZCN5YmNXG4gICAgICogQHBhcmFtIGJveCDjg5zjg4Pjgq/jgrnlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0RXh0Q2VsbExpbmsoY2VsbDogc3RyaW5nLCB0YXJnZXRDZWxsVXJsOiBzdHJpbmcsIHR5cGU6IFwiX1JvbGVcInxcIl9SZWxhdGlvblwiLCBuYW1lOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9FeHRDZWxsKCdcIiArIEVuY29kZSh0YXJnZXRDZWxsVXJsKSArIFwiJykvXFwkbGlua3MvXCIgKyB0eXBlO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSBcIlwiO1xuICAgICAgICAgICAgaWYobmFtZSAmJiBib3gpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIGlmKG5hbWUpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHVyaTogdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9cIiArIHR5cGUuc3Vic3RyaW5nKDEpICsgcm9sZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNlbmQoZGF0YSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSW6YOo44K744Or44Gr57SQ44Gl44GR44Gf44Oq44Oz44Kv44Gu5LiA6KanXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIHRhcmdldENlbGxVcmwg5a++6LGh44Gr5oyH5a6a44GZ44KL44K744OrVVJMXG4gICAgICogQHBhcmFtIHR5cGUg44Ot44O844Or44GL44Oq44Os44O844K344On44Oz44Gu5oyH5a6aKF9Sb2xlL19SZWxhdGlvbilcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZ2V0RXh0Q2VsbExpbmsoY2VsbDogc3RyaW5nLCB0YXJnZXRDZWxsVXJsOiBzdHJpbmcsIHR5cGU6IFwiX1JvbGVcInxcIl9SZWxhdGlvblwiLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPExpbmtbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbCgnXCIgKyBFbmNvZGUodGFyZ2V0Q2VsbFVybCkgKyBcIicpL1xcJGxpbmtzL1wiICsgdHlwZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpJbpg6jjgrvjg6vjga7jg6rjg7Pjgq/jgpLliYrpmaRcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gdGFyZ2V0Q2VsbFVybCDlr77osaHjgajjgZfjgabmjIflrprjgZnjgovjgrvjg6tVUkxcbiAgICAgKiBAcGFyYW0gdHlwZSDjg63jg7zjg6vjgYvjg6rjg6zjg7zjgrfjg6fjg7Pjga7mjIflrpooX1JvbGUvX1JlbGF0aW9uKVxuICAgICAqIEBwYXJhbSBuYW1lIOWJiumZpOOBmeOCi+ODreODvOODqy/jg6rjg6zjg7zjgrfjg6fjg7PlkI1cbiAgICAgKiBAcGFyYW0gYm94IOWJiumZpOOBmeOCi+ODreODvOODq+OBruOBguOCi+ODnOODg+OCr+OCueWQje+8iOODh+ODleOCqeODq+ODiOOBr+ODoeOCpOODs2JveO+8iVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVFeHRDZWxsTGluayhjZWxsOiBzdHJpbmcsIHRhcmdldENlbGxVcmw6IHN0cmluZywgdHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHJvbGUgPSBcIlwiO1xuICAgICAgICAgICAgaWYoYm94KXtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInLF9Cb3guTmFtZT0nXCIgKyBib3ggKyBcIicpXCI7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgcm9sZSA9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvRXh0Q2VsbCgnXCIgKyBFbmNvZGUodGFyZ2V0Q2VsbFVybCkgKyBcIicpL1xcJGxpbmtzL1wiICsgdHlwZSArIHJvbGU7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqLjgqvjgqbjg7Pjg4jjga7jg6rjg7Pjgq/jgpLoqK3lrppcbiAgICAgKiBAcGFyYW0gY2VsbCDjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gYWNjb3VudCDlr77osaHjgajjgZfjgabmjIflrprjgZnjgovjgqLjgqvjgqbjg7Pjg4jlkI1cbiAgICAgKiBAcGFyYW0gbmFtZSDoqK3lrprjgZnjgovjg63jg7zjg6vlkI1cbiAgICAgKiBAcGFyYW0gYm94IOioreWumuOBmeOCi+ODreODvOODq+OBruOBguOCi+ODnOODg+OCr+OCueWQje+8iOODh+ODleOCqeODq+ODiOOBr+ODoeOCpOODs2JveO+8iVxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBzZXRBY2NvdW50TGluayhjZWxsOiBzdHJpbmcsIGFjY291bnQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBib3g/OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCByb2xlID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpK1wiX19jdGwvUm9sZVwiO1xuICAgICAgICAgICAgaWYoYm94KXtcbiAgICAgICAgICAgICAgICByb2xlICs9IFwiKE5hbWU9J1wiICsgbmFtZSArIFwiJyxfQm94Lk5hbWU9J1wiICsgYm94ICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHJvbGUgKz0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9BY2NvdW50KCdcIiArIGFjY291bnQgKyBcIicpL1xcJGxpbmtzL19Sb2xlXCI7XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZCh7dXJpOiByb2xlfSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ki44Kr44Km44Oz44OI44Gu44Oq44Oz44Kv44KS5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIGFjY291bnQg5a++6LGh44Go44GX44Gm5oyH5a6a44GZ44KL44Ki44Kr44Km44Oz44OI5ZCNXG4gICAgICogQHBhcmFtIG5hbWUg5YmK6Zmk44GZ44KL44Ot44O844Or5ZCNXG4gICAgICogQHBhcmFtIGJveCDliYrpmaTjgZnjgovjg63jg7zjg6vjga7jgYLjgovjg5zjg4Pjgq/jgrnlkI3vvIjjg4fjg5Xjgqnjg6vjg4jjga/jg6HjgqTjg7Nib3jvvIlcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlQWNjb3VudExpbmsoY2VsbDogc3RyaW5nLCBhY2NvdW50OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYm94Pzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgcm9sZSA9IFwiXCI7XG4gICAgICAgICAgICBpZihib3gpe1xuICAgICAgICAgICAgICAgIHJvbGUgPSBcIihOYW1lPSdcIiArIG5hbWUgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICByb2xlID0gXCIoTmFtZT0nXCIgKyBuYW1lICsgXCInKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgXCJfX2N0bC9BY2NvdW50KCdcIiArIGFjY291bnQgKyBcIicpL1xcJGxpbmtzL19Sb2xlXCIgKyByb2xlO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ki44Kr44Km44Oz44OI44KS5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIGFjY291bnQg5a++6LGh44Go44GX44Gm5oyH5a6a44GZ44KL44Ki44Kr44Km44Oz44OI5ZCNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUFjY291bnQoY2VsbDogc3RyaW5nLCBhY2NvdW50OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvQWNjb3VudCgnXCIgKyBhY2NvdW50ICsgXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Or44O844Or5LiA6Kan44Gu5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg44K744Or5ZCNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGdldFJ1bGVzKGNlbGw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxSdWxlW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBcIl9fY3RsL1J1bGVcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZC5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6vjg7zjg6vjgpLoqK3lrprjgZnjgotcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcnVsZSDnmbvpjLLjgZnjgovjg6vjg7zjg6tcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0UnVsZShjZWxsOiBzdHJpbmcsIHJ1bGU6IFJ1bGUsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUnVsZVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgLnBvc3QodXJsKVxuICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAuc2VuZChydWxlKVxuICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOODq+ODvOODq+OCkuWJiumZpOOBmeOCi1xuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBydWxlSWQg5YmK6Zmk44GZ44KL44Or44O844OraWRcbiAgICAgKiBAcGFyYW0gYm94IOODnOODg+OCr+OCueOBq+e0kOOBpeOBhOOBpuOCi+WgtOWQiOOBr2JveOWQjeaMh+WumlxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVSdWxlKGNlbGw6IHN0cmluZywgcnVsZUlkOiBzdHJpbmcsIGJveD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvUnVsZVwiO1xuICAgICAgICAgICAgaWYoYm94KXtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoX19pZD0nXCIgKyBydWxlSWQgKyBcIicsX0JveC5OYW1lPSdcIiArIGJveCArIFwiJylcIjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCIoX19pZD0nXCIgKyBydWxlSWQgKyBcIicpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIOODoeODg+OCu+ODvOOCuOOBrumAgeS/oUFQSVxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSB0byDlrpvlhYjjgrvjg6vlkI1cbiAgICAgKiBAcGFyYW0gdHlwZSDjg6Hjg4Pjgrvjg7zjgrjpgIHkv6Hjgr/jgqTjg5fjga7mjIflrppcbiAgICAgKiBAcGFyYW0gcmVxdWVzdENvbnRlbnQg55m76Yyy5L6d6aC844GX44Gf6Zai5L+C5oOF5aCxKFVSTClcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2VuZE1lc3NhZ2UoY2VsbDogc3RyaW5nLCB0bzogc3RyaW5nLCB0eXBlOiBNZXNzYWdlU2VuZFR5cGUsIHJlcXVlc3RDb250ZW50OiBSdWxlfHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBjb25zdCBjZWxsVXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdG9VcmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEodG8pO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbFVybCArIFwiX19tZXNzYWdlL3NlbmQvXCI7XG5cbiAgICAgICAgICAgIGxldCBib2R5ID0ge307XG5cbiAgICAgICAgICAgIGlmICh0eXBlLmxhc3RJbmRleE9mKFwicmVxLnJ1bGUuXCIsIDApID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgVG86IHRvVXJsLFxuICAgICAgICAgICAgICAgICAgICBUeXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UnVsZTogcmVxdWVzdENvbnRlbnQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZS5sYXN0SW5kZXhPZihcInJlcS5yb2xlLlwiLCAwKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIFRvOiB0b1VybCxcbiAgICAgICAgICAgICAgICAgICAgVHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdFJlbGF0aW9uOiByZXF1ZXN0Q29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgUmVxdWVzdFJlbGF0aW9uVGFyZ2V0OiBjZWxsVXJsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGJvZHkpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVzLnRleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPIHJlY2VpdmVNZXNzYWdlXG4gICAgICovXG4gICAgcmVjZWl2ZU1lc3NhZ2UoKXt9XG4gICAgXG4gICAgLyoqXG4gICAgICogQUNM44KS6Kit5a6a44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIGFjbCDoqK3lrprjgZnjgotBQ0zjga5qc29uKFhNTOOBq+WkieaPmylcbiAgICAgKi9cbiAgICBzZXRBY2woY2VsbDogc3RyaW5nLCBhY2VzOiBBY2VbXSwgdGFyZ2V0UGF0aD86IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgY2VsbHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRhcmdldFBhdGg/IGNlbGx1cmwrdGFyZ2V0UGF0aCA6IGNlbGx1cmw7XG5cbiAgICAgICAgICAgIGNvbnN0IGFjbDogQWNsID0ge1xuICAgICAgICAgICAgICAgIFwiQFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwieG1sbnM6RFwiOiBcIkRBVjpcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpwXCI6IFwidXJuOngtcGVyc29uaXVtOnhtbG5zXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIkQ6YWNlXCI6IGFjZXMsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhY2xYbWwgPSBqczJ4bWwucGFyc2UoXCJEOmFjbFwiLCBhY2wpO1xuXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKFwiQUNMXCIsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCk9PntcbiAgICAgICAgICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94bWxcIik7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIrdG9rZW4pXG4gICAgICAgICAgICB4aHIuc2VuZChhY2xYbWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrXjg7zjg5PjgrnjgrPjg6zjgq/jgrfjg6fjg7Pjgr3jg7zjgrnkvZzmiJBcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gbmFtZSBSZXNvcmNl5ZCNXG4gICAgICogQHBhcmFtIHJlc291cmNlIFJlc29yY2XkuK3ouqtcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgY3JlYXRlU2VydmljZUNvbGxlY3Rpb24oY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcmVzb3VyY2U6IGFueSwgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiL19fc3JjL1wiICsgbmFtZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucHV0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKVxuICAgICAgICAgICAgICAgIC5zZW5kKHJlc291cmNlKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrXjg7zjg5PjgrnjgrPjg6zjgq/jgrfjg6fjg7Pjgr3jg7zjgrnoqK3lrprpgannlKhcbiAgICAgKiBAcGFyYW0gY2VsbCDlr77osaHjgrvjg6tcbiAgICAgKiBAcGFyYW0gcGF0aCDjg5HjgrlcbiAgICAgKiBAcGFyYW0gc2NyaXB0IOOCueOCr+ODquODl+ODiOWQjSh4eHguanMpXG4gICAgICogQHBhcmFtIHNlcnZpY2Ug44K144O844OT44K55ZCNKHl5eSlcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgc2V0U2VydmljZUNvbGxlY3Rpb24oY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHNjcmlwdDogc3RyaW5nLCBzZXJ2aWNlOiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICBjb25zdCBwcm9wID0ge1xuICAgICAgICAgICAgICAgIFwiQFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwieG1sbnM6RFwiOiBcIkRBVjpcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ4bWxuczpwXCI6IFwidXJuOngtcGVyc29uaXVtOnhtbG5zXCIsXG4gICAgICAgICAgICAgICAgICAgIFwieG1sbnM6elwiOiBcImh0dHA6Ly93d3cudzMuY29tL3N0YW5kYXJkcy96MzkuNTAvXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIkQ6c2V0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJEOnByb3BcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwOnNlcnZpY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFuZ3VhZ2VcIjogXCJKYXZhU2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBzZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzY3JpcHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBwcm9wWG1sID0ganMyeG1sLnBhcnNlKFwiRDpwcm9wZXJ0eXVwZGF0ZVwiLCBwcm9wKTtcblxuICAgICAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbihcIlBST1BQQVRDSFwiLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veG1sXCIpO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiK3Rva2VuKVxuICAgICAgICAgICAgeGhyLnNlbmQocHJvcFhtbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCteODvOODk+OCueOCs+ODrOOCr+OCt+ODp+ODs+OCveODvOOCueWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq1xuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBuYW1lIFJlc29yY2XlkI1cbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgZGVsZXRlU2VydmljZUNvbGxlY3Rpb24oY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiL19fc3JjL1wiICsgbmFtZTtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+OCv+OCpOODl+OBruWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOBruOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOOCqOODs+ODhuOCo+ODhuOCo+OBruODkeOCuVxuICAgICAqIEBwYXJhbSBpZCDjgqjjg7Pjg4bjgqPjg4bjgqNpZFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGVFbnRpdHlUeXBlKGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbnRpdHlUeXBlTmFtZTogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIi8kbWV0YWRhdGEvRW50aXR5VHlwZSgnXCIgKyBlbnRpdHlUeXBlTmFtZSArIFwiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3BlcnR544Gu5YmK6ZmkXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44Gu44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44Ko44Oz44OG44Kj44OG44Kj44Gu44OR44K5XG4gICAgICogQHBhcmFtIGVudGl0eVR5cGUg44Ko44Oz44OG44Kj44OG44Kj44K/44Kk44OX44Gu5ZCN5YmNXG4gICAgICogQHBhcmFtIHByb3BlcnR5IHByb3BlcnR544Gu5ZCN5YmNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZVByb3BlcnR5KGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbnRpdHlUeXBlOiBzdHJpbmcsIHByb3BlcnR5OiBzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiLyRtZXRhZGF0YS9Qcm9wZXJ0eShOYW1lPSdcIiArcHJvcGVydHkrIFwiJyxfRW50aXR5VHlwZS5OYW1lPSdcIitlbnRpdHlUeXBlK1wiJylcIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZGVsZXRlKHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmVhcmVyIFwiICsgdG9rZW4pXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJveOOBruWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOBruOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBib3ggYm945ZCNXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGRlbGV0ZUJveChjZWxsOiBzdHJpbmcsIGJveDogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIFwiX19jdGwvQm94KE5hbWU9J1wiK2JveCtcIicpXCI7ICAgICAgICAgICAgXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmRlbGV0ZSh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog44OX44Ot44OV44Kh44Kk44Or5oOF5aCx44KS5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwgXG4gICAgICovXG4gICAgZ2V0UHJvZmlsZShjZWxsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBlcnNvbml1bVByb2ZpbGVSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGNlbGx1cmwgKyBcIl9fL3Byb2ZpbGUuanNvblwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5nZXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZTogUGVyc29uaXVtUHJvZmlsZVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqLjg5fjg6rjgrvjg6vlsILnlKhcbiAgICAgKiDjgqLjg5fjg6rotbfli5Xmg4XloLHjgpLlj5blvpdcbiAgICAgKiBAcGFyYW0gY2VsbCBcbiAgICAgKi9cbiAgICBnZXRMYXVuY2goY2VsbDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQZXJzb25pdW1MYXVuY2hKc29uPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gY2VsbHVybCArIFwiX18vbGF1bmNoLmpzb25cIjtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAuZ2V0KHVybClcbiAgICAgICAgICAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bUxhdW5jaEpzb24gPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJhcuOCpOODs+OCueODiOODvOODqyBcbiAgICAgKiBAcGFyYW0gYmFyVXJsXG4gICAgICovXG4gICAgYmFySW5zdGFsbChjZWxsOiBzdHJpbmcsIGJveDogc3RyaW5nLCBiYXJVcmw6IHN0cmluZywgX3Rva2VuPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgY2VsbHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGNlbGx1cmwgKyBib3g7XG5cbiAgICAgICAgICAgIHJlcXVlc3QuZ2V0KGJhclVybClcbiAgICAgICAgICAgICAgICAucmVzcG9uc2VUeXBlKFwiYmxvYlwiKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMxKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSByZXMxLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5vcGVuKFwiTUtDT0xcIiwgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3ppcFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIit0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZW5kKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+ODh+ODvOOCv+OBruWtmOWcqOeiuuiqjVxuICAgICAqIEBwYXJhbSBjZWxsIOOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBfX19pZCDjgqjjg7Pjg4bjgqPjg4bjgqNpZFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBpc0V4aXN0KGNlbGw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBfX2lkPzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gX3Rva2VuIHx8IHRoaXMudG9rZW47XG4gICAgICAgICAgICBsZXQgdXJsID0gbnVsbDtcbiAgICAgICAgICAgIGlmKF9faWQpe1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIignXCIgKyBfX2lkICsgXCInKVwiO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj5Y+W5b6XXG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744Or5ZCNXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIHF1ZXJ5IOOCr+OCqOODqu+8iFRPRE8g5pyq5a6M5oiQ77yJXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIGdldChjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcXVlcnk/OiBRdWVyeXxzdHJpbmcsIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGVyc29uaXVtRGF0YVtdIHwgUGVyc29uaXVtRGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHVybCArPSBFbmNvZGUoXCI/JG9yZGVyYnk9XCIgKyBxdWVyeSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYocXVlcnkpe1xuICAgICAgICAgICAgICAgIHVybCA9IGNvbnZlcnRRdWVyaWVkVXJsKHVybCwgcXVlcnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gRW5jb2RlKFwiPyRvcmRlcmJ5PV9fdXBkYXRlZCUyMGRlc2NcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLmdldCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5lbmQoKGVycm9yLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6IFBlcnNvbml1bVJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmQucmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Ko44Oz44OG44Kj44OG44Kj5pu444GN6L6844G/XG4gICAgICogQHBhcmFtIGNlbGwg5a++6LGh44K744OrXG4gICAgICogQHBhcmFtIHBhdGgg44OR44K5XG4gICAgICogQHBhcmFtIGVudGl0eSDjgqjjg7Pjg4bjgqPjg4bjgqPmg4XloLFcbiAgICAgKiBAcGFyYW0gX3Rva2VuIOacgOW+jOOBq2xvZ2lu44GX44Gf44OI44O844Kv44Oz5Lul5aSW44KS5Yip55So44GZ44KL5aC05ZCI44Gv44OI44O844Kv44Oz44KS5oyH5a6aXG4gICAgICovXG4gICAgcG9zdChjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW50aXR5OiBhbnksIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aDtcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmwpXG4gICAgICAgICAgICAgICAgLnNldChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgICAgICAgICAuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC5zZW5kKGVudGl0eSlcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBQZXJzb25pdW1SZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+S4iuabuOOBjVxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOODkeOCuVxuICAgICAqIEBwYXJhbSBpZCDjgqjjg7Pjg4bjgqPjg4bjgqNpZFxuICAgICAqIEBwYXJhbSBlbnRpdHkg5LiK5pu444GN44GZ44KL44Ko44Oz44OG44Kj44OG44Kj5oOF5aCxXG4gICAgICogQHBhcmFtIF90b2tlbiDmnIDlvozjgatsb2dpbuOBl+OBn+ODiOODvOOCr+ODs+S7peWkluOCkuWIqeeUqOOBmeOCi+WgtOWQiOOBr+ODiOODvOOCr+ODs+OCkuaMh+WumlxuICAgICAqL1xuICAgIHVwZGF0ZShjZWxsOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaWQ6IHN0cmluZywgZW50aXR5OiBhbnksIF90b2tlbj86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IF90b2tlbiB8fCB0aGlzLnRva2VuO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVDZWxsU2NoZW1hKGNlbGwpICsgcGF0aCArIFwiKCdcIiArIGlkICsgXCInKVwiO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wdXQodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuc2VuZChlbnRpdHkpXG4gICAgICAgICAgICAgICAgLmVuZCgoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOOCqOODs+ODhuOCo+ODhuOCo+OBruWJiumZpFxuICAgICAqIEBwYXJhbSBjZWxsIOWvvuixoeOBruOCu+ODq+WQjVxuICAgICAqIEBwYXJhbSBwYXRoIOOCqOODs+ODhuOCo+ODhuOCo+OBruODkeOCuVxuICAgICAqIEBwYXJhbSBpZCDjgqjjg7Pjg4bjgqPjg4bjgqNpZFxuICAgICAqIEBwYXJhbSBfdG9rZW4g5pyA5b6M44GrbG9naW7jgZfjgZ/jg4jjg7zjgq/jg7Pku6XlpJbjgpLliKnnlKjjgZnjgovloLTlkIjjga/jg4jjg7zjgq/jg7PjgpLmjIflrppcbiAgICAgKi9cbiAgICBkZWxldGUoY2VsbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGlkPzogc3RyaW5nLCBfdG9rZW4/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBfdG9rZW4gfHwgdGhpcy50b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGlkP1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2VsbFNjaGVtYShjZWxsKSArIHBhdGggKyBcIignXCIgKyBpZCArIFwiJylcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNlbGxTY2hlbWEoY2VsbCkgKyBwYXRoO1xuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICAgICAgIC5kZWxldGUodXJsKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgICAgICAgICAgLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbilcbiAgICAgICAgICAgICAgICAuZW5kKChlcnJvciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44K744Or5ZCN44GL44KJ44K744Or44K544Kt44O844OeVVJM44KS5L2c5oiQ44GZ44KLXG4gICAgICogQHBhcmFtIGNlbGwgXG4gICAgICovXG4gICAgY3JlYXRlQ2VsbFNjaGVtYShjZWxsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvdG9jb2x9Oi8vJHt0aGlzLmhvc3R9LyR7Y2VsbH0vYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrvjg6vjgrnjgq3jg7zjg55VUkzjgYvjgonjgrvjg6vlkI3jgpLmir3lh7rjgZnjgotcbiAgICAgKiBAcGFyYW0gdXJsIFxuICAgICAqL1xuICAgIGV4dHJhY3RDZWxsTmFtZSh1cmw6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjZWxsID0gdXJsLnN1YnN0cmluZyh1cmwuaW5kZXhPZih0aGlzLmhvc3QpICsgdGhpcy5ob3N0Lmxlbmd0aCArIDEsIHVybC5sYXN0SW5kZXhPZihcIi9cIikpO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgZzmraLmmYJcbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZih0aGlzLmV4cGlyZUNhbGxiYWNrVGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmV4cGlyZUNhbGxiYWNrVGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxufVxuXG5cbi8vIC8qXG4vLyAvL1RPRE8g44K544Kt44O844Oe6KqN6Ki855So44GuQVBJ44CCXG4vLyAvL1BlcnNvbml1beOCouODl+ODquODnuODvOOCseODg+ODiOWIqeeUqOaZguOBq+S9v+OBhuOBk+OBqOOBq+OBquOCi+OChOOCguOBl+OCjOOBrOOAglxuLy8gZXhwb3J0IGNvbnN0IHRyYW5zY2VsbHRva2VuID0gKGpvc2hpOiBzdHJpbmcsIGJ1a2E6IHN0cmluZykgPT4ge1xuLy8gICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4vLyAgICAgY29uc3QgdXJsID0gY3JlYXRlQ2VsbFNjaGVtYShidWthKStcIl9fdG9rZW5cIjtcbi8vICAgICByZXF1ZXN0XG4vLyAgICAgICAucG9zdCh1cmwpXG4vLyAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuLy8gICAgICAgLnR5cGUoXCJmb3JtXCIpXG4vLyAgICAgICAuc2VuZCh7XG4vLyAgICAgICAgIGdyYW50X3R5cGU6IFwicGFzc3dvcmRcIiwgXG4vLyAgICAgICAgIHVzZXJuYW1lOiBcImJvYlwiLCAgLy9UT0RPIFxuLy8gICAgICAgICBwYXNzd29yZDogXCJwaXlvcGl5b1wiLCAvL1RPRE8gXG4vLyAgICAgICAgIHBfdGFyZ2V0OiBjcmVhdGVDZWxsU2NoZW1hKGpvc2hpKSxcbi8vICAgICAgIH0pXG4vLyAgICAgICAuZW5kKChlcnJvciwgcmVzKT0+e1xuLy8gICAgICAgICBpZihlcnJvcil7XG4vLyAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVzLnRleHQpKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSk7XG4vLyAgIH0pO1xuLy8gfTtcbi8vIGV4cG9ydCBjb25zdCByZWZyZXNoQWNjZXNzVG9rZW4gPSAoam9zaGk6IHN0cmluZywgYnVrYTogc3RyaW5nLCBhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuKSA9PiB7XG4vLyAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbi8vICAgICBjb25zdCB1cmwgPSBjcmVhdGVDZWxsU2NoZW1hKGpvc2hpKStcIl9fdG9rZW5cIjtcbi8vICAgICByZXF1ZXN0XG4vLyAgICAgICAucG9zdCh1cmwpXG4vLyAgICAgICAuc2V0KFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKVxuLy8gICAgICAgLnR5cGUoXCJmb3JtXCIpXG4vLyAgICAgICAuc2VuZCh7XG4vLyAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLCBcbi8vICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuLy8gICAgICAgICBjbGllbnRfaWQ6IGNyZWF0ZUNlbGxTY2hlbWEoYnVrYSksXG4vLyAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGFjY2Vzc1Rva2VuLFxuLy8gICAgICAgfSlcbi8vICAgICAgIC5lbmQoKGVycm9yLCByZXMpPT57XG4vLyAgICAgICAgIGlmKGVycm9yKXtcbi8vICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXMudGV4dCkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9KTtcbi8vICAgfSk7XG4vLyB9O1xuLy8gKi9cblxuLy8gbW9kdWxlLmV4cG9ydHMgPSBQZXJzb25pdW1DbGllbnQ7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsaWVudC50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN1cGVyYWdlbnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzdXBlcmFnZW50XCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianMyeG1scGFyc2VyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwianMyeG1scGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3Qgc3BsaXRXb3JkID0gKG9yaWdpbmFsOiBzdHJpbmcpID0+IHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIHdoaWxlKGluZGV4IDwgb3JpZ2luYWwubGVuZ3RoKXtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IG9yaWdpbmFsLnN1YnN0cmluZyhpbmRleCwgaW5kZXgrMSk7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBFc2NhcGVTZXF1ZW5jZU1hcCA9IHtcbiAgICBcIjpcIjogXCIlM0FcIixcbiAgICBcIi9cIjogXCIlMkZcIixcbiAgICBcIiBcIjogXCIlMjBcIixcbiAgICBcIiRcIjogXCIlMjRcIixcbiAgICBcIlxcXFxcIjogXCIlNUNcIixcbn07XG5cbmNvbnN0IHJldmVyc2VNYXAgPSAobWFwKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgIHJlc3VsdFttYXBba2V5XV0gPSBrZXk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBjb25zdCBFbmNvZGUgPSAob3JpZ2luYWw6IHN0cmluZykgPT4ge1xuICAgIGxldCByZXN1bHRBcnJheSA9IHNwbGl0V29yZChvcmlnaW5hbCk7XG4gICAgcmVzdWx0QXJyYXkgPSByZXN1bHRBcnJheS5tYXAoKGNoYXJhY3RlcikgPT4ge1xuICAgICAgICBpZihFc2NhcGVTZXF1ZW5jZU1hcFtjaGFyYWN0ZXJdKXtcbiAgICAgICAgICAgIHJldHVybiBFc2NhcGVTZXF1ZW5jZU1hcFtjaGFyYWN0ZXJdO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0QXJyYXkuam9pbihcIlwiKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IERlY29kZSA9IChvcmlnaW5hbDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGluZGV4ID0gLTI7XG4gICAgY29uc3QgUmV2ZXJzZVNlcXVlbmNlTWFwID0gcmV2ZXJzZU1hcChFc2NhcGVTZXF1ZW5jZU1hcCk7XG4gICAgbGV0IHNlbnRlbmNlID0gb3JpZ2luYWw7XG4gICAgd2hpbGUoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGluZGV4ID0gc2VudGVuY2UuaW5kZXhPZihcIiVcIik7XG4gICAgICAgIGlmKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHNlbnRlbmNlLnN1YnN0cmluZyhpbmRleCwgaW5kZXgrNSk7XG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSBzZW50ZW5jZS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgYWZ0ZXIgPSBzZW50ZW5jZS5zdWJzdHJpbmcoaW5kZXgrNSk7XG4gICAgICAgICAgICBzZW50ZW5jZSA9IGJlZm9yZSArIFJldmVyc2VTZXF1ZW5jZU1hcFt0YXJnZXRdICsgYWZ0ZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlbnRlbmNlO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gICAgZm9ybWF0Pzogc3RyaW5nLFxuICAgIGV4cGFuZD86IHN0cmluZyxcbiAgICBzZWxlY3Q/OiBzdHJpbmcsXG4gICAgb3JkZXJieT86IHN0cmluZyxcbiAgICB0b3A/OiBzdHJpbmcsXG4gICAgc2tpcD86IHN0cmluZyxcbiAgICBmaWx0ZXI/OiBzdHJpbmdbXSxcbiAgICBpbmxpbmVjb3VudD86IHN0cmluZyxcbiAgICBxPzogc3RyaW5nLFxufVxuXG5jb25zdCBBTkQgPSBcIiBhbmQgXCI7XG5cbi8vIFRPRE8g44GN44Gh44KT44Go5pW055CG44GZ44KLXG5leHBvcnQgY29uc3QgY29udmVydFF1ZXJpZWRVcmwgPSAodXJsOiBzdHJpbmcsIHF1ZXJ5OiBRdWVyeSk6IHN0cmluZyA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IHVybCArIFwiP1wiO1xuICAgIGlmKHF1ZXJ5LmZpbHRlciAmJiBxdWVyeS5maWx0ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBmaWx0ZXJzID0gcXVlcnkuZmlsdGVyO1xuICAgICAgICByZXN1bHQgKz0gRW5jb2RlKFwiJGZpbHRlcj1cIik7XG4gICAgICAgIGZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyKT0+e1xuICAgICAgICAgICAgcmVzdWx0ICs9IEVuY29kZShmaWx0ZXIpO1xuICAgICAgICAgICAgcmVzdWx0ICs9IEFORDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zdWJzdHJpbmcoMCwgcmVzdWx0Lmxhc3RJbmRleE9mKEFORCkpICsgXCImXCI7XG4gICAgfWVsc2UgaWYocXVlcnkudG9wKSB7XG4gICAgICAgIGNvbnN0IHRvcCA9IHF1ZXJ5LnRvcDtcbiAgICAgICAgcmVzdWx0ICs9IEVuY29kZShcIiR0b3A9XCIgKyB0b3ApICsgXCImXCI7XG4gICAgfWVsc2Uge1xuICAgICAgICBPYmplY3Qua2V5cyhxdWVyeSkuZm9yRWFjaCgoa2V5KT0+e1xuICAgICAgICAgICAgcmVzdWx0ICs9IEVuY29kZShrZXkpICsgXCI9XCIgKyBFbmNvZGUocXVlcnlba2V5XSkgKyBcIiZcIjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsaXR5LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXM2LXByb21pc2VcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJlczYtcHJvbWlzZVwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=