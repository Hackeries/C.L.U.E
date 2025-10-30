import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ThemeProvider, useTheme } from './components/ThemeProvider'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { useAuth } from './hooks/useAuth'
import { Button } from './components/ui/button'
import { Moon, Sun, Loader2 } from 'lucide-react'

const queryClient = new QueryClient()

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function AppContent() {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-4xl font-bold">C.L.U.E</h1>
            <p className="text-muted-foreground mt-2">College Link Up for Events</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please set up Supabase authentication to continue.
            </p>
            <div className="flex gap-2 justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <AdminDashboard />
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="clue-ui-theme">
        <AppContent />
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
