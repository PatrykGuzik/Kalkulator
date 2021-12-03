// zapisane odpowiedzi
let answers = [];


// tworzymy WSZYSTKIE slider_boxy (w zależności od ilości pytań) które
// ukrywamy przez "display:none;"
let form_items = [];
for (var i = 0; i < list_questoins.length; i++) {
  form_items[i] = '<div id="form_item_box_'+i+'" class="form-item-box" style="display:none; " ></div>';
  let form_main_inner = document.querySelector(".form-main-inner");
  form_main_inner.innerHTML += form_items[i];
}


function FormItem(nr, question) {
  this.nr = nr;
  this.question = question;
  name_values = ["bardzo mało", "mało", "średnio", "dużo", "bardzo dużo"];

  this.drawSlider= function(slider_box) {
    // twożymy pojemnik na pytanie, wartość i slider
    let sliderBox = document.querySelector(slider_box);
    sliderBox.innerHTML = '<div class="slider-question">'+this.question+'</div><div class="slider-value" id="v'+this.nr+'"></div><input class="slider form-item" id="s'+this.nr+'" value="3" type="range" min="1" max="5">';
    // zaczepiamy się o zawartość pojemnika
    let info_value = document.querySelector('#v'+this.nr+'');
    let slider = document.querySelector('#s'+this.nr+'');

    // jeżeli ktoś wcześniej zaznaczył odpowiedź to ją przywracamy
    if(answers[nr]){
      this.value = answers[nr];
      slider.value = answers[nr];
    }

    answers[nr] = slider.value;
    info_value.innerHTML = name_values[slider.value-1];
    // jeżeli ktoś zmieniwartość na sliderze aktualizujemy dane i zmieniamy wyświetlaną wartość
    slider.addEventListener("input", myFunction);
    function myFunction() {
      answers[nr] = slider.value;
      info_value.innerHTML = name_values[slider.value-1];
    };
  }

  this.drawInputNumber= function(input_number_box) {
    // twożymy pojemnik na pytanie, wartość i slider
    let inputNumberBox = document.querySelector(input_number_box);
    inputNumberBox.innerHTML = '<div class="slider-question">'+this.question+'</div><input class="input-number form-item" id="s'+this.nr+'"  type="number" placeholder="km">';

    // zaczepiamy się o zawartość pojemnika
    let inputNumber = document.querySelector('#s'+this.nr+'');

    // jeżeli ktoś wcześniej zaznaczył odpowiedź to ją przywracamy
    if(answers[nr]){
      this.value = answers[nr];
      inputNumber.value = answers[nr];
    }

    // answers[nr] = inputNumber.value;
    // jeżeli ktoś zmieniwartość na sliderze aktualizujemy dane i zmieniamy wyświetlaną wartość
    inputNumber.addEventListener("input", myFunction);
    function myFunction() {
      answers[nr] = inputNumber.value;

    };

  }

  this.drawRadio=function(input_radio_box, questions) {
    let radio = '';
    for (var i = 0; i < questions.length; i++) {
      radio += '<div class="radio-inner"><label><input class="radio form-item" value="'+i+'"  type="radio" name="n'+this.nr+'"><span> '+ questions[i] +' </span></label></div>'
    }

    let inputRadioBox = document.querySelector(input_radio_box);
    inputRadioBox.innerHTML = '<div class="slider-question">'+this.question+'</div> <div class="radio"><form  id="s'+this.nr+'"> '+ radio +'</form><div>';

    // zaczepiamy się o zawartość pojemnika
    let radioBox = document.querySelector('#s'+this.nr+'');
    let radioCont = document.getElementsByName('n'+this.nr+'');

    if(answers[nr]){
      this.value = answers[nr];
      radioCont[this.value].checked = true;
    }

    radioBox.addEventListener("input", myFunction);
    function myFunction() {
      for(i = 0; i < radioCont.length; i++){
        if(radioCont[i].checked){
          answers[nr] = radioCont[i].value;
        }
      }

    };
  }
}


