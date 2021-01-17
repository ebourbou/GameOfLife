import { GenerationStatistic } from '../../shared/model/generation-statistic';

export class GameStatisticUtils {
  private static labels = ['Geborene', 'Gestorbene', 'Lebendige', 'Tote', 'Lebenserwartung', 'Pioniere', 'Zustandsänderungen', 'Zuschauer'];

  static getColors(): any {
    return [
      { name: this.toName(0).toLowerCase(), value: '#3498DB' },
      { name: this.toName(1).toLowerCase(), value: '#F8C471' },
      { name: this.toName(2).toLowerCase(), value: '#82E0AA' },
      { name: this.toName(3).toLowerCase(), value: '#85929E' },
      { name: this.toName(4).toLowerCase(), value: '#5DADE2' },
      { name: this.toName(5).toLowerCase(), value: '#186A3B' },
      { name: this.toName(6).toLowerCase(), value: '#FAD7A0' },
      { name: this.toName(7).toLowerCase(), value: '#D5DBDB' },
    ];
  }

  static toName(metric: number): string {
    return this.labels[metric];
  }

  static toMeasure(gen: GenerationStatistic, metric: number, name: any): any {
    let newItem;
    switch (metric) {
      case 0: {
        newItem = { name, value: gen.born };
        break;
      }
      case 1: {
        newItem = { name, value: gen.died };
        break;
      }
      case 2: {
        newItem = { name, value: gen.alive };
        break;
      }
      case 3: {
        newItem = { name, value: gen.dead };
        break;
      }
      case 4: {
        newItem = { name, value: gen.averageAgeOfDeath };
        break;
      }
      case 5: {
        newItem = { name, value: gen.immortals };
        break;
      }
      case 6: {
        newItem = { name, value: gen.born + gen.died };
        break;
      }
      case 7: {
        newItem = { name, value: gen.pristine };
        break;
      }
    }
    return newItem;
  }
}
