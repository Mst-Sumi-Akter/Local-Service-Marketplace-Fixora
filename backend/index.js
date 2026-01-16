const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DBNAME
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schemas
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    provider: { type: String, default: "Sparky Solutions" },
    rating: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });

// Transform _id to id
serviceSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Service = mongoose.model('Service', serviceSchema);

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // In production, hash this!
    role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
    joined: { type: Date, default: Date.now }
}, { versionKey: false });

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
    }
});

const User = mongoose.model('User', userSchema);

// Sample Data (Bookings kept as mock for now, users logic moved to DB)
let bookings = [
    { id: 101, customer: 'John Doe', provider: 'Sparky Solutions', service: 'Electrician', date: '2023-10-25', amount: 1500, status: 'Completed', paymentStatus: 'Paid' },
    { id: 102, customer: 'John Doe', provider: 'Clean & Clear', service: 'Home Cleaner', date: '2023-11-02', amount: 800, status: 'Pending', paymentStatus: 'Unpaid' },
    { id: 103, customer: 'Alice Smith', provider: 'Cool Air Pros', service: 'AC Technician', date: '2023-12-10', amount: 2000, status: 'Completed', paymentStatus: 'Paid' },
    { id: 104, customer: 'Alice Smith', provider: 'Sparky Solutions', service: 'Electrician', date: '2023-12-12', amount: 1500, status: 'Cancelled', paymentStatus: 'Refunded' },
];

/** Authentication Routes */

// Register
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            name,
            email,
            password,
            role: role || 'user'
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Simple password check (NOT SECURE for production, use bcrypt)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Optional: Check role if passed, though usually login just returns the user's role
        if (role && user.role !== role) {
            // For this specific app logic where role is selected on login:
            // We can either reject or just ignore the mismatch. 
            // Let's reject to be consistent with the UI selector.
            return res.status(403).json({ message: `Please login as ${user.role}` });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes

// 1. Services
app.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/services/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/services', async (req, res) => {
    const { name, description, price, image } = req.body;
    if (!name || !description || !price || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newService = new Service({
            name,
            description,
            price: parseFloat(price),
            image,
            provider: "Sparky Solutions",
            rating: 5.0
        });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Dashboard Stats - Admin
app.get('/admin/stats', async (req, res) => {
    try {
        const serviceCount = await Service.countDocuments();
        const userCount = await User.countDocuments();
        const recentUsers = await User.find().sort({ joined: -1 }).limit(5);

        const stats = {
            totalUsers: userCount,
            totalServices: serviceCount,
            totalBookings: bookings.length,
            revenue: bookings.reduce((acc, curr) => acc + (curr.paymentStatus === 'Paid' ? curr.amount : 0), 0),
            recentUsers: recentUsers
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Dashboard Stats - Provider
app.get('/provider/stats', (req, res) => {
    const providerName = 'Sparky Solutions';
    const providerBookings = bookings.filter(b => b.provider === providerName);

    const stats = {
        earnings: providerBookings.reduce((acc, curr) => acc + (curr.paymentStatus === 'Paid' ? curr.amount : 0), 0),
        activeJobs: providerBookings.filter(b => b.status === 'Pending').length,
        totalClients: new Set(providerBookings.map(b => b.customer)).size,
        recentOrders: providerBookings.slice(-5).reverse()
    };
    res.json(stats);
});

// 4. Dashboard Stats - User
app.get('/user/stats', (req, res) => {
    const customerName = 'John Doe';
    const userBookings = bookings.filter(b => b.customer === customerName);

    const stats = {
        totalBookings: userBookings.length,
        pendingBookings: userBookings.filter(b => b.status === 'Pending').length,
        bookingHistory: userBookings.reverse()
    };
    res.json(stats);
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
