// ==========================================================================
// 1. GERADOR DO MOTOR DE AMBIENTAÇÃO DA CONSTELAÇÃO DE GÊMEOS
// ==========================================================================
function generateStars() {
    const container = document.getElementById("starsContainer");
    if(!container) return;

    for (let i = 0; i < 45; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--op', `${Math.random() * 0.4 + 0.2}`);
        container.appendChild(star);
    }

    const nodes = {
        castor:   { x: 42, y: 22, type: 'alpha' }, 
        pollux:   { x: 54, y: 20, type: 'beta' },  
        propus:   { x: 34, y: 44, type: 'normal' },
        tejat:    { x: 38, y: 52, type: 'normal' },
        mebsuta:  { x: 41, y: 40, type: 'normal' },
        mekbuda:  { x: 45, y: 54, type: 'normal' },
        alhena:   { x: 48, y: 70, type: 'normal' }, 
        wasat:    { x: 52, y: 42, type: 'normal' },
        clambda:  { x: 57, y: 36, type: 'normal' },
        cxi:      { x: 55, y: 60, type: 'normal' },
        czeta:    { x: 61, y: 52, type: 'normal' },
        mu_gem:   { x: 63, y: 68, type: 'normal' }  
    };

    const connections = [
        ['castor', 'mebsuta'], ['mebsuta', 'propus'], ['propus', 'tejat'],
        ['castor', 'pollux'],
        ['pollux', 'clambda'], ['clambda', 'wasat'], ['wasat', 'mekbuda'], ['mekbuda', 'alhena'],
        ['wasat', 'czeta'], ['czeta', 'cxi'], ['cxi', 'mu_gem']
    ];

    const renderNodes = {};
    for (let key in nodes) {
        const nodeData = nodes[key];
        const nodeEl = document.createElement("div");
        nodeEl.classList.add("constellation-node");
        if (nodeData.type !== 'normal') nodeEl.classList.add(nodeData.type);
        
        nodeEl.style.left = `${nodeData.x}%`;
        nodeEl.style.top = `${nodeData.y}%`;
        container.appendChild(nodeEl);
        
        renderNodes[key] = {
            x: (nodeData.x / 100) * window.innerWidth,
            y: (nodeData.y / 100) * window.innerHeight
        };
    }

    connections.forEach(([fromKey, toKey]) => {
        const from = renderNodes[fromKey];
        const to = renderNodes[toKey];
        if(!from || !to) return;

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const line = document.createElement("div");
        line.classList.add("constellation-line");
        line.style.width = `${distance}px`;
        line.style.left = `${nodes[fromKey].x}%`;
        line.style.top = `${nodes[fromKey].y}%`;
        line.style.transform = `rotate(${angle}deg)`;

        container.appendChild(line);
    });
}

