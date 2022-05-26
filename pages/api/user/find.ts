import { NextApiRequest, NextApiResponse } from 'next';
import { findOneUser } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const email = req.body;

        const user = await findOneUser(email);

        if(!user) {
            res.status(422).json({message: "Couldn't find user."});
        }

        res.status(200).json(user);
    }
}