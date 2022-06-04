
import { NextApiRequest, NextApiResponse } from 'next';
import { insertOrderDetail } from '../../../lib/db-checkout';
import { OrderDetailType } from '../../../Model/Types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const order_detail = req.body as OrderDetailType;

        const result = await insertOrderDetail(order_detail);

        if(!result) {
            res.status(422).json({message: "Error occured."});
        }

        res.status(200).json(result);
    }
}