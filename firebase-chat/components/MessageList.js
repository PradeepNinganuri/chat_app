import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import MessageItem from './MessageItem'

export default function MessageList({messages,currentUser}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:10}}>
      {/* it wil loop through all the massages */}
      {messages.map((message,index)=>{
        return(
          <MessageItem message={message} key={index} currentUser={currentUser}/>
        )

      })}
    </ScrollView>
  )
}