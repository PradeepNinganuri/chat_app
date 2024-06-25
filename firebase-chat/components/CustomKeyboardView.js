import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

export default function CustomKeyboardView({ children ,inChat}) {
  let kavConfig={};
  let scrollViewConfig={};
  if(inChat){
    kavConfig={keyboardVerticalOffset:90};
    scrollViewConfig={ontentContainerStyle:{flex:1}};
  }
  return (
   

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      
      style={{ flex: 1 }}
      {...kavConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
