/**
 * NEXORA LABS - CORE APPLICATION COMPONENT SYSTEM
 * Version: 3.0.0 (Corporate Professional Edition)
 * Author: Blessing Lusakumunu (Lord Prime Nexus Dev)
 * Technologies: React JS, Tailwind CSS, Firebase Firestore
 * 
 * DESCRIPTION:
 * Ce fichier est le cœur fonctionnel du site web de Nexora Labs. Il contient
 * l'intégralité du système de composants React compilés via Babel, organisant
 * les sections de l'application, les états interactifs, la validation des formulaires,
 * le calculateur de budget/temps, les filtres du portfolio et les interactions avec Firebase.
 * 
 * DIRECTIVES D'ARCHITECTURE :
 * 1. Monopage fluide et ultra-responsive (Optimisé Téléphones & Tablettes).
 * 2. Zéro effet de style cyberpunk flashy - Charte graphique corporate d'élite.
 * 3. Base de données Firestore intégrée de manière native pour les formulaires et estimations.
 * 4. Documentation JSDoc exhaustive pour chaque fonction et composant.
 */

const { useState, useEffect, useRef } = React;

// ==========================================================================
// DATA CONFIGURATIONS (SATURATED WITH CORPORATE TEXT)
// ==========================================================================

/**
 * Catalogue complet des services techniques
 */
const SERVICES_DATA = [
    {
        id: "web-cloud",
        title: "Ingénierie Web & Cloud Native",
        icon: "fa-solid fa-code",
        shortDesc: "Architectures Web distributives et plateformes cloud conçues pour absorber des millions de requêtes en toute résilience.",
        longDesc: "Notre studio conçoit des portails web transactionnels, des architectures microservices et des plateformes SaaS hautement performantes. Nous optimisons le temps de réponse (Core Web Vitals), assurons la scalabilité horizontale et découplons le frontend du backend pour une évolutivité maximale.",
        stack: ["Next.js", "React", "Node.js", "Express.js", "Docker", "AWS (EC2, S3, RDS)"],
        timeframe: "3 à 6 semaines",
        targets: "Grands comptes, Startups en forte croissance, Fintechs, E-Commerce.",
        deliverables: [
            "Code source versionné (Git) et documenté selon les standards ESLint.",
            "Schéma d'architecture technique (Docker Compose, Kubernetes configs).",
            "Interfaces d'administration avancées avec tableaux de bord analytiques.",
            "Tests d'intégration et unitaires automatisés (Jest/Playwright)."
        ]
    },
    {
        id: "mobile-apps",
        title: "Applications Mobiles Cross-Platform",
        icon: "fa-solid fa-mobile-screen-button",
        shortDesc: "Applications natives iOS et Android à partir d'un codebase unique, assurant rapidité de mise sur le marché et fluidité UX.",
        longDesc: "Nous concevons des applications mobiles ergonomiques adaptées aux habitudes d'utilisation sur smartphone. L'utilisation de technologies de pointe permet de compiler un code unique pour iOS et Android, limitant les coûts de maintenance tout en offrant des performances identiques aux applications natives.",
        stack: ["Flutter", "React Native", "Redux", "SQLite", "Firebase Core APIs", "App Store Connect"],
        timeframe: "4 à 8 semaines",
        targets: "Logistique terrain, services à la demande, applications bancaires, objets connectés.",
        deliverables: [
            "Fichiers binaires de déploiement compilés (APK et IPA).",
            "Mise en ligne sur Google Play Store et Apple App Store.",
            "Module de synchronisation de données hors-connexion (offline first).",
            "Console d'administration web pour la gestion des notifications push."
        ]
    },
    {
        id: "ai-solutions",
        title: "Intelligence Artificielle & Modèles LLM",
        icon: "fa-solid fa-brain",
        shortDesc: "Intégration d'agents conversationnels intelligents et de modèles prédictifs pour automatiser vos tâches complexes.",
        longDesc: "Propulsez l'efficacité opérationnelle de vos collaborateurs en connectant des modèles d'IA générative (LLM) à vos bases de connaissances privées. Nous mettons en œuvre des systèmes de recherche vectorielle sécurisés garantissant la confidentialité absolue de vos données d'entreprise.",
        stack: ["OpenAI API", "Python", "FastAPI", "LangChain", "Bases de données vectorielles (Pinecone)", "ETL Pipelines"],
        timeframe: "4 à 7 semaines",
        targets: "Supports clients, gestionnaires de documents, automatisation des rapports, aide à la décision.",
        deliverables: [
            "API privée d'interfaçage avec les modèles d'intelligence artificielle.",
            "Base de connaissances vectorisée avec pipelines de mise à jour automatique.",
            "Interface d'administration pour la modération et l'historisation des échanges.",
            "Rapport de conformité sur l'usage éthique et la sécurité des données."
        ]
    },
    {
        id: "security-audit",
        title: "Cybersécurité Offensive & OSINT",
        icon: "fa-solid fa-shield-halved",
        shortDesc: "Audits de sécurité réguliers, tests d'intrusion et renseignement en sources ouvertes pour protéger vos actifs.",
        longDesc: "Nos experts simulent des attaques réalistes sur vos applications et serveurs afin d'identifier les vulnérabilités applicatives (OWASP Top 10) avant qu'elles ne soient exploitées par des acteurs malveillants. Nous menons également des analyses d'exposition de vos dirigeants (OSINT).",
        stack: ["Pentesting (APIs & Web)", "Audit de code source", "OWASP Standards compliance", "Analyse OSINT", "Configuration WAF"],
        timeframe: "1 à 3 semaines",
        targets: "Fintechs, organismes de santé, institutions d'État, infrastructures manipulant des données sensibles.",
        deliverables: [
            "Rapport d'audit technique détaillé classant les vulnérabilités par criticité.",
            "Plan de remédiation et correctifs de code source applicatif.",
            "Contre-audit après correction pour validation de la sécurité.",
            "Certificat d'audit de sécurité Nexora Labs valable 12 mois."
        ]
    },
    {
        id: "devops-infra",
        title: "DevOps & Cloud Native Infrastructure",
        icon: "fa-solid fa-server",
        shortDesc: "Automatisation de vos déploiements (CI/CD) et surveillance active des charges serveurs pour une disponibilité à 99.9%.",
        longDesc: "Nous orchestrons vos serveurs pour réduire à zéro les interruptions de services lors des mises à jour. Grâce à l'Infrastructure en tant que Code (IaC), nous documentons vos serveurs de façon à pouvoir les cloner instantanément en cas d'incident matériel.",
        stack: ["Docker", "Kubernetes", "GitHub Actions / GitLab CI", "Terraform", "Prometheus / Grafana"],
        timeframe: "2 à 4 semaines",
        targets: "Équipes de développement, migrations de serveurs, architectures à forte variation d'audience.",
        deliverables: [
            "Scripts de configuration Terraform pour le provisionnement d'infrastructure.",
            "Pipelines de déploiement automatique chiffrés et testés.",
            "Système d'alertes en temps réel (Discord/Slack/Email) en cas d'incident serveur.",
            "Tableaux de bord d'analyse de charge Prometheus/Grafana."
        ]
    },
    {
        id: "backend-apis",
        title: "Architectures Backend & APIs Robustes",
        icon: "fa-solid fa-database",
        shortDesc: "Modélisation de bases de données relationnelles complexes et conception d'APIs chiffrées de bout en bout.",
        longDesc: "Nous concevons des fondations backend hautement sécurisées pour alimenter vos applications web, mobiles et IoT. Nos schémas de bases de données sont optimisés pour les requêtes volumineuses et intègrent des mécanismes de mise en cache distribuée pour réduire la latence réseau.",
        stack: ["PostgreSQL", "MongoDB", "Redis Cache", "GraphQL", "RESTful APIs", "JWT / OAuth2 Authentication"],
        timeframe: "3 à 5 semaines",
        targets: "Systèmes d'information d'entreprise, synchronisation multi-terminaux, passerelles d'intégration tiers.",
        deliverables: [
            "Documentation interactive des endpoints d'API (Swagger / Postman).",
            "Scripts de migration et de sauvegarde automatisée des bases de données.",
            "Module d'authentification chiffrée conforme aux exigences de sécurité actuelles.",
            "Rapport de performance d'accès aux données (temps de réponse moyen < 100ms)."
        ]
    }
];

