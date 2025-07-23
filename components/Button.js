import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";

export default function ButtonInput({value,onPress,children}){
    return(
       <TouchableOpacity style ={styles.button} onPress={onPress}>
        {children ? children : <Text style={styles.text}>{value}</Text>}
       </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button:{
        borderWidth: 1,
        borderColor: '#302940',
        padding: 20,
        borderRadius: 8,
        marginBottom: 40,
        backgroundColor: '#E19F21', // optional
        alignItems: 'center',
        
    },
    text:{
        color: '#fff',
        fontWeight: 'bold',
    }
})
