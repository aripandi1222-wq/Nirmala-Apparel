import { CartItem, CheckoutCustomer, Product, StoreInfo } from '../types';

export const STORE_INFO: StoreInfo = {
  nama: 'Nirmala Apparel & Batik',
  tagline: 'Busana Kasual & Etnik Elegan untuk Sehari-hari',
  deskripsi: 'Brand UMKM lokal asal Yogyakarta yang menghadirkan busana berbahan linen alami dan batik cap modern. Potongan timeless, sejuk di iklim tropis, dan ramah kantong.',
  whatsapp: '62882021480385',
  displayWhatsapp: '+62 882-0214-80385',
  alamat: 'Jl. Tirtodipuran No. 42, Mantrijeron, Kota Yogyakarta, D.I. Yogyakarta 55143',
  jamOperasional: 'Senin - Minggu: 09.00 - 20.30 WIB',
  instagram: '@nirmala.apparel',
  rekeningBank: [
    { bank: 'BCA', nomor: '8465-1122-33', atasNama: 'Nirmala Fashion Store' },
    { bank: 'Mandiri', nomor: '137-00-1928374-1', atasNama: 'Nirmala Fashion Store' },
    { bank: 'BRI', nomor: '0021-01-087654-50-9', atasNama: 'Nirmala Fashion Store' },
  ],
};

export const formatRupiah = (number: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number);
};

export const generateDirectWhatsAppUrl = (
  product: Product,
  selectedUkuran: string,
  selectedWarna: string,
  qty: number = 1
): string => {
  const total = product.harga * qty;
  const message = `Halo Admin *${STORE_INFO.nama}*, saya tertarik dan mau pesan langsung dari website:

*Rincian Produk:*
- Nama: ${product.nama}
- Ukuran: ${selectedUkuran}
- Warna: ${selectedWarna}
- Qty: ${qty} pcs
- Harga Satuan: ${formatRupiah(product.harga)}
- Subtotal: ${formatRupiah(total)}

Apakah stok varian ini masih tersedia? Boleh bantu info estimasi ongkir ke kota saya? Terima kasih!`;

  return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
};

export const generateCartWhatsAppUrl = (
  items: CartItem[],
  customer: CheckoutCustomer,
  totalPrice: number,
  totalWeightGram: number
): string => {
  const weightKg = (totalWeightGram / 1000).toFixed(1);

  const itemListText = items
    .map((item, idx) => {
      const subtotal = item.harga * item.qty;
      return `${idx + 1}. *${item.nama}*\n   - Varian: ${item.ukuran} | ${item.warna}\n   - Jumlah: ${item.qty} pcs x ${formatRupiah(item.harga)} = ${formatRupiah(subtotal)}`;
    })
    .join('\n\n');

  const customerText = `*DATA PENERIMA:*
- Nama Penerima: ${customer.nama || '-'}
- No. WhatsApp: ${customer.telepon || '-'}
- Kota / Kecamatan: ${customer.kotaKecamatan || '-'}
- Alamat Lengkap: ${customer.alamat || '-'}
${customer.catatan ? `- Catatan Khusus: ${customer.catatan}` : ''}
- Pilihan Pembayaran: ${customer.metodePembayaran}`;

  const message = `Halo Admin *${STORE_INFO.nama}*, saya ingin checkout pesanan belanja saya:

*DAFTAR PESANAN:*
${itemListText}

-----------------------------
*RINGKASAN:*
- Total Barang: ${items.reduce((acc, i) => acc + i.qty, 0)} pcs
- Total Berat: ~${totalWeightGram} gram (${weightKg} kg)
- *Total Harga: ${formatRupiah(totalPrice)}*
*(Belum termasuk ongkir)*

${customerText}

Mohon bantu hitungkan ongkir termurah & kirimkan info rekening pembayarannya ya min. Terima kasih!`;

  return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
};

export const generateGeneralInquiryWhatsAppUrl = (subject: string = 'Tanya Produk'): string => {
  const message = `Halo Admin *${STORE_INFO.nama}*, saya ingin bertanya seputar koleksi busana dan pemesanan di toko (${subject}). Boleh dibantu info lebih lanjut? Terima kasih.`;
  return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
};
