# Technical Documentation - Report Management System

## 🏗️ Architecture Overview

### Technology Stack

```
Frontend Framework: Next.js 15 (React)
Language: TypeScript
Styling: Tailwind CSS
Animations: Framer Motion
Icons: Lucide React
State Management: React Hooks
```

---

## 📦 Project Dependencies

### Core Dependencies
- `next`: Framework for production-grade React applications
- `react`: JavaScript library for building user interfaces
- `framer-motion`: Production-ready animation library
- `lucide-react`: Beautiful and consistent icon library

### Development Dependencies
- `typescript`: Type safety for JavaScript
- `tailwindcss`: Utility-first CSS framework
- `eslint`: Code quality tool
- `postcss`: CSS transformation tool
- `autoprefixer`: CSS vendor prefix tool

---

## 🎨 Design System

### Color Palette

**Navy Scale** (Primary)
```
Navy 50:   #f0f4f8 (Light backgrounds)
Navy 100:  #d9e8f0
Navy 200:  #b3d1e0
Navy 300:  #80b1d0
Navy 400:  #4d91c0
Navy 500:  #2c5aa0 (Primary action)
Navy 600:  #1e4080
Navy 700:  #193366
Navy 800:  #0f1f3c
Navy 900:  #0a1626 (Dark mode background)
```

