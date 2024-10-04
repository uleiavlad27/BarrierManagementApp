import { useState } from "react";
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
   
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();


  const ProceedLogin = async (e) => {
    e.preventDefault();
    const {email, password} = data
    try {
      const {data} = await axios.post('/login', {
        email,
        password
      })
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({});
        navigate('/main')
        location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  return (
    <>
      <div className='flex flex-col bg-white rounded-xl pb-10 m-8 mt-20 max-w-md mx-auto border-4'>
        <div className='text-4xl m-2 p-2 rounded-lg text-center'>
          Login
        </div>
        <form onSubmit={ProceedLogin}>
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
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
