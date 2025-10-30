import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { Calendar, MapPin, Clock } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, CardContent } from '../components/ui/card'

export default function EventDetail() {
  const { eventId } = useParams()
  
  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Event Details</h1>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Sample Event</h2>
              <div className="space-y-2">
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />February 15, 2025</div>
                <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />10:00 AM</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />Main Auditorium</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  )
}
