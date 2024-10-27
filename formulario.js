//Função: formatar o nome completo 
function formatarNome() {
    const nomeInput = document.getElementById('nomeCompleto');
    nomeInput.value = nomeInput.value.toLowerCase().replace(/\b\w/g, letra => letra.toUpperCase());
}
//Função: valida o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); 
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, verificador;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    verificador = (soma * 10) % 11;
    if (verificador === 10 || verificador === 11) verificador = 0;
    if (verificador !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    verificador = (soma * 10) % 11;
    return verificador === parseInt(cpf.charAt(10));
}
//Função: aplica a mascara no CPF
function aplicarMascaraCPF() {
    const cpfInput = document.getElementById('cpfUsuario');
    cpfInput.value = cpfInput.value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{2})$/, "$1-$2");
}
//Função: aplica a mascara no telefone
function aplicarMascaraTelefone() {
    const telefoneInput = document.getElementById('telefoneUsuario');
    telefoneInput.value = telefoneInput.value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}
//Função: valida a confirmação da senha
function validarConfirmacaoSenha() {
    const senha = document.getElementById('senhaUsuario').value;
    const confirmaSenha = document.getElementById('repetirSenha').value;
    if (senha.length < 8) {
        alert('A senha deve ter no minimo 8 digitos');
        return false;
    }
    if (senha !== confirmaSenha) {
        alert('As senhas não correspondem');
        return false;
    }
    return true;
}
//Função: calcular e definir a idade na data de nascimento
function validarDataDeNascimento() {
    const dataNasc = document.getElementById('nascimentoUsuario').value;
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    if (nascimento > hoje || nascimento.getFullYear() < 1900) {
        alert('Data de nascimento invalida');
        document.getElementById('nascimentoUsuario').value = '';
        return false;
    }
    definirIdade(nascimento);
    return true;
}
//Função: definir a idade de nascimento
function definirIdade(nascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const diferencaMes = hoje.getMonth() - nascimento.getMonth();
    if (diferencaMes < 0 || (diferencaMes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    document.getElementById('idadeUsuario').value = idade;
}
//Função: processar o envio do formulário
function processarEnvio(event) {
    event.preventDefault();
    const cpf = document.getElementById('cpfUsuario').value;
    if (!validarCPF(cpf)) {
        alert('CPF invalido');
        return false;
    }
     //Função: confirmação da senha e da data de nascimento
    if (!validarConfirmacaoSenha() || !validarDataDeNascimento()) return false;
    alert('Cadastro concluído!');
}