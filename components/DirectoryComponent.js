import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useGetCampsitesQuery } from '../redux/apiSlice';
import { baseUrl } from '../shared/baseUrl';

const Directory = ({ navigation }) => {
    const { data: campsites } = useGetCampsitesQuery();
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
            data={campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default Directory;