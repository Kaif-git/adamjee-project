# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repository contains a school website project for Adamjee Cantonment Public School (ACPS). The project consists of two distinct implementations:
1. **Static HTML/CSS/JS Website** - A fully-featured, interactive school website (primary implementation)
2. **React App** - A basic Create React App scaffolding (appears to be unused/template code)

The main website functionality is built using vanilla HTML, CSS, and JavaScript with advanced interactive features.

## Development Commands

### React App Commands (if developing the React version)
```bash
# Install dependencies
npm install

# Start development server
npm start
# Opens http://localhost:3000 in browser

# Run tests
npm test

# Build for production
npm run build

# Eject from Create React App (irreversible)
npm run eject
```

### Static Website Development
The main website (`index.html`) can be served using any static server:
```bash
# Using Python (if available)
python -m http.server 8000
# Or Python 3
python3 -m http.server 8000

# Using Node.js http-server (install globally first: npm install -g http-server)
http-server

# Using Live Server extension in VS Code (recommended for development)
# Install "Live Server" extension and right-click index.html -> "Open with Live Server"
```

### Testing Individual Components
```bash
# Run specific test files
npm test App.test.js

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Architecture Overview

### Project Structure
```
├── index.html              # Main static website (primary implementation)
├── script.js              # Main JavaScript with interactive features
├── styles.css             # Main stylesheet with animations and effects
├── images/                # Static assets (school photos, icons)
├── src/                   # React app files (basic scaffolding)
│   ├── App.js            # React main component (basic template)
│   ├── App.css           # React component styles
│   └── index.js          # React entry point
├── public/               # React public assets
└── package.json          # Node.js dependencies and scripts
```

### Key Technical Components

#### Static Website (Primary)
- **SchoolWebsite Class** (`script.js`): Main application controller
  - Tab navigation system
  - Interactive animations and effects
  - Slideshow functionality
  - Gallery filtering
  - Particle effects and visual feedback
- **InteractionEnhancer Class** (`script.js`): Advanced UI effects
  - Magnetic hover effects
  - 3D tilt animations
  - Parallax scrolling
- **CSS Architecture** (`styles.css`): 
  - CSS custom properties for theming
  - Advanced animations and keyframes
  - Responsive design patterns
  - Backdrop filters and modern CSS effects

#### React App (Secondary/Unused)
- Basic Create React App structure
- No custom components beyond default template
- Standard testing setup with Jest and React Testing Library

### Core Functionality

#### Interactive Features
1. **Multi-tab Navigation**: Dynamic content switching with animations
2. **Image Slideshows**: Automatic and manual slideshow controls
3. **Gallery System**: Filterable photo gallery with categories
4. **Visual Effects**: Particle systems, hover effects, click animations
5. **Responsive Design**: Mobile-friendly layout and interactions
6. **Easter Eggs**: Hidden features (Konami code implementation)

#### Animation System
- CSS keyframe animations for smooth transitions
- JavaScript-controlled dynamic animations
- Intersection Observer for scroll-triggered effects
- Magnetic and tilt effects on interactive elements

## Development Workflow

### For Static Website Development
1. Open `index.html` in a local server
2. Edit `script.js` for functionality changes
3. Modify `styles.css` for styling updates
4. Test across different browsers
5. Optimize images in the `images/` directory

### For React Development
1. Run `npm start` for development server
2. Edit components in `src/` directory
3. Add tests in `src/` with `.test.js` suffix
4. Build with `npm run build` for production

### Code Organization Principles
- **Modular JavaScript**: Classes for different functionality areas
- **CSS Custom Properties**: Centralized theming system
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Component-based Effects**: Reusable animation and interaction patterns

## Important Implementation Details

### JavaScript Architecture
- Event-driven architecture with class-based organization
- Extensive use of DOM manipulation and modern APIs
- Dynamic CSS injection for animations
- Intersection Observer for performance optimization

### CSS Patterns
- Custom property-based theming system
- Extensive use of CSS Grid and Flexbox
- Advanced selectors and pseudo-elements
- Backdrop filters for modern visual effects

### Performance Considerations
- Lazy loading of animations
- Efficient event delegation
- Cleanup of dynamically created elements
- Optimized asset loading

### Browser Compatibility
- Modern browser features used (Intersection Observer, CSS Custom Properties)
- Graceful degradation for older browsers
- Mobile-responsive design patterns

## File Dependencies

### Critical Files for Website Function
- `index.html` - Main page structure and content
- `script.js` - All interactive functionality
- `styles.css` - Complete styling and animations
- `images/` directory - Visual assets

### React App Dependencies
- Standard Create React App dependencies in `package.json`
- React 19.1.1 (latest version)
- Testing Library setup for component testing

## Development Tips

- Use browser DevTools for debugging animations
- Test interactive features across different devices
- The static website has extensive JavaScript features that require testing
- Image paths are hardcoded and should be verified when adding new assets
- CSS animations use modern features - check browser compatibility when making changes
