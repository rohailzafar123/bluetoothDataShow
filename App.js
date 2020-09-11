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

import Toast from "@remobile/react-native-toast";
import BluetoothSerial, {
  withSubscription
} from "react-native-bluetooth-serial-next";
// import { Buffer } from "buffer";
// import Button from "./components/Button";
// import DeviceList from "./components/DeviceList";
import styles from "./styles";
import { BluetoothStatus } from 'react-native-bluetooth-status';

// global.Buffer = Buffer;

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
    setInterval(() => {
      
    }, 100);
    
  }
// Check bluetooth Status
  bluetoothCheck = () => {
      BluetoothStatus.state().then((isEnabled) =>{
        this.setState({status:isEnabled})
        // console.log(isEnabled)
      })
  }

// Start the scanning 
// Change the code
// change name 
// change parameters like (){    = () => {}
  StartScanning = () => {
    BluetoothSerial.enable();
      this.setState({ isEnabled: !this.state.isEnabled })
      BluetoothSerial.listUnpaired().then((data) => {
        // console.log(data)
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
              console.log(`DATA FROM BLUETOOTH:`, dataGet.data);
              // const dataa = toS(data.data;
              // this.setState({devices:this.state.devices.push(dataa)})
              this.state.deviceData.push(data)
            });
          });
      })
  }

  proceed() {
    alert('Location Permission Needed');
  }

// Take the location permission 
  locationPermission = () => {
    var that = this;
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
  _renderMyList = ({ item }) => (
    <View style={{ flex: 1, }}>
      <View style={{ alignSelf: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          {item}
        </Text>
      </View>
    </View>
  )
  render() {
    const { isEnabled, device, devices, scanning, processing } = this.state;
    // console.log('iddata : ', this.state.deviceid)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <Text style={styles.heading}>Bluetooth Data show</Text>
          <View style={styles.enableInfoWrapper}>
            <ActivityIndicator
              style={styles.activityIndicator}
              animating={this.state.isEnabled}
              size={width * .08}
              color="white"
            />

            {/* Action Scan the bluetooth devices */}
            {this.state.isEnabled == false ? (
              <View
                style={styles.scanButtun}>
                <TouchableOpacity
                  onPress={() => this.StartScanning()}>
                  <Text style={{
                    fontSize: width * .04,
                    color: 'white'
                  }}>Scan</Text>
                </TouchableOpacity>
              </View>
            ) : (
                <View
                  style={styles.scanButtun}>
                  <TouchableOpacity
                    onPress={() => this.stopScanning()}>
                    <Text style={{
                      fontSize: width * .04,
                      color: 'white'

                    }}>Stop</Text>
                  </TouchableOpacity>
                </View>
              )}
            {/* <Switch onValueChange={this.toggleBluetooth} value={isEnabled} /> */}
          </View>
        </View>
        <View>


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
                  <Text style={{ fontSize: 20,color:'white' }}>{item.name}</Text>
                  <Text style={{ fontSize: 12, marginTop: 4,color:'white' }}>{item.id}</Text>
                </TouchableOpacity>
              );
            })}
          <FlatList
            style={{ marginTop: 10 }}
            data={this.state.deviceData}
            renderItem={this._renderMyList}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withSubscription({ subscriptionName: "events" })(App);
   