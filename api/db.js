import mysql from 'mysql2';


export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Muneeb(7108)",
    database: "blog"
    
});

// Optional: connect immediately and log result
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});
