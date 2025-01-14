﻿# Restaurant Management System - Frontend

The frontend of the Restaurant Management System is designed to provide an intuitive and efficient interface for managing various aspects of running a restaurant.
[Live Demo Frontend](https://restaurantmanagements.netlify.app/).

## Table of Content

- [Introduction](#introduction)
- [Features](#features)
- [Run Locally](#run-locally)
- [Dev Environment](#dev-environment)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
  - [Employee Verification](#employee-verification)
  - [Admin Screen](#admin-screen)
  - [Waiter Screen](#waiter-screen)
  - [Chef Screen](#chef-screen)
  - [Bill Generation](#bill-generation)
  - [Customer Homepage](#customer-homepage)
  - [Customer Reservation OTP](#customer-reservation-otp)
  - [Confirmation](#confirmation)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Introduction

This system provides tools for handling reservations, orders, inventory, employee management, and more. It is built with a focus on efficiency, real-time updates, and role-based access control to ensure that the right people have access to the right information and functionalities.

## Features

- **User Authentication and Authorization:** Secure sign-up and sign-in processes with role-based access control for different functionalities.
- **Real-time Updates:** Use of socket connections for live updates on orders, reservations, and other critical operations.
- **Reservation Management:** Efficient handling of table reservations with OTP verification and pagination.
- **Order Management:** Comprehensive order processing, from creation to billing, with real-time updates and detailed views.
- **Inventory and Recipe Management:** Tools to manage inventory, ingredients, and recipes, ensuring that stock levels are maintained and recipes are up to date.
- **Employee Management:** Admin functionalities for managing employees, including adding salaries, updating profiles, and controlling access.
- **Customizable Layouts and Components:** Flexible and role-specific layouts and components to enhance the user experience.

## Run Locally

Clone the project

```bash
git clone https://github.com/Knowledge-Streams-KS/final-project-frontend-restaurant-management-system/
```

Go to the project directory

```bash
cd restaurant-management-system
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

## Dev Environment

To deploy this project in the development environment

```bash
npm run dev
```

## Technologies Used

**Frontend:** React

**Form Management:** Formik

**Validation:** Yup

**Charts:** Chart.js, react-chartjs-2

**Toast Notifications:** React Hot Toast

**Loading Spinners:** React Spinners

**Animations:** Lottie React

**HTTP Client:** Axios

**Real-time Communication:** Socket.io-client

## Screenshots

### Employee Verification

After signing up, a verification email will be sent to the user's email.

<img src="https://drive.google.com/uc?export=view&id=1Owc-_qeX6b90RTeiHmaKCyI_hvtl7pKH" alt="Email Verification" width="500"/>

Then it's up to the Admin to provide access to the user or not.

<img src="https://drive.google.com/uc?export=view&id=17NB70Xvm1MS0_GJ7ru9a1jF6dIjoCAyI" alt="Admin User" width="500"/>

If access is not provided or revoked, the user will be informed.

<img src="https://drive.google.com/uc?export=view&id=1d6HlwK9PeDw2iuHLBg5EGyy4qWbnfP2C" alt="Access Revoked" width="500"/>

### Admin Screen

Admin panel for managing the restaurant.

<img src="https://drive.google.com/uc?export=view&id=1gJB69cDYn_nly4t2vvKsmNpkQBq9zWL4" alt="Admin Panel" width="500"/>

### Waiter Screen

Screen for waiters to manage orders.

<img src="https://drive.google.com/uc?export=view&id=1IecqODq-MewR-l5NXbChJiMc8SV_iDWp" alt="Waiter Panel" width="500"/>

### Chef Screen

Screen for chefs to view and manage recipes.

<img src="https://drive.google.com/uc?export=view&id=1ioPtxEzwyzD8Y-Kd2OOKZzPzKQwe4YiX" alt="Chef Panel" width="500"/>

### Bill Generation

Screen for generating customer bills.

<img src="https://drive.google.com/uc?export=view&id=1ir3dVEP_OuKXiCMnLk0K6qE726BuiA_t" alt="Bill Generation" width="500"/>

<img src="https://drive.google.com/uc?export=view&id=1I4Qrike5TAkU3sz7CdmAplQGTRorNvKg" alt="Bill Generation Detail" width="500"/>

### Customer Homepage

Homepage for customers to view and make reservations.

<img src="https://drive.google.com/uc?export=view&id=1xO8NZm4D9mX1Offoj5VqstbDhCMuHDFJ" alt="Customer Homepage" width="500"/>

### Customer Reservation OTP

Screen for customers to enter OTP for reservation verification.

<img src="https://drive.google.com/uc?export=view&id=1UtAsvNNn7lF6YgJ3kFSYh7JlSmcaDH2q" alt="Reservation OTP" width="500"/>

<img src="https://drive.google.com/uc?export=view&id=1RHTlKrIiNKG7npadunEAjYfxbON6O9kD" alt="Reservation OTP Detail" width="500"/>

### Confirmation

Confirmation screen after successful reservation.

<img src="https://drive.google.com/uc?export=view&id=1XTknl03NXqCzbVqPbCGxcKpunPs4AtuH" alt="Reservation Confirmation" width="500"/>

<img src="https://drive.google.com/uc?export=view&id=1DZsKIUYgIamW2_7rhvE_OiCcCfKhqeWX" alt="Reservation Confirmation Detail" width="500"/>

## Future Enhancements

- **Mobile Responsiveness:** Improve the layout for mobile devices.
- **New Features:** Add features such as customer feedback and reviews.
- **Performance Improvements:** Optimize loading times and performance.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
