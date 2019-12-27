export default {
  input: './dist/index.js',
  output: {
    format: 'umd',
    indent: '\t',
  },
  watch: {
    include: './dist/**',
  },
};
