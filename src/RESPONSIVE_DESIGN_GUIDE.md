# Responsive Design Guide
## Mahavitaran Website - Mobile-First Implementation

---

## 📱 Breakpoint Strategy

### Standard Breakpoints
```css
/* Mobile First - Default styles target smallest screens */
/* Base: 320px - 639px */

sm:  640px   /* Small tablets, large phones landscape */
md:  768px   /* Tablets portrait */
lg:  1024px  /* Tablets landscape, small laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

### Design Targets
| Device | Width | Primary Use Case |
|--------|-------|------------------|
| Mobile Small | 375px | iPhone SE, small Android |
| Mobile Standard | 390px | iPhone 12/13/14 |
| Mobile Large | 428px | iPhone Pro Max |
| Tablet Portrait | 768px | iPad Mini/Air |
| Tablet Landscape | 1024px | iPad Pro |
| Laptop | 1440px | MacBook, standard laptop |
| Desktop | 1920px | Desktop monitors |

---

## 🎯 Mobile-First Patterns

### Container Widths
```tsx
// Full width on mobile, constrained on desktop
<div className="
  w-full              // Mobile: full width
  max-w-7xl           // Desktop: max 1280px
  mx-auto             // Center horizontally
  px-4                // Mobile: 16px padding
  sm:px-6             // Tablet: 24px padding
  lg:px-8             // Desktop: 32px padding
">
```

### Flexible Grid
```tsx
// 1 column mobile, 2 on tablet, 3 on desktop
<div className="
  grid 
  grid-cols-1         // Mobile: single column
  gap-4               // Mobile: 16px gap
  sm:grid-cols-2      // Tablet: 2 columns
  sm:gap-6            // Tablet: 24px gap
  lg:grid-cols-3      // Desktop: 3 columns
  lg:gap-8            // Desktop: 32px gap
">
```

### Typography Scaling
```tsx
<h1 className="
  text-2xl            // Mobile: 24px
  sm:text-3xl         // Tablet: 30px
  lg:text-4xl         // Desktop: 36px
">

<p className="
  text-base           // Mobile: 16px
  lg:text-lg          // Desktop: 18px
">
```

### Spacing Responsive
```tsx
<div className="
  py-8                // Mobile: 32px vertical
  sm:py-12            // Tablet: 48px
  lg:py-16            // Desktop: 64px
">
```

---

## 📐 Layout Patterns

### Stack to Row
```tsx
// Vertical on mobile, horizontal on desktop
<div className="
  flex 
  flex-col            // Mobile: vertical stack
  gap-4
  sm:flex-row         // Tablet+: horizontal
  sm:items-center     // Align items center
  sm:justify-between  // Space between
">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

### Hide/Show Elements
```tsx
// Show on mobile only
<div className="block lg:hidden">
  <MobileMenu />
</div>

// Show on desktop only
<div className="hidden lg:block">
  <DesktopMenu />
</div>

// Different components per breakpoint
<div>
  <div className="block md:hidden">
    <MobileNav />
  </div>
  <div className="hidden md:block">
    <DesktopNav />
  </div>
</div>
```

### Sidebar Layout
```tsx
<div className="
  flex 
  flex-col            // Mobile: sidebar above content
  lg:flex-row         // Desktop: sidebar beside content
">
  <aside className="
    w-full            // Mobile: full width
    lg:w-64           // Desktop: 256px fixed width
    lg:flex-shrink-0  // Don't shrink on desktop
  ">
    Sidebar
  </aside>
  <main className="
    flex-1            // Take remaining space
    min-w-0           // Prevent overflow
  ">
    Content
  </main>
</div>
```

---

## 🎨 Component Responsive Patterns

### Cards
```tsx
<Card className="
  p-4                 // Mobile: 16px padding
  sm:p-6              // Tablet+: 24px padding
">
  <CardHeader className="
    space-y-2         // Mobile: tight spacing
    sm:space-y-3      // Tablet+: more breathing room
  ">
    <CardTitle className="
      text-lg         // Mobile: 18px
      sm:text-xl      // Tablet+: 20px
    ">
      Title
    </CardTitle>
  </CardHeader>
</Card>
```

### Buttons
```tsx
<Button className="
  w-full              // Mobile: full width
  sm:w-auto           // Tablet+: auto width
  h-11                // Mobile: 44px height (touch target)
  sm:h-10             // Desktop: 40px height
">
  Submit
</Button>
```

