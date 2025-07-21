import { LitElement, html, css } from '../lib/lit-all.min.js';
import './community-item.js';

class CommunityItems extends LitElement {
    static styles = css`
        community-item:not([last]) {
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
            <community-item ?last=${i + 1 === this.items.length} .item=${item}></community-item>
        `);
    }
}

customElements.define('resume-community', CommunityItems);