import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import Image from './images/react-lake.jpg';

const Directory = ({ navigation }) => {
    const [campsites, setCampsites] = useState(CAMPSITES)

    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem button onPress={() => navigation.navigate('Campsite')}>
                <Avatar source={require('./images/react-lake.jpg')} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            // <ListItem
            //     title={item.name}
            //     // subtitle={item.description}
            //     // onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
            //     // leftAvatar={{ source: Image }}
            // />
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