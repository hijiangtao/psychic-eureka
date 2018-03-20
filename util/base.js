import $sql from '../conf/sql';
import mysql from 'mysql';
import PythonShell from 'python-shell';
import path from 'path';
import fs from 'fs';

/**
 * MySQL pool 建立函数
 * @param {*} props 
 */
export const connectMySQL = (props) => {
    const {
        connectionLimit,
        host,
        user,
        password,
        database
    } = props;

    return mysql.createPool({
        connectionLimit,
        host,
        user,
        password,
        database
    });
}

/**
 * connection 建立函数
 * @param {*} pool 
 */
export const connMySQL = async (pool) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }

            resolve(connection);
        })
    });
}

export const connMongo = async (MongoClient, url, dbname) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            console.log("Connected successfully to server");
            if (err) {
                reject(err);
            }

            const db = client.db(dbname);
            resolve({
                db,
                client
            });
        });
    })
}

/**
 * 判断 data 是否需要转换为 JSONP 格式
 * @param {*} data 
 * @param {*} params 
 */
export const jsonpTransfer = (data, params) => {
    const callback = params.callback;
    if (callback) {
        return `${callback}(${JSON.stringify(data)})`;
    } else {
        return data;
    }
}

/**
 * 具体 MySQL 数据库单次查询异步函数
 * @param {*} conn Mysql 连接池
 * @param {*} type SQL 语句类型
 * @param {*} params 入参
 * @param {*} func 默认为 false 即 type 对应语句为字符串，否则为函数，函数入参为 func 值
 */
export const queryMySQLElements = async (conn, type, params, func = false) => {
    return new Promise((resolve, reject) => {
        let query = func ? $sql[type](func) : $sql[type];
        conn.query(query, params, (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        });
    })
}

/**
 * 将普通数值字符串转化为保留两位小数的字符串
 * @param {String or Number} num 
 */
export const NumberToDecimal2 = (num) => {
    try {
        num = Number.parseFloat(num);
    } catch (error) {
        num = 0.10;
    } finally {
        return num.toFixed(2);
    }
}

/**
 * 执行 Python 脚本并检查返回正确结果文件数据
 * @param {*} param0 
 */
export const ExecutePythonFile = async ({
    ResFileName,
    ResFilePath,
    PyFileName,
    Options
}) => {
    return new Promise((resolve, reject) => {
        PythonShell.run(PyFileName, Options, (error, result) => {
            // console.log(error);
            if (error) reject(error);
            // results is an array consisting of messages collected during execution
            // console.log("FileName", file);
            let file = path.resolve(ResFilePath, ResFileName),
                ifResExist = fs.existsSync(file);
            if (ifResExist) {
                const res = JSON.parse(fs.readFileSync(file));
                resolve(res);
            } else {
                reject("No data of this timeSegID!");
            }
        });
    })
}