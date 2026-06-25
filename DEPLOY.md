# Lumie Dental Website

## Deployment ke lumiedental.id

### Option 1: Cloudflare Pages (Recommended)

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih domain **lumiedental.id**
3. Menu: **Workers & Pages** → **Create** → **Pages**
4. Pilih **Upload assets**
5. Upload folder `lumie-dental-deploy/` (atau drag & drop)
6. Klik **Deploy**
7. Domain otomatis terhubung karena udah di Cloudflare

### Option 2: Manual Upload via FTP/SFTP

1. Login ke hosting panel (cPanel/Plesk)
2. Buka File Manager
3. Upload semua file ke folder `public_html/`
4. Pastikan `index.html` ada di root

### Option 3: GitHub Pages + Cloudflare

1. Push code ke GitHub repo
2. Settings → Pages → Source: Deploy from branch
3. Di Cloudflare: DNS → CNAME → `username.github.io`

## File Structure

```
lumie-dental-deploy/
├── index.html      # Main page
├── CNAME           # Domain config
├── css/
│   └── style.css   # Styles
└── js/
    └── main.js     # JavaScript
```

## Update Content

Edit `index.html` untuk mengubah:
- Konten teks
- Nomor WhatsApp
- Alamat
- Jam operasional
- Testimoni

## Contact

- WhatsApp: 0851-2137-0882
- Instagram: @lumiedental
