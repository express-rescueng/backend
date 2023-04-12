import express from 'express';


const AppController = {};


AppController.auth = async (req, res) => {
  const status = req.session.loggedIn ? 'Logged In' : 'Logged Out';
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Login/Register Form</title>
    </head>
    <body>
    <a href="/home">Home</a>
      <h1>Login</h1>
      <form action="/login" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <br>
        <button type="submit">Login</button>
      </form>
      <hr>
      <h1>Register</h1>
      <form action="/register" method="POST" >
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required>
        <br>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <label for="Confirm password">Confirm Password:</label>
        <input type="password" id="password" name="confirmPassword" required>
        <br>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required>
        <br>
        <label for="NIN">NIN:</label>
        <input type="text" id="NIN" name="NIN" required>
        <br>
        <button type="submit">Register</button>
        <hr>
      </form>
      <br>
      <br>
      <h1>Status:  ${status}</h1>
      <hr>
        <form action="/logout" method="PUT">
            <button type="submit">Logout</button>
        </form>
        <hr>
        <h1>Upload a picture</h1>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <label for="file">Select a file:</label>
          <input type="file" id="file" name="file">
          <br><br>
          <input type="submit" value="Upload">
        </form>
     
    </body>
  </html>
  `;
  res.send(html);
};
export default AppController;