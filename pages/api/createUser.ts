import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, role } = req.body;

    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.auth_User.create({
        data: {
          name,  // Include name field
          email,
          password: hashedPassword,
          role,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await prisma.auth_User.findMany(); // Fetch all users
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await prisma.auth_User.delete({
        where: { id: parseInt(id as string) }, // Delete user by ID
      });
      res.status(200).json({ message: `User with ID ${id} deleted successfully.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
