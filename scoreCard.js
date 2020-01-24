class ScoreCard {
  constructor() {
    this.initialScore = 0;
  }
  get score() {
    return this.initialScore;
  }

  currentScore(point) {
    this.initialScore += point;
  }
}