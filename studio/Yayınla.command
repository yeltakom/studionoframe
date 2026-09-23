#!/bin/bash
# Klasörler → site → yayın. Çift tıkla.
cd "$(dirname "$0")/.."
echo "Studio No Frame — yayınlanıyor"
echo
if bash tools/publish.sh "İçerik güncellendi"; then
  echo
  read -n 1 -s -r -p "Tamam. Kapatmak için bir tuşa bas."
else
  echo
  read -n 1 -s -r -p "Bir sorun çıktı (yukarıda yazıyor). Kapatmak için bir tuşa bas."
fi
