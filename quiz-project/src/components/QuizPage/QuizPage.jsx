import { Link } from 'react-router-dom';
import quizzes from '../../quiz.json'

import './QuizPage.css'

function QuizPage() {
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

export default QuizPage;