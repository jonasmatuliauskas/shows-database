import React from 'react';

const item = (props) => (
    <>
        <td 
            className="text-left" 
            data-th={props.colNames.firstColumn.displayTitle}>{props.firstColumn}</td>
        <td 
            className="text-left" 
            data-th={props.colNames.secondColumn.displayTitle}>{props.secondColumn}</td>
        <td 
            className="text-left" 
            data-th={props.colNames.thirdColumn.displayTitle}>{props.thirdColumn}</td>
    </>
)

export default item;