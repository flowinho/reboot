---
layout: post
title: "CSS: Seitenweites Anti-Aliasing für alle Schriftarten"
tags: css fonts anti-aliasing
---
Fast jedes Mal aufs Neue suche ich den Namen der Browser-Funktionalitäten um Schriftarten mit Kantenglättung zu versehen. 

```css
* {
    // Verfügbar ab Firefox 25+ und in WebKit-Browsern
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```