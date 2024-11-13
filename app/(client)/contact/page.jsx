import React from 'react';
import { MapPin, Phone, Mail, Send, User, MessageSquare, Clock} from 'lucide-react';

const LocationMap = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 tracking-tight">
            JMC Asset Management Limited
          </h1>
        
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-white shadow-2xl rounded-3xl overflow-hidden transform hover:scale-[1.02] transition duration-300">
            <div className="p-6 bg-primary text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center">
                <MapPin className="mr-3" size={28} /> Our Location
              </h2>
              <span className="text-sm bg-white text-primary px-4 py-1 rounded-full font-semibold">
                Dhaka, Bangladesh
              </span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0326707444417!2d90.44273821492546!3d23.765373084581183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c78c2a0db3f1%3A0x3c0d10bd59b2a2c4!2sJMC%20Technology%20Limited!5e0!3m2!1sen!2sbd!4v1629789065919!5m2!1sen!2sbd"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
            <div className="p-8 bg-gray-50">
              <p className="text-primary flex items-start mb-6 text-lg font-medium">
                <MapPin className="mr-3 mt-1 flex-shrink-0 text-primary" size={24} />
                Block-H, MN Tower, House: 01 N - S Rd, Dhaka 1212
              </p>
              <div className="flex justify-between text-sm text-primary/80 font-medium">
                <span className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" /> Sat-Thu: 9AM-6PM
                </span>
             
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden p-8 space-y-10">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary flex items-center">
                <Phone className="mr-3 text-primary" size={32} /> Contact Us
              </h2>
              <div className="space-y-4">
                <p className="text-primary flex items-center text-lg font-medium">
                  <Phone className="mr-3 text-primary" size={24} /> +880 1321210095
                </p>
                <p className="text-primary flex items-center text-lg font-medium">
                  <Mail className="mr-3 text-primary" size={24} /> jmc.asset@gmail.com
                </p>
              </div>
            </div>
            
            <form className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-primary flex items-center">
                <MessageSquare className="mr-3 text-primary" size={28} /> Get in Touch
              </h3>
              <div className="relative">
                <input type="text" id="name" name="name" className="w-full pl-12 pr-4 py-3 border-2 border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 text-primary" placeholder="Your Name" />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
              </div>
              <div className="relative">
                <input type="email" id="email" name="email" className="w-full pl-12 pr-4 py-3 border-2 border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 text-primary" placeholder="Your Email" />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
              </div>
              <div className="relative">
                <textarea id="message" name="message" rows="4" className="w-full pl-12 pr-4 py-3 border-2 border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 text-primary" placeholder="Your Message"></textarea>
                <MessageSquare className="absolute left-4 top-4 text-primary" size={20} />
              </div>
              <button type="submit" className="w-full flex justify-center items-center px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 text-lg font-semibold shadow-lg hover:shadow-xl">
                <Send className="mr-3" size={20} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;