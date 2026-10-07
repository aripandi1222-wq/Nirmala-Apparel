import React, { useState } from 'react';
import { X, Copy, Check, FileCode, CheckCircle, ExternalLink, Terminal } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface GitHubPagesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesExportModal: React.FC<GitHubPagesExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState<'struktur' | 'products' | 'wa' | 'deploy'>('struktur');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedCode(true);
    showToast('✓ Kode berhasil disalin ke clipboard');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const jsonSnippet = `[
  {
    "id": "prod-01",
    "nama": "Kemeja Linen Oversized Earth Sage",
    "harga": 165000,
    "kategori": "Atasan",
    "ukuran": ["All Size", "M", "L", "XL"],
    "warna": ["Sage Green", "Warm Ivory", "Olive Earth"],
    "deskripsi": "Kemeja santai loose-fit berbahan 100% linen alami adem.",
    "berat": 260,
    "foto": ["/images/kemeja_linen.jpg"],
    "stok": 18,
    "badge": "Terlaris"
  }
]`;

  const waSnippet = `// Fungsi Generate WhatsApp Otomatis (Vanilla JS)
function checkoutWhatsApp(items, customer, totalHarga) {
  const nomorWA = "62882021480385"; // Ganti dengan nomor WhatsApp Toko Anda
  
  let rincian = items.map((item, i) => {
    return \`\${i + 1}. \${item.nama} (\${item.ukuran}, \${item.warna}) x \${item.qty} = Rp \${(item.harga * item.qty).toLocaleString('id-ID')}\`;
  }).join('\\n');

  let pesan = \`Halo Admin, saya mau pesan:\\n\\n\${rincian}\\n\\n*Total: Rp \${totalHarga.toLocaleString('id-ID')}*\\n\\n*Penerima:* \${customer.nama} (\${customer.telepon})\\n*Alamat:* \${customer.alamat}\`;

  window.open(\`https://wa.me/\${nomorWA}?text=\${encodeURIComponent(pesan)}\`, '_blank');
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              Panduan Arsitektur & Deploy GitHub Pages
            </h2>
            <p className="text-xs text-stone-500">
              100% Statis tanpa server/database · Bebas biaya hosting · Checkout via WhatsApp
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-5 text-xs font-semibold text-stone-600 gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('struktur')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'struktur'
                ? 'border-stone-900 text-stone-900 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            1. Struktur Folder
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'border-stone-900 text-stone-900 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            2. Skema products.json
          </button>
          <button
            onClick={() => setActiveTab('wa')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'wa'
                ? 'border-stone-900 text-stone-900 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            3. Logika WhatsApp URL
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'deploy'
                ? 'border-stone-900 text-stone-900 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            4. Cara Deploy (3 Langkah)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 text-xs text-stone-700 space-y-4">
          {activeTab === 'struktur' && (
            <div className="space-y-4">
              <div className="bg-stone-900 text-stone-200 p-4 rounded-xl font-mono text-[11px] leading-relaxed">
                <p className="text-amber-400 font-bold mb-2"># Struktur File Statis Siap Deploy ke GitHub Pages:</p>
                <p>├── index.html          # Beranda & hero banner promo</p>
                <p>├── katalog.html        # Katalog produk + filter search client-side</p>
                <p>├── keranjang.html      # Keranjang localStorage & Checkout WA</p>
                <p>├── tentang.html        # Profil toko & bukti kredibilitas UMKM</p>
                <p>├── kontak.html         # Info lokasi, jam buka & rekening bank</p>
                <p>├── products.json       # Database lokal (edit di sini untuk update stok)</p>
                <p>├── css/</p>
                <p>│   └── style.css       # Styling responsif & warna brand</p>
                <p>├── js/</p>
                <p>│   ├── app.js          # Fetch products.json & render grid</p>
                <p>│   └── cart.js         # Logika keranjang & link wa.me</p>
                <p>└── images/            # Foto produk (.jpg, .webp)</p>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Keunggulan Arsitektur Statis untuk UMKM:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-stone-600 pl-1">
                  <li><strong>0 Biaya Server:</strong> Hosting 100% gratis selamanya di GitHub Pages.</li>
                  <li><strong>Update Sangat Mudah:</strong> Admin toko cukup edit file <code>products.json</code> dan upload ke repositori GitHub.</li>
                  <li><strong>Keamanan Maksimal:</strong> Tidak ada database MySQL yang bisa diretas karena semua client-side.</li>
                  <li><strong>Tanpa Biaya Admin Payment Gateway:</strong> Semua pembayaran langsung ditransfer ke rekening bank pribadi / QRIS toko via WhatsApp.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">Format Data Produk (products.json):</span>
                <button
                  type="button"
                  onClick={() => copyText(jsonSnippet)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded border border-stone-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Contoh JSON</span>
                </button>
              </div>

              <pre className="bg-stone-900 text-emerald-400 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                {jsonSnippet}
              </pre>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-900">
                <strong>Tips Admin:</strong> Untuk menambah produk baru, cukup tambahkan objek baru di dalam tanda kurung siku <code>[ ... ]</code> dengan ID unik seperti <code>prod-02</code>, tentukan kategori dan upload foto ke folder <code>images/</code>.
              </div>
            </div>
          )}

          {activeTab === 'wa' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">Kode Generator WhatsApp URL:</span>
                <button
                  type="button"
                  onClick={() => copyText(waSnippet)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded border border-stone-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Kode JS</span>
                </button>
              </div>

              <pre className="bg-stone-900 text-amber-300 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                {waSnippet}
              </pre>

              <p className="text-stone-600">
                Pesan akan langsung terbuka di aplikasi WhatsApp pelanggan di HP atau WhatsApp Web di PC tanpa perlu perantara server.
              </p>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Buat Repositori di GitHub</h4>
                    <p className="text-stone-600 mt-0.5">
                      Buat repository baru di <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-semibold">github.com/new</a> (misalnya bernama <code>toko-baju-nirmala</code>).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Push File ke Branch Main</h4>
                    <p className="text-stone-600 mt-0.5">
                      Upload semua file HTML, CSS, JS, dan <code>products.json</code> ke branch <code>main</code> di repositori tersebut.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Aktifkan GitHub Pages</h4>
                    <p className="text-stone-600 mt-0.5">
                      Buka tab <strong>Settings</strong> di repositori &rarr; Pilih menu <strong>Pages</strong> di sidebar &rarr; Pada bagian <em>Branch</em>, pilih <strong>main</strong> / root &rarr; Klik <strong>Save</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  Website Siap Diakses!
                </div>
                <p className="text-[11px]">
                  Dalam 1-2 menit, toko online Anda aktif di link <code>https://username.github.io/toko-baju-nirmala</code> dan dapat dibagikan langsung di bio Instagram atau status WhatsApp.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-[#FAF9F5] flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            Nirmala Apparel UMKM · Static Web Architecture
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
