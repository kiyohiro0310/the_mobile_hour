
import { NextApiRequest, NextApiResponse } from 'next';
import { insertOrder } from '../../../lib/db-checkout';
import { OrderType } from '../../../Model/Types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const order = req.body as OrderType;
        console.log(order);

        const result = await insertOrder(order);

        if(!result) {
            res.status(422).json({message: "Error occured."});
        }

        res.status(200).json(result);
    }
}