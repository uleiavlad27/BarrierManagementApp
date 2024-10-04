import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LoggedNavbar from './LoggedNavbar';
import Navbar from './Navbar';

const IsLogged = () => {
    const [auth, setAuth] = useState(false);
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Checking auth...");
        axios.get('/main')
            .then(res => {
                console.log("Auth check response: ", res.data);
                if (res.data.Status === "Success") {
                    setAuth(true);
                } else {
                    console.log("Not authenticated, redirecting...");
                    setAuth(false);
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log("Error during auth check: ", err);
                setAuth(false);
                navigate('/login');
            });
    }, [navigate]);

    return (
        <>
            {auth ? (
                <>
                    <LoggedNavbar />
                </>
            ) : (
                <>
                    <Navbar />
                </>
            )}
            <Outlet />
        </>
    );
}

export default IsLogged;
