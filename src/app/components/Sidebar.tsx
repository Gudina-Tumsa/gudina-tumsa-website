"use client"
import { Home, Search, BookOpen, BookMarked, CheckCircle, Notebook, Plus } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
    // const location = useLocation();

    const navigationItems = [
        { name: "Home", icon: Home, path: "/" },
        { name: "Research Assistant", icon: Search, path: "/research" },
        { name: "Browse", icon: BookOpen, path: "/browse" },
    ];

    const activityItems = [
        { name: "Reading", icon: BookOpen, path: "/reading", count: 1 },
        { name: "Want to read", icon: BookMarked, path: "/want-to-read", count: 0 },
        { name: "Completed", icon: CheckCircle, path: "/completed", count: 0 },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">GTF</h1>
            </div>

            <nav className="px-4">
                <ul className="space-y-1">
                    {navigationItems.map((item) => (
                        <li key={item.name}>
                            <a

                                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                    isActive(item.path)
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="mt-8">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        My Activity
                    </h3>
                    <ul className="mt-2 space-y-1">
                        {activityItems.map((item) => (
                            <li key={item.name}>
                                <a

                                    className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                        isActive(item.path)
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </div>
                                    <span className="text-gray-400 text-xs">{item.count}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <a

                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive("/notebook")
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                    >
                        <Notebook className="mr-3 h-5 w-5" />
                        Notebook
                    </a>
                </div>

                <div className="mt-8">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        My Bookshelves
                    </h3>
                    <button className="mt-2 flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors w-full">
                        <Plus className="mr-3 h-5 w-5" />
                        Create first bookshelf
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
