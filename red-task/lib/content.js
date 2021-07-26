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
      get verbType() {
        if (this.diff < 0) {
          return Store.verbType.negative;
        } else if (this.diff > 0) {
          return Store.verbType.positive;
        }
        return Store.verbType.nenutral;
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

// // get appropriate verb
// get verb() {
//   const diff = this.price.diff;
//   if (diff === 0) return 'remained flat';
//   else if (diff < 0) return 'rose';
//   else if (diff > 0) return 'fell';
// }

// // get appropriate abverb
// get abverb() {
//   const percentage = Math.abs(this.price.diff) / this.price.start;
//   if (percentage >= 0.7) return "substantially";
//   else if (percentage >= 0.3) return 'moderately';
//   else return 'slightly';
// }

// // get appropriate term
// get term() {
//   const price = this.price;
//   const month = this.month;
//   if (price.diff == 0) return `at ${price.start} from ${month.start} to ${month.end}`;
//   else return `from ${price.start} in ${month.start} to ${price.end} in ${month.end}`;
// }