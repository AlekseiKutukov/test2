const mockServer = (code, language) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Имитация обработки запроса
      const mockData = {
        javascript: {
          "console.log('Heello World')": 'Hello, World!',
        },
        python: {
          "print('Hello, world!')": 'Hello, world!',
        },
      };

      // Имитируем успешный ответ
      const output = mockData[language]?.[code]
        ? mockData[language][code]
        : 'Error: Code not recognized';

      // Возвращаем результат
      resolve({ output });
    }, 1000); // 1 секунда задержки
  });
};

export default mockServer;
