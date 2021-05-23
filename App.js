import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View>
          <Image 
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg', width:30, height:40
            }}
            style={styles.image}
          />
          <Text style = {styles.displayText1}>📠Bar Code Scanner📠</Text>
        </View>
        <Text style = {styles.displayText}>
        {hasCameraPermissions === true ? this.state.scannedData : 'Request Camera Permissions'}
        </Text>

        <TouchableOpacity
        onPress = {this.getCameraPermissions}
        style = {styles.scanButton}
        >
        <Text style = {styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  image: {
    width: 300,
    height: 300,
  },

  displayText1: {
    fontSize: 40,
  },

  displayText: {
    fontSize: 15,
    textDecoration: 'underline',
    fontFamily: 'sans-serif'
  },
  scanButton: {
    backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
      borderRadius: 20,
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize:20,
  },
});