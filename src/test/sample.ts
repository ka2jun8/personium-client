import * as moment from "moment";
import * as assert from "power-assert";
import {PersoniumClient, PersoniumAccessToken, PersoniumData, ExtCell, Link } from "../client";
const config = require("./config");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let personiumHostName = config.host;

interface Entity1 {
    name: string;
    flag: boolean;
    date: number;
};

interface Entity2 extends PersoniumData {
    __id: string;
    name: string;
    flag: boolean;
    date: number;
}

let client: any = null;
let token: PersoniumAccessToken = null;

describe("Personium-client Instantiation Test", () => {
    it("instantiation", (done) => {
        try{
            client = new PersoniumClient(personiumHostName);
            assert(true);
            done();
        }catch(e){
            console.error(e);
            assert(false);
        }
    });
});

describe("Personium-client Basic Test", () => {
    it("login", (done) => {
        client.login(config.cell, config.username, config.password)
            .then((response) => {
                token = response;
                assert(true);
                done();
            }).catch((error) => {
                assert(false);
                console.error(error);
                done();
            });
    });

    it("post", (done) => {
        //post entity
        const entity: Entity1 = {
            name: "テスト",
            flag: false,
            date: moment().unix(),
        };
        client.post(config.cell, config.entity, entity).then((result) => {
            assert(result);
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        });
    });

    let targetEntity: Entity2 = null;
    it("get", (done) => {
        //get entity
        client.get(config.cell, config.entity, "__updated desc").then((results: Entity2[]) => {
            const result: Entity2 = results[0];
            targetEntity = result;
            assert(result.name === "テスト");
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        });
    });

    it("update", (done) => {
        //update entity
        const nextEntity: Entity1 = {
            name: targetEntity.name + ".change",
            flag: targetEntity.flag,
            date: targetEntity.date,
        };
        client.update(config.cell, config.entity, targetEntity.__id, nextEntity).then((result) => {
            assert(result);
            done();
        }).catch((e) => {
            console.error(e);
            assert(false);
            done();
        });
    });

    it("check updated data", (done) => {
        client.get(config.cell, config.entity+"('"+targetEntity.__id+"')").then((result: Entity2) => {
            assert(result.name === targetEntity.name+".change");
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        });
    });

    it("isExist", (done)=>{
        client.isExist(config.cell, config.entity, targetEntity.__id).then((result) => {
            assert(result);
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        });
    });

    it("delete", (done) => {
        client.delete(config.cell, config.entity, targetEntity.__id).then((result) => {
            assert(result);
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        });
    });

    it("check deleted item", (done)=>{
        client.isExist(config.cell, config.entity, targetEntity.__id).then((result) => {
            assert(!result);
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        });
    });

    it("utility", ()=>{
        const cell = "test";
        const cellUrl = client.createCellSchema(cell);
        assert(cellUrl === `https://${config.host}/${cell}/`);
        const cellName = client.extractCellName(cellUrl);
        assert(cellName === cell);
    });  

    it("login and get another cell data", (done)=>{
        client.login(config.cell2, config.username, config.password)
        .then((response) => {
            return client.get(config.cell2, config.entity, "__updated desc");
        }).then((resuponses)=>{
            assert(true);
            done();
        }).catch((error) => {
            assert(false);
            console.error(error);
            done();
        });
    });

    it("create role", (done)=>{
        client.createRole(config.cell2, "MyFriend")
        .then((result)=>{
            assert(result);
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

    it("get role", (done)=>{
        client.getRole(config.cell2, "MyFriend")
        .then((result)=>{
            assert(result); //TODO
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

    it("set extCell", (done)=>{
        client.setExtCell(config.cell2, client.createCellSchema(config.cell))
        .then((result)=>{
            assert(result);
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

    let targetExtCell = null;
    it("get extCell list", (done)=>{
        client.getExtCellList(config.cell2).then((responses: ExtCell[])=>{
            targetExtCell = responses[0].Url;
            assert(responses[0].Url === client.createCellSchema(config.cell));
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        })
    });

    it("set extCell link", (done)=>{
        client.setExtCellLink(config.cell2, targetExtCell, "_Role", "MyFriend", "TestBox")
        .then((result)=>{
            assert(result);
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

    it("get extCell link", (done)=>{
        client.getExtCellLink(config.cell2, targetExtCell, "_Role")
        .then((responses: Link[]) => {
            const link = responses[0];
            assert(link.uri); //TODO
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

    it("delete extCell link", (done)=>{
        client.deleteExtCellLink(config.cell2, targetExtCell, "_Role", "MyFriend", "TestBox")
        .then((result) => {
            assert(result); 
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

    it("delete extCell", (done)=>{
        client.deleteExtCell(config.cell2, targetExtCell)
        .then((result)=>{
            assert(result);
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

    it("delete role", (done)=>{
        client.deleteRole(config.cell2, "MyFriend")
        .then((result)=>{
            assert(result);
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

});

describe("Personium-client Test Part2", () => {
    it("login", (done) => {
        client.login(config.cell, config.username, config.password)
            .then((response) => {
                token = response;
                assert(true);
                done();
            }).catch((error) => {
                assert(false);
                console.error(error);
                done();
            });
    });

    let entities = [];
    it("post for query test", (done) => {
        const _entities: Entity1[] = [{
            name: "テスト",
            flag: false,
            date: moment().add(-2, "day").unix(),
        },{
            name: "テスト2",
            flag: false,
            date: moment().add(-1, "day").unix(),
        },{
            name: "テスト3",
            flag: true,
            date: moment().add(1, "day").unix(),
        }];
        const promises = _entities.map((entity)=>{
            return client.post(config.cell, config.entity, entity)
        });
        Promise.all(promises)
        .then((results)=>{
            entities = results;
            assert(true);
            done();
        }).catch((e)=>{
            assert(false);
            console.error(e);
            done();
        });
    });

    it("get with $filter", (done)=>{
        const query = {
            filter: ["date gt "+moment().unix()],
        };
        client.get(config.cell, config.entity, query).then((results: Entity2[]) => {
            assert(results.length === 1);
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        }); 
    });

    it("get with $filter2", (done)=>{
        const query = {
            filter: ["date gt "+moment().add(-1, "day").unix(), "date lt "+moment().unix()],
        };
        client.get(config.cell, config.entity, query).then((results: Entity2[]) => {
            assert(results.length === 1);
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        }); 
    });

    it("delete all data", (done) => {
        const promises = entities.map((entity)=>{
            return client.delete(config.cell, config.entity, entity.__id);
        });
        Promise.all(promises)
        .then((results) => {
            assert(results);
            done();
        }).catch((e) => {
            assert(false);
            console.error(e);
            done();
        });
    });


});

    /**
     * refreshAccessToken
     * getProfile
     * getRukes
     * sendMessage
     */

