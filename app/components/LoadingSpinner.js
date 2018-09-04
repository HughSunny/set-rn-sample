import React, {Component} from 'react';
import {View, ActivityIndicator, Modal} from 'react-native';

export default class LoadingSpinner extends Component {
  render() {
    const { isVisible } = this.props;
      return ( <Modal
            transparent={true}
            onRequestClose={() => {}}
            visible={isVisible}
            animationType={'fade'}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{  justifyContent: 'center', alignItems: 'center', width: 80, height: 80, backgroundColor: '#333', borderRadius: 10 }}>
              <ActivityIndicator size='large' color='white' />
            </View>
          </View>
        </Modal>
    );
  }
}
