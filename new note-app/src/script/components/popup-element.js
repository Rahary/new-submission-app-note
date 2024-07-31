// File: src/components/index.js
class PopupElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,600;1,300&display=swap');
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
            * {
                padding: 0;
                margin: 0;

                box-sizing: border-box;
                font-family: 'Work Sans', sans-serif; 
            }

            /* Start of Header */
            header {
                display: grid;
                justify-content: center;
                background-color: #BEC6A0;
            
                color: black;
            }
            /*
            header .logo img {
                width: 50px;
            }
            */

            .add-box, .icon, .bottom-content,
            .settings .menu li, .popup, header{
                display: flex;
                align-items: center;
                justify-content: space-between;

            }

            /* ukuran box note */ 
            .note .details {
                max-height: 200px;
                overflow-y: auto;
                word-wrap: break-word;
            }
            /* Judul */


            /* POP UP BOX MULAI DI SINI */
            .popup-box{
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                z-index: 2;
                background: rgba(0, 0, 0, 0.4);
            }

            .popup-box .popup{
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 3;
                max-width: 400px;
                width: 100%;
                border-radius: 5px;
                transform: translate(-50%, -50%);
                justify-content: center;
            }

            /* DISABLE POPUP DI SINI */
            .popup-box, .popup-box .popup{
                opacity: 0;
                pointer-events: none;
                transition: all 0.25s ease;
            }

            .popup-box.show, .popup-box.show .popup{
                opacity: 1;
                pointer-events: auto;
            }

            .popup .content{
                width: calc(100% - 15px);
                background-color: white;
                border-radius: 5px;
            }

            .popup .content header{
                padding: 15px 25px;
                border-bottom: 1px solid #ccc;
            }

            .content header p{
                font-size: 20px;
                font-weight: 500;
            }

            .content header i{
                color: lightgray;
                cursor: pointer;
                font-size: 23px;
            }

            .content form{
                margin: 15px 25px 35px;
            }

            .content form .row{
                margin-bottom: 20px;
            }

            .content form .row-title,
            .content form .row-description{
                margin-bottom: 15px;
            }


            .content form .row label{
                display: block;
                font-size: 16px;
                margin-bottom: 6px;
            }

            .content form :where(input, textarea){
                width: 100%;
                height: 50px;
                outline: none;
                font-size: 15px;
                padding: 0 15px;
                border-radius: 4px;
                border: 1px solid black;
            }

            .content form textarea{
                height: 150px;
                resize: none;
                padding: 8px 15px;
            }

            .content form button{
                width: 100%;
                height: 50PX;
                border: none;
                outline: none;
                color: black;
                font-size: 15px;
                border-radius: 4px;
                background: lightslategrey;
            }
            </style>
            <div class="popup-box">
                <div class="popup">
                    <div class="content">
                        <header>
                            <p>Tambah Catatan</p>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </header>
                        <form action="#">
                            <div class="row title">
                                <label>Judul</label>
                                <input type="text">
                            </div>

                            <div class="row description">
                                <label>Deskripsi</label>
                                <textarea></textarea>
                            </div>
                            <button type="submit">Tambahkan Catatan</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('popup-element', PopupElement);
