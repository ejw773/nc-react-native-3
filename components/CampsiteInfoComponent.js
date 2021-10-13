import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../redux/commentsSlice'
import { postFavorite } from '../redux/favoritesSlice';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const RenderComments = ({comments, status, errMess}) => {
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating}</Text>
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
            <Card>
                <Card.Title>Comments</Card.Title>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        )
    }

}

const RenderCampsite = (props) => {
    const {campsite} = props;
    if (campsite) {
        return (
            <Card>
                <Card.Title>{campsite.name}</Card.Title>
                <Card.Image 
                    source={{uri: baseUrl + campsite.image}}
                />
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon 
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raisedreverse
                    onPress={() => props.markFavorite()}
                />
            </Card>
        )
    }
    return <View />
}

const CampsiteInfo = ({ route, navigation }) => {
    // const [favorite, setFavorite] = useState(false)
    const campsiteId = route.params.id
    const campsites = useSelector((state) => state.campsites);
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchComments())
    }, [dispatch])

    if (campsites.status === 'loading') {
        return <Loading />
    }

    if (campsites.campsites) {

        const campsite = campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const markFavorite = () => {
            dispatch(postFavorite(campsiteId))
        }

        return (
            <ScrollView>
                <RenderCampsite 
                    campsite={campsite} 
                    favorite={favorites.favorites.includes(campsiteId)}
                    markFavorite={() => markFavorite(campsiteId)}
                />
                <RenderComments status={comments.status} comments={comments.comments} errMess={comments.errMess}/>
            </ScrollView>
        )
    }
}

export default CampsiteInfo;