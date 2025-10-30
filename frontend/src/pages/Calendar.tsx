import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    return { days, firstDay }
  }

  const { days, firstDay } = getDaysInMonth(currentDate)

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const events = [
    { date: 15, name: 'Tech Symposium', color: 'bg-blue-500' },
    { date: 20, name: 'Cultural Fest', color: 'bg-purple-500' },
    { date: 25, name: 'Art Exhibition', color: 'bg-green-500' },
  ]

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Calendar</h1>
            <p className="text-gray-600">View all upcoming events at a glance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={previousMonth}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: firstDay }, (_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: days }, (_, i) => {
                      const day = i + 1
                      const event = events.find((e) => e.date === day)
                      return (
                        <div
                          key={day}
                          className={`aspect-square flex flex-col items-center justify-center rounded-lg border-2 cursor-pointer transition-all ${
                            event
                              ? `${event.color} text-white border-transparent hover:scale-105`
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <span className="text-sm font-semibold">{day}</span>
                          {event && <span className="text-xs mt-1 truncate px-1">{event.name}</span>}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events List */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${event.color} text-white`}
                      >
                        <h4 className="font-semibold">{event.name}</h4>
                        <p className="text-sm opacity-90">
                          {monthNames[currentDate.getMonth()]} {event.date}, {currentDate.getFullYear()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  )
}
