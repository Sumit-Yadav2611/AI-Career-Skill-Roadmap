import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export const AppShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F] text-slate-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex-1 flex w-full relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 flex flex-col transition-all duration-300 w-full min-h-[calc(100vh-4rem)]">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
