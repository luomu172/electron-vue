
export function isDevEnv () {
  return BUILD_ENV.trim() === 'dev';
}

export function isTestEnv () {
  return BUILD_ENV.trim() === 'test';
}

export function isTestPrd () {
  return BUILD_ENV.trim() === 'prd';
}
