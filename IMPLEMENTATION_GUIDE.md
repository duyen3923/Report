# Implementation Guide & Best Practices

## 🎯 Code Organization

### Component Structure

Each component should follow this structure:

```typescript
'use client'

import { hooks, external libraries }
import { internal components }

interface ComponentProps {
  // Props definition
}

export function ComponentName({ props }: ComponentProps) {
  // State and hooks
  // Event handlers
  // Effects
  // Render
  return (
    // JSX
  )
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `DeviceReport`, `StatsCard`)
- **Functions**: camelCase (e.g., `handleDelete`, `calculateTotal`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_REPORTS`, `UNITS`)
- **Files**: kebab-case (e.g., `device-report.tsx`, `confirm-dialog.tsx`)
- **Interfaces**: Prefixed with capital letter, no 'I' prefix (e.g., `DeviceReport`, `ButtonProps`)

### Directory Structure

```
components/
├── layout/
│   ├── sidebar.tsx
│   └── header.tsx
├── ui/               # Reusable components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── pages/            # Full page components
│   ├── dashboard.tsx
│   └── ...
└── forms/            # Form components
    ├── device-report-form.tsx
    └── ...

app/
├── (routes)/
│   ├── page.tsx
│   └── [dynamic-route]/
├── layout.tsx
├── globals.css
└── error.tsx        # Error boundary
```

---

## 🔄 State Management Patterns

### Local Component State

```typescript
const [data, setData] = useState<DataType[]>([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
```

### Filtered/Sorted Data (Computed State)

```typescript
const filteredData = useMemo(() => {
  return data.filter(item => {
    // Filter logic
  }).sort((a, b) => {
    // Sort logic
  })
}, [data, filters, sortConfig])
```

### Form State

```typescript
const [formData, setFormData] = useState({
  field1: initialValue1,
  field2: initialValue2,
})

const handleChange = (key: keyof typeof formData) => (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setFormData(prev => ({
    ...prev,
    [key]: e.target.value,
  }))
}
```

### Modal State

```typescript
const [isOpen, setIsOpen] = useState(false)
const [editingItem, setEditingItem] = useState<Item | null>(null)
```

---

## 🎨 Styling Best Practices

### Tailwind Class Organization

```typescript
className={`
  base-classes
  responsive-classes
  state-classes
  animation-classes
`}
```

Example:
```typescript
className={`
  px-4 py-2 rounded-lg
  md:px-6 md:py-3
  hover:bg-gray-100 dark:hover:bg-navy-800
  transition-all duration-200
`}
```

### Custom CSS for Complex Styles

Use globals.css for:
- Complex animations
- Utility classes
- Global component styles
- CSS variables

```css
.card {
  @apply glass-effect shadow-soft rounded-2xl p-6 transition-all-smooth hover:shadow-soft-lg;
}

.btn-base {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-out active:scale-95 disabled:opacity-50;
}
```

### Dark Mode

```typescript
// Tailwind automatically handles dark mode
className="bg-white dark:bg-navy-800 text-gray-900 dark:text-gray-100"
```

---

## 🎬 Animation Patterns

### Simple Hover Effects

```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive content
</motion.div>
```

### Sequential Animations

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Modal Animations

```typescript
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="backdrop"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="modal"
      >
        Content
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## 📝 Form Handling

### Basic Form Pattern

```typescript
const [formData, setFormData] = useState(initialValues)
const [errors, setErrors] = useState<Errors>({})

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  
  // Validate
  const newErrors = validate(formData)
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }
  
  // Submit
  onSubmit(formData)
}

return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <Input
      label="Field"
      value={formData.field}
      onChange={(e) => setFormData({...formData, field: e.target.value})}
      error={errors.field}
    />
    <Button type="submit">Submit</Button>
  </form>
)
```

### Form with Validation

```typescript
const validate = (data: FormData): Errors => {
  const errors: Errors = {}
  
  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!data.email.includes('@')) {
    errors.email = 'Invalid email'
  }
  
  return errors
}
```

---

## 🚀 API Integration (When Ready)

### Server Actions Pattern

```typescript
'use server'

export async function createReport(data: DeviceReport) {
  try {
    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) throw new Error('Failed to create')
    
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}
```

### Client-Side Hook Pattern

```typescript
function useReports() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchReports = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/reports')
      setData(await response.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReports()
  }, [])

  return { data, loading, error, refetch: fetchReports }
}
```

---

## 🧪 Testing Examples

### Component Test

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Integration Test

```typescript
describe('Device Reports Page', () => {
  it('creates a new report', async () => {
    render(<DeviceReports />)
    
    // Open modal
    screen.getByText('New Report').click()
    
    // Fill form
    screen.getByPlaceholderText('Unit').type('A')
    screen.getByPlaceholderText('Device').type('TV')
    
    // Submit
    screen.getByText('Create Report').click()
    
    // Check result
    expect(screen.getByText('Report created successfully!')).toBeInTheDocument()
  })
})
```

---

## 🔍 Debugging Tips

### Browser DevTools

1. **React DevTools**
   - Inspect component props
   - Monitor state changes
   - Track re-renders

2. **Console Logging**
   ```typescript
   console.log('Component mounted', { data, loading })
   console.error('Error occurred:', error)
   ```

3. **Network Tab**
   - Monitor API calls
   - Check response payloads
   - Verify request headers

### VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Thunder Client (API testing)

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] No console.log statements in production code
- [ ] No commented-out code
- [ ] TypeScript strict mode enabled
- [ ] ESLint passes without warnings
- [ ] Code formatted with Prettier

### Performance
- [ ] Lighthouse score above 80
- [ ] Load time under 3 seconds
- [ ] No CLS (Cumulative Layout Shift) issues
- [ ] Images optimized
- [ ] Unused dependencies removed

### Functionality
- [ ] All CRUD operations tested
- [ ] Forms validate correctly
- [ ] Export functionality works
- [ ] Dark mode toggles properly
- [ ] Mobile responsive tested

### Security
- [ ] No sensitive data in code
- [ ] Environment variables configured
- [ ] XSS prevention in place
- [ ] CSRF protection added
- [ ] Input validation implemented

### Documentation
- [ ] README.md updated
- [ ] API documentation written
- [ ] Component documentation complete
- [ ] Environment variables documented

---

## 🔄 Git Workflow

### Commit Messages

```
feat: Add new feature
fix: Fix bug in component
docs: Update documentation
style: Format code
refactor: Reorganize code structure
test: Add tests
chore: Update dependencies
```

### Branch Naming

```
feature/device-reports
fix/modal-animation
docs/update-readme
```

---

## 🎓 Learning Resources

### React Patterns
- Hooks best practices
- Performance optimization
- Error boundaries
- Suspense and concurrent rendering

### Next.js Features
- App router
- Server components
- API routes
- Middleware
- Image optimization

### TypeScript
- Generics
- Union types
- Type guards
- Discriminated unions

---

This guide should help maintain consistency and quality as the project evolves. Follow these patterns for new features and refactor existing code to match them.
