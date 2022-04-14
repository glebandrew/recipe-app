import {FC} from 'react'

interface Iprop {
    text: string,
    author: string,
    like: number,
    id: string,
    deleteComment: (commentId: string) => void
}

export const AddComment: FC<Iprop> = ({id, text, author, like, deleteComment}) => {
    return (
        <div>
            <p>{text}</p>
            <p>{author}</p>
            <p>{like}</p>
            <button onClick={() => deleteComment(id)}>Delete Comment</button>
        </div>
    )
}