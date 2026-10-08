"""Detecta cambios en las fuentes de la presentación; no modifica archivos."""
from pathlib import Path
import argparse
import hashlib
import json

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--proyecto', required=True, type=Path)
args = parser.parse_args()
manifest = json.loads(Path(__file__).with_name('revision-proyecto.json').read_text(encoding='utf-8'))
changed = []
for source, expected in manifest['source_sha256'].items():
    path = args.proyecto / source
    if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
        changed.append(source)
if changed:
    print('Fuentes a revisar desde ' + manifest['reviewed_at'] + ':')
    for source in changed:
        pages = [m['file'] for m in manifest['modules'] if source in m['sources']]
        print(f"- {source}: {', '.join(pages) if pages else 'revisar mapa y navegación'}")
else:
    print(f"Sin cambios en las {len(manifest['source_sha256'])} fuentes registradas desde {manifest['reviewed_at']}.")
raise SystemExit(1 if changed else 0)
