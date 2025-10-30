import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Users, Calendar } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

export default function ClubDetail() {
  const { clubName } = useParams()

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/clubs">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clubs
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Club Header */}
          <Card>
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&h=400&fit=crop"
                className="w-full h-full object-cover"
                alt={clubName}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl font-bold capitalize">{clubName?.replace('-', ' ')}</h1>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-gray-600 text-lg">
                Welcome to the {clubName?.replace('-', ' ')} club! Join us to explore, learn, and grow together.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Club Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About the Club</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    This is a vibrant community of enthusiastic students who share a passion for{' '}
                    {clubName?.replace('-', ' ')}. We organize regular events, workshops, and activities
                    to help members develop their skills and connect with like-minded peers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900">Workshop</h4>
                      <p className="text-sm text-gray-600">February 15, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Club Leads
                  </Button>
                  <Button className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Join Club
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  )
}
