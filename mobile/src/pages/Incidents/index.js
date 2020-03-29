import React, { useState , useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';
import { apisAreAvailable } from 'expo';

import api from '../../services/api';
import styles from './styles';
import logoImg from '../../assets/logo.png';


export default function Incindents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    

    function navigationToDatil(incindent){
        navigation.navigate('Detail',{incindent});
    }

    async function loadIncindents(){
        if(loading){
            return;
        }
        if(total > 0 && incidents.length === total){
            return;
        }
        setLoading(true);

        const response = await api.get('incidents',{
            params:{page}
        });
        
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);

        setLoading(false);
    }

    useEffect(() => {
        loadIncindents();
    }, []);

    return(
        <View style={styles.Conteiner}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList style={styles.IncindentList}
                data={incidents}
                keyExtractor={incindent => String(incindent.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncindents}
                onEndReachedThreshold={0.2}
                renderItem={({ item:incindent }) => ( 
                    <View style={styles.Incindent}>
                        <Text style={styles.IncindentProperty}>OMG:</Text>
                        <Text style={styles.IncindentValue}>{incindent.name}</Text>
                        <Text style={styles.IncindentProperty}>CASO:</Text>
                        <Text style={styles.IncindentValue}>{incindent.title}</Text>
                        <Text style={styles.IncindentProperty}>Valor:</Text>
                        <Text style={styles.IncindentValue}>{
                            Intl.NumberFormat('pt-BR',{
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incindent.velue)
                        }</Text>
                        <TouchableOpacity style={styles.detailsButton}
                            onPress={()=>{navigationToDatil(incindent)}}    
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