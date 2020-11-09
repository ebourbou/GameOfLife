import { Injectable } from '@angular/core';
import { CreatePatternMutation, GetPatternQuery, ListPatternsQuery, UpdatePatternMutation } from '../../API.service';

import { Pattern } from '../model/pattern';
import { PatternUtils } from './pattern-util';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatternMockService {
  private MOCK_PATTERNS: any[] = [
    {
      __typename: 'Pattern',
      author: 'John Conway',
      sizeX: 3,
      sizeY: 3,
      description: 'Der Blinker ist das kleinste Oszillator Muster.',
      heat: 4,
      id: '1',
      name: 'Blinker',
      pattern: 'OOO\n...\n...',
      type: 'oscillator',
      year: 1970,
    },
    {
      __typename: 'Pattern',
      author: 'Richard K. Guy',
      sizeX: 3,
      sizeY: 3,
      description:
        'Gleiter bewegen sich auf dem Spielfeld fort. Sogar logische Funktionen wie UND und ODER lassen sich durch bestimmte Anfangsmuster simulieren. Damit können dann sogar komplexe Funktionen der Schaltungslogik und digitalen Rechnertechnik nachgebaut werden.',
      heat: 4,
      id: '2',
      name: 'Glider',
      pattern: '.O.\n..O\nOOO',
      type: 'spaceship',
      year: 1969,
    },
    {
      __typename: 'Pattern',
      author: 'Sol Goodman',
      sizeX: 8,
      sizeY: 8,
      description:
        'Hierbei handelt es sich um Objekte, die sich nach einem bestimmten Schema periodisch verändern, d. h. nach einer endlichen, festen Anzahl von Generationen wieder den Ausgangszustand erreichen.Die einfachste zyklische Konfiguration ist eine horizontale oder vertikale Reihe von drei lebenden Zellen. Beim horizontalen Fall wird direkt ober- und unterhalb der Zelle in der Mitte eine lebende Zelle geboren, während die äußeren beiden Zellen sterben; so erhält man eine vertikale Dreierreihe.',
      heat: 16,
      id: '3',
      name: 'Octagon',
      pattern: '...OO...\n..O..O..\n.O....O.\nO......O\nO......O\n.O....O.\n..O..O..\n...OO...',
      type: 'oscillator',
      year: 1971,
    },
  ];

  private RESULT: ListPatternsQuery = { items: this.MOCK_PATTERNS, __typename: 'PatternConnection', nextToken: '' };

  getPatterns(): Promise<ListPatternsQuery> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.RESULT), 250);
    });
  }

  getPatternsObservable(): Observable<Pattern[]> {
    return from(this.getPatterns().then((result) => result.items.map((item) => PatternUtils.fromAwsPattern(item))));
  }

  getPattern(id: string): Promise<GetPatternQuery> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.RESULT.items.find((value) => value.id == id)), 250);
    });
  }

  addPattern(pattern: Pattern): Promise<CreatePatternMutation> {
    return new Promise((resolve, reject) => {
      pattern.id = '' + Math.random;
      this.MOCK_PATTERNS.push(PatternUtils.toAwsPattern(pattern));
      setTimeout(() => resolve(this.RESULT.items.find((value) => value.id == pattern.id)), 250);
    });
  }

  updatePattern(pattern: Pattern): Promise<UpdatePatternMutation> {
    return new Promise((resolve, reject) => {
      this.RESULT.items.find((value) => value.id == pattern.id);
      this.MOCK_PATTERNS.push(PatternUtils.toAwsPattern(pattern));
      setTimeout(() => resolve(this.RESULT.items.find((value) => value.id == pattern.id)), 250);
    });
  }

  deletePattern(idToDelete: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const index = this.RESULT.items.findIndex((value) => value.id == idToDelete);
      setTimeout(() => resolve(this.RESULT.items.splice(index, 1)), 250);
    });
  }
}
