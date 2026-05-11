# Report Management System

A modern, premium, and user-friendly internal report management website built with Next.js, React, and TypeScript.

## Features

### 🎯 Core Features
- **Device Reports Management**: Create, read, update, and delete device maintenance reports
- **Training Reports Management**: Track and manage training sessions
- **Advanced Search & Filtering**: Search by device, cause, trainer, etc.
- **Export Functionality**: Export reports to CSV format
- **Real-time Notifications**: Toast notifications for all actions

### 🎨 Design & UX
- **Premium UI Design**: Modern, minimal interface inspired by Notion, Linear, and Vercel
- **Dark Mode Support**: Full dark mode support with smooth transitions
- **Responsive Design**: Fully responsive for desktop and mobile devices
- **Smooth Animations**: Powered by Framer Motion
- **Glass Morphism Effects**: Elegant glassmorphism effects with soft shadows
- **Professional Typography**: Clean, modern typeface

### 📊 Dashboard Analytics
- Total reports count
- Today's reports overview
- Most problematic device tracking
- Top handling employee
- Quick access to recent reports

### 🔧 Technology Stack
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui inspired components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── page.tsx             # Dashboard page
│   ├── device-reports/      # Device reports route
│   ├── training-reports/    # Training reports route
│   └── settings/            # Settings page
├── components/
│   ├── layout/              # Layout components (Sidebar, Header)
│   ├── ui/                  # Reusable UI components
│   ├── pages/               # Page-level components
│   └── forms/               # Form components
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.ts           # Next.js configuration
```

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd report-management
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Components

### Pages
- **Dashboard** (`/`) - System overview with analytics
- **Device Reports** (`/device-reports`) - Device maintenance reports
- **Training Reports** (`/training-reports`) - Training session management
- **Settings** (`/settings`) - System preferences

### UI Components
- `Button` - Reusable button component with variants
- `Input` - Form input with validation
- `Select` - Custom dropdown select
- `Card` - Container component
- `Modal` - Dialog component
- `Table` - Data table with sorting
- `ConfirmDialog` - Confirmation dialog
- `Toaster` - Toast notifications

## Features in Detail

### Device Reports
- ✅ Create, read, update, delete reports
- ✅ Filter by unit, person in charge
- ✅ Search functionality
- ✅ Sort by any column
- ✅ Export to CSV
- ✅ Confirmation before delete

### Training Reports
- ✅ Manage training sessions
- ✅ Track participants
- ✅ Filter by unit and trainer
- ✅ Search functionality
- ✅ Export to CSV
- ✅ Notes field for additional information

### Dashboard
- ✅ Real-time statistics
- ✅ Quick access to recent reports
- ✅ Trending data
- ✅ Professional analytics cards

## Customization

### Colors
Edit colors in `tailwind.config.ts`:
```typescript
colors: {
  navy: {
    50: '#f0f4f8',
    // ... other shades
    900: '#0a1626',
  },
}
```

### Styling
- Global styles: `app/globals.css`
- Component styles: Co-located with components
- Tailwind classes: Applied directly

### Mock Data
Update mock data in:
- `components/pages/device-reports.tsx` - Device reports data
- `components/pages/training-reports.tsx` - Training reports data

## Future Enhancements

- [ ] Database integration (PostgreSQL + Prisma)
- [ ] User authentication
- [ ] Role-based access control
- [ ] Advanced analytics and charts
- [ ] PDF export
- [ ] Email notifications
- [ ] API integration
- [ ] Real-time updates with WebSocket
- [ ] Data backup and recovery
- [ ] Audit logs

## Performance Optimizations

- ✅ Code splitting
- ✅ Image optimization
- ✅ Lazy loading
- ✅ Memoization with React.memo
- ✅ Optimized animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Support

For support, please create an issue on GitHub or contact the development team.

---

Built with ❤️ for modern business needs.
# Report
