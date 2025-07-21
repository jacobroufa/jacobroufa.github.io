import { LitElement, html, css } from '../lib/lit-all.min.js';
import './workplace.js';

class Workplaces extends LitElement {
    static styles = css`
        workplace-item:not([last]) {
            border-bottom: 1px solid var(--color-4);
        }
    `;

    static properties = {
        items: { type: Array },
    };

    constructor() {
        super();
        this.items = [];
    }

    render() {
        return this.items.map((item, i) => html`
            <workplace-item ?last=${i + 1 === this.items.length} .item=${item}></workplace-item>
        `);
    }
}

customElements.define('resume-workplaces', Workplaces);