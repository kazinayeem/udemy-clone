# Edemy - An AI-Powered Online Learning Platform

Edemy is an AI-powered online learning platform, similar to Udemy, designed for both instructors and students. It allows instructors to create and manage courses, while students can browse and purchase courses. The platform also leverages **Gemini AI** for automatically generating course descriptions.

## Features

### Teacher Features
- **Teacher Registration and Login**: Teachers can sign up, log in, and manage their profiles.
- **Course Creation**: Teachers can create and publish courses, providing detailed descriptions, images, and other relevant content.
- **Sales Reports**: Teachers can view detailed sales reports of their courses, track earnings, and analyze performance.
- **Student Management**: Teachers can view the list of students enrolled in their courses.
- **Course Statistics**: Teachers can view overall performance metrics such as course ratings, reviews, and enrollment numbers.
- **Course Description Automation with Gemini AI**: Teachers can automatically generate course descriptions using **Gemini AI**. With a simple click, Gemini AI uses advanced machine learning models to create detailed and engaging course overviews.
- **Ban and Unban Users**: Only admins have the authority to ban or unban both students and teachers.

### Admin Features
- **Category Management**: Admins can add, edit, and manage categories for courses.
- **Course Approval**: Admins can approve or reject courses created by teachers before they are made visible to students.
- **Review Approval**: Admins can approve or reject reviews for courses.
- **User Management**: Admins can manage both students and teachers, including banning/unbanning users.
- **View All Users and Courses**: Admins can see a complete list of all registered users and courses available on the platform.

### Student Features
- **Student Registration and Login**: Students can sign up, log in, and manage their profiles.
- **Browse Courses**: Students can browse the list of available courses and select the ones they are interested in.
- **Course Purchase**: Students can purchase courses using SSLCommerz for secure payment processing.
- **View Purchased Courses**: Students can view all the courses they have purchased and access them anytime.

## Technologies Used

- **Frontend**:
  - **Admin Panel**: React Router framework
  - **User Panel**: Next.js
- **Backend**:
  - **Server**: Express.js
  - **Database**: PostgreSQL with Prisma ORM
  - **Authentication**: JWT (JSON Web Tokens)
- **Payment**: SSLCommerz for secure payment processing
- **AI Integration**: **Gemini AI** for automatic course description generation

## Setup Instructions

### Prerequisites
- Node.js (v16 or above)
- PostgreSQL database
- SSLCommerz account for payment integration

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone[ https://github.com/kazinayeem/udemy-clone.git]
   cd udemy-clone
