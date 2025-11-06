# Component Standards & Usage Guide
## Mahavitaran Design System Implementation

---

## Component Naming Conventions

### File Naming
- **Components**: PascalCase (e.g., `Header.tsx`, `BillCard.tsx`)
- **Utilities**: camelCase (e.g., `api.ts`, `seedData.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMobileDetect.ts`)
- **Types**: PascalCase with `.types.ts` suffix (e.g., `User.types.ts`)

### Component Structure
```tsx
// 1. Imports (external, then internal, then types)
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';
import type { UserProps } from './types';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onAction: () => void;
  variant?: 'default' | 'primary' | 'secondary';
}

// 3. Component
export function Component({ title, onAction, variant = 'default' }: ComponentProps) {
  // 4. Hooks
  const { language } = useLanguage();
  const [state, setState] = useState(false);

  // 5. Handlers
  const handleClick = () => {
    // logic
  };

  // 6. Render
  return (
    <div className="component-class">
      {/* content */}
    </div>
  );
}
```

---

## Standard Props Patterns

### Common Props All Components Should Accept
```tsx
interface BaseComponentProps {
  className?: string;           // Allow style overrides
  children?: React.ReactNode;   // Composition
  id?: string;                  // For testing/automation
  'aria-label'?: string;        // Accessibility
  'data-testid'?: string;       // Testing
}
```

### Event Handlers
```tsx
interface EventProps {
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
  onChange?: (value: string) => void;
}
```

---

## State Management Patterns

### Component State
```tsx
// Local state for UI interactions
const [isOpen, setIsOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState('overview');
```

### Derived State
```tsx
// Compute from props/state, don't duplicate
const isDisabled = isLoading || !isValid;
const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
```

### Context for Global State
```tsx
// Use context for app-wide state
const { language, setLanguage } = useLanguage();
const { user, isAuthenticated } = useAuth();
```

---

## Styling Standards

### Class Organization
```tsx
// Order: Layout → Spacing → Visual → States → Responsive
<div className="
  flex items-center justify-between  // Layout
  p-4 gap-3                          // Spacing
  bg-card border-2 border-primary/20 rounded-lg  // Visual
  hover:shadow-md transition-all     // States
  sm:p-6 md:flex-row                 // Responsive
">
```

### Conditional Classes
```tsx
// Use template literals for dynamic classes
<Button 
  className={`
    base-classes
    ${variant === 'primary' ? 'bg-primary' : 'bg-secondary'}
    ${isActive ? 'ring-2 ring-primary' : ''}
    ${className}
  `}
/>

// Or use utility (cn from class-variance-authority)
import { cn } from './ui/utils';

<Button 
  className={cn(
    "base-classes",
    variant === 'primary' && "bg-primary",
    isActive && "ring-2 ring-primary",
    className
  )}
/>
```

---

## Animation Standards

### Motion Components
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
  {children}
</motion.div>
```

### Standard Transitions
```tsx
// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3 }}

// Slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Scale
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}

// Stagger children
<motion.div variants={container}>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

## Form Patterns

### Input with Label
```tsx
<div className="space-y-2">
  <Label htmlFor="email">
    Email Address
    {required && <span className="text-red-500 ml-1">*</span>}
  </Label>
  <Input
    id="email"
    type="email"
    placeholder="your@email.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
    className={cn(
      "w-full",
      hasError && "border-red-500 focus:border-red-500"
    )}
  />
  {hasError && (
    <p id="email-error" role="alert" className="text-sm text-red-600">
      {errorMessage}
    </p>
  )}
</div>
```

### Form Validation
```tsx
const validateForm = () => {
  const errors: Record<string, string> = {};
  
  if (!email) {
    errors.email = language === 'mr' 
      ? 'ईमेल आवश्यक आहे' 
      : 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = language === 'mr' 
      ? 'वैध ईमेल प्रविष्ट करा' 
      : 'Please enter a valid email';
  }
  
  return errors;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const errors = validateForm();
  
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }
  
  // Submit form
};
```

---

## Loading States

### Skeleton Loaders
```tsx
import { Skeleton } from './ui/skeleton';

function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  );
}
```

### Spinner for Actions
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      Loading...
    </>
  ) : (
    <>
      <Icon className="w-4 h-4 mr-2" />
      Submit
    </>
  )}
</Button>
```

---

## Empty States

### Pattern
```tsx
function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-4 bg-muted/50 rounded-full mb-4">
        <Icon className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {description}
      </p>
      {action && action}
    </div>
  );
}

