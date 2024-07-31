// File: src/script/view/home.js
import '../utils.js';
import '../data/notes.js';
import '../components/index.js';
import Notes from '../data/notes.js';

const home = () => {
    const addBox = document.querySelector(".add-box"),
          popupElement = document.querySelector("popup-element"); // ini custom element

    if (!popupElement) {
        console.error('popup-box element not found');
        return;
    }
    // menggunaan shadowRoot karena popup-box terdapat di dalam custom element popup element
    const popupBox = popupElement.shadowRoot.querySelector('.popup-box')

    // Akses elemen di dalam shadow DOM
    const popupTitle = popupBox.querySelector("header p"),
          closeIcon = popupBox.querySelector("header i"),
          popup = popupBox.querySelector(".popup"),
          titleTag = popupBox.querySelector("input"),
          descTag = popupBox.querySelector("textarea"),
          addBtn = popupBox.querySelector("button");

    // Menampilkan add box/add note
    addBox.addEventListener("click", () => {
        titleTag.focus();
        popupBox.classList.add("show");
    });

    // melakukan abstraksi callback event karena akan digunakan berulang
    const handleCloseModal = () => {
        isUpdate = false;
        // Popup blank ketika membuat note baru
        titleTag.value = "";
        descTag.value = "";
        addBtn.innerText = "Tambahkan Catatan Baru";
        popupTitle.innerText = "Tambah Catatan";
        popupBox.classList.remove("show")
    }

    // jika backdrop di klik maka modal juga akan tertutup (tidak perlu selalu dari close icon)
    popupBox.addEventListener("click", handleCloseModal) 

    //  agar tidak terkena event bubbling
    popup.addEventListener("click", event => {
        event.stopPropagation()
    })

    const months = {
        1: "Januari", 2: "Februari", 3: "Maret", 4: "April", 5: "Mei", 6: "Juni", 7: "Juli",
        8: "Agustus", 9: "September", 10: "Oktober", 11: "November", 12: "Desember"
    };

    // Mendapatkan Local Storage notes jika ada atau mengambil dummy data
    const notes = JSON.parse(localStorage.getItem("notes") || JSON.stringify(Notes.getAll()));

    let isUpdate = false, updateId;

    // Menutup box add note
    closeIcon.addEventListener("click", handleCloseModal);

    // Menampilkan note di console
    function showNotes() {
        // hapus semua note
        document.querySelectorAll(".note").forEach(note => note.remove());
        // ambil dari localstorage
        notes.forEach((note, index) => {
            let liTag = `<li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.body}</span>
                            </div>
                            <div class="bottom-content">
                                <span>${formatDate(note.createdAt)}</span>
                                <div class="settings">
                                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                    <ul class="menu">
                                        <li onclick="updateNote(${index}, '${note.title}', '${note.body}')"><i class="fa-solid fa-pen">Edit</i></li>
                                        <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash">Delete</i></li>
                                    </ul>
                                </div>
                            </div>
                        </li>`;
            // tambahkan ke dom
            addBox.insertAdjacentHTML("afterend", liTag);
        });
    }

    function formatDate(date) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    }

    // Menu
    window.showMenu = function(elem) {
        elem.parentElement.classList.add("show");
        document.addEventListener("click", event => {
            if (event.target.tagName != "I" || event.target != elem) {
                elem.parentElement.classList.remove("show");
            }
        });
    }

    // Delete
    window.deleteNote = function(noteId) {
        // Konfirmasi penghapusan catatan
        let confirmDel = confirm("Apakah kamu yakin ingin menghapus catatan ini?");
        if (!confirmDel) return;
        notes.splice(noteId, 1);
        // Menghapus di local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
    }

    // Edit
    window.updateNote = function(noteId, title, desc) {
        isUpdate = true;
        updateId = noteId;
        addBox.click();
        // Auto fill catatan yang akan diubah
        titleTag.value = title;
        descTag.value = desc;
        addBtn.innerText = "Ubah Catatan";
        popupTitle.innerText = "Ubah Catatan";
    }

    // Menambahkan note
    addBtn.addEventListener("click", e => {
        // agar tidak ter refresh form nya
        e.preventDefault();
        let noteTitle = titleTag.value,
            noteDesc = descTag.value;

        if (noteTitle || noteDesc) {
            const date = new Date().toISOString();

            let noteInfo = {
                id: `notes-${Math.random().toString(36).substr(2, 9)}`,
                title: noteTitle,
                body: noteDesc,
                createdAt: date,
                archived: false,
            };

            if (!isUpdate) {
                notes.push(noteInfo);
            } else {
                notes[updateId] = noteInfo;
            }

            // Local storage
            localStorage.setItem("notes", JSON.stringify(notes));
            closeIcon.click();
            showNotes();
        }
    });

    showNotes();
};

document.addEventListener("DOMContentLoaded", home);
export default home;
