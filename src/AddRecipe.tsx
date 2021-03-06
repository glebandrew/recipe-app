import {FC, useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import "./styles.css"

export const AddRecipe:FC = () => {
    const [addRecipeStatus, setAddRecipeStatus] = useState(false)
    const [inputTitle, setInputTitle] = useState('')
    const [inputDescr, setInputDescr] = useState('')
    const redirect = useNavigate()
    const redirectDetail = useNavigate()
    const [postData, setPostData] = useState({
        title: '',
        description: ''
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
    useEffect(() => {
        if (addRecipeStatus) {
            const fetchData = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post('http://localhost:3000/recipe/add', postData, config)
                return result
            }
            fetchData()
                .then((res) => {
                    console.log(res)
                    console.log('Рецепт добавлен')
                    redirectDetail(`/recipe/${res.data.recipe._id}`)
                })
                .catch(() => console.log("Ошибка промиса add"))
            setAddRecipeStatus(false)
        }
    },[addRecipeStatus, postData, redirectDetail])

   

    const handleAddRecipe = () => {
        setPostData((state) => ({
            ...state,
            title: inputTitle,
            description: inputDescr
        }))
        setAddRecipeStatus((addRecipeStatus) => !addRecipeStatus)
    }

    const handleOnDash = () => {
        redirect('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleAddRecipe)}>
                <label>
                    Title:
                    <input 
                        {...register("title", {
                            required: true
                        })} 
                        onChange={(e) => setInputTitle(e.target.value)}
                    />
                </label>
                <div style={{height: 40}}>{errors?.login && <p>Error</p>}</div>
                <label>
                    Description:
                    <input 
                        {...register("description")} 
                        onChange={(e) => setInputDescr(e.target.value)}
                    />
                </label>
                <button type={"submit"}>Добавить Рецепт</button>
            </form>
            <button onClick={handleOnDash}>На главную</button>
        </div>
    )
}
