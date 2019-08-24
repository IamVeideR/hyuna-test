let currentDate = new Date().toISOString().substr(0, 10);
let currencyDate = currentDate.match(/\d/g);
currencyDate = currencyDate.join("");
let currentCurrencies = [];

let requestURL = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${currencyDate}&json`;
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    currentCurrencies = request.response;  

    let cur = new Vue({
        el: '#cur',
        data: {
            currencies: currentCurrencies,
            selectedCurrency: '---',
            todaysDate: currentDate,
            todaysRate: null,
        },
        methods: {
            changeDate: function () {
                currentDate = document.querySelector('.currency__date').value;
                let currencyDate = currentDate.match(/\d/g);
                currencyDate = currencyDate.join("");
                let curRequestURL = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${currencyDate}&json`;
                let curRequest = new XMLHttpRequest();
                curRequest.open('GET', curRequestURL);
                curRequest.responseType = 'json';
                curRequest.send();
                curRequest.onload = function() {
                    cur.currencies = curRequest.response; 
                    cur.todaysRate = cur.currencies[cur.selectedCurrency].rate;
                }               
            },
            changeCurrency: function () {
                if (cur.selectedCurrency == '---') {
                    cur.todaysRate = '';
                }
                else {
                    cur.todaysRate = cur.currencies[cur.selectedCurrency].rate;
                }
            }
        },
    })
    document.querySelector('.currency__date').value = currentDate;

    let con = new Vue({
        el: '#con',
        data: {
            currenciesFirst: currentCurrencies,
            currenciesSecond: currentCurrencies,
            selectedCurrencyFirst: '---',
            selectedCurrencySecond: '---',
            rateFirst: null,
            rateSecond: null,
            firstValue: 1,
            secondValue: null,
        },
        methods: {
            changeCurrencyFirst: function () {
                if (con.selectedCurrencyFirst == '---' || con.selectedCurrencyFirst == 'Українська гривня') {
                    con.rateFirst = 1;
                } else {
                    con.rateFirst = con.currenciesFirst[con.selectedCurrencyFirst].rate;
                }
                con.makeCalculations();
            },
            changeCurrencySecond: function () {
                if (con.selectedCurrencySecond == '---' || con.selectedCurrencySecond == 'Українська гривня') {
                    con.rateSecond = 1;
                }
                else {
                    con.rateSecond = con.currenciesSecond[con.selectedCurrencySecond].rate;
                }
                con.makeCalculations();
            },
            makeCalculations: function () {
                if (con.selectedCurrencyFirst!='---' && con.selectedCurrencySecond!='---') {
                    con.secondValue =  Math.floor(con.firstValue*con.rateFirst/con.rateSecond * 10**6) / 10**6;
                }
            },
            reverseCurrency: function () {
                let selectedCurrencyThird = con.selectedCurrencyFirst;
                con.selectedCurrencyFirst = con.selectedCurrencySecond;
                con.selectedCurrencySecond = selectedCurrencyThird;
                let rateThird = con.rateFirst;
                con.rateFirst = con.rateSecond;
                con.rateSecond = rateThird;
                con.makeCalculations();
            }
        },
    })
}

    
