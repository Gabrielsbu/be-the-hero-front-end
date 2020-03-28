import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import http from '../../services/api';

import Logo from '../../assets/logo.svg';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function cadastrarIncidente(evento) {
        evento.preventDefault();

        const data = {
            title, 
            description,
            value
        }

        try{
            await http.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            alert('O incidente foi cadastrado com sucesso! ');
            history.push('/profile');

        }catch (err){
            alert('Houve um erro ao tentar adicionar um Incidente! ')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be The Heroes"/>
                

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                    </p>

                    <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041"/>
                            Voltar para seu perfil
                    </Link>
                </section>
                
                <form onSubmit={cadastrarIncidente}>
                    <input placeholder="Título do caso"
                        value={title}
                        onChange={ evento => setTitle(evento.target.value)}
                    />
                    <textarea placeholder="Descrição" 
                        value={description}
                        onChange={ evento => setdescription(evento.target.value)}
                    />
                
                    <input placeholder="Valor em reais" 
                        value={value}
                        onChange={ evento => setValue(evento.target.value)}
                    />
                        

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}