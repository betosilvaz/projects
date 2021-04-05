// Variáveis
let idDinamico;

// Recuperando dados e criando objeto
function criarDespesa() {
    let ano = document.getElementById("ano").value;
    let mes = document.getElementById("mes").value;
    let dia = document.getElementById("dia").value;
    let tipo = document.getElementById("tipo").value;
    let descricao = document.getElementById("descricao").value;
    let valor = document.getElementById("valor").value;
    let despesa = {ano, mes, dia, tipo, descricao, valor};
    if (ano != "" && mes != "" && dia != "" && tipo != "" && descricao != "" && valor != "") {
        adicionarDespesa(despesa);
        console.log(despesa);
        alert("Despesa registrada com sucesso!");
        // Resetando inputs
        document.getElementById("ano").value = "";
        document.getElementById("mes").value = "";
        document.getElementById("dia").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("descricao").value = "";
        document.getElementById("valor").value = "";
    } else {
        alert("Preencha todos os campos!");
    }
}

// Banco de dados
function adicionarDespesa(despesa) {
    idDinamico = (localStorage.length === 0) ? 1 : parseInt(localStorage.getItem("id")) + 1;
    localStorage.setItem("id", idDinamico);
    despesa.id = idDinamico;
    localStorage.setItem(idDinamico, JSON.stringify(despesa));
}

// Resgatando items do banco de dados
function resgatarDados() {
    let listaDespesas = Array();
    let max = parseInt(localStorage.getItem("id"));
    for(let i = 1; i <= max; i++) {
        if(localStorage.getItem(i) != null) {
            listaDespesas.unshift(JSON.parse(localStorage.getItem(i)));
        }
    }
    console.log(listaDespesas);
    return listaDespesas;
}

// Listar items resgatados do banco de dados
function listarDespesas() {
    let lista = resgatarDados();
    let i = 1;
    for(let x of lista) {
        // Listando
        inserirDespesasNoHTML(i, x);
        // i é uma variavel auxiliar e representa o id do elemento tr
        i++
    }
}

// Filtragem das despesas
function filtrarDespesas() {
    // Limpando tabela
    document.getElementById("tbody").innerHTML = "";
    let lista = resgatarDados()
    let ano = document.getElementById("ano").value;
    let mes = document.getElementById("mes").value;
    let dia = document.getElementById("dia").value;
    let tipo = document.getElementById("tipo").value;
    let descricao = document.getElementById("descricao").value;
    let valor = document.getElementById("valor").value;
    let i = 0;
    for(let x of lista) {
        i++
        if(x.ano == ano || ano == "") {
            if(x.mes == mes || mes == "") {
                if(x.dia == dia || dia == "") {
                    if(x.tipo == tipo || tipo == "") {
                        if(x.descricao == descricao || descricao == "") {
                            if(x.valor == valor || valor == "") {
                                if(x.ano == ano || x.mes == mes || x.dia == dia || x.tipo == tipo || x.descricao == descricao || x.valor == valor) {
                                   inserirDespesasNoHTML(i, x);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// Função que faz a impressão das despesas no HTML
function inserirDespesasNoHTML(i, x) {
        console.log(x)
        let type = (x.tipo == 1) ? "Alimentação" : (x.tipo == 2) ? "Educação" : (x.tipo == 3) ? "Lazer" : (x.tipo == 4) ? "Saúde" : (x.tipo == 5) ? "Transporte" : undefined;

        // Row
        let despesa = document.createElement("tr");
        despesa.id = "id_row"+i;
        document.getElementById("tbody").appendChild(despesa);
        console.log(despesa)

        // Columns
        //Data

        let data = document.createElement("td");
        data.textContent = `${x.dia}/${x.mes}/${x.ano}`;
        // Tipo
        let tipo = document.createElement("td");
        tipo.textContent = `${type}`;
        // Descrição
        let descricao = document.createElement("td");
        descricao.textContent = `${x.descricao}`;
        // Valor
        let valor = document.createElement("td");
        valor.textContent = `${parseFloat(x.valor).toFixed(2)}`;
        // Td do botão de deletar
        let del = document.createElement("td");
        del.id="del"+i
        // Botão de deletar
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger";
        deleteButton.style.width = "7px;"
        deleteButton.id = "deleteButton"+i;
        deleteButton.onclick = () => localStorage.removeItem(x.id); // x.id faz referencia ao id da despesa relacionada a esse botão
        // Icone do botão
        let icon = document.createElement("i");
        icon.className = "far fa-trash-alt";

        document.getElementById("id_row"+i).appendChild(data);
        document.getElementById("id_row"+i).appendChild(tipo);
        document.getElementById("id_row"+i).appendChild(descricao);
        document.getElementById("id_row"+i).appendChild(valor);
        document.getElementById("id_row"+i).appendChild(del)
        document.getElementById("del"+i).appendChild(deleteButton)
        document.getElementById("deleteButton"+i).appendChild(icon);

}
