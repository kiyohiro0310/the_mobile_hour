
import { NextApiRequest, NextApiResponse } from 'next';
import { createAdmin } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const admin = req.body;

        const result = await createAdmin(admin);

        if(!result) {
            res.status(422);
            return;
        }

        res.status(200).json({message: "Add successfully"});
    }
}