/**
 * Réalisations & Études de Cas du Portfolio
 */
const PORTFOLIO_DATA = [
    {
        id: "proj-nexorashop",
        title: "Plateforme NexoraShop",
        category: "web",
        icon: "fa-solid fa-cart-shopping",
        shortDesc: "Infrastructure e-commerce complète avec intégration de paiements locaux (Mobile Money).",
        problem: "Le client souhaitait déployer un service e-commerce grand public en Afrique centrale, mais les solutions standard (Shopify, WooCommerce) manquaient d'intégrations fluides avec les services de paiement par téléphone (M-Pesa, Orange Money, Airtel Money) et souffraient de lourdeurs sur les réseaux mobiles à faible débit.",
        solution: "Nous avons conçu une application Next.js découplée (headless) communiquant avec un backend Node.js ultra-léger. L'état d'affichage des articles et la validation du panier s'exécutent localement. L'intégration des APIs Mobile Money a été développée sur-mesure pour valider les paiements en moins de 15 secondes sans requérir de cartes bancaires.",
        metrics: "Volume d'affaires mensuel en hausse de 40%, temps de chargement réduit à 1.2s sous réseau 3G, taux de transaction réussi de 99.4%.",
        stack: ["Next.js", "Node.js", "PostgreSQL", "Mobile Money APIs Gateway", "Redis"]
    },
    {
        id: "proj-neuroanalytics",
        title: "NeuroAnalytics Engine",
        category: "ia",
        icon: "fa-solid fa-chart-pie",
        problem: "Un grand importateur de produits manufacturés faisait face à des surstocks et à des ruptures de approvisionnements à cause de variations saisonnières complexes et de données éparpillées sur plusieurs logiciels obsolètes.",
        solution: "Nexora Labs a déployé un entrepôt de données (data warehouse) centralisant l'historique des ventes. Nous avons entraîné des modèles d'apprentissage supervisé sous TensorFlow pour analyser l'évolution des stocks et générer automatiquement des préconisations de commandes de réapprovisionnement à J+30.",
        metrics: "Réduction des pertes liées aux surstocks de 22%, temps de traitement des commandes automatisé divisé par 5, précision prédictive de 94.2%.",
        stack: ["Python FastAPI", "React", "TensorFlow", "Docker", "ETL Pipelines"]
    },
    {
        id: "proj-nexus-knowledge",
        category: "ia",
        title: "Nexus Knowledge Hub",
        icon: "fa-solid fa-comments",
        problem: "Un cabinet d'avocats passait plus de 12 heures par dossier à rechercher des références jurisprudentielles dans des archives papier et numériques numérisées, sans structure d'indexation.",
        solution: "Nous avons converti et nettoyé l'intégralité des archives textuelles. Les documents ont été découpés en fragments (chunks) sémantiques puis vectorisés à l'aide de modèles d'embedding. Un agent d'IA basé sur GPT-4 (RAG) permet désormais de questionner la base de données en langage naturel et de citer précisément les dossiers sources.",
        metrics: "Temps moyen de recherche de jurisprudence réduit de 12 heures à 10 secondes, précision des réponses juridiques validée par les avocats à 98%.",
        stack: ["LangChain", "OpenAI API", "Pinecone Vector Database", "Python", "React"]
    },
    {
        id: "proj-medlink",
        category: "mobile",
        title: "MedLink App",
        icon: "fa-solid fa-house-medical",
        problem: "Mise en relation de patients avec des médecins généralistes et spécialistes en milieu urbain. La transmission d'ordonnances et de diagnostics nécessitait un chiffrement de bout en bout conforme au secret médical.",
        solution: "Nexora Labs a développé une application mobile multiplateforme en Flutter. La communication avec le serveur s'effectue via des APIs REST chiffrées en AES-256. L'historique médical est stocké localement de manière sécurisée et les serveurs d'hébergement respectent les normes d'hébergement de données de santé (HDS).",
        metrics: "15 000+ consultations réservées en 6 mois, taux de rétention client de 78%, conformité absolue aux exigences de protection des données.",
        stack: ["Flutter", "Node.js Backend", "Firebase Auth & Firestore", "AES-256 Encryption"]
    },
    {
        id: "proj-academy",
        category: "web",
        title: "Nexora Academy",
        icon: "fa-solid fa-graduation-cap",
        problem: "Une multinationale souhaitait former ses 2 000 collaborateurs répartis dans des zones à connectivité internet limitée, nécessitant une plateforme d'apprentissage à faible consommation de données.",
        solution: "Nous avons mis en place une plateforme e-learning (LMS) basée sur Next.js. Les cours vidéo sont encodés dynamiquement à plusieurs niveaux de qualité pour s'adapter à la vitesse de connexion de l'utilisateur. Le suivi des quiz et des acquis s'exécute en local et se synchronise en arrière-plan lorsque la connexion se rétablit.",
        metrics: "Taux de complétion des modules de formation passé de 35% à 88%, économie de consommation de données de 60% par rapport aux solutions classiques.",
        stack: ["Next.js", "Express.js Backend", "MongoDB Cluster", "AWS Elemental MediaConvert"]
    },
    {
        id: "proj-sentinel",
        category: "security",
        title: "Sentinel Audit Shield",
        icon: "fa-solid fa-vault",
        problem: "Une fintech devait se soumettre à un audit réglementaire de sécurité strict et avait besoin de surveiller les tentatives de connexions non-autorisées sur ses points d'accès d'API publics.",
        solution: "Déploiement d'un agent de surveillance active sur les serveurs backend. Cet agent analyse les journaux système en temps réel, filtre les comportements de requêtes anormaux (scripts d'analyse, injections SQL) et alerte immédiatement les administrateurs tout en bloquant automatiquement l'IP attaquante.",
        metrics: "2.4 millions de requêtes suspectes bloquées automatiquement, conformité d'audit réglementaire obtenue au premier passage, aucune faille déplorée.",
        stack: ["Python Scripts", "FastAPI Admin Console", "Docker Configuration", "Linux security policies"]
    }
];

