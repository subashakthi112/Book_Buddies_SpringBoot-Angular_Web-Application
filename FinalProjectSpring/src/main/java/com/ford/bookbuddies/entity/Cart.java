package com.ford.bookbuddies.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {
    @Id
    @GeneratedValue
    private Integer id;

    @OneToMany(fetch = FetchType.EAGER)
    private List<BookDetail> bookDetails = new ArrayList<>();


    //Constructors


    public Cart() {
    }
    public Cart(Integer id, List<BookDetail> bookDetails) {
        this.id = id;
        this.bookDetails = bookDetails;
    }
    public Cart(List<BookDetail> bookDetails) {
        this.bookDetails = bookDetails;
    }

    //getters and setters

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public List<BookDetail> getBooksDetails() {
        return bookDetails;
    }
    public void setBooksDetails(List<BookDetail> bookDetails) {
        this.bookDetails = bookDetails;
    }

}

