# MERN Notes App

This project is a small full-stack notes application built with the MERN stack:

- **MongoDB** stores the data
- **Express** provides the backend API
- **React** builds the frontend user interface
- **Node.js** runs the backend server

Even though the app itself is small, it demonstrates the main ideas behind **full-stack development**:

- how a browser sends requests
- how a frontend talks to a backend
- how a backend validates data
- how a database stores and returns data
- how project files are organized

The app supports:

- viewing all notes
- viewing one note in detail
- creating a new note
- editing an existing note
- deleting a note

## 1. What "Full Stack" Means

A full-stack app has at least two major parts:

### Frontend

This is what the user sees in the browser.

In this project, the frontend:

- shows pages and buttons
- collects user input
- sends API requests
- displays the results returned by the backend

### Backend

This is the server-side logic.

In this project, the backend:

- receives requests from the frontend
- talks to MongoDB
- creates, reads, updates, and deletes notes
- sends JSON responses back to the frontend

### Database

This is where persistent data is stored.

In this project:

- MongoDB stores notes
- each note contains `title`, `content`, `createdAt`, and `updatedAt`

## 2. How This App Works End-to-End

Here is the full flow when a user creates a note:

1. The user opens the **Create** page in the browser.
2. React renders a form with a note title and body field.
3. The user clicks **Save Note**.
4. The frontend sends a `POST /api/notes` request.
5. Express receives that request on the backend.
6. The backend controller validates the incoming data.
7. Mongoose saves the note into MongoDB.
8. MongoDB returns the saved document.
9. The backend sends a JSON response back to the frontend.
10. The frontend shows a success toast and redirects the user.

That same general pattern is used for all CRUD operations:

- **Create** -> `POST`
- **Read all** -> `GET`
- **Read one** -> `GET /:id`
- **Update** -> `PUT /:id`
- **Delete** -> `DELETE /:id`

## 3. Tech Stack Used

### Frontend

- **React**: builds the UI with reusable components
- **Vite**: fast development server and build tool
- **React Router DOM**: page routing in the browser
- **Axios**: makes HTTP requests to the backend
- **Tailwind CSS**: utility-first CSS framework
- **DaisyUI**: component and theme layer on top of Tailwind
- **Lucide React**: icon library
- **React Hot Toast**: toast notifications

### Backend

- **Node.js**: JavaScript runtime for the server
- **Express**: backend framework for APIs
- **Mongoose**: object modeling layer for MongoDB
- **MongoDB**: database
- **dotenv**: loads environment variables from `.env`
- **@upstash/redis** and **@upstash/ratelimit**: rate limiting support
- **nodemon**: automatically restarts the server during development

## 4. High-Level Folder Structure

```text
mern-practice/
|-- README.md
|-- backend/
|   |-- .env
|   |-- package.json
|   |-- package-lock.json
|   `-- src/
|       |-- server.js
|       |-- config/
|       |   |-- db.js
|       |   `-- upstash.js
|       |-- controllers/
|       |   `-- notesController.js
|       |-- middleware/
|       |   `-- rateLimiter.js
|       |-- models/
|       |   `-- Note.js
|       `-- routes/
|           `-- notesRoutes.js
`-- frontend/
    |-- .gitignore
    |-- eslint.config.js
    |-- index.html
    |-- package.json
    |-- package-lock.json
    |-- postcss.config.js
    |-- README.md
    |-- tailwind.config.js
    |-- vite.config.js
    |-- public/
    |   |-- favicon.svg
    |   `-- icons.svg
    `-- src/
        |-- App.jsx
        |-- index.css
        |-- main.jsx
        |-- components/
        |   |-- Navbar.jsx
        |   |-- NoteCard.jsx
        |   `-- NoteEditorForm.jsx
        `-- pages/
            |-- CreatePage.jsx
            |-- EditPage.jsx
            |-- HomePage.jsx
            `-- NoteDetailPage.jsx
