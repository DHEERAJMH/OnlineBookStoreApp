const express = require('express');
const router = express.Router();
const Book = require('./book.model');
const {postABook} = require('./book.controller');
const {getAllBooks} = require('./book.controller');
const {getSinglebook} = require('./book.controller');
const {updateBook} = require('./book.controller');
const {deletAbook} = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

//post books
router.post('/create-book',verifyAdminToken ,postABook);

//get all books
router.get('/',getAllBooks);

//get a book
router.get('/:id',getSinglebook);

//update a book
router.put('/edit/:id',verifyAdminToken,updateBook);

router.delete('/:id',verifyAdminToken,deletAbook)

module.exports = router;