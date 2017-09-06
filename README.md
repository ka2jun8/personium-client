# personium-client
Personiumを扱うためのクライアントツール

### how to use

index.js
```
import {PersoniumClient, PersoniumAccessToken} from "personium-client";

const client = new PersoniumClient(personiumHostName);
client.login(cell, username, password).then(function(token){
  const personiumToken = token;
  //login succeed

  //get entity
  client.get(cellName, EntityPath, "__updated desc" ,token).then(fucntion(response){
    //you can get personium data
    console.log(response);
  }).catch((error)=>{
    console.error(error);
  });
  
  //post entity
  client.post(cellName, EntityPath, Entity).then().catch();  
  
  //update entity
  client.update(cellName, EntityPath, EntityId, Entity){

}).catch(function(error){
  console.log(error);
});


```

### how to build

```
npm install
tsc
```

