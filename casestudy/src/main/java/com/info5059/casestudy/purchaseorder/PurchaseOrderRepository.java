package com.info5059.casestudy.purchaseorder;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
@RepositoryRestResource(collectionResourceRel = "purchaseorder", path = "purchaseorder")
public interface PurchaseOrderRepository extends CrudRepository<PurchaseOrder, Long> {
  // will return the number of rows deleted
  @Modifying
  @Transactional
  @Query("delete from PurchaseOrder where id = ?1")
  int deleteOne(Long purchaseOrderId);

  Optional<PurchaseOrder> findById(Long id);
  Optional<PurchaseOrder> getId();
  List<PurchaseOrder> findByVendorid(Long vendorid);

}
