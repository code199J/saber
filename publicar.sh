#!/usr/bin/env bash
# Publica Saber en GitHub Pages.
# Sube la carpeta tal cual (no hay build) y sube la versión del service worker
# para que el teléfono no se quede con el HTML viejo en caché.
#
# Uso: ./publicar.sh ["mensaje del commit"]

set -euo pipefail
cd "$(dirname "$0")"

REPO="code199J/saber"
URL_SITIO="https://code199j.github.io/saber/"

TOK="${GITHUB_PAT:-}"
if [ -z "$TOK" ]; then
  TOK="$(grep -m1 '^export GITHUB_PAT=' ~/.bashrc | cut -d= -f2- | tr -d "\"'")"
fi
if [ -z "$TOK" ]; then
  echo "Falta GITHUB_PAT (en el entorno o en ~/.bashrc)." >&2
  exit 1
fi
AUTH="Authorization: Basic $(printf 'x-access-token:%s' "$TOK" | base64 -w0)"

# 1. Subir la versión del caché: si no, el service worker sirve lo anterior.
ACTUAL="$(grep -oP 'saber-v\K[0-9]+' sw.js | head -1)"
NUEVA=$((ACTUAL + 1))
sed -i "s/saber-v${ACTUAL}/saber-v${NUEVA}/" sw.js
echo "→ Caché: saber-v${ACTUAL} → saber-v${NUEVA}"

# 2. Commit y push. Pages reconstruye solo.
MENSAJE="${1:-Actualización $(date '+%F %H:%M')}"
git add -A
if git diff --cached --quiet; then
  echo "→ Nada nuevo que subir."
  exit 0
fi
git commit -q -m "$MENSAJE"
git -c "http.extraheader=$AUTH" push -q origin main
echo "→ Subido. GitHub Pages tarda ~1 min en refrescar:"
echo "  $URL_SITIO"
