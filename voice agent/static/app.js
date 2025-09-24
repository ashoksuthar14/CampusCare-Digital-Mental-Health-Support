const chat = document.getElementById('chat');
const form = document.getElementById('chatForm');
const textarea = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const endBtn = document.getElementById('endBtn');
const timerDisplay = document.getElementById('timerDisplay');
const vapiContainer = document.getElementById('vapiContainer');
const nameCapture = document.getElementById('nameCapture');
const studentNameInput = document.getElementById('studentName');
const saveNameBtn = document.getElementById('saveNameBtn');
const privateToggle = document.getElementById('privateToggle');
const bookingModal = document.getElementById('bookingModal');
const bookingDetails = document.getElementById('bookingDetails');
const closeBookingBtn = document.getElementById('closeBookingBtn');

let timerInterval = null;
let sessionStartMs = Date.now();

function appendMessage(role, text){
  const wrapper = document.createElement('div');
  wrapper.className = `msg ${role}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? 'U' : 'A';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  chat.appendChild(wrapper);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage(message){
  sendBtn.disabled = true;
  appendMessage('user', message);
  textarea.value = '';

  // Optimistic typing indicator
  const typing = document.createElement('div');
  typing.className = 'msg assistant';
  typing.innerHTML = "<div class='avatar'>A</div><div class='bubble'>Thinking…</div>";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  try{
    const res = await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({message})
    });
    const data = await res.json();
    typing.remove();
    if(!res.ok){
      appendMessage('assistant', data.error || 'Something went wrong.');
      return;
    }
    appendMessage('assistant', data.reply);
    // If crisis booking details returned from server, show modal immediately
    if(data.booking){
      const { time, counsellor, room } = data.booking;
      const parts = [];
      if(time) parts.push(`Time: ${time}`);
      if(counsellor) parts.push(`Counsellor: ${counsellor}`);
      if(room) parts.push(`Room: ${room}`);
      bookingDetails.textContent = parts.join(' | ') || 'Appointment details will be sent to you shortly.';
      bookingModal.classList.remove('hidden');
    }
  }catch(err){
    typing.remove();
    appendMessage('assistant','Network error. Please try again.');
  }finally{
    sendBtn.disabled = false;
    textarea.focus();
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if(nameCapture && !nameCapture.classList.contains('hidden')){
    // prevent sending messages before name is set
    studentNameInput?.focus();
    return;
  }
  const message = textarea.value.trim();
  if(message) sendMessage(message);
});

endBtn.addEventListener('click', async () => {
  try{
    const res = await fetch('/api/end', {method:'POST'});
    const data = await res.json().catch(() => ({}));
    if(!res.ok){
      appendMessage('assistant', data.error || 'Unable to save summary.');
      return;
    }
    // Optionally show a tiny confirmation message with summary preview
    chat.innerHTML = '';
    appendMessage('assistant','Session ended. Your summary has been saved.');
    // Show booking details dialog if present
    if(data.booking){
      const { time, counsellor, room } = data.booking;
      const parts = [];
      if(time) parts.push(`Time: ${time}`);
      if(counsellor) parts.push(`Counsellor: ${counsellor}`);
      if(room) parts.push(`Room: ${room}`);
      bookingDetails.textContent = parts.join(' | ') || 'Appointment details will be sent to you shortly.';
      bookingModal.classList.remove('hidden');
    }
  }catch(_err){
    appendMessage('assistant','Network error ending chat.');
  }finally{
    restartTimer();
  }
});

closeBookingBtn?.addEventListener('click', () => bookingModal.classList.add('hidden'));

// Enter to send, Shift+Enter for newline
textarea.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    if(nameCapture && !nameCapture.classList.contains('hidden')){
      studentNameInput?.focus();
      return;
    }
    const message = textarea.value.trim();
    if(message) sendMessage(message);
  }
});

function restartTimer(){
  if(timerInterval){
    clearInterval(timerInterval);
  }
  sessionStartMs = Date.now();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer(){
  const elapsed = Math.floor((Date.now() - sessionStartMs)/1000);
  const mm = String(Math.floor(elapsed/60)).padStart(2,'0');
  const ss = String(elapsed%60).padStart(2,'0');
  if(timerDisplay){
    timerDisplay.textContent = `${mm}:${ss}`;
  }
}

// Optional helper to save a summary to server/Supabase
async function saveSummary(studentName, summary, diagnoses){
  const res = await fetch('/api/summary',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ student_name: studentName, summary, diagnoses })
  });
  return await res.json();
}

// Seed initial state
appendMessage('assistant','Hi! I’m here to listen. What’s on your mind today?');
restartTimer();

// Name capture
function hideNameCapture(){
  if(nameCapture){
    nameCapture.classList.add('hidden');
  }
}

saveNameBtn?.addEventListener('click', async () => {
  const name = (studentNameInput?.value || '').trim();
  if(!name) { studentNameInput?.focus(); return; }
  await fetch('/api/name', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({student_name: name})
  });
  hideNameCapture();
  textarea.focus();
});

studentNameInput?.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    saveNameBtn?.click();
  }
});

// Vapi expansion behavior: expand on start, collapse on end
window.addEventListener('message', (event) => {
  try{
    const data = event.data || {};
    if(typeof data !== 'object') return;
    // Heuristic: listen for events from Vapi widget
    if(data.type === 'vapi:call-started' || data.event === 'call-started'){
      vapiContainer && vapiContainer.classList.add('expanded');
    }
    if(data.type === 'vapi:call-ended' || data.event === 'call-ended'){
      vapiContainer && vapiContainer.classList.remove('expanded');
    }
  }catch(_e){/* ignore */}
});

// Also allow clicking the floating widget to expand if needed (fallback)
document.addEventListener('click', (e) => {
  const target = e.target;
  if(!vapiContainer) return;
  // When start button inside vapi is clicked, expand shortly after
  const path = e.composedPath ? e.composedPath() : [];
  const clickedVapi = path.some(el => el && el.tagName && el.tagName.toLowerCase() === 'vapi-widget');
  if(clickedVapi){
    setTimeout(()=> vapiContainer.classList.add('expanded'), 150);
  }
});

// Private mode toggle behavior
privateToggle?.addEventListener('change', () => {
  if(privateToggle.checked){
    appendMessage('assistant','Private mode is ON. This room is private and your information will not be shared with anyone.');
  } else {
    appendMessage('assistant','Private mode is OFF.');
  }
});


