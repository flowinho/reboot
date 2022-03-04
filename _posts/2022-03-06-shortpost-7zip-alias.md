---
layout: post
title: "Kurzbeitrag: Nützliche 7zip alias für macOS / Linux"
category: erkenntnis
author: Florian Schuttkowski
excerpt: "7Zip ist ein Open-Source Archivierungsprogramm, das sich durch lange Existenz, Open-Source und Plattformunabhängigkeit auszeichnet.
7Zip ist eines der langlebigsten Archivierungsprogramme und zeichnet sich durch kontinuierliche Weiterentwicklung seit 1999 aus."
imageURL: https://cloud.fschuttkowski.xyz/s/Jt7yYmaWoGfSaYM/download/nick-van-der-ende-VYfxkePredI-unsplash.jpg
---

Foto: Nick van der Ende, Unsplash.com Lizenz

7Zip ist ein Open-Source Archivierungsprogramm, das sich durch lange Existenz, Open-Source und Plattformunabhängigkeit auszeichnet.
7Zip ist eines der langlebigsten Archivierungsprogramme und zeichnet sich durch [kontinuierliche Weiterentwicklung seit 1999](https://www.7-zip.org/history.txt) aus.

Wer nur Zip kennt, kann sich das folgendermaßen vorstellen: ZIP ist wie das Outlook der Archivierungsprogramme. Die meisten Menschen nutzen es, "weil das halt jeder macht". Allerdings ist 7zip das bessere Programm. Meiner Meinung nach.

## Installation unter macOS

```bash
brew install p7zip
```

Nicht immer ist die maximale Kompressionsrate gewünscht, deswegen bietet es sich an mehrere Alias anzulegen die eine genauere Steuerung ermöglichen.

## Nützliche Terminal-Alias

```bash
alias 75\='7z a -r -t7z -m0=lzma2 -mx=9 -myx=9 -mqs=on -ms=on'
alias 74\='7z a -r -t7z -m0=lzma2 -mx=9'
alias 73\='7z a -r -t7z -m0=lzma2 -mx=7'
alias 72\='7z a -r -t7z -m0=lzma2 -mx=5'
alias 71\= '7z a -r -t7z -m0=lzma2 -mx=3'
alias 70\='7z a -r -t7z -m0=lzma2 -mx=1'
```