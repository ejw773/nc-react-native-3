import React, { useState } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
// import { CAMPSITES } from '../shared/campsites';
// import { COMMENTS } from '../shared/comments';
import { useGetCommentsQuery } from '../redux/apiSlice';
import { useGetCampsitesQuery } from '../redux/apiSlice';

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
                    source={require('./images/react-lake.jpg')}
                />
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon 
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raisedreverse
                    onPress={() => props.favorite ?
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        )
    }
    return <View />
}

const CampsiteInfo = ({ route, navigation }) => {
    const [favorite, setFavorite] = useState(false)
    const campsiteId = route.params.id
    // const [campsites, setCampsites] = useState(CAMPSITES);
    // const [comments, setComments] = useState(COMMENTS)
    const { data: campsites } = useGetCampsitesQuery();
    const { data: comments } = useGetCommentsQuery();
    const campsite = campsites.filter(campsite => campsite.id === campsiteId)[0];

    const markFavorite = () => {
        setFavorite(true);
    }

    return (
        <ScrollView>
            <RenderCampsite 
                campsite={campsite} 
                favorite={favorite}
                markFavorite={() => markFavorite()}
            />
            <RenderComments comments={comments} />
        </ScrollView>
    )
}

export default CampsiteInfo;