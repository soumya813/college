# College Access Management App

A comprehensive mobile application built with **Expo/React Native** and **Firebase** for managing college access control, attendance tracking, and academic management.

## 🚀 Features

### 👨‍🏫 Teacher Features
- **Dashboard**: Overview of daily classes, student attendance, and assignments
- **Timetable**: Weekly schedule management
- **Notifications**: Assignment submissions, meeting reminders, and announcements
- **Settings**: Profile management and app preferences

### 👨‍🎓 Student Features
- **Dashboard**: Check-in/out times, assignments, and class schedules
- **QR Code Generation**: Generate QR codes for attendance tracking
- **Timetable**: Personal class schedule
- **Notifications**: Assignment deadlines, class cancellations, and announcements
- **Settings**: Academic records and profile management

### 👮‍♂️ Security Guard Features
- **QR Scanner**: Scan student/teacher QR codes for entry/exit tracking
- **Real-time Monitoring**: Live attendance tracking and entry logs
- **Settings**: Shift management and emergency contacts

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Authentication & Firestore)
- **Navigation**: React Navigation v6
- **QR Code**: expo-camera & react-native-qrcode-svg
- **Language**: TypeScript
- **State Management**: React Context API

## 📱 Screenshots

*Add screenshots here once the app is running*

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase account

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/college-access-management.git
cd college-access-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
Follow the detailed [Firebase Setup Guide](./FIREBASE_SETUP.md) to:
- Create a Firebase project
- Configure Authentication
- Set up Firestore database
- Update configuration files

### 4. Run the App
```bash
# Start the Expo development server
npm start

# Run on specific platform
npm run android  # Android
npm run ios      # iOS (macOS required)
npm run web      # Web browser
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── QRCodeGenerator.tsx
│   └── index.ts
├── config/              # Configuration files
│   └── firebase.ts      # Firebase configuration
├── context/             # React Context providers
│   └── AuthContext.tsx  # Authentication context
├── navigation/          # Navigation setup
│   └── AppNavigator.tsx # Main navigation structure
├── screens/             # Screen components
│   ├── Teacher/         # Teacher-specific screens
│   ├── Student/         # Student-specific screens
│   ├── Guard/           # Guard-specific screens
│   └── LoginScreen.tsx  # Login screen
├── services/            # API services
│   └── firebaseService.ts # Firestore operations
├── theme/               # Theme and styling
│   └── index.ts         # Design system
└── types/               # TypeScript type definitions
    └── index.ts         # App-wide types
```

## 🔐 Authentication Flow

1. **Login**: Users sign in with email/password
2. **Role Detection**: Firebase fetches user role from Firestore
3. **Navigation**: App navigates to role-specific interface
4. **Session Management**: Firebase handles session persistence

## 📊 Database Schema

### Firestore Collections

#### `users`
```typescript
{
  id: string;           // Firebase Auth UID
  name: string;         // Full name
  email: string;        // Email address
  role: 'student' | 'teacher' | 'guard';
  enrollmentNumber?: string;  // For students
  employeeId?: string;        // For teachers and guards
}
```

#### `attendance`
```typescript
{
  id: string;
  userId: string;       // Reference to users collection
  timestamp: Date;      // Check-in/out time
  type: 'in' | 'out';   // Entry or exit
  location?: string;    // Optional location info
}
```

#### `assignments`
```typescript
{
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  subject: string;
  studentIds: string[]; // Array of student user IDs
  completed: boolean;
}
```

#### `classes`
```typescript
{
  id: string;
  subject: string;
  teacher: string;      // Teacher name
  teacherId: string;    // Teacher user ID
  time: string;         // Class time
  room: string;         // Room number
  day: string;          // Day of week
  studentIds: string[]; // Array of student user IDs
}
```

## 🔒 Security

- **Authentication**: Firebase Authentication with email/password
- **Authorization**: Role-based access control
- **Data Validation**: Client and server-side validation
- **Firestore Rules**: Secure database access rules

## 📱 QR Code System

### For Students/Teachers:
1. Generate QR code containing:
   - User ID
   - Name
   - Role
   - Timestamp
   - Entry type (in/out)

### For Guards:
1. Scan QR codes using camera
2. Parse user information
3. Record attendance in Firestore
4. Display real-time entry logs

## 🧪 Testing

### Demo Accounts
After Firebase setup, create these test accounts:

- **Teacher**: john.doe@college.edu (password123)
- **Student**: jane.smith@college.edu (password123)  
- **Guard**: bob.wilson@college.edu (password123)

## 🚀 Deployment

### Expo EAS Build
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build
eas build:configure

# Build for production
eas build --platform all
```

### Web Deployment
```bash
# Build for web
npm run build:web

# Deploy to Firebase Hosting
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Firebase Setup Guide](./FIREBASE_SETUP.md)
2. Review the [troubleshooting section](#troubleshooting)
3. Create an issue in the GitHub repository

## 🔮 Future Enhancements

- [ ] Push notifications
- [ ] Offline mode support
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Face recognition integration
- [ ] Parent portal access
- [ ] Exam scheduling system

## 📞 Contact

**Developer**: Your Name  
**Email**: your.email@example.com  
**GitHub**: [@yourusername](https://github.com/yourusername)

---

*Built with ❤️ for educational institutions*