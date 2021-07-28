/**
 *
 */

export class Store {

  /**
   * this is type of verb
   */
  static meanType = {
    positive: 'positive',
    negative: 'negative',
    nenutral: 'nenutral',
  }

  constructor() {
    this.data = {
      verb: fetch('./data/verb.json').then(v => v.json()),
      adverb: fetch('./data/adverb.json').then(v => v.json()),
      noun: fetch('./data/noun.json').then(v => v.json()),
    };
    this.counts = {
      verb: new Set(),
      adverb: new Set(),
      nouns: new Set(),
    }
  }

  /**
   * @typedef {Object} Word
   * @property {number} id
   * @property {string} word
   * @property {string} mean
   * @property {string|null} pre
   * @property {string|null} pair
   * @property {string|null} level
  */
  // {
  //   "id": 1,
  //   "word": "increased",
  //   "mean": "positive",
  //   "pre": "a",
  //   "pair": 4
  //   "level": 30
  // },

  /**
   * @returns {Promise<Word[]>}
   */
  get verbs() {
    return this.data.verb;
  }

  /**
   * @returns {Promise<Word[]>}
   */
  get adverbs() {
    return this.data.adverb;
  }

  /**
   * @returns {Promise<Word[]>}
   */
  get nouns() {
    return this.data.noun;
  }

  /**
   * get next word from list by calcurate from set
   * @param {Word[]} list
   * @param {Set<Word>} set
   * @param {boolean} br
   * @returns {Word} next word
   */
  next(list, set, br = false) {
    for (const item of list) {
      if (!set.has(item)) {
        set.add(item);
        return item;
      }
    }
    if (list.length === 0) return { word: '' };
    set.clear();
    if (br) return { word: '' };
    set.add(list[0]);
    return list[0];
  }

  /**
   * find appropriate verb
   * @param {meanType} meanType
   * @returns {Promise<Word>}
   */
  async findVerb(meanType) {
    const verbs = (await this.verbs).filter(e => e.mean === meanType);
    return this.next(verbs, this.counts.verb);
  }

  /**
   * find appropriate adverb
   * @param {number} percentage
   * @returns {Promise<Word>}
   */
  async findAdverb(percentage) {
    const level = percentageToLevel(percentage);
    const adverbs = (await this.adverbs).filter(e => e.level === level);
    return this.next(adverbs, this.counts.adverb);
  }

  /**
   * find appropriate noun
   * @param {meanType} meanType
   * @returns {Promise<Word>}
   */  async findNoun(meanType) {
    const nouns = (await this.nouns).filter(e => e.mean === meanType);
    return this.next(nouns, this.counts.nouns);
  }
}

/**
 * convert percentage to level which used in json.
 * @param {number} per
 * @returns
 */
function percentageToLevel(per) {
    if (per >= 70) {
      return 70;
    } else if (per >= 30) {
      return 30;
    } else if (per >= 10) {
      return 10;
    }
    return 0;
  }
