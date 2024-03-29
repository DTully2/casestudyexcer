package com.info5059.casestudy.purchaseorder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDAO purchaseDAO;
    @Autowired
    private PurchaseOrderRepository poRepository;


    @PostMapping("/api/purchaseorders")
    public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder clientrep) { // use RequestBody here
        return new ResponseEntity<PurchaseOrder>(purchaseDAO.create(clientrep), HttpStatus.OK);
    }

    @GetMapping("/api/pos")
    public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
        Iterable<PurchaseOrder> pos = poRepository.findAll();
        return new ResponseEntity<Iterable<PurchaseOrder>>(pos, HttpStatus.OK);
    }
     //added so that we can find the route to the report *THIS IS THE OTHER HALF OF CODE FOR REPORT RETURN*
     @GetMapping("/api/purchaseorders/{id}")
     public ResponseEntity<Iterable<PurchaseOrder>> findByEmployee(@PathVariable Long id) {
         return new ResponseEntity<Iterable<PurchaseOrder>>(poRepository.findByVendorid(id), HttpStatus.OK);
     }
}
