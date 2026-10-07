# Panduan Website Toko Baju Online UMKM (GitHub Pages Ready)

Website toko baju online statis tanpa server atau database backend. Semua pembayaran dan konfirmasi pemesanan diarahkan secara manual ke WhatsApp toko melalui generate link `wa.me` otomatis.

## Struktur File Statis
```
/
├── index.html          # Halaman Beranda (Hero, Kategori, Produk Unggulan)
├── katalog.html        # Halaman Katalog (Filter Kategori & Search JS Instan)
├── keranjang.html      # Keranjang Belanja (localStorage & Checkout WA)
├── tentang.html        # Profil Toko & Trust Signals
├── kontak.html         # Info Lokasi, Jam Buka & Rekening Bank
├── products.json       # Database Lokal Produk
├── style.css           # Styling Responsif (Mobile-first)
├── app.js              # Logika JS (Cart, Filter, URL WhatsApp)
└── images/             # Folder Foto Produk (.jpg, .webp)
```

## Cara Menambah / Mengubah Produk
Cukup buka file `products.json` menggunakan text editor (Notepad, VS Code, dll). Setiap produk memiliki format:
```json
{
  "id": "prod-05",
  "nama": "Outer Kimono Tenun Santai",
  "harga": 195000,
  "kategori": "Atasan",
  "ukuran": ["All Size"],
  "warna": ["Earthy Brown", "Navy Indigo"],
  "deskripsi": "Outer kimono santai berbahan tenun etnik katun adem.",
  "berat": 280,
  "foto": ["/images/outer_kimono.jpg"],
  "stok": 10,
  "badge": "Baru"
}
```
Setelah diedit, simpan file dan lakukan push/upload kembali ke repositori GitHub. Website akan langsung terupdate!

## Cara Deploy ke GitHub Pages (Gratis)
1. Buat repositori baru di GitHub (misal: `toko-baju-nirmala`).
2. Upload semua file di folder ini ke repositori Anda di branch `main`.
3. Buka menu **Settings** > **Pages** di repositori GitHub.
4. Pada opsi **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1-2 menit, website Anda sudah aktif di:
   `https://[username].github.io/toko-baju-nirmala/`
