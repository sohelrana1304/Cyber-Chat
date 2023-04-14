# Cyber Chat

## To start setting up the project
This is a full-stack MERN application that allows users to create, read, update and delete notes. The application has a user authentication system that allows users to sign up and log in. Once logged in, users can create notes with a title and body. They can also edit and delete their notes. The application has a search feature that allows users to search for notes by title or body. The application also has a responsive design that works well on both desktop and mobile devices.

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
