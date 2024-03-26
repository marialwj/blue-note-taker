const express = require('express');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');
const PORT = process.env.PORT || 3001;

const app = express();

// Body parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Test middleware to confirm middleware functionality
app.use((req, res, next) => {
    console.log('Middleware works');
    next();
});

// Use the imported routes from the routes files
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
