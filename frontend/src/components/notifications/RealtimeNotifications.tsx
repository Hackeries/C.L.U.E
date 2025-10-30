import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Calendar, AlertCircle, Info } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useRealtime } from '../../hooks/useRealtime'
import { formatDateTime } from '../../lib/utils'

interface Notification {
  id: string
  type: 'event' | 'notice' | 'update'
  title: string
  description: string
  timestamp: string
  read: boolean
}

export const RealtimeNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showPanel, setShowPanel] = useState(false)
  
  // Listen for event changes
  useRealtime('events', (event) => {
    if (event.type === 'INSERT' && event.new) {
      addNotification({
        id: Date.now().toString(),
        type: 'event',
        title: 'New Event Created',
        description: `${event.new.event_name} has been added`,
        timestamp: new Date().toISOString(),
        read: false,
      })
    } else if (event.type === 'UPDATE' && event.new) {
      addNotification({
        id: Date.now().toString(),
        type: 'update',
        title: 'Event Updated',
        description: `${event.new.event_name} has been modified`,
        timestamp: new Date().toISOString(),
        read: false,
      })
    }
  })

  // Listen for notice changes
  useRealtime('notices', (event) => {
    if (event.type === 'INSERT' && event.new) {
      addNotification({
        id: Date.now().toString(),
        type: 'notice',
        title: 'New Notice Posted',
        description: event.new.title,
        timestamp: new Date().toISOString(),
        read: false,
      })
    }
  })

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-4 w-4" />
      case 'notice':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowPanel(!showPanel)}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed right-4 top-20 w-96 max-h-[80vh] z-50"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPanel(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    className="w-full mt-2"
                  >
                    Mark all as read
                  </Button>
                )}
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-[60vh] space-y-2">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No notifications yet
                  </div>
                ) : (
                  <AnimatePresence>
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className={`p-3 rounded-lg border ${
                          notification.read ? 'bg-muted/30' : 'bg-primary/5 border-primary/20'
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-0.5">{getIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <p className="text-sm text-muted-foreground truncate">
                                {notification.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDateTime(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
