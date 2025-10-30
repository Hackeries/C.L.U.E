import axios from 'axios'
import type { Event, Department, Club, Fest, DepartmentEvent, Notice, EventStats } from '../types'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Departments
export const getDepartments = () => api.get<Department[]>('/departments/')
export const getDepartment = (name: string) => api.get<Department>(`/departments/${name}/`)
export const createDepartment = (data: Department) => api.post<Department>('/departments/', data)
export const updateDepartment = (name: string, data: Partial<Department>) => 
  api.put<Department>(`/departments/${name}/`, data)
export const deleteDepartment = (name: string) => api.delete(`/departments/${name}/`)

// Clubs
export const getClubs = () => api.get<Club[]>('/clubs/')
export const getClub = (name: string) => api.get<Club>(`/clubs/${name}/`)
export const createClub = (data: Club) => api.post<Club>('/clubs/', data)
export const updateClub = (name: string, data: Partial<Club>) => 
  api.put<Club>(`/clubs/${name}/`, data)
export const deleteClub = (name: string) => api.delete(`/clubs/${name}/`)

// Events
export const getEvents = () => api.get<Event[]>('/events/')
export const getEvent = (id: number) => api.get<Event>(`/events/${id}/`)
export const createEvent = (data: FormData) => 
  api.post<Event>('/events/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const updateEvent = (id: number, data: FormData) => 
  api.put<Event>(`/events/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const deleteEvent = (id: number) => api.delete(`/events/${id}/`)

// Fests
export const getFests = () => api.get<Fest[]>('/fests/')
export const getFest = (name: string) => api.get<Fest>(`/fests/${name}/`)
export const createFest = (data: Fest) => api.post<Fest>('/fests/', data)
export const updateFest = (name: string, data: Partial<Fest>) => 
  api.put<Fest>(`/fests/${name}/`, data)
export const deleteFest = (name: string) => api.delete(`/fests/${name}/`)

// Department Events
export const getDepartmentEvents = () => api.get<DepartmentEvent[]>('/department-events/')
export const getDepartmentEvent = (id: number) => api.get<DepartmentEvent>(`/department-events/${id}/`)
export const createDepartmentEvent = (data: FormData) => 
  api.post<DepartmentEvent>('/department-events/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const updateDepartmentEvent = (id: number, data: FormData) => 
  api.put<DepartmentEvent>(`/department-events/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const deleteDepartmentEvent = (id: number) => api.delete(`/department-events/${id}/`)

// Notices
export const getNotices = () => api.get<Notice[]>('/notices/')
export const getNotice = (id: number) => api.get<Notice>(`/notices/${id}/`)
export const createNotice = (data: Notice) => api.post<Notice>('/notices/', data)
export const updateNotice = (id: number, data: Partial<Notice>) => 
  api.put<Notice>(`/notices/${id}/`, data)
export const deleteNotice = (id: number) => api.delete(`/notices/${id}/`)

// Analytics
export const getEventStats = () => api.get<EventStats>('/analytics/stats/')

// Reports
export const generateEventReport = (eventId: number, format: 'pdf' | 'excel') => 
  api.post(`/reports/generate/`, { event_id: eventId, format }, {
    responseType: 'blob'
  })

export const getEventReports = (eventId?: number) => 
  api.get(`/reports/${eventId ? `?event_id=${eventId}` : ''}`)

// Gallery
export const getEventGallery = (eventId: number) => 
  api.get(`/gallery/${eventId}/`)

export const uploadGalleryImage = (eventId: number, formData: FormData) => 
  api.post(`/gallery/${eventId}/upload/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const deleteGalleryImage = (imageId: number) => 
  api.delete(`/gallery/image/${imageId}/`)

export default api
