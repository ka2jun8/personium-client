# personium-client
Personiumを扱うためのクライアントツール

### how to use

```
import {PersoniumClient, PersoniumAccessToken} from "personium-client";

const client = new PersoniumClient(settings.personium);
client.login(cell, username, password).then((token: PersoniumAccessToken) => {
  const personiumToken: PersoniumAccessToken = token;
  //login succeed
  client.get(client.get(cellName, EntityPath, token).then((response: PersoniumData || PersoniumData[])=>{
    //you can get personium data
  }).catch((error)=>{
    console.error(error);
  });

}).catch((error) => {
  console.log(error);
});


```

### how to build

```
npm install
tsc
```

