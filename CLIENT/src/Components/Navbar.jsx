import React, { useState } from 'react'
import { Menu, X } from "lucide-react";
import { NavLink } from 'react-router-dom';

const Navbar = ({home}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <>
            <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="border-l-4 border-blue-800 pl-4 text-slate-400 font-mono bg-gray-800 py-2 px-2 w-fit shadow">
                    saunak @ ~/portfolio
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                <div className={`md:flex space-x-4 hidden`}>
                    <NavLink to="/" className="hover:text-indigo-400">Home</NavLink>
                    <NavLink to="/about" className="hover:text-indigo-400">About</NavLink>
                    <NavLink to="/achievements" className="hover:text-indigo-400">Achievements</NavLink>
                    <NavLink to="/resume" className="hover:text-indigo-400">Resume</NavLink>
                    {home && <a href="#contact" onClick={scrollToContact} className="hover:text-indigo-400">Contact</a>}
                </div>
            </nav>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden fixed top-16 left-0 right-0 bg-gray-900 text-center py-4 z-40 space-y-4 shadow-md">
                    <NavLink to="/" className="block hover:text-indigo-400" onClick={toggleMenu}>Home</NavLink>
                    <NavLink to="/about" className="block hover:text-indigo-400" onClick={toggleMenu}>About</NavLink>
                    <NavLink to="/achievements" className="block hover:text-indigo-400" onClick={toggleMenu}>Achievements</NavLink>
                    <NavLink to="/resume" className="block hover:text-indigo-400" onClick={toggleMenu}>Resume</NavLink>
                    {home && <a href="#contact" onClick={scrollToContact} className="block hover:text-indigo-400">Contact</a>}
                </div>
            )}
        </>
    )
}

export default Navbar
