import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

export default function DepartmentDetail() {
  const { deptName } = useParams()

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/departments">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Departments
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl capitalize">{deptName?.replace('-', ' ')} Department</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg">
                Welcome to the {deptName?.replace('-', ' ')} department. We are committed to academic excellence
                and innovation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-900">Department Symposium</h4>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    February 20, 2025
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    Main Auditorium
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  )
}
