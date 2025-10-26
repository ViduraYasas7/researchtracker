# Research Project Tracker

A full-stack web application for tracking research projects, built with Spring Boot (backend) and React (frontend).

## Features

- **Project Management**: Create, read, update, and delete research projects
- **Project Details**: Track title, description, principal investigator, dates, status, funding, budget, and objectives
- **Search & Filter**: Search projects by title and filter by status
- **Status Tracking**: Monitor projects through different stages (Planned, Ongoing, Completed, Cancelled)
- **RESTful API**: Well-structured REST API for backend operations
- **Responsive UI**: Modern, user-friendly interface built with React

## Technology Stack

### Backend
- **Spring Boot 3.1.5**: Java framework for the REST API
- **Spring Data JPA**: Data persistence layer
- **H2 Database**: In-memory database for development
- **Maven**: Build and dependency management
- **Lombok**: Reduce boilerplate code

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **CSS3**: Styling

## Project Structure

```
researchtracker/
├── backend/              # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/researchtracker/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── model/           # Entity models
│   │   │   │   ├── repository/      # Data repositories
│   │   │   │   ├── service/         # Business logic
│   │   │   │   └── ResearchTrackerApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
└── frontend/             # React frontend
    ├── public/
    ├── src/
    │   ├── components/       # React components
    │   │   ├── ProjectList.js
    │   │   ├── ProjectForm.js
    │   │   ├── ProjectDetail.js
    │   │   └── ProjectEdit.js
    │   ├── services/         # API service layer
    │   │   └── ResearchProjectService.js
    │   ├── App.js
    │   └── App.css
    └── package.json
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 14+ and npm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Research Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/status/{status}` - Get projects by status
- `GET /api/projects/investigator/{investigator}` - Get projects by principal investigator
- `GET /api/projects/search?title={title}` - Search projects by title
- `POST /api/projects` - Create a new project
- `PUT /api/projects/{id}` - Update a project
- `DELETE /api/projects/{id}` - Delete a project

## Database

The application uses H2 in-memory database for development. You can access the H2 console at:

```
http://localhost:8080/h2-console
```

**Connection details:**
- JDBC URL: `jdbc:h2:mem:researchdb`
- Username: `sa`
- Password: (leave empty)

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Building for Production

### Backend

```bash
cd backend
mvn clean package
java -jar target/research-tracker-backend-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm run build
```

The build artifacts will be in the `frontend/build` directory.

## License

This project is open source and available under the MIT License.

