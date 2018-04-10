import React, {Component} from 'react';


const TableCell = (props) => {

    return(
        <div className="stable__column" key={+ new Date() + Math.floor(Math.random() * 999999)} >
            {props.value}
        </div>
    )

}

const TableRow = (props) => {

    let column = '';

    if(props.rowData){
        column = props.headers.map(header => {
            return <TableCell value={props.rowData[header.name]} 
                                    key={header.id} />
        })
    }


    return(
        <div className="stable__row">
            { column }
            <div className="stable__control">
                    <input type="button" value="-" className="button" 
                    onClick={()=>props.onRemoveItem(props.rowData.id)} />
            </div>
        </div>
    )

}


const ControlTable = (props) => {

    let rows = '';

    if(props.data){
        rows = props.data.map(row => {
            return <TableRow    rowData={row} headers={props.headers} 
                                key={ Math.floor(Math.random() * 999999)} 
                                onRemoveItem={props.onRemoveItem} />
        })
    }

    const headers = props.headers.map(header => {
        return <div className="stable__column stable__head" 
                    key={ Math.floor(Math.random() * 999999)} > {header.displayName} </div>
    })
   
    let table = '';

    if(props.data.length > 0 ){
        table = <div className="stable">
                    <div className="stable__header"> { headers } </div>
                    <div className="stable__body"> {rows} </div>
                </div>
    }

    return table;

}


export default ControlTable;