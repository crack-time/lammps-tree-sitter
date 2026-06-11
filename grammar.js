module.exports = grammar({
  name: 'lammps',

  extras: $ => [/[ \t\f]/],

  rules: {
    source_file: $ => repeat($.line),

    line: $ => seq(
      optional(choice(
        seq($.command_name, optional($.arguments), optional($.inline_comment)),
        $.comment,
      )),
      '\n',
    ),

    command_name: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    arguments: $ => repeat1(choice(
      $.string,
      $.number,
      $.variable,
      $.operator,
      $.word,
      '(',
      ')',
      '{',
      '}',
      '[',
      ']',
    )),

    string: $ => choice(
      $.single_quote_string,
      $.double_quote_string,
    ),

    single_quote_string: $ => seq(
      "'",
      repeat(choice(
        /[^'\n\\]/,
        /\\./,
      )),
      "'",
    ),

    double_quote_string: $ => seq(
      '"',
      repeat(choice(
        /[^"$\n\\]/,
        /\\./,
        $.variable,
      )),
      optional('$'),
      '"',
    ),

    number: $ => token(choice(
      /[0-9]+\.[0-9]*([eE][+-]?[0-9]+)?/,
      /\.[0-9]+([eE][+-]?[0-9]+)?/,
      /[0-9]+[eE][+-]?[0-9]+/,
      /[0-9]+/,
    )),

    variable: $ => token(choice(
      /\$[a-zA-Z0-9]/,
      /\$\{[^}]*\}/,
      /\$\([^)]*\)/,
      /[vVfFcC]_[a-zA-Z_][a-zA-Z0-9_]*/,
    )),

    operator: $ => token(choice(
      /\+\+|--/,
      /[+\-*/^]/,
      /[<>=!]=/,
      /[<>]/,
      /\|\|/,
      /&&/,
      /\|[\^|]/,
    )),

    word: $ => /[^\s"'#$(){}\\[\\]\n]+/,

    comment: $ => token(/#.*/),

    inline_comment: $ => token(/#.*/),
  },
});
