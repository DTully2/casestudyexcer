package com.info5059.casestudy.purchaseorder;

import com.info5059.casestudy.purchaseorder.PurchaseOrderLineitem;
import com.info5059.casestudy.Product.Product;
import com.info5059.casestudy.Product.ProductRepository;
import com.info5059.casestudy.vendor.Vendor;
import com.info5059.casestudy.vendor.VendorRepository;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.URL;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * ReportPDFGenerator - a class for creating dynamic expense report output in
 * PDF format using the iText 7 library
 *
 * 
 */
public abstract class PurchasePDFGenerator extends AbstractPdfView {
        public static ByteArrayInputStream generateReport(String po,
                        PurchaseOrderRepository purchaseOrderRepository,
                        VendorRepository vendorRepository,
                        ProductRepository productRepository)
                        throws IOException {
                URL imageUrl = PurchasePDFGenerator.class.getResource("/static/images/buddy.png");
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                PdfWriter writer = new PdfWriter(baos);
                // Initialize PDF document to be written to a stream not a file
                PdfDocument pdf = new PdfDocument(writer);
                // Document is the main object
                Document document = new Document(pdf);
                PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
                // add the image to the document
                PageSize pg = PageSize.A4;
                Image img = new Image(ImageDataFactory.create(imageUrl)).scaleAbsolute(170, 105)
                                .setFixedPosition(pg.getWidth() / 2 - 250,700);
                document.add(img);
                // now let's add a big heading
                document.add(new Paragraph("\n\n"));
                Locale locale = new Locale("en", "US");
                NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
                try {
                        document.add(new Paragraph("\n"));
                        Optional<PurchaseOrder> optReport = purchaseOrderRepository.findById(Long.parseLong(po));
                        if (optReport.isPresent()) {
                                PurchaseOrder report = optReport.get();
                                document.add(new Paragraph("Purchase Order #: " + po).setFont(font).setFontSize(18)
                                                .setBold()
                                                .setMarginRight(pg.getWidth() / 4 - 75).setMarginTop(-10)
                                                .setTextAlignment(TextAlignment.RIGHT));
                                ;
                                Vendor emp = vendorRepository.findById(report.getVendorid()).get();
                                document.add(new Paragraph("\n\n"));
                                // now let's add a big heading
                                document.add(new Paragraph("\n\n"));
                                Table empTable = new Table(2);
                                Cell cellEmpHeader = new Cell().add(new Paragraph("Vendor:"))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.CENTER);
                                empTable.addCell(cellEmpHeader);

                                cellEmpHeader = new Cell().add(new Paragraph(emp.getName()))

                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                .setTextAlignment(TextAlignment.LEFT);
                                empTable.addCell(cellEmpHeader);
                                cellEmpHeader = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));

                                empTable.addCell(cellEmpHeader);
                                cellEmpHeader = new Cell().add(new Paragraph(emp.getAddress1()))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                .setTextAlignment(TextAlignment.LEFT);
                                empTable.addCell(cellEmpHeader);
                                cellEmpHeader = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                empTable.addCell(cellEmpHeader);

                                cellEmpHeader = new Cell().add(new Paragraph(emp.getCity()))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                .setTextAlignment(TextAlignment.LEFT);
                                empTable.addCell(cellEmpHeader);
                                cellEmpHeader = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                empTable.addCell(cellEmpHeader);
                                cellEmpHeader = new Cell().add(new Paragraph(emp.getProvince()))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                .setTextAlignment(TextAlignment.LEFT);
                                empTable.addCell(cellEmpHeader);
                                cellEmpHeader = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                empTable.addCell(cellEmpHeader);
                                cellEmpHeader = new Cell().add(new Paragraph(emp.getEmail()))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setBackgroundColor(ColorConstants.LIGHT_GRAY)
                                                .setTextAlignment(TextAlignment.LEFT);
                                empTable.addCell(cellEmpHeader);
                                cellEmpHeader = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                empTable.addCell(cellEmpHeader);
                                document.add(empTable);

