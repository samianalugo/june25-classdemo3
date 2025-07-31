const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/greet', (req, res) => {
    const name = req.body.name || 'Guest';
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Greeting App</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
        .greeting { font-size: 24px; margin: 20px; }
        .button { background-color: #4CAF50; color: white; padding: 10px 15px; 
                  border: none; border-radius: 4px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="greeting">Hello, ${name}! Welcome to our application.</div>
      <a href="/"><button class="button">Go Back</button></a>
    </body>
    </html>
  `);
});

// Helper function for testing
function formatGreeting(name) {
    return `Hello, ${name}! Welcome to our application.`;
}

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for testing
module.exports = { app, formatGreeting };