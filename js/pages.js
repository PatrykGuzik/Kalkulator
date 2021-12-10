// tworzymy kolejne strony
// rodzaje inputów: Radio Number Slider Checkbox
// kategorie: TRANSPORT, ENERGIA DOMU, ODPADY, JEDZENIE, ROZRYWKA, STYL ŻYCIA
//Page(nr1, nr2, type_input, cat_name, question_nr, info=false, radio_checkbox_questions=false)
const cat_test = "ENERGIA DOMU";

let p1 = new Page(0,3,
  "Slider",
  "TRANSPORT",
  "Pytanie 1",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );

let p2 = new Page(3,4,
  "Radio",
  "ENERGIA DOMU",
  "Pytanie 2",
  false,
  ["lorem ipsum 1","lorem ipsum 2","lorem ipsum 3","lorem ipsum 4","lorem ipsum 3","lorem ipsum 4"]
  );

let p3 = new Page(4,5,
  "Checkbox",
  "ODPADY",
  "Pytanie 3",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  ["lorem ipsum 1","lorem ipsum 2","lorem ipsum 3","lorem ipsum 4","lorem ipsum 3","lorem ipsum 4"]
  );

let p4 = new Page(5,6,
  "Number",
  "JEDZENIE",
  "Pytanie 4",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );

let p5 = new Page(6,7,
  "Slider",
  "ROZRYWKA",
  "Pytanie 5",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );

let p6 = new Page(7,8,
  "Slider",
  "STYL ŻYCIA",
  "Pytanie 6",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );






const pages_list = [p1,p2,p3,p4,p5,p6];
