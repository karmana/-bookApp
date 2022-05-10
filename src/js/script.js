/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
'use strict';

  const select = {
    templateOf: {  // refenrecja do #template-book
      book: '#template-book', 
    },
    books: { 
      bookList: '.books-list',
      booksPanel: '.books-panel',
      bookImage: '.book__image',
      bookImageId: 'data-id',
    },
  };

  const templates = {
    bookCard: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  }; 


class Books {
    constructor(){
        const thisBook = this;

        thisBook.initData()
        thisBook.getElements();
        thisBook.render();
        thisBook.initActions();
       
        const favoriteBooks = []; 
    };

    initData(){
        const thisBook = this;
        thisBook.data = dataSource.books;
    };  

    getElements(){
        const thisBook = this;

        thisBook.bookContainer = document.querySelector(select.books.bookList);
        thisBook.bookImage = document.querySelectorAll(select.books.bookImage);

        console.log('thisBook.bookImage', thisBook.bookImage);
    };


    render(){ 
        const thisBook = this;

        for(const book of dataSource.books){
    
        const generatedHTML = templates.bookCard(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        thisBook.bookContainer.appendChild(generatedDOM);
        }
    }; 

    initActions(){
        const thisBook = this;

        for(let book of thisBook.bookImage){
            book.addEventListener('dblclick', function(event){
                event.preventDefault();

                const element = document.getElementById()

                thisBook.bookImage.classList.add('favorite');
                
                const bookId = event.target.getAttribute("data-id"); //select.books.bookImageId
                console.log('bookId:', bookId);

                favoriteBooks.push(bookId);
                console.log('favoriteBooks:', favoriteBooks);
            })
        }
        

        
    };


}

new Books();

}  
 

