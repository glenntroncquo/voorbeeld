
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Scissors, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-salon-softer-pink pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-salon-pink rounded-full flex items-center justify-center text-white shadow-glow-pink">
                <Scissors size={18} />
              </div>
              <span className="text-xl font-display font-semibold text-salon-text-dark">Luxe<span className="text-salon-pink">Tress</span></span>
            </div>
            <p className="text-salon-text-medium mb-6">
              Transforming hair and boosting confidence with premium services and a personalized approach to beauty.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-soft transition-all hover:shadow-glow-pink">
                <Instagram size={18} className="text-salon-pink" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-soft transition-all hover:shadow-glow-pink">
                <Facebook size={18} className="text-salon-pink" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-soft transition-all hover:shadow-glow-pink">
                <Twitter size={18} className="text-salon-pink" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#cuts" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Haircuts & Styling
                </Link>
              </li>
              <li>
                <Link to="/services#color" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Hair Coloring
                </Link>
              </li>
              <li>
                <Link to="/services#treatments" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Hair Treatments
                </Link>
              </li>
              <li>
                <Link to="/services#extensions" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Extensions
                </Link>
              </li>
              <li>
                <Link to="/services#bridal" className="text-salon-text-medium hover:text-salon-pink transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-salon-pink rounded-full mr-2"></span>
                  Bridal Packages
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-salon-pink mt-1 mr-3 flex-shrink-0" />
                <span className="text-salon-text-medium">123 Beauty Street, Fashion District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-salon-pink mr-3 flex-shrink-0" />
                <a href="tel:+12345678900" className="text-salon-text-medium hover:text-salon-pink transition-colors">+1 (234) 567-8900</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-salon-pink mr-3 flex-shrink-0" />
                <a href="mailto:hello@luxetress.com" className="text-salon-text-medium hover:text-salon-pink transition-colors">hello@luxetress.com</a>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="text-salon-pink mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-salon-text-medium">Mon-Fri: 9am - 8pm</p>
                  <p className="text-salon-text-medium">Sat: 9am - 6pm</p>
                  <p className="text-salon-text-medium">Sun: 10am - 4pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-salon-pink/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-salon-text-medium text-sm">© {new Date().getFullYear()} LuxeTress. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-salon-text-medium hover:text-salon-pink transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-salon-text-medium hover:text-salon-pink transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-salon-text-medium hover:text-salon-pink transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
