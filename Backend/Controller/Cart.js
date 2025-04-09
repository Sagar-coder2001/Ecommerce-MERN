const { Cart } = require("../Model/Cart");

exports.fetchCartsByUser = async (req, res) => {
  const { user } = req.query;  // Get user from query string
  try {
    // Find carts for the given user and populate the user and product fields
    const carts = await Cart.find({ user: user }).populate('user').populate('product');
    
    // Ensure _id is returned (it should be by default)
    console.log("Carts:", carts);  // Check what data is returned
    
    res.status(200).json(carts);  // Return the carts to the client
  } catch (err) {
    res.status(400).json(err);  // If there's an error, send a 400 response
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
  const { id } = req.params;
  console.log('Request Body:', req.body); // Log incoming body to check if data is received correctly

  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(cart);
    console.log('Updated Cart:', cart); // Log the updated cart to verify the update
  } catch (err) {
    res.status(400).json(err);
  }
};
