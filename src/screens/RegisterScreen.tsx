import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "@expo/vector-icons/MaterialIcons"
import { useTheme } from '@react-navigation/native';
import PrimaryBtn from '../components/PrimaryBtn';
import { SCREEN_REGISTER } from '../utils/constants';
import Register from '../components/Register';
import Google from '../components/GoogleTSX';
import Facebook from '../components/FacebookTSX';
import Amazon from '../components/AmazonTSX';
import { Auth } from 'aws-amplify';
import { Controller, useForm } from 'react-hook-form';


const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterScreen = ({navigation, }: RootStackScreenProps<"ConfirmEmailScreen">) => {
    const theme = useTheme();
    
    const {control, handleSubmit, formState: {errors}, watch} = useForm(/*{defaultValues: {username: 'default username'}}*/);
    const pwd = watch('password')
    const onConfirmPressed = async (data) => {
        const {username, password, email, name} = data;
        try {
            const response = await Auth.signUp({
                username, password, attributes: {email, name, preferred_username: username}
            });
            navigation.navigate('ConfirmEmailScreen', {username});
        } catch (e) {
            Alert.alert("Error", e.message);
        }
    };
    {/* Terms of Use */}
    const onTermsofUsePressed = () => {
        console.warn('onTermsofUsePressed');
        /* navigation.navigate() */ 
    }
    {/* Privacy Policy */}
    const onPrivacyPolicyPressed = () => {
        console.warn('onPrivacyPolicyPressed');
        /* navigation.navigate() */ 
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.card}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal: 24, height: 52, alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {/* Back Arrow */}
                        <Icons name='arrow-back-ios' size={24} color= {theme.colors.text} /> 
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', flex: 1, justifyContent: 'center', marginTop: 0 }}>
                    {/* Register Image */}
                    <Register width={300} height={300} style={{marginTop: 0}}/>
                </View>
        
                <View style={{padding: 25, marginTop: 0}}>
                    {/* Register Title */}
                    <Text style= {{fontSize: 40, fontWeight: "800",}}>{SCREEN_REGISTER.title}</Text>
                    {/* Register description */}
                    <Text style={{ opacity: 0.5, marginTop: 16, fontSize: 18}}>{SCREEN_REGISTER.description}</Text>

                    {/* Social Account Icons */}
                    <View style ={{flexDirection: 'row', justifyContent: 'space-between',  marginBottom: 30, marginTop: 30}}>
                        <TouchableOpacity onPress={() => {}} style={{borderColor: '#ddd', borderRadius: 10, borderWidth:    2,     paddingHorizontal: 30, paddingVertical: 10}}> 
                            <Google height={30} width={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={{borderColor: '#ddd', borderRadius: 10, borderWidth:    2,     paddingHorizontal: 30, paddingVertical: 10}}> 
                            <Facebook height={30} width={30}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={{borderColor: '#ddd', borderRadius: 10, borderWidth:    2,     paddingHorizontal: 30, paddingVertical: 10}}> 
                            <Amazon height={30} width={30}/>
                        </TouchableOpacity>
                    </View>

                    <Text style = {{textAlign: 'center', color: "#666", marginBottom: 20 }}>Or, register with email....</Text>
                    
                    <View style={{alignItems: 'center', gap: 16, marginTop: 10}}>
                        {/* Name Field */}
                        <Controller control={control} rules={{required: 'Name is required', minLength: {value: 3, message: 'Enter min. of 3 characters long'}, maxLength: {value: 24, message: 'Enter max. of 24 characters long'}}} name="name" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
                            <>
                                <View style={{position: "relative", width: "100%"}}>    
                                    <TextInput placeholder='Name' style={[{fontSize: 16, fontWeight: '500', color: theme.colors.text,      paddingLeft:  48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background,     width:   "100%", borderWidth: 2}, {borderColor: error ? 'red' : '#000'}]} value= {value} onChangeText=  {onChange} onBlur=   {onBlur} />
                        {/* Name Icon */}                                               
                                    <Icons name='person-add' size={24} color={theme.colors.text} style={{position: 'absolute', left: 12, top:    12,        opacity: 0.5}}/>
                                </View>
                                    {error && (
                                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                                    )}
                            </>
                        )} 
                    />
                        {/* Username Field */}
                        <Controller control={control} rules={{required: 'Username is required', minLength: {value: 3, message: 'Username should be at least 3 characters long'}, maxLength: {value: 24, message: 'Username should be max. 24 characters long'}}} name="username" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
                            <>
                                <View style={{position: "relative", width: "100%"}}>    
                                    <TextInput placeholder='Username' style={[{fontSize: 16, fontWeight: '500', color: theme.colors.text,      paddingLeft:  48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background,     width:   "100%", borderWidth: 2}, {borderColor: error ? 'red' : '#000'}]} value= {value} onChangeText=  {onChange} onBlur=   {onBlur} />
                        {/* Username Icon */}                                               
                                    <Icons name='person' size={24} color={theme.colors.text} style={{position: 'absolute', left: 12, top:    12,        opacity: 0.5}}/>
                                </View>
                                    {error && (
                                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                                    )}
                            </>
                        )} 
                    />
                      {/* Email Field */}
                      <Controller control={control} rules={{required: 'Email ID is required', pattern: {value: REGEX_EMAIL, message: 'Email ID is invalid'}}} name="email" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
                            <>
                                <View style={{position: "relative", width: "100%"}}>    
                                    <TextInput placeholder='Email ID' style={[{fontSize: 16, fontWeight: '500', color: theme.colors.text,      paddingLeft:  48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background,     width:   "100%", borderWidth: 2}, {borderColor: error ? 'red' : '#000'}]} value= {value} onChangeText=  {onChange} onBlur=   {onBlur} />
                                    {/* Username Icon */}                                               
                                    <Icons name='email' size={24} color={theme.colors.text} style={{position: 'absolute', left: 12, top:    12,        opacity: 0.5}}/>
                                </View>
                                    {error && (
                                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                                    )}
                            </>
                        )} 
                    />
                        {/* Password Field */}
                        <Controller control={control} rules={{required: 'Password is required', minLength: {value: 8, message: 'Password should be at least 8 characters long'}}} name="password" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
                            <>
                                <View style={{position: "relative", width: "100%"}}>    
                                    <TextInput placeholder='Password' style={[{fontSize: 16, fontWeight: '500', color: theme.colors.text,      paddingLeft:  48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background,     width:   "100%", borderWidth: 2}, {borderColor: error ? 'red' : '#000'}]} value= {value} onChangeText=  {onChange} onBlur=   {onBlur}  secureTextEntry={true}/>
                                    {/* Username Icon */}                                               
                                    <Icons name='lock' size={24} color={theme.colors.text} style={{position: 'absolute', left: 12, top:    12,        opacity: 0.5}}/>
                                </View>
                                    {error && (
                                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                                    )}
                            </>
                        )} 
                    />
                        {/* Confirm Password Field */}
                        <Controller control={control} rules={{required: 'Confirm Password is required', validate: value => value === pwd || 'Password do not match'}} name="password-repeat" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
                            <>
                                <View style={{position: "relative", width: "100%"}}>    
                                    <TextInput placeholder='Confirm Password' style={[{fontSize: 16, fontWeight: '500', color: theme.colors.text,      paddingLeft:  48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background,     width:   "100%", borderWidth: 2}, {borderColor: error ? 'red' : '#000'}]} value= {value} onChangeText=  {onChange} onBlur=   {onBlur}  secureTextEntry={true}/>
                                    {/* Username Icon */}                                               
                                    <Icons name='lock' size={24} color={theme.colors.text} style={{position: 'absolute', left: 12, top:    12,        opacity: 0.5}}/>
                                </View>
                                    {error && (
                                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                                    )}
                            </>
                        )} 
                    />
                       
                        {/* Terms and Policy */}
                        <Text style={{color: 'gray', marginVertical: 10}}>By registering, you confirm that you accept our <Text style={{color: '#FDB075'}} onPress={onTermsofUsePressed}>Terms of Use</Text> and <Text style={{color: '#FDB075'}} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text></Text>
                        {/* Register Button */}
                        <PrimaryBtn label='Register' onPress={ handleSubmit(onConfirmPressed) }/>
                    </View>
                    
                    {/* Redirect to Login Page */}
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                        <Text>Have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                            <Text style = {{color: '#2E2E33', fontWeight: '700'}}>Login</Text>
                        </TouchableOpacity>  
                    </View> 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen