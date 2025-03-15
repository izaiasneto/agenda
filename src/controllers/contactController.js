const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
    res.render('contact', {
        contact: {}
    });
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contact'));
            return;
        }

        req.flash('success', 'Contact has been created successfully');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return;

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.edit = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contactModel = new Contact();
    const contact = await contactModel.findById(req.params.id);

    if(!contact) return res.render('404');

    res.render('contact', { contact });
}

exports.update = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const contact = new Contact(req.body); 
        await contact.update(req.params.id);
    
        if(contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect(`/contact/${req.params.id}`));
            return;
        }
    
        req.flash('success', 'Contact has been updated successfully');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contactModel = new Contact();
    await contactModel.delete(req.params.id);

    req.flash('success', 'Contact has been deleted successfully');
    req.session.save(() => res.redirect('back'));
}