# DevQuest

DevQuest is a unique platform where developers can solve daily real-world problems by creating web applications. This platform provides practical challenges to sharpen your coding skills and allows you to share your solutions with the community.

## Video Introduction

<a href="https://github.com/user-attachments/assets/5871f45e-ba1f-40c0-ad35-71ef161261f0" target="_blank">
  Watch the video
</a>

## Features

- **Daily AI-Generated Challenges:** Get a new, real-world problem to solve every day, created using advanced AI.
- **User Submissions:** Submit your solutions as web applications.
- **Commenting System:** Engage with the community by commenting on solutions, with support for nested comments to facilitate detailed discussions.
- **Like System:** Show appreciation for other developers' solutions.
- **Daily Winner:** The user with the most liked solution each day wins.
- **User Authentication:** Secure user login and registration.
- **Image Uploads:** Upload images of your projects for better visual representation.

## Usage

1. **Clone the repository:**
    ```bash
    git clone https://github.com/AasheeshLikePanner/Dev_Quest
    cd devquest
    ```

2. **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

4. **Setup environment variables:**
    Create a `.env` file in both the `backend` and `frontend` directories with the following variables:

    **Backend (.env):**
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    GOOGLE_API_KEY=your_google_generative_ai_api_key
    ```

    **Frontend (.env):**
    ```env
    VITE_APP_API_PREFIX=your_api_prefix
    ```

5. **Run the backend server:**
    ```bash
    cd backend
    npm start
    ```

6. **Run the frontend server:**
    ```bash
    cd frontend
    npm start
    ```

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- jsonwebtoken
- Multer
- Cloudinary
- Google Generative AI API
- Cookie Parser

### Frontend
- React
- Tailwind CSS
- Material UI
- Axios
- React Router
- React DOM

## Deployment

**Note:** This project uses cookies for authentication. Due to this, it cannot be deployed on free hosting services as they often do not support cookie storage across page refreshes. To deploy this project, a domain purchase is required to ensure cookies are preserved.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
