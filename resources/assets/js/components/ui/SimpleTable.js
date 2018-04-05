import React from 'react';





const SimpleTable = (props) => {

    const columns = props.columns.map(column => {
        if(column.name === 'action'){
            return <div className='stable__column stable__column--control' key={column.id} >
                        {column.displayName}
                    </div>
        }else {
            return  <div className='stable__column' key={column.id} >
                    {column.displayName}
                </div>
        }
        
    })

    const data = props.data.map(d => {
        const columns = props.columns.map(c => {
            return <div className='stable__column' key={Math.random()} >
                        {d[c.name]}
                    </div>
        })

        return  <div className='stable__row' key={Math.random()} >
                    {columns}
                </div>
    });

    return(
        <div className='stable' >
            <div className='stable__header'>
                <div className='stable__row'>
                    { columns }
                </div>
            </div>
            <div className='stable__body'>
              {data}
            </div>
        </div>
    )

}

export default SimpleTable;