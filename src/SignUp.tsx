import { useState, useEffect, SetStateAction, FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'

interface FormInputs {
	name: string,
	login: string,
	email: string,
	password: string,
	passwordAgain: string,
	checkbox: boolean
}

export const SignUp:FC = () => {
    const [dataPost, setDataPost] = useState({})
    const [signUpStatus, setSignUpStatus] = useState(false)
	const [errorMessage, showErrorMessage] = useState(false)
    const redirect = useNavigate()

	const formShema = Yup.object().shape({
		name: Yup.string().required('Введите имя').max(30, 'Слишком длинное имя'),
		login: Yup.string().required('Введите логин').min(3, 'Логин должен иметь не менее 3 символов'),
		email: Yup.string().required('Введите почту').email('Адрес электронной почты должен быть действительным'),
		password: Yup.string().required('Введите пароль').min(8, 'Пароль должен иметь не менее 8 символов'),
		passwordAgain: Yup.string().required('Введите пароль').oneOf([Yup.ref('password')], 'Пароли не совпадают'),
		checkbox: Yup.bool().oneOf([true], 'Вы не согласились!')
	})

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({resolver: yupResolver(formShema)})

	useEffect(() => {
		if (signUpStatus) {
			const fetchData = async () => {
				const result = await axios.post('http://localhost:3000/user/signup', dataPost)
				return result
			}
			fetchData()
				.then(res => {
					console.log(res)
					const { token } = res.data
					localStorage.setItem("token", token)
				})
				.catch((error) => {
					if (error.response) showErrorMessage(true)
				})
		}
	},[dataPost, signUpStatus])

	const onSubmit = (data: SetStateAction<{}>) => {
		setDataPost(data)
		setSignUpStatus((signUpStatus) => !signUpStatus)
		redirect('/')
		reset()
	}
	const redirectSignIn = () => redirect('/signin')

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Field>
					<Legend>Регистрация</Legend>

					<Label>
						Имя:
						<Input type={"text"} placeholder={"Ваше имя"} {...register("name")} />
					</Label>
					<Error>{errors.name?.message}</Error>

					<Label>
						Логин:
						<Input type={"text"} placeholder={"Логин должен иметь не менее 3 символов"} {...register("login")} />
					</Label>
					<Error>{errors.login?.message}</Error>
					
					<Label>
						Введите почту:
						<Input type={"email"} placeholder={"Введите адрес вашей почты"} {...register("email")} />
					</Label>
					<Error>{errors.email?.message}</Error>

					<Label>
						Придумайте надёжный пароль:
						<Input type={"password"} placeholder={"Пароль должен иметь не менее 8 символов"} {...register("password")} />
					</Label>
					<Error>{errors.password?.message}</Error>

					<Label>
						Введите пароль еще раз:
						<Input type={"password"} placeholder={"Введите пароль еще раз"} {...register("passwordAgain")} />
					</Label>
					<Error>{errors.passwordAgain?.message}</Error>

					<CheckboxContainer>
						Я согласен(а) с политикой конфиденциальности
						<Checkbox {...register("checkbox")} type="checkbox" />
						<CheckMark></CheckMark>
						<CheckErrorMessage>{errors.checkbox?.message}</CheckErrorMessage>
					</CheckboxContainer>

					<ButtonSubmit type={"submit"}>Зарегистрироваться</ButtonSubmit>
					<Footer>
						Уже зарегистрированы?
						<ButtonSignIn onClick={redirectSignIn}>Войти</ButtonSignIn>
					</Footer>
				</Field>
			</Form>
			<ImgBlock>
				<div>img</div>
			</ImgBlock>
			{
				errorMessage ? <ErrorPromise>Что-то пошло не так...</ErrorPromise> : null
			}
		</Container>
	)
}

const ErrorPromise = styled.div`
	box-sizing: border-box;
	padding: 8px 20px;
	position: absolute;
	top: 0;
	left: 0;
	width: 230px;
	height: 40px;
	background: #FF5761;
	border-radius: 4px;
	color: #FFF;
`
const Container = styled.div`
	padding: 40px 0 0 0;
	display: grid;
	grid-template-columns: 675px 835px;
    background: #FFFFFF;
    align-items: center;
    justify-items: center;
	position: relative;
`
const ImgBlock = styled.div``
const Field = styled.fieldset`
	display: grid;
	grid-template-rows: 78px 13px 78px 13px 78px 13px 78px 13px 78px 13px 60px 60px 40px;
	align-items: center;
	border: none;
	margin: 0;
    padding: 0;
`
const Legend = styled.legend`
	margin: 0;
	padding: 0;
	font-weight: 500;
	font-size: 25px;
    color: #344472;
`
const Form = styled.form`
	box-sizing: border-box;
    padding: 0px 220px;
	margin: 0;
`
const Label = styled.label`
    font-weight: 500;
    font-size: 14px;
    color: #707070;
`
const Error = styled.span`
	font-weight: 500;
	font-size: 13px;
	color: #FF768E;
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
const Footer = styled.footer`
	box-sizing: border-box;
	padding: 0 65px;
	display: flex;
	justify-content: space-between;
`
const ButtonSignIn = styled.button`
	margin-top: 3px;
	border: none;
	cursor: pointer;
	background: #FFFFFF;
	text-decoration: underline;
	transition: 0.3s all;
	font-weight: 500;
	font-size: 15px;
	color: #205ccc;
	:hover {
		color: #002569;
	}
`
const Checkbox = styled.input`
	position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`
const CheckMark = styled.span`
	position: absolute;
	top: 3px;
	left: 0;
	height: 12px;
	width: 12px;
	background-color: #fff;
	border: solid 2px #9C9C9C;
	border-radius: 3px;
	:after {
		content: "";
		position: absolute;
	}
`
const CheckboxContainer = styled.label`
	position: relative;
	padding-left: 24px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 23px;
	color: #707070;
	${Checkbox}:checked ~ ${CheckMark} {
		background-color: #002569;
		border: solid 2px #002569;
	}
	${Checkbox}:disabled ~ ${CheckMark} {
		background-color: #F6F6F6;
		border: solid 2px #D1D1D1;
   	}
	${Checkbox}:disabled:checked ~ ${Checkbox} {
    	background-color: #D1D1D1;
    	border: solid 2px #D1D1D1;
   	}
	:hover ${Checkbox} ~ ${CheckMark} {
		border: solid 2px #002569;
	}
	${CheckMark}:after {
		left: 3.5px;
		top: 0.5px;
		width: 3px;
		height: 7px;
		border: solid white;
		border-width: 0 2px 2px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`
const CheckErrorMessage = styled.span`
	position: absolute;
	bottom: -20px;
	left: 0px;
	font-weight: 500;
	font-size: 12px;
	color: #FF768E;
`