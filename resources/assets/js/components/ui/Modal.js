import React from 'react';
import Backdrop from './Backdrop';


const Modal = (props) => {

    return(
        <div>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div  style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    visibility: props.show? 'visible' : 'hidden',
                    opacity: props.show ? '1' : '0'
                }} className='modal' >
                {props.children}
            </div>
        </div>
    )

};

export default Modal;