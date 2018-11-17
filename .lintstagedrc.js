module.exports = {
  '*.js': ['yarn prettier --write', 'git add'],
  '*.md': ['yarn prettier --write --parser markdown', 'git add'],
  '*.less': ['yarn prettier --write --parser less --write', 'git add'],
  '**/package.json': [
    'yarn prettier-package-json --write',
    'yarn prettier --write --parser json',
    'git add',
  ],
};