function Page(nr1, nr2, type_input, cat_name, question_nr, info=false, radio_checkbox_questions=false) {
//                               TRANSPORT                                 ENERGIA DOMU                             ODPADY                                    JEDZENIE                                   ROZRYWKA                              STYL ŻYCIA
  this.bg_img_list =           ["media/transport.png",                "media/home_energy.png",                  "media/waste.png",                       "media/food.png",                         "media/entertainment.png",             "media/lifestyle.png"];
  this.img_btn_left_list =     ["media/arrow-left.png",               "media/arrow-left-white.png",             "media/arrow-left-white.png",            "media/arrow-left-white.png",            "media/arrow-left-white.png",           "media/arrow-left-white.png"];
  this.img_btn_right_list =    ["media/arrow-right.png",              "media/arrow-right-white.png",            "media/arrow-right-white.png",           "media/arrow-right-white.png",           "media/arrow-right-white.png",          "media/arrow-right-white.png"];
  this.img_logo_list =         ["media/LOGO_DARK_BLUE.png",           "media/LOGO_WHITE.png",                   "media/LOGO_WHITE.png",                  "media/LOGO_GREEN.png",                  "media/LOGO_RED.png",                   "media/LOGO_DARK_BLUE.png"];
  this.position_list =         ["auto auto auto auto",                "auto auto auto 70px",                    "auto 70px auto auto",                   "auto auto auto auto",                   "auto auto auto 70px",                  "auto auto auto auto"];
  this.main_color_list =       ["#374470",                            "white",                                  "white",                                 "rgb(60, 129, 78)",                      "rgb(250, 78, 86)",                     "rgb(55, 68, 112)"];
  this.main_header_color_list= ["#374470",                            "white",                                  "rgb(76, 53, 68)",                       "rgb(60, 129, 78)",                      "rgb(250, 78, 86)",                     "rgb(226, 109, 159)"];
  this.form_box_color_list =   ["rgba(255,255,255,0.8)",              "rgba(0,0,0,0.8)",                        "rgba(57, 42, 67, 0.8)",                 "rgba(221, 242, 243, 0.8)",              "rgba(220, 219, 182, 0.8)",             "rgba(255, 230, 241, 0.8)"];
  this.slider_color_list=      [["rgb(55, 68, 112)","white"],         ["white","black"],                        ["white","rgba(57, 42, 67)"],            ["rgb(60, 129, 78)","white"],            ["rgb(250, 78, 86)","white"],           ["rgb(55, 68, 112)","white"]]
  this.input_number_color_list=[["transparent","rgb(55, 68, 112)","rgb(55, 68, 112)"],["transparent","white","white"],["transparent","white","white"],   ["transparent","rgb(60, 129, 78)","rgb(60, 129, 78)"],["transparent","rgb(250, 78, 86)","rgb(250, 78, 86)"],["transparent","rgb(55, 68, 112)","rgb(55, 68, 112)"]]
  this.radio_color_list =      ["rgb(55, 68, 112)",                   "white",                                  "white",                                 "rgb(60, 129, 78)",                      "rgb(250, 78, 86)",                     "rgb(55, 68, 112)"]
  this.type_input = type_input;
  this.cat_name = cat_name;
  this.question_nr = question_nr;
  this.info = info;
  // this.count_questions = nr2 - nr1;
  // this.checked = 0;
  this.radio_checkbox_questions = radio_checkbox_questions;


  this.form_items_list = []
  this.drawPage= function() {
    //Dodajemy kontrolki formularza
    this.changeFormItems();



    switch (this.cat_name) {
    	case "TRANSPORT":     this.changeElements(0);
                            break;

    	case "ENERGIA DOMU":  this.changeElements(1);
                            break;

    	case "ODPADY":        this.changeElements(2);
                            break;

    	case "JEDZENIE":      this.changeElements(3);
                            break;

    	case "ROZRYWKA":      this.changeElements(4);
                            break;

    	case "STYL ŻYCIA":    this.changeElements(5);
                            break;
    }
  }
  this.changeElements = function(nr) {
    this.changeCategoryName()
    this.changeCategoryBarItem(nr);
    this.changeBackground(nr);
    this.changeArrows(nr);
    this.changeLogo(nr);
    this.changePosition(nr);
    this.changeColor(nr);
    this.changeQuestionNr();
    this.changeFormBoxColor(nr);
    this.changeInfo();
    this.changeFormItemsColor(nr);
  }
// TODO: dokończyć funkcję sprawdzającą czy pola zostały wypełnione
  this.is_full = function() {
    if(true){
      return this.count_questions;
    }
  }

  this.changeFormItems = function() {
    // znikamy WSZYSTKIE form_item_boxy
    for (var i = 0; i < form_items.length; i++) {
      let sb = document.getElementById('form_item_box_'+i+'') // sb - slider_box
      sb.style.display = "none";
    }

    // włączmy te form_item_boxy które są potrzebne
    for (var i = nr1; i < nr2; i++) {
      let sb = document.getElementById('form_item_box_'+i+'')
      sb.style.display = "block";

      // dodajemy nowego Form_itema na listę i go rysujemy
      this.form_items_list[i] = new FormItem(i, list_questoins[i]); // list_questoins[i] - pytanie z globalnej listy

      switch (this.type_input) {
      	case "Slider": this.form_items_list[i].drawSlider('#form_item_box_'+i+''); break;
      	case "Number": this.form_items_list[i].drawInputNumber('#form_item_box_'+i+''); break;
        case "Radio" : this.form_items_list[i].drawRadio('#form_item_box_'+i+'',this.radio_checkbox_questions); break;
      }
    }
  }

  this.changeCategoryName = function() {
    let cat_name = document.querySelector(".category-name");
    cat_name.innerHTML = this.cat_name;
  }

  this.changeCategoryBarItem = function(nr) {
    let cat1 = document.getElementById('cat1');
    let cat2 = document.getElementById('cat2');
    let cat3 = document.getElementById('cat3');
    let cat4 = document.getElementById('cat4');
    let cat5 = document.getElementById('cat5');
    let cat6 = document.getElementById('cat6');
    let cat_list = [cat1,cat2,cat3,cat4,cat5,cat6];

    for (var i = 0; i < cat_list.length; i++) {
      cat_list[i].classList.remove("active");
      cat_list[i].style.backgroundColor = "#8A8A8A";
    }
    cat_list[nr].classList.add("active");
    cat_list[nr].style.backgroundColor = this.main_header_color_list[nr];
  }

  this.changeBackground = function(nr) {
    let parallax = document.querySelector(".parallax");
    parallax.style.backgroundImage = 'url('+this.bg_img_list[nr]+')';
  }

  this.changeArrows = function(nr) {
    let img_btn_left = document.querySelector("#btn-left");
    let img_btn_right = document.querySelector("#btn-right");
    img_btn_left.innerHTML = '<img class="img-btn" src="'+this.img_btn_left_list[nr]+'" width="35px" alt="">';
    img_btn_right.innerHTML = '<img class="img-btn" src="'+this.img_btn_right_list[nr]+'" width="35px" alt="">';
  }

  this.changeLogo = function(nr) {
    let img_logo = document.querySelector(".logo");
    img_logo.innerHTML = '<img src="'+this.img_logo_list[nr]+'" alt="logo" width="300px">';
  }

  this.changePosition = function(nr) {
    let form_box = document.querySelector(".form-box");
    form_box.style.margin = this.position_list[nr];
  }

  this.changeColor = function(nr) {
    document.body.style.color = this.main_color_list[nr];
    let form_header =document.querySelector(".form-header");
    form_header.style.color = this.main_header_color_list[nr];

  }

  this.changeQuestionNr = function() {
    let question_nr = document.querySelector(".question-nr");
    question_nr.innerHTML = this.question_nr;
  }

  this.changeFormBoxColor = function(nr) {
    let form_color = document.querySelector(".form-main-inner");
    let info_color = document.querySelector(".form-info");
    form_color.style.backgroundColor = this.form_box_color_list[nr];
    info_color.style.backgroundColor = this.form_box_color_list[nr];
  }

  this.changeFormItemsColor = function(nr) {
    // Slider
    document.documentElement.style.setProperty('--mainSliderColor', this.slider_color_list[nr][0]);
    document.documentElement.style.setProperty('--wheelSliderColor', this.slider_color_list[nr][1]);

    // number
    document.documentElement.style.setProperty('--mainInputNumberColor', this.input_number_color_list[nr][0]);
    document.documentElement.style.setProperty('--borderInputNumberColor', this.input_number_color_list[nr][1]);
    document.documentElement.style.setProperty('--fontInputNumberColor', this.input_number_color_list[nr][2]);

    // radio
    document.documentElement.style.setProperty('--mainRadioColor', this.radio_color_list[nr]);
  }

  this.changeInfo = function() {
    let form_info = document.querySelector(".form-info");
    let info_name = document.querySelector(".info-name");
    let info_content = document.querySelector(".info-content");
    if(this.info == false){
      form_info.style.display = "none";
      info_name.innerHTML = '';
      info_content.innerHTML = '';
    }else{
      form_info.style.display = "block";
      info_name.innerHTML = this.info[0];
      info_content.innerHTML = this.info[1];
    }
  }

}


