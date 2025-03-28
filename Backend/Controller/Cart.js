const { Cart } = require("../Model/Cart");

exports.fetchCartsByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const carts = await Cart.find({user:user}).populate('user').populate('product');
    // console.log("Carts fetched:", carts);
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const doc = await cart.save();
   const result =  doc.populate('product')
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.deleteCart = async (req, res) => {
  const {id} = req.params;
  try {
    const cart = await Cart.findByIdAndDelete(id);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const {id} = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id , req.body, {
      new : true
    })
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
};