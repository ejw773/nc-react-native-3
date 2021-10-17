import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampsites } from '../redux/campsitesSlice';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';

const Directory = ({ navigation }) => {
    const campsites = useSelector((state) => state.campsites);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCampsites())
    }, [dispatch])
    const renderDirectoryItem = ({item}) => {
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                <Tile 
                    button onPress={() => navigation.navigate('Campsite', {
                        id: item.id
                    })}
                    imageSrc={{ uri: baseUrl + item.image}}
                    title={item.name}
                    featured
                    caption={item.description}
                />
                    {/* <Avatar source={{ uri: baseUrl + item.image}} /> */}
                    {/* <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </Tile> */}
            </Animatable.View>
        )
    }

    if (campsites.status === 'loading') {
        return (
            <Loading />
        )
    };

    if (campsites.errMess) {
        return (
            <View>
                <Text>Error: {campsites.errMess}</Text>
            </View>
        )
    }

    if (campsites.campsites) {
        return (
            <FlatList 
                data={campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default Directory;