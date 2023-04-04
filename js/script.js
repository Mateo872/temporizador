const hoursInput = document.querySelector("#hours"),
  minutesInput = document.querySelector("#minutes"),
  secondsInput = document.querySelector("#seconds"),
  btnInit = document.querySelector(".btn-init"),
  btnPause = document.querySelector(".btn-pause"),
  btnReset = document.querySelector(".btn-reset");

let hours = document.querySelector(".hours"),
  minutes = document.querySelector(".minutes"),
  seconds = document.querySelector(".seconds"),
  count = document.querySelector("h3"),
  timer;

btnInit.className = "btn btn-secondary";
btnInit.disabled = true;

btnPause.className = "btn btn-secondary";
btnPause.disabled = true;

btnReset.className = "btn btn-secondary";
btnReset.disabled = true;

hoursInput.addEventListener("input", hoursCount);
minutesInput.addEventListener("input", minutesCount);
secondsInput.addEventListener("input", secondsCount);

btnInit.addEventListener("click", timerStart);
btnPause.addEventListener("click", timerStop);
btnReset.addEventListener("click", timerReset);

function hoursCount(e) {
  if (hoursInput.value.includes("-")) {
    hoursInput.value = "";
  }

  if (hoursInput.value < 24) {
    if (hoursInput.value.length === 0) {
      hours.textContent = "00";
    } else if (hoursInput.value === "0" && hoursInput.value.length === 1) {
      hoursInput.value = "";
    } else {
      hours.textContent = formatTime(parseInt(e.target.value));
    }
  } else {
    hours.textContent = 23;
  }

  showBtnInit();
}

function minutesCount(e) {
  if (minutesInput.value.includes("-")) {
    minutesInput.value = "";
  }

  if (minutesInput.value < 60) {
    if (minutesInput.value.length === 0) {
      minutes.textContent = "00";
    } else if (minutesInput.value === "0" && minutesInput.value.length === 1) {
      minutesInput.value = "";
    } else {
      minutes.textContent = formatTime(parseInt(e.target.value));
    }
  } else {
    minutes.textContent = 59;
  }

  showBtnInit();
}

function secondsCount(e) {
  if (secondsInput.value.includes("-")) {
    secondsInput.value = "";
  }

  if (secondsInput.value < 60) {
    if (secondsInput.value.length === 0) {
      seconds.textContent = "00";
    } else if (secondsInput.value === "0" && secondsInput.value.length === 1) {
      secondsInput.value = "";
    } else {
      seconds.textContent = formatTime(parseInt(e.target.value));
    }
  } else {
    seconds.textContent = 59;
  }

  showBtnInit();
}

function timerStart() {
  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";

  hoursInput.disabled = true;
  minutesInput.disabled = true;
  secondsInput.disabled = true;

  btnInit.className = "btn btn-secondary";
  btnInit.disabled = true;

  btnPause.className = "btn btn-success";
  btnPause.disabled = false;

  btnReset.className = "btn btn-success";
  btnReset.disabled = false;

  timer = setInterval(() => {
    if (seconds.textContent > 0) {
      seconds.textContent--;
    } else if (minutes.textContent > 0) {
      seconds.textContent = 59;
      minutes.textContent--;
    } else if (hours.textContent > 0) {
      hours.textContent--;
      minutes.textContent = 59;
      seconds.textContent = 59;
    } else {
      clearInterval(timer);

      hoursInput.disabled = false;
      minutesInput.disabled = false;
      secondsInput.disabled = false;

      btnInit.className = "btn btn-secondary";
      btnInit.disabled = true;

      btnPause.className = "btn btn-secondary";
      btnPause.disabled = true;

      btnReset.className = "btn btn-secondary";
      btnReset.disabled = true;
    }

    hours.textContent = formatTime(hours.textContent);
    minutes.textContent = formatTime(minutes.textContent);
    seconds.textContent = formatTime(seconds.textContent);
  }, 1000);
}

function timerStop() {
  clearInterval(timer);

  btnInit.className = "btn btn-success";
  btnInit.disabled = false;

  btnPause.className = "btn btn-secondary";
  btnPause.disabled = true;

  btnReset.className = "btn btn-success";
  btnReset.disabled = false;
}

function timerReset() {
  clearInterval(timer);

  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";

  hours.textContent = "00";
  minutes.textContent = "00";
  seconds.textContent = "00";

  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;

  btnInit.className = "btn btn-success";
  btnInit.disabled = false;

  btnPause.className = "btn btn-secondary";
  btnPause.disabled = true;

  btnReset.className = "btn btn-secondary";
  btnReset.disabled = true;

  showBtnInit();
}

function showBtnInit() {
  if (
    hoursInput.value.length > 0 ||
    minutesInput.value.length > 0 ||
    secondsInput.value.length > 0
  ) {
    btnInit.className = "btn btn-success";
    btnInit.disabled = false;
  } else {
    btnInit.className = "btn btn-secondary";
    btnInit.disabled = true;
  }
}

function formatTime(time) {
  time = +time;
  if (time < 10) {
    return `0${time}`;
  } else {
    return `${time}`;
  }
}
