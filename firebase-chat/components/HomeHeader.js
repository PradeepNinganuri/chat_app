import { View, Text, Platform, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import { AntDesign } from '@expo/vector-icons';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { Feather } from '@expo/vector-icons';

const ios = Platform.OS == 'ios';

export default function HomeHeader() {
    const {user,logout}= useAuth();
    const { top } = useSafeAreaInsets();
    const handleProfile=()=>{

    }
    const handleLogout=async()=>{
        await logout();

    }
    return (
        <View style={[styles.container, { paddingTop: ios ? top : top + 10 }]}>
            <View>
                <Text style={styles.text}>Chats</Text>
            </View>
            <View>
            <Menu>
      <MenuTrigger customStyles={{
        triggerWrapper:{
            //trigger wrapper styles
        }
      }} >
      <Image
                    style={styles.image}
                    source={user?.profileUrl}
                    placeholder={{ blurhash }}
                    transition={500}
                />
      </MenuTrigger>
      <MenuOptions
      customStyles={{
      optionsContainer:{
      borderRadius:10,
      borderCurve:'continuous',
      marginTop:40,
      marginLeft:-30,
      backgroundColor:'white',
      shadowOpacity:0.2,
      shadowOffset:{width:0,height:0},
    //   width:180,
      }
      }}
      >
       <MenuItem
        text='Profile'
        action={handleProfile}
        value={null}
        icon={<Feather name='user' size={hp(2.5)} color='#737373'/>} 
       />
       <Divider/>

<MenuItem
        text='Sign Out'
        action={handleLogout}
        value={null}
        icon={<AntDesign name='logout' size={hp(2.5)} color='#737373'/>} 
       />
      </MenuOptions>
    </Menu>
                
            </View>
        </View>
    )
}

const Divider=()=>{
return(
<View className="p-[1px],w-full,bg-neutral-200"/>
)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20, 
        backgroundColor: '#6366F1', 
        paddingBottom: 24,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    text: {
        fontSize: hp(3),
        fontWeight: '500',
        color: '#fff'
    },
   image: {
        height: hp(8), 
        width: hp(8),  
        borderRadius: hp(6),  
    }
});










































