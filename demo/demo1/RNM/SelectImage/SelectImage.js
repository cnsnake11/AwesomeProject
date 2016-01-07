'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ListView,
    StatusBarIOS,
    BackAndroid,
    Image,
    Dimensions,
} from 'react-native';

import {
    selectImageRNM,
    BaseLogicObj,
} from '../../../../bbt-react-native';


class SelectImageObj extends BaseLogicObj {

    select() {
        selectImageRNM.select().then((res) => {
            let path = res.path;
            if (path) {
                this.setState({
                    path,
                });
            }
        });
    }
}

class SelectImage extends Component {

    componentWillMount() {

        this.state = {
            path: null,
        };

        this.selectImageObj = new SelectImageObj(this);
    }

    render() {
        return (
          <View
              style={{
                  padding: 10,
                  paddingTop: 40,
              }}>
              <View
                  style={{
                      flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                      style={{
                          marginBottom: 10,
                      }}
                      onPress={this.selectImageObj.select.bind(this.selectImageObj)}>
                      <View
                          style={{
                              backgroundColor: 'green',
                              padding: 10,
                          }}>
                      <Text
                          style={{
                              color: 'fff',
                          }}>
                          选择图片
                      </Text>
                      </View>
                  </TouchableOpacity>
              </View>

              {
                  this.state.path ?
                      <Image source={{uri: this.state.path}}
                             style={{
                                 width: Dimensions.get('window').width - 20,
                                 height: Dimensions.get('window').height - 200}}/>
                      :
                      null
              }

          </View>
        );
    }
}

module.exports = SelectImage;

