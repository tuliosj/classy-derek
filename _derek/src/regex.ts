export default {
  derek: /derek/i,
  meme: {
    find: /(meme)|(caption)/i,
    syntax: /(meme)|(caption).*\[.*\].*\(.*\)/i,
    top: /(?<=\[).*(?=\])/i,
    bottom: /(?<=\().*(?=\))/i,
    rest: /(?<=\(.*\)).*/i,
  },
  user: /(config)|(pref)/i,
};
