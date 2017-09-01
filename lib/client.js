"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("superagent");
class PersoniumClient {
    constructor(unit) {
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
    login(cell, username, password) {
        return new Promise((resolve, reject) => {
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
                    // console.log("creating personium-client succeed");
                    resolve(token);
                }
            });
        });
    }
    refreshAccessToken(cell, target, refreshToken) {
        return new Promise((resolve, reject) => {
            const url = this.createCellSchema(cell) + "__token";
            request
                .post(url)
                .set("Accept", "application/json")
                .type("form")
                .send({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                p_target: this.createCellSchema(target),
            })
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
    getExtCellList(cell, _token) {
        return new Promise((resolve, reject) => {
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
                    const response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    }
    sendMessage(cell, to, type, requestContent, _token) {
        return new Promise((resolve, reject) => {
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
    getProfile(cell) {
        return new Promise((resolve, reject) => {
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
                    const response = JSON.parse(res.text);
                    resolve(response);
                }
            });
        });
    }
    //エンティティ取得
    get(cell, path, _token) {
        return new Promise((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path;
            request
                .get(url)
                .set("Accept", "application/json")
                .set("Authorization", "Bearer " + token)
                .end((error, res) => {
                if (error) {
                    reject(error);
                }
                else {
                    const response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    }
    //エンティティ書き込み
    post(cell, path, entity, _token) {
        return new Promise((resolve, reject) => {
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
                    const response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    }
    //エンティティ上書き
    update(cell, path, id, entity, _token) {
        return new Promise((resolve, reject) => {
            const token = _token || this.token;
            const url = this.createCellSchema(cell) + path + "(" + id + ")";
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
                    const response = JSON.parse(res.text);
                    resolve(response.d.results);
                }
            });
        });
    }
    createCellSchema(cell) {
        return `https://${this.host}/${cell}/`;
    }
    extractCellName(url) {
        const cell = url.substring(url.indexOf(this.host) + this.host.length + 1, url.lastIndexOf("/"));
        return cell;
    }
}
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
//# sourceMappingURL=client.js.map