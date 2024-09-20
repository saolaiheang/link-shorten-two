# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



//Project title 
# PSE x BiKay Link Shortener (PBLS)

// Describes the project

The URL Shortener Service is a web application that allows users to shorten long URLs into concise, manageable links. This service is beneficial for sharing links on social media, emails, and other platforms where brevity is essential. The project will include both front-end and backend components, ensuring a seamless user experience.

//Technologies Used
List all technologies, libraries, and tools used for front-end development are:
- React
- Tailwind(for styling)
- React Router Dom (for routing)
- Vite (for development server)
- Vercel (for deploy website)
- Github (for store Repositories)
- Jira (for manage Task)
- figma (for mockup design )
- Google drive(for documents)
- Telegram (for connections with team).

// Project Structure
```src/
│
├── assets/              # Static files like images, fonts
├── components/          # Reusable React components
├── pages/               # Page components (e.g., Login, Signup, Dashboard)
├── styles/              # Global styles, SASS files
├── utils/               # Utility functions (e.g., API calls, helpers)
├── App.js               # Main application file
├── index.js             # Entry point
└── ...
```

### Installation & Setup
**1.Clone the repository:**
```bash
git clone git@github.com:PSE-BiKay-Link-Shortener/link-shortener-frontend.git
```
**2. Navigate to the project directory:**
```bash   
cd project-name
```
**3. Install dependencies:**
```bash   
npm install
```
**4. Start the development server:**
```bash   
npm run dev
```
### Development Workflow
Describe how the team can work on the project and the necessary commands for common tasks like testing, building, and running the app.

**Start Development**:
  ```bash
  npm run dev
  ```
**Build for Production:**
```bash
npm run build
```
**Run Production Server:**
```bash
npm run test
```
### Components Overview

**- URLInput.js: Input component for entering URLs and custom aliases.**
**- ShortenedResult.js: Displays the shortened URL after processing.**
**- Dashboard.js: Admin panel for managing URLs and viewing analytics.**
**- AnalyticsChart.js: Displays click and user analytics**

### Styling Guidelines

**Tailwind CSS is used for all styling, ensuring quick and responsive design.**
**Custom classes can be added for specific elements requiring unique designs.**

### State Management
**- Context API or Redux is used to manage global state, especially for managing authenticated users and their shortened URLs.**
**- The state includes user authentication, URL data, and analytics information.**

### Best Practices
**- Use ESLint for code linting and Prettier for code formatting.**
**- Follow accessibility and SEO best practices for the front-end.**
**- Write clear, meaningful commit messages following the conventional commit standard (e.g., feat:, fix:, etc.).**

### Contributing
**- Fork the repository and create a feature branch.**
**- Submit a pull request once your feature is complete.**
**- Follow the style and commit guidelines before submitting.**
