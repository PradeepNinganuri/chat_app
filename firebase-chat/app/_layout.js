import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {Slot, useSegments,useRouter} from 'expo-router'
import { AuthContextProvider, useAuth } from '../context/authContext'
import { MenuProvider } from 'react-native-popup-menu';

//this layout needs to wrap inside context provider
const MainLayout=()=>{
const{isAuthenticated}=useAuth();
const segments=useSegments();//return array of all segments in current route
const router=useRouter()//we use router to redirect user where ever we want


//this hook triggered everytime when auth state changes
useEffect(()=>{
//check if user authenticated or not
if(typeof isAuthenticated=='undefined') return;
const inApp=segments[0]=='(app)';//this mean user currently in app group
//user authenticated and not in app group then redirect to home
if(isAuthenticated && !inApp){
//redirect to home,we use replace so that user dont go back to loading state
router.replace('home');

}else if(isAuthenticated==false){
    //if user not authnticated redirect to sign in page
    router.replace('signIn')

}


},[isAuthenticated])
//retun slot component that will render all of our children
return <Slot />
}
export default function RootLayout() {
  return (
    <MenuProvider>
<AuthContextProvider>
        <MainLayout />
    </AuthContextProvider>
    </MenuProvider>
    
  )
}