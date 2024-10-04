
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

import axios from 'axios';
import Register from './pages/Register';
import IsLogged from './components/IsLogged';


axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<IsLogged />}>
        <Route index element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/main' element={<MainPage />} />
      </Route>
        <Route path='/register' element={<Register />} />
      
    </>
  )
);

function App() {
  return <>
    <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
    <RouterProvider router={router} />
  </>
}

export default App;