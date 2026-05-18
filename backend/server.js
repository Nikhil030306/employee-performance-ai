
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Store employees in memory
let employees = [];
let nextId = 1;

// Auth routes
app.post('/api/auth/signup', (req, res) => {
    console.log('Signup:', req.body.email);
    res.json({ message: 'Signup successful' });
});

app.post('/api/auth/login', (req, res) => {
    console.log('Login:', req.body.email);
    res.json({ token: 'test-token-123', message: 'Login successful' });
});

// Employee routes
app.get('/api/employees', (req, res) => {
    res.json(employees);
});

app.post('/api/employees', (req, res) => {
    const employee = { id: nextId++, ...req.body };
    employees.push(employee);
    res.status(201).json(employee);
});

app.delete('/api/employees/:id', (req, res) => {
    employees = employees.filter(e => e.id != req.params.id);
    res.json({ message: 'Deleted' });
});

app.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.listen(5000, () => {
    console.log('✅ Server running on http://localhost:5000');
});
