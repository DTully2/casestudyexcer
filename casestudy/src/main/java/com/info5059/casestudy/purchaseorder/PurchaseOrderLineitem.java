package com.info5059.casestudy.purchaseorder;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * purchase Order entity
 */
@Entity
@Data
@RequiredArgsConstructor

public class PurchaseOrderLineitem {
    // PurchaseOrderLineitem private members
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long poid;
    private String productid;
    private int qty;
    private BigDecimal price;
    private String productname;
    private BigDecimal amount;

}
