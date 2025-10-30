export interface Department {
  department_name: string
  password?: string
  department_description: string
  department_poster?: string
}

export interface Club {
  club_name: string
  department_name: string | Department
  club_description: string
  club_poster?: string
}

export interface Event {
  id?: number
  event_name: string
  event_start_date: string
  event_end_date: string
  event_time: string
  department_name: string | Department
  club_name?: string | Club | null
  event_poster?: string
  event_venue: string
  registration_link?: string | null
}

export interface Fest {
  fest_name: string
  department_name: string | Department
  event_start_date: string
  event_end_date: string
  fest_poster?: string
}

export interface DepartmentEvent {
  id?: number
  event_name: string
  event_start_date: string
  event_end_date: string
  event_time: string
  department_name: string | Department
  event_poster?: string
  event_venue: string
  registration_link?: string | null
  fest_name?: string | Fest | null
}

export interface Notice {
  id?: number
  title: string
  description: string
  date_posted: string
  club_name?: string | Club | null
  department_name?: string | Department | null
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'student' | 'coordinator' | 'guest'
  metadata?: any
}

export interface EventGallery {
  id?: number
  event_id: number
  image_url: string
  caption?: string
  uploaded_at?: string
  uploaded_by?: string
}

export interface EventReport {
  id?: number
  event_id: number
  report_type: 'pdf' | 'excel'
  file_url: string
  generated_at: string
  generated_by: string
}

export interface EventStats {
  total_events: number
  upcoming_events: number
  past_events: number
  total_participants: number
  events_by_department: { department: string; count: number }[]
  events_by_month: { month: string; count: number }[]
}
