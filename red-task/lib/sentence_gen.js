import { Store } from './store.js'

// add prototype capitalize the first letter.
String.prototype.firstUpper = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export class SentenceGen {

  /**
   * constructor
   * @param {String} subject
   * @param {Array<Content>} contents
   */
  constructor(subject, contents) {
    this.subject = subject;
    this.contents = contents;

    this.store = new Store();
    this.index = 0;

    const maxPrice = this.contents.map(c => c.price.start).reduce((e, v) => e > v ? e : v);
    const maxMonth = this.contents.filter(c => c.price.start === maxPrice).map(c => c.month.start);
    const minPrice = this.contents.map(c => c.price.start).reduce((e, v) => e < v ? e : v);
    const minMonth = this.contents.filter(c => c.price.start === maxPrice).map(c => c.month.start);
    // console.log(maxMonth);
    this.strucutuers = [
      "$subject $adverb $verb $term.",
      "$term, $subject $adverb $verb.",
      "there was $noun_pre $noun $subject $term.",
      minMonth.length === 1
        ? `$subject bottomed out at ${minPrice} in ${minMonth}.`
        : "$subject $adverb $verb $term.",
      maxMonth.length === 1
        ? `In ${maxMonth}, $subject peaked at ${maxPrice}.`
        : "$term, $subject $adverb $verb.",
    ];
    this.flatTerm = "at $price_start from $month_start to $month_end";
    this.terms = [
      "from $price_start in $month_start to $price_end in $month_end",
      "from $price_start in $month_start by $diff",
      "by $diff to $price_end in $month_end",
      "from $price_start in $month_start to $price_end in $month_end",
      "from $price_start in $month_start by $diff",
    ];
  }

  get term() {
    const item = this.contents[this.index];
    const strc = item.price.diff == 0 ? this.flatTerm : this.terms.shift();
    return strc
      .replace('$price_start', item.price.start)
      .replace('$price_end', item.price.end)
      .replace('$month_start', item.month.start)
      .replace('$month_end', item.month.end)
      .replace('$diff', Math.abs(item.price.diff))
      .replaceAll(/\s+/g, ' ')
  }

  /**
   * create subjects
   * @returns {Array<String>} subjects
   */
  createSubjects() {
    const [_, multi] = this.subject.match(/^The number of (.+)/);
    return [
      this.subject.toLowerCase(),
      `${multi} number`,
      `the number of them`,
      `the number`,
      `it`
    ];
  }

  async get() {
    const content = this.contents[this.index];
    const structure = this.strucutuers.shift();
    const verb = await this.store.findVerb(content.price.meanType);
    const adverb = await this.store.findAdverb(content.price.percentage);
    const noun = await this.store.findNoun(content.price.meanType);
    // console.log(content.price.percentage);
    // console.log(adverb);
    return structure
      .replace('$subject', this.createSubjects()[this.index])
      .replace('$verb', verb.word)
      .replace('$adverb', adverb.word)
      .replace('$term', this.term)
      .replace('$noun_pre', noun.pre)
      .replace('$noun', noun.word)
      .replaceAll(/\s+/g, ' ')
      .replace(/\s+\.$/, '.')
      .firstUpper();
  }

  /**
   * get generated sentences
   * @returns {Array<String>} sentences
   */
  async next() {
    if (this.index < this.contents.length) {
      const sentence = await this.get();
      this.index++;
      return sentence;
    }
  }
}
