import { Query } from "./utility";
/**
 * Personiumのアクセストークン情報
 */
export interface PersoniumAccessToken {
    access_token: string;
    refresh_token: string;
    expire_in: number;
}
/**
 * Personiumのレスポンスデータ型
 */
export interface PersoniumResponse {
    d: {
        results: any;
    };
}
/**
 * Personiumのデータ型
 */
export interface PersoniumData {
    __metadata: {
        uri: string;
        etag: string;
        type: string;
    };
    __published: string;
    __updated: string;
}
/**
 * 外部セルのデータ型
 */
export interface ExtCell extends PersoniumData {
    Url: string;
    _Role: {
        __deferred: {
            uri: string;
        };
    };
    _Relation: {
        __deferred: {
            uri: string;
        };
    };
}
/**
 * ルールの型
 * //変わるかも
 */
export interface Rule {
    name: string;
    service: string;
    action: string;
    doaction: string;
    object: string;
    extservice: string;
}
/**
 * スクリプトの型
 * //変わるかも
 */
export interface Script {
    name: string;
    uri: string;
}
/**
 * ルールの型
 * //変わるかも
 */
export interface Rules {
    rules: Rule[];
    scripts: Script[];
}
/**
 * Link型 ExtCellのLinkなど
 */
export interface Link extends PersoniumData {
    uri: string;
}
/**
 * Role型
 */
export interface Role extends PersoniumData {
    Name: string;
    "_Box.Name": string;
    _Box: {
        __deferred: {
            uri: string;
        };
    };
    _Account: {
        __deferred: {
            uri: string;
        };
    };
    _ExtCell: {
        __deferred: {
            uri: string;
        };
    };
    _ExtRole: {
        __deferred: {
            uri: string;
        };
    };
    _Relation: {
        __deferred: {
            uri: string;
        };
    };
}
/**
 * 公開されているプロフィール情報のレスポンス型
 */
export interface PersoniumProfileResponse {
    DisplayName: string;
    Description: string;
    Image: string;
    ProfileImageName: string;
}
export interface PersoniumLaunchJson {
    personal: {
        web: string;
        android: string;
        ios: string;
        appTokenId: string;
        appTokenPw: string;
    };
}
/**
 * メッセージ送信のタイプ型
 */
export declare type MessageSendType = "message" | "req.relation.build" | "req.relation.break" | "req.role.grant" | "req.role.revoke" | "req.rule.register" | "req.rule.unregister";
/**
 * Personiumを扱うためのクライアントライブラリ
 */
