import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const orgid = localStorage.getItem('ongId');

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [velue, setValue] = useState('');

    async function heandleNewIncident(e){
        e.preventDefault();
        const data = {title,description,velue};
        try{
            await api.post('incidents',data,{
                headers:{
                    Authorization: orgid
                }
            });
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar o caso!');
            console.log(err);
        }
    }

    return(
        <div className="new-incident-container">
            <div className="container">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={heandleNewIncident}>
                    <input type="text" placeholder="Titulo do caso"
                        valeu={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Descrição"
                        valeu={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text" placeholder="R$ 0,00"
                        valeu={velue}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}