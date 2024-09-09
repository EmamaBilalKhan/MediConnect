import { StyleSheet, Text, View, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect } from "react";
export default function AppointmentCard({ Appointments }) {

  useEffect(()=>{
    console.log(Appointments);
},[Appointments]);

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentDetails}>
      <Text style={styles.nameText}>{item.doctorName}</Text>
    </View>
  );

  const renderDate = ({ item }) => (
    <View style={styles.appointmentContainer}>
      <Text style={styles.dateText}>{new Date(item.date).toDateString()}</Text>
      <FlatList
        data={item.appointments}
        renderItem={renderAppointment}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  const data = Object.entries(Appointments).map(([date, appointments]) => ({
    date: parseInt(date),
    appointments,
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderDate}
        keyExtractor={(item, index) => item.date.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp('4%'),
  },
  appointmentContainer: {
    marginBottom: hp('2%'),
  },
  dateText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  appointmentDetails: {
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
  },
  nameText: {
    fontSize: wp('3.5%'),
  },
  dayText: {
    fontSize: wp('3.5%'),
  },
});
