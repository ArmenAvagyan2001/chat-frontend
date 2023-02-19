import React, {useState} from 'react';

const InputCustom = ({id, label, button, type, error, ...inputProps}) => {

    const [show, setShow] = useState(true)

    return (
        <div className='custom_input'>
            <input id={id}
                   type={button && show ? "password" : 'text'}
                   placeholder={" "}
                   {...inputProps}
            />
            <label htmlFor={id}>{label}</label>
            <p>{error}</p>
            {button && <a onClick={() => setShow(!show)}>{show ? "Show" : "Hide"}</a>}
        </div>

    );
};

export default InputCustom;
