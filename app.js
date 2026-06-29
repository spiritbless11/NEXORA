/**
 * NEXORA LABS - HIGH-TECH ENTERPRISE PORTFOLIO CORE ENGINE
 * Version: 5.0.0 (Obsidian Glass & Holographic Edition)
 * Author: Lord Prime Nexus Dev (Blessing Lusakumunu)
 * Tech Stack: React JS, Tailwind CSS, Firebase SDK
 * 
 * DESCRIPTION:
 * Ce script régit l'intégralité de la logique et des composants de Nexora Labs.
 * Conçu avec une approche Figma-grade, il intègre :
 * - Un curseur suiveur avec amorti fluide pour le confort visuel sur ordinateur.
 * - Une barre de défilement de progression en haut de page.
 * - Une navigation adaptative (pillule flottante en haut sur ordinateur, barre flottante en bas sur mobile).
 * - Une section Hero avec un cube 3D holographique, des compteurs animés et un émulateur de terminal macOS.
 * - Un système d'orbites technologiques animées en CSS/React.
 * - Un configurateur de devis dynamique connecté à Firestore et WhatsApp.
 * - Un formulaire de contact sécurisé avec validation et insertion dans Firestore.
 */

const { useState, useEffect, useRef } = React;

// ==========================================================================
// DATA DICTIONARIES (SATURATED WITH SPECIFIC TECHNOLOGY LOGS)
// ==========================================================================

/**
 * 6 Main Technology Services
 */
