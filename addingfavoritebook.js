// Assuming you have an endpoint to handle adding a book to favorites for a user
app.post('/users/:userId/favorites', async (req, res) => {
    try {
      const { userId } = req.params;
      const { bookId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.favorites.includes(bookId)) {
        return res.status(400).json({ error: 'Book already added to favorites' });
      }
      user.favorites.push(bookId);
      await user.save();
      res.json({ message: 'Book added to favorites successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  