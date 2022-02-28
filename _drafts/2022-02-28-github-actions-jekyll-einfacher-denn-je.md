---
layout: post
title: "Continous Integration für Jekyll Webseiten durch GitHub Actions ist so einfach wie noch nie"
author: Florian Schuttkowski
excerpt: ""
imageURL: https://cloud.fschuttkowski.xyz/s/ZEfyJFrsLRi5LLj/download/Screenshot%202022-02-28%20at%2013.30.46.png
---

```yaml
name: Jekyll site CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: "0 0 * * *"

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Build the site in the jekyll/builder container
      run: |
        docker run \
        -v ${{ github.workspace }}:/srv/jekyll -v ${{ github.workspace }}/_site:/srv/jekyll/_site \
        jekyll/builder:latest /bin/bash -c "chmod -R 777 /srv/jekyll && jekyll build --future"
```

{% include image.html source="https://cloud.fschuttkowski.xyz/s/ZEfyJFrsLRi5LLj/download/Screenshot%202022-02-28%20at%2013.30.46.png" caption="test" %}