import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from  'react-redux';
import { fetchCampsites } from '../redux/campsitesSlice';
import { fetchPartners } from '../redux/partnersSlice';
import { fetchPromotions } from '../redux/promotionsSlice';
import { View, Text, Animated, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from './LoadingComponent';

const RenderItem = (props) => {
    if (props.status === 'loading') {
        return <Loading />
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.itemType}: {props.errMess}</Text>
            </View>
        )
    }
    if (props.item) {
        return (
            <Card>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Image 
                    source={require('./images/react-lake.jpg')}
                />
                <Text style={styles.textStyle}>
                    {props.item.description}
                </Text>
            </Card>
        )
    }
    return <View />;
}

const Home = () => {
    const [scaleValue, setScaleValue] = useState(new Animated.Value(0))
    const campsites = useSelector((state) => state.campsites)
    const partners = useSelector((state) => state.partners)
    const promotions = useSelector((state) => state.promotions)
    const dispatch = useDispatch();
    const animate = () => {
        Animated.timing(
            setScaleValue({
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            })
        ).start();
    }

    useEffect(() => {
        dispatch(fetchCampsites())
        dispatch(fetchPartners())
        dispatch(fetchPromotions())
        //animate()
    }, [dispatch])
    
    return (
        <ScrollView>
            <RenderItem
                item={campsites.campsites.filter(campsite => campsite.featured)[0]}
                status={campsites.status}
                errMess={campsites.errMess}
                itemType='Campsites'
            />
            <RenderItem
                item={promotions.promotions.filter(promotion => promotion.featured)[0]}
                status={promotions.status}
                errMess={promotions.errMess}
                itemType='Promotions'
            />
            <RenderItem
                item={partners.partners.filter(partner => partner.featured)[0]}
                status={partners.status}
                errMess={partners.errMess}
                itemType='Partners'
            />
        </ScrollView>
    )
}

// Home.navigationOptions = {
//     title: 'Home'
// }

const styles = StyleSheet.create({
    textStyle: {
        margin: 10
    }
});

export default Home;