// ใช้ asyncHandler แทน import products โดยการดึงข้อมูลมาจาก MongoDB
// import products from '../data/products.js';
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'


// @desc    Fetch all aproducts
// @route   GET /api/products
// @access  Public

// Get All Products
const getProducts = asyncHandler(async(req,res) => {
    // pageSize
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    // search
    const keyword = req.query.keyword 
    ? {name: {$regex: req.query.keyword, $options: 'i'}} 
    : {} ;
    const count = await Product.countDocuments({...keyword})


    // 1. Product คือ Mongoose Model ที่เกี่ยวข้องกับ collection ใน MongoDB ที่เก็บข้อมูลสินค้า
    // 2. .find({}) คือ query method ของ Mongoose ที่ใช้ในการค้นหาข้อมูลทั้งหมดใน collection นั้น ๆ 
    // โดยในที่นี้คือ collection ที่เกี่ยวข้องกับ Model Product.
    // 3. การใช้ {} ในที่นี้คือแบบว่า "ไม่มีเงื่อนไข" หรือ "ค้นหาทั้งหมด" 
    // ซึ่งจะคืนข้อมูลทั้งหมดที่มีใน collection นั้น ๆ.
    const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page-1))
    res.json({products, page, pages: Math.ceil(count/pageSize)})
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

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Privare/Admin
const creatProductReview = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    const {rating, comment} = req.body

    if(product){
        // การเปรียบเทียบ review.user.toString() กับ req.user._id.toString() 
        // ซึ่งเป็นการเปรียบเทียบ string ของรหัสผู้ใช้ที่ลงความคิดเห็นกับรหัสผู้ใช้ที่เข้ามาใหม่
        // review.user.toString(): รหัสผู้ใช้ของผู้ลงความคิดเห็นที่เก็บไว้ในฐานข้อมูล (เป็น ObjectId)
        // req.user._id.toString(): รหัสผู้ใช้ของผู้ใช้ที่เข้ามาใหม่  
        const alreadyReviewed = product.reviews.find((review) => review.user.toString()=== req.user._id.toString());

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Reviewed');
        } else {
            const review = {
                name: req.user.name,
                rating: Number(rating),

                // comment ถูกให้ค่าจาก req.body ด้านบน
                // ดังนั้น, ถ้าไม่มีค่า comment ที่ถูกส่งมาจาก req.body.comment, ค่า comment ใน review object 
                // นั้นจะเป็น undefined. แต่ถ้ามีค่า comment มีค่าจริง, ค่านั้นจะถูกกำหนดใน review object.
                comment,
                user: req.user._id,
            };

            // review object ถูกเพิ่มลงใน product.reviews array:
            product.reviews.push(review);

            // product.reviews.length => จำนวน ข้อมูล array ที่เก็บข้อมูลของการรีวิว เอาไว้ => จำนวนคนที่ทำการรีวิวนั่นเอง
            product.numReviews = product.reviews.length;

            // reduce ใช้เพื่อ เก็บค่าผลรวมของคะแนน (rating) ทุกรีวิวใน product.review
            // acc คือค่าผลรวมที่ถูกสะสมและ review คือแต่ละรีวิวใน product.review
            //  ค่าเริ่มต้น (0) จะถูกให้กับ acc.
            product.rating = product.reviews.reduce((acc, review)=> acc+review.rating,0)/product.numReviews ;

            await product.save();
            res.status(201).json({message: 'Review added'})
        }
    } else {
        res.status(404);
        throw new Error("NO Resource")
    }
})

// @desc    Get top rated product
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({ _id: { $ne: '6575f96ad7ac8c1c63c7c097' } }).sort({rating: -1}).limit(5);
    res.status(200).json(products)
})

export{
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
    creatProductReview,
    getTopProducts
}