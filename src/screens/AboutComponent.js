import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { fetchPartners } from '../redux/partnersSlice';
import { Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import Mission from '../components/MissionComponent'
import RenderPartner from '../components/RenderPartnerComponent'
import * as Animatable from 'react-native-animatable';

const About = () => {
    const partners = useSelector((state) => state.partners);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPartners())
      }, [dispatch])
    
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
                        renderItem={RenderPartner}
                    />
                </Card>
            </Animatable.View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({});

export default About;
