import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2, Search, FileDown } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { getEvents, createEvent, updateEvent, deleteEvent, getDepartments } from '../../services/api'
import { toast } from 'sonner'
import { formatDate, isEventUpcoming } from '../../lib/utils'
import { ReportGenerator } from '../reports/ReportGenerator'
import { EventGallery } from '../gallery/EventGallery'
import type { Event, Department } from '../../types'

export const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [showGallery, setShowGallery] = useState<Event | null>(null)
  const [showReport, setShowReport] = useState<Event | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [eventsRes, deptRes] = await Promise.all([
        getEvents(),
        getDepartments()
      ])
      setEvents(eventsRes.data)
      setDepartments(deptRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      await createEvent(formData)
      toast.success('Event created successfully')
      setIsCreateDialogOpen(false)
      fetchData()
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error('Failed to create event')
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedEvent?.id) return

    const formData = new FormData(e.currentTarget)

    try {
      await updateEvent(selectedEvent.id, formData)
      toast.success('Event updated successfully')
      setIsEditDialogOpen(false)
      setSelectedEvent(null)
      fetchData()
    } catch (error) {
      console.error('Error updating event:', error)
      toast.error('Failed to update event')
    }
  }

  const handleDelete = async (event: Event) => {
    if (!event.id || !confirm(`Delete "${event.event_name}"?`)) return

    try {
      await deleteEvent(event.id)
      toast.success('Event deleted successfully')
      fetchData()
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event')
    }
  }

  const filteredEvents = events.filter(event =>
    event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const EventForm = ({ event, onSubmit }: { event?: Event; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="event_name">Event Name</Label>
        <Input id="event_name" name="event_name" defaultValue={event?.event_name} required />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="event_start_date">Start Date</Label>
          <Input id="event_start_date" name="event_start_date" type="date" defaultValue={event?.event_start_date} required />
        </div>
        <div>
          <Label htmlFor="event_end_date">End Date</Label>
          <Input id="event_end_date" name="event_end_date" type="date" defaultValue={event?.event_end_date} required />
        </div>
      </div>

      <div>
        <Label htmlFor="event_time">Time</Label>
        <Input id="event_time" name="event_time" defaultValue={event?.event_time} required />
      </div>

      <div>
        <Label htmlFor="event_venue">Venue</Label>
        <Input id="event_venue" name="event_venue" defaultValue={event?.event_venue} required />
      </div>

      <div>
        <Label htmlFor="department_name">Department</Label>
        <select 
          id="department_name" 
          name="department_name" 
          defaultValue={typeof event?.department_name === 'string' ? event.department_name : event?.department_name?.department_name}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
          required
        >
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept.department_name} value={dept.department_name}>
              {dept.department_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="registration_link">Registration Link (Optional)</Label>
        <Input id="registration_link" name="registration_link" type="url" defaultValue={event?.registration_link || ''} />
      </div>

      <div>
        <Label htmlFor="event_poster">Event Poster</Label>
        <Input id="event_poster" name="event_poster" type="file" accept="image/*" />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          {event ? 'Update Event' : 'Create Event'}
        </Button>
        <Button type="button" variant="outline" onClick={() => {
          setIsCreateDialogOpen(false)
          setIsEditDialogOpen(false)
        }}>
          Cancel
        </Button>
      </div>
    </form>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Event Management</CardTitle>
              <CardDescription>Create, edit, and manage events</CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{event.event_name}</h3>
                    {isEventUpcoming(event.event_start_date) && (
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(event.event_start_date)} - {formatDate(event.event_end_date)}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Venue:</span> {event.event_venue}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Time:</span> {event.event_time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowReport(event)}
                  >
                    <FileDown className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowGallery(event)}
                  >
                    Gallery
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedEvent(event)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(event)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <EventForm onSubmit={handleCreate} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {selectedEvent && <EventForm event={selectedEvent} onSubmit={handleUpdate} />}
        </DialogContent>
      </Dialog>

      {/* Gallery Dialog */}
      <Dialog open={!!showGallery} onOpenChange={() => setShowGallery(null)}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Event Gallery</DialogTitle>
          </DialogHeader>
          {showGallery && (
            <EventGallery
              eventId={showGallery.id!}
              eventName={showGallery.event_name}
              isAdmin={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={!!showReport} onOpenChange={() => setShowReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
          </DialogHeader>
          {showReport && <ReportGenerator event={showReport} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
