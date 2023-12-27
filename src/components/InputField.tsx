import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icons from "@expo/vector-icons/MaterialIcons"
import { useTheme } from '@react-navigation/native';

export default function InputField({label, icon, inputType, keyboardType, fieldButtonLabel, fieldButtonfunction}){
    const theme = useTheme();
    return (
        <View style={{position: "relative", width: "100%"}}>
            {icon}
            <inputType == 'password' ? (<TextInput placeholder='Your Password' style={{fontSize: 16, fontWeight: '500', color: theme.colors.text, paddingLeft: 48, paddingRight: 12, height: 48, borderRadius: 12, backgroundColor: theme.colors.background, width: "100%"}} secureTextEntry={true}/>) : ()>
            <TouchableOpacity onPress={() => {}}>
                <Text style={{color: '#2E2E33', fontWeight: '700', marginLeft: 211, marginTop: 10}}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    )
}