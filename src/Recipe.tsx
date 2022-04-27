import {FC} from 'react'

interface Iprop {
    title: string,
    descr: string
}

export const Recipe:FC<Iprop>  = ({title, descr}) => {
    return (
        <div style={{border: 'solid 4px violet'}}>
            <h2>{title}</h2>
            <p>{descr}</p>
        </div>
    )
}
