
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scissors } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-salon-pink rounded-full flex items-center justify-center text-white shadow-glow-pink group-hover:shadow-glow-pink-lg transition-all duration-300">
              <Scissors size={18} />
            </div>
            <span className="text-xl font-display font-semibold text-salon-text-dark">
              Dana<span className="text-salon-pink">Hair</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`highlight-link font-medium ${
                isActive("/")
                  ? "text-salon-pink"
                  : "text-salon-text-dark hover:text-salon-text-medium transition-colors"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              to="/about"
              className={`highlight-link font-medium ${
                isActive("/about")
                  ? "text-salon-pink"
                  : "text-salon-text-dark hover:text-salon-text-medium transition-colors"
              }`}
            >
              {t("about")}
            </Link>
            <Link
              to="/services"
              className={`highlight-link font-medium ${
                isActive("/services")
                  ? "text-salon-pink"
                  : "text-salon-text-dark hover:text-salon-text-medium transition-colors"
              }`}
            >
              {t("services")}
            </Link>
            <Link
              to="/gallery"
              className={`highlight-link font-medium ${
                isActive("/gallery")
                  ? "text-salon-pink"
                  : "text-salon-text-dark hover:text-salon-text-medium transition-colors"
              }`}
            >
              {t("gallery")}
            </Link>
            <Link
              to="/contact"
              className={`highlight-link font-medium ${
                isActive("/contact")
                  ? "text-salon-pink"
                  : "text-salon-text-dark hover:text-salon-text-medium transition-colors"
              }`}
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/appointment" className="btn-primary">
              {t("bookAppointment")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-full bg-white/80 shadow-soft"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-[70px] bg-white/90 backdrop-blur-md shadow-soft transition-all duration-300 ease-bounce-soft ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col space-y-3 p-6">
          <Link
            to="/"
            className={`py-2 px-4 rounded-lg ${
              isActive("/")
                ? "bg-salon-softer-pink text-salon-pink"
                : "text-salon-text-dark"
            }`}
          >
            {t("home")}
          </Link>
          <Link
            to="/about"
            className={`py-2 px-4 rounded-lg ${
              isActive("/about")
                ? "bg-salon-softer-pink text-salon-pink"
                : "text-salon-text-dark"
            }`}
          >
            {t("about")}
          </Link>
          <Link
            to="/services"
            className={`py-2 px-4 rounded-lg ${
              isActive("/services")
                ? "bg-salon-softer-pink text-salon-pink"
                : "text-salon-text-dark"
            }`}
          >
            {t("services")}
          </Link>
          <Link
            to="/gallery"
            className={`py-2 px-4 rounded-lg ${
              isActive("/gallery")
                ? "bg-salon-softer-pink text-salon-pink"
                : "text-salon-text-dark"
            }`}
          >
            {t("gallery")}
          </Link>
          <Link
            to="/contact"
            className={`py-2 px-4 rounded-lg ${
              isActive("/contact")
                ? "bg-salon-softer-pink text-salon-pink"
                : "text-salon-text-dark"
            }`}
          >
            {t("contact")}
          </Link>
          <Link to="/appointment" className="btn-primary mt-2">
            {t("bookAppointment")}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
