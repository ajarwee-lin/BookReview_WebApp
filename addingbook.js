// Assuming you have an endpoint to handle adding a book
app.post('/books', async (req, res) => {
    try {
      const { title, author } = req.body;
      const book = new Book({ title, author });
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  