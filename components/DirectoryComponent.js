import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampsites } from '../redux/campsitesSlice';
import { View, FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const Directory = ({ navigation }) => {
    const campsites = useSelector((state) => state.campsites);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCampsites())
    }, [dispatch])
    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem 
                button onPress={() => navigation.navigate('Campsite', {
                    id: item.id
                })}
            >
                <Avatar source={{ uri: baseUrl + item.image}} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    if (campsites.status === 'loading') {
        return (
            <Loading />
        )
    };

    if (campsites.errMess) {
        return (
            <View>
                <Text>Error: {campsites.errMess}</Text>
            </View>
        )
    }

    if (campsites.campsites) {
        return (
            <FlatList 
                data={campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default Directory;