import Menu from "@/components/navbar";
import { AuthProvider } from "@/context/authContext";
// import Navbar from "@/components/navbar";
import { CartProvider } from "@/context/cartContext";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }) {
  return(
    <>
    <AuthProvider>
    <CartProvider>
      <Menu/>
     <Component {...pageProps} />
     </CartProvider>
     </AuthProvider>
    </>
  )
}
