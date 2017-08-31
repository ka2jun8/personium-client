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
    sendMessage(cell: string, to: string, type: string, requestContent: string, _token?: string): Promise<PersoniumProfileResponse>;
    getProfile(cell: string): Promise<PersoniumProfileResponse>;
    get(cell: string, path: string, _token?: string): Promise<PersoniumData | PersoniumData[]>;
    createCellSchema(cell: string): string;
    extractCellName(url: string): string;
}
