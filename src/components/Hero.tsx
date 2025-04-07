import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Heart, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
    }
  }, []);

  return (
    <div className="min-h-[85vh] relative overflow-hidden" ref={heroRef}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-salon-softer-pink via-white to-salon-lavender/30 opacity-70 z-0"></div>
      <div className="absolute top-1/4 -left-10 w-56 h-56 bg-salon-light-pink rounded-full filter blur-3xl opacity-30 animate-pulse-soft"></div>
      <div
        className="absolute bottom-1/3 right-0 w-64 h-64 bg-salon-lavender rounded-full filter blur-3xl opacity-30 animate-pulse-soft"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Decorative Star Elements */}
      <div
        className="absolute top-1/4 left-1/4 animate-pulse-soft"
        style={{ animationDelay: "0.5s" }}
      >
        <Star size={24} className="text-salon-pink opacity-30" />
      </div>
      <div
        className="absolute top-1/3 right-1/3 animate-pulse-soft"
        style={{ animationDelay: "1.5s" }}
      >
        <Star size={16} className="text-salon-pink opacity-20" />
      </div>
      <div
        className="absolute bottom-1/4 left-1/3 animate-pulse-soft"
        style={{ animationDelay: "2s" }}
      >
        <Star size={20} className="text-salon-pink opacity-25" />
      </div>

      {/* Main Content */}
      <div className="section-container relative z-10 pt-24 md:pt-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <div className="inline-block mb-4 px-4 py-1.5 bg-white/70 backdrop-blur-md rounded-full shadow-soft">
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    fill="#FF8FB2"
                    className="text-salon-pink mr-0.5"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-salon-text-dark">
                {t("ourRating")}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 tracking-tight">
            <span className="text-salon-text-dark">{t("heroTitle1")}</span>
            <br />
            <span className="text-salon-pink">{t("heroTitle2")}</span>
          </h1>

          <p className="text-salon-text-medium text-lg md:text-xl mb-8 md:max-w-md">
            {t("heroDesc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/contact" className="btn-primary">
              {t("bookAppointment")} <ChevronRight size={18} />
            </Link>
            <Link to="/services" className="btn-outline">
              {t("exploreServices")}
            </Link>
          </div>

         
        </div>

        <div className="md:w-1/2 relative">
          <div className="relative z-10">
            {/* Main image with shadow and border */}
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-soft-lg bg-white h-[600px]">
              <img
                src="/hero.webp"
                alt="Two stylists in pink blazers with affirmations in the background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating card elements */}
            <div className="absolute -top-5 -left-5 glass-card p-4 shadow-soft">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-salon-pink flex items-center justify-center text-white">
                  <Heart size={16} fill="white" />
                </div>
                <div>
                  <p className="font-medium text-salon-text-dark text-sm">
                    {t("topRated")}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 glass-card p-4 shadow-soft">
              <p className="font-medium text-salon-text-dark text-sm">
                {t("naturalOrganic")}
              </p>
              <p className="text-xs text-salon-text-medium">
                {t("premiumProducts")}
              </p>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-salon-lavender rounded-full filter blur-2xl opacity-30 z-0"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-salon-light-pink rounded-full filter blur-2xl opacity-40 z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
