#!/usr/bin/env bash
# Sirve Saber en la red local para abrirla desde el teléfono.
# Uso: ./servir.sh [puerto]

set -euo pipefail
cd "$(dirname "$0")"

PUERTO="${1:-8080}"
IP=$(hostname -I | awk '{print $1}')

echo "Saber en marcha."
echo
echo "  En esta laptop:  http://localhost:${PUERTO}"
echo "  En el teléfono:  http://${IP}:${PUERTO}"
echo
echo "El teléfono tiene que estar en la misma wifi. Ctrl+C para parar."
echo

exec python3 -m http.server "$PUERTO" --bind 0.0.0.0
