
## 🏠 PrimeNest Real Estate (UI Prototype)

A comprehensive, high-fidelity user interface prototype for a luxury real estate platform.

This project is built using **React** and **Vite** for optimized performance and utilizes a clean, separated directory structure. **Firebase** dependencies are included and configured via the environment to enable seamless future integration of dynamic features like user authentication and real-time listing data.

### 🌟 Project Highlights

  * **Extensive UI Mockup:** Features detailed user interfaces for property search, filtering, listing details, and user profiles.
  * **High Performance:** Built with **Vite** for lightning-fast bundling and development serving.
  * **Clean Structure:** Code is neatly separated, with the core application residing in the `client/` directory.
  * **Asset Management:** Static visuals are organized in a dedicated `attached_asset/` folder.
  * **Firebase Ready:** Includes all required packages and environment placeholders for immediate transition to a fully functional application.

-----

### 🚀 Getting Started

Follow these steps to set up and run the application locally.

#### Prerequisites

  * **Node.js** (LTS version recommended)
  * **npm** or **yarn**

#### Installation

1.  **Clone the repository:**

    ```bash
    git clone [YOUR_REPO_URL]
    cd primenest
    ```

2.  **Install dependencies:** Dependencies for the entire project are handled from the root directory:

    ```bash
    npm install
    # or yarn install
    ```

#### Environment Setup (Firebase Configuration)

The application requires environment variables to define the Firebase project.

1.  Create a file named **`.env`** in the **root directory**.

2.  Populate it with your **Firebase Web App configuration**:

    ```env
    # --- FIREBASE CONFIGURATION ---
    # These keys are directly referenced by the client for future initialization.
    VITE_FIREBASE_API_KEY="AIzaSy...your...key...here"
    VITE_FIREBASE_AUTH_DOMAIN="primenest-prod.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="primenest-12345"
    VITE_FIREBASE_STORAGE_BUCKET="primenest.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
    VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef12345"
    ```

#### Running the Development Server

The application is run by executing the Vite command within the `client/` subdirectory.

```bash
npm run dev
# Note: You may need to define a custom script in your root package.json: "dev": "npm run --prefix client dev"
```

The UI will be served and available at `http://localhost:5173` (or the port specified by Vite).

-----

### 📁 Project Structure

The project uses a standard monorepo-style structure for separating the frontend application from the root configuration.

```
primenest/
├── node_modules/             # All installed Node packages (Root-level)
├── package.json              # Main dependencies and run scripts (Root-level)
├── .env                      # Environment variables (Root-level)
├── attached_asset/
│   └── generated_images/     # 🖼️ Repository for all static image assets
├── client/                   # 🚀 The entire React/Vite application source
│   ├── public/               # Vite's public assets folder
│   ├── src/                  # React source code (components, pages, styles, etc.)
│   ├── index.html            # Main entry file
│   └── vite.config.js        # Vite configuration specific to the client
└── README.md
```

### 🛠 Tech Stack

  * **Frontend Library:** **React**
  * **Build Tooling:** **Vite**
  * **Routing:** **React Router DOM**
  * **Styling:** [Specify your styling solution, e.g., **Tailwind CSS** or **Styled Components**]
  * **Backend Readiness:** **Firebase** (Core packages installed for Authentication and Firestore)

-----

### 📝 Development Notes (UI Status)

  * **Mock Data:** All property data displayed is sourced from local mock data (JSON/JavaScript objects).
  * **Non-Functional Logic:** While the UI is complete, forms and interactive elements are currently decorative and do not communicate with the Firebase backend.
  * **Asset Paths:** Components access images in the `attached_asset/` folder using relative paths, ensuring all large media files are managed outside the main source directory.

-----

### 🤝 Contribution

We encourage contributions to enhance the user interface and prepare the application for full functionality.

1.  Fork the repository.
2.  Ensure all code changes are made within the **`client/src`** folder.
3.  Open a Pull Request with a clear description of the changes.
