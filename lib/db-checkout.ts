import mysql from "serverless-mysql";
import { OrderAndOrderDetailType, OrderDetailType, OrderType, Types } from "../Model/Types";

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
    }catch(error) {
        return { error }
    }
}

export async function insertOrder(order: OrderType) {
    try{
        const result = await executeQuery({
            query: "INSERT INTO the_mobile_hour.order(order_number, order_date, order_delivery_date, product_id, customer_id) VALUES(?,?,?,?,?)",
            values: [
                order.order_number,
                order.order_date,
                order.order_delivery_date,
                order.product_id,
                order.customer_id]
        });

        return result;

    }catch(error) {
        console.log(error);
    }
}

export async function insertOrderDetail(data: OrderDetailType) {
    const result = await executeQuery({
        query: "INSERT INTO the_mobile_hour.order_details(id,product_id,quantity,price_sold,order_number) VALUES(?,?,?,?,?)",
        values: [data.id, data.product_id, data.quantity, data.price_sold, data.order_number]
    });
    return result;
}

export async function getAllOrderData() {
    try{
        const results = await executeQuery({
            query: "SELECT * FROM the_mobile_hour.order",
            values:[]
        });
        return results as OrderType[];

    }catch(error) {
        console.log(error);
    }
}

export async function getAllOrderDetailData() {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM the_mobile_hour.order_details",
            values:[]
        });

        return results as OrderDetailType[];
    }catch(error) {
        console.log(error);
    }
}

export async function getAllOrderAndOrderDetails() {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM the_mobile_hour.order INNER JOIN the_mobile_hour.product ON the_mobile_hour.order.product_id = the_mobile_hour.product.id INNER JOIN the_mobile_hour.customers ON the_mobile_hour.order.customer_id = the_mobile_hour.customers.id",
            values:[]
        });

        return results as OrderAndOrderDetailType[];
    }catch(error) {
        console.log(error);
    }
}