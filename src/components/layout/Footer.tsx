import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-sm">G</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">GTL</span>
                        </div>

                        {/* Address Section */}
                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">123 Business Avenue</p>
                            <p className="text-gray-600 mb-2">Tech Park, Suite 456</p>
                            <p className="text-gray-600 mb-2">San Francisco, CA 94107</p>
                            <p className="text-gray-600">United States</p>
                        </div>

                        {/* App Store Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors">
                                <div className="text-xs">
                                    <div>Download on the</div>
                                    <div className="font-semibold">App Store</div>
                                </div>
                            </div>
                            <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors">
                                <div className="text-xs">
                                    <div>GET IT ON</div>
                                    <div className="font-semibold">Google Play</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Partners</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">GTL</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">GTF</a></li>

                        </ul>
                    </div>


                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Useful links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Event</a></li>
                            <li><a href="/collaborations" className="text-gray-600 hover:text-gray-900 transition-colors">Collaboration</a></li>

                            <li><a href="/contactus" className="text-gray-600 hover:text-gray-900 transition-colors">Contact & Help</a></li>

                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
                            <li><a href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>

                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Press Room</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                        {/* Copyright and Legal Links */}
                        <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                            <span>© GTL 2025</span>
                            <span>|</span>

                            <a href="/content-policy" className="hover:text-gray-700 transition-colors">content-policy</a>
                            <span>|</span>

                            <a href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</a>
                            <span>|</span>
                            <a href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</a>

                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                                <Twitter size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-colors">
                                <Instagram size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;