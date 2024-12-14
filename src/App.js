import { useState } from 'react';
import mockServer from './components/mockServer';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/theme/dracula.css';
import './App.css';

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRunCode = () => {
    setLoading(true); // Устанавливаем статус загрузки

    // Вызов мок-сервера
    mockServer(code, language)
      .then((data) => {
        setOutput(data.output); // Отображаем результат
        setLoading(false); // Снимаем статус загрузки
      })
      .catch((error) => {
        setOutput('Error: ' + error.message);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Редактор кода</h1>
      <h2>Задание:</h2>
      <div className="task">
        Тут должно быть описание задачи. Тут должно быть описание задачи. Тут
        должно быть описание задачи. Тут должно быть описание задачи. Тут должно
        быть описание задачи.Тут должно быть описание задачи. Тут должно быть
        описание задачи. Тут должно быть описание задачи. Тут должно быть
        описание задачи. Тут должно быть описание задачи.
      </div>
      <h2>Решение:</h2>
      <ControlledEditor
        value={code}
        options={{
          mode: language, // Режим подсветки зависит от выбранного языка
          theme: 'dracula', // Тема редактора
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value); // Обновляем код в состоянии
        }}
      />
      <div className="select-language">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>
      <button onClick={handleRunCode} disabled={loading}>
        {loading ? 'Running...' : 'Run'}
      </button>

      <div>
        <h2>Результат:</h2>
        <pre className="outlput">{output}</pre>
      </div>
    </div>
  );
};

export default App;
