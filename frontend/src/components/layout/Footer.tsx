import { Phone, Mail, Globe, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#132E57] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Banasthali Vidyapith</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              P.O. Banasthali, Newai<br />
              Rajasthan 304022, India
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+91-93528 79844, 93528 79855</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="http://www.banasthali.org/banasthali/wcms/en/home/lower-menu/campus-tour/campus-life/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 text-sm transition-colors flex items-center space-x-2"
                >
                  <ArrowRight className="w-3 h-3" />
                  <span>Campus Life</span>
                </a>
              </li>
              <li>
                <a
                  href="http://www.banasthali.org/banasthali/wcms/en/home/lower-menu/news-event-n-announcements/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 text-sm transition-colors flex items-center space-x-2"
                >
                  <ArrowRight className="w-3 h-3" />
                  <span>Announcements</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:clue@banasthali.in"
                  className="text-gray-300 hover:text-green-400 text-sm transition-colors flex items-center space-x-2"
                >
                  <ArrowRight className="w-3 h-3" />
                  <span>Contact C.L.U.E</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Connect With Us</h3>
            <p className="text-gray-300 text-sm">
              Stay updated with the latest events and activities
            </p>
            <div className="flex space-x-4">
              <a
                href="http://www.banasthali.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="mailto:clue@banasthali.in"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 College Link Up for Events. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
