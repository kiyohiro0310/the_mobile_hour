// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { findCustomer } from '../../../lib/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST"){
    const email = req.body;

    const customer = await findCustomer(email);

    if(!customer) {
      res.status(422);
      return;
    }

    res.status(201).json(customer);
  }
}
