var mongoose = require ("mongoose");
var db = require('../../models/principle');

var uristring = process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost:27017/flags';

var principles = [
  { order: 1,
    title: 'Keep it Simple',
    subTitle: 'The flag should be so simple that a child can draw it from memory',
    explanation: 'Flags flap and drape. Flags must be seen from a distance and from their opposite side. Under these circumstances, only simple designs make effective flags. Most poor designs have the elements of a great flag in them — simplify them by focusing on a single symbol, a few colors, large shapes, and no lettering. Avoid the temptation to include a symbol for everybody. Don\'t put a different design on the back.' },
  { order: 2,
    title: 'Use Meaningful Symbolism',
    subTitle: 'The flag\'s images, colours, or patterns should relate to what it symbolizes',
    explanation: 'Symbolism can be in the form of the main graphic element, in the colors used, or sometimes even in the shapes or layout of the parts of the flag. Usually a single primary symbol is best — avoid those that are less likely to be representative. Colors often carry meanings: red for blood or sacrifice, white for purity, blue for water or sky. Diagonal stripes are often used by former colonies as an alternative to the generally horizontal and vertical stripes of European countries.' },
  { order: 3,
    title: 'Use 2 to 3 Basic Colours',
    subTitle: 'Limit the number of colours on the flag to three, which contrast well and come from the standard color set',
    explanation: 'Basic flag colors are red, blue, green, black, yellow, and white. Occasionally other colors are also used, such as purple, gray, and orange, but they are seldom needed. Separate dark colors with a light color, and light colors with a dark color, to help them create effective contrast. More than four colors are hard to distinguish and make the flag unnecessarily complicated (and expensive!)' },
  { order: 4,
    title: 'No Lettering or Seals',
    subTitle: 'Never use writing of any kind or an organization\'s seal',
    explanation: 'Words defeat the purpose: why not just write\t"U.S.A." on a flag? A flag is a graphic symbol. Lettering is nearly impossible to read from a distance, hard to sew, and difficult to reduce to lapel–pin size. Seals were designed for placement on paper to be read at close range. Very few are effective on flags. Better to use some element from the seal as a symbol. Some logos work; most do' },
  { order: 5,
    title: 'Be Distinctive or Be Related',
    subTitle: 'Avoid duplicating other flags, but use similarities to show connections',
    explanation: 'This is perhaps the most difficult principle, but very important. Sometimes, good designs are already "taken". However, a flag\'s symbols, colours, and shapes can recall other flags—a powerful way to show heritage, solidarity, or connectedness. This requires knowledge of other flags. Often the best way to start the design process can be looking to one\'s "roots" in flags— by country, tribe, or religion.' }
];

mongoose.connect(uristring)
  .then(function () {
    console.log('Succeeded connected to: ' + uristring);
    return db.Principle.deleteMany({});
  })
  .then(function () {
    return db.Principle.create(principles);
  })
  .then(function (created) {
    created.forEach(function (principle) {
      console.log('*******PRINCIPLE CREATED******');
      console.log(principle.title);
    });
    console.log('*******DATABASE SEEDED******');
    process.exit();
  })
  .catch(function (err) {
    console.log('Error seeding principles: ' + err);
    process.exit(1);
  });
