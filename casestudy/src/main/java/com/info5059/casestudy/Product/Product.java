package com.info5059.casestudy.Product;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 * Expense entity
 */
@Entity
@Data
@RequiredArgsConstructor
public class Product {
     @javax.persistence.Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private String id;
    private int vendorid;
    private String name;
    private BigDecimal costprice;
    private BigDecimal msrp;
    private int rop;
    private int eoq;
    private int qoh;
    private int qoo;
    private String dateincurred;

    public int getQoh() {
        return qoh;
      }
    
      public void setQoo(int qoo) {
        this.qoo = qoo;
      }
    
      @Basic(optional = true)
      @Lob
      private byte[] qrcode;
      @Basic(optional = true)
      private String qrcodetxt;
 }