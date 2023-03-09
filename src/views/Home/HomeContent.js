import React from 'react';

const HomeContent = () => {

    return (
        <div className='room'>
            <div className="home-content">
                {'Welcome!'.split("").map((item, index) => {
                    return <h2 style={{animationDelay: `0.${index + 1}s`}} key={index}>{item}</h2>
                })}
            </div>
        </div>
    );
};

export default HomeContent;