var Libro = function (id, name, author, code, boorowed) {
  this.id = id;
  this.name = name;
  this.author = author;
  this.code = code;
  this.borrowed = boorowed;
};

libros = [];

function grabar(indice) {

  var id = indice;
  var name = document.getElementById('name').value;
  var author = document.getElementById('author').value;
  var code = document.getElementById('code').value;
  var borrowed = false;

  libros.push(new Libro(id, name, author, code, borrowed));

  console.log(libros);

}

function register() {
  var i = libros.length;
  grabar(i);

  var row = document.createElement('tr');

  //crear los nodos texto
  var nameTd = document.createElement('td');
  var authorTd = document.createElement('td');
  var codeTd = document.createElement('td');
  var borrowedTd = document.createElement('td');
  var deleteTd = document.createElement('td');

  //crear los nodos texto
  var nameText = document.createTextNode(libros[i].name);
  var autorText = document.createTextNode(libros[i].author);
  var codeText = document.createTextNode(libros[i].code);

  //crear el nodo prestar
  var borrowedInput = document.createElement('input');
  var onclickAttribute = document.createAttribute('onclick');
  onclickAttribute.value = 'prestar(this)';
  var typeAttribute = document.createAttribute('type');
  typeAttribute.value = 'checkbox';
  var idAttribute = document.createAttribute('id');
  idAttribute.value = 'borrowed';
  borrowedInput.setAttributeNode(onclickAttribute);
  borrowedInput.setAttributeNode(typeAttribute);
  borrowedInput.setAttributeNode(idAttribute);

  //crear el nodo boton
  var deleteText = document.createTextNode('Borrar');
  var deleteButton = document.createElement('button');
  var onclickAtribute = document.createAttribute('onclick');
  onclickAtribute.value = 'borrar(this)';
  deleteButton.appendChild(deleteText);
  deleteButton.setAttributeNode(onclickAtribute);

  //agregar los textos nodos a los td nodos
  nameTd.appendChild(nameText);
  authorTd.appendChild(autorText);
  codeTd.appendChild(codeText);
  borrowedTd.appendChild(borrowedInput);
  deleteTd.appendChild(deleteButton);

  //agregar los items a la fila
  row.appendChild(nameTd);
  row.appendChild(authorTd);
  row.appendChild(codeTd);
  row.appendChild(borrowedTd);
  row.appendChild(deleteTd);

  //agregar el id a la fila
  var idAttributeRow = document.createAttribute('id');
  idAttributeRow.value = libros[i].id;
  row.setAttributeNode(idAttributeRow);

  //agregar la fila a la tabla
  document.getElementById('borrowedBooks').appendChild(row);

  //setear los inputs en cero
  document.getElementById('name').value = '';
  document.getElementById('author').value = '';
  document.getElementById('code').value = ''
  document.getElementById('borrowed').checked = false;

  uptadeSelect()

}

function uptadeSelect() {
  //rellenar el select
  var update = document.getElementById('select').parentNode;
  update.removeChild(document.getElementById('select'));

  //crear el select
  var select = document.createElement('select');
  var idAttributeSelect = document.createAttribute('id');
  idAttributeSelect.value = 'select';
  select.setAttributeNode(idAttributeSelect);

  //crear el primer option
  var optionTag = document.createElement('option');
  var optionText = document.createTextNode('Seleccionar');
  optionTag.appendChild(optionText);
  select.appendChild(optionTag);

  let onChangeAttribute = document.createAttribute('onchange');
  onChangeAttribute.value = 'setUpdate(this)';

  select.setAttributeNode(onChangeAttribute);

  //crear todos los correspondientes options
  libros.forEach(function (libro) {
    let optionTag = document.createElement('option');
    let optionText = document.createTextNode(libro.name);
    optionTag.appendChild(optionText);
    select.appendChild(optionTag);
  });

  update.appendChild(select);
}

function borrar(node) {
  var row = node.parentNode.parentNode;
  row.parentNode.removeChild(row);
  libros.forEach(function (libro) {
    if (row.getAttribute('id') == libro.id) {
      var indice = libros.indexOf(libro);
      libros.splice(indice, 1)
    }
  });
  console.log(libros);
}

function prestar(node) {
  var row = node.parentNode.parentNode;
  updateBorrowed(row);
  var borrowed = false;
  libros.forEach(function (libro) {
    if (row.getAttribute('id') == libro.id) {
      borrowed = libro.borrowed;
    }
  });
  if (!borrowed) {
    updateBorrewedTable(row);
  } else {
    updateAvailableTable(row);
  }
}

function updateBorrewedTable(row) {
  row.parentNode.removeChild(row);
  var borrowedTable = document.getElementById('borrowedBooks');
  borrowedTable.appendChild(row);
}

function updateAvailableTable(row) {
  row.parentNode.removeChild(row);
  var availableTable = document.getElementById('availableBooks');
  availableTable.appendChild(row);
}

function updateBorrowed(row) {
  libros.forEach(function (libro) {
    if (row.getAttribute('id') == libro.id) {
      if (libro.borrowed) {
        libro.borrowed = false;
      } else {
        libro.borrowed = true;
      }
    }
  });
}

function setUpdate(node) {
  libros.forEach(function (libro) {
    if (libro.name == node.value) {
      document.getElementById('nameUpdate').value = libro.name;
      document.getElementById('authorUpdate').value = libro.author;
      document.getElementById('codeUpdate').value = libro.code;
    }
  });
}

function updateThis() {
  var index = 0;
  libros.forEach(function (libro) {
    if (libro.name == document.getElementById('select').value) {
      index = libro.id;
      libro.name = document.getElementById('nameUpdate').value;
      libro.author = document.getElementById('authorUpdate').value;
      libro.code = document.getElementById('codeUpdate').value;
    }
  });
  let row = document.getElementById(index).childNodes;
  row[0].innerHTML = document.getElementById('nameUpdate').value;
  row[1].innerHTML = document.getElementById('authorUpdate').value;
  row[2].innerHTML = document.getElementById('codeUpdate').value;

  uptadeSelect();

  document.getElementById('nameUpdate').value = '';
  document.getElementById('authorUpdate').value = '';
  document.getElementById('codeUpdate').value = '';

}

