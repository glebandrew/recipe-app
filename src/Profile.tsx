import { useEffect, useState } from 'react'

export const Profile = () => {
    // name login email
    const [nameUser, setNameUser] = useState('')
    const [loginUser, setLoginUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [recipesUser, setRecipesUser] = useState('')

    useEffect(() => {

    }, [])

    return (
    <div>Profile User</div>
    )
}