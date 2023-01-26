var select = document.getElementById("itemCadastro");
var formularios = document.querySelectorAll('.formulario');

select.onchange = function () {
    for (var i = 0; i < formularios.length; i++) formularios[i].style.display = 'none';
    var divID = select.options[select.selectedIndex].value;
    var div = document.getElementById(divID);
    div.style.display = 'block';
};