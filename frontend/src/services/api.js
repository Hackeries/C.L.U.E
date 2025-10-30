import axios from 'axios'

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8000/api'

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
export const getDepartments = () => api.get('/departments/')
export const getDepartment = (name) => api.get(`/departments/${name}/`)
export const createDepartment = (data) => api.post('/departments/', data)
export const updateDepartment = (name, data) => 
  api.put(`/departments/${name}/`, data)
export const deleteDepartment = (name) => api.delete(`/departments/${name}/`)

// Clubs
export const getClubs = () => api.get('/clubs/')
export const getClub = (name) => api.get(`/clubs/${name}/`)
export const createClub = (data) => api.post('/clubs/', data)
export const updateClub = (name, data) => 
  api.put(`/clubs/${name}/`, data)
export const deleteClub = (name) => api.delete(`/clubs/${name}/`)

// Events
export const getEvents = () => api.get('/events/')
export const getEvent = (id) => api.get(`/events/${id}/`)
export const createEvent = (data) => 
  api.post('/events/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const updateEvent = (id, data) => 
  api.put(`/events/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const deleteEvent = (id) => api.delete(`/events/${id}/`)

// Fests
export const getFests = () => api.get('/fests/')
export const getFest = (name) => api.get(`/fests/${name}/`)
export const createFest = (data) => api.post('/fests/', data)
export const updateFest = (name, data) => 
  api.put(`/fests/${name}/`, data)
export const deleteFest = (name) => api.delete(`/fests/${name}/`)

// Department Events
export const getDepartmentEvents = () => api.get('/department-events/')
export const getDepartmentEvent = (id) => api.get(`/department-events/${id}/`)
export const createDepartmentEvent = (data) => 
  api.post('/department-events/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const updateDepartmentEvent = (id, data) => 
  api.put(`/department-events/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
export const deleteDepartmentEvent = (id) => api.delete(`/department-events/${id}/`)

// Notices
export const getNotices = () => api.get('/notices/')
export const getNotice = (id) => api.get(`/notices/${id}/`)
export const createNotice = (data) => api.post('/notices/', data)
export const updateNotice = (id, data) => 
  api.put(`/notices/${id}/`, data)
export const deleteNotice = (id) => api.delete(`/notices/${id}/`)

// Analytics
export const getEventStats = () => api.get('/analytics/stats/')

// Reports
export const generateEventReport = (eventId, format) => 
  api.post(`/reports/generate/`, { event_id: eventId, format }, {
    responseType: 'blob'
  })

export const getEventReports = (eventId) => 
  api.get(`/reports/${eventId ? `?event_id=${eventId}` : ''}`)

// Gallery
export const getEventGallery = (eventId) => 
  api.get(`/gallery/${eventId}/`)

export const uploadGalleryImage = (eventId, formData) => 
  api.post(`/gallery/${eventId}/upload/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const deleteGalleryImage = (imageId) => 
  api.delete(`/gallery/image/${imageId}/`)

export default api