```

## 5. File-by-File Explanation

This section explains **every meaningful project file** in the app.

## 5A. Root File

### `README.md`

This file.

Its job is to explain:

- what the project does
- how the frontend and backend are connected
- how each file fits into the architecture
- how to run and understand the application

## 5B. Backend Files

The backend contains the server-side code.

### `backend/.env`

This file stores environment variables.

Environment variables are values you do **not** want to hard-code directly in source code, especially:

- database connection strings
- API secrets
- third-party service tokens

This project uses keys like:

- `MONGO_URI`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Why this matters:

- it keeps sensitive values separate from code
- it lets the same code run in development, staging, and production with different settings

### `backend/package.json`

This is the backend project manifest.

It tells Node and npm:

- the project name
- which dependencies are needed
- which scripts can be run
- whether the project uses ES modules

Important fields:

- `"type": "module"` allows `import` / `export`
- `"scripts"` defines:
  - `npm run dev` -> starts the backend with `nodemon`
  - `npm start` -> starts the backend with `node`

### `backend/package-lock.json`

This file is auto-generated by npm.

It locks exact package versions so installs are reproducible.

Why it matters:

- two developers can install the same dependency tree
- deployments become more predictable

Beginners usually do **not** edit this file manually.

### `backend/src/server.js`

This is the entry point of the backend server.

It is one of the most important files in the entire app.

Responsibilities:

- creates the Express app
- loads environment variables
- configures middleware
- sets up routes
- connects to MongoDB
- starts listening on port `5001`

Key ideas inside:

- `express.json()` lets Express read JSON request bodies
- `app.use(rateLimiter)` applies middleware before route handlers
- `app.use("/api/notes", notesRoutes)` mounts the notes API
- `connectDB().then(() => app.listen(...))` ensures the database is connected before the server starts

This file is the "assembly point" where the backend pieces are wired together.

### `backend/src/config/db.js`

This file is responsible for connecting Mongoose to MongoDB.

Why it exists:

- database connection logic should be separated from the main server file
- this keeps the code cleaner and easier to reuse

What it does:

- imports `mongoose`
- reads `process.env.MONGO_URI`
- calls `mongoose.connect(...)`
- logs success or exits on failure

This teaches an important backend pattern:

- **configuration code** lives separately from route and business logic

### `backend/src/config/upstash.js`

This file creates the Upstash Redis rate limiter configuration.

What it does:

- imports Upstash Redis and rate limiter tools
- reads Redis credentials from the `.env`
- creates a sliding window rate limiter

Why it exists:

- third-party service setup belongs in its own config file
- other parts of the app can import the ready-made limiter instead of recreating it

### `backend/src/middleware/rateLimiter.js`

This file defines custom Express middleware for rate limiting.

What middleware means:

- middleware runs **between** receiving a request and sending a response
- it can allow the request, block it, or modify it

What this middleware does:

- checks whether the request is allowed by the Upstash limiter
- returns `429 Too Many Requests` if the limit is exceeded
- falls back safely if the rate-limit service is temporarily unavailable

Why this matters in real apps:

- protects APIs from abuse
- helps prevent spam and accidental overload

### `backend/src/models/Note.js`

This file defines the **Mongoose model** for a note.

Important beginner concept:

- a **schema** defines the shape of data
- a **model** is the object you use to interact with that collection in MongoDB

This file defines:

- `title` as a required string
- `content` as a required string
- timestamps so MongoDB/Mongoose automatically manages:
  - `createdAt`
  - `updatedAt`

Without this file:

- the backend would not know how a note should look

### `backend/src/routes/notesRoutes.js`

This file defines the API endpoints for notes.

Why routes exist:

- routes map URLs and HTTP methods to controller functions

Examples from this file:

- `GET /api/notes`
- `GET /api/notes/:id`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

This file does **not** contain most of the business logic.
Instead, it forwards work to the controller file.

That separation is a major backend best practice.

### `backend/src/controllers/notesController.js`

This file contains the main backend business logic for note operations.

This is where the backend decides what to do when a request arrives.

Functions inside:

- `getAllNotes`
- `getNoteById`
- `createNote`
- `updateNote`
- `deleteNote`

Examples of responsibilities:

- fetching notes from MongoDB
- sorting notes by `createdAt`
- validating title and content
- saving a new note
- updating an existing note
- deleting a note
- sending proper HTTP status codes

This file is the best place to learn the difference between:

- **routes**: where requests go
- **controllers**: what happens when they get there
- **models**: how the data is shaped and stored

## 5C. Frontend Files

The frontend is the browser-side application.

### `frontend/.gitignore`

This file tells Git which files and folders should **not** be committed.

Examples:

- `node_modules`
- build output folders like `dist`
- log files
- editor-specific files

Why this matters:

- keeps the repository clean
- avoids committing machine-specific junk
- avoids uploading huge dependency folders

### `frontend/package.json`

This is the frontend manifest file.

It defines:

- dependencies used by the React app
- npm scripts
- project metadata

Key scripts:

- `npm run dev` -> starts the Vite development server
- `npm run build` -> builds the production frontend
- `npm run lint` -> checks code quality with ESLint
- `npm run preview` -> previews the production build locally

### `frontend/package-lock.json`

This is the frontend dependency lock file.

Like the backend lock file, it ensures consistent installs.

### `frontend/index.html`

This is the base HTML file that Vite serves.

Important beginner idea:

- React does not replace HTML entirely
- React mounts itself into a normal HTML page

That is why this file contains:

- `<div id="root"></div>`

React renders the app inside that root element.

### `frontend/vite.config.js`

This file configures Vite.

The most important part here is the **proxy**:

- requests to `/api` are forwarded to `http://localhost:5001`

