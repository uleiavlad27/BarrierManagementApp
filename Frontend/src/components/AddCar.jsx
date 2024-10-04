import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const AddCar = () => {

    const [car, setCar] = useState('')

    const addCar = async (event) => {
        event.preventDefault();
        const license_plate = car;
        try{
            const { data } = await axios.post('/cars', {license_plate})
            if (data.error){
                toast.error(data.error)
            } else {
                
                toast.success("Car Added!")
                location.reload()
            }
        }catch(error){
            console.error(error);
            toast.error("An unexpected error occurred: " + (error.response?.data?.error || error.message));
        }
    }

    const handleInputChange = (event) => {
        setCar(event.target.value);
    }
    
    return (
        <div className="text-2xl text-start mt-10 m-6">
        <form onSubmit={addCar}>
            <label>License Plate Number
                <input className="border-2 rounded-xl border-gray-400 mx-2"
                value={car}
                onChange={handleInputChange} />
                <button className="text-xl border-2 rounded-xl border-gray-300 p-0.5 px-1"
                >
                    Add Car
                </button>
            </label>
            </form>
        </div>
    )
}

export default AddCar