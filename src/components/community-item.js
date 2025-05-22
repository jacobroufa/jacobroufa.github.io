import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

class CommunityItem extends LitElement {
    static styles = css`
        :host {
            display: block;
            margin-left: 1em;
            padding: 1em 0;
        }

        strong {
            display: block;
        }

        .details {
            color: var(--color-3);
            font-size: 0.85em;
            font-weight: lighter;
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

    get details() {
        const { date, location } = this.item;
        if (!location) {
            return date;
        }
        return `${location} - ${date}`;
    }

    render() {
        if (!this.item) return;

        const { title, date, description, location, video, slides } = this.item;

        return html`
            <strong>${title}</strong>
            <p class="details">${this.details}</p>
            <p>${description}</p>
        `;
    }
}

customElements.define('community-item', CommunityItem);