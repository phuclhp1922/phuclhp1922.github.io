# Engineering Notes

Live at **https://phuclhp1922.github.io**

This is Jekyll with the default `minima` theme, built by GitHub Pages itself.
There's no build pipeline, no local toolchain and no dependency file to keep updated.
GitHub rebuilds the site about 1 minute after every push to `main`.

## Sections

Three sections are linked at the top right of every page: **Posts | Papers | Books**.

| Section | What goes there | Page |
|---|---|---|
| Posts | Full, mature write-ups. Files go in `posts/_posts/`. | `/posts.html` |
| Papers | A landing page linking two sub-pages, plus your paper notes (files in `notes/_posts/`). | `/papers.html` |
| ↳ Reading list | `paper_checklist.md` | `/papers/reading-list.html` |
| ↳ Thesis | `thesis.md`, a copy of `D:/graduation_thesis/ai-var-thesis-brief.md` | `/papers/thesis.html` |
| Books | One folder per book under `books/`, holding its `/teach` output. | `/books.html` |

The home page lists posts and paper notes together, newest first.

Edit `paper_checklist.md` like any other file and push. When the thesis brief changes, copy it
over the body of `thesis.md`. In both files, keep the `---` block at the top, since it sets the URL.

## Add a book

A book is a folder under `books/` holding the files `/teach` produces, published as-is:

```
books/designing-data-intensive-applications/
  index.md          <- the book page (you write this, 5 lines)
  lessons/*.html    <- copied from the /teach workspace
  reference/*.html  <- copied from the /teach workspace (optional)
  assets/*          <- copied from the /teach workspace (lesson.css, quiz.js, review.js)
```

`index.md`:

```markdown
---
layout: book
title: Designing Data-Intensive Applications
author: Martin Kleppmann
category: Distributed Systems
---

One or two lines about why you're reading it.
```

The book page lists every file in `lessons/` and `reference/` automatically. The Books page
groups books by `category`. `books/example-book/` is a placeholder; delete it once you have a real book.

## Write and publish a post or note

1. Create a file named `YYYY-MM-DD-short-slug.md` in the folder for its section, for example
   `posts/_posts/2026-10-15-lora-rank-ablation.md` or `notes/_posts/2026-10-15-colbert.md`.
   The date in the name is the publish date.
2. Start the file with:

   ```markdown
   ---
   title: "LoRA rank ablation"
   ---

   Your text here.
   ```

3. Publish:

   ```sh
   git add .
   git commit -m "Post: LoRA rank ablation"
   git push
   ```

4. Wait about 1 minute, then refresh https://phuclhp1922.github.io. You can watch build
   status at https://github.com/phuclhp1922/phuclhp1922.github.io/actions. A red ✗ means
   the build failed and the error is shown there.

To keep a post unpublished, put `published: false` in its front matter.

## Writing reference

**Code**: use a fenced block with the language name for syntax highlighting:

    ```python
    print("hi")
    ```

**Math**: wrap LaTeX in `$$` for **both** inline and display math. Single `$` does not work.

- Inline: `the rank $$r \ll d$$ is small`
- Display: put `$$ ... $$` in a paragraph of its own (blank line before and after).

**Images and diagrams**: put the file in `assets/images/` and reference it like this:

    ![Alt text]({{ "/assets/images/my-diagram.svg" | relative_url }})

For diagrams, draw them in Excalidraw or draw.io and export SVG or PNG.

See `posts/_posts/2026-10-08-hello-world.md` for a working example of all three.

## How it's wired

| File | Purpose |
|---|---|
| `_config.yml` | Site title, theme, markdown settings |
| `_layouts/math.html` | minima's post layout plus the MathJax script; all posts use it automatically |
| `posts/_posts/`, `notes/_posts/` | Your posts and paper notes |
| `posts.html`, `papers.html`, `books.html` | The section pages in the top-right nav (order is set by `header_pages` in `_config.yml`) |
| `_layouts/book.html` | The book page: lists a book's lessons and reference pages |
| `_includes/post-list.html` | The list markup both section pages share |
| `paper_checklist.md`, `thesis.md` | The Papers sub-pages |
| `assets/images/` | Images |
| `index.md` | Home page, which lists everything |

## Adding another section later

For a section called `talks`, for example:

1. Create the folder `talks/_posts/`.
2. Copy `posts.html` to `talks.html`, then change `title:` and `site.categories.posts` to `site.categories.talks`.
3. Add `talks.html` under `header_pages` in `_config.yml`.
