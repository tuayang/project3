import axios from "axios";

export default {
  // Gets all books
  getBooks: function(token) {
    return axios.get("/api/cards", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/cards/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/cards/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/cards", bookData);
  },
  signup: function(userData) {
    return axios.post("/api/users/signup", userData);
  },
  login: function(userData) {
    return axios.post("/api/users/login", userData);
  }
};
