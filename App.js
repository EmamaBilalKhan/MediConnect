import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import HomeStack from './src/TabNavigation/HomeStack';
import PrescriptionDetail from './src/screens/PrescriptionDetail';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeStack} />
        <Stack.Screen name="PrescriptionDetail" component={PrescriptionDetail} />

      </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}


