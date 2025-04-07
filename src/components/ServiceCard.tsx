
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  iconSrc?: React.ReactNode;
  delay?: number;
  link: string;
}

const ServiceCard = ({ 
  title, 
  description, 
  price, 
  imageSrc, 
  iconSrc, 
  delay = 0,
  link 
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="glass-card-hover overflow-hidden animate-on-scroll"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden group">
        <div className="h-52 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-bounce-soft group-hover:scale-110"
          />
        </div>
        
        {/* Price tag */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1 shadow-soft">
          <span className="font-medium text-salon-pink">{price}</span>
        </div>
        
        {/* Icon */}
        {iconSrc && (
          <div className="absolute -bottom-5 left-5 bg-salon-pink w-10 h-10 rounded-full flex items-center justify-center shadow-glow-pink">
            {iconSrc}
          </div>
        )}
      </div>
      
      <div className="p-6 pt-8">
        <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
        <p className="text-salon-text-medium mb-4">{description}</p>
        
        <Link 
          to={link} 
          className="flex items-center font-medium text-salon-pink transition-all duration-300 ease-bounce-soft"
        >
          Learn More 
          <ChevronRight 
            size={16} 
            className={`ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
          />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
