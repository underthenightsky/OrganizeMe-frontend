import {useRouter,Stack,
    useLocalSearchParams,Link} from 'expo-router'
import { StyleSheet, TextInput, Touchable,TouchableOpacity ,ScrollView,KeyboardAvoidingView,
      Button,Modal ,Alert,Image} from 'react-native';
import {useState,useEffect} from 'react';
import { Text, View ,Pressable} from 'react-native';
import axios from 'axios';
import { compile } from 'morgan';
import {EXPO_API_URL} from '@env';

export default function DetailsScreen(){
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [taskDetails, setTaskDetails] = useState([]);
    async function getTask(id){ 
        try {
          console.log(id);
          const response = await axios.get(`${EXPO_API_URL}/tasks/get-task/`+id);
        //   console.log(response);
        //   console.log(response._response);
          console.log(response.data);
          setTaskDetails(response.data);
      }
      catch(error){
        console.error(error);
      }
      }
    //   const {name,description,priority,startDate,endDate,creationDate} = getTask(id);
   
        useEffect( () => {
            getTask(id);
          },[]);
        console.log(taskDetails.name);
        return (
         
    <View style={styles.container}>
      
            <View style={styles.container2}> 
            <Stack.Screen
        options={{
        
          title: 'Task Details',
    
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Text style={styles.title}>Task Details</Text>
      {/* <View style={styles.separator} />
          <View style={styles.separator} />     */}
          
          </View>
          <View style={styles.container3}>
                <Text style={styles.label}> Name : </Text>
                <Text styles ={styles.text}> {taskDetails.name}</Text>
                <View style={styles.separator} />
                 <Text style={styles.label}> Description : </Text>
                 <Text style={[styles.text, styles.description]}> {taskDetails.description}</Text>
                <View style={styles.separator} />
                <Text style={styles.label}>Priority: </Text>
                {taskDetails.priority=="High"?
                <Text style={[styles.text, styles.priorityHigh]}> {taskDetails.priority}</Text> :null}
                {taskDetails.priority=="Medium"?
                <Text style={[styles.text, styles.priorityMedium]}> {taskDetails.priority}</Text> :null}
                {taskDetails.priority=="Low"?
                <Text style={[styles.text, styles.priorityLow]}> {taskDetails.priority}</Text> :null}
                <View style={styles.separator} />
                <Text style={styles.label}>Starting Date :</Text>
                <Text style={styles.text}> {taskDetails.startDate}</Text>
                <View style={styles.separator} />
                <Text style={styles.label}>Competion Date : </Text>
                <Text style={styles.text}>{taskDetails.endDate}</Text>
                <View style={styles.separator} />
                <Text style={styles.label}> Created On :</Text>
                <Text  style={styles.text}> {taskDetails.creationDate}</Text> 
                <View style={styles.separator} />
                <Button title="Go back" onPress={() => router.back()} />
            </View>

          </View>
          
        )};

const styles = StyleSheet.create({
            container: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ecf0f1',
            },
            container2: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              // backgroundColor: '#f4511e',
            },
            container3: {
              flex: 10,
              alignItems: 'center',//Write where the text is present with respect to the axis
              justifyContent: 'flex-start', // shows where the horizontal axis is present
            },
            container4: {
              flex: 1,
              // alignItems: 'center',
              // justifyContent: 'center',
              backgroundColor: 'orange',
            },
            title: {
              fontSize: 20,
              fontWeight: 'bold',
              // backgroundColor: '#f4511e',
              color: 'skyblue',
            },
            separator: {
                marginVertical: 10,
                height: 1,
                width: '80%',
              },
              label: {
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 5,
                color: '#333',
              },
              text: {
                fontSize: 16,
                marginBottom: 20,
                color: '#666',
              },
              description: {
                fontStyle: 'italic',
              },
              priorityHigh: {
                color: 'red', // Adjust color according to priority level
                fontWeight: 'bold',
              },
              priorityMedium: {
                color: 'yellow', // Adjust color according to priority level
                fontWeight: 'bold',
              },
              priorityLow: {
                color: 'blue', // Adjust color according to priority level
                fontWeight: 'bold',
              },
        })