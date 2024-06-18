// for protected routing where neccesary
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  
  return (props) => {
    const router = useRouter();
    const {user} = useContext(AuthContext)
    const isAuthenticated = user?true:false; // Replace with your authentication check logic

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