const SERVICES_CATALOG = [
    {
        id: "web-dev",
        title: "Développement Web Enterprise",
        icon: "fa-solid fa-laptop-code",
        desc: "Conception de plateformes SaaS scalables, de portails e-commerce haute performance et d'architectures Web headless (Next.js/React). Nous garantissons des temps de chargement records et des infrastructures cloud optimisées pour la montée en charge.",
        tags: ["React.js", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
        targets: "Fintech, E-Commerce international, EdTech, plateformes B2B.",
        deliverables: [
            "Code source modulaire commenté sous GitLab/GitHub",
            "Configuration CI/CD de déploiement automatisé (Vercel/AWS)",
            "Optimisation complète SEO et Core Web Vitals (Scores Lighthouse > 90)",
            "Documentation technique d'intégration d'API Swagger"
        ]
    },
    {
        id: "mobile-dev",
        title: "Applications Mobiles Cross-Platform",
        icon: "fa-solid fa-mobile-screen-button",
        desc: "Développement d'applications mobiles iOS et Android natives à partir d'un codebase unique. Nous créons des parcours utilisateurs immersifs, ergonomiques, avec une gestion avancée du stockage local offline-first.",
        tags: ["Flutter", "React Native", "Redux", "SQLite", "Firebase Core"],
        targets: "Services de livraison, applications médicales, outils logistiques de terrain.",
        deliverables: [
            "Fichiers binaires APK (Android) et IPA (iOS) signés pour production",
            "Mise en ligne sur App Store Connect et Google Play Console",
            "Système d'alertes par notifications push programmables",
            "Tableau de bord d'administration web d'administration"
        ]
    },
    {
        id: "ai-systems",
        title: "Intelligence Artificielle & LLM",
        icon: "fa-solid fa-brain",
        desc: "Intégration d'agents conversationnels intelligents et de pipelines RAG sécurisés basés sur GPT-4. Nous structurons vos bases de connaissances privées d'entreprise sous forme de bases de données vectorielles pour automatiser vos tâches complexes.",
        tags: ["OpenAI API", "LangChain", "FastAPI", "Pinecone", "Python"],
        targets: "Support client automatisé, traitement de documents, outils décisionnels complexes.",
        deliverables: [
            "API d'interfaçage avec les grands modèles de langage",
            "Base de connaissances vectorisée avec système de mise à jour sémantique",
            "Interface d'administration pour la modération et l'historisation des requêtes",
            "Pipeline d'entraînement et d'ajustement (Fine-tuning) des modèles"
        ]
    },
    {
        id: "cyber-security",
        title: "Cybersécurité & Renseignements OSINT",
        icon: "fa-solid fa-shield-halved",
        desc: "Audits de sécurité complets, tests d'intrusion externes/internes et enquêtes de sources ouvertes (OSINT). Nous identifions les failles de sécurité applicatives et système avant qu'elles ne soient exploitées par des acteurs malveillants.",
        tags: ["Pentesting APIs", "OWASP Standards", "Audit de code source", "Renseignements OSINT", "WAF Configuration"],
        targets: "Fintech, institutions bancaires, plateformes médicales stockant des données sensibles.",
        deliverables: [
            "Rapport technique détaillé classant les failles détectées par niveau de criticité",
            "Plan de remédiation complet avec correctifs de code source applicatif",
            "Contre-audit après corrections pour validation finale de la conformité",
            "Certificat de sécurité Nexora Labs valide pour une durée de 12 mois"
        ]
    },
    {
        id: "cloud-devops",
        title: "Cloud Native & DevOps Engineering",
        icon: "fa-solid fa-server",
        desc: "Automatisation de vos déploiements de serveurs (CI/CD) et surveillance active des charges d'infrastructures. Nous orchestrons vos microservices à l'aide de Kubernetes et provisionnons vos ressources serveurs par code avec Terraform.",
        tags: ["AWS Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
        targets: "Équipes techniques de développement, migrations d'infrastructures physiques vers le Cloud.",
        deliverables: [
            "Scripts d'Infrastructure as Code (IaC) versionnés et testés",
            "Pipelines de déploiement automatique chiffrés et configurés",
            "Système d'alertes instantanées en cas de surcharge matérielle",
            "Dashboard de supervision temps réel Prometheus/Grafana"
        ]
    },
    {
        id: "backend-apis",
        title: "APIs Robustes & Modélisation de Données",
        icon: "fa-solid fa-database",
        desc: "Conception de fondations backend sécurisées pour alimenter vos applications web, mobiles et objets connectés. Nos schémas de bases de données sont optimisés pour les requêtes volumineuses et intègrent des mécanismes de mise en cache distribuée.",
        tags: ["PostgreSQL", "MongoDB", "GraphQL", "Redis Cache", "OAuth2 / JWT"],
        targets: "Architectures distribuées, synchronisation multi-terminaux, passerelles de paiement.",
        deliverables: [
            "Documentation interactive des endpoints d'API (Swagger / Postman)",
            "Mécanismes de mise en cache distribuée Redis intégrés",
            "Scripts de migration automatisée et de sauvegarde quotidienne de données",
            "Module d'authentification chiffrée avec double facteur"
        ]
    }
];

/**
 * 6 Real-World Portfolio Case Studies
 */
const PORTFOLIO_REALISATIONS = [
    {
        id: "port-ecommerce",
        title: "Plateforme E-Commerce Enterprise",
        category: "web",
        icon: "fa-solid fa-cart-shopping",
        shortDesc: "Infrastructure e-commerce headless optimisée pour les débits mobiles instables et connectée aux paiements mobiles.",
        problem: "Une chaîne de grande distribution souhaitait commercialiser ses produits en Afrique centrale. Les CMS classiques (Shopify, Magento) n'intégraient pas nativement les solutions de paiement Mobile Money local (M-Pesa, Orange Money) et étaient trop lourds pour les réseaux 3G.",
        solution: "Nous avons construit une application Next.js ultra-légère communiquant avec un backend Node.js en microservices. Les appels réseaux ont été réduits au minimum et nous avons développé une passerelle sur-mesure d'intégration avec les APIs de Mobile Money locaux.",
        metrics: "Taux de conversion augmenté de 42%, temps de chargement moyen réduit à 1.1s, plus de 50 000 transactions traitées sans incident.",
        stack: ["Next.js", "Node.js", "PostgreSQL", "Mobile Money APIs Gateway", "Redis Cache"]
    },
    {
        id: "port-analytics",
        title: "Dashboard Analytics IA",
        category: "ia",
        icon: "fa-solid fa-chart-line",
        shortDesc: "Outil d'analyse prédictive des stocks intégrant des modèles d'apprentissage automatique supervisé.",
        problem: "Un importateur de marchandises subissait d'importantes pertes financières en raison de surstocks chroniques et de ruptures de chaînes logistiques mal planifiées.",
        solution: "Déploiement d'un modèle TensorFlow analysant l'historique des ventes saisonnières sur 5 ans pour projeter automatiquement les volumes de commandes optimaux à 30 jours.",
        metrics: "Diminution du niveau de surstock de 25%, temps d'édition des bons de commandes automatisé à 95%, précision des prédictions de 93.8%.",
        stack: ["Python", "TensorFlow", "FastAPI", "Docker", "React"]
    },
    {
        id: "port-chatbot",
        title: "Chatbot Intelligent GPT-4",
        category: "ia",
        icon: "fa-solid fa-comments",
        shortDesc: "Agent de support client connecté à une base documentaire privée par indexation vectorielle.",
        problem: "Un assureur souhaitait décharger son support téléphonique des 1500 questions quotidiennes basiques sur les contrats d'assurance.",
        solution: "Mise en place d'un système RAG (Retrieval-Augmented Generation) indexant les conditions générales d'assurance de l'assureur pour répondre de manière ultra-précise aux clients.",
        metrics: "Temps d'attente client ramené à 0s, 72% des questions courantes résolues automatiquement par l'IA, conformité RGPD validée.",
        stack: ["LangChain", "OpenAI GPT-4", "Pinecone Vector DB", "Node.js"]
    },
    {
        id: "port-health",
        title: "Plateforme Santé HIPAA Compliant",
        category: "mobile",
        icon: "fa-solid fa-hospital",
        shortDesc: "Application de télémédecine chiffrée de bout en bout conforme aux normes médicales les plus strictes.",
        problem: "Mise en relation de patients isolés avec des médecins spécialistes avec partage de dossiers médicaux hautement sensibles nécessitant un chiffrement absolu.",
        solution: "Développement d'une application Flutter avec stockage local sécurisé en AES-256 et transmissions réseaux chiffrées de bout en bout via SSL Pinning.",
        metrics: "12 000 téléconsultations menées avec succès, conformité HIPAA totale validée par audit de sécurité externe.",
        stack: ["Flutter", "Express.js", "MongoDB", "HDS Cloud Hosting", "AES-256 Encryption"]
    },
    {
        id: "port-lms",
        title: "LMS Éducatif Interactif",
        category: "web",
        icon: "fa-solid fa-graduation-cap",
        shortDesc: "Portail d'apprentissage pour collaborateurs d'entreprise avec gestion automatique du débit vidéo.",
        problem: "Une entreprise panafricaine devait former ses 3 000 employés répartis sur des zones géographiques aux débits internet très contrastés.",
        solution: "Mise en œuvre d'une plateforme de formation intégrant de l'encodage vidéo adaptatif dynamique qui ajuste la qualité du flux en fonction de la bande passante locale.",
        metrics: "Taux de complétion des modules de formation en hausse de 60%, bande passante serveur consommée réduite de 45%.",
        stack: ["React.js", "AWS Elemental MediaConvert", "Express.js Backend", "MongoDB"]
    },
    {
        id: "port-cybersec",
        title: "Solution Cybersécurité Enterprise",
        category: "security",
        icon: "fa-solid fa-user-shield",
        shortDesc: "Moteur de détection active des requêtes intrusives et blocage automatique en temps réel.",
        problem: "Une entreprise financière faisait l'objet de tentatives répétées d'injections SQL et de scans de ports malveillants sur ses serveurs d'API.",
        solution: "Déploiement d'un agent de filtrage réseau analysant en direct les logs systèmes et coupant automatiquement les connexions issues d'adresses IP suspectes.",
        metrics: "Plus de 1.8 million de requêtes malveillantes bloquées automatiquement, zéro incident de sécurité déploré sur l'année.",
        stack: ["Python security scripts", "FastAPI Admin Console", "Linux OS Security Rules"]
    }
];

/**
 * Agile Development Process Steps
 */
const PROCESS_STEPS = [
    {
        step: "01",
        title: "Cadrage Technique & CDC",
        desc: "Analyse approfondie de votre projet d'affaires, rédaction des spécifications d'architectures et modélisation initiale des schémas de bases de données."
    },
    {
        step: "02",
        title: "Conception & Architecture",
        desc: "Définition de l'infrastructure d'hébergement cible (AWS/GCP), configuration des conteneurs Docker et maquettage de l'interface utilisateur responsive."
    },
    {
        step: "03",
        title: "Sprints de Codage Agile",
        desc: "Développement itératif (méthodologie Scrum) avec livraisons hebdomadaires de modules applicatifs fonctionnels sur notre environnement de test."
    },
    {
        step: "04",
        title: "Assurance Qualité & Pentests",
        desc: "Audits de code source automatisés (ESLint/SonarQube) et tests d'intrusion réels pour s'assurer de l'absence totale de failles de sécurité."
    },
    {
        step: "05",
        title: "Déploiement & SLA Support",
        desc: "Mise en ligne en production sans coupure de service, transfert de compétences de vos administrateurs et surveillance continue de vos charges serveurs."
    }
];

/**
 * 6 FAQ items
 */
const FAQ_CATALOG = [
    {
        q: "Quels sont les délais moyens de réalisation pour une application Web ?",
        a: "Pour un portail Web ou un site vitrine haut de gamme, comptez 2 à 3 semaines de développement. Pour des plateformes d'envergure plus complexes (SaaS, E-Commerce, intégrations d'IA), le calendrier s'étend de 4 à 8 semaines."
    },
    {
        q: "Comment garantissez-vous la sécurité des données utilisateurs ?",
        a: "Nous suivons rigoureusement les normes OWASP les plus strictes. Toutes les transmissions de données sont chiffrées, nous appliquons un salage robuste des mots de passe en base de données et nous menons des audits de code de sécurité réguliers."
    },
    {
        q: "Est-il possible de connecter nos logiciels existants à vos créations ?",
        a: "Oui. Nous concevons toutes nos architectures sous forme d'APIs ouvertes et documentées (Swagger / Postman), ce qui permet d'interconnecter nos systèmes avec n'importe quel ERP, CRM ou base de données historique de votre entreprise."
    },
    {
        q: "Assurez-vous la maintenance applicative post-déploiement ?",
        a: "Absolument. Nous proposons des contrats de Tiercé Maintenance Applicative (TMA) comprenant la surveillance active des serveurs 24/7, la correction des bugs éventuels, les mises à jour de sécurité et la réalisation de sauvegardes quotidiennes."
    },
    {
        q: "Vos applications fonctionnent-elles dans des zones à faible connexion ?",
        a: "Oui, c'est l'un de nos points forts. Nous optimisons le poids des images, compressons le code applicatif et implémentons des stratégies de stockage local de données en local (offline-first) pour assurer un rendu fonctionnel optimal même sous un réseau 3G instable."
    },
    {
        q: "Quelles sont les modalités de facturation de Nexora Labs ?",
        a: "Les projets font l'objet d'un découpage en jalons facturables. Typiquement : un acompte initial de 30% au démarrage, 40% lors de la livraison de la version de test intermédiaire, et 30% restants au moment du déploiement en production."
    }
];

// ==========================================================================
// COMPONENT DECLARATIONS
// ==========================================================================

/**
 * Custom Cursor Follower Component
 */
function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [follower, setFollower] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        let frameId;
        const updateFollower = () => {
            setFollower(prev => {
                const dx = position.x - prev.x;
                const dy = position.y - prev.y;
                return {
                    x: prev.x + dx * 0.15,
                    y: prev.y + dy * 0.15
                };
            });
            frameId = requestAnimationFrame(updateFollower);
        };
        frameId = requestAnimationFrame(updateFollower);
        return () => cancelAnimationFrame(frameId);
    }, [position]);

    return (
        <React.Fragment>
            <div 
                className="custom-cursor-follower hidden lg:block" 
                style={{ left: `${follower.x}px`, top: `${follower.y}px` }}
            ></div>
            <div 
                className="custom-cursor-dot hidden lg:block" 
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            ></div>
        </React.Fragment>
    );
}

