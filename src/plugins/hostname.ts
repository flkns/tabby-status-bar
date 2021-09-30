// eslint-disable-next-line unicorn/prefer-node-protocol
import os from 'os';

export default class HostName {
	static displayName(): string {
		return 'hostname';
	}

	get(): { hostname: string; username: string } {
		const hostname = os.hostname();
		const username = process.env.USER;

		return { hostname, username };
	}
}
