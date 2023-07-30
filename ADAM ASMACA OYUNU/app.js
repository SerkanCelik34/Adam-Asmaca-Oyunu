const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el=document.getElementById('success-message');
const wrongLetters_el=document.getElementById('wrong-letters');
const items =document.querySelectorAll('.item');
const popupx=document.getElementById('popupx');
const message=document.getElementById('message');
const playAgainBtn=document.getElementById('play-again');


const correctLetters=[];
const wrongLetters=[];
let selectedWord = getRandomWord();

// kelime oluşturma
function getRandomWord() {
    const words = ["symbol","karakutu", "java", "python","tranformers","html"];

    return words[Math.floor(Math.random() * words.length)];

};
console.log(getRandomWord());

function displayWord() {


    word_el.innerHTML = `
   ${selectedWord.split('').map(letter => `
        <div class="letter">
        ${correctLetters.includes(letter) ? letter:''} 
        </div>`).join('')}   
   ` ; 
    //split kelimeleri harflere parçalayıp dizi oluşturacak map metodu da harfleri tutup sırasını hatırlayacak .join() diziyi stringe dönüştürecek
    //includes ile kelimenin içinde eşleşen harf varmı kontrolünü yapıyoruz varsa letterı yazdırıypruz
   
    const w = word_el.innerText.replace(/\n/g,'');
    if(w===selectedWord){
        popup.style.display='flex';
        message_el.innerHTML='Tebrikler Kazandınız'
    }
};

function updateWrongLetters(){
    
    wrongLetters_el.innerHTML=`
    ${wrongLetters.length>0?'<h3>Hatalı Harfler</h3>':''}
    ${wrongLetters.map(letter=>`<span>${letter.toUpperCase()}</span>`)}`;
    
    items.forEach((item,index) => {
        const errorCount=wrongLetters.length;


        if(index<errorCount){
            item.style.display='block';
        } else{
            item.style.display='none';

        }
    })
    if(wrongLetters.length ===items.length){

        popup.style.display='flex';
        message_el.innerHTML='Maalesef Kaybettiniz.';
        popupx.style.backgroundColor='red'
    }
}
function displayMessage(){
    message.classList.add('show');

    setTimeout(function(){
        message.classList.remove('show');
    },2000);

}

playAgainBtn.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord=getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display='none';
})

window.addEventListener('keydown',function(e){
    if(e.keyCode >=65 && e.keyCode<=90){  //ingilizce karakter keykod aralığı

        const letter=e.key;

        if(selectedWord.includes(letter)){   //seçilen kelime klavyeden basılan harfle eşleşiyorsa 
            if(!correctLetters.includes(letter)){  //ve daha önce seçilmiş harf değilse 
                correctLetters.push(letter);  //harfi ekle 
                displayWord(); //son halini görmek için update ediyoruz 
            }
            else{
                displayMessage();
  
            }
        }
        else{
            if(!wrongLetters.includes(letter)){ //hatalı harflere daha önce girilmişse eşleşmiyorsa
                wrongLetters.push(letter);  //hatalı harfler dizisine ekle
                updateWrongLetters()
            }
            else{
                displayMessage();
            }
        }
    

    }

});

displayWord();
