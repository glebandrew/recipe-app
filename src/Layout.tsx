import { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout:FC = () => {
    const [logOutStatus, setLogOutStatus] = useState(false)
    const redirect = useNavigate()
    const [authStatus, setAuthStatus] = useState(false)
    const [user, setUser] = useState<string>()

    useEffect(() => {
        const userName = localStorage.getItem('userName')
        if (userName)  {
            setUser(userName)
            setAuthStatus(true)
        }
    }, [])

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

    const handleLogOut = (status: boolean) => {
        redirect('/')
        setLogOutStatus((logOutStatus) => !logOutStatus)
        setAuthStatus(status)
    }


    return (
        <Container>
            <Header authUser={authStatus}/>
            <Wrapper>
                <Sidebar authUser={authStatus} logOut={handleLogOut} />
                <Main>
                    <Outlet />
                </Main>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 1440px;
    height: 1072px;
`
const Main = styled.main`
    border: 1px solid blue;
    width: 1300px;
    height: 992px;
`
const Wrapper = styled.div`
    display: flex;
`