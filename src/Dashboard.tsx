import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Recipe } from "./Recipe"

export const Dashboard = () => {
    const [recipes, setRecipes] = useState([])
    const [logOutStatus, setLogOutStatus] = useState(false)
    const logOut = useNavigate()
    const signIn = useNavigate()
    const addRecipe = useNavigate()
    const redirectDetail = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:3000/')
            return result
        }
        fetchData()
            .then(res => {
                setRecipes(res.data.recipes)
            })
            .catch(() => console.log("Ошибка промиса dashboard"))
    },[])

    useEffect(() => {
        if (logOutStatus) {
            const logOutData = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post('http://localhost:3000/user/signout', null, config)
                return result
            }
            logOutData()
                .then(() => {
                    localStorage.clear()
                    console.log('Vi vishli')
                })
                .catch(() => console.log("Ошибка промиса signout"))
            setLogOutStatus(false)
        }
    },[logOutStatus])

    const handleLogOut = () => {
        logOut('/')
        setLogOutStatus((logOutStatus) => !logOutStatus)
    }
    const handleSignIn = () => {
        signIn('signin')
    }
    const handleAddRecipe = () => {
        addRecipe('addrecipe')
    }
    
    const handleDetail = (recipeId: string) => {
        redirectDetail(`/recipe/${recipeId}`)
    }

    return (
    <div>
        {
            recipes?.map((recipe: any) => {
                return (
                    <div onClick={() => handleDetail(recipe._id)} key={recipe._id}>
                        <Recipe title={recipe.title} descr={recipe.description}/>
                    </div>
                )
            })
        }
        <button onClick={handleAddRecipe}>Add recipe</button>
        <button onClick={handleLogOut}>Log Out</button>
        <button onClick={handleSignIn}>Sign In</button>
    </div>
    )
}
