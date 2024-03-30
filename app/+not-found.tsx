import { StyleSheet } from 'react-native';
import {useRouter,Stack,
  useLocalSearchParams,Link,
  router} from 'expo-router'
import { Text, View , TouchableOpacity} from 'react-native';

export default function NotFoundScreen() {
  function goHome() {
  const router = useRouter();
      router.push('./(tabs)/one');
  }
  return (
    <>
      
      <View style={styles.container}>
      <Stack.Screen options={{ title: 'Welcome' }} />
      <Text style={styles.title}>Welcome to the OrganizeMe App</Text>
      <View style={{padding: 10}}/>
        <Text style={styles.text1}>Take your first steps towards leading a more organized life</Text>

        <Link href="./(tabs)/one" style={styles.link}>
          <Text style={styles.linkText}>Begin</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'center',

  },
  text1: {
    fontSize: 14,
    fontWeight: '100',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
