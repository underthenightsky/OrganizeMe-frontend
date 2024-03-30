import { StyleSheet,TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { getTasks} from "../../backend/api";
import { Text, View,FlatList } from 'react-native';
import {useRouter,Stack,
  useLocalSearchParams,Link} from 'expo-router'

async function getTask(item){
  try {
    console.log(item._id);
    const response = await axios.get(`${process.env.API_URL}tasks/get-task/`+item._id.toString());
    console.log(response.data);             
    
}
catch(error){
  console.error(error);
}
}
export default function TabTwoScreen({}) {
  const router = useRouter();
  const [completedTasks, setCompletedTasks] = useState([]);
  async function getCompletedTasks(){
    try {
      const response = await axios.get(`${process.env.API_URL}/tasks/get-completed`);

    setCompletedTasks( response.data );
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect( () => {
    getCompletedTasks();
  },[]);
  const renderTaskItem = ({ item }) => {
    
    if(item.priority == "High"){ 
        return (
          <TouchableOpacity 
          onPress={()=> router.push(`../screens/details/${item._id.toString()}`)}>
        <View style ={styles.highPriority}>
        <View style={styles.separator}/>
        <Text style ={styles.itemName}>{item.name}</Text>
        <Text style = {styles.itemDescription} numberOfLines={1}>{item.description}</Text>
      </View>
      </TouchableOpacity>
        )}
      else if(item.priority == "Medium"){
        return (
          <TouchableOpacity 
          onPress={()=> router.push(`../screens/details/${item._id.toString()}`)}>
        <View style ={styles.mediumPriority}>
        <View style={styles.separator}/>
        <Text style ={styles.itemName}>{item.name}</Text>
        <Text style = {styles.itemDescription} numberOfLines={1}>{item.description}</Text>
      </View>
      </TouchableOpacity>
        )}
      else{ 
        return (
          <TouchableOpacity 
          onPress={()=> router.push(`../screens/details/${item._id.toString()}`)}>  
        <View style ={styles.lowPriority}>
        <View style={styles.separator}/>
        <Text style ={styles.itemName}>{item.name}</Text>
        <Text style = {styles.itemDescription} numberOfLines={1}>{item.description}</Text>
      </View>
      </TouchableOpacity>
        )}   
    }
  if (Object.keys(completedTasks).length == 0) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Tasks</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>No completed tasks</Text>
    </View>
  );
}
else{
  return (
    
    <View style={styles.container}>
       <FlatList
        data={completedTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item._id.toString()}
      />
       <Button onPress={() => getCompletedTasks()} title ="Refresh"
          style={{
            // color: '#20b2aa',
            width:100,
            height:100,
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text>Refresh</Text>
            </Button>
    </View>
  );
}
}
// function showItem(item){
  
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
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
