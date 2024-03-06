const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const MySQLStore = require('express-mysql-session')(session);
const app = module.exports = express();
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const dbconnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'crowdfunding_db'
});

dbconnection.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Successfully connected to your crowdfunding_db");
    }
});

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'crowdfunding_db'
};

const connection = mysql.createConnection(options);

const sessionStore = new MySQLStore({
    table: 'sessions',
    checkExpiration: true,
    expiration: 3600
}, connection);

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    }
}));


app.post('/login', (req, res) => {
    const { email, password, role } = req.body;
    dbconnection.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, role], (err, results) => {
        if (err) {
            console.error("Error:", err.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const user = results[0];
        if (user) {
            if (user.password === password) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
                req.session.save();
                return res.json({ message: "Login successful", user: req.session.user });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    });
});

app.post('/logout', (req, res) => {
    const { user } = req.session;
    req.session.destroy(err => {
        if (err) {
            return res.send('Error logging out');
        }
        res.clearCookie('connect.sid');
        res.send('Logged out');
    });
});

app.post('/register', (req, res) => {
    const { username, email, password, role } = req.body;
    dbconnection.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: "User already exists" });
            }
            console.error("Error:", err.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json({ message: "User registered successfully" });
    });
});

app.post('/createcampaign', (req, res) => {
    const { title, description, goal_amount, deadline, category, campaigner_id } = req.body;
    dbconnection.query('INSERT INTO campaigns (title, description, goal_amount, deadline, category, campaigner_id) VALUES (?,?,?,?,?,?)',
        [title, description, goal_amount, deadline, category, campaigner_id],
        (err, results, fields) => {
            if (err) {
                console.error("Error for inserting", err.message);
                res.status(500).json({ error: "Error of insert" });
            } else {
                res.status(201).json({ message: "Campaign added successfully", campaignId: results.insertId });
            }
        });
});

app.put('/updatecampaign/:id', (req, res) => {
    const campaignId = req.params.id;
    console.log('Received update request for campaign ID:', req.params.id);
    const { title, description, goal_amount, deadline, category } = req.body;

    dbconnection.query('SELECT * FROM campaigns WHERE id = ?', [campaignId], (err, results) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).json({ error: "Error fetching by id" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: "Campaign not found" });
            } else {
                dbconnection.query('UPDATE campaigns SET title = ?, description = ?, goal_amount = ?, deadline = ?, category = ? WHERE id = ?',
                    [title, description, goal_amount, deadline, category, campaignId], (err, results) => {
                        if (err) {
                            console.error("Error:", err.message);
                            res.status(500).json({ error: "Error in update" });
                        } else {
                            res.json({ message: "Campaign is updated" });
                        }
                    });
            }
        }
    });
});

app.delete('/deletecampaign/:id', (req, res) => {
    const campaignId = req.params.id;

    dbconnection.query('DELETE FROM donations WHERE campaign_id = ?', [campaignId], (err, donationResults) => {
        if (err) {
            console.error("Error deleting donations:", err.message);
            res.status(500).json({ error: "Error deleting associated donations" });
            return;
        }

        dbconnection.query('DELETE FROM campaigns WHERE id = ?', [campaignId], (err, campaignResults) => {
            if (err) {
                console.error("Error deleting campaign:", err.message);
                res.status(500).json({ error: "Error deleting the campaign" });
            } else {
                if (campaignResults.affectedRows === 0) {
                    res.status(404).json({ error: "Campaign not found" });
                } else {
                    res.json({ message: "Campaign is deleted" });
                }
            }
        });
    });
});

app.post('/donations', (req, res) => {
    const { backer_id, campaign_id, amount } = req.body;
    console.log('Received donation request:', req.body);

    dbconnection.query('INSERT INTO donations (backer_id, campaign_id, amount) VALUES (?,?,?)',
        [backer_id, campaign_id, amount],
        (err, results, fields) => {
            if (err) {
                console.error("Error for inserting", err.message);
                res.status(500).json({ error: "Error of insert" });
            } else {
                console.log('Donation inserted successfully');

                dbconnection.query('UPDATE campaigns SET current_amount = current_amount + ? WHERE id = ?',
                    [amount, campaign_id],
                    (err, results, fields) => {
                        if (err) {
                            console.error("Error for updating", err.message);
                            res.status(500).json({ error: "Error of update" });
                        } else {
                            console.log('Campaign updated successfully');
                            res.status(201).json({ message: "Donation added successfully", donationId: results.insertId });
                        }
                    });
            }
        });
});

app.get('/campaignlist', (req, res) => {
    dbconnection.query('SELECT * FROM campaigns', (err, results) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).json({ error: "Error fetching campaigns" });
        } else {
            res.json(results);
        }
    });
});

app.get('/campaignlist/:id', (req, res) => {
    const campaignId = req.params.id;

    dbconnection.query('SELECT * FROM campaigns WHERE id = ?', [campaignId], (err, results) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).json({ error: "Error fetching campaign details" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: "Campaign not found" });
            } else {
                res.json(results[0]);
            }
        }
    });
});

app.get('/donations/:campaign_id', (req, res) => {
    const campaignId = req.params.campaign_id;
    dbconnection.query('SELECT * FROM donations WHERE campaign_id = ?', [campaignId], (err, results) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).json({ error: "Error fetching donations" });
        } else {
            res.json(results);
        }
    });
});

app.get('/userlist', (req, res) => {
    dbconnection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).json({ error: "Error fetching users" });
        } else {
            res.json(results);
        }
    });
});

app.delete('/deleteuser/:id', (req, res) => {
    const userId = req.params.id;

    dbconnection.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error("Error deleting user:", err.message);
            res.status(500).json({ error: "Error deleting the user" });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.json({ message: "User is deleted" });
            }
        }
    });
});

app.get('/userlist/:id', (req, res) => {
    const userId = req.params.id;

    dbconnection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).json({ error: "Error fetching user details" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.json(results[0]);
            }
        }
    });
});

app.post('/createuser', (req, res) => {
    const { username, email, password, role } = req.body;
    dbconnection.query('INSERT INTO users (username, email, password, role) VALUES (?,?,?,?)',
        [username, email, password, role],
        (err, results, fields) => {
            if (err) {
                console.error("Error for inserting", err.message);
                res.status(500).json({ error: "Error of insert" });
            } else {
                res.status(201).json({ message: "User added successfully", userId: results.insertId });
            }
        });
});

app.put('/updateuser/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email, password, role } = req.body;

    dbconnection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).json({ error: "Error fetching by id" });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: "User not found" });
            } else {
                dbconnection.query('UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?',
                    [username, email, password, role, userId], (err, results) => {
                        if (err) {
                            console.error("Error:", err.message);
                            res.status(500).json({ error: "Error in update" });
                        } else {
                            res.json({ message: "User is updated" });
                        }
                    });
            }
        }
    });
});

app.get('/', (req, res) => {
    res.send("Hello Express! Welcome to server-side coding");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});


