import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';
import { useGetCampsitesQuery } from '../redux/apiSlice';
import { useGetPromotionsQuery } from '../redux/apiSlice';
import { useGetPartnersQuery } from '../redux/apiSlice';

const RenderItem = ({item}) => {
    if (item) {
        return (
            <Card>
                <Card.Title>{item.name}</Card.Title>
                <Card.Image 
                    source={require('./images/react-lake.jpg')}
                />
                <Text style={styles.textStyle}>
                    {item.description}
                </Text>
            </Card>
        )
    }
    return <View />;
}

const Home = () => {
    // const [campsites, setCampsites] = useState(CAMPSITES);
    // const [promotions, setPromotions] = useState(PROMOTIONS);
    // const [partners, setPartners] = useState(PARTNERS);

    const { data: campsites } = useGetCampsitesQuery();
    const { data: partners } = useGetPartnersQuery();
    const { data: promotions } = useGetPromotionsQuery();

    if (campsites && partners && promotions) {
        
        return (
            <ScrollView>
                <RenderItem
                    item={campsites.filter(campsite => campsite.featured)[0]}
                />
                <RenderItem
                    item={promotions.filter(promotion => promotion.featured)[0]}
                />
                <RenderItem
                    item={partners.filter(partner => partner.featured)[0]}
                />
            </ScrollView>
        )
    } else {
        return (
            <Text>Loading...</Text>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        margin: 10
    }
});

export default Home;