import { StyleSheet, TextInput, Touchable,TouchableOpacity ,ScrollView,KeyboardAvoidingView,
Button,Modal ,Alert} from 'react-native';
import {useState} from 'react';
import { Text, View ,Pressable} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useRouter,Stack,
  useLocalSearchParams,Link} from 'expo-router';

export default function TabThreeScreen() {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartCalendar, setOpenStartCalendar] = useState(false);
  const [openEndCalendar, setOpenEndCalendar] = useState(false);
  
function onEndChange(event, selectedDate){
  const currentDate = selectedDate || endDate;
  setEndDate(currentDate);
  setOpenEndCalendar(false);
  console.log(endDate);
}
function onStartChange(event, selectedDate){
  const currentDate = selectedDate || startDate;
  setStartDate(currentDate);
  setOpenStartCalendar(false);
  console.log(endDate);
}
const Dropdown = () => {
  

  const placeholder = {
    label: 'Select an option...',
    value: null,
  };

  const options = [
    { label: 'High Priority', value: 'High' },
    { label: 'Medium Priority', value: 'Medium' },
    { label: 'Low Priority', value: 'Low' },
  ];

  return (
    <View>
      <Text>Select an option:</Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => setPriority(value)}
        value={priority}
      />
      {priority && <Text>Selected: {priority}</Text>}
    </View>
  );
};
async function onSubmit(){
  console.log("Task Name : ",taskName);
  if(taskName == "" || taskName == "Enter Task Name" || taskName == null || taskDesc ==""){
    Alert.alert("Incorrect Text Input","Please Enter Task Name and Task Description Correctly");
    return;
  }
  if(startDate > endDate || startDate < new Date() || endDate < new Date()){
    Alert.alert("Incorrect Dates","Start Date cannot be greater than End Date and Start Date and End Date cannot be in the past");
    return;
  }
 
  try{
    const response = await axios.post("http://192.168.43.81:5000/tasks/add-task",
    {name : taskName, description :  taskDesc, priority : priority, startDate:startDate, endDate : endDate, isComplete : false, creationDate : new Date()})
    console.log('Task Added : ',response.data);
    setTaskName("Enter Task Name");
    setTaskDesc("Enter Task Description");
    setPriority("Low");
    setStartDate(new Date());
    setEndDate(new Date());
    Alert.alert("Task Added Successfully");
    
  }
  catch(error){
    console.error(error);
    console.log("Task not added");
  }  
}

  return (
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
    <ScrollView>
    <Stack.Screen
        options={{
        
          title: 'Add Task',
    
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <View style={styles.separator2} />
      <Text style={styles.title}>Enter Task Name</Text>
      <View style={styles.separator2} />
      <TextInput style={styles.textInput} 
      placeholder="Enter the Task" 
      onChangeText={(text)=>{setTaskName(text)}}/>
      <View style={styles.separator} />

       <Text style={styles.title}>Enter Task Description</Text>
       <View style={styles.separator2} />
       <TextInput style={styles.textInput} 
      placeholder="Enter Task Description" 
      onChangeText={(text)=>{setTaskDesc(text)}}/>
      <View style={styles.separator} />

       <Text style={styles.title}>Choose Task Priority</Text>
       <View style={styles.separator2} /> 
      <Dropdown/>
      <View style={styles.separator} />

      <Text style={styles.title}>Choose Start Date</Text>
      <View style={styles.separator2} /> 
      <TouchableOpacity style={styles.button1} 
      onPress={() => {setOpenStartCalendar(true)}}>      
        <Text>Start Date</Text>        
        </TouchableOpacity>

       
              {openStartCalendar && <RNDateTimePicker onChange={onStartChange}  value={startDate} />}
              <View style={styles.separator} />

     
        <Text style={styles.title}>Choose End Date</Text>
        <View style={styles.separator2} /> 
        <TouchableOpacity style={styles.button1} 
      onPress={() => {setOpenEndCalendar(true)}}>      
        <Text>End Date</Text>        
        </TouchableOpacity>

       
              {openEndCalendar && <RNDateTimePicker onChange={onEndChange}  value={endDate} />}
              <View style={styles.separator} />

              

        <Button onPress={()=>onSubmit()}  title ="Add Task">
      </Button>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color:'black',
    alignItems: 'center',
  },
  textInput:{
    fontSize :18,
    color:'black',
    borderWidth:2,
    borderColor:'white',
    margin:10,
    alignContent:"stretch"
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  separator2: {
    marginVertical: 3,
    height: 1,
    width: '80%',
  },
  button1: {
    width:"50%",
    height :50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:"white",
    borderWidth:0.5,
  }
  ,
  button2: {
    width:"50%",
    height :50,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:"white",
    borderWidth:0.5,
  },
  centredview:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:22,
  },
  modalview:{
    margin:20,
    backgroundColor:'white',
    borderRadius:20,
    padding:35,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5,
  },
});
