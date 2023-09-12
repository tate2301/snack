import React, { createContext, useState } from 'react';
import { User } from '../lib/types';
import { hashPassword, verifyPassword } from '../lib/auth-utils';
import { generateUUID } from '../lib/functions';
import { motion } from 'framer-motion';

export type AuthContextData = {
	user: User | null;
	login: (password: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContextProvider = (props: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = async (password: string) => {
		if (verifyPassword(password, hashPassword('2301'))) {
			setUser({
				avatar: 'https://avatars.githubusercontent.com/u/44907289?v=4',
				fullname: 'Rishabh Anand',
				email: 'tate@2301',
				id: generateUUID(),
			});

			return true;
		}

		return false;
	};

	return (
		<AuthContext.Provider
			value={{ user: null, login: async () => {}, logout: async () => {} }}>
			{!!user && <Login login={login} />}

			{!user && props.children}
		</AuthContext.Provider>
	);
};

export { AuthContextProvider };

export default AuthContext;

function Login(props: { login: (password: string) => Promise<boolean> }) {
	const onSubmit = (e) => {
		e.preventDefault();
		props
			.login(e.target.password.value)
			.then((success) => !success && alert('Wrong password'));
		return;
	};
	return (
		<div className="flex fixed flex-col items-center justify-center bg-zinc-200 w-screen z-[9000] h-screen top-0 left-0">
			<div className="flex flex-col gap-8 p-8 bg-white bg-opacity-30 backdrop-blur rounded-xl">
				<p className="text-xl uppercase text-surface-11">
					Authentication point
				</p>
				<form
					onSubmit={onSubmit}
					className="flex flex-col justify-center gap-4 w-[32rem]">
					<input
						type="password"
						name="password"
						placeholder="Enter your passphrase"
						className="w-full p-4 border-none outline-none bg-zinc-900 focus:bg-white bg-opacity-10 ring-warning-2 rounded-xl"
					/>
					<button
						type="submit"
						className="flex items-center justify-center p-4 uppercase w-fit bg-warning-10 rounded-xl text-surface-12">
						Authenticate
					</button>
				</form>
			</div>
		</div>
	);
}
