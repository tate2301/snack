class RollingOnetimePasscode {
	private window: number;
	private seed: string;

	constructor(window: number, seed: string) {
		this.window = window;
		this.seed = seed;
	}

	public generate = (): string => {
		return '';
	};

	public validate = (code: string): boolean => {
		return false;
	};

	public getSeed = (): string => {
		return '';
	};

	public getWindow = (): number => {
		return 0;
	};
}
