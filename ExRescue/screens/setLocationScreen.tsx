import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
//import { setLocation } from './api'; // import the API function for setting location

const MapScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    const handleSetLocation = async () => {
        if (currentLocation) {
            try {
                await setCurrentLocation(currentLocation); // call the API function to set location
                alert('Location set successfully!');
            } catch (error) {
                console.log(error);
                alert('Failed to set location.');
            }
        } else {
            alert('Unable to set location. Please try again later.');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {currentLocation && (
                <MapView style={{ flex: 1 }} initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    <Marker coordinate={currentLocation} />
                </MapView>
            )}
            <View style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                <Button title="Set Location" onPress={handleSetLocation} />
            </View>
        </View>
    );
};

export default MapScreen;
