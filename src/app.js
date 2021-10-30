class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    ;(this.ano = ano),
      (this.mes = mes),
      (this.dia = dia),
      (this.tipo = tipo),
      (this.descricao = descricao),
      (this.valor = valor)
  }

  validarDados() {
    for (let indice in this) {
      // this se trata do proprio objeto despesa
      if (
        this[indice] === undefined ||
        this[indice] === '' ||
        this[indice] === null
      ) {
        return false
      }
    }

    return true
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem('id')

    if (id === null) {
      localStorage.setItem('id', 0)
    }
  }
  getProximoId() {
    let proximoId = parseInt(localStorage.getItem('id')) + 1
    return proximoId
  }

  gravar(despesa) {
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(despesa))
    localStorage.setItem('id', id)
  }
}

let bd = new Bd()

function cadastrarDespesa() {
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )

  if (despesa.validarDados()) {
    bd.gravar(despesa)
    $('#sucessoGravacao').modal('show')

    {
      document.getElementById('ano').value = ''
      document.getElementById('mes').value = ''
      document.getElementById('dia').value = ''
      document.getElementById('tipo').value = ''
      document.getElementById('descricao').value = ''
      document.getElementById('valor').value = ''
    }
  } else {
    $('#erroGravacao').modal('show')
  }
}