/**
 * Interactive Terminal Emulator Component
 */
function TerminalEmulator() {
    const [history, setHistory] = useState([
        { cmd: '', output: 'Nexora Labs [Version 5.0.0]\n(c) 2026 Nexora Labs. Tous droits réservés.\nTapez "help" pour voir la liste des commandes disponibles.' }
    ]);
    const [input, setInput] = useState('');
    const terminalEndRef = useRef(null);

    const handleCommand = (e) => {
        e.preventDefault();
        const trimmed = input.trim().toLowerCase();
        if (!trimmed) return;

        let output = '';
        switch(trimmed) {
            case 'help':
                output = 'Commandes disponibles :\n  help       - Affiche cette aide\n  services   - Liste nos expertises techniques\n  portfolio  - Liste les projets récents\n  about      - Infos sur le fondateur\n  contact    - Coordonnées de contact\n  clear      - Efface l\'écran';
                break;
            case 'services':
                output = 'Nos services :\n  - Développement Web Enterprise (Next.js/React)\n  - Applications Mobiles Cross-Platform (Flutter)\n  - Intelligence Artificielle & LLMs (LangChain)\n  - Cybersécurité & Audits de Code (OWASP)';
                break;
            case 'portfolio':
                output = 'Projets récents :\n  - Plateforme E-Commerce Enterprise (99.4% succès)\n  - Dashboard Analytics IA (TensorFlow stocks)\n  - Chatbot Intelligent GPT-4 (RAG Vector DB)';
                break;
            case 'about':
                output = 'Blessing Lusakumunu (Lord Prime Nexus Dev)\nFondateur de Nexora Labs. Architecte logiciel senior,\nspécialiste en IA et cybersécurité offensive.\nPhilosophie : "Le code propre et la sécurité ne sont pas des options."';
                break;
            case 'contact':
                output = 'Nexora Labs RDC\nEmail  : nexoralabss@gmail.com\nTel/WA : +243 994 159 220\nFormulaire en bas de page.';
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            default:
                output = `Commande non reconnue : "${trimmed}". Tapez "help" pour voir les commandes disponibles.`;
        }

        setHistory([...history, { cmd: input, output }]);
        setInput('');
    };

    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    return (
        <div className="w-full max-w-[440px] bg-slate-950/85 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md font-mono text-[11px] text-slate-300">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3 mb-4">
                <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                </div>
                <span className="text-[9px] text-slate-500 font-bold">nexora-terminal.sh</span>
            </div>
            
            <div className="h-[150px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                {history.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                        {item.cmd && (
                            <div className="flex items-center gap-1.5 text-cyan-400">
                                <span>guest@nexora:~$</span>
                                <span>{item.cmd}</span>
                            </div>
                        )}
                        <pre className="whitespace-pre-wrap font-mono text-slate-450">{item.output}</pre>
                    </div>
                ))}
                <div ref={terminalEndRef}></div>
            </div>

            <form onSubmit={handleCommand} className="flex items-center gap-1.5 border-t border-slate-850 pt-3 mt-3">
                <span className="text-cyan-400 font-bold">guest@nexora:~$</span>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow bg-transparent text-slate-200 outline-none font-mono"
                    autoComplete="off"
                    placeholder="..."
                />
            </form>
        </div>
    );
}

