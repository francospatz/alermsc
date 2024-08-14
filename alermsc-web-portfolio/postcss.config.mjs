/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    'postcss-nested': {
      unwrap: ['screen'],
    },
    tailwindcss: {},
    autoprefixer: {},
  }
};

export default config;
