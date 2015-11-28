# Translate Maker

Universal translation library. This module is core of the www.translatemaker.com

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/translate-maker.svg?style=flat-square
[npm-url]: https://www.npmjs.com/CherrySoftware/translate-maker
[travis-image]: https://img.shields.io/travis/CherrySoftware/translate-maker/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/CherrySoftware/translate-maker
[coveralls-image]: https://img.shields.io/coveralls/CherrySoftware/translate-maker/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/CherrySoftware/translate-maker?branch=master


# Installation

Install via npm.

```sh
npm install translate-maker
```

# Features

- Build on standards ([ICU Message syntax](http://userguide.icu-project.org/formatparse/messages), [Unicode CLDR](http://cldr.unicode.org/))
- JSON Structure
- Nested and reference translations
- Variables
- Conditioned translations (Plurals, Gender etc...)
- Default translations

# Usage

### Basic

```js
import Translate from 'translate-maker';

const t = new Translate();

// add new translation named greeting
t.set('greeting', 'Good morning');

// get translation by key greeting
const result = t.get('greeting');
console.log(result); // => Good morning
```

### Basic set with JSON

You can set translation by (key, value) or like an object
```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  greeting: 'Good morning'
});

const result = t.get('greeting');
console.log(result); // => Good morning
```

### Basic get with object notation

Each translation is available with object notation.
```js
import Translate from 'translate-maker';

const t = new Translate();
t.set('greeting', 'Good morning');

const result = t.greeting.get();
console.log(result); // => Good morning
```

### External variables

You can use your own variables from your code. Use the dollar syntax { $name }.

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  greeting: 'Good morning {$name}'
});

const result = t.get('greeting', {
  name: 'Zlatko'
});
console.log(result); // => Good morning Zlatko

const result2 = t.greeting.get({
  name: 'Zlatko'
});
console.log(result2); // => Good morning Zlatko
```

### Nested external variables

Very often is your variable an object for example user can contains firstName and lastName etc...

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  greeting: 'Good morning {$user.firstName} {$user.lastName}'
});

const user = {
  firstName: 'Zlatko',
  lastName: 'Fedor'
};

const result = t.get('greeting', {
  user: user
});
console.log(result); // => Good morning Zlatko Fedor

const result2 = t.greeting.get({
  user: user
});
console.log(result2); // => Good morning Zlatko Fedor
```

### Reference translation

You can reference other translations in a string by using the brace syntax { name }. There is no dollar.

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  morning: 'morning',
  greeting: 'Good {morning} {$name}'
});

const result = t.get('greeting', {
  name: 'Zlatko'
});
console.log(result); // => Good morning Zlatko

// you can use object notation
const result2 = t.greeting.get({
  name: 'Zlatko'
});
console.log(result2); // => Good morning Zlatko
```

### Multiple variants

You can reference other translations in a string by using the brace syntax { name }.
```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  dayparts: {
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening'
  },
  greeting: {
    morning: 'Good {dayparts.morning} {$name}',
    afternoon: 'Good {dayparts.afternoon} {$name}',
    evening: 'Good {dayparts.evening} {$name}'
  }
});

const result = t.get('greeting.afternoon', {
  name: 'Zlatko'
});
console.log(result); // => Good afternoon Zlatko

// you can use object notation
const result2 = t.greeting.evening.get({
  name: 'Zlatko'
});
console.log(result2); // => Good evening Zlatko
```

### Default variants

You can set one variant as default with underscore "_" at the beginning.
```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  dayparts: {
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening'
  },
  greeting: {
    _morning: 'Good {dayparts.morning}',
    afternoon: 'Good {dayparts.afternoon}',
    evening: 'Good {dayparts.evening}'
  }
});

const result = t.get('greeting');
console.log(result); // => Good morning

// you can use object notation
const result2 = t.greeting.get();
console.log(result2); // => Good morning
```

### Default variants for references

You can set default variant for reference too.
```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  dayparts: {
    _morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening'
  },
  greeting: {
    _morning: 'Good {dayparts}',
    afternoon: 'Good {dayparts.afternoon}',
    evening: 'Good {dayparts.evening}'
  }
});

const result = t.get('greeting');
console.log(result); // => Good morning

// you can use object notation
const result2 = t.greeting.get();
console.log(result2); // => Good morning
```

### Combination external variables and references

You can use JSON structure as well

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  dayparts: {
    _morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening'
  },
  greeting: 'Good {dayparts.$daypartVariant} {$user.name}',
});

const user = {
  name: 'Zlatko'
};

const result = t.get('greeting', {
  daypartVariant: 'afternoon',
  user: user
});
console.log(result); // => Good afternoon Zlatko

// you can use object notation
const result2 = t.greeting.get({
  daypartVariant: 'evening',
  user: user
});
console.log(result2); // => Good evening Zlatko
```

### Escape variable notation

If you want to escape {name} use \{name\}

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  dayparts: {
    _morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening'
  },
  greeting: 'Good \\{dayparts.$daypartVariant\\} \\{$user.name\\}',
});

const user = {
  name: 'Zlatko'
};

const result = t.get('greeting', {
  daypartVariant: 'afternoon',
  user: user
});
console.log(result); // => Good {dayparts.$daypartVariant} {$user.name}
```

### Conditional translation

Sometimes you want to show different translation based on Gender or Tense or other enumerable variables.
The logic is equivalent to the IF statement. Default option is option without variables. You can use number of variables as you want. In next example we are using variables "past", "future" and default value.

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  run: `{$user.name} {$tense, select,
    past   {ran}
    future {will run}
           {is running}
  }`
});

const user = {
  name: 'Zlatko'
};

const result = t.get('run', {
  tense: 'future',
  user: user
});
console.log(result); // => Zlatko will run
```

