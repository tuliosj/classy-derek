export default {
  derek: /derek/i,
  meme: {
    find: /(meme)|(caption)/i,
    syntax: /(meme)|(caption).*\[.*\].*\(.*\)/i,
    top: /(?<=\[).*(?=\])/i,
    bottom: /(?<=\().*(?=\))/i,
    rest: /(?<=\(.*\)).*/i,
  },
  server: /(server.*config)|(config.*server)|(server.*pref)|(pref.*server)/i,
  user: /(config)|(pref)/i,
};
