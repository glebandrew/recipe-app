import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout:FC = () => {
    return (
        <Container>
            <Header />
            <Wrapper>
                <Sidebar />
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