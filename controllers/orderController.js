import Order from '../models/OrderModel.js';

// @desc    Create New Order
// @route   POST /api/orders
// @access  Private 
const addOrderItems = async (req, res, next) => {
  const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items")
    return;
  } else {
    const order = new Order({
      orderItems, 
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private 
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order Not Found!');
    }
  } catch(err) {
    res.status(404);
    const error = new Error("Invalid Order ID!");
    next(error);
  }
}

// @desc    Update Order to Paid
// @route   GET /api/orders/:id/pay
// @access  Private 
const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if(order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order Not Found!');
    }
  } catch(err) {
    res.status(404);
    const error = new Error("Invalid Order ID!");
    next(error);
  }
}

// @desc    Get Logged In User Orders
// @route   GET /api/orders/myorders
// @access  Private 
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders);

  } catch(err) {
    res.status(404);
    const error = new Error("Could Not Find User By ID");
    next(error);
  }
}

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
}
