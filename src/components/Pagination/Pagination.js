import React from 'react';

const pagination = (props) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.data.length / props.itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            <nav className="u-margin-top-50 u-margin-bottom-50">
            <ul className="pagination justify-content-center">
                <li className={'page-item ' + (props.currentPage === 1 ? 'disabled' : null)}>
                    <button 
                        className="page-link"
                        onClick={() => props.changeCurrentPage('prev')}   
                        disabled={props.currentPage === 1}
                        type="button"
                        >Previous</button>
                </li>
                {pageNumbers.map( number => (
                    <li
                        key={number}
                        className={"page-item " + (props.currentPage === number ? 'active' : null)}
                        onClick={() => props.changeCurrentPage(number)}
                    >
                        <div className="page-link">{number}</div>
                    </li>
                ))}
                <li className={"page-item " + (props.currentPage === pageNumbers.length ? 'disabled' : null)}>
                    <button 
                        className="page-link"
                        onClick={() => props.changeCurrentPage('next')}
                        disabled={props.currentPage === pageNumbers.length}
                        type="button"

                    >Next</button>
                </li>
            </ul>
            <div>
                <p>Items per page:</p>
                <button 
                    type="button" 
                    onClick={() => props.itemsPerPageHandler(500)}>500</button>
                <button 
                    type="button" 
                    onClick={() => props.itemsPerPageHandler(750)}>750</button>
                <button 
                    type="button" 
                    onClick={() => props.itemsPerPageHandler(1000)}>1000</button>
                <button 
                    type="button" 
                    onClick={() => props.itemsPerPageHandler('all')}>Show all</button>
            </div>
            </nav>
        </>
    )
}

export default pagination;