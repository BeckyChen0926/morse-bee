// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/morse-bee/" : "/",
// };

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'docs/index.html',
      filename: 'index.html',
      title: 'Game',
      publicPath: process.env.NODE_ENV === 'production' ? '/morse-bee/' : '/',
    },
    quiz: {
      entry: 'src/testquiz.js',
      template: 'docs/quiz.html',
      filename: 'quiz.html',
      title: 'Quiz',
      publicPath: process.env.NODE_ENV === 'production' ? '/morse-bee/' : '/',
    },
  },
};


