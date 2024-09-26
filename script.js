function salvarVaga(placa, nome, numeroApartamento, bloco, modelo, cor, numeroVaga) {
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    vagas.push({ placa, nome, numeroApartamento, bloco, modelo, cor, numeroVaga });
    localStorage.setItem('vagas', JSON.stringify(vagas));
}

document.getElementById('cadastroForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const placa = document.getElementById('placa').value;
    const nome = document.getElementById('nome').value;
    const numeroApartamento = document.getElementById('numeroApartamento').value;
    const bloco = document.getElementById('bloco').value;
    const modelo = document.getElementById('modelo').value;
    const cor = document.getElementById('cor').value;
    const numeroVaga = document.getElementById('numeroVaga').value;

    salvarVaga(placa, nome, numeroApartamento, bloco, modelo, cor, numeroVaga);

    alert('Cadastro realizado com sucesso!');

    setTimeout(() => {
        window.location.href = 'listar.html';
    }, 1000);

    this.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('vagasList')) {
        listarVagasCadastradas();
    }

    if (document.getElementById('vagasDisponiveisList')) {
        listarVagasDisponiveis();
    }

    document.getElementById('voltarButton')?.addEventListener('click', function() {
        window.location.href = 'cadastro.html';
    });

    document.getElementById('listarVagasButton')?.addEventListener('click', function() {
        window.location.href = 'listar.html';
    });

    document.getElementById('vagasDisponiveisButton')?.addEventListener('click', function() {
        window.location.href = 'vagas-disponiveis.html';
    });
});

function listarVagasCadastradas() {
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    const vagasList = document.getElementById('vagasList');

    vagas.forEach(vaga => {
        const li = document.createElement('li');
        li.className = 'vaga-item';
        li.textContent = `Placa: ${vaga.placa}, Nome: ${vaga.nome}, Vaga: ${vaga.numeroVaga}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.addEventListener('click', function() {
            deletarVaga(vaga.numeroVaga);
        });
        li.appendChild(deleteButton);

        vagasList.appendChild(li);
    });
}

function listarVagasDisponiveis() {
    const vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    const vagasList = document.getElementById('vagasDisponiveisList');

    const todasVagas = Array.from({ length: 10 }, (_, i) => i + 1);
    const vagasOcupadas = vagas.map(vaga => vaga.numeroVaga);
    const vagasDisponiveis = todasVagas.filter(vaga => !vagasOcupadas.includes(vaga.toString()));

    vagasDisponiveis.forEach(vaga => {
        const li = document.createElement('li');
        li.className = 'vaga-item';
        li.textContent = `Vaga ${vaga} disponível`;
        vagasList.appendChild(li);
    });
}

function deletarVaga(numeroVaga) {
    let vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    vagas = vagas.filter(vaga => vaga.numeroVaga !== numeroVaga);
    localStorage.setItem('vagas', JSON.stringify(vagas));
    window.location.reload();
}
