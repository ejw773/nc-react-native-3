import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

const RenderCampsite = ({campsite}) => {
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
            </Card>
        )
    }
    return <View />
}

const CampsiteInfo = ({ route, navigation }) => {
    const campsiteId = route.params.id
    const [campsites, updateCampsites] = useState(CAMPSITES);
    const campsite = campsites.filter(campsite => campsite.id === campsiteId)[0];
    return (
        <RenderCampsite campsite={campsite} />
    )
}

export default CampsiteInfo;