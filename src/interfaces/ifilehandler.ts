import { IFileScanResult } from "../services/scan.service";

export interface IFileHandler {
  processFile(file: IFileScanResult): Promise<void>;
}
