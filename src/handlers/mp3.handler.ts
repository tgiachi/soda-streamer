import { IFileHandler } from "../interfaces/ifilehandler";
import { RegisterFileHandler } from "../types/decorators/filehandler.decorator";

@RegisterFileHandler("mp3")
export class MP3FileHandler implements IFileHandler {}
