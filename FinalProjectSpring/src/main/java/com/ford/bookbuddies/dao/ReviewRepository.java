package com.ford.bookbuddies.dao;

import com.ford.bookbuddies.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

//    Optional<Review> findByBookId(Integer bookId);

//    Optional<Review> findByCustomerId(Integer customerId);
}


