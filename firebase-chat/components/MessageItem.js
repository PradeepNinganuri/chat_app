import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MessageItem({ message, currentUser }) {
  // user id who send this message
  if (currentUser?.user == message?.userId) {
    return (
      // my message
      <View style={styles.myMessageContainer}>
        <View style={{ width: wp(80) }}>
          <View style={styles.myMessage}>
            <Text style={{ fontSize: hp(1.9) }}>
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[{ width: wp(80) }, styles.otherMessageContainer]}>
        <View style={styles.otherMessage}>
          <Text style={{ fontSize: hp(1.9) }}>
            {message?.text}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
    marginRight: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderColor: '#e5e5e5',
    borderWidth: 1,
  },
  otherMessageContainer: {
    marginLeft: 12,
    marginBottom: 12,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ebf4ff',
    borderColor: '#c3dafe',
    borderWidth: 1,
  },
});
