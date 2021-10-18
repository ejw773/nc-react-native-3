import React from 'react';
import { baseUrl } from '../shared/baseUrl'
import { ListItem, Avatar } from 'react-native-elements';


const RenderPartner = ({item}) => {
    return (
        <ListItem>
            <Avatar source={{uri: baseUrl + item.image}}/>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
};

export default RenderPartner;