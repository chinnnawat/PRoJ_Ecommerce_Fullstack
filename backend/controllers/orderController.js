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
            orderItems: orderItems.map((x) => ({...x,
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

    // ถ้าคุณไม่ได้เขียน populate('user','name email') ในคำสั่ง Order.findById(req.params.id) 
    // จะทำให้ไม่มีการดึงข้อมูลผู้ใช้ (user) มาในข้อมูล Order ที่ได้รับคืนจาก MongoDB ดังนั้น, ข้อมูล user 
    // ใน Object order จะเป็น ObjectId ของผู้ใช้ที่ทำการสั่งซื้อ (order) นั้น ๆ แทนที่จะเป็น Object ของผู้ใช้ทั้งหมด.
    // ดังนั้น, ถ้าคุณไม่ได้เขียน populate('user','name email'), คุณจะได้ order ที่มีข้อมูล user เป็น ObjectId 
    // เท่านั้น และถ้าคุณต้องการข้อมูลเพิ่มเติมของผู้ใช้ (user) คุณจะต้องดึงข้อมูลผู้ใช้เพิ่มเติมโดยใช้คำสั่ง populate 
    // หรือดึงข้อมูลผู้ใช้แยกต่างหาก.
    

    // ในส่วนนี้ใช้ Order.find({}) เพื่อดึงข้อมูล order ทั้งหมดจาก MongoDB
    // const orders = await Order.find({}).populate('user', 'id name');

    // ปรับข้อมูลใน orders โดยให้ map ผ่านทุกรายการ order และแปลงข้อมูลใน orderItems
    // const ordersWithProductNames = orders.map(order => ({
    //     ...order.toObject(),
    //     orderItems: order.orderItems.map(orderItem => ({
    //         ...orderItem.toObject(),
    //         name: orderItem.name,  // เพิ่ม name ของสินค้าเข้าไป
    //     }))
    // }));

    // ส่ง response กลับไปที่ client โดยกำหนดสถานะการทำงานของ HTTP เป็น 200 OK และส่งข้อมูล order ทั้งหมดในรูปแบบ JSON
    res.status(200).json(ordersWithProductNames);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order Not Found');
    }

});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/delivery
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updateOrderStatus = order.save()
        res.status(200).json(updateOrderStatus)
    }else{
        res.status(404);
        throw new Error ('Order not found')
    }
})

// @desc    Get all orders
// @route   Get /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async(req,res)=>{
    // ในส่วนนี้ใช้ Order.find({}) เพื่อดึงข้อมูล order ทั้งหมดจาก MongoDB
    const order = await Order.find({}).populate('user', 'id name');
    res.status(200).json(order)
})

export {
    addOrderItems,
    getMyOrders,
    getOrderByID,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}