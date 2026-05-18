# 🌍 Conversor de Moedas Dinâmico - JavaScript Training

Um conversor de moedas completo e interativo desenvolvido durante meus estudos de JavaScript. O projeto realiza conversões cruzadas entre múltiplas moedas em tempo real, consumindo dados atualizados diretamente de uma API financeira externa.

---

## 🚀 Funcionalidades Principais

* **Conversão Cruzada:** Permite converter de qualquer moeda para qualquer moeda (ex: Bitcoin para Libra, Euro para Dólar, Real para Euro).
* **Consumo de API Real:** Integração assíncrona com a *AwesomeAPI* para buscar cotações em tempo real com tratamento de erros (`try/catch`).
* **Máscara Inteligente de Input:** Captura a digitação do usuário, limpa caracteres inválidos e formata o valor automaticamente de acordo com a moeda de entrada.
* **Resolução de Conflitos visuais (UX):** Formatação adaptada (`en-US` para Euro e Bitcoin) que joga os símbolos para a esquerda, evitando travamentos no uso da tecla *Backspace*.
* **Identificação de Padrão Numérico:** Lógica matemática automatizada para identificar se o valor inserido está no padrão brasileiro ou americano através da leitura dos separadores decimais.
* **Placeholder Dinâmico:** Atualização visual imediata do placeholder do input ao alterar a moeda de origem.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica do formulário, seletores e exibição dos blocos de conversão.
* **CSS3:** Estilização responsiva, customização de componentes e efeitos de transição/hover nos botões.
* **JavaScript (ES6+):** 
  * Manipulação dinâmica do DOM.
  * Consumo de APIs com `fetch` e `async/await`.
  * Formatação internacional de valores com `Intl.NumberFormat`.
  * Expressões Regulares (Regex) para higienização de dados.

---

## 📸 Demonstração Visual

> 📽 *Foto e vídeo do projeto*

<table>
  <tr>
    <td>
      <img src="https://adriano-coutinho-ti.github.io/Currency-Converter/assets/img/foto01.png" alt="Foto-Projeto" width="300">
    </td>
    <td>
      <img src="https://adriano-coutinho-ti.github.io/Currency-Converter/assets/img/foto02.gif" alt="Foto-Projeto-gif" width="400">
    </td>
  </tr>
</table>

---

## 🧠 Desafios Resolvidos Durante o Desenvolvimento (Aprendizados)
Como desenvolvedor aprendendo JavaScript, este projeto foi fundamental para solidificar conceitos importantes em JS:

* Tratamento de Precisão Matemática: Correção de erros de arredondamento em moedas altamente fracionadas como o Bitcoin através do controle estrito do método .toFixed().
* Escopo e Ordem de Execução: Compreensão avançada sobre o comportamento de variáveis em funções internas e manipulação sequencial de eventos (input e change).
* Controle de Fluxo Inverso: Criação de algoritmos para exibir legendas informativas automatizadas calculando a moeda inversa com base na cotação da API.

## 📁 Estrutura de Arquivos

```text
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   ├── brasil.png
│   │   ├── estados-unidos.png
│   │   └── logo.gif
│   └── js/
│       └── scripts.js
└── README.md
```

Desenvolvido com 💜 focado no aprendizado e evolução em engenharia de software.
