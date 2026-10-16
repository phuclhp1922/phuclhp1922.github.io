# Engineering Notes

Live at **https://phuclhp1922.github.io**

This is Jekyll with the default `minima` theme, built by GitHub Pages itself.
There's no build pipeline, no local toolchain and no dependency file to keep updated.
GitHub rebuilds the site about 1 minute after every push to `main`.

## Sections

Three sections are linked at the top right of every page: **Posts | Papers | Books**.

```
Posts   /posts/                        -> list of posts           (posts/_posts/*.md)
Papers  /papers/
  ├─ Reading list  /papers/reading-list/  -> list of paper notes  (papers/reading-list/_posts/*.md)
  │                └─ checklist.html        (paper_checklist.md)
  └─ Thesis        /papers/thesis/        -> list of paper notes  (papers/thesis/_posts/*.md)
                   └─ brief.html            (thesis.md)
Books   /books/                        -> list of books, by category
  └─ a book        /books/<slug>/         -> list of chapters     (books/<slug>/NN-slug.md)
```

The home page lists posts and paper notes together, newest first.

`paper_checklist.md` and `thesis.md` are linked from the top of their list page. `thesis.md` is a copy
of `D:/graduation_thesis/ai-var-thesis-brief.md`. When the brief changes, paste it in again below the
`---` block. In both files, keep the `---` block at the top, since it sets the URL.

## Write and publish a post or paper note

1. Create a file named `YYYY-MM-DD-short-slug.md` in the folder for where it belongs:
   - a post: `posts/_posts/2026-10-15-lora-rank-ablation.md`
   - a reading-list paper note: `papers/reading-list/_posts/2026-10-15-colbert.md`
   - a thesis paper note: `papers/thesis/_posts/2026-10-15-soccermaster.md`

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

## Add a book and its chapters

A book is a folder under `books/`. Its `index.md` is the book page, and every other `.md` file in
the folder is a chapter note:

```
books/designing-data-intensive-applications/
  index.md                      <- the book page
  03-storage-and-retrieval.md   <- a chapter note
  05-replication.md             <- a chapter note
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

A chapter note:

```markdown
---
title: "Storage and Retrieval"
chapter: 3
---

Your notes. Code and $$math$$ work as in posts.
```

The book page lists its chapters in `chapter:` order, and the Books page groups books by
`category`. If you also copy `/teach` output into the book folder (`lessons/*.html`,
`reference/*.html` and `assets/`), the book page lists those under "Lessons" and "Reference".

`books/example-book/` is a placeholder. Delete it once you have a real book.

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
| `_config.yml` | Site title, theme, markdown settings, default layouts, nav order (`header_pages`) |
| `posts/index.html`, `papers/index.html`, `books/index.html` | The three section pages in the top-right nav |
| `papers/reading-list/index.html`, `papers/thesis/index.html` | The paper-note list pages |
| `_layouts/list.html` | A list page: shows the posts whose folder matches `list_category` |
| `_layouts/math.html` | Posts and paper notes: minima's post layout plus a back link and MathJax |
| `_layouts/book.html` | A book page: lists its chapters (and any `/teach` lessons) |
| `_layouts/chapter.html` | A chapter note: back link to its book, plus MathJax |
| `_includes/post-list.html` | The list markup the list pages share |
| `_includes/mathjax.html` | The MathJax script tag |
| `paper_checklist.md`, `thesis.md` | The checklist and the thesis brief |
| `assets/images/` | Images |
| `index.md` | Home page, which lists everything |

## Adding another paper list later

For a list called `surveys`, for example:

1. Create the folder `papers/surveys/_posts/`.
2. Copy `papers/thesis/index.html` to `papers/surveys/index.html`, then change `title:`,
   `list_category: surveys` and the intro line.
3. Add a link to it in `papers/index.html`.
