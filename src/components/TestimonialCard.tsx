
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  rating: number;
  imageSrc: string;
  delay?: number;
}

const TestimonialCard = ({ name, role, text, rating, imageSrc, delay = 0 }: TestimonialCardProps) => {
  return (
    <div 
      className="glass-card-hover p-6 animate-on-scroll"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-soft">
          <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-salon-text-dark">{name}</h4>
          <p className="text-sm text-salon-text-medium">{role}</p>
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star 
                key={index} 
                size={14} 
                fill={index < rating ? "#FF8FB2" : "transparent"} 
                className={index < rating ? "text-salon-pink" : "text-salon-text-light"}
              />
            ))}
          </div>
        </div>
      </div>
      
      <blockquote className="relative">
        <span className="absolute -top-4 -left-1 text-salon-pink text-4xl opacity-20">"</span>
        <p className="text-salon-text-medium relative z-10">{text}</p>
        <span className="absolute -bottom-8 -right-1 text-salon-pink text-4xl opacity-20">"</span>
      </blockquote>
    </div>
  );
};

export default TestimonialCard;
