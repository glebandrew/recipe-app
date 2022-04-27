import { FC } from 'react'
import styled from 'styled-components'

export const Header:FC = () => {
    return (
        <HeaderApp>
            User
            SearchBar
            Profile
            AddRecipe
        </HeaderApp>
    )
}

const HeaderApp = styled.header`
    width: 100%;
    height: 50px;
    background: red;
`