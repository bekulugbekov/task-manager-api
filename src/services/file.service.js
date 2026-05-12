import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

class FileService {
  save(file) {
    try {
      const fileName = uuidv4() + ".jpg";
      const filePath = path.resolve("static", fileName);

      if (!fs.existsSync("static")) {
        fs.mkdirSync("static");
      }

      file.mv(filePath);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
  delete(fileName) {
    try {
      const filePath = path.resolve("static", fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      console.log("Faylni o'chirishda xato:", e);
    }
  }
}

export default new FileService();
