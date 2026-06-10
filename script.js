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
        imgCrianca: "fotos/messikid.jpeg",
        imgAtual: "fotos/messi-perfil.jpg",
        instagram: "messicomamor",
        desc: `Gabriel Messias, mais conhecido como Messie, é um jovem senhor de 180 anos de idade que, ao longo de sua vida, fez de Engenharia Aeroespacial à Arquitetura. Nesse meio tempo, aprendeu a não ficar bêbado com facilidade e a como evitar comandos policiais.

Conhecido por ser extremamente calmo e sereno, enquanto planeja fazer várias merdas e fala mais rápido que uma galinha tendo um infarto, ele representa, talvez, o gêmeo mais sensato. Contudo, também é o gêmeo com mais possibilidade de ir preso por agredir o gêmeo Rachid.

Hoje em dia, Messy vive talvez a fase mais calma de sua vida: tem um emprego bom, muitos amigos e quer apenas aproveitar os bons momentos, gastando seu suado dinheiro com álbuns de k-pop e "brusinhas" diversas.

Não o alimente com jurupinga.`,
        quote: `«O Messi é a única pessoa que consegue planejar um voo espacial e uma besteira colossal na mesma frase, tudo isso a 200km/h!» — O Grupo.`
    },
    michel: {
        name: "Michel Zeine, o Mikezin ",
        era: "Galera de 96",
        imgCrianca: "fotos/mikekid.jpeg",
        imgAtual: "fotos/mike3.jpg",
        instagram: "michelzeine",
        desc: `Este é Michel, o gêmeo especial: um engenheiro químico que (ainda) não vende drogas, profissional em inserir a arte da resenha in qualquer rolê e em falar com a mesma empolgação sobre dinossauros, Overwatch e uma Parati duas portas 1992 lindíssima (que carro!).

Reconhecido pelo riso frouxo, pelo azar em todos os jogos, por falar várias merdas e por amar demais, Michel vive o sonho de tomar os meios de produção enquanto canta para cachorros. Santista amaldiçoado por escolha (e por total ausência de amor-próprio), ele também é lembrado por uma characteristic peculiar: depois de uma dose de Canelinha, existe uma chance estatisticamente alta de ele começar a abraçar os amigos e chorar por algum motivo misterioso.`,
        quote: `«Se não fosse o Michel para olhar os nossos planos e dizer "isso vai dar errado", metade de nós não estaria aqui hoje.»`
    },
    rachid: {
        name: "Rachid",
        era: "Classe de 1997",
        imgCrianca: "fotos/rachidkid.jpeg", // Ajustado para seguir o padrão se houver foto dele criança
        imgAtual: "fotos/perfil-rachid.jpg",
        instagram: "po_rachid",
        desc: `O alvo preferido das ameaças de agressão do Messi e o mestre em testar a paciência alheia com uma serenidade invejável.

Rachid transita entre o caos completo e a paz absoluta, sendo o estopim de discussões bizarras. Se sobreviver até o final da festa sem levar um tabefe do Messie, consideraremos um milagre cósmico.`,
        quote: `«Rachid tem o superpoder de quase apanhar do Messi e continuar sorrindo como se estivesse num comercial de champô.»`
    },
    vivi: {
        name: "Vivi",
        era: "Classe de 2003",
        imgCrianca: "fotos/vivikid.jpeg",
        imgAtual: "fotos/perfil-vivi.jpg",
        instagram: "vivipaiva.m",
        desc: `Vivi é quase médica-veterinária, apaixonada por animais, plantas e música. Não sai de casa sem fone de ouvido. Tem um carinho especial pelas séries Sex and the City e Fleabag. Tenta levar a vida de forma leve, topando praticamente qualquer rolê; ama conhecer gente nova, conversar e criar memórias com quem gosta. Também ama o Léo, a Paçoca e qualquer momento que tenha música boa por perto.`,
        quote: `«A Vivi gasta em mimos o que o Messi gasta em k-pop, mas faz tudo isso mantendo a pose de alta costura no meio do hospício.»`
    },
    charlinho: {
        name: "Charlinho",
        era: "Classe de 2004",
        imgCrianca: "fotos/charleskid.jpeg",
        imgAtual: "fotos/perfil-charlinho.jpg",
        instagram: "charles_edu.jr",
        desc: `Se o vocalista do Arctic Monkeys tivesse um filho com o Sigmund Freud, esse filho seria o Charles. Profissional em ser um artista amador, de vocalist de sua infame e falida banda a ator, ele é um verdadeiro sex symbol indie da geração Z de Itapetininga (sqn).

Entre poemas e muita psicanálise de boteco, sua personalidade é um mix de humor irônico e autodepreciativo, entregando sempre cortisol alto e carisma. É o gêmeo mais novo da festa, campeão invicto de Mario Kart, palmeirense, namorado da Helen e hater do Nikolas Ferreira.`,
        quote: `«O Charlinho vive em 2050, pena que a paciência dele ficou guardada lá in 2004 junto com o nascimento.»`
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
    
    // ATIVA O RASTREIO DO ANIVERSARIANTE ATIVO
    aniversarianteAtivo = id;

    // CÓDIGO DO MURAL DE COMENTÁRIOS (CUSDIS) - RECONFIGURADO SEM ERROS
    const btnCusdis = document.getElementById("btn-comentarios-cusdis");
    if (btnCusdis) {
        const APP_ID_CUSDIS = "ea5366aa-a4fd-4604-b2b6-871d5c3f4cc6"; 
        
        // Configura o link dinâmico para abrir o mural exclusivo deste aniversariante
        btnCusdis.href = `https://cusdis.com/doc/api/comment/widget?appId=${APP_ID_CUSDIS}&pageId=${id}&pageTitle=${encodeURIComponent(aniversariante.name)}`;
    }

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
        q: "Qual é o seu rolê ou comportamento ideal numa sexta-feira à noite?",
        o: [
            { text: "Reclamar que no meu tempo tudo isso aqui era mato e lava pura.", target: "messi" },
            { text: "Ficar em casa limpando a coleção de disquetes e tazos antigos.", target: "michel" },
            { text: "Analisar as bilheterias de cinema e cuidar do bichinho virtual.", target: "rachid" },
            { text: "Ficar horas escolhendo o subfon perfeito e o status ideal no MSN.", target: "vivi" },
            { text: "Rolar o feed em alta velocidade gravando vídeos e consumindo memes.", target: "charlinho" }
        ]
    },
    {
        q: "Se você pudesse viajar no tempo para uma fenda temporal, qual escolheria?",
        o: [
            { text: "Voltar para o Pré-Cambriano para ajudar a resfriar o magma terrestre.", target: "messi" },
            { text: "Voltar para 1996 e testemunhar de perto a clonagem da ovelha Dolly.", target: "michel" },
            { text: "Entrar a bordo do Titanic sabendo exatamente onde fica o iceberg.", target: "rachid" },
            { text: "Ficar preso eternamente no ano de 2003 usando a versão clássica do Orkut.", target: "vivi" },
            { text: "Viajar para 2004 para criar o Facebook direto do meu quarto de faculdade.", target: "charlinho" }
        ]
    },
    {
        q: "Escolha uma habilidade tecnológica ou analógica indispensável para você:",
        o: [
            { text: "Conversar fluentemente com bactérias anaeróbicas e fósseis.", target: "messi" },
            { text: "Consertar computadores antigos soprando cartuchos de jogos.", target: "michel" },
            { text: "Manter 3 Tamagotchis vivos ao mesmo tempo com responsabilidade.", target: "rachid" },
            { text: "Digitar a 150 palavras por minuto mandando 'Chamar Atenção' no chat.", target: "vivi" },
            { text: "Capturar fotos esteticamente incríveis usando as primeiras câmeras de flip.", target: "charlinho" }
        ]
    },
    {
        q: "Qual é a sua reação imediata quando um aparelho tecnológico falha ou perde o sinal?",
        o: [
            { text: "Digo que na Idade da Pedra as pedras lascadas nunca falhavam.", target: "messi" },
            { text: "Abro o menu de configurações para diagnosticar o hardware manualmente.", target: "michel" },
            { text: "Fico nostálgico lembrando do som clássico e charmoso da internet discada.", target: "rachid" },
            { text: "Acho que é o Bug do Milênio que finalmente veio cobrar a sua conta atrasada.", target: "vivi" },
            { text: "Procuro imediatamente outra rede de alta velocidade para reconectar.", target: "charlinho" }
        ]
    },
    {
        q: "Escolha um artefato do passado que define perfeitamente a sua essência energética:",
        o: [
            { text: "Uma rocha magmática intacta extraída do fundo da crosta terrestre.", target: "messi" },
            { text: "Um disquete de 1.44MB contendo arquivos misteriosos salvos.", target: "michel" },
            { text: "Uma fita VHS original rebobinada perfeitamente com uma caneta.", target: "rachid" },
            { text: "Um caderno cheio de depoimentos em formato de 'scraps' e correntes.", target: "vivi" },
            { text: "O primeiríssimo modelo de smartphone com tela touch do mercado.", target: "charlinho" }
        ]
    },
    {
        q: "Na pista de dance da festa estelar, onde você provavelmente será encontrado?",
        o: [
            { text: "Sentado num canto dizendo que a música antiga era muito melhor.", target: "messi" },
            { text: "Avaliando a qualidade dos alto-falantes e a fiação da iluminação.", target: "michel" },
            { text: "Dançando de forma performática os maiores hits que marcaram o fim de século.", target: "rachid" },
            { text: "Tirando fotos conceituais com poses clássicas para postar no feed.", target: "vivi" },
            { text: "Transmitindo a festa inteira por projeção digital em tempo real.", target: "charlinho" }
        ]
    }
];

