import db from "../database/db.js";
export const getAllProducts=(req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {
        if (err) {
            res.json({
                status: false,
                message: "Something went wrong",
            });

        } else {
            res.json({
                
                "status": true,
                "message": "All products",
                "products": result

            });
        }

    });

   

}