const Book = require('../models/Book');

class BookService {
  async createBook(bookData) {
    const book = new Book(bookData);
    return await book.save();
  }

  async getAllBooks(options = {}) {
    const { page = 1, limit = 10, search, category, minPrice, maxPrice, inStock } = options;
    
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = new RegExp(category, 'i');
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }
    
    if (inStock !== undefined) {
      query.inStock = inStock;
    }

    const skip = (page - 1) * limit;
    
    const books = await Book.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Book.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    return {
      books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  async getBookById(id) {
    return await Book.findById(id).populate('owner', 'name email');
  }

  async updateBook(id, bookData) {
    return await Book.findByIdAndUpdate(id, bookData, { 
      new: true, 
      runValidators: true 
    }).populate('owner', 'name email');
  }

  async deleteBook(id) {
    return await Book.findByIdAndDelete(id);
  }

  async getBooksByOwner(ownerId, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;
    
    const books = await Book.find({ owner: ownerId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Book.countDocuments({ owner: ownerId });
    const totalPages = Math.ceil(total / limit);
    
    return {
      books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    };
  }
}

module.exports = new BookService(); 