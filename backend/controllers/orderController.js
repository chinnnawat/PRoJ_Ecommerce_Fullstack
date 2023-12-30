import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js"

// @desc    Create new Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async(req,res) => {

    // ref มาจาก orderModel.js
    // เป็นข้อมูลที่ต้องการเพิ่มหากทำการ create order ใหม่
    const {
        orderItems,
        ShippingAddress,
        paymentMethod,
        paymentResult,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    // if (orderItems && orderItems.length === 0) นั้นใช้เพื่อทำการตรวจสอบว่าตัวแปร orderItems มีค่า
    // (ไม่เป็น null หรือ undefined) และมีความยาว (length) เท่ากับ 0 หรือไม่
    // orderItems เป็น falsy (null, undefined, 0, false, NaN, หรือ empty string) ก็จะไม่ไปทำการตรวจสอบ 

    // **********orderItems เป็น null หรือ undefined หรือมีความยาวเท่ากับ 0 ***************
    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No Order Items');
    }
    else{
        const order = new Order({
            orderItems: order.map((x) => ({...x,
                product: x._id,
                // _id: undefined ทำให้ MongoDB ไม่ต้องการสร้าง _id ใหม่แต่ใช้ค่า _id ที่ถูกส่งมาในแต่ละรายการจาก orderItems.
                _id: undefined})),
            user:req.user._id,
            ShippingAddress,
            paymentMethod,
            paymentResult,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createOrder = await order.save();

        res.status(200).json(createOrder);
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async(req,res)=>{

    // หา order ของผู้ใช้งาน โดยใช้ id ของผู้ใช้งานในการหา
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderByID = asyncHandler(async(req,res)=>{

    // params ใช้เพื่อดึง parameter ที่ส่งมาผ่าน url เช่น
    // ถ้า URL ที่ถูกเรียกคือ /orders/123, req.params.id จะมีค่าเป็น '123'.
    const order = await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }
    else{
        res.status(404);
        throw new Error('Order not found')
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async(req,res)=>{
    res.send("update order to paid");
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/delivery
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    res.send("update order to delivered");
})

// @desc    Get all orders
// @route   Get /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async(req,res)=>{
    res.send("get all orders")
})

export {
    addOrderItems,
    getMyOrders,
    getOrderByID,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}