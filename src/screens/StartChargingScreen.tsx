import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SCREEN_CHARGING } from '../utils/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import PrimaryBtn from '../components/PrimaryBtn'


const StartChargingScreen = ({navigation}) => {
    const theme = useTheme();
    const onChargeManually = () => {
        navigation.navigate('');
    }
    const onScan = () => {
        navigation.navigate('ScanQRScreen');
    }
    const onGenerateScan = () => {
        navigation.navigate('GenerateQRScreen');
    }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.card}}>
        <View style={{padding: 25}}>
            <Text style= {{fontSize: 40, fontWeight: "800",marginTop: 30}}>{SCREEN_CHARGING.title}</Text>

            <PrimaryBtn label='Generated QR Code' onPress={onGenerateScan} style={{marginTop: 100}}/>

            <PrimaryBtn label='Scan QR Code' onPress={onScan} style={{marginTop: 20}}/>

            <View style={{borderWidth: 5 , paddingHorizontal: 32, height: 52, borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <TouchableOpacity onPress={onChargeManually}>
                    <Text style = {{fontWeight: '700', fontSize: 16, color: "#000"}}>Charge Manually</Text>
                </TouchableOpacity>  
            </View>
        </View>
    </SafeAreaView>
  )
}

export default StartChargingScreen

const styles = StyleSheet.create({})