import React,{useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();


    useEffect(function(){
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(function(response){
            setIncidents(response.data);
        })
    },[ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization : ongId,
                }
            });
            setIncidents(incidents.filter(incident=> incident.id !== id));
        }catch(err){
            alert('Não foi possivel remover');
            console.log(err);
        }
    }
    
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Heroes"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(response => 
                         (
                            <li key={response.id}>
                                <strong>Caso: </strong>
                                <p>{response.title}</p>

                                <strong>DESCRIÇÂO:</strong>
                                <p>{response.description}</p>

                                <strong>VALOR:</strong>
                                <p>{Intl.NumberFormat('pt-BR',{
                                    style:'currency', 
                                    currency:'BRL'
                                }).format(response.velue)}</p>

                                <button type="button" onClick={() => handleDeleteIncident(response.id)}>
                                    <FiTrash2 size={20} color="#A8A8B3"/>
                                </button>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}