//Aberturas das variáveis global - CONST Informações do HTML
const convertButton = document.querySelector(".convert-button") //Estou pegando o botão de converter no HTML
const currencySelect1 = document.querySelector(".currency-select1") //Estou Pegando o SELECT da moeda de entrada
const currencySelect = document.querySelector(".currency-select2") //Estou Pegando o SELECT da Moeda de Saída
const inputCurrency = document.querySelector(".input-currency") //Estou pegando o INPUT 

//Abertura das varíaveis LET - Elas vai receber os valores das moedas atualizadas
let dolarToday = 0.00;
let euroToday = 0.00;
let libraToday = 0.00;
let bitcoinToday = 0.00;
let realToday = 1.00;

//Estas 2 varias são usadas para a legenda da moedas da função comparisonValue()
let outputValue = 0.00
let cashValue = 0.00

//Está função é apenas para a legenda de comparação de moeda ex:1 Euro = R$ 5,88
function comparisonValue() {
    /*Explicação desta função:
    Estou fazendo um IF em cada moeda selecionada no SELECT de entrada usando o VALUE,
    quando ele entrada no IF estou atualizando a varíavel cashValue e com o 
    Intl.NumberFormat estou formatando o valor para a moeda e fazendo o cálculo no
    no final outputValue (Valor da moeda de saida que foi definida na função changeCurrency() 
    logo a baixa) dividindo este valor por o valor da moeda de entrada*/
    if (currencySelect1.value == "BRL") {
        cashValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(outputValue / realToday);
    }

    if (currencySelect1.value == "USD") {
        cashValue = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(outputValue / dolarToday);
    }

    if (currencySelect1.value == "EUR") {
        cashValue = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(outputValue / euroToday);
    }

    if (currencySelect1.value == "GBP") {
        cashValue = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
        }).format(outputValue / libraToday);
    }

    if (currencySelect1.value == "BTC") {
        cashValue = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "XBT",
            minimumFractionDigits: 8  //Coloquei o minimumFractionDigits pois o BTC(XBT) trabalha com 8 casas depois da virgula
        }).format(outputValue / bitcoinToday);
    }

}

//Está função é para limpar o INPUT quando mudar o SELECT da moeda de entrada
function formatInputAsValueClean() {
    /*Explicação desta função:
    Eu começo está função limpando o VALUE do INPUT no HTML, depois que foi 
    trocada a moeda de entrada.
    Isso para eu poder mostrar o PLACEHOLDER da nova moeda selecionada*/
    inputCurrency.value = "";

    if (currencySelect1.value == "BRL") {
        inputCurrency.placeholder = "R$ 10.000,00";
    }

    if (currencySelect1.value == "USD") {
        inputCurrency.placeholder = "$10,000.00";
    }

    if (currencySelect1.value == "EUR") {
        inputCurrency.placeholder = "€10,000.00";
    }

    if (currencySelect1.value == "GBP") {
        inputCurrency.placeholder = "£10,000.00";
    }

    if (currencySelect1.value == "BTC") {
        inputCurrency.placeholder = "XBT 0.00000000"; //Estou usando o formato do Bitcoin com 8 casas
    }
}

//Estou usando está função como minha mascara do INPUT
function formatInputAsValue(event) {
    /*Explicação desta função:
    Está função recebe o parametro EVENT (como foi chamado quando estou digitando no
    INPUT ele vai trazer o valor do INPUT na variavel VALUE,) logo depois eu trato 
    os valore recebido removendo letras e simbolos deixando apenas os números.
    e usei um IF para separar as moedas do BTC para colocar o ponto no lugar certo.
    depois trato se estiver com o INPUT vazio e depois formato o o valor para a moeda
    isando o IF com o VALUE da moeda selecionada*/

    let value = event.target.value;//Estou pegando o VALUE no EVENT

    // Remove tudo o que não for número (letras, símbolos, etc deixando so os números)
    value = value.replace(/\D/g, "");

    if (currencySelect1.value == "BTC") {
        // Transforma em centavos com 8 digitos
        value = (value / 100000000).toFixed(8);
    } else {
        // Transforma em centavos (ex: se digitou 150, vira 1.50)
        value = (value / 100).toFixed(2);
    }

    // Se não for um número válido (ex: campo vazio), limpa o input e para a função
    if (isNaN(value) || value == 0) {
        event.target.value = "";
        return;//ele para pois coloquei um RETURN
    }

    // Formata o número limpo para o padrão de moeda selecionado
    if (currencySelect1.value == "BRL") {
        const valorFormatado = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);
        event.target.value = valorFormatado; // Atualiza o texto visual dentro do próprio input!
    }

    if (currencySelect1.value == "USD") {
        const valorFormatado = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(value);
        event.target.value = valorFormatado;
    }

    if (currencySelect1.value == "EUR") {
        const valorFormatado = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EUR"
        }).format(value);
        event.target.value = valorFormatado;
    }

    if (currencySelect1.value == "GBP") {
        const valorFormatado = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(value);
        event.target.value = valorFormatado;
    }

    if (currencySelect1.value == "BTC") {
        const valorFormatado = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "XBT",
            minimumFractionDigits: 8 //Estou falando para ele ter 8 casas depois da vírgula
        }).format(value);
        event.target.value = valorFormatado;
    }

}

