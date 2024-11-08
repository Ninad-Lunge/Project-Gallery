const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const ProjectRoutes = require('./routes/project');
const CategoryRoutes = require('./routes/categories');
const TagRoutes = require('./routes/tag');
const TechnologyRoutes = require('./routes/technology');

app.use('/api', ProjectRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', TagRoutes);
app.use('/api', TechnologyRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Atlas connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.get('/', (req, res) => {
    res.send('Welcome to the Admin Panel API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});