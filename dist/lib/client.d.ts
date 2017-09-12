import { Query } from "./utility";
export interface PersoniumAccessToken {
    access_token: string;
    refresh_token: string;
}
export interface PersoniumResponse {
    d: {
        results: any;
    };
}
export interface PersoniumData {
    __metadata: {
        uri: string;
        etag: string;
        type: string;
    };
    __published: string;
    __updated: string;
}
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
export interface Rule {
    name: string;
    service: string;
    action: string;
    doaction: string;
    object: string;
    extservice: string;
}
export interface Script {
    name: string;
    uri: string;
}
export interface Rules {
    rules: Rule[];
    scripts: Script[];
}
export interface Link extends PersoniumData {
    uri: string;
}
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
export interface PersoniumProfileResponse {
    DisplayName: string;
    Description: string;
    Image: string;
    ProfileImageName: string;
}
export declare class PersoniumClient {
    protocol: string;
    host: string;
    personiumToken: PersoniumAccessToken;
    token: string;
    expireIn: number;
    loginTime: number;
    expireCallback: () => void;
    constructor(unit: string, protocol?: string);
    /**
     * TODO 認証の有効性を確認すべき
     */
    authValidate(): boolean;
    login(cell: string, username: string, password: string, expireCallback?: () => void): Promise<PersoniumAccessToken>;
    refreshAccessToken(cell: string, refreshToken: string, target?: string): Promise<PersoniumAccessToken>;
    createRole(cell: string, role: string, box?: string, _token?: string): Promise<boolean>;
    getRole(cell: string, role?: string, box?: string, _token?: string): Promise<Role | Role[]>;
    deleteRole(cell: string, role?: string, box?: string, _token?: string): Promise<boolean>;
    setExtCell(cell: string, setCellUrl: string, _token?: string): Promise<boolean>;
    getExtCellList(cell: string, _token?: string): Promise<ExtCell[]>;
    deleteExtCell(cell: string, deleteCellUrl: string, _token?: string): Promise<boolean>;
    setExtCellLink(cell: string, targetCellUrl: string, type: string, name: string, box?: string, _token?: string): Promise<boolean>;
    getExtCellLink(cell: string, targetCellUrl: string, type: string, _token?: string): Promise<Link[]>;
    deleteExtCellLink(cell: string, targetCellUrl: string, type: string, name: string, box?: string, _token?: string): Promise<boolean>;
    getRules(cell: string, _token?: string): Promise<Rules>;
    sendMessage(cell: string, to: string, type: string, requestContent: string, _token?: string): Promise<PersoniumProfileResponse>;
    getProfile(cell: string): Promise<PersoniumProfileResponse>;
    isExist(cell: string, path: string, __id: string, _token?: string): Promise<boolean>;
    get(cell: string, path: string, query?: Query | string, _token?: string): Promise<PersoniumData | PersoniumData[]>;
    post(cell: string, path: string, entity: any, _token?: string): Promise<any>;
    update(cell: string, path: string, id: string, entity: any, _token?: string): Promise<any>;
    delete(cell: string, path: string, id: string, _token?: string): Promise<any>;
    createCellSchema(cell: string): string;
    extractCellName(url: string): string;
}
