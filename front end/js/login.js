
// função criada para verificar se o usuário está logado 
function verificarStatusLogin() {

    const token = localStorage.getItem('usuarioToken'); 
    const perfilLogado = document.querySelector('.perfil'); 
    const perfilDeslogado = document.querySelector('.perfilDeslogado'); 
    const btnRegistrarGolpe = document.querySelector('.btnCadastro');
    
    // se o token existir mostro o perfil logado
    if(token) {
        perfilLogado.style.display = 'flex';
        perfilDeslogado.style.display = 'none';

        if(btnRegistrarGolpe) {
            btnRegistrarGolpe.style.display = 'flex'; 
        }
        
        //Carregar o nome do usuário salvo no localStorage
        const usuarioData = JSON.parse(localStorage.getItem('usuarioData') || '{}');

        if(usuarioData.nome) {
            document.querySelector('.nomeUsuario').textContent = usuarioData.nome;
        }

    }
    else { // oculta perfil logad e mostra deslogad
        perfilLogado.style.display = 'none';
        perfilDeslogado.style.display = 'flex';

        if(btnRegistrarGolpe) {
            btnRegistrarGolpe.style.display = 'none'; 
        }
    }
}

// chamo a função assim q o DOM carrega
document.addEventListener('DOMContentLoaded', verificarStatusLogin);



async function registrarNovoUsuario(event) {
    event.preventDefault(); 

    const form = document.getElementById('formCadastroUsuario');
    const formData = new FormData(form);
    const usuarioData = Object.fromEntries(formData.entries());

    const senha = document.getElementById('reg_senha').value;
    const confirmarSenha = document.getElementById('reg_confirmar_senha').value;

    if (senha !== confirmarSenha) {
        alert("As senhas digitadas não são iguais. Por favor, verifique.");
        return; // Impede o envio do formulário
    }

    try {
        const URL = 'http://localhost:3000/api/usuario/'; 
        const resposta = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioData),
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(`Erro no Cadastro: ${dados.erro || 'Verifique os dados.'}`);
            return;
        }

        // Sucesso no registro: Salva o token e dados
        localStorage.setItem('usuarioToken', dados.token);
        localStorage.setItem('usuarioData', JSON.stringify({ 
            nome: dados.nome, 
            email: dados.email, 
            _id: dados._id 
    }));

        alert("Cadastro realizado com sucesso! Você está logado.");
        form.reset();
        fecharModal('modalCadastroUsuario');
        
        // Atualiza o header para mostrar o nome d usuari
        verificarStatusLogin(); 

    } catch (error) {
        console.error("Erro ao registrar:", error);
        alert("Erro de conexão com o servidor.");
    }
}


async function fazerLogin(event) {
    event.preventDefault(); 

    const form = document.getElementById('formLogin');
    const formData = new FormData(form);
    const usuarioData = Object.fromEntries(formData.entries());

    try {
        const URL = 'http://localhost:3000/api/usuario/login'; 
        const resposta = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioData),
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(`Erro no Login: ${dados.erro || 'E-mail ou senha incorretos.'}`);
            return;
        }

        // Sucesso no login: Salva o token e dados
        localStorage.setItem('usuarioToken', dados.token);
        localStorage.setItem('usuarioData', JSON.stringify({ 
        nome: dados.nome, 
        email: dados.email, 
        _id: dados._id // Garante que o ID do usuário seja salvo
    }));

        alert("Login realizado com sucesso!");
        form.reset();
        fecharModal('modalLogin');
        
        // Atualiza o header
        verificarStatusLogin(); 

    } catch (error) {
        console.error("Erro ao logar:", error);
        alert("Erro de conexão com o servidor.");
    }
}


function deslogar() {
    localStorage.clear();
}