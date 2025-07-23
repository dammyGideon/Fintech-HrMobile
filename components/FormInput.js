import { TextInput } from "react-native";

export default function FormInput({value, onChangeText, placeholder,secureTextEntry}){
    return (
        <TextInput style={{
            borderWidth:1,
            borderColor:'#302940',
            padding:20,
            borderRadius:8,
            marginBottom: 40
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        />
    )
}