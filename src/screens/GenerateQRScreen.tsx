import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import QRCode from 'react-native-qrcode-svg';
import { IQCodeProps } from '../utils/IQRCodeProps';
import PrimaryBtn from '../components/PrimaryBtn';


const GenerateQRScreen = ({navigation, }: RootStackScreenProps<"GenerateQRScreen">) => {
  const payload: IQCodeProps = { name: 'admin', number: '1234567890'};

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <QRCode value={JSON.stringify(payload)}/>

        <View>
            <PrimaryBtn label='Go to Scanner' onPress={() => navigation.navigate('ScanQRScreen')} style={{ marginTop: 30 }}/>
        </View>
    </View>
  )
}
export default GenerateQRScreen

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
      },
      textBold: {
        fontWeight: '500',
        color: '#000'
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
      },
      buttonTouchable: {
        padding: 16
      },
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    }
})