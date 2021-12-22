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


    // JSON jeżeli ktoś wcześniej zaznaczył odpowiedź to ją przywracamy
    if(answersJSON[nr]){
      this.value = answersJSON[nr];
      slider.value = answersJSON[nr];
    }


    // answers[nr] = slider.value;
    answersJSON[nr] = Number(slider.value);
    info_value.innerHTML = name_values[slider.value-1];
    // jeżeli ktoś zmieniwartość na sliderze aktualizujemy dane i zmieniamy wyświetlaną wartość
    slider.addEventListener("input", myFunction);
    function myFunction() {
      // zapis do JSONa
      answersJSON[nr] = Number(slider.value);
      // pozmieniać toto
      asd['q'+(nr+1)] = Number(slider.value);
      info_value.innerHTML = name_values[slider.value-1];
      console.log(asd);
    };
  }

  this.drawInputNumber= function(input_number_box) {
    // twożymy pojemnik na pytanie, wartość i slider
    let inputNumberBox = document.querySelector(input_number_box);
    inputNumberBox.innerHTML = '<div class="slider-question">'+this.question+'</div><input class="input-number form-item" id="s'+this.nr+'"  type="text"   placeholder="km"> <div style="opacity:0;" id="error'+this.nr+'" class="number-error"> Wpisz liczbę większą lub równą 0 </div>';

    // zaczepiamy się o zawartość pojemnika
    let inputNumber = document.querySelector('#s'+this.nr+'');
    let errorNumber = document.querySelector('#error'+this.nr+'');
    const borderColor = inputNumber.style.borderColor;


    // jeżeli ktoś wcześniej zaznaczył odpowiedź to ją przywracamy
    if(answersJSON[nr]){
      this.value = answersJSON[nr];
      inputNumber.value = answersJSON[nr];
    }


    // jeżeli ktoś zmieni wartość w inpucie aktualizujemy dane i zmieniamy wyświetlaną wartość
    inputNumber.addEventListener("input", myFunction);
    function myFunction() {
      if((!isNaN(inputNumber.value)) && !(inputNumber.value < 0)){
        answersJSON[nr] = inputNumber.value;
        inputNumber.style.borderColor = borderColor;
        errorNumber.style.opacity= "0";
      }else{
        answersJSON[nr] = null;
        inputNumber.style.borderColor = "red";
        errorNumber.style.opacity= "1";
      }

      // jeżeli ktoś coś wpisze i to skasuje to ustawiamy null
      if (answersJSON[nr] == '') {
        answersJSON[nr] = null;
        // inputNumber.style.borderColor = "red";
        // errorNumber.style.opacity= "1";
      }
      console.log(answersJSON[nr]);
    };
  }


  this.drawRadio=function(input_radio_box, questions) {
    let radio = '';
    for (var i = 0; i < questions.length; i++) {
      radio += '<div class="radio-inner"><label><input class="radio form-item" value="'+i+'"  type="radio" name="n'+this.nr+'"><span> '+ questions[i] +' </span></label></div>'
    }

    let inputRadioBox = document.querySelector(input_radio_box);
    inputRadioBox.innerHTML = '<div class="slider-question">'+this.question+'</div> <div class="radio"><form  id="s'+this.nr+'"> '+ radio +'</form> <div style="opacity:0;" class="radio-error"> Zaznacz jedną z odpowiedzi </div> </div> ';

    // zaczepiamy się o zawartość pojemnika
    let radioBox = document.querySelector('#s'+this.nr+'');
    let radioCont = document.getElementsByName('n'+this.nr+'');

    if(answersJSON[nr]){
      this.value = answersJSON[nr];
      radioCont[this.value].checked = true;
    }else{
      answersJSON[nr] = null;
    }

    radioBox.addEventListener("input", myFunction);
    function myFunction() {
      for(i = 0; i < radioCont.length; i++){
        if(radioCont[i].checked){
          // zapis do JSONa
          answersJSON[nr] = Number(radioCont[i].value);
        }
      }
    };
  }

  this.drawCheckbox=function(input_checkbox_box, questions){
    let answer = []
    let checkbox = '';
    for (var i = 0; i < questions.length; i++) {
      answer[i]=false;
      checkbox += '<div class="checkbox-inner"><label class="check-box-container"><div class="checkbox-text">'+ questions[i] +'</div><input class="checkbox form-item" value="'+i+'"  type="checkbox" name="n'+this.nr+'"><span class="checkmark">  </span></label></div>'
    }

    let inputCheckboxBox = document.querySelector(input_checkbox_box);
    inputCheckboxBox.innerHTML = '<div class="slider-question">'+this.question+'</div> <div class="checkbox"><form  id="s'+this.nr+'"> '+ checkbox +'</form><div>';



    // zaczepiamy się o zawartość pojemnika
    let checkboxBox = document.querySelector('#s'+this.nr+'');
    let checkboxCont = document.getElementsByName('n'+this.nr+'');

    // answers[nr] = answer;
    // sprawdzamy czy wcześniej jakieś wartości zostały zaznaczone
    if(answersJSON[nr]){
      for (var i = 0; i < questions.length; i++) {
        answer[i]=answersJSON[nr][i];
        checkboxCont[i].checked = answersJSON[nr][i];
      }
    }else{
      answersJSON[nr] = answer;
    }


    checkboxBox.addEventListener("input", myFunction);
    function myFunction() {
      for (var i = 0; i < questions.length; i++) {
        answer[i]=checkboxCont[i].checked;
    }
      // zapis do JSONa
      answersJSON[nr] = answer;
    };
  }
}
