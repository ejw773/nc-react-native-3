import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, Text} from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from './LoadingComponent';
import { baseUrl } from'../shared/baseUrl';

const Favorites = () => {
    const campsites = useSelector(state => state.campsites);
    const favorites = useSelector(state => state.favorites);
    const { navigate } = props.navigation;
    const renderFavoriteItem = ({item}) => {
        return (
            <ListItem>
                <Avatar source={{ uri: baseUrl + item.image}} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    if (campsites.status === 'loading') {
        return <Loading />;
    }
    if (campsites.errMess) {
        return (
            <View>
                <Text>{campsites.errMess}</Text>
            </View>
        );
    }
    return (
        <FlatList 
            data={campsites.campsites.filter(campsite => favorites.includes(campsite.id))}
            renderItem={renderFavoriteItem}
            keyExtractor={item => item.id.toString()}
        />
    )

}

Favorites.navigationOptions = {
    title: 'My Favorites'
}

export default Favorites;
