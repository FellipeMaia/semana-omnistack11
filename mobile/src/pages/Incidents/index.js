import React from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import logoImg from '../../assets/logo.png';


export default function Incindents(){
    const navigation = useNavigation();

    function navigationToDatil(){
        navigation.navigate('Detail');
    }

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

            <FlatList style={styles.IncindentList}
                data={[1,2,3,4,5]}
                keyExtractor={incindent => String(incindent)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.Incindent}>
                        <Text style={styles.IncindentProperty}>OMG:</Text>
                        <Text style={styles.IncindentValue}>APAD</Text>
                        <Text style={styles.IncindentProperty}>CASO:</Text>
                        <Text style={styles.IncindentValue}>Cadelinha atropelada</Text>
                        <Text style={styles.IncindentProperty}>Valor:</Text>
                        <Text style={styles.IncindentValue}>R$ 120,00</Text>
                        <TouchableOpacity style={styles.detailsButton}
                            onPress={navigationToDatil}    
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}