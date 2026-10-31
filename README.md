# Daily Expense Tracker — Full-Stack Web Application

A secure, modern, full-stack Daily Expense Tracker web application built with **Spring Boot 3**, **Spring Security + JWT**, **Java 21**, **PostgreSQL**, and **React 18 (Vite + JavaScript)**.

---

## 1. Key Features

- **Authentication & Authorization**:
  - Secure Registration (`POST /api/auth/register`) and Login (`POST /api/auth/login`) with BCrypt password hashing.
  - Stateless JSON Web Token (**JWT**) bearer authentication.
  - Strict user data isolation: each user only sees and manages their own expenses.
  - Protected React Routes (`/`, `/expenses`, `/add` redirect to `/login` if unauthenticated).
  - User profile indicator in the sidebar navigation with instant **Log Out** button.
- **Zero Dummy Data**:
  - Starts completely clean. New registered users start with $0.00 spending and record their own personal expenses.
- **Financial Dashboard**:
  - **Monthly Total Spending**: Aggregated sum of all expenses in the selected month for the logged-in user.
  - **Today's Spending**: Real-time spending recorded for today.
  - **Monthly Expense Count**: Total transaction volume for the month.
  - **Average Daily Spending**: Monthly total divided by elapsed days in the month (including today, with safe handling for zero days).
  - **Category Breakdown Chart**: Interactive Recharts Donut/Pie Chart with custom tooltips, percentages, and category legend.
  - **6-Month Historical Trend**: Bar chart showing monthly spending trajectories over previous months.
  - **Recent Transactions**: Quick table view with instant edit and delete modals.
- **All Expenses Management**:
  - Filter by category (Food, Transport, Groceries, Bills, Entertainment, Shopping, Healthcare, Education, Travel, Other).
  - Filter by month or date intervals.
  - Search description text and category keywords.
  - Sort by date, amount, category, or timestamp in ascending or descending order.
  - Server-side pagination with previous/next controls.

---

## 2. Technology Stack

### Backend
- **Language**: Java 21 LTS
- **Framework**: Spring Boot 3.3.4
- **Security**: Spring Security 6 with stateless JWT (`jjwt` 0.12.5) and BCrypt password encryption
- **Data Persistence**: Spring Data JPA & Hibernate ORM
- **Validation**: Jakarta Bean Validation (`@NotNull`, `@DecimalMin`, `@NotBlank`, `@Size`, `@Email`)
- **Database**: PostgreSQL 14+ (tested on PostgreSQL 18) with optional local development profile
- **Build Tool**: Apache Maven 3.9+

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6 with Protected Route wrappers
- **State Management**: React Context (`AuthContext`) with persistent `localStorage` token storage
- **HTTP Client**: Axios with automatic JWT Bearer token request interceptor and 401 response interceptor
- **Charts**: Recharts (PieChart, BarChart, ResponsiveContainer)
- **Icons**: Lucide React
- **Styling**: Modern vanilla CSS with responsive layout and CSS variables

---

## 3. Quick Start Guide

### 1. Database Setup (PostgreSQL)
```sql
psql -U postgres
CREATE DATABASE expense_tracker_db;
```

### 2. Run the Backend
```bash
cd backend
mvn spring-boot:run "-Dspring-boot.run.profiles=local"
```
Or with your PostgreSQL database password:
```bash
$env:DB_PASSWORD="your_postgres_password"
mvn spring-boot:run
```
Backend runs at: **`http://localhost:8080`**

### 3. Run the Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: **`http://localhost:5173`**

---

## 4. API Endpoints

### Authentication APIs (Public)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Login with email & password, returns JWT token |
| `GET` | `/api/auth/me` | Get currently logged in user info (Requires Bearer token) |

### Expense APIs (Protected - Requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/expenses` | Get paginated expenses for current user with filters |
| `POST` | `/api/expenses` | Create a new expense for current user |
| `GET` | `/api/expenses/{id}` | Get single expense by ID |
| `PUT` | `/api/expenses/{id}` | Update existing expense |
| `DELETE` | `/api/expenses/{id}` | Delete expense |

### Dashboard Analytics (Protected - Requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/summary?month=YYYY-MM` | KPI summary metrics for the user |
| `GET` | `/api/dashboard/category-breakdown?month=YYYY-MM` | Category spending breakdown & percentages |
| `GET` | `/api/dashboard/monthly-trend?months=6` | Historical monthly spending totals |

---

## 5. Automated Tests

```bash
# Backend tests (Spring Boot, Security, Repository, Service)
cd backend
mvn test

# Frontend tests (Validation, Utilities, API client)
cd frontend
npm test
```
All automated tests pass with 0 failures.