/**
 * Animated Counting Statistics Number Component
 */
function AnimatedCounter({ target, duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target);
        if (start === end) return;

        const totalSteps = 60;
        const stepTime = Math.abs(Math.floor(duration / totalSteps));
        const increment = end / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count}</span>;
}

/**
 * Fixed Sticky Header Navigation Component
 */
function Header({ scrolled, activeSection }) {
    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#accueil" className="logo">
                    <div className="logo-icon">N</div>
                    NEXORA LABS
                </a>

                {/* Desktop Nav menu */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-6 list-none">
                        <li>
                            <a href="#accueil" className={`nav-item ${activeSection === 'accueil' ? 'active' : ''}`}>
                                Accueil
                            </a>
                        </li>
                        <li>
                            <a href="#apropos" className={`nav-item ${activeSection === 'apropos' ? 'active' : ''}`}>
                                À Propos
                            </a>
                        </li>
                        <li>
                            <a href="#services" className={`nav-item ${activeSection === 'services' ? 'active' : ''}`}>
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#competences" className={`nav-item ${activeSection === 'competences' ? 'active' : ''}`}>
                                Expertise
                            </a>
                        </li>
                        <li>
                            <a href="#portfolio" className={`nav-item ${activeSection === 'portfolio' ? 'active' : ''}`}>
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#process" className={`nav-item ${activeSection === 'process' ? 'active' : ''}`}>
                                Process
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="hidden lg:block">
                    <a href="#contact" className="nav-cta">
                        <i className="fa-solid fa-rocket"></i> Démarrer un Projet
                    </a>
                </div>
            </div>
        </header>
    );
}

/**
 * Hero Section Component
 */
function Hero() {
    return (
        <section id="accueil" className="hero-wrapper">
            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                    <div className="badge-pulsing">
                        Disponible pour nouveaux projets
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-5 tracking-tight">
                        Transformons Vos <span className="text-gradient-cyan-blue block lg:inline">Idées Digitales</span>
                        <span className="block mt-2">en Réalité Exceptionnelle</span>
                    </h1>
                    <p className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider">
                        Solutions digitales innovantes par Blessing Lusakumunu (Lord Prime Nexus Dev)
                    </p>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                        Nexora Labs conçoit et développe des solutions web, mobiles, IA et cybersécurité sur mesure pour propulser votre entreprise dans l'ère numérique avec excellence et innovation. Nous combinons expertise technique de pointe et vision stratégique.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <a href="#contact" className="btn btn-primary-coral text-white font-bold px-8 py-3.5 rounded-full text-xs flex items-center gap-2">
                            <i className="fa-solid fa-rocket"></i> Démarrer un Projet
                        </a>
                        <a href="#portfolio" className="btn btn-secondary-glass text-white font-bold px-8 py-3.5 rounded-full text-xs flex items-center gap-2">
                            <i className="fa-solid fa-eye"></i> Voir nos Réalisations
                        </a>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-12">
                        <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                            <div className="text-2xl md:text-3xl font-black text-white">
                                <AnimatedCounter target="50" />+
                            </div>
                            <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-1">Projets Livrés</div>
                        </div>
                        <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                            <div className="text-2xl md:text-3xl font-black text-white">
                                <AnimatedCounter target="30" />+
                            </div>
                            <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-1">Clients Globaux</div>
                        </div>
                        <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                            <div className="text-2xl md:text-3xl font-black text-white">
                                <AnimatedCounter target="5" />+
                            </div>
                            <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-1">Années d'Expérience</div>
                        </div>
                    </div>
                </div>

                {/* Visual Section: rotating 3D cube + terminal */}
                <div className="flex flex-col gap-8 items-center">
                    <div className="cube-visual-container w-full max-w-[360px]">
                        <div className="cube-wrapper">
                            <div className="cube">
                                <div className="cube-face cube-face-front">
                                    <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop" alt="Web Dev" />
                                </div>
                                <div className="cube-face cube-face-back">
                                    <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop" alt="Mobile App" />
                                </div>
                                <div className="cube-face cube-face-right">
                                    <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop" alt="AI Tech" />
                                </div>
                                <div className="cube-face cube-face-left">
                                    <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&h=200&fit=crop" alt="Cybersecurity" />
                                </div>
                                <div className="cube-face cube-face-top">
                                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=200&fit=crop" alt="Cloud Dev" />
                                </div>
                                <div className="cube-face cube-face-bottom">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop" alt="Analytics" />
                                </div>
                            </div>
                        </div>
                        <div className="floating-items-container">
                            <div className="floating-icon-item float-1">💻</div>
                            <div className="floating-icon-item float-2">📱</div>
                            <div className="floating-icon-item float-3">🤖</div>
                            <div className="floating-icon-item float-4">🔐</div>
                        </div>
                    </div>

                    {/* Command line terminal */}
                    <TerminalEmulator />
                </div>
            </div>
        </section>
    );
}

/**
 * About Section Component
 */
