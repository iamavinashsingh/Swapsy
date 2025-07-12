import { Link } from 'react-router-dom';
import Logo from '../assets/swapsy-logo.png'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
            <img src={Logo} alt="Swapsy Logo" className="h-8 inline-block mr-2" />
        </Link>

        {/* Auth Buttons */}
        <div className="space-x-4">
            <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100"
            >
            Login
            </Link>
            <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
            Signup
            </Link>
        </div>
        </nav>
    );
};

export default Navbar;
