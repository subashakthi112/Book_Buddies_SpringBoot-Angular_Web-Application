//package com.ford.bookbuddies;
//
//import com.ford.bookbuddies.controller.StockManagerController;
//import com.ford.bookbuddies.dao.BookRepository;
//import com.ford.bookbuddies.dao.BookStockRepository;
//import com.ford.bookbuddies.dao.CustomerRepository;
//import com.ford.bookbuddies.dao.StockManagerRepository;
//import com.ford.bookbuddies.entity.Book;
//import com.ford.bookbuddies.entity.BookStock;
//import com.ford.bookbuddies.entity.StockManager;
//import com.ford.bookbuddies.exception.BookException;
//import com.ford.bookbuddies.exception.StockManagerException;
//import com.ford.bookbuddies.service.StockManagerService;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static com.ford.bookbuddies.entity.BookCategory.FICTION;
//
//// StockManager signUp(StockManager stockManager);
////
////         StockManager login(String username, String password) throws StockManagerException;
////
////public void setAdminId(Integer id);
////
////public Integer getAdminId();
////        List<StockManager> getAllAdmins();
////
////        BookStock addNewBooks(Integer adminId, BookStock newBook) throws BookException, StockManagerException;
////
////        BookStock updateBook(Integer adminId,BookStock updateBook) throws BookException, StockManagerException;
////
////        BookStock getBookById(Integer bookId) throws BookException;
////        List<BookOrders> updateOrderStatus();
////
////        Boolean deleteBookByBookId(Integer adminId,Integer bookId) throws BookException, StockManagerException;
////
////        List<BookStock> displayAllBooks(Integer adminId) throws StockManagerException;
////
////        List<Customer> displayAllCustomer(Integer adminId) throws StockManagerException;
////
////public List<BookStock> viewLessStocks() throws BookException;
//
//
//@SpringBootTest
//public class StockManagerControllerTest {
//
//    @Autowired
//    public StockManagerService stockManagerService;
//
//    @Autowired
//    public StockManagerRepository stockManagerRepository;
//
//    @Autowired
//    public BookRepository bookRepository;
//
//    @Autowired
//    public CustomerRepository customerRepository;
//
//    @Autowired
//    public BookStockRepository bookStockRepository;
//
//    @Autowired
//    public StockManagerController stockManagerController;
//
//
//
//    //sign in
//
//    @Test
//    @DisplayName("Sign in stock manager should throw exception when username is null")
//    public void SignInStockManagerShouldThrowExceptionWhenUserNameIsNull() {
//        StockManager stockManager = new StockManager(1029, null, "stocker");
//        try {
//            this.stockManagerController.login(stockManager);
//        }
//        catch (StockManagerException e) {
//            Assertions.assertEquals("Admin Name should not be null", e.getMessage());
//        }
//    }
//
//    @Test
//    @DisplayName("Sign in stock manager should throw exception when password is null")
//    public void SignInStockManagerShouldThrowExceptionWhenPasswordIsNull() {
//        StockManager stockManager = new StockManager(1023, "hello", null);
//        try {
//            this.stockManagerController.login(stockManager);
//        }
//        catch (StockManagerException e) {
//            Assertions.assertEquals("Password should not be null", e.getMessage());
//        }
//    }
//
////login
//
//    @Test
//    @DisplayName("Login should throw exception when username is null")
//    public void loginShouldThrowExceptionWhenUserNameIsNull() throws StockManagerException {
//        StockManager stockManager = new StockManager(80, null, "admin");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        try {
//            stockManager = stockManagerController.login(stockManager);
//        }
//        catch (StockManagerException e) {
//            Assertions.assertEquals("Admin Name should not be null", e.getMessage());
//        }
//    }
//
//    @Test
//    @DisplayName("Login should throw exception when password is null")
//    public void loginShouldThrowExceptionWhenPasswordIsNull() throws StockManagerException {
//        StockManager stockManager = new StockManager(19, "admin", null);
//        stockManager = this.stockManagerRepository.save(stockManager);
//        try {
//            stockManager = stockManagerController.login(stockManager);
//        }
//        catch (StockManagerException e) {
//            Assertions.assertEquals("Admin Password should not be empty", e.getMessage());
//        }
//    }
//
//
//    //add new book
//
//    @Test
//    @DisplayName("add new books should throw exception when Admin Id is null")
//    public void addNewBooksShouldThrowExceptionWhenBookAdminIdIsNull() throws StockManagerException {
//        StockManager stockManager = new StockManager(55, "title", "title");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = this.stockManagerController.login(stockManager);
//        Book book = new Book("air", "Disney", 500.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerController.addNewBooks(bookStock);
//
//        }
//        catch (BookException | StockManagerException e)  {
//            Assertions.assertEquals("Admin not logged", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//            this.bookStockRepository.delete(bookStock);
//            this.bookRepository.delete(book);
//        }
//    }
//
//
//    @Test
//    @DisplayName("add new books should throw exception when book stock is null")
//    public void addNewBooksShouldThrowExceptionWhenBookStockIsNull() throws StockManagerException, BookException {
//        StockManager stockManager = new StockManager(55, "title", "title");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = this.stockManagerController.login(stockManager);
//        Book book = new Book("mac", "Disney", 500.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            this.stockManagerController.addNewBooks(null);
//
//        }
//        catch (BookException | StockManagerException e)  {
//            Assertions.assertEquals("book should not be null", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//            this.bookStockRepository.delete(bookStock);
//            this.bookRepository.delete(book);
//        }
//    }
//
////doubt
//    @Test
//    @DisplayName("add new books should throw exception when book title is null")
//    public void addNewBooksShouldThrowExceptionWhenBookTitleIsNull() {
//        StockManager stockManager = new StockManager(55555, "micky", "micky");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        try {
//            stockManager = stockManagerController.login(stockManager);
//
//            Book book = new Book(null, "Disney", 500.0, FICTION);
//            Integer quantity = 2;
//            BookStock bookStock = new BookStock(book, quantity);
//             Assertions.assertThrows(BookException.class, ()-> stockManagerController.addNewBooks(bookStock));
//
//        } catch (StockManagerException e) {
//             Assertions.fail("An unexpected exception was thrown: " + e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//
//        }
//    }
//
//
//
//    @Test
//    @DisplayName("add new books should throw exception when book author is null")
//    public void addNewBooksShouldThrowExceptionWhenBookAuthorIsNull() throws StockManagerException {
//        StockManager stockManager = new StockManager(66, "addy", "addy");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book("Rapunzel", null, 500.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        Integer adminId = null;
//        try {
//
//            bookStock = this.stockManagerController.addNewBooks(bookStock);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("book Author should not be null", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//            this.bookStockRepository.delete(bookStock);
//            this.bookRepository.delete(book);
//        }
//    }
//
//    @Test
//    @DisplayName("add new books should throw exception when book price is null")
//    public void addNewBooksShouldThrowExceptionWhenBookPriceIsNull() throws StockManagerException {
//        StockManager stockManager = new StockManager(77, "nully", "nully");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book("Rapunzel", "Disney", null, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerController.addNewBooks(bookStock);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("book Price should not be null", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//            this.bookStockRepository.delete(bookStock);
//            this.bookRepository.delete(book);
//        }
//    }
//
//
//    //update book
//
//    @Test
//    @DisplayName("update books should throw exception when Admin id is null")
//    public void updateBooksShouldThrowExceptionWhenAdminIdIsNull() throws StockManagerException {
//        Book book = new Book("greens", "Disney", 500.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerController.updateBook(bookStock);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("Admin not logged", e.getMessage());
//        }
//    }
//    @Test
//    @DisplayName("update books should throw exception when book title is null")
//    public void updateBooksShouldThrowExceptionWhenBookTitleIsNull() throws StockManagerException {
//        StockManager stockManager = new StockManager(10, "admin", "admin");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book(null, "Disney", 500.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerController.updateBook(bookStock);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("book Title should not be null", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//    @Test
//    @DisplayName("update books should throw exception when book author is null")
//    public void updateBooksShouldThrowExceptionWhenBookAuthorIsNull() throws StockManagerException {
//        StockManager stockManager = new StockManager(111, "john", "john");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book("Rapunzel", null, 500.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerController.updateBook(bookStock);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("book Author should not be null", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//    @Test
//    @DisplayName("update books should throw exception when book price is null")
//    public void updateBooksShouldThrowExceptionWhenBookPriceIsNull() throws StockManagerException {
//        StockManager stockManager = new StockManager(123, "india", "india");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book("Rapunzel", "Disney", null, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerController.updateBook(bookStock);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("book Price should not be null", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//
//    @Test
//    public void getBookById() throws StockManagerException, BookException {
//        StockManager stockManager = new StockManager(11148, "blue", "blue");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book("india", "india", 200.0, FICTION);
//        Integer quantity = 2;
//        Boolean result;
//        BookStock bookStock = new BookStock(book, quantity);
//        bookStock = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock);
//        bookStock = this.bookStockRepository.save(bookStock);
//        try {
//            this.stockManagerController.getBookById(book.getBookId());
//        }
//        catch (BookException e) {
//            Assertions.assertEquals(book.getBookTitle(), "india");
//        }
//    }
//
//    @Test
//    @DisplayName("get book by id should throw exception when admin id is null")
//     void getBookByIdShouldThrowExceptionWhenAdminIdIsNull() throws StockManagerException, BookException {
//        StockManager stockManager = new StockManager(null, "work", "work");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book("india", "india", 200.0, FICTION);
//        Integer quantity = 2;
//        Boolean result;
//        BookStock bookStock = new BookStock(book, quantity);
//        bookStock = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock);
//        bookStock = this.bookStockRepository.save(bookStock);
////        try {
////
////        }
//    }
//
//    //delete book by id
//
//    @Test
//    @DisplayName("delete book by id should throw exception when admin id is null")
//    public void deleteBookByIdShouldThrowExceptionWhenAdminIdIsNull() throws StockManagerException, BookException {
//        StockManager stockManager = new StockManager(9871, "slice", "slice");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book("india", "india", 200.0, FICTION);
//        Integer quantity = 2;
//        Boolean result;
//        BookStock bookStock = new BookStock(book, quantity);
//        bookStock = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock);
//        bookStock = this.bookStockRepository.save(bookStock);
//        try {
//            result = this.stockManagerController.deleteBook(bookStock.getBook().getBookId());
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("Admin not logged", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//
//    @Test
//    @DisplayName("delete book by id should throw exception when book name is null")
//    public void deleteBookByIdShouldThrowExceptionWhenBookIdIsNull() throws BookException, StockManagerException{
//       StockManager stockManager = new StockManager(77, "nully", "nully");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerController.login(stockManager);
//        Book book = new Book("Rapunzel", "Disney", null, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//              this.stockManagerController.deleteBook(null);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("Book id should not be null", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//
//    //display all books
//
//    @Test
//    @DisplayName("display All Books should throw exception when admin id is null")
//    public void displayAllBooksShouldThrowExceptionWhenAdminIdIsNull() {
//        try {
//            this.stockManagerController.getAllBooks();
//        }
//        catch (StockManagerException e) {
//            Assertions.assertEquals("Admin not logged", e.getMessage());
//        }
//    }
//
//  //  display all customers
//
//
//    @Test
//    @DisplayName("display all customers should throw exception when admin id is null")
//    public void displayAllCustomersShouldThrowExceptionWhenAdminIdIsNull() throws StockManagerException {
//        try {
//            this.stockManagerController.getAllCustomer();
//        }
//        catch (StockManagerException e) {
//            Assertions.assertEquals("Admin not logged", e.getMessage());
//        }
//    }
//
//
//
//
//
//
//}
