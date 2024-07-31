class AppBar extends HTMLElement {
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
            display: grid;
            justify-content: center;
            background-color: #BEC6A0;
        
            color: black;
        }
        
        .app-bar {
            padding: 24px 20px;
        }
        
        .brand-name {
            margin: 0;
            font-size: 1.7em;
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
        <div class="app-bar">
          <h1 class="brand-name">Aplikasi Catatan</h1>
        </div>
        `;
    }
}

customElements.define('app-bar', AppBar);