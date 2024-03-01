import { MD5, enc } from 'crypto-js';
export const getChecksum = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Проверка наличия файла
    if (!file) {
      reject(new Error('File is missing'));
      return;
    }

    const reader = new FileReader();

    // Обработка ошибок чтения файла
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    // Обработка успешного чтения файла
    reader.onload = function (e) {
      try {
        const data = e.target?.result;
        if (typeof data === 'string' || data instanceof ArrayBuffer) {
          // Вычисление MD5 хеша данных файла
          const wordArray = MD5(data as string); // Преобразование данных в строку и вычисление MD5 хеша
          const checksum = wordArray.toString(enc.Hex); // Преобразование MD5 хеша в строку в шестнадцатеричном формате
          resolve(checksum);
        } else {
          // Отклонение, если данные файла не являются строкой или ArrayBuffer
          reject(new Error('File data is not a string or an ArrayBuffer'));
        }
      } catch (error) {
        reject(error); // Отклонение, если произошла ошибка при вычислении MD5 хеша
      }
    };

    // Чтение файла как строки байтов
    reader.readAsBinaryString(file);
  });
};
