import { DocumentProvider } from 'mongoose';
import BookService from './services/BookService';
const bookService = new BookService();

import { format } from 'timeago.js';


class UI {

    async renderBook(){
        const books = await bookService.getBooks();
        const booksCardsContainer = document.getElementById('books-cards');
        booksCardsContainer.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img class="image-fluid" src="http://localhost:3000${book.imagePath}" alt="">
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardsContainer.appendChild(div);
        });
    }

    async addANewBook(book){
        await bookService.postBooks(book);
        this.clearBookForm();
        this.renderBook();
    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        
        div.appendChild(document.createTextNode(message));
        
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(div, bookForm);

        setTimeout(function (){
            document.querySelector('.message').remove();
        },secondsToRemove);

    }

    async deleteBook(bookId){
        await bookService.deleteBooks(bookId);
        this.renderBook();
    }

}

export default UI;