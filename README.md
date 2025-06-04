# Schedule System

A modern scheduling and booking system built with React and Node.js, featuring a clean UI with Tailwind CSS.

##  Features

- **User Authentication**
  - Secure login and registration
  - Password visibility toggle
  - Toast notifications for feedback
  - JWT-based authentication

- **Dashboard**
  - Clean and modern interface
  - Centralized availability management
  - Quick access to all features
  - Responsive design

- **Booking Management**
  - Easy slot selection
  - Date picker with available times
  - Real-time availability updates
  - Booking confirmation system

- **User Interface**
  - Modern and responsive design
  - Tailwind CSS styling
  - Loading states and animations
  - Error handling with user feedback

##  Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd Schedule-System
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In backend directory
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend in a new terminal
   cd frontend
   npm run dev
   ```

##  Project Structure

```
Schedule-System/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Booking/
│   │   │   └── Dashboard/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── server.js
    └── package.json
```

##  Features Walkthrough

### 1. Authentication Flow
- Visit the login/register page
- Enter credentials
- Receive toast notifications for success/failure
- Redirect to dashboard upon success

### 2. Dashboard
- View welcome message
- Access availability management
- Set available time slots
- View booking statistics

### 3. Booking Process
- Select a date from the calendar
- View available time slots
- Select preferred time slot
- Confirm booking
- Receive confirmation with details

##  API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Booking
- `GET /api/book/:linkId/availability` - Get owner's availability
- `GET /api/book/:linkId/slots/:date` - Get available slots
- `POST /api/book/booking` - Create new booking

##  Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Input Validation
- Error Handling

##  Technology Stack

- **Frontend**
  - React
  - React Router
  - Tailwind CSS
  - Axios
  - React-Toastify
  - Date-fns

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - JWT
  - Bcrypt


##  Authors

- [Rutvik Mangukiya] 

##  Acknowledgments

- React Documentation
- Tailwind CSS
- MongoDB Documentation
- Node.js Community

