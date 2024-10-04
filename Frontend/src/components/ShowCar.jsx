import {useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShowCar = () => {
    const [cars, setCars] = useState([]);

    const showCars = async () => {
        try{
            const response = await axios.get('/cars');
            setCars(response.data);
        } catch(error){
            toast.error("Error in showing the cars: " + error)
        }
    }

    useEffect(() => {
    showCars();
}, [])

    return (
        <div className='border-2 m-2 rounded-lg bg-slate-100 border-gray-200 '>
            <h1 className='text-3xl  text-center  mx- 4 m-2 bg-slate-300 rounded-lg'>Car List</h1>
        
            <ul className='text-xl text-center text-gray-500'>
                {cars.map((car) => (
                    <li
                    className='border-2 mx-16 m-2 rounded-xl bg-slate-200' 
                    key={car.license_plate}>{car.license_plate}</li> // Adjust fields to match your car entity structure
                ))}
            </ul>
        </div>
    );
};

export default ShowCar;