### Complex example of the conditional translation

Here is little bit complex gender example where is translation based on two external variables.

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  working: `{$user1.gender, select,
    male   {Boy}
    female {Girl}
  } {$user1.name} is working with {$user2.gender, select,
    male   {boy}
    female {girl}
  } {$user2.name}`,
});

const user1 = {
  gender: 'male',
  name: 'Zlatko'
};

const user2 =  {
  gender: 'female',
  name: 'Livia'
};

const result = t.get('working', {
  user1: user1,
  user2: user2
});
console.log(result); // => Boy Zlatko is working with girl Livia
```

### Combination of the conditional translation and reference translation

<<<<<<< 33273558df89ff1ee1f92d49555aee38e6e9cfb0
Sometimes you want to show different translation based on Gender, Plural, Tense or other enumerable variables.
The logic is equivalent to the IF statement. The main difference is that you need to use array.
Default option is option without variables. You can use as many variables as you want (For example we are using two external variables in gender).
=======
As you can see in the example above we are using gender selection twice. We can avoid duplication with reference translation. We are able to send into the nested translation different argments. Please take a look on the keyword "as".
>>>>>>> c3a26b663e6e8435c837ba4e9a8d7a426ad2b4c0

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  gender: `{$gender, select, male {boy} female {girl}}`,
  working: `{gender, $user1.gender as gender} {$user1.name} working with {gender, $user2.gender as gender} {$user2.name}`,
});

const user1 = {
  gender: 'male',
  name: 'Zlatko'
};

const user2 =  {
  gender: 'female',
  name: 'Livia'
};

const result = t.get('working', {
  user1: user1,
  user2: user2
});
console.log(result); // => boy Zlatko is working with girl Livia
```

### Filters

As you can see our two examples above are not same. We have two diferent results:
1. Boy Zlatko is working with girl Livia
2. boy Zlatko is working with girl Livia

We need to capitalize first character. For this behavior we have filters.
Here is a very simple example

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  greeting: `Hello {$name | uppercase}`,
});

const result = t.get('working', {
  name: 'Zlatko'
});

console.log(result); // => Hello ZLATKO
```

It is very simple to rewrite our working example

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  gender: `{$gender, select, male {boy} female {girl}}`,
  working: `{gender, $user1.gender as gender | capitalize} {$user1.name} working with {gender,
  $user2.gender as gender} {$user2.name}`,
});

const user1 = {
  gender: 'male',
  name: 'Zlatko'
};

const user2 =  {
  gender: 'female',
  name: 'Livia'
};

const result = t.get('working', {
  user1: user1,
  user2: user2
});
console.log(result); // => Boy Zlatko is working with girl Livia
```

### Plural example

<<<<<<< 33273558df89ff1ee1f92d49555aee38e6e9cfb0
For this task you can use conditional translations as well. As you can see in the example below there is built-in function named "plural" which is inside instance of the Translate. Maybe you are asking why you need to use function outside of the translation. This question has simple answer: flexibility. That mean you can use what do you want without any borders. Translate has only one build-in method which is "plural" and it depends on the current translation locale.
=======
For this task you can use conditional translations as well.
>>>>>>> c3a26b663e6e8435c837ba4e9a8d7a426ad2b4c0

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  followers: `{$user.name} has {$user.followers, plural
    zero  {no followers}
    one   {{$user.followers} follower}
    other {{$user.followers} followers}
  }`
});

const user = {
  name: 'Zlatko',
  followers: 15,
};

const result = t.get('followers', {
  user: user
});
console.log(result); // => Zlatko has 15 followers
```

You can use "#" instead of variable. In next example character "#" will equal $user.followers

```js
import Translate from 'translate-maker';

const t = new Translate();
t.set({
  followers: `{$user.name} has {$user.followers, plural
    zero {no followers}
    one  {# follower}
         {# followers}
  }`
});

const user = {
  name: 'Zlatko',
  followers: 15,
};

const result = t.get('followers', {
  user: user
});
console.log(result); // => Zlatko has 15 followers
```

Plural function is using module CLDR which can have one of these values based on your current locale:
```js
['zero', 'one', 'two', 'few', 'many', 'other']

or you can use exact value
 =1 when value is equal 1
 =2' when value is equal 2
 =3 when value is equal 3
 ...
```

You can use predefined constant named Plural instead of String representation

```js
import Translate, { Plural } from 'translate-maker';

const t = new Translate();
t.set({
  followers: `{$user.name} has {$user.followers, plural
    ${Plural.ZERO} {no followers}
    ${Plural.ONE}  {# follower}
                   {# followers}
  }`
});
```

You can use predefined constant named Gender instead of String representation

```js
import Translate, { Gender } from 'translate-maker';

const t = new Translate();
t.set({
  working: `{$user1.gender, select,
    ${Gender.MALE}   {Boy}
    ${Gender.FEMALE} {Girl}
  } {$user1.name} is working with {$user2.gender, select,
    ${Gender.MALE}   {boy}
    ${Gender.FEMALE} {girl}
  } {$user2.name}`,
});

const user1 = {
  gender: 'male',
  name: 'Zlatko'
};

const user2 =  {
  gender: 'female',
  name: 'Livia'
};

const result = t.get('working', {
  user1: user1,
  user2: user2
});
console.log(result); // => Boy Zlatko is working with girl Livia
```

# Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

```sh
npm install
```

Then run the tests:

```sh
npm test
```

