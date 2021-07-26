export class Store {

  static verbType = {
    positive: 'positive',
    negative: 'negative',
    nenutral: 'nenutral',
  }

  constructor() {
    this.data = {
      verb: fetch('./data/verb.json').then(v => v.json()),
      adverb: fetch('./data/adverb.json').then(v => v.json()),
    };
    this.counts = {
      verb: new Set(),
      adverb: new Set(),
    }
  }

  get verbs() {
    return this.data.verb;
  }
  get adverbs() {
    return this.data.adverb;
  }

  next(list, set, br = false) {
    for (const item of list) {
      if (!set.has(item)) {
        set.add(item);
        return item;
      }
    }
    set.clear();
    if (br) return { word: '' };
    set.add(list[0]);
    return list[0] ?? { word: '' };
  }

  async findVerb(verbType) {
    const verbs = (await this.verbs).filter(e => e.mean === verbType);
    return this.next(verbs, this.counts.verb);
  }

  percentageToLevel(per) {
    per *= 100;
    if (per >= 70) {
      return 70;
    } else if (per >= 30) {
      return 30;
    } else if (per >= 10) {
      return 10;
    }
    return 0;
  }

  async findAdverb(percentage) {
    const level = this.percentageToLevel(percentage);
    const adverbs = (await this.adverbs).filter(e => e.level === level);
    return this.next(adverbs, this.counts.adverb, true);
  }
}
