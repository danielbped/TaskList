window.onload = function () {
  let inputTarefa = document.querySelector('#texto-tarefa');
  let botaoTarefa = document.querySelector('#criar-tarefa');
  let listaTarefas = document.querySelector('#lista-tarefas');
  let botaoLimpaLista = document.querySelector('#apaga-tudo');
  let botaoLimpaConcluidos = document.querySelector('#remover-finalizados');
  let botaoSalvarLista = document.querySelector('#salvar-tarefas');
  let botaoMoveCima = document.querySelector('#mover-cima');
  let botaoMoveBaixo = document.querySelector('#mover-baixo');
  let botaoRemove = document.querySelector('#remover-selecionado');
  getTarefas();
  
  botaoTarefa.addEventListener('click', function (event) {
    novaTarefa(event);
  });
  
  inputTarefa.addEventListener('keyup', function (event) {
    var key = event.which || event.keyCode;
    if (key == 13) {
      novaTarefa(event);
    }
  })
  
  listaTarefas.addEventListener('dblclick', function (event) {
    concluiTarefa(event);
  });
  
  listaTarefas.addEventListener('click', function (event) {
    pintaTarefa(event);
  });
  
  botaoLimpaLista.addEventListener('click', function () {
    let tarefas = document.querySelectorAll('.tarefa');
    if (tarefas.length > 0) {
      for (let index = 0; index < tarefas.length; index += 1) {
        listaTarefas.removeChild(tarefas[index]);
      }
      arrayTarefas = [];
    } else {
      alert('Não há itens na lista.');
    }
  });
  
  botaoLimpaConcluidos.addEventListener('click', function () {
    let tarefasConcluidas = document.querySelectorAll('.completed');
    if (tarefasConcluidas.length > 0) {
      for (let index = 0; index < tarefasConcluidas.length; index += 1) {
        listaTarefas.removeChild(tarefasConcluidas[index]);
      }
    } else {
      alert('Não há tarefas marcadas como concluídas.');
    }
  });
  
  botaoSalvarLista.addEventListener('click', function () {
    let arrayTarefas = [];
    let classes = [];
    let tarefas = document.querySelectorAll('.tarefa');
    for (let index = 0; index < tarefas.length; index += 1) {
      let classe = tarefas[index].classList;
      arrayTarefas.push(tarefas[index].innerHTML);
      classes.push(classe);
    }
    localStorage.setItem('Lista', arrayTarefas);
    localStorage.setItem('Classes', classes);
  });
  
  botaoRemove.addEventListener('click', function () {
    let tarefaSelecionada = document.querySelector('.selecionada');
    if (!tarefaSelecionada) {
      alert('Nenhuma tarefa selecionada.');
    } else {
      listaTarefas.removeChild(tarefaSelecionada);
    }
  });
  
  botaoMoveBaixo.addEventListener('click', function () {
    let tarefaSelecionada = document.querySelector('.selecionada');
    if (!tarefaSelecionada) {
      alert('Nenhuma tarefa selecionada');
    } else {
      let proximoItem = tarefaSelecionada.nextElementSibling;
      
      if (tarefaSelecionada === listaTarefas.lastChild) {
        alert('Item está na posição máxima');
      } else {
        proximoItem.insertAdjacentElement('afterend', tarefaSelecionada); // Referência David Gonzaga
      }
    }
  });
  
  botaoMoveCima.addEventListener('click', function () {
    let tarefaSelecionada = document.querySelector('.selecionada');
    
    if (!tarefaSelecionada) {
      alert('Nenhuma tarefa selecionada.');
    } else {
      let itemAnterior = tarefaSelecionada.previousElementSibling;
      
      if (tarefaSelecionada === listaTarefas.firstChild) {
        alert('Item está na posição máxima');
      } else {
        itemAnterior.insertAdjacentElement('beforebegin', tarefaSelecionada); // Referência David Gonzaga
      }
    }
  });
  
  function getTarefas() {
    if (typeof localStorage.getItem('Lista') === 'object') {
      localStorage.setItem('Lista', []);
    }
    if (typeof localStorage.getItem('Classes') === 'object') {
      localStorage.setItem('Classes', []);
    }
    
    let arrayTarefas = localStorage.getItem('Lista');
    let classes = localStorage.getItem('Classes');
    let classesSplit = classes.split(',');
    let arraySplit = arrayTarefas.split(',');
    let arrayFilter = arraySplit.filter(Boolean);
    for (let index = 0; index < arrayFilter.length; index += 1) {
      let novaTarefa = document.createElement('li');
      novaTarefa.innerHTML = arrayFilter[index];
      novaTarefa.className = classesSplit[index];
      listaTarefas.appendChild(novaTarefa);
    }
  }
  
  function novaTarefa() {
    let novaTarefa = document.createElement('li');
    if (inputTarefa.value === '') {
      alert('Valor de entrada não pode ser vazio.');
    } else {
      novaTarefa.innerHTML = inputTarefa.value;
      novaTarefa.className = 'tarefa';
      listaTarefas.appendChild(novaTarefa);
      inputTarefa.value = '';
    }
  }
  
  function pintaTarefa(event) {
    let tarefaSelecionada = document.querySelectorAll('.selecionada');
    if (tarefaSelecionada.length > 0) {
      tarefaSelecionada[0].className = 'tarefa';
      event.target.className = 'tarefa selecionada';
    } else if (event.target.className === 'tarefa completed') {
      event.target.className = 'tarefa completed';
    } else if (event.target.className === 'tarefa selecionada') {
      event.target.className = 'tarefa';
    }
    else {
      event.target.className = 'tarefa selecionada';
    }
  }
  
  function concluiTarefa(event) {
    if (event.target.className === 'tarefa completed') {
      event.target.className = 'tarefa';
    } else {
      event.target.className = 'tarefa completed';
    }
  }
};
