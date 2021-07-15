String.prototype.firstUpper = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class Content {
  constructor(...values) {
    this.month = {
      start: values[0],
      end: values[2],
    };
    this.price = {
      start: Number(values[1].match(/\d+/)),
      end: Number(values[3].match(/\d+/)),
      get diff() { return this.start - this.end },
    };
  }

  get verb() {
    const diff = this.price.diff;
    if (diff === 0) return 'remained flat';
    else if (diff < 0) return 'rose';
    else if (diff > 0) return 'fell';
  }

  get abverb() {
    const percentage = Math.abs(this.price.diff) / this.price.start;
    if(percentage >= 0.7) return "substantially";
    else if (percentage >= 0.3) return 'moderately' ;
    else return 'slightly';
  }

  get term() {
    const price = this.price;
    const month = this.month;
    if (price.diff == 0) return `at ${price.start} from ${month.start} to ${month.end}`;
    else return `from ${price.start} in ${month.start} to ${price.end} in ${month.end}`;
  }
}

class SentenceGenerator {
  /**
   * constructor
   * @param {Array<Content>} contents
   */
  constructor(subject, contents) {
    this.subject = subject;
    this.contents = contents;
    this.strucutuers = [
      "$subject $verb $adverb $term.",
      "$subject $verb $term.",
    ]
  }

  createSubjects() {
    const [_, multi] = this.subject.match(/^The number of (.+)/);
    return [
      this.subject,
      `${multi.firstUpper()} number`,
      `The number of them`,
      `The number`,
      `It`
    ];
  }

  sentences() {
    const subjects = this.createSubjects();
    return this.contents.map((c, i) => {
      return this.strucutuers[i % this.strucutuers.length]
        .replace('$subject', subjects[i])
        .replace('$verb', c.verb)
        .replace('$adverb', c.abverb)
        .replace('$term', c.term);
    });
  }
}

/**
 * create appropriate sentence from 11 values
 */
function createSentences(values) {
  const contents = [
    new Content(...values.slice(1, 5)),
    new Content(...values.slice(3, 7)),
    new Content(...values.slice(5, 9)),
    new Content(...values.slice(7, 11)),
    new Content(...values.slice(9)),
  ];

  const generator = new SentenceGenerator(values[0], contents);

  return generator.sentences();
}
