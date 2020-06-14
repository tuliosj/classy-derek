type localeIndex = {
  [key: string]: {
    help: string;
    guildController: {
      expired: string;
      hi: string;
      prompt: string;
      saved: string;
      unauthorized: string;
    };
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
    help: "Syke! There's nothing here.",
    guildController: {
      expired:
        "Configuration expired. You can configurate again with `derek config`!",
      hi:
        "Hi! I'm Derek! Precisely, I'm Classy Derek. Because I drink \"Classy Cocktails\".\nWant to know more about me? You just have to:\n>>> 1. Let me bring you to my endless void; alone. Or\n2. Type in `derek help me pleasei beg you`\n3. Or read the docs: http://tuliosj.github.io/classy-derek",
      prompt:
        "Hi! I'm Derek! This is our configuration chat.\nPlease react with your language preference.",
      saved: "Preferences saved to the server.",
      unauthorized: "You don't have the server manage permissions.",
    },
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
        return `Preferences saved for ${name}.`;
      },
    },
    default_responses: ["Derek?", "DEEEREK!", "Derek!", "Derek...", "derek"],
  },
  pt_BR: {
    help: "Ih a lá! Tá querendo ajudinha...",
    guildController: {
      expired:
        "Configuração expirada. Você pode configurar novamente usando `derek server config`!",
      hi:
        'Oi! Eu sou o Derek! Mais precisamente, sou o Classy Derek. Porque eu bebo "Classy Cocktails".\nQuer saber mais sobre mim? Você só precisa de:\n>>> 1. Me pagar um café.\n2. Ou digitar `derek help me please i beg you`.\n3. Ou ler a documentação: http://tuliosj.github.io/classy-derek',
      prompt:
        "Oi! Eu sou o Derek! E agora você está me configurando.\nPor favor reaja com a sua preferência de linguagem.",
      saved: "Preferências salvas para o servidor.",
      unauthorized: "Você não possui a permissão para gerenciar esse servidor.",
    },
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
        return `Preferências salvas para ${name}.`;
      },
    },
    default_responses: ["Derek?", "DEEEREK!", "Derek!", "Derek...", "derek"],
  },
};

export default i18n;
