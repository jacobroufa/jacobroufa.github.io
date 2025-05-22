import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

class Menu extends LitElement {
    static styles = css`
        a {
            color: inherit;
        }
    `;

    static properties = {
        items: { type: Array },
        currentCount: { type: Number },
    };
    currentCount = 1;

    get menuItems() {
        return {
            current: `Current Work`,
            community: 'Community Involvement',
            past: 'Past Experience',
            // skills: 'Relevant Skills',
        };
    }

    constructor() {
        super();
        this.items = [];
    }

    render() {
        return html`
            ${this.items.map(item => html`
                <p><a href="#${item}">${this.menuItems[item]}</a></p>
            `)}
        `;
    }
}

customElements.define('side-menu', Menu);