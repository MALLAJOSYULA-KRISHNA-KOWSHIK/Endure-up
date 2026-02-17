# Admin Panel Documentation

## Accessing the Admin Panel

1. Go to: `http://localhost:8080/admin` (or your deployed site + `/admin`)
2. Enter the admin password: **`Endureup@2.0`**
3. Click "Login"

## Features

### 1. Manage Upcoming Events

The "Upcoming Events" tab allows you to add, edit, and delete events that appear on the homepage.

**Adding an Event:**
- Fill in the Event Title (e.g., "ENDURE UP Iron Challenge 2026")
- Select an Event Date
- Write a Description
- Click "Add Event"

**Editing an Event:**
- Click the edit icon (pencil) on any event
- Modify the details
- Click "Update Event"

**Deleting an Event:**
- Click the delete icon (trash) on any event
- Confirm deletion

### 2. Manage Gallery

The "Gallery" tab allows you to add and delete images that appear in the gallery section.

**Adding Gallery Images:**
- Paste the Image URL (must be a valid image URL)
- Add Alt Text (describes the image for accessibility)
- Optionally select Span Class:
  - **Normal (1x1)**: Standard image size
  - **Tall (2x height)**: Image takes up 2 rows
  - **Wide (2x width)**: Image takes up 2 columns
- Preview appears automatically
- Click "Add Image"

**Deleting Gallery Images:**
- Click "Delete" on any image
- Confirm deletion

## Data Storage

All data is stored in your browser's **localStorage**. This means:
- ✅ Data persists between sessions
- ✅ No backend server needed
- ⚠️ Data is local to each browser/device
- ⚠️ Clearing browser data will delete everything

**Exporting Data:**
You can export your data by opening the browser console and running:
```javascript
copy(localStorage.getItem('upcomingEvents'))
copy(localStorage.getItem('galleryImages'))
```

## Security Note

⚠️ **Current Setup**: Uses a simple password ("admin") for demonstration purposes.

For production, implement:
- Database storage (Firebase, MongoDB, etc.)
- User authentication with proper credentials
- Role-based access control
- HTTPS encryption

## Troubleshooting

**Images not showing in gallery:**
- Ensure the image URL is publicly accessible
- Try a different image URL (e.g., from a CDN)
- Check browser console (F12) for errors

**Data lost after browser refresh:**
- Check if localStorage is enabled in browser settings
- Try incognito/private mode
- Clear browser cache and try again

**Password not working:**
- Default password is: `admin`
- For custom password, edit `src/pages/Admin.tsx` line 17

## Admin Features Coming Soon

- User authentication system
- Image upload functionality
- Backup and restore data
- Analytics dashboard
- Email notifications
