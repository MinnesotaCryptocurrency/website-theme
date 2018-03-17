export class Typewriter {
    private callback: (text: string) => any;
    private delay: number;
    private jitter: number;
    private timeouts: number[];

    private _targetText: string;
    private _progress: string;

    public constructor (callback: (text: string) => any, delay: number = 100, jitter: number = 0) {
        this.callback = callback;
        this.delay = delay;
        this.jitter = jitter;

        this.timeouts = [];
        this._targetText = '';
        this._progress = '';
    }

    public stop (): void {
        this.timeouts.forEach(t => clearTimeout(t));
    }

    public get progress (): string {
        return this._progress;
    }

    public get targetText (): string {
        return this._targetText;
    }

    public type (text: string): void {
        this.stop();
        this._targetText = text;
        this.callback('');

        for (let i = 0; i <= text.length; i++) {
            let sub = text.substr(0, i),
                d = (this.delay * i) + (Math.random() - 0.5) * this.jitter;

            this.timeouts.push(setTimeout(() => {
                this._progress = sub;
                this.callback(sub);
            }, d));
        }
    }
}