let currentQuiz = 0;
const scores = { messi: 0, michel: 0, rachid: 0, vivi: 0, charlinho: 0 };

const twinNames = {
    messi: "Messi (O Gêmeo Ancião)",
    michel: "Michel (O Gêmeo Bonzinho)",
    rachid: "Rachid (O Gêmeo Árabe)",
    vivi: "Vivi (A Relíquia dos Anos 2000)",
    charlinho: "Charlinho (O Gêmeo Indie)"
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
        
        document.getElementById("quizBox").innerHTML = `
            <div style="text-align:center; padding: 1rem 0;">
                <h3 style="color:var(--color-accent); font-family:var(--font-title); font-size:1.6rem; margin-bottom:1rem;">O Oráculo Decidiu!</h3>
                <p style="font-size:1.1rem; color:var(--text-secondary); line-height:1.6;">
                    De acordo com as tuas escolhas através das fendas cósmicas, tu és mais parecido com: <br>
                    <strong style="color:#fff; font-size:1.3rem; display:block; margin-top:0.8rem; font-family:var(--font-title);">${twinNames[winner]}</strong>
                </p>
                <p style="font-size:0.85rem; opacity:0.6; margin-top:1.5rem;">Sincronização cósmica concluída com sucesso. 🌌</p>
            </div>
        `;
        return;
    }
    
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
});

window.addEventListener('scroll', checkScroll);

window.addEventListener('resize', () => {
    const container = document.getElementById("starsContainer");
    if(container) {
        container.innerHTML = '<div class="time-tunnel-glow"></div>';
        generateStars();
    }
});