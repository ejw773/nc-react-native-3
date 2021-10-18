import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../redux/commentsSlice'
import { postComment } from '../redux/commentsSlice';
import { postFavorite } from '../redux/favoritesSlice';
import { View, ScrollView, Modal, Button, StyleSheet } from 'react-native';
import { Rating, Input } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import RenderComments from '../components/RenderCommentsComponent';
import RenderCampsite from '../components/RenderCampsiteComponent';

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
                    favorite={favorites.includes(campsiteId)}
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
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default CampsiteInfo;