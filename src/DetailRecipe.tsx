import { FC, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AddComment } from './AddComment'

export const DetailRecipe:FC = () => {
    const [recipe, setRecipe] = useState<any>({})
    const [commentText, setCommentText] = useState('')
    const [comment, setComment] = useState({
        text: ''
    })
    const [createCommetStatus, setCreateCommetStatus] = useState(false)
    const [deleteCommetStatus, setDeleteCommetStatus] = useState(false)

    let { recipeId } = useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            const result = await axios.get(`http://localhost:3000/recipe/${recipeId}`, config)
            return result
        }
        fetchData()
            .then(res => {
                setRecipe(res.data.recipe)
            })
            .catch(() => console.log("Ошибка промиса getID"))
    },[recipeId])


    useEffect(() => {
        if (createCommetStatus) {
            const postComment = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                console.log(commentText)
                const result = await axios.post(`http://localhost:3000/comment/add/${recipeId}`, comment, config)
                return result
            }
            postComment()
                .then(res => {
                    console.log(res)
                })
                .catch(() => console.log("Ошибка промиса addCom"))
        }
    },[recipeId, comment, createCommetStatus])


    useEffect(() => {
        if (deleteCommetStatus) {
            const deleteComment = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post(`http://localhost:3000/comment/delete/${recipeId}`, null, config)
                return result
            }
            deleteComment()
                .then(res => {
                    setRecipe(res.data.recipe)
                })
                .catch(() => console.log("Ошибка промиса delCom"))
        }
    },[recipeId, deleteCommetStatus])


    const handleCreateComment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setComment((state) => ({
            ...state,
            text: commentText
        }))
        setCreateCommetStatus(createCommetStatus => !createCommetStatus)
    }
    const handleDeleteComment = () => {
        setCreateCommetStatus(deleteCommetStatus => !deleteCommetStatus)
    }

    return (
        <div>
            <h2>{recipe?.title}</h2>
            <p>{recipe?.description}</p>
            <div style={{color: 'white'}}>{recipe?.author?.name}</div>
                <p style={{color: 'white'}}>{recipe?.likes}</p>
            {
                recipe?.comments?.map((comment: any, i: number) => {
                    return <AddComment key={i} text={comment.text} author={comment.author?.name} like={comment.likes} />
                })
            }
            
            <form onSubmit={handleCreateComment}>
                <textarea  onChange={(e) => setCommentText(e.target.value)}/>
                <button type={"submit"}>Add Comment</button>
                <button type={"submit"}>Delete Comment</button>
            </form>
            
        </div> 
    )
}

