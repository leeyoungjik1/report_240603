import React, {useState} from "react";
import  "../../styles/join.css";
import { useNavigate } from 'react-router-dom'
import API from '../../API'

// URL 주소: /join

function Join(){
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        nickName: '',
        userId: '',
        password: '',
        confirmPassword: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target 
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        API.post('api/users/register', formData).then((res) => {
            localStorage.setItem('token', res.data.token)
            navigate("/")
            window.location.reload()
        }).catch((err) => {
            console.log(err.response.data)
            if(err.response.data.code === 400){
                alert('요청하신 데이터가 유효하지 않습니다!')
            }
        })
    }

    const {
        name,
        nickName,
        userId,
        password,
        confirmPassword,
        email
    } = formData 

    return (
        <div>
            <h1>Join PAGE</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">이름: </label>
                <input type="text" name="name" id="name" required onChange={handleChange} value={name}/>
                <label htmlFor="nickName">닉네임: </label>
                <input type="text" name="nickName" id="nickName" onChange={handleChange} value={nickName}/>
                <label htmlFor="id">아이디: </label>
                <input type="text" name="userId" id="id" required onChange={handleChange} value={userId}/>
                <label htmlFor="password">비밀번호: </label>
                <input type="password" name="password" id="password" required onChange={handleChange} value={password}/>
                <label htmlFor="confirmPassword">비밀번호 확인: </label>
                <input type="password" name="confirmPassword" id="confirmPassword" required onChange={handleChange} value={confirmPassword}/>
                <label htmlFor="email">이메일: </label>
                <input type="email" name="email" id="email" required onChange={handleChange} value={email}/>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}




export default Join