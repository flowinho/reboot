---
tags: jekyll development ruby bugfix
layout: post
title: "Ruby 3: Jekyll servlet Fehler beheben: cannot load such file: webrick"
---

|![Screenshot eines macOS Terminals, jekyll serve schlägt fehl.](/assets/posts/terminal-jekyll-webrick.jpg)|
|:-:|
|Jekyll hat aktuelle Probleme mit Ruby 3.x *Quelle: Screenshot*|

Jekyll hat in der aktuellen Version ein paar Probleme mit Ruby 3. Ein simpler Workaround ist hier, den benötigten Gem `webrick` direkt in das Bundle (und damit die Gemfile) zu integrieren.

```bash
bundle install webrick
```