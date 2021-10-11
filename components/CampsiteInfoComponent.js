import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useGetCommentsQuery } from '../redux/apiSlice';
import { useGetCampsitesQuery } from '../redux/apiSlice';
import { baseUrl } from '../shared/baseUrl';

const RenderComments = ({comments}) => {
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating}</Text>
                <Text style={{fontSize: 12}}>{` ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }
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
    const [favorite, setFavorite] = useState(false)
    const campsiteId = route.params.id
    const { data: campsites, isLoading: campsitesLoadingStatus } = useGetCampsitesQuery();
    const { data: comments, isLoading: commentsLoadingStatus } = useGetCommentsQuery();
    const campsite = campsites.filter(campsite => campsite.id === campsiteId)[0];
    const markFavorite = () => {
        setFavorite(!favorite);
    }

    return (
        <ScrollView>
            <RenderCampsite 
                campsite={campsite} 
                favorite={favorite}
                markFavorite={() => markFavorite()}
            />
            {commentsLoadingStatus && <Text>Comments Are Loading...</Text>}
            <RenderComments comments={comments} status={commentsLoadingStatus} />
        </ScrollView>
    )
}

export default CampsiteInfo;