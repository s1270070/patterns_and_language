// add prototype capitalize the first letter.
String.prototype.firstUpper = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class Content {
  /**
   * constructor
   * @param  {...String} values
   */
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

  // get appropriate verb
  get verb() {
    const diff = this.price.diff;
    if (diff === 0) return 'remained flat';
    else if (diff < 0) return 'rose';
    else if (diff > 0) return 'fell';
  }

  // get appropriate abverb
  get abverb() {
    const percentage = Math.abs(this.price.diff) / this.price.start;
    if(percentage >= 0.7) return "substantially";
    else if (percentage >= 0.3) return 'moderately' ;
    else return 'slightly';
  }

  // get appropriate term
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
   * @param {String} subject
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

  /**
   * create subjects
   * @returns {Array<String>} subjects
   */
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

  /**
   * get generated sentences
   * @returns {Array<String>} sentences
   */
  get() {
    const subjects = this.createSubjects();
    return this.contents.map((c, i) => {
      return this.strucutuers[i % this.strucutuers.length]
        .replace('$subject', subjects[i])
        .replace('$verb', c.verb)
        .replace('$adverb', c.abverb)
        .replace('$term', c.term)
        .replaceAll(/\s+/g, ' ');
    });
  }
}

/**
 * call this function to generate sentences from inputs.
 */
function main(values) {
  // create cointent data from input value.
  const contents = [
    new Content(...values.slice(1, 5)),
    new Content(...values.slice(3, 7)),
    new Content(...values.slice(5, 9)),
    new Content(...values.slice(7, 11)),
    new Content(...values.slice(9)),
  ];
  const generator = new SentenceGenerator(values[0], contents);

  return generator.get();
}
