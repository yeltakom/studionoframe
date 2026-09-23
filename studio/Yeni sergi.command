#!/bin/bash
# Yeni bir sergi klasörü açar. Çift tıkla, adı yaz.
cd "$(dirname "$0")/.."
name=$(osascript -e 'text returned of (display dialog "Yeni serginin adı:" default answer "" with title "Studio No Frame" buttons {"Vazgeç", "Aç"} default button "Aç")' 2>/dev/null) || exit 0
[ -z "$name" ] && exit 0
if python3 tools/new_project.py "$name"; then
  slug=$(python3 -c 'import sys; sys.path.insert(0, "tools"); from lib import slugify; print(slugify(sys.argv[1]))' "$name")
  open "studio/sergiler/$slug"
  open -t "studio/sergiler/$slug/sergi.txt"
  echo
  read -n 1 -s -r -p "Klasör ve sergi.txt açıldı. Kapatmak için bir tuşa bas."
else
  echo
  read -n 1 -s -r -p "Açılamadı (yukarıda yazıyor). Kapatmak için bir tuşa bas."
fi
