import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
       
            flex: 1,
            backgroundColor: '#fff',
            
            height:'100%'
         
    },
    loadingOverlay:{
        justifyContent:'center',
        opacity:0.6
    },
    center:{
        textAlign:'center'
    },
    flexDisplay:{
        display:'flex',
        flexDirection:'row'
    },
    productImg:{
         width: '50%', 
         alignSelf: 'center' ,
         
        },
        productTitle:{
            textAlign:'center',
            fontWeight:'bold',
            fontSize:20
            // textDecorationStyle:''
        },
        price:{
            textAlign:'center',
            fontWeight:'bold',
            fontSize:18
        },
        cartBtn:{
            width:'50%',
            alignSelf:'center'
        }
    
})

export default styles;