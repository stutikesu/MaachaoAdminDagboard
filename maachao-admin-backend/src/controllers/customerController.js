import Customer from "../models/Customer.js";

export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const listCustomers = async (req, res) => {
  try {
    const items = await Customer.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateCustomer = async (req, res) => {
  try {
    const c = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
