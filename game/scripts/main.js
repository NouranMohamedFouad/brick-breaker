import { BrickBreaker } from "./bricks.js";
import { levels } from "./levels.js";
import { Game } from "./game.js";
import { Paddle } from "./paddle.js"
import { Ball } from "./ball.js";
import { Menu, SFX } from "./world.js";
import { ThemeManager } from "./themes.js";

const themeManager = new ThemeManager()
themeManager.addTheme("jungle", {
    stylesheet: "/game/styles/jungle.css",
    audio: "https://cdn.glitch.global/51bcd4c0-4cda-43aa-8ebb-4e90f5efd03f/WhatsApp%20Audio%202025-04-19%20at%205.10.11%20PM.mp3?v=1745094261100"
})
themeManager.addTheme("theater", {
    stylesheet: "/game/styles/theater.css",
    audio: "https://cdn.glitch.global/51bcd4c0-4cda-43aa-8ebb-4e90f5efd03f/WhatsApp%20Audio%202025-04-19%20at%205.09.57%20PM.mp3?v=1745093968376"
})

const sfx = new SFX()
function startGame() {
    const paddle = new Paddle();
    const ball = new Ball();
    const bricks = new BrickBreaker(levels, ball, paddle);
    const game = new Game(ball, paddle, bricks, sfx, themeManager);
    document.body.append(game.container);
    return game
}


function main() {
    let game
    window.addEventListener("resize", e => {
        const isSmallScreen = window.innerWidth < 1100
        console.log(game);

        if (isSmallScreen) {
            if (game) {
                game.playing = false
                game.pauseMusic();
                window.location.reload()
            }
        } else {
            if (game) {
                game.playing = true
                game.resumeMusic();

            }
        }
    })
    const mainMenu = new Menu("🔨 Brick Breaker 🧱")
    mainMenu.addItem("Start Game", () => {
        sfx.playSound("GAME_START")
        game = startGame()
        game.resumeMusic()
        mainMenu.close()
        // main_menu.close()
    })

    mainMenu.addItem("About", () => {
        const aboutMenu = mainMenu.submenu("About")
        const element = document.createElement("div")
        element.classList.add("custom-item")
        element.innerHTML = `
        <p>
            <b>Brick breaker</b>
            <br>
            A simple break breaker game with basic features
        </p>
        <p>
            <b>How to play</b>
            <br>
            <ul style="margin-left: 1rem;">    
                <li>Use your mouse to move the paddle</li>
                <li>After few hits, the paddle will be expaned</li>
                <li>Don't let the paddle miss the ball</li>
                <li>Finish the current level and start harder and more exciting levels!</li>
                <li>use ESC button or <code>( . )</code> to pause the game</li>
                <li>Have fun</li>
            </ul>
            <br>
        </p>
`
        aboutMenu.addCustomItem(element)
        aboutMenu.addItem("Back", () => {
            aboutMenu.close()
        })
    })

    mainMenu.addItem("Settings", () => {
        const settingsMenu = mainMenu.submenu("Settings")
        settingsMenu.addItem("Theme", () => {
            const themes = themeManager.getThemeNames()
            const themeMenu = settingsMenu.submenu("Theme")
            themes.forEach(theme => {
                themeMenu.addItem(theme, () => {
                    themeManager.setTheme(theme)
                    themeMenu.close()
                })
            })
            themeMenu.addItem("Back", () => {
                themeMenu.close()
            })
        })
        settingsMenu.addItem("Back", () => {
            settingsMenu.close()
        })

    })
}



// startGame();
main()

