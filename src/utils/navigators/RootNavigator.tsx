import React, {useEffect, useState} from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import Screen01 from '../../screens/Screen01';
import Screen02 from '../../screens/Screen02';
import Screen03 from '../../screens/Screen03';
import Screen04 from '../../screens/Screen04';
import LoginScreen from '../../screens/LoginScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import ConfirmEmailScreen from '../../screens/ConfirmEmailScreen';
import HomeScreen from '../../screens/HomeScreen';
import NewPasswordScreen from '../../screens/NewPasswordScreen';
import { Auth , Hub} from 'aws-amplify';
import { ActivityIndicator, View } from 'react-native';
import StartChargingScreen from '../../screens/StartChargingScreen';
import ScanQRScreen from '../../screens/ScanQRScreen';
import GenerateQRScreen from '../../screens/GenerateQRScreen';
import RequiredFieldScreen from '../../screens/RequiredFieldScreen';
import PaymentScreen from '../../screens/PaymentScreen';

export type RootStackParamList = {
    Screen01: undefined;
    Screen02: undefined;
    Screen03: undefined;
    Screen04: undefined;
    LoginScreen: undefined;
    ResetPasswordScreen: undefined;
    RegisterScreen: undefined;
    ConfirmEmailScreen: undefined;
    HomeScreen: undefined;
    NewPasswordScreen: undefined;
    StartChargingScreen: undefined;
    ScanQRScreen: undefined;
    GenerateQRScreen: undefined;
    RequiredFieldScreen: undefined;
    PaymentScreen: undefined;
}
const RootStack = createNativeStackNavigator <RootStackParamList>();

export type RootStackScreenProps <T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
const RootNavigator = () => {
    const[user, setUser] = useState(undefined);

    const checkUser = async() => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUser(authUser);  
        } catch (e) {
            setUser(null);
        }
    }
    
    useEffect(() => {
        checkUser();
    }, [])
    useEffect(() => {
        const listener = (data) => {
            if(data.payload.event === 'signIn' || data.payload.event === 'signOut'){
                checkUser();
            }
        }

        Hub.listen('auth', listener);
        return () =>  Hub.remove('auth', listener);
    }, [])
    
    if (user === undefined){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <RootStack.Navigator>
            <RootStack.Group screenOptions={{headerShown: false }}>
                {user ? (
                    <>
                        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
                        <RootStack.Screen name="StartChargingScreen" component={StartChargingScreen} />
                        <RootStack.Screen name="ScanQRScreen" component={ScanQRScreen} />
                        <RootStack.Screen name="GenerateQRScreen"component={GenerateQRScreen} />
                        <RootStack.Screen name="RequiredFieldScreen"component={RequiredFieldScreen} />
                        <RootStack.Screen name="PaymentScreen"component={PaymentScreen} />
                    </>
                ) : (
                    <>
                        <RootStack.Screen name="Screen01" component={Screen01} />
                        <RootStack.Screen name="Screen02" component={Screen02} />
                        <RootStack.Screen name="Screen03" component={Screen03} />
                        <RootStack.Screen name="Screen04" component={Screen04} />
                        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
                        <RootStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                        <RootStack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
                        <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
                        <RootStack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
                    </>
                )}                
            </RootStack.Group>
        </RootStack.Navigator>
    )
}

export default RootNavigator