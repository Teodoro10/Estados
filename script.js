const recebe = async function () {
  const apireponse = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
  );
  const data = await apireponse.json();

  // id do select
  const select = document.querySelector("#selection");

  //colocar sempre o parametro como recebedor
  data.forEach((option) => {
    const elements = document.createElement("option");
    elements.innerHTML = `<option value="">${option.sigla}</option>`;
    select.appendChild(elements);
  });

  //referencia ao select para add o change
  document.querySelector("#selection").addEventListener("change", myFunction);

  // função dos estados
  async function myFunction() {
    const twoapi = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${select.value}`
    );
    const twodata = await twoapi.json();

    const id = document.querySelector("#id");
    id.innerHTML = "ID do estado: " + twodata.id;

    const nome = document.querySelector("#nome");
    nome.innerHTML = "Nome doe estado : " + twodata.nome;

    const rgsigla = document.querySelector("#regiao_sigla");
    rgsigla.innerHTML = "Sigla da região: " + twodata.regiao.sigla;

    const rgnome = document.querySelector("#regiao_nome");
    rgnome.innerHTML = "Nome da região: " + twodata.regiao.nome;

    const sigla = document.querySelector("#sigla");
    sigla.innerHTML = "Sigla do estado " + twodata.sigla;

    //função das cidades
    const disapi = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${twodata.sigla}/distritos`
    );
    const disdata = await disapi.json();

    const dados = document.querySelector("#dados");
    disdata.forEach((tdbody) => {
      const elements = document.createElement("td");
      elements.innerHTML = `<td>${tdbody.nome} </td>`;
      dados.appendChild(elements);
    });
  }
};
recebe();
