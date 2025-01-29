import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());


const JWT_SECRET = new TextEncoder().encode('your_jwt_secret');


const db = mysql.createPool({
    host: '127.0.0.1',
    user: '', 
    password: '', 
    database: 'todoapp',
});


interface User {
    id: string;
    email: string;
    password: string;
}


app.post('/signup', async (req: Request, res: Response) => {
    console.log("Received signup request:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [insertResult] = await db.execute(
            'INSERT INTO users (id, email, password) VALUES (UUID(), ?, ?)',
            [email, hashedPassword]
        );

        const [rows] = await db.execute('SELECT id, email FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            throw new Error('User signup failed');
        }

        const user = rows[0] as User;

        const token = await new SignJWT({ sub: user.id, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(JWT_SECRET);

        res.json({ user, token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: error.message });
    }
});


app.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const user = rows[0] as User;

        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        
        const token = await new SignJWT({ sub: user.id.toString(), email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(JWT_SECRET);

        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/verify-token', async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        res.json({ id: payload.sub, email: payload.email });
    } catch {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
