import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Settings, User, BarChart3 } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">한글 학습</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/" icon={<Home className="h-5 w-5" />} text="Home" />
                <NavLink to="/alphabet" icon={<BookOpen className="h-5 w-5" />} text="Alphabet" />
                <NavLink to="/practice" icon={<BarChart3 className="h-5 w-5" />} text="Practice" />
                <NavLink to="/progress" icon={<BarChart3 className="h-5 w-5" />} text="Progress" />
                <NavLink to="/profile" icon={<User className="h-5 w-5" />} text="Profile" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
        isActive
          ? 'border-b-2 border-indigo-500 text-gray-900'
          : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
};

export default Layout;