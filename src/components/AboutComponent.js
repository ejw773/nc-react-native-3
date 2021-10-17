import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { fetchPartners } from '../redux/partnersSlice';
import { Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'
import * as Animatable from 'react-native-animatable';

const Mission = () => {
    return (
        <Card>
            <Card.Title>Our Mission</Card.Title>
            <Text style={{margin: 10}}>
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    )
}

const About = () => {
    const partners = useSelector((state) => state.partners);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPartners())
      }, [dispatch])
    
    const renderPartner = ({item}) => {
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

    if (partners.status === 'loading') {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Loading />
                </Card>
            </ScrollView>
        )
    };

    if (partners.errMess) {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card>
                        <Card.Title>Community Partners</Card.Title>
                        <Text>{partners.errMess}</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }

    return (
        <ScrollView>
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <FlatList 
                        data={partners.partners}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderPartner}
                    />
                </Card>
            </Animatable.View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({});

export default About;
