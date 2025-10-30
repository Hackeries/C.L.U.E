import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building, ArrowRight } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, CardContent } from '../components/ui/card'

const departments = [
  {
    id: 1,
    name: 'Computer Science',
    description: 'Advancing technology and innovation',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 2,
    name: 'Electronics',
    description: 'Building the future of electronics',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 3,
    name: 'Management',
    description: 'Leading with excellence',
    color: 'from-green-500 to-teal-600',
  },
  {
    id: 4,
    name: 'Biotechnology',
    description: 'Exploring life sciences',
    color: 'from-red-500 to-orange-600',
  },
]

export default function Departments() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop"
          className="w-full h-full object-cover"
          alt="Departments"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Our Departments
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Explore the diverse academic departments at Banasthali Vidyapith
            </p>
          </motion.div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/departments/${dept.name.toLowerCase().replace(' ', '-')}`}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
                  <div className={`h-32 bg-gradient-to-r ${dept.color} flex items-center justify-center`}>
                    <Building className="w-16 h-16 text-white opacity-80" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{dept.description}</p>
                    <div className="flex items-center text-purple-600 font-semibold">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
