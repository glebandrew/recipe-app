import { FC } from 'react'
import styled from 'styled-components'

export const Sidebar:FC = () => {
    return (
        <Aside>Sidebar</Aside>
    )
}

const Aside = styled.aside`
    border: 4px solid green;
`
