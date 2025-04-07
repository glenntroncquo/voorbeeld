import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Scissors,
  Paintbrush,
  Sparkles,
  Clock,
  Star,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
import AppointmentForm from "../components/AppointmentForm";
import { useLanguage } from "../context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-salon-lavender rounded-full filter blur-3xl opacity-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-salon-light-pink rounded-full filter blur-3xl opacity-20 z-0"></div>

        <div className="section-container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="relative z-10">
                <div className="rounded-2xl overflow-hidden border-4 border-white shadow-soft-lg">
                  <img
                    src="/path-to-your-image.jpg"
                    alt={t("heroImageAlt")}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="absolute -bottom-5 -right-5 glass-card p-4 shadow-glow-pink">
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill="#FF8FB2"
                          className="text-salon-pink"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-salon-text-dark">
                      5.0
                    </span>
                  </div>
                  <p className="text-salon-text-medium text-sm mt-1">
                    From 500+ Reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="inline-block px-4 py-1 rounded-full bg-salon-light-pink text-salon-pink text-sm font-medium mb-4 animate-on-scroll">
                {t("aboutOurSalon")}
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight animate-on-scroll">
                Ons verhaal{" "}
                <span className="text-salon-pink">With Passion</span>
              </h2>

              <p className="text-salon-text-medium mb-6 animate-on-scroll">
                At LuxeTress, we believe that great hair tells a story. Our
                journey began with a simple vision: to create a sanctuary where
                artistry meets luxury, where every client leaves feeling not
                just beautiful, but truly seen and celebrated.
              </p>

              <p className="text-salon-text-medium mb-8 animate-on-scroll">
                Our team of award-winning stylists combines technical excellence
                with creative vision, staying at the cutting edge of hair trends
                while respecting the timeless foundations of their craft. We use
                only premium, sustainable products that nourish your hair while
                delivering exceptional results.
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-3 animate-on-scroll">
                  <div className="h-12 w-12 rounded-full bg-salon-pink flex items-center justify-center text-white shadow-glow-pink">
                    <span className="font-semibold">15+</span>
                  </div>
                  <div>
                    <p className="font-medium text-salon-text-dark">
                      Expert Stylists
                    </p>
                    <p className="text-sm text-salon-text-medium">
                      Award Winning
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-3 animate-on-scroll"
                  style={{ animationDelay: "100ms" }}
                >
                  <div className="h-12 w-12 rounded-full bg-salon-lavender flex items-center justify-center text-salon-text-dark shadow-soft">
                    <span className="font-semibold">10+</span>
                  </div>
                  <div>
                    <p className="font-medium text-salon-text-dark">
                      Years of Experience
                    </p>
                    <p className="text-sm text-salon-text-medium">
                      Industry Leading
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/about"
                className="btn-primary inline-flex animate-on-scroll"
                style={{ animationDelay: "200ms" }}
              >
                Learn More About Us <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-salon-softer-pink py-20 mt-20 relative">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-salon-light-pink rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-salon-lavender rounded-full filter blur-3xl opacity-30 z-0"></div>

        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-white text-salon-pink text-sm font-medium mb-4 animate-on-scroll">
              Our Premium Services
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 animate-on-scroll">
              <span className="text-salon-text-dark">
                Elevate Your Look With
              </span>{" "}
              <span className="text-salon-pink">Our Expertise</span>
            </h2>

            <p className="text-salon-text-medium max-w-2xl mx-auto animate-on-scroll">
              From precision cuts to transformative colors, our services are
              designed to enhance your natural beauty and express your unique
              personality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Haircuts & Styling"
              description="Precision cuts and styling tailored to your face shape, hair texture, and personal style."
              price="From $45"
              imageSrc="https://images.unsplash.com/photo-1560869713-da86bd4b9845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              iconSrc={<Scissors size={16} className="text-white" />}
              delay={0}
              link="/services#cuts"
            />

            <ServiceCard
              title="Hair Coloring"
              description="From subtle highlights to bold fashion colors, our expert colorists will bring your vision to life."
              price="From $85"
              imageSrc="https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              iconSrc={<Paintbrush size={16} className="text-white" />}
              delay={100}
              link="/services#color"
            />

            <ServiceCard
              title="Hair Treatments"
              description="Rejuvenate and restore your hair's health with our premium treatments and masks."
              price="From $60"
              imageSrc="https://images.unsplash.com/photo-1522337360788-8b1a41f5e06b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              iconSrc={<Sparkles size={16} className="text-white" />}
              delay={200}
              link="/services#treatments"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="btn-primary inline-flex animate-on-scroll"
            >
              View All Services <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center glass-card-hover p-8 animate-on-scroll">
              <div className="h-14 w-14 rounded-full bg-salon-pink mx-auto flex items-center justify-center text-white shadow-glow-pink mb-6">
                <Scissors size={20} />
              </div>
              <h3 className="font-display font-semibold text-xl mb-4">
                Expert Stylists
              </h3>
              <p className="text-salon-text-medium">
                Our team consists of award-winning stylists with extensive
                training and experience.
              </p>
            </div>

            <div
              className="text-center glass-card-hover p-8 animate-on-scroll"
              style={{ animationDelay: "100ms" }}
            >
              <div className="h-14 w-14 rounded-full bg-salon-lavender mx-auto flex items-center justify-center text-salon-text-dark shadow-soft mb-6">
                <Paintbrush size={20} />
              </div>
              <h3 className="font-display font-semibold text-xl mb-4">
                Premium Products
              </h3>
              <p className="text-salon-text-medium">
                We use only the highest quality, sustainable and cruelty-free
                products for all services.
              </p>
            </div>

            <div
              className="text-center glass-card-hover p-8 animate-on-scroll"
              style={{ animationDelay: "200ms" }}
            >
              <div className="h-14 w-14 rounded-full bg-salon-pink mx-auto flex items-center justify-center text-white shadow-glow-pink mb-6">
                <Sparkles size={20} />
              </div>
              <h3 className="font-display font-semibold text-xl mb-4">
                Personalized Service
              </h3>
              <p className="text-salon-text-medium">
                Every service is tailored to your unique needs, style
                preferences and hair type.
              </p>
            </div>

            <div
              className="text-center glass-card-hover p-8 animate-on-scroll"
              style={{ animationDelay: "300ms" }}
            >
              <div className="h-14 w-14 rounded-full bg-salon-lavender mx-auto flex items-center justify-center text-salon-text-dark shadow-soft mb-6">
                <Clock size={20} />
              </div>
              <h3 className="font-display font-semibold text-xl mb-4">
                Flexible Hours
              </h3>
              <p className="text-salon-text-medium">
                We offer extended hours and online booking for your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-salon-lavender rounded-full filter blur-3xl opacity-20 z-0"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-salon-light-pink rounded-full filter blur-3xl opacity-20 z-0"></div>

        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-salon-light-pink text-salon-pink text-sm font-medium mb-4 animate-on-scroll">
              Client Testimonials
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 animate-on-scroll">
              <span className="text-salon-text-dark">What Our</span>{" "}
              <span className="text-salon-pink">Clients Say</span>
            </h2>

            <p className="text-salon-text-medium max-w-2xl mx-auto animate-on-scroll">
              Don't just take our word for it. Hear what our clients have to say
              about their experiences at LuxeTress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Emily Johnson"
              role="Regular Client"
              text="The stylists here truly understand what I want even when I can't fully articulate it. My hair has never looked better!"
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              delay={0}
            />

            <TestimonialCard
              name="Michael Chang"
              role="First-time Client"
              text="I was nervous about trying a new salon, but my stylist made me feel comfortable and gave me the best haircut I've had in years."
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              delay={100}
            />

            <TestimonialCard
              name="Sarah Williams"
              role="Regular Client"
              text="The balayage technique they used transformed my hair. I get compliments everywhere I go now!"
              rating={5}
              imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              delay={200}
            />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/about#testimonials"
              className="btn-primary inline-flex animate-on-scroll"
            >
              View More Testimonials <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="bg-salon-softer-pink py-20 relative">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-salon-light-pink rounded-full filter blur-3xl opacity-30 z-0"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-salon-lavender rounded-full filter blur-3xl opacity-30 z-0"></div>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-white text-salon-pink text-sm font-medium mb-4 animate-on-scroll">
                Schedule Your Visit
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight animate-on-scroll">
                <span className="text-salon-text-dark">Ready to </span>
                <span className="text-salon-pink">Transform Your Look?</span>
              </h2>

              <p className="text-salon-text-medium mb-8 animate-on-scroll">
                Book your appointment today and take the first step towards the
                hair of your dreams. Our friendly team is waiting to welcome you
                to the LuxeTress experience.
              </p>

              <div className="glass-card p-6 mb-8 animate-on-scroll">
                <h4 className="font-display font-semibold text-xl mb-4">
                  Why Book With Us
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-salon-pink/20 flex items-center justify-center mr-3">
                      <svg
                        className="h-4 w-4 text-salon-pink"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-salon-text-medium">
                      Free consultation with every new booking
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-salon-pink/20 flex items-center justify-center mr-3">
                      <svg
                        className="h-4 w-4 text-salon-pink"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-salon-text-medium">
                      Flexible rescheduling options
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-salon-pink/20 flex items-center justify-center mr-3">
                      <svg
                        className="h-4 w-4 text-salon-pink"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-salon-text-medium">
                      Complimentary refreshments
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-salon-pink/20 flex items-center justify-center mr-3">
                      <svg
                        className="h-4 w-4 text-salon-pink"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-salon-text-medium">
                      Special first-time client discounts
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 relative">
        <div className="section-container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-salon-light-pink text-salon-pink text-sm font-medium mb-4 animate-on-scroll">
              #LuxeTress
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 animate-on-scroll">
              <span className="text-salon-text-dark">Follow Our</span>{" "}
              <span className="text-salon-pink">Creative Journey</span>
            </h2>

            <p className="text-salon-text-medium max-w-2xl mx-auto animate-on-scroll">
              Stay updated with our latest work, behind-the-scenes moments, and
              hair inspiration.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5">
            {[
              "https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1562322140-8baeececf3df1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1523263685847-70b5cb2cdb56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              "https://images.8ykp.fzas.fanclfz.com/photo-1560869185-2c03ba23247jkSE?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=800",
              "https://images.unsplash.com/photo-1635594173692-2d-ae9blfad2213d8?ixlibcovery&auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1560869314-43892f567a24?iygliugbcthisisdad=Mb3wxMjA3fDB8MHygluLLl&auto=forma&fit=crop&w=400&q=80",
            ].map((image, index) => {
              const url =
                index === 3 || index === 4
                  ? `https://images.unsplash.com/photo-${
                      1560869000 + index * 1000
                    }-${Math.round(
                      Math.random() * 1000000
                    )}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`
                  : image;

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg aspect-square shadow-soft animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={url}
                    alt={`Instagram post ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-bounce-soft group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-3 text-white">
                      <div className="flex items-center text-xs">
                        <Heart size={12} className="mr-1" />
                        <span>{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex animate-on-scroll"
            >
              Follow us on Instagram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

// Heart icon for Instagram section
const Heart = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
