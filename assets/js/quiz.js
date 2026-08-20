(function () {
  "use strict";

  var STAGE_NAMES = { 1: "Stage I", 2: "Stage II", 3: "Stage III" };

  // Question banks are loaded as plain <script> includes (see index.html)
  // that populate window.QUESTION_BANKS[trackKey] — not fetched — because
  // fetch()/XHR are blocked by browsers when the site is opened directly
  // from disk (file://) rather than through a server. Script tags work
  // identically either way.
  var STAGE_TRACKS = {
    1: [
      "track-01-computer-literacy",
      "track-02-intro-programming",
      "track-03-software-dev-world",
      "track-04-documentation"
    ],
    2: [
      "track-05-pascal",
      "track-06-java",
      "track-07-source-control"
    ],
    3: [
      "track-08-html-css",
      "track-09-javascript",
      "track-10-python",
      "track-11-go"
    ]
  };

  var QUESTIONS_PER_ASSESSMENT = 50;
  var PASS_THRESHOLD = 75;

  var quizRoot = document.getElementById("quiz-root");
  var state = null; // active quiz session

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function stagePool(stage) {
    var banks = window.QUESTION_BANKS || {};
    var keys = STAGE_TRACKS[stage] || [];
    var pool = [];
    keys.forEach(function (key) {
      if (Array.isArray(banks[key])) pool = pool.concat(banks[key]);
    });
    return pool;
  }

  function startAssessment(stage) {
    var pool = stagePool(stage);
    if (!pool.length) {
      alert("This assessment's question bank isn't ready yet — check back soon.");
      return;
    }

    var picked = shuffle(pool).slice(0, Math.min(QUESTIONS_PER_ASSESSMENT, pool.length));

    state = {
      stage: stage,
      questions: picked,
      index: 0,
      answers: new Array(picked.length).fill(null)
    };

    render();
  }

  function currentQuestion() {
    return state.questions[state.index];
  }

  function selectChoice(choiceIndex) {
    state.answers[state.index] = choiceIndex;
    render();
  }

  function goNext() {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      render();
    } else {
      finish();
    }
  }

  function goPrev() {
    if (state.index > 0) {
      state.index -= 1;
      render();
    }
  }

  function finish() {
    var correct = 0;
    state.questions.forEach(function (q, i) {
      if (state.answers[i] === q.answer) correct += 1;
    });
    var total = state.questions.length;
    var pct = Math.round((correct / total) * 100);
    state.result = { correct: correct, total: total, pct: pct, passed: pct >= PASS_THRESHOLD };
    render();
  }

  function closeQuiz() {
    state = null;
    quizRoot.innerHTML = "";
  }

  function retake() {
    startAssessment(state.stage);
  }

  function esc(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function render() {
    if (!state) {
      quizRoot.innerHTML = "";
      return;
    }

    if (state.result) {
      renderResults();
      return;
    }

    var q = currentQuestion();
    var selected = state.answers[state.index];
    var stageName = STAGE_NAMES[state.stage] || "";
    var progressPct = Math.round(((state.index + 1) / state.questions.length) * 100);

    var choicesHtml = q.choices
      .map(function (choice, i) {
        var cls = "quiz-choice" + (selected === i ? " selected" : "");
        return (
          '<li><button class="' + cls + '" data-choice="' + i + '" type="button">' +
          esc(choice) +
          "</button></li>"
        );
      })
      .join("");

    quizRoot.innerHTML =
      '<div class="quiz-overlay" role="dialog" aria-modal="true" aria-label="' + stageName + ' assessment">' +
        '<div class="quiz-modal">' +
          '<div class="quiz-header">' +
            "<h2>" + stageName + " Assessment</h2>" +
            '<span class="quiz-progress-label">' + (state.index + 1) + " / " + state.questions.length + "</span>" +
            '<button class="quiz-close" type="button" aria-label="Close assessment" data-action="close">&times;</button>' +
          "</div>" +
          '<div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:' + progressPct + '%"></div></div>' +
          '<div class="quiz-body">' +
            '<p class="quiz-question">' + esc(q.q) + "</p>" +
            '<ul class="quiz-choices">' + choicesHtml + "</ul>" +
          "</div>" +
          '<div class="quiz-footer">' +
            '<button class="quiz-btn quiz-btn-ghost" type="button" data-action="prev"' + (state.index === 0 ? " disabled" : "") + ">Back</button>" +
            '<button class="quiz-btn quiz-btn-primary" type="button" data-action="next"' + (selected === null ? " disabled" : "") + ">" +
              (state.index === state.questions.length - 1 ? "Finish" : "Next") +
            "</button>" +
          "</div>" +
        "</div>" +
      "</div>";
  }

  function renderResults() {
    var r = state.result;
    var stageName = STAGE_NAMES[state.stage] || "";
    var verdict = r.passed
      ? "Nice work — you're in good shape to move on."
      : "You're not quite at the recommended bar yet.";
    var note = r.passed
      ? "You scored at or above the 75% mark we recommend before starting the next stage. You can keep practicing here or move on whenever you're ready."
      : "We recommend scoring 75% or higher before moving to the next stage — it means the material has really sunk in. Nothing stops you from continuing anyway, but a quick review of the tracks above first will pay off.";

    quizRoot.innerHTML =
      '<div class="quiz-overlay" role="dialog" aria-modal="true" aria-label="' + stageName + ' assessment results">' +
        '<div class="quiz-modal">' +
          '<div class="quiz-header">' +
            "<h2>" + stageName + " Results</h2>" +
            '<button class="quiz-close" type="button" aria-label="Close assessment" data-action="close">&times;</button>' +
          "</div>" +
          '<div class="quiz-body">' +
            '<div class="quiz-results">' +
              '<div class="quiz-score ' + (r.passed ? "pass" : "fail") + '">' + r.pct + "%</div>" +
              '<p class="quiz-verdict">' + verdict + "</p>" +
              '<p class="quiz-note">' + note + " (" + r.correct + " of " + r.total + " correct.)</p>" +
              '<div class="quiz-results-actions">' +
                '<button class="quiz-btn quiz-btn-primary" type="button" data-action="retake">Retake</button>' +
                '<button class="quiz-btn quiz-btn-ghost" type="button" data-action="close">Close</button>' +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
  }

  document.addEventListener("click", function (event) {
    var startBtn = event.target.closest("[data-action='start-assessment']");
    if (startBtn) {
      var stage = parseInt(startBtn.getAttribute("data-stage"), 10);
      if (stage) startAssessment(stage);
      return;
    }

    if (!state) return;

    var choiceBtn = event.target.closest(".quiz-choice");
    if (choiceBtn) {
      selectChoice(parseInt(choiceBtn.getAttribute("data-choice"), 10));
      return;
    }

    var actionEl = event.target.closest("[data-action]");
    if (!actionEl) return;

    var action = actionEl.getAttribute("data-action");
    if (action === "next") goNext();
    else if (action === "prev") goPrev();
    else if (action === "close") closeQuiz();
    else if (action === "retake") retake();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && state) closeQuiz();
  });
})();