Why this is useful:

- the frontend runs on one port
- the backend runs on another port
- the proxy makes them work together smoothly in development

Without it, the frontend would need full backend URLs everywhere.

### `frontend/tailwind.config.js`

This file configures Tailwind CSS and DaisyUI.

What it does:

- tells Tailwind where to scan for class names
- enables the DaisyUI plugin
- defines the custom `atelier` theme used in the app

This is where the project's design system starts to take shape.

### `frontend/postcss.config.js`

This file configures PostCSS.

PostCSS is part of the CSS build pipeline.

It runs:

- `tailwindcss` to generate utility classes
- `autoprefixer` to add browser-compatible CSS prefixes when needed

### `frontend/eslint.config.js`

This file configures ESLint for the frontend codebase.

ESLint helps catch:

- unused variables
- syntax mistakes
- some React hook mistakes
- refresh/HMR-related issues

Why this matters:

- it helps maintain code quality
- it teaches good coding habits early

### `frontend/README.md`

This is the default README created by the Vite React template.

It mostly explains the starter setup.

Now that the project has grown beyond the template, the root `README.md` is the main source of project documentation.

### `frontend/public/favicon.svg`

This file is the favicon shown in the browser tab.

It is a static asset served directly by Vite.

### `frontend/public/icons.svg`

This is another static SVG asset stored in the public folder.

Files in `public` are served as-is and are useful for icons, images, and other assets that should not go through React imports.

### `frontend/src/main.jsx`

This is the frontend entry point.

It is where React starts.

What it does:

- imports global CSS
- wraps the app in `BrowserRouter`
- renders the app into the `root` element
- mounts the toast notification system

This file teaches a major frontend idea:

- the app begins from one entry point, then branches into components and routes

### `frontend/src/App.jsx`

This is the main app shell.

Responsibilities:

- sets the app theme
- renders the shared layout
- defines the frontend routes

Routes currently include:

- `/` -> home page
- `/create` -> create page
- `/note/:id` -> note detail page
- `/note/:id/edit` -> edit page

This file is the central routing map of the frontend.

### `frontend/src/index.css`

This file contains the global styles for the frontend.

What it includes:

- Tailwind directives
- base styles
- reusable component-layer classes
- app background styling
- shared surface panel styling
- shared form input styling

This file is important because it shows how:

- Tailwind utility classes can be combined
- project-wide design tokens can be centralized
- reusable class patterns can keep the UI consistent

### `frontend/src/components/Navbar.jsx`

This is the top navigation bar.

It is a reusable component because it appears across pages.

It includes:

- branding
- route navigation links
- quick access to the create page

This is a good example of a **layout component**.

### `frontend/src/components/NoteCard.jsx`

This component displays one note preview on the home page.

It handles:

- showing the title
- showing a short body preview
- formatting dates
- linking to the detail page

This is a classic reusable UI component:

- one small focused component
- repeated for each note in the list

### `frontend/src/components/NoteEditorForm.jsx`

This component is shared by both the **create** and **edit** pages.

Why that is useful:

- both pages use almost the same form UI
- shared components reduce duplication
- if you improve the editor later, both pages benefit

It handles:

- note title field
- note body field
- loading state for edit mode
- save/cancel buttons
- sidebar tips and live word count

This file teaches an important React concept:

- **component reuse**

### `frontend/src/pages/HomePage.jsx`

This is the landing page of the app.

