import React from 'react';
import {View, Image, Text} from 'react-native';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Incindents(){
    return(
        <View style={styles.Conteiner}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

        </View>
    )
}