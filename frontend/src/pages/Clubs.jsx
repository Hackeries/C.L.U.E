import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, ArrowRight, Search, Mail } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'

export default function Clubs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [clubs] = useState([
    {
      id: 1,
      name: 'Tech Club',
      description: 'Explore the world of technology and innovation',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Literary Club',
      description: 'For those who love reading and writing',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Dance Club',
      description: 'Express yourself through the art of dance',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'Music Club',
      description: 'Create beautiful melodies and harmonies',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      name: 'Art Club',
      description: 'Unleash your creativity through visual arts',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      name: 'Photography Club',
      description: 'Capture moments and tell stories through images',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    },
  ])

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=600&fit=crop"
          className="w-full h-full object-cover"
          alt="Clubs Header"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Explore Campus Clubs
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Discover amazing clubs and join communities that match your interests
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Clubs Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Vibrant Clubs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join one of our diverse clubs and be part of something extraordinary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredClubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={club.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={club.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{club.description}</p>
                  <Link
                    to={`/clubs/${club.name.toLowerCase().replace(' ', '-')}`}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Clubs Found</h3>
            <p className="text-gray-500">Try adjusting your search term</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to Start Your Own Club?
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Have a passion you want to share? Connect with us to learn how to create your own club
          </p>
          <a
            href="mailto:clue@banasthali.in"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Us</span>
          </a>
        </motion.div>
      </section>
    </Layout>
  )
}
