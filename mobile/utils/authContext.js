// this context is used for storing user information for authenticated user.
import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext()




export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();




    const updateUser = (data) => {
        setUser(data)
    }



    const login = async (userData) => {
        try {
            const userInfo = {
                uid: userData.id,
                token: userData.refreshToken
            }
            const userObj = JSON.stringify(userInfo)

            await AsyncStorage.setItem('user', userObj)

            setUser({
                ...userInfo,
                firstName:userData.firstName,
                lastName:userData.lastName,
                image:userData.image});

        } catch (error) {
            console.error(error);
        }
    };

    const clearData = async () => {
        try {

            // Remove authentication token from AsyncStorage

            await AsyncStorage.removeItem('user')

            setUser(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };




    return (
        <AuthContext.Provider value={{ user, login, clearData, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(AuthContext);
};

