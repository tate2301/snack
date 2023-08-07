import Image from 'next/image';

export default function SignIn() {
	return (
		<main className="h-full w-full flex justify-center items-center bg-stone-100">
			<div className="p-8 flex flex-col gap-8 w-[32rem] rounded-xl shadow-sm bg-white">
				<div>
					<Image
						src={'/app-logo.png'}
						alt={'Snack Logo'}
						height={40}
						width={40}
					/>
					<h2 className="text-xl font-bold text-zinc-950 mt-4">
						Sign in to your account
					</h2>
					<p className="mt-1">
						We are currently in closed beta. If you would like to join, please
						email{' '}
						<a
							href="mailto:tatendachris@gmail.com"
							className="font-bold underline">
							Tatenda
						</a>
						.
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<div>
						<label
							htmlFor="email"
							className="uppercase text-zinc-400">
							Email address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							autoComplete="off"
							className="w-full border border-zinc-200 rounded-lg px-4 py-2 mt-1"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="uppercase text-zinc-400">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							autoComplete="off"
							className="w-full border border-zinc-200 rounded-lg px-4 py-2 mt-1"
						/>
					</div>
				</div>
				<button className="py-2 px-4 font-bold bg-zinc-950 text-white flex justify-center rounded-xl">
					<span>Sign in</span>
				</button>
			</div>
		</main>
	);
}
