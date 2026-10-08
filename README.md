# Engineering Notes

Live at **https://phuclhp1922.github.io**

This is Jekyll with the default `minima` theme, built by GitHub Pages itself.
There's no build pipeline, no local toolchain and no dependency file to keep updated.
GitHub rebuilds the site about 1 minute after every push to `main`.

## Write and publish a post

1. Create a file in `_posts/` named `YYYY-MM-DD-short-slug.md`, for example
   `_posts/2026-10-15-lora-rank-ablation.md`. The date in the name is the post's date.
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

See `_posts/2026-10-08-hello-world.md` for a working example of all three.

## How it's wired

| File | Purpose |
|---|---|
| `_config.yml` | Site title, theme, markdown settings |
| `_layouts/math.html` | minima's post layout plus the MathJax script; all posts use it automatically |
| `_posts/` | Your posts |
| `assets/images/` | Images |
| `index.md` | Home page, which lists posts |
