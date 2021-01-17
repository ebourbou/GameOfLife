import { LastGenerationToPercentagePipe } from './last-generation-to-percentage.pipe';
import { GenerationStatistic } from '../../shared/model/generation-statistic';

describe('LastGenerationToPercentagePipe', () => {
  const pipe = new LastGenerationToPercentagePipe();
  const statisticTemplate = {
    alive: 0,
    averageAgeOfDeath: 0,
    born: 0,
    dead: 0,
    died: 0,
    generation: 0,
    immortals: 0,
    pristine: 0,
    totalGenerations: 0,
  };

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should map born', () => {
    const statistics = new Array<GenerationStatistic>();
    const last = Object.assign({}, statisticTemplate);
    last.dead = 10;
    last.alive = 10;
    last.born = 8;
    statistics.push(last);
    expect(pipe.transform(statistics, [0])).toEqual([{ name: 'Geborene', value: 40 }]);
  });

  it('should map pioneers', () => {
    const statistics = new Array<GenerationStatistic>();
    const last = Object.assign({}, statisticTemplate);
    last.dead = 10;
    last.alive = 10;
    last.immortals = 5;
    statistics.push(last);
    expect(pipe.transform(statistics, [5])).toEqual([{ name: 'Pioniere', value: 25 }]);
  });

  it('should map dead and spectators', () => {
    const statistics = new Array<GenerationStatistic>();
    const last = Object.assign({}, statisticTemplate);
    last.dead = 10;
    last.alive = 10;
    last.pristine = 2;
    statistics.push(last);
    expect(pipe.transform(statistics, [3, 7])).toEqual([
      { name: 'Tote', value: 40 }, // pristine are discounted from the deads
      { name: 'Zuschauer', value: 10 },
    ]);
  });

  it('should map state switches', () => {
    const statistics = new Array<GenerationStatistic>();
    const last = Object.assign({}, statisticTemplate);
    last.dead = 10;
    last.alive = 10;
    last.born = 5;
    last.died = 5;
    statistics.push(last);
    expect(pipe.transform(statistics, [6])).toEqual([{ name: 'Zustandsänderungen', value: 50 }]);
  });
});
