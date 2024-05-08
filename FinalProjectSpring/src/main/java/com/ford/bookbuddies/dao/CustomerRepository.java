package com.ford.bookbuddies.dao;

import com.ford.bookbuddies.entity.Book;
import com.ford.bookbuddies.entity.BookDetail;
import com.ford.bookbuddies.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByUserName(String userName);
    Optional<Customer> findByEmail(String email);

    Optional<Customer> findById(Integer id);

}
 