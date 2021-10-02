import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { PARTNERS } from '../shared/partners';

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
    const [partners, setPartners] = useState(PARTNERS)
    console.log(partners);

    const renderPartner = ({item}) => {
        console.log(item.name);
        return (
            <ListItem>
                <Avatar source={require('./images/bootstrap-logo.png')}/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <ScrollView>
            <Mission />
            <Card>
                <Card.Title>Community Partners</Card.Title>
                <FlatList 
                    data={partners}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderPartner}
                />
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({});

export default About;
