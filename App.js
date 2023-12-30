import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native-web';
import Timer from './components/timer1';

export default function App() {
  return (
    <View style={styles.container}>
     <Timer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
