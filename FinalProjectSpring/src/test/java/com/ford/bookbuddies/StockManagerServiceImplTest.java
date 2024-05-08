//package com.ford.bookbuddies;
//
//import com.ford.bookbuddies.dao.BookRepository;
//import com.ford.bookbuddies.dao.BookStockRepository;
//import com.ford.bookbuddies.dao.CustomerRepository;
//import com.ford.bookbuddies.dao.StockManagerRepository;
//import com.ford.bookbuddies.entity.Book;
//import com.ford.bookbuddies.entity.BookStock;
//import com.ford.bookbuddies.entity.Customer;
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
//import java.util.List;
//
//import static com.ford.bookbuddies.entity.BookCategory.FICTION;
//
//@SpringBootTest
//public class StockManagerServiceImplTest {
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
//
//    @Test
//    public void loginTest() throws StockManagerException {
//        StockManager stockManager = new StockManager(2020, "query", "query");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Assertions.assertNotNull(stockManager);
//    }
//
//
//
//    @Test
//    @DisplayName("Login should throw exception when Stock manager not registered")
//    public void loginShouldThrowExceptionWhenStockManagerNotRegistered() throws StockManagerException {
//        try {
//            StockManager stockManager = stockManagerService.login("papaya", "papaya");
//        }
//        catch (StockManagerException e) {
//            Assertions.assertEquals("Admin is not registered", e.getMessage());
//        }
//    }
//
//    @Test
//    @DisplayName("Login should throw exception when password is incorrect")
//    public void loginShouldThrowExceptionWhenPasswordIsIncorrect() throws StockManagerException {
//        StockManager stockManager = new StockManager(1100, "music", "music");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        try {
//            stockManager = stockManagerService.login(stockManager.getName(), "password");
//        }
//        catch (StockManagerException e) {
//            Assertions.assertEquals("Incorrect password", e.getMessage());
//        }
//    }
//
//    @Test
//    public void addNewBooksTest() throws BookException, StockManagerException {
//        StockManager stockManager = new StockManager(44, "bob", "bob");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Book book = new Book("Rapunzel", "Disney", 500.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerService.addNewBooks(stockManager.getAdminId(), bookStock);
//            Assertions.assertNotNull(bookStock);
//        } catch (BookException | StockManagerException e) {
//            e.printStackTrace();
//        }
//        this.stockManagerRepository.delete(stockManager);
//    }
//
//
//
//
//    @Test
//    @DisplayName("add new books should throw exception when book price is less than zero")
//    public void addNewBooksShouldThrowExceptionWhenBookPriceIsLessThanZero() throws StockManagerException {
//        StockManager stockManager = new StockManager(88, "zero", "zero");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Book book = new Book("Rapunzel", "Disney", -10.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("book Price should not be less than zero", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//    //update book tests
//
//    @Test
//    public void updateBookTest() throws BookException, StockManagerException {
//        StockManager stockManager = new StockManager(99, "srock", "srock");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Book book = new Book("Rapunzel", "Disney", 500.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerService.updateBook(stockManager.getAdminId(),bookStock);
//            Assertions.assertNotNull(bookStock);
//        }
//        catch (BookException | StockManagerException e) {
//            e.printStackTrace();
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//
//
//
//    @Test
//    @DisplayName("update books should throw exception when book price is less than zero")
//    public void updateNewBooksShouldThrowExceptionWhenBookPriceIsLessThanZero() throws StockManagerException {
//        StockManager stockManager = new StockManager(113, "ids", "ids");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Book book = new Book("Rapunzel", "Disney", -10.0, FICTION);
//        Integer quantity = 2;
//        BookStock bookStock = new BookStock(book, quantity);
//        try {
//            bookStock = this.stockManagerService.updateBook(stockManager.getAdminId(),bookStock);
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("book Price should not be less than zero", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//
//    //delete books by name
//
//
//    @Test
//    public void deleteBookByNameTest() throws BookException, StockManagerException {
//        StockManager stockManager = new StockManager(29, "del", "del");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Book book = new Book("intel", "stock", 200.0, FICTION);
//        Integer quantity = 2;
//        Boolean result;
//        BookStock bookStock = new BookStock(book, quantity);
//        bookStock = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock);
//        bookStock = this.bookStockRepository.save(bookStock);
//        try {
//            result = this.stockManagerService.deleteBookByBookName(stockManager.getAdminId(), "intel");
//            Assertions.assertEquals(true, result);
//        }
//        catch (BookException | StockManagerException e) {
//            e.printStackTrace();
//        }
//    }
//
//
//
//
//    @Test
//    @DisplayName("delete boook by name should throw exception when book name is not present")
//    public void deleteBookByNameShouldThrowExceptionWhenBookNameIsNotPresent() throws StockManagerException, BookException {
//        StockManager stockManager = new StockManager(999, "present", "present");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//       Boolean result = null;
//        try {
//            result = this.stockManagerService.deleteBookByBookName(stockManager.getAdminId(), "tamilnadu");
//
//        }
//        catch (BookException | StockManagerException e) {
//            Assertions.assertEquals("Book is not present in the stocks to delete", e.getMessage());
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//    //display all books
//
//    @Test
//    public void displayAllBooksTest() throws BookException, StockManagerException {
//        StockManager stockManager = new StockManager(456, "display", "display");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Book book1 = new Book("book1", "book1", 200.0, FICTION);
//        Book book2 = new Book("book2", "book2", 200.0, FICTION);
//        Integer quantity = 2;
//        Boolean result;
//        BookStock bookStock1 = new BookStock(book1, quantity);
//        BookStock bookStock2 = new BookStock(book2, quantity);
//        bookStock1 = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock1);
//        bookStock2 = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock2);
//        bookStock1 = this.bookStockRepository.save(bookStock1);
//        bookStock2 = this.bookStockRepository.save(bookStock2);
//        List<BookStock> bookStockList = null;
//        try {
//            bookStockList = this.stockManagerService.displayAllBooks(stockManager.getAdminId());
//            Assertions.assertNotNull(bookStockList);
//        }
//        catch (StockManagerException e) {
//            e.printStackTrace();
//        }
//        finally {
//            this.stockManagerRepository.delete(stockManager);
//        }
//    }
//
//
//
//
//    // display all customers
//
//    @Test
//    public void displayAllCustomersTest() throws StockManagerException {
//        StockManager stockManager = new StockManager(689, "tester", "tester");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Customer customer = new Customer("customer", "customer@gmail.com", "customer", "customer", null);
//        customer = this.customerRepository.save(customer);
//        List<Customer> customerList = null;
//        try {
//            customerList = this.stockManagerService.displayAllCustomer(stockManager.getAdminId());
//            Assertions.assertNotNull(customerList);
//        }
//        catch (StockManagerException e) {
//            e.printStackTrace();
//        }
//    }
//
//
//
//    //view books count by name
//
//    @Test
//    public void viewBooksCountByNameTest() throws StockManagerException, BookException {
//        StockManager stockManager = new StockManager(1002, "house", "house");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Book book = new Book("black", "black", 200.0, FICTION);
//        Integer quantity = 20;
//        BookStock bookStock = new BookStock(book, quantity);
//        bookStock = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock);
//        bookStock = this.bookStockRepository.save(bookStock);
//        Integer count = null;
//        try {
//            count = this.stockManagerService.viewBooksCountByName(stockManager.getAdminId(), "black");
//            Assertions.assertEquals(count, quantity);
//        }
//        catch (StockManagerException e) {
//            e.printStackTrace();
//        }
//    }
//
//
//    @Test
//    @DisplayName("view book count by name should throw exception when book is not present")
//    public void viewBooksCountByNameShouldThrowExceptionWhenBookIsNotPresent() throws StockManagerException {
//        StockManager stockManager = new StockManager(2002, "counter", "counter");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        try {
//            this.stockManagerService.viewBooksCountByName(stockManager.getAdminId(), "bookname");
//        }
//        catch (StockManagerException | BookException e) {
//            Assertions.assertEquals("book is not present", e.getMessage());
//        }
//    }
//
//    //update books count by name test
//
//    @Test
//    public void updateBooksCountByNameTest() throws StockManagerException, BookException {
//        StockManager stockManager = new StockManager(8080, "viewer", "viewer");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        Book book = new Book("redbook", "red", 200.0, FICTION);
//        Integer quantity = 20;
//        BookStock bookStock = new BookStock(book, quantity);
//        bookStock = this.stockManagerService.addNewBooks(stockManager.getAdminId(),bookStock);
//        bookStock = this.bookStockRepository.save(bookStock);
//
//        try {
//            bookStock = this.stockManagerService.updateBookCountByName(stockManager.getAdminId(), book.getBookTitle(), quantity);
//            Assertions.assertNotNull(bookStock);
//        }
//        catch (StockManagerException e) {
//            e.printStackTrace();
//        }
//    }
//
//
//
//    @Test
//    @DisplayName("update book count by name should throw exception when book is not present")
//    public void updateBooksCountByNameShouldThrowExceptionWhenBookIsNotPresent() throws StockManagerException {
//        StockManager stockManager = new StockManager(2006, "bags", "bags");
//        stockManager = this.stockManagerRepository.save(stockManager);
//        stockManager = stockManagerService.login(stockManager.getName(), stockManager.getPassword());
//        try {
//            this.stockManagerService.updateBookCountByName(stockManager.getAdminId(), "apples", 20);
//        }
//        catch (StockManagerException | BookException e) {
//            Assertions.assertEquals("book is not present", e.getMessage());
//        }
//    }
//
//}
