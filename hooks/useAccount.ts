import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';

type User = {
	id: string;
	first_name: string;
	email_address: string;
	hashed_password: string;
};

const useAccount = () => {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useLayoutEffect(() => {
		try {
			const _user = localStorage.getItem('user');
			setUser(_user);
		} catch (err) {
			router.push(`/auth/sign-in?return_url=${router.pathname}`);
		}
	}, []);

	return user;
};

export default useAccount;
