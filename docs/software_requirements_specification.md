# Software Requirements Specification (SRS)

# Overview

This document serves as the Software Requirements Specification (SRS) for the **Appointment Managemnent System**. This is designed to streamline hospital operations by providing role-based access, efficient appointment managementand other systems that correaltes. This document outlines the functional and non-functional requirements, change management plan, traceability links, and associated software artifacts.

# Software Requirements

This section describes the functional and non-functional requirements for the project.

## Functional Requirements

### Appointment Management

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| FR1  | The system shall allow patients to book appointments. |
| FR2  | The system shall allow doctors to accept or reject appointments. |
| FR3  | Patients shall be able to edit/reschedule or cancel appointments. |
| FR4  | Admins shall be able to view all appointments.         |
| FR5  | The system shall allow doctors to update appointment status |

### Role-Based Access Control

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| FR6  | The system shall support roles: Admin, Doctor, Patient. |
| FR7  | Admins shall manage user roles and permissions.        |
| FR8  | Patients shall only access their own appointment data. |
| FR9  | Doctors shall only access appointments data.   |
| FR10 | Admins shall have full access to the system.           |

### Profile management

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| FR11  | The system shall allow users to view their profile information. |
| FR12  | Users shall be able to update their profile details, including email, contact number, and city.        |
| FR13  | Admins shall assign roles such as "doctor" or "admin" to registered users. |
| FR14  | Users shall be able to upload a profile picture.   |
| FR15  | The system shall allow users of update profile information.           |

### Category-wise Appointment Selection

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| FR16  | The system shall display a list of categories (e.g., General, Cardiology, Pediatrics). |
| FR17  | Patients shall select a category to view appointment form for respective category.       |
| FR18  | The system shall show the patient's chosen category in the booking form. |
| FR19  | Admins shall manage the list of categories. |
| FR20  | The system shall allow only authorized users to create appointments    |


#### User Login & Registration Service

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| FR21 | Users shall register with a unique username and password. |
| FR22 | The system shall validate login credentials for all users. |
| FR23 | Passwords shall be securely hashed during registration. |
| FR24 | The system shall allow admins to deactivate user accounts. |
| FR25 | Users shall be redirected to their respective dashboards based on roles. |

## Non-Functional Requirements

### Performance

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| NFR1 | The system shall handle 100 concurrent users efficiently. |
| NFR2 | Appointment booking shall not exceed 2 seconds response time. |
| NFR3 | Data retrieval shall not exceed 1 second for 1,000 records. |
| NFR4 | The system shall process appointment schedules in real-time. |
| NFR5 | All APIs shall respond within an average of 500ms.     |

### Security

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| NFR6 | The system shall encrypt all sensitive data in transit. |
| NFR7 | User authentication shall be token-based (JWT).        |
| NFR8 | Access to patient records shall require role-based permissions. |
| NFR9 | The system shall log all unauthorized access attempts. |
| NFR10| Passwords shall be stored using secure hashing (bcrypt).|

### Usability

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| NFR11| The user interface shall be intuitive and responsive.  |
| NFR12| The system shall provide tooltips for complex features. |
| NFR13| The system shall be accessible to differently-abled users. |
| NFR14| User feedback shall be integrated for continuous improvements. |
| NFR15| Training materials shall be provided for all user roles.|

### Scalability

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| NFR16| The system shall scale to support up to 10,000 users.  |
| NFR17| The database shall be horizontally scalable.           |
| NFR18| The backend shall support microservices architecture.  |
| NFR19| The system shall allow modular feature upgrades.       |
| NFR20| The system shall use a load balancer for high availability.|

### Maintainability

| ID   | Requirement                                            |
|------|--------------------------------------------------------|
| NFR21| The codebase shall be modular and well-documented.     |
| NFR22| Unit tests shall cover at least 80% of the code.       |
| NFR23| CI/CD pipelines shall be implemented for deployments. |
| NFR24| Logs shall be centralized for easier debugging.        |
| NFR25| Regular system updates shall be automated.            |


# Change Management Plan

To ensure smooth adoption of the Hospital Management System:

1. **Training**:
   - Conduct role-specific training sessions for Admins, Doctors, and Patients.
   - Provide video tutorials and user manuals.

2. **Integration**:
   - Perform compatibility tests with existing systems.
   - Develop APIs for seamless integration with third-party tools.

3. **Issue Resolution**:
   - Establish a dedicated support team for troubleshooting.
   - Use a ticketing system to prioritize and resolve issues.

4. **Feedback Mechanism**:
   - Collect user feedback during pilot runs.
   - Implement a feedback loop for continuous improvement.

5. **Rollout Plan**:
   - Begin with a small-scale pilot deployment.
   - Gradually roll out the system across all departments.


# Traceability Links

## Use Case Diagram Traceability

| Artifact ID  | Artifact Name              | Requirement ID      |
|--------------|----------------------------|---------------------|
| [UC1](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/Usecase-Diagrams/UC1.png)          | Select Category and Book Appointment | FR16, FR17, FR18 |
| [UC1](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/Usecase-Diagrams/UC1.png)          | View Created Appointments by patient  | FR4          |
| [UC1](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/Usecase-Diagrams/UC1.png)          | Edit or Cancel Appointments| FR3   |
| [UC2](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/Usecase-Diagrams/UC2.png)          | Confirm/Reject/mark as complete Appointments| FR5           |
| [UC3](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/Usecase-Diagrams/UC3.png)         | Update User Role           | FR7         |
| [UC2](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/Usecase-Diagrams/UC2.png)           | Manage All Appointments by doctor   | FR4, FR9            |


## Class Diagram Traceability

| Artifact Name          | Requirement ID      |
|------------------------|---------------------|
| [CD](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/ClassDiagrams/CD.png)      | FR1 - FR25     |

## Activity Diagram Traceability

| Artifact ID            | Artifact Name            | Requirement ID  |
|------------------------|--------------------------|-----------------|
| [Activity](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/Activity-Diagram/Activity.png)                    | Appointment Management Flow | FR1 - FR25  |


# Software Artifacts

Below are links to all project artifacts:

- [Presentation](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/docs/Appointment-Scheduler.pdf)
- [Class Diagram](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/ClassDiagrams/CD.png)
- [Activity Diagram](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/artifacts/Activity-Diagram/Activity.png)
- [Code Repository](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion)


# README

Refer to the [README](https://github.com/azmeerasravan/GVSU-CIS641--SysDesign-Infusion/blob/main/README.md) for installation and usage instructions.