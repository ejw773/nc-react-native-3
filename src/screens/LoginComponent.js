import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {
        console.log(JSON.stringify(username, password, remember));
        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username,
                    password
                })
            ).catch(error => console.log('Could not save user info: ', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(
                error => console.log('Could not delete user info: ', error)
            );
        }
    }

    // useEffect()

    return (
        <View style={styles.container}>
            <Input 
                placeholder='Username'
                leftIcon={{type: 'font-awesome', name: 'user-o'}}
                onChangeText={username => setUsername(username)}
                value={username}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input 
                placeholder='Password'
                leftIcon={{type: 'font-awesome', name: 'key'}}
                onChangeText={password => setPassword(password)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <CheckBox 
                title='Remember Me'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton} >
                <Button 
                    onPress={() => handleLogin()}
                    title='Login'
                    color='#5637DD'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 10
    }
});

export default Login;
