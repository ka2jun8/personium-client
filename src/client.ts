import * as request from "superagent";
import * as js2xml from "js2xmlparser";
import { Encode, Decode, convertQueriedUrl, Query } from "./utility";

//for using Promise on es5
import { Promise } from "es6-promise";

/**
 * Personiumのアクセストークン情報
 */
export interface PersoniumAccessToken {
    access_token: string,
    refresh_token: string,
    expires_in: number,
}

/**
 * Personiumのレスポンスデータ型
 */
export interface PersoniumResponse {
    d: {
        results: any,
    }
}

/**
 * Personiumのデータ型
 */
export interface PersoniumData {
    __metadata: {
        uri: string,
        etag: string,
        type: string,
    },
    __published: string, //Date(xxx)
    __updated: string, //Date(xxx)
}

export interface Cell extends PersoniumData {
    Name: string;
}

/**
 * 外部セルのデータ型
 */
export interface ExtCell extends PersoniumData {
    Url: string,
    _Role: {
        __deferred: {
            uri: string,
        },
    },
    _Relation: {
        __deferred: {
            uri: string,
        },
    },
}

/**
 * ルールの型
 * //変わるかも
 */
export interface Rule {
    __id?: string,
    External?: boolean,
    Service: string,
    Action: string,
    Type: string,
    Object: string,
    "_Box.Name"?: string,
}

export interface Ace {
    "D:principal": {
        "D:href": string,
    },
    "D:grant": {
        "D:privilege": {[aceType: string]: {}}[],
    },
}
export interface Acl {
    "@": {
        "xmlns:D": "DAV:",
        "xmlns:p": "urn:x-personium:xmlns",
    },
    "D:ace": Ace[],
}

/**
 * スクリプトの型
 * //変わるかも
 */
export interface Script {
    name: string,
    uri: string,
}

/**
 * Link型 ExtCellのLinkなど
 */
export interface Link extends PersoniumData {
    uri: string,
}

/**
 * Role型
 */ 
export interface Role extends PersoniumData {
    Name: string,
    "_Box.Name": string,
    _Box: {
        __deferred: {
            uri: string,
        }
    },
    _Account: {
        __deferred: {
            uri: string,
        }
    },
    _ExtCell: {
        __deferred: {
            uri: string,
        }
    },
    _ExtRole: {
        __deferred: {
            uri: string,
        }
    },
    _Relation: {
        __deferred: {
            uri: string,
        }
    }
}


export interface Box extends PersoniumData {
    Name: string;
    Schema: string;
    _Relation: {
        __deferred: {
            uri: string;
        }
    };
    _ReceivedMessage: {
        __deferred: {
            uri: string;
        }
    }
    _SentMessage: {
        __deferred: {
            uri: string;
        }
    }
    _Rule: {
        __deferred: {
            uri: string;
        }
    }
}

/**
 * 公開されているプロフィール情報のレスポンス型
 */
export interface PersoniumProfileResponse {
    DisplayName: string,
    Description: string,
    Image: string,
    ProfileImageName: string,
}

export interface PersoniumLaunchJson {
    personal: {
        web: string,
        android: string,
        ios: string,
        appTokenId: string,
        appTokenPw: string,
    }
}

/**
 * メッセージ送信のタイプ型
 */
export type MessageSendType = 
    "message"| //単なるメッセージ送信
    "req.relation.build"| //関係性構築依頼
    "req.relation.break"| //関係性破棄依頼
    "req.role.grant"| //ロール設定依頼
    "req.role.revoke"| //ロール破棄依頼
    "req.rule.register"| //ルール登録依頼
    "req.rule.unregister" //ルール破棄依頼
    ;

/**
 * Personiumを扱うためのクライアントライブラリ
 */
export class PersoniumClient {
    /**
     * プロトコル（デフォルト:https）
     */
    protocol: string = "https";
    /**
     * Personiumのサーバホスト名
     */
    host: string = null;
    /**
     * アクセストークン情報
     */
    personiumToken: PersoniumAccessToken = null;
    /**
     * アクセストークン
     */
    token: string = null;
    /**
     * アクセストークンの有効期限
     */
    expiresIn: number = 3600;
    /**
     * ログイン時刻 - 認証の有効期限内かどうかを確認
     */
    loginTime: number = 0;
    /**
     * expireしたことが確認されたときに呼び出すコールバック
     */
    expireCallback: (refreshToken: string)=>void;
    /**
     * expireの確認タイマー
     */
    expireCallbackTimer: any = null;

