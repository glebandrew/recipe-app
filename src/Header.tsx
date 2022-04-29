import { FC } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom"
import { ReactComponent as SVGProfile } from './assets/icons/profile.svg'

export const Header:FC = () => {
    const redirect = useNavigate()
    const handleSignIn = () => redirect('/signin')
    const handleSignUp = () => redirect('/signup')
    const handleProfile = () => redirect(`profile`)
    return (
        <HeaderApp>
            <Logo>Recipe</Logo>
            <RightBlock>
                <Button onClick={handleSignIn}>Sign In</Button>
                <Button onClick={handleSignUp}>Sign Up</Button>
            </RightBlock>
            <RightBlock>
                <UserProfile onClick={handleProfile}>John Smith</UserProfile>
                <SVGProfile />
            </RightBlock>
        </HeaderApp>
    )
}

const HeaderApp = styled.header`
    width: 100%;
    height: 80px;
    background: #FFFFFF;
    box-shadow: 0px 1px 10px rgba(209, 209, 209, 0.5);
    display: flex;
    box-sizing: border-box;
    padding: 16px 51px;
    align-items: center;
    justify-content: space-between;
`
const Logo = styled.h2`
    
`
const RightBlock = styled.div`

`
const UserProfile = styled.button`

`
const Button = styled.button`
    
`

