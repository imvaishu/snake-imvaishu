const points = {
  food: 1
}

class Food {
  constructor(location, type) {
    this.location = location.slice();
    this.type = type;
  }

  get position() {
    return {
      location: this.location.slice(),
      type: this.type,
      point: points[this.type]
    }
  }

}