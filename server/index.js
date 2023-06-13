import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const app = express();

app.use(express.json());

app.get("/api/book/posts", async (req, res) => {
  try {
    const posts = await sql`SELECT * FROM Post`;

    res.json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

app.post("/api/book/posts", async (req, res) => {
  // Extract the post data from the request body
  const { selectedBookImage, selectedBookTitle, postContent } = req.body;

  try {
    const createdPost = await createPost(
      selectedBookImage,
      selectedBookTitle,
      postContent
    );

    // Return the created post as the response
    res.json(createdPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

async function createPost(selectedBookImage, selectedBookTitle, postContent) {
  try {
    // Perform the database insertion using the sql object
    const result = await sql`
      INSERT INTO Post (book_picture, book_title, post)
      VALUES (${selectedBookImage}, ${selectedBookTitle}, ${postContent})
      RETURNING *;
    `;

    // Assuming the database returns the created post, you can access it using result[0]
    const createdPost = result[0];

    return createdPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
