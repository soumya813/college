# Firebase Setup Instructions

## Current Issues:
1. `auth/invalid-credential` - Test users don't exist
2. `Missing or insufficient permissions` - Firestore rules are too restrictive

## Fix 1: Update Firestore Security Rules

Go to Firebase Console → Firestore Database → Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    
    // For development only - more permissive rules
    // Remove these in production!
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Fix 2: Enable Authentication Methods

Go to Firebase Console → Authentication → Sign-in method:
1. Enable "Email/Password" authentication
2. Optionally enable "Anonymous" for testing

## Fix 3: Create Test Users Manually

Go to Firebase Console → Authentication → Users:
1. Click "Add user"
2. Create these test accounts:
   - Email: `student@test.com`, Password: `test123`
   - Email: `teacher@test.com`, Password: `test123`  
   - Email: `guard@test.com`, Password: `test123`

## Fix 4: Create User Documents in Firestore

Go to Firebase Console → Firestore Database → Data:
1. Create collection called `users`
2. For each user created above, add a document with their UID as the document ID:

**Student document (use the UID from Authentication):**
```json
{
  "id": "USER_UID_HERE",
  "email": "student@test.com",
  "name": "Test Student",
  "role": "student",
  "enrollmentNumber": "STU001"
}
```

**Teacher document:**
```json
{
  "id": "USER_UID_HERE", 
  "email": "teacher@test.com",
  "name": "Test Teacher",
  "role": "teacher",
  "employeeId": "TCH001"
}
```

**Guard document:**
```json
{
  "id": "USER_UID_HERE",
  "email": "guard@test.com", 
  "name": "Test Guard",
  "role": "guard",
  "employeeId": "GRD001"
}
```

## Alternative: Development-Only Permissive Rules

If you want to allow the app to create users automatically, use these rules temporarily:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // DEVELOPMENT ONLY - Very permissive rules
    // DO NOT USE IN PRODUCTION!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

After updating the rules, try the "Create Test Users in Firebase" button again.