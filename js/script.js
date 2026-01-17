const openBtn = document.querySelector('.nav__toggle--open');
const closeBtn = document.querySelector('.nav__toggle--close');
const mobileNav = document.querySelector('.mobile__nav');

/* OPEN menu */
openBtn.addEventListener('click', () => {
  mobileNav.classList.add('open');
  openBtn.setAttribute('aria-expanded', 'true');
});

/* CLOSE menu */
closeBtn.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  openBtn.setAttribute('aria-expanded', 'false');
});

/* DROPDOWNS (scalable) */
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const parent = toggle.closest('.has-dropdown');
    const open = parent.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
});

// Typing Test Logic
  const typingText = document.querySelector('.typing__test-text');
  const typingInput = document.querySelector('#typingInput');
  const startTypingBtn = document.querySelector('#startTypingBtn');
  const wpmValue = document.querySelector('#wpmValue');
  const accuracyValue = document.querySelector('#accuracyValue');
  const timeValue = document.querySelector('.stat__value');
  const timerDisplay = document.querySelector('.typing__test-timer');
  
  let timer = 60;
  let timerInterval;
  let isTyping = false;
  let startTime;
  let correctChars = 0;
  let totalChars = 0;
  
  const sampleText = "The quick brown fox jumps over the lazy dog. Can you type faster and more accurately? Let's get started! Practice makes perfect, so keep typing to improve your speed and precision.";
  
  function startTimer() {
      timerInterval = setInterval(() => {
          timer--;
          timerDisplay.textContent = `00:${timer < 10 ? '0' : ''}${timer}`;
          timeValue.textContent = `${timer}s`;
          
          if (timer <= 0) {
              finishTest();
          }
      }, 1000);
  }
  
  function startTest() {
      isTyping = true;
      startTime = new Date();
      typingInput.disabled = false;
      typingInput.focus();
      typingInput.value = '';
      
      // Reset values
      correctChars = 0;
      totalChars = 0;
      timer = 60;
      
      // Reset text display
      typingText.innerHTML = sampleText.split('').map(char => 
          `<span class="char">${char}</span>`
      ).join('');
      
      // Highlight first character
      const chars = typingText.querySelectorAll('.char');
      if (chars.length > 0) {
          chars[0].classList.add('current');
      }
      
      // Start timer
      startTimer();
      
      // Update button
      startTypingBtn.textContent = 'Restart Test';
  }
  
  function finishTest() {
      clearInterval(timerInterval);
      isTyping = false;
      typingInput.disabled = true;
      
      // Calculate final WPM and accuracy
      const endTime = new Date();
      const timeInMinutes = (endTime - startTime) / 60000;
      const wpm = Math.round((correctChars / 5) / timeInMinutes);
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
      
      wpmValue.textContent = wpm;
      accuracyValue.textContent = `${accuracy}%`;
      
      // Remove current character highlight
      const currentChar = typingText.querySelector('.current');
      if (currentChar) {
          currentChar.classList.remove('current');
      }
  }
  
  // Initialize text display
  typingText.innerHTML = sampleText.split('').map(char => 
      `<span class="char">${char}</span>`
  ).join('');
  
  // Set up typing input
  typingInput.addEventListener('input', () => {
      if (!isTyping) {
          startTest();
      }
      
      const inputText = typingInput.value;
      const chars = typingText.querySelectorAll('.char');
      
      // Reset all characters
      chars.forEach(char => {
          char.classList.remove('correct', 'incorrect', 'current');
      });
      
      // Update character styling
      for (let i = 0; i < chars.length; i++) {
          if (i < inputText.length) {
              if (inputText[i] === chars[i].textContent) {
                  chars[i].classList.add('correct');
              } else {
                  chars[i].classList.add('incorrect');
              }
          }
          
          // Highlight current character
          if (i === inputText.length) {
              chars[i].classList.add('current');
          }
      }
      
      // Update stats
      totalChars = inputText.length;
      correctChars = 0;
      for (let i = 0; i < Math.min(inputText.length, chars.length); i++) {
          if (inputText[i] === chars[i].textContent) {
              correctChars++;
          }
      }
      
      // Calculate WPM
      const timeElapsed = (new Date() - startTime) / 60000; // in minutes
      const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0;
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
      
      wpmValue.textContent = wpm;
      accuracyValue.textContent = `${accuracy}%`;
  });
  
  // Start button event
  startTypingBtn.addEventListener('click', () => {
      if (isTyping) {
          clearInterval(timerInterval);
      }
      startTest();
  });
  
  // Disable input initially
  typingInput.disabled = true;