### Forms
```tsx
<form className="
  space-y-4           // Mobile: 16px between fields
  sm:space-y-6        // Tablet+: 24px
">
  <div className="
    grid 
    grid-cols-1       // Mobile: stack fields
    gap-4
    sm:grid-cols-2    // Tablet+: side by side
    sm:gap-6
  ">
    <div>
      <Label>First Name</Label>
      <Input />
    </div>
    <div>
      <Label>Last Name</Label>
      <Input />
    </div>
  </div>
</form>
```

### Navigation
```tsx
// Mobile: Hamburger menu
// Desktop: Full navigation
<nav className="flex items-center justify-between">
  <Logo />
  
  {/* Mobile Menu Button */}
  <Button 
    className="lg:hidden"
    onClick={() => setMobileMenuOpen(true)}
  >
    <Menu />
  </Button>

  {/* Desktop Navigation */}
  <div className="hidden lg:flex lg:items-center lg:gap-4">
    <NavLink>Home</NavLink>
    <NavLink>Dashboard</NavLink>
    <NavLink>Services</NavLink>
  </div>
</nav>
```

### Data Tables
```tsx
// Mobile: Card layout
// Desktop: Table layout
<div className="block md:hidden">
  {data.map(item => (
    <Card key={item.id}>
      <div className="flex justify-between">
        <span>{item.label}</span>
        <span>{item.value}</span>
      </div>
    </Card>
  ))}
</div>

<div className="hidden md:block overflow-x-auto">
  <Table>
    <TableHeader>...</TableHeader>
    <TableBody>...</TableBody>
  </Table>
</div>
```

---

## 📊 Dashboard Responsive Patterns

### Stats Grid
```tsx
<div className="
  grid 
  grid-cols-1         // Mobile: 1 stat per row
  gap-4
  sm:grid-cols-2      // Tablet: 2 per row
  lg:grid-cols-4      // Desktop: 4 per row
">
  <StatCard />
  <StatCard />
  <StatCard />
  <StatCard />
</div>
```

### Charts
```tsx
// Responsive container with aspect ratio
<div className="
  w-full
  h-64                // Mobile: 256px height
  sm:h-80             // Tablet: 320px
  lg:h-96             // Desktop: 384px
">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      {/* Chart content */}
    </LineChart>
  </ResponsiveContainer>
</div>
```

### Dashboard Layout
```tsx
<div className="
  grid 
  gap-4
  sm:gap-6
  lg:gap-8
  grid-cols-1         // Mobile: single column
  lg:grid-cols-12     // Desktop: 12-column grid
">
  {/* Main content - full width on mobile, 8 cols on desktop */}
  <div className="lg:col-span-8 space-y-6">
    <BillCard />
    <UsageChart />
  </div>
  
  {/* Sidebar - full width on mobile, 4 cols on desktop */}
  <div className="lg:col-span-4 space-y-6">
    <QuickActions />
    <Announcements />
  </div>
</div>
```

---

## 🖼️ Image Responsive Patterns

### Responsive Images
```tsx
<ImageWithFallback
  src={imageUrl}
  alt="Description"
  className="
    w-full              // Full width of container
    h-48                // Mobile: 192px height
    sm:h-64             // Tablet: 256px
    lg:h-80             // Desktop: 320px
    object-cover        // Maintain aspect ratio
    rounded-lg
  "
/>
```

### Aspect Ratio
```tsx
import { AspectRatio } from './ui/aspect-ratio';

<AspectRatio ratio={16/9}>
  <img src={src} alt={alt} className="object-cover" />
</AspectRatio>
```

---

## 📱 Touch Targets

### Minimum Sizes
```tsx
// All interactive elements should be at least 44x44px
<Button className="
  min-h-[44px]        // Minimum 44px height
  min-w-[44px]        // Minimum 44px width (if icon only)
  px-4 py-2           // Adequate padding
">
```

### Spacing Between Targets
```tsx
// Minimum 8px spacing between touch targets
<div className="
  flex 
  gap-2               // 8px minimum gap
  sm:gap-3            // 12px on larger screens
">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</div>
```

---

## 🎯 iOS Specific Fixes

### Prevent Zoom on Input Focus
```css
/* In globals.css - Input font size must be 16px minimum */
input, select, textarea {
  font-size: 16px !important;
}
```

### Safe Area Insets
```tsx
// Account for notch on iPhone
<div className="
  safe-top            // Custom utility class
  pt-safe-top         // Alternative using env()
">
```

```css
/* In globals.css */
.safe-top {
  padding-top: env(safe-area-inset-top);
}
```

### iOS Specific Height Fix
```css
/* Prevent address bar from causing layout shift */
.min-h-screen {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}
```

