import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const RenderComments = ({comments, status, errMess}) => {
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating 
                    readonly
                    startingValue={item.rating}
                    imageSize={10}
                    style={{alignItems: 'flex-start', paddingVertical: '5%'}}
                />
                <Text style={{fontSize: 12}}>{` ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    if (status === 'loading') {
        return (
            <Card>
                <Card.Title>Comments</Card.Title>
                <Loading />
            </Card>
        )
    }

    if (status === 'failed') {
        return <Text>{errMess}</Text>
    }

    if (comments) {
        return (
            <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
                <Card>
                    <Card.Title>Comments</Card.Title>
                    <FlatList
                        data={comments}
                        renderItem={renderCommentItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </Animatable.View>
        )
    }

}

export default RenderComments;