// ==========================================================================
// 2. CONTAGEM REGRESSIVA PRECISÃO ABSOLUTA (20/06/2026 21:30)
// ==========================================================================
const TARGET_DATE = new Date("2026-06-20T21:30:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerHTML = "<h3 style='color:var(--color-accent); font-family:var(--font-title); font-size:1.8rem;'>O Alinhamento Celestial Começou!</h3>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

// ==========================================================================
// 3. CONTROLE SISTÊMICO DO MODAL DE EVOLUÇÃO & BANCO DE DADOS
// ==========================================================================
const dadosAniversariantes = {
    messi: {
        name: "Gabriel Messias, o Messie",
        era: "Nascido no Pré-Cambriano",
        imgCrianca: "fotos/messi.jpg",
        imgAtual: "fotos/messi-perfil.jpg",
        instagram: "messicomamor",
        desc: `Gabriel Messias, mais conhecido como Messie, é um jovem senhor de ??? anos de idade que, ao longo de sua vida, fez de Engenharia Aeroespacial à Arquitetura. Nesse meio tempo, aprendeu a não ficar bêbado com facilidade e a como evitar comandos policiais.

Conhecido por ser extremamente calmo e sereno, enquanto planeja fazer várias merdas e fala mais rápido que uma galinha tendo um infarto, ele representa, talvez, o gêmeo mais sensato. Contudo, também é o gêmeo com mais possibilidade de ir preso por agredir o gêmeo Rachid.

Hoje em dia, Messy vive talvez a fase mais calma de sua vida: tem um emprego bom, muitos amigos e quer apenas aproveitar os bons momentos, gastando seu suado dinheiro com álbuns de k-pop e "brusinhas" diversas.

Não o alimente com jurupinga.`,
        quote: `«Esse conteúdo só será desbloqueado no dia 20 ás 21:30»`
    },
    michel: {
        name: "Michel Zeine, o Mikezin ",
        era: "15 de junho de 96",
        imgCrianca: "fotos/mikekid.jpeg",
        imgAtual: "fotos/mike3.jpg",
        instagram: "michelzeine",
        desc: `Este é Michel, o gêmeo especial, engenheiro químico que (ainda) não vende drogas, profissional em inserir a arte da resenha em qualquer rolê e em falar com a mesma empolgação sobre dinossauros, Overwatch e uma Parati duas portas 1992 lindíssima (que carro!).
Reconhecido pelo riso frouxo, pelo azar em todos os jogos, por falar várias merdas e por amar demais, Michel vive o sonho de tomar os meios de produção enquanto canta para cachorros. Santista amaldiçoado por escolha (e pela ausência de amor-próprio), também é lembrado por uma característica peculiar: depois de uma dose de Canelinha, existe uma chance estatisticamente alta de começar a abraçar os amigos e chorar por algum motivo misterioso.`,
        quote: `«Esse conteúdo só será desbloqueado no dia 20 ás 21:30»`
    },
    rachid: {
        name: "Rachid",
        era: "20 de Junho de 1997",
        imgCrianca: "fotos/xidinho.jpeg", 
        imgAtual: "fotos/rachidpp.jpg",
        instagram: "po_rachid",
        desc: `Não sei muito o que falar sobre mim... Eu sou o Rachid, e acho que essa indecisão (até para pensar no que vou escrever aqui) é minha maior característica, junto com toda a aleatoriedade que me persegue, um pouco de agitação e o dom de ser atrapalhado. Já comecei uns 7 (na verdade foram mais, mas enfim, não vem ao caso) cursos diferentes e finalmente estou quase terminando um: ADS (glória)!!!! Amo fazer de tudo um pouco. No momento, como já falei, estou terminando a faculdade e também faço teatro e estágio. A coisa mais legal do mundo para mim é sair com os amigos <strong>(pena que, para a maioria, isso já não é mais prioridade, nem eu 🥲)</strong> no fim de semana e tomar uma cervejinha, preferencialmente no Bortoleto (melhor bar e melhores porções de almôndega de Itape e região). E, sinceramente, sei lá... não gosto muito de falar sobre mim. Sou bem melhor ao vivo, eu acho.



<strong>PS:</strong> O gêmeo Messi fala tudo aquilo, mas no fundo, bem lá no fundo, eu sei que sou o favorito dele kkkkkk`,
        quote: `«Esse conteúdo só será desbloqueado no dia 20 ás 21:30»`
    },
    vivi: {
        name: "Vivi",
        era: "11 de Junho de 2003",
        imgCrianca: "fotos/vivikid.jpeg",
        imgAtual: "fotos/perfil-vivi.jpg",
        instagram: "vivipaiva.m",
        desc: `Vivi é quase médica-veterinária, apaixonada por animais, plantas e música. Não sai de casa sem fone de ouvido. Tem um carinho especial pelas séries Sex and the City e Fleabag. Tenta levar a vida de forma leve, topando praticamente qualquer rolê; ama conhecer gente nova, conversar e criar memórias com quem gosta. Também ama o Léo, a Paçoca, o Zeca, a Laika, a Tula e o Caqui, e qualquer momento que tenha música boa por perto.`,
        quote: `«Esse conteúdo só será desbloqueado no dia 20 ás 21:30»`
    },
    charlinho: {
        name: "Charlinho",
        era: "30 de Maio de 2004",
        imgCrianca: "fotos/charleskid.jpeg",
        imgAtual: "fotos/charlinhohj.jpg",
        instagram: "charles_edu.jr",
        desc: `Se o vocalista do Arctic Monkeys tivesse um filho com o Sigmund Freud, esse filho seria o Charles. Profissional em ser um artista amador, de vocalist de sua infame e falida banda a ator, ele é um verdadeiro sex symbol indie da geração Z de Itapetininga (sqn).

Entre poemas e muita psicanálise de boteco, sua personalidade é um mix de humor irônico e autodepreciativo, entregando sempre cortisol alto e carisma. É o gêmeo mais novo da festa, campeão invicto de Mario Kart, palmeirense, namorado da Helen e hater do Nikolas Ferreira.`,
        quote: `«Esse conteúdo só será desbloqueado no dia 20 ás 21:30»`
    }
};

let aniversarianteAtivo = '';

function openBirthdayModal(id) {
    const aniversariante = dadosAniversariantes[id];
    if (!aniversariante) return;

    const modal = document.getElementById("birthdayModal");
    
    document.getElementById("modalTitle").innerText = aniversariante.name;
    document.getElementById("modalMeta").innerText = aniversariante.era;
    document.getElementById("modalImgCrianca").src = aniversariante.imgCrianca;
    document.getElementById("modalImgAtual").src = aniversariante.imgAtual;
    document.getElementById("modalQuote").innerText = aniversariante.quote;
    
    document.getElementById("modalDesc").innerHTML = aniversariante.desc.replace(/\n/g, '<br>');
    
    const instaLink = document.getElementById("modalInstagram");
    const instaText = document.getElementById("modalInstagramUser");
    
    if(aniversariante.instagram) {
        instaLink.href = `https://instagram.com/${aniversariante.instagram}`;
        instaText.innerText = `@${aniversariante.instagram}`;
        instaLink.style.display = "inline-flex";
    } else {
        instaLink.style.display = "none";
    }
    
    aniversarianteAtivo = id;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
}

function closeBirthdayModal() {
    const modal = document.getElementById("birthdayModal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    aniversarianteAtivo = '';
}

// ==========================================================================
// 4. MOTOR DO QUIZ: TESTE DE AFINIDADE
// ==========================================================================
const quizData = [
    {
        q: "Se você fosse escolher um desses cursos, qual seria?",
        o: [
            { text: "Arquitetura, sou bom com Lego.", target: "messi" },
            { text: "Engenharia química, quero fazer loló.", target: "michel" },
            { text: "Todos, a vida é muito curta pra fazer só um.", target: "rachid" },
            { text: "Veterinária, ❤️ bichinhos.", target: "vivi" },
            { text: "Psicologia, vou tratar minha própria depressão.", target: "charlinho" }
        ]
    },
    {
        q: "Qual dessas opções você mais se identifica quando está alcoolizado(a)?",
        o: [
            { text: "Choro muito e quero abraçar meus amigos.", target: "michel" },
            { text: "Quero um karaokê, começo a cantar e ser performático.", target: "charlinho" },
            { text: "Fico mais afetivo e rio bastante.", target: "vivi" },
            { text: "Começo a fazer exercícios, fico agitado e sem senso de perigo físico.", target: "rachid" },
            { text: "Continuo bebendo, tento marcar um rolê para São Paulo e dou carona para todo mundo.", target: "messi" }
        ]
    },
    {
        q: "Se você tivesse que escolher uma dessas bandas/artistas, qual seria?",
        o: [
            { text: "One Direction.", target: "rachid" },
            { text: "Paramore.", target: "vivi" },
            { text: "Arctic Monkeys.", target: "charlinho" },
            { text: "Blackpink.", target: "messi" },
            { text: "Dua Lipa.", target: "michel" }
        ]
    },
    {
        q: "Se você pudesse ser um animal, qual você seria?",
        o: [
            { text: "Dinossauro, RAWWWWLLL.", target: "michel" },
            { text: "Ford Ka 2007, VRUMMM.", target: "messi" },
            { text: "Pinguim, insira aqui o som que o pinguim faz.", target: "rachid" },
            { text: "Corsinha 4 portas, TRRRRR.", target: "charlinho" },
            { text: "Doguinho, AU AU.", target: "vivi" }
        ]
    },
    {
        q: "Sua sexta à noite perfeita é?",
        o: [
            { text: "Um rolê duvidoso em Osasco.", target: "messi" },
            { text: "Tomar canelinha com os amigos e ficar falando groselha.", target: "michel" },
            { text: "Cervejinha no Bortoleto com os amigos e depois comer um lanche no BK.", target: "rachid" },
            { text: "Passar junto da pessoa amada.", target: "vivi" },
            { text: "Encontrar o pessoal no rolê junto da minha pessoa amada.", target: "charlinho" }
        ]
    },
    {
        q: "Escolha um drink ou bebida?",
        o: [
            { text: "Cervejinha", target: "rachid" },
            { text: "Caipirinha", target: "vivi" },
            { text: "Jurupinga", target: "messi" },
            { text: "Canelinha", target: "michel" },
            { text: "Cuba libre", target: "charlinho" }
        ]
    }
];

let currentQuiz = 0;
const scores = { messi: 0, michel: 0, rachid: 0, vivi: 0, charlinho: 0 };

const twinNames = {
    messi: "Messi (O Gêmeo Ancião)",
    michel: "Michel (O Gêmeo Bonzinho)",
    rachid: "Rachid (O Gêmeo Árabe)",
    vivi: "Vivi (A Gêmea Legal)",
    charlinho: "Charlinho (O Gêmeo Mal)"
};

function loadQuiz() {
    const qBox = document.getElementById("quizQuestion");
    const oBox = document.getElementById("quizOptions");
    const pBar = document.getElementById("quizProgress");
    
    if(!qBox || !oBox) return;
    
    oBox.innerHTML = "";
    
    const progressPercent = (currentQuiz / quizData.length) * 100;
    pBar.style.width = `${progressPercent}%`;
    
    if(currentQuiz >= quizData.length) {
        let winner = "messi";
        let maxScore = -1;
        
        for (let twin in scores) {
            if (scores[twin] > maxScore) {
                maxScore = scores[twin];
                winner = twin;
            }
        }
        
        const fotosResultado = {
            messi: "fotos/messi-meme.jpg",
            michel: "fotos/mike-meme.jpg",
            rachid: "fotos/xide-meme.jpg",
            vivi: "fotos/viviv-meme.jpg",
            charlinho: "fotos/charlinho-meme.jpg"
        };
        const textosResultado = {
            messi: "Você é o paizão do grupo, gosta de dar carona e conselhos que funcionam para todos, menos para si.",
            michel: "Você é muito bondoso, se emociona facilmente, é bastante caseiro e ama uma resenha com a turma.",
            rachid: "Você é bastante agitado, atrapalhado e ama estar com os amigos. Coisas muito aleatórias e improváveis acontecem com frequência na sua vida.",
            vivi: "Você é tranquila, animada, gosta muito de ouvir música, assistir a séries e passar um tempo de qualidade com seus pets e as pessoas importantes na sua vida.",
            charlinho: "Você tem um lado meio rockstar misterioso, ama um microfone ou um palco, mas também se perde nos pensamentos e em como lidar com a vida."
        };
        
        document.getElementById("quizBox").innerHTML = `
            <div style="text-align:center; padding: 1rem 0;">
                <h3 style="color:var(--color-accent); font-family:var(--font-title); font-size:1.6rem; margin-bottom:1rem;">O Oráculo Decidiu!</h3>
                
                <div style="width: 150px; height: 150px; margin: 0 auto 1.5rem auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--color-accent); box-shadow: 0 0 15px rgba(200, 166, 106, 0.3);">
                    <img src="${fotosResultado[winner]}" alt="${twinNames[winner]}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>

                <p style="font-size:1.1rem; color:var(--text-secondary); line-height:1.6; margin-bottom: 1rem;">
                    De acordo com as suas respostas, o gêmeo que você mais se parece é: <br>
                    <strong style="color:#fff; font-size:1.3rem; display:block; margin-top:0.8rem; font-family:var(--font-title);">${twinNames[winner]}</strong>
                </p>
                
                <p style="font-size:0.95rem; color:var(--text-secondary); opacity:0.9; line-height:1.5; max-width:450px; margin: 0 auto 1.5rem auto; padding: 0 1rem;">
                    ${textosResultado[winner]}
                </p>
                
                <p style="font-size:0.85rem; opacity:0.6; margin-top:1.5rem;">Quizz realizado com sucesso. ;)</p>
            </div>
        `;
        return;
    }
    
    // CARREGA A PERGUNTA ATUAL (Essa parte estava faltando no seu arquivo!)
    const currentData = quizData[currentQuiz];
    qBox.innerText = currentData.q;
    
    currentData.o.forEach(option => {
        const btn = document.createElement("button");
        btn.classList.add("quiz-opt-btn");
        btn.innerText = option.text;
        btn.onclick = () => {
            scores[option.target]++;
            currentQuiz++;
            loadQuiz();
        };
        oBox.appendChild(btn);
    });
}

// ==========================================================================
// 5. EVENTOS E MAPEAMENTO DE INTERAÇÃO (SCROLL E RESIZE)
// ==========================================================================
const revealElements = document.querySelectorAll('.scroll-reveal');
function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if(elTop < triggerBottom) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    generateStars();
    setInterval(updateCountdown, 1000);
    updateCountdown();
    loadQuiz();
    checkScroll();
    initAcompanhanteLogic(); // Inicia o monitoramento do formulário
});

