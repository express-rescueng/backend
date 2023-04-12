const dp = {}

dp.uploadFile = async (req, res) => {
    const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>upload profile picture</title>
    </head>
    <body>

      <hr>
      <h1>Register</h1>
      <form action="/register" method="POST" enctype="multipart/form-data" >
        <label for="picture">Select a picture to upload:</label>
        <input type="file" id="picture" name="profilePic" accept="image/*" required>
        <br>
        <button type="submit">Register</button>
      </form>
      <br>
    </body>
  </html>
  `;
    res.send(html);
}
export default dp;