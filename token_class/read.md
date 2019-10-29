//(test-token) ---- [tan(x)+cot(x)]

//Value weightage Custom Token

[ { string: 'sin(x)+cos(x)', score: 0.7995517297795267 },
  { string: 'ln(x)*cos(y)', score: 0.6092129714601918 },
  { string: 'ax^2+bx+c', score: 0.030196732244500687 },
  { string: '10x^2+5x+7', score: 0.0885374603205069 } ]


// Meta Weightage Custom Token

[ { string: 'sin(x)+cos(x)', score: 1 },
  { string: 'ln(x)*cos(y)', score: 0.7627700713964737 },
  { string: 'ax^2+bx+c', score: 0 },
  { string: '10x^2+5x+7', score: 0 } ]

//Ordinary Token

[ { string: 'sin(x)+cos(x)', score: 0.6376965110109329 },
  { string: 'ln(x)*cos(y)', score: 0.5579435144773824 },
  { string: 'ax^2+bx+c', score: 0.36186319208859774 },
  { string: '10x^2+5x+7', score: 0.02104110101705385 } ]



  //(test-token) ----  ['log(y)*cot(z)']

  [ { string: 'ln(x)*cos(y)', score: 0.978184514528909 },
  { string: 'sin(x)+cos(x)', score: 0.553965674756632 },
  { string: 'ax^2+bx+c', score: 0.011100159376998157 },
  { string: '10x^2+5x+7', score: 0 } ]


  [ { string: 'sin(x)+cos(x)', score: 0.7627700713964737 },
  { string: 'ln(x)*cos(y)', score: 0.9999999999999998 },
  { string: 'ax^2+bx+c', score: 0 },
  { string: '10x^2+5x+7', score: 0 } ]

  [ { string: 'sin(x)+cos(x)', score: 0.5371904924002783 },
  { string: 'ln(x)*cos(y)', score: 0.8693134954342713 },
  { string: 'ax^2+bx+c', score: 0 },
  { string: '10x^2+5x+7', score: 0 } ]