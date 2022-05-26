import { User } from "next-auth";
import mysql from "serverless-mysql";
import { AdminType, ChangeLogType, CustomerType, Feature, Phone, UpdateAdminType, UpdateCustomerType } from "../Model/Types";
import { hashPassword } from "./auth";
import { Types } from "../Model/Types";

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});


export async function executeQuery({query, values}: Types) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch(error) {
        return { error }
    }
}

export async function findCustomer(email: string) {
    try {
        const result = await executeQuery({
            query: "SELECT * FROM customers WHERE email = ?",
            values: [email],
        }) as CustomerType[];
        return result[0];
    } catch(e) {
        console.log(e);
    }
}

export async function createCustomer(customer: CustomerType) {
    const result = await executeQuery({
        query: "INSERT INTO customers(firstname,lastname,phone,email,address,city,postcode,state,password) values(?,?,?,?,?,?,?,?,?)",
        values: [
            customer.firstname,
            customer.lastname,
            customer.phone,
            customer.email,
            customer.address,
            customer.city,
            customer.postcode,
            customer.state,
            customer.password
        ]
    });
    return result;
}

export async function updateCustomer(customer: UpdateCustomerType) {
    if(customer.newPassword) {
        const hashedPassword = await hashPassword(customer.newPassword);

        const result = await executeQuery({
            query: "UPDATE customers SET firstname=?,lastname=?,phone=?,email=?,address=?,city=?,postcode=?,state=?,password=? WHERE email=?",
            values: [
                customer.firstname,
                customer.lastname,
                customer.phone,
                customer.email,
                customer.address,
                customer.city,
                customer.postcode,
                customer.state,
                hashedPassword,
                customer.email
            ]
        });
        if(!result) {
            return;
        }

        return result;
    }else{
        const result = await executeQuery({
            query: "UPDATE customers SET firstname=?,lastname=?,phone=?,email=?,address=?,city=?,postcode=?,state=? WHERE email=?",
            values: [
                customer.firstname,
                customer.lastname,
                customer.phone,
                customer.email,
                customer.address,
                customer.city,
                customer.postcode,
                customer.state,
                customer.email
            ]
        });
        if(!result) {
            return;
        }
        return result;
    }
}

export async function deleteCustomer(email: string) {
    const result = await executeQuery({
        query: "DELETE FROM customers WHERE email=?",
        values: [email]
    });

    return result;
}

//Product

export async function findAllPhones() {
    try{
        const products = await executeQuery({
            query: "SELECT * FROM product",
            values: []
        }) as Phone[];

        return products;

    }catch(e) {
        console.log(e);
    }
}

export async function findOnePhone(phoneID: string ) {
    try {
        const phone = await executeQuery({
            query: "SELECT * FROM product WHERE id = ?",
            values: [phoneID]
        });

        return phone;
    }catch(error) {
        console.log(error);
    }
}

export async function findPhoneFeature(featureID: string) {
    try {
        const feature = await executeQuery({
            query: "SELECT * FROM feature WHERE id = ?",
            values: [featureID]
        });
        return feature;
    }catch(error) {
        console.log(error);
    }
}

//admin
export async function findAdmin(email: string) {
    try{
        const user = await executeQuery({
            query: "SELECT * FROM user WHERE email = ?",
            values: [email]
        }) as User[];

        return user[0];
    }
    catch(error) {
        console.log(error);
    }
}

export async function findAdminById(id: string) {
    try{
        const user = await executeQuery({
            query: "SELECT * FROM user WHERE id = ?",
            values: [id]
        }) as User[];

        return user[0];
    }
    catch(error) {
        console.log(error);
    }
}

export async function updateAdmin(admin: UpdateAdminType) {
    if(admin.newPassword) {
        const hashedPassword = await hashPassword(admin.newPassword);

        const result = await executeQuery({
            query: "UPDATE user SET firstname=?,lastname=?,role=?,username=?,email=?,password=? WHERE email=?",
            values: [
                admin.firstname,
                admin.lastname,
                admin.role,
                admin.username,
                admin.email,
                hashedPassword,
                admin.email
            ]
        });
        if(!result) {
            return;
        }

        return result;
    }else{
        const result = await executeQuery({
            query: "UPDATE user SET firstname=?,lastname=?,role=?,username=?,email=? WHERE email=?",
            values: [
                admin.firstname,
                admin.lastname,
                admin.role,
                admin.username,
                admin.email,
                admin.email
            ]
        });
        if(!result) {
            return;
        }
        return result;
    }
}