What it does:

- fetches all notes from the backend
- stores them in React state
- shows loading skeletons
- shows empty state when there are no notes
- shows error state if the API fails
- renders note cards for each note

This file is a great example of:

- API data fetching in React
- conditional rendering
- user-friendly states

### `frontend/src/pages/NoteDetailPage.jsx`

This page shows the full details of a single note.

What it does:

- reads the note ID from the route
- fetches the matching note from the backend
- displays title, body, and timestamps
- lets the user delete the note
- links to the edit page

This file teaches how frontend routing and backend fetching work together.

### `frontend/src/pages/CreatePage.jsx`

This page handles note creation.

What it does:

- stores form data in React state
- validates title and content
- sends a `POST` request to the backend
- shows toast messages
- redirects back to the home page after success

This file is a good beginner example of:

- controlled form inputs
- handling submit events
- sending data to an API

### `frontend/src/pages/EditPage.jsx`

This page handles updating an existing note.

What it does:

- reads the note ID from the route
- fetches the existing note
- pre-fills the form with current values
- sends a `PUT` request when the user saves

This file demonstrates a very common full-stack pattern:

- fetch existing record
- let the user edit it
- send the updated data back to the server

## 6. Dependency Explanation

This section explains the packages used and why they matter.

### Backend dependencies

#### `express`

Used to create the backend server and API endpoints.

#### `mongoose`

Used to define schemas/models and talk to MongoDB with JavaScript objects.

#### `mongodb`

The official MongoDB driver. Some tools depend on it directly even when Mongoose is used.

#### `dotenv`

Loads values from `.env` into `process.env`.

#### `@upstash/redis`

Connects the app to Upstash Redis.

#### `@upstash/ratelimit`

Implements request rate limiting using Redis.

#### `nodemon`

Restarts the backend automatically whenever you save code changes during development.

### Frontend dependencies

#### `react`

The main UI library used to build components.

#### `react-dom`

Lets React render into the browser DOM.

#### `react-router-dom`

Handles client-side routing in the frontend.

#### `react-router`

Provides routing foundations used by `react-router-dom`.

#### `axios`

Used to send HTTP requests from the frontend to the backend.

#### `lucide-react`

Provides icon components.

#### `react-hot-toast`

Shows success and error notifications.

### Frontend dev dependencies

#### `vite`

Runs the development server and builds the frontend for production.

#### `@vitejs/plugin-react`

Adds React support to Vite.

#### `tailwindcss`

Provides utility CSS classes.

#### `daisyui`

Adds themes and component-friendly styling on top of Tailwind.

#### `postcss`

Processes CSS during build time.

#### `autoprefixer`

Adds vendor prefixes to CSS for browser compatibility.

#### `eslint`

Checks JavaScript and React code quality.

#### `@eslint/js`

Base ESLint rules for JavaScript.

#### `eslint-plugin-react-hooks`

Checks common React Hooks mistakes.

#### `eslint-plugin-react-refresh`

Adds rules related to Vite/React Fast Refresh.

#### `globals`

Provides standard global variable definitions used by ESLint.

#### `@types/react`
#### `@types/react-dom`

Type definitions used by tooling. Even in a JavaScript project, some tools benefit from them.

## 7. API Design in This Project

The backend exposes the following endpoints:

### `GET /api/notes`

Returns all notes.

Used by:

- `HomePage.jsx`

### `GET /api/notes/:id`

Returns one note by ID.

Used by:

- `NoteDetailPage.jsx`
- `EditPage.jsx`

### `POST /api/notes`

Creates a new note.

Used by:

- `CreatePage.jsx`

### `PUT /api/notes/:id`

Updates an existing note.

Used by:

- `EditPage.jsx`

### `DELETE /api/notes/:id`

Deletes a note.

Used by:

- `NoteDetailPage.jsx`

## 8. How React State Works in This App

React state is used to remember values between renders.

Examples in this project:

- form field values
- fetched notes
- loading status
- error messages
- saving/deleting flags

Examples:

- `useState([])` for an array of notes
- `useState("")` for an error message
- `useState(false)` for loading or saving status

Why this matters:

- state makes the UI dynamic
- when state changes, React re-renders the relevant parts of the page

## 9. How Routing Works in This App

Frontend routing is handled by `react-router-dom`.

That means the browser path changes without a full page reload.

Examples:

