import React,{useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Incindents(){
    const route = useRoute();

    const incindent = route.params.incindent;
    const value = Intl.NumberFormat('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    }).format(incindent.velue)

    const navigation = useNavigation();
    const messege = `Olá ${incindent.name}, estou entrando em contato pois gostaria de ajudar no caso "${incindent.title}" com  o valor de ${value}.`;

    function navigationBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: 'Herói do caso: '+incindent.title,
            recipients: [incindent.email],
            body:messege
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incindent.whatsapp}&text=${messege}`)
    }

    return(
        <View style={styles.conteiner}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <TouchableOpacity style={styles.headerText}
                    onPress={navigationBack}
                >
                    <Feather name="arrow-left" size={28} color="#E02041"></Feather>
                </TouchableOpacity>
            </View>
            <View style={styles.Incindent}>
                <Text style={styles.IncindentProperty}>OMG:</Text>
                <Text style={styles.IncindentValue}>{incindent.name} de {incindent.city}/{incindent.uf}</Text>
                <Text style={styles.IncindentProperty}>CASO:</Text>
                <Text style={styles.IncindentValue}>{incindent.title}</Text>
                <Text style={styles.IncindentProperty}>Valor:</Text>
                <Text style={[styles.IncindentValue, {marginBottom:0}]}>{value}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso!</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} 
                        onPress={sendWhatsapp}
                    >
                        <Text style={styles.actionText}>WhatsApp</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} 
                        onPress={sendMail}
                    >
                        <Text style={styles.actionText}>E-mail</Text>    
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}