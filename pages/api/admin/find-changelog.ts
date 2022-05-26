// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { findAdminById } from '../../../lib/db';
import { findByBetweenDate, findByDateFrom, findByProductIDAndDateFrom, findByProductID, findByProductIDAndBetweenDate, findByProductIDAndUserID, findByUserID, findByUserIdAndBetweenDate, findByUserIDAndDateFrom, findAllLogs } from '../../../lib/db-changelog';

interface searchLogTypes {
    product_id: string;
    user_id: string;
    date_from: string;
    date_to: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST"){
    const searchLog  = req.body as searchLogTypes;

    if(searchLog.product_id && !searchLog.user_id && !searchLog.date_from && !searchLog.date_to) {

        const results = await findByProductID(searchLog.product_id);

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);
    }
    else if(!searchLog.product_id && searchLog.user_id && !searchLog.date_from && !searchLog.date_to) {

        const results = await findByUserID(searchLog.user_id);

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);

    }
    else if(searchLog.product_id && searchLog.user_id && !searchLog.date_from && !searchLog.date_to) {

        const results = await findByProductIDAndUserID(searchLog.product_id, searchLog.user_id);

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);

    }
    else if(searchLog.product_id && !searchLog.user_id && searchLog.date_from && searchLog.date_to) {

        const results = await findByProductIDAndBetweenDate(searchLog.product_id, searchLog.date_from, searchLog.date_to);

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);
    }
    else if(!searchLog.product_id && searchLog.user_id && searchLog.date_from && searchLog.date_to) {

        const results = await findByUserIdAndBetweenDate(searchLog.user_id, searchLog.date_from, searchLog.date_to);

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);
    }
    else if(!searchLog.product_id && !searchLog.user_id  && searchLog.date_from && !searchLog.date_to) {

        const results = await findByDateFrom(searchLog.date_from);

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);

    }
    else if(!searchLog.product_id && !searchLog.user_id  && searchLog.date_from && searchLog.date_to) {
        const results = await findByBetweenDate(searchLog.date_from, searchLog.date_to);

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);
    }
    else if(searchLog.product_id && !searchLog.user_id  && searchLog.date_from && !searchLog.date_to) {

        const results = await findByProductIDAndDateFrom(searchLog.product_id, searchLog.date_from);
        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);
    }
    else if(!searchLog.product_id && searchLog.user_id  && searchLog.date_from && !searchLog.date_to) {

        const results = await findByUserIDAndDateFrom(searchLog.user_id, searchLog.date_from);

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);
    }
    else if (!searchLog.product_id && !searchLog.user_id && !searchLog.date_from && !searchLog.date_to) {

        const results = await findAllLogs();

        if(!results) {
            res.status(422).json({message: "Couldn't find data"});
        }

        res.status(200).json(results);
    }
    //error
    else if (!searchLog.product_id && !searchLog.user_id && !searchLog.date_from && searchLog.date_to) {
        res.status(422).json({message: "Coudln't find logs."})
    }
    else if (searchLog.product_id && !searchLog.user_id && !searchLog.date_from && searchLog.date_to) {
        res.status(422).json({message: "Coudln't find logs."})
    }
    else if (!searchLog.product_id && searchLog.user_id && !searchLog.date_from && searchLog.date_to) {
        res.status(422).json({message: "Coudln't find logs."})
    }
    else {
        res.status(422).json({message: "Coudln't find logs."})

    }
  }
}
