import { Navigate, useLocation } from 'react-router';

export const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
    //state нужен для того, если в url вводим приватный маршрут /contacts,
    //то после того, как нас переводят на страницу /login и после того, как мы авторизовались, нас
    //переводило на изначально запрашиваемую стриницу /contacts (может быть любой другой приватный маршрут)
    //Вот так должно быть написано в компоненте с авторизацией, куда переводят при маршруте /login
    //let from = location.state?.from?.pathname || '/'
    // navigate(from);
    //но тут это не используется, так как приватный маршрут только 1
  }

  return children;
};
