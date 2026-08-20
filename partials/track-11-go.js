document.write(`
  <section id="track-11" class="section track" data-stage="3">
    <p class="eyebrow">Stage III</p>
    <div class="track-header">
      <span class="track-number">11</span>
      <h2>Go</h2>
    </div>
    <p class="objective"><strong>Why this matters:</strong> This is the real test of the language-independence idea this whole guide is built on. Go is compiled, statically typed, and concurrent by design — deliberately different from everything before it. If you can pick this up efficiently using only official docs, the goal of this guide is met.</p>

    <div class="track-component">
      <h3><span class="step-badge">1</span>What You'll Learn</h3>
      <ul>
        <li>Go syntax, types, and its stripped-down approach to structure.</li>
        <li>Structs and interfaces — Go's answer to objects, without classical inheritance.</li>
        <li>Goroutines and channels: real concurrency, at a beginner level.</li>
        <li>Modules and dependency management, and Go's built-in testing tools.</li>
      </ul>
    </div>

    <div class="track-component">
      <h3><span class="step-badge">2</span>What to Read</h3>
      <ul class="resource-list">
        <li><a href="https://go.dev/tour/welcome/1" target="_blank" rel="noopener">A Tour of Go</a> — the official, free, interactive introduction to the language, straight from the Go team.</li>
        <li><a href="https://gobyexample.com/" target="_blank" rel="noopener">Go by Example</a> — free, annotated real-world examples covering structs, interfaces, goroutines, channels, and testing.</li>
        <li><a href="https://quii.gitbook.io/learn-go-with-tests" target="_blank" rel="noopener">Chris James — Learn Go with Tests</a> — a free book that teaches Go through test-driven development, which doubles as your intro to Go's testing tools.</li>
      </ul>
    </div>

    <div class="track-component">
      <h3><span class="step-badge">3</span>What to Build</h3>
      <p>A small CLI or HTTP service that uses at least one goroutine/channel pattern for real (not contrived), with tests written using Go's standard testing package.</p>
    </div>

    <div class="track-component">
      <h3><span class="step-badge">4</span>Practice</h3>
      <ul>
        <li>Work through A Tour of Go end to end, typing every example yourself.</li>
        <li>Model something with structs and interfaces instead of classes.</li>
        <li>Write a small concurrent program using goroutines and channels.</li>
        <li>Add tests using Go's built-in <code>testing</code> package.</li>
      </ul>
    </div>

    <div class="track-component exit-criteria">
      <h3><span class="step-badge">5</span>You're Ready When…</h3>
      <ul>
        <li>You can read and write basic Go without translating from Python in your head.</li>
        <li>You can explain what a goroutine and a channel actually do.</li>
        <li>You picked most of this up from official docs and examples — proving to yourself that you can learn a new language on your own.</li>
      </ul>
    </div>
  </section>

`);
