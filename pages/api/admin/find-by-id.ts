// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { findAdminById } from '../../../lib/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST"){
    const id = req.body;

    const customer = await findAdminById(id);

    if(!customer) {
      res.status(422);
      return;
    }

    res.status(201).json(customer);
  }
}
