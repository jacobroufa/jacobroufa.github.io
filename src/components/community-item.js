import { LitElement, html, css } from '../lib/lit-all.min.js';

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

        a {
            color: inherit;
            font-size: 0.85em;
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

    get links() {
        const { slides, video } = this.item;
        if (!slides && !video) return;
        return html`
            <p>
                ${slides ? html`<a href="${slides}" target="_blank">Slides</a>` : ''}
                ${slides && video ? ' | ' : ''}
                ${video ? html`<a href="${video}" target="_blank">Video</a>` : ''}
            </p>
        `;
    }

    render() {
        if (!this.item) return;

        const { title, description } = this.item;

        return html`
            <strong>${title}</strong>
            <p class="details">${this.details}</p>
            ${this.links}
            <p>${description}</p>
        `;
    }
}

customElements.define('community-item', CommunityItem);