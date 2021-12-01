// zapisane odpowiedzi
let answers = [];

// lista z pytaniami
let list_questoins = ["1Lorem ipsum dolor sit amet, consectetur adipisicing ",
                      "2Lorem ipsum dolor sit amet, consectetur adipisicing ",
                      "3Lorem ipsum dolor sit amet, consectetur adipisicing ",
                      "4Lorem ipsum dolor sit amet, consectetur adipisicing ",
                      "5Lorem ipsum dolor sit amet, consectetur adipisicing ",
                      "6Lorem ipsum dolor sit amet, consectetur adipisicing "]

// tworzymy WSZYSTKIE slider_boxy (w zależności od ilości pytań) które
// ukrywamy przez "display:none;"
let form_items = [];
for (var i = 0; i < list_questoins.length; i++) {
  form_items[i] = '<div id="slider_box_'+i+'" class="slider-box" style="display:none; " ></div>';
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
}


function Page(nr1, nr2, cat_name, question_nr, info=false) {
//                           TRANSPORT                   ENERGIA DOMU
  this.bg_img_list =        ["media/transport.png",       "media/home_energy.png"];
  this.img_btn_left_list =  ["media/arrow-left.png",      "media/arrow-left-white.png"];
  this.img_btn_right_list = ["media/arrow-right.png",     "media/arrow-right-white.png"];
  this.img_logo_list =      ["media/LOGO_DARK_BLUE.png",  "media/LOGO_WHITE.png"];
  this.position_list =      ["auto auto auto auto",       "auto auto auto 70px"];
  this.main_color_list =    ["#374470",                   "white"];
  this.form_box_color_list =["rgba(255,255,255,0.8)",     "rgba(0,0,0,0.8)"];
  this.form_item_color_list=[["rgb(55, 68, 112)","white"],["white","black"]]
  this.cat_name = cat_name;
  this.question_nr = question_nr;
  this.info = info;

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

  this.changeFormItems = function() {
    // znikamy WSZYSTKIE slider_boxy
    for (var i = 0; i < form_items.length; i++) {
      let sb = document.getElementById('slider_box_'+i+'') // sb - slider_box
      sb.style.display = "none";
    }

    // włączmy te slider_boxy które są potrzebne
    for (var i = nr1; i < nr2; i++) {
      let sb = document.getElementById('slider_box_'+i+'')
      sb.style.display = "block";

      // dodajemy nowego Slidera na listę i go rysujemy
      this.form_items_list[i] = new FormItem(i, list_questoins[i]); // list_questoins[i] - pytanie z globalnej listy
      this.form_items_list[i].drawSlider('#slider_box_'+i+'');
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
    cat_list[nr].style.backgroundColor = this.main_color_list[nr];
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
    document.documentElement.style.setProperty('--mainSliderColor', this.form_item_color_list[nr][0]);
    document.documentElement.style.setProperty('--wheelSliderColor', this.form_item_color_list[nr][1]);
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
let p1 = new Page(0,3,
  "TRANSPORT",
  "Pytania 1-6",
  ["tytuł","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "]);

let p2 = new Page(3,4,
  "ENERGIA DOMU",
  "Pytanie 7");

let p3 = new Page(4,5,
  "ENERGIA DOMU",
  "Pytanie 8");

let p4 = new Page(5,6,
  "ENERGIA DOMU",
  "Pytanie 9");


// zaczepiamy się o przyciski

let lewo = document.getElementById('btn-left');
let prawo = document.getElementById('btn-right');

let page = 1;
p1.drawPage();
function changePage() {
  switch (page) {
  	case 1: p1.drawPage(); break;
  	case 2: p2.drawPage(); break;
  	case 3: p3.drawPage(); break;
  	case 4: p4.drawPage(); break;
    case 5: console.log(answers); ;break;
  }
}

lewo.addEventListener("click", leftClick);
function leftClick() {
  if(page > 1){
    page--;
    changePage()
  }
}

prawo.addEventListener("click", rightClick);
function rightClick() {
  if(page < 5){
    page++;
    changePage()
  }
}
