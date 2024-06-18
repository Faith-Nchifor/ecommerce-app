import { Icon, Image, Text } from "@rneui/base";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useDataContext } from "../utils/authContext";
import { useEffect } from "react";
import { CardImage } from "@rneui/base/dist/Card/Card.Image";
import { View } from "react-native";


function DrawerComponents(props) {
    const { clearData,user } = useDataContext()
    useEffect(()=>{
       
    },[])
    
    return ( 
       <DrawerContentScrollView {...props} contentContainerStyle={{ width: '100%' }}>
        {
            user.image && (
                <View style={{alignContent:'center',flex:1,display:'flex',alignSelf:'center',width:'100%',justifyContent:'center'}}>

                <CardImage source={{uri:user.image}} style={{width:'50%',alignSelf:'center'}}/>
                <View style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
                <Text style={{fontWeight:'bold'}}>{user.firstName}</Text>
                <Text>{'  '}</Text>
                <Text style={{fontWeight:'bold'}}>{user.lastName}</Text>
                </View>
                </View>
        

            )
        }
       <DrawerItemList {...props} />
       <DrawerItem label={'Log out'}
        icon={()=><Icon name="log-out" type="entypo"/>}
        onPress={clearData}
        />
       </DrawerContentScrollView>
     );
}

export default DrawerComponents;