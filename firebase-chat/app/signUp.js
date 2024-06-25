import React, { useRef, useState } from 'react';
import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {
    const router = useRouter();
    const { register } = useAuth();
    const emailRef = useRef(""); // to store email and password
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");

    // to handle login process triggered everytime when clicks on sign in
    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
            Alert.alert('Sign Up', "please fill all the fields!");
            return;
        }
        // setLoading(true)
        let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
        // setLoading(false)
        // login process

        console.log('got result', response);
        if (!response.success) {
            Alert.alert('Sign Up', response.msg);
        }
    }

    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={[styles.container, { paddingTop: hp('7'), paddingHorizontal: wp('5') }]}>
                {/* {sign in image} */}
                <View style={styles.imageContainer}>
                    {/* <Image
                        source={require('../assets/images/login.avif')}
                        style={styles.image}
                        resizeMode="contain"
                    /> */}
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputContainer}>
                            <Feather name="user" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => usernameRef.current = value}
                                style={styles.input}
                                placeholder='username'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={styles.input}
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Octicons name="lock" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => passwordRef.current = value}
                                style={styles.input}
                                placeholder='Password'
                                secureTextEntry
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Feather name="image" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => profileRef.current = value}
                                style={styles.input}
                                placeholder='Profile url'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View>
                            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <Pressable onPress={() => router.push('signIn')}>
                                <Text style={styles.footerLink}>Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        height: hp('20'),
    },
    formContainer: {
        gap: 10,
    },
    title: {
        fontSize: hp(4),
        fontWeight: 'bold',
        letterSpacing: 1.5, 
        textAlign: 'center',
        color: '#4B5563', 
    },
    inputGroup: {
        gap: 4, // gap-4
    },
    inputContainer: {
        height: hp(7),
        flexDirection: 'row',
        gap: 4, 
        paddingHorizontal: 16, 
        backgroundColor: '#F3F4F6', 
        alignItems: 'center',
        borderRadius: 12,     },
    input: {
        flex: 1,
        fontSize: hp(2),
        fontWeight: '600', 
        color: '#4B5563', 
    },
    button: {
        height: hp(6.5),
        backgroundColor: '#6366F1', 
        borderRadius: 12, 
        justifyContent: 'center',
        alignItems: 'center', 
    },
    buttonText: {
        fontSize: hp(2.7),
        color: '#FFF', 
        fontWeight: 'bold', 
        letterSpacing: 1.5, 
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center', 
    },
    footerText: {
        fontSize: hp(1.8),
        fontWeight: '600', 
        color: '#9CA3AF', 
    },
    footerLink: {
        fontSize: hp(1.8),
        fontWeight: 'bold', 
        color: '#6366F1',
    },
});

