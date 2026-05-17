const convertButton = document.querySelector(".convert-button")
const currencySelect1 = document.querySelector(".currency-select1")
const currencySelect = document.querySelector(".currency-select2")
const inputCurrency = document.querySelector(".input-currency")


let dolarToday = 0.00;
let euroToday = 0.00;
let libraToday = 0.00;
let bitcoinToday = 0.00;
let realToday = 1.00;

function formatInputAsValueClean() {
    inputCurrency.value = "";
}

function formatInputAsValue(event) {
    let value = event.target.value;

    // Remove tudo o que não for número (letras, símbolos, etc)
    value = value.replace(/\D/g, "");

    if (currencySelect1.value == "BTC") {
        // Transforma em centavos com 6 digitos
        value = (value / 100000000).toFixed(8);
    } else {
        // Transforma em centavos (ex: se digitou 150, vira 1.50)
        value = (value / 100).toFixed(2);
    }
    

    // Se não for um número válido (ex: campo vazio), limpa o input e para
    if (isNaN(value) || value == 0) {
        event.target.value = "";
        return;
    }

    // Formata o número limpo para o padrão de moeda selecionado
    if (currencySelect1.value == "BRL") {
            const valorFormatado = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);
        // Atualiza o texto visual dentro do próprio input!
        event.target.value = valorFormatado;
    }

    if (currencySelect1.value == "USD") {
            const valorFormatado = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(value);
        // Atualiza o texto visual dentro do próprio input!
        event.target.value = valorFormatado;
    }

    if (currencySelect1.value == "EUR") {
            const valorFormatado = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EUR"
        }).format(value);
        // Atualiza o texto visual dentro do próprio input!
        event.target.value = valorFormatado;
    }

    if (currencySelect1.value == "GBP") {
            const valorFormatado = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(value);
        // Atualiza o texto visual dentro do próprio input!
        event.target.value = valorFormatado;
    }

    if (currencySelect1.value == "BTC") {
            const valorFormatado = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "XBT",
            minimumFractionDigits: 8      
        }).format(value);
        // Atualiza o texto visual dentro do próprio input!
        event.target.value = valorFormatado;
    }

}

// --- FUNÇÃO AUXILIAR: Converte o texto do input ("R$ 1.000,00") de volta para número puro (1000.00) ---
function getInputValueAsNumber() {
    let value = inputCurrency.value;
    if (!value) return 0;

    // 1. Remove os símbolos (como você já fez)
    value = value.replace(/[^0-9.,]/g, "");

    // 2. DESCUBRA O PADRÃO: Se o ponto estiver mais perto do fim do que a vírgula, 
    // ou se só existi ponto e nenhuma vírgula, significa que é o padrão americano (Ex: 1,000.50 ou 10.00)
    const ultimoPonto = value.lastIndexOf('.');
    const ultimaVirgula = value.lastIndexOf(',');

    if (ultimoPonto > ultimaVirgula) {
        // Se for padrão americano: apaga a vírgula (milhar) e mantém o ponto (decimal)
        value = value.replace(/,/g, "");
    } else {
        // Se for padrão brasileiro (Ex: 1.000,50 ou 10,00): apaga o ponto e troca a vírgula por ponto
        value = value.replace(/\./g, "").replace(",", ".");
    }

    return parseFloat(value) || 0;
}


async function convertValues() {
    // Estou usando o awesomeapi para buscar os valores atualizados e usando o RBL como
    const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL";

    try {
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

        // Usamos a função auxiliar para pegar o valor numérico correto para a conta matemática
        const inputCurrencyValue = getInputValueAsNumber();
        const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
        const currencyValueConverted = document.querySelector(".currency-value")
        
        let valueToday = 0

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

        /*currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue)*/

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
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
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
            currencyValueToConvert.innerHTML =  inputCurrency.value || "XBT0,00000000";
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

    } catch (erro) {
        console.error("Ops! Ocorreu um erro ao buscar as moedas:", erro);
    }
    changeCurrency()
}

function changeCurrency() {
    const currencyName1 = document.getElementById("currency-name1")
    const currencyName = document.getElementById("currency-name")
    const currencyImage1 = document.querySelector(".currency-img1")
    const currencyImage = document.querySelector(".currency-img")


    // Criamos o formatador para a moeda de entrada
    const formatarReal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    //Agora vamos editar as informações na tela

    if (currencySelect.value == "USD") {
        
        currencyName.innerHTML = `1 Dólar Americano = ${formatarReal.format(dolarToday)}`
        currencyImage.src = "./assets/img/estados-unidos.png"
    }

    if (currencySelect1.value == "USD") { 
        
        currencyName1.innerHTML = `Dólar Americano`
        currencyImage1.src = "./assets/img/estados-unidos.png"
    }

    if (currencySelect.value == "EUR") {

        currencyName.innerHTML = `1 Euro = ${formatarReal.format(euroToday)}`
        currencyImage.src = "./assets/img/euro.png"
    }

    if (currencySelect1.value == "EUR") {

        currencyName1.innerHTML = `Euro`
        currencyImage1.src = "./assets/img/euro.png"
    }

    if (currencySelect.value == "GBP") {

        currencyName.innerHTML = `1 Libra Esterlina = ${formatarReal.format(libraToday)}`
        currencyImage.src = "./assets/img/libra.png"
    }

    if (currencySelect1.value == "GBP") {

        currencyName1.innerHTML = `Libra Esterlina`
        currencyImage1.src = "./assets/img/libra.png"
    }

    if (currencySelect.value == "BTC") {

        currencyName.innerHTML = `1 Bitcoin = ${formatarReal.format(bitcoinToday)}`
        currencyImage.src = "./assets/img/bitcoin.png"
    }

    if (currencySelect1.value == "BTC") {

        currencyName1.innerHTML = `Bitcoin`
        currencyImage1.src = "./assets/img/bitcoin.png"
    }

    if (currencySelect.value == "BRL") {

        currencyName.innerHTML = `1 Real = ${formatarReal.format(realToday)}`
        currencyImage.src = "./assets/img/brasil.png"
    }

    if (currencySelect1.value == "BRL") {

        currencyName1.innerHTML = `Real`
        currencyImage1.src = "./assets/img/brasil.png"
    }

    

}

inputCurrency.addEventListener("input", formatInputAsValue)
currencySelect1.addEventListener("change", formatInputAsValueClean)
currencySelect1.addEventListener("change", convertValues)
currencySelect.addEventListener("change", convertValues)
convertButton.addEventListener("click", convertValues)

// Executa uma vez ao carregar a página para buscar os dados imediatamente
convertValues()