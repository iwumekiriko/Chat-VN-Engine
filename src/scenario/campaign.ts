import type { DialogueScenario } from "../types/dialogue";
import { prologue } from "./chapters/prologue";
import { chapter1 } from "./chapters/chapter1";
import { chapter2 } from "./chapters/chapter2";
import { chapter3 } from "./chapters/chapter3";

export class DialogueCampaign {

    private index: number = 0;

    private campaign: DialogueScenario[] = [

        prologue,

        chapter1,

        chapter2,

        chapter3,

    ];

    first() {

        this.reset();

        return this.current();

    }

    get(id: string) {

        return this.campaign.find(scenario => scenario.id === id);

    }

    set(id: string) {

        const scenario = this.get(id);

        if (!scenario) return;

        this.index = this.campaign.indexOf(scenario);

    }

    current() {

        return this.campaign[this.index];

    }

    next() {

        this.index++;

    }

    reset() {

        this.index = 0;

    }

}