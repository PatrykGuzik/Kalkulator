let left = document.getElementById('btn-left');
let right = document.getElementById('btn-right');

function getPageQuestions(page) {
  let list_of_questions = [];
  let nr1 = pages_list[page].nr1;
  let nr2 = pages_list[page].nr2;
  for (var i = nr1; i < nr2; i++) {
    list_of_questions.push(i);
  }
  return list_of_questions;
}

let is_full = function(page){
  full = true;
  getPageQuestions(page).forEach((item, i) => {
     if(answersJSON[item] == null){
       full = false;
     }
  });
  return full;
}

// Aktualna strona
let page = 0;

p1.drawPage();
function changePage() {
  for (var i = 0; i < pages_list.length; i++) {
    if(i == page){
      pages_list[i].drawPage();
    }
  }
}


left.addEventListener("click", leftClick);
function leftClick() {
  if(page > 0){
    if(!is_full(page)) {
      pages_list[page].errorAnswer();
    }else{
      page--;
      changePage();
    }
  }
}

right.addEventListener("click", rightClick);
function rightClick() {
  if(page < pages_list.length-1){
    // Sprawdzamy czy pole zostało wypełnione
    if(!is_full(page)) {
      pages_list[page].errorAnswer();
    }else{
      page++;
      changePage();
    }
    // Przejście do podsumowania
  }else if (page == pages_list.length-1) {
    // TODO: Przenieść to do osobnej funkcji
    let fr = '';
    let sr = '';
    for (var i = 1; i < list_questoins.length+1; i++) {
      fr += '<td>'+i+'</td>';
      sr += '<td>'+answersJSON[i] +'</td>';
    }

    document.body.innerHTML = '<table><tr>' + fr+ '</tr><tr>' + sr + '</tr></table>';
    console.log(answersJSON);
  }
}
