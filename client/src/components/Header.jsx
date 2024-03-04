import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>Inicio</li>
          </Link>
          <Link to='/about'>
            <li>Acerca</li>
          </Link>
          <Link to='/course/all'>
            <li>Cursos</li>
          </Link>
          { currentUser.isAdmin && (
          <Link to='/course/create'>
            <li>Crear Curso</li>
          </Link>

          )}
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>Ingresar</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
