
````markdown
# DevTree 🚀

DevTree is a full stack web application inspired by Linktree that lets users create customizable profile pages with multiple links — ideal for developers, freelancers, and content creators.

---

## 🧠 Why I Built DevTree

I wanted a clean, minimalist solution for sharing multiple links in one place — GitHub, portfolio, socials, blogs, etc. While there are tools available, I wanted to build it myself to learn end-to-end MERN stack development.

---

## 💻 Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Auth:** JWT (JSON Web Tokens)  
- **Deployment:** [Render](https://render.com) / [Vercel](https://vercel.com) (adjust as needed)

---

## 🔧 Features

- ✅ User authentication (sign up / log in) with secure JWT tokens  
- ✅ Profile management: avatar, bio, social media links  
- ✅ Link CRUD functionality: add, edit, delete, reorder  
- ✅ Responsive and mobile-first UI  
- ✅ Toasts and form validation for user feedback  
- ✅ Clean architecture: RESTful API, organized code structure  
- ✅ Deployed and publicly accessible

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/alejandrogch7/DevTree.git
cd DevTree
````

### 2. Install dependencies

```bash
npm install
cd client
npm install
cd ../server
npm install
```

### 3. Environment variables

Create a `.env` file in the `/server` folder with:

```
PORT=5000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the app (development)

```bash
cd server && npm run dev
cd ../client && npm start
```

* Server runs at: `http://localhost:5000`
* Client runs at: `http://localhost:3000`

---

## 📦 Production

Build and deploy your client and server to platforms like Vercel (frontend) and Render or Heroku (backend). Update environment variables accordingly.

---

## 📝 API Endpoints

| Method | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| POST   | `/api/auth/register` | Register a new user                  |
| POST   | `/api/auth/login`    | Login and get JWT token              |
| GET    | `/api/users/me`      | Get current user profile (protected) |
| POST   | `/api/links`         | Create a new link (protected)        |
| GET    | `/api/links`         | Get all user’s links (protected)     |
| PUT    | `/api/links/:id`     | Update a link (protected)            |
| DELETE | `/api/links/:id`     | Delete a link (protected)            |

---

## 📚 What I Learned

* Building a full MERN stack app from scratch
* Structuring RESTful routes and securing them with JWT
* Handling responsive design with Tailwind CSS
* Deploying a full stack app to production platforms
* Input validation, error handling, and user feedback

---

## 👥 Contribute & Feedback

Feel free to:

* File issues or suggest improvements
* Submit pull requests for new features
* Connect with me on [LinkedIn](https://linkedin.com/in/alejandrogc-dev) or check my [portfolio](https://portfolioalex7.netlify.app)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

Happy coding! 🚀

```
