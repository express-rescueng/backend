import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const IntroScreen = ({ navigation }) => {
    const imageAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(imageAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(imageAnim, {
                    toValue: -1,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(imageAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [imageAnim]);

    const Dots = ({ selected }) => {
        let backgroundColor;

        backgroundColor = selected ? '#F54B64' : '#C4C4C4';

        return (
            <View
                style={{
                    width: 5,
                    height: 5,
                    marginHorizontal: 3,
                    backgroundColor,
                    borderRadius: 5,
                }}
            />
        );
    };

    const Skip = ({ ...props }) => (
        <Text style={{ color: '#fff', fontSize: 16, marginRight: 10, marginLeft: 10 }} {...props}>
            Skip
        </Text>
    );

    const Next = ({ ...props }) => (
        <Text style={{ color: '#fff', marginRight: 10, fontSize: 16, marginLeft: 10 }} {...props}>
            Next
        </Text>
    );

    const Done = ({ ...props }) => (
        <Text style={{ color: '#fff', marginRight: 10, fontSize: 16, marginLeft: 10 }} {...props}>
            Done
        </Text>
    );

    return (
        <Onboarding
            onSkip={() => navigation.navigate('Welcome')}
            onDone={() => navigation.navigate('Welcome')}
            pages={[{
                backgroundColor: '#A94400', image: (<Animated.Image source={require('../assets/express-logo.jpg')} style={[styles.image, {
                    transform: [{
                        translateX: imageAnim.interpolate({
                            inputRange: [-1, 0, 1],
                            outputRange: [-150, 0, 150],
                        })
                    }]
                }]}
                />
                ),
                title: 'Welcome to Express Rescue!!',
                subtitle: 'The 911 for you Automobile',
                titleStyles: styles.title,
                subTitleStyles: styles.subtitle,
            },
            {
                backgroundColor: '#A94400',
                image: (
                    <Animated.Image
                        source={require('../assets/need.png')}
                        style={[styles.image, {
                            transform: [{
                                translateX: imageAnim.interpolate({
                                    inputRange: [-1, 0, 1],
                                    outputRange: [-150, 0, 150],
                                })
                            }]
                        }]}
                    />
                ),
                title: 'Need expert auto service for your car??',
                subtitle: 'Ran into unexpected vehicle breakdown?',
                titleStyles: styles.title,
                subTitleStyles: styles.subtitle,
            },
            {
                backgroundColor: '#A94400',
                image: (
                    <Animated.Image
                        source={require('../assets/got-you.png')}
                        style={[styles.image, {
                            transform: [{
                                translateX: imageAnim.interpolate({
                                    inputRange: [-1,

                                        0, 1],
                                    outputRange: [-150, 0, 150],
                                })
                            }]
                        }]}
                    />
                ),
                title: 'We’ve got you covered!',
                subtitle: 'Our professionals are ready to help 24/7',
                titleStyles: styles.title,
                subTitleStyles: styles.subtitle,
            },
            ]}
            DotComponent={Dots}
            showSkip={true}
            showNext={true}
            showDone={true}
            renderSkipButton={Skip}
            renderNextButton={Next}
            renderDoneButton={Done}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        height: 250,
        width: 250,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
    },
});

export default IntroScreen;