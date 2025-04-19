



export class ThemeManager {
    #defaultTheme = {
        stylesheet: "/game/styles/default.css",
        audio: "https://cdn.glitch.global/cba8dee2-9d46-4788-8bc0-6cf090beed46/song.mp3?v=1738534414607"
    }

    themes = new Map()

    constructor() {
        this.themes.set("default", this.#defaultTheme)
        this.setTheme("default")
    }

    addTheme(name, theme) {
        this.themes.set(name, theme)
    }

    getThemeNames() {
        return Array.from(this.themes.keys())
    }

    setTheme(name) {
        const theme = this.themes.get(name)
        if (theme) {
            const stylesheet = document.getElementById("theme")
            const mainSong = document.getElementById("main_song")
            if (stylesheet) {
                stylesheet.setAttribute("href", theme.stylesheet)
            }
            if (mainSong) {
                mainSong.setAttribute("src", theme.audio)
            }
        }
    }

}


export function createThemeManager() {
    const tm = new ThemeManager()
    tm.addTheme("jungle", {
        stylesheet: "/game/styles/jungle.css",
        audio: "./sounds/jungle.mp3"
    })
    return tm
}