import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

const HomeScreen = () => {
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);

    const toggleMenuModal = () => {
        setIsMenuModalVisible(!isMenuModalVisible);
    };

    const toggleProfileModal = () => {
        setIsProfileModalVisible(!isProfileModalVisible);
    };

    const toggleAvailability = () => {
        setIsAvailable(!isAvailable);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"dark-content"} />
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleMenuModal}>
                    <Ionicons name="menu" size={35} color="white" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.heading}>Express Rescue</Text>
                <TouchableOpacity onPress={toggleProfileModal}>
                    <Ionicons
                        name="person-circle-outline"
                        size={35}
                        color="white"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <TouchableOpacity style={styles.availabilityButton} onPress={toggleAvailability}>
                    <Text style={styles.availabilityText}>Set Availability</Text>
                    <View style={isAvailable ? styles.greenDot : styles.redDot} />
                </TouchableOpacity>
            </View>
            <Modal animationType="slide" transparent={true} visible={isMenuModalVisible} onRequestClose={toggleMenuModal}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={toggleMenuModal}>
                        <Ionicons name="close" size={28} color="white" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.menuHeading}>Menu</Text>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>App Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleProfileModal}>
                        <Text style={styles.menuHeading}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={isProfileModalVisible} onRequestClose={toggleProfileModal}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={toggleProfileModal}>
                        <Ionicons name="close" size={28} color="white" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.menuHeading}>Profile</Text>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Personal Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Payment Method</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>Notifications</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#A94400',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    icon: {
        padding: 5,
    },
    heading: {
        color: '#fff',
        fontSize: 24,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    availabilityButton: {
        backgroundColor: '#A94400',
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    availabilityText: {
        color: '#fff',
        fontSize: 20,
        marginRight: 20,
    },
    greenDot: {
        backgroundColor: 'green',
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    redDot: {
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    modal: {
        backgroundColor: '#A94400',
        height: '50%',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop: '50%',
    },
    menuHeading: {
        color: '#fff',
        fontSize: 24,
        marginVertical: 10,
    },
    menuItem: {
        marginVertical: 10,
    },
    menuText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default HomeScreen;




