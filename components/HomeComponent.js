import React, { useEffect } from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { fetchCampsites } from '../redux/campsitesSlice';
import { fetchPartners } from '../redux/partnersSlice';
import { fetchPromotions } from '../redux/promotionsSlice';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from './LoadingComponent';

const RenderItem = ({item}) => {
    if (item.status === 'loading') {
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
    const campsites = useSelector((state) => state.campsites)
    const partners = useSelector((state) => state.partners)
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
                item={campsites.campsites.filter(campsite => campsite.featured)[0]}
                status={campsites.status}
                errMess={campsites.errMess}
            />
            <RenderItem
                item={promotions.promotions.filter(promotion => promotion.featured)[0]}
                status={promotions.status}
                errMess={promotions.errMess}
            />
            <RenderItem
                item={partners.partners.filter(partner => partner.featured)[0]}
                status={partners.status}
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