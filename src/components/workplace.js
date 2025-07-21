import { LitElement, html, css } from '../lib/lit-all.min.js';
import './role.js';

class Workplace extends LitElement {
    static styles = css`
        :host {
            display: block;
            margin-left: 1em;
            padding-bottom: 1em;
        }

        h3 {
            display: inline-block;
            margin-bottom: 0.5em;
        }

        a {
            color: inherit;
        }

        .duration {
            color: var(--color-3);
            font-weight: lighter;
            padding-left: 1em;
        }

        p {
            margin: 0;
            white-space: pre-line;
        }

        ul {
            list-style-type: square;
        }

        role-item[single],
        ul {
            margin: 0.5em 0 0 1em;
            padding: 0;
        }
    `;

    static properties = {
        item: { type: Object },
    };

    constructor() {
        super();
        this.item = null;
    }

    get description() {
        const { description } = this.item;
        if (description) {
            return html`<p>${description}</p>`
        }
        return;
    }

    get roles() {
        const { roles } = this.item;
        if (roles.length > 1) {
            return html`<ul>${roles.map((item, i) => html`
                <li>
                    <role-item .item=${item}></role-item>
                </li>
            `)}</ul>`;
        }
        return html`
            <role-item single .item=${roles[0]}></role-item>
        `;
    }

    render() {
        if (!this.item) return;

        const { workplace, workplaceUrl, start, end } = this.item;

        return html`
            <h3>
                ${workplaceUrl ?
                    html`<a href="${workplaceUrl}" target="_blank">${workplace}</a>` :
                    html`${workplace}`}
            </h3>
            <span class="duration">${start} - ${end || 'current'}</span>
            ${this.description}
            ${this.roles}
        `;
    }
}

customElements.define('workplace-item', Workplace);