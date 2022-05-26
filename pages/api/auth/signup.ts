import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/auth";
import {createCustomer, executeQuery, findCustomer} from "../../../lib/db";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const user = req.body;

        const existingUser = await findCustomer(user.email)

        if(existingUser) {
            res.status(422).json({message: "User exists already."});
            return;
        }

        await createCustomer(user);

        res.status(201).json({message: "Created User."});
    }
}

export default handler;