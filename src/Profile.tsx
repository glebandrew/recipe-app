import { useEffect, FormEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
    const redirectMain = useNavigate()
    
    const [nameUser, setNameUser] = useState('')
    const [loginUser, setLoginUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [recipesUser, setRecipesUser] = useState([])

    const [editStatus, setEditStatus] = useState(false)
    const [editName, setEditName] = useState('')
    const [editLogin, setEditLogin] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editData, setEditData] = useState({
        name: '',
        login: '',
        email: ''
    })

    const [changePassword, showChangePassword] = useState(false)
    const [editStatusPassword, setEditStatusPassword] = useState(false)
    const [editOldPassword, setEditOldPassword] = useState('')
    const [editPassword, setEditPassword] = useState('')
    const [editPasswordAgain, setEditPasswordAgain] = useState('')
    const [editNewPasswords, setEditNewPasswords] = useState({
        oldPassword: '',
        password: '',
        passwordAgain: ''
    })

    const [refreshUser, setRefreshUser] = useState(true)
    const [editUser, showEditUser] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)

    useEffect(() => {
        if (refreshUser) {
        const getProfile = async () => {
            console.log("Profile",localStorage.getItem("token"))
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            };
            const result = await axios.get(`http://localhost:3000/user/profile`, config)
            return result
        }
        getProfile()
            .then(res => {
                setNameUser(res.data.user?.name)
                setLoginUser(res.data.user?.login)
                setEmailUser(res.data.user?.email)
                setRecipesUser(res.data.recipes)
                setRefreshUser(false)
            })
            .catch(() => console.log("Ошибка промиса getProfile"))
        }
    }, [refreshUser])

    useEffect(() => {
        if (editStatus) {
            const editUser = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post(`http://localhost:3000/user/profile/edit`, editData, config)
                return result
            }
            editUser()
                .then(res => {
                    console.log(res)
                    setRefreshUser(true)
                })
                .catch(() => console.log("Ошибка промиса editUser"))
            setEditStatus(false)
        }
    }, [editStatus, editData])

    useEffect(() => {
        if (editStatusPassword) {
            const changePas = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post(`http://localhost:3000/user/profile/edit/password`, editNewPasswords, config)
                return result
            }
            changePas()
                .then(res => {
                    console.log(res)
                    console.log('Пароль успешно изменен!')
                    setRefreshUser(true)
                })
                .catch(() => console.log("Ошибка промиса changePas"))
            setEditStatusPassword(false)
        }
    }, [editStatusPassword, editNewPasswords])


    useEffect(() => {
        if (deleteStatus) {
            const delUser = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                };
                const result = await axios.post(`http://localhost:3000/user/profile/delete`, null, config)
                return result
            }
            delUser()
                .then(res => {
                    console.log(res)
                    console.log('vi delete user')
                    setRefreshUser(true)
                })
                .catch(() => console.log("Ошибка промиса delUser"))
            setDeleteStatus(false)
        }
    }, [deleteStatus])

    const redirectOnDashboard = () => {
        redirectMain(-1)
    }

    const handleDeleteUser = () => {
        setDeleteStatus((state) => !state)
    }

    const handleEditUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEditData((state) => ({
            ...state,
            name: editName,
            login: editLogin,
            email: editEmail
        }))
        setEditStatus((editStatus) => !editStatus)
        showEditUser(false)
    }

    const handleCangePassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEditNewPasswords((state) => ({
            ...state,
            oldPassword: editOldPassword,
            password: editPassword,
            passwordAgain: editPasswordAgain
        }))
        setEditStatusPassword((state) => !state)
        showChangePassword(false)
    }

    return (
        <div>
            <button onClick={redirectOnDashboard}>На главную</button>
            {
                editUser ? (
                    <form onSubmit={handleEditUser}>
                        <input value={editName} onChange={(e) => setEditName(e.target.value)}/>
                        <input value={editLogin} onChange={(e) => setEditLogin(e.target.value)}/>
                        <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)}/>
                        <button type={'submit'}>Сохранить</button>
                    </form> 
                ) : (
                    <div>
                        <p>Name: {nameUser}</p>
                        <p>Login: {loginUser}</p>
                        <p>Email: {emailUser}</p>

                        {
                            changePassword ? (
                                <form onSubmit={handleCangePassword}>
                                    <label>
                                        Введите старый пароль:
                                        <input value={editOldPassword} onChange={(e) => setEditOldPassword(e.target.value)}/>
                                    </label>
                                    <label>
                                        Введите новый пароль:
                                        <input value={editPassword} onChange={(e) => setEditPassword(e.target.value)}/>
                                    </label>
                                    <label>
                                        Повторите пароль:
                                        <input value={editPasswordAgain} onChange={(e) => setEditPasswordAgain(e.target.value)}/>
                                    </label>
                                    <button type={'submit'}>Сохранить</button>
                                </form>
                            ) : (
                                <button onClick={() => showChangePassword(true)}>Change пароль</button>
                            )
                        }
                        
                        <button onClick={() => showEditUser(true)}>Изменить Profile</button>
                        <button onClick={handleDeleteUser}>Delete Юзер</button>
                    </div>
                )
            }
            
            <p>My recipes:</p>
            {
                recipesUser?.map((recipe: any) => {
                    return (
                        <div key={recipe._id} style={{border: 'solid 1px white'}}>
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}