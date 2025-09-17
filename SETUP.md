# Admin Panel Setup Guide

## Environment Configuration

### 1. Create Environment File
Create a `.env.local` file in the root directory with the following content:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/apeksha

# Alternative: MongoDB Atlas connection string
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/apeksha?retryWrites=true&w=majority
```

### 2. MongoDB Setup Options

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `MONGO_URI=mongodb://localhost:27017/apeksha`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Use: `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/apeksha?retryWrites=true&w=majority`

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Access Admin Panel
Navigate to: `http://localhost:3000/adminpanel`

**Login Credentials:**
- Email: `apekshafoundation@gmail.com`
- Password: `apeksha@none23`

## Features Fixed

✅ **Error Handling**: Added comprehensive error handling for all API calls
✅ **Date Validation**: Fixed date parsing and display issues
✅ **Price Validation**: Added fallback for invalid price values
✅ **MongoDB Connection**: Improved connection error handling
✅ **Form Validation**: Added client-side and server-side validation
✅ **User Feedback**: Added error alerts for failed operations
✅ **Unused Imports**: Cleaned up unused Lucide React icons

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MONGO_URI is set in `.env.local`
   - Check if MongoDB is running (for local setup)
   - Verify connection string format

2. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for any missing environment variables

3. **API Errors**
   - Check browser console for detailed error messages
   - Verify MongoDB connection
   - Ensure all required fields are filled in forms

## Admin Panel Features

- **Events Management**: Create, read, update, delete events (Our Initiatives)
- **Gallery Management**: Create, read, update, delete gallery items
- **Professional UI**: Sleek black theme with animations
- **Persistent Login**: Stays logged in across page reloads
- **Responsive Design**: Works on all screen sizes
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error messages
