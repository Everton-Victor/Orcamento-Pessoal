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
    cadastroDespesaSucesso()
    $('#modalRegistraDespesa').modal('show')
    limparCampos()
  } else {
    cadastroDespesaFalha()
    $('#modalRegistraDespesa').modal('show')
  }
}

const limparCampos = () => {
  with (document) {
    getElementById('ano').value = ''
    getElementById('mes').value = ''
    getElementById('dia').value = ''
    getElementById('tipo').value = ''
    getElementById('descricao').value = ''
    getElementById('valor').value = ''
  }
}

const cadastroDespesaSucesso = () => {
  with (document) {
    getElementById('modal_titulo').innerHTML = 'Gravação efetuada!'
    getElementById('modal_titulo').classList.remove('text-danger')
    getElementById('modal_titulo').classList.add('text-success')
    getElementById('modal_msg').innerHTML =
      'Gravação de despesa efetuada com sucesso.'
    getElementById('btn-voltar').classList.remove('btn-danger')
    getElementById('btn-voltar').classList.add('btn-success')
    getElementById('btn-voltar').innerHTML = 'Voltar'
  }
}

const cadastroDespesaFalha = () => {
  with (document) {
    getElementById('modal_titulo').innerHTML = 'Gravação não efetuada!'
    getElementById('modal_titulo').classList.remove('text-success')
    getElementById('modal_titulo').classList.add('text-danger')
    getElementById('modal_msg').innerHTML =
      'Gravação de despesa não efetuada, pois existem campos não preenchidos.'
    getElementById('btn-voltar').classList.remove('btn-success')
    getElementById('btn-voltar').classList.add('btn-danger')
    getElementById('btn-voltar').innerHTML = 'Voltar e corrigir'
  }
}