function About() {
    return (
        <section id="apropos" className="about-section py-24">
            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 about-image-glow aspect-[3/4] relative w-full max-w-[420px] mx-auto">
                    <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop" 
                        alt="Lord Prime Nexus Dev" 
                        className="w-full h-full object-cover rounded-3xl"
                    />
                </div>

                <div className="lg:col-span-7 text-left space-y-6">
                    <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400 uppercase tracking-widest">
                        À PROPOS
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Excellence Technique & Innovation Digitale
                    </h2>
                    <span className="text-lg font-bold block text-gradient-coral font-heading">
                        Lord Prime Nexus Dev — Blessing Lusakumunu
                    </span>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Passionné par la technologie, l'ingénierie logicielle et la création de solutions modernes, fiables et performantes. Je suis le fondateur de Nexora Labs, une entreprise dédiée à l'innovation digitale et à l'excellence technologique.
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Développeur full stack senior, expert en intelligence artificielle, cybersécurité et architectures cloud. Je combine expertise technique approfondie et vision stratégique pour transformer vos défis complexes en opportunités digitales concrètes et mesurables.
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Notre approche repose sur trois piliers fondamentaux : l'innovation technologique de pointe, la qualité irréprochable du code et l'expérience utilisateur exceptionnelle. Chaque projet est une opportunité de repousser les limites du possible.
                    </p>
                    <div className="p-5 bg-white/5 border-l-4 border-l-purple-500 rounded-r-2xl mt-6">
                        <span className="text-white font-bold block mb-1">⚡ Coder • Créer • Innover</span>
                        <em className="text-xs text-slate-500 block">
                            "Le futur ne s'attend pas. Il se construit ligne par ligne."
                        </em>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Services Section Component
 */
function Services() {
    return (
        <section id="services" className="py-24">
            <div className="max-w-[1200px] mx-auto w-full text-center">
                <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
                    NOS SERVICES
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                    Solutions Digitales Complètes
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto mb-12">
                    De la conception stratégique au déploiement technique, nous offrons une gamme complète de services pour répondre à tous vos besoins technologiques avec excellence et innovation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {SERVICES_CATALOG.map(serv => (
                        <div key={serv.id} className="service-figma-card text-left flex flex-col justify-between">
                            <div>
                                <div className="service-icon-wrapper">
                                    <i className={serv.icon + " text-white"}></i>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{serv.title}</h3>
                                <p className="text-xs text-slate-450 leading-relaxed mb-6">
                                    {serv.desc}
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap border-t border-slate-850 pt-4 mt-2">
                                {serv.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-[9px] font-bold text-purple-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Skills Orbital & Progress Bar Component
 */
function Skills() {
    const [progressFill, setProgressFill] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const el = document.getElementById('competences');
            if (el) {
                const top = el.getBoundingClientRect().top;
                const winH = window.innerHeight;
                if (top < winH - 100) {
                    setProgressFill(true);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="competences" className="skills-section py-24">
            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual orbital ring model */}
                <div className="flex justify-center items-center h-[420px]">
                    <div className="skills-orbit-container">
                        <div className="orbit-center-node text-white text-sm font-black">
                            NEXORA
                        </div>
                        
                        <div className="orbit-concentric-ring ring-inner"></div>
                        <div className="orbit-concentric-ring ring-middle"></div>
                        <div className="orbit-concentric-ring ring-outer"></div>

                        {/* Rotating orbital technology nodes */}
                        <div className="orbit-node-item orbit-node-inner">💻</div>
                        <div className="orbit-node-item orbit-node-middle-1">🤖</div>
                        <div className="orbit-node-item orbit-node-middle-2">📱</div>
                        <div className="orbit-node-item orbit-node-outer-1">🔐</div>
                        <div className="orbit-node-item orbit-node-outer-2">☁️</div>
                    </div>
                </div>

                {/* Progress bar list values */}
                <div className="text-left space-y-6">
                    <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400 uppercase tracking-widest">
                        EXPERTISES
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                        Maîtrise Technique Avancée
                    </h2>
                    
                    <div className="space-y-5 mt-6">
                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                                <span>Développement Web (Next.js/React/Node)</span>
                                <span>95%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <div className="skill-bar-fill" style={{ width: progressFill ? '95%' : '0%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                                <span>Intelligence Artificielle & Pipelines RAG</span>
                                <span>90%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <div className="skill-bar-fill" style={{ width: progressFill ? '90%' : '0%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                                <span>Cybersécurité (Audits applicatifs & OWASP)</span>
                                <span>88%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <div className="skill-bar-fill" style={{ width: progressFill ? '88%' : '0%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                                <span>Architecture Cloud & DevOps (AWS/IaC)</span>
                                <span>92%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <div className="skill-bar-fill" style={{ width: progressFill ? '92%' : '0%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                                <span>Modélisation de Bases de Données & APIs</span>
                                <span>94%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                                <div className="skill-bar-fill" style={{ width: progressFill ? '94%' : '0%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Portfolio Case Studies grid Component
 */
function Portfolio() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="portfolio" className="py-24">
            <div className="max-w-[1200px] mx-auto w-full text-center">
                <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
                    RÉALISATIONS
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                    Nos Réalisations Récentes
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto mb-12">
                    Découvrez une sélection d'infrastructures logicielles et de solutions IA déployées avec succès par Nexora Labs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {PORTFOLIO_REALISATIONS.map(proj => (
                        <div key={proj.id} className="portfolio-tilt-card text-left flex flex-col justify-between">
                            <div>
                                <div className="portfolio-media-box">
                                    <i className={proj.icon + " text-white"}></i>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                        {proj.shortDesc}
                                    </p>
                                </div>
                            </div>
                            <div className="px-6 pb-6 pt-0">
                                <button 
                                    onClick={() => setSelectedProject(proj)} 
                                    className="btn border border-slate-800 hover:border-cyan-500 hover:bg-white/5 py-2 w-full text-xs font-bold rounded-lg text-white"
                                >
                                    Étude de cas complète
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Case study detail popup modal */}
            {selectedProject && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto animate-slide-up shadow-2xl">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                <i className={selectedProject.icon + " text-cyan-500"}></i>
                                {selectedProject.title}
                            </h3>
                            <button 
                                onClick={() => setSelectedProject(null)} 
                                className="w-8 h-8 rounded-full bg-slate-850 hover:bg-slate-800 flex items-center justify-center text-white"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="space-y-6 text-left">
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Le Problème</h4>
                                <p className="text-slate-300 text-xs leading-relaxed">{selectedProject.problem}</p>
                            </div>
                            
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">La Solution Nexora</h4>
                                <p className="text-slate-300 text-xs leading-relaxed">{selectedProject.solution}</p>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Résultats Obtenus</h4>
                                <p className="text-slate-300 text-xs leading-relaxed font-semibold text-cyan-400">{selectedProject.metrics}</p>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Technologies clés</h4>
                                <div className="flex gap-1.5 flex-wrap mt-2">
                                    {selectedProject.stack.map(st => (
                                        <span key={st} className="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[9px] font-bold text-cyan-400">
                                            {st}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end gap-3">
                            <button onClick={() => setSelectedProject(null)} className="btn btn-secondary text-xs rounded-lg px-6 py-2">
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

/**
 * Vertical Process Timeline Component
 */
function Process() {
    return (
        <section id="process" className="process-section py-24">
            <div className="max-w-[900px] mx-auto w-full text-center relative">
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4">
                    NOTRE MÉTHODOLOGIE
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                    Méthodologie Agile & Structurée
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-16">
                    Nous suivons des cycles de conception cadrés et sécurisés pour assurer la conformité absolue de vos projets applicatifs.
                </p>

                {/* Vertical line indicator */}
                <div className="timeline-connector-line"></div>

                <div className="space-y-8 text-left relative z-10">
                    {PROCESS_STEPS.map((proc, idx) => (
                        <div key={proc.step} className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 items-start">
                            <div className="flex justify-center md:justify-start">
                                <div className="timeline-step-circle text-white">
                                    {proc.step}
                                </div>
                            </div>
                            <div className="timeline-card">
                                <h3 className="text-lg font-bold text-white mb-2">{proc.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{proc.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Interactive Budget & Complexity Calculator
 */
function ProjectCalculator({ onToast }) {
    const [type, setType] = useState('web');
    const [complexity, setComplexity] = useState('Standard');
    const [timeline, setTimeline] = useState('2 - 3 semaines');
    const [architecture, setArchitecture] = useState('Next.js Stack');
    const [dbSelected, setDbSelected] = useState(false);
    const [authSelected, setAuthSelected] = useState(false);
    const [paymentSelected, setPaymentSelected] = useState(false);

    useEffect(() => {
        let baseWeeks = 2.0;
        let comp = 'Modérée';
        let arch = 'Next.js App Engine';

        if (type === 'web') {
            baseWeeks = 2.5;
            comp = 'Standard';
            arch = 'Web App & APIs Backend';
        } else if (type === 'mobile') {
            baseWeeks = 4.5;
            comp = 'Avancé';
            arch = 'Cross-platform Mobile Architecture';
        } else if (type === 'ai') {
            baseWeeks = 6.0;
            comp = 'Critique / R&D';
            arch = 'Machine Learning Integration Pipeline';
        } else if (type === 'cyber') {
            baseWeeks = 3.0;
            comp = 'Sécurité Globale';
            arch = 'Cybersecurity WAF Compliance Shield';
        }

        if (dbSelected) baseWeeks += 1.0;
        if (authSelected) baseWeeks += 0.8;
        if (paymentSelected) baseWeeks += 1.5;

        if (baseWeeks >= 6.0) {
            comp = 'Complexe / Multi-tiers';
        } else if (baseWeeks >= 4.0 && comp === 'Standard') {
            comp = 'Avancé';
        }

        setComplexity(comp);
        setTimeline(`${Math.floor(baseWeeks)} - ${Math.ceil(baseWeeks + 1.5)} semaines`);
        setArchitecture(arch);
    }, [type, dbSelected, authSelected, paymentSelected]);

    const handleCalculate = async () => {
        const calcPayload = {
            type: type === 'web' ? 'Application Web' : type === 'mobile' ? 'Application Mobile' : type === 'ai' ? 'IA Engine' : 'Cyber Audit',
            complexity,
            timeline,
            architecture,
            features: [
                dbSelected ? 'Base de données' : null,
                authSelected ? 'Profils chiffrés' : null,
                paymentSelected ? 'Paiement Mobile' : null
            ].filter(Boolean)
        };

        let saved = false;
        if (typeof saveProjectEstimate === 'function') {
            saved = await saveProjectEstimate(calcPayload);
        }

        if (saved) {
            onToast("Configuration sauvegardée dans Firestore !");
        } else {
            onToast("Sauvegarde locale effectuée.");
        }

        const waText = `Bonjour Blessing Lusakumunu (Lord Prime Nexus Dev),
J'ai configuré un projet sur le simulateur Nexora Labs :
- *Projet* : ${calcPayload.type}
- *Complexité* : ${complexity}
- *Durée* : ${timeline}
- *Architecture* : ${architecture}
- *Options* : ${calcPayload.features.join(', ') || 'Aucune'}

Merci de me recontacter pour lancer le cahier des charges.`;

        const waUrl = `https://wa.me/243994159220?text=${encodeURIComponent(waText)}`;
        setTimeout(() => {
            window.open(waUrl, '_blank');
        }, 800);
    };

    return (
        <section className="py-24 border-t border-slate-850">
            <div className="max-w-[1000px] mx-auto w-full">
                <div className="text-center mb-12">
                    <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
                        ESTIMATEUR
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                        Configurez Votre Projet
                    </h2>
                    <p className="text-slate-550 text-sm max-w-xl mx-auto">
                        Simulez les charges d'intégration technique pour obtenir une estimation de complexité et de temps de livraison.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <div className="figma-card p-6 space-y-6 text-left">
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase block mb-3">Type d'application</span>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-cyan-500/30">
                                    <input 
                                        type="radio" 
                                        name="pType" 
                                        checked={type === 'web'} 
                                        onChange={() => setType('web')}
                                        className="accent-cyan-500"
                                    />
                                    <span className="text-xs text-slate-300">Application Web (Next.js/React)</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-cyan-500/30">
                                    <input 
                                        type="radio" 
                                        name="pType" 
                                        checked={type === 'mobile'} 
                                        onChange={() => setType('mobile')}
                                        className="accent-cyan-500"
                                    />
                                    <span className="text-xs text-slate-300">Application Mobile (Flutter/iOS-Android)</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-cyan-500/30">
                                    <input 
                                        type="radio" 
                                        name="pType" 
                                        checked={type === 'ai'} 
                                        onChange={() => setType('ai')}
                                        className="accent-cyan-500"
                                    />
                                    <span className="text-xs text-slate-300">Intelligence Artificielle & LLMs</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-cyan-500/30">
                                    <input 
                                        type="radio" 
                                        name="pType" 
                                        checked={type === 'cyber'} 
                                        onChange={() => setType('cyber')}
                                        className="accent-cyan-500"
                                    />
                                    <span className="text-xs text-slate-300">Audits de Cybersécurité</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase block mb-3">Options techniques</span>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-cyan-500/30">
                                    <input 
                                        type="checkbox" 
                                        checked={dbSelected} 
                                        onChange={() => setDbSelected(!dbSelected)}
                                        className="accent-cyan-500"
                                    />
                                    <span className="text-xs text-slate-300">Base de données chiffrée SQL/NoSQL</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-cyan-500/30">
                                    <input 
                                        type="checkbox" 
                                        checked={authSelected} 
                                        onChange={() => setAuthSelected(!authSelected)}
                                        className="accent-cyan-500"
                                    />
                                    <span className="text-xs text-slate-300">Système d'authentification double-facteur</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-cyan-500/30">
                                    <input 
                                        type="checkbox" 
                                        checked={paymentSelected} 
                                        onChange={() => setPaymentSelected(!paymentSelected)}
                                        className="accent-cyan-500"
                                    />
                                    <span className="text-xs text-slate-300">Intégration Mobile Money API Gateway</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="figma-card p-6 flex flex-col justify-between text-left">
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white">Estimation Prévisionnelle</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-slate-800 pb-3">
                                    <span className="text-xs text-slate-500">Complexité technique :</span>
                                    <strong className="text-xs text-cyan-400 font-bold">{complexity}</strong>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-3">
                                    <span className="text-xs text-slate-500">Calendrier d'ingénierie :</span>
                                    <strong className="text-xs text-white font-bold">{timeline}</strong>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-xs text-slate-500">Architecture recommandée :</span>
                                    <strong className="text-xs text-slate-300 font-mono font-bold">{architecture}</strong>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleCalculate} 
                            className="btn py-3 w-full text-xs font-bold rounded-full text-white"
                            style={{ backgroundColor: '#25d366', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)' }}
                        >
                            <i className="fa-brands fa-whatsapp"></i> Valider & Transmettre sur WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Centered Action Banner component
 */
function ActionBanner() {
    return (
        <section className="py-16">
            <div className="max-w-[1100px] mx-auto w-full">
                <div className="cta-banner-container text-center space-y-6">
                    <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                        Prêt à Démarrer Votre Projet Digital ?
                    </h2>
                    <p className="text-sm text-slate-200/90 max-w-xl mx-auto leading-relaxed">
                        Faites-nous part de vos besoins techniques. Nos ingénieurs vous répondent sous un délai maximum de 24 heures ouvrées.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap mt-8">
                        <a 
                            href="https://wa.me/243994159220" 
                            target="_blank" 
                            className="btn py-3 px-8 text-xs font-bold rounded-full text-purple-950 bg-white"
                            style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)' }}
                        >
                            <i className="fa-brands fa-whatsapp text-purple-950"></i> Discuter sur WhatsApp
                        </a>
                        <a 
                            href="mailto:nexoralabss@gmail.com" 
                            className="btn border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 text-xs rounded-full"
                        >
                            <i className="fa-solid fa-envelope"></i> Envoyer un Email
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Saturated FAQ Accordion Component
 */
function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (idx) => {
        if (activeIndex === idx) {
            setActiveIndex(null);
        } else {
            setActiveIndex(idx);
        }
    };

    return (
        <section className="py-24 border-t border-slate-850">
            <div className="max-w-[800px] mx-auto w-full text-center">
                <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4">
                    SUPPORT
                </span>
                <h2 className="text-3xl font-black text-white mb-10">
                    Questions Fréquentes
                </h2>
                
                <div className="space-y-4 text-left">
                    {FAQ_CATALOG.map((faq, idx) => (
                        <div key={idx} className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                            <button 
                                onClick={() => toggleAccordion(idx)} 
                                className="w-full flex justify-between items-center text-xs font-bold text-white py-2 cursor-pointer outline-none text-left"
                            >
                                <span>{faq.q}</span>
                                <span className="text-purple-500 text-sm">
                                    <i className={`fa-solid ${activeIndex === idx ? 'fa-minus' : 'fa-plus'}`}></i>
                                </span>
                            </button>
                            {activeIndex === idx && (
                                <p className="text-[11px] text-slate-400 leading-relaxed mt-3 border-t border-slate-800 pt-3 animate-fade-in">
                                    {faq.a}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Contact & Message form Component (Firestore Integration)
 */
function Contact({ onToast }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const contactPayload = {
            name: name.trim(),
            email: email.trim(),
            company: company.trim(),
            subject: subject.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString()
        };

        let saved = false;
        if (typeof saveContactMessage === 'function') {
            saved = await saveContactMessage(contactPayload);
        }

        setLoading(false);

        if (saved) {
            onToast(`Merci ${name}, votre message a bien été envoyé !`);
            setName('');
            setEmail('');
            setCompany('');
            setSubject('');
            setMessage('');
        } else {
            onToast("Erreur réseau Firestore. Sauvegarde locale effectuée.");
        }
    };

    return (
        <section id="contact" className="py-24">
            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                {/* Contact information cards */}
                <div className="lg:col-span-5 text-left flex flex-col justify-between space-y-6">
                    <div className="space-y-6">
                        <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400 uppercase tracking-widest">
                            CONTACTS
                        </div>
                        <h2 className="text-3xl font-extrabold text-white leading-tight">
                            Travaillons Ensemble
                        </h2>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Pour toute demande de collaboration technique, contactez directement Blessing Lusakumunu (Lord Prime Nexus Dev).
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:nexoralabss@gmail.com" className="flex items-center gap-4 p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:border-purple-500/40 hover:translate-x-2 transition-all">
                                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <span className="text-[9px] text-slate-500 uppercase block">Adresse E-mail</span>
                                    <span className="text-xs text-white font-bold block">nexoralabss@gmail.com</span>
                                </div>
                            </a>

                            <a href="https://wa.me/243994159220" target="_blank" className="flex items-center gap-4 p-4 bg-slate-900/40 border border-white/5 rounded-2xl hover:border-purple-500/40 hover:translate-x-2 transition-all">
                                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </div>
                                <div>
                                    <span className="text-[9px] text-slate-500 uppercase block">Ligne WhatsApp</span>
                                    <span className="text-xs text-white font-bold block">+243 994 159 220</span>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center text-purple-400">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <span className="text-[9px] text-slate-500 uppercase block">Localisation R&D</span>
                                    <span className="text-xs text-white font-bold block">Kinshasa, Rép. Démocratique du Congo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-800/80 pt-4 text-[10px] text-slate-500">
                        Notre équipe d'ingénieurs s'engage à vous répondre sous un délai maximum de 24 heures ouvrées.
                    </div>
                </div>

                {/* Form fields */}
                <div className="lg:col-span-7 contact-form text-left">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="text-xs font-semibold text-slate-400 block mb-1">Nom Complet</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                    className="form-input neon-input"
                                    placeholder="Ex: Jean Dupont"
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-xs font-semibold text-slate-400 block mb-1">Adresse E-mail</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    className="form-input neon-input"
                                    placeholder="Ex: jean@entreprise.com"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="text-xs font-semibold text-slate-400 block mb-1">Entreprise</label>
                                <input 
                                    type="text" 
                                    value={company} 
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="form-input neon-input"
                                    placeholder="Optionnel"
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-xs font-semibold text-slate-400 block mb-1">Sujet du Projet</label>
                                <input 
                                    type="text" 
                                    value={subject} 
                                    onChange={(e) => setSubject(e.target.value)}
                                    required 
                                    className="form-input neon-input"
                                    placeholder="Ex: Demande de devis IA"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="text-xs font-semibold text-slate-400 block mb-1">Message ou description de vos besoins</label>
                            <textarea 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)}
                                required 
                                className="form-input neon-input h-[120px]"
                                placeholder="Décrivez succinctement votre projet..."
                                style={{ resize: 'none' }}
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary-coral py-3.5 w-full text-xs font-bold rounded-xl text-white"
                            disabled={loading}
                        >
                            {loading ? (
                                <><i className="fa-solid fa-spinner fa-spin"></i> Transmission...</>
                            ) : (
                                <><i className="fa-solid fa-paper-plane"></i> Envoyer la demande</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

/**
 * Footer Component
 */
function Footer() {
    return (
        <footer className="py-16 border-t border-slate-850">
            <div className="max-w-[1200px] mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left mb-12">
                    <div className="space-y-4">
                        <div className="text-lg font-black text-white">&lt;NEXORA LABS/&gt;</div>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                            Studio d'ingénierie logicielle d'élite. Conception de systèmes Web, mobiles et d'agents d'intelligence artificielle robustes et chiffrés.
                        </p>
                        <div className="flex gap-2">
                            <a href="https://github.com" target="_blank" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-cyan-400">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="https://wa.me/243994159220" target="_blank" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-cyan-400">
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Services</h4>
                        <ul className="space-y-2 text-xs text-slate-500 list-none">
                            <li><a href="#services">Développement Web</a></li>
                            <li><a href="#services">Applications Mobiles</a></li>
                            <li><a href="#services">Intelligence Artificielle</a></li>
                            <li><a href="#services">Audits Cybersécurité</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Entreprise</h4>
                        <ul className="space-y-2 text-xs text-slate-500 list-none">
                            <li><a href="#apropos">À Propos</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#process">Process</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Légal</h4>
                        <ul className="space-y-2 text-xs text-slate-500 list-none">
                            <li><a href="#">Politique RGPD</a></li>
                            <li><a href="#">Mentions Légales</a></li>
                            <li><a href="#">Conditions de Vente</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-850 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-600 gap-4">
                    <p>&copy; 2026 Nexora Labs. Tous droits réservés.</p>
                    <p>Développé par <strong>Lord Prime Nexus Dev</strong> | Kinshasa, RDC</p>
                </div>
            </div>
        </footer>
    );
}

// ==========================================================================
// MAIN COMPONENT MOUNT ENGINE
// ==========================================================================
function App() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('accueil');
    const [toastMsg, setToastMsg] = useState('');
    const [toastActive, setToastActive] = useState(false);

    const triggerToast = (msg) => {
        setToastMsg(msg);
        setToastActive(true);
        setTimeout(() => {
            setToastActive(false);
        }, 4000);
    };

    // Tracking scroll events for navbar class and scroll progress bar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Scroll indicator progress fill calculation
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledPercent = (winScroll / height) * 100;
            const progressIndicator = document.getElementById('progressIndicator');
            if (progressIndicator) {
                progressIndicator.style.width = scrolledPercent + "%";
            }

            // Active section highlighting checker
            const sections = ['accueil', 'apropos', 'services', 'competences', 'portfolio', 'process'];
            const scrollPos = window.scrollY + 100;

            for (let i = 0; i < sections.length; i++) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const top = el.offsetTop;
                    const h = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + h) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Remove static loader on mount
    useEffect(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 600);
        }
    }, []);

    return (
        <React.Fragment>
            {/* Custom Mouse follow circles */}
            <CustomCursor />

            {/* Sticky Page Progress bar */}
            <div className="scroll-progress-bar" id="progressIndicator"></div>

            {/* Navigation sticky */}
            <Header scrolled={scrolled} activeSection={activeSection} />

            {/* Core Body Container */}
            <main className="px-[5%] relative z-10">
                <Hero />
                <About />
                <Services />
                <Skills />
                <Portfolio />
                <Process />
                <ProjectCalculator onToast={triggerToast} />
                <FAQ />
                <Contact onToast={triggerToast} />
            </main>

            {/* Mobile Bottom Tab Bar Navigation */}
            <nav className="mobile-bottom-nav">
                <a href="#accueil" className={`mobile-nav-item ${activeSection === 'accueil' ? 'active' : ''}`}>
                    <i className="fa-solid fa-house"></i>
                    <span>Accueil</span>
                </a>
                <a href="#services" className={`mobile-nav-item ${activeSection === 'services' ? 'active' : ''}`}>
                    <i className="fa-solid fa-gears"></i>
                    <span>Services</span>
                </a>
                <a href="#portfolio" className={`mobile-nav-item ${activeSection === 'portfolio' ? 'active' : ''}`}>
                    <i className="fa-solid fa-folder-open"></i>
                    <span>Portfolio</span>
                </a>
                <a href="#apropos" className={`mobile-nav-item ${activeSection === 'apropos' ? 'active' : ''}`}>
                    <i className="fa-solid fa-circle-info"></i>
                    <span>À Propos</span>
                </a>
                <a href="#contact" className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
                    <i className="fa-solid fa-sliders"></i>
                    <span>Devis</span>
                </a>
            </nav>

            {/* Footer */}
            <Footer />

            {/* Toast alerts system */}
            <div className={`toast-alert ${toastActive ? 'active' : ''}`}>
                <i className="fa-solid fa-circle-check"></i>
                <span>{toastMsg}</span>
            </div>
        </React.Fragment>
    );
}

// Mount the compiled component inside the HTML container
const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
