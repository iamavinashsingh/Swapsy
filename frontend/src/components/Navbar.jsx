import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/swapsy-logo.png'

const Navbar = () => {
    const { currentUser, logout } = useAuth();

    return (
        <nav className="bg-transparent backdrop:backdrop-blur-2xl px-10 py-4 ">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img src={Logo} alt="Swapsy Logo" className="h-12 inline-block mr-2" />
                </Link>
                
                <div className="flex items-center space-x-4">
                {currentUser ? (
                    <>
                    <Link to="/home" className="bg-secondary shadow-btn border-2 border-transparent w-25 flex justify-center text-white font-bold py-1 px-2 rounded-md hover:bg-white hover:text-secondary transition">
                        Home
                    </Link>
                    <button 
                        onClick={logout}
                        className="bg-primary  shadow-btn border-2 border-transparent  w-25 flex justify-center font-bold  py-1 px-2 rounded-md hover:bg-white  hover:text-primary transition"
                    >
                        Logout
                    </button>
                    </>
                ) : (
                    <>
                    <Link to="/login"  className="bg-secondary shadow-btn border-2 border-transparent w-20 flex justify-center text-white font-bold py-1 px-2 rounded-md hover:bg-white hover:text-secondary transition">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-primary  shadow-btn border-2 border-transparent  w-25 flex justify-center font-bold py-1 px-2 rounded-md hover:bg-white  hover:text-primary transition"
                    >
                        Sign Up
                    </Link>
                    </>
                )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;