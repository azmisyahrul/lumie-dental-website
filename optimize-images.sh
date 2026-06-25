#!/bin/bash
# Script untuk optimasi gambar Lumie Dental
# Jalankan script ini untuk mengompres semua gambar

echo "🖼️  Memulai optimasi gambar..."

# Buat folder untuk gambar yang sudah dioptimasi
mkdir -p images/optimized

# Loop melalui semua file gambar
for img in images/*.png images/*.jpg images/*.jpeg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "Processing: $filename"
        
        # Kompres gambar (gunakan ImageMagick jika tersedia)
        if command -v convert &> /dev/null; then
            convert "$img" -quality 80 -resize '1200x1200>' "images/optimized/$filename"
            echo "  ✅ Compressed: $filename"
        else
            echo "  ⚠️  ImageMagick not found, skipping compression"
        fi
        
        # Konversi ke WebP jika memungkinkan
        if command -v cwebp &> /dev/null; then
            cwebp -q 80 "$img" -o "images/optimized/${filename%.*}.webp"
            echo "  ✅ Converted to WebP: ${filename%.*}.webp"
        fi
    fi
done

echo ""
echo "📋 Ringkasan:"
echo "  - Gambar asli: $(ls images/*.png images/*.jpg images/*.jpeg 2>/dev/null | wc -l) file"
echo "  - Gambar dioptimasi: $(ls images/optimized/* 2>/dev/null | wc -l) file"
echo ""
echo "💡 Tips:"
echo "  1. Gunakan gambar WebP untuk performa terbaik"
echo "  2. Tambahkan loading='lazy' pada semua tag img"
echo "  3. Gunakan atribut width dan height untuk mencegah layout shift"
