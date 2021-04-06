module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'eslint-config-prettier'],
    plugins: ['eslint-plugin-prettier'],
    env: {
        es6: true,
        node: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true // permite a eslint analizar los archivos jsx o tsx
        }
    },
    rules: {
        'prettier/prettier': 'error'
    },
    ignorePatterns: ['/node_modules/**', '/build/**'],
    settings: {
        react: {
            version: 'detect' // para detectar la versión de reactjs
        }
    }
};
