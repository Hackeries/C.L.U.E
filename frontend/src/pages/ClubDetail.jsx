import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { Card, CardContent } from '../components/ui/card'

export default function ClubDetail() {
  const { clubName } = useParams()
  
  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-8 capitalize">{clubName?.replace('-', ' ')}</h1>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600">Club details and information will be displayed here.</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  )
}
