import { Component, Input, OnInit } from '@angular/core';
import { ScoreTag } from '../service/score-tag';
import { ScoreLevel } from '../service/score-level.enum';
import { ScoreTagEnum } from '../service/score-tag.enum';

@Component({
  selector: 'app-score-tag',
  templateUrl: './score-tag.component.html',
  styleUrls: ['./score-tag.component.scss'],
})
export class ScoreTagComponent implements OnInit {
  @Input()
  tags: ScoreTag[];

  @Input()
  size: Size = Size.BIG;

  textsAndIcons = new Map<
    string,
    {
      icon: string;
      name: string;
      label: string;
      toolTip: string;
    }
  >();

  constructor() {
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.ACTIVITY, ScoreLevel.LOUSY), {
      icon: 'activity',
      name: 'Aktivität',
      label: 'Langweilig',
      toolTip: 'Da war keine Action im Spiel. Zum gähnen.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.ACTIVITY, ScoreLevel.GOOD), {
      icon: 'activity',
      name: 'Aktivität',
      label: 'Ok',
      toolTip: '',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.ACTIVITY, ScoreLevel.OVERACHIEVER), {
      icon: 'activity',
      name: 'Aktivität',
      label: 'Top Action!',
      toolTip: 'Knallhart! Da fehlten bloss noch die coolen Sprüche.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.VIOLENCE, ScoreLevel.LOUSY), {
      icon: 'brutality',
      name: 'Brutalität',
      label: 'Zahm',
      toolTip: 'Da ist kaum Blut geflossen. Ist Weihnachten?',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.VIOLENCE, ScoreLevel.GOOD), {
      icon: 'brutality',
      name: 'Brutalität',
      label: 'Ok',
      toolTip: '',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.VIOLENCE, ScoreLevel.OVERACHIEVER), {
      icon: 'brutality',
      name: 'Brutalität',
      label: 'Brutal!',
      toolTip: 'Ein wahres Blutbad.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.BABY_BOOM, ScoreLevel.LOUSY), {
      icon: 'reproduction',
      name: 'Reproduktion',
      label: 'Rentnerschwemme',
      toolTip: 'Zum Aussterben verurteilt. Bei diesen Reproduktionsraten...',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.BABY_BOOM, ScoreLevel.GOOD), {
      icon: 'reproduction',
      name: 'Reproduktion',
      label: 'Ok',
      toolTip: '',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.BABY_BOOM, ScoreLevel.OVERACHIEVER), {
      icon: 'reproduction',
      name: 'Reproduktion',
      label: 'Babyboom!!',
      toolTip: 'Der Frühling ist da!',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.PANDEMIC, ScoreLevel.LOUSY), {
      icon: 'population',
      name: 'Bevölkerungszahl',
      label: 'Pure Harmonie',
      toolTip: 'Friede Freude Eierkuchen.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.PANDEMIC, ScoreLevel.GOOD), {
      icon: 'population',
      name: 'Bevölkerungszahl',
      label: 'Ok',
      toolTip: '',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.PANDEMIC, ScoreLevel.OVERACHIEVER), {
      icon: 'population',
      name: 'Bevölkerungszahl',
      label: 'Pandemie!',
      toolTip: 'Plötzlich waren alle tot. LOL.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.FURIOUS_FINISH, ScoreLevel.LOUSY), {
      icon: 'joker',
      name: 'Unterhaltung',
      label: 'Lahmes Ende',
      toolTip: 'Irgendwann sind einfach alle nach Hause gegangen.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.FURIOUS_FINISH, ScoreLevel.GOOD), {
      icon: 'joker',
      name: 'Unterhaltung',
      label: 'Ok',
      toolTip: '',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.FURIOUS_FINISH, ScoreLevel.OVERACHIEVER), {
      icon: 'joker',
      name: 'Unterhaltung',
      label: 'Furioses Ende!',
      toolTip: 'Die haben sich nichts geschenkt. Bis zum Schluss.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.DIFFICULTY, ScoreLevel.LOUSY), {
      icon: 'difficulty',
      name: 'Schwierigkeit',
      label: 'Ein Kinderspiel',
      toolTip: 'Bei diesen Einstellungen kann ja nichts los sein.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.DIFFICULTY, ScoreLevel.GOOD), {
      icon: 'difficulty',
      name: 'Schwierigkeit',
      label: 'Ok',
      toolTip: '',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.DIFFICULTY, ScoreLevel.OVERACHIEVER), {
      icon: 'difficulty',
      name: 'Schwierigkeit',
      label: 'Boss-Level!',
      toolTip: `Schwieriger geht's nicht!`,
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.EXCITEMENT, ScoreLevel.LOUSY), {
      icon: 'excitement',
      name: 'Harmonie',
      label: 'Eintönig',
      toolTip: 'Da verpasst man nichts. Schade um den Strom.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.EXCITEMENT, ScoreLevel.GOOD), {
      icon: 'excitement',
      name: 'Harmonie',
      label: 'Ok',
      toolTip: 'Voll im Gleichgewicht.',
    });
    this.textsAndIcons.set(this.entryKeyFrom(ScoreTagEnum.EXCITEMENT, ScoreLevel.OVERACHIEVER), {
      icon: 'excitement',
      name: 'Harmonie',
      label: 'Aufregend!',
      toolTip: 'Packend bis zum Ende!',
    });
  }

  ngOnInit(): void {}

  toolTipFor(tag: ScoreTag): string {
    return this.textsAndIcons.get(this.entryKeyFrom(tag.tag, tag.level)).toolTip;
  }

  nameFor(tag: ScoreTag): string {
    return this.textsAndIcons.get(this.entryKeyFrom(tag.tag, tag.level)).name;
  }

  tinyToolTipFor(tag: ScoreTag): string {
    return this.textsAndIcons.get(this.entryKeyFrom(tag.tag, tag.level)).name + ' ' + this.translate(tag.level);
  }

  iconFor(tag: ScoreTag): string {
    return this.textsAndIcons.get(this.entryKeyFrom(tag.tag, tag.level)).icon;
  }

  private entryKeyFrom(tag: ScoreTagEnum, level: ScoreLevel): string {
    return '' + tag + level;
  }

  labelFor(tag: ScoreTag): string {
    return this.textsAndIcons.get(this.entryKeyFrom(tag.tag, tag.level)).label;
  }

  getClasses(level: ScoreLevel): string[] {
    const classes = [];
    const sizePrefix = this.size === Size.BIG ? 'big_' : 'tiny_';
    switch (level) {
      case ScoreLevel.LOUSY:
        classes.push(sizePrefix + 'lousy');
        break;
      case ScoreLevel.GOOD:
        classes.push(sizePrefix + 'good');
        break;
      case ScoreLevel.OVERACHIEVER:
        classes.push(sizePrefix + 'top');
    }
    return classes;
  }

  translate(level: ScoreLevel): string {
    let german;
    switch (level) {
      case ScoreLevel.LOUSY:
        german = 'niedrig';
        break;
      case ScoreLevel.GOOD:
        german = 'hoch';
        break;
      case ScoreLevel.OVERACHIEVER:
        german = 'exzellent';
    }
    return german;
  }
}

enum Size {
  BIG,
  TINY,
}
