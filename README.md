# El Pollo Loco – Originalbilder + Spiegelung (11.11.2026)

Diese Ausgabe baut auf der letzten ZIP **El_Pollo_Loco_Bewegung_10-11-2026.zip** auf.
Die Bewegungssteuerung bleibt erhalten, das Spiegeln von Pepe beim Linkslaufen kommt hinzu.

## So baust du die Dateien ein

1. Dein bestehender Projektordner lautet laut Screenshots: `C:\1\Pollo Loco\`.
2. **Lass den vorhandenen `img`-Ordner unbedingt dort. Nicht löschen oder ersetzen!**
3. Öffne die ZIP und kopiere `index.html`, `style.css`, `js/` und `models/` in den bestehenden Projektordner (bei Nachfragen Code-Dateien überschreiben).
4. Achtung: Die ZIP enthält **keine Bilder**. Die echten Bilder bleiben an ihren bisherigen Stellen im `img`-Ordner.
5. Öffne `index.html` in VS Code mit Live Server (oder aktualisiere die bereits geöffnete Seite mit `Ctrl+F5`).
6. Pfeiltaste rechts = Pepe läuft nach rechts und schaut nach rechts. Pfeiltaste links = Pepe läuft nach links und wird korrekt gespiegelt.

**Wichtig:** `index.html` und der Ordner `img` müssen im gleichen Projekt-Hauptordner liegen. Lege keine zusätzliche ZIP-Unterordner-Ebene dazwischen.

## Bildpfade direkt aus deinen Screenshots

- `img/I-1.png` – Pepe (großes `I` wie im Dateinamen auf dem Screenshot)
- `img/1_w.png` – Huhn
- `img/layers/air.png` – Himmel
- `img/layers/3_third_layer/1.png` – hintere Landschaft
- `img/layers/2_second_layer/1.png` – mittlere Landschaft
- `img/layers/1_first_layer/1.png` – vordere Landschaft
- `img/layers/4_clouds/1.png` – Wolken

Die Dateien im Screenshot heißen teilweise auch `2.png` oder `full.png`. Hier verwenden wir jeweils `1.png` wie bisher im Unterricht.

## Wichtige Unterschiede zur vorigen Version

- `world.class.js` hat **keine** `drawPlaceholder()`-Methode mehr. Bei fehlenden Bildern erscheint keine Ersatzzeichnung; stattdessen ein Fehler in der Browser-Konsole.
- Alle gezeigten Bilder werden mit ihren tatsächlichen Dateipfaden geladen.
- `Character.otherDirection` ist beim Linkslaufen `true`, beim Rechtslaufen `false`.
- Für das spiegelnde Zeichnen wird `save()` → `translate()` → `scale(-1, 1)` → `drawImage()` → `restore()` benutzt. Das Bild bleibt an derselben Stelle.
- `game.js` verwendet die moderne Eigenschaft `e.code` statt des veralteten `e.keyCode`. Für die Pfeiltasten hat das die gleiche Wirkung.

## Was noch NICHT vorhanden ist

Der Screenshot deines `img`-Ordners zeigt für Pepe **nur ein Bild (`I-1.png`)** und für das Huhn **nur ein Bild (`1_w.png`)**. Deshalb sind Pepe und das Huhn jetzt echte PNG-Figuren, aber ihre Beine werden **noch nicht mit mehreren Einzelbildern animiert**. Dafür benötigen wir später zusätzliche Geh-Frames. Die Programmstruktur `IMAGES_WALKING` ist bereits darauf vorbereitet.

Ebenso fehlen wie in den Videos noch Springen, Karten-Scrolling und Bildschirmrand-Begrenzung. Die Figur wird in dieser Version gespiegelt, bewegt und nicht als Ersatzzeichnung angezeigt.

Falls Pepe nicht erscheint: Öffne F12 → Konsole und kontrolliere die Dateinamen. Die Dateibezeichnung `I-1.png` kann je nach Schrift fast wie `l-1.png` aussehen; gegebenenfalls diese **eine Zeichenstelle** in `models/character.class.js` an deinen exakten Namen anpassen.
