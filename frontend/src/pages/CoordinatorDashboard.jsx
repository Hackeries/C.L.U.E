import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function CoordinatorDashboard() {
  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Coordinator Dashboard</h1>
          <Card>
            <CardHeader>
              <CardTitle>Welcome, Coordinator</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your department events and activities.</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  )
}
