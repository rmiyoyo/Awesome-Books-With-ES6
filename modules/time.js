import { DateTime } from 'luxon';

export function displayTime() {
  const timeDiv = document.querySelector('#time');
  if (!timeDiv) return;

  setInterval(() => {
    const now = DateTime.now();
    const formattedTime = now.toLocaleString(DateTime.TIME_24_SIMPLE);
    timeDiv.innerText = formattedTime;
  }, 1000);
}
