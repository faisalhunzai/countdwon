document.addEventListener('DOMContentLoaded', () => {
  const countdownForm = document.getElementById('countdownForm');
  const countdownEl = document.getElementById('countdown');
  const countdownTitleEl = document.getElementById('countdown-title');
  const countdownButtonEl = document.getElementById('countdown-button');
  const completeEl = document.getElementById('complete');
  const completeInfoEl = document.getElementById('complete-info');
  const completeButtonEl = document.getElementById('complete-button');
  const inputContainerEl = document.getElementById('input-container');

  let countdownTitle = '';
  let countdownDate = '';
  let countdownInterval;
  let savedCountdown;

  // Update the countdown timer
  function updateCountdown() {
      const now = new Date().getTime();
      const distance = new Date(countdownDate).getTime() - now;

      if (distance < 0) {
          clearInterval(countdownInterval);
          countdownEl.hidden = true;
          completeInfoEl.textContent = `${countdownTitle} finished on ${countdownDate}`;
          completeEl.hidden = false;
      } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          countdownEl.querySelectorAll('span')[0].textContent = days;
          countdownEl.querySelectorAll('span')[1].textContent = hours;
          countdownEl.querySelectorAll('span')[2].textContent = minutes;
          countdownEl.querySelectorAll('span')[3].textContent = seconds;
      }
  }

  // Start the countdown
  function startCountdown() {
      countdownTitle = document.getElementById('title').value;
      countdownDate = document.getElementById('date-picker').value;

      if (countdownDate === '' || countdownTitle === '') {
          alert('Please enter a valid title and date.');
          return;
      }

      inputContainerEl.hidden = true;
      countdownTitleEl.textContent = countdownTitle;
      countdownEl.hidden = false;

      savedCountdown = {
          title: countdownTitle,
          date: countdownDate,
      };
      localStorage.setItem('countdown', JSON.stringify(savedCountdown));

      countdownInterval = setInterval(updateCountdown, 1000);
      updateCountdown(); // Run immediately to avoid 1-second delay
  }

  // Reset the countdown
  function resetCountdown() {
      clearInterval(countdownInterval);
      countdownEl.hidden = true;
      completeEl.hidden = true;
      inputContainerEl.hidden = false;
      document.getElementById('title').value = '';
      document.getElementById('date-picker').value = '';
      localStorage.removeItem('countdown');
  }

  // Check local storage for saved countdown
  function loadCountdown() {
      const storedCountdown = localStorage.getItem('countdown');
      if (storedCountdown) {
          try {
              savedCountdown = JSON.parse(storedCountdown);
              countdownTitle = savedCountdown.title;
              countdownDate = savedCountdown.date;

              inputContainerEl.hidden = true;
              countdownTitleEl.textContent = countdownTitle;
              countdownEl.hidden = false;

              countdownInterval = setInterval(updateCountdown, 1000);
              updateCountdown(); // Run immediately to avoid 1-second delay
          } catch (error) {
              console.error('Error parsing stored countdown:', error);
              localStorage.removeItem('countdown'); // Clear invalid data
          }
      }
  }

  countdownForm.addEventListener('submit', (e) => {
      e.preventDefault();
      startCountdown();
  });

  countdownButtonEl.addEventListener('click', resetCountdown);
  completeButtonEl.addEventListener('click', resetCountdown);

  loadCountdown();
});
