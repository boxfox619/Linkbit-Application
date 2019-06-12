import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';

export default ProgressDialog = ({ visible, label }) => (
    <Modal onRequestClose={() => null} visible={visible}>
      <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: '200' }}>{label || 'loading'}</Text>
          <ActivityIndicator size="large" />
        </View>
        </View>
    </Modal>
);