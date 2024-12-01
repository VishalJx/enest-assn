const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const courseRoutes = require('./routes/courseRoutes');
const next = require('next');


dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express();
    
    connectDB();
    
    server.use(cors());
    server.use(express.json());
    
    server.use('/api', courseRoutes);
    
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    
    const PORT = process.env.PORT || 5000;
    
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    }).catch((error) => {
        console.error(error);
        process.exit(1);
    }
);