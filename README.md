## CAS FEE Project 2: GameOfLife

Das Spiel des Lebens (engl. Conway’s Game of Life) ist ein vom Mathematiker John Horton Conway 1970 entworfenes Spiel, basierend auf einem zweidimensionalen zellulären Automaten. Es ist eine einfache und bis heute populäre  Automaten-Theorie von Stanisław Marcin Ulam.

![Alt-Text](src/assets/img/Animated_glider_emblem.gif)

(Quelle: https://de.wikipedia.org/wiki/Conways_Spiel_des_Lebens)

## Installation und Starten
- Installieren der Angular CLI: `npm install -g @angular/cli`
- Ausführen `git clone https://github.com/ebourbou/GameOfLife.git`
- Das `aws-exports.js` aus dem Installations Mail in `GameOfLife/src` kopieren.
- Ausführen von `npm install`
- Zum Starten `ng serve` und im Browser auf `http://localhost:4200/` navigieren.

## Online
Das Spiel ist online spielbar auf [ebourbou.github.io/GameOfLife](https://ebourbou.github.io/GameOfLife/)
Es handelt sich jedoch um experimentelle, temporäre Installation ohne Anspruch auf Vollständigkeit oder Korrektheit.

Vorhandene Benutzer

User | Passwort
------ | ------
admin   | adminadmin  
user   | useruser  


## Known bugs / Limitationen
- AWS Verification kein erneutes Senden Verifikations Code 
- Passwort Reset ist nur über die aws console möglich
- Benutzer sind nicht löschbar, auch nur über die aws console 
- Alle serverseitigen Ressourcen (Spiele, Patterns, User) werden immer vollständig geladen.
- Nicht alle Module des Spiels sind responsiv. Wir haben uns auf die Menüeinträge 'Neues Spiel' und 'Meine Spiele' fokussiert.
- Verschiedene Mängel bei der Anwendung von ngrx wegen fehlender Erfahrung und grosser Komplexität. Symptome:
    * Im Spiel werden alle Generationenwechsel innerhalb der Komponente in einem Loop ausgelöst, anstatt dass die vorherige Generation im Effekt die nächste triggert. Funktioniert, aber ist falsch.
    * Spiele lassen sich nicht pausieren oder abbrechen.
    * Sporadische ExpressionChangedAfterItHasBeenChecked-Errors. Wir konnten diese noch nicht genauer eingrenzen.
    * Refresh-Probleme im Pattern-Carousel bei sehr kleinen Viewports.
