# C.L.U.E Frontend - Banasthali Vidyapith

Modern, responsive React + TypeScript frontend for the College Link Up for Events (C.L.U.E) platform at Banasthali Vidyapith.

## 🚀 Features

- **Modern UI**: Built with React 19, TypeScript, and Tailwind CSS
- **Smooth Animations**: Framer Motion for beautiful page transitions
- **Responsive Design**: Works perfectly on all devices
- **Component Library**: Radix UI components for accessibility
- **Type Safety**: Full TypeScript support
- **State Management**: React Query for server state
- **Routing**: React Router for navigation
- **Form Handling**: React Hook Form with Zod validation

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **React Query** - Data fetching
- **Axios** - HTTP client
- **Radix UI** - UI components
- **Lucide Icons** - Icon library

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Update the `.env` file with your API URL:**
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/         # Reusable components
│   ├── layout/        # Layout components (Header, Footer)
│   ├── ui/            # UI components (Button, Card, etc.)
│   ├── admin/         # Admin-specific components
│   └── ...
├── pages/             # Page components
│   ├── Home.tsx
│   ├── Clubs.tsx
│   ├── Events.tsx
│   └── ...
├── services/          # API services
│   └── api.ts
├── hooks/             # Custom hooks
├── lib/               # Utility functions
├── types/             # TypeScript types
└── App.tsx            # Main app component
```

## 🎨 Customization

### Colors

The color scheme is defined in `tailwind.config.js`. Main colors:
- Primary: `#132E57` (Navy Blue)
- Accent: Green to Blue gradient
- Background: Gray-50

### Fonts

- **Body**: Inter
- **Headings**: Poppins

## 📱 Pages

- **Home** - Landing page with hero slideshow and latest updates
- **Clubs** - Browse and explore campus clubs
- **Departments** - View department information
- **Events** - Browse and register for events
- **Calendar** - View events in calendar format
- **Profile** - User profile and registered events
- **Login/Signup** - Authentication pages
- **Admin Dashboard** - Admin management interface
- **Coordinator Dashboard** - Coordinator event management

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api` |
| `VITE_SUPABASE_URL` | Supabase URL (optional) | - |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (optional) | - |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of Banasthali Vidyapith's C.L.U.E platform.

## 📧 Contact

For questions or support, contact: clue@banasthali.in
