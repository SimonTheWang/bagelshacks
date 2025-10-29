# Supabase Real-Time Setup

The "Who's Coming" section now uses **Supabase Real-Time** for instant updates!

## Features Enabled:

✅ **Live updates** - New attendees appear instantly without refresh  
✅ **Automatic sorting** - Maintains role order when new people are added  
✅ **Efficient loading** - Only fetches data once, then streams updates  
✅ **Staggered animations** - Cards fade in progressively (100ms delay each)

## How It Works:

1. **Initial Load** - Fetches all attendees from database
2. **Real-Time Subscription** - Listens for changes to the `attendees` table
3. **Instant Updates** - When you add an attendee in `/admin`, it appears immediately on the homepage
4. **Auto-Sort** - New attendees are automatically sorted by role

## Enable Real-Time (Optional)

Real-time is enabled by default in Supabase! If it's not working:

1. Go to: https://supabase.com/dashboard/project/ksihoppdtkyebxzfkgsj/settings/replication
2. Check that `attendees` table has replication enabled
3. If not, toggle it on

## Testing Real-Time:

1. Open the homepage: http://localhost:5174/
2. Open the admin page in another tab: http://localhost:5174/admin
3. Add an attendee in the admin
4. Watch it appear **instantly** on the homepage!

No page refresh needed! 🚀

## Events Handled:

- **INSERT** - New attendee appears
- **UPDATE** - Existing attendee updates
- **DELETE** - Attendee is removed

## Performance Benefits:

- ✅ No polling required
- ✅ WebSocket connection (efficient)
- ✅ Only sends changes, not entire dataset
- ✅ Scales to thousands of attendees

