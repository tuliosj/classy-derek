export default {
  derek: /derek/i,
  meme: {
    find: /meme/i,
    syntax: /meme.*\[.*\].*\(.*\)/i,
    top: /(?<=\[).*(?=\])/i,
    bottom: /(?<=\().*(?=\))/i,
    rest: /(?<=\(.*\)).*/i,
  },
};
