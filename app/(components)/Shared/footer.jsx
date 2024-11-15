import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import map from '../../Asset/footer/map-01.png';
import logo from '../../../public/images/asset.svg';
import phone from '../../Asset/footer/phone-call-01.png';
import mail from '../../Asset/footer/mail-05.png';
import instragram from '../../Asset/footer/instragram.png';
import twitter from '../../Asset/footer/twitter.png';
import facebook from '../../Asset/footer/facebook.png';
import send from '../../Asset/footer/Icon.png';

export default function Footer() {
  return (
    <footer className="bg-[#002233] text-[#DDF0FF] py-10 md:py-20 ">
      <div className="container mx-auto px-8 text-center ">
        <div className="mb-8">
          <Image src={logo} alt="JMC Asset Management" width={100} height={40} className="ml-0 md:ml-24 lg:ml-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 lg:gap-24">
          {/* Contact Info */}
          <div className="space-y-6 text-left">
            <div className="flex items-start justify-start space-x-4">
              <Image src={map} alt="Address" width={18} height={18} />
              <p className="text-xs md:text-sm">
                Flat# 8B, Level# 08, Main Road, Block# H, Aftabnagar, Badda,
                <br />
                Dhaka 1212, Bangladesh
              </p>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <Image src={phone} alt="Phone" width={18} height={18} />
              <p className="text-xs md:text-sm">+880 13212 10095 (JMC Asset Hotline)</p>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <Image src={mail} alt="Email" width={18} height={18} />
              <p className="text-xs md:text-sm">support@jmc.properties (Customer Care)</p>
            </div>
            <div className="flex items-center justify-start space-x-4">
              <Image src={phone} alt="Phone" width={18} height={18} />
              <p className="text-xs md:text-sm">+880 13099 91999 (JMC Group Hotline)</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <ul className="text-xs md:text-sm space-y-4 md:mt-1 ">
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/legal">Legal</Link></li>
              <li><Link href="/board-of-directors">Board of Directors</Link></li>
              <li><Link href="/career">Career</Link></li>
              <li><Link href="/contacts">Contacts</Link></li>
            </ul>
          </div>

          {/* Stay up to date */}
          <div className="text-left">
            <p className="text-md md:text-lg mb-2">Stay up to date.</p>
            <form className="flex justify-start mb-4 mt-4">
              <input
                type="email"
                placeholder="jmc.asset@gmail.com"
                className="bg-white text-gray-800 px-3 py-2 text-xs md:text-sm rounded-l-md w-48 md:w-56"
              />
              <button
                type="submit"
                className="bg-white border-l border-white text-white px-3 py-2 rounded-r-md"
              >
                <Image src={send} alt="Send" width={16} height={16} />
              </button>  
            </form>
            <p className="text-md md:text-lg mb-2 mt-8">Follow us on</p>
            <div className="w-32 h-0.5 bg-[#00476B] mb-4"></div>
            <div className="flex justify-start space-x-4 mt-4 mb-12">
              <Link href="https://www.x.com/jmcasset" className="hover:opacity-80 transition duration-300">
                <Image src={twitter} alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="https://www.facebook.com/jmcasset" className="hover:opacity-80 transition duration-300">
                <Image src={facebook} alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/jmcasset" className="hover:opacity-80 transition duration-300">
                <Image src={instragram} alt="Instagram" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-xs md:text-sm">Website: <Link href="https://www.jmc.properties" className="hover:underline">www.jmc.properties</Link></p>
          <p className="text-xs md:text-sm">Administration: info@jmc.properties</p>
        </div>
      </div>
    </footer>
  );
}
