import React, { useState, useEffect } from 'react'; //useEffect serve para disparar detertminada função em algum momento do componente.
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    

    useEffect(() => {    //()=> {} - a função que será chamada, []quando a função será executada array d dependência)
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id != id));   // para retirar o caso sa dágina logo após deletado
        
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

            // para pesquisar: Fira code - Ligture

    function handleLogout(){
        localStorage.clear();

        history.push ('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new" >Cadastrar novo Caso</Link>
                <button onClick = {handleLogout} type="button">
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => ( //o primeiro elemento logo após a iteração (map) sempre terá que ter a propriedade keypara 'ajudar' o react a encontrar qual item é qual no caso de precisar modificar/deletar um item da interface, colocando na key qual é o valor único para identificar cada incidente.
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}