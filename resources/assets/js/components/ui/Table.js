import React from 'react';


const TableFooter = (props) => {

    const pages = []

    for(var i=1; i<=props.lasPage; i++){
        pages.push(<option key={i} value={i} > {i} </option>)
    }

    return(
        <tfoot className='table__footer' >
            <tr className='footer__row'>
                <td className='table__column'>
                    <button className='pagination__control' 
                            disabled={props.currentPage === 1}
                            onClick={props.prevPage} >
                        <i className="fa fa-chevron-left"></i>
                    </button>
                    <button className='pagination__control' 
                            disabled={props.currentPage===props.lastPage}
                            onClick={props.nextPage}>
                        <i className="fa fa-chevron-right"></i>
                    </button>
                </td>
                <td></td>
                <td className='table__column pagination__section--info' >
                    <span className='pagination__text' >Page</span>
                    
                    <select value={props.currentPage} onChange={props.selectPage}
                            className='pagination__select' >
                        {pages}
                    </select>
                    <span className='pagination__text' > of {props.lasPage} </span>
                </td>
            </tr>
        </tfoot>
    )
}

const Table = (props) => {

    const columns = props.columns.map(column => {
        return <td className='table__column column-header'
                    key={column.id} onClick={() => props.sortPage(column.name) }  > 
                    <span className='column-text'> {column.displayName} </span>
                    {
                        props.sort.field === column.name? (
                            props.sort.direction === 'asc'? 
                            <i className="sort-icon fa fa-sort-up"></i> :
                            <i className="sort-icon fa fa-sort-down"></i>
                        ) : ''
                    }
                </td>
    });

    const tableData = props.tableData.map(data => {

        const columnData = props.columns.map(column => {
            return <td className='table__column' 
                       key={Math.random()} >
                { data[column.name]}
            </td>
        });

        return <tr  className='table__row' 
                    key={Math.random()} onClick={() => props.selectData(data.id)} >{ columnData }</tr>

    })

    return (
        <table className='table' >
            <thead className='table__header'>
                <tr className='table__row'>
                    { columns }
                </tr>
            </thead>
            <tbody className='table__body'>
                {tableData}
            </tbody>
            <TableFooter nextPage={props.nextPage} 
                         prevPage={props.prevPage} 
                         lasPage={props.lastPage} 
                         currentPage={props.currentPage} 
                         selectPage={props.selectPage} sort={props.sort} />
        </table>

    )

}

export default Table;