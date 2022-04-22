import { useState, useEffect, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

export const SignIn = () => {
  const [dataPost, setDataPost] = useState({})
  const [signInStatus, setSignInStatus] = useState(false)
  const redirect = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


useEffect(() => {
    if (signInStatus) {
        const fetchData = async () => {
            const result = await axios.post('http://localhost:3000/user/signin', dataPost)
            return result
        }
        fetchData()
            .then(res => {
                const { token } = res.data
                localStorage.setItem("token", token)
            })
            .catch(() => console.log("Ошибка промиса signin"))
        setSignInStatus(false)
    }
},[dataPost, signInStatus])


  const onSubmit = (data: SetStateAction<{}>) => {
  setDataPost(data)
  setSignInStatus((signInStatus) => !signInStatus)
  redirect('/')
  }

  const handleOnSingUp = () => redirect('/signup')

  return (
    <div className="form">
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Login:
          <input {...register("login", {
              required: true
            })} 
          />
        </label>
        <div style={{height: 40}}>{errors?.login && <p>Error</p>}</div>
        <label>
          Password:
          <input {...register("password", {
              required: true
            })}
          />
        </label>
        <button type={"submit"}>Войти</button> 
        <button onClick={handleOnSingUp}>Sign Up</button> 
      </form>
    </div>
  );
};