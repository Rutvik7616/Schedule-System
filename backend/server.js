const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/availability', require('./routes/availabilityRoutes'));
app.use('/api/link', require('./routes/linkRoutes'));
app.use('/api/book', require('./routes/publicRoutes'));

app.use('*', (req, res) => res.status(404).send('404 Not Found'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
