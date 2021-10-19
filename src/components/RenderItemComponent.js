import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from '../components/LoadingComponent';

const RenderItem = (props) => {
    console.log(props.item);
    if (props.status === 'loading') {
        return <Loading />
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.itemType}: {props.errMess}</Text>
            </View>
        )
    }
    if (props.item) {
        return (
            <Card>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Image 
                    source={require('../images/chrome-river.jpg')}
                />
                <Text style={styles.textStyle}>
                    {props.item.description}
                </Text>
            </Card>
        )
    }
    return <View />;
}

const styles = StyleSheet.create({
    textStyle: {
        margin: 10
    }
});

export default RenderItem;
