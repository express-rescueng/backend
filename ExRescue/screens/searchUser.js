import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, ActivityIndicator, Platform } from 'react-native';

const baseUrl = 'https://92aa-105-112-182-147.ngrok-free.app';

function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [NIN, setNIN] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true)


        try {
            //Alert.alert('started try block');
            const response = await fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    confirmPassword,
                    firstName,
                    lastName,
                    phone,
                    NIN,
                    latitude,
                    longitude
                }),
            });

            const data = await response.json();
            Alert.alert(data, "finished try block")




            if (data.error) {
                Alert.alert('Error', data.error);
            } else if (response.status == 200) {
                //Alert.alert("Sucesss", data.toString())
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log(error);
            // Alert.alert(error.toString())
        } finally {
            setLoading(false)
        }
    };



    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={setFirstName}
                    value={firstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={setLastName}
                    value={lastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    onChangeText={setPhone}
                    value={phone}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="NIN"
                    onChangeText={setNIN}
                    value={NIN}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    onChangeText={setLatitude}
                    value={latitude}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    onChangeText={setLongitude}
                    value={longitude}
                    keyboardType="numeric"
                />
                {loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                )}
                < TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Already have an account? Log in</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    link: {
        color: 'blue',
        marginTop: 20,
    },
});


export default RegisterScreen;