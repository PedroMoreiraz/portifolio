function contar(){
    let inicio = document.getElementById('inicio');
    let fim = document.getElementById('fim');
    let passo = document.getElementById('passo');
    let res = document.getElementById('res');

    if(inicio.value.length == 0 || fim.value.length == 0 || passo.value.length == 0){
        window.alert('[ERRO] faltam dados!');
    }else {
        res.innerHTML = "CONTANDO:"
        let i = Number(inicio.value)
        let f = Number(fim.value)
        let p = Number(passo.value)

        if(p <=0){
            window.alert('[ERRO] passo nao pode ser igual a zero nem menor que zero!');
        }else{
            for(let c = i; c <= f; c += p) {
             res.innerHTML += `${c} `
            }
        }
    }
}    