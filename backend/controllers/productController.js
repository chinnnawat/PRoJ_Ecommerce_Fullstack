// ใช้ asyncHandler แทน import products โดยการดึงข้อมูลมาจาก MongoDB
// import products from '../data/products.js';
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'


// @desc    Fetch all aproducts
// @route   GET /api/products
// @access  Public

// Get All Products
const getProducts = asyncHandler(async(req,res) => {

    // 1. Product คือ Mongoose Model ที่เกี่ยวข้องกับ collection ใน MongoDB ที่เก็บข้อมูลสินค้า
    // 2. .find({}) คือ query method ของ Mongoose ที่ใช้ในการค้นหาข้อมูลทั้งหมดใน collection นั้น ๆ 
    // โดยในที่นี้คือ collection ที่เกี่ยวข้องกับ Model Product.
    // 3. การใช้ {} ในที่นี้คือแบบว่า "ไม่มีเงื่อนไข" หรือ "ค้นหาทั้งหมด" 
    // ซึ่งจะคืนข้อมูลทั้งหมดที่มีใน collection นั้น ๆ.
    const products = await Product.find({})
    res.json(products)
})

// @desc    Fetch a aproduct
// @route   GET /api/products/:id
// @access  Public
const getProductsById = asyncHandler(async(req,res) => {
    // 1. เมื่อ frontend request id จาก url 
    // 2. req.params.id: เป็นการดึงค่า ID จากพารามิเตอร์ของ URL ที่ถูกส่งมาด้วยคำขอ (request) นั้น ๆ.
    // เก็บในตัวแปร product
    const product = await Product.findById(req.params.id)

    if (product) {
        return res.json(product)
    }
    else{
        res.status(404);
        throw new Error('Resource Not Found')
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async(req,res) => {
    const product = new Product({
        user: req.user._id,
        name: 'Sample Product',
        image: '/images/jujutsu.jpg',
        category: 'Sample Category',
        description: 'Sample Description',
        rating: 0,
        price: 0,
        numReviews: 0,
        countInStock: 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

// @desc    Update a Product
// @route   PUT /api/products/:id
// @access  Privare/Admin
const updateProduct = asyncHandler(async(req,res) => {
    const { name, image, category, description, price, countInStock } = req.body;
    const product = await Product.findById(req.params.id)

    if (product){
        product.name = name;
        product.image = image;
        product.category = category;
        product.description = description;
        product.price = price;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct)
    } else {
        res.status(404);
        throw new Error('Resource not Found')
    }
})

// @desc    Delete a Product
// @route   DELETE /api/products/:id
// @access  Privare/Admin
const deleteProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({message: 'Product Deleted'})
    } else {
        res.status(401);
        throw new Error('Resourc Not Found');
    }
})

export{
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
}