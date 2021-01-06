function definirSaldo(){
    var saldo = parseFloat(prompt("Digite o valor da sua banca!"));
    saldoInicial = saldo;
    document.getElementById("saldo").innerHTML = "R$ "+saldo;
    saldoDaBanca = saldo;
}
function definirGain(){
    var meta = parseFloat(prompt("Digite a porcentagem do gain!"))/10;
    metaGain = meta;
    document.getElementById("metagain").innerHTML = meta*10+"%";
}
function definirLoss(){
    var meta = parseFloat(prompt("Digite a porcentagem do loss!"))/10;
    metaLoss = meta;
    document.getElementById("metaloss").innerHTML = meta*10+"%";
}
function verificaGainLoss(){
    if(saldoDaBanca > saldoInicial+(saldoInicial*metaGain/10)){
        alert("você atingiu a meta de Gain!");
        iniciar();
    }else if(saldoDaBanca < saldoInicial-(saldoInicial*metaLoss/10)){
        alert("você atingiu o stop loss!");
        iniciar();
    }
}

function iniciar(){
    if(iniciado){
        iniciado = false;
        document.getElementById("btnIniciar").innerHTML = "Iniciar";
    }else{
        iniciado = true;
        document.getElementById("btnIniciar").innerHTML = "Parar";
    }
}

function win(){
    if(iniciado){
        saldoDaBanca = parseFloat(saldoDaBanca) + Math.round(parseFloat(document.getElementById("1entrada").value)*0.87*100)/100;
        atualizaSaldo();
        verificaGainLoss();
        document.getElementById("tabela-historico").innerHTML += "<td style='color:green'>Win</td><td style='color:green'> + R$ "+Math.round(parseFloat(document.getElementById("1entrada").value)*0.87*100)/100+"</td>";
    }
}

function loss(){
    if(iniciado){
        saldoDaBanca -= parseFloat(document.getElementById("1entrada").value);
        saldoDaBanca -= parseFloat(document.getElementById("protecao").value);
        atualizaSaldo();
        verificaGainLoss();
        document.getElementById("tabela-historico").innerHTML += "<td style='color:red'>Loss</td><td style='color:red'> - R$ "+parseInt(parseInt((document.getElementById("1entrada").value))+parseInt(document.getElementById("protecao").value))+"</td>";
    }
}

function atualizaSaldo(){
    document.getElementById("saldo").innerHTML = "R$ "+saldoDaBanca.toFixed(2)+" (+ R$"+(saldoDaBanca-saldoInicial).toFixed(2)+" de lucro)";
}

function reset(){
    saldoDaBanca = saldoInicial;
    atualizaSaldo();
    document.getElementById("tabela-historico").innerHTML = "";
}

var metaGain;
var metaLoss;
var saldoDaBanca;
var valorDaEntrada;
var saldoInicial;
var iniciado = false;

atualizaSaldo();
