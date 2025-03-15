const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: ''},
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async register(){
    this.validate();
    if(this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    this.cleanUp();

    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid email.');
    if(!this.body.name) this.errors.push('This field is required.');
    if(!this.body.name && !this.body.phone) this.errors.push('At least one contact is required.');
  }

  cleanUp(){
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = ''; 
      }
    }

    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      phone: this.body.phone,
    }
  }

  async update (id) {
    if(typeof id !== 'string') return;
    this.validate();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  async delete (id) {
    if(typeof id !== 'string') return;
    await ContactModel.findByIdAndDelete(id)
  }

  async findById(id){
    if(typeof id !== 'string') return;
    const contact = await ContactModel.findById(id);
    return contact;
  }

  async all(){
    const contacts = await ContactModel.find()
      .sort({createAt: -1});
    return contacts;
  }
}

module.exports = Contact;
