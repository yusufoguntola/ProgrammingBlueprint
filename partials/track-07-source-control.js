document.write(`
  <section id="track-7" class="section track" data-stage="2">
    <p class="eyebrow">Stage II</p>
    <div class="track-header">
      <span class="track-number">07</span>
      <h2>Source Control</h2>
    </div>
    <p class="objective"><strong>Why this matters:</strong> From this point on, every project you build should live in version control. It's how you undo mistakes safely, work with other people without overwriting each other, and prove — publicly, on GitHub — that you can actually build things.</p>

    <div class="track-component">
      <h3><span class="step-badge">1</span>What You'll Learn</h3>
      <ul>
        <li>What version control solves, and why Git won over alternatives like Mercurial and SVN.</li>
        <li>Repositories, commits, branches, merges, and conflicts.</li>
        <li>Working with a remote: clone, pull, push, and pull requests on GitHub.</li>
        <li>Writing commit messages that your future self will thank you for.</li>
        <li>Reading a diff, and reverting a change safely without panicking.</li>
      </ul>
    </div>

    <div class="track-component">
      <h3><span class="step-badge">2</span>What to Read</h3>
      <ul class="resource-list">
        <li><a href="https://www.codenewbie.org/blogs/what-is-source-control" target="_blank" rel="noopener">Codenewbie - What is source control</a> — Understanding the core and building blocks of source control.</li>
        <li><a href="https://www.youtube.com/watch?v=tRZGeaHPoaw" target="_blank" rel="noopener">Youtube Video - Git for beginners</a> — Learn git and github using a YouTube crash course.</li>
        <li><a href="https://drive.google.com/file/d/1__w3-G_CZ4rd6K28OAyILePOT5HMw0B6/view?usp=sharing" target="_blank" rel="noopener">Pdf - Pro Git</a> — Learn everything git inside out.</li>
        <li><a href="https://git-scm.com/install/" target="_blank" rel="noopener">Git — Download</a> — Official download page for git.</li>
        <li><a href="https://github.com" target="_blank" rel="noopener">GitHub</a> — Visit github and setup your account.</li>
      </ul>
    </div>

    <div class="track-component">
      <h3><span class="step-badge">3</span>What to Build</h3>
      <p>Create a free GitHub account, push every project you've built so far into its own repository with a real commit history (not one giant "initial commit"), and write a proper README for each.</p>
    </div>

    <div class="track-component">
      <h3><span class="step-badge">4</span>Practice</h3>
      <ul>
        <li>Initialize a repo, make several small commits with meaningful messages.</li>
        <li>Create a branch, make a change, and merge it back — on purpose cause a conflict, then resolve it.</li>
        <li>Push a repo to GitHub and open a pull request against your own branch, just to see the flow.</li>
        <li>Revert a commit safely, and read a diff before deciding what it does.</li>
      </ul>
    </div>

    <div class="track-component exit-criteria">
      <h3><span class="step-badge">5</span>You're Ready When…</h3>
      <ul>
        <li>Every new project starts with <code>git init</code> without you thinking about it.</li>
        <li>You commit in small, meaningful steps instead of one dump at the end.</li>
        <li>You can resolve a merge conflict without panic.</li>
        <li>Your GitHub profile actually reflects what you've built.</li>
      </ul>
    </div>
  </section>

`);
