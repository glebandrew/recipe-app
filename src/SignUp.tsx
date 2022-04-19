import { useState, useEffect, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components'


export const SignUp = () => {
    const [dataPost, setDataPost] = useState({})
    const [signUpStatus, setSignUpStatus] = useState(false)
    const redirect = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


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
					console.log(token)
					localStorage.setItem("token", token)
				})
				.catch(() => console.log("Ошибка промиса signUp"))
			setSignUpStatus(false)
		}
	},[dataPost, signUpStatus])


	const onSubmit = (data: SetStateAction<{}>) => {
		setDataPost(data)
		setSignUpStatus((signUpStatus) => !signUpStatus)
		redirect('/')
	}
	const redirectSignIn = () => {
		redirect('/signin')
	}

	return (
		<Container>
			<Register>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Field>
						<Legend>Регистрация</Legend>

						<Label>
							Имя:
							<Input {...register("name", {
									required: true
								})}  
							/>
						</Label>
						<ErrorBlock>{errors?.name && <Error>Введите имя</Error>}</ErrorBlock>

						<Label>
							Логин:
							<Input {...register("login", {
									required: true
								})} 
							/>
						</Label>
						<ErrorBlock>{errors?.login && <Error>Введите логин</Error>}</ErrorBlock>
						
						<Label>
							Введите свою почту:
							<Input {...register("email", {
									required: true
								})} 
							 />
						</Label>
						<ErrorBlock>{errors?.email && <Error>Введите свою почту</Error>}</ErrorBlock>

						<Label>
							Придумайте надёжный пароль:
							<Input {...register("password", {
									required: true
								})}
							/>
						</Label>
						<ErrorBlock>{errors?.password && <Error>Введите пароль</Error>}</ErrorBlock>

						<Label>
							Введите пароль еще раз:
							<Input {...register("passwordAgain", {
									required: true
								})} 
							/>
						</Label>
						<ErrorBlock>{errors?.passwordAgain && <Error>Введите пароль</Error>}</ErrorBlock>

						<input type={'checkbox'}/>	
						<ErrorBlock><Error>Checkbox</Error></ErrorBlock>	

						<ButtonSubmit type={"submit"}>Зарегистрироваться</ButtonSubmit>
						<footer>
							Уже зарегистрированы?
							<button onClick={redirectSignIn}>Войти</button>
						</footer>
					</Field>

				</Form>
			</Register>
			<ImgBlock>
				<div>img</div>
			</ImgBlock>
		</Container>
	)
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-columns: 606px 834px;
    background: #FFFFFF;
    align-items: center;
    justify-items: center;
`
const Register = styled.div`
	box-sizing: border-box;
    padding: 0px 220px;
`
const ImgBlock = styled.div`
	
`
const Field = styled.fieldset`
	display: grid;
	grid-template-rows: 80px 13px 80px 13px 80px 13px 80px 13px 80px 13px 40px 13px 65px 50px;
	align-items: center;
	border: none;
`
const Legend = styled.legend`
	font-weight: 500;
	font-size: 25px;
    color: #344472;
`
const Form = styled.form``
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
const ErrorBlock = styled.div``
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
	background: #165ee4;
	border-radius: 4px;
	font-weight: 500;
	font-size: 15px;
	line-height: 24px;
	text-align: center;
	color: #FFFFFF;
	border: none;
	:hover {
		background: #FF5761;
	}
	:active {
		background: #C60E2E;
	}
	:disabled {
		background: #F6F6F6;
		color: #D1D1D1;
	}
`