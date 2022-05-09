/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
'use strict';

  const select = {
    templateOf: {
      book: '#template-book', 
    },
    containerOf: {
      bookList: '.books-list',
      booksPanel: '.books-panel',
    },
  };

  const templates = {
    bookCard: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  }; 

const renderBookList = function(){ // display book collection
    for(const book of dataSource.books){
  
      const generatedHTML = templates.bookCard(book);
      console.log('generatedHTML:', generatedHTML);

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      console.log('generatedDOM:', generatedDOM);

      const bookContainer = document.querySelector(select.containerOf.bookList);
      console.log('bookContainer:', bookContainer);

      bookContainer.appendChild(generatedDOM);
    }
  }; 

    renderBookList();

}  
 

