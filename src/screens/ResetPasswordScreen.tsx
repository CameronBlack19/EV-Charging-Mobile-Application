import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "@expo/vector-icons/MaterialIcons"
import { useRoute, useTheme } from '@react-navigation/native';
import PrimaryBtn from '../components/PrimaryBtn';
import { SCREEN_RESET_PASS } from '../utils/constants';
import { Controller, useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';


const ResetPasswordScreen = ({navigation, }: RootStackScreenProps<"ResetPasswordScreen">) => {
    const theme = useTheme();
    const route = useRoute();
    const {control, handleSubmit} = useForm();
    const onSendPressed = async (data) => {
        try {
          await Auth.forgotPassword(data.username);
          navigation.navigate("NewPasswordScreen", {username});
        } catch (e) {
          Alert.alert("Error", e.message);
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
        
                <View style={{padding: 25, marginTop: 0}}>
                    {/* Reset Password Title */}
                    <Text style= {{fontSize: 40, fontWeight: "800",}}>{SCREEN_RESET_PASS.title}</Text>
                                        
                    <View style={{alignItems: 'center', gap: 16, marginTop: 10, paddingTop: 15, paddingBottom: 15}}>
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
                        
                        {/* Send Code Button */}
                        <PrimaryBtn label='Send Code' onPress={handleSubmit(onSendPressed)}/>

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

export default ResetPasswordScreen