import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	return hash;
};

export const verifyPassword = (password: string, hash: string): boolean => {
	return bcrypt.compareSync(password, hash);
};
