import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CartProvider } from './utils/cartContext';

import { AuthProvider } from './utils/authContext';

import AppNavigation from './AppNavigation';



export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
      <CartProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}