//Está função é para converte o texto do input ("R$ 1.000,00") de volta para número puro (1000.00)
function getInputValueAsNumber() {
    /*Explicação desta função:
    Esta função e para pegar o valor que veio do INPUT e sanitizar ela removendo os entras
    e deixando o valor preparado fazer o calculo de conversão de moeda na função convertValues().
    Tive o cuidadado de remover tudo deixando apenas os números e as virgulas e pontos.
    Estou verificando se o esta com o padrão BRL OU USD para evitar erros, e retorno o valor*/
    let value = inputCurrency.value;
    if (!value) return 0;

    //Remove os símbolos deixando os números, ponto e a virgula.
    value = value.replace(/[^0-9.,]/g, "");

    /*DESCUBRA O PADRÃO: Se o ponto estiver mais perto do fim do que a vírgula, 
    ou se só existi ponto e nenhuma vírgula, significa que é o padrão 
    americano (Ex: 1,000.50 ou 10.00)*/
    const ultimoPonto = value.lastIndexOf('.');
    const ultimaVirgula = value.lastIndexOf(',');

    if (ultimoPonto > ultimaVirgula) { //Ex: value = "1.250,50" vai dar 1 > 5 pois ele começas do 0
        // Se for padrão americano: apaga a vírgula (milhar) e mantém o ponto (decimal)
        value = value.replace(/,/g, "");
    } else {
        // Se for padrão brasileiro (Ex: 1.000,50 ou 10,00): apaga o ponto e troca a vírgula por ponto
        value = value.replace(/\./g, "").replace(",", ".");
    }

    return parseFloat(value) || 0;
}


//Está e função que faz a API e converte os valores de verdade
async function convertValues() {
    /*Explicação desta função:
    Já Começo fazendo a busca na API(Sinples passando as moedas que quero os valores em Real).
    Abrimos o try para fazer as coisa e nelas esta pegar o json.
    O importante e o await para falar para o codigo esperar a resposta
    depois vou atribuir os valores para as variaveis LET estou colocando um 
    console.log apenas para poder ter certeza dos valores depois uma função para tratar as 
    casas depois da virgula (eu pederia deixar eles como vem na api, mas esta parte e so pra
    mostrar que consigo fazer isso se for preciso) e logo depois vem o IF para fazer o calculo 
    das modedas e tambem a formatação */

    // Estou usando o awesomeapi para buscar os valores atualizados e usando o RBL como o valor base
    const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL";

    try {
        //abrindo as variáveias
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // Atribuindo os novos valores
        dolarToday = parseFloat(dados.USDBRL.bid);
        euroToday = parseFloat(dados.EURBRL.bid);
        libraToday = parseFloat(dados.GBPBRL.bid);
        bitcoinToday = parseFloat(dados.BTCBRL.bid);

        // Testando no console se todos os valores estão chegando certinho:
        console.log(`Dólar hoje: R$ ${dolarToday}`);
        console.log(`Euro hoje: R$ ${euroToday}`);
        console.log(`Libra hoje: R$ ${libraToday}`);
        console.log(`Bitcoin hoje: R$ ${bitcoinToday}`);

        // A função para sanitizar o numero do INPUT e pegar o numérico correto para a conta matemática
        const inputCurrencyValue = getInputValueAsNumber();
        //Estas outras 2 variáveis vai no HTML nos valores que aparece para o usuário 
        const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
        const currencyValueConverted = document.querySelector(".currency-value")

        //Esta variável esta sendo aberta para receber o valor da função valueTodayCorrency()
        let valueToday = 0

        
        //Esta função e para tratar as casas depois da virgula pois tem diferenças entre elas
        function valueTodayCorrency() {

            if (currencySelect1.value == "USD") {
                valueToday = parseFloat(dolarToday.toFixed(4));
                console.log(valueToday)
            }
            if (currencySelect1.value == "EUR") {
                valueToday = parseFloat(euroToday.toFixed(5));
                console.log(valueToday)
            }
            if (currencySelect1.value == "GBP") {
                valueToday = parseFloat(libraToday.toFixed(5));
                console.log(valueToday)
            }
            if (currencySelect1.value == "BTC") {
                valueToday = parseFloat(bitcoinToday.toFixed(8));
                console.log(valueToday)
            }
            if (currencySelect1.value == "BRL") {
                valueToday = parseFloat(realToday.toFixed(2));
                console.log(valueToday)
            }


        }
        /*Agora começas os IF para tratar o motor onde e feito o conversão dos valores e também
        a formatação para cada moeda*/
        if (currencySelect1.value == "USD") {
            currencyValueToConvert.innerHTML = inputCurrency.value || "$0,00";
            valueTodayCorrency()
        }

        if (currencySelect.value == "USD") {
            valueTodayCorrency()
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(inputCurrencyValue * valueToday / dolarToday)
        }

        if (currencySelect1.value == "EUR") {
            currencyValueToConvert.innerHTML = inputCurrency.value || "€0,00";
            valueTodayCorrency()
        }

        if (currencySelect.value == "EUR") {
            valueTodayCorrency()
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EUR"
            }).format(inputCurrencyValue * valueToday / euroToday)
        }

        if (currencySelect1.value == "GBP") {
            currencyValueToConvert.innerHTML = inputCurrency.value || "£0.00";
            valueTodayCorrency()
        }

        if (currencySelect.value == "GBP") {
            valueTodayCorrency()
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP"
            }).format(inputCurrencyValue * valueToday / libraToday);
        }

        if (currencySelect1.value == "BTC") {
            currencyValueToConvert.innerHTML = inputCurrency.value || "XBT0,00000000";
            valueTodayCorrency()
        }

        if (currencySelect.value == "BTC") {
            valueTodayCorrency()
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "XBT",
                minimumFractionDigits: 8
            }).format(inputCurrencyValue * valueToday / bitcoinToday);
        }

        if (currencySelect1.value == "BRL") {
            valueTodayCorrency()
            currencyValueToConvert.innerHTML = inputCurrency.value || "R$ 0,00";
        }

        if (currencySelect.value == "BRL") {
            valueTodayCorrency()
            currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(inputCurrencyValue * valueToday / realToday);
        }

    } catch (erro) { //Se for encontado erros ele vai dar esse erro
        console.error("Ops! Ocorreu um erro ao buscar as moedas:", erro);
    }
    changeCurrency()// vamos rodar a próxima variavel onde ela vai editar os textos e fotos.
}