// Usage
<EmptyState
  icon={FileText}
  title={language === 'mr' ? 'कोणतेही बिल नाहीत' : 'No Bills Found'}
  description={language === 'mr' 
    ? 'तुमच्या खात्यासाठी अद्याप कोणतेही बिल उपलब्ध नाहीत' 
    : 'No bills are available for your account yet'}
  action={
    <Button onClick={handleRefresh}>
      <RefreshCw className="w-4 h-4 mr-2" />
      Refresh
    </Button>
  }
/>
```

---

## Error Handling

### Error Boundaries
```tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Card>
            <CardHeader>
              <CardTitle>Something went wrong</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please refresh the page or contact support.</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Error States in Components
```tsx
if (error) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
      </AlertDescription>
    </Alert>
  );
}
```

---

## Responsive Patterns

### Mobile-First Approach
```tsx
<div className="
  flex flex-col       // Mobile: stack vertically
  gap-4              // Mobile: 16px gap
  sm:flex-row        // Tablet+: horizontal
  sm:gap-6           // Tablet+: 24px gap
  lg:gap-8           // Desktop: 32px gap
">
```

### Conditional Rendering
```tsx
// Show different components based on screen size
const isMobile = useMobile();

return (
  <>
    {isMobile ? (
      <MobileNav />
    ) : (
      <DesktopNav />
    )}
  </>
);
```

### Container Widths
```tsx
// Standard container
<div className="
  w-full 
  max-w-7xl 
  mx-auto 
  px-4 sm:px-6 lg:px-8
">
```

---

## Accessibility Patterns

### Focus Management
```tsx
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {children}
        <Button ref={closeButtonRef} onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
```

### Screen Reader Only Text
```tsx
<span className="sr-only">
  Additional context for screen readers
</span>
```

### ARIA Live Regions
```tsx
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  className="sr-only"
>
  {statusMessage}
</div>
```

---

## Performance Optimization

### Memoization
```tsx
import { useMemo, useCallback } from 'react';

// Expensive calculations
const sortedData = useMemo(() => {
  return data.sort((a, b) => b.date - a.date);
}, [data]);

// Event handlers
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

### Code Splitting
```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Testing Patterns

### Component Testing
```tsx
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Documentation Standards

### Component Documentation
```tsx
/**
 * BillCard Component
 * 
 * Displays a summary of an electricity bill with payment status and actions.
 * 
 * @param {Object} props - Component props
 * @param {Bill} props.bill - Bill data object
 * @param {function} props.onPayment - Callback when payment is initiated
 * @param {function} props.onDownload - Callback when bill is downloaded
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @example
 * <BillCard
 *   bill={billData}
 *   onPayment={(billId) => handlePayment(billId)}
 *   onDownload={(billId) => handleDownload(billId)}
 * />
 */
export function BillCard({ bill, onPayment, onDownload, className }: BillCardProps) {
  // Implementation
}
```

---

## Common Pitfalls to Avoid

### ❌ Don't
```tsx
// Inline functions in render (causes re-renders)
<Button onClick={() => setCount(count + 1)}>

// Missing keys in lists
{items.map(item => <div>{item}</div>)}

// Mutating state directly
state.items.push(newItem);

// Using index as key
{items.map((item, index) => <div key={index}>{item}</div>)}

// Not handling loading/error states
const data = fetchData();
return <div>{data.map(...)}</div>
```

### ✅ Do
```tsx
// Memoized handler
const handleIncrement = useCallback(() => {
  setCount(c => c + 1);
}, []);

// Proper keys
{items.map(item => <div key={item.id}>{item.name}</div>)}

// Immutable state updates
setState(prevState => ({
  ...prevState,
  items: [...prevState.items, newItem]
}));

// Unique keys
{items.map(item => <div key={item.uniqueId}>{item.name}</div>)}

// Proper state management
if (isLoading) return <Skeleton />;
if (error) return <ErrorState />;
return <div>{data.map(...)}</div>
```

---

## Version Control

### Commit Message Format
```
type(scope): short description

- Detailed change 1
- Detailed change 2

Refs: #issue-number
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(dashboard): add energy consumption calculator

- Add calculator component with appliance wattage database
- Integrate with dashboard layout
- Add bilingual support for calculator labels

Refs: #42
```

---

**Last Updated**: November 4, 2025  
**Maintained by**: Development Team