export declare class PersoniumClient {
    /**
     * プロトコル（デフォルト:https）
     */
    protocol: string;
    /**
     * Personiumのサーバホスト名
     */
    host: string;
    /**
     * アクセストークン情報
     */
    personiumToken: PersoniumAccessToken;
    /**
     * アクセストークン
     */
    token: string;
    /**
     * アクセストークンの有効期限
     */
    expireIn: number;
    /**
     * ログイン時刻 - 認証の有効期限内かどうかを確認
     */
    loginTime: number;
    /**
     * expireしたことが確認されたときに呼び出すコールバック
     */
    expireCallback: () => void;
    /**
     * コンストラクタ
     * @param unit ホスト名
     * @param protocol プロトコル
     */
    constructor(unit: string, protocol?: string);
    /**
     * 認証の有効性チェック
     */
    authValidate(): boolean;
    /**
     * Personiumへログイン
     * @param cell ログイン対象のセル名
     * @param username ユーザ名
     * @param password パスワード
     * @param expireCallback 有効期限が切れ際に呼び出すコールバック
     */
    login(cell: string, username: string, password: string, expireCallback?: () => void): Promise<PersoniumAccessToken>;
    /**
     * schema認証トークンの取得
     * @param cell 個人のセル
     * @param username ユーザ名
     * @param password パスワード
     * @param appCell アプリセル
     * @param appId アプリセルId
     * @param appPass アプリセルPass
     */
    appLogin(cell: string, username: string, password: string, appCell: string, appId: string, appPass: string): Promise<PersoniumAccessToken>;
    /**
     * アクセストークンの更新やトランスセルトークンを作成
     * @param cell セル名
     * @param refreshToken リフレッシュ用トークン（login時に取得）
     * @param target トランスセルトークンを生成する場合は指定
     */
    refreshAccessToken(cell: string, refreshToken: string, target?: string): Promise<PersoniumAccessToken>;
    /**
     * ロールを作成する
     * @param cell 対象セル名
     * @param role ロール名
     * @param box Mainボックス以外を対象とする場合はボックス名を指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    createRole(cell: string, role: string, box?: string, _token?: string): Promise<boolean>;
    /**
     * ロール情報の取得
     * @param cell 対象セル名
     * @param role 特定のロール情報が取得したい場合は指定
     * @param box 特定のボックスの特定のロール情報が取得したい場合は指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getRole(cell: string, role?: string, box?: string, _token?: string): Promise<Role | Role[]>;
    /**
     * ロールを削除する（紐付けがあると削除できない場合がある）
     * @param cell 対象セル名
     * @param role 特定のロールを削除したい場合は指定
     * @param box 特定のボックスの特定のロールが削除したい場合は指定
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteRole(cell: string, role?: string, box?: string, _token?: string): Promise<boolean>;
    /**
     * 外部セルを設定する
     * @param cell 対象セル
     * @param setCellUrl 外部セルに指定したいセルのURL
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    setExtCell(cell: string, setCellUrl: string, _token?: string): Promise<boolean>;
    /**
     * 外部セル一覧を取得
     * @param cell 対象セル
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getExtCellList(cell: string, _token?: string): Promise<ExtCell[]>;
    /**
     * 外部セルの解除
     * @param cell セル名
     * @param deleteCellUrl 削除するセルのURL
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteExtCell(cell: string, deleteCellUrl: string, _token?: string): Promise<boolean>;
    /**
     * 外部セルに対してロールかリレーションを設定する
     * @param cell 対象セル名
     * @param targetCellUrl 指定する外部セルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param name ロールかリレーションに指定する名前
     * @param box ボックス名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    setExtCellLink(cell: string, targetCellUrl: string, type: "_Role" | "_Relation", name: string, box?: string, _token?: string): Promise<boolean>;
    /**
     * 外部セルに紐づけたリンクの一覧
     * @param cell セル名
     * @param targetCellUrl 対象に指定するセルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getExtCellLink(cell: string, targetCellUrl: string, type: "_Role" | "_Relation", _token?: string): Promise<Link[]>;
    /**
     * 外部セルのリンクを削除
     * @param cell セル名
     * @param targetCellUrl 対象として指定するセルURL
     * @param type ロールかリレーションの指定(_Role/_Relation)
     * @param name 削除するロール/リレーション名
     * @param box 削除するロールのあるボックス名（デフォルトはメインbox）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    deleteExtCellLink(cell: string, targetCellUrl: string, type: string, name: string, box?: string, _token?: string): Promise<boolean>;
    /**
     * ルール一覧の取得
     * @param cell セル名
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    getRules(cell: string, _token?: string): Promise<Rules>;
    /**
     * メッセージの送信API
     * @param cell セル名
     * @param to 宛先セル名
     * @param type メッセージ送信タイプの指定
     * @param requestContent 登録依頼した関係情報(URL)
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    sendMessage(cell: string, to: string, type: MessageSendType, requestContent: string, _token?: string): Promise<PersoniumProfileResponse>;
    /**
     * プロファイル情報を取得
     * @param cell
     */
    getProfile(cell: string): Promise<PersoniumProfileResponse>;
    /**
     * アプリセル専用
     * アプリ起動情報を取得
     * @param cell
     */
    getLaunch(cell: string): Promise<PersoniumLaunchJson>;
    /**
     * エンティティデータの存在確認
     * @param cell セル名
     * @param path パス
     * @param ___id エンティティid
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    isExist(cell: string, path: string, __id: string, _token?: string): Promise<boolean>;
    /**
     * エンティティ取得
     * @param cell 対象セル名
     * @param path パス
     * @param query クエリ（TODO 未完成）
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    get(cell: string, path: string, query?: Query | string, _token?: string): Promise<PersoniumData | PersoniumData[]>;
    /**
     * エンティティ書き込み
     * @param cell 対象セル
     * @param path パス
     * @param entity エンティティ情報
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    post(cell: string, path: string, entity: any, _token?: string): Promise<any>;
    /**
     * エンティティ上書き
     * @param cell 対象セル名
     * @param path パス
     * @param id エンティティid
     * @param entity 上書きするエンティティ情報
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    update(cell: string, path: string, id: string, entity: any, _token?: string): Promise<any>;
    /**
     * エンティティの削除
     * @param cell 対象のセル名
     * @param path エンティティのパス
     * @param id エンティティid
     * @param _token 最後にloginしたトークン以外を利用する場合はトークンを指定
     */
    delete(cell: string, path: string, id: string, _token?: string): Promise<any>;
    /**
     * セル名からセルスキーマURLを作成する
     * @param cell
     */
    createCellSchema(cell: string): string;
    /**
     * セルスキーマURLからセル名を抽出する
     * @param url
     */
    extractCellName(url: string): string;
}
