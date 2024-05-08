  import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star  } from "../assets";

  import btcImage from '../assets/btc.png';
  import usdtImage from '../assets/usdt.png';
  import ethImage from '../assets/eth.png';
  import usdcImage from '../assets/usdc.png';
  

  export const navLinks = [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "features",
      title: "Features",
    },
    {
      id: "product",
      title: "Product",
    },
    {
      id: "clients",
      title: "Clients",
    },
   
  ];

  export const features = [
    {
      id: "feature-1",
      icon: btcImage,
      title: "BTC",
      content: "Primera criptomoneda, ideal para inversores que buscan estabilidad y reconocimiento.",
    },
    {
      id: "feature-2",
      icon: usdtImage,
      title: "USDT",
      content: "Criptomoneda estable vinculada al dólar, garantiza seguridad en transacciones.",
    },
    {
      id: "feature-3",
      icon: ethImage,
      title: "ETH",
      content: "Plataforma líder para contratos inteligentes y desarrollos descentralizados.",
    },
    {
      id: "feature-4",
      icon: usdcImage,
      title: "USDC",
      content: "Estable, segura y completamente respaldada por dólares; ideal para inversores cautelosos.",
    },
  ];
  

  //¿porque activos digitales?
  export const feedback = [
    {
      id: "feedback-1",
      content:
        "Protegemos tus activos digitales con tecnología de punta y cumplimiento de normativas vigentes",
      name: "Seguridad",
      title: "Founder & Leader",
     // img: people01,
    },
    {
      id: "feedback-2",
      content:
        "Brindamos formación continua sobre criptomonedas, desde conceptos básicos hasta estrategias avanzadas.",
      name: "Educación",
      title: "Founder & Leader",
      //img: people02,
    },
    {
      id: "feedback-3",
      content:
        "Nuestros expertos te guían en cada paso del camino, asegurando una experiencia de inversión superior.",
      name: "Experiencia",
      title: "Founder & Leader",
      //img: people03,
    },
  ];

  export const stats = [
    {
      id: "stats-1",
      title: "Educación",
      value: "+",
    },
    {
      id: "stats-2",
      title: "Comercio",
      value: "+",
    },
    {
      id: "stats-3",
      title: "Criptomonedas",
      value: "+",
    },
  ];

  export const footerLinks = [
    {
      title: "Preguntas Frecuentes",
      links: [
        {
          name: "Ayuda y Soporte",
          link: "https://www.hoobank.com/content/",
        },
        {
          name: "Seguridad Garantizada",
          link: "https://www.hoobank.com/how-it-works/",
        },
        {
          name: "Sobre Nosotros",
          link: "https://www.hoobank.com/create/",
        },
        {
          name: "Cómo Funciona",
          link: "https://www.hoobank.com/explore/",
        },
        {
          name: "Compromiso Seguro",
          link: "https://www.hoobank.com/terms-and-services/",
        },
      ],
    },
    {
      title: "Departamentos",
      links: [
        {
          name: "Luna Coworking",
          link: "https://www.hoobank.com/help-center/",
        },
        {
          name: "Bitppi",
          link: "https://www.hoobank.com/partners/",
        },
        {
          name: "Finanzas en la Luna",
          link: "https://www.hoobank.com/suggestions/",
        },
        {
          name: "Blog",
          link: "https://www.hoobank.com/blog/",
        },
        {
          name: "Crypto Luna",
          link: "https://www.hoobank.com/newsletters/",
        },
      ],
    },
    {
      title: "Contacto",
      links: [
        {
          name: "WhatsApp",
          link: "https://www.hoobank.com/our-partner/",
        },
        {
          name: "Ubicación",
          link: "https://www.hoobank.com/become-a-partner/",
        },
      ],
    },
  ];

  export const socialMedia = [
    {
      id: "social-media-1",
      icon: instagram,
      link: "https://www.instagram.com/activosdig/",
    },
    {
      id: "social-media-2",
      icon: facebook,
      link: "https://web.facebook.com/ActivosDig",
    },
    {
      id: "social-media-3",
      icon: twitter,
      link: "https://twitter.com/ActivosDig",
    },

  ];

  export const clients = [
    {
      id: "client-1",
      logo: airbnb,
    },
    {
      id: "client-2",
      logo: binance,
    },
    {
      id: "client-3",
      logo: coinbase,
    },
    {
      id: "client-4",
      logo: dropbox,
    },
  ];