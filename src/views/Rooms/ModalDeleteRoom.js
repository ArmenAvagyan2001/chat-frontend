import React from 'react';
import ButtonCustom from "../../components/customs/ButtonCustom";

const ModalDeleteRoom = ({active, setActive}) => {

    const handleClose = () => {
        setActive(false)
    }

    return (
        <div className={`modal ${active && 'active'}`}>
            <div className={`modal-content ${active && 'active'}`}>
                <div className='closeModalButton' onClick={handleClose}>
                    <i className='fa fa-close'></i>
                </div>
                <div className='modalDeleteRoom'>
                    <p>do you want to delete this room?</p>
                    <div>
                        <ButtonCustom text={'yes'} cursor={'pointer'} />
                        <ButtonCustom text={'no'} cursor={'pointer'} onClick={handleClose} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteRoom;