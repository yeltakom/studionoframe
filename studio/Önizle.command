#!/bin/bash
# Siteyi yayınlamadan bilgisayarında açar. Kapatmak için bu pencereyi kapat.
cd "$(dirname "$0")/.."
if [ -d /usr/local/opt/node@22/bin ]; then export PATH="/usr/local/opt/node@22/bin:$PATH"; fi
echo "Klasörler okunuyor…"
python3 tools/sync.py
echo
echo "Site açılıyor: http://localhost:4321/studionoframe/  (bu pencere açık kaldığı sürece)"
(sleep 4 && open "http://localhost:4321/studionoframe/") &
npm run dev --silent
