# Portfolio Web — Aufa Alqowiy

## Struktur folder

```
portfolio-web/
├── src/
│   ├── index.html            ← TEMPLATE halaman utama (edit di sini)
│   ├── projects/              ← TEMPLATE halaman detail tiap project (edit di sini)
│   │   ├── klinik.html
│   │   ├── skripsi.html
│   │   ├── desain-grafis.html
│   │   ├── notes-app.html
│   │   ├── sipaduko.html
│   │   └── sertifikat.html
│   └── input.css              ← source CSS Tailwind (jangan diedit isi @tailwind-nya)
├── partials/                  ← potongan HTML yang dipakai bareng banyak halaman
│   ├── nav-home.html          ← nav khusus index.html
│   ├── nav-project.html       ← nav khusus halaman di projects/
│   └── footer.html            ← footer, sama untuk semua halaman
├── scripts/
│   └── build-html.js          ← script yang "merakit" src/*.html + partials/*.html
├── index.html                 ← HASIL BUILD, JANGAN diedit manual (akan tertimpa)
├── projects/                  ← HASIL BUILD, JANGAN diedit manual (akan tertimpa)
├── images/                    ← taruh screenshot/video di sini, per folder project
│   ├── klinik/
│   ├── skripsi/
│   ├── desain-grafis/
│   ├── notes-app/
│   ├── sipaduko/
│   └── sertifikat/
├── dist/output.css            ← hasil build Tailwind, di-generate otomatis, JANGAN diedit manual
├── tailwind.config.js
└── package.json
```

**Penting:** mulai sekarang, edit HTML di **`src/index.html`** dan **`src/projects/*.html`**, BUKAN di `index.html`/`projects/*.html` yang di root — file-file di root itu sekarang hasil generate otomatis dan akan tertimpa tiap kali kamu build.

## Setup pertama kali (di komputer kamu)

