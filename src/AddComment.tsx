import {FC} from 'react'

interface Iprop {
    text: string,
    author: string,
    like: number
}

export const AddComment: FC<Iprop> = ({text, author, like}) => {
    return (
        <div>
            <p>{text}</p>
            <p>{author}</p>
            <p>{like}</p>
        </div>
    )
}