import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import RegisterScreen from './RegisterScreen';

const WelcomeScreen = ({ navigation }) => {
    const handleMechanic = () => {
        // navigate to mechanic screen
        navigation.navigate('Register', { userType: 'mechanic' });

    };

    const handleTowTruckDriver = () => {
        // navigate to tow truck driver screen
        navigation.navigate('Register', { userType: 'towTruckDriver' });
    };

    const handleVehicleOwner = () => {
        // navigate to vehicle owner screen
        navigation.navigate('Register', { userType: 'vehicleOwner' });
    };
    const handleHome = () => {
        // navigate to home screen
        navigation.navigate('HomeScreen');
    };
    const handleDashboard = () => {
        // navigate to home dashboard screen
        navigation.navigate('Dashboard');
    };
    const handleSearch = () => {
        //navigate to search screen
        navigation.navigate('components');
    };
    const handleLogin = () => {
        //navigate to login screen
        navigation.navigate('Login');
    };



    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome To</Text>
                <Text style={styles.appName}>Express Rescue</Text>
            </View>
            <Image style={styles.logo} source={require('../assets/express-logo.jpg')} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>I am a mechanic</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>I am a tow truck driver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>I am a vehicle owner</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDashboard}>
                    <Text style={styles.buttonText}>Go to Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleHome}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A94400',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 50,
    },
    welcomeText: {
        fontSize: 30,
        color: '#fff',
    },
    appName: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 50,
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default WelcomeScreen;
