import { useEffect, useState } from "react";
import { StyleSheet,Text,View, ScrollView} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AppointmentScreen(){
    const [Appointments, setAppointments]=useState([]);

    useEffect(()=>{
        const fetchAppointments=async()=>{
            try{
                const response = await fetch('https://my-json-server.typicode.com/EmamaBilalKhan/MediConnect-API/Appointments');
                const data=await response.json();
                setAppointments(data);
            }catch(error){
                console.error('Error fetching appointments:',error);
            }
        };
        fetchAppointments();
    },[]);



    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.AppointmentText}>My Appointments</Text>
            <View style={styles.NewApointmentView}>
                <AntDesign name="pluscircle" size={hp(2)} color="#2F3D7E" style={styles.plusIcon}/>
                <Text style={styles.NewAppointmentText}>New Appointment</Text>
            </View>
   </ScrollView> 
    );
   
}
const styles= StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        alignItems:"center",
        paddingVertical:hp(1),
        paddingHorizontal:wp(4)        
    },
    AppointmentText:{
        marginTop:hp(0.5),
        fontSize:hp(2.8),
        fontWeight:"bold",
        color:"#41474D"
    },
    NewApointmentView:{
        flexDirection:"row",
        alignItems:"center",
        position:"absolute",
        left:wp(4),
        top:hp(7)
    },
    plusIcon:{
        marginRight:wp(1)
    },
    NewAppointmentText:{
        fontSize:hp(2),
        fontWeight:"bold",
    }
    
})