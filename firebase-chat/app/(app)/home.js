import { View, Text, Button, Pressable, StatusBar, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    // Fetch users
    // Create a query to fetch all users except the currently logged in user
    const q = query(usersRef, where('userId', '!=', user?.uid));

    // Fetch data using the query
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    console.log('Got users:', data);
    setUsers(data); // Set users state with fetched data
  };

  console.log('User data:', user);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style='light' />

      {/* Conditional rendering based on users state */}
      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: hp(30) }}>
          <ActivityIndicator size='large' />
        </View>
      )}
    </View>
  );
}
