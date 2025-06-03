function tabuada(){

    let numero = document.getElementById('numero');
    let res = document.getElementById('res');

    if(numero.value.length == " "){
        window.alert('[Erro] insira um numero');
    }else{
        let n = Number(numero.value);
        res.innerHTML = `Tabuada: <br>`;

        for(let c = 1; c<=10; c++){
            res.innerHTML += `${c} x ${n} = ${n*c} <br>`
        }
    }
}