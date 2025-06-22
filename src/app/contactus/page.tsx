import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";

export default function ContactPage() {
    return (
        <SidebarLayout>
            <div className="flex items-center justify-center min-h-[80vh] px-4">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                        Get in Touch
                    </h2>

                    <form className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 text-sm"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 text-sm"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 text-sm resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-200"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarLayout>
    );
}