// tworzymy kolejne strony
// rodzaje inputów: Radio N
let p1 = new Page(0,1,
  "Radio",
  "TRANSPORT",
  "Pytanie 1",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  ["lorem ipsum 1","lorem ipsum 2","lorem ipsum 3"]);

let p2 = new Page(1,2,
  "Slider",
  "ENERGIA DOMU",
  "Pytanie 2",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );

let p3 = new Page(3,4,
  "Number",
  "ODPADY",
  "Pytanie 3",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );

let p4 = new Page(4,5,
  "Slider",
  "JEDZENIE",
  "Pytanie 4",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );

let p5 = new Page(5,6,
  "Slider",
  "ROZRYWKA",
  "Pytanie 5",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );

let p6 = new Page(6,7,
  "Slider",
  "STYL ŻYCIA",
  "Pytanie 6",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "],
  );


// zaczepiamy się o przyciski

let left = document.getElementById('btn-left');
let right = document.getElementById('btn-right');

let page = 1;
p1.drawPage();
function changePage() {
  switch (page) {
  	case 1: p1.drawPage(); break;
  	case 2: p2.drawPage(); break;
  	case 3: p3.drawPage(); break;
  	case 4: p4.drawPage(); break;
    case 5: p5.drawPage(); break;
    case 6: p6.drawPage(); break;
  }
}

left.addEventListener("click", leftClick);
function leftClick() {
  if(page > 1){
    page--;
    changePage()
  }
}

right.addEventListener("click", rightClick);
function rightClick() {
  if(page < 6){
    page++;
    changePage();
    console.log(answers);
  }
}
