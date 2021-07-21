import { IFileHandler } from "../../interfaces/ifilehandler";
import { buildLogger } from "../../utils/logger";
const logger = buildLogger("decorator:filehandler");

interface FileHandlerDescriptor {
  [key: string]: any[];
}

const registeredFileHandlers: FileHandlerDescriptor = {};

export const RegisterFileHandler = (extension: string) => {
  return (ctor: any) => {
    logger.info(
      `Register file handler for extension ${extension} - ${
        new ctor().constructor.name
      }`
    );
    if (!registeredFileHandlers[extension]) {
      registeredFileHandlers[extension] = [];
    }
    registeredFileHandlers[extension].push(ctor);
  };
};

const newFileHandlers = (extension: string) => {
  const outArray: IFileHandler[] = [];
  const ctors = registeredFileHandlers[extension];
  if (ctors) {
    for (const c of ctors) {
      try {
        outArray.push(new c() as IFileHandler);
      } catch (e) {
        logger.error(`Error during intializing ${c}`, e);
      }
    }
  }
  return outArray;
};

const canProcessExtension = (ext: string) => {
  return registeredFileHandlers[ext] !== undefined;
};

export const fileHandlerFactory = {
  newFileHandlers,
  canProcessExtension,
};
