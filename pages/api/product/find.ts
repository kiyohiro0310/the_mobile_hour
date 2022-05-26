import { NextApiRequest, NextApiResponse } from 'next';
import { findFeature, findOnePhone } from '../../../lib/db';
import { Phone } from '../../../Model/Types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const {product_id} = req.body;

        const product_result = await findOnePhone(product_id) as any;

        if(!product_result) {
            res.status(422);
            return;
        }
        const feature_id = product_result[0].feature_id;
        const feature_result = await findFeature(feature_id);

        if(!feature_result) {
            res.status(422);
            return;
        }

        res.status(200).json({
            product: product_result[0],
            feature: feature_result
        });

    }

}