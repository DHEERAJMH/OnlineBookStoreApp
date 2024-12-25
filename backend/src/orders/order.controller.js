const Order = require('./order.model');

const createAOrder = async (req,res) => {
    try {
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order",error);
        res.status(500).json({message: "Failed to create order"});
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" }); // Use `return` to stop further execution
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        return res.status(500).json({ message: "Failed to get order" });
    }
};


module.exports = {
    createAOrder,
    getOrderByEmail
}