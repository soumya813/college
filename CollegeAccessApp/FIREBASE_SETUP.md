# Firebase Setup Guide

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `college-access-management`
4. Enable Google Analytics (optional)
5. Create project

## 2. Configure Authentication

1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" authentication
3. Optionally enable other sign-in methods

## 3. Set up Firestore Database

1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (for development)
3. Select a location closest to your users

## 4. Configure Firebase for your app

1. Go to Project Settings → General
2. Click "Add app" → Web app (</>) 
3. Register app with nickname: `college-access-app`
4. Copy the Firebase configuration object

## 5. Update Firebase Config

Replace the configuration in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## 6. Create Initial Users

In Firebase Console → Authentication → Users, manually create test users:

### Teacher Account
- **Email**: john.doe@college.edu
- **Password**: password123

### Student Account  
- **Email**: jane.smith@college.edu
- **Password**: password123

### Guard Account
- **Email**: bob.wilson@college.edu  
- **Password**: password123

## 7. Set up Firestore Collections

Go to Firestore Database and create these collections with sample documents:

### Collection: `users`

Document ID: (use the Authentication UID)
```json
{
  "name": "John Doe",
  "email": "john.doe@college.edu", 
  "role": "teacher",
  "employeeId": "T001"
}
```

Document ID: (use the Authentication UID)
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@college.edu",
  "role": "student", 
  "enrollmentNumber": "S001"
}
```

Document ID: (use the Authentication UID)
```json
{
  "name": "Bob Wilson",
  "email": "bob.wilson@college.edu",
  "role": "guard",
  "employeeId": "G001"
}
```

### Collection: `classes`

```json
{
  "subject": "Mathematics",
  "teacher": "John Doe", 
  "teacherId": "teacher-uid-here",
  "time": "9:00 AM - 10:00 AM",
  "room": "Room 101",
  "day": "Monday",
  "studentIds": ["student-uid-here"]
}
```

### Collection: `assignments`

```json
{
  "title": "Calculus Problem Set",
  "description": "Complete exercises 1-20 from chapter 5",
  "subject": "Mathematics",
  "dueDate": "2024-12-01T23:59:00Z",
  "studentIds": ["student-uid-here"],
  "completed": false
}
```

### Collection: `notifications`

```json
{
  "title": "Assignment Due Tomorrow",
  "message": "Mathematics assignment is due tomorrow",
  "type": "assignment",
  "timestamp": "2024-11-19T10:00:00Z",
  "recipientIds": ["student-uid-here"],
  "read": false
}
```

## 8. Security Rules (Optional for Development)

In Firestore → Rules, you can use these basic rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read/write data
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 9. Test the App

1. Start your Expo app: `npm start`
2. Try logging in with the test credentials
3. Verify that user roles are properly detected and navigation works

## Important Notes

- **Security**: The test mode rules allow any authenticated user to read/write all data. Implement proper security rules for production.
- **UID Mapping**: Make sure to use the actual Firebase Authentication UIDs when creating user documents in Firestore.
- **Environment**: Consider using environment variables for different Firebase projects (development, staging, production).

## Production Considerations

1. **Security Rules**: Implement proper Firestore security rules
2. **Environment Variables**: Use environment-specific configuration
3. **Error Handling**: Add comprehensive error handling and logging
4. **Data Validation**: Validate data on both client and server side
5. **Backup**: Set up automated Firestore backups