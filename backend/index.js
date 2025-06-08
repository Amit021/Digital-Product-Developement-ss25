import express          from 'express';
import cors             from 'cors';
import dotenv           from 'dotenv';
import bcrypt           from 'bcrypt';
import jwt              from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma      = new PrismaClient();
const app         = express();
const JWT_SECRET  = process.env.JWT_SECRET || 'please_set_a_real_secret';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

/*─────────────────────────────────────────────────────────
  AUTH MIDDLEWARE – verifies Bearer-token and stores user id
─────────────────────────────────────────────────────────*/
function authenticate(req, res, next) {
  const hdr = req.headers.authorization || '';
  if (!hdr.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }
  const token = hdr.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user      = { id: payload.nurseId };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid / expired token' });
  }
}

/*─────────────────────────────────────────────────────────
  1)  SIGN-UP  POST /signup
─────────────────────────────────────────────────────────*/
app.post('/signup', async (req, res) => {
  const { email, password, fullName } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email & password required' });

  const exists = await prisma.nurse.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ error: 'Email already in use' });

  const passwordHash = await bcrypt.hash(password, 10);
  const nurse = await prisma.nurse.create({
    data  : { email, passwordHash, fullName },
    select: { id: true, email: true, fullName: true },
  });

  const token = jwt.sign({ nurseId: nurse.id, email }, JWT_SECRET, {
    expiresIn: '7d',
  });
  res.json({ token, nurse });
});

/*─────────────────────────────────────────────────────────
  2)  LOGIN  POST /login
─────────────────────────────────────────────────────────*/
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email & password required' });

  const nurse = await prisma.nurse.findUnique({ where: { email } });
  if (!nurse) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, nurse.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ nurseId: nurse.id, email }, JWT_SECRET, {
    expiresIn: '7d',
  });
  res.json({
    token,
    nurse: { id: nurse.id, email: nurse.email, fullName: nurse.fullName },
  });
});

/*─────────────────────────────────────────────────────────
  3)  GET /residents   (public)
─────────────────────────────────────────────────────────*/
app.get('/residents', async (_req, res) => {
  try {
    const data = await prisma.resident.findMany();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send('DB error');
  }
});

/*─────────────────────────────────────────────────────────
  4)  GET /incident-reports/resident/:id   (public)
─────────────────────────────────────────────────────────*/
app.get('/incident-reports/resident/:id', async (req, res) => {
  const residentId = Number(req.params.id);
  try {
    const rows = await prisma.incidentReport.findMany({
      where  : { residentId },
      orderBy: { createdAt: 'desc' },
      select : {
        id: true,
        residentId: true,
        narrative : true,
        createdAt : true,
        nurse     : { select: { id: true, fullName: true, email: true } },
      },
    });
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).send('DB error');
  }
});

/*─────────────────────────────────────────────────────────
  5)  POST /incident-reports   (protected)
─────────────────────────────────────────────────────────*/
app.post('/incident-reports', authenticate, async (req, res) => {
  const { residentId, narrative } = req.body;
  if (!residentId || !narrative) return res.status(400).send('Missing fields');

  try {
    const row = await prisma.incidentReport.create({
      data: { residentId: Number(residentId), narrative, nurseId: req.user.id },
    });
    res.json({ id: row.id });
  } catch (e) {
    console.error(e);
    res.status(500).send('DB error');
  }
});

/*─────────────────────────────────────────────────────────
  6)  GET /me      (protected)
      PUT /me      (protected) – update profile
      PUT /me/password  (protected) – change password
─────────────────────────────────────────────────────────*/
app.get('/me', authenticate, async (req, res) => {
  const me = await prisma.nurse.findUnique({
    where : { id: req.user.id },
    select: {
      id: true,
      email: true,
      fullName: true,
      phone: true,
      dateOfBirth: true,
      avatarUrl: true,
      createdAt: true,
    },
  });
  res.json(me);
});

app.put('/me', authenticate, async (req, res) => {
  try {
    let { fullName, phone, dateOfBirth, avatarUrl } = req.body;

    // Handle dateOfBirth gracefully ---------------------------------------
    if (dateOfBirth !== undefined) {
      const dob = (dateOfBirth || '').toString().trim();
      if (!dob) {
        dateOfBirth = undefined; // do not touch the field when empty
      } else if (dob.includes('/')) {
        const [day, month, year] = dob.split('/').map((p) => p.trim());
        dateOfBirth = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      } else {
        dateOfBirth = new Date(dob);
      }
    }

    const data = {};
    if (fullName !== undefined) data.fullName = fullName;
    if (phone    !== undefined) data.phone    = phone;
    if (avatarUrl!== undefined) data.avatarUrl= avatarUrl;
    if (dateOfBirth !== undefined) data.dateOfBirth = dateOfBirth;

    const me = await prisma.nurse.update({
      where : { id: req.user.id },
      data,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        dateOfBirth: true,
        avatarUrl: true,
      },
    });
    res.json(me);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Invalid input' });
  }
});

/* -------- CHANGE PASSWORD ------------------------------ */
app.put('/me/password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return res.status(400).json({ error: 'Both fields required' });
  if (newPassword.length < 6)
    return res.status(400).json({ error: 'Password too short' });
  try {
    const nurse = await prisma.nurse.findUnique({ where: { id: req.user.id } });
    const match = await bcrypt.compare(currentPassword, nurse.passwordHash);
    if (!match) return res.status(403).json({ error: 'Current password incorrect' });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.nurse.update({ where: { id: req.user.id }, data: { passwordHash } });
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).send('DB error');
  }
});

/*─────────────────────────────────────────────────────────*/
const PORT = 4000;
app.listen(PORT, () =>
  console.log(`▶︎ Backend listening on http://localhost:${PORT}`),
);
