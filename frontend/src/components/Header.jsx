import { Button } from "@/components/ui/button";
import { Code, Menu, Trophy, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-dark-bg/95 backdrop-blur supports-[backdrop-filter]:bg-dark-bg/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Code className="h-8 w-8 text-code-blue group-hover:text-code-purple transition-colors duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-code-purple to-code-blue rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-code-blue to-code-purple bg-clip-text text-transparent">
            CodeCraft
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" className="text-gray-300 hover:text-code-blue hover:bg-dark-card/50">
            <Trophy className="h-4 w-4 mr-2" />
            Contest
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-code-blue hover:bg-dark-card/50">
            <BookOpen className="h-4 w-4 mr-2" />
            Problems
          </Button>
          <Button variant="ghost" className="text-gray-300 hover:text-code-blue hover:bg-dark-card/50">
            <Users className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Link to="/signin">
            <Button variant="ghost" className="hidden sm:inline-flex text-gray-300 hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-code-purple to-code-blue hover:from-code-blue hover:to-code-purple text-white transition-all duration-300 shadow-lg hover:shadow-xl">
              Sign Up
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden text-gray-300">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;