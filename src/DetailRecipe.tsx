import { FC, FormEvent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AddComment } from './AddComment'

export const DetailRecipe:FC = () => {
    const redirectMain = useNavigate()

    const [recipeTitle, setRecipeTitle] = useState('')
    const [recipeDescr, setRecipeDescr] = useState('')
    const [recipeAuthor, setRecipeAuthor] = useState('')
    const [recipeLike, setRecipeLike] = useState<number>()

    const [recipeComments, setRecipeComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [commentId, setCommentId] = useState('')
    const [comment, setComment] = useState({
        text: ''
    })
    const [createCommetStatus, setCreateCommetStatus] = useState(false)
    const [deleteCommetStatus, setDeleteCommetStatus] = useState(false)

    const [editStatus, setEditStatus] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editDescr, setEditDescr] = useState('')
    const [editData, setEditData] = useState({
        title: '',
        description: ''
    })

    const [refreshRecipe, setRefreshRecipe] = useState(true)
    const [showEditRecipe, setShowEditRecipe] = useState(false)

    const [likeStatus, setLikeStatus] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)

    let { recipeId } = useParams(); 

    useEffect(() => {
        if(refreshRecipe) {
            const fetchData = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                console.log(recipeId)
                const result = await axios.get(`http://localhost:3000/recipe/${recipeId}`, config)
                return result
            }
            fetchData()
                .then(res => {
                    setRecipeTitle(res.data.recipe?.title)
                    setRecipeDescr(res.data.recipe?.description)
                    setRecipeAuthor(res.data.recipe?.author?.name)
                    setRecipeLike(res.data.recipe?.likes)
                    setRecipeComments(res.data.recipe?.comments)
                    setRefreshRecipe(false)
                })
                .catch(() => console.log("Ошибка промиса getID"))
        }
    },[recipeId, refreshRecipe])


    useEffect(() => {
        if (createCommetStatus) {
            const postComment = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post(`http://localhost:3000/comment/add/${recipeId}`, comment, config)
                return result
            }
            postComment()
                .then(res => {
                    console.log(res)
                    setRefreshRecipe(true)
                })
                .catch(() => console.log("Ошибка промиса addCom"))
            setCreateCommetStatus(false)
            
        }
    },[recipeId, comment, createCommetStatus])


    useEffect(() => {
        if (deleteCommetStatus) {
            const deleteComment = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post(`http://localhost:3000/comment/delete/${commentId}`, null, config)
                return result
            }
            deleteComment()
                .then(res => {
                    console.log(res)
                    setRefreshRecipe(true)
                })
                .catch(() => console.log("Ошибка промиса delCom"))
            setDeleteCommetStatus(false)
            
        }
    },[commentId, deleteCommetStatus])

    useEffect(() => {
        if (editStatus) {
            const editRecipe = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                console.log(recipeId)
                console.log(editData)
                const result = await axios.post(`http://localhost:3000/recipe/edit/${recipeId}`, editData, config)
                console.log(`http://localhost:3000/recipe/edit/${recipeId}`)
                return result
            }
            editRecipe()
                .then(res => {
                    console.log(res)
                    setRefreshRecipe(true)
                })
                .catch(() => console.log("Ошибка промиса editRecipe"))
            setEditStatus(false)
        }
    }, [recipeId, editStatus, editData])

    useEffect(() => {
        if (likeStatus) {
            const likePost = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post(`http://localhost:3000/recipe/like/${recipeId}`, null, config)
                return result
            }
            likePost()
                .then(res => {
                    console.log(res)
                    setRefreshRecipe(true)
                })
                .catch(() => console.log("Ошибка промиса likePost"))
            setLikeStatus(false)
        }
    }, [recipeId, likeStatus])

    useEffect(() => {
        if (deleteStatus) {
            const delPost = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post(`http://localhost:3000/recipe/delete/${recipeId}`, null, config)
                return result
            }
            delPost()
                .then(res => {
                    console.log(res)
                    console.log('vi delete рецепт')
                    setRefreshRecipe(true)
                })
                .catch(() => console.log("Ошибка промиса delPost"))
            setDeleteStatus(false)
        }
    }, [recipeId, deleteStatus])

    const handleCreateComment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setComment((state) => ({
            ...state,
            text: commentText
        }))
        setCreateCommetStatus((createCommetStatus) => !createCommetStatus)
    }
    const handleDeleteComment = (id: string) => {
        setCommentId(id)
        setDeleteCommetStatus((deleteCommetStatus) => !deleteCommetStatus)
    }
    const handleEditRecipe = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEditData((state) => ({
            ...state,
            title: editTitle,
            description: editDescr
        }))
        setEditStatus((editStatus) => !editStatus)
        setShowEditRecipe(false)
    }

    const handleLikePress = () => {
        setLikeStatus((likeStatus) => !likeStatus)
    }
    const handleDeleteRecipe = () => {
        setDeleteStatus((deleteStatus) => !deleteStatus)
    }

    const redirectOnDashboard = () => {
        redirectMain(-1)
    }
    return (
        <div>
            <button onClick={redirectOnDashboard}>На главную</button>
            {
                showEditRecipe ? (
                    <form onSubmit={handleEditRecipe}>
                        <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                        <input value={editDescr} onChange={(e) => setEditDescr(e.target.value)}/>
                        <button type={'submit'}>Сохранить</button>
                    </form> 
                ) : (
                    <div>
                        <h2>{recipeTitle}</h2>
                        <p>{recipeDescr}</p>
                        <div style={{color: 'white'}}>{recipeAuthor}</div>
                        <p style={{color: 'white'}}>{recipeLike}</p>
                        <button onClick={handleLikePress}>Like Recipe</button>
                        <button onClick={() => setShowEditRecipe(true)}>Изменить Рецепт</button>
                        <button onClick={handleDeleteRecipe}>Delete Рецепт</button>
                    </div>
                )
            }
            <div>
                <form style={{border: '1px solid white'}} onSubmit={handleCreateComment}>
                    <textarea  onChange={(e) => setCommentText(e.target.value)}/>
                    <button type={"submit"}>Add Comment</button>
                </form>
                {
                    recipeComments.map((comment: any) => {
                        return <AddComment deleteComment={handleDeleteComment} id={comment._id} key={comment._id} text={comment.text} author={comment.author?.name} like={comment.likes}/>
                    })
                }
            </div>
        </div> 
    )
}