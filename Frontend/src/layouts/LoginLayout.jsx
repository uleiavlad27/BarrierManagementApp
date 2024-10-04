import { Outlet } from "react-router-dom"
import LoggedNavbar from "../components/LoggedNavbar"

const LoginLayout = () => {
    return (
        <>
            <LoggedNavbar />
            <Outlet />
        </>
    )
}

export default LoginLayout