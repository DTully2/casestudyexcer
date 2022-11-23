export interface Product {
  id: number;
  vendorid: number;
  name: string;
  costprice: number;
  msrp: number;
  rop: number;
  eoq: number;
  qoh: number;
  qoo: number;
  qty?: number;
  qrcode: string;
  qrcodetxt: string;
  dateincurred?: string;
  products?: Product[] | null;
  // receipt: boolean;
  // receiptscan: string | null | ArrayBuffer;
}
