# Pinterest Clone

This project is a Pinterest clone that allows users to register via email and password and also user can use third party application like google and Facebook to login, upload posts with images and captions, view a feed of posts from other users, and see their own uploaded posts in their profile. Additionally, users can save their favorite posts, which will be visible in their profile section.

## Features

- **User Authentication**: Users can register with their email and password, and subsequently log in to access the app.
- **Profile Management**: Users can upload a profile photo, view their uploaded posts, and see their saved favorite posts in their profile section.
- **Feed Page**: Users can view posts uploaded by other users in a feed format.
- **Create Post**: Users can upload posts with images and captions from the create page.
- **Save Favorite Posts**: Users can save their favorite posts for later viewing.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js, used for building the backend.
- **MongoDB**: NoSQL database used for storing user data, posts, and saved favorite posts.
- **Passport.js**: Authentication middleware for Node.js, used for user authentication.
- **Multer**: Middleware for handling file uploads.
- **Cloudinary**: Cloud-based image and video management service for handling image uploads.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up a MongoDB database.
4. Configure Cloudinary credentials.
5. Run the application with `npm start`.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to your fork (`git push origin feature-name`).
5. Create a new pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was inspired by the functionality of Pinterest.
- Special thanks to the creators of Node.js, Express.js, MongoDB, Passport.js, Multer, and Cloudinary for their excellent tools and documentation.
