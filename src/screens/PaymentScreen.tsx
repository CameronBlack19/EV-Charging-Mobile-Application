import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import PrimaryBtn from '../components/PrimaryBtn';
import { SCREEN_PAYMENT } from '../utils/constants';
import paypalApi from '../api/paypalApi';
import WebView from 'react-native-webview';
import queryString from 'query-string';

const PaymentScreen = ({ navigation }: RootStackScreenProps<'PaymentScreen'>) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(false)
  const [paypalUrl, setPaypalUrl] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  const onPaypalPressed = async() => {
    setLoading(true)
    try {
      const token = await paypalApi.generateToken()
      const res = await paypalApi.createOrder(token)
      setAccessToken(token)
      console.log("res+++++", token)
      setLoading(false)

      if(!!res?.links){
        const findUrl = res.links.find(data => data?.rel == "approve")
        setPaypalUrl(findUrl.href)
      }
    } catch (error) {
      console.log("error", error)
      setLoading(false)
    }
  }

  const onUrlChange = (webviewState) => {
    console.log("webviewState", webviewState)
    if(webviewState.url.includes('https://example.com/cancel')){
      clearPaypalState();
      return;
    }
    if(webviewState.url.includes('https://example.com/return')){
      const urlValues = queryString.parseUrl(webviewState.url)
      console.log("url value", urlValues)
      const {token} = urlValues.query
      if(!!token){
        paymentSuccess(token)
      }
    }
  }

  const clearPaypalState = () => {
    setPaypalUrl(null)
    setAccessToken(null)
  }

  const paymentSuccess = async(id) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken)
      console.log("capturePayment res+++++", res)
      alert("Payment Successful")
      clearPaypalState()
    } catch (error) {
      console.log("Error in payment capture", error)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ padding: 30, marginTop: 50 }}>
        {/* Payment Title */}
        <Text style={{ fontSize: 40, fontWeight: '800' }}>{SCREEN_PAYMENT.title}</Text>
        {/* Payment Description */}
        <Text style={{ opacity: 0.5, marginTop: 16, fontSize: 18 }}>{SCREEN_PAYMENT.description}</Text>

        {/* Payment using PayPal */}
        <View style={{flex: 1, marginTop:20}}>
              <PrimaryBtn label='Pay using PayPal' onPress={onPaypalPressed} style={{backgroundColor: '#0f4fa3'}} />
              
              <Modal visible={!!paypalUrl}>
                <TouchableOpacity onPress={clearPaypalState} style={{marginTop: 50}}>
                  <Text>Close</Text>
                </TouchableOpacity>
                <View style={{flex: 1, marginTop:50}}>
                  <WebView source={{uri: paypalUrl}} onNavigationStateChange={onUrlChange} />
                </View>
              </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;