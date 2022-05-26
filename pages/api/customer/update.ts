import { NextApiRequest, NextApiResponse } from "next";
import { verifyPassword } from "../../../lib/auth";
import { findCustomer, updateCustomer } from "../../../lib/db";
import { CustomerType, UpdateCustomerType } from '../../../Model/Types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const customer: UpdateCustomerType = req.body;

        if(customer.newPassword) {

            const checkCustomer = await findCustomer(customer.email);

            if(!checkCustomer) {
                res.status(422).json({message: "Update failed."});
            }

            const isValid = await verifyPassword(customer.currentPassword, checkCustomer?.password!)
            if(!isValid) {
                res.status(422).json({message: "Update failed."});
            }

            const result = await updateCustomer(customer);
            if(!result) {
                res.status(422).json({message: "Update failed."});
                return;
            }
            res.status(200).json({message: "Update successfully"});

        }else{
            const result = await updateCustomer(customer);

            if(!result) {
                res.status(422).json({message: "Update failed."});
                return;
            }
            res.status(200).json({message: "Update successfully"});

        }

    }
}