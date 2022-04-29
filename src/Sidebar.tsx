import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ReactComponent as SVGLogOut } from './assets/icons/log_out.svg'

export const Sidebar:FC = () => {
    const [logOutStatus, setLogOutStatus] = useState(false)
    const redirect = useNavigate()

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

    return (
        <Aside>
            <Menu>
                <ListGroup>
                    <ListItem>Рецепты</ListItem>
                </ListGroup>
            </Menu>
            <Footer>
                <Button onClick={handleLogOut}>
                    Log Out
                    <SVGLogOut />
                </Button>
            </Footer>
        </Aside>
    )
}

const Aside = styled.aside`
    box-sizing: border-box;
    background: #FFFFFF;
    width: 140px;
    height: 992px;
    border: 1px solid black;
    padding: 32px 37px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Menu = styled.nav``
const ListGroup = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
`
const ListItem = styled.li``
const Footer = styled.footer``
const Button = styled.button``
