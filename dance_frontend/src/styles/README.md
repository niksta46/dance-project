# Design System Documentation

## Overview

This design system provides a consistent visual language and component patterns for the dance club website. All design tokens are centralized in `designSystem.js` for maintainability and consistency.

## Getting Started

### Import Design System

```javascript
// Import individual modules
import { colors, typography, buttonVariants } from '../styles/designSystem';

// Import everything (not recommended for tree-shaking)
import designSystem from '../styles/designSystem';
```

## Design Tokens

### Colors

#### Primary Colors
Use `colors.primary` for brand elements and main actions:
- `colors.primary.500` (#5B0E14) - Main brand color
- `colors.primary.600` (#16A34A) - Hover states
- `colors.primary.300` (#86EFAC) - Light accents

#### Secondary Colors
Use `colors.secondary` for supporting elements:
- `colors.secondary.500` (#F1E194) - Highlight color
- `colors.secondary.600` (#EAB308) - Hover states

#### Neutral Colors
Use `colors.neutral` for text, borders, and backgrounds:
- `colors.neutral.50` (#F2F5F5) - Light backgrounds
- `colors.neutral.500` (#737373) - Muted text
- `colors.neutral.900` (#171717) - Dark text

#### Semantic Colors
- `colors.text` (#565360) - Primary body text
- `colors.label` (#908E9B) - Label and muted text
- `colors.disabled` (#E1DFE9) - Disabled elements

### Typography

#### Font Sizes
Use `typography.fontSize` for consistent text sizing:
```javascript
typography.fontSize.sm  // ['0.875rem', { lineHeight: '1.25' }]
typography.fontSize.base // ['1rem', { lineHeight: '1.5' }]
typography.fontSize.xl  // ['1.25rem', { lineHeight: '1.5' }]
```

#### Text Variants
Predefined text styles for common use cases:
```javascript
// Headings
textVariants.heading.h1  // 'text-4xl font-bold text-gray-900'
textVariants.heading.h2  // 'text-3xl font-bold text-gray-900'

// Body text
textVariants.body.base   // 'text-base text-gray-700'
textVariants.body.small  // 'text-sm text-gray-700'

// Labels
textVariants.label.base  // 'text-sm text-label font-medium'
```

### Spacing

When custom spacing is added to Tailwind, use `spacing` values:
```javascript
spacing[4]  // '1rem' (16px)
spacing[8]  // '2rem' (32px)
spacing[16] // '4rem' (64px)
```

## Component Patterns

### Buttons

Use `buttonVariants` for consistent button styling:

#### Primary Buttons
```javascript
buttonVariants.primary.base // 'bg-primary-600 text-white hover:bg-primary-600 focus:ring-4 focus:ring-primary-300'
buttonVariants.primary.size.medium // 'px-4 py-2 text-base'
```

**Usage:**
```jsx
<button className={`${buttonVariants.primary.base} ${buttonVariants.primary.size.medium}`}>
  Primary Action
</button>
```

#### Secondary Buttons
```javascript
buttonVariants.secondary.base // 'bg-secondary-500 text-gray-900 hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300'
```

#### Outline Buttons
```javascript
buttonVariants.outline.base // 'border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-4 focus:ring-primary-300'
```

### Cards

Use `cardVariants` for consistent card layouts:

```javascript
// Default card
cardVariants.default.base // 'bg-white border border-neutral-200 rounded-lg shadow-sm'
cardVariants.default.padding.medium // 'p-6'

// Elevated card
cardVariants.elevated.base // 'bg-white border border-neutral-200 rounded-lg shadow-lg'

// Outlined card
cardVariants.outlined.base // 'bg-white border-2 border-primary-500 rounded-lg'
```

**Usage:**
```jsx
<div className={`${cardVariants.default.base} ${cardVariants.default.padding.medium}`}>
  <h2 className={textVariants.heading.h2}>Card Title</h2>
  <p className={textVariants.body.base}>Card content goes here.</p>
</div>
```

### Layout Patterns

Use `layout` constants for common layout needs:

```javascript
// Container with responsive padding
layout.container // 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

// Section spacing
layout.section // 'py-12 md:py-16 lg:py-20'

// Default card styling
layout.card // 'bg-white rounded-lg shadow-sm border border-neutral-200'
```

## Usage Guidelines

### Color Usage

#### When to Use Primary Colors
- Main navigation elements
- Call-to-action buttons
- Important interactive elements
- Brand accents

#### When to Use Secondary Colors
- Secondary actions
- Highlighted information
- Supporting elements
- Accent backgrounds

#### When to Use Neutral Colors
- Body text (`colors.text`)
- Labels and metadata (`colors.label`)
- Disabled states (`colors.disabled`)
- Borders and dividers

### Typography Hierarchy

1. **H1**: Main page titles - Use `textVariants.heading.h1`
2. **H2**: Section titles - Use `textVariants.heading.h2`
3. **H3**: Subsection titles - Use `textVariants.heading.h3`
4. **Body**: Main content - Use `textVariants.body.base`
5. **Label**: Form labels and metadata - Use `textVariants.label.base`

### Component Structure

#### Buttons
- Always use semantic button elements
- Include proper focus states
- Provide disabled states when needed
- Use consistent sizing across the application

#### Cards
- Use semantic article elements when appropriate
- Include proper heading hierarchy
- Add consistent padding based on content density
- Apply appropriate border/shadow treatments

## Best Practices

### 1. Consistency First
- Always use design tokens instead of hardcoded values
- Prefer variant classes over custom styling
- Follow established naming conventions

### 2. Accessibility
- Ensure proper color contrast ratios
- Include focus states for interactive elements
- Use semantic HTML elements
- Add appropriate ARIA attributes

### 3. Responsive Design
- Test components across all breakpoints
- Use responsive spacing and typography
- Ensure touch targets meet minimum size requirements

### 4. Performance
- Import only needed design tokens
- Avoid inline styles when possible
- Use Tailwind's JIT compilation efficiently

## Integration with Flowbite

The design system works alongside Flowbite React components. When using Flowbite components:

1. **Custom Colors**: Flowbite components automatically pick up our custom Tailwind colors
2. **Theme Override**: Use `themes/flowbiteTheme.js` for Flowbite-specific customizations
3. **Design Tokens**: Use design system constants for custom styling that complements Flowbite

## Testing

Visit `/demo` route to see all design system components and patterns in action. This showcase includes:
- Color palette displays
- Typography scale examples
- Component variations
- Usage code examples

## Maintenance

### Adding New Colors
1. Add to `colors` object in `designSystem.js`
2. Update Tailwind config if needed
3. Add examples to demo page
4. Update this documentation

### Adding New Component Variants
1. Add to appropriate variant object (buttonVariants, cardVariants, etc.)
2. Include size/padding variations if applicable
3. Add usage examples
4. Update documentation

### Breaking Changes
- Update version in design system comments
- Document migration steps
- Update all component references
- Test thoroughly across the application

## Support

For questions or issues with the design system:
1. Check the demo page at `/demo`
2. Review existing component implementations
3. Consult this documentation
4. Ensure you're using the latest design system version