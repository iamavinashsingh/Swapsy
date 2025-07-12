import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Start = () => {
    return (
        <div className="min-h-screen bg-swapsy">
        <Navbar />
        
        <div className="container mx-auto px-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                    Share Skills, <span className="text-secondary">Grow Together</span>
                </h1>
                
                <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
                    Swapsy connects people who want to exchange skills. Teach what you know, learn what you don't.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                    to="/signup" 
                    className="bg-primary  shadow-btn border-2 border-transparent  w-40 flex justify-center text-lg font-bold px-6 py-3 rounded-md hover:bg-white  hover:text-primary transition"
                    >
                    Get Started
                    </Link>
                    <Link 
                    to="/login" 
                    className="bg-secondary shadow-btn border-2 border-transparent w-40 flex justify-center text-white text-lg font-bold px-6 py-3 rounded-md hover:bg-white hover:text-secondary transition"
                    >
                    Login
                    </Link>
                </div>
            </div>
            
            <div className="mt-20 grid md:grid-cols-3 gap-8">
                <div className="bg-card py-15 px-6 rounded-xl gap-5 flex  justify-center items-center shadow-btn">
                    <h3 className="bg-tertiary rounded-full px-3 py-1 flex  justify-center items-center text-4xl ">1</h3>
                    <div>
                        <h3 className="text-xl text-tertiary  font-bold mb-2">Create Profile</h3>
                        <p className="text-white">Showcase your skills and what you want to learn</p>
                    </div>                
                </div>
                
                <div className="bg-card py-15 px-6 rounded-xl flex gap-5 justify-center items-center shadow-btn">
                    <h3 className="bg-tertiary   rounded-full px-3 py-1 text-4xl flex  justify-center items-center">2</h3>
                    <div>
                        <h3 className="text-xl text-tertiary  font-bold mb-2">Find Partners</h3>
                        <p className="text-white">Discover people with matching skill interestsn</p>
                    </div>                
                </div>
                <div className="bg-card py-15 px-6 rounded-xl flex gap-5 justify-center items-center shadow-btn">
                    <h3 className="bg-tertiary  rounded-full px-3 py-1 text-4xl flex  justify-center items-center">3</h3>
                    <div>
                        <h3 className="text-xl text-tertiary  font-bold mb-2">Start Swapping</h3>
                        <p className="text-white">Arrange skill exchange sessions</p>
                    </div>                
                </div>
            </div>
            
        </div>
        </div>
    );
};

export default Start;