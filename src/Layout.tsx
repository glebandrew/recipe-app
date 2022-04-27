import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout:FC = () => {
    return (
        <Container>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </Container>
    )
}

const Container = styled.div`
    
`
const Main = styled.main`
    border: 4px solid blue;
`