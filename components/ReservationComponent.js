import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Reservation = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [resDate, setResDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleReservation = () => {
        console.log(`campers: ${campers}, hikeIn: ${hikeIn}, date: ${resDate}, showCalendar: ${showCalendar}`);
        setCampers(1);
        setHikeIn(false);
        setResDate(new Date());
        setShowCalendar(false);
    }

    return (
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Campers</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={campers}
                    onValueChange={itemValue => setCampers(itemValue)}
                >
                    <Picker.Item label='1' value='1' />
                    <Picker.Item label='2' value='2' />
                    <Picker.Item label='3' value='3' />
                    <Picker.Item label='4' value='4' />
                    <Picker.Item label='5' value='5' />
                    <Picker.Item label='6' value='6' />
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Hike-In?</Text>
                <Switch 
                    style={styles.formItem}
                    value={hikeIn}
                    trackColor={{true: '#5637DD', false: null}}
                    onValueChange={value => setHikeIn(value)}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date</Text>
                <DateTimePicker 
                    value={resDate}
                    mode={'date'}
                    display='default'
                    onChange={(event, selectedDate) => {
                        selectedDate && setResDate(selectedDate) && setShowCalendar(false)
                    }}
                    style={styles.formItem}
                />
            </View>
            <View style={styles.formRow}>
                <Button 
                    onPress={() => handleReservation()}
                    title='Search'
                    color='#5637DD'
                    accessibilityLabel='Tap me to search for available campsites to reserve'
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

Reservation.navigationOptions = {
    title: 'Reserve Campsite'
}

export default Reservation;
