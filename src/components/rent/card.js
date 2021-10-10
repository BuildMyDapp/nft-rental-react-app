import React from 'react';
import './style-R.css';
import './style.css'


const RentCard = ({ data }) => {
    return (
        <div>
            {data.id}
            {data.name}
            <hr />
        </div>
    )
}

export default RentCard