1. Install [Node.js](https://nodejs.org/) (LTS) kalau belum ada.
2. Extract/copy folder `portfolio-web` ini ke `C:\Users\aufaa\Documents\VSCode\portfolio-web`.
3. Buka folder itu di VSCode, lalu buka terminal (`` Ctrl+` ``).
4. Jalankan:
   ```
   npm install
   ```
   Ini akan men-download Tailwind CSS ke folder `node_modules` (folder ini besar, jangan di-commit ke git — sudah di-exclude lewat `.gitignore`).

## Waktu ngedit (development)

Setiap kali kamu mengubah file di `src/` (HTML atau CSS), kamu perlu build ulang supaya perubahannya masuk ke `index.html`/`projects/*.html`/`dist/output.css` yang sebenarnya dibuka browser. Ada 2 cara:

**A. Build sekali aja setelah selesai edit:**
```
npm run build
```
Ini menjalankan 2 langkah sekaligus: `build:html` (merakit `src/**/*.html` + `partials/*.html` jadi `index.html`/`projects/*.html`) lalu `build:css` (compile Tailwind).

**B. Auto build CSS tiap kali file disimpan (disarankan saat sedang aktif ngedit class Tailwind):**
```
npm run watch
```
Catatan: `watch` di atas cuma mem-build ulang CSS otomatis. Kalau kamu mengedit HTML (termasuk isi `partials/`), tetap jalankan `npm run build:html` (atau `npm run build`) manual sebelum refresh browser.

Setelah build, buka `index.html` (yang di root, hasil generate) di browser — klik kanan → Open with Live Server, atau pakai extension "Live Server" di VSCode supaya auto-refresh.

## Nav & footer sekarang cuma diedit di satu tempat

`nav-home.html`, `nav-project.html`, dan `footer.html` di folder `partials/` masing-masing cuma ada **satu kali**, dan dipakai bareng oleh semua halaman lewat penanda `<!-- @include: partials/nama-file.html -->` di `src/index.html` dan `src/projects/*.html`.

Jadi kalau mau ubah footer (ganti link sosial media, ganti versi, dll), cukup edit `partials/footer.html` **satu kali**, lalu jalankan `npm run build:html` — otomatis ke-apply ke `index.html` dan ke-6 halaman project sekaligus. Tidak perlu lagi copy-paste manual ke tiap file.

## Cara mengganti placeholder gambar/video

Setiap halaman project punya kotak putus-putus (dashed border) bertuliskan lokasi file yang harus diisi, contoh:

```html
<div class="w-full aspect-video border border-dashed border-white/20 flex items-center justify-center bg-white/5">
  <p class="caption text-white/50 text-center px-4">Ganti dengan screenshot: images/klinik/fitur-1.jpg</p>
</div>
```

Ganti seluruh `<div>` itu dengan tag `<img>` atau `<video>`, contoh:

```html
<!-- untuk gambar -->
<img src="../images/klinik/fitur-1.jpg" alt="Fitur 1" class="w-full aspect-video object-cover">

<!-- untuk video -->
<video src="../images/klinik/demo.mp4" class="w-full aspect-video object-cover" autoplay loop muted playsinline></video>
```

Taruh file gambar/video-nya di folder `images/<nama-project>/` yang sesuai.

## Menambah project baru di masa depan

1. Copy salah satu file di `src/projects/*.html` sebagai starting point (bukan `projects/*.html` di root — itu hasil build).
2. Ubah judul, deskripsi, role/tools, dan ganti placeholder gambar.
3. Tambahkan kartu baru di `src/index.html` bagian `<!-- Column 1/2/3 -->` yang meng-link ke file baru itu.
4. Jalankan `npm run build` supaya HTML dirakit ulang dan CSS baru ter-compile.

## Ukuran thumbnail grid (organik, bukan seragam)

Tiap kartu project di `index.html` punya class ukuran sendiri di div `.thumb`, misalnya `aspect-[4/3]`, `aspect-[3/4]`, atau `aspect-video`. Ini sengaja dibuat bervariasi supaya grid terlihat organik seperti joseph.cv, bukan kotak-kotak seragam.

Waktu kamu ganti placeholder jadi gambar asli, ada 2 pilihan:

1. **Pertahankan aspect ratio yang sudah diset** — cukup taruh `<img class="w-full h-full object-cover">` di dalam div `.thumb` yang sudah ada class aspect-nya.
2. **Biarkan mengikuti rasio asli gambar** (seperti joseph.cv aslinya) — hapus class `aspect-[...]` dari div `.thumb`, lalu pakai `<img>` biasa dengan atribut `width` dan `height` sesuai file aslinya dan class `w-full h-auto` (tanpa `object-cover`). Tinggi kotak akan otomatis menyesuaikan gambar.

Kolom grid (flex kolom kiri/tengah/kanan) memang akan punya tinggi total yang beda-beda antar kolom — ini normal dan sama seperti joseph.cv, tidak perlu dirapikan/disamakan.

## Catatan perubahan dari file lama kamu

- Jarak antar grid project dirapatkan (gap 1rem → 0.75rem), dan spasi antara thumbnail-judul-caption diperkecil.
- Semua thumbnail project punya rasio ukuran yang bervariasi per project (kotak, landscape, portrait) mengikuti gaya joseph.cv yang organik — bukan seragam kaku.
- Label pojok kanan bawah tiap thumbnail ("Kuliah", "Flutter", "Magang", dll) sudah dihapus.
- Footer sekarang pakai `sticky bottom-0` (nempel di bawah viewport saat discroll, sama seperti referensi joseph.cv), dan sudah konsisten diterapkan di `index.html` maupun semua halaman `projects/*.html` lewat `partials/footer.html`.
- Project "Aplikasi Bisnis Percetakan" dihapus, dan 2 project analisis sentimen digabung jadi 1 (skripsi).
- Ditambahkan project baru "Sertifikat & Pelatihan".
- Project "Ramah Tamah" tampil di grid tapi belum bisa diklik (status "In Progress") karena belum dikerjakan.
