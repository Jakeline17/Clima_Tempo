const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

  const sectionTempoInfo = document.querySelector('#tempo-info');

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || ! sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("o local precisa ter pelo menos 3 letras");
    return;
  }
  try{
  const resposta = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${localizacao}&appid=4ab3aeaed480b9ccb8b421e8de668c7a&lang=pt_br&units=metric`);
  const dados = await resposta.json();
  

  const infos ={
    temperatura:Math.round(dados.main.temp),
    local:dados.name,
    icone:(`https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png,`)
  };

 
sectionTempoInfo.innerHTML= 
`return
 <div class="tempo-dados">
          <h2>${infos.local}</h2>
          <span>${infos.temperatura}°C</span>
        </div>
        <img src="${infos.icone}"/>
`;
  }catch(err){
    console.log('Erro na obtenção dos dados da API',err);
  }
});