
import { NextApiRequest, NextApiResponse } from 'next';
import { addFeature, addProduct } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const { product, feature } = req.body;

        const feature_result = await addFeature(feature);
        const product_result = await addProduct(product);

        if(!product_result && !feature_result) {
            res.status(422);
            return;
        }

        res.status(200).json({
            product: product_result,
            feature: feature_result
        });

    }
}