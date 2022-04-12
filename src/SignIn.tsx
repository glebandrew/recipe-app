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
    }
},[dataPost, signInStatus])


  const onSubmit = (data: SetStateAction<{}>) => {
    setDataPost(data)
    setSignInStatus((signInStatus) => !signInStatus)
    redirect('/')
  }

  return (
    <div className="form">
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label>
          Name:
          <input {...register("name")} />
        </label> */}
        <label>
          Login:
          <input {...register("login", {
            required: true
          })} />
        </label>
        <div style={{height: 40}}>{errors?.login && <p>Error</p>}</div>
        {/* <label>
          Email:
          <input {...register("email")} />
        </label> */}
        <label>
          Password:
          <input {...register("password")} />
        </label>
        {/* <label>
          Password again:
          <input {...register("passwordAgain")} />
        </label> */}
        <input type={"submit"} />
        {/* <button type={"submit"}>Войти</button> */}
      </form>
    </div>
  );
};