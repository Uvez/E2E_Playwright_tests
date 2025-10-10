export const log = {
  step: (msg: string) => console.log(`[STEP] ${msg}`),
  info: (msg: string) => console.log(`[INFO] ${msg}`),
  warn: (msg: string) => console.warn(`[WARN] ${msg}`)
};