                                document.add(new Paragraph("\n\n"));
                                // now a 3 column table
                                Table table = new Table(5);
                                table.setWidth(new UnitValue(UnitValue.PERCENT, 100));
                                // Unfortunately we must format each cell individually :(
                                // table headings
                                Cell cell = new Cell().add(new Paragraph("Id")
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph("Description")
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph("QTY Sold")
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph("Price")
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph("Ext. Price")
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold())
                                                .setTextAlignment(TextAlignment.CENTER);
                                table.addCell(cell);
                                // table details

                                // table total
                                BigDecimal potot = new BigDecimal(0.0);
                                BigDecimal subtot = new BigDecimal(0.0);
                                BigDecimal tax = new BigDecimal(0.0);

                                // dump out the line items
                                for (PurchaseOrderLineitem line : report.getItems()) {
                                        Optional<Product> optx = productRepository.findById(line.getProductid());
                                        if (optx.isPresent()) {
                                                Product product = optx.get();

                                                cell = new Cell().add(new Paragraph((product.getId())))
                                                                .setFont(font)
                                                                .setFontSize(12)
                                                                .setTextAlignment(TextAlignment.CENTER);
                                                table.addCell(cell);
                                                cell = new Cell().add(new Paragraph(product.getName())
                                                                .setFont(font)
                                                                .setFontSize(12)
                                                                .setTextAlignment(TextAlignment.CENTER));
                                                table.addCell(cell);
                                                cell = new Cell().add(new Paragraph(Integer.toString(line.getQty()))
                                                                .setFont(font)
                                                                .setFontSize(12)
                                                                .setTextAlignment(TextAlignment.RIGHT));
                                                table.addCell(cell);
                                                BigDecimal productAmount = product.getCostprice();
                                                cell = new Cell().add(new Paragraph(formatter.format(productAmount))
                                                                .setFont(font)
                                                                .setFontSize(12)
                                                                .setTextAlignment(TextAlignment.RIGHT));
                                                table.addCell(cell);
                                                BigDecimal TotalAmount = product.getCostprice();
                                                BigDecimal extotal = TotalAmount.multiply(new BigDecimal(line.getQty()));
                                                BigDecimal subtotal = extotal.multiply(new BigDecimal(line.getQty()));

                                                cell = new Cell().add(new Paragraph(formatter.format(extotal))
                                                                .setFont(font)
                                                                .setFontSize(12)
                                                                .setTextAlignment(TextAlignment.RIGHT));
                                                table.addCell(cell);

                                                // potot = potot.add(product.getCostprice(),
                                                //                 new MathContext(8, RoundingMode.UP)) ;

                                                // tax= extotal.multiply(new BigDecimal(0.13));
                                                
                                                subtot = subtot.add(extotal, new MathContext(8, RoundingMode.UP));
                                                
                                        }
                                        tax= subtot.multiply(new BigDecimal(0.13));
                                        potot = subtot.add(tax, new MathContext(8, RoundingMode.UP));
                                }

                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph("Sub Total:")
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.RIGHT));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph(formatter.format(subtot))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.RIGHT)
                                                );
                                table.addCell(cell);
                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph("Tax:")
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.RIGHT));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph(formatter.format(tax))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.RIGHT));
                                                
                                table.addCell(cell);
                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().setBorder(Border.NO_BORDER).add(new Paragraph(""));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph("PO Total:")
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setBorder(Border.NO_BORDER)
                                                .setTextAlignment(TextAlignment.RIGHT));
                                table.addCell(cell);
                                cell = new Cell().add(new Paragraph(formatter.format(potot))
                                                .setFont(font)
                                                .setFontSize(12)
                                                .setBold()
                                                .setTextAlignment(TextAlignment.RIGHT)
                                                .setBackgroundColor(ColorConstants.YELLOW));
                                table.addCell(cell);
                                document.add(table);
                                document.add(new Paragraph("\n\n"));
                                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd h:mm a");
                                document.add(new Paragraph(dateFormatter.format(LocalDateTime.now()))
                                                .setTextAlignment(TextAlignment.CENTER));
                                document.close();
                        } // end if
                } catch (Exception ex) {
                        Logger.getLogger(PurchasePDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
                }
                // finally send stream back to the controller
                return new ByteArrayInputStream(baos.toByteArray());
        }
}