- `/` shows the notes overview
- `/create` shows the note creation form
- `/note/:id` shows the selected note
- `/note/:id/edit` shows the edit form

Important idea:

- frontend routes are for **pages in the browser**
- backend routes are for **API endpoints**

These are different things, even though both are called "routes".

## 10. How MongoDB + Mongoose Work Here

MongoDB stores documents in collections.

In this app:

- a note is a document
- notes are stored in a collection created by the `Note` model

Mongoose helps by:

- defining the schema
- validating required fields
- providing helper methods like:
  - `find()`
  - `findById()`
  - `findByIdAndUpdate()`
  - `findByIdAndDelete()`
  - `save()`

This is easier for beginners than using raw database queries everywhere.

## 11. Why the Project Is Split Into Controllers, Routes, and Models

This separation is a very common backend architecture pattern.

### Models

Define the shape of data.

### Routes

Define which URL calls which logic.

### Controllers

Contain the actual request-handling logic.

This separation helps because:

- code stays organized
- files remain smaller
- debugging becomes easier
- the app can grow without becoming a mess

## 12. Development Workflow

To run the app locally:

### Backend terminal

```powershell
cd backend
npm install
npm run dev
```

### Frontend terminal

```powershell
cd frontend
npm install
npm run dev
```

Then open the frontend URL printed by Vite, usually:

```text
http://localhost:5173
```

## 13. What Happens When You Click Each Feature

### Home page loads

- `HomePage.jsx` calls `GET /api/notes`
- backend route forwards to `getAllNotes`
- controller fetches notes from MongoDB
- notes are displayed using `NoteCard.jsx`

### Create note

- `CreatePage.jsx` collects input
- `axios.post("/api/notes")` sends note data
- backend `createNote` saves it
- frontend redirects back home

### View note

- `NoteDetailPage.jsx` reads note ID from URL
- `axios.get("/api/notes/:id")` fetches one note
- page shows title, body, and timestamps

### Edit note

- `EditPage.jsx` loads the existing note first
- form is pre-filled using `NoteEditorForm.jsx`
- `axios.put("/api/notes/:id")` updates the note
- frontend redirects back to the note detail page

### Delete note

- user clicks delete on the detail page
- frontend asks for confirmation
- `axios.delete("/api/notes/:id")` deletes the note
- user is redirected to the home page

## 14. Beginner Lessons Hidden Inside This Project

This small app teaches many real-world ideas:

- how a frontend and backend are separate projects
- how APIs connect them
- how routes differ on the frontend and backend
- how a database model shapes stored data
- how React state controls the UI
- how middleware works in Express
- how reusable components reduce duplication
- how environment variables protect sensitive values
- how npm scripts make projects easier to run

## 15. Common Beginner Questions

### Why does the frontend not talk to MongoDB directly?

Because browsers should not connect directly to your database.

The backend exists to:

- protect access
- validate input
- centralize logic
- keep secrets off the client side

### Why use Axios instead of `fetch`?

Both can work.

Axios is popular because:

- it has a simple API
- it automatically parses JSON nicely
- error handling is often convenient

### Why use Mongoose if MongoDB already exists?

Mongoose adds:

- schemas
- validation
- cleaner model methods
- a more structured developer experience

### Why use React Router?

Because this app has multiple pages and views, but we want navigation to feel smooth without full page reloads.

### Why use Tailwind and DaisyUI together?

- Tailwind gives low-level utility classes
- DaisyUI adds theme support and component-friendly styling

Together, they speed up UI development.

## 16. If You Want To Extend This App

Good beginner-friendly next features would be:

- search notes
- sort notes by updated date
- categories or tags
- authentication
- markdown support
- pagination
- note archiving
- dark/light theme switch

Each of these would teach a different full-stack concept.

## 17. Final Summary

This project is a clean example of a beginner-friendly MERN-style architecture:

- **MongoDB** stores the data
- **Express + Node.js** expose an API
- **React** renders the user interface
- **Vite** powers the frontend development experience
- **Tailwind + DaisyUI** style the app

If you understand how the files in this project relate to one another, you already understand many of the foundations of full-stack web development.

The most important mental model to keep is this:

1. The **frontend** collects input and shows UI.
2. The **backend** receives requests and runs logic.
3. The **database** stores the data permanently.
4. HTTP is the bridge between them.

That is the core of full-stack development.
