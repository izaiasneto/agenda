const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
  const contact = new Contact();
  const contacts = await contact.all();
  res.render('index', { contacts });
};

