import { useState, useEffect, FC } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styled from 'styled-components'
import { Recipe } from "./Recipe"

export const Dashboard:FC = () => {
    const [recipes, setRecipes] = useState([])
    const redirect = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:3000?select=ch')
            return result
        }
        fetchData()
            .then(res => {
                setRecipes(res.data.recipes)
            })
            .catch(() => console.log("Ошибка промиса dashboard"))
    },[])

    const handleAddRecipe = () => redirect('addrecipe')
    const handleDetailCard = (recipeId: string) => redirect(`recipe/${recipeId}`)

    return (
        <Section>
            <Header>
                <input />
                <button onClick={handleAddRecipe}>Add recipe</button>    
            </Header>
            <ListRecipe>
                {
                    recipes?.map((recipe: any) => {
                        return <Recipe  handleDetail={handleDetailCard} key={recipe._id} id={recipe._id} title={recipe.title} descr={recipe.description}/>
                    })
                }
            </ListRecipe>
            <Footer>
                <p>Paginate</p>
                <p>sekect</p>
            </Footer>
        </Section>
    )
}

const Section = styled.section`
    width: 1300px;
    height: 992px;
    padding: 32px 80px;
    box-sizing: border-box;
`
const Header = styled.header`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
const ListRecipe = styled.div`
    width: 100%;
    margin-top: 32px;
    display: grid;
    grid-template-columns: repeat(3, 364px);
    grid-template-rows: repeat(2, 380px);
    gap: 24px;
`
const Footer = styled.footer`
   display: flex;
   width: 100%;
   justify-content: space-between;
`