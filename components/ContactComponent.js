import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

const Contact = () => {
    return (
        <ScrollView>
            <Card
                wrapperStyle={{margin: 20}}
            >
                <Card.Title>Contact Information</Card.Title>
                <Text>
                    1 Nucamp Way
                </Text>
                <Text>
                    Seattle, WA 98001
                </Text>
                <Text style={{marginBottom: 10}}>
                    U.S.A.
                </Text>
                <Text>
                    Phone: 1-206-555-1234
                </Text>
                <Text>
                    Email: campsites@nucamp.co
                </Text>
            </Card>
        </ScrollView>
    )
}



const styles = StyleSheet.create({});

export default Contact;
