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
      bookImage: '.books-list .book__image',
      bookImageId: 'data-id',  
    },
    form: {
        filters: '.filters',
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
        thisBook.form = document.querySelector(select.form.filters);

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
        thisBook.filters = []; //pusta tablica do przechowywania informacji, jakie aktualnie filtry sa wybrane

        thisBook.bookContainer.addEventListener('dblclick', function(event){ //dodaje nasluchiwacz na cala liste, a nie na wszystkie okladki ksiazek z osobna, technika zwana event delegation 
            event.preventDefault();

            const eventElement = event.target.offsetParent; // wlasciwosc target, jest referencja do elementu, ktory bral udzial w zdarzeniu, czyli w przypadku dblclick elementu, ktory zostal klikniety; wlasciwosc offsetParent - jest odnosnikiem do kontenera, w ktorym jest element, w tym przypadku sam event.target zawsze bylby img, a nie href, ktorego potrzebuje - img nie ma takich klas

            const bookId = eventElement.getAttribute(select.books.bookImageId); 
            
            console.log('bookId+eventElement:', bookId, eventElement);

            if(!eventElement.classList.contains('favorite')){ 
                
                eventElement.classList.add('favorite'); 
                    
                favoriteBooks.push(bookId); // dodaje element do tablicy 
                console.log('favoriteBooks:', favoriteBooks);
            }  
            else{
                eventElement.classList.remove('favorite'); // usuwam klase favorite
                const index = favoriteBooks.indexOf(bookId)
                favoriteBooks.splice(index, 1); // usuwam z tablicy odznaczony element
                console.log('favoriteBooks:', favoriteBooks);
            }
            
        });

        thisBook.form.addEventListener('click', function(event){

            if(event.target.type == 'checkbox' && 
                event.target.tagName == 'INPUT' && 
                event.target.name == 'filter'){
                
                const boxValue = event.target.value;
                const boxIsChecked = event.target.checked; // wlasciwosc checkbox - klikniety 

                if(boxIsChecked){
                    thisBook.filters.push(boxValue);
                }
                else{
                    thisBook.filters.splice(thisBook.filters.indexOf(boxValue), 1);
                }
                
                console.log('filters:', thisBook.filters);
            }
            thisBook.filterBooks();
         });
         
    };
    
    filterBooks(){
       const thisBook = this;

        for(let book of dataSource.books){ //dla wszystkich ksiazek w dataSource.books
            
            const dataId = document.querySelector(select.books.bookImage + '[data-id = "' + book.id + '"]');
            
            let shouldBeHidden = false; //zakladam, ze na starcie zadna ksiazka nie powinna posiadac klasy hidden
                
            for(let filter of thisBook.filters) {  //sprawdzam czy filtr pasuje do informacji o ksiazce
                if(!book.details[filter]) { // czy !details.adult lub details.nonFiction = true
                  shouldBeHidden = true;
                  break;
                }
            }
            
            if(shouldBeHidden){
                dataId.classList.add('hidden');
            }
            else{
                dataId.classList.remove('hidden');
            }
        }
    };
 };
    new Books();

}   