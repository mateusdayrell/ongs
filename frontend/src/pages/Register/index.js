import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'

import './style.css'
import balloons from '../../assets/balloons-animate.svg'

import api from '../../services/api'

export default function Register() {
     const [name, setName] = useState('')
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [document, setDocument] = useState('')
     const [field, setField] = useState('')
     const [phone, setPhone] = useState('')
     const [city, setCity] = useState('')
     const [uf, setUf] = useState('')
     const [ongUser, setOngUser] = useState('#e02031')
     const [normalUser, setNormalUser] = useState('#757575')

     const navigate = useNavigate()
    
    async function handleRegister(e) { //page does not recharge
        e.preventDefault()

        const data = {
            name,
            email,
            password,
            document,
            field,
            phone,
            city,
            uf,
        } //stores the data received on data

        try {
            const response = await api.post('ongs', data)
            //send data to backend to register

            alert(`Seu ID de acesso: ${response.data.id}`)
            //success message

            navigate('/') //return to home page after the register
        } catch (error) {
            alert('Erro no cadastro, tente novamente.')
        }
    }

    const setUserType = (type) => {
        if(ongUser === '#e02031'){
            setOngUser('#757575')
            setNormalUser('#e02031')
        } else{
            setOngUser('#e02031')
            setNormalUser('#757575')
        }
    }
    
    return (
        <div className="register-container"> 
            <div className="content">
                <div className="banner">
                    <img src={balloons} alt="ballons" />
                </div>
                <div className="register">
                    <section>
                        <h1>Cadastrar: </h1>

                        <div className="inline">
                            <h2 style={{color: ongUser}}>ONG</h2>
                            <label className="switch">
                                <input 
                                    type="checkbox"
                                    onChange={e => setUserType()}
                                />
                                <span className="slider round"/>
                            </label>
                            <h2 style={{color: normalUser}}>Usuário</h2>
                        </div>
                    </section> 
                    <form onSubmit={handleRegister}>
                        <input 
                            placeholder="Nome da ONG"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <input 
                            type="password" 
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <input 
                            type="text" 
                            placeholder="Documento"
                            value={document}
                            onChange={e => setDocument(e.target.value)} />
                        <input 
                            type="text" 
                            placeholder="Campo"
                            value={field}
                            onChange={e => setField(e.target.value)} />
                        <input 
                            placeholder="Telefone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />

                        <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input 
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} />
                        </div>
                        <button className="button" type="submit" style={{backgroundColor: '#e02031'}}>Cadastrar</button>
                    </form>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color = {'#e02031'}/>    
                        Voltar à página de login
                    </Link>                   
                </div>
            </div>
        </div>
    )
}