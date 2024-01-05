import express from 'express';
//import { get } from 'axios';

const app = express();
const port = 3000;

// Base URL for the book shop API (local emulation)
const baseURL = 'http://localhost:3000/api';

// Middleware for parsing JSON requests
app.use(express.json())

// Function to make a GET request using Axios
// const makeGetRequest = async (endpoint) => {
//   try {
//     const response = await get(`${baseURL}/${endpoint}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error making GET request to ${endpoint}:`, error.message);
//     throw error;
//   }
// };

let books=[
    {
        
            "id":1,
            "author":"Chinua Achebe",
            "title":"Book 1",
            "reviews":[{}]
    },
       
       {
        "id":2,
            "author":"Akram",
            "title":"Book 2",
            "reviews":[{}]
        },
       {
        "id":3,    
        "author":"Ahmed",
            "title":"Book 3",
            "reviews":[{}]
        }
    
]
// Task 1: Get the book list available in the shop
app.get(`/getBookList`, async (req, res) => {
  try {
   return res.json({books});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/test",async(req,res)=>{return res.json({message:"done"})})

// Task 2: Get the books based on ISBN
app.get(`/getBooksByISBN/:isbn`, async (req, res) => {
  const { isbn } = req.params;
  try {
    res.json({book:books[isbn-1]});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Task 3: Get all books by Author
app.get(`/getBooksByAuthor/:author`, async (req, res) => {
  const { author } = req.params;
  try {
    
    let result=[]
    books.forEach((book)=>{
        if(book.author==author) result.push(book)
        
    })
    res.json({result});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Task 4: Get all books based on Title
app.get(`/getBooksByTitle/:title`, async (req, res) => {
  const { title } = req.params;
  try {
    let result=[]
    books.forEach((book)=>{
        if(book.title==title) result.push(book)
        
    })
    res.json({result});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Task 5: Get book Review
app.get(`/getBookReview/:bookId`, async (req, res) => {
  const { bookId } = req.params;
  try {
    let result=[]
    res.json(books[bookId-1].reviews)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

let users=[
    {
        email:"akram@mail.com",
        password:"1234"
    }
]
// Task 6: Register New user
app.post(`/registerUser`, async (req, res) => {
  // Assuming user registration details are provided in the request body
  const registrationDetails = req.body;
  try {
    // Implement user registration logic here
    // For simplicity, just return a success message
    users.push({
        email:registrationDetails.email,
        password:registrationDetails.password
    })
    res.json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Task 7: Login as a Registered user
app.post(`/login`, async (req, res) => {
  // Assuming login credentials are provided in the request body
  const loginCredentials = req.body;
  try {
    users.forEach((user)=>{
        if(user.email==loginCredentials.email && user.password==loginCredentials.password){
            return res.json({ message: 'Login successful.' });
        }
    })
    res.json({ message: 'user not found' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Registered Users:

// Task 8: Add/Modify a book review (for registered users)
app.post(`/addModifyReview/:userId/:bookId`, async (req, res) => {
  const { userId, bookId } = req.params;
  const reviewDetails = req.body;
  try {
    books[bookId-1].reviews.push({
        "userId":userId,
        "review":reviewDetails
    }
    )
    // Implement logic to add/modify the review for the specified user and book
    // For simplicity, just return a success message
    res.json({ message: 'Review added/modified successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Task 9: Delete book review added by that particular user (for registered users)
app.delete(`/deleteReview/:userId/:bookId`, async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    books[bookId-1].reviews.forEach((rev)=>{
        if(rev.userId==userId) rev={}
    })
    // Implement logic to delete the review for the specified user and book
    // For simplicity, just return a success message
    res.json({ message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Task 10: Get all books – Using async callback function
// app.get('/getAllBooksAsync', async (req, res) => {
//   try {
//     const books = await makeGetRequest('books');
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

//  Task 11: Search by ISBN – Using Promises
// app.get('/searchByISBNPromise/:isbn', (req, res) => {
//   const { isbn } = req.params;
//   makeGetRequest(`books/isbn/${isbn}`)
//     .then((books) => res.json(books))
//     .catch(() => res.status(500).json({ error: 'Internal Server Error' }));
// });

//  Task 12: Search by Author
// app.get('/searchByAuthor/:author', async (req, res) => {
//   const { author } = req.params;
//   try {
//     const books = await makeGetRequest(`books/author/${author}`);
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

//  Task 13: Search by Title
// app.get('/searchByTitle/:title', async (req, res) => {
//   const { title } = req.params;
//   try {
//     const books = await makeGetRequest(`books/title/${title}`);
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
