import { useState } from "react";
import {
View,
Text,
TextInput,
Button,
FlatList,
TouchableOpacity,
StyleSheet
} from "react-native";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import { addTask, deleteTask, toggleTask } from "../redux/taskSlice";

import axios from "axios";

function AppScreen() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [repeatPassword,setRepeatPassword] = useState("");

const [loggedIn,setLoggedIn] = useState(false);

const [taskText,setTaskText] = useState("");

const tasks = useSelector(state => state.tasks);

const dispatch = useDispatch();

const validateEmail = (email) =>{
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);
};

const handleSignup = () =>{

if(!validateEmail(email)){
alert("Invalid email");
return;
}

if(password !== repeatPassword){
alert("Passwords do not match");
return;
}

setLoggedIn(true);
};

const addNewTask = ()=>{
if(!taskText) return;

dispatch(addTask({
id: Date.now().toString(),
text: taskText,
completed:false
}));

setTaskText("");
};

const fetchUser = async ()=>{

try{

const res = await axios.get("https://api.github.com/users/octocat");

alert("API Connected: " + res.data.login);

}catch(err){

alert("API Error");

}

};

if(!loggedIn){

return(

<View style={styles.container}>

<Text style={styles.title}>Sign Up</Text>

<TextInput
placeholder="Email"
value={email}
onChangeText={setEmail}
style={styles.input}
/>

<TextInput
placeholder="Password"
secureTextEntry
value={password}
onChangeText={setPassword}
style={styles.input}
/>

<TextInput
placeholder="Repeat Password"
secureTextEntry
value={repeatPassword}
onChangeText={setRepeatPassword}
style={styles.input}
/>

<Button title="Sign Up" onPress={handleSignup}/>

</View>

);

}

return(

<View style={styles.container}>

<Text style={styles.title}>Todo List</Text>

<TextInput
placeholder="Add task"
value={taskText}
onChangeText={setTaskText}
style={styles.input}
/>

<Button title="Add Task" onPress={addNewTask}/>

<Button title="Test API" onPress={fetchUser}/>

<FlatList
data={tasks}
keyExtractor={(item)=>item.id}
renderItem={({item})=>(
<View style={styles.taskRow}>

<TouchableOpacity
onPress={()=>dispatch(toggleTask(item.id))}
>

<Text style={{
textDecorationLine:item.completed ? "line-through":"none",
fontSize:18
}}>

{item.text}

</Text>

</TouchableOpacity>

<Button
title="Delete"
onPress={()=>dispatch(deleteTask(item.id))}
/>

</View>
)}
/>

</View>

);

}

export default function App(){

return(

<Provider store={store}>

<AppScreen/>

</Provider>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
justifyContent:"center"
},

title:{
fontSize:28,
marginBottom:20,
textAlign:"center"
},

input:{
borderWidth:1,
borderColor:"#ccc",
padding:10,
marginBottom:10,
borderRadius:6
},

taskRow:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:10
}

});