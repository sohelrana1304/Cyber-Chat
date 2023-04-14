# Cyber Chat

## To start setting up the project
The MERN chat application is a real-time messaging platform that enables users to communicate with each other through chat rooms. The application is built using the MERN stack, which includes MongoDB, Express.js, React, and Node.js. The front-end interface is designed using React, while the back-end is powered by Node.js and Express.js, which manages the server and RESTful API. MongoDB, a NoSQL database, is used to store chat data. The application features a user authentication system, allowing users to create and login to their accounts. Users can create chat rooms, join existing ones, and chat with other users in real-time using Socket.io, a popular JavaScript library that enables real-time, bi-directional communication between clients and servers. The application is fully responsive, making it accessible on all devices, including smartphones, tablets, and desktop computers. Overall, the MERN chat application with Socket.io integration is a robust and effective platform for real-time communication between users.

#### Live URL - https://cyberchat-zow8.onrender.com/


### Step 1: Clone the repo or download

```bash
git clone https://github.com/sohelrana1304/cyber-chat.git
```

### Step 2: cd into the cloned repo and run:

* Command to instal dependencies and Start the Backend Server:
```bash
npm run install-server
```
```bash
npm run start-server
```
* Command to instal dependencies and Start the Client Side:
```bash
npm run install-client
```
```bash
npm run start-client
```
* Build Command for client:
```bash
npm run build-client
```

### Step 3: Go to backend folder and put your credentials in the `.env` file or create a `.env` file in backend root directory and then put your credentials.

#### To go to backend folder:
```bash
cd backend
```
#### Credentials:
```bash
PORT=3000
MONGODB_URI=YOUR MONGODB URI
JWT_SECRET=YOUR SECRET KEY
```
### Step 4: Go to frontend folder and put your credentials in the `.env` file or create a `.env` file in frontend root directory and then put your credentials.

#### To go to frontend folder:
```bash
cd frontend
```
#### Credentials:
```bash
REACT_APP_PRESET_NAME=YOUR_CLOUDINARY_PRESET_NAME
REACT_APP_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
```
#### If you don't have `Cloudinary` account you can make it from [here](https://cloudinary.com/).


## Author
[**Author**](https://github.com/sohelrana1304)
