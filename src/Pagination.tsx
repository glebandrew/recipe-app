import ReactPaginate from 'react-paginate';

export const Pagination = () => {
    return (
        <div>
            <ReactPaginate 
                pageCount={15} 
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
            />
        </div>
    )
}