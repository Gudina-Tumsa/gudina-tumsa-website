// import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Logo & Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-sm">G</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">GTL</span>
                        </div>

                        <div className="text-gray-600 space-y-1 mb-4 text-sm">
                            <p>Gudina and Tsehay Legacy Office</p>
                            <p>Yerer, Leka Building, 3rd Floor</p>
                            <p>Addis Ababa, Ethiopia</p>
                            <p className="mt-3">
                                Email:{" "}
                                <a
                                    href="mailto:info@gudinaandtsehaylegacy.org"
                                    className="text-blue-600 hover:underline"
                                >
                                    info@gudinaandtsehaylegacy.org
                                </a>
                            </p>
                            <p>Phone: +251-900916524</p>
                        </div>

                        {/* App Store Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors w-full sm:w-auto">
                                <div className="text-xs">
                                    <div>Download on the</div>
                                    <div className="font-semibold">App Store</div>
                                </div>
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors w-full sm:w-auto">
                                <div className="text-xs">
                                    <div>GET IT ON</div>
                                    <div className="font-semibold">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Partners */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Partners</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-gray-900 transition-colors">GTL</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">GTF</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Ilaamee Ministry</a></li>
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Biftu Bole Mekane Yesus</a></li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Useful Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-gray-900 transition-colors">Event</a></li>
                            <li><a href="/collaborations" className="hover:text-gray-900 transition-colors">Collaboration</a></li>
                            <li><a href="/contactus" className="hover:text-gray-900 transition-colors">Contact & Help</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/about" className="hover:text-gray-900 transition-colors">About</a></li>
                            <li><a href="/careers" className="hover:text-gray-900 transition-colors">Careers</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                    {/* Copyright */}
                    <div className="text-sm text-gray-500 flex flex-wrap justify-center sm:justify-start gap-2">
                        <span>© GTL 2025</span>
                        <span>|</span>
                        <a href="/content-policy" className="hover:text-gray-700 transition-colors">Content Policy</a>
                        <span>|</span>
                        <a href="/terms" className="hover:text-gray-700 transition-colors">Terms</a>
                        <span>|</span>
                        <a href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</a>
                    </div>

                    {/* Social Media */}
                    <div className="flex space-x-3">
                        <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">F</a>
                        <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">T</a>
                        <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">L</a>
                        <a href="#" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-colors">I</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
