// pages/api/getUserRole.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Get session using next-auth's getSession
      const session = await getSession({ req });

      if (!session || !session.role) { // Checking session directly for 'role'
        return res.status(401).json({ error: 'Unauthorized' });
      }

      res.status(200).json({ role: session.role }); // Accessing 'role' directly from session
    } catch (error) {
      console.error("Error fetching user role:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
