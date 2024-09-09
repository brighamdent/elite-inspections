Elite Inspections

Elite Inspections is a website for a home inspection company that allows clients to schedule inspections, provides business information, handles payments, and includes an admin dashboard for managing appointments.

Features
- Online scheduling for home inspections.
- Admin dashboard for appointment management.
- Integration with Stripe for accepting payments.
- Business information section.
- Firebase for authentication.
- Google Drive integration for file storage.

Technologies Used
- Next.js: Framework for building the frontend and backend.
- MariaDB: Database for storing appointments and user data.
- Tailwind CSS: Utility-first CSS framework for styling.
- Firebase: For authentication and user management.
- Google Drive API: For managing files.
- Stripe: For handling payments.

Setup Instructions

1. Clone the repository
   git clone https://github.com/yourusername/elite-inspections.git
   cd elite-inspections

2. Install dependencies
   npm install

3. Set up environment variables
   Create a .env.local file in the root directory and add the following environment variables:

   # Database Credentials
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name

   # Emailer Credentials
   EMAIL=your_email
   PASS=your_email_password

   # Firebase API Keys
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   # Admin UID for Middleware
   NEXT_PUBLIC_ADMIN_UID=your_admin_uid

   # Google Drive Credentials
   GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id
   GOOGLE_CREDENTIALS=your_google_credentials_json

   # Stripe Keys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key

4. Database Setup
   Ensure MariaDB is installed and running. Create a new database for the project, and update the .env.local file with the appropriate credentials.

5. Run the development server
   npm run dev
   The app will be running at http://localhost:3000.

6. Build for production
   To build the project for production, run:
   npm run build

Usage
- Access the scheduling system as a customer or admin via the provided dashboard.
- Admins can manage appointments, handle payments, and view business insights.
- Stripe integration ensures payments are processed securely.
- Firebase handles authentication for users.