/**
 * Arsenal technologique et compétences associées
 */
const TECH_STACK_DATA = [
    {
        category: "Frontend & UI Design",
        icon: "fa-solid fa-laptop-code",
        items: [
            { name: "React.js", desc: "Bibliothèque de référence pour la création d'interfaces dynamiques et modulaires." },
            { name: "Next.js", desc: "Framework de production React avec rendu côté serveur (SSR) et optimisation SEO." },
            { name: "Tailwind CSS", desc: "Framework CSS utilitaire permettant d'écrire des designs épurés et hautement responsives." },
            { name: "JavaScript (ES6+)", desc: "Langage dynamique au cœur de la logique interactive de nos applications." },
            { name: "CSS3 Variables & Grid", desc: "Briques de mise en page pour un contrôle précis des thèmes et des positions." }
        ]
    },
    {
        category: "Backend & Architectures",
        icon: "fa-solid fa-server",
        items: [
            { name: "Node.js", desc: "Environnement d'exécution JavaScript côté serveur rapide et hautement concurrent." },
            { name: "Express.js", desc: "Framework minimaliste pour la création rapide d'APIs REST performantes." },
            { name: "FastAPI", desc: "Framework Python moderne pour bâtir des APIs d'intégration de modèles d'IA." },
            { name: "GraphQL", desc: "Langage de requête pour APIs permettant d'obtenir précisément les données demandées." },
            { name: "OAuth2 & JWT Auth", desc: "Protocoles d'authentification et de chiffrement des sessions utilisateurs." }
        ]
    },
    {
        category: "Bases de Données & Stockage",
        icon: "fa-solid fa-database",
        items: [
            { name: "PostgreSQL", desc: "Système de gestion de base de données relationnelle robuste pour les transactions financières." },
            { name: "MongoDB", desc: "Base de données NoSQL flexible pour le stockage de documents et données variables." },
            { name: "Redis", desc: "Base de données en mémoire utilisée pour la mise en cache rapide des requêtes." },
            { name: "Pinecone", desc: "Base de données vectorielle optimisée pour l'IA et les recherches sémantiques." },
            { name: "Firebase Firestore", desc: "Base de données NoSQL synchronisée en temps réel pour applications mobiles." }
        ]
    },
    {
        category: "DevOps & Cloud Serverless",
        icon: "fa-solid fa-cloud",
        items: [
            { name: "Docker", desc: "Conteneurisation d'applications garantissant un comportement identique en dev et prod." },
            { name: "Amazon Web Services (AWS)", desc: "Hébergement cloud redondant avec auto-scaling et haute disponibilité." },
            { name: "GitHub Actions", desc: "Pipelines automatisés d'intégration et de livraison continue (CI/CD)." },
            { name: "Kubernetes", desc: "Orchestration de conteneurs pour les architectures complexes à forte audience." },
            { name: "Terraform", desc: "Infrastructure as Code pour automatiser la création et le suivi de vos serveurs." }
        ]
    }
];

/**
 * Questions fréquemment posées
 */
const FAQ_DATA = [
    {
        q: "Quels sont vos délais moyens de réalisation pour une application Web ?",
        a: "Les délais dépendent directement du nombre de fonctionnalités. Pour un portail Web ou un site vitrine haut de gamme, comptez 2 à 3 semaines de développement. Pour des systèmes d'envergure plus complexes (SaaS, E-Commerce, intégrations d'IA), le calendrier s'étend généralement sur 4 à 8 semaines."
    },
    {
        q: "Assurez-vous la maintenance de nos applications après le déploiement ?",
        a: "Oui. Nexora Labs propose des contrats de maintenance évolutive et corrective (Tiercé Maintenance Applicative). Nous surveillons les serveurs en temps réel, appliquons les correctifs de sécurité réguliers et réalisons des sauvegardes quotidiennes chiffrées de vos bases de données."
    },
    {
        q: "Où sont hébergées les bases de données de nos applications ?",
        a: "Nous nous adaptons à vos contraintes réglementaires et de souveraineté. Nous pouvons déployer vos données sur des infrastructures Cloud de confiance (AWS/GCP en Europe ou en Afrique du Sud) ou configurer des serveurs physiques locaux (on-premise) au sein de vos propres locaux."
    },
    {
        q: "Pouvez-vous sécuriser une application web ou mobile déjà existante ?",
        a: "Absolument. Nous réalisons des audits de sécurité de code existant et des tests d'intrusion (pentesting). Nous vous remettons ensuite un rapport détaillé contenant les vulnérabilités détectées et nous nous chargeons de les corriger (chiffrement, renforcement des droits d'accès, correctifs de failles d'API)."
    },
    {
        q: "Proposez-vous des facilités de paiement pour les projets d'envergure ?",
        a: "Oui. Pour les projets importants, nous échelonnons les paiements en fonction de la validation des jalons de livraison définis au cahier des charges (généralement : 30% au démarrage, 40% à la livraison de la version de test, et 30% lors de la mise en production)."
    },
    {
        q: "Comment se déroule la collaboration avec Lord Prime Nexus Dev ?",
        a: "Le processus est transparent et s'organise en sprints de développement (méthodologie Scrum). Vous disposez d'un accès à un tableau de bord partagé où vous pouvez suivre l'écriture de chaque module et tester les fonctionnalités au fur et à mesure de leur achèvement."
    }
];

// ==========================================================================
// COMPONENT DEFINITIONS
// ==========================================================================

/**
 * Header Component - Navigation & Theme Switcher
 */