window.addEventListener('scroll', checkScroll);

window.addEventListener('resize', () => {
    const container = document.getElementById("starsContainer");
    if(container) {
        container.innerHTML = '<div class="time-tunnel-glow"></div>';
        generateStars();
    }
});

// ==========================================================================
// 6. LOGICA SISTÊMICA DE DINAMISMO DO ACOMPANHANTE (NOVO)
// ==========================================================================
function initAcompanhanteLogic() {
    const selectAcompanhante = document.getElementById('acompanhante-select');
    const grupoNomeAcompanhante = document.getElementById('grupo-nome-acompanhante');
    const inputNomeAcompanhante = document.getElementById('nome-acompanhante');

    if(!selectAcompanhante || !grupoNomeAcompanhante || !inputNomeAcompanhante) return;

    // Começa oculto no carregamento inicial da nave
    grupoNomeAcompanhante.style.display = 'none';

    selectAcompanhante.addEventListener('change', function() {
        if (this.value === 'sim') {
            grupoNomeAcompanhante.style.display = 'block';
            inputNomeAcompanhante.setAttribute('required', 'true');
        } else {
            grupoNomeAcompanhante.style.display = 'none';
            inputNomeAcompanhante.removeAttribute('required');
            inputNomeAcompanhante.value = ''; // Reseta se mudar de ideia
        }
    });
}
// ==========================================================================
// 7. MOTOR DINÂMICO DA ABA INDEPENDENTE DE FOTOS DA TURMA (CORRIGIDO)
// ==========================================================================
function toggleGaleriaCompleta() {
    // Seleciona todas as fotos que têm a classe oculta ou que já foram reveladas
    const fotos = document.querySelectorAll('.card-foto-turma');
    const btn = document.getElementById('btn-toggle-galeria');
    
    if (!btn) return;

    // Usamos um atributo de controle (dataset) para não depender do texto exato do botão
    const estaExpandido = btn.dataset.expanded === "true";

    if (!estaExpandido) {
        // Revela as fotos mudando a classe de oculta para revelada
        fotos.forEach(foto => {
            if (foto.classList.contains('foto-oculta')) {
                foto.classList.remove('foto-oculta');
                foto.classList.add('foto-revelada');
            }
        });
        btn.innerText = "Recolher Fotos";
        btn.dataset.expanded = "true";
    } else {
        // Recolhe as fotos voltando para o estado oculto
        // Mantém apenas as 6 primeiras visíveis (índices de 0 a 5)
        fotos.forEach((foto, index) => {
            if (index >= 6) {
                foto.classList.remove('foto-revelada');
                foto.classList.add('foto-oculta');
            }
        });
        btn.innerText = "Ver Todas as Fotos";
        btn.dataset.expanded = "false";
        
        // Voltar a tela para o topo da seção de fotos de forma suave
        const secaoFotos = document.getElementById('fotos-turma');
        if(secaoFotos) secaoFotos.scrollIntoView({ behavior: 'smooth' });
    }

    // Força o efeito de scroll se você tiver elementos com reveal ativos
    if(typeof checkScroll === 'function') {
        setTimeout(checkScroll, 50);
    }
}
// ==========================================================================
// 8. CONTROLE DO VISUALIZADOR DE FOTOS EM TELA CHEIA (LIGHTBOX)
// ==========================================================================
function abrirLightbox(elemento) {
    const lightbox = document.getElementById('lightbox-galeria');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxLegenda = document.getElementById('lightbox-legenda');
    
    // Captura a imagem interna e o texto da legenda do card clicado
    const imagemSrc = elemento.querySelector('img').src;
    const legendaTexto = elemento.querySelector('.legenda-foto') ? elemento.querySelector('.legenda-foto').innerText : "";

    if(!lightbox || !lightboxImg) return;

    // Alimenta o visualizador com os dados corretos
    lightboxImg.src = imagemSrc;
    lightboxLegenda.innerText = legendaTexto;

    // Ativa o modal na tela
    lightbox.classList.add('ativo');
    lightbox.setAttribute("aria-hidden", "false");
}

function fecharLightbox() {
    const lightbox = document.getElementById('lightbox-galeria');
    if(lightbox) {
        lightbox.classList.remove('ativo');
        lightbox.setAttribute("aria-hidden", "true");
    }
}