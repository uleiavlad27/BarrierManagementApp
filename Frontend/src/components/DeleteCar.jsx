import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dropdown = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');

  useEffect(() => {
    const showCars = async () => {
      try {
        const { data } = await axios.get('/cars');
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    
    showCars();
  }, []);

  const handleChange = (event) => setSelectedCar(event.target.value);

  const deleteCar = async (event) => {
    event.preventDefault();
    const license_plate = selectedCar;
    try{
      const { data } = await axios.delete(`/cars/${license_plate}`, {license_plate} )
      if( data.error) {
        toast.error(data.error)
      } else {
        toast.success("Car Deleted!")
        location.reload()
      }
    } catch(error){
      console.log(error);
    }
  }

  return (
    <div className="flex m-6">
      <div className="flex space-x-4">
        <select
          value={selectedCar}
          onChange={handleChange}
          className="flex-1 py-2 px-3 border border-gray-300 bg-white rounded-md sm:text-sm"
        >
          <option value="">Choose a Car to Delete</option>
          {cars.map((car) => (
            <option key={car.license_plate} value={car.license_plate}>
              {car.license_plate}
            </option>
          ))}
        </select>

        <button
        onClick={deleteCar}
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        >
          Delete Car
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
