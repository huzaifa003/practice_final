const router = require('express').Router();

const token = require('../middleware/token');
const bookModel = require('../models/BookSchema');

router.post('/add', token,  async (req, res) => {
    try {
        const book = new bookModel(req.body);
        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send
    }
}
);


router.get('/', token, async (req, res) => {
    try {
        const books = await bookModel.find();
        if (books.length === 0) return res.send('No book found');
        else
            res.send(books);
    } catch (error) {
        res
    }
}
);

router.get('/:id', token, async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id);
        if (!book) return res.send('No book found');
        else
            res.send(book);
    } catch (error) {
        res
    }
}
);


router.put('/:id', token, async (req, res) => {
    try {
        const book = await bookModel.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        if (!book) return res.send('No book found');
        else
            res.send(book);
    } catch (error) {
        res.send(error);
    }
});


router.delete('/:id', token, async (req, res) => {
    try {
        const book = await bookModel.findByIdAndDelete(req.params.id);
        if (!book) return res.send('No book found');
        else
            res.send(book);
    } catch (error) {
        res.send(error);
    }
});

