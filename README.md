# Client Lookup Application

This project is a **React + TypeScript** application built with **Vite**. It provides a simple and efficient interface for searching client information based on either a control number or a client name. The application demonstrates the use of modern React features such as hooks (`useState`, `useEffect`) and showcases a clean, responsive UI.

## Features

- **Search Functionality**:
  - Search by control number (exact match).
  - Search by client name (partial match based on the first three characters).
  - Auto-detection of search type based on input.
- **Responsive Design**:
  - Optimized for both desktop and mobile devices.
- **Validation**:
  - Input validation for control numbers and client names.
  - Real-time feedback for invalid inputs.
- **Dynamic Results**:
  - Displays search results in a clean, tabular format.
  - Shows a "no results" message when no matches are found.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Vite**: For fast development and build tooling.
- **CSS**: For styling the application.

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd client-lookup
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

## Purpose

The purpose of this application is to provide a simple and intuitive interface for searching client data. It is designed to be a starting point for more complex client management systems, demonstrating best practices in React and TypeScript development.

## Future Enhancements

- Integrate with a backend API for dynamic client data.
- Add advanced filtering and sorting options.
- Implement user authentication for secure access.

## License

This project is licensed under the MIT License.