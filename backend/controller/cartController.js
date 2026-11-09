import db from "../database/db.js";

 export const addToCart=(req, res) => {
    const { user_id, product_id, quantity } = req.body;

    const checkCartsql = "SELECT id FROM carts WHERE user_id=?"
    db.query(checkCartsql, [user_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                status: false,
                message: "something went wrong"
            });
        }


        let cart_id;
        if (result.length == 0) {
            const sql = "INSERT INTO carts (user_id,created_at) VALUE (?,NOW())";
            db.query(sql, [user_id], (err, result) => {


                if (err) {
                    return res.status(500).json({
                        status: false,
                        message: "failed to enter data in cart!!"
                    });
                }



                cart_id = result.insertId;

                const cartItemsSql = "INSERT INTO cartitems (quantity,product_id,cart_id,created_at) VALUE (?,?,?,NOW())";
                db.query(cartItemsSql, [quantity, product_id, cart_id], (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            message: "product data not inserted!!"
                        });
                    }
                    res.json({
                        status: true,
                        message: "Data inserted into cart!!"
                    });
                });
            });
        } else {
            cart_id = result[0].id;

            const sql = "SELECT * FROM cartitems WHERE product_id=? AND cart_id=?";
            db.query(sql, [product_id, cart_id], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        message: "cannot find product!!" + err
                    });
                }

                if (result.length == 0) {
                    const cartItemsSql = "INSERT INTO cartitems (quantity , product_id , cart_id , created_at) VALUE (?,?,?,NOW() )"
                    db.query(cartItemsSql, [quantity, product_id, cart_id], (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                status: false,
                                message: "Product data not inserted !" + err
                            });
                        }
                        res.json({
                            status: true,
                            message: "Data Inserted into CART !"
                        });

                    });



                } else {

                    let dbQuantity = result[0].quantity;
                    const updateSql = "UPDATE cartitems SET quantity=? , updated_at=NOW() WHERE product_id=? AND cart_id=?";
                    db.query(updateSql, [dbQuantity + quantity, product_id, cart_id], (err, result) => {

                        if (err) {
                            return res.status(500).json({
                                status: false,
                                message: "Product data not inserted !" + err
                            });
                        }
                        res.json({
                            status: true,
                            message: "Data Inserted into CART !"
                        });
                    });
                }


            });

        }
    });
}










export const getCartData=(req, res) => {
    // const { userId } = req.params;
    const  userId  = req.user.id;

    const sql = `SELECT
cartitems.id,
cartitems.quantity,
cartitems.product_id,
products.name,
products.image,
products.price,
products.description
FROM carts

JOIN  cartitems ON
carts.id = cartitems.cart_id

JOIN products ON
products.id =cartitems.product_id

WHERE carts.user_id=?
`;
    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.json(500).json({

                status: false,
                message: "Something went wrong!" + err

            });

        }
        res.json({
            status: true,
            message: "Cart Data",
            cart: result
        });

    });

}