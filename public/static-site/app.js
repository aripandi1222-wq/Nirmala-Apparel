/**
 * Nirmala Apparel - Vanilla JS Engine for GitHub Pages
 * Tanpa backend, 100% Client-side + WhatsApp Order Generator
 */

const STORE_CONFIG = {
  nama: 'Nirmala Apparel & Batik',
  whatsapp: '62882021480385', // Nomor WA Toko (format: 628xxx)
  cartKey: 'nirmala_static_cart_v1',
};

// Format Rupiah
function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num);
}

// LocalStorage Cart Manager
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORE_CONFIG.cartKey)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORE_CONFIG.cartKey, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach((b) => {
    b.textContent = totalQty;
    b.style.display = totalQty > 0 ? 'inline-block' : 'none';
  });
}

function addToCart(product, ukuran, warna, qty = 1) {
  const cart = getCart();
  const cartId = `${product.id}-${ukuran}-${warna}`;
  const existing = cart.find((i) => i.cartId === cartId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      cartId,
      id: product.id,
      nama: product.nama,
      harga: product.harga,
      ukuran: ukuran || product.ukuran[0],
      warna: warna || product.warna[0],
      qty: qty,
      foto: product.foto[0],
      berat: product.berat,
    });
  }

  saveCart(cart);
  alert(`✓ Berhasil menambahkan ${product.nama} (${ukuran}, ${warna}) ke keranjang belanja!`);
}

// Generate Direct WhatsApp URL for 1 product
function orderProductViaWA(nama, ukuran, warna, harga) {
  const text = `Halo Admin *${STORE_CONFIG.nama}*, saya mau pesan produk ini langsung:\\n- Nama: ${nama}\\n- Ukuran: ${ukuran}\\n- Warna: ${warna}\\n- Harga: ${formatRupiah(harga)}\\n\\nApakah masih tersedia stoknya min?`;
  window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
}

// Generate WhatsApp Checkout from Cart
function checkoutCartViaWA(customerData) {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Keranjang belanja Anda masih kosong!');
    return;
  }

  let totalHarga = 0;
  let totalBerat = 0;

  const itemsText = cart
    .map((item, idx) => {
      const subtotal = item.harga * item.qty;
      totalHarga += subtotal;
      totalBerat += (item.berat || 250) * item.qty;
      return `${idx + 1}. *${item.nama}*\n   - Varian: ${item.ukuran} | ${item.warna}\n   - Qty: ${item.qty} pcs x ${formatRupiah(item.harga)} = ${formatRupiah(subtotal)}`;
    })
    .join('\n\n');

  const pesan = `Halo Admin *${STORE_CONFIG.nama}*, saya ingin checkout pesanan:\\n\\n*DAFTAR PESANAN:*\\n${itemsText}\\n\\n-----------------------------\\n*Total Belanja: ${formatRupiah(totalHarga)}*\\n*Estimasi Berat: ~${totalBerat} gram*\\n*(Belum termasuk ongkir)*\\n\\n*DATA PENERIMA:*\\n- Nama: ${customerData.nama || '-'}\\n- No. WhatsApp: ${customerData.telepon || '-'}\\n- Kota/Kecamatan: ${customerData.kota || '-'}\\n- Alamat Lengkap: ${customerData.alamat || '-'}\\n- Pembayaran: ${customerData.pembayaran || 'Transfer Bank'}\\n\\nMohon info ongkos kirim dan nomor rekening pembayarannya ya min. Terima kasih!`;

  window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(pesan)}`, '_blank');
}

// Initialize Badge on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
