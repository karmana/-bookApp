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
        const favoriteBooks = []; 

        for(let book of thisBook.bookImage){
            book.addEventListener('dblclick', function(event){
                event.preventDefault();
                
                const bookId = event.target.getAttribute("data-id"); //select.books.bookImageId
                console.log('bookId:', bookId);
                
                if(favoriteBooks.indexOf(bookId) = -1){ //sprawdzam czy dany element jest juz w tablicy favoriteBooks
                    
                    thisBook.bookImage.classList.add('favorite'); // jesli indexof = -1 wtedy dodaje klase favorite do kliknietego elementu
                    
                    favoriteBooks.push(bookId); // dodaje element do tablicy 
                    console.log('favoriteBooks:', favoriteBooks);
                }
                else{
                    thisBook.bookImage.classList.remove('favorite'); // usuwam klase favorite
                    const index = favoriteBooks.indexOf(bookId)
                    
                    favoriteBooks.splice(index, 1); // usuwam z tablicy odznaczony element

                    console.log('favoriteBooks:', favoriteBooks);
                }

                
            })
        }
        

        
    };


}

new Books();

}  
 

