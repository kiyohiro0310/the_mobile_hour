import { NextApiRequest, NextApiResponse } from 'next';
import { deleteProduct } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const id: string = req.body;
        const result = await deleteProduct(id);
        if(!result) {
            res.status(422).json({message: "Delete failed"});
        }

        res.status(200).json(result);
    }
}