function Header({ currentTheme, onThemeToggle, activeSection }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="navbar">
            <div className="nav-container">
                <a href="#accueil" className="logo">
                    &lt;NEXORA<span>/</span>&gt;
                </a>
                
                {/* Desktop navigation */}
                <nav className="nav-menu">
                    <ul className="nav-links">
                        <li>
                            <a href="#accueil" className={`nav-item ${activeSection === 'accueil' ? 'active' : ''}`}>
                                Accueil
                            </a>
                        </li>
                        <li>
                            <a href="#services" className={`nav-item ${activeSection === 'services' ? 'active' : ''}`}>
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#portfolio" className={`nav-item ${activeSection === 'portfolio' ? 'active' : ''}`}>
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#apropos" className={`nav-item ${activeSection === 'apropos' ? 'active' : ''}`}>
                                À Propos
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <button 
                        onClick={onThemeToggle} 
                        className="theme-toggle-btn"
                        aria-label="Toggle light/dark theme"
                    >
                        <i className={currentTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
                    </button>
                    
                    {/* Mobile Menu Icon (Drawer Trigger) */}
                    <button 
                        onClick={toggleMobileMenu} 
                        className="theme-toggle-btn md:hidden"
                        aria-label="Menu"
                    >
                        <i className={mobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-[64px] bg-slate-950/95 backdrop-blur-md z-[90] flex flex-col p-6 md:hidden">
                    <nav className="flex flex-col gap-6 text-lg font-semibold mt-10">
                        <a 
                            href="#accueil" 
                            onClick={toggleMobileMenu}
                            className={`pb-2 border-b border-slate-800 ${activeSection === 'accueil' ? 'text-blue-500' : 'text-slate-300'}`}
                        >
                            Accueil
                        </a>
                        <a 
                            href="#services" 
                            onClick={toggleMobileMenu}
                            className={`pb-2 border-b border-slate-800 ${activeSection === 'services' ? 'text-blue-500' : 'text-slate-300'}`}
                        >
                            Services
                        </a>
                        <a 
                            href="#portfolio" 
                            onClick={toggleMobileMenu}
                            className={`pb-2 border-b border-slate-800 ${activeSection === 'portfolio' ? 'text-blue-500' : 'text-slate-300'}`}
                        >
                            Portfolio
                        </a>
                        <a 
                            href="#apropos" 
                            onClick={toggleMobileMenu}
                            className={`pb-2 border-b border-slate-800 ${activeSection === 'apropos' ? 'text-blue-500' : 'text-slate-300'}`}
                        >
                            À Propos
                        </a>
                        <a 
                            href="#contact" 
                            onClick={toggleMobileMenu}
                            className={`pb-2 border-b border-slate-800 ${activeSection === 'contact' ? 'text-blue-500' : 'text-slate-300'}`}
                        >
                            Contact / Devis
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}

/**
 * Hero Component - Visual intro & stats
 */
/**
 * TerminalEmulator Component - Fully interactive command line emulator
 */
function TerminalEmulator() {
    const [history, setHistory] = useState([
        { cmd: '', output: 'Nexora Labs [Version 3.0.0]\n(c) 2026 Nexora Labs. Tous droits réservés.\nTapez "help" pour voir la liste des commandes disponibles.' }
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
                output = 'Nos services :\n  - Ingénierie Web & Cloud Native (Next.js, AWS)\n  - Applications Mobiles Cross-Platform (Flutter)\n  - Intelligence Artificielle & RAG (OpenAI API)\n  - Cybersécurité & Renseignements OSINT';
                break;
            case 'portfolio':
                output = 'Projets récents :\n  - NexoraShop : E-Commerce & Mobile Money (99.4% succès)\n  - NeuroAnalytics : Dashboard prédictif TensorFlow\n  - Nexus Knowledge Hub : IA conversationnelle RAG (GPT-4)';
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
        <div className="w-full max-w-[440px] bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md font-mono text-xs text-slate-300">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-3 mb-4">
                <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <span className="text-[10px] text-slate-500">nexora-terminal.sh</span>
            </div>
            
            <div className="h-[200px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                {history.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                        {item.cmd && (
                            <div className="flex items-center gap-1.5 text-blue-500">
                                <span>guest@nexora:~$</span>
                                <span>{item.cmd}</span>
                            </div>
                        )}
                        <pre className="whitespace-pre-wrap font-mono text-slate-400">{item.output}</pre>
                    </div>
                ))}
                <div ref={terminalEndRef}></div>
            </div>

            <form onSubmit={handleCommand} className="flex items-center gap-1.5 border-t border-slate-800/80 pt-3 mt-3">
                <span className="text-blue-500">guest@nexora:~$</span>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow bg-transparent text-slate-200 outline-none"
                    autoComplete="off"
                    placeholder="..."
                />
            </form>
        </div>
    );
}

/**
 * Hero Component - Visual intro & stats
 */
function Hero() {
    return (
        <section id="accueil" className="hero-wrapper">
            <div className="grid-layout-2">
                <div className="text-left animate-slide-up">
                    <span className="badge-info">Studio d'Ingénierie Logicielle</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                        Des Systèmes Dédiés à la <span className="text-blue-600 dark:text-blue-500">Croissance</span>
                    </h1>
                    <p className="color-text-secondary text-base md:text-lg mb-8 max-w-xl">
                        Nexora Labs conçoit des architectures applicatives performantes, sécurisées et chiffrées de bout en bout. Nous transformons vos processus d'affaires en infrastructures stables et scalables.
                    </p>
                    <div className="hero-buttons">
                        <a href="#contact" className="btn-action btn-action-primary">
                            <i className="fa-solid fa-sliders"></i> Configurer un projet
                        </a>
                        <a href="#services" className="btn-action btn-action-secondary">
                            <i className="fa-solid fa-layer-group"></i> Nos expertises
                        </a>
                    </div>

                    <div className="stats-layout-grid mt-12">
                        <div className="stat-card">
                            <div className="stat-num">50+</div>
                            <div className="stat-txt">Systèmes Déployés</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-num">30+</div>
                            <div className="stat-txt">Clients Partenaires</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-num">5+ Ans</div>
                            <div className="stat-txt">R&D et Excellence Logicielle</div>
                        </div>
                    </div>
                </div>

                {/* Right Interactive Mockup Terminal Emulator */}
                <div className="relative mt-10 lg:mt-0 flex justify-center items-center">
                    <TerminalEmulator />
                    {/* Shadow behind the mockup */}
                    <div className="absolute w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[80px] -z-10"></div>
                </div>
            </div>
        </section>
    );
}

/**
 * Services Component - Saturated list of capabilities
 */
