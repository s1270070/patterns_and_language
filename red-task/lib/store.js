export class Store {

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

  get verbs() {
    return this.data.verb;
  }
  get adverbs() {
    return this.data.adverb;
  }
  get nouns() {
    return this.data.noun;
  }

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

  async findVerb(meanType) {
    const verbs = (await this.verbs).filter(e => e.mean === meanType);
    return this.next(verbs, this.counts.verb);
  }

  async findAdverb(percentage) {
    const level = percentageToLevel(percentage);
    const adverbs = (await this.adverbs).filter(e => e.level === level);
    return this.next(adverbs, this.counts.adverb);
  }

  async findNoun(meanType) {
    const nouns = (await this.nouns).filter(e => e.mean === meanType);
    return this.next(nouns, this.counts.nouns);
  }
}

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
