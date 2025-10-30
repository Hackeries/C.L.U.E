# C.L.U.E Frontend - React + TypeScript + Vite

Modern, responsive frontend for the C.L.U.E (College Link Up for Events) event management system.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **UI Components:** ShadCN/UI (Radix UI)
- **Animations:** Framer Motion
- **State Management:** TanStack Query (React Query)
- **Backend:** Supabase (Auth + Database + Storage + Realtime)
- **API Client:** Axios
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Notifications:** Sonner
- **Reports:** jsPDF + xlsx

## Features

### ✨ Core Features

- **Real-Time Notifications** - Instant updates using Supabase Realtime
- **Event Management** - Full CRUD operations for events
- **Photo Gallery** - Image upload and management with Supabase Storage
- **Report Generation** - Export event reports as PDF or Excel
- **Analytics Dashboard** - Visual event statistics and insights
- **Department Management** - Organize events by departments
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-first, works on all devices

### 🎨 Design Features

- Modern, minimal UI with TailwindCSS
- Smooth animations with Framer Motion
- Accessible components (WCAG compliant)
- Toast notifications for user feedback
- Loading states and error handling

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Base UI components (ShadCN)
│   │   ├── admin/           # Admin dashboard components
│   │   ├── gallery/         # Photo gallery components
│   │   ├── reports/         # Report generation components
│   │   └── notifications/   # Real-time notification components
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts       # Authentication hook
│   │   └── useRealtime.ts   # Realtime subscription hook
│   ├── lib/                 # Utilities and configurations
│   │   ├── supabase.ts      # Supabase client setup
│   │   └── utils.ts         # Helper functions
│   ├── services/            # API service layer
│   │   └── api.ts           # Django REST API client
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared types
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase project (see [SUPABASE_SETUP_GUIDE.md](../SUPABASE_SETUP_GUIDE.md))
- Django backend running (see main README)

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

```bash
cp .env.example .env
```

Edit `.env`:

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=C.L.U.E
```

3. **Start development server:**

```bash
npm run dev
```

Visit http://localhost:5173

### Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_API_URL` | Django backend API URL | Yes |
| `VITE_APP_NAME` | Application name | No |
| `VITE_APP_ENV` | Environment (development/production) | No |

## Key Components

### Admin Dashboard

Full-featured admin interface for managing events, departments, and viewing analytics.

```typescript
import { AdminDashboard } from './components/admin/AdminDashboard'

<AdminDashboard />
```

### Event Gallery

Image gallery with upload, view, and delete capabilities using Supabase Storage.

```typescript
import { EventGallery } from './components/gallery/EventGallery'

<EventGallery 
  eventId={1} 
  eventName="Tech Fest 2024" 
  isAdmin={true} 
/>
```

### Report Generator

Generate and download event reports in PDF or Excel format.

```typescript
import { ReportGenerator } from './components/reports/ReportGenerator'

<ReportGenerator 
  event={eventData} 
  participants={participantsList}
  stats={eventStats}
/>
```

### Real-time Notifications

Live notification system with toast messages for event updates.

```typescript
import { RealtimeNotifications } from './components/notifications/RealtimeNotifications'

<RealtimeNotifications />
```

## Custom Hooks

### useAuth

Authentication hook for managing user state.

```typescript
import { useAuth } from './hooks/useAuth'

const { user, loading, isAuthenticated } = useAuth()
```

### useRealtime

Subscribe to real-time database changes.

```typescript
import { useRealtime } from './hooks/useRealtime'

const { events } = useRealtime('events', (event) => {
  console.log('Event changed:', event)
})
```

## Styling

### TailwindCSS

This project uses TailwindCSS with a custom theme supporting dark mode.

**Theme colors:**
- Primary: Blue (`#3b82f6`)
- Secondary: Purple (`#8b5cf6`)
- Accent: Pink (`#ec4899`)

### Dark Mode

Toggle between light and dark themes:

```typescript
import { useTheme } from './components/ThemeProvider'

const { theme, setTheme } = useTheme()
setTheme('dark') // or 'light' or 'system'
```

## API Integration

### Using the API Service

```typescript
import { getEvents, createEvent } from './services/api'

// Fetch events
const events = await getEvents()

// Create event
const formData = new FormData()
formData.append('event_name', 'Tech Fest')
formData.append('event_venue', 'Main Auditorium')
await createEvent(formData)
```

## Supabase Integration

### Authentication

```typescript
import { signIn, signUp, signOut } from './lib/supabase'

// Sign in
await signIn('user@example.com', 'password')

// Sign up
await signUp('user@example.com', 'password', { role: 'student' })

// Sign out
await signOut()
```

### Storage

```typescript
import { uploadFile, getPublicUrl, deleteFile } from './lib/supabase'

// Upload file
const { data, error } = await uploadFile('event-gallery', 'path/to/file.jpg', file)

// Get public URL
const url = getPublicUrl('event-gallery', 'path/to/file.jpg')

// Delete file
await deleteFile('event-gallery', 'path/to/file.jpg')
```

## Testing

### Component Testing

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm run test
```

### E2E Testing

```bash
npm install -D playwright
npx playwright test
```

## Performance Optimization

- **Code Splitting:** Automatic with Vite
- **Lazy Loading:** Images loaded on demand
- **Caching:** React Query handles API caching
- **Bundle Size:** Optimized with tree-shaking

## Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers

## Troubleshooting

### Common Issues

**Issue:** Supabase connection fails
- **Solution:** Check `.env` file has correct credentials
- Verify Supabase project is active

**Issue:** API requests fail with CORS error
- **Solution:** Ensure Django backend has correct CORS configuration
- Add frontend URL to `CORS_ALLOWED_ORIGINS`

**Issue:** Images not loading
- **Solution:** Check Supabase Storage bucket policies
- Verify bucket is public or user is authenticated

**Issue:** Dark mode not working
- **Solution:** Clear localStorage and refresh
- Check if theme classes are applied to `<html>` element

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Deployment

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for production deployment instructions.

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the documentation
- Review console errors
- Check Supabase dashboard
- Contact the development team

---

Built with ❤️ using React, TypeScript, and Supabase
