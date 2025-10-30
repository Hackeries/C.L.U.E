import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Newspaper,
  Building,
  HelpCircle,
  Plus,
  MapPin,
  Info,
} from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const heroImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=900&fit=crop',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&h=900&fit=crop',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=900&fit=crop',
]

const faqs = [
  {
    question: 'How many clubs are in Banasthali?',
    answer: 'There is not a specific count as every department has several clubs.',
  },
  {
    question: 'How can I apply for an event?',
    answer: 'You can apply by logging in and creating your profile.',
  },
  {
    question: 'Is there any fee to attend events?',
    answer: 'Fee structure of each club is decided by the type of events that are hosted by them.',
  },
  {
    question: 'Can I be a part of any clubs?',
    answer: 'Yes, you can be part of a club by contacting the club leads.',
  },
  {
    question: 'Can I have the email of club leads?',
    answer: "Yes, emails of each club's leads are mentioned in their club profiles.",
  },
  {
    question: 'What is the C.L.U.E. and its motto?',
    answer:
      'C.L.U.E stands for "College Linkup of Events," where every event related to departments and their clubs is posted. Students of Banasthali Vidyapith can easily be notified about events and club activities, which increase student participation and encourage overall development.',
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showFaq, setShowFaq] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)

  return (
    <Layout>
      {/* Hero Slideshow Section */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <img src={image} className="w-full h-full object-cover" alt="Campus Event" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">C.L.U.E</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Your gateway to campus events, clubs, and activities at Banasthali Vidyapith
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/clubs"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Users className="w-5 h-5" />
                <span>Explore Clubs</span>
              </Link>
              <Link
                to="/calendar"
                className="inline-flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                <span>View Events</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest from Campus
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, events, and activities happening across campus
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Latest News Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <CardTitle className="flex items-center space-x-3">
                  <Newspaper className="w-6 h-6" />
                  <span>Latest News</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-72 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-400 pl-4 py-2 hover:bg-gray-50 transition-colors rounded-r-lg">
                    <h4 className="font-semibold text-gray-900">Welcome to the new semester!</h4>
                    <p className="text-sm text-gray-500">January 15, 2025</p>
                    <p className="text-sm text-gray-600 mt-1">Join us for exciting events this semester...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Department Events Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardTitle className="flex items-center space-x-3">
                  <Building className="w-6 h-6" />
                  <span>From Departments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-72 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 transition-colors rounded-r-lg">
                    <h4 className="font-semibold text-gray-900">Tech Symposium 2025</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Main Auditorium
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Club Events Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-400 to-cyan-500 text-white">
                <CardTitle className="flex items-center space-x-3">
                  <Users className="w-6 h-6" />
                  <span>From Clubs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-72 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border-l-4 border-green-400 pl-4 py-2 hover:bg-gray-50 transition-colors rounded-r-lg">
                    <h4 className="font-semibold text-gray-900">Cultural Fest</h4>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      February 20, 2025
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden">
            <button
              onClick={() => setShowFaq(!showFaq)}
              className="w-full flex items-center justify-between text-left p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-8 h-8 text-[#132E57]" />
                <span className="text-2xl font-bold text-gray-800">Frequently Asked Questions</span>
              </div>
              <Plus className={`w-6 h-6 transition-transform ${showFaq ? 'rotate-45' : ''}`} />
            </button>

            {showFaq && (
              <CardContent className="p-6 space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#132E57] transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full px-6 py-4 font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-between text-left"
                    >
                      <span className="flex items-center space-x-3">
                        <Info className="w-5 h-5 text-[#132E57]" />
                        <span>{faq.question}</span>
                      </span>
                      <Plus className={`w-5 h-5 transition-transform ${openFaqIndex === index ? 'rotate-45' : ''}`} />
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-6 py-4 text-gray-600 bg-gray-50">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        </motion.div>
      </section>
    </Layout>
  )
}
