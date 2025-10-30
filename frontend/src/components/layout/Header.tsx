import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Users, Building, Calendar, LogIn } from 'lucide-react'
import { Button } from '../ui/button'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Clubs', path: '/clubs', icon: Users },
    { name: 'Departments', path: '/departments', icon: Building },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#132E57] shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-12 w-12 rounded-full ring-2 ring-white ring-offset-2 ring-offset-[#132E57] transition-transform group-hover:scale-110 bg-green-400 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">B</span>
            </div>
            <span className="text-3xl font-bold text-green-400 tracking-wider hidden sm:block transition-all group-hover:text-green-300">
              C.L.U.E
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                  isActive(path)
                    ? 'text-green-400'
                    : 'text-white hover:text-green-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </Link>
            ))}
          </div>
          
          {/* User Profile / Login Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1f3d] border-t border-gray-700">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  isActive(path)
                    ? 'bg-white bg-opacity-20 text-green-400'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-blue-500 px-4 py-3 rounded-lg text-white font-semibold"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
