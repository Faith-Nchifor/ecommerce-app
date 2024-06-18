import axios from "axios";

async function MakeRequest(config) {
    try {
      let fetchResponse= await  axios(config)
        return fetchResponse.data
    }catch(ex){
        console.log(ex);
        alert(ex)
        return null
    }
   
}



export default MakeRequest;