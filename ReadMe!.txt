Bcard Application
Description
This project is a web application that enables business users to create, manage, and publish digital business cards. The application includes a Content Management System (CMS) that allows users to read, add, edit, and delete cards, with data stored on the server side. The site also features a public card display page and a login system with access to the admin interface.

Technological Requirements
Design & Responsiveness: CSS

Icon Libraries: Bootstrap Icons, React Icons, Font Awesome
Navigation Menu: Dynamic, with search functionality and light/dark theme toggle
Pages: Login, Business Details, Navigation Menu, Dynamic Footer, About
Forms: User-friendly forms with validation and feedback
Registration & Login: Secure authentication using regex for passwords
User Authentication: Uses JWT (JSON Web Token) after a successful login
Card Management: View, create, edit, and delete business cards
Favorites: Ability to save favorite business cards
Server Communication: HTTP requests via AXIOS with error handling

Installation & Setup
Download the Project:

https://github.com/Maor-Gross/Bcard-App
cd Bcard-App
npm i

Install Dependencies:
Open a new terminal window and run the following:
npm install axios bootstrap bootstrap-icons formik jwt-decode react react-dom react-router-dom react-toastify yup

Run the Project:
npm run dev
Access the Application:
Open the browser and navigate to:
http://localhost:5173

Usage
Home Page: Displays all business cards created by users.
Registration & Login: Business users must sign up and log in to create and manage cards.
Navigation Menu & Footer: Dynamic based on user permissions.
Card Interactions:
Phone Icon: Contact businesses directly.
Favorites: Save business cards for easy access.
Edit & Delete: Available to admins and business users who created the card.
Security Features:
User data is encrypted.
Automatic logout upon closing the browser.

Copyrights
The interface was designed and developed by Maor Gross, a digital marketing expert.

For inquiries and to view my business card:
https://maor-gross.co.il/business-card

I hope you enjoy the browsing experience! I’m always open to feedback and suggestions. 😊