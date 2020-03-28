import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import http from '../../services/api';

import './style.css';
import Logo from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        http.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function deletarIncidente(id){
        try{
            await http.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))
            alert('Incidente deletado com sucesso! ')

        }catch{
            alert('Houve um erro ao tentar deletar um incidente, tente novamente! ');
        }
    }

    function sair(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Be The Heroes"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
                <button onClick={sair} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key = {incident.id} >
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
    
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
    
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
    
                        <button onClick={() => deletarIncidente(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                    ))}    
            </ul>
        </div>
    );
}