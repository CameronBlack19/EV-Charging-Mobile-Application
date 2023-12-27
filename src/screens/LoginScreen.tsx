import { View, Text, TouchableOpacity, TextInput , Alert} from 'react-native'
import React, { useState } from 'react'
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "@expo/vector-icons/MaterialIcons"
import { useTheme } from '@react-navigation/native';
import PrimaryBtn from '../components/PrimaryBtn';
import { SCREEN_LOGIN } from '../utils/constants';
import Login from '../components/Login';
import Google from '../components/GoogleTSX';
import Facebook from '../components/FacebookTSX';
import { Auth } from 'aws-amplify';
import { useForm, Controller } from 'react-hook-form';
import Amazon from '../components/AmazonTSX';


const LoginScreen = ({navigation, }: RootStackScreenProps<"LoginScreen">) => {
    const theme = useTheme();

    const {control, handleSubmit, formState: {errors}} = useForm();
    
    const onLoginPressed = async data => {  
        if (!data.username || !data.password) {
            Alert.alert('Please enter both username and password.');
            return;
        }
        
        try{
            const response = await Auth.signIn(data.username, data.password);
            console.log(response);
            navigation.navigate("HomeScreen");
        } catch (e) {
            if (e.code === 'UserNotFoundException') {
              Alert.alert('User not found. Please check your username.');
            } else if (e.code === 'NotAuthorizedException') {
              Alert.alert('Incorrect password. Please try again.');
            } else if (e.code === 'UserNotConfirmedException') {
              Alert.alert('User not confirmed. Please check your email for a confirmation link.');
            } else {
              Alert.alert('An error occurred. Please try again later.');
            }
          }
    };
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.card}}>
            <View style={{paddingHorizontal: 24, height: 52, alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {/* Back Arrow */}
                    <Icons name='arrow-back-ios' size={24} color= {theme.colors.text} />
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                {/* Login Image */}
                <Login width={250} height={250}/>
            </View>

            <View style={{padding: 25}}>
                {/* Login Title */}
                <Text style= {{fontSize: 40, fontWeight: "800",}}>{SCREEN_LOGIN.title}</Text>
                {/* Login description */}
                <Text style={{ opacity: 0.5, marginTop: 16, fontSize: 18}}>{SCREEN_LOGIN.description}</Text>
                {/* Social Account Icons */}
                <View style ={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
                    <TouchableOpacity onPress={() => {}} style={{borderColor: '#ddd', borderRadius: 10, borderWidth: 2,     paddingHorizontal: 30, paddingVertical: 10}}> 
                        <Google height={30} width={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={{borderColor: '#ddd', borderRadius: 10, borderWidth: 2,     paddingHorizontal: 30, paddingVertical: 10}}> 
                        <Facebook height={30} width={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={{borderColor: '#ddd', borderRadius: 10, borderWidth: 2,     paddingHorizontal: 30, paddingVertical: 10}}> 
                        <Amazon height={30} width={30}/>
                    </TouchableOpacity>
                </View>

                <Text style = {{textAlign: 'center', color: "#666", marginTop: 20 }}>Or, Login with email....</Text>

                <View style={{alignItems: 'center', gap: 5, marginTop: 30}}>
                        
                            {/* Username Field */}
                            <Controller control={control} rules={{required: 'Username is required'}} name="username" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
                            <>
                                <View style={{position: "relative", width: "100%"}}>    
                                    <TextInput placeholder='Your Username' style={[{fontSize: 16, fontWeight: '500', color: theme.colors.text,      paddingLeft:  48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background,     width:   "100%", borderWidth: 2}, {borderColor: error ? 'red' : '#000'}]} value= {value} onChangeText=  {onChange} onBlur=   {onBlur} />
                                    {/* Username Icon */}                                               
                                    <Icons name='person' size={24} color={theme.colors.text} style={{position: 'absolute', left: 12, top:    12,        opacity: 0.5}}/>
                                </View>
                                    {error && (
                                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                                    )}
                            </>
                        )} 
                    />
                            
                                {/* Password Field */}
                                <Controller control={control} rules={{required: 'Password is required', minLength: {value: 8, message: 'Password should be minimum 8 characters long'}}} name="password" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
                            <>
                                <View style={{position: "relative", width: "100%"}}>    
                                    <TextInput placeholder='Your Password' style={[{fontSize: 16, fontWeight: '500', color: theme.colors.text,      paddingLeft:  48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background,     width:   "100%", borderWidth: 2}, {borderColor: error ? 'red' : '#000'}]} value= {value} onChangeText=  {onChange} onBlur=   {onBlur} secureTextEntry={true}/>
                                    {/* Password Icon */}                                               
                                    <Icons name='lock' size={24} color={theme.colors.text} style={{position: 'absolute', left: 12, top:    12,        opacity: 0.5}}/>
                                </View>
                                    {error && (
                                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                                    )}
                            </>
                        )} 
                    />


                        {/* Forgot Password */}
                        <TouchableOpacity onPress={() => {navigation.navigate("ResetPasswordScreen")}}>
                            <Text style={{color: '#2E2E33', fontWeight: '700', marginLeft: 211, marginTop: 10}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    

                    {/* Login Button */}
                    <PrimaryBtn label={/*loading ? 'Loading....' : */ 'Login'} onPress={ handleSubmit(onLoginPressed) }/>
                </View>
                
                {/* Redirect to Login Page */}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                    <Text>New here?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                        <Text style = {{color: '#2E2E33', fontWeight: '700'}}>Register</Text>
                    </TouchableOpacity>  
                </View> 
                
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen