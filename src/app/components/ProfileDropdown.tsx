import { useState } from 'react';

function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logging out...');
    };

    return (
        <div className="relative">
            {/* Clickable profile icon */}
            <div
                className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={toggleDropdown}
            >
                <span className="text-white font-semibold">A</span>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                    {/* Name and Email */}
                    <div className="px-3 py-4">
                        <p className="text-base font-semibold text-gray-800">John Doe</p>
                        <p className="text-sm text-gray-500 mt-1">john.doe@example.com</p>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-100 my-1" />

                    {/* Menu items */}
                    <div className="space-y-1">
                        <a
                            href="#"
                            className="block px-3 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors relative group"
                        >
                            <div className="flex justify-between items-center">
                                <span>Settings</span>
                                <span className="w-1 h-6 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            </div>
                        </a>
                     

                        <a
                            href="#"
                            className="block px-3 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors relative group"
                        >
                            <div className="flex justify-between items-center">
                                <span>Contact Us</span>
                                <span className="w-1 h-6 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            </div>
                        </a>

                        {/* Divider before logout */}
                        <hr className="border-gray-100 my-1" />

                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-3 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors relative group"
                        >
                            <div className="flex justify-between items-center">
                                <span>Logout</span>
                                <span className="w-1 h-6 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;