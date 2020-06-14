type localeIndex = {
  [key: string]: {
    meme: { missingImage: string; syntaxExample: string };
    userController: {
      expired: string;
      prompt: string;
      saved: (name: string) => string;
    };
    default_responses: string[];
  };
};

const i18n: localeIndex = {
  en_US: {
    meme: {
      missingImage: "Derek needs image for meme.",
      syntaxExample:
        "Derek only works with something like: `derek meme [top text] (bottom text) something you might want me to repeat`.",
    },
    userController: {
      expired:
        "Configuration expired. You can configurate again with `derek config`!",

      prompt:
        "Hi! I'm Derek! This is our configuration chat.\nPlease react with your language preference.",
      saved: (name: string) => {
        return `Preferences saved for ${name}`;
      },
    },
    default_responses: ["Derek?", "DEEEREK!", "Derek!", "Derek...", "derek"],
  },
  pt_BR: {
    meme: {
      missingImage:
        "Derek precisa de imagem para fazer memes legais igual aos jovens.",
      syntaxExample:
        "Derek só funciona se você especificar: `derek meme [texto de cima] (texto de baixo) qualquer coisa pro Derek repetir`.",
    },
    userController: {
      expired:
        "Configuração expirada. Você pode configurar novamente usando `derek config`!",
      prompt:
        "Oi! Eu sou o Derek! E agora você está me configurando.\nPor favor reaja com a sua preferência de linguagem.",
      saved: (name: string) => {
        return `Preferências salvas para ${name}`;
      },
    },
    default_responses: ["Derek?", "DEEEREK!", "Derek!", "Derek...", "derek"],
  },
};

export default i18n;
