import { NextApiRequest, NextApiResponse } from "next";
import { verifyPassword } from "../../../lib/auth";
import { findAdmin, updateAdmin } from "../../../lib/db";
import { AdminType, UpdateAdminType } from '../../../Model/Types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const admin: UpdateAdminType = req.body;

        if(admin.newPassword) {

            const checkadmin = await findAdmin(admin.email);

            if(!checkadmin) {
                res.status(422).json({message: "Update failed."});
            }

            const isValid = await verifyPassword(admin.currentPassword, checkadmin?.password! as string);
            if(!isValid) {
                res.status(422).json({message: "Update failed."});
            }

            const result = await updateAdmin(admin);
            if(!result) {
                res.status(422).json({message: "Update failed."});
                return;
            }
            res.status(200).json({message: "Update successfully"});

        }else{
            const result = await updateAdmin(admin);

            if(!result) {
                res.status(422).json({message: "Update failed."});
                return;
            }
            res.status(200).json({message: "Update successfully"});

        }

    }
}