export async function deleteAdmin(email: string) {
    const result = await executeQuery({
        query: "DELETE FROM user WHERE email=?",
        values: [email]
    });

    return result;
}

export async function addProduct(product: Phone) {
    try {
        const result = await executeQuery({
            query: "INSERT INTO product(id,product_name,product_model,manufacturer,price,stock_on_hand,feature_id) VALUES(?,?,?,?,?,?,?)",
            values: [
                product.id,
                product.product_name,
                product.product_model,
                product.manufacturer,
                product.price,
                product.stock_on_hand,
                product.feature_id
            ]
        });
        return result;
    }catch(error) {
        console.log(error);
    }
}

export async function addFeature(feature: Feature) {
    try {
        const result = await executeQuery({
            query: "INSERT INTO feature(id,weight,dimensions,OS,screensize,resolution,CPU,RAM,storage,battery,rear_camera,front_camera) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
            values:[
                feature.id,
                feature.weight,
                feature.dimensions,
                feature.OS,
                feature.screensize,
                feature.resolution,
                feature.CPU,
                feature.RAM,
                feature.storage,
                feature.battery,
                feature.rear_camera,
                feature.front_camera
            ]
        });
        return result;

    }catch(error) {
        console.log(error);
    }
}

export async function findFeature(id: string) {
    try{
        const feature = await executeQuery({
            query: "SELECT * FROM feature WHERE id = ?",
            values: [id]
        }) as Feature[];

        return feature[0];
    }
    catch(error) {
        console.log(error);
    }
}
export async function updateProduct(product: Phone) {
    try {
        const result = await executeQuery({
            query: "UPDATE product SET id=?,product_name=?,product_model=?,manufacturer=?,price=?,stock_on_hand=?,feature_id=? WHERE id=?",
            values: [
                product.id,
                product.product_name,
                product.product_model,
                product.manufacturer,
                product.price,
                product.stock_on_hand,
                product.feature_id,
                product.id
            ]
        });
        return result;
    }catch(error) {
        console.log(error);
    }
}

export async function updateFeature(feature: Feature) {
    try {
        const result = await executeQuery({
            query: "UPDATE feature SET id=?,weight=?,dimensions=?,OS=?,screensize=?,resolution=?,CPU=?,RAM=?,storage=?,battery=?,rear_camera=?,front_camera=? WHERE id=?",
            values: [
                feature.id,
                feature.weight,
                feature.dimensions,
                feature.OS,
                feature.screensize,
                feature.resolution,
                feature.CPU,
                feature.RAM,
                feature.storage,
                feature.battery,
                feature.rear_camera,
                feature.front_camera,
                feature.id
            ]
        });
        return result;
    }catch(error) {
        console.log(error);
    }
}

export async function deleteProduct(id: string) {
    try {
        const result = await executeQuery({
            query: "DELETE FROM product WHERE id=?",
            values: [id]
        });

        return result;
    }catch(error) {
        console.log(error);
    }
}

export async function findAllChangeLogs() {
    try {
        const result = await executeQuery({
            query: "SELECT * FROM changelog",
            values: []
        }) as ChangeLogType[];

        return result;
    }catch(error) {
        console.log(error);
    }
}

export async function addChangeLog(log: ChangeLogType) {
    try {
        const result = await executeQuery({
            query: "INSERT INTO changelog(id,date_created,date_last_modified,user_id,product_id,action) VALUES(?,?,?,?,?,?)",
            values: [
                log.id,
                log.date_created,
                log.date_last_modified,
                log.user_id,
                log.product_id,
                log.action
            ]
        });
        return result;
    }catch(error) {
        console.log(error);
    }
}

export async function createAdmin(admin: AdminType) {
    try{
        const result = await executeQuery({
            query: "INSERT INTO user(id,firstname,lastname,role,username,email,password) VALUES(?,?,?,?,?,?,?)",
            values: [
                admin.id,
                admin.firstname,
                admin.lastname,
                admin.role,
                admin.username,
                admin.email,
                admin.password
            ]
        });
        return result;
    }catch(error) {
        console.log(error);
    }
}

export async function findAllAdmins() {
    try{
        const results = await executeQuery({
            query: "SELECT * FROM user",
            values: []
        }) as AdminType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}