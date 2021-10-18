import React from 'react';
import { Text, View, PanResponder, Alert, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';


const RenderCampsite = (props) => {
    const {campsite} = props;
    const view = React.createRef();
    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + campsite.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                )
            }
            return true;
        }
    })
    if (campsite) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} ref={view} {...panResponder.panHandlers}>
                <Card>
                    <Card.Title>{campsite.name}</Card.Title>
                    <Card.Image 
                        source={{uri: baseUrl + campsite.image}}
                    />
                    <Text style={{margin: 10}}>
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon 
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => props.markFavorite()}
                        />
                        <Icon 
                            name='pencil'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
        )
    }
    return <View />
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    }
})

export default RenderCampsite;