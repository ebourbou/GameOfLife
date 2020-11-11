### Pattern
{
  "author": "John Conway",
  "sizeX": 3,
  "sizeY": 3,
  "description": "Der Blinker ist das kleinste Oszillator Muster, das nach 2 Zyklen wieder in den Ursprungs Zustand zurückkehrt",
  "heat": 4,
  "id": "1",
  "name": "Blinker",
  "pattern": "OOO",
  "type": "oscillator",
  "year": 1970
}


{
  "author": "Richard K. Guy",
  "sizeX": 3,
  "sizeY": 3,
  "description": "Gleiter bewegen sich auf dem Spielfeld fort. Sogar logische Funktionen wie UND und ODER lassen sich durch bestimmte Anfangsmuster simulieren. Damit können dann sogar komplexe Funktionen der Schaltungslogik und digitalen Rechnertechnik nachgebaut werden.",
  "heat": 4,
  "id": "2",
  "name": "Gleiter",
  "pattern": ".O\n..O\nOOO",
  "type": "spaceship",
  "year": 1969
}



{
  "author": "Sol Goodman",
  "sizeX": 8,
  "sizeY": 8,
  "description": "Hierbei handelt es sich um Objekte, die sich nach einem bestimmten Schema periodisch verändern, d. h. nach einer endlichen, festen Anzahl von Generationen wieder den Ausgangszustand erreichen.Die einfachste zyklische Konfiguration ist eine horizontale oder vertikale Reihe von drei lebenden Zellen. Beim horizontalen Fall wird direkt ober- und unterhalb der Zelle in der Mitte eine lebende Zelle geboren, während die äußeren beiden Zellen sterben; so erhält man eine vertikale Dreierreihe.",
  "heat": 16,
  "id": "3",
  "name": "Octagon",
  "pattern": "...OO\n..O..O\n.O....O\nO......O\nO......O\n.O....O\n..O..O\n...OO",
  "type": "oscillator",
  "year": 1971
}

{
  "author": "Bill Gosper",
  "sizeX": 36,
  "sizeY": 9,
  "boxX": 36,
  "boxY": 9,
  "description": "Conway glaubte Anfangs, daß es kein Muster gibt, daß ins Grenzenlose wächst und schrieb einen Bewerb aus: 50 $ für den, der vor 1970 diese Vermutung beweist oder widerlegt. 1970 wurde von einer Guppe des Artificial Intelligence Projectes beim M.I.T. (Robert April, Michael Beeler, R. William Gosper, Jr., Richard Howell, Rich Schroeppel und Michael Speciner) der Gegenbeweis erbracht. Gosper entdeckte mit Hilfe eines Programms von Speciner eine Gleiterkanone. Eine bestimmte Konstellation wächst nach 40. Ticks zu einer Kanone, die einen Gleiter abschießt. Das passiert alle 30. Ticks wieder.",
  "heat": 16,
  "id": "4",
  "name": "Gleiter Kanone",
  "pattern": "........................X...........\n......................X.X...........\n............XX......XX............XX\n...........X...X....XX............XX\nXX........X.....X...XX..............\nXX........X...X.XX....X.X...........\n..........X.....X.......X...........\n...........X...X....................\n............XX......................",
  "type": "spaceship",
  "year": 1970
}

{
  "author": "MIT group",
  "sizeX": 5,
  "sizeY": 5,
  "boxX": 5,
  "boxY": 5,
  "description": "Der Bipole ist neben dem Blinker, der Uhr, der Kröte oder dem Tripole ein oszillierendes Pattern das nach einer festen Anzahl Zyklen wieder den Ursprungs Zustand erreicht.",
  "heat": 4,
  "id": "5",
  "name": "Bipole",
  "pattern": "OO...\nO.O..\n..O.O\n...OO",
  "type": "oscillator",
  "year": 1970
}
