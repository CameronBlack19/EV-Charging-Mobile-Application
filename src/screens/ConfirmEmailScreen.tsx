import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "@expo/vector-icons/MaterialIcons"
import { useRoute, useTheme } from '@react-navigation/native';
import PrimaryBtn from '../components/PrimaryBtn';
import { SCREEN_CONFIRM_EMAIL } from '../utils/constants';
import { Controller, useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';


const ConfirmEmailScreen = ({navigation, }: RootStackScreenProps<"ConfirmEmailScreen">) => {
    const theme = useTheme();
    const route = useRoute();
    const {control, handleSubmit, watch} = useForm({defaultValues: {username: route?.params?.username},});

    const username = watch('username');
    const onConfirmPressed = async (data) => {
      try {
        await Auth.confirmSignUp(data.username, data.code);
        navigation.navigate('LoginScreen');
      } catch (e) {
        Alert.alert("Error", e.message);
      }
      
        //console.warn('onConfirmPressed');
      //navigation.navigate('HomeScreen');
    }
    const onResendPressed = async() => {
        try {
            await Auth.resendSignUp(username);
            Alert.alert('Verification code resent.', "Check your email for the code. If not received, verify your info and check spam. You can request a new code after a delay. Thank you!")
          } catch (e) {
            Alert.alert(e.message);
          }
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
                    
                </View>
        
                <View style={{padding: 25, marginTop: 0}}>
                    {/* Register Title */}
                    <Text style= {{fontSize: 40, fontWeight: "800",}}>{SCREEN_CONFIRM_EMAIL.title}</Text>
                                        
                    <View style={{alignItems: 'center', gap: 16, marginTop: 10 , paddingTop: 15, paddingBottom: 15}}>
                        {/* Username Field */}
                      <Controller control={control} rules={{required: 'Username is required'}} name="username" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
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
                        
                        
                        {/* Code Field */}
                      <Controller control={control} rules={{required: 'Confirmation Code is required'}} name="code" render={({field: {value, onChange, onBlur},  fieldState: {error}}) => (
                            <>
                                <View style={{position: "relative", width: "100%"}}>    
                                    <TextInput placeholder='Code' style={[{fontSize: 16, fontWeight: '500', color: theme.colors.text,      paddingLeft:  48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background,     width:   "100%", borderWidth: 2}, {borderColor: error ? 'red' : '#000'}]} value= {value} onChangeText=  {onChange} onBlur=   {onBlur} />
                                    {/* Username Icon */}                                               
                                    <Icons name='domain-verification' size={24} color={theme.colors.text} style={{position: 'absolute', left: 12, top:    12,        opacity: 0.5}}/>
                                </View>
                                    {error && (
                                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                                    )}
                            </>
                        )} 
                    />
                        {/* Confirm Button */}
                        <PrimaryBtn label='Confirm Email' onPress={ handleSubmit(onConfirmPressed) }/>

                        <View style={{borderWidth: 5 , paddingHorizontal: 32, height: 52, borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
                          <TouchableOpacity onPress={ onResendPressed }>
                              <Text style = {{fontWeight: '700', fontSize: 14, color: "#000"}}>Resend Code</Text>
                          </TouchableOpacity>  
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                              <Text style = {{color: '#2E2E33', fontWeight: '700'}}>Back to Login!</Text>
                          </TouchableOpacity>  
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConfirmEmailScreen