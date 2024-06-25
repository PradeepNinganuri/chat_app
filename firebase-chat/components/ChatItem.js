import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';

export default function ChatItem({ item, router, noBorder }) {
  const openChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: item });
  };

  return (
    <TouchableOpacity onPress={openChatRoom} style={[styles.container, noBorder && styles.noBorder]}>
      {/* Uncomment and update the Image component if needed
      <Image
        source={{ uri: item?.profileUrl }}
        style={[styles.image, { height: hp(6), width: hp(6) * 1.5 }]}
      /> */}

      {/* Uncomment and update the Image component if needed
      <Image 
        style={[styles.image, { height: hp(6), width: hp(6) * 1.5, borderRadius: 100 }]}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
      /> */}

      {/* Name and last message */}
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Text style={[styles.usernameText, { fontSize: hp(1.8) }]}>
            {item?.username}
          </Text>
          <Text style={[styles.timeText, { fontSize: hp(1.6) }]}>
            Time
          </Text>
        </View>
        <Text style={[styles.lastMessageText, { fontSize: hp(1.6) }]}>
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    alignItems: 'center',
    marginBottom: hp(2),
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  image: {
    borderRadius: hp(6) / 2,
  },
  textContainer: {
    flex: 1,
    gap: hp(1),
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usernameText: {
    fontWeight: '600', 
    color: '#1F2937', 
  },
  timeText: {
    fontWeight: '500',
    color: '#6B7280', 
  },
  lastMessageText: {
    fontWeight: '500', 
    color: '#6B7280', 
  },
});
