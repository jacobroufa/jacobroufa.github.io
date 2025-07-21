import { LitElement, html, css, createRef, ref } from '../lib/lit-all.min.js';

class ScrollTop extends LitElement {
    static styles = css`
        div {
            background: var(--color-5);
            border-radius: 3px;
            box-shadow: 0 0 10px rgba(100, 100, 100, 0.2);
            cursor: pointer;
            display: none;
            padding: 0.5em;
            position: fixed;
            right: 1em;
            top: 1em;
            z-index: 2;
        }
    `;

    scrollRef = createRef();

    get scrollEl () {
        return document.querySelector('.container > .content');
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.scrollEl.addEventListener('scroll', this.showScrollTop.bind(this));
        window.addEventListener('scroll', this.showScrollTop.bind(this));
    }

    disconnectedCallback() {
        this.scrollEl.removeEventListener('scroll', this.showScrollTop.bind(this));
        window.removeEventListener('scroll', this.showScrollTop.bind(this));
        super.disconnectedCallback();
    }

    showScrollTop() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || this.scrollEl.scrollTop || 0;
        const el = this.scrollRef.value;
        const currentHeader = document.getElementById('current');

        el.style.display = "none";

        if (currentHeader) {
            const headerTop = currentHeader.offsetTop;
            if (scrollTop >= headerTop) {
                el.style.display = "inherit";
            }
        }
    }

    scrollToTop() {
        const location = window.location.href.split('#')[0];

        window.history.pushState({}, "", location);
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.scrollEl.scrollTop = 0;
    }

    render() {
        return html`
            <div ${ref(this.scrollRef)} @click="${this.scrollToTop}">Back to Top</div>
        `
    }    
}

customElements.define('scroll-top', ScrollTop);