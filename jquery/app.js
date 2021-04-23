
//validacion de numeros repetidos en input
function validateInputRepetNumbers(array){  
    let repet = true;     
    let result = array.filter((item,index)=>{
        return array.indexOf(item) === index;
      })
      if(result.length === array.length){
          repet = false;       
      }  
      return repet;    
    }
//genera un digito aleatorio 
function generateNum(){
    let random =Math.floor(Math.random() * ((9+1)-0)+0);
    return random;
}

function error(message){
    $('#validacion').parent().addClass('has-error');            
    $('.help-block').html(message);
}

//inicializaion de arreglo para numero random
const arrayRandom = [];
//crea un arreglo de 4 digitos sin repeticion
for ( let i = 0;  arrayRandom.length <= 3 ; i++){

    let newDigit = generateNum();  

    if(!arrayRandom.includes(newDigit)){        
        arrayRandom.push(newDigit);
    }        
}
//muestra el numero en consola 
console.log(arrayRandom.join(''));

$(document).on('keypress',function(e) {  

    let num = $('#validacion').val();      
    const arrayNum = num.split('');    
    
    //validacion de la tecla enter
    if(e.which == 13 ){   
        let lenghtInput = $('#validacion').val(); 
        //validacion de numeros repetidos
            if(!validateInputRepetNumbers(arrayNum) ){                                                                 
                //validacion de cuatro digitos
                if (lenghtInput.length === 4){                      
                    //inicializando contadores picas y fijas
                    let countPicas = 0;
                    let countFijas = 0;            
                    //logica de picas y fijas
                    for(let i = 0; i < arrayRandom.length; i++){
                        
                        if (arrayNum[i] == arrayRandom[i]){
                            countFijas += 1;
                        }
                        for (let j = 0; j < arrayNum.length; j++){                
            
                            if (arrayNum[i] == arrayRandom[j]){
                                countPicas += 1;
                            }                                                                                       
                        }                                 
                    }     
                    //validacion adivina numero
                    if (countPicas === 4 && countFijas === 4 ){
                        window.location.reload();
                        alert("Felicitaciones!!! el número era "+ arrayRandom.join(''));               
                    }else{
                        //creacion de objeto para enviarlo por handlebars
                        var obj = {
                            'numero': num,
                            'picas':countPicas,
                            'fijas': countFijas
                        }           
                        var template = Handlebars.compile($('#td-template').html());         
                        $('table').append(template(obj));                
                        //fin de handlebars
                        //reset contadores
                        countFijas = 0;
                        countFijas = 0;
                        //limpia input y clase
                        $('#validacion').val('').parent().removeClass('has-error');                   
                        $('.help-block').html('');
                    }                              
                }else{   
                    //agrega clase si tiene error de numero inválido
                    error('Número Inválido');                       
                }              
            } else{
                 //agrega clase si tiene error
                error('Tiene Número Repetido');        
        }
    }       
});


