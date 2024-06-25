import { View, Text, StatusBar, TouchableOpacity, Alert , StyleSheet} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useAuth } from '../../context/authContext';
import MessageList from '../../components/MessageList';
import { TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { db } from '../../firebaseConfig'; // Assuming usersRef is imported from firebaseConfig
import CustomKeyboardView from '../../components/CustomKeyboardView';
import { getRoomId } from '../../utils/common';
import { Timestamp, setDoc, doc, collection, addDoc, orderBy, onSnapshot, query } from 'firebase/firestore';

export default function ChatRoom() {
  const item = useLocalSearchParams(); // Second user, this user is the user that we clicked on the chat list
  const { user } = useAuth(); // Currently logged in user
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const textRef = useRef(''); // Ref for message text input, doesn't cause re-renders
  const inputRef = useRef(null); // Ref for message input, to clear input after sending

  // useEffect to create the chatroom if it doesn't exist and fetch messages on mount
  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId); // Reference to the chatroom object
    const messagesRef = collection(docRef, 'messages'); // Reference to messages collection inside the chatroom
    const q = query(messagesRef, orderBy('createdAt', 'asc')); // Query to fetch messages in ascending order of createdAt

    let unsub = onSnapshot(q, (snapshot) => {
      // Snapshot listener to fetch and update messages in real-time
      let allMessages = snapshot.docs.map(doc => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    return unsub; // Unsubscribe from snapshot listener on component unmount
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Function to create chatroom if it doesn't exist
  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId); // Generate room ID based on user IDs
    await setDoc(doc(db, 'rooms', roomId), { // Create chatroom document if it doesn't exist
      roomId,
      createdAt: Timestamp.fromDate(new Date()) // Set createdAt timestamp for the chatroom
    });
  };

  // Function to handle sending messages
  const handleSendMessage = async () => {
    let message = textRef.current.trim(); // Get trimmed message text from textRef
    if (!message) return; // If message is empty, return

    try {
      let roomId = getRoomId(user?.userId, item?.userId); // Generate room ID based on user IDs
      const docRef = doc(db, 'rooms', roomId); // Reference to the chatroom object
      const messagesRef = collection(docRef, 'messages'); // Reference to messages collection inside the chatroom

      textRef.current = ''; // Clear the textRef after sending message
      if (inputRef.current) inputRef.current.clear(); // Clear input field after sending message

      const newDoc = await addDoc(messagesRef, { // Add new message document to messages collection
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()) // Set createdAt timestamp for the message
      });

      console.log('New message ID:', newDoc.id); // Log the ID of the new message document
    } catch (err) {
      Alert.alert('Message', err.message); // Alert user if there's an error sending the message
    }
  };

  console.log('Messages:', messages); // Log messages array for debugging

  return (
    <CustomKeyboardView inChat={true}>
      <View style={styles.container}>
        <StatusBar style='dark' />
        <ChatRoomHeader user={user} router={router} />
        <View style={styles.separator} />
        <View style={styles.mainContainer}>
          <View style={styles.messageHistory}>
            <MessageList messages={messages} currentUser={user} />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)} // Update textRef with current input value
                placeholder='Type message'
                style={styles.input}
              />
              <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

// Styles for components using StyleSheet.create for optimized rendering
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  separator: {
    height: hp(3),
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    overflow: 'visible',
  },
  messageHistory: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: hp(2.7),
    paddingTop: hp(2),
    paddingHorizontal: wp(3),
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    padding: hp(2),
    borderRadius: hp(8),
    paddingLeft: wp(5),
  },
  input: {
    fontSize: hp(2),
    flex: 1,
    marginRight: wp(2),
  },
  sendButton: {
    backgroundColor: '#CBD5E0',
    padding: hp(2),
    marginRight: wp(1),
    borderRadius: hp(8),
  },
});
