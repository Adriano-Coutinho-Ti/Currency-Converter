const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")
const inputCurrency = document.querySelector(".input-currency")


let dolarToday = 0.00;
let euroToday = 0.00;
let libraToday = 0.00;
let bitcoinToday = 0.00;

function formatInputAsValue(event) {
    let value = event.target.value;

    // 1. Remove tudo o que não for número (letras, símbolos, etc)
    value = value.replace(/\D/g, "");

    // 2. Transforma em centavos (ex: se digitou 150, vira 1.50)
    value = (value / 100).toFixed(2);

    // 3. Se não for um número válido (ex: campo vazio), limpa o input e para
    if (isNaN(value) || value == 0) {
        event.target.value = "";
        return;
    }

    // 4. Formata o número limpo para o padrão de moeda Real
    const valorFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);

    // 5. Atualiza o texto visual dentro do próprio input!
    event.target.value = valorFormatado;

}

// --- FUNÇÃO AUXILIAR: Converte o texto do input ("R$ 1.000,00") de volta para número puro (1000.00) ---
function getInputValueAsNumber() {
    let value = inputCurrency.value;
    if (!value) return 0;

    // Remove o "R$", remove os pontos de milhar e troca a vírgula decimal por ponto
    value = value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
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

        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue)

        if (currencySelect.value == "USD") {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(inputCurrencyValue / dolarToday)
        }

        if (currencySelect.value == "EUR") {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR"
            }).format(inputCurrencyValue / euroToday)
        }

        if (currencySelect.value == "GBP") {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP"
            }).format(inputCurrencyValue / libraToday);
        }

        if (currencySelect.value == "BTC") {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "XBT",
                minimumFractionDigits: 6
            }).format(inputCurrencyValue / bitcoinToday);
        }

    } catch (erro) {
        console.error("Ops! Ocorreu um erro ao buscar as moedas:", erro);
    }
    changeCurrency()
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")


    // Criamos o formatador para a moeda Real (R$)
    const formatarReal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    });


    if (currencySelect.value == "USD") {
        // Formata o valor do dólar. Ex: R$ 5,20
        const dolarFormatado = formatarReal.format(dolarToday); 
        
        currencyName.innerHTML = `1 Dólar Americano = ${dolarFormatado}`
        currencyImage.src = "./assets/img/estados-unidos.png"
    }

    if (currencySelect.value == "EUR") {
        // Formata o valor do euro. Ex: R$ 6,20
        const euroFormatado = formatarReal.format(euroToday);

        currencyName.innerHTML = `1 Euro = ${euroFormatado}`
        currencyImage.src = "./assets/img/euro.png"
    }
    if (currencySelect.value == "GBP") {
            currencyName.innerHTML = `1 Libra Esterlina = ${formatarReal.format(libraToday)}`
        currencyImage.src = "./assets/img/libra.png"
    }

    if (currencySelect.value == "BTC") {
        currencyName.innerHTML = `1 Bitcoin = ${formatarReal.format(bitcoinToday)}`
        currencyImage.src = "./assets/img/bitcoin.png"
    }

    

}

inputCurrency.addEventListener("input", formatInputAsValue)
currencySelect.addEventListener("change", convertValues)
convertButton.addEventListener("click", convertValues)

// Executa uma vez ao carregar a página para buscar os dados imediatamente
convertValues()