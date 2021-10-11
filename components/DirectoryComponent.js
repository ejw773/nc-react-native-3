import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampsites } from '../redux/campsitesSlice';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';

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
    return (
        <FlatList 
            data={campsites.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default Directory;