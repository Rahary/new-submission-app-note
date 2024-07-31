class FooterBar extends HTMLEleent {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
            background-color: #4C3D3D;
            height: auto;
            width: 100vw;
            color: white;
            margin: auto;
        }

        .footer-content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            background-color: #dbbfab;
        }

        .footer-content p {
            max-width: 100%;
            margin: 0;
            line-height: 28px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 5px;
        }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <div class="footer">
            <div class="footer-content">
                <p>Aplikasi Catatan</p>
                <p>copyright &copy 2024 Rumah Coding. designed by Rafikah Sary</p>
            </div>
        </div>
        `;
    }
}

customElements.define('footer-bar', FooterBar);