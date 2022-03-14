- Preview Content in Xcode beinhaltet Assets die man ausprobieren will, aber nicht innerhalb der Hauptapp die im AppStore landet liegen sollen. 
- es muss nicht alles programmiert werden
    - im inspector lassen sich viele standardmodifier setzen und dann im code automatisch einfügen.
    - es lassen sich aber auch wietere modifier suhen und auf das element anwenden, wie bspw. background
    - das ganze geht auch über die library
    - CMD + Click auf ein Element zeigt weitere Elemente (in der Preview oder im Code)
        - zB. Show SwiftUI Inspector

## Elemente

Text("irgendwas").padding(4)
Text("irgendwas").padding(40)

- Padding lässt sich wie in css definieren.
- nennt sich modifieren. lassen sich viele sachen verketten
- modifier lassen sich auch ineinander wenden, zB .background(Color.green.blur(radius: 3.0))
- beispiele
    - Text("Hugendubel").padding(40).background(.brown)

Images
- Werden wie früher mit Image("named") eingebunden. Standardmäßig in der Asssetgröße, und nur wenn alle Assets (2x, 3x) vorhanden sind.

VStack, HStack, ZStack
- fasst maximal 10 Elemente
- stacks können beliebig ineinander verschachtelt werden

Spacer
- Abstandhalter, nimmt immer so viel Platz ein, wie er kann!
- kann auch mit anderen Spacern zusammen verwendet werden. Bie mehreren Spacern, nehmen alle Spacer-Elemente dieselbe größe ein.
- damit lassen sich schöne, ausgeglichene Elemente erzeugen

Modifier
- Es gibt auch zB Ignore Safe Areas als Modifier (wundervoll)

```swift
// Button instance with label view
Button(action: {
    print("Hello World!1")
}, label: {
    HStack{
        Image(systemName: "pencil")
        Text("Edit")
    }
})
```

Code und VIew verlinken mit  @State

@State var playerCard = "card5"
@State var cpuCard = "card9"
@State var playerScore = 0
@State var cpuScore = 0

@State Properties haben zwei Eigenschaften:
- man kann sie ändern
- jede Referenz im Code der die View baut wird über eine Änderung des Variablen-Werts informiert und passt sich entsprechend an.