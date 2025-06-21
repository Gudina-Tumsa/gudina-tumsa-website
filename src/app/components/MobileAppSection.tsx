const MobileAppSection = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="text-center pt-16 pb-8">
                <p className="font-medium text-black tracking-wider uppercase mb-4">
                    OUR APP
                </p>
                <h1 className="text-5xl md:text-6xl font-light leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium italic">
                        Take every book
                    </span>{" "}
                    <span className="text-gray-900">with you.</span>
                </h1>
            </div>

            {/* Main Content */}
            <div className="w-[45%] mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-2 "> {/* Changed gap-16 to gap-8 */}
                    {/* Left Content */}
                    <div className=""> {/* Added right padding */}
                        <div>
                            <h2 className="text-3xl font-light text-gray-900 mb-2">
                                Start at your desk.
                            </h2>
                            <h2 className="text-3xl font-light text-gray-900 mb-6">
                                Continue on-the-go.
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                            Forget your heavy book bag. Start your study session with
                            Perlego on desktop, then use our app to continue reading on
                            your phone, or tablet whenever you get a moment.
                        </p>
                    </div>

                    {/* Right Content - Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="w-80 h-96 bg-gray-100 rounded-2xl shadow-xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1688668603709-4df6a026ed88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vYmlsZSUyMGFwcGxpY2F0aW9ufGVufDB8fDB8fHww"
                                    alt="Book reading interface"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating elements for visual interest */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500 rounded-full opacity-15"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileAppSection;