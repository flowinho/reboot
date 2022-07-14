---
title: "Die ersten Dinge, die ich auf einem frisch installierten macOS einrichte"
layout: post
tags: macos homebrew terminal zshell oh-my-zsh casks vim git development
---

Aufgrund eines Speicherdefekts meines MacBook Air 2017 war ich gezwungen, mein System vollständig neu aufzusetzen. Ich greife für diese Art der Konfiguration seit längerem auf eine selbstgeschriebenes Automatisierungsskript zurück. Die Idee dafür lieferte mir einer meiner alten Vorgesetzten[^1].

Einfach plump diese Makefile hier zu posten, würde dem Thema aber nicht gerecht werden, weswegen ich gerne meinen einzelnen Schritte auflisten würde. Ich werde allerdings auf die feingranulierte Konfiguration jedes einzelnen Tools eingehen.

## Die zwei wichtigsten, ersten Schritte

macOS hat zwei entscheidende Schwächen:

- Es sammelt notorisch unfassbar viele Daten über seine Verwendung und sendet diese an Apple.
- Es verfügt über keine automatisierbare Möglichkeit, Software zu installieren und zu aktualisieren, außer dem AppStore.

Beides lässt sich mit den beiden wichtigsten, ersten Schritten, die ich auf einem macOS-System ausführe, angehen:

### 1. Homebrew installieren

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Homebrew ist ein absolutes **must-have** auf jedem macOS-System. Es erlaubt nicht nur die Aktualisierung von wichtigen Tools, die Apple in erbärmlich veralteten Versionen mit sich bringt, sondern auch das „ultra-angenehme“ Installieren und Aktualisieren von Dritt-Software[^3] ohne wie ein Tier den Browser öffnen zu müssen.

### 2. Little Snitch installieren

```bash
brew install --cask little-snitch
```

Meine Gegenmaßnahme gegen Apples Tracking. Die Apple-Server zu kontaktieren, ist für einen reibungslosen Ablauf der Arbeit unter macOS einfach nicht notwendig, sofern man die Disziplin hat, die Anti-Apple-Firewall-Regeln in regelmäßigen Abständen, ich empfehle alle zwei Wochen, zu deaktivieren und nach Updates zu suchen.

**Wichtig:** Wer die Kommunikation mit Apple Servern unterbindet, büßt relevante Sicherheitsfeature von macOS ein. Es sollten also nur jene Nutzer, diesem Vorgehen folgen, die sich über die Implikationen bewusst sind. Leider gibt es keine Alternative - es ist einfach die Art und Weise, wie macOS konzipiert ist.

## Nachdem das Wichtigste nun erledigt ist

### Xcodes & Xcode

Um Seiteneffekte zu vermeiden, installiere ich Xcode generell direkt nach Homebrew und Little-Snitch. Da der AppStore unzuverlässig arbeitet, und ich nicht den Browser bemühen möchte, nutze ich das fabelhafte Tool XCodes, welches mich nicht nur eine ganze Reihe von XCode-Versionen installieren lässt, sondern auch gleich mehrere nebeneinander.

```bash
brew install --cask xcodes
```

### Nahezu jede weitere Software die ich im Alltag verwende, in einem Befehl

Homebrew erlaubt dank seiner `cask`-Funktionalität die Installation von Apps Dritter über das Terminal. Damit lässt sich ein Großteil der Software, die ich im Alltag einsetze mit einem einzigen Befehl installieren. Ein krasses Beispiel dafür, wieviel langsamer es wäre, jede Software manuell zu installieren. Da es sich um einen sehr langen Befehl handelt, hier die installierte Software als Liste:

- Firefox
- KeePassXC
- NextCloud Desktop
- Fantastical
- Obsidian
- GitHub Desktop
- Slack
- Visual Studio Code
- Appcleaner
- OmniDiskSweeper
- Cyberduck
- Audacity
- Signal
- Alfred
- DevonThink

