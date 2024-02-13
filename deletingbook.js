// Assuming you have an endpoint to handle deleting a book
app.delete('/books/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  