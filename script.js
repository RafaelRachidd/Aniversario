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
        desc: `Este é Michel, o gêmeo especial: um engenheiro químico que (ainda) não vende drogas, profissional em inserir a arte da resenha in qualquer rolê e em falar com a mesma empolgação sobre dinossauros, Overwatch e uma Parati duas portas 1992 lindíssima (que carro!).

Reconhecido pelo riso frouxo, pelo azar em todos os jogos, por falar várias merdas e por amar demais, Michel vive the sonho de tomar os meios de produção enquanto canta para cachorros. Santista amaldiçoado por escolha (e por total ausência de amor-próprio), ele também é lembrado por uma characteristic peculiar: depois de uma dose de Canelinha, existe uma chance estatisticamente alta de ele começar a abraçar os amigos e chorar por algum motivo misterioso.`,
        quote: `«Esse conteúdo só será desbloqueado no dia 20 ás 21:30»`
    },
    rachid: {
        name: "Rachid",
        era: "20 de Junho de 1997",
        imgCrianca: "fotos/kidxide.jpg", 
        imgAtual: "fotos/rachidpp.jpg",
        instagram: "po_rachid",
        desc: `Tirando fotos de perfil do lado esquerdo do rosto desde 97, esse é o Gêmeo Rachid. Ele é o gêmeo favorito do Messie (mas ele não admite), o cara que mais ganha carona e o parceiro oficial nos rolês mais duvidosos (Messie não pode negar). Para fechar, também é primo oficial do gêmeo Charlinho.

Depois de largar mais de 7 cursos por culpa da indecisão e de uma pandemia, atualmente está em ADS e quase se formando (ainda bem). Fora isso, é bicampeão da Copa Cirrose, ama seus doguinhos e não troca por nada uma cerveja com os amigos. Aliás, quando bebe, ele ganha habilidades similares às do Homem-Aranha, como escalar telhados, dar cambalhotas e fazer exercícios físicos do nada; se ver ele assim, não dê corda (é perigoso).

Nas horas vagas faz teatro e escreve poesia para sofrer por amores que nunca deram e nem darão certo. Atrapalhado e agitado igual ao esquilo do Deu a Louca na Chapeuzinho, ele tem o dom de falar antes de pensar, criando situações cômicas e muitas vezes vergonhosas.`,
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
            messi: "Você é o ancião do grupo. Prefere a calmaria (ou finge que prefere), planeja mil coisas ao mesmo tempo a 200km/h e tem uma paciência milenar que pode sumir se te derem jurupinga.",
            michel: "Você é o resenheiro oficial! Tem o riso frouxo, ama uma nostalgia (e carros antigos), mas cuidado: uma dose de canelinha e você já está abraçando os amigos e chorando do nada.",
            rachid: "Você é o mestre em testar a paciência alheia com um sorriso sereno no rosto. Vive entre o caos completo e a paz absoluta, e tem o superpoder de sair ileso de qualquer encrenca.",
            vivi: "Você é uma relíquia viva dos anos 2000! Não sai de casa sem fone de ouvido, adora criar memórias com gente nova e mantém a pose de alta costura mesmo no meio do hospício.",
            charlinho: "Você é o intelectual indie do rolê. Mistura humor irônico, autodepreciativo e muita psicanálise de boteco. Tem o cortisol alto, mas compensa com muito carisma."
        };
        
        document.getElementById("quizBox").innerHTML = `
            <div style="text-align:center; padding: 1rem 0;">
                <h3 style="color:var(--color-accent); font-family:var(--font-title); font-size:1.6rem; margin-bottom:1rem;">O Oráculo Decidiu!</h3>
                
                <div style="width: 150px; height: 150px; margin: 0 auto 1.5rem auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--color-accent); box-shadow: 0 0 15px rgba(200, 166, 106, 0.3);">
                    <img src="${fotosResultado[winner]}" alt="${twinNames[winner]}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>

                <p style="font-size:1.1rem; color:var(--text-secondary); line-height:1.6; margin-bottom: 1rem;">
                    De acordo com as tuas escolhas através das fendas cósmicas, tu es mais parecido com: <br>
                    <strong style="color:#fff; font-size:1.3rem; display:block; margin-top:0.8rem; font-family:var(--font-title);">${twinNames[winner]}</strong>
                </p>
                
                <p style="font-size:0.95rem; color:var(--text-secondary); opacity:0.9; line-height:1.5; max-width:450px; margin: 0 auto 1.5rem auto; padding: 0 1rem;">
                    ${textosResultado[winner]}
                </p>
                
                <p style="font-size:0.85rem; opacity:0.6; margin-top:1.5rem;">Sincronização cósmica concluída com sucesso. 🌌</p>
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