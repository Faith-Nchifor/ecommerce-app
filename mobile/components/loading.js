import { Overlay } from "@rneui/base";
import { ActivityIndicator } from "react-native";
import styles from "../styles/style";

function Loading({isLoading}) {
    return (
        <Overlay  isVisible={isLoading} fullScreen={true} overlayStyle={styles.loadingOverlay}>
        <ActivityIndicator size={50} style={{}}/>
        </Overlay>
      );
}

export default Loading;