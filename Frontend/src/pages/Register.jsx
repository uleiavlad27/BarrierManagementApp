import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from 'axios'
import Navbar from "../components/Navbar";



const Register = () => {

    const [data, setData] = useState({
        name: '',
        phone_nr: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    const ProceedRegister = async (event) => {
        event.preventDefault();
        const { name, phone_nr, email, password , } = data;
        try {
            const { data } = await axios.post('/register', {
                name,phone_nr, email, password,
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success("Register Successful. Welcome!")
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Navbar />
            <div className='flex flex-col bg-white rounded-xl pb-10 m-8 mt-20 max-w-md mx-auto border-4'>
                <div className='text-4xl m-2 p-2 rounded-lg text-center'>
                    Register
                </div>
                <form onSubmit={ProceedRegister}>
                <div className="m-4">
                        <input
                            placeholder="Enter Your Name"
                            onChange={e => setData({ ...data, name: e.target.value })}
                            className="w-full rounded-xl border-2 p-2"
                        />
                    </div>
                <div className="m-4">
                        <input
                            placeholder="Enter Your Phone Number"
                            onChange={e => setData({ ...data, phone_nr: e.target.value })}
                            className="w-full rounded-xl border-2 p-2"
                        />
                    </div>
                    <div className="m-4">
                        <input
                            placeholder="Enter Your Email"
                            onChange={e => setData({ ...data, email: e.target.value })}
                            className="w-full rounded-xl border-2 p-2"
                        />
                    </div>
                    <div className="m-4">
                        <input
                        type="password"
                            placeholder="Enter Your Password"
                            onChange={e => setData({ ...data, password: e.target.value })}
                            className="w-full rounded-xl border-2 p-2"
                        />
                    </div>
                    
                    <div className="flex justify-evenly">
                        <button type="submit" className="text-xl text-white bg-cyan-800 rounded-xl p-2 hover:bg-cyan-900 hover:rounded-xl transition-all">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register