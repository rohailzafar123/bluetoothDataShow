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
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
    color: "#fff"
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
  listContainer: {
    borderColor: "#ccc",
    borderTopWidth: 0.5
  },
  listItem: {
    flex: 1,
    height: "auto",
    paddingHorizontal: 16,
    borderColor: "#ccc",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15
  },
  listItemStatus: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff"
  },
  footer: {
    height: 52,
    borderTopWidth: 1,
    borderTopColor: "#999"
  },
  fixedFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  button: {
    height: 36,
    margin: 5,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#22509d",
    fontWeight: "bold",
    fontSize: 14
  },
  buttonRaised: {
    backgroundColor: "#22509d",
    borderRadius: 2,
    elevation: 2
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
