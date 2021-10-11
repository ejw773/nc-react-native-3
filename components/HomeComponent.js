import React, { useEffect } from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { fetchCampsites } from '../redux/campsitesSlice';
import { fetchPartners } from '../redux/partnersSlice';
import { fetchPromotions } from '../redux/promotionsSlice';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from './LoadingComponent';

const RenderItem = ({item}) => {
    console.log(item);
    if (item.isLoading !== null) {
        return <Loading />
    }
    if (item.errMess) {
        return (
            <View>
                <Text>{item.errMess}</Text>
            </View>
        )
    }
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
    const campsites = useSelector((state) => state.campsites);
    const partners = useSelector((state) => state.partners);
    const promotions = useSelector((state) => state.promotions)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCampsites())
        dispatch(fetchPartners())
        dispatch(fetchPromotions())
    }, [dispatch])

    return (
        <ScrollView>
            <RenderItem
                item={ campsites.campsites.length >= 1 ? campsites.campsites.filter(campsite => campsite.featured)[0] : null }
                isLoading={campsites.isLoading}
                errMess={campsites.errMess}
            />
            <RenderItem
                item={ promotions.promotions.length >= 1 ? promotions.promotions.filter(promotion => promotion.featured)[0] : null }
                isLoading={promotions.isLoading}
                errMess={promotions.errMess}
            />
            <RenderItem
                item={ partners.partners.length >= 1 ? partners.partners.filter(partner => partner.featured)[0] : null }
                isLoading={partners.isLoading}
                errMess={partners.errMess}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        margin: 10
    }
});

export default Home;