import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {DefaultTheme, NavigationContainer, Theme} from '@react-navigation/native';
import React from 'react';
import RootNavigator from './src/utils/navigators/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native'

Amplify.configure(awsExports);

export default function App() {
  //Auth.signOut();
  
  const theme: Theme = {
    ...DefaultTheme, colors: {
      ...DefaultTheme.colors, primary: "#000"
    },
  };

  
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer theme={theme}>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
