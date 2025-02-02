//@ts-check

/*
Contents
    this file contains two classes
    - Menu
        a class that spawn menu and sub-menus that can be managed by these methods:
            1. addItem() which add native menu item with preadded style
            2. assCustomItem() unlike addItem, addCustomItem takes an html element and render it inside of the items list
            3. submenu(), create a submenu which will go back to the parent menu when closed
            4. close(), will hide the current menu and bring back the parent (if present)
    - SFX
        a class that will be responsible of managing loading sound effects and playing them on events with this method
            1. playSound() a function that will play sound based on its name mentioned below in SOUNDS object
*/

const SOUNDS = {
    CLICK: "https://cdn.glitch.global/cba8dee2-9d46-4788-8bc0-6cf090beed46/click2.wav?v=1737989811930",
    CLICK_BACK: "https://cdn.glitch.global/cba8dee2-9d46-4788-8bc0-6cf090beed46/CLICK_BACK.wav?v=1738427786490",
    HIT: "https://cdn.glitch.global/cba8dee2-9d46-4788-8bc0-6cf090beed46/hit.mp3?v=1737990133510",
    GAME_START: "https://cdn.glitch.global/cba8dee2-9d46-4788-8bc0-6cf090beed46/game_start.wav?v=1738427601709",
    PADLE_EXPANSION: "game/success-48018.mp3"
}


export class Menu {
    wrapper = document.createElement("div")
    /**@type {Menu | null} */
    parent;

    items = document.createElement("div")

    /**
     * 
     * @param {string} titleStr 
     * @param {Menu | null} parent 
     */
    constructor(titleStr, parent = null) {
        this.wrapper.classList.add("menu", "visible")
        this.items.classList.add("menu-items")

        this.parent = parent;

        const title = document.createElement("div")
        title.classList.add("menu-title")
        title.textContent = titleStr
        this.wrapper.appendChild(title)

        this.wrapper.append(title, this.items)
        const menuUiElement = document.querySelector(".menus-ui")
        if (!menuUiElement) throw new Error("cannot find <div class='menus-ui'> this should never happen")
        menuUiElement.appendChild(this.wrapper)
    }

    addItem(title, onclick) {
        const item = document.createElement("button")
        item.classList.add("menu-item")
        item.textContent = title
        item.onclick = onclick

        this.items.appendChild(item)
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    addCustomItem(element) {
        this.items.append(element)
    }

    submenu(title) {
        const box = this.wrapper.getBoundingClientRect()
        this.wrapper.style.top = box.top + "px"
        this.wrapper.style.left = box.left + "px"
        const menu = new Menu(title, this)
        this.wrapper.classList.add("hidden")
        this.wrapper.classList.remove("visible")
        return menu
    }

    close() {
        if (this.parent) {
            this.parent.wrapper.classList.remove("hidden")
            this.parent.wrapper.classList.add("visible")
        }
        this.wrapper.remove()
    }
}

export class SFX {
    #audios = new Map(Object.entries(SOUNDS).map(pair => [pair[0], new Audio(pair[1])]))
    playSound(name) {
        const audio = this.#audios.get(name)
        if (audio) {
            audio.currentTime = 0
            audio.play()
        }
    }

    constructor() {
        const first_interaction = () => {
            const mainSong = document.getElementById("main_song")
            if (mainSong && mainSong instanceof HTMLAudioElement) {
                mainSong.volume = 0.7
                mainSong.play()
            }
            window.removeEventListener("click", first_interaction)
        }
        window.addEventListener("click", first_interaction)
    }
}

const about_html = `
    <p>
        <b>Brick breaker</b>
        <br>
        <p>
            A simple break breaker game with basic features
        </p>
    </p>
`