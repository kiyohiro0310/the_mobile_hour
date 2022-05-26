import mysql from "serverless-mysql";
import { ChangeLogType, Types } from "../Model/Types";

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD

    }
})

export async function executeQuery({query, values}: Types) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;

    }catch(error) {
        return { error };
    }
}

export async function findAllLogs() {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog",
            values: []
        }) as ChangeLogType[];
        return results;

    }catch(error) {
        console.log(error);
    }
}
export async function findByProductID(product_id: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE product_id=?",
            values: [product_id]
        }) as ChangeLogType[];
        return results;

    }catch(error) {
        console.log(error);
    }
}
export async function findByUserID(user_id: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE user_id=?",
            values: [user_id]
        }) as ChangeLogType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}
export async function findByProductIDAndUserID(product_id: string, user_id: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE product_id=? and user_id=?",
            values: [product_id,user_id]
        }) as ChangeLogType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}

export async function findByDateFrom(date_from: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE date_last_modified=?",
            values: [date_from]
        }) as ChangeLogType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}

export async function findByProductIDAndDateFrom(product_id: string, date_from: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE product_id=? and date_last_modified=?",
            values: [product_id,date_from]
        }) as ChangeLogType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}

export async function findByUserIDAndDateFrom(user_id: string, date_from: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE user_id=? and date_last_modified=?",
            values: [user_id,date_from]
        }) as ChangeLogType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}

export async function findByBetweenDate(date_from: string, date_to: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE date_last_modified between ? and ?",
            values: [date_from,date_to]
        }) as ChangeLogType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}

export async function findByProductIDAndBetweenDate(product_id: string, date_from: string, date_to: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE product_id=? and date_last_modified between ? and ?",
            values: [product_id,date_from,date_to]
        }) as ChangeLogType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}

export async function findByUserIdAndBetweenDate(user_id: string, date_from: string, date_to: string) {
    try {
        const results = await executeQuery({
            query: "SELECT * FROM changelog WHERE user_id=? and date_last_modified between ? and ?",
            values: [user_id,date_from,date_to]
        }) as ChangeLogType[];

        return results;

    }catch(error) {
        console.log(error);
    }
}
