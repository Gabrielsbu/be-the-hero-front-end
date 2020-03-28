import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import http from '../../services/api';
import './style.css';

import Logo from '../../assets/logo.svg';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function cadastrarOng(evento){
        evento.preventDefault();
    
        const data = {
           name,
           email,
           whatsapp,
           city,
           uf
        };

       try {
        const response = await http.post('ongs', data);

        alert(`Seu ID de acesso: ${response.data.id}`);

        history.push('/');

       } catch (err) {
            alert('Erro no cadastro, tente novamente.');
       }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be The Heroes"/>
                

                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
                        casos da sua ONG.
                    </p>

                    <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#E02041"/>
                            Não tenho cadastro
                    </Link>
                </section>
                
                <form onSubmit={cadastrarOng}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={ evento => setName(evento.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={ evento => setEmail(evento.target.value)} 
                    />
                    <input placeholder="Whatsapp" 
                         value={whatsapp}
                         onChange={ evento => setWhatsapp(evento.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade" 
                             value={city}
                             onChange={ evento => setCity(evento.target.value)}
                        />
                        <input placeholder="UF" style={{ width:80 }}
                             value={uf}
                             onChange={ evento => setUf(evento.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
  
}
