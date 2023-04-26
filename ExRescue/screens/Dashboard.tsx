import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    Modal,
    Button,

} from "react-native";
import axios from "axios";
const baseUrl = 'https://92aa-105-112-182-147.ngrok-free.app';

import {
    GooglePlaceDetail,
    GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import React, { useEffect } from "react";
import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";

const GOOGLE_API_KEY = 'AIzaSyDhsyXpKjq0A3ObpGeoSJAJpDno5dl_Kiw'
// https://docs.expo.dev/versions/latest/sdk/map-view/
// https://www.npmjs.com/package/react-native-google-places-autocomplete
// https://www.npmjs.com/package/react-native-maps-directions

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
    latitude: 40.76711,
    longitude: -73.979704,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

type InputAutocompleteProps = {
    label: string,
    placeholder?: string,
    onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

function InputAutocomplete({
    label,
    placeholder,
    onPlaceSelected,
}: InputAutocompleteProps) {
    return (
        <>
            <Text>{label}</Text>
            <GooglePlacesAutocomplete
                styles={{ textInput: styles.input }}
                placeholder={placeholder || ""}
                fetchDetails
                onPress={(data, details = null) => {
                    onPlaceSelected(details);
                }}
                query={{
                    key: GOOGLE_API_KEY,
                    language: "en",
                }}
            />
        </>
    );
}

export default function Dashboard() {
    const [origin, setOrigin] = useState<LatLng | null>();
    const [destination, setDestination] = useState<LatLng | null>();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [showDirections, setShowDirections] = useState(false);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const mapRef = useRef<MapView>(null);

    const moveTo = async (position: LatLng) => {
        const camera = await mapRef.current?.getCamera();
        if (camera) {
            camera.center = position;
            mapRef.current?.animateCamera(camera, { duration: 1000 });
        }
    };

    const edgePaddingValue = 70;

    const edgePadding = {
        top: edgePaddingValue,
        right: edgePaddingValue,
        bottom: edgePaddingValue,
        left: edgePaddingValue,
    };

    const traceRouteOnReady = (args: any) => {
        if (args) {
            // args.distance
            // args.duration
            setDistance(args.distance);
            setDuration(args.duration);
        }
    };

    const traceRoute = () => {
        if (origin && destination) {
            setShowDirections(true);
            mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
        }
    };

    const onPlaceSelected = (
        details: GooglePlaceDetail | null,
        flag: "origin" | "destination"
    ) => {
        const set = flag === "origin" ? setOrigin : setDestination;
        const position = {
            latitude: details?.geometry.location.lat || 0,
            longitude: details?.geometry.location.lng || 0,
        };
        set(position);
        moveTo(position);
        setLatitude(position.latitude);
        setLongitude(position.longitude);
    };
    const [currentPosition, setCurrentPosition] = useState<LatLng | null>();

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const position = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        setCurrentPosition(position);

        setOrigin(position);
        moveTo(position);
        setLatitude(position.latitude);
        setLongitude(position.longitude);
    };

    useEffect(() => {
        getLocation();
    }, []);
    const [users, setUsers] = useState<any>([]);
    const handleSearch = async () => {
        try {

            const response = await axios.post(`${baseUrl}/findUser`, { latitude, longitude });
            if (response.data.length === 0) {
                Alert.alert('No Users Found');
            }
            setUsers(response.data);
            setMessage(JSON.stringify(response.data));
            setModalVisible(true);

            //Alert.alert(JSON.stringify(response.data));
        } catch (error) {
            Alert.alert(error.toString());
        }
    }



    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_POSITION}
            >
                {origin && <Marker coordinate={origin} />}
                {destination && <Marker coordinate={destination} />}
                {showDirections && origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_API_KEY}
                        strokeColor="#6644ff"
                        strokeWidth={4}
                        onReady={traceRouteOnReady}
                    />
                )}
            </MapView>
            <View style={styles.searchContainer}>
                <InputAutocomplete
                    label="Search your location or use the button below"
                    onPlaceSelected={(details) => {
                        onPlaceSelected(details, "origin");
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={getLocation}>
                    <Text style={styles.buttonText}>Use your current location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Scan For Mechanics</Text>
                </TouchableOpacity>
                <Modal visible={modalVisible} animationType="slide">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{message}</Text>
                            <Text style={{ fontSize: 14, marginBottom: 10 }}>
                                Distance: {distance} | Duration: {duration}
                            </Text>
                            <Button title="Close" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={styles.button} onPress={traceRoute}>
                    <Text style={styles.buttonText}>Trace route</Text>
                </TouchableOpacity>
                {distance && duration ? (
                    <View>
                        <Text>Distance: {distance.toFixed(2)}</Text>
                        <Text>Duration: {Math.ceil(duration)} min</Text>
                    </View>
                ) : null}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    searchContainer: {
        position: "absolute",
        width: "90%",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: Constants.statusBarHeight,
    },
    input: {
        borderColor: "#888",
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#bbb",
        paddingVertical: 12,
        marginTop: 16,
        borderRadius: 4,
    },
    buttonText: {
        textAlign: "center",
    },
});
