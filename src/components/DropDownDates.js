import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome } from '@expo/vector-icons';
import { useMediConnectStore } from '../Store/Store';

export default function DropDownDates({ Data }) {
  const setSelectedAppointmentMonth = useMediConnectStore(state => state.setSelectedAppointmentMonth);

  return (
    <View style={styles.container}>
      <SelectList
        onSelect={(val) => setSelectedAppointmentMonth(val)}
        setSelected={setSelectedAppointmentMonth}
        fontFamily='lato'
        data={Data}
        arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
        boxStyles={styles.boxStyles}
        defaultOption={{ key: '11', value: 'July 2024' }}
        dropdownStyles={styles.dropdownStyles}
        search={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    marginTop: hp(7),

  },
  boxStyles: {
    borderRadius: 20,
    marginLeft: wp(60),
    width: wp(35),
  },
  dropdownStyles: {
    borderRadius: 20,
    marginLeft: wp(65),
    width: wp(30),
    position: 'absolute',
    zIndex: 2,
    marginTop: hp(6)
  },
});
