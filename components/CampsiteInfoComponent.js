import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../redux/commentsSlice'
import { postComment } from '../redux/commentsSlice';
import { postFavorite } from '../redux/favoritesSlice';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, PanResponder, Alert } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
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

const RenderCampsite = (props) => {
    const {campsite} = props;
    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
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
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} {...panResponder.panHandlers}>
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

const CampsiteInfo = ({ route, navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [inputText, setInputText] = useState('');
    const campsiteId = route.params.id
    const campsites = useSelector((state) => state.campsites);
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const toggleModal = () =>  {
        setShowModal(!showModal);
    }

    const handleComment = (campsiteId) => {
        let randomNum = comments.comments.length;
        dispatch(postComment(campsiteId, rating, author, inputText, randomNum))
        toggleModal();
    }

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setInputText('');
    }

    useEffect(() => {
        dispatch(fetchComments())
    }, [dispatch])

    if (campsites.status === 'loading') {
        return <Loading />
    }

    if (campsites.campsites) {
        const campsite = campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const theseComments = comments.comments.filter(comment => comment.campsiteId === campsiteId);
        const markFavorite = () => {
            dispatch(postFavorite(campsiteId))
        }

        return (
            <ScrollView>
                <RenderCampsite 
                    campsite={campsite} 
                    favorite={favorites.favorites.includes(campsiteId)}
                    markFavorite={() => markFavorite(campsiteId)}
                    onShowModal={() => toggleModal()}
                />
                <RenderComments status={comments.status} comments={theseComments} errMess={comments.errMess}/>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating 
                            showRating
                            startingValue={rating}
                            imageSize={40}
                            onFinishRating={rating => setRating(rating)}
                            style={{paddingVertical: 10}}
                        />
                        <Input 
                            placeholder={'Author'}
                            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(text) => setAuthor(text)}
                            value={author}
                        />
                        <Input 
                            placeholder={'Comment'}
                            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={(text) => setInputText(text)}
                            value={inputText}
                        />
                        <View style={{margin: 10}}>
                            <Button 
                                title='Submit'
                                onPress={() => {
                                    handleComment(campsiteId);
                                    resetForm();
                                }}
                                color='#5637DD'
                            />
                            <Button 
                                title='Cancel'
                                onPress={() => {
                                    toggleModal();
                                    resetForm();
                                }}
                                color='#808080'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default CampsiteInfo;