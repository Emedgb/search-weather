let input = document.querySelector('.busca input');
let botaoBuscar = document.querySelector('.busca button');

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        let cidadeBuscar = input.value;
        if (cidadeBuscar.trim().length > 0) {
            ocultarErro();
            ocultarClima();
            exibirCarregando();
            consultarClima(encodeURI(cidadeBuscar));
        }
    }
});

botaoBuscar.addEventListener('click', () => {
    let cidadeBuscar = input.value;
    if (cidadeBuscar.trim().length > 0) {
        ocultarErro();
        ocultarClima();
        exibirCarregando();
        consultarClima(encodeURI(cidadeBuscar));
    }
});

const consultarClima = async (nomeCidade) => {
    let chaveAPI = 'b4a48c408dafee94fe6409d95b05b3c5';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=${chaveAPI}&units=metric&lang=pt_br`;

    let request = await fetch(url);
    let climaJSON = await request.json();

    validaConsulta(climaJSON);
}


const validaConsulta = (json) => {
    if (json.cod === 200) {
        // console.log(json);

        let climaJSON = {
            nome: json.name,
            pais: json.sys.country,
            sensacao: json.main.feels_like,
            pressao: json.main.pressure,
            temp: json.main.temp,
            umidade: json.main.humidity,
            clima: json.weather[0].description,
            icone: json.weather[0].icon,
            ventoVelocidade: json.wind.speed
        }
        
        limparInput();
        ocultarCarregando();
        exibirClima(climaJSON);
    } else {
        limparInput();
        ocultarCarregando();
        exibirErro();
    }
}

const exibirCarregando = () => {
    document.querySelector('[data-js="carregando"]').style.display = 'flex';
}

const ocultarCarregando = () => {
    document.querySelector('[data-js="carregando"]').style.display = 'none';

}

const exibirClima = (json) => {

    document.querySelector('[data-js="cidade"]').innerHTML = `${json.nome}, ${json.pais}`;
    document.querySelector('[data-js="sensacao-temp"]').innerHTML = `${json.sensacao}ºC`;
    document.querySelector('[data-js="temp-atual"]').innerHTML = `${json.temp}ºC`;
    document.querySelector('[data-js="pressao"]').innerHTML = `${json.pressao}hPa`;
    document.querySelector('[data-js="umidade"]').innerHTML = `${json.umidade}%`;
    document.querySelector('[data-js="descricao"]').innerHTML = `${json.clima}`;
    document.querySelector('[data-js="vento"]').innerHTML = `${json.ventoVelocidade}km/h`;
    document.querySelector('[data-js="imagem"]').setAttribute('src', `https://openweathermap.org/img/wn/${json.icone}@2x.png`);

    document.querySelector('[data-js="clima-area"]').style.display = 'flex';
}

const ocultarClima = () => {
    document.querySelector('[data-js="clima-area"]').style.display = 'none';
}

const exibirErro = () => {
    document.querySelector('[data-js="erro-busca"]').style.display = 'flex';
}

const ocultarErro = () => {
    document.querySelector('[data-js="erro-busca"]').style.display = 'none';
}

const limparInput = () => {
    input.value = '';
}