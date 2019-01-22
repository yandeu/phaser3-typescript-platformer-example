type Level = string[]

// prettier-ignore
const emptyLevel: Level = [
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      '
]

// prettier-ignore
const level0: Level = [
  '    S          ',
  '  [////]       ',
  '               ',
  '   P         G ',
  '[/////]   [///]',
]

// prettier-ignore
const level1:Level=[
  '                 B                    ',
  '               [////]                 ',
  '              O     O                 ',
  '   S       B             S    S    G  ',
  '[//]       [////]   [////]   [//////] ',
  '    O   O                             ',
  ' P        B                           ',
  '[///]  [//]                           ',
  ]

// prettier-ignore
const level2: Level =[
  ' P                     [//]       G   ',
  '[/]    O   B        O           [/]   ',
  '         [//]     [//]                ',
  '      S                     B  B      ',
  ' O  [//]      B            [///]      ',
  '         O  [///]     []  O        O  ',
  '[]                                    ',
  '         [/]            [/]      [/]  '
]

// prettier-ignore
const level3: Level = [
  '       O                                    ',
  '                      O                 O   ',
  '      [///]                 O      [////]   ',
  '           [///]       S  [//]              ',
  '                   [///]      [///]         ',
  '             S                              ',
  '         [///]           O              G   ',
  '      O            O               [////]   ',
  '  P                     S  B                ',
  '[//////]       [///]  [////]                '
]

// prettier-ignore
const level4: Level = [
  '                        O  O         S                                  ',
  '                                 [//////]           B                G  ',
  '                  O    [/////]                [///////]          [////] ',
  '                                                                        ',
  '  P      S     B    B              O       S     S         S            ',
  '[////////]  [///////]             [/]    [////////////////////]         '
]

const Levels: Level[] = [level0, level1, level2, level3, level4]
export default Levels
