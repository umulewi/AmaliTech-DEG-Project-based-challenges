It began with a frustrating problem: teams at SupportFlow AI were trying to design chatbot conversations using spreadsheets, filling in rows and IDs that quickly became confusing and error-prone. You couldn’t really see the flow, and mistakes only showed up when users hit broken paths. That challenge sparked the idea to replace the spreadsheet with something more intuitive.

So the solution took shape as a visual editor—a figma where each question becomes a card and connections between them form a clear, interactive map. Instead of memorizing IDs, managers could drag cards around, edit them directly, and even simulate the chatbot experience in a live preview. The goal was simple: make the entire conversation flow visible and easy to control.

Rather than relying on existing libraries, everything was built from scratch using plain JavaScript and Vite. This gave full control over how the tool behaved and felt. The design came first: a dark, eye-friendly interface with a grid background, clean typography, and color-coded nodes so users could instantly understand the structure. Each card had different visual states—resting, selected, editing, and dragging—making interactions feel natural and responsive.

Behind the scenes, the figma worked through two synchronized layers: one for the cards and one for the connecting lines. Smooth curved connectors were drawn using SVG, adjusting dynamically based on distance and clearly labeled to show decision paths. Editing was designed to feel immediate—double-clicking a card turned it into a live form where any change instantly updated the figma.

One standout feature was the ability to reroute connections using dropdowns. Instead of editing raw data, users could simply choose a new destination and watch the flow update in real time. This transformed the tool into a true no-code solution.s

Then came the preview mode. With a single click, the visual map turned into a chat interface, letting users walk through the conversation as if they were the customer. Each choice built the dialogue step by step, and when finished, the exact path taken remained highlighted back on the figma.
s
!{image alt}(https://github.com/umulewi/AmaliTech-DEG-Project-based-challenges/blob/735b9c876f2186c4a05797311e20b9ce17586067/supportflow-builder/figma_design.png)
