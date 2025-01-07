import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">PM Batch Video Processor</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden lg:flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-primary">Home</a>
            <a href="/profile" className="text-gray-600 hover:text-primary">Profile</a>
            <a href="/storage" className="text-gray-600 hover:text-primary">Storage Manager</a>
          </nav>
        </div>
        <nav
          className={cn(
            "lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-48" : "max-h-0 overflow-hidden"
          )}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="/" className="text-gray-600 hover:text-primary">Home</a>
            <a href="/profile" className="text-gray-600 hover:text-primary">Profile</a>
            <a href="/storage" className="text-gray-600 hover:text-primary">Storage Manager</a>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;