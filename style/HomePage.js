import { Platform, StyleSheet,StatusBar } from "react-native"

export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        alignContent:"center",
        backgroundColor:"ghostwhite",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    },
    box:{
        width:200,
        height:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'lightgray',
        borderWidth:1,
        borderStyle:'dashed',
        borderColor:'darkslateGray',
        marginBottom: 20
    },
    boxText:{
        color: "darkslategray",
        fontWeight:"bold"
    }
})