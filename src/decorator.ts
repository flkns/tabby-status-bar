import {
	BaseSession,
	BaseTerminalTabComponent,
	TerminalDecorator,
} from 'tabby-terminal';
import { Injectable } from '@angular/core';
import { StatusBar_Service } from './services/status-bar.service';
import { bufferTime } from 'rxjs/operators';

/** @hidden */
@Injectable()
export class StatusBar_Decorator extends TerminalDecorator {
	constructor(public statusBar: StatusBar_Service) {
		super();
		console.log('loading terminal decorator...');
	}

	attach(tab: BaseTerminalTabComponent): void {
		tab.input$.pipe(bufferTime(3000)).subscribe((buffers: Buffer[]) => {
			// if (Buffer.concat(buffers).toString().includes('ls\r')) {
			// 	tab.setTitle('test123');
			// }
			console.log(Buffer.concat(buffers).toString());
		});

		tab.sessionChanged$.subscribe((session) => {
			if (session) {
				this.attachToSession(session);
			}
		});
		if (tab.session) {
			this.attachToSession(tab.session);
		}
	}

	private attachToSession(session: BaseSession) {
		session.output$.subscribe((data) => {
			console.log(data);
		});
	}
}
