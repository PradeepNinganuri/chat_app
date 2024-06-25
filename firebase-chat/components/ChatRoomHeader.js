import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ChatRoomHeader({ user, router }) {
  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity onPress={() => router.back()}>
              {/* the above func takes us back to the previous screen */}
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
              <View style={styles.userInfoContainer}>
                {/* Uncomment and update Image component if needed
                <Image
                  source={{ uri: user?.profileUrl }}
                  style={styles.userImage}
                /> */}
                <Text style={[styles.usernameText, { fontSize: hp(2.5) }]}>
                  {user?.username}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4), 
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  userImage: {
    height: hp(4.5),
    aspectRatio: 1,
    borderRadius: 100,
  },
  usernameText: {
    color: '#525252',
  },
});
