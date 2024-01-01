import mysql from "mysql2/promise";

// const connection = mysql.createConnection({
//     host: "qvti2nukhfiig51b.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//     user: "bat2jf9b6hiqo3jp",
//     password: "uuj1u94v8yjys00k",
//     port: 3306,
//     database: "vgtusfzjs3r27hhl",
// });

// import { Pool } from "pg";

const connection = mysql.createPool({
    user: "bat2jf9b6hiqo3jp",
    password: "uuj1u94v8yjys00k",
    host: "qvti2nukhfiig51b.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    database: "vgtusfzjs3r27hhl",
});

export default connection;
