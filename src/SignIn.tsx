import { useState, useEffect, SetStateAction, FC } from "react"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import Cookies from 'js-cookie'

interface FormInputs {
	login: string,
	password: string,
}

export const SignIn:FC = () => {
	const [dataPost, setDataPost] = useState({})
	const [signInStatus, setSignInStatus] = useState(false)
	const [errorMessage, showErrorMessage] = useState(false)
	const redirect = useNavigate()
	
	const formShema = Yup.object().shape({
		login: Yup.string().required('Введите логин').min(3, 'Логин должен иметь не менее 3 символов'),
		password: Yup.string().required('Введите пароль').min(8, 'Пароль должен иметь не менее 8 символов'),
	})

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({resolver: yupResolver(formShema)})

	useEffect(() => {
		if (signInStatus) {
			const fetchData = async () => {
				const result = await axios.post('http://localhost:3000/user/signin', dataPost)
				return result
			}
			fetchData()
				.then(res => {
					const { token, user } = res.data
					localStorage.setItem("token", token)
					localStorage.setItem("userName", user.name)
					redirect('/')
					console.log("Vi zashli SignIn")
				})
				.catch((error) => {
					if (error.response) showErrorMessage(true)
				})
			setSignInStatus(false)
		}
	},[dataPost, redirect, signInStatus])
	
	const googleAuth = () => {
		const googleLoginUrl = 'http://localhost:3000/user/google'
		window.open(googleLoginUrl,"_self")
		// setTimeout(() => {
		// 	localStorage.setItem('token',Cookies.get('auth_token') as string)
		// 	localStorage.setItem('userName', Cookies.get('name') as string)
		// 	redirect('/')
		// 	console.log("Vi zashli SignIn Google")
		// 	newWindow?.close()
		// }, 4000)
	}

	const onSubmit = (data: SetStateAction<{}>) => {
		setDataPost(data)
		setSignInStatus((signInStatus) => !signInStatus)
		reset()
	}

	const handleOnSingUp = () => redirect('/signup')

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Title>Войти</Title>

				<Label>
					Логин:<br/>
					<Input {...register("login")} />
				</Label>
				<Error>{errors.login?.message}</Error>

				<Label>
					Пароль:<br/>
					<Input {...register("password")} />
				</Label>
				<Error>{errors.password?.message}</Error>

				<ButtonSubmit type={"submit"}>Войти</ButtonSubmit> 
				<Footer>
					Ещё не зарегистрированы?
					<ButtonSignUp onClick={handleOnSingUp}>Зарегистрироваться</ButtonSignUp> 
				</Footer>
			</Form>
			<ImgBlock>
				<div>img</div>
			</ImgBlock>
			{
				errorMessage ? <ErrorPromise>Такого пользователя не существует</ErrorPromise> : null
			}
			<button onClick={googleAuth}>Gooooogle</button>
		</Container>
  	)
}

const Container = styled.div`
	padding: 100px 0 0 0;
	display: grid;
	grid-template-columns: 675px 835px;
    background: #FFFFFF;
    align-items: center;
    justify-items: center;
`
const Form = styled.form`
	display: grid;
	grid-template-rows: 85px 78px 13px 78px 13px 60px 40px;
	align-items: center;
	width: 365px;
`
const Title = styled.h1`
	margin: 0;
	padding: 0;
	font-weight: 500;
	font-size: 25px;
    color: #344472;
`
const Label = styled.label`
	width: 365px;
	font-weight: 500;
    font-size: 14px;
    color: #707070;
`
const Input = styled.input`
	margin-top: 5px;
	background: #F6F6F6;
	border-radius: 4px;
	width: 365px;
	height: 40px;
	box-sizing: border-box;
    padding: 8px 12px;
    font-weight: 500;
    font-size: 14px;
    color: #303030;
`
const Error = styled.span`
	font-weight: 500;
	font-size: 13px;
	color: #FF768E;
`
const ButtonSubmit = styled.button`
	width: 365px;
	height: 40px;
	background: #205ccc;
	border-radius: 4px;
	font-weight: 500;
	font-size: 15px;
	line-height: 24px;
	text-align: center;
	transition: 0.3s all;
	color: #FFF;
	border: none;
	cursor: pointer;
	:hover {
		background: #002569;
	}
	:active {
		background: #002569;
		color: #FFF;
		transform: translateY(3px);
		opacity: 0.8;
	}
`
const ButtonSignUp = styled.button`
	margin-top: 3px;
	border: none;
	cursor: pointer;
	background: #FFFFFF;
	text-decoration: underline;
	font-weight: 500;
	font-size: 15px;
	transition: 0.3s all;
	color: #205ccc;
	:hover {
		color: #002569;
	}
`
const Footer = styled.footer`
	box-sizing: border-box;
	padding: 0;
	width: 365px;
	display: flex;
	justify-content: space-between;
`
const ImgBlock = styled.div``
const ErrorPromise = styled.div`
	box-sizing: border-box;
	padding: 8px 20px;
	position: absolute;
	top: 0;
	left: 0;
	width: 302px;
	height: 40px;
	background: #FF5761;
	border-radius: 4px;
	color: #FFF;
`