import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavorite } from '../redux/favoritesSlice';
import Loading from '../components/LoadingComponent';
import { baseUrl } from'../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const Favorites = () => {
    const dispatch = useDispatch();
    const campsites = useSelector(state => state.campsites);
    const favorites = useSelector(state => state.favorites);
    //const { navigate } = props.navigation;
    const renderFavoriteItem = ({item}) => {
        return (
            <SwipeRow
                rightOpenValue={-100}
                // style={styles.swipeRow}
            >
                <View style={styles.deleteView}>
                    <TouchableOpacity
                        style={styles.deleteTouchable}
                        onPress={() => 
                            Alert.alert(
                                'Delete Favorite?',
                                'Are you sure you wish to delete the favorite campsite ' + item.name + '?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log(item.name + ' Not Deleted'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => dispatch(deleteFavorite(item.id))
                                    }
                                ],
                                { cancelable: false }
                            )
                        
                        }
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem>
                        <Avatar source={{ uri: baseUrl + item.image}} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
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
        <Animatable.View animation='fadeInRightBig' duration={2000}>
            <FlatList 
                data={campsites.campsites.filter(campsite => favorites.favorites.includes(campsite.id))}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        </Animatable.View>
    )

}

Favorites.navigationOptions = {
    title: 'My Favorites'
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
})

export default Favorites;
