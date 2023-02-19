import React from 'react';

const ButtonCustom = ({text, backgroundColor = 'rgb(216 89 140)', onClick, loading, cursor = 'auto'}) => {
    return (
        <div className='button_custom'>
            <button style={{backgroundColor, cursor}}
                    onClick={onClick}
            >
                {text}
                {loading ?  <i className='fa fa-circle-o-notch fa-spin' /> : null }
            </button>
        </div>
    );
};

export default ButtonCustom;