---

## 🎨 Dark Mode Responsive

### Combined Responsive + Dark Mode
```tsx
<div className="
  bg-white            // Light mode mobile
  dark:bg-gray-900    // Dark mode mobile
  sm:bg-gray-50       // Light mode tablet
  sm:dark:bg-gray-800 // Dark mode tablet
">
```

---

## ⚡ Performance Considerations

### Conditional Rendering
```tsx
import { useMobile } from './ui/use-mobile';

function Component() {
  const isMobile = useMobile();
  
  return (
    <>
      {isMobile ? (
        <MobileOptimizedView />  // Lighter component
      ) : (
        <DesktopView />          // Full featured
      )}
    </>
  );
}
```

### Image Loading
```tsx
// Load smaller images on mobile
<img 
  src={isMobile ? smallImage : largeImage}
  loading="lazy"
  alt={alt}
/>
```

---

## 📏 Spacing Scale Reference

### Vertical Rhythm (py-)
```
Mobile    Tablet    Desktop    Use Case
py-4      py-6      py-8       Section padding
py-8      py-12     py-16      Page sections
py-12     py-16     py-24      Hero sections
py-2      py-3      py-4       Card padding
```

### Horizontal Spacing (px-)
```
Mobile    Tablet    Desktop    Use Case
px-4      px-6      px-8       Container padding
px-2      px-3      px-4       Button padding
px-3      px-4      px-6       Input padding
```

### Gaps (gap-)
```
Mobile    Tablet    Desktop    Use Case
gap-2     gap-3     gap-4      Tight elements
gap-4     gap-6     gap-8      Cards, sections
gap-6     gap-8     gap-12     Page sections
```

---

## 🧪 Testing Checklist

### Viewport Sizes to Test
- [ ] 320px (iPhone SE portrait)
- [ ] 375px (iPhone standard)
- [ ] 390px (iPhone 12/13/14)
- [ ] 428px (iPhone Pro Max)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape)
- [ ] 1280px (Small laptop)
- [ ] 1440px (Standard desktop)
- [ ] 1920px (Large desktop)

### Orientation Testing
- [ ] Portrait mode (all mobile sizes)
- [ ] Landscape mode (all mobile sizes)
- [ ] Tablet portrait
- [ ] Tablet landscape

### Feature Testing
- [ ] Touch targets adequate (44px+)
- [ ] Text readable at all sizes
- [ ] No horizontal scrolling
- [ ] Images scale properly
- [ ] Forms usable on mobile
- [ ] Navigation accessible
- [ ] Buttons not too wide on mobile
- [ ] Content readable in landscape

---

## 🛠️ Responsive Utilities

### Custom Hook for Breakpoints
```tsx
// hooks/useBreakpoint.ts
import { useEffect, useState } from 'react';

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('mobile');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('mobile');
      else if (width < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return breakpoint;
}
```

### Responsive Prop Pattern
```tsx
interface ResponsiveProps {
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

function Grid({ cols = { mobile: 1, tablet: 2, desktop: 3 } }: ResponsiveProps) {
  return (
    <div className={`
      grid
      grid-cols-${cols.mobile}
      sm:grid-cols-${cols.tablet}
      lg:grid-cols-${cols.desktop}
    `}>
      {children}
    </div>
  );
}
```

---

## 📱 Real Device Testing Recommendations

### Must Test On
1. **iPhone** (latest iOS)
   - Safari browser
   - Portrait and landscape
   - Test form inputs (no zoom)

2. **Android** (Samsung/Google Pixel)
   - Chrome browser
   - Different screen sizes
   - Test touch interactions

3. **iPad** (tablet experience)
   - Safari browser
   - Both orientations
   - Test responsive layouts

### Nice to Have
- Older iPhone (iOS 14+)
- Low-end Android device
- Desktop with touch screen
- Large desktop monitor (>1920px)

---

## 🎯 Responsive Best Practices

### Do's ✅
- Start with mobile design first
- Use relative units (rem, em, %)
- Test on real devices
- Use semantic HTML
- Optimize images for mobile
- Use touch-friendly sizes (44px+)
- Test in both orientations
- Consider slow networks

### Don'ts ❌
- Don't use fixed pixel widths
- Don't assume mouse availability
- Don't require precise clicking
- Don't hide critical features on mobile
- Don't make text too small
- Don't forget landscape mode
- Don't ignore iOS quirks
- Don't test only in DevTools

---

**Last Updated**: November 4, 2025  
**Maintained by**: Design & Development Team
