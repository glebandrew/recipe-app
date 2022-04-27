import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styled from 'styled-components'
import { Recipe } from "./Recipe"

export const Dashboard = () => {
    const [recipes, setRecipes] = useState([])
    const [logOutStatus, setLogOutStatus] = useState(false)
    const redirect = useNavigate()

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
        redirect('/')
        setLogOutStatus((logOutStatus) => !logOutStatus)
    }
    const handleSignIn = () => redirect('/signin')
    const handleSignUp = () => redirect('/signup')
    const handleAddRecipe = () => redirect('addrecipe')
    const handleDetail = (recipeId: string) => redirect(`recipe/${recipeId}`)
    const handleProfile = () => redirect(`profile`)

    return (
        <Section>
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
            <button onClick={handleProfile}>Profile</button>
            <button onClick={handleLogOut}>Log Out</button>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignUp}>Sign Up</button>
        </Section>
    )
}

const Section = styled.section`
    border: 4px dotted black;
`

