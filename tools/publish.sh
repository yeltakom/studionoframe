#!/usr/bin/env bash
# Table + photos -> site -> live. Stops at the first thing that fails.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -d /usr/local/opt/node@22/bin ]; then export PATH="/usr/local/opt/node@22/bin:$PATH"; fi

echo "1/4  Tablo ve fotoğraflar okunuyor"
python3 tools/sync.py

echo
echo "2/4  Site derleniyor"
npm run build --silent

if [ -z "$(git status --porcelain)" ]; then
  echo
  echo "Değişen bir şey yok — site zaten güncel."
  exit 0
fi

echo
echo "3/4  Değişiklikler kaydediliyor"
git add -A
git commit -q -m "${1:-İçerik güncellendi}"

echo "4/4  Yayınlanıyor"
git push -q
echo
echo "Gönderildi. Site 1-2 dakika içinde güncellenir:"
echo "  https://yeltakom.github.io/studionoframe"
echo "  Durum: https://github.com/yeltakom/studionoframe/actions"
