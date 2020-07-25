/**
 * process字段的操作
 */
const { env } = process;

// 是本地开发环境
export function isLocalEnv () {
  return env.NODE_ENV === 'development';
}

// 不是本地开发环境
export function isNotLocalEnv () {
  return !isLocalEnv();
}

export function isTestEnv () {
  return BUILD_ENV === 'test';
}

export function isPreEnv () {
  return BUILD_ENV === 'pre';
}

export function isMasterEnv () {
  return BUILD_ENV === 'prd';
}

// 获取客户端的版本号
export function getClientVersion () {
  return process.env.npm_package_version;
}
