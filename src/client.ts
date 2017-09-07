import * as request from "superagent";
import { Encode, Decode } from "./utility";

//for using Promise on es5
import { Promise } from "es6-promise";

export interface PersoniumAccessToken {
    access_token: string,
    refresh_token: string,
}

export interface PersoniumResponse {
    d: {
        results: any,
    }
}

export interface PersoniumData {
    __metadata: {
        uri: string,
        etag: string,
        type: string,
    },
    __published: string, //Date(xxx)
    __updated: string, //Date(xxx)
}

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

export interface Rule {
    name: string,
    service: string,
    action: string,
    doaction: string,
    object: string,
    extservice: string,
}

export interface Script {
    name: string,
    uri: string,
}

export interface Rules {
    rules: Rule[],
    scripts: Script[],
}

export interface Link extends PersoniumData {
    uri: string,
}

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

export interface PersoniumProfileResponse {
    DisplayName: string,
    Description: string,
    Image: string,
    ProfileImageName: string,
}

export class PersoniumClient {
    host: string = null;
    personiumToken: PersoniumAccessToken = null;
    token: string = null;

    constructor(unit: string) {
        if (!unit) {
            console.warn("Please set `host` address");
        }
        else if (unit.lastIndexOf("http") === 0) {
            console.warn("`host` does not need protocol prefix");
        }
        this.host = unit;
    }

    login(cell: string, username: string, password: string) {
        return new Promise<PersoniumAccessToken>((resolve, reject) => {
            const url = this.createCellSchema(cell) + "__token";
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
                        const token = JSON.parse(res.text);
                        this.personiumToken = token;
                        this.token = token.access_token;
                        resolve(token);
                    }
                });
        })
    }

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
                        resolve(token);
                    }
                });
        });
    }

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

    deleteRole(cell: string, role?: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let url = this.createCellSchema(cell) + "__ctl/Role";
            if (role) {
                url += "(Name='" + role + "')";
            }else if(role && box){
                url += "(Name='" + role + "',_Box.Name='" + box + "')";
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

    setExtCellLink(cell: string, targetCellUrl: string, type: string, name: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__ctl/ExtCell('" + Encode(targetCellUrl) + "')/\$links/" + type;
            let role = "";
            if(name){
                role = "(Name='" + name + "')";
            }else if(name && box){
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
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

    getExtCellLink(cell: string, targetCellUrl: string, type: string, _token?: string) {
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

    deleteExtCellLink(cell: string, targetCellUrl: string, type: string, name: string, box?: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            let role = "";
            if(name){
                role = "(Name='" + name + "')";
            }else if(name && box){
                role = "(Name='" + name + "',_Box.Name='" + box + "')";
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

    getRules(cell: string, _token?: string) {
        return new Promise<Rules>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + "__rule/";
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const response: Rules = JSON.parse(res.text);
                        resolve(response);
                    }
                });
        });
    }

    sendMessage(cell: string, to: string, type: string, requestContent: string, _token?: string) {
        return new Promise<PersoniumProfileResponse>((resolve, reject) => {
            const token = _token || this.token;
            const cellUrl = this.createCellSchema(cell);
            const toUrl = this.createCellSchema(to);
            const url = this.createCellSchema(cell) + "__message/send/";

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

    isExist(cell: string, path: string, __id: string, _token?: string) {
        return new Promise<boolean>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path + "('" + __id + "')";
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

    //エンティティ取得
    get(cell: string, path: string, query?: string, _token?: string) {
        return new Promise<PersoniumData[] | PersoniumData>((resolve, reject) => {
            const token = _token || this.token;
            let url = this.createCellSchema(cell) + path;
            if (query) {
                url += "?" + "\$orderby=" + Encode(query);
            } else {
                url += "?\orderby=__updated%20desc";
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

    //エンティティ書き込み
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

    //エンティティ上書き
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

    delete(cell: string, path: string, id: string, _token?: string) {
        return new Promise<any>((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path + "('" + id + "')";
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

    createCellSchema(cell: string) {
        return `https://${this.host}/${cell}/`;
    }

    extractCellName(url: string) {
        const cell = url.substring(url.indexOf(this.host) + this.host.length + 1, url.lastIndexOf("/"));
        return cell;
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
