# README for Performer Management System

## Overview

This is a web application built with Flask and React to manage performers, events, and venues. The backend is powered by Flask, with SQLAlchemy ORM to interact with the database. The frontend, built with React, allows users to view, add, edit, and delete performers, events, and venues. The application supports managing performer types and assigning performers to events, including designating a performer as the event host.

## Features

### Backend (Flask API)
- **Performers Management**: Create, read, update, and delete performers. Performers have attributes such as name, bio, image, email, and performer type.
- **Performer Types**: Manage types of performers (e.g., singers, dancers, etc.), which can be assigned to performers.
- **Events Management**: Create and view events, assign performers to events, and designate one performer as the event host.
- **Venues Management**: View and create venues for events.
- **Association Tables**: Use an intermediary table (`performers_events`) to manage many-to-many relationships between performers and events, with the additional feature of assigning a "host" status to one performer per event.

### Frontend (React)
- **Manage Section**: Users can manage performers, events, and venues using dropdowns to select what they want to manage.
  - **Performer Form**: Add, view, update, and delete performers. Add new performer types as well.
  - **Event Form**: Add new events, assign performers to events, and set one performer as the event host.
  - **Venue Form**: Add and view venue details. Select a venue when creating a new event.
- **Navigation**: A simple navigation bar allows users to view events, manage entities, and go back to the homepage.

## Models

### `Performer`
Represents a performer in the system. Performers can have types (e.g., singer, dancer) and can be associated with multiple events.

- **Attributes**:
  - `name`: Name of the performer.
  - `image`: Image URL of the performer.
  - `bio`: A brief biography of the performer.
  - `email`: Email address of the performer.
  - `performer_type_id`: Foreign key to the `PerformerType` model.
  - `created_at`: Timestamp of performer creation.
  - `updated_at`: Timestamp of performer updates.
  
- **Relationships**:
  - `type`: The type of performer (e.g., singer, dancer).
  - `events`: Many-to-many relationship with events, managed by the `performers_events` table.

### `PerformerType`
Represents different types of performers (e.g., singer, dancer).

- **Attributes**:
  - `name`: Name of the performer type.
  - `created_at`: Timestamp of type creation.
  - `updated_at`: Timestamp of type updates.
  
- **Relationships**:
  - `performers`: One-to-many relationship with `Performer`.

### `Event`
Represents an event that performers can be assigned to. Events can have a date, time, and venue.

- **Attributes**:
  - `name`: Name of the event.
  - `date`: Date of the event.
  - `time`: Time of the event.
  - `venue_id`: Foreign key to the `Venue` model.
  - `created_at`: Timestamp of event creation.
  - `updated_at`: Timestamp of event updates.
  
- **Relationships**:
  - `venue`: The venue where the event is held.
  - `performers`: Many-to-many relationship with performers, managed by the `performers_events` table.
  - `hosts`: Special relationship to find which performer is the host of the event.

### `Venue`
Represents a venue where events can be held.

- **Attributes**:
  - `name`: Name of the venue.
  - `address`: Physical address of the venue.
  - `capacity`: Maximum capacity of the venue.
  - `created_at`: Timestamp of venue creation.
  - `updated_at`: Timestamp of venue updates.
  
- **Relationships**:
  - `events`: One-to-many relationship with `Event`.

### `performer_event` (Association Table)
An intermediary table to manage the many-to-many relationship between performers and events. It also has a `host` column to specify which performer is the host for the event.

- **Columns**:
  - `performer_id`: Foreign key to the `Performer` model.
  - `event_id`: Foreign key to the `Event` model.
  - `host`: Boolean indicating if the performer is the host for the event.

## API Endpoints

### Performers
- **GET `/performers`**: Retrieve a list of all performers.
- **POST `/performers`**: Add a new performer.
- **DELETE `/performers/<int:id>`**: Delete a performer by ID.
- **PATCH `/performers/<int:id>`**: Update a performer's details.

### Performer Types
- **GET `/performer_types`**: Retrieve all performer types.
- **POST `/performer_types`**: Add a new performer type.

### Events
- **GET `/events`**: Retrieve all events.
- **POST `/events`**: Create a new event, assign performers, and designate a host.

### Venues
- **GET `/venues`**: Retrieve all venues.
- **POST `/venues`**: Add a new venue.

## Frontend (React)

### `NavBar`
A simple navigation bar with links to:
- Home
- Events: View upcoming events in order by date.
- Manage: Navigate to forms for managing performers, events, and venues.

### `Manage`
Allows users to choose what they want to manage (performers, events, or venues) using a dropdown. Based on the selection, the corresponding form will be rendered for performing CRUD operations.

- **Performer Form**: Allows the creation, viewing, deletion, and updating of performers.
- **Event Form**: Allows the creation of events, assigning performers to events, and setting one performer as the event host.
- **Venue Form**: Allows the creation of venues for events.

## Setup Instructions

### Backend (Flask)
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```

2. Install dependencies:
   ```bash
   pipenv install
   ```

3. Set up a virtual environment:
   ```bash
   pipenv shell
   ```

4. Run the Flask application:
   ```bash
   cd server
   python app.py
   ```

### Frontend (React)
1. Navigate to the frontend directory from the root directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

### Database
The app uses SQLAlchemy for database management. Run the following command to set up the database:

```bash
flask db upgrade
```

This will set up the required tables for performers, events, venues, and performer types.

## Conclusion

This Performer Management System provides a robust API and front-end interface for managing performers, events, and venues. It is a full-stack application using Flask and React, and it demonstrates how to set up many-to-many relationships and incorporate CRUD operations in both the backend and frontend.