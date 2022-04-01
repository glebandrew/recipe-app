import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Dashboard = () => {
    const [recipes, setRecipes] = useState([])
    const [logOutStatus, setLogOutStatus] = useState(false)
    const logOut = useNavigate()
    const signIn = useNavigate()
    const addRecipe = useNavigate()


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
        }
    },[logOutStatus])

    const handleLogOut = () => {
        logOut('/')
        setLogOutStatus(!logOutStatus)
    }
    const handleSignIn = () => {
        signIn('signin')
    }
    const handleAddRecipe = () => {
        addRecipe('addrecipe')
    }

    return (
    <div>
        {
            recipes?.map((recipe: any) => {
                return (
                    <div key={recipe._id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
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
