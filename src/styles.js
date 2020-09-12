import { StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: "#f5fcff"
  },
  topBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 6,
    backgroundColor: "#22509d"
  },
  scanText:{
    fontSize: width * .04,
    color: 'white'
  },
  heading: {
    fontWeight: "bold",
    fontSize: height * .025,
    alignSelf: "center",
    color: "#fff"
  },
  bottonHeading:{ 
    fontSize: height * .025,
    color:'white' 
  },
  bottonText:{ 
    fontSize: height * .015,
    marginTop: 4,
    color:'white' 
  },
  enableInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  
  activityIndicator:{
    position : "absolute",
    right : width * .1
  },
  unknownList: {
    height: height * .07,
    width: width * .9,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: width * .01,
    // borderBottomWidth:1,
    backgroundColor: '#0083FF',
    paddingLeft: width * .02,
    marginTop: height * .02,
    borderRadius: width * .01
  },
});

export default styles;
