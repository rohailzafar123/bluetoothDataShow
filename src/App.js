import React from "react";
import {
  Platform,
  ScrollView,
  Switch,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  PermissionsAndroid
} from "react-native";

import BluetoothSerial, {
  withSubscription
} from "react-native-bluetooth-serial-next";
import styles from "./styles";
import { BluetoothStatus } from 'react-native-bluetooth-status';

const { width, height } = Dimensions.get('window');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.events = null;
    this.state = {
      isEnabled: false,
      device: null,
      comingData: [],
      deviceid: '',
      scanning: false,
      processing: false,
      deviceData: [],
      status:false,
    };
  }
  componentDidMount() {
    this.locationPermission();
    this.bluetoothEn()
    this.bluetoothCheck();
  }

// Check bluetooth Status
  bluetoothCheck = () => {
      BluetoothStatus.state().then((isEnabled) =>{
        this.setState({status:isEnabled})
      })
  }

// Start the scanning 
  StartScanning = () => {
    BluetoothSerial.enable();
      this.setState({ isEnabled: true })
      BluetoothSerial.listUnpaired().then((data) => {
        console.log(data)
        this.setState({ comingData: data })
      });
  };

// Stop the scanning 
  stopScanning = () => {
    BluetoothSerial.stopScanning();
    this.setState({ isEnabled: !this.state.isEnabled, comingData: [] })
  }

// Bluetooth Enable option
  bluetoothEn = () => {
    BluetoothSerial.enable();
  }

// Paired and Connect the device with on click
  connectDevice = (data) => {
    this.setState({ deviceid: data.deviceId },
      () => {
        BluetoothSerial.connect(data.deviceId),
          BluetoothSerial.withDelimiter('\r').then(() => {
            Promise.all([
              BluetoothSerial.isEnabled(),
              BluetoothSerial.list(),
            ]).then(values => {
              const [isEnabled, devices] = values;
              console.log(values)
            });
            BluetoothSerial.on('read', (dataGet) => {
              let bleData = [];
              bleData.push(dataGet.data)
              this.setState({deviceData: bleData, isEnabled:false,})
            });
          });
      })
  }

// Take the location permission 
  locationPermission = () => {
    //Checking for the permission just after component loaded
    async function requestCameraPermission() {
      //Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    }
    if (Platform.OS === 'android') {
      requestCameraPermission();
    } else {
    }
  };
  
  // render the Data those device you selected
  _renderMyList = ({ item }) => {
    return(
    <View style={{ flex: 1, }}>
      <View style={{ alignSelf: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          {item}
        </Text>
      </View>
    </View>
 ) }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <Text style={styles.heading}>Bluetooth Data show</Text>
          <View style={styles.enableInfoWrapper}>

            {/* Scan Icon */}
            <ActivityIndicator
              style={styles.activityIndicator}
              animating={this.state.isEnabled}
              size={width * .08}
              color="white"
            />

            {/* Scan & Stop Botton */}
            {this.state.isEnabled == false ? (
              <View
                style={styles.scanButtun}>
                <TouchableOpacity
                  onPress={() => this.StartScanning()}>
                  <Text style={styles.scanText}>Scan</Text>
                </TouchableOpacity>
              </View>
            ) : (
                <View
                  style={styles.scanButtun}>
                  <TouchableOpacity
                    onPress={() => this.stopScanning()}>
                    <Text style={styles.scanText}>Stop</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
        <View>
          
          {/*  Show Data Connect Device */}
        <FlatList
            style={{ marginTop: 10 }}
            data={this.state.deviceData}
            renderItem={this._renderMyList}
          />

          {/* Show the unpaired Device in list */}
          {this.state.isEnabled &&
            this.state.comingData.map((item, key) => {
              console.log('item', item);
              return (
                <TouchableOpacity
                  key={key}
                  style={styles.unknownList}
                  onPress={() => this.connectDevice(
                    { deviceId: item.id }
                  )}>
                  <Text style={styles.bottonHeading}>{item.name}</Text>
                  <Text style={styles.bottonText}>{item.id}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </SafeAreaView>
    );
  }
}

export default withSubscription({ subscriptionName: "events" })(App);
   