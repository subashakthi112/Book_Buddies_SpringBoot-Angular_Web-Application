package com.ford.bookbuddies.service;

import com.ford.bookbuddies.entity.BookDetail;
import com.ford.bookbuddies.entity.Cart;
import com.ford.bookbuddies.exception.CustomerException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CartService {
    List<BookDetail> buyBooksinCart(Integer userId,List<Integer>list) throws Exception;
    Cart increaseQuantity(Integer userId, Integer bookId)throws Exception;
    Cart decreaseQuantity(Integer userId, Integer bookId)throws Exception;
}