//Está Função é para trocar as fotos e nome da moeda e a legenda de comparação de valor 
function changeCurrency() {
    /*Explicação desta função:
    já começas com as variaveis de nome e da imagens a ser tratadas no HTML
    e já vamos para os IF fazer a atribuição do outputValue que foi usado na função comparisonValue
    que vai ser responsavel para a legenda de comparação , colocamos o nome e a IMG da moeda*/

    const currencyName1 = document.getElementById("currency-name1")
    const currencyName = document.getElementById("currency-name")
    const currencyImage1 = document.querySelector(".currency-img1")
    const currencyImage = document.querySelector(".currency-img")


    //Agora vamos editar as informações na tela

    if (currencySelect.value == "USD") {
        outputValue = dolarToday; //definir o valor a ser usado para a legenda

        //Está parte é para tratar a moeda de saida
        currencyName.innerHTML = `1 Dólar Americano = ${comparisonValue(), cashValue}`
        currencyImage.src = "./assets/img/estados-unidos.png"
    }

    if (currencySelect1.value == "USD") {

        //Está parte é para tratar a moeda de entrada
        currencyName1.innerHTML = `Dólar Americano`
        currencyImage1.src = "./assets/img/estados-unidos.png"
    }

    if (currencySelect.value == "EUR") {
        outputValue = euroToday;

        currencyName.innerHTML = `1 Euro = ${comparisonValue(), cashValue}`
        currencyImage.src = "./assets/img/euro.png"
    }

    if (currencySelect1.value == "EUR") {

        currencyName1.innerHTML = `Euro`
        currencyImage1.src = "./assets/img/euro.png"
    }

    if (currencySelect.value == "GBP") {
        outputValue = libraToday;

        currencyName.innerHTML = `1 Libra Esterlina = ${comparisonValue(), cashValue}`
        currencyImage.src = "./assets/img/libra.png"
    }

    if (currencySelect1.value == "GBP") {

        currencyName1.innerHTML = `Libra Esterlina`
        currencyImage1.src = "./assets/img/libra.png"
    }

    if (currencySelect.value == "BTC") {
        outputValue = bitcoinToday;

        currencyName.innerHTML = `1 Bitcoin = ${comparisonValue(), cashValue}`
        currencyImage.src = "./assets/img/bitcoin.png"
    }

    if (currencySelect1.value == "BTC") {

        currencyName1.innerHTML = `Bitcoin`
        currencyImage1.src = "./assets/img/bitcoin.png"
    }

    if (currencySelect.value == "BRL") {
        outputValue = realToday;

        currencyName.innerHTML = `1 Real = ${comparisonValue(), cashValue}`
        currencyImage.src = "./assets/img/brasil.png"
    }

    if (currencySelect1.value == "BRL") {

        currencyName1.innerHTML = `Real`
        currencyImage1.src = "./assets/img/brasil.png"
    }


}
//Agora vamos para os EVENTOS, estamos 5 eventos a ser verificados.
inputCurrency.addEventListener("input", formatInputAsValue)//Quando uma informação é colocada no INPUT
currencySelect1.addEventListener("change", formatInputAsValueClean)//Quanro o SELECT de entrada é modificado
currencySelect1.addEventListener("change", convertValues)//Quando o SELECT de entrada é modificado
currencySelect.addEventListener("change", convertValues)//Quando o SELECT de Saida é modificado
convertButton.addEventListener("click", convertValues)//Quando Botão e apertado.

// Executa uma vez ao carregar a página para buscar os dados imediatamente
convertValues()

//Está a a minha modificação do código. Obrigado por ver meu códigos.