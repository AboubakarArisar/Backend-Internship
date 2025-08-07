const User = require("../models/User");

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async getAllUsers(options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .populate("favoriteBooks", "title author")
      .populate("ownedBooks", "title author")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({});
    const totalPages = Math.ceil(total / limit);

    return {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
      },
    };
  }

  async getUserById(id) {
    return await User.findById(id)
      .populate("favoriteBooks", "title author price")
      .populate("ownedBooks", "title author price");
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  async updateUser(id, userData) {
    return await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async addToFavorites(userId, bookId) {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favoriteBooks: bookId } },
      { new: true }
    ).populate("favoriteBooks", "title author");
  }

  async removeFromFavorites(userId, bookId) {
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { favoriteBooks: bookId } },
      { new: true }
    ).populate("favoriteBooks", "title author");
  }

  async addOwnedBook(userId, bookId) {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { ownedBooks: bookId } },
      { new: true }
    );
  }

  async removeOwnedBook(userId, bookId) {
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { ownedBooks: bookId } },
      { new: true }
    );
  }
}

module.exports = new UserService();
