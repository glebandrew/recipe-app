import { FC } from 'react'
import styled from 'styled-components'
import PNGRecipe from './assets/images/app2.jpeg'

interface Iprop {
    title: string,
    descr: string,
    id: string,
    handleDetail: (recipeId: string) => void
}

export const Recipe:FC<Iprop>  = ({title, descr, id, handleDetail}) => {
    return (
        <Container onClick={() => handleDetail(id)}>
            <Img src={PNGRecipe}/>
            <Footer>
                <Title>{title}</Title>
                <Subtitle>{descr}</Subtitle>
            </Footer>
            
        </Container>
    )
}


const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 4px;
`
const Container = styled.div`
    cursor: pointer;
    display: grid;
    grid-template-rows: 280px 100px;
    align-items: center;
    justify-items: center;
    width: 364px;
    height: 380px;
    border-radius: 4px;
    background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
`
const Footer = styled.footer`
    width: 100%;
    height: 100px;
    display: block;
    background: #303030;
    border-radius: 0px 0px 4px 4px;
`
const Title = styled.h2`
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: #FFFFFF;
`
const Subtitle = styled.h3`
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #9C9C9C;
`