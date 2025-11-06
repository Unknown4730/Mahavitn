# Mobile Testing Guide for Mahavitaran App

## Quick Test URLs
Test your deployment on these devices using browser dev tools:

### iOS Devices to Test
- iPhone SE (375 x 667)
- iPhone 12/13/14 (390 x 844)
- iPhone 12/13/14 Pro Max (428 x 926)
- iPad (810 x 1080)
- iPad Pro 12.9" (1024 x 1366)

### Android Devices to Test
- Samsung Galaxy S21 (360 x 800)
- Samsung Galaxy S21 Ultra (384 x 854)
- Google Pixel 5 (393 x 851)
- OnePlus 9 Pro (412 x 919)
- Samsung Galaxy Tab S7 (753 x 1037)

## Manual Testing Checklist

### 🔴 Critical Features (Must Pass)
- [ ] App loads correctly on mobile browsers
- [ ] Navigation menu (hamburger) opens and closes smoothly
- [ ] All buttons are tappable (minimum 44x44px)
- [ ] Forms accept input without zoom issues
- [ ] Login functionality works on mobile
- [ ] Dashboard displays correctly
- [ ] Payment page is accessible and functional
- [ ] Bill viewing works properly
- [ ] No horizontal scrolling on any page

### 🟡 Important Features
- [ ] Language toggle works (English/Marathi)
- [ ] Dark mode toggle functions correctly
- [ ] All cards are clickable and responsive
- [ ] Images load appropriately for mobile
- [ ] Dialogs/Modals fit within screen bounds
- [ ] Meter reading photos display correctly
- [ ] Charts render properly on small screens
- [ ] Consumer switching works in dashboard
- [ ] Profile page is editable

### 🟢 Nice to Have Features
- [ ] Animations run smoothly (60fps)
- [ ] Pull-to-refresh (if implemented)
- [ ] Haptic feedback (if implemented)
- [ ] Offline mode indication
- [ ] Install prompt (PWA)
- [ ] Back button navigation works correctly

## Feature-by-Feature Testing

### 1. Landing Page
**Portrait Mode:**
- [ ] Hero section displays properly
- [ ] Quick action cards are tappable
- [ ] Service cards scroll horizontally (if carousel)
- [ ] Footer links are accessible

**Landscape Mode:**
- [ ] Content adapts to wider aspect ratio
- [ ] No awkward spacing issues
- [ ] All elements remain visible

### 2. Login/Registration
**Forms:**
- [ ] Email/phone input accepts all formats
- [ ] Password visibility toggle works
- [ ] No zoom-in when focusing inputs (iOS)
- [ ] Keyboard doesn't cover submit button
- [ ] Form validation displays properly
- [ ] Marathi text displays correctly in placeholders

**Actions:**
- [ ] Login button is easily tappable
- [ ] Registration link redirects correctly
- [ ] Forgot password is accessible
- [ ] Back to home button works

### 3. Dashboard
**Consumer Management:**
- [ ] Consumer selector dropdown works
- [ ] Add consumer button is accessible
- [ ] Multiple consumers can be switched
- [ ] Consumer cards display properly

**Bill Details:**
- [ ] Current bill amount visible
- [ ] Due date clearly shown
- [ ] Pay bill button is prominent
- [ ] Download bill works on mobile

**Usage Charts:**
- [ ] Charts render correctly
- [ ] Touch interactions work (pan/zoom if enabled)
- [ ] Legend is readable
- [ ] Tooltips appear on tap

**Meter Reading:**
- [ ] Dialog opens correctly
- [ ] Meter photos display properly
- [ ] Readings are clearly visible
- [ ] Calculated usage shows correctly
- [ ] Close button is accessible

### 4. Services Page
- [ ] All service cards are tappable
- [ ] New connection form works
- [ ] Outage reporting functions correctly
- [ ] Application tracking is accessible
- [ ] Contact information displays properly

### 5. Payment Page
**Payment Options:**
- [ ] UPI QR code displays correctly
- [ ] Bank dropdown is accessible
- [ ] Credit/debit card inputs work
- [ ] Payment amount is editable
- [ ] Submit button is prominent

**UPI Integration:**
- [ ] QR code is scannable
- [ ] UPI ID is copyable
- [ ] Payment confirmation displays

### 6. Profile Page
- [ ] Profile photo displays correctly
- [ ] Edit fields are accessible
- [ ] Save button works
- [ ] Consumer list is manageable
- [ ] Settings are adjustable

### 7. Navigation
**Header:**
- [ ] Logo is visible and tappable
- [ ] Hamburger menu icon is clear
- [ ] Language selector works
- [ ] Dark mode toggle functions
- [ ] User avatar is tappable

**Mobile Menu:**
- [ ] Opens with smooth animation
- [ ] All nav links are visible
- [ ] Close button (X) works
- [ ] Backdrop dismisses menu
- [ ] User section displays correctly

## Platform-Specific Tests

