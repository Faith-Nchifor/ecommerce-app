import axios from "axios";
import { Alert } from "react-native";

async function MakeRequest(config) {
    try {
      let fetchResponse= await  axios(config)
        return fetchResponse.data
    }catch(ex){
        console.log(ex);
        // Alert.alert(ex)
        return null
    }
   
}

async function MakeTwoRequest(config1,config2) {
    try {
        // const requests =

      const request= await axios.all([config1,config2])
      const [response1, response2] = axios.spread([...request])
      
        return [response1, response2]
    }catch(ex){
        console.log(ex);
        return null
    }
   
}

export {MakeTwoRequest, MakeRequest};