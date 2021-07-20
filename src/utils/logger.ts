import pino from "pino";
export const buildLogger = (name: string): pino.Logger =>{
  return pino({name});
}