import { useEffect, useState } from "react";
import { StyleSheet,Text,View, ScrollView} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownDates from "../components/DropDownDates"
import AppointmentCard from "../components/AppointmentCard";
import { useMediConnectStore } from "../Store/Store";

export default function AppointmentScreen(){
    const [Appointments, setAppointments]=useState({});
    const [MonthData, setMonthData]=useState([]);
    const selectedAppointmentMonth = useMediConnectStore((state)=>state.selectedAppointmentMonth);
    const [Loading,setLoading]= useState(false);

    useEffect(()=>{
        fetchAppointments();
    },[]);

    useEffect(()=>{
        AppointmentCardComponent();
    },[selectedAppointmentMonth]);

    const fetchAppointments=async()=>{
        try{
            const response = await fetch('https://my-json-server.typicode.com/EmamaBilalKhan/MediConnect-API/Appointments');
            const data=await response.json();
            groupAppointmentsByMonthYear(data);
            setLoading(true);

        }catch(error){
            console.error('Error fetching appointments:',error);
        }
    };

    function groupAppointmentsByMonthYear(data) {
        const groupedData = {};
      
        data.forEach((appointment) => {
          // Extract the date, and split it into [year, month, day]
          const [year, month, day] = appointment.date.split('-');
      
          // Construct the key like "June 2024"
          const key = `${month} ${year}`;
      
          // If the key doesn't exist in the groupedData, create it
          if (!groupedData[key]) {
            groupedData[key] = {};
            setMonthData(prev=>[...prev,key]);
          }
      
          // If the day key doesn't exist in the group, create it
          if (!groupedData[key][day]) {
            groupedData[key][day] = [];
          }
      
          // Push the appointment object into the array for the specific day
          groupedData[key][day].push(appointment);
        });
        setAppointments(groupedData);
      }

      const AppointmentCardComponent = () => {
        return(
            <AppointmentCard Appointments={Appointments[selectedAppointmentMonth] || {}}/>
        );
      };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.AppointmentText}>My Appointments</Text>
            <View style={styles.NewApointmentView}>
                <AntDesign name="pluscircle" size={hp(2)} color="#2F3D7E" style={styles.plusIcon}/>
                <Text style={styles.NewAppointmentText}>New Appointment</Text>
            </View>
            <DropdownDates Data={MonthData}/>
            {Loading && AppointmentCardComponent()}
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
        top:hp(7),
    },
    plusIcon:{
        marginRight:wp(1)
    },
    NewAppointmentText:{
        fontSize:hp(2),
        fontWeight:"bold",
    }
    
})