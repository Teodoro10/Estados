const recebe = async function () {
  const apireponse = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
  );
  const data = await apireponse.json();

  const select = document.querySelector("#selection");

  //colocar sempre o parametro como recebedor
  data.forEach((option) => {
    const elements = document.createElement("option");
    elements.innerHTML = `<option value="">${option.sigla}</option>`;
    select.appendChild(elements);
  });

  //tem que fazer a referencia ao html
  document.querySelector("#selection").addEventListener("change", myFunction);
  async function myFunction() {
    const twoapi = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${select.value}`
    );
    const twodata = await twoapi.json();

    const id = document.querySelector("#id");
    const nome = document.querySelector("#nome");
    const rgsigla = document.querySelector("#regiao_sigla");
    const rgnome = document.querySelector("#regiao_nome");
    const sigla = document.querySelector("#sigla");

    id.innerHTML = "ID do estado: " + twodata.id;
    nome.innerHTML = "Nome doe estado : " + twodata.nome;
    rgsigla.innerHTML = "Sigla da região: " + twodata.regiao.sigla;
    rgnome.innerHTML = "Nome da região: " + twodata.regiao.nome;
    sigla.innerHTML = "Sigla do estado " + twodata.sigla;
  }
  myFunction();
};

console.log(recebe());
