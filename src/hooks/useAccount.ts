import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';

type User = {
	id: string;
	first_name: string;
	email_address: string;
	hashed_password: string;
};

const useAccount = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const path = useLocation();

	useLayoutEffect(() => {
		try {
			const _user = localStorage.getItem('user');
			setUser(_user);
		} catch (err) {
			navigate(`/auth/sign-in?return_url=${path.pathname}`);
		}
	}, [navigate, path.pathname]);

	return user;
};

export default useAccount;
