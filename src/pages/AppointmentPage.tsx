import React from "react";
import { useTranslation } from "react-i18next";
import AppointmentForm from "@/components/AppointmentForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AppointmentPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-salon-off-white to-salon-softer-pink">
      <Navbar />
      <div className="section-container pt-32">
        <div className="max-w-4xl mx-auto">
          <AppointmentForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentPage;