    /**
     * コンストラクタ
     * @param unit ホスト名 
     * @param protocol プロトコル
     */
    constructor(unit: string, protocol?: string) {
        if (!unit) {
            console.warn("Please set `host` address");
        }
        else if (unit.lastIndexOf("http") === 0) {
            console.warn("`host` does not need protocol prefix");
        }
        if(protocol){
            this.protocol = protocol;
        }
        this.host = unit;
    }

    /**
     * 認証の有効性チェック
     */
    authValidate(): boolean {
        const result = (+new Date()-this.loginTime)/1000 < this.expiresIn;
        if(!result) {
            this.expireCallback && this.expireCallback(this.personiumToken.refresh_token);
            console.warn("Maybe you have to re-login while your token is expired");
        }
        return result;
    }

    /**
     * Personiumへログイン
     * @param cell ログイン対象のセル名 
     * @param username ユーザ名
     * @param password パスワード
     * @param expireCallback 有効期限が切れ際に呼び出すコールバック 
     */
    login(cell: string, username: string, password: string, expireCallback?: (refreshToken: string)=>void) {
        return new Promise<PersoniumAccessToken>((resolve, reject) => {
            const url = this.createCellSchema(cell) + "__token";
            this.expireCallback = expireCallback && expireCallback;
            request
                .post(url)
                .set("Accept", "application/json")
                .type("form")
                .send({ grant_type: "password", username, password })
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const token: PersoniumAccessToken = JSON.parse(res.text);
                        this.personiumToken = token;
                        this.token = token.access_token;
                        this.expiresIn = token.expires_in;
                        this.loginTime = +new Date();

                        // タイムアウトを見る
                        const timeout = Number(this.expiresIn) * 900; //直前に教えてあげる
                        this.expireCallbackTimer = setTimeout(()=>{
                            this.expireCallbackTimer = null;
                            this.expireCallback && this.expireCallback(token.refresh_token);
                        }, timeout);

                        resolve(token);
                    }
                });
        })
    }

    /**
     * schema認証トークンの取得
     * @param cell 個人のセル 
     * @param username ユーザ名
     * @param password パスワード
     * @param appCell アプリセル
     * @param appId アプリセルId
     * @param appPass アプリセルPass
     */
    appLogin(cell: string, username: string, password: string, appCell: string, appId: string, appPass: string) {
        return new Promise<PersoniumAccessToken>((resolve, reject) => {
            const cellUrl = this.createCellSchema(cell);
            const appCellUrl = this.createCellSchema(appCell);
            const appCellTokenUrl = appCellUrl + "__token";
            request
                .post(appCellTokenUrl)
                .set("Accept", "application/json")
                .type("form")
                .send({ grant_type: "password", username: appId, password: appPass, p_target: cellUrl })
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const appToken: PersoniumAccessToken = JSON.parse(res.text);
                        const schemaTokenUrl = cellUrl + "__token";
                        request
                        .post(schemaTokenUrl)
                        .set("Accept", "application/json")
                        .type("form")
                        .send({ grant_type: "password", username, password, client_id: appCellUrl, client_secret: appToken.access_token })
                        .end((error, res) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                const token: PersoniumAccessToken = JSON.parse(res.text);
                                this.personiumToken = token;
                                this.token = token.access_token;
                                this.expiresIn = token.expires_in;
                                this.loginTime = +new Date();
                                resolve(token);
                            }
                        });
                    }
                });
        })
    }    

    /**
     * アクセストークンの更新やトランスセルトークンを作成
     * @param cell セル名
     * @param refreshToken リフレッシュ用トークン（login時に取得）
     * @param target トランスセルトークンを生成する場合は指定
     */
    refreshAccessToken(cell: string, refreshToken: string, target?: string) {
        return new Promise<PersoniumAccessToken>((resolve, reject) => {
            const url = this.createCellSchema(cell) + "__token";
            const tokenSeeds = target ? {
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                p_target: this.createCellSchema(target),
            } : {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken,
                };
            request
                .post(url)
                .set("Accept", "application/json")
                .type("form")
                .send(tokenSeeds)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const token = JSON.parse(res.text);
                        this.personiumToken = token;
                        this.token = token.access_token;
                        
                        // タイムアウトを見る
                        this.expiresIn = token.expires_in;
                        const timeout = Number(this.expiresIn) * 900; //直前に教えてあげる
                        this.expireCallbackTimer = setTimeout(()=>{
                            this.expireCallbackTimer = null;
                            this.expireCallback && this.expireCallback(token.refresh_token);
                        }, timeout);

                        resolve(token);
                    }
                });
        });
    }

    /**
     * ロールを作成する
     * @param cell 対象セル名
     * @param role ロール名
     * @param box Mainボックス以外を対象とする場合はボックス名を指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    createRole(cell: string, role: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/Role/";
            const boxName = box || null;
            let data = {};
            if(!role) {
                reject();
            } else {
                data = {
                    Name: role,
                }
                if(box){
                    data = {
                        Name: role,
                        "_Box.Name": boxName,
                    }
                }
                request
                    .post(url)
                    .set("Accept", "application/json")
                    .set("Authorization", "Bearer " + token)
                    .send(data)
                    .end((error, res) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(true);
                        }
                    });
            }
        });
    }

    /**
     * BOX情報の取得
     * @param cell 対象セル名
     * @param box 特定のロール情報が取得したい場合は指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getBox(cell: string, box?: string, _token?: string) {
        return new Promise<Box[]|Box>((resolve, reject) => {
            const token = _token || this.token;
            let url = this.createCellSchema(cell) + "__ctl/Box";
            if (box) {
                url += "(Name='" + box + "')";
            }
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumResponse = JSON.parse(res.text);
                        resolve(response.d.results);
                    }
                });
        });
    }

    /**
     * ロール情報の取得
     * @param cell 対象セル名
     * @param role 特定のロール情報が取得したい場合は指定
     * @param box 特定のボックスの特定のロール情報が取得したい場合は指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getRole(cell: string, role?: string, box?: string, _token?: string) {
        return new Promise<Role[]|Role>((resolve, reject) => {
            const token = _token || this.token;
            let url = this.createCellSchema(cell) + "__ctl/Role";
            if (role) {
                url += "(Name='" + role + "')";
            }else if(role && box){
                url += "(Name='" + role + "',_Box.Name='" + box + "')";
            }
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumResponse = JSON.parse(res.text);
                        resolve(response.d.results);
                    }
                });
        });
    }

    /**
     * ロールを削除する（紐付けがあると削除できない場合がある）
     * @param cell 対象セル名
     * @param role 特定のロールを削除したい場合は指定
     * @param box 特定のボックスの特定のロールが削除したい場合は指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteRole(cell: string, role: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let url = this.createCellSchema(cell) + "__ctl/Role";
            if (box) {
                url += "(Name='" + role + "',_Box.Name='" + box + "')";
            }else {
                url += "(Name='" + role + "')";
            }
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * 外部セルを設定する
     * @param cell 対象セル 
     * @param setCellUrl 外部セルに指定したいセルのURL
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    setExtCell(cell: string, setCellUrl: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/ExtCell/";
            const data = {
                Url: setCellUrl,
            }
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(data)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * 外部セル一覧を取得
     * @param cell 対象セル
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getExtCellList(cell: string, _token?: string) {
        return new Promise<ExtCell[]>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/ExtCell/";
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumResponse = JSON.parse(res.text);
                        resolve(response.d.results);
                    }
                });
        });
    }

    /**
     * 外部セルの解除
     * @param cell セル名
     * @param deleteCellUrl 削除するセルのURL
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteExtCell(cell: string, deleteCellUrl: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/ExtCell('" + Encode(deleteCellUrl) + "')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * 外部セルに対してロールかリレーションを設定する
     * @param cell 対象セル名
     * @param targetCellUrl 指定する外部セルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param name ロールかリレーションに指定する名前
     * @param box ボックス名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    setExtCellLink(cell: string, targetCellUrl: string, type: "_Role"|"_Relation", name: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/ExtCell('" + Encode(targetCellUrl) + "')/\$links/" + type;
            let role = "";
            if(name && box){
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
            }else if(name){
                role = "(Name='" + name + "')";
            }
            const data = {
                uri: this.createCellSchema(cell) + "__ctl/" + type.substring(1) + role
            };

            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(data)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * 外部セルに紐づけたリンクの一覧
     * @param cell セル名
     * @param targetCellUrl 対象に指定するセルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getExtCellLink(cell: string, targetCellUrl: string, type: "_Role"|"_Relation", _token?: string) {
        return new Promise<Link[]>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/ExtCell('" + Encode(targetCellUrl) + "')/\$links/" + type;
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumResponse = JSON.parse(res.text);
                        resolve(response.d.results);
                    }
                });
        });
    }

    /**
     * 外部セルのリンクを削除
     * @param cell セル名
     * @param targetCellUrl 対象として指定するセルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param name 削除するロール/リレーション名
     * @param box 削除するロールのあるボックス名（デフォルトはメインbox）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteExtCellLink(cell: string, targetCellUrl: string, type: string, name: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let role = "";
            if(box){
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
            }else {
                role = "(Name='" + name + "')";
            }
            const url = this.createCellSchema(cell) + "__ctl/ExtCell('" + Encode(targetCellUrl) + "')/\$links/" + type + role;
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * アカウントのリンクを設定
     * @param cell セル名
     * @param account 対象として指定するアカウント名
     * @param name 設定するロール名
     * @param box 設定するロールのあるボックス名（デフォルトはメインbox）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    setAccountLink(cell: string, account: string, name: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let role = this.createCellSchema(cell)+"__ctl/Role";
            if(box){
                role += "(Name='" + name + "',_Box.Name='" + box + "')";
            }else {
                role += "(Name='" + name + "')";
            }
            const url = this.createCellSchema(cell) + "__ctl/Account('" + account + "')/\$links/_Role";
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send({uri: role})
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * アカウントのリンクを削除
     * @param cell セル名
     * @param account 対象として指定するアカウント名
     * @param name 削除するロール名
     * @param box 削除するロールのあるボックス名（デフォルトはメインbox）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteAccountLink(cell: string, account: string, name: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let role = "";
            if(box){
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
            }else {
                role = "(Name='" + name + "')";
            }
            const url = this.createCellSchema(cell) + "__ctl/Account('" + account + "')/\$links/_Role" + role;
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * アカウントを作成
     * @param cell セル名
     * @param account 対象として指定するアカウント名
     * @param password アカウントのパスワード
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    createAccount(cell: string, account: string, password: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/Account";
            request
                .post(url)
                .set("Accept", "application/json")
                .set("X-Personium-Credential", password)
                .set("Authorization", "Bearer " + token)
                .send({Name: account})
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * アカウントを削除
     * @param cell セル名
     * @param account 対象として指定するアカウント名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteAccount(cell: string, account: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/Account('" + account + "')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * ルール一覧の取得
     * @param cell セル名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getRules(cell: string, _token?: string) {
        return new Promise<Rule[]>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/Rule";
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumResponse = JSON.parse(res.text);
                        resolve(response.d.results);
                    }
                });
        });
    }

    /**
     * ルールを設定する
     * @param cell 対象セル
     * @param rule 登録するルール
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    setRule(cell: string, rule: Rule, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/Rule";
            request
            .post(url)
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .send(rule)
            .end((error, res) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * ルールを設定する
     * @param cell 対象セル
     * @param rule 登録するルール
     * @param ruleId ルールID
     * @param box _Box.Name
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    updateRule(cell: string, rule: Rule, ruleId: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let url = this.createCellSchema(cell) + "__ctl/Rule";
            if(box) {
                url += "(__id='"+ruleId+"',_Box.Name='"+box+"')";
            }else {
                url += "(__id='"+ruleId+"')";
            }

            request
            .put(url)
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .send(rule)
            .end((error, res) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
        
    /**
     * ルールを削除する
     * @param cell 対象セル
     * @param ruleId 削除するルールid
     * @param box ボックスに紐づいてる場合はbox名指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteRule(cell: string, ruleId: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let url = this.createCellSchema(cell) + "__ctl/Rule";
            if(box){
                url += "(__id='" + ruleId + "',_Box.Name='" + box + "')";
            }else {
                url += "(__id='" + ruleId + "')";
            }
            request
            .delete(url)
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .end((error, res) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    
    /**
     * メッセージの送信API
     * @param cell セル名
     * @param to 宛先セル名
     * @param type メッセージ送信タイプの指定
     * @param requestContent 登録依頼した関係情報(URL)
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    sendMessage(cell: string, to: string, type: MessageSendType, requestContent: Rule|string, _token?: string) {
        return new Promise<any>((resolve, reject) => {
            const token = _token || this.token;
            const cellUrl = this.createCellSchema(cell);
            const toUrl = this.createCellSchema(to);
            const url = cellUrl + "__message/send/";

            let body = {};

            if (type.lastIndexOf("req.rule.", 0) === 0) {
                body = {
                    To: toUrl,
                    Type: type,
                    RequestRule: requestContent,
                };
            } else if (type.lastIndexOf("req.role.", 0) === 0) {
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
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    }

    /**
     * TODO receiveMessage
     */
    receiveMessage(){}
    
    /**
     * ACLを設定する
     * @param cell 対象セル
     * @param acl 設定するACLのjson(XMLに変換)
     */
    setAcl(cell: string, aces: Ace[], targetPath?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const cellurl = this.createCellSchema(cell);
            const url = targetPath? cellurl+targetPath : cellurl;

            const acl: Acl = {
                "@": {
                    "xmlns:D": "DAV:",
                    "xmlns:p": "urn:x-personium:xmlns",
                },
                "D:ace": aces,
            }
            const aclXml = js2xml.parse("D:acl", acl);

            const xhr = new XMLHttpRequest();
            xhr.open("ACL", url, true);
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4) {
                    const b = xhr.responseText;
                    resolve(true);
                }
            };
            xhr.setRequestHeader("Content-Type", "application/xml");
            xhr.setRequestHeader("Authorization", "Bearer "+token)
            xhr.send(aclXml);
        });
    }

    /**
     * サービスコレクションソース作成
     * @param cell 対象セル
     * @param path パス
     * @param name Resorce名
     * @param resource Resorce中身
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    createServiceCollection(cell: string, path: string, name: string, resource: any, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path + "/__src/" + name;
            request
                .put(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .set("Content-Type", "text/javascript")
                .send(resource)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * サービスコレクションソース設定適用
     * @param cell 対象セル
     * @param path パス
     * @param script スクリプト名(xxx.js)
     * @param service サービス名(yyy)
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    setServiceCollection(cell: string, path: string, script: string, service: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path;
            const prop = {
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
            const propXml = js2xml.parse("D:propertyupdate", prop);

            const xhr = new XMLHttpRequest();
            xhr.open("PROPPATCH", url, true);
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4) {
                    const b = xhr.responseText;
                    resolve(true);
                }
            };
            xhr.setRequestHeader("Content-Type", "application/xml");
            xhr.setRequestHeader("Authorization", "Bearer "+token)
            xhr.send(propXml);
        });
    }

    /**
     * サービスコレクションソース削除
     * @param cell 対象セル
     * @param path パス
     * @param name Resorce名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteServiceCollection(cell: string, path: string, name: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path + "/__src/" + name;
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * エンティティタイプの削除
     * @param cell 対象のセル名
     * @param path エンティティのパス
     * @param id エンティティid
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteEntityType(cell: string, path: string, entityTypeName: string, _token?: string) {
        return new Promise<any>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path + "/$metadata/EntityType('" + entityTypeName + "')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * Propertyの削除
     * @param cell 対象のセル名
     * @param path エンティティのパス
     * @param entityType エンティティタイプの名前
     * @param property propertyの名前
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteProperty(cell: string, path: string, entityType: string, property: string, _token?: string) {
        return new Promise<any>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path + "/$metadata/Property(Name='" +property+ "',_EntityType.Name='"+entityType+"')";
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * Boxの削除
     * @param cell 対象のセル名
     * @param box box名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteBox(cell: string, box: string, _token?: string) {
        return new Promise<any>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/Box(Name='"+box+"')";            
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * セル一覧の取得
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getCellList(_token?: string): Promise<Cell[]> {
        return new Promise<Cell[]>((resolve, reject) => {
            const token = _token || this.token;
            let url = `${this.protocol}://${this.host}/__ctl/Cell`;
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        resolve(error);
                    }
                    else {
                        const response: PersoniumResponse = JSON.parse(res.text);
                        resolve(response.d.results);
                    }
                });
        });
    }

    /**
     * プロファイル情報を取得
     * @param cell 
     */
    getProfile(cell: string) {
        return new Promise<PersoniumProfileResponse>((resolve, reject) => {
            const cellurl = this.createCellSchema(cell);
            const url = cellurl + "__/profile.json";
            request
                .get(url)
                .set("Accept", "application/json")
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumProfileResponse = JSON.parse(res.text);
                        resolve(response);
                    }
                });
        });
    }

    /**
     * アプリセル専用
     * アプリ起動情報を取得
     * @param cell 
     */
    getLaunch(cell: string) {
        return new Promise<PersoniumLaunchJson>((resolve, reject) => {
            const cellurl = this.createCellSchema(cell);
            const url = cellurl + "__/launch.json";
            request
                .get(url)
                .set("Accept", "application/json")
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumLaunchJson = JSON.parse(res.text);
                        resolve(response);
                    }
                });
        });
    }

    /**
     * Barインストール 
     * @param barUrl
     */
    barInstall(cell: string, box: string, barUrl: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const cellurl = this.createCellSchema(cell);
            const url = cellurl + box;

            request.get(barUrl)
                .responseType("blob")
                .end((error, res1) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const file = res1.body;
                        const xhr = new XMLHttpRequest();
                        xhr.open("MKCOL", url, true);
                        xhr.onreadystatechange = ()=>{
                            if(xhr.readyState === 4) {
                                const b = xhr.responseText;
                                resolve(true);
                            }
                        };
                        xhr.setRequestHeader("Content-Type", "application/zip");
                        xhr.setRequestHeader("Authorization", "Bearer "+token)
                        xhr.send(file);
                    }
                });
        });
    }

    /**
     * エンティティデータの存在確認
     * @param cell セル名
     * @param path パス
     * @param ___id エンティティid
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    isExist(cell: string, path: string, __id?: string, _token?: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let url = null;
            if(__id){
                url = this.createCellSchema(cell) + path + "('" + __id + "')";
            }else {
                url = this.createCellSchema(cell) + path;
            }
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * エンティティ取得
     * @param cell 対象セル名
     * @param path パス
     * @param query クエリ（TODO 未完成）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    get(cell: string, path: string, query?: Query|string, _token?: string) {
        return new Promise<PersoniumData[] | PersoniumData>((resolve, reject) => {
            const token = _token || this.token;
            let url = this.createCellSchema(cell) + path;
            if (typeof query === "string") {
                url += Encode("?$orderby=" + query);
            } else if(query){
                url = convertQueriedUrl(url, query);
            } else {
                url += Encode("?$orderby=__updated%20desc");
            }
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumResponse = JSON.parse(res.text);
                        resolve(response.d.results);
                    }
                });
        });
    }

    /**
     * エンティティ書き込み
     * @param cell 対象セル
     * @param path パス
     * @param entity エンティティ情報
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    post(cell: string, path: string, entity: any, _token?: string) {
        return new Promise<any>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path;
            request
                .post(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(entity)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: PersoniumResponse = JSON.parse(res.text);
                        resolve(response.d.results);
                    }
                });
        });
    }

    /**
     * エンティティ上書き
     * @param cell 対象セル名
     * @param path パス
     * @param id エンティティid
     * @param entity 上書きするエンティティ情報
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    update(cell: string, path: string, id: string, entity: any, _token?: string) {
        return new Promise<any>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path + "('" + id + "')";
            request
                .put(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .send(entity)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * エンティティの削除
     * @param cell 対象のセル名
     * @param path エンティティのパス
     * @param id エンティティid
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    delete(cell: string, path: string, id?: string, _token?: string) {
        return new Promise<any>((resolve, reject) => {
            const token = _token || this.token;
            const url = id?
                this.createCellSchema(cell) + path + "('" + id + "')":
                this.createCellSchema(cell) + path;
            request
                .delete(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(true);
                    }
                });
        });
    }

    /**
     * セル名からセルスキーマURLを作成する
     * @param cell 
     */
    createCellSchema(cell: string) {
        return `${this.protocol}://${this.host}/${cell}/`;
    }

    /**
     * セルスキーマURLからセル名を抽出する
     * @param url 
     */
    extractCellName(url: string) {
        const cell = url.substring(url.indexOf(this.host) + this.host.length + 1, url.lastIndexOf("/"));
        return cell;
    }

    /**
     * 停止時
     */
    dispose() {
        if(this.expireCallbackTimer) {
            clearTimeout(this.expireCallbackTimer);
        }
    }
    
}


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