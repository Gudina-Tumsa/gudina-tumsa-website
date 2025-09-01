import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";


function StoreButtons() {
    return (

        <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-8">

            <button
                type="button"

                className="px-3 flex items-center justify-center w-full sm:w-48 h-14 text-white bg-black rounded-xl"
            >
                <div className="mr-3">
                    <svg viewBox="0 0 384 512" width="30">
                        <path
                            fill="currentColor"
                            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                        ></path>
                    </svg>
                </div>
                <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="-mt-1 font-sans text-md font-semibold">App Store</div>
                </div>
            </button>

            {/* Google Play Button */}
            <button
                type="button"
                className="px-3 flex items-center justify-center w-full sm:w-48 h-14 text-white bg-black rounded-xl"
            >
                <div className="mr-3">
                    <svg viewBox="30 336.7 120.9 129.2" width="30">
                        <path
                            fill="#FFD400"
                            d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                        ></path>
                        <path
                            fill="#FF3333"
                            d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                        ></path>
                        <path
                            fill="#48FF48"
                            d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                        ></path>
                        <path
                            fill="#3BCCFF"
                            d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                        ></path>
                    </svg>
                </div>
                <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="-mt-1 font-sans text-md font-semibold">Google Play</div>
                </div>
            </button>
        </div>
    );
}

const Footer = () => {
    return (
        <footer className="bg-gray-200 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Top Section */}
                {/* flex-col lg:flex-row -> Key change for responsiveness. Stacks on mobile, row on large screens. */}
                {/* gap-10 -> Adds spacing between stacked items on mobile. */}
                <div className="flex flex-col text-center lg:flex-row lg:text-left lg:justify-between gap-10">
                    {/* Logo & Info */}
                    {/* items-center lg:items-start -> Centers content on mobile, aligns left on large screens */}
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex items-center mb-4">
                            <span className="text-xl font-bold text-gray-900">GTL Library</span>
                        </div>
                        <div className="text-gray-600 space-y-1 mb-4 text-sm">
                            <p>Gudina and Tsehay Legacy Office</p>
                            <p>Yerer, Leka Building, 3rd Floor</p>
                            <p>Addis Ababa, Ethiopia</p>
                            <p>Phone: +251-900916524</p>
                        </div>
                        <StoreButtons />
                    </div>

                    {/* Partners */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Partners</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="https://gudinaandtsehaylegacy.org/" className="hover:text-gray-900 transition-colors">Gudina and Tsehay Legacy</a></li>
                            <li><a href="https://gudinatumsafoundation.org/" className="hover:text-gray-900 transition-colors">Gudina Tumsa Foundation</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Ilaamee Ministry</a></li>
                            <li><a href="https://biftubole.org/" className="hover:text-gray-900 transition-colors">Biftu Bole Mekane Yesus</a></li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Useful Links</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/events" className="hover:text-gray-900 transition-colors">Event</a></li>
                            <li><a href="/collaborations" className="hover:text-gray-900 transition-colors">Collaboration</a></li>
                            <li><a href="/contactus" className="hover:text-gray-900 transition-colors">Contact & Help</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/about" className="hover:text-gray-900 transition-colors">About</a></li>
                            <li><a href="/careers" className="hover:text-gray-900 transition-colors">Careers</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                {/* This section was already responsive (flex-col sm:flex-row), so no major changes needed. */}
                <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                    {/* Copyright */}
                    <div className="text-sm text-gray-500 flex flex-wrap justify-center sm:justify-start gap-x-2 gap-y-1">
                        <span>© GTL 2025</span>
                        <span className="hidden sm:inline">|</span>
                        <a href="/content-policy" className="hover:text-gray-700 transition-colors">Content Policy</a>
                        <span className="hidden sm:inline">|</span>
                        <a href="/terms" className="hover:text-gray-700 transition-colors">Terms</a>
                        <span className="hidden sm:inline">|</span>
                        <a href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</a>
                    </div>
                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook"><Facebook className="text-gray-500 hover:text-gray-900 transition-colors" /></a>
                        <a href="#" aria-label="Twitter"><Twitter className="text-gray-500 hover:text-gray-900 transition-colors" /></a>
                        <a href="#" aria-label="Instagram"><Instagram className="text-gray-500 hover:text-gray-900 transition-colors" /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin className="text-gray-500 hover:text-gray-900 transition-colors" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
