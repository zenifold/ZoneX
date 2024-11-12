# Codebase Summary

## Key Components and Their Interactions

### Frontend Components
- **Authentication**
  - Login.js: Handles user authentication
  - PrivateRoute.js: Protects authenticated routes
  - AuthContext.js: Manages authentication state

- **Core Features**
  - HomePage.js: Main landing page
  - Settings.js: User settings management
  - Exercise.js: Exercise-related functionality
  - WorkoutDetail.js: Detailed workout view
  - WorkoutHistory.js: Historical workout tracking
  - ProgressDashboard.js: Progress monitoring
  - QuickPump.js: Quick workout feature

- **Navigation**
  - Navigation.js: Main navigation component
  - ScrollToTop.js: Navigation utility

### Backend Structure
- **Authentication System**
  - auth.js middleware: Handles JWT authentication
  - tenant.js middleware: Manages multi-tenant functionality

- **Data Models**
  - User.js: User data schema
  - Organization.js: Organization data schema

## Data Flow
1. Authentication flow through AuthContext
2. Protected routes managed by PrivateRoute component
3. API requests handled through backend routes
4. Data persistence through MongoDB models

## External Dependencies
- Core dependencies managed through package.json
- Environment variables in .env files
- Build configuration in vite.config.js and .babelrc

## Recent Significant Changes
- Initial documentation structure established
- Project architecture documented

## User Feedback Integration
- To be populated as user feedback is received

## Active Development Areas
- Documentation system implementation
- Core feature development
- Authentication system refinement

## Notes for Developers
- Follow established component structure for new features
- Utilize existing authentication system for protected routes
- Maintain documentation as changes are implemented
