// Assuming you have an endpoint to handle updating a book
app.put('/books/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author } = req.body;
      const book = await Book.findByIdAndUpdate(id, { title, author }, { new: true });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  