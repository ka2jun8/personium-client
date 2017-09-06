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
export interface PersoniumProfileResponse {
    DisplayName: string;
    Description: string;
    Image: string;
    ProfileImageName: string;
}
export declare class PersoniumClient {
    host: string;
    personiumToken: PersoniumAccessToken;
    token: string;
    constructor(unit: string);
    login(cell: string, username: string, password: string): Promise<PersoniumAccessToken>;
    refreshAccessToken(cell: string, target: string, refreshToken: string): Promise<PersoniumAccessToken>;
    getExtCellList(cell: string, _token?: string): Promise<ExtCell[]>;
    getExtCellLisks(cell: string, targetCellUrl: string, type: string, _token?: string): Promise<Link>;
    getRules(cell: string, _token?: string): Promise<Rules>;
    sendMessage(cell: string, to: string, type: string, requestContent: string, _token?: string): Promise<PersoniumProfileResponse>;
    getProfile(cell: string): Promise<PersoniumProfileResponse>;
    isExist(cell: string, path: string, __id: string, _token?: string): Promise<boolean>;
    get(cell: string, path: string, query?: string, _token?: string): Promise<PersoniumData[]>;
    post(cell: string, path: string, entity: any, _token?: string): Promise<any>;
    update(cell: string, path: string, id: string, entity: any, _token?: string): Promise<any>;
    createCellSchema(cell: string): string;
    extractCellName(url: string): string;
}
