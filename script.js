
let seconds = 0;
let running = false;
let interval = null;
let goal = 25 * 60;
let completed = 0;

const verses = [
  {
    text: "Tudo posso naquele que me fortalece.",
    ref: "Filipenses 4:13"
  },
  {
    text: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",
    ref: "Salmos 37:5"
  },
  {
    text: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.",
    ref: "Isaías 41:10"
  },
  {
    text: "Esforça-te e tem bom ânimo; não temas, nem te espantes.",
    ref: "Josué 1:9"
  },
  {
    text: "Tudo quanto te vier à mão para fazer, faze-o conforme as tuas forças.",
    ref: "Eclesiastes 9:10"
  },
  {
    text: "Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.",
    ref: "2 Timóteo 1:7"
  },
  {
    text: "O coração do homem considera o seu caminho, mas o Senhor lhe dirige os passos.",
    ref: "Provérbios 16:9"
  },
  {
    text: "Instruir-te-ei e ensinar-te-ei o caminho que deves seguir.",
    ref: "Salmos 32:8"
  }
];

const quotes = [
  "A disciplina é continuar fazendo o que precisa ser feito, mesmo nos dias em que a motivação não aparece.",
  "Não compare seu começo com o meio da jornada de outra pessoa.",
  "Cada hora de dedicação é um passo a mais em direção aos seus objetivos.",
  "O conhecimento que você conquista hoje pode transformar sua realidade amanhã.",
  "Não desista porque está difícil. Lembre-se do motivo pelo qual começou.",
  "Grandes resultados são construídos por pequenas atitudes repetidas diariamente.",
  "Deus honra a dedicação, a perseverança e o coração disposto a aprender."
];

function updateDate() {
  document.getElementById("date").textContent =
    new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
}

function formatTime(value) {
  const h = Math.floor(value / 3600);
  const m = Math.floor((value % 3600) / 60);
  const s = value % 60;

  return [h,m,s]
    .map(n => String(n).padStart(2,"0"))
    .join(":");
}

function updateDisplay() {
  document.getElementById("timer").textContent =
    formatTime(seconds);

  document.getElementById("total").textContent =
    Math.floor(seconds / 60) + " min";

  document.getElementById("sessions").textContent = completed;

  let percentage = goal > 0
    ? Math.min((seconds / goal) * 100, 100)
    : 0;

  document.getElementById("progress").style.width =
    percentage + "%";
}

function toggleTimer() {
  if (running) {
    clearInterval(interval);
    running = false;
    document.getElementById("start").textContent = "▶ Continuar";
    document.getElementById("status").textContent = "Estudo pausado";
    return;
  }

  if (goal > 0 && seconds >= goal) {
    resetTimer();
  }

  running = true;
  document.getElementById("start").textContent = "Ⅱ Pausar";
  document.getElementById("status").textContent =
    "Concentre-se. Você consegue!";

  interval = setInterval(() => {
    seconds++;
    updateDisplay();

    if (goal > 0 && seconds >= goal) {
      clearInterval(interval);
      running = false;
      completed++;

      document.getElementById("start").textContent = "▶ Iniciar";
      document.getElementById("status").textContent =
        "🎉 Meta concluída! Parabéns!";

      updateDisplay();

      alert(
        "Parabéns! Você concluiu sua meta de estudos. Continue assim!"
      );
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  running = false;
  seconds = 0;

  document.getElementById("start").textContent = "▶ Iniciar";
  document.getElementById("status").textContent =
    "Pronto para começar?";

  updateDisplay();
}

function setGoal(minutes, button) {
  resetTimer();
  goal = minutes * 60;

  document.querySelectorAll(".goal").forEach(b =>
    b.classList.remove("active")
  );

  button.classList.add("active");

  document.getElementById("status").textContent =
    minutes === 0
      ? "Modo de estudo livre"
      : "Meta de " + minutes + " minutos";
}

function nextVerse() {
  const index = Math.floor(Math.random() * verses.length);

  document.getElementById("verseText").textContent =
    verses[index].text;

  document.getElementById("verseRef").textContent =
    verses[index].ref;
}

function nextQuote() {
  const index = Math.floor(Math.random() * quotes.length);

  document.getElementById("quote").textContent =
    quotes[index];
}

updateDate();
updateDisplay();
