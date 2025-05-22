import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

class RoleItem extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .duration {
            color: var(--color-3);
            font-size: 0.85em;
            font-weight: lighter;
            padding-left: 1em;
        }

        p {
            margin: 0.5em 0;
        }
    `;

    static properties = {
        item: { type: Object },
    };

    constructor() {
        super();
        this.item = null;
    }

    get duration() {
        const { start, end } = this.item;
        if (!start && !end) return;
        return `${start} - ${end || 'current'}`;
    }

    render() {
        if (!this.item) return;

        const { title, description } = this.item;

        return html`
            <strong>${title}</strong>
            <span class="duration">${this.duration}</span>
            <p>${description}</p>
        `;
    }
}

customElements.define('role-item', RoleItem);