### iOS Safari Tests
- [ ] No zoom on input focus
- [ ] Safe area insets respected (notched devices)
- [ ] Smooth scrolling works
- [ ] Bottom bar doesn't hide content
- [ ] Share sheet integration (if applicable)
- [ ] No layout shifts during scroll
- [ ] Font rendering is crisp

### iOS Chrome Tests
- [ ] Similar to Safari tests
- [ ] Chrome-specific gestures work
- [ ] URL bar behavior is acceptable

### Android Chrome Tests
- [ ] Material Design feel maintained
- [ ] System back button works correctly
- [ ] Address bar auto-hide works well
- [ ] Pull-to-refresh (if enabled)
- [ ] Overflow menu accessible

### Android Firefox Tests
- [ ] All features work as expected
- [ ] Rendering is consistent
- [ ] Performance is acceptable

## Performance Tests

### Load Time
- [ ] First paint < 1.5s on 3G
- [ ] Interactive < 3.5s on 3G
- [ ] Images lazy load properly

### Scrolling
- [ ] Smooth 60fps scrolling
- [ ] No jank or stuttering
- [ ] Momentum scrolling works (iOS)

### Animations
- [ ] Butter-smooth transitions
- [ ] No dropped frames
- [ ] Can be disabled for accessibility

### Battery Usage
- [ ] No excessive battery drain
- [ ] Animations don't run constantly
- [ ] No memory leaks

## Accessibility Tests

### Touch Targets
- [ ] All buttons ≥ 44x44px
- [ ] Adequate spacing between tappable elements
- [ ] No overlapping tap targets

### Readability
- [ ] Text is readable without zooming
- [ ] Contrast ratios meet WCAG standards
- [ ] Font sizes are appropriate

### Screen Readers
- [ ] VoiceOver (iOS) announces elements correctly
- [ ] TalkBack (Android) works properly
- [ ] ARIA labels are present and correct

## Network Conditions

### Good Connection (4G/5G)
- [ ] App loads quickly
- [ ] Images load crisp
- [ ] Real-time features work (if any)

### Poor Connection (3G)
- [ ] App still functional
- [ ] Loading states shown
- [ ] Graceful degradation

### Offline
- [ ] Appropriate error messages
- [ ] Cached content accessible (if implemented)
- [ ] Offline indicator shown

## Orientation Tests

### Portrait to Landscape
- [ ] Layout adapts smoothly
- [ ] No content cutoff
- [ ] Dialogs reposition correctly

### Landscape to Portrait
- [ ] Reverse transition works
- [ ] State is maintained
- [ ] No layout breaks

## Edge Cases

### Small Screens (iPhone SE, 375px)
- [ ] All content fits
- [ ] Buttons don't overlap
- [ ] Text doesn't truncate inappropriately

### Large Screens (iPad, 1024px+)
- [ ] Layout uses space efficiently
- [ ] Not just stretched mobile view
- [ ] Desktop features available

### Notched Devices
- [ ] Content respects safe areas
- [ ] No important content in notch area
- [ ] Status bar area handled correctly

### Foldable Devices
- [ ] Works in both folded and unfolded states
- [ ] Adapts to different aspect ratios
- [ ] No crashes during fold/unfold

## Security Tests

### Input Validation
- [ ] SQL injection prevented
- [ ] XSS attacks prevented
- [ ] Proper sanitization on mobile

### Secure Storage
- [ ] Sensitive data encrypted
- [ ] Session management secure
- [ ] Logout clears data

## Regression Tests

After each update:
- [ ] Previously working features still work
- [ ] No new visual bugs
- [ ] Performance hasn't degraded
- [ ] All tests above still pass

## Tools for Testing

### Browser DevTools
- Chrome DevTools Device Mode
- Firefox Responsive Design Mode
- Safari Web Inspector

### Online Testing
- BrowserStack
- Sauce Labs
- LambdaTest

### Physical Devices
- Use real devices for final testing
- Test on various OS versions
- Test on different network conditions

## Bug Reporting Template

When you find a bug:

```
**Device:** iPhone 13 Pro
**OS:** iOS 17.2
**Browser:** Safari
**Screen Size:** 390x844
**Orientation:** Portrait
**Issue:** [Description]
**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
**Expected:** [What should happen]
**Actual:** [What actually happened]
**Screenshots:** [If applicable]
```

## Sign-off Checklist

Before launching:
- [ ] All critical tests passed
- [ ] All important tests passed
- [ ] Tested on minimum 3 iOS devices
- [ ] Tested on minimum 3 Android devices
- [ ] Tested in poor network conditions
- [ ] Accessibility audit completed
- [ ] Performance metrics within targets
- [ ] Security audit completed
- [ ] Cross-browser testing done
- [ ] Real user testing completed

---

**Testing Status:** ⚠️ Pending
**Last Updated:** October 15, 2025
**Tester:** [Name]
**Version:** 1.0.0
