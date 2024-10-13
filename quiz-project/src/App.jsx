import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import QuizPage from './components/QuizPage/QuizPage';
import Quiz from './components/Quiz/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<QuizPage />} />
        <Route path='/quiz/:id' element={<Quiz />} />
      </Routes>
    </Router>
);
}

export default App;