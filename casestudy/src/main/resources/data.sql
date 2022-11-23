INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)VALUES ('123 Maple St','London','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('543 Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills Depot','bb@depot.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak St','London','On', 'N1N-1N1','(555)555-5599','Untrusted','Shady Sams','ss@underthetable.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('552 ProsOak St','London','On', 'N1N-3','(555)555-5511','Untrusted','Devon Tully','dt@underthetable.com');
-- add expense categories
INSERT INTO Product_Category (Id, Description) VALUES ('BSM','Business Meetings');
INSERT INTO Product_Category (Id, Description) VALUES ('ENT','Entertainment');
INSERT INTO Product_Category (Id, Description) VALUES ('PARK','Parking');
INSERT INTO Product_Category (Id, Description) VALUES ('LDG','Lodging');
INSERT INTO Product_Category (Id, Description) VALUES ('TRAV','Travel');
INSERT INTO Product_Category (Id, Description) VALUES ('MEAL','Meals');
INSERT INTO Product_Category (Id, Description) VALUES ('TUI','Tuition');
INSERT INTO Product_Category (Id, Description) VALUES ('MISC','Miscealleous');
INSERT INTO Product_Category (Id, Description) VALUES ('OTH','OTHER');
-- add some expenses to seed the table

INSERT INTO Product (id,VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
  VALUES ('XTX-441',1,'Shovel', 15.99, 19.99, 9.99, 11, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('XTSX-442',2,'Rake', 15.99, 19.99, 9.99, 12, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('12X45',4,'Hoe', 15.99, 19.99, 9.99, 13, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('14X45',4,'Wheelbarrow', 25.99, 32.99, 9.99, 14, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('XTX-445',4,'Garden Hose', 10.99, 19.99, 9.99, 15, 5, 50, '', '');
INSERT INTO Product (id,VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
  VALUES ('XTX-412',1,'Hammer', 15.99, 19.99, 9.99, 11, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('XTX-492',2,'Screwdriver', 15.99, 19.99, 9.99, 12, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('12X425',4,'Mallet', 15.99, 19.99, 9.99, 13, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('14X455',4,'Axe', 25.99, 32.99, 9.99, 14, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('XTX-4545',4,'Garden Plow', 10.99, 19.99, 9.99, 15, 5, 50, '', '');
    INSERT INTO Product (id,VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
  VALUES ('XTX-4413',1,'Saw', 15.99, 19.99, 9.99, 11, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('XTX-4412',2,'Scissors', 15.99, 19.99, 9.99, 12, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('122X45',4,'Chisel', 15.99, 19.99, 9.99, 13, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('C14X45',4,'Pliers', 25.99, 32.99, 9.99, 14, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('CXTX-445',4,'Drill', 10.99, 19.99, 9.99, 15, 5, 50, '', '');
    INSERT INTO Product (id,VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
  VALUES ('XTCX-441',1,'Tape measure', 15.99, 19.99, 9.99, 11, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('XTX-442',2,'Soldering iron', 15.99, 19.99, 9.99, 12, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('12X4445',4,'Chainsaw', 15.99, 19.99, 9.99, 13, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('114X45',4,'Nail gun', 25.99, 32.99, 9.99, 14, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('XTX-4415',4,'Plane', 10.99, 19.99, 9.99, 15, 5, 50, '', '');
    INSERT INTO Product (id,VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
  VALUES ('XTXX-441',1,'Scraper', 15.99, 19.99, 9.99, 11, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('XTTX-442',2,'Bradawl', 15.99, 19.99, 9.99, 12, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('12XT45',4,'Nail', 15.99, 19.99, 9.99, 13, 5, 50, '', '');
INSERT INTO Product (Id, VendorId, Name, CostPrice, Msrp, Rop, Eoq, Qoh, Qoo, Qrcode, QrCodeTxt)
    VALUES ('1S4X45',4,'Wire', 25.99, 32.99, 9.99, 14, 5, 50, '', '');
