//page for user login
import React, { useEffect, useState } from "react";
import { Alert, Keyboard,  TouchableWithoutFeedback, View } from "react-native";



import { MakeRequest } from "../utils/makeRequest";
import Loading from "../components/loading";
import { useDataContext } from "../utils/authContext";
import styles from "../styles/style";
import { Button, Input, Text } from "@rneui/base";

export default function Login({route,navigation}) {
    const { login } = useDataContext()
    const [username, setusername] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [msg,setMsg] = route.params? useState(route.params.msg ):useState('')

    useEffect(()=>{
       setTimeout(() => {
         setMsg('')
       }, 6000);
    },[route.params])

    const authenticate = async () => {
        if (username && password) {
            setLoading(true)
            try {


               const config = {
                method:'post',
                url:process.env.LOGIN,
                data:{
                    username:username,
                    password:password
                }
               }
              MakeRequest(config).then(
                creds=>{
                    console.log('creds:',creds);
                    if(creds){
                        creds
                        
                        login(creds)
                    }
                    else{
                        Alert.alert('wrong username/password')
                        setPassword('')
                    }

                   
                }
              )
              .catch(err=>{
                console.log(err);
                Alert.alert(err)
              })
                
              
               
               
            }

            catch (err) {


                console.error(err);
                Alert.alert(err.message);
            }
            finally {
                setLoading(false)
            }
        }

    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {loading ? (
                <Loading isLoading={true} />
            ) :
                (
                    <View style={styles.container}>
                        <Text style={styles.h1}>{msg}</Text>
                        <View style={styles.card}>
                           
                            <Input label='Username' placeholder=""  onChangeText={(t) => setusername(t)} style={styles.input} defaultValue={username} />
                            
                            <Input label='password' secureTextEntry onChangeText={(t) => setPassword(t)} style={styles.input} defaultValue={password} />
                            
                            <Button title="submit" buttonStyle={styles.cartBtn} onPress={authenticate} color={'blue'}/>

                        </View>

                    </View>
                )
            }
        </TouchableWithoutFeedback>
    )
}