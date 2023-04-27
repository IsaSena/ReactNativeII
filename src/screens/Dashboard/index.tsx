import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Container } from './styles'

export function Dashboard(){
    return (
        <View style={styles.container}>
            <Text>
                Dashboard
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //o container ocupa a tela toda
        justifyContent: 'center', //vertical
        alignItems: 'center', //tem content tbm, centro horizontal
        backgroundColor: '#999'
    }
})