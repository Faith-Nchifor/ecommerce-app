//main navigation of the app. 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect } from "react";
import { useDataContext } from "./utils/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Home from "./screens/home";
import ProductDetails from "./screens/product";
import AllProducts from "./screens/Products";
import ProductCategories from "./screens/categories";
import Cart from "./screens/cart";
import Login from "./screens/login";
import { Icon } from "@rneui/base";
import DrawerComponents from "./components/drawerCompents";
import { MakeRequest } from "./utils/makeRequest";

const Stack = createNativeStackNavigator()

const Drawer = createDrawerNavigator();


function AppNavigation() {
    const { updateUser, user } = useDataContext()
    useEffect(() => {
        //get current user when the page refreshes
        AsyncStorage.getItem('user').then(
            userString => {
                userString = JSON.parse(userString)
                if (userString) {
                //    console.log(userString.token)
                    MakeRequest({
                        url:process.env.GET_CURRENT_USER,
                        method:'get',
                        headers:{
                            'Authorization': `Bearer ${userString.token}`
                        }
                    }).then(data=>{
                        console.log('data:',data);
                        
                        if(data){
                            console.log('data:',data);
                            updateUser({
                                ...userString,
                                firstName:data.firstName, 
                                lastName:data.LastName,
                                image:data.image}) 
                        }
                    })
                 
                   
                }
            }
        )
    }, [])

    return (
        user ? <AuthenticatedStack /> : <UnauthenticatedStack />
    );
}



function UnauthenticatedStack() {
    const navigation = useNavigation()
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='home' component={Home} options={{
                // title:'',
                headerTitleAlign: 'center'
            }} />
            <Drawer.Screen name='productDetail' component={ProductDetails} options={{
                title: 'Product Details',
                headerTitleAlign: 'center',
                drawerItemStyle: { display: 'none' },
                headerLeft: () => <Icon name="arrow-long-left" type="entypo" onPress={() => navigation.goBack()} />
            }} />
            <Drawer.Screen name='products' component={AllProducts} options={{
                title: 'Products ',
                headerTitleAlign: 'center'
            }} />
            <Drawer.Screen name='categories' component={ProductCategories} options={{
                title: 'Categories ',
                headerTitleAlign: 'center'
            }} />

            <Drawer.Screen name='login' component={Login} options={{
                title: 'Login',
                headerTitleAlign: 'center'
            }} />

        </Drawer.Navigator>
    );
}

function AuthenticatedStack() {
    const navigation = useNavigation()

    return (
        <Drawer.Navigator
            drawerContent={(props) =>
                <>
                   
                    <DrawerComponents {...props} />
                </>
            }>
            <Drawer.Screen name='home' component={Home} options={{
                // title:'',
                headerTitleAlign: 'center'
            }} />
            <Drawer.Screen name='productDetail' component={ProductDetails} options={{
                title: 'Product Details',
                headerTitleAlign: 'center',
                drawerItemStyle: { display: 'none' },
                headerLeft: () => <Icon name="arrow-long-left" type="entypo" onPress={() => navigation.goBack()} />
            }} />
            <Drawer.Screen name='products' component={AllProducts} options={{
                title: 'Products ',
                headerTitleAlign: 'center'
            }} />
            <Drawer.Screen name='categories' component={ProductCategories} options={{
                title: 'Categories ',
                headerTitleAlign: 'center'
            }} />
            <Drawer.Screen name='cart' component={Cart} options={{
                title: 'Your Cart ',
                headerTitleAlign: 'center'
            }} />

        </Drawer.Navigator>
    );
}


export default AppNavigation;