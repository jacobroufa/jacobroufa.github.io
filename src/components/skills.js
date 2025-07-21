import { LitElement, html, css } from '../lib/lit-all.min.js';

class Skills extends LitElement {
    static styles = css`
        :host {
            display: block;
            margin: 1.5em 0;
        }

        .section {
            padding-left: 1em;
        }

        ul {
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
            gap: 0.75em;
            padding-left: 1em;
        }

        li {
            border: 1px solid var(--color-3);
            border-radius: 3px;
            padding: 0.25em;
            cursor: default;
        }

        li:hover {
            background: var(--color-4);
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
            <div class="section">
                <strong>${ item.skill }</strong>
                <ul>
                    ${item.skills.map(skill => html`
                        <li>${skill}</li>
                    `)}
                </ul>
            </div>
        `);
    }
}

customElements.define('resume-skills', Skills);