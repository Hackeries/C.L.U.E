import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/ThemeProvider'

// Pages
import Home from './pages/Home'
import Clubs from './pages/Clubs'
import ClubDetail from './pages/ClubDetail'
import Departments from './pages/Departments'
import DepartmentDetail from './pages/DepartmentDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Calendar from './pages/Calendar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import CoordinatorDashboard from './pages/CoordinatorDashboard'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="clue-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/clubs/:clubName" element={<ClubDetail />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:deptName" element={<DepartmentDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/coordinator" element={<CoordinatorDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
