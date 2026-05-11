# Quick Start Guide - Report Management System

## 🚀 Getting Started

The development server is now running! You can access the application at:

**http://localhost:3000**

### System Access

- **Local**: http://localhost:3000
- **Network**: http://192.168.0.105:3000

---

## 📋 Available Pages

1. **Dashboard** (`/`)
   - System overview with analytics
   - Total reports count, today's reports, most problematic device
   - Quick access to recent reports

2. **Device Reports** (`/device-reports`)
   - Create, edit, delete device maintenance reports
   - Filter by unit, person in charge
   - Search by device name, cause, or result
   - Export to CSV
   - Sort by any column

3. **Training Reports** (`/training-reports`)
   - Manage training sessions
   - Track participants and trainers
   - Filter by unit and trainer
   - Export to CSV
   - View training notes

4. **Settings** (`/settings`)
   - General system settings
   - Notification preferences
   - Security options
   - Account management

---

## 🎨 Features Demonstrated

### UI Components
- ✅ Modern sidebar navigation with collapse animation
- ✅ Header with search, notifications, theme toggle
- ✅ Professional cards with glass morphism effect
- ✅ Responsive data tables with sorting
- ✅ Beautiful modal forms
- ✅ Toast notifications
- ✅ Custom select dropdowns
- ✅ Smooth animations throughout

### Functionality
- ✅ Full CRUD operations on reports
- ✅ Real-time filtering and search
- ✅ Data export to CSV
- ✅ Dark mode toggle
- ✅ Responsive mobile design
- ✅ Delete confirmation dialogs

---

## 📂 Project Structure

```
d:/report/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   ├── page.tsx                # Dashboard
│   ├── device-reports/
│   │   └── page.tsx
│   ├── training-reports/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   └── header.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   ├── table.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   ├── pagination.tsx
│   │   ├── textarea.tsx
│   │   ├── confirm-dialog.tsx
│   │   └── toaster.tsx
│   ├── pages/
│   │   ├── dashboard.tsx
│   │   ├── device-reports.tsx
│   │   └── training-reports.tsx
│   └── forms/
│       ├── device-report-form.tsx
│       └── training-report-form.tsx
├── package.json
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 🛠 Development

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Using Windows Batch Script

If you want to start the server using the provided batch script:

```batch
cd d:\report
start-dev.bat
```

### Using PowerShell

```powershell
cd d:\report
pwsh .\start-dev.ps1
```

---

## 🎯 Test the Features

### Try These Actions:

1. **On Dashboard**
   - View analytics cards
   - Click "View all" links to navigate to reports

2. **On Device Reports**
   - Click "New Report" to create a report
   - Try the search functionality
   - Filter by unit or person in charge
   - Sort columns by clicking headers
   - Click export to download CSV
   - Try editing or deleting reports

3. **On Training Reports**
   - Create a new training session
   - Filter and search through reports
   - Export data to CSV

4. **On Settings**
   - Toggle theme between light and dark
   - Explore different setting sections

5. **General UI**
   - Toggle dark mode in header
   - Collapse/expand sidebar
   - Use search in header
   - Check responsive design (resize browser)

---

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Navy Blue (#2c5aa0)
- **Secondary**: Light Gray & White
- **Accents**: Blue, Green, Red, Purple for different card types
- **Dark Mode**: Navy tones with light text

### Typography
- Clean, modern font (Inter)
- Consistent sizing and spacing
- Professional hierarchy

### Animations
- Smooth transitions on all interactions
- Framer Motion for complex animations
- Fade-in and slide-in effects

### Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop enhanced features
- Touch-friendly buttons

---

## 📊 Mock Data

All pages include realistic mock data:

**Device Reports Sample:**
- Unit A - TV - Power outage issue fixed by Hanh
- Unit B - Router - Connection issue fixed by Nam
- Unit C - Projector - Cable disconnected fixed by Linh

**Training Reports Sample:**
- Safety Procedures training by John Doe (15 participants)
- System Basics by Jane Smith (12 participants)
- Advanced Features by Mike Johnson (8 participants)

---

## 🔄 Data Management

Currently, all data is stored in client-side state. To add persistence:

1. **Connect to a database** (PostgreSQL + Prisma recommended)
2. **Create API endpoints** for CRUD operations
3. **Update components** to use API calls instead of local state

---

## 🌙 Theme Toggle

The application includes full dark mode support. Click the moon/sun icon in the header to toggle between themes.

---

## 📱 Mobile View

To test mobile responsiveness:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device (iPhone 12, etc.)

---

## 🚀 Next Steps

### To Make It Production-Ready:

1. **Add Backend**
   - Set up PostgreSQL database
   - Create Prisma schema
   - Build API routes

2. **Authentication**
   - Add NextAuth.js
   - Implement login/signup
   - Role-based access control

3. **Advanced Features**
   - Real-time data sync
   - Advanced analytics with charts
   - PDF export
   - Email notifications

4. **Deployment**
   - Deploy to Vercel
   - Set up CI/CD
   - Configure environment variables

---

## 📞 Support

For any questions or issues:
1. Check the README.md file
2. Review component code for implementation details
3. Check browser console for errors

---

**Enjoy your modern Report Management System! 🎉**
