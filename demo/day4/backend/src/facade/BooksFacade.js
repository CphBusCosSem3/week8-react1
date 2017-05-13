/**
 * Created by tha on 23-03-2017.
 */
const URL = "http://localhost:4000/books"
class BooksFacade {
    constructor(books) {
        this._books = typeof books != 'undefined' ? books : [];
        this._nextId = -1;
    }

    get books() {
        return this._books;
    }

    loadBooks(callback) {
        fetch(URL).
        then(res => res.json()).
        then(data => {
            this._books = data;

            if (callback) {
                callback(data);
            }
        }).catch((err)=>{
            console.log("Could not fetch data from server. Is the backend running?")
            callback(null);
        })
        return this._boos;
    }


    get emptyBook() {
        return {
            id: "",
            title: "",
            author: "",
            rating: "",
            year_published: ""
        };
    }

    deleteBook(id, callback) {
        fetch(URL + "/" + id, {
            method: 'delete'
        }).then(response =>
            response.json()
                .then(deletedBook => {
                for (var i = 0; i < this._books.length; i++) {
                    if (this._books[i].id === id) {
                        this._books.splice(i, 1);
                    }
                }
                callback();
            }))
    }

    addEditBook(book, callback) {
        var method = !Number.isInteger(book.id) ? "post" : "put"; //if no id then must be post
        var URL_Post_Put = (method === "put") ? URL+"/"+book.id : URL;
        fetch(URL_Post_Put, {
            method: method,
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(book)
        }).then(res => res.json())
            .then(newBook => {
                if (method === "post") {
                    this.addBook(book);
                }
                else {
                    this.editBook(book);
                }
                callback(newBook);
            })
    }


    editBook(book) {
        for (var i = 0; i < this._books.length; i++) {
			let name = '';
            if (this._books[i].id === book.id) {
                this._books[i] = Object.assign({}, book); //Object.assign creates a copy
            }
        }
    }

    addBook(book) {
        if (!Number.isInteger(book.id)) {
            this._books.push(Object.assign({}, book));
        } else {
            throw new Error("Cannot save a book with existing ID");
        }
    }
}

export default BooksFacade;