
import { NextApiRequest, NextApiResponse } from 'next';
import { addChangeLog } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const log = req.body;

        const result = await addChangeLog(log);

        if(!result) {
            res.status(422);
            return;
        }

        res.status(200).json({message: "Add successfully"});
    }
}