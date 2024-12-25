const Book = require('./book.model');

const postABook = async (req,res)=>{
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({message:'Book created successfully',Book:newBook});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to create book'});
    }
}

const getAllBooks = async (req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1}); //sort by latest descending order
        res.status(200).json({message:'All books',books});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to fetch books'});
    }
}

const getSinglebook = async (req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            res.status(404).json({message:'Book not found'});
        };
        res.status(200).json({message:'Book',book});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to fetch book'});
    }
}

const updateBook = async (req,res)=>{
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:'Book updated successfully',book:updatedBook});   
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to update book'});
    }
}

const deletAbook = async (req,res)=>{
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        res.status(200).json({message:'Book deleted successfully',book:deletedBook});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Failed to delete book'});
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSinglebook,
    updateBook,
    deletAbook
};