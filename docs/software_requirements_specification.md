# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to define the software requirements for the **Centralized Appointment Management Platform**. This platform is designed to streamline the scheduling, management, and tracking of appointments within an organization across multiple departments.

### 1.2 Scope
This platform will handle all aspects of appointment management, including booking, modification, cancellation, and inquiries. The system will provide real-time interactions between users and departments, improving the productivity and efficiency of organizational processes.

### 1.3 Project Overview
The system will primarily serve organizations that require seamless handling of appointments. It will consist of user roles like **Admin**, **Department Staff**, and **End Users**. End Users can book appointments, view availability, and receive notifications. Department Staff can manage appointments, while Admins oversee system operations.

### 1.4 Glossary
- **Admin**: The user responsible for system administration and configuration.
- **Department Staff**: Users managing department-specific appointments.
- **End User**: Users booking appointments.

## 2. System Overview

### 2.1 System Architecture
The platform will be built using the MERN stack:
- **MongoDB**: NoSQL database to store user information, appointments, and logs.
- **ExpressJS**: Backend framework for handling HTTP requests.
- **ReactJS**: Frontend library for a dynamic and responsive user interface.
- **NodeJS**: Runtime environment to manage backend logic.

### 2.2 Functional Requirements

#### R1: User Registration & Authentication
- The system shall allow users to register, log in, and log out of their accounts.
  
#### R2: Role-Based Access Control
- The system shall provide different access levels (Admin, Department Staff, End User) depending on the user's role.
  
#### R3: Appointment Booking
- End users shall be able to book appointments and wait for the acceptance.
  
#### R4: Appointment Modification & Cancellation
- The system shall allow users to modify or cancel their appointments before a predefined cutoff time (say, 6hrs before the schedule time).
  
#### R5: Department Notifications
- The system shall notify department staff of new, modified, or canceled appointments in real-time.

### 2.3 Non-Functional Requirements

#### NFR1: Performance
- The system shall handle concurrent users without performance degradation.

#### NFR2: Security
- All sensitive user data shall be encrypted both at rest and in transit.

#### NFR3: Availability
- The system shall maintain an uptime of at least 99.9%.

#### NFR4: Scalability
- The platform shall be scalable to support additional departments or increased user load.

## 3. External Interface Requirements

### 3.1 User Interface
- The web application will have a user-friendly interface accessible via desktop and mobile devices.
- The homepage shall display an overview of the system, with cards representing different departments for appointment booking.

### 3.2 Hardware Interface
- The system shall run on cloud-based servers with scalable resources based on load requirements.

## 4. Software Interface
- The system will integrate with third-party APIs for sending notifications and reminders via email or SMS.

## 5. Database Design
- **Users Collection**: Contains user information, including roles.
- **Appointments Collection**: Tracks all appointments booked, modified, or canceled.
- **Notifications Collection**: Stores all notification logs.

