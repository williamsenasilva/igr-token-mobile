import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import Icon from 'react-native-vector-icons/FontAwesome';

class ReadDateFromInputScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      error: ""
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.text}>
            The second step is to get the validity date on product packaging.
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.viewRow}>
            <TextInput
              style={styles.textInput}
              maxLength={7}
              placeholder="Type date here on format YYYYMM"
              keyboardType='numeric'
              onChangeText={(text) => { this.setState({date: text}); }}
              value={this.state.date}
            />
            <TouchableOpacity
              onPress={this.checkText}
              style={styles.button}
            >
              <Text style={styles.text}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <ErrorMessage message={this.state.error} />
        </View>
        <View style={{flex: 4}}>
        </View>
      </View>
    );
  }

  componentDidMount() {
  };

  checkText = () => {
    const isNum = /^\d+$/.test(this.state.date);    
    var year = "";
    var month = "";
    if(this.state.date.length < 6) {
      this.setState({error: "The date must have 6 characters"});
    } else if(! isNum) {
      this.setState({error: "The date must have only numbers"});
    } else {
      year = this.state.date[0] + this.state.date[1] + this.state.date[2] + this.state.date[3];
      month = this.state.date[4] + this.state.date[5];
      if(parseInt(year) == 0 || parseInt(year) < 2018) {
        this.setState({error: "The year must be a number between 2018 and 2099"});
      } else if(parseInt(month) == 0 || parseInt(month) > 12) {
        this.setState({error: "The month must be a number between 1 and 12"});
      } else {
        this.setState({error: ""});
      }
    }
  }
}

// this.props.navigation.navigate('HomeScreen');
// {pageParams => { this.props.navigation.navigate('ReadBarcodeFromCameraScreen', pageParams);}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewRow: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  button: {
    backgroundColor: '#DDDDDD',
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 45,
    alignItems: 'center',
    padding: 10
    // color: "#6a4595" // default color
  },
  text: {
    color: '#000',
    fontSize: 15,
    margin: 10
  }
});

export default ReadDateFromInputScreen;