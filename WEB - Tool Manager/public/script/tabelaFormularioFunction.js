function MudarFormulario() {
    var selectPrincipal = document.getElementById("itemCadastro");
    var formularios = document.querySelectorAll('.formulario');

    console.log('heelooo');
    for (var i = 0; i < formularios.length; i++) formularios[i].style.display = 'none';
    var divID = selectPrincipal.options[selectPrincipal.selectedIndex].value;
    var div = document.getElementById(divID);
    console.log(divID);
    div.style.display = 'block';

}