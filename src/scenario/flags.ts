export type ScenarioFlags = Record<string, boolean>;

export class FlagStore {

    private flags: ScenarioFlags = {};

    get(name: string): boolean {
        
        return this.flags[name] ?? false;

    }

    getAll(): ScenarioFlags {

        return this.flags;

    }

    set(name: string, value = true): void {

        this.flags[name] = value;

    }

    has(name: string) {

        return this.flags[name] ?? false;

    }

    reset(){

        Object.keys(this.flags).forEach(key => delete this.flags[key]);

    }

    load(flags: ScenarioFlags) {

        this.flags = flags;

    }

    clear() {

        this.flags = {};

    }

}