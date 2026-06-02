const logger = {
  info: (...params: unknown[]) => console.info('[INFO]', ...params),
  warn: (...params: unknown[]) => console.warn('[WARN]', ...params),
  error: (...params: unknown[]) => console.error('[ERROR]', ...params)
};

export default logger;
