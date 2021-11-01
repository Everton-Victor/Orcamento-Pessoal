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

// ============================================

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

  recuperarTodosRegistros() {
    let despesas = []
    let id = localStorage.getItem('id')
    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i))

      if (despesa !== null) {
        despesas.push(despesa)
      }
    }

    return despesas
  }

  pesquisar(despesa) {
    let despesasFiltradas = []
    despesasFiltradas = this.recuperarTodosRegistros()

    if (despesa.ano !== '') {
      despesasFiltradas = despesasFiltradas.filter(
        valor => valor.ano === despesa.ano
      )
    }

    if (despesa.mes !== '') {
      despesasFiltradas = despesasFiltradas.filter(
        valor => valor.mes === despesa.mes
      )
    }

    if (despesa.dia !== '') {
      despesasFiltradas = despesasFiltradas.filter(
        valor => valor.dia === despesa.dia
      )
    }

    if (despesa.tipo !== '') {
      despesasFiltradas = despesasFiltradas.filter(
        valor => valor.tipo === despesa.tipo
      )
    }

    if (despesa.descricao !== '') {
      despesasFiltradas = despesasFiltradas.filter(
        valor => valor.descricao === despesa.descricao
      )
    }

    if (despesa.valor !== '') {
      despesasFiltradas = despesasFiltradas.filter(
        val => val.valor === despesa.valor
      )
    }

    return despesasFiltradas
  }
}

// ============================================

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

// ============================================

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

// ============================================

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

// ============================================

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

// ============================================

const carregaListaDespesas = (despesas = Array(), filtro = false) => {
  if (despesas.length === 0 && filtro === false) {
    despesas = bd.recuperarTodosRegistros()
  }

  let lista_despesas = document.getElementById('lista_despesas')
  lista_despesas.innerHTML = ''
  despesas.forEach(objeto => {
    let linha = lista_despesas.insertRow() // cria <tr>
    linha.insertCell(0).innerHTML = `${objeto.dia}/${objeto.mes}/${objeto.ano}` // cria a 1 <td>
    linha.insertCell(1).innerHTML = verificaTipo(objeto.tipo) // cria a 2 <td>

    linha.insertCell(2).innerHTML = objeto.descricao // cria a 3 <td>
    linha.insertCell(3).innerHTML = objeto.valor // cria a 4 <td>
  })
}

const verificaTipo = tipo => {
  switch (tipo) {
    case '1':
      return (tipo = 'Alimentação')
    case '2':
      return (tipo = 'Educação')
    case '3':
      return (tipo = 'Lazer')
    case '4':
      return (tipo = 'Saúde')
    case '5':
      return (tipo = 'Transporte')
  }
}

// ============================================

const pesquisarDespesa = () => {
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
  let despesas = bd.pesquisar(despesa)

  carregaListaDespesas(despesas, true)
}
