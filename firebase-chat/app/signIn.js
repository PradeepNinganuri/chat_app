import React, { useRef, useState } from 'react';
import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Pressable, Alert, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignIn() {
    const router = useRouter();
    const emailRef = useRef(""); // to store email and password
    const passwordRef = useRef("");
    const { login } = useAuth();

    // to handle login process triggered everytime when clicks on sign in
    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', "please fill all the fields!");
            return;
        }
        // setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);

        // setLoading(false)
        console.log('sign in response:', response);
        if (!response.success) {
            Alert.alert('Sign In', response.msg);
        }
        // login process
    }

    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={styles.container}>
                {/* {sign in image} */}
                <View style={styles.imageContainer}>
                    {/* <Image 
                        source={require('../assets/images/login.avif')}
                        style={styles.image}
                        resizeMode="contain"
                    /> */}
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign In</Text>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputContainer}>
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={styles.input}
                                placeholder='Email address'
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={styles.passwordGroup}>
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
                            <Text style={styles.forgotPassword}>forgot password?</Text>
                        </View>

                        <View>
                            <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
                                <Text style={styles.signInButtonText}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Don't have an account? </Text>
                            <Pressable onPress={() => router.push('signUp')}>
                                <Text style={styles.signUpLink}>Sign Up</Text>
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
        paddingTop: hp('8'),
        paddingHorizontal: wp('5'),
        flex: 1,
        gap: 12,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        height: hp('25'),
    },
    formContainer: {
        gap: 10,
    },
    title: {
        fontSize: hp(4),
        fontWeight: 'bold',
        letterSpacing: 1.5,
        textAlign: 'center',
        color: '#4B5563', // text-neutral-800
    },
    inputGroup: {
        gap: 4,
    },
    inputContainer: {
        height: hp(7),
        flexDirection: 'row',
        gap: 4,
        paddingHorizontal: 16, // px-4
        backgroundColor: '#F3F4F6', // bg-neutral-100
        alignItems: 'center',
        borderRadius: 12, // rounded-xl
    },
    input: {
        flex: 1,
        fontSize: hp(2),
        fontWeight: '600', // font-semibold
        color: '#4B5563', // text-neutral-700
    },
    passwordGroup: {
        gap: 3,
    },
    forgotPassword: {
        fontSize: hp(1.8),
        fontWeight: '600', // font-semibold
        textAlign: 'right',
        color: '#9CA3AF', // text-neutral-500
    },
    signInButton: {
        height: hp(6.5),
        backgroundColor: '#6366F1', // bg-indigo-500
        borderRadius: 12, // rounded-xl
        justifyContent: 'center',
        alignItems: 'center', // items-center
    },
    signInButtonText: {
        fontSize: hp(2.7),
        color: '#FFF', // text-white
        fontWeight: 'bold', // font-bold
        letterSpacing: 1.5, // tracking-wider
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpText: {
        fontSize: hp(1.8),
        fontWeight: '600', // font-semibold
        color: '#9CA3AF', // text-neutral-500
    },
    signUpLink: {
        fontSize: hp(1.8),
        fontWeight: 'bold', // font-bold
        color: '#6366F1', // text-indigo-500
    },
});
