import { Store } from './store.js'

export class Content {

  #month;
  #price;
  /**
   * constructor
   * @param  {...String} values
   */
  constructor(...values) {
    this.#month = {
      start: values[0],
      end: values[2],
    };
    this.#price = {
      start: Number(values[1].match(/\d+/)),
      end: Number(values[3].match(/\d+/)),
      get diff() { return this.start - this.end },
      get percentage() { return Math.round((Math.abs(this.diff) / this.start) * 100) },
      get meanType() {
        if (this.diff < 0) {
          return Store.meanType.negative;
        } else if (this.diff > 0) {
          return Store.meanType.positive;
        }
        return Store.meanType.nenutral;
      }
    };
  }

  get month() {
    return this.#month;
  }

  get price() {
    return this.#price;
  }
}
