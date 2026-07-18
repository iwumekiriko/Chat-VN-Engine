import type { DialogueNode, DialogueScenario } from "../types/dialogue";

export class DialogueEngine {

    private scenario: DialogueNode[];

    private index = 0;

    private prev = 0;

    private paused = false;

    constructor(scenario: DialogueScenario) {

        this.scenario = scenario.nodes;

    }

    loadScenario(scenario: DialogueScenario) {

        this.scenario = scenario.nodes;

        this.reset();

    }
    
    current(): DialogueNode | null {

        if (this.paused) return null;

        return this.hasNext() 
            ? this.scenario[this.index]
            : null;

    }

    peek(): DialogueNode | null {

        return this.hasNext()
            ? this.scenario[this.index]
            : null
        
    }

    hasNext() {

         return this.index < this.scenario.length;

    }

    next(): DialogueNode | null {

        if (this.paused) return null;

        const node = this.peek();

        if (!node) return null;

        this.prev = this.index;

        this.index++;

        return node;

    }

    previous() : DialogueNode | null {

        return this.scenario[this.prev];

    }

    isPaused() {

        return this.paused;

    }

    pause() {

        this.paused = true;

    }

    resume() {

        this.paused = false;

    }

    skip() {

        if (this.hasNext()) {

            this.prev = this.index;

            this.index++;

        }
    }

    jump(id: number) {

        const index = this.scenario.findIndex(node => node.id === id);

        if (index === -1)
            throw new Error(`Dialogue node ${id} not found`);

        this.prev = this.index;

        this.index = index;

    }

    getIndex() {

        return this.index;

    }

    reset() {

        this.prev = 0;
        
        this.index = 0;

        this.paused = false;

    }

    startsWithBot() {

        const node = this.current();

        return (
            node?.type === "MESSAGE" &&
            node.speaker === "BOT"
        );
    }

}