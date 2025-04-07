
import { useState } from 'react';
import { toast } from 'sonner';
import { Calendar, Clock, Scissors, CheckCircle2 } from 'lucide-react';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast('Appointment request sent', {
        description: 'We will contact you shortly to confirm your booking.',
        icon: <CheckCircle2 className="text-green-500" />,
      });
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="glass-card shadow-soft-lg p-8 animate-on-scroll">
      <div className="flex items-center space-x-3 mb-8">
        <div className="h-10 w-10 rounded-full bg-salon-pink flex items-center justify-center text-white shadow-glow-pink">
          <Scissors size={16} />
        </div>
        <h3 className="font-display font-semibold text-2xl">Book Your Appointment</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-salon-text-dark">
              Full Name <span className="text-salon-pink">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-salon-text-dark">
              Email Address <span className="text-salon-pink">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-salon-text-dark">
              Phone Number <span className="text-salon-pink">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="service" className="text-sm font-medium text-salon-text-dark">
              Select Service <span className="text-salon-pink">*</span>
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
            >
              <option value="" disabled>Select a service</option>
              <option value="haircut">Haircut & Styling</option>
              <option value="color">Hair Coloring</option>
              <option value="highlights">Highlights/Lowlights</option>
              <option value="treatment">Hair Treatment</option>
              <option value="extensions">Hair Extensions</option>
              <option value="bridal">Bridal Package</option>
            </select>
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="date" className="text-sm font-medium text-salon-text-dark">
              Preferred Date <span className="text-salon-pink">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-salon-pink" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="time" className="text-sm font-medium text-salon-text-dark">
              Preferred Time <span className="text-salon-pink">*</span>
            </label>
            <div className="relative">
              <input
                type="time"
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
              />
              <Clock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-salon-pink" />
            </div>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-medium text-salon-text-dark">
            Special Requests (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
            placeholder="Any special requests or notes..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-center"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Schedule Appointment'
          )}
        </button>
        
        <p className="text-center text-sm text-salon-text-medium">
          By booking an appointment, you agree to our <a href="#" className="text-salon-pink underline">Terms of Service</a> and <a href="#" className="text-salon-pink underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
};

export default AppointmentForm;
