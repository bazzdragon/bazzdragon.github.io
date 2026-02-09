# Portfolio

A single-page portfolio based on your XD wireframes.

## Run locally

Open `index.html` in a browser, or use a simple server:

```bash
npx serve .
```

## Adding your content later

- **Text:** Edit the placeholder paragraphs and headings in `index.html` (About, Projects, Contacts, Files, Skills).
- **About photo:** Replace the `.about-photo` div content with an `<img src="your-photo.jpg" alt="Picture of me">` or set a background-image in CSS.
- **Project images (carousel):** In `script.js`, set `projectImages` to your image URLs, e.g.  
  `projectImages = ['project1.jpg', 'project2.jpg'];`  
  The arrows will cycle through these; click the image to open it in a lightbox.
- **Skill icons:** Replace the `.skill-icon` divs with `<img>` tags or background images for each tool.
- **Tools Used (project tool icons):** In each project’s “Tools Used” line there is a `<span class="tools-icons">`. Add one `<img class="tool-icon" src="images/unity.png" alt="Unity">` (or similar) per tool. Use small square icons (e.g. 28×28px); they sit next to “Tools Used:”.
- **Skill stars (level 1–5):** Each skill card has `<div class="skill-stars" data-level="5">`. Set `data-level="1"` to `data-level="5"` for that skill (1 = one filled star, 5 = five filled). The script fills/empties stars automatically. Update `aria-label` to match (e.g. `aria-label="4 out of 5"`).
- **Download buttons (zip / pptx):** In `script.js`, set the `downloadUrls` object. Each key (e.g. `adventuresProject`, `adventuresGame`, `hellslayerGdd`, `battantsGame`) should be the URL of your file — use `.zip` or `.pptx` (or any file). The browser will download that file when the user clicks. Leave a key as `''` if that link should do nothing for now.

## Features

- **Sidebar:** Hamburger toggles the sidebar; main content scales to full width when closed. When closed, a menu button on the left opens it again.
- **Navigation:** About me, Projects, Skills, Contacts, Files with active underline and correct page title in the header.
- **Project image:** Left/right arrows change the image; clicking the image opens a lightbox (click outside or Escape to close).
- **Colors:** Green `#039216`, blue `#12D7EE`, white `#FFFFFF`, background `#2A2A2A`, sidebar `#262626`, hamburger `#585858`, with lighter hover variants.
