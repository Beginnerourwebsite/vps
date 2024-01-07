const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve static files (e.g., HTML, CSS, images) from the 'public' directory
app.use(express.static(path.join(__dirname)));

// Define a route for the root URL
app.get('/:files', (req, res) => {
    let paths=(req.params.files)
    console.log(paths)
  res.sendFile(path.join(__dirname, paths));
//   res.send()
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
