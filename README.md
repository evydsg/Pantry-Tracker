# Inventory Management System

This is a simple Inventory Management System built using React and Material-UI, with Firebase Firestore as the backend. The application allows users to add, search, and remove inventory items.

## Features

- Add new inventory items
- Search for inventory items
- Remove inventory items
- Display "No items found" message for 5 seconds when no items match the search query

## Technologies Used

- React
- Material-UI
- Firebase Firestore

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- Firebase account and project

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/pantry-tracker.git
    cd inventory-management-system
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up Firebase:
    - Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Firestore in your Firebase project.
    - Copy your Firebase configuration and replace the contents of the `firebaseConfig` object in `src/firebase.js` with your own configuration.

4. Run the application:
    ```bash
    npm start
    ```

### Firebase Configuration

Create a `src/firebase.js` file and add your Firebase configuration:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
```

## Usage

- **Add Item**: Click on the "Add Item" button, enter the item name, and click "Add".
- **Search Item**: Enter the search query in the search bar and click "Search".
- **Remove Item**: Click on the "Remove" button next to the item you want to remove.

## Folder Structure

```
inventory-management-system/
├── public/
├── src/
│   ├── components/
│   ├── firebase.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Material-UI](https://material-ui.com/) for the UI components
- [Firebase](https://firebase.google.com/) for the backend services

```

### Explanation:
- **Project Title and Description**: Provides an overview of what the project is about.
- **Features**: Lists the main functionalities of the project.
- **Technologies Used**: Lists the technologies used in the project.
- **Getting Started**: Detailed steps to set up and run the project locally, including prerequisites, installation steps, and Firebase configuration.
- **Usage**: Instructions on how to use the application.
- **Folder Structure**: Shows the basic folder structure of the project.
- **License**: Information about the project’s license.
- **Acknowledgments**: Gives credit to the resources and libraries used in the project.

You can modify the details as per your project specifics.
>>>>>>> d005b64 (Initial commit)
