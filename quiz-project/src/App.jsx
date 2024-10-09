import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Quiz from './components/Quiz';
import quizzes from './quiz.json'
import './App.css'

function Navigation() {
  return (
    <nav>
      <ul className='list-reset nav'>
        <p className='list-nav-title'>Выберите квиз:</p>
        {quizzes.map((quiz) => (
        <li className='list-nav-item' key={quiz.id}>
          <Link className='list-nav-item-link' to={`/quiz/${quiz.id}`} href="">{quiz.quiz_name}</Link>
        </li>
        ))}
      </ul>
    </nav>
  )
}

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith('/quiz/') ? null : <Navigation />}
      <Routes>
        <Route path='/quiz/:id' element={<Quiz />} />
      </Routes>
    </> 
);
}

export default App;
