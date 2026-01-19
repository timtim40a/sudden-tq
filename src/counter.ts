import random from "random"

function setupTimer(element: HTMLDivElement) {
    let timeButtons =
        element.querySelectorAll<HTMLButtonElement>(".timespan-button")

    const setTimer = (minutes: number) => {
        let timer = random.float(0, minutes)
        setTimeout(() => {
            changeUIonTimerEnd()
        }, timer * 60000)
    }
    timeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            changeUIonTimerStart(element)
            setTimer(
                button.dataset.timespan ? parseInt(button.dataset.timespan) : 0
            )
        })
    })
}

function changeUIonTimerStart(element: HTMLDivElement) {
    let humanImage = document.querySelector<HTMLImageElement>(".human-image")
    humanImage ? (humanImage.src = "./human.png") : null
    let tipText = document.querySelector<HTMLHeadingElement>(".tip-text")
    tipText
        ? (tipText.textContent = " Be ready. It can be anytime now. ")
        : null
    let timeButtons =
        element.querySelectorAll<HTMLButtonElement>(".timespan-button")
    timeButtons.forEach((button) => {
        button.classList.replace("timespan-button", "timespan-button-disabled")
    })
    let restartButton = document.querySelector<HTMLButtonElement>(
        ".restart-button-disabled"
    )
    restartButton?.addEventListener("click", () => {
        resetUI()
    })
    restartButton
        ? restartButton.classList.replace(
              "restart-button-disabled",
              "restart-button"
          )
        : null
}

function changeUIonTimerEnd() {
    let mySound = new Audio("beep.mp3")
    mySound.play()
    let limb = random.choice([0, 1, 2, 3])
    let humanImage = document.querySelector<HTMLImageElement>(".human-image")
    humanImage && limb
        ? (humanImage.src = [
              "./humanrightarm.png",
              "./humanleftarm.png",
              "./humanrightleg.png",
              "./humanleftleg.png",
          ][limb])
        : null
    let tipText = document.querySelector<HTMLHeadingElement>(".tip-text")
    tipText && limb
        ? (tipText.textContent =
              " Tend to the " +
              ["right arm", "left arm", "right leg", "left leg"][limb] +
              "!")
        : null
}

export function resetUI() {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
	<div class="container">
		<div class="text-container">
			<h1> Sudden TQ </h1>
			<h3 class="tip-text"> Choose the timespan </h3>
			<div class="timespan">
				<button class="timespan-button" data-timespan="1"> 1 Min </button>
				<button class="timespan-button" data-timespan="2"> 2 Min </button>
				<button class="timespan-button" data-timespan="5"> 5 Min </button>
				<button class="timespan-button" data-timespan="10"> 10 Min </button>
				<button class="restart-button-disabled"> Restart </button>
			</div>
		</div>

		<div class="image-container">
			<img src="./human.png" alt="Human Image" class="human-image" />
		</div>
	</div>
`

    setupTimer(document.querySelector<HTMLDivElement>(".timespan")!)
}
