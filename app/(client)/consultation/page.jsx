"use client";

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BarChart3, Handshake, Lightbulb, Users, Globe, Clock } from 'lucide-react'; 
import { useInView } from 'react-intersection-observer';

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return [ref, controls];
};

const AnimatedSection = ({ children }) => {
  const [ref, controls] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function ConsultationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  const services = [
    {
      icon: BarChart3,
      title: "Investment Strategy",
      description: "Tailored investment strategies to meet your financial goals and risk tolerance.",
    },
    {
      icon: Handshake,
      title: "Wealth Management",
      description: "Comprehensive wealth management solutions for individuals and businesses.",
    },
    {
      icon: Lightbulb,
      title: "Financial Planning",
      description: "Expert financial planning to secure your future and achieve long-term objectives.",
    },
    {
      icon: Users,
      title: "Retirement Planning",
      description: "Customized retirement plans to ensure a comfortable and secure future.",
    },
    {
      icon: Globe,
      title: "Global Investment",
      description: "Access to international markets and diverse investment opportunities.",
    },
    {
      icon: Clock,
      title: "Tax Optimization",
      description: "Strategies to minimize tax liabilities and maximize your wealth.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0FAFF] mt-12">
      <main className="container mx-auto px-6 py-12">
        <AnimatedSection>
          <section className="mb-16 text-center">
            <h2 className="text-4xl font-semibold text-primary mb-6">
              Welcome to JMC Asset Management Ltd
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We provide expert consultation services tailored to your unique financial needs. Our team of seasoned professionals is
              dedicated to helping you achieve your financial goals and secure a prosperous future.
            </p>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
              Our Consultation Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-primary p-4 rounded-full">
                      <service.icon className="text-3xl text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="bg-white p-8 rounded-lg shadow-lg mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-primary text-center">
              Request a Personalized Consultation
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Take the first step towards financial success. Our expert consultants are ready to provide
              you with personalized advice and strategies tailored to your unique situation.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <motion.button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-teal-700 transition duration-300 text-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Your Consultation
                </motion.button>
              </div>
            </form>
          </section>
        </AnimatedSection>
      </main>
    </div>
  );
}
