import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCustomer } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const email: string = req.body;
        const result = await deleteCustomer(email);
        if(!result) {
            res.status(422).json({message: "Delete failed"});
        }

        res.status(200).json(result);
    }
}