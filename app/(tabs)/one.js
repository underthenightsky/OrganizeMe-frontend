
import  { useState ,useEffect} from "react";
// require('dotenv').config();
import {EXPO_API_URL} from '@env';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  Pressable,Image,
  Text,
  Alert,FlatList,TouchableOpacity,ScrollView
} from "react-native";
import {Swipeable ,GestureHandlerRootView , TapGestureHandler} from 'react-native-gesture-handler'
import axios from 'axios';
import {useRouter,Stack,
  useLocalSearchParams,Link} from 'expo-router'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {updateScreen} from '../../updateScreen';
// import {UpdateScreen} from '../screens/update/[id]';


export default function TabOneScreen(){
  const router = useRouter();
  const [allTasks, setAllTasks] = useState([]);
  
  const getAllTasks= async() => {
    try {
      // console.log(API_URL.toString())
      console.log(EXPO_API_URL)
      // console.log(process.env.API_URL.toString())
      console.log(EXPO_API_URL)
      console.log(EXPO_API_URL.toString()+`/tasks/get-tasks`)
      const response = await axios.get(`${EXPO_API_URL}/tasks/get-tasks`);

    setAllTasks( response.data );
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect( () => {
    getAllTasks();
  },[]);

  async function getTask(item){
    try {
      console.log(item._id);
      const response = await axios.get(`${EXPO_API_URL}/tasks/get-task/`+item._id.toString());
      console.log(response.data);             
      
  }
  catch(error){
    console.error(error);
  }
  }



const renderTaskItem = ({ item }) => {


  const leftSwipeActions = (item) => {
    // const handleEditTask = (task) => {
    //   navigation.navigate('Update', { task});
    // };
    const updateCompletion= async (item) => {
      try {
        console.log(item)
        await axios.put(`${EXPO_API_URL}/tasks/update-completion/${item._id.toString()}`);
        Alert.alert('Congratulations', 'Task Completed');
        getAllTasks()
      } catch (error) {
        Alert.alert('Error', 'Failed to mark task as completed. Please try again.');
        console.error('Error in marking task as completed Task:', error);
      }
    };
    return (
      <View
        style={{ height :100,flexDirection:'row' }}
      >
        {/* <Link href={`../screens/updateScreen?data=${item}`} asChild> */}
         <TouchableOpacity style={{
            // color: '#40394a',
            width:100,
            height:100,
            justifyContent:'center',
            alignItems:'center'
          }} onPress={()=> router.push(`../screens/update/${item._id.toString()}`)}>
        <Image source ={require('../../assets/images/edit.png')}
        style = {{width : 30 ,height :30}}/>
        </TouchableOpacity>
        {/* </Link> */}
        <TouchableOpacity onPress={()=> updateCompletion(item)}
          style={{
            // color: '#20b2aa',
            width:100,
            height:100,
            justifyContent:'center',
            alignItems:'center'
          }}
        >
        <Image source ={require('../../assets/images/complete.png')}
        style = {{width : 30 ,height :30}}/>
        
        </TouchableOpacity>
  
      </View>
    );
  };

  const rightSwipeActions = (item) => {
    async function deleteTask (task)  {
      try {
        await axios.delete(`${EXPO_API_URL}/tasks/delete/${task._id.toString()}`);
        Alert.alert('Success', 'Task deleted successfully');
        getAllTasks()
      } catch (error) {
        Alert.alert('Error', 'Failed to delete Task. Please try again.');
        console.error('Error deleting Task:', error);
      }
    };

    return (
      <View
        style={{ height :100,flexDirection:'row' }}
      >
        <TouchableOpacity onPress={() => deleteTask(item) }
          style={{
            // color: '#40394a',
            width:100,
            height:100,
            justifyContent:'center',
            alignItems:'center'
          }}>
        <Image source ={require('../../assets/images/delete.png')}
        style = {{width : 30 ,height :30}}/>
        
        </TouchableOpacity>
        
      </View>
    );
  };

  if(item.priority == "High"){ 
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          
    
       
        <Swipeable
    renderLeftActions={() =>leftSwipeActions(item)}
    renderRightActions={() => rightSwipeActions(item)}
  >
        <TouchableOpacity 
        onPress={()=> router.push(`../screens/details/${item._id.toString()}`)}
        // onPress={(item) => getTask(item) }
        >
      <View style ={styles.highPriority}>
      <View style={styles.separator}/>
      <Text style ={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <Text style = {styles.itemDescription} numberOfLines={1}>{item.description}</Text>
    </View>
    </TouchableOpacity>
   
    </Swipeable>
    </GestureHandlerRootView>
      )}
    else if(item.priority == "Medium"){
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Swipeable
    renderLeftActions={() =>leftSwipeActions(item)}
    renderRightActions={() => rightSwipeActions(item)}
  >
        <TouchableOpacity 
        onPress={()=> router.push(`../screens/details/${item._id.toString()}`)}
        // onPress={(item) => getTask(item)}
        >
      <View style ={styles.mediumPriority}>
      <View style={styles.separator}/>
      <Text style ={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <Text style = {styles.itemDescription} numberOfLines={1}>{item.description}</Text>
    </View>
    </TouchableOpacity>
    </Swipeable>
    </GestureHandlerRootView>
      )}
    else{ 
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Swipeable
    renderLeftActions={() =>leftSwipeActions(item)}
    renderRightActions={() => rightSwipeActions(item)}
  >
        <TouchableOpacity 
        onPress={()=> router.push(`../screens/details/${item._id.toString()}`)}
        >  
      <View style ={styles.lowPriority}>
      <View style={styles.separator}/>
      <Text style ={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <Text style = {styles.itemDescription} numberOfLines={1}>{item.description}</Text>
    </View>
    </TouchableOpacity>
    </Swipeable>
    </GestureHandlerRootView>
      )}   
  }

  if (Object.keys(allTasks).length == 0) {
    return (
      <View style={styles.container2}>
        <Text style={styles.title}> Incomplete Tasks</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text>No incomplete tasks yet. Click on the add task tab to create a new task.</Text>
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
         <FlatList
          data={allTasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item._id.toString()}
        />
        {/* <View style={styles.separator2} /> */}
        <Button onPress={() => getAllTasks()} title ="Refresh"
          style={{
            
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text>Refresh</Text>
            </Button>
      </View>
    );
  }
}
;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',//Write where the text is present with respect to the axis
    justifyContent: 'center', // shows where the horizontal axis is present
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 3,
    height: 1,
    width: '80%',
  },
  separator2: {
    marginVertical: 40,
    height: 1,
    width: '80%',
  },
  highPriority: {
    backgroundColor: '#dc143c',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2, // for Android shadow
    shadowColor: '#000000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mediumPriority: {
    backgroundColor: '#90ee90',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2, // for Android shadow
    shadowColor: '#000000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lowPriority: {
    backgroundColor: '#00ced1',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2, // for Android shadow
    shadowColor: '#000000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
  },
});