function Services() {
    const [selectedService, setSelectedService] = useState(null);

    const toggleServiceDetail = (id) => {
        if (selectedService === id) {
            setSelectedService(null);
        } else {
            setSelectedService(id);
        }
    };

    return (
        <section id="services">
            <div className="section-header align-center">
                <span className="subtitle">Ce que nous maîtrisons</span>
                <h2 className="section-title justify-center">
                    <i className="fa-solid fa-gears"></i> Prestations Technologiques
                </h2>
                <p className="section-desc mt-2">
                    Nexora Labs propose des solutions sur-mesure résilientes conçues pour durer, adaptées aux réalités des entreprises modernes.
                </p>
            </div>

            <div className="grid-layout-3 mt-10">
                {SERVICES_DATA.map(serv => (
                    <div key={serv.id} className="service-showcase-card flex flex-col justify-between">
                        <div>
                            <div className="service-icon-box">
                                <i className={serv.icon}></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{serv.title}</h3>
                            <p className="color-text-secondary text-sm leading-relaxed mb-6">
                                {serv.shortDesc}
                            </p>
                        </div>
                        
                        <div>
                            <button 
                                onClick={() => toggleServiceDetail(serv.id)} 
                                className="text-blue-500 hover:text-blue-400 text-sm font-semibold flex items-center gap-1.5"
                            >
                                {selectedService === serv.id ? "Masquer les détails" : "En savoir plus"} 
                                <i className={`fa-solid ${selectedService === serv.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </button>

                            {selectedService === serv.id && (
                                <div className="mt-4 pt-4 border-t border-slate-200/10 dark:border-slate-800/80 text-xs color-text-secondary space-y-3 animate-fade-in">
                                    <p>{serv.longDesc}</p>
                                    <div className="tag-container mb-3">
                                        {serv.stack.map(st => (
                                            <span key={st} className="tag-pill">{st}</span>
                                        ))}
                                    </div>
                                    <div className="border-t border-slate-800 pt-2 space-y-1">
                                        <p><strong>Cibles d'affaires :</strong> {serv.targets}</p>
                                        <p><strong>Délai estimé :</strong> {serv.timeframe}</p>
                                    </div>
                                    <div className="border-t border-slate-800 pt-2">
                                        <strong className="block mb-1 text-slate-400">Livrables contractuels :</strong>
                                        <ul className="list-disc list-inside space-y-1">
                                            {serv.deliverables.map(del => (
                                                <li key={del}>{del}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/**
 * TechStack Component - Detailed lists of tools used
 */
function TechStack() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="bg-slate-900/20 dark:bg-slate-950/30 border-y border-slate-200/10 dark:border-slate-800/80 py-16">
            <div className="section-header align-center">
                <span className="subtitle">Notre Arsenal</span>
                <h2 className="section-title justify-center"><i className="fa-solid fa-code"></i> Technologies & Technologies Compétences</h2>
                <p className="section-desc mt-2">
                    Nous mettons en œuvre les stacks technologiques de référence internationale pour garantir la performance brute et la portabilité de votre code.
                </p>
            </div>

            <div className="mt-8 max-w-4xl mx-auto">
                {/* Horizontal tabs */}
                <div className="portfolio-filter-bar justify-center border-b border-slate-800 pb-3 mb-6">
                    {TECH_STACK_DATA.map((cat, idx) => (
                        <button
                            key={cat.category}
                            onClick={() => setActiveTab(idx)}
                            className={`p-filter-btn ${activeTab === idx ? 'active' : ''}`}
                        >
                            <i className={cat.icon}></i> {cat.category}
                        </button>
                    ))}
                </div>

                {/* Tab content panel */}
                <div className="card animate-fade-in">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <i className={TECH_STACK_DATA[activeTab].icon + " text-blue-500"}></i>
                        {TECH_STACK_DATA[activeTab].category}
                    </h3>
                    <div className="space-y-4">
                        {TECH_STACK_DATA[activeTab].items.map(item => (
                            <div key={item.name} className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/10 dark:border-slate-800/60 pb-3 last:border-b-0 last:pb-0">
                                <strong className="text-slate-100 font-semibold mb-1 md:mb-0 min-w-[140px]">
                                    {item.name}
                                </strong>
                                <span className="color-text-secondary text-sm md:w-3/4">
                                    {item.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Portfolio Component - Case studies and details modal
 */
function Portfolio() {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = filter === 'all' 
        ? PORTFOLIO_DATA 
        : PORTFOLIO_DATA.filter(proj => proj.category === filter);

    return (
        <section id="portfolio">
            <div className="section-header align-center">
                <span className="subtitle">Études de cas réelles</span>
                <h2 className="section-title justify-center"><i className="fa-solid fa-folder-open"></i> Projets Récents & Réalisations</h2>
                <p className="section-desc mt-2">
                    Découvrez une sélection de systèmes logiciels développés et mis en production par Nexora Labs.
                </p>
            </div>

            {/* Filter buttons */}
            <div className="portfolio-filter-bar justify-center mb-8">
                <button onClick={() => setFilter('all')} className={`p-filter-btn ${filter === 'all' ? 'active' : ''}`}>Tous les Projets</button>
                <button onClick={() => setFilter('web')} className={`p-filter-btn ${filter === 'web' ? 'active' : ''}`}>Web & Cloud</button>
                <button onClick={() => setFilter('mobile')} className={`p-filter-btn ${filter === 'mobile' ? 'active' : ''}`}>Mobiles</button>
                <button onClick={() => setFilter('ia')} className={`p-filter-btn ${filter === 'ia' ? 'active' : ''}`}>Intelligence Artificielle</button>
                <button onClick={() => setFilter('security')} className={`p-filter-btn ${filter === 'security' ? 'active' : ''}`}>Sécurité & APIs</button>
            </div>

            {/* Projects Grid */}
            <div className="portfolio-grid-layout mt-10">
                {filteredProjects.map(proj => (
                    <div key={proj.id} className="portfolio-card flex flex-col justify-between animate-fade-in">
                        <div>
                            <div className="portfolio-img">
                                <i className={proj.icon}></i>
                            </div>
                            <div className="portfolio-info">
                                <h3 className="portfolio-title">{proj.title}</h3>
                                <p className="portfolio-desc">{proj.shortDesc || proj.problem.substring(0, 100) + "..."}</p>
                                <div className="tag-container mb-4">
                                    {proj.stack.map(st => (
                                        <span key={st} className="tag-pill">{st}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-0 border-t border-slate-200/5 dark:border-slate-800/40">
                            <button 
                                onClick={() => setSelectedProject(proj)} 
                                className="btn-action btn-action-secondary w-full text-xs"
                            >
                                Consulter l'étude de cas
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for detailed case study view */}
            {selectedProject && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[1000] flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto animate-slide-up shadow-2xl">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <i className={selectedProject.icon + " text-blue-500"}></i>
                                {selectedProject.title}
                            </h3>
                            <button 
                                onClick={() => setSelectedProject(null)} 
                                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                                aria-label="Fermer"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Le Problème</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.problem}</p>
                            </div>
                            
                            <div>
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">La Solution Nexora</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.solution}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Résultats obtenus</h4>
                                <p className="text-slate-300 text-sm leading-relaxed font-semibold text-blue-500">{selectedProject.metrics}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Pile Technologique</h4>
                                <div className="tag-container">
                                    {selectedProject.stack.map(st => (
                                        <span key={st} className="tag-pill text-xs">{st}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end gap-3">
                            <a href="https://github.com" target="_blank" className="btn-action btn-action-secondary text-xs">
                                <i className="fa-brands fa-github"></i> Code Source
                            </a>
                            <button onClick={() => setSelectedProject(null)} className="btn-action btn-action-primary text-xs">
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
 * About & Methodology Component
 */
function About() {
    return (
        <section id="apropos">
            <div className="grid-layout-2 items-start">
                <div className="text-left">
                    <span className="subtitle">Ingénierie & Vision</span>
                    <h2 className="section-title"><i className="fa-solid fa-circle-info"></i> À Propos de Nexora Labs</h2>
                    <p className="color-text-secondary text-sm md:text-base leading-relaxed mb-6">
                        Nexora Labs est un studio d'ingénierie logicielle d'élite fondé par <strong>Blessing Lusakumunu</strong> (Lord Prime Nexus Dev). Nous comblons le fossé entre la vision d'affaires et la haute technicité en construisant des applications web, mobiles et d'intelligence artificielle robustes et chiffrées de bout en bout.
                    </p>
                    <p className="color-text-secondary text-sm md:text-base leading-relaxed mb-6">
                        Notre approche repose sur l'excellence académique et l'application stricte des normes logicielles internationales (OWASP pour la sécurité, architectures microservices évolutives, et performances SEO optimisées sous faible débit réseau).
                    </p>
                    
                    <div className="card p-6 border-l-4 border-l-blue-500 bg-slate-900/10">
                        <strong className="text-slate-100 block mb-2">Notre crédo :</strong>
                        <em className="text-slate-400 text-sm leading-relaxed block">
                            "Le code propre et la sécurité ne sont pas des options optionnelles, ce sont les fondations fondamentales sur lesquelles reposent les services numériques à forte valeur."
                        </em>
                    </div>
                </div>

                <div className="card space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                        <i className="fa-solid fa-list-check text-blue-500"></i>
                        Notre Processus Pro
                    </h3>
                    
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-500 flex-shrink-0">
                            01
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-100 text-sm">Cadrage Technique</h4>
                            <p className="text-xs color-text-secondary mt-1">
                                Rédaction du cahier des charges et modélisation initiale de l'architecture des bases de données et des flux serveurs.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-500 flex-shrink-0">
                            02
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-100 text-sm">Développement Agile</h4>
                            <p className="text-xs color-text-secondary mt-1">
                                Cycles itératifs rapides (Scrum) avec points hebdomadaires et démonstration de modules fonctionnels de test.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-500 flex-shrink-0">
                            03
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-100 text-sm">Assurance Qualité & Pentest</h4>
                            <p className="text-xs color-text-secondary mt-1">
                                Sécurisation active (audit de code) et tests de montée en charge automatisés pour valider la stabilité applicative.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-500 flex-shrink-0">
                            04
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-100 text-sm">Déploiement & Maintenance</h4>
                            <p className="text-xs color-text-secondary mt-1">
                                Mise en ligne progressive sans coupure de service, transfert de compétences et maintenance évolutive (SLA).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Project Calculator & Cost Estimator Component
 */
function ProjectCalculator({ onToastTrigger }) {
    const [projectType, setProjectType] = useState('web');
    const [features, setFeatures] = useState([]);
    const [infra, setInfra] = useState('shared');

    const [complexity, setComplexity] = useState('Modérée');
    const [timeline, setTimeline] = useState('2 - 3 semaines');
    const [architecture, setArchitecture] = useState('Monolithe Modulaire');

    const toggleFeature = (val) => {
        if (features.includes(val)) {
            setFeatures(features.filter(f => f !== val));
        } else {
            setFeatures([...features, val]);
        }
    };

    useEffect(() => {
        let baseWeeks = 0;
        let comp = 'Standard';
        let arch = 'Web API Node.js';

        if (projectType === 'web') {
            baseWeeks = 2.5;
            comp = 'Optimisé';
            arch = 'Monolithe Modulaire Nest.js';
        } else if (projectType === 'mobile') {
            baseWeeks = 4.5;
            comp = 'Avancé';
            arch = 'Cross-platform Mobile Core';
        } else if (projectType === 'ai') {
            baseWeeks = 6.0;
            comp = 'Haute Complexité';
            arch = 'Machine Learning Engine Pipeline';
        } else if (projectType === 'cyber') {
            baseWeeks = 3.5;
            comp = 'Ressources Spécialisées';
            arch = 'Security Compliant Architecture';
        }

        baseWeeks += features.length * 1.2;

        if (features.length >= 4) {
            comp = 'Critique / Multi-tiers';
            arch = 'Distributed Microservices System';
        } else if (features.length >= 2 && comp === 'Optimisé') {
            comp = 'Avancé';
        }

        if (infra === 'cloud') {
            baseWeeks += 1.0;
            arch += ' & AWS Cloud Deployment';
        }

        setComplexity(comp);
        setTimeline(`${Math.floor(baseWeeks)} - ${Math.ceil(baseWeeks + 2)} semaines`);
        setArchitecture(arch);
    }, [projectType, features, infra]);

    const handleSendEstimate = async () => {
        const featureLabels = features.map(f => {
            if (f === 'db') return "Base de données SQL";
            if (f === 'auth') return "Authentification & Profils";
            if (f === 'payment') return "Paiements Mobile Money";
            if (f === 'ai-agent') return "Agent conversationnel IA";
            return f;
        });

        const estimatePayload = {
            type: projectType === 'web' ? 'Application Web' : projectType === 'mobile' ? 'Application Mobile' : projectType === 'ai' ? 'IA Custom' : 'Audits Cybersécurité',
            features: featureLabels,
            infrastructure: infra === 'shared' ? 'VPS Dédié' : 'Cloud Serverless',
            complexity,
            timeline,
            architectureType: architecture
        };

        let dbSaved = false;
        if (typeof saveProjectEstimate === 'function') {
            dbSaved = await saveProjectEstimate(estimatePayload);
        }

        if (dbSaved) {
            onToastTrigger("Estimation sauvegardée dans Firestore !");
        } else {
            onToastTrigger("Sauvegarde locale effectuée (fallback).");
        }

        const waText = `Bonjour Nexora Labs, j'ai configuré un projet sur votre simulateur corporate :
- *Type* : ${estimatePayload.type}
- *Options* : ${featureLabels.join(', ') || 'Standard'}
- *Infra* : ${estimatePayload.infrastructure}
- *Complexité* : ${complexity}
- *Durée* : ${timeline}
- *Architecture* : ${architecture}

Merci d'étudier ce devis de base pour notre futur appel.`;

        const waUrl = `https://wa.me/243994159220?text=${encodeURIComponent(waText)}`;
        
        setTimeout(() => {
            window.open(waUrl, '_blank');
        }, 800);
    };

    return (
        <section className="bg-slate-900/10 dark:bg-slate-950/20 py-16 border-y border-slate-200/10 dark:border-slate-800/80">
            <div className="section-header align-center">
                <span className="subtitle">Simulateur en temps réel</span>
                <h2 className="section-title justify-center"><i className="fa-solid fa-sliders"></i> Configurez Votre Projet</h2>
                <p className="section-desc mt-2">
                    Sélectionnez vos options techniques pour estimer la complexité d'ingénierie et le temps de réalisation.
                </p>
            </div>

            <div className="grid-layout-2 items-stretch mt-8 max-w-4xl mx-auto">
                {/* Form parameters */}
                <div className="card space-y-6">
                    <div>
                        <span className="calc-title block mb-3">Type d'application</span>
                        <div className="flex flex-col gap-2">
                            <label className={`calc-option-box ${projectType === 'web' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="pType" 
                                    checked={projectType === 'web'}
                                    onChange={() => setProjectType('web')}
                                />
                                <span className="calc-indicator"></span>
                                <span>Application Web (Next.js/React)</span>
                            </label>
                            <label className={`calc-option-box ${projectType === 'mobile' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="pType" 
                                    checked={projectType === 'mobile'}
                                    onChange={() => setProjectType('mobile')}
                                />
                                <span className="calc-indicator"></span>
                                <span>Application Mobile (iOS & Android)</span>
                            </label>
                            <label className={`calc-option-box ${projectType === 'ai' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="pType" 
                                    checked={projectType === 'ai'}
                                    onChange={() => setProjectType('ai')}
                                />
                                <span className="calc-indicator"></span>
                                <span>Intelligence Artificielle Custom (LLMs)</span>
                            </label>
                            <label className={`calc-option-box ${projectType === 'cyber' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="pType" 
                                    checked={projectType === 'cyber'}
                                    onChange={() => setProjectType('cyber')}
                                />
                                <span className="calc-indicator"></span>
                                <span>Audits Cybersécurité & Pentest</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <span className="calc-title block mb-3">Options & Intégrations</span>
                        <div className="flex flex-col gap-2">
                            <label className={`calc-option-box ${features.includes('db') ? 'active' : ''}`}>
                                <input 
                                    type="checkbox" 
                                    checked={features.includes('db')}
                                    onChange={() => toggleFeature('db')}
                                />
                                <span className="calc-indicator"></span>
                                <span>Base de données chiffrée</span>
                            </label>
                            <label className={`calc-option-box ${features.includes('auth') ? 'active' : ''}`}>
                                <input 
                                    type="checkbox" 
                                    checked={features.includes('auth')}
                                    onChange={() => toggleFeature('auth')}
                                />
                                <span className="calc-indicator"></span>
                                <span>Authentification Utilisateurs (OIDC/OAuth)</span>
                            </label>
                            <label className={`calc-option-box ${features.includes('payment') ? 'active' : ''}`}>
                                <input 
                                    type="checkbox" 
                                    checked={features.includes('payment')}
                                    onChange={() => toggleFeature('payment')}
                                />
                                <span className="calc-indicator"></span>
                                <span>Intégration Paiement Mobile Money / Cartes</span>
                            </label>
                            <label className={`calc-option-box ${features.includes('ai-agent') ? 'active' : ''}`}>
                                <input 
                                    type="checkbox" 
                                    checked={features.includes('ai-agent')}
                                    onChange={() => toggleFeature('ai-agent')}
                                />
                                <span className="calc-indicator"></span>
                                <span>Module d'IA (Recherche sémantique RAG)</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <span className="calc-title block mb-3">Hébergement cible</span>
                        <div className="grid grid-cols-2 gap-3">
                            <label className={`calc-option-box justify-center ${infra === 'shared' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="infraType" 
                                    checked={infra === 'shared'}
                                    onChange={() => setInfra('shared')}
                                />
                                <span>VPS Dédié</span>
                            </label>
                            <label className={`calc-option-box justify-center ${infra === 'cloud' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="infraType" 
                                    checked={infra === 'cloud'}
                                    onChange={() => setInfra('cloud')}
                                />
                                <span>Cloud Serverless</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Estimation Result */}
                <div className="card flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Indicateurs de développement</h3>
                        <p className="color-text-secondary text-sm leading-relaxed mb-6">
                            Ces métriques sont calculées en fonction de l'effort de conception nécessaire pour livrer une architecture conforme.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm border-b border-slate-800 pb-3">
                                <span className="text-slate-400">Complexité applicative :</span>
                                <strong className="text-blue-500">{complexity}</strong>
                            </div>
                            <div className="flex justify-between text-sm border-b border-slate-800 pb-3">
                                <span className="text-slate-400">Temps de réalisation :</span>
                                <strong className="text-slate-100">{timeline}</strong>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Architecture recommandée :</span>
                                <strong className="text-slate-100 text-right">{architecture}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-800">
                        <button 
                            onClick={handleSendEstimate}
                            className="btn-action btn-action-primary w-full"
                            style={{ backgroundColor: '#25d366', borderColor: '#25d366' }}
                        >
                            <i className="fa-brands fa-whatsapp"></i> Envoyer ce projet sur WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * FAQ Accordion Component
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
        <section className="py-16">
            <div className="section-header align-center">
                <span className="subtitle">Des Questions ?</span>
                <h2 className="section-title justify-center"><i className="fa-solid fa-circle-question"></i> Questions Fréquentes</h2>
                <p className="section-desc mt-2">
                    Retrouvez ici les réponses aux interrogations les plus fréquentes formulées par nos partenaires d'affaires.
                </p>
            </div>

            <div className="max-w-3xl mx-auto mt-8">
                {FAQ_DATA.map((faq, idx) => (
                    <div key={idx} className={`faq-accordion-card ${activeIndex === idx ? 'active' : ''}`}>
                        <button 
                            onClick={() => toggleAccordion(idx)} 
                            className="faq-accordion-header"
                            aria-expanded={activeIndex === idx ? 'true' : 'false'}
                        >
                            <span>{faq.q}</span>
                            <span className="faq-accordion-chevron"><i className="fa-solid fa-plus"></i></span>
                        </button>
                        <div 
                            className="faq-accordion-body" 
                            style={{ maxHeight: activeIndex === idx ? '300px' : '0' }}
                        >
                            <p>{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/**
 * Contact Form & Information Component (Connected to Firebase Firestore)
 */
function Contact({ onToastTrigger }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const contactPayload = {
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim()
        };

        let isSaved = false;
        if (typeof saveContactMessage === 'function') {
            isSaved = await saveContactMessage(contactPayload);
        }

        setLoading(false);

        if (isSaved) {
            onToastTrigger(`Merci ${name}, votre message a bien été envoyé !`);
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } else {
            onToastTrigger("Erreur réseau Firestore. Données sauvegardées en local.");
        }
    };

    return (
        <section id="contact" className="py-16">
            <div className="section-header align-center">
                <span className="subtitle">Entretien & Analyse</span>
                <h2 className="section-title justify-center"><i className="fa-solid fa-envelope"></i> Travaillons Ensemble</h2>
                <p className="section-desc mt-2">
                    Prêt à lancer vos développements ? Contactez notre équipe par formulaire ou via nos canaux de communication directs.
                </p>
            </div>

            <div className="contact-layout-split mt-8">
                {/* Contact info links card */}
                <div className="card space-y-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b border-slate-800 pb-3">Canaux Directs</h3>
                        <p className="color-text-secondary text-sm leading-relaxed mb-6">
                            Pour toute demande de collaboration technique, contactez directement Blessing Lusakumunu.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Adresse E-mail</span>
                                    <a href="mailto:nexoralabss@gmail.com" className="font-semibold text-slate-100 text-sm">nexoralabss@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Ligne WhatsApp</span>
                                    <a href="https://wa.me/243994159220" target="_blank" className="font-semibold text-slate-100 text-sm">+243 994 159 220</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                    <i className="fa-solid fa-map-location-dot"></i>
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Localisation R&D</span>
                                    <span className="font-semibold text-slate-100 text-sm">Kinshasa, Rép. Démocratique du Congo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-4 text-xs color-text-secondary">
                        <p>Nos ingénieurs vous répondent sous un délai maximum de 24h ouvrées.</p>
                    </div>
                </div>

                {/* Form fields */}
                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label htmlFor="contactName">Nom Complet</label>
                                <input 
                                    type="text" 
                                    id="contactName" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                    placeholder="Ex: Jean Dupont"
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactEmail">Adresse E-mail</label>
                                <input 
                                    type="email" 
                                    id="contactEmail" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    placeholder="Ex: jean@entreprise.com"
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactSubject">Sujet du Projet</label>
                            <input 
                                type="text" 
                                id="contactSubject" 
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required 
                                placeholder="Ex: Devis pour intégration de pipeline IA"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactMessage">Cahier des charges ou description rapide</label>
                            <textarea 
                                id="contactMessage" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required 
                                rows="4" 
                                placeholder="Décrivez succinctement vos besoins et contraintes techniques..."
                                className="form-input"
                                style={{ resize: 'none' }}
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="btn-action btn-action-primary w-full"
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
 * Corporate Footer Component
 */
function Footer() {
    return (
        <footer className="footer-wrapper">
            <div className="container">
                <div className="footer-columns-layout">
                    <div className="mb-6 md:mb-0">
                        <div className="footer-logo text-xl font-bold mb-3">&lt;NEXORA<span>/</span>&gt;</div>
                        <p className="color-text-secondary text-xs leading-relaxed max-w-xs mb-4">
                            Studio d'ingénierie logicielle d'élite pour les entreprises. Conception de systèmes Web, mobiles et d'agents d'intelligence artificielle robustes.
                        </p>
                        <div className="flex gap-2.5">
                            <a href="https://github.com" target="_blank" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:text-blue-500">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="https://wa.me/243994159220" target="_blank" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:text-blue-500">
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-4 text-slate-200">Services</h4>
                        <ul className="space-y-2 text-xs color-text-secondary">
                            <li><a href="#services">Ingénierie Web & Cloud</a></li>
                            <li><a href="#services">Applications Mobiles</a></li>
                            <li><a href="#services">Intelligence Artificielle</a></li>
                            <li><a href="#services">Audits de Cybersécurité</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-4 text-slate-200">Studio</h4>
                        <ul className="space-y-2 text-xs color-text-secondary">
                            <li><a href="#apropos">À Propos</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#contact">Contact Direct</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-4 text-slate-200">Légal</h4>
                        <ul className="space-y-2 text-xs color-text-secondary">
                            <li><a href="#">Politique RGPD</a></li>
                            <li><a href="#">Mentions Légales</a></li>
                            <li><a href="#">Conditions d'Usage</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200/5 dark:border-slate-800/40 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>&copy; 2026 Nexora Labs. Tous droits réservés.</p>
                    <p>Architecturé par <strong>Lord Prime Nexus Dev</strong> | RDC - Kinshasa</p>
                </div>
            </div>
        </footer>
    );
}

// ==========================================================================
// MAIN ROOT COMPONENT MOUNT ENGINE
// ==========================================================================
function App() {
    const [theme, setTheme] = useState('dark');
    const [activeSection, setActiveSection] = useState('accueil');
    const [toastMessage, setToastMessage] = useState('');
    const [toastActive, setToastActive] = useState(false);

    // Dynamic toast notification trigger
    const triggerToast = (message) => {
        setToastMessage(message);
        setToastActive(true);
        setTimeout(() => {
            setToastActive(false);
        }, 4000);
    };

    // Scroll section active state tracker
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 120;
            const sectionsList = ['accueil', 'services', 'portfolio', 'apropos', 'contact'];

            for (let i = 0; i < sectionsList.length; i++) {
                const el = document.getElementById(sectionsList[i]);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(sectionsList[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Theme toggler logic handler
    const handleThemeToggle = () => {
        const body = document.body;
        if (theme === 'dark') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            setTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Load initial theme on mount
    useEffect(() => {
        const localTheme = localStorage.getItem('theme') || 'dark';
        setTheme(localTheme);
        const body = document.body;
        if (localTheme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        }
        
        // Remove static loader once mounted
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 600);
        }
    }, []);

    return (
        <React.Fragment>
            {/* Header / Nav */}
            <Header 
                currentTheme={theme} 
                onThemeToggle={handleThemeToggle} 
                activeSection={activeSection}
            />

            {/* Core Body Sections container */}
            <main className="container">
                <Hero />
                <Services />
                <TechStack />
                <Portfolio />
                <About />
                <ProjectCalculator onToastTrigger={triggerToast} />
                <FAQ />
                <Contact onToastTrigger={triggerToast} />
            </main>

            {/* Mobile Bottom Tab Bar Navigation */}
            <nav className="bottom-navigation">
                <a href="#accueil" className={`bottom-navigation-item ${activeSection === 'accueil' ? 'active' : ''}`}>
                    <i className="fa-solid fa-house"></i>
                    <span>Accueil</span>
                </a>
                <a href="#services" className={`bottom-navigation-item ${activeSection === 'services' ? 'active' : ''}`}>
                    <i className="fa-solid fa-gears"></i>
                    <span>Services</span>
                </a>
                <a href="#portfolio" className={`bottom-navigation-item ${activeSection === 'portfolio' ? 'active' : ''}`}>
                    <i className="fa-solid fa-folder-open"></i>
                    <span>Portfolio</span>
                </a>
                <a href="#apropos" className={`bottom-navigation-item ${activeSection === 'apropos' ? 'active' : ''}`}>
                    <i className="fa-solid fa-circle-info"></i>
                    <span>À Propos</span>
                </a>
                <a href="#contact" className={`bottom-navigation-item ${activeSection === 'contact' ? 'active' : ''}`}>
                    <i className="fa-solid fa-sliders"></i>
                    <span>Devis</span>
                </a>
            </nav>

            {/* Footer */}
            <Footer />

            {/* Toast Notification Container */}
            <div className={`toast-alert ${toastActive ? 'active' : ''}`}>
                <i className="fa-solid fa-circle-check"></i>
                <span>{toastMessage}</span>
            </div>
        </React.Fragment>
    );
}

// Mount the compiled component inside the DOM wrapper
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
