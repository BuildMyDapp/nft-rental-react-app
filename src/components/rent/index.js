import React,{useEffect,useState} from 'react';
import './style-R.css';
import './style.css';
import RentCard from './card';
import {rentData} from '../../data/index';

const Rent = () => {
    const [rentStateData,setRentStateData] = useState();
    useEffect(async()=>{
        let fetchData = await rentData;
        setRentStateData(fetchData)

    },[])
    return (
        <div>
            <h1>
                Rental Screen
                { rentStateData ?
                    rentStateData.map((data) => (
                        <RentCard data={data} />
                    ))
                    :
                    ""
                }
            </h1>
        </div>
    )
}

export default Rent
