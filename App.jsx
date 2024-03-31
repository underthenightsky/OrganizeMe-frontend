import {useRouter,Stack,
    useLocalSearchParams,Link} from 'expo-router'


    export default function AppScreen() {
      const router = useRouter();
      router.push('app/(tabs)/one');
      
    }