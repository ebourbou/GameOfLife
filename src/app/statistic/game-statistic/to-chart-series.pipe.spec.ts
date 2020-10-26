import { ToChartSeriesPipe } from "./to-chart-series.pipe";

describe("ToChartSeriesPipe", () => {
  it("create an instance", () => {
    const pipe = new ToChartSeriesPipe();
    expect(pipe).toBeTruthy();
  });
});
