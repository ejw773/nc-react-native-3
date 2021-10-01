import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import lakeImage from './images/react-lake.jpg'

const RenderCampsite = ({campsite}) => {
    console.log(campsite);
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
                // featuredTitle={campsite.name}
                // image={Image}
                // image={require('./images/react-lake.jpg')}
        )
    }
    return <View />
}

const CampsiteInfo = () => {
    const [campsites, updateCampsites] = useState({CAMPSITES});
    const campsiteId = 1;
    const campsite = campsites.CAMPSITES.filter(campsite => campsite.id === campsiteId)[0];
    return (
        <RenderCampsite campsite={campsite} />
    )
}

export default CampsiteInfo;