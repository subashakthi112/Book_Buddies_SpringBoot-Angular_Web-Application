package com.ford.bookbuddies.service;

import com.ford.bookbuddies.dto.ConfirmedBooksDto;
import com.ford.bookbuddies.dto.TransactionDetails;
import com.ford.bookbuddies.entity.Payment;
import com.ford.bookbuddies.exception.PaymentException;
import com.ford.bookbuddies.exception.SubscriptionException;
import com.razorpay.Order;
//import com.razorpay.RazorpayException;

public interface PaymentService {

    TransactionDetails createTransaction(Payment payment) throws Exception;

    //    public TransactionDetails createTransaction(Double amount);
//
    public TransactionDetails prepareTransactionDetails(Order order);
    TransactionDetails createTransactionForSubscription(Integer subscriptionId);




}