**Semantic Colors**
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Info: Blue (#3B82F6)

### Typography

**Font**: Inter (system font fallback)
- **Display**: 3xl bold (Dashboard titles)
- **Heading**: xl, lg semibold
- **Body**: sm, base regular
- **Small**: xs, sm text-gray-500

### Spacing System

```
0: 0
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
```

### Border Radius

```
lg: 8px
xl: 12px
2xl: 16px
full: 9999px (for circular elements)
```

### Shadows

```
shadow-soft: 0 4px 12px rgba(0, 0, 0, 0.05)
shadow-soft-lg: 0 10px 30px rgba(0, 0, 0, 0.08)
shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.15)
```

---

## 🎯 Component Architecture

### UI Component Hierarchy

```
Layout
├── Sidebar
└── Header
    └── Main Content
        ├── Page Component
        ├── Card/Stats
        ├── Table
        ├── Form
        └── Modal
```

### Component Patterns

#### Button Component
- **Variants**: primary, secondary, outline, ghost
- **Sizes**: sm, md, lg
- **States**: default, hover, active, disabled
- **Animations**: Scale on hover (1.02x), scale on tap (0.98x)

#### Form Components
```
Input (with label, error, helper text, icon)
Select (with custom dropdown)
Textarea (resizable)
```

#### Layout Components
```
Card (glass morphism with shadow)
Modal (backdrop + animated content)
Table (with sorting, actions)
ConfirmDialog (for destructive actions)
```

---

## 📄 Page Implementations

### Dashboard Component (`/`)

**Features:**
- Real-time statistics display
- Analytics cards with trends
- Recent reports preview
- Quick navigation to main sections

**Data Flow:**
```
Dashboard
├── Stats State (mock data)
├── StatsCard Components
├── Recent Device Reports Section
└── Recent Training Reports Section
```

**Key Implementations:**
- `StatsCard` component for metric display
- Animation sequences using Framer Motion
- Responsive grid layout

### Device Reports Page (`/device-reports`)

**Features:**
- Full CRUD operations
- Advanced filtering (unit, person in charge)
- Search functionality
- Table sorting
- CSV export
- Delete confirmation

**Data Model:**
```typescript
interface DeviceReport {
  id: string
  unit: string
  device: string
  signalLostTime: string
  fixedTime: string
  cause: string
  result: string
  personInCharge: string
  createdAt: string
}
```

**State Management:**
- `reports`: Main data array
- `searchTerm`: Search input
- `filterUnit`, `filterPerson`: Filter states
- `isCreateModalOpen`, `isEditModalOpen`: Modal states
- `editingReport`: Currently edited report
- `deleteConfirm`: Deletion confirmation state
- `sortConfig`: Sort configuration

### Training Reports Page (`/training-reports`)

**Features:**
- Training session management
- Trainer and participant tracking
- Filter and search
- Export functionality
- Notes field

**Data Model:**
```typescript
interface TrainingReport {
  id: string
  unit: string
  trainingContent: string
  trainer: string
  participants: string
  trainingTime: string
  result: string
  notes: string
  createdAt: string
}
```

---

## 🔄 Data Flow

### Creating a Report

```
1. User clicks "New Report"
   ↓
2. Modal opens with form
   ↓
3. User fills in form fields
   ↓
4. User clicks "Create Report"
   ↓
5. Form validates and submits
   ↓
6. New report added to state
   ↓
7. Success toast shown
   ↓
8. Modal closes
   ↓
9. Table updates with new report
```

### Filtering and Sorting

```
User Action → Filter/Sort State Update
   ↓
useMemo hook recalculates filtered data
   ↓
Table re-renders with new data
```

### Export Functionality

```
1. User clicks Export
   ↓
2. Filtered data converted to CSV
   ↓
3. Blob created
   ↓
4. File downloaded
   ↓
5. Success notification shown
```

---

## 🎬 Animation Specifications

### Page Transitions
- Duration: 300ms
- Easing: ease-out
- Type: Fade + slide up

### Button Interactions
- Hover: Scale 1.02x, shadow increase
- Tap: Scale 0.98x
- Duration: 200ms

### Modal Animations
- Open: Fade + scale (0.95 → 1)
- Close: Fade + scale (1 → 0.95)
- Backdrop: Blur + fade overlay
- Duration: 200ms

### Table Rows
- Initial: Opacity 0
- Staggered entrance: 50ms delay between rows
- Hover: Background color change

### Sidebar Collapse
- Animation: Smooth width transition
- Duration: 300ms
- Content fade: 200ms

---

## 📱 Responsive Design Breakpoints

```
Mobile First Approach:
- Default: Mobile (0px+)
- md: Medium (768px+) - Tablets
- lg: Large (1024px+) - Desktops
- xl: Extra Large (1280px+) - Wide screens
```

### Layout Adjustments

**Dashboard Stats Grid**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

**Device Reports Table**
- Mobile: Horizontal scroll
- Tablet: Partial columns visible
- Desktop: All columns visible

**Sidebar**
- Mobile: Overlay / Collapsible
- Desktop: Fixed sidebar

---

## 🛡️ Error Handling

### Form Validation
- Input validation on change
- Error messages displayed inline
- Submit button disabled until valid

### Delete Operations
- Confirmation dialog before deletion
- Danger zone highlighted in red
- Undo option (future feature)

### API Error Handling (Future)
```typescript
try {
  // API call
} catch (error) {
  toast.error('Failed to create report')
  console.error(error)
}
```

---

## 🎪 Toast Notification System

### Implementation
- Global toast store using Set
- Multiple toasts stacked vertically
- Auto-dismiss after 4 seconds
- Manual dismiss option

### Toast Types
- **Success**: Green with checkmark
- **Error**: Red with X icon
- **Info**: Blue with info icon
- **Warning**: Yellow with alert icon

### Usage
```typescript
const { success, error, info, warning } = useToast()

success('Report created successfully!')
error('Failed to delete report')
```

---

## 🔐 Future Security Considerations

### Authentication
- Implement NextAuth.js
- Session management
- Protected API routes

### Authorization
- Role-based access control (RBAC)
- Permission checking on client and server
- Resource ownership validation

### Data Protection
- HTTPS only
- Secure cookies
- CSRF protection
- Input sanitization

---

## ⚡ Performance Optimizations

### Code Splitting
- Each page loaded on demand
- Components lazy-loaded when needed

### Memoization
- useMemo for filtered/sorted data
- useCallback for event handlers
- React.memo for pure components

### Image Optimization
- Next.js Image component (when images added)
- Automatic responsive sizing
- Lazy loading

### Bundle Size
- Tree shaking unused imports
- Minification in production
- Code splitting by route

---

## 🧪 Testing Recommendations

### Unit Tests
```typescript
// Test individual components
- Button variants
- Input validation
- Card rendering
```

### Integration Tests
```typescript
// Test feature flows
- Create report flow
- Edit report flow
- Delete with confirmation
- Export functionality
```

### E2E Tests
```typescript
// Test complete user journeys
- Dashboard overview
- Full CRUD operations
- Navigation between pages
```

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Build completed successfully
- [ ] TypeScript/ESLint no errors
- [ ] Performance tested
- [ ] Mobile responsiveness verified
- [ ] Dark mode tested
- [ ] Cross-browser compatibility checked
- [ ] SEO meta tags added
- [ ] Analytics integrated
- [ ] Error tracking setup
- [ ] Database connected
- [ ] API endpoints tested
- [ ] Authentication implemented
- [ ] Security headers configured

---

## 📚 Additional Resources

### Documentation
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion

### Key Files
- Global styles: `app/globals.css`
- Theme config: `tailwind.config.ts`
- Next config: `next.config.ts`
- Type definitions: `tsconfig.json`

---

## 🐛 Troubleshooting

### Dev Server Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Start fresh
npm run dev
```

### Build Errors
```bash
# Check for TypeScript errors
npm run build

# Lint code
npm run lint

# Fix issues
npm run lint -- --fix
```

---

This documentation provides a comprehensive overview of the system architecture and implementation details.
