"use client";
import React, { useState } from "react";
import Link from "next/link";
import {Menu, X, Home, Users, Lightbulb, Settings, Phone, ChevronRight, ChevronDown, Store, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({onOpenModal}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const router = useRouter();
 
  const navigationItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home size={20} />,
    },
    {
      name: "About Us",
      href: "/aboutus",
      icon: <Users size={20} />,
    },
    {
      name: "Solutions",
      href: "/solutions",
      icon: <Lightbulb size={20} />,
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Startups / Brands",
          href: "/solutions/brands",
          icon: <Store size={18} />,
        },
        {
          name: "Buyers / Distributors",
          href: "/solutions/distributors", 
          icon: <Truck size={18} />,
        }
      ]
    },
    {
      name: "Services",
      href: "/services",
      icon: <Settings size={20} />,
    },
    {
      name: "Contact Us",
      href: "/contactus",
      icon: <Phone size={20} />,
    },
  ];

  const handleNavigation = (href) => {
    router.push(href); 
    setIsOpen(false);
    setIsSolutionsOpen(false);
  };

  return (
    <div className="relative">
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-5 bg-white/90 backdrop-blur-md shadow fixed top-0 w-full z-50">
        {/* Logo */}
        <div className="flex cursor-pointer items-center space-x-2">
          <Link href="/">
            <h1 className="text-3xl font-extrabold">
              <span className="text-[#F97316]">koop</span>
              <span className="text-[#112F41]">india</span>
              <span className="text-[#F97316]">.</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-bold text-black">
          {navigationItems.map((item) => (
            <div key={item.name} className="relative">
              {item.hasDropdown ? (
                <div className="relative group">
                  <button
                    className="flex items-center space-x-1 hover:text-[#F97316] transition-colors duration-200"
                    onMouseEnter={() => setIsSolutionsOpen(true)}
                    onMouseLeave={() => setIsSolutionsOpen(false)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 transition-all duration-200 ${
                      isSolutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setIsSolutionsOpen(true)}
                    onMouseLeave={() => setIsSolutionsOpen(false)}
                  >
                    <div className="p-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F97316]/10 hover:text-[#F97316] transition-colors duration-200 group"
                        >
                          <span className="text-[#112F41] group-hover:text-[#F97316] mt-1">
                            {dropdownItem.icon}
                          </span>
                          <div>
                            <div className="font-semibold">{dropdownItem.name}</div>
                            <div className="text-xs text-gray-500 group-hover:text-[#F97316]/70">
                              {dropdownItem.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#F97316] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Get Started Button */}
        <div className="hidden md:block">
          <button
             onClick={onOpenModal}
            className="bg-[#F97316] hover:bg-[#c75e10] text-white font-bold px-4 py-2 rounded transition-colors duration-200 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#112F41] z-50 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#F97316]/5 to-[#112F41]/5">
          <h1 className="text-2xl font-bold">
            <span className="text-[#F97316]">koop</span>
            <span className="text-[#112F41]">india</span>
            <span className="text-[#F97316]">.</span>
          </h1>
          <button
            className="text-gray-600 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-gray-300 hover:border-red-300"
            onClick={() => setIsOpen(false)}
            title="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-4 px-4">
          {navigationItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                    className="flex items-center justify-between w-full p-4 text-left font-semibold text-gray-800 hover:bg-[#F97316]/10 hover:text-[#F97316] rounded-lg transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-[#112F41] group-hover:text-[#F97316] transition-colors duration-200">
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 group-hover:text-[#F97316] transition-all duration-200 ${
                        isSolutionsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {/* Mobile Dropdown */}
                  <div className={`ml-4 overflow-hidden transition-all duration-200 ${
                    isSolutionsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {item.dropdownItems.map((dropdownItem) => (
                      <button
                        key={dropdownItem.name}
                        onClick={() => handleNavigation(dropdownItem.href)}
                        className="flex items-start space-x-3 w-full p-3 text-left rounded-lg hover:bg-[#F97316]/10 hover:text-[#F97316] transition-colors duration-200 group"
                      >
                        <span className="text-[#112F41] group-hover:text-[#F97316] mt-1">
                          {dropdownItem.icon}
                        </span>
                        <div>
                          <div className="font-medium text-sm">{dropdownItem.name}</div>
                          <div className="text-xs text-gray-500 group-hover:text-[#F97316]/70">
                            {dropdownItem.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center justify-between w-full p-4 text-left font-semibold text-gray-800 hover:bg-[#F97316]/10 hover:text-[#F97316] rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-[#112F41] group-hover:text-[#F97316] transition-colors duration-200">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-gray-400 group-hover:text-[#F97316] group-hover:translate-x-1 transition-all duration-200"
                  />
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Get Started */}
        <div className="px-4 mt-8">
          <button
            onClick={onOpenModal}
            className="w-full bg-[#F97316] hover:bg-[#c75e10] text-white font-bold px-6 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <h2 className="text-lg font-bold">
              <span className="text-[#F97316]">Koop</span>
              <span className="text-[#112F41]">India</span>
              <span className="text-[#F97316]">.</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;