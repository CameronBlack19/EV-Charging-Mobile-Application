import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IQCodeProps } from '../utils/IQRCodeProps';


const ScanQRScreen = ({navigation}: RootStackScreenProps<"ScanQRScreen">) => {    
    const [loading, setLoading] = useState(true);
    const [scanData, setScanData] = useState<IQCodeProps>();
    const [permission, setPermission] = useState(true);

    useEffect(() => {
        requestCameraPermission()
    }, []);
    const requestCameraPermission = async () => {
        try {
            const {status, granted}  = await BarCodeScanner.requestPermissionsAsync();
            console.log('Status: ${status}, Granted: ${granted}');

            if (status === 'granted'){
                console.log('Access Granted!');
                setPermission(true);
            } else {
                setPermission(false);
            }

        } catch (error) {
            console.log(error);
            setPermission(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <View style={styles.container}>
            <Text>Requesting Permission ..... </Text>
        </View>
    );

    if (scanData){
        return (
            navigation.navigate('RequiredFieldScreen')
        );
    } /*
        else {
        Alert.alert("Invalid QR Code Scanned. Try Again!");
    }
     */

    if(permission) 
        return <BarCodeScanner style={[styles.container]} onBarCodeScanned={({ type, data }) => {
            try {
                console.log(type);
                console.log(data);
                let _data = JSON.parse(data);
                setScanData(_data);
            } catch (error) {
                console.log('Unable to parse: ', error);
            }
        }}>

        </BarCodeScanner>
}
export default ScanQRScreen

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