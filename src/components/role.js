import { LitElement, html, css } from '../lib/lit-all.min.js';

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
            white-space: pre-line;
        }

        .outcomes {
            list-style-type: circle;
            margin: 0.5em 1em;
            padding: 0;
        }

        .outcomes li {
            padding-bottom: 0.2em;
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

    get description() {
        const { description } = this.item;
        if (!description) return;

        return html`
            <p>${description}</p>
        `;
    }

    get outcomes() {
        const { outcomes } = this.item;
        if (!outcomes || outcomes.length === 0) return;

        return html`
            <ul class="outcomes">
                ${outcomes.map(outcome => html`<li>${outcome}</li>`)}
            </ul>
        `;
    }

    render() {
        if (!this.item) return;

        const { title } = this.item;

        return html`
            <strong>${title}</strong>
            <span class="duration">${this.duration}</span>
            ${this.description}
            ${this.outcomes}
        `;
    }
}

customElements.define('role-item', RoleItem);