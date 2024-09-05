function ViewDisplay(id) {
    document.getElementById(id).style.display = 'flex';
    document.getElementById('Main').classList.add('Blur')
    console.log('slalslasla');
}

function ClearDisplay() {
    let devolver = document.getElementById('Devolver')
    let retirar = document.getElementById("Retirar")
    if (devolver.style.display != 'flex' || retirar.style.display != 'flex') {
        devolver.style.display = 'none'
        retirar.style.display = 'none'
        console.log('entrou');
    }
    console.log('sla');
    document.getElementById('Main').classList.remove('Blur')
}

// ========================================================================

