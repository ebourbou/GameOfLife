import { Injectable } from '@angular/core';
import { GetPatternQuery, ListPatternsQuery, UpdatePatternMutation } from '../../API.service';

import { Pattern } from '../model/pattern';

@Injectable({
  providedIn: 'root',
})
export class PatternMockService {
  private MOCK_PATTERNS: any[] = [
    {
      author: 'John Conway',
      sizeX: 3,
      sizeY: 3,
      description: 'Der Blinker ist das kleinste Oszillator Muster.',
      heat: 4,
      id: '1',
      name: 'Blinker',
      pattern: 'OOO',
      type: 'oscillator',
      year: 1970,
    },
    {
      author: 'Richard K. Guy',
      sizeX: 3,
      sizeY: 3,
      description:
        'Gleiter bewegen sich auf dem Spielfeld fort. Sogar logische Funktionen wie UND und ODER lassen sich durch bestimmte Anfangsmuster simulieren. Damit können dann sogar komplexe Funktionen der Schaltungslogik und digitalen Rechnertechnik nachgebaut werden.',
      heat: 4,
      id: '2',
      name: 'Glider',
      pattern: '.O\n..O\nOOO',
      type: 'spaceship',
      year: 1969,
    },
    {
      author: 'Sol Goodman',
      sizeX: 8,
      sizeY: 8,
      description:
        'Hierbei handelt es sich um Objekte, die sich nach einem bestimmten Schema periodisch verändern, d. h. nach einer endlichen, festen Anzahl von Generationen wieder den Ausgangszustand erreichen.Die einfachste zyklische Konfiguration ist eine horizontale oder vertikale Reihe von drei lebenden Zellen. Beim horizontalen Fall wird direkt ober- und unterhalb der Zelle in der Mitte eine lebende Zelle geboren, während die äußeren beiden Zellen sterben; so erhält man eine vertikale Dreierreihe.',
      heat: 16,
      id: '3',
      name: 'Octagon',
      pattern: '...OO\n..O..O\n.O....O\nO......O\nO......O\n.O....O\n..O..O\n...OO',
      type: 'oscillator',
      year: 1971,
    },
  ];

  private RESULT: ListPatternsQuery = { items: this.MOCK_PATTERNS, __typename: 'PatternConnection', nextToken: '' };

  getPatterns(): Promise<ListPatternsQuery> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.RESULT), 500);
    });
  }

  getPattern(id: string): Promise<GetPatternQuery> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.RESULT.items.find((value) => value.id === id)), 250);
    });
  }

  updatePattern(pattern: Pattern): Promise<UpdatePatternMutation> {
    return new Promise((resolve) => {
      const found = this.RESULT.items.find((value) => value.id === pattern.id);
      found.pattern = pattern.pattern;
      found.sizeX = pattern.sizeX;
      found.sizeY = pattern.sizeY;
      found.author = pattern.author;
      found.description = pattern.description;
      found.name = pattern.name;
      found.type = pattern.type;
      found.year = pattern.year;
      found.locked = pattern.locked;
      setTimeout(() => resolve(found), 250);
    });
  }

  deletePattern(idToDelete: string): Promise<any> {
    return new Promise((resolve) => {
      const index = this.RESULT.items.findIndex((value) => value.id === idToDelete);
      setTimeout(() => resolve(this.RESULT.items.splice(index, 1)), 500);
    });
  }
}