```bash
brew install --cask firefox keepassxc nextcloud fantastical obsidian github devonthink slack visual-studio-code appcleaner omnidisksweeper cyberduck audacity signal alfred
```

### Installation wichtiger Terminal-Software

```bash
brew install git p7zip wget magic-wormhole
```

### Installation von Ruby & Jekyll

Ruby on Rails ist eine sehr vielseitiges Programmiersprache und viele Tools, sei es für iOS-Entwicklung oder Web-Entwicklung mit Jekyll[^4]. Ruby ist für viele Entwickler unerlässlich.

```bash
brew install chruby ruby-install
ruby-install ruby
echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
ruby -v
echo "chruby ruby-3.x.x" >> ~/.zshrc # Ausgabe von ruby -v angeben
gem install jekyll
```

### Personalisierung des Terminals

Apple hat endlich seit ein paar Jahren zshell als Terminalapplikation übernommen. Dadurch bietet sich die Installation des meiner Meinung nach Must-Have „Oh-my-zshell“ an, sowie ein paar weitere Anpassungen und Aliase.

#### Oh my zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
git clone https://github.com/powerline/fonts.git --depth=1
cd fonts
./install.sh
cd ..
rm -rf fonts
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```

Plugins:

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# Anschließend die plugins in der ~/.zshrc hinzufügen
```

Anschließend muss noch das eingestellte Theme in der `~/.zshrc` geändert werden.

#### Aliase

```bash
alias 75='7z a -r -t7z -m0=lzma2 -mx=9 -myx=9 -mqs=on -ms=on'
alias 74='7z a -r -t7z -m0=lzma2 -mx=9'
alias 73='7z a -r -t7z -m0=lzma2 -mx=7'
alias 72='7z a -r -t7z -m0=lzma2 -mx=5'
alias 71='7z a -r -t7z -m0=lzma2 -mx=3'
alias 70='7z a -r -t7z -m0=lzma2 -mx=1'
alias cd..='cd ..'
alias ..='cd ..'
alias ls='ls -G'
alias l='ls'
alias ll='ls -lh'
alias la='ls -lha'
alias show_hidden_files='defaults write com.apple.finder AppleShowAllFiles YES && killall Finder'
alias hide_hidden_files='defaults write com.apple.finder AppleShowAllFiles NO && killall Finder'
alias tarball='tar -cvf' # outputfilename + directory to tar
alias tarballCompressed='tar cfvz'
alias tarballUnpack='tar xfvz'
alias gBranch='git branch -a -v -v'
alias gFetch='git fetch && git branch -a -v -v'
alias gTree='git log --graph --oneline'
alias gTreeFancy='git log --graph --pretty=format:"%C(yellow)%h %Cred%ad %Cblue%an %Cgreen%d %Creset%s" --date=short'
alias gListTags='git log --date-order --graph --tags --simplify-by-decoration --pretty=format:"%ai %h %d"'
alias gCommitAll='git add . && git commit'
alias gCleanUp='git fetch -p && git branch -vv | awk '"'"'/: gone]/{print $1}'"'"' | xargs git branch -d'
alias gForcePush='currentBranch=$(git branch | sed -n -e '"'"'s/^\* \(.*\)/\1/p'"'"') && echo "$currentBranch will be forced pushed to origin" && git push -f origin $currentBranch'
```

### macOS: Screenshots optimieren

Um die Screenshots ansehnlicher zu machen, und statt PNG zum JPG zu wechseln, führe ich folgende Befehle im Terminal aus:

```bash
defaults write com.apple.screencapture disable-shadow -bool true; killall SystemUIServer
defaults write com.apple.screencapture type jpg; killall SystemUIServer 
```

Das wars!

[^1]: An dieser Stelle: Danke Mic! Ich nutze VIM mittlerweile für sehr vieles. *kicher*
[^2]: Also eine Firewall, die Verbindungen nach außen kappen kann.
[^3]: Die nicht im AppStore vertreten ist.
[^4]: Mit Jekyll ist auch dieser Blog implementiert.
