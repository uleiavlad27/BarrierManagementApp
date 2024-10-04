import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const linkClass =  ({ isActive}) => 
        isActive
        ? 'bg-cyan-900 rounded-xl p-2 hover:bg-cyan-950 hover:rounded-xl transition-all'
        : 'p-2 hover:bg-cyan-950 hover:rounded-xl transition-all' 

    return (

        <nav className="sticky top-0 bg-cyan-800 border-b border-cyan-100">

            <div className=' px-2 mx-10 '>
                <div className='flex h-20 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center '>
                        <div className="text-white text-3xlpy-12">
                            <img src="src\assets\Ayres-logo3.1.png" width="164" sizes="(max-width: 479px) 33vw, (max-width: 767px) 23vw, 164px" ></img>
                        </div>
                        <div className='text-white md:ml-auto my-2 py-10'>
                            <div className='flex space-x-10 text-xl'>
                                <NavLink className= {linkClass} to='/about'>
                                    About Us
                                </NavLink>
                                <NavLink className={linkClass} to="/login">
                                    Login
                                </NavLink>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;