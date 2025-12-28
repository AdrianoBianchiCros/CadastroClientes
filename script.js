//Seleciona o cliente
const clientes = document.getElementById("listaCliente")

fetch("https://crudcrud.com/api/3c66dbb3331e44499e7aabe98c096de3/clientes")
.then(resposta => resposta.json())
.then((listaCliente)=> {
    listaCliente.forEach(cliente => {
        //JSON
        const item = document.createElement("li");
         item.innerHTML = `
        <strong>${cliente.Nome}</strong><br>
        📞 ${cliente.Telefone}<br>
        📍 ${cliente.Cidade}
       <button onclick = "remove('${cliente._id}',this)">X</button>`;
        clientes.appendChild(item)
    });
})

document.getElementById("add").addEventListener("click", () => {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const cidade = document.getElementById("cidade").value;

  fetch("https://crudcrud.com/api/3c66dbb3331e44499e7aabe98c096de3/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({nome,email,cidade })
  })
    .then(resposta => resposta.json())
    .then(cliente => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${cliente.nome}</strong><br>
        📞 ${cliente.email}<br>
        📍 ${cliente.cidade}
         <button onclick = "remove('${cliente._id}',this)">X</button>`;
      clientes.appendChild(item);
    })
});

function remove(id, botao) {
  fetch(`https://crudcrud.com/api/3c66dbb3331e44499e7aabe98c096de3/clientes/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    alert("Cliente removido com sucesso!");
    botao.parentElement.remove();
    location.reload(); 
  })
  .catch(error => console.error("Erro ao remover:", error));
}






