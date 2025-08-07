const bookService = require("../services/bookService");

class BookController {
  async createBook(req, res) {
    try {
      const book = await bookService.createBook(req.body);
      res.status(201).json({
        success: true,
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllBooks(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        search: req.query.search,
        category: req.query.category,
        minPrice: req.query.minPrice
          ? parseFloat(req.query.minPrice)
          : undefined,
        maxPrice: req.query.maxPrice
          ? parseFloat(req.query.maxPrice)
          : undefined,
        inStock: req.query.inStock ? req.query.inStock === "true" : undefined,
      };

      const result = await bookService.getAllBooks(options);
      res.status(200).json({
        success: true,
        count: result.books.length,
        data: result.books,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getBookById(req, res) {
    try {
      const book = await bookService.getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }
      res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateBook(req, res) {
    try {
      const book = await bookService.updateBook(req.params.id, req.body);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }
      res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteBook(req, res) {
    try {
      const book = await bookService.deleteBook(req.params.id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new BookController();
