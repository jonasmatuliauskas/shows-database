import React from 'react';

import Item from './Item/Item';

const itemsList = (props) => {

    const indexOfLastItem = props.currentPage * props.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - props.itemsPerPage;
    const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem)

    return (
    <>
        {currentItems.map( item => (
            <tr 
                key={item.id}
                onClick={() => props.clickedOnShow(item.id, item.name, item.premiered, item.rating)}
                className={(props.selectedItemId === item.id ? 'trActive' : null)}
            >
                <Item 
                    colNames={props.columnNames}
                    firstColumn={item.name}
                    secondColumn={item.premiered}
                    thirdColumn={item.rating}
                />
            </tr>
        ))}
    </>
    )
}

export default itemsList;