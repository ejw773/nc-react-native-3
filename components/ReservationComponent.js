import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';

const Reservation = () => {
    const [formData, setFormData] = useState({
        campers: 1,
        hikeIn: false,
        date: new Date(),
        showCalendar: false
    });

    const handleReservation = () => {
        console.log(JSON.stringify(formData));
        setFormData({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false
        })
    }

    return (
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Campers</Text>
                {/* <Picker
                    style={styles.formItem}
                    selectedValue={formData.campers}
                    onValueChange={itemValue => setFormData({campers: itemValue})}
                >
                    <Picker.Item label='1' value='1' />
                    <Picker.Item label='2' value='2' />
                    <Picker.Item label='3' value='3' />
                    <Picker.Item label='4' value='4' />
                    <Picker.Item label='5' value='5' />
                    <Picker.Item label='6' value='6' />
                </Picker> */}
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Hike-In?</Text>
                <Switch 
                    style={styles.formItem}
                    value={formData.hikeIn}
                    trackColor={{true: '#5637DD', false: null}}
                    onValueChange={value => setFormData({hikeIn: value})}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date</Text>
                <Button 
                    onPress={() => setFormData({showCalendar: true})}
                    title='set date'
                    // title={formData.date.toLocaleDateString('en-US')}
                    color='#5637DD'
                    accessibilityLabel='Tap me to select a reservation date'
                />
            </View>
            {formData.showCalendar && (
                <DateTimePicker 
                    value={formData.date}
                    mode={'date'}
                    display='default'
                    onChange={(event, selectedDate) => {
                        selectedDate && setFormData({date: selectedDate, showCalendar: false})
                    }}
                    style={styles.formItem}
                